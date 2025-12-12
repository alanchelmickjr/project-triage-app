# Build Order - The Path Forward

> "You're tired of building auth. Let's build it once, build it right, and never build it again."

This document provides the exact sequence of what to build and when. Follow it in order.

---

## The Two-Repository Strategy

You're building **two things at once** that work together:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   gun-user-kit (NEW REPO)          project-triage-app (THIS REPO)       │
│   ─────────────────────────         ────────────────────────────        │
│                                                                          │
│   Reusable auth package             Uses gun-user-kit                   │
│   Published to npm                  + MCP + Claude + n8n                │
│   Drop into any project             The command center                  │
│                                                                          │
│   Build this FIRST                  Build this SECOND                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Gun Relay Server (Day 1)

**Before anything else, you need the sync infrastructure.**

### 0.1 Create Vercel Project for Relay

```bash
# Create new directory for relay
mkdir gun-relay && cd gun-relay
npm init -y
npm install gun
```

### 0.2 Create Edge Function

Create `api/gun/route.js`:

```javascript
import Gun from 'gun';

export const config = {
  runtime: 'edge',
};

let gun;

export default async function handler(req) {
  if (!gun) {
    gun = Gun({
      web: req,
      radisk: false, // No file storage on edge
    });
  }

  return new Response('Gun relay running', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

### 0.3 Deploy to Vercel

```bash
vercel
# Note your URL: https://your-gun-relay.vercel.app
```

### 0.4 Test Connection

```javascript
// Quick test in browser console
const gun = Gun(['https://your-gun-relay.vercel.app/api/gun']);
gun.get('test').put({ hello: 'world' });
gun.get('test').on(data => console.log(data));
```

**Done when**: You can write and read data via the relay.

---

## Phase 1: gun-user-kit Package (Days 2-5)

### 1.1 Initialize Repository

```bash
mkdir gun-user-kit && cd gun-user-kit
npm init -y
npm install gun typescript @types/react react
npx tsc --init
```

### 1.2 Package.json Setup

```json
{
  "name": "gun-user-kit",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  },
  "peerDependencies": {
    "react": ">=17.0.0"
  },
  "dependencies": {
    "gun": "^0.2020.1240"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 1.3 Build in This Order

| Order | File | What It Does |
|-------|------|--------------|
| 1 | `src/GunProvider.tsx` | React context, Gun instance |
| 2 | `src/hooks/useGunAuth.ts` | create, login, logout, isAuth |
| 3 | `src/hooks/useGunData.ts` | get, put, on (reactive) |
| 4 | `src/hooks/useGunUser.ts` | user profile, preferences |
| 5 | `src/hooks/useGunSync.ts` | connection status |
| 6 | `src/components/AuthGate.tsx` | Protected route wrapper |
| 7 | `src/components/LoginForm.tsx` | Pre-built login UI |
| 8 | `src/components/SignupForm.tsx` | Pre-built signup UI |
| 9 | `src/index.ts` | Export everything |

### 1.4 Core Implementation Skeleton

**GunProvider.tsx**:
```tsx
import { createContext, useContext, useEffect, useState } from 'react';
import Gun from 'gun';
import 'gun/sea';

const GunContext = createContext(null);

export function GunProvider({ children, relay, appName }) {
  const [gun] = useState(() => Gun(relay));
  const [user] = useState(() => gun.user());

  return (
    <GunContext.Provider value={{ gun, user, appName }}>
      {children}
    </GunContext.Provider>
  );
}

export const useGun = () => useContext(GunContext);
```

**useGunAuth.ts**:
```tsx
import { useState, useEffect } from 'react';
import { useGun } from '../GunProvider';

export function useGunAuth() {
  const { user } = useGun();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user.recall({ sessionStorage: true }, () => {
      setIsAuthenticated(user.is ? true : false);
      setLoading(false);
    });
  }, []);

  const create = async (username, password) => {
    return new Promise((resolve, reject) => {
      user.create(username, password, (ack) => {
        if (ack.err) reject(ack.err);
        else resolve(ack);
      });
    });
  };

  const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      user.auth(username, password, (ack) => {
        if (ack.err) reject(ack.err);
        else {
          setIsAuthenticated(true);
          resolve(ack);
        }
      });
    });
  };

  const logout = () => {
    user.leave();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, create, login, logout };
}
```

### 1.5 Publish to npm

```bash
npm run build
npm publish
```

**Done when**: You can `npm install gun-user-kit` in a fresh project and log in.

---

## Phase 2: Project Triage + Gun.js (Days 6-8)

### 2.1 Install gun-user-kit

```bash
cd project-triage-app
npm install gun-user-kit
```

### 2.2 Wrap App in Provider

Update `app/layout.js`:

```jsx
import { GunProvider } from 'gun-user-kit';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GunProvider
          relay="https://your-gun-relay.vercel.app/api/gun"
          appName="project-triage"
        >
          {children}
        </GunProvider>
      </body>
    </html>
  );
}
```

### 2.3 Add Auth Flow to page.js

```jsx
import { useGunAuth, AuthGate, LoginForm } from 'gun-user-kit';

export default function ProjectTriage() {
  return (
    <AuthGate fallback={<LoginForm />}>
      <MainApp />
    </AuthGate>
  );
}

function MainApp() {
  // Existing project triage code, now with Gun.js data
}
```

### 2.4 Migrate Data Model

Replace localStorage with Gun.js:

```jsx
// OLD
localStorage.setItem('project-triage-data', JSON.stringify(projects));

// NEW
import { useGunData } from 'gun-user-kit';

const { data: projects, put } = useGunData('horses');
put(projectId, newProjectData);
```

### 2.5 Add localStorage Migration

For existing users:

```jsx
useEffect(() => {
  const oldData = localStorage.getItem('project-triage-data');
  if (oldData && isAuthenticated) {
    const parsed = JSON.parse(oldData);
    // Migrate to Gun.js
    parsed.forEach(project => {
      put(project.id, project);
    });
    localStorage.removeItem('project-triage-data');
  }
}, [isAuthenticated]);
```

### 2.6 Apply Rodeo Naming

Simple find-and-replace:
- "FOCUS NOW" → "Rodeo Ring"
- "NEXT UP" → "In The Chute"
- "PARKING LOT" → "The Stable"
- "UNSORTED" → "Wild Herd"
- "Auto Sort" → "Wrangle 'Em"
- "score" → "spiritScore"

**Done when**: Same horses appear on phone and desktop.

---

## Phase 3: MCP Configuration (Days 9-10)

### 3.1 Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project "project-triage-mcp"
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Download `credentials.json`

### 3.2 Install Calendar MCP

```bash
npm install @cocal/google-calendar-mcp
```

Configure in Claude Desktop settings:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["@cocal/google-calendar-mcp"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    }
  }
}
```

### 3.3 Install Gmail MCP (Optional)

```bash
npm install inbox-zero-mcp
```

### 3.4 Install Memory MCP

```bash
curl -sL https://raw.githubusercontent.com/mem0ai/mem0/main/scripts/install.sh | bash
```

### 3.5 Test MCP in Claude Desktop

Ask Claude:
- "What's on my calendar today?"
- "Do I have any meetings this afternoon?"

**Done when**: Claude can read your calendar.

---

## Phase 4: Claude AI Integration (Days 11-13)

### 4.1 Install Anthropic SDK

```bash
npm install @anthropic-ai/sdk
```

### 4.2 Create API Route

Create `app/api/ai/route.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const client = new Anthropic();

