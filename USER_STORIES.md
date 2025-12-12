# Project Triage - User Stories

## Overview

This document contains user stories for the complete Life OS system, organized by epic. Each story follows the format:
> **As a** [user type], **I want** [goal], **so that** [benefit].

**Priority**: `P0` (Critical) | `P1` (High) | `P2` (Medium) | `P3` (Nice-to-have)
**Complexity**: `XS` | `S` | `M` | `L` | `XL`

---

## Epic 1: Gun User Kit (Reusable Auth Package)

### Authentication

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| GUK-001 | **As a** developer, **I want** to install gun-user-kit via npm, **so that** I can add auth to my project in minutes. | P0 | S |
| GUK-002 | **As a** developer, **I want** to wrap my app in a GunProvider, **so that** all components can access auth state. | P0 | M |
| GUK-003 | **As a** user, **I want** to create an account with username/password, **so that** I can save my data securely. | P0 | M |
| GUK-004 | **As a** user, **I want** to log in to my account, **so that** I can access my data. | P0 | S |
| GUK-005 | **As a** user, **I want** to log out, **so that** I can secure my session on shared devices. | P0 | XS |
| GUK-006 | **As a** user, **I want** to stay logged in across browser refreshes, **so that** I don't re-authenticate constantly. | P0 | S |
| GUK-007 | **As a** user, **I want** to reset my password, **so that** I can recover my account if I forget credentials. | P1 | M |
| GUK-008 | **As a** developer, **I want** pre-built LoginForm and SignupForm components, **so that** I don't build auth UI from scratch. | P1 | M |
| GUK-009 | **As a** developer, **I want** an AuthGate component, **so that** I can protect routes requiring authentication. | P1 | S |

### Data Management

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| GUK-010 | **As a** developer, **I want** a useGunData hook, **so that** I can read/write user-specific data easily. | P0 | M |
| GUK-011 | **As a** user, **I want** my data encrypted with my credentials, **so that** only I can read it. | P0 | M |
| GUK-012 | **As a** user, **I want** my data to sync across all my devices, **so that** I can work from anywhere. | P0 | L |
| GUK-013 | **As a** developer, **I want** the data layer to work offline, **so that** users can use the app without internet. | P1 | M |
| GUK-014 | **As a** user, **I want** my offline changes to sync when I reconnect, **so that** I don't lose work. | P1 | M |

### Teams & Sharing

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| GUK-015 | **As a** user, **I want** to create a team/workspace, **so that** I can collaborate with others. | P1 | L |
| GUK-016 | **As a** team owner, **I want** to invite others via a link, **so that** they can join my workspace. | P1 | M |
| GUK-017 | **As a** team member, **I want** to see shared data in real-time, **so that** I stay in sync with my team. | P1 | M |
| GUK-018 | **As a** team owner, **I want** to set permissions (owner/editor/viewer), **so that** I can control access levels. | P2 | L |
| GUK-019 | **As a** team owner, **I want** to remove members, **so that** I can manage who has access. | P2 | S |

### Relay Server

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| GUK-020 | **As a** developer, **I want** a Gun relay that deploys to Vercel Edge, **so that** I have a reliable sync server. | P0 | M |
| GUK-021 | **As a** developer, **I want** to configure multiple relay servers, **so that** I have failover options. | P1 | S |
| GUK-022 | **As a** developer, **I want** the relay to handle thousands of connections, **so that** it scales with my app. | P2 | L |

---

## Epic 2: Project Triage - Core Enhancements

### Western Theme Rebranding

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| PT-001 | **As a** user, **I want** the UI to use rodeo terminology, **so that** it feels cohesive and fun. | P1 | S |
| PT-002 | **As a** user, **I want** "FOCUS NOW" renamed to "Rodeo Ring", **so that** it matches the horse metaphor. | P1 | XS |
| PT-003 | **As a** user, **I want** "NEXT UP" renamed to "In The Chute", **so that** it uses authentic rodeo language. | P1 | XS |
| PT-004 | **As a** user, **I want** "PARKING LOT" renamed to "The Stable", **so that** it fits the horse theme. | P1 | XS |
| PT-005 | **As a** user, **I want** "UNSORTED" renamed to "Wild Herd", **so that** new projects feel untamed. | P1 | XS |
| PT-006 | **As a** user, **I want** "Auto Sort" renamed to "Wrangle 'Em", **so that** the action feels thematic. | P1 | XS |
| PT-007 | **As a** user, **I want** the score called "Spirit Score", **so that** it feels like evaluating a horse's fire. | P2 | XS |
| PT-008 | **As a** user, **I want** western-themed colors and icons, **so that** the app has a distinct visual identity. | P2 | M |

