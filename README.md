# Project Triage

> Wrangle your wild horses. Pick 3 to ride. Stable the rest.

A brutally simple project prioritization tool for founders, builders, and robotics hackers running too many projects on a 3-thread brain.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## The Problem

You have too many projects. All of them are important. None of them are finished.

## The Solution

**Forced constraint**: Maximum 3 projects in your **Rodeo Ring** at any time. Everything else waits in the **Stable** — guilt-free.

---

## Features

| Feature | Description |
|---------|-------------|
| **Rodeo Ring** | Your 3 active focus projects — the horses you're riding |
| **In The Chute** | Up next, waiting at the gate |
| **The Stable** | Good ideas resting until their time comes |
| **Spirit Score** | Rate by Impact, Effort, Revenue, Excitement |
| **Wrangle 'Em** | Auto-sort algorithm picks your top 3 |
| **Saddle Load Meter** | Visual overload indicator |
| **Cross-Device Sync** | Gun.js powered real-time sync (coming soon) |
| **AI Ranch Hand** | Claude-powered strategic advisor (coming soon) |
| **Kanban Sprints** | Task breakdown with rapid iteration cycles (coming soon) |

---

## Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/project-triage.git
cd project-triage

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/project-triage)

---

## Philosophy

### The Three Laws of Triage

1. **3 Horses Max**: No new project enters the Rodeo Ring until one ships
2. **Stabling ≠ Abandoning**: Good ideas can wait in the Stable
3. **Shipped > Perfect**: 80% shipped beats 100% stuck in the chute

### The Spirit Score Formula

```
Spirit Score = ((Impact × 2) + (Excitement × 1.5) + (Revenue × 1.5) + ((10 - Effort) × 1)) / 6
```

- **Impact** weighs 2x because results matter most
- **Effort** is inverted — easier projects score higher
- **Excitement** prevents burnout on projects you hate

---

## Roadmap

### v1.0 — Current
- [x] Three-bucket system (Focus/Next/Parking)
- [x] Smart scoring with 4 dimensions
- [x] Auto-sort algorithm
- [x] Mental bandwidth meter
- [x] Local storage persistence
- [x] JSON export/import

### v2.0 — In Development
- [ ] Western/rodeo theme rename
- [ ] Gun.js user authentication
- [ ] Cross-device sync
- [ ] Team workspaces

### v3.0 — Planned
- [ ] AI strategic advisor (Claude integration)
- [ ] Kanban task breakdown
- [ ] Sprint planning
- [ ] Velocity tracking

See [PLANNING.md](PLANNING.md) for detailed architecture and [USER_STORIES.md](USER_STORIES.md) for feature breakdown.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Frontend | React 18 |
| Styling | Tailwind CSS |
| Auth (v2) | Gun.js + SEA |
| AI (v3) | Anthropic Claude API |
| Deploy | Vercel |

---

## Project Structure

```
project-triage/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main app component
│   └── globals.css        # Global styles
├── PLANNING.md            # Architecture & roadmap
├── USER_STORIES.md        # Feature specifications
├── CONTRIBUTING.md        # How to contribute
├── LICENSE                # MIT License
└── README.md              # You are here
```

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Good First Issues

Look for issues tagged with `good first issue` — they're designed for newcomers.

---

## Related Projects

### gun-user-kit

A reusable authentication module built on Gun.js that powers Project Triage's user management. Can be dropped into any Vercel project.

```bash
npm install gun-user-kit
```

```jsx
import { GunProvider, useGunUser } from 'gun-user-kit';

function App() {
  return (
    <GunProvider relay="https://your-relay.vercel.app/gun">
      <YourApp />
    </GunProvider>
  );
}
```

Repository: [github.com/YOUR_USERNAME/gun-user-kit](https://github.com/YOUR_USERNAME/gun-user-kit) (coming soon)

---

## FAQ

**Q: Why only 3 projects?**
A: Research shows humans can only effectively context-switch between 3-4 major tasks. We enforce the constraint so you actually finish things.

**Q: Can I increase the limit?**
A: You can fork and change it, but we don't recommend it. The constraint is the feature.

**Q: Where is my data stored?**
A: Currently in your browser's localStorage. v2 will add encrypted cloud sync via Gun.js.

**Q: Is this open source?**
A: Yes! MIT licensed. Fork it, modify it, make it yours.

---

## Support

- **Bug Reports**: [Open an issue](https://github.com/YOUR_USERNAME/project-triage/issues/new?template=bug_report.md)
- **Feature Requests**: [Open an issue](https://github.com/YOUR_USERNAME/project-triage/issues/new?template=feature_request.md)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/project-triage/discussions)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

```
MIT License

Copyright (c) 2024 Project Triage Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

- [Gun.js](https://gun.eco/) — Decentralized database powering sync
- [Anthropic Claude](https://anthropic.com/) — AI assistant integration
- [Vercel](https://vercel.com/) — Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) — Styling framework

---

*Built for founders who build at god speed but need gear reduction.*

**Wrangle your wild horses. Pick 3 to ride. Stable the rest.**
