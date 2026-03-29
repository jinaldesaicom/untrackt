# UnTrackt

124+ free browser-based tools.
Zero tracking. Zero accounts.
100% private.

Live: https://untrackt.com

## What is UnTrackt?

UnTrackt is a privacy-first static web app that provides practical tools for developers, students, freelancers, finance workflows, health estimations, and daily utility tasks.

Every tool runs in the browser. Inputs are processed locally. There is no backend account system and no analytics tracking.

## Features

- 88 tools across 6 categories
- Runs 100% in the browser
- No data collected or transmitted
- PWA support with offline capability
- Dark mode
- Mobile responsive
- Local favorites and personal local usage stats

## Categories

| Category | Tools | Description |
|----------|-------|-------------|
| Dev | 18 | Developer utilities |
| Student | 13 | Academic tools |
| Freelance | 12 | Business tools |
| Finance | 15 | Financial calculators |
| Health | 15 | Health estimators |
| General | 15 | Everyday utilities |

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS v3
- React Router v6
- react-helmet-async
- vite-plugin-pwa
- Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0

### Installation

```bash
git clone https://github.com/jinaldesaicom/untrackt.git
cd untrackt
npm install
npm run dev
```

Open http://localhost:5173

### Available Scripts

| Command | Description |
|---------|-------------|
| npm run dev | Start dev server |
| npm run build | Production build |
| npm run preview | Preview build |
| npm test | Watch mode tests |
| npm run test:run | Run all tests once |
| npm run test:ui | Visual test UI |
| npm run test:coverage | Coverage report |
| npm run analyze | Bundle analysis |

## Adding a New Tool

1. Create a component in src/tools/{category}/ToolName.jsx
2. Add an entry to src/data/tools.js
3. Add tests in src/tests/tools/{category}/
4. Tool appears automatically in search, category pages, and routes

## Privacy Principles

- No analytics and no tracking pixels
- No cookies
- localStorage is used only for local preferences and local-only usage stats
- All computation stays in the browser
- Open source and auditable behavior

## Deployment

Hosted on Cloudflare Pages.
Auto-deploys from the main branch.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## Security

To report a vulnerability, please see [SECURITY.md](SECURITY.md).

## License

[MIT License](LICENSE)
