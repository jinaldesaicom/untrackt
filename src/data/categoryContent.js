export const categoryContent = {
  dev: {
    title: 'Developer Tools',
    tagline: 'Essential utilities for coding, debugging, and development',
    description: 'A comprehensive collection of tools designed to streamline your development workflow. From JSON formatting to regex testing, color conversion to API decoding - all the utilities you need without tracking or external dependencies.',
    useCases: [
      'Format and validate JSON, XML, and code',
      'Test regular expressions with live feedback',
      'Convert between color formats (HEX, RGB, HSL)',
      'Decode JWT tokens and HTTP status codes',
      'Generate UUIDs, hashes, and test data',
      'Estimate task durations with timeline visualization'
    ],
    seoDescription: 'Free developer tools: JSON formatter, regex tester, color converter, JWT decoder, UUID generator, and more. No tracking, works offline.'
  },
  freelance: {
    title: 'Freelance Business Tools',
    tagline: 'Invoicing, proposals, contracts, and profitability calculators',
    description: 'Empower your freelance business with tools designed for independent professionals. Create professional invoices with template saving, build persuasive proposals, analyze contracts, estimate project timelines, and track client profitability - all without storing personal data.',
    useCases: [
      'Generate and print professional invoices',
      'Build multi-section proposals with auto-save',
      'Analyze contracts for readability and key terms',
      'Estimate project timelines with dependencies',
      'Calculate optimal hourly rates and profitability',
      'Schedule meetings across multiple time zones',
      'Analyze discount and markup implications'
    ],
    seoDescription: 'Free freelance tools: invoice generator, proposal builder, contract analyzer, project timeline estimator, hourly rate calculator. Privacy-first, no tracking.'
  },
  finance: {
    title: 'Personal Finance Calculators',
    tagline: 'Investment, savings, debt, and retirement planning',
    description: 'Take control of your financial future with comprehensive calculators for every scenario. Plan for retirement, track savings goals, analyze investment returns, calculate mortgage payments, and understand your net worth - all with complete privacy and no data collection.',
    useCases: [
      'Plan for retirement with longevity predictions',
      'Calculate mortgage payments and amortization',
      'Track net worth across assets and liabilities',
      'Model investment returns (SIP, lumpsum, real estate)',
      'Create savings goals with progress tracking',
      'Analyze credit card payoff strategies',
      'Calculate emergency fund requirements'
    ],
    seoDescription: 'Free finance calculators: mortgage calculator, retirement planner, investment ROI calculator, savings goal tracker. No tracking, complete privacy.'
  },
  student: {
    title: 'Student Tools',
    tagline: 'Essay formatting, grade calculation, and study aids',
    description: 'Simplify academic life with tools built for students. Generate citations in multiple formats, calculate grade projections, manage study schedules, and handle academic calculations - all designed for student needs and privacy.',
    useCases: [
      'Generate citations in APA, MLA, and Chicago formats',
      'Calculate GPA and grade projections',
      'Plan study schedules and time management',
      'Estimate paper length based on word count',
      'Convert between units and number systems'
    ],
    seoDescription: 'Free student tools: citation generator, GPA calculator, grade projector, study planner. No tracking, student-friendly.'
  },
  health: {
    title: 'Health Tools',
    tagline: 'Evidence-based health calculators',
    description: 'Free health calculators and reference tools for everyday wellness decisions. Calculate TDEE, track body metrics, understand lab results, and plan your health goals - privately, with no data ever leaving your device.',
    useCases: [
      'Calculate your daily calorie needs',
      'Estimate body fat percentage',
      'Understand blood pressure readings',
      'Plan pregnancy milestones',
    ],
    seoDescription: 'Free health calculators including TDEE calculator, BMI, body fat estimator, blood pressure classifier, macro calculator and more. Private, runs in your browser.'
  },
  general: {
    title: 'General Tools',
    tagline: 'Everyday utilities for everyone',
    description: 'A collection of versatile everyday tools - from color palette generators to typing speed tests, countdowns to case converters. Useful for everyone, regardless of profession.',
    useCases: [
      'Generate color palettes for design projects',
      'Test and improve your typing speed',
      'Convert text between different cases',
      'Generate meta tags for SEO',
    ],
    seoDescription: 'Free general purpose tools including color palette generator, typing speed test, countdown timer, random number generator, and more. No account needed.'
  },
  seo: {
    title: 'SEO Tools',
    tagline: 'Optimize your content for search',
    description: 'Free SEO tools that run entirely in your browser. Analyze meta tags, generate schema markup, check keyword density, preview social cards, and more — with zero data sent to any server.',
    useCases: [
      'Generate and preview meta tags instantly',
      'Create JSON-LD schema markup for any page',
      'Analyze keyword density in your content',
      'Preview how your links look on social media',
    ],
    seoDescription: 'Free SEO tools including meta tag generator, schema markup generator, keyword density analyzer, robots.txt builder, open graph previewer and more. Private, runs in your browser.'
  },
  productivity: {
    title: 'Productivity Tools',
    tagline: 'Work smarter, not harder',
    description: 'Free productivity tools to organize your tasks, capture ideas, and stay focused. Everything runs in your browser — your data stays on your device, never on our servers.',
    useCases: [
      'Manage tasks with a Kanban board',
      'Plan your day with time blocking',
      'Capture ideas instantly with brain dump',
      'Prioritize tasks with Eisenhower Matrix',
    ],
    seoDescription: 'Free productivity tools including Kanban board, daily planner, Eisenhower matrix, decision matrix, todo list, notepad, and more. Private, runs in your browser.'
  },
  agile: {
    title: 'Agile Tools',
    tagline: 'Sprint planning, estimation, and team collaboration for agile teams',
    description: 'A complete toolkit for agile teams — plan sprints, estimate stories, track velocity, run retrospectives, and build working agreements. Every tool runs 100% in your browser with data stored locally. No backend, no accounts, no tracking.',
    useCases: [
      'Plan sprints with capacity and velocity tracking',
      'Estimate stories using planning poker or point calculators',
      'Generate burndown charts from daily data',
      'Build user stories with acceptance criteria',
      'Run structured retrospectives with multiple formats',
      'Create and manage Definition of Done and Definition of Ready',
    ],
    seoDescription: 'Free agile tools: sprint planner, velocity calculator, planning poker, burndown chart, retrospective board, user story builder, and more. Private, runs in your browser.'
  },
  pm: {
    title: 'Project Management Tools',
    tagline: 'Plan, track, and deliver projects with confidence',
    description: 'A full suite of project management utilities — from work breakdown structures and Gantt charts to risk matrices and status reports. Everything runs in your browser with no data leaving your device.',
    useCases: [
      'Break down projects into tasks and milestones',
      'Create Gantt charts and visual timelines',
      'Track risks, assumptions, issues, and dependencies',
      'Estimate effort, cost, and resource allocation',
      'Generate RAG status reports and health dashboards',
      'Manage action items, checklists, and KPIs'
    ],
    seoDescription: 'Free project management tools: WBS builder, Gantt chart generator, RAID log, risk matrix, cost estimator, status reports, and more. Browser-only, no tracking.'
  },
  'css-html': {
    title: 'CSS/HTML Tools',
    tagline: 'Visual CSS generators, HTML utilities, and design tools',
    description: 'A comprehensive toolkit for frontend developers and designers. Build box shadows, border radii, flexbox layouts, CSS grids, animations, clip paths, glassmorphism and neumorphism effects — all with live previews. Format HTML, convert HTML to Markdown, generate favicons, and extract CSS variables. Everything runs in your browser.',
    useCases: [
      'Generate CSS box shadows, borders, and filter effects visually',
      'Build flexbox and CSS grid layouts with live previews',
      'Create keyframe animations with timing and easing controls',
      'Design buttons, glassmorphism cards, and neumorphic elements',
      'Format and beautify messy HTML code',
      'Convert HTML to Markdown and extract CSS custom properties'
    ],
    seoDescription: 'Free CSS/HTML tools: box shadow generator, flexbox playground, grid builder, animation creator, filter generator, clip-path maker, HTML formatter, favicon generator, and more. Browser-only.'
  },
  'maths-science': {
    title: 'Maths & Science Tools',
    tagline: 'Mathematics, physics, chemistry, biology, and general science calculators',
    description: 'A comprehensive suite of scientific calculators and reference tools covering mathematics (algebra, calculus, statistics, trigonometry), physics (kinematics, electricity, optics, thermodynamics), chemistry (mole calculator, equation balancer, periodic table, pH), biology (genetics, DNA/RNA, microscopy), and general science (unit converter, significant figures, error analysis). All tools run 100% in your browser.',
    useCases: [
      'Solve equations, matrices, and systems of linear equations',
      'Calculate statistics, probability, and plot mathematical functions',
      'Use SUVAT kinematics, Newton\'s laws, and energy/work calculators',
      'Balance chemical equations and explore the periodic table',
      'Generate Punnett squares and translate DNA/RNA sequences',
      'Convert scientific units, calculate significant figures, and propagate errors'
    ],
    seoDescription: 'Free maths and science tools: equation solver, matrix calculator, graph plotter, kinematics, electricity, periodic table, pH calculator, genetics, DNA/RNA tools, unit converter, and more. Browser-only, no tracking.'
  }
}

export default categoryContent
