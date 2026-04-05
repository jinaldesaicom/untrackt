# UnTrackt

228+ free browser-based tools. 7 resource directories. Zero tracking. Zero accounts. 100% private.

[![Website](https://img.shields.io/website?label=untrackt.com&style=for-the-badge&url=https%3A%2F%2Funtrackt.com)](https://untrackt.com)

[![Sponsor](https://img.shields.io/github/sponsors/jinaldesaicom?style=flat&logo=github&label=Sponsor)](https://github.com/sponsors/jinaldesaicom)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## What is UnTrackt?

UnTrackt is a privacy-first static web app packed with practical tools and curated resource directories for developers, students, freelancers, project managers, and anyone who values privacy. Every tool runs entirely in the browser — no data leaves your device, no accounts are needed, and there is zero analytics tracking.

## Features

- **228 tools** across **12 categories**
- **7 resource directories** with 850+ curated links
- Runs 100% client-side in the browser
- No data collected or transmitted
- PWA support with offline capability
- Dark mode
- Mobile responsive
- Fuzzy search across all tools and resources
- Local favorites and personal usage stats (stored only in your browser)
- Wiki with tool documentation
- Blog with tips and guides
- SEO-optimized with structured data

---

## Tool Categories

| Category | Tools | Examples |
|----------|------:|---------|
| Dev Tools | 20 | JSON formatter, Base64 encoder, UUID generator, regex tester, JWT decoder |
| Maths & Science | 38 | Matrix calculator, unit converter, physics/chemistry/biology calculators |
| General | 22 | Password generator, QR code maker, image compressor, tip splitter |
| Agile | 19 | Sprint planner, velocity calculator, burndown charts, retrospectives |
| Productivity | 19 | Todo list, Kanban board, Pomodoro timer, notes, mind mapping |
| Project Management | 18 | Gantt charts, RAID log, WBS generator, resource allocation, KPI tracker |
| SEO | 17 | Keyword analyzer, meta description checker, structured data generator |
| Finance | 17 | Compound interest, mortgage, loan, retirement, and tax calculators |
| Health | 17 | BMR calculator, TDEE, calorie tracker, mood tracker, vaccination guide |
| CSS/HTML | 15 | Flexbox/Grid generators, CSS animations, favicon generator, formatters |
| Student | 13 | GPA calculator, word counter, citation generator, study timer |
| Freelance | 13 | Rate calculator, invoice generator, time zone scheduler, expense tracker |
| **Total** | **228** | |

## Resource Directories

Beyond the tools, UnTrackt curates seven standalone resource directories:

| Directory | Entries | Description |
|-----------|--------:|-------------|
| [AI Learning](https://untrackt.com/ai-learning) | 150+ | Courses, tutorials, videos, books, tools, newsletters, and papers across 11 categories |
| [Status Pages](https://untrackt.com/status-pages) | 200+ | Real-time status page links for cloud, DevTools, communication, payments, and more |
| [GitHub Stars](https://untrackt.com/github-stars) | 200+ | Curated GitHub repos across frontend, backend, AI/ML, DevOps, security, and more |
| [Cloud Certifications](https://untrackt.com/certifications) | 100+ | AWS, Azure, GCP, Kubernetes, HashiCorp, Linux, Docker, and security certifications |
| [Interview Prep](https://untrackt.com/interview-prep) | 100+ | DSA, coding platforms, behavioral, system design, mock interviews, and salary negotiation |
| [System Design](https://untrackt.com/system-design) | 100+ | Courses, books, blogs, case studies, practice platforms, and GitHub repos |
| [Cheatsheets](https://untrackt.com/cheatsheets) | 50+ | Git, Docker, Kubernetes, cloud CLIs, Linux/shell, languages, frameworks, and databases |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18.2 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3.4 + @tailwindcss/typography |
| Routing | React Router DOM 6.22 |
| SEO | react-helmet-async |
| Search | Fuse.js (fuzzy search) |
| Icons | Lucide React |
| PWA | vite-plugin-pwa |
| Images | browser-image-compression, Sharp |
| QR Codes | qrcode.react |
| Testing | Vitest 4.1 + React Testing Library + jsdom |
| Coverage | @vitest/coverage-v8, Istanbul |
| Analysis | rollup-plugin-visualizer |
| Hosting | Cloudflare Pages |

---

## Project Structure

```
src/
├── components/          # Shared UI components (36+)
│   ├── aiLearning/      # AI learning directory components
│   ├── certifications/  # Cloud certification components
│   ├── cheatsheets/     # Cheatsheet display components
│   ├── githubStars/     # GitHub Stars components
│   ├── interviewPrep/   # Interview prep components
│   ├── statusPages/     # Status page components
│   └── systemDesign/    # System design components
├── data/                # Tool definitions, resource data
├── hooks/               # Custom React hooks
├── pages/               # Route-level page components
├── search/              # Search logic
├── tests/               # Vitest test suites
├── tools/               # Tool components organized by category
│   ├── agile/           # 19 tools
│   ├── css-html/        # 15 tools
│   ├── dev/             # 20 tools
│   ├── finance/         # 17 tools
│   ├── freelance/       # 13 tools
│   ├── general/         # 22 tools
│   ├── health/          # 17 tools
│   ├── maths-science/   # 38 tools
│   ├── pm/              # 18 tools
│   ├── productivity/    # 19 tools
│   ├── seo/             # 17 tools
│   └── student/         # 13 tools
├── utils/               # Utility functions
└── wiki/                # Wiki data and pages
```

---

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

Open [http://localhost:5173](http://localhost:5173)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run all tests once |
| `npm run test:ui` | Visual test UI |
| `npm run test:coverage` | Generate coverage report |
| `npm run analyze` | Bundle analysis |

Category-specific test commands are also available: `npm run test:agile`, `test:css`, `test:dev`, `test:finance`, `test:freelance`, `test:general`, `test:health`, `test:maths`, `test:pm`, `test:productivity`, `test:seo`, `test:student`, `test:components`, `test:hooks`, `test:pages`, `test:utils`, `test:data`, `test:search`.

---

## Adding a New Tool

1. Create a component in `src/tools/{category}/ToolName.jsx`
2. Add an entry to `src/data/tools.js`
3. Add tests in `src/tests/tools/{category}/`
4. The tool appears automatically in search, category pages, and routes

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with all categories |
| `/category/:id` | Category page with filtered tools |
| `/tools/:toolId` | Individual tool page |
| `/favorites` | Locally saved favorite tools |
| `/my-stats` | Personal usage stats (local only) |
| `/search` | Search results page |
| `/tags/:tag` | Tools filtered by tag |
| `/ai-learning` | AI learning resource directory |
| `/status-pages` | Status pages directory |
| `/github-stars` | Curated GitHub repos |
| `/certifications` | Cloud certification guide |
| `/system-design` | System design resources |
| `/interview-prep` | Interview prep resources |
| `/cheatsheets` | Developer cheatsheets |
| `/wiki` | Tool wiki and documentation |
| `/blog` | Blog posts and guides |
| `/about` | About UnTrackt |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of use |
| `/sitemap` | HTML sitemap |

---

## Privacy Principles

- No analytics and no tracking pixels
- No cookies
- localStorage is used only for local preferences and local-only usage stats
- All computation stays in the browser
- Open source and auditable

## Deployment

Hosted on Cloudflare Pages. Auto-deploys from the `main` branch.

## Support the Project

UnTrackt is free, open source, and community-funded. If it saves you time, consider sponsoring:

<a href="https://github.com/sponsors/jinaldesaicom">
  <img src="https://img.shields.io/github/sponsors/jinaldesaicom?style=for-the-badge&logo=github&label=Sponsor%20on%20GitHub" alt="Sponsor on GitHub" />
</a>

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## Security

To report a vulnerability, please see [SECURITY.md](SECURITY.md).

## License

[MIT License](LICENSE)