### User Management Integration

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| PT-009 | **As a** user, **I want** to create an account in Project Triage, **so that** my projects are saved securely. | P0 | M |
| PT-010 | **As a** user, **I want** to log in and see my projects, **so that** I can continue where I left off. | P0 | S |
| PT-011 | **As a** user, **I want** my projects synced to my phone, **so that** I can check priorities on the go. | P0 | M |
| PT-012 | **As a** user, **I want** to use the app without an account (guest mode), **so that** I can try it before committing. | P1 | S |
| PT-013 | **As a** guest user, **I want** to upgrade to a full account without losing data, **so that** my trial work is preserved. | P1 | M |

### Team Collaboration

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| PT-014 | **As a** team lead, **I want** to create a shared project board, **so that** my team can see priorities together. | P1 | L |
| PT-015 | **As a** team member, **I want** to see real-time updates when others change projects, **so that** I stay in sync. | P1 | M |
| PT-016 | **As a** team lead, **I want** to assign horses to team members, **so that** ownership is clear. | P2 | M |
| PT-017 | **As a** team member, **I want** to comment on projects, **so that** we can discuss priorities. | P2 | M |
| PT-018 | **As a** user, **I want** both personal and team boards, **so that** I can separate work and personal projects. | P2 | M |

---

## Epic 3: Ranch Hand AI (Claude Integration)

### Chat Interface

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| AI-001 | **As a** user, **I want** to open a chat panel to talk to the Ranch Hand AI, **so that** I can ask for strategic advice. | P1 | M |
| AI-002 | **As a** user, **I want** the AI to know about my current horses, **so that** advice is contextual. | P1 | M |
| AI-003 | **As a** user, **I want** the chat history saved, **so that** I can reference past conversations. | P2 | S |
| AI-004 | **As a** user, **I want** to ask questions in natural language, **so that** I don't need to learn commands. | P0 | S |

### Prioritization Advice

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| AI-005 | **As a** user, **I want** to ask "Which horse should I focus on?", **so that** I get data-driven suggestions. | P1 | M |
| AI-006 | **As a** user, **I want** the AI to explain its recommendations, **so that** I understand the reasoning. | P1 | S |
| AI-007 | **As a** user, **I want** to ask "Compare Horse A vs Horse B", **so that** I can make informed tradeoffs. | P1 | M |
| AI-008 | **As a** user, **I want** the AI to suggest scoring adjustments, **so that** I can refine my prioritization. | P2 | M |
| AI-009 | **As a** user, **I want** the AI to warn me when I'm overloaded, **so that** I avoid burnout. | P1 | S |

### Timeline & Planning

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| AI-010 | **As a** user, **I want** the AI to generate a weekly plan for my Rodeo Ring horses, **so that** I have clear milestones. | P1 | L |
| AI-011 | **As a** user, **I want** to ask "What should I do today?", **so that** I get actionable daily tasks. | P0 | M |
| AI-012 | **As a** user, **I want** the AI to create a 30/60/90 day roadmap, **so that** I have longer-term direction. | P2 | L |
| AI-013 | **As a** user, **I want** the AI to identify risks in my project portfolio, **so that** I can mitigate them. | P2 | M |

### Decision Support

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| AI-014 | **As a** user, **I want** to ask "I'm stuck, what should I do?", **so that** I get unstuck quickly. | P1 | M |
| AI-015 | **As a** user, **I want** the AI to notice when I'm overloaded and suggest rebalancing, **so that** I avoid burnout. | P2 | M |
| AI-016 | **As a** user, **I want** the AI to remind me about stale horses in The Stable, **so that** I don't forget good ideas. | P3 | S |

---

## Epic 4: Calendar AI & MCP Integration

### Calendar Connection

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| CAL-001 | **As a** user, **I want** to connect my Google Calendar, **so that** the AI knows my schedule. | P0 | M |
| CAL-002 | **As a** user, **I want** to connect my Outlook Calendar, **so that** the AI knows my work schedule. | P1 | M |
| CAL-003 | **As a** user, **I want** to see today's meetings in Project Triage, **so that** I can plan around them. | P1 | M |
| CAL-004 | **As a** user, **I want** the calendar view to show free/busy time, **so that** I know when I can focus. | P1 | S |
| CAL-005 | **As a** user, **I want** to connect multiple calendars, **so that** I see my complete schedule. | P2 | M |

