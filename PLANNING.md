# Project Triage - Unified Life OS Planning Document

## Vision

**Project Triage** is the command center of a personal Life OS for high-velocity founders. It enforces focus through constraints (3 horses max), integrates with your calendar and email via MCP, and uses Claude AI as your strategic "Ranch Hand" advisor.

**The Core Metaphor**: You're a rancher wrangling wild horses. You can only ride 3 at a time. The AI is your experienced ranch hand who knows your calendar, your energy, and your goals.

---

## The Elegant Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER EXPERIENCE LAYER                              │
│                                                                              │
│   "What should I work on?"  →  AI considers everything  →  Actionable plan  │
│                                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │   Desktop   │  │   Mobile    │  │   Tablet    │  │  Any Device │        │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GUN-USER-KIT LAYER                                  │
│                    (Identity & Data Substrate)                               │
│                                                                              │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                   │
│   │  Auth (SEA)   │  │ Private Data  │  │  Team Spaces  │                   │
│   │  - Login      │  │  - Encrypted  │  │  - Shared     │                   │
│   │  - Sessions   │  │  - Per-user   │  │  - Real-time  │                   │
│   │  - Cross-app  │  │  - Offline    │  │  - Permissioned│                  │
│   └───────────────┘  └───────────────┘  └───────────────┘                   │
│                                                                              │
│                        Gun.js P2P Mesh Network                               │
│                    ┌─────────────────────────┐                               │
│                    │   Vercel Edge Relay     │                               │
│                    │   (Self-hosted)         │                               │
│                    └─────────────────────────┘                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            │                         │                         │
            ▼                         ▼                         ▼
┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│  PROJECT TRIAGE   │    │    FUTURE APP     │    │    FUTURE APP     │
│  (Command Center) │    │  (Habit Tracker?) │    │  (Invoice Tool?)  │
│                   │    │                   │    │                   │
│  Same Auth! ────────────── Same Auth! ────────────── Same Auth!     │
│  Data can flow ─────────── Data can flow ─────────── Data can flow  │
└───────────────────┘    └───────────────────┘    └───────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MCP LAYER                                         │
│                  (External Data Connections)                                 │
│                                                                              │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                   │
│   │  Gmail MCP    │  │ Calendar MCP  │  │  Memory MCP   │                   │
│   │  inbox-zero   │  │ @cocal/gcal   │  │  openmemory   │                   │
│   │               │  │               │  │  (Mem0)       │                   │
│   │ • Needs reply │  │ • Events      │  │               │                   │
│   │ • Follow-ups  │  │ • Free/busy   │  │ • Persistent  │                   │
│   │ • Auto-tag    │  │ • Multi-acct  │  │ • Cross-session│                  │
│   └───────────────┘  └───────────────┘  └───────────────┘                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLAUDE AI BRAIN                                      │
│                      (Ranch Hand Advisor)                                    │
│                                                                              │
│   Input:                              Output:                                │
│   • Your 3 Rodeo Ring projects        • "Work on VLA Robot for 2 hours"     │
│   • Today's calendar                  • "Reschedule the 4pm - you need prep"│
│   • Spirit Scores                     • "Your Stable has 2 forgotten gems"  │
│   • Task completion history           • "Based on velocity: 8 tasks/week"   │
│   • Energy patterns                   • "Take a break - you're overloaded"  │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Anthropic Claude API (claude-sonnet-4-20250514)                       │       │
│   │  System prompt: Strategic advisor for constraint-based focus    │       │
│   └─────────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       N8N ORCHESTRATION                                      │
│                    (Proactive Automation)                                    │
│                                                                              │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                   │
│   │Morning Brief  │  │  Webhooks     │  │  Cron Jobs    │                   │
│   │               │  │               │  │               │                   │
│   │ 6:30 AM       │  │ • New meeting │  │ • Daily sync  │                   │
│   │ "Here's your  │  │ • Task done   │  │ • Weekly rev  │                   │
│   │  day, boss"   │  │ • Email flag  │  │ • Stale check │                   │
│   └───────────────┘  └───────────────┘  └───────────────┘                   │
│                                                                              │
│   Why n8n? Claude can't push notifications. n8n bridges the gap.            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CALENDAR AI FEATURES                                    │
│                    (Time Intelligence)                                       │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Motion ($19/mo) - Only tool supporting Zoom + Meet + Teams     │       │
│   │  OR                                                             │       │
│   │  Reclaim.ai (Free tier) - Good enough if no Teams needed        │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                              │
│   Features:                                                                  │
│   • Auto-schedule tasks into calendar gaps                                  │
│   • Reshuffle day when new meetings arrive                                  │
│   • Protect focus time for Rodeo Ring projects                              │
│   • Sync with Project Triage via n8n                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Naming Convention (Rodeo/Western Theme)

