import type * as Party from "partykit/server";

/**
 * HorseRoom - Real-time sync server for Project Triage
 *
 * Each user gets their own "room" identified by `user-{userId}`
 * All their horses (projects) sync in real-time across devices
 */

interface Horse {
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

interface Task {
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

type MessageAction =
  | { type: 'sync_request' }
  | { type: 'horse_upsert'; horse: Horse }
  | { type: 'horse_delete'; horseId: string }
  | { type: 'task_upsert'; horseId: string; task: Task }
  | { type: 'task_delete'; horseId: string; taskId: string }
  | { type: 'settings_update'; settings: Partial<RoomState['settings']> }
  | { type: 'bulk_import'; horses: Horse[] };

export default class HorseRoom implements Party.Server {
  private state: RoomState = {
    horses: {},
    settings: {},
    lastSync: new Date().toISOString()
  };

  constructor(readonly room: Party.Room) {}

  /**
   * Called when the room starts (lazy - only when first user connects)
   */
  async onStart() {
    // Load persisted state from durable storage
    const stored = await this.room.storage.get<RoomState>("state");
    if (stored) {
      this.state = stored;
    }
    console.log(`[HorseRoom] Room ${this.room.id} started with ${Object.keys(this.state.horses).length} horses`);
  }

  /**
   * Called when a client connects
   */
  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // TODO: Add auth verification here
    // const token = new URL(ctx.request.url).searchParams.get("token");
    // const user = await verifyToken(token);
    // if (!user) { conn.close(4001, "Unauthorized"); return; }

    console.log(`[HorseRoom] Client connected to room ${this.room.id}`);

    // Send current state to new client
    conn.send(JSON.stringify({
      type: 'sync',
      state: this.state
    }));
  }

  /**
   * Called when a client disconnects
   */
  async onClose(conn: Party.Connection) {
    console.log(`[HorseRoom] Client disconnected from room ${this.room.id}`);
  }

  /**
   * Called on every message from any connected client
   */
  async onMessage(message: string, sender: Party.Connection) {
    try {
      const action = JSON.parse(message) as MessageAction;

      switch (action.type) {
        case 'sync_request':
          // Client requesting full sync
          sender.send(JSON.stringify({
            type: 'sync',
            state: this.state
          }));
          break;

        case 'horse_upsert':
          this.state.horses[action.horse.id] = {
            ...action.horse,
            updatedAt: new Date().toISOString()
          };
          await this.persist();
          this.broadcast({ type: 'horse_updated', horse: this.state.horses[action.horse.id] });
          break;

        case 'horse_delete':
          delete this.state.horses[action.horseId];
          await this.persist();
          this.broadcast({ type: 'horse_deleted', horseId: action.horseId });
          break;

        case 'task_upsert':
          const horse = this.state.horses[action.horseId];
          if (horse) {
            horse.tasks = horse.tasks || [];
            const taskIndex = horse.tasks.findIndex(t => t.id === action.task.id);
            if (taskIndex >= 0) {
              horse.tasks[taskIndex] = action.task;
            } else {
              horse.tasks.push(action.task);
            }
            horse.updatedAt = new Date().toISOString();
            await this.persist();
            this.broadcast({ type: 'horse_updated', horse });
          }
          break;

        case 'task_delete':
          const h = this.state.horses[action.horseId];
          if (h && h.tasks) {
            h.tasks = h.tasks.filter(t => t.id !== action.taskId);
            h.updatedAt = new Date().toISOString();
            await this.persist();
            this.broadcast({ type: 'horse_updated', horse: h });
          }
          break;

        case 'settings_update':
          this.state.settings = { ...this.state.settings, ...action.settings };
          await this.persist();
          this.broadcast({ type: 'settings_updated', settings: this.state.settings });
          break;

        case 'bulk_import':
          // For migrating from localStorage
          for (const horse of action.horses) {
            this.state.horses[horse.id] = {
              ...horse,
              updatedAt: new Date().toISOString()
            };
          }
          await this.persist();
          this.broadcast({ type: 'sync', state: this.state });
          break;

        default:
          console.warn(`[HorseRoom] Unknown action type:`, action);
      }
    } catch (err) {
      console.error(`[HorseRoom] Error processing message:`, err);
      sender.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  }

  /**
   * Persist state to durable storage
   */
  private async persist() {
    this.state.lastSync = new Date().toISOString();
    await this.room.storage.put("state", this.state);
  }

  /**
   * Broadcast message to all connected clients
   */
  private broadcast(message: object) {
    this.room.broadcast(JSON.stringify(message));
  }
}