### Time Intelligence

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| CAL-006 | **As a** user, **I want** the AI to calculate my available focus time today, **so that** I know how much I can accomplish. | P1 | M |
| CAL-007 | **As a** user, **I want** the AI to suggest which horse to work on based on available time, **so that** I maximize my day. | P1 | M |
| CAL-008 | **As a** user, **I want** to see "2 hours before your 2pm meeting" suggestions, **so that** I use gaps effectively. | P2 | M |
| CAL-009 | **As a** user, **I want** the AI to warn me if I'm double-booked, **so that** I can reschedule. | P2 | S |

### Time Blocking

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| CAL-010 | **As a** user, **I want** to schedule a task directly into my calendar, **so that** I protect time for important work. | P1 | M |
| CAL-011 | **As a** user, **I want** to click "Block 2 hours for VLA Robot", **so that** focus time appears in my calendar. | P1 | M |
| CAL-012 | **As a** user, **I want** the AI to auto-schedule tasks into open slots, **so that** I don't have to manually plan. | P2 | L |
| CAL-013 | **As a** user, **I want** protected "focus time" for Rodeo Ring horses, **so that** meetings don't steal all my time. | P2 | M |
| CAL-014 | **As a** user, **I want** the calendar blocks linked to horses, **so that** I can track time per project. | P2 | M |

### Gmail Integration

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| CAL-015 | **As a** user, **I want** to connect my Gmail, **so that** the AI knows about important emails. | P1 | M |
| CAL-016 | **As a** user, **I want** the AI to flag emails that need replies, **so that** I don't forget to respond. | P2 | M |
| CAL-017 | **As a** user, **I want** the AI to link emails to horses, **so that** context is connected. | P3 | L |

### Motion/Reclaim Integration

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| CAL-018 | **As a** user, **I want** to connect Motion for AI scheduling, **so that** tasks auto-reschedule when things change. | P2 | L |
| CAL-019 | **As a** user, **I want** Motion to know about my horses, **so that** it schedules the right priorities. | P2 | M |
| CAL-020 | **As a** user, **I want** Zoom/Meet/Teams links auto-detected, **so that** I know how to join meetings. | P2 | S |

---

## Epic 5: N8N Orchestration & Proactive AI

### Morning Briefing

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| N8N-001 | **As a** user, **I want** a morning briefing at 6:30 AM, **so that** I start each day with clarity. | P1 | L |
| N8N-002 | **As a** user, **I want** the briefing to include today's meetings, **so that** I know my schedule. | P1 | S |
| N8N-003 | **As a** user, **I want** the briefing to include suggested focus, **so that** I know what to work on. | P1 | M |
| N8N-004 | **As a** user, **I want** the briefing to highlight overdue tasks, **so that** I address them. | P1 | S |
| N8N-005 | **As a** user, **I want** to customize briefing time, **so that** it fits my schedule. | P2 | S |

### Proactive Reminders

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| N8N-006 | **As a** user, **I want** a reminder 30 min before meetings, **so that** I can prepare. | P2 | M |
| N8N-007 | **As a** user, **I want** the reminder to include prep suggestions if the meeting relates to a horse, **so that** I'm ready. | P2 | M |
| N8N-008 | **As a** user, **I want** weekly review prompts on Sunday, **so that** I reflect on progress. | P2 | M |
| N8N-009 | **As a** user, **I want** stale horse alerts for horses not touched in 30 days, **so that** I don't forget them. | P3 | S |

### Webhooks & Sync

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| N8N-010 | **As a** developer, **I want** a webhook endpoint in Project Triage, **so that** n8n can push updates. | P1 | M |
| N8N-011 | **As a** user, **I want** task completion to trigger calendar updates, **so that** my schedule reflects reality. | P2 | M |
| N8N-012 | **As a** user, **I want** new calendar events to notify Project Triage, **so that** I see schedule changes. | P2 | M |

### Notification Delivery

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| N8N-013 | **As a** user, **I want** briefings delivered via push notification, **so that** I see them on my phone. | P1 | M |
| N8N-014 | **As a** user, **I want** to choose notification method (push, email, Slack), **so that** I get alerts where I want them. | P2 | M |
| N8N-015 | **As a** user, **I want** quiet hours where no notifications come, **so that** I can rest. | P3 | S |

---

## Epic 6: Kanban Sprint System

