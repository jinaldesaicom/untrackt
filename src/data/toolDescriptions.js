export const richDescriptions = {
  'json-formatter': {
    shortDescription: 'Format and validate JSON instantly in your browser.',
    longDescription: 'The UnTrackt JSON Formatter validates, prettifies, and minifies JSON in milliseconds. Paste raw payloads, spot syntax errors quickly, and produce clean indented output without sending data to any server.',
    keywords: ['json formatter', 'json validator', 'json prettifier', 'json beautifier', 'format json online', 'json lint', 'json editor'],
    faqs: [
      { q: 'Does this tool store my JSON data?', a: 'No. JSON is processed entirely in your browser and never transmitted.' },
      { q: 'Can I use this offline?', a: 'Yes. Once loaded, UnTrackt works offline as a PWA.' },
    ],
  },
  'password-generator': {
    shortDescription: 'Generate strong random passwords instantly.',
    longDescription: 'Create secure random passwords with custom length and character rules. UnTrackt uses browser cryptography so generated passwords never leave your device.',
    keywords: ['password generator', 'strong password', 'random password', 'secure password maker', 'password tool'],
    faqs: [
      { q: 'Are generated passwords uploaded anywhere?', a: 'No. Generation happens only in your browser.' },
      { q: 'Is it safe for sensitive accounts?', a: 'Yes, it uses browser-native crypto APIs for randomness.' },
    ],
  },
  'mortgage-calculator': {
    shortDescription: 'Estimate mortgage payments and amortization.',
    longDescription: 'Calculate monthly mortgage payments, principal and interest split, and amortization timelines to plan home financing with confidence.',
    keywords: ['mortgage calculator', 'home loan calculator', 'amortization calculator', 'monthly payment estimate'],
    faqs: [
      { q: 'Is this a lender quote?', a: 'No. It is an estimate for planning purposes only.' },
      { q: 'Can I compare terms?', a: 'Yes, change rate, tenure, taxes, and down payment values quickly.' },
    ],
  },
  'compound-interest-calculator': {
    shortDescription: 'See long-term investment growth with compounding.',
    longDescription: 'Estimate how savings and investments grow with compound interest over time. Model recurring contributions, expected returns, and timelines.',
    keywords: ['compound interest calculator', 'investment growth calculator', 'savings projection', 'interest compounding'],
    faqs: [
      { q: 'Does this include market risk?', a: 'No, it projects based on your selected assumptions.' },
      { q: 'Can I include monthly contributions?', a: 'Yes, recurring contributions are supported.' },
    ],
  },
  'regex-tester': {
    shortDescription: 'Test regular expressions in real time.',
    longDescription: 'Build, test, and debug regex patterns with live match feedback. Toggle flags and quickly validate pattern behavior against sample text.',
    keywords: ['regex tester', 'regular expression tool', 'regex debugger', 'regex match tester'],
    faqs: [
      { q: 'Does text get sent to a server?', a: 'No, all matching runs in your browser.' },
      { q: 'Can I test with flags?', a: 'Yes, common regex flags are supported.' },
    ],
  },
  'base64-tool': {
    shortDescription: 'Encode and decode Base64 text quickly.',
    longDescription: 'Convert text to Base64 and decode Base64 back to readable content instantly. Useful for payload inspection and debugging.',
    keywords: ['base64 encoder', 'base64 decoder', 'encode text', 'decode base64'],
    faqs: [
      { q: 'Can I decode large strings?', a: 'Yes, processing is local and instant for normal usage sizes.' },
      { q: 'Is my content private?', a: 'Yes, it stays entirely in your browser.' },
    ],
  },
  'uuid-generator': {
    shortDescription: 'Generate UUIDs using browser cryptography.',
    longDescription: 'Create RFC-style random UUIDs in one click for databases, APIs, and distributed systems. No server calls or logging.',
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'unique id generator'],
    faqs: [
      { q: 'Are UUIDs deterministic?', a: 'No, they are random UUID values for uniqueness.' },
      { q: 'Can I generate many at once?', a: 'Yes, use repeated generation as needed.' },
    ],
  },
  'unix-timestamp-converter': {
    shortDescription: 'Convert Unix epoch timestamps instantly.',
    longDescription: 'Translate Unix timestamps into readable date and time formats and convert dates back to epoch values for logs, APIs, and debugging.',
    keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to epoch'],
    faqs: [
      { q: 'Does it support milliseconds?', a: 'Yes, both seconds and milliseconds are handled.' },
      { q: 'Can I use UTC and local time?', a: 'Yes, it shows practical readable formats.' },
    ],
  },
  'jwt-decoder': {
    shortDescription: 'Decode JWT header and payload safely.',
    longDescription: 'Inspect JWT tokens by decoding header and payload claims in-browser. Useful for debugging token structure and expiry fields.',
    keywords: ['jwt decoder', 'decode jwt', 'token decoder', 'jwt payload viewer'],
    faqs: [
      { q: 'Does it verify token signatures?', a: 'This tool decodes and inspects token content; verification depends on provided keys.' },
      { q: 'Are tokens uploaded?', a: 'No, tokens are never transmitted.' },
    ],
  },
  'color-converter': {
    shortDescription: 'Convert HEX, RGB, HSL, and HSV values.',
    longDescription: 'Switch between common color formats for design and frontend workflows. Instantly preview and copy values for CSS or design systems.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hsl', 'color format converter'],
    faqs: [
      { q: 'Can I paste any color format?', a: 'Yes, popular formats are supported.' },
      { q: 'Is there a visual preview?', a: 'Yes, conversions include immediate color feedback.' },
    ],
  },
  'css-gradient-generator': {
    shortDescription: 'Create CSS gradients visually.',
    longDescription: 'Design linear and radial gradients with instant preview and copy-ready CSS output. Great for backgrounds, buttons, and hero sections.',
    keywords: ['css gradient generator', 'linear gradient tool', 'radial gradient css', 'gradient maker'],
    faqs: [
      { q: 'Can I copy production-ready CSS?', a: 'Yes, generated CSS is ready to paste.' },
      { q: 'Does this support multiple stops?', a: 'Yes, you can tune color stops and angles.' },
    ],
  },
  'gpa-calculator': {
    shortDescription: 'Calculate weighted GPA quickly.',
    longDescription: 'Compute GPA from course grades and credits with instant updates. Useful for semester planning and progress tracking.',
    keywords: ['gpa calculator', 'weighted gpa', 'grade point calculator', 'college gpa tool'],
    faqs: [
      { q: 'Does this save my grades?', a: 'No. Grade inputs remain on your device only.' },
      { q: 'Can I include course credits?', a: 'Yes, weighted calculations are supported.' },
    ],
  },
  'word-counter': {
    shortDescription: 'Count words, characters, and reading time.',
    longDescription: 'Analyze text length with word count, character count, sentence count, and estimated reading time. Useful for essays and content writing.',
    keywords: ['word counter', 'character counter', 'text statistics', 'reading time calculator'],
    faqs: [
      { q: 'Does this upload my text?', a: 'No, text stays entirely in the browser.' },
      { q: 'Can I count long documents?', a: 'Yes, it handles normal document lengths quickly.' },
    ],
  },
  'pomodoro-timer': {
    shortDescription: 'Stay focused with Pomodoro sessions.',
    longDescription: 'Run customizable work and break cycles to improve concentration. Ideal for study sessions, deep work, and productivity sprints.',
    keywords: ['pomodoro timer', 'focus timer', 'study timer', 'productivity timer'],
    faqs: [
      { q: 'Can I adjust session length?', a: 'Yes, work and break durations are configurable.' },
      { q: 'Is there any account needed?', a: 'No, everything runs locally with no login.' },
    ],
  },
  'invoice-generator': {
    shortDescription: 'Generate printable invoices in-browser.',
    longDescription: 'Create clean invoices with line items, totals, and export-ready output. Great for freelancers who need quick private invoicing workflows.',
    keywords: ['invoice generator', 'freelance invoice', 'invoice template', 'invoice maker'],
    faqs: [
      { q: 'Are invoices stored online?', a: 'No, invoice data remains local in your browser.' },
      { q: 'Can I print or export invoices?', a: 'Yes, the tool supports print-friendly output.' },
    ],
  },
  'hourly-rate-calculator': {
    shortDescription: 'Estimate your freelance hourly rate.',
    longDescription: 'Calculate sustainable hourly pricing based on target income, expenses, utilization, and work schedule assumptions.',
    keywords: ['hourly rate calculator', 'freelance rate calculator', 'consulting pricing tool'],
    faqs: [
      { q: 'Is this rate advice?', a: 'It is a planning estimate, not financial advice.' },
      { q: 'Can I account for overhead?', a: 'Yes, expenses and utilization factors are included.' },
    ],
  },
  'tip-splitter': {
    shortDescription: 'Split bills and tips between people.',
    longDescription: 'Quickly calculate tip amounts and fair per-person splits for dining and group payments with instant updates.',
    keywords: ['tip calculator', 'bill splitter', 'split bill tool', 'restaurant tip split'],
    faqs: [
      { q: 'Can I split unevenly?', a: 'The tool focuses on common even split workflows.' },
      { q: 'Are amounts stored?', a: 'No, values are processed locally only.' },
    ],
  },
  'currency-converter': {
    shortDescription: 'Convert currencies with live rates.',
    longDescription: 'Convert between major currencies using live exchange rates from open.er-api.com, with offline fallback handling when rates are cached.',
    keywords: ['currency converter', 'exchange rate converter', 'forex calculator', 'money converter'],
    faqs: [
      { q: 'Does this make external requests?', a: 'Only this tool requests live rates from open.er-api.com.' },
      { q: 'Is anything tracked?', a: 'No analytics or tracking are used.' },
    ],
  },
  'bmr-calculator': {
    shortDescription: 'Estimate basal metabolic rate.',
    longDescription: 'Calculate BMR to estimate calories your body uses at rest and use it as a foundation for nutrition planning.',
    keywords: ['bmr calculator', 'basal metabolic rate', 'calorie needs estimator'],
    faqs: [
      { q: 'Is this medical advice?', a: 'No, this is an informational estimate only.' },
      { q: 'Can I use this for diet planning?', a: 'Yes, as a baseline estimate with professional guidance when needed.' },
    ],
  },
  'tdee-calculator': {
    shortDescription: 'Estimate total daily energy expenditure.',
    longDescription: 'Calculate TDEE from BMR and activity level to estimate daily calorie maintenance and potential deficit or surplus targets.',
    keywords: ['tdee calculator', 'daily calorie calculator', 'maintenance calories', 'fitness nutrition tool'],
    faqs: [
      { q: 'Is TDEE exact?', a: 'It is an estimate based on your provided inputs.' },
      { q: 'Does this replace a nutrition professional?', a: 'No, it is an informational planning tool.' },
    ],
  },
  'keyword-density-analyzer': {
    shortDescription: 'Analyze keyword density and frequency in your content.',
    longDescription: 'The UnTrackt Keyword Density Analyzer calculates how often your target keyword appears in your content and whether the density is optimal for SEO. Paste your content, enter your target keyword, and get instant analysis with recommendations.',
    keywords: ['keyword density checker', 'keyword frequency analyzer', 'seo keyword tool', 'keyword density calculator', 'content seo analyzer'],
    faqs: [
      { q: 'What is the ideal keyword density?', a: 'Many SEO practitioners aim for roughly 0.5% to 2.5% keyword density. Above 3% can start to feel over-optimized.' },
      { q: 'Does this tool store my content?', a: 'No. Your content is analyzed entirely in your browser and is never sent to any server.' },
    ],
  },
  'title-tag-checker': {
    shortDescription: 'Check title length, keyword position, and SERP truncation risk.',
    longDescription: 'Use the Title Tag Checker to review search-title length, estimate Google truncation, and preview desktop or mobile snippets before publishing.',
    keywords: ['title tag checker', 'seo title length', 'google title preview', 'serp title optimizer'],
    faqs: [
      { q: 'How long should a title tag be?', a: 'A practical target is usually 30 to 60 characters, but pixel width matters more than raw character count.' },
      { q: 'Why does keyword position matter?', a: 'Front-loading the primary keyword can help users and search engines understand the page topic quickly.' },
    ],
  },
  'meta-description-analyzer': {
    shortDescription: 'Review meta description length, CTA language, and preview cards.',
    longDescription: 'The Meta Description Analyzer helps you refine click-through copy with length checks, CTA detection, readability cues, and simple search/social previews.',
    keywords: ['meta description checker', 'meta description analyzer', 'serp description preview', 'seo description tool'],
    faqs: [
      { q: 'What length should a meta description target?', a: 'A common target is around 120 to 160 characters so the message stays visible in search results.' },
      { q: 'Do meta descriptions directly affect rankings?', a: 'Not directly in the same way as some on-page signals, but they can strongly influence click-through rate.' },
    ],
  },
  'schema-markup-generator': {
    shortDescription: 'Generate JSON-LD schema markup for rich-result eligible pages.',
    longDescription: 'Build structured data for articles, products, FAQs, events, organizations, and more with copy-ready JSON-LD and validation guidance.',
    keywords: ['schema markup generator', 'json-ld generator', 'structured data tool', 'rich results schema'],
    faqs: [
      { q: 'What schema types are supported?', a: 'The generator covers common SEO-focused types including Article, Product, FAQ, LocalBusiness, HowTo, Event, Organization, and more.' },
      { q: 'Can I copy the output directly into HTML?', a: 'Yes. You can copy the raw JSON-LD or wrap it in a script tag for placement inside the page head or body.' },
    ],
  },
  'seo-content-brief': {
    shortDescription: 'Create private SEO content briefs with titles, sections, and CTA guidance.',
    longDescription: 'Generate a structured content brief around your target keyword, audience, search intent, and content type so you can draft with a clear ranking plan.',
    keywords: ['seo content brief', 'content brief generator', 'keyword planning tool', 'seo outline generator'],
    faqs: [
      { q: 'Does this tool analyze competitor URLs?', a: 'No. Competitor URLs are stored in your browser only for planning and are not fetched or analyzed.' },
      { q: 'Can I save the brief?', a: 'Yes. The latest brief is saved locally in this browser only and can also be copied or downloaded as text.' },
    ],
  },
  'todo-list': {
    shortDescription: 'Private todo list that saves in your browser only.',
    longDescription: 'A clean, fast todo list that respects your privacy. Your tasks are saved in your browser using localStorage and never leave your device. No account, no sync, no tracking.',
    keywords: ['online todo list', 'private todo list', 'browser todo app', 'simple task list', 'no account todo'],
    faqs: [
      { q: 'Will my tasks be saved if I close the browser?', a: 'Yes. Tasks are saved in browser localStorage and stay on this device until you clear browser data.' },
      { q: 'Can I access my tasks on another device?', a: 'No. By design, your tasks stay on this device only to keep the tool private and account-free.' },
    ],
  },
  notepad: {
    shortDescription: 'Distraction-free writing tool with private autosave and markdown preview.',
    longDescription: 'Use the Notepad to write, auto-save locally, switch between editor and preview modes, and keep up to five browser-only notes with no account required.',
    keywords: ['online notepad', 'private notes app', 'browser notepad', 'markdown notepad'],
    faqs: [
      { q: 'Are my notes uploaded anywhere?', a: 'No. Notes are saved in this browser only and never transmitted to a server.' },
      { q: 'How many notes can I keep?', a: 'The tool supports up to five notes at once, each saved separately in local storage.' },
    ],
  },
  'kanban-board': {
    shortDescription: 'Private Kanban board with draggable cards and browser-only storage.',
    longDescription: 'Manage personal workflows across custom columns with locally saved cards, priorities, due dates, and quick board exports.',
    keywords: ['kanban board online', 'private kanban board', 'browser task board', 'simple kanban'],
    faqs: [
      { q: 'Does the board sync anywhere?', a: 'No. The board exists only in this browser on this device.' },
      { q: 'Can I customize the columns?', a: 'Yes. You can add, rename, and remove columns, and move cards between them.' },
    ],
  },
  'daily-planner': {
    shortDescription: 'Time-block your day privately with saved daily plans and priorities.',
    longDescription: 'Plan focused days with 30-minute time blocks, top priorities, notes, and local-only storage for the last seven days of plans.',
    keywords: ['daily planner', 'time blocking planner', 'day schedule app', 'private planner'],
    faqs: [
      { q: 'How much history does the planner keep?', a: 'It keeps the most recent seven days locally in your browser and removes older entries automatically.' },
      { q: 'Can I print my plan?', a: 'Yes. You can copy or print the current day plan directly from the tool.' },
    ],
  },
  'decision-matrix': {
    shortDescription: 'Compare options objectively with weighted decision scoring.',
    longDescription: 'Score multiple options across weighted criteria, visualize the result, and keep up to five private decision matrices in your browser.',
    keywords: ['decision matrix', 'weighted decision tool', 'compare options', 'scoring matrix'],
    faqs: [
      { q: 'How does the weighted score work?', a: 'Each option score is multiplied by the criterion weight, then summed across all criteria.' },
      { q: 'Can I save multiple decisions?', a: 'Yes. The tool stores up to five decisions locally in this browser only.' },
    ],
  },
}