| Current Name | Rodeo Name | Emoji | Description |
|--------------|------------|-------|-------------|
| FOCUS NOW | **Rodeo Ring** | 🤠 | The arena - your 3 active horses |
| NEXT UP | **In The Chute** | 🚪 | Waiting at the gate, ready to ride |
| PARKING LOT | **The Stable** | 🐴 | Resting until their time comes |
| UNSORTED | **Wild Herd** | 🌾 | Untamed projects, not yet wrangled |
| Projects | **Horses** | 🐎 | Each project is a horse to tame |
| Score | **Spirit Score** | 🔥 | How fiery/promising the horse is |
| Auto Sort | **Wrangle 'Em** | ✨ | Let the algorithm sort the herd |
| Mental Bandwidth | **Saddle Load** | ⚖️ | How heavy is your saddle? |
| AI Assistant | **Ranch Hand** | 🤖 | Your AI advisor |

---

## The Three Projects

### 1. gun-user-kit (Foundation Layer)

**Purpose**: Never build auth again. Drop-in identity for any Vercel project.

**Repository**: Separate repo (`gun-user-kit`)

**What it provides**:
```typescript
// Any project can do this:
import {
  GunProvider,      // React context
  useGunAuth,       // Login/logout/session
  useGunUser,       // User profile
  useGunData,       // Private encrypted data
  useGunTeam,       // Shared team data
  useGunSync,       // Cross-device sync status
  AuthGate,         // Protected route wrapper
  LoginForm,        // Pre-built UI
  SignupForm        // Pre-built UI
} from 'gun-user-kit';

function App() {
  return (
    <GunProvider
      relay="https://my-relay.vercel.app/gun"
      appName="project-triage"
    >
      <AuthGate fallback={<LoginForm />}>
        <MyApp />
      </AuthGate>
    </GunProvider>
  );
}
```

**Key Design Decisions**:
- **Gun.js SEA** for auth (built-in crypto, no passwords stored)
- **Vercel Edge Relay** for sync (self-hosted, your data)
- **Offline-first** with automatic sync on reconnect
- **Cross-app identity** via shared relay server
- **Zero config** defaults that just work

**Package Structure**:
```
gun-user-kit/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts                 # Main exports
│   ├── GunProvider.tsx          # React context + Gun instance
│   ├── hooks/
│   │   ├── useGunAuth.ts        # create, login, logout, isAuthenticated
│   │   ├── useGunUser.ts        # user profile, preferences
│   │   ├── useGunData.ts        # CRUD for private data paths
│   │   ├── useGunTeam.ts        # Shared team spaces
│   │   └── useGunSync.ts        # Connection status, sync state
│   ├── components/
│   │   ├── LoginForm.tsx        # Minimal, styleable login
│   │   ├── SignupForm.tsx       # Minimal, styleable signup
│   │   └── AuthGate.tsx         # Protects routes
│   ├── relay/
│   │   ├── vercel-edge.ts       # Vercel Edge Function relay
│   │   └── standalone.ts        # Node.js standalone relay
│   └── utils/
│       ├── encryption.ts        # SEA helpers
│       └── migration.ts         # localStorage → Gun migration
├── examples/
│   ├── next-app/                # Full Next.js example
│   └── minimal/                 # Bare minimum setup
└── dist/                        # Built output
```

---

### 2. project-triage-app (Command Center)

**Purpose**: The hub where you manage projects, see your calendar, and talk to the Ranch Hand AI.

**Enhanced Features** (beyond v1.0):

