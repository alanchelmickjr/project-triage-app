/**
 * party-user-kit
 *
 * Real-time sync and state management for Project Triage
 * Built on PartyKit (Cloudflare edge)
 *
 * Usage:
 *
 * ```tsx
 * import { PartyProvider, useParty, useHorses } from '@/lib/party';
 *
 * // In your app root:
 * <PartyProvider host="your-project.partykit.dev" room={`user-${userId}`}>
 *   <App />
 * </PartyProvider>
 *
 * // In components:
 * const { horses, upsertHorse, deleteHorse } = useHorses();
 * const { isConnected, isSynced } = usePartyStatus();
 * ```
 */

export {
  PartyProvider,
  useParty,
  useHorses,
  useTasks,
  usePartyStatus
} from './PartyProvider';

export type {
  Horse,
  Task
} from './PartyProvider';
