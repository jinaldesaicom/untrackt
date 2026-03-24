# UnTrackt

UnTrackt is a privacy-first collection of browser-based utility tools built with React and Vite.

The project focuses on a simple promise:

- no accounts
- no backend
- no tracking
- no data leaving the browser

Every tool runs entirely on the client side.

## Overview

UnTrackt groups practical tools into six categories:

- Dev Tools
- Student
- Freelance
- General
- Health
- Finance

The current implementation includes 18 tools with category pages, search, related tool discovery, and lazy-loaded tool routes.

## Privacy Model

UnTrackt is designed to be fully client-side.

- No user input is sent to a server.
- No account or authentication flow exists.
- No tool data is persisted remotely.
- Sensitive utilities like password generation and UUID generation use browser APIs directly.

This aligns with the in-app message shown throughout the product:

> 100% private. This tool runs entirely in your browser. No data is sent to any server. Nothing is stored or shared.

## Implemented Tools

### Dev Tools

- JSON Formatter
- Base64 Tool
- UUID Generator

### Student

- GPA Calculator
- Word Counter
- Pomodoro Timer

### Freelance

- Hourly Rate Calculator
- Meeting Cost Calculator
- Working Days Calculator

### General

- Password Generator
- QR Code Generator
- Tip & Bill Splitter

### Health

- BMR Calculator
- Water Intake Calculator
- Sleep Cycle Calculator

### Finance

- Compound Interest Calculator
- Loan / EMI Calculator
- FIRE Number Calculator

## Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- Tailwind CSS 3
- Vitest
- React Testing Library
- jsdom
- lucide-react
- qrcode.react

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Testing

This project uses Vitest with React Testing Library.

Available scripts:

```bash
npm test
npm run test:run
npm run test:ui
npm run test:coverage
```

Current status:

- 23 test files
- 128 passing tests

Coverage is configured with text and HTML reporters.

## Project Structure

```text
.
├─ public/
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ pages/
│  ├─ tests/
│  └─ tools/
│     ├─ dev/
│     ├─ finance/
│     ├─ freelance/
│     ├─ general/
│     ├─ health/
│     └─ student/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## App Architecture

- Tool metadata is defined centrally in [src/data/tools.js](src/data/tools.js).
- Routes are defined in [src/App.jsx](src/App.jsx).
- Tool pages are lazy-loaded for better bundle behavior.
- Categories and tool cards are generated from the shared tool registry rather than hardcoded route-by-route.

## Search and Navigation

The app includes:

- homepage search
- category browsing
- direct tool routes
- related tools per category

This makes the site easy to expand as more tools are added.

## Scripts

Defined in [package.json](package.json):

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm test` - start Vitest in watch mode
- `npm run test:run` - run tests once
- `npm run test:ui` - open Vitest UI
- `npm run test:coverage` - run tests with coverage output

## Notes for Contributors

- Keep tools fully client-side unless the privacy model is intentionally changed.
- Prefer adding new tools through the shared registry in [src/data/tools.js](src/data/tools.js).
- Match the existing design language and route structure.
- Add tests for every new tool and route-level behavior.

## Roadmap Ideas

- Add more tools to match the broader product direction hinted by the homepage copy.
- Improve coverage in lower-tested UI flows such as QR generation edge cases and advanced timer branches.
- Add deployment documentation for GitHub Pages, Vercel, or Netlify.

## License

No license file is currently included in this repository.