| Feature | Description | Dependencies |
|---------|-------------|--------------|
| Gun.js Auth | Login, cross-device sync | gun-user-kit |
| Calendar View | See today's meetings alongside projects | MCP + Calendar API |
| Ranch Hand AI | "What should I work on?" | Claude API |
| Sprint Tasks | Break horses into daily tasks | Kanban system |
| Time Blocking | Schedule focus time for Rodeo Ring | Motion/Reclaim API |
| Morning Briefing | n8n-triggered daily summary | n8n webhooks |
| Team Boards | Share project boards with others | Gun.js teams |

**New Data Model**:
```typescript
interface Horse {
  id: string;
  name: string;
  description: string;
  bucket: 'rodeo' | 'chute' | 'stable' | 'wild';
  spiritScore: number;
  completion: number;

  // Scoring dimensions
  impact: number;      // 1-10
  effort: number;      // 1-10
  revenue: number;     // 1-10
  excitement: number;  // 1-10

  // Sprint/Kanban
  tasks: Task[];
  currentSprint?: Sprint;

  // Calendar integration
  scheduledBlocks: TimeBlock[];
  deadline?: Date;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

interface Task {
  id: string;
  horseId: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  estimatedMinutes?: number;
  scheduledFor?: Date;
  completedAt?: Date;
}

interface Sprint {
  id: string;
  startDate: Date;
  endDate: Date;  // Usually 1 week
  goals: string[];
  taskIds: string[];
}

interface TimeBlock {
  id: string;
  horseId: string;
  calendarEventId?: string;  // Link to external calendar
  start: Date;
  end: Date;
  completed: boolean;
}

interface DailyBriefing {
  date: Date;
  meetings: CalendarEvent[];
  focusTime: { hours: number; suggested: Horse[] };
  overdueTasks: Task[];
  suggestedPriority: Horse[];
  ranchHandAdvice: string;
}
```

---

### 3. MCP + n8n Integration Layer

**Purpose**: Connect external systems and enable proactive AI.

**MCP Servers to Configure**:

| Server | Purpose | Setup Time |
|--------|---------|------------|
| `@cocal/google-calendar-mcp` | Read/write Google Calendar | 1-2 hours |
| `inbox-zero-mcp` | Gmail with "needs reply" detection | 1 hour |
| `openmemory-mcp` (Mem0) | Persistent memory across sessions | 30 min |
| `apple-mcp` | macOS Calendar/Reminders (if Apple ecosystem) | 30 min |

**n8n Workflows to Build**:

| Workflow | Trigger | Action |
|----------|---------|--------|
| Morning Briefing | Cron 6:30 AM | Gather calendar + projects → Claude → Push notification |
| Meeting Prep | 30 min before meeting | Check if meeting relates to a Horse → Send prep reminder |
| Task Completed | Webhook from app | Update sprint progress, check if Horse can move buckets |
| Weekly Review | Cron Sunday 6 PM | Summarize week, suggest next week's focus |
| Stale Project Alert | Cron daily | Find Stable horses not touched in 30 days |

**n8n → Project Triage Integration**:
```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   n8n       │────▶│  Webhook    │────▶│ Project Triage  │
│  Workflow   │     │  /api/n8n   │     │  Update State   │
└─────────────┘     └─────────────┘     └─────────────────┘
       │
       │ (or)
       ▼
┌─────────────────────────────────────┐
│  Push Notification (via Pushover,   │
│  ntfy.sh, or native notifications)  │
└─────────────────────────────────────┘
```

---

## Claude AI Integration Design

### The Ranch Hand System Prompt

```
You are the Ranch Hand, an AI strategic advisor for a founder using Project Triage.

CONTEXT YOU HAVE ACCESS TO:
- The user's Horses (projects) with Spirit Scores and bucket placement
- Today's calendar via MCP
- Task completion history
- Sprint goals and progress

YOUR PHILOSOPHY:
- The user can only ride 3 horses (Rodeo Ring). This constraint is sacred.
- Completion > perfection. Ship the 80%.
- The Stable is not a graveyard - it's rest for future rides.
- Sustainable pace prevents burnout.

WHEN ASKED "WHAT SHOULD I WORK ON?":
1. Check today's calendar for meetings and commitments
2. Calculate available focus time
3. Consider Spirit Scores (highest score = most impactful)
4. Factor in deadlines and overdue tasks
5. Suggest specific tasks, not just projects
6. Include time estimates

WHEN ASKED ABOUT PRIORITIZATION:
1. Never recommend more than 3 horses in Rodeo Ring
2. Suggest moving completed/stalled horses to Stable
3. Identify horses in Chute ready to promote
4. Be honest about overload - recommend removing before adding

COMMUNICATION STYLE:
- Concise, actionable advice
- Western metaphors welcome but not forced
- Direct about hard truths (overload, unrealistic goals)
- Encouraging but not sycophantic
```

