'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import usePartySocket from 'partysocket/react';

/**
 * Types matching the server
 */
export interface Horse {
  id: string;
  name: string;
  description: string;
  bucket: 'rodeo' | 'chute' | 'stable' | 'wild';
  spiritScore: number;
  completion: number;
  impact: number;
  effort: number;
  revenue: number;
  excitement: number;
  tasks?: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  horseId: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  createdAt: string;
  completedAt?: string;
}

interface RoomState {
  horses: Record<string, Horse>;
  settings: {
    theme?: string;
    briefingTime?: string;
  };
  lastSync: string;
}

interface PartyContextValue {
  // Connection state
  isConnected: boolean;
  isSynced: boolean;
  lastSync: string | null;

  // Horses
  horses: Horse[];
  getHorse: (id: string) => Horse | undefined;
  upsertHorse: (horse: Partial<Horse> & { id?: string }) => void;
  deleteHorse: (id: string) => void;

  // Tasks
  addTask: (horseId: string, title: string) => void;
  updateTask: (horseId: string, task: Task) => void;
  deleteTask: (horseId: string, taskId: string) => void;

  // Bulk operations
  importHorses: (horses: Horse[]) => void;

  // Settings
  settings: RoomState['settings'];
  updateSettings: (settings: Partial<RoomState['settings']>) => void;
}

const PartyContext = createContext<PartyContextValue | null>(null);

interface PartyProviderProps {
  children: ReactNode;
  host: string;
  room: string;  // Usually `user-${userId}` for personal data
  authToken?: string;
}

export function PartyProvider({ children, host, room, authToken }: PartyProviderProps) {
  const [state, setState] = useState<RoomState>({
    horses: {},
    settings: {},
    lastSync: ''
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Build connection URL with optional auth token
  const query = authToken ? `?token=${encodeURIComponent(authToken)}` : '';

  const socket = usePartySocket({
    host,
    room,
    query,

    onOpen() {
      console.log('[Party] Connected to room:', room);
      setIsConnected(true);
    },

    onClose() {
      console.log('[Party] Disconnected from room:', room);
      setIsConnected(false);
      setIsSynced(false);
    },

    onMessage(event) {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case 'sync':
            setState(message.state);
            setIsSynced(true);
            console.log('[Party] Full sync received:', Object.keys(message.state.horses).length, 'horses');
            break;

          case 'horse_updated':
            setState(prev => ({
              ...prev,
              horses: {
                ...prev.horses,
                [message.horse.id]: message.horse
              }
            }));
            break;

          case 'horse_deleted':
            setState(prev => {
              const newHorses = { ...prev.horses };
              delete newHorses[message.horseId];
              return { ...prev, horses: newHorses };
            });
            break;

          case 'settings_updated':
            setState(prev => ({
              ...prev,
              settings: message.settings
            }));
            break;

          case 'error':
            console.error('[Party] Server error:', message.message);
            break;

          default:
            console.log('[Party] Unknown message type:', message.type);
        }
      } catch (err) {
        console.error('[Party] Error parsing message:', err);
      }
    },

    onError(event) {
      console.error('[Party] WebSocket error:', event);
    }
  });

  // Send message helper
  const send = useCallback((action: object) => {
    if (socket) {
      socket.send(JSON.stringify(action));
    }
  }, [socket]);

  // Horse operations
  const upsertHorse = useCallback((horseData: Partial<Horse> & { id?: string }) => {
    const horse: Horse = {
      id: horseData.id || `horse-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: horseData.name || 'New Horse',
      description: horseData.description || '',
      bucket: horseData.bucket || 'wild',
      spiritScore: horseData.spiritScore || 0,
      completion: horseData.completion || 0,
      impact: horseData.impact || 5,
      effort: horseData.effort || 5,
      revenue: horseData.revenue || 5,
      excitement: horseData.excitement || 5,
      tasks: horseData.tasks || [],
      createdAt: horseData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    send({ type: 'horse_upsert', horse });

    // Optimistic update
    setState(prev => ({
      ...prev,
      horses: { ...prev.horses, [horse.id]: horse }
    }));
  }, [send]);

  const deleteHorse = useCallback((id: string) => {
    send({ type: 'horse_delete', horseId: id });

    // Optimistic update
    setState(prev => {
      const newHorses = { ...prev.horses };
      delete newHorses[id];
      return { ...prev, horses: newHorses };
    });
  }, [send]);

  const getHorse = useCallback((id: string) => {
    return state.horses[id];
  }, [state.horses]);

  // Task operations
  const addTask = useCallback((horseId: string, title: string) => {
    const task: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      horseId,
      title,
      status: 'todo',
      createdAt: new Date().toISOString()
    };

    send({ type: 'task_upsert', horseId, task });
  }, [send]);

  const updateTask = useCallback((horseId: string, task: Task) => {
    send({ type: 'task_upsert', horseId, task });
  }, [send]);

  const deleteTask = useCallback((horseId: string, taskId: string) => {
    send({ type: 'task_delete', horseId, taskId });
  }, [send]);

  // Bulk import (for localStorage migration)
  const importHorses = useCallback((horses: Horse[]) => {
    send({ type: 'bulk_import', horses });
  }, [send]);

  // Settings
  const updateSettings = useCallback((settings: Partial<RoomState['settings']>) => {
    send({ type: 'settings_update', settings });
  }, [send]);

  // Convert horses object to array for convenience
  const horsesArray = Object.values(state.horses);

  const value: PartyContextValue = {
    isConnected,
    isSynced,
    lastSync: state.lastSync || null,
    horses: horsesArray,
    getHorse,
    upsertHorse,
    deleteHorse,
    addTask,
    updateTask,
    deleteTask,
    importHorses,
    settings: state.settings,
    updateSettings
  };

  return (
    <PartyContext.Provider value={value}>
      {children}
    </PartyContext.Provider>
  );
}

/**
 * Hook to access party state and actions
 */
export function useParty() {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error('useParty must be used within a PartyProvider');
  }
  return context;
}

/**
 * Hook for just horses (convenience)
 */
export function useHorses() {
  const { horses, upsertHorse, deleteHorse, getHorse } = useParty();
  return { horses, upsertHorse, deleteHorse, getHorse };
}

/**
 * Hook for tasks within a specific horse
 */
export function useTasks(horseId: string) {
  const { getHorse, addTask, updateTask, deleteTask } = useParty();
  const horse = getHorse(horseId);

  return {
    tasks: horse?.tasks || [],
    addTask: (title: string) => addTask(horseId, title),
    updateTask: (task: Task) => updateTask(horseId, task),
    deleteTask: (taskId: string) => deleteTask(horseId, taskId)
  };
}

/**
 * Hook for connection status
 */
export function usePartyStatus() {
  const { isConnected, isSynced, lastSync } = useParty();
  return { isConnected, isSynced, lastSync };
}
