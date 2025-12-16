'use client';

import { ReactNode, useState, useEffect } from 'react';
import { PartyProvider } from '@/lib/party';

const PARTY_HOST = process.env.NEXT_PUBLIC_PARTY_HOST || 'localhost:1999';
const STORAGE_KEY = 'project-triage-data';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // For now, use a simple anonymous user ID stored in localStorage
  // Later this will come from proper auth
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem('triage-user-id');
    if (!id) {
      id = `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('triage-user-id', id);
    }
    setUserId(id);
  }, []);

  // Don't render until we have a user ID
  if (!userId) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Saddling up...</p>
      </div>
    );
  }

  return (
    <PartyProvider
      host={PARTY_HOST}
      room={`user-${userId}`}
    >
      {children}
    </PartyProvider>
  );
}