### Task Management

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| KAN-001 | **As a** user, **I want** to add tasks to each horse, **so that** I can break down work. | P1 | M |
| KAN-002 | **As a** user, **I want** to drag tasks between TODO/DOING/DONE, **so that** I can track progress visually. | P1 | M |
| KAN-003 | **As a** user, **I want** to see tasks in a kanban board view, **so that** I see all work at a glance. | P1 | L |
| KAN-004 | **As a** user, **I want** to expand/collapse horse tasks inline, **so that** I can focus on one project at a time. | P1 | M |
| KAN-005 | **As a** user, **I want** to mark tasks complete with a click, **so that** I get the dopamine hit quickly. | P0 | XS |

### Sprint Planning

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| KAN-006 | **As a** user, **I want** to set weekly sprint goals for each Rodeo Ring horse, **so that** I have clear targets. | P1 | M |
| KAN-007 | **As a** user, **I want** to see sprint progress (X of Y tasks done), **so that** I know if I'm on track. | P1 | S |
| KAN-008 | **As a** user, **I want** a "Start Sprint" and "End Sprint" action, **so that** I have clear iteration boundaries. | P2 | M |
| KAN-009 | **As a** user, **I want** to see my velocity over time, **so that** I can estimate future sprints better. | P2 | L |

### Daily Workflow

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| KAN-010 | **As a** user, **I want** a "Today's Focus" view showing just today's tasks, **so that** I minimize distractions. | P1 | M |
| KAN-011 | **As a** user, **I want** a daily standup prompt (What did I do? What will I do? Blockers?), **so that** I stay accountable. | P2 | M |
| KAN-012 | **As a** user, **I want** to flag a task as blocked with a reason, **so that** I know what needs unblocking. | P2 | S |

### VLA Rapid Prototyping

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| KAN-013 | **As a** robotics developer, **I want** to track build/test/learn cycles per task, **so that** I can iterate rapidly. | P2 | M |
| KAN-014 | **As a** user, **I want** to log learnings on each task, **so that** I capture knowledge during iteration. | P2 | S |
| KAN-015 | **As a** user, **I want** a "Ship It" button that marks a milestone complete and prompts for next iteration, **so that** I keep momentum. | P2 | M |

---

## Epic 7: Data & Export

### Import/Export

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| DAT-001 | **As a** user, **I want** to export all my data as JSON, **so that** I have a backup. | P0 | S |
| DAT-002 | **As a** user, **I want** to import data from a JSON file, **so that** I can restore from backup. | P0 | S |
| DAT-003 | **As a** user, **I want** to export a summary as PDF, **so that** I can share my roadmap with stakeholders. | P2 | L |
| DAT-004 | **As a** user, **I want** to export to CSV, **so that** I can analyze in Excel/Sheets. | P3 | M |

### Data Migration

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| DAT-005 | **As an** existing user, **I want** my localStorage data migrated to Gun.js when I create an account, **so that** I don't lose my projects. | P0 | M |
| DAT-006 | **As a** developer, **I want** clear data migration scripts, **so that** I can handle schema changes gracefully. | P1 | M |

---

## Epic 8: Open Source Release

### Documentation

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| OSS-001 | **As a** potential user, **I want** a clear README with screenshots, **so that** I understand what the app does. | P0 | M |
| OSS-002 | **As a** developer, **I want** API documentation for gun-user-kit, **so that** I can integrate it correctly. | P0 | L |
| OSS-003 | **As a** contributor, **I want** CONTRIBUTING.md with setup instructions, **so that** I can contribute code. | P1 | S |
| OSS-004 | **As a** community member, **I want** a CODE_OF_CONDUCT.md, **so that** I know the community standards. | P1 | XS |
| OSS-005 | **As a** security researcher, **I want** a SECURITY.md with disclosure policy, **so that** I can report vulnerabilities responsibly. | P1 | XS |

### Repository Setup

| ID | Story | Priority | Complexity |
|----|-------|----------|------------|
| OSS-006 | **As a** maintainer, **I want** issue templates, **so that** bug reports have necessary info. | P1 | S |
| OSS-007 | **As a** maintainer, **I want** PR templates, **so that** contributions are consistent. | P1 | S |
| OSS-008 | **As a** user, **I want** a CHANGELOG.md, **so that** I can see what's new in each release. | P1 | S |
| OSS-009 | **As a** developer, **I want** example projects, **so that** I can see how to use gun-user-kit. | P1 | M |

---

## Priority Summary