### API Route Structure

```typescript
// app/api/ai/route.ts

import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  const { action, context } = await req.json();

  const client = new Anthropic();

  // Context includes: horses, calendar, tasks, history
  const systemPrompt = buildRanchHandPrompt(context);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      { role: 'user', content: buildUserMessage(action, context) }
    ]
  });

  return Response.json({
    advice: response.content[0].text,
    usage: response.usage
  });
}

function buildUserMessage(action: string, context: Context): string {
  switch (action) {
    case 'daily_plan':
      return `It's ${new Date().toLocaleTimeString()}. What should I focus on today?

Calendar: ${JSON.stringify(context.todaysMeetings)}
Rodeo Ring: ${JSON.stringify(context.rodeoRingHorses)}
Overdue Tasks: ${JSON.stringify(context.overdueTasks)}`;

    case 'prioritize':
      return `Help me decide which horses should be in my Rodeo Ring.

All Horses: ${JSON.stringify(context.allHorses)}
Current Saddle Load: ${context.saddleLoad}%`;

    case 'compare':
      return `Compare these horses: ${context.horsesToCompare.map(h => h.name).join(' vs ')}`;

    default:
      return action; // Free-form question
  }
}
```

---

## Build Order (The Path)

### Phase 0: Gun Relay (Day 1)
```
┌─────────────────────────────────────────────┐
│  Deploy Gun.js relay to Vercel Edge         │
│  This is the foundation for everything      │
└─────────────────────────────────────────────┘
```
- Create Vercel project for relay
- Deploy Gun.js Edge Function
- Test with simple read/write
- Document the relay URL

### Phase 1: gun-user-kit (Days 2-5)
```
┌─────────────────────────────────────────────┐
│  Build the auth package you'll never        │
│  have to build again                        │
└─────────────────────────────────────────────┘
```
- [ ] Initialize npm package with TypeScript
- [ ] Implement GunProvider context
- [ ] Implement useGunAuth (create/login/logout)
- [ ] Implement useGunData (CRUD operations)
- [ ] Build LoginForm and SignupForm components
- [ ] Build AuthGate wrapper
- [ ] Add offline support and sync status
- [ ] Write documentation and examples
- [ ] Publish to npm

### Phase 2: Project Triage + Gun.js (Days 6-8)
```
┌─────────────────────────────────────────────┐
│  Migrate from localStorage to Gun.js        │
│  Add user accounts and cross-device sync    │
└─────────────────────────────────────────────┘
```
- [ ] Install gun-user-kit
- [ ] Wrap app in GunProvider
- [ ] Migrate data model to Gun.js paths
- [ ] Add localStorage → Gun migration for existing users
- [ ] Implement login/signup flow
- [ ] Test cross-device sync
- [ ] Apply rodeo naming convention to UI

### Phase 3: MCP Configuration (Days 9-10)
```
┌─────────────────────────────────────────────┐
│  Connect external data sources              │
│  Gmail, Calendar, Memory                    │
└─────────────────────────────────────────────┘
```
- [ ] Configure @cocal/google-calendar-mcp
- [ ] Set up OAuth with Google Cloud Console
- [ ] Configure inbox-zero-mcp for Gmail
- [ ] Set up openmemory-mcp for persistent context
- [ ] Test MCP queries from Claude Desktop

### Phase 4: Claude AI Integration (Days 11-13)
```
┌─────────────────────────────────────────────┐
│  Add the Ranch Hand AI advisor              │
│  "What should I work on?"                   │
└─────────────────────────────────────────────┘
```
- [ ] Create /api/ai route
- [ ] Implement Ranch Hand system prompt
- [ ] Build chat interface in UI
- [ ] Connect MCP data to Claude context
- [ ] Add "Ask Ranch Hand" button to project cards
- [ ] Implement daily plan generation