const RANCH_HAND_PROMPT = `You are the Ranch Hand, an AI strategic advisor...
[Full prompt from PLANNING.md]`;

export async function POST(req: Request) {
  const { question, context } = await req.json();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: RANCH_HAND_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Context: ${JSON.stringify(context)}\n\nQuestion: ${question}`
      }
    ]
  });

  return NextResponse.json({
    answer: response.content[0].text
  });
}
```

### 4.3 Build Chat Interface

Add to `page.js`:

```jsx
function RanchHandChat({ horses, calendar }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    const res = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({
        question,
        context: { horses, calendar }
      })
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div className="ranch-hand-chat">
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask the Ranch Hand..."
      />
      <button onClick={ask} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
}
```

### 4.4 Add Quick Actions

- "What should I work on today?" button
- "Compare these horses" when 2+ selected
- "I'm stuck" emergency button

**Done when**: "What should I work on?" returns contextual advice.

---

## Phase 5: n8n Orchestration (Days 14-16)

### 5.1 Deploy n8n

**Option A: n8n Cloud (Easier)**
- Sign up at [n8n.cloud](https://n8n.cloud)
- $24/month, no maintenance

**Option B: Self-Hosted (Free)**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 5.2 Connect Google Workspace

1. In n8n, add Google Calendar credential
2. Add Google Gmail credential
3. Test both connections

### 5.3 Build Morning Briefing Workflow

```
[Cron Trigger 6:30 AM]
    ↓
[Google Calendar: Get Today's Events]
    ↓
[HTTP Request: Get Project Triage Data]
    ↓
[Claude: Generate Briefing]
    ↓
[Pushover/ntfy: Send Notification]
```

### 5.4 Create Webhook Endpoint

Add to Project Triage `app/api/n8n/route.ts`:

```typescript
export async function POST(req: Request) {
  const { action, data } = await req.json();

  switch (action) {
    case 'briefing_generated':
      // Store latest briefing
      break;
    case 'calendar_updated':
      // Refresh calendar view
      break;
  }

  return NextResponse.json({ success: true });
}
```

**Done when**: Morning briefing arrives at 6:30 AM.

---

## Phase 6: Kanban Sprint System (Days 17-20)

### 6.1 Add Task Data Model

Update Gun.js schema:

```typescript
interface Task {
  id: string;
  horseId: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
}

// Store tasks under each horse
gun.user().get('horses').get(horseId).get('tasks').get(taskId).put(task);
```

### 6.2 Build Task List UI

```jsx
function TaskList({ horseId }) {
  const { data: tasks } = useGunData(`horses/${horseId}/tasks`);

  return (
    <div className="task-columns">
      <Column title="TODO" tasks={tasks.filter(t => t.status === 'todo')} />
      <Column title="DOING" tasks={tasks.filter(t => t.status === 'doing')} />
      <Column title="DONE" tasks={tasks.filter(t => t.status === 'done')} />
    </div>
  );
}
```

### 6.3 Add Drag-and-Drop

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

### 6.4 Build "Today's Focus" View

Filter to show only:
- Tasks from Rodeo Ring horses
- Tasks marked for today
- Overdue tasks

**Done when**: Can break horses into tasks and track progress.

---

## Phase 7: Calendar AI Features (Days 21-24)

### 7.1 Add Calendar Sidebar

Show today's schedule alongside horses:

```jsx
function CalendarSidebar({ events }) {
  return (
    <div className="calendar-sidebar">
      <h3>Today</h3>
      {events.map(event => (
        <div key={event.id} className="event">
          <span className="time">{event.start}</span>
          <span className="title">{event.summary}</span>
        </div>
      ))}
    </div>
  );
}
```

### 7.2 Implement Time Blocking

"Block 2 hours for [Horse]" button:

```typescript
async function blockTime(horseId: string, hours: number) {
  // Find next available slot
  const freeSlot = await findFreeSlot(hours);

  // Create calendar event
  await createCalendarEvent({
    summary: `Focus: ${horse.name}`,
    start: freeSlot.start,
    end: freeSlot.end,
    description: `Working on ${horse.name} - Spirit Score: ${horse.spiritScore}`
  });

  // Link to horse
  await linkEventToHorse(event.id, horseId);
}
```

### 7.3 Connect to Motion (Optional)

If using Motion for AI scheduling:

```bash
npm install motion-sdk
```

**Done when**: Can schedule focus time directly from Project Triage.

---

## Phase 8: Polish & Ship (Days 25-28)

### 8.1 Error Handling

- Offline fallbacks
- API error states
- Loading indicators

### 8.2 Mobile Optimization

- Touch-friendly drag-and-drop
- Responsive layout
- PWA manifest

### 8.3 Documentation

Update README with:
- Screenshots
- Demo video
- Setup instructions

### 8.4 Open Source Release

- [ ] Final README polish
- [ ] CHANGELOG for v1.0
- [ ] GitHub release
- [ ] Product Hunt launch?

**Done when**: Someone can clone, deploy, and use it in 10 minutes.

---

## Quick Reference: What Depends on What

```
                    Gun Relay
                        │
                        ▼
                  gun-user-kit
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
    Project Triage   Future App   Future App
          │
    ┌─────┼─────┐
    │     │     │
    ▼     ▼     ▼
   MCP  Claude  n8n
    │     │     │
    └─────┼─────┘
          │
          ▼
    Calendar AI
```

---

## The Golden Rule

**Build gun-user-kit first. Everything else depends on it.**

Once that's done, you'll never build auth again. Every app you make - Project Triage, habit tracker, invoice tool, client portal - just imports the same package.

That's the leverage. That's why this order matters.

---

*"Wrangle your wild horses. Pick 3 to ride. Stable the rest."*

**Now go build.**
