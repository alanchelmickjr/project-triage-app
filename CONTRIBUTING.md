# Contributing to Project Triage

First off, thanks for wanting to contribute! Every contribution matters — whether it's fixing a typo or building a major feature.

## Code of Conduct

Be kind. Be helpful. We're all here to build cool stuff.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, search existing issues to avoid duplicates.

**Good bug reports include:**
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

### Suggesting Features

Feature requests are welcome! Open an issue with:
- Clear description of the feature
- Why it would be useful
- How it fits with the project philosophy (constraint-based prioritization)

### Pull Requests

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/project-triage.git
   cd project-triage
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes locally

4. **Commit**
   ```bash
   git commit -m "Add: description of feature"
   # or
   git commit -m "Fix: description of bug fixed"
   ```

5. **Push & PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter (if configured)
npm run lint
```

## Code Style

- **React**: Functional components with hooks
- **Naming**: camelCase for functions/variables, PascalCase for components
- **Files**: kebab-case for file names
- **CSS**: Tailwind utility classes, avoid custom CSS when possible

## Commit Message Format

```
Type: Short description

Longer explanation if needed
```

**Types:**
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Enhancement to existing feature
- `Remove:` Removing code/features
- `Refactor:` Code restructuring
- `Docs:` Documentation only
- `Style:` Formatting, no code change

## What We're Looking For

### High Priority
- Gun.js integration (see [PLANNING.md](PLANNING.md))
- AI assistant features
- Kanban task system
- Mobile UX improvements

### Good First Issues
- UI text updates (rodeo theme)
- Accessibility improvements
- Documentation improvements
- Bug fixes

## Questions?

Open a Discussion on GitHub or comment on an existing issue.

---

*Thanks for helping make Project Triage better!*