### Phase 5: n8n Orchestration (Days 14-16)
```
┌─────────────────────────────────────────────┐
│  Enable proactive AI                        │
│  Morning briefings, reminders, webhooks     │
└─────────────────────────────────────────────┘
```
- [ ] Deploy n8n (Docker or Cloud)
- [ ] Connect Google Workspace
- [ ] Build Morning Briefing workflow
- [ ] Build webhook endpoint in Project Triage
- [ ] Create Meeting Prep workflow
- [ ] Create Weekly Review workflow

### Phase 6: Kanban Sprint System (Days 17-20)
```
┌─────────────────────────────────────────────┐
│  Break horses into rideable tasks           │
│  Daily iteration cycles                     │
└─────────────────────────────────────────────┘
```
- [ ] Add Task model to data structure
- [ ] Build task list UI per Horse
- [ ] Implement drag-and-drop TODO/DOING/DONE
- [ ] Add Sprint planning view
- [ ] Create "Today's Focus" filtered view
- [ ] Connect to Motion/Reclaim for scheduling

### Phase 7: Calendar AI Features (Days 21-24)
```
┌─────────────────────────────────────────────┐
│  Time intelligence                          │
│  Auto-schedule, protect focus time          │
└─────────────────────────────────────────────┘
```
- [ ] Integrate Motion API (or Reclaim)
- [ ] Show calendar in Project Triage sidebar
- [ ] Enable "Schedule this task" action
- [ ] Auto-protect focus time for Rodeo Ring
- [ ] Sync task completion back to calendar

### Phase 8: Polish & Open Source (Days 25-28)
```
┌─────────────────────────────────────────────┐
│  Production hardening                       │
│  Documentation, examples, release           │
└─────────────────────────────────────────────┘
```
- [ ] Error handling and edge cases
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Complete documentation
- [ ] Record demo video
- [ ] Open source release

---

## Cost Summary

| Component | Monthly | Notes |
|-----------|---------|-------|
| Vercel (Hobby) | $0 | Gun relay + app hosting |
| Claude API | ~$20-50 | Depends on usage |
| n8n Cloud | $24 | Or $0 self-hosted |
| Motion | $19 | Optional, for calendar AI |
| Gun.js | $0 | Open source |
| **Total** | **$43-93** | |

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Gun.js relay downtime | High | Multiple relay fallbacks, offline-first |
| Claude API rate limits | Medium | Caching, rate limiting in app |
| MCP auth token expiry | Medium | Refresh token handling, user notification |
| n8n complexity | Medium | Start with n8n Cloud, migrate to self-hosted later |
| Scope creep | High | Stick to phases, ship each before starting next |

---

## Success Criteria

**Phase 1 Complete When:**
- [ ] gun-user-kit published to npm
- [ ] Can `npm install gun-user-kit` in a fresh Next.js project
- [ ] Login/logout works across browser tabs
- [ ] Data persists across sessions

**Phase 2 Complete When:**
- [ ] Existing localStorage users can migrate
- [ ] Same projects appear on phone and desktop
- [ ] Offline edits sync when back online

**Phase 4 Complete When:**
- [ ] Can ask "What should I work on?" and get contextual answer
- [ ] AI knows about calendar and projects
- [ ] Response time < 3 seconds

**Full System Complete When:**
- [ ] Morning briefing arrives at 6:30 AM
- [ ] Can schedule tasks into calendar from Project Triage
- [ ] Team members can share a board
- [ ] Weekly review summarizes progress automatically

---

## The Elegant Insight

The entire system rests on one foundation: **gun-user-kit**.

Build it once. Build it right. Never build auth again.

Every future app you create - habit tracker, invoice tool, client portal - just does:

```jsx
import { GunProvider, AuthGate } from 'gun-user-kit';
```

Same login. Same identity. Data can flow between apps if you want it to.

That's the leverage. That's why auth comes first.

---

*"Wrangle your wild horses. Pick 3 to ride. Stable the rest."*
*"Let the Ranch Hand help you decide."*