| Epic | P0 | P1 | P2 | P3 | Total |
|------|----|----|----|----|-------|
| Gun User Kit | 8 | 7 | 4 | 0 | 19 |
| Project Triage Core | 3 | 10 | 5 | 0 | 18 |
| Ranch Hand AI | 2 | 9 | 5 | 1 | 17 |
| Calendar AI & MCP | 1 | 10 | 8 | 1 | 20 |
| N8N Orchestration | 0 | 6 | 7 | 2 | 15 |
| Kanban Sprint | 1 | 7 | 7 | 0 | 15 |
| Data & Export | 2 | 1 | 1 | 1 | 5 |
| Open Source | 2 | 6 | 0 | 0 | 8 |
| **Total** | **19** | **56** | **37** | **5** | **117** |

---

## Implementation Sprints

### Sprint 1: Auth Foundation (Week 1)
**Focus**: gun-user-kit core functionality

| Stories | Count |
|---------|-------|
| GUK-001 → GUK-006 | 6 |
| GUK-010, GUK-011 | 2 |
| GUK-020 | 1 |
| **Total** | **9** |

**Deliverable**: Published npm package with basic auth

### Sprint 2: Project Triage + Gun.js (Week 2)
**Focus**: Integrate auth, migrate data

| Stories | Count |
|---------|-------|
| PT-009 → PT-011 | 3 |
| DAT-005 | 1 |
| PT-001 → PT-007 | 7 |
| **Total** | **11** |

**Deliverable**: Cross-device sync working, rodeo naming

### Sprint 3: Calendar Connection (Week 3)
**Focus**: MCP integration, calendar view

| Stories | Count |
|---------|-------|
| CAL-001 → CAL-004 | 4 |
| CAL-006, CAL-007 | 2 |
| **Total** | **6** |

**Deliverable**: Calendar visible in app, AI knows schedule

### Sprint 4: Ranch Hand AI (Week 4)
**Focus**: Claude integration, chat interface

| Stories | Count |
|---------|-------|
| AI-001 → AI-004 | 4 |
| AI-005 → AI-007 | 3 |
| AI-010, AI-011 | 2 |
| **Total** | **9** |

**Deliverable**: "What should I work on?" works

### Sprint 5: n8n & Proactive (Week 5)
**Focus**: Morning briefings, webhooks

| Stories | Count |
|---------|-------|
| N8N-001 → N8N-004 | 4 |
| N8N-010 | 1 |
| N8N-013 | 1 |
| **Total** | **6** |

**Deliverable**: Morning briefing arrives daily

### Sprint 6: Kanban Basics (Week 6)
**Focus**: Task management

| Stories | Count |
|---------|-------|
| KAN-001 → KAN-005 | 5 |
| KAN-006, KAN-007 | 2 |
| KAN-010 | 1 |
| **Total** | **8** |

**Deliverable**: Tasks with drag-and-drop

### Sprint 7: Time Blocking (Week 7)
**Focus**: Calendar write-back

| Stories | Count |
|---------|-------|
| CAL-010 → CAL-014 | 5 |
| **Total** | **5** |

**Deliverable**: Schedule tasks into calendar

### Sprint 8: Polish & Ship (Week 8)
**Focus**: Open source release

| Stories | Count |
|---------|-------|
| OSS-001 → OSS-009 | 9 |
| DAT-001, DAT-002 | 2 |
| **Total** | **11** |

**Deliverable**: Public release

---

## Acceptance Criteria Template

**Example: CAL-001 (Connect Google Calendar)**

```
Given I am logged into Project Triage
When I click "Connect Google Calendar"
Then I am redirected to Google OAuth
And I grant calendar permissions
And I am redirected back to Project Triage
And I see "Google Calendar connected" confirmation
And my today's events appear in the calendar sidebar

Edge Cases:
- User denies permissions → Show "Calendar not connected" with retry
- Token expires → Auto-refresh or prompt re-auth
- Multiple Google accounts → Allow selection during OAuth
```

**Example: AI-011 (What should I do today?)**

```
Given I have horses in my Rodeo Ring
And my calendar is connected
When I ask "What should I work on today?"
Then the Ranch Hand responds within 3 seconds
And the response includes:
  - Today's meeting summary
  - Available focus time calculation
  - Specific task suggestions
  - Time estimates for each suggestion
And the response considers Spirit Scores
And the response never suggests more than 3 focus horses
```

---

## The Meta-Story

> **As a** high-velocity founder building multiple things at once,
> **I want** a single command center that knows my calendar, my projects, and my priorities,
> **so that** I can ask "What should I work on?" and get an actionable answer—every single day.

This is the north star. Every story ladders up to this experience.

---

*"Every horse in your stable deserves attention. Pick 3 to ride. Let the Ranch Hand help you wrangle the rest."*
