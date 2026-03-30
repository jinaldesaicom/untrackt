export const richDescriptions = {
  'json-formatter': {
    shortDescription: 'Format and validate JSON instantly in your browser.',
    longDescription: 'The UnTrackt JSON Formatter validates, prettifies, and minifies JSON in milliseconds. Paste raw payloads, spot syntax errors quickly, and produce clean indented output without sending data to any server.',
    keywords: ['json formatter', 'json validator', 'json prettifier', 'json beautifier', 'format json online', 'json lint', 'json editor'],
    faqs: [
      { q: 'Does this tool store my JSON data?', a: 'No. JSON is processed entirely in your browser and never transmitted.' },
      { q: 'Can I use this offline?', a: 'Yes. Once loaded, UnTrackt works offline as a PWA.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste or type raw JSON into the input area.\n2. Click Format to prettify or Minify to compress.\n3. Syntax errors appear inline with line numbers so you can fix them quickly.\n4. Use the copy button to grab the result.' },
      { title: 'Tips & tricks', body: '• Paste API responses directly — nested objects are expanded automatically.\n• Use minify mode before embedding JSON in config files to save bytes.\n• The tool preserves key order, which helps when comparing payloads side by side.' },
      { title: 'Common use cases', body: '• Debugging API responses from curl or Postman.\n• Cleaning up hand-written config files (e.g., package.json, tsconfig).\n• Validating webhook payloads before integration testing.\n• Preparing sample data for documentation or bug reports.' },
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
    guide: [
      { title: 'How to use', body: '1. Set your desired password length with the slider.\n2. Toggle character types: uppercase, lowercase, numbers, symbols.\n3. Click Generate to create a random password.\n4. Use the copy button to save it to your clipboard.\n5. The strength meter shows an estimate of how resistant the password is to brute-force attacks.' },
      { title: 'Password strength tips', body: '• Aim for at least 16 characters for high-security accounts.\n• Include all four character types (upper, lower, digits, symbols) for maximum entropy.\n• Avoid dictionary words — random strings are far stronger.\n• Use a different password for every account.\n• Consider a password manager to store your generated passwords safely.' },
      { title: 'How the strength meter works', body: 'The meter estimates entropy based on the character pool size and password length. A larger pool (more character types) and longer length both increase entropy exponentially. The result is mapped to four levels: Weak, Fair, Strong, and Very Strong.' },
    ],
  },
  'text-to-flowchart': {
    shortDescription: 'Convert indented text into flowcharts and org charts instantly.',
    longDescription: 'The UnTrackt Text to Flowchart tool turns simple indented text into interactive SVG flowcharts. Type plain text, indent child nodes with spaces, and watch a live diagram appear. Choose from five color themes, three node shapes, and export as SVG or PNG — all without any server or sign-up.',
    keywords: ['text to flowchart', 'flowchart generator', 'diagram maker', 'org chart', 'mind map', 'text to diagram', 'tree diagram', 'svg chart'],
    faqs: [
      { q: 'How does the syntax work?', a: 'Each line becomes a node. Indent a line with spaces to make it a child of the line above with less indentation.' },
      { q: 'Can I export the diagram?', a: 'Yes. Download as SVG for vector graphics or PNG for raster images. You can also copy the SVG markup to your clipboard.' },
      { q: 'Is my data sent anywhere?', a: 'No. Everything runs locally in your browser — nothing is uploaded.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Type or paste text in the editor on the left — each line becomes a node.\n2. Indent lines with spaces to create parent-child connections.\n3. The flowchart updates live in the preview pane on the right.\n4. Use the toolbar to change theme, shape, zoom, or export the chart.' },
      { title: 'Tips & tricks', body: '• Use 2-space indentation for clean nesting.\n• Try different themes (Indigo, Emerald, Amber, Rose, Slate) to match your presentation.\n• Pill-shaped nodes work great for status labels; rectangles suit process steps.\n• Use "Fit" zoom to auto-scale the chart to the viewport.' },
      { title: 'Common use cases', body: '• Visualising decision trees or workflow processes.\n• Quick org charts from a team hierarchy list.\n• Mapping out feature requirements before coding.\n• Creating simple diagrams for documentation or presentations.' },
    ],
  },
  'text-to-uml': {
    shortDescription: 'Create 6 types of UML diagrams from simple text — sequence, class, use case, activity, state, and ER.',
    longDescription: 'The UnTrackt Text to UML Diagram tool lets you write plain-text descriptions and instantly see professional UML diagrams. Supports sequence diagrams, class diagrams, use case diagrams, activity diagrams, state diagrams, and entity-relationship (ER) diagrams. Choose from five color themes, export as SVG or PNG, and use fullscreen mode for detailed viewing — all 100% client-side with zero data sent to any server.',
    keywords: ['uml diagram', 'sequence diagram', 'class diagram', 'use case diagram', 'activity diagram', 'state diagram', 'er diagram', 'entity relationship', 'uml generator', 'plantuml alternative', 'text to uml', 'diagram maker', 'software design'],
    faqs: [
      { q: 'What UML diagram types are supported?', a: 'Six types: Sequence (participants & arrows), Class (classes, interfaces & inheritance), Use Case (actors & system features), Activity (workflows with decisions & branching), State (state machines & transitions), and ER (database entities & relationships).' },
      { q: 'Is this like PlantUML?', a: 'It is inspired by PlantUML but runs entirely in your browser — no server needed, no data uploaded. The syntax is simplified for quick diagramming.' },
      { q: 'Can I export diagrams?', a: 'Yes. Download as SVG for vector graphics, PNG for raster images, or copy the SVG markup to your clipboard.' },
      { q: 'Is my data private?', a: 'Absolutely. Everything is processed locally in your browser. Nothing is transmitted.' },
    ],
    guide: [
      { title: 'Sequence diagrams', body: '1. Optionally add a title with "title: My Flow".\n2. Write messages like "Alice -> Bob: Request".\n3. Use -> for solid arrows, --> for dashed (return), ->> for async, -->> for dashed async.\n4. Self-messages: "Server -> Server: Validate".\n5. Declare participant order with "participant Name".' },
      { title: 'Class diagrams', body: '1. Define a class: "class Animal".\n2. Add members indented with 2 spaces: "+name: string", "+speak(): void".\n3. Use +/−/# for public/private/protected visibility.\n4. Add inheritance: "class Dog extends Animal".\n5. Define interfaces: "interface Serializable".' },
      { title: 'Use case diagrams', body: '1. Define actors: "actor Customer".\n2. Define use cases: "usecase Browse Products".\n3. Connect with "Customer -> Browse Products".\n4. Actors and use cases are auto-created from connections.\n5. A dashed system boundary box appears around use cases.' },
      { title: 'Activity diagrams', body: '1. Use [start] and [end] for start/end nodes.\n2. Plain text lines become action nodes.\n3. Use [if] for decision diamonds.\n4. Indent [yes] and [no] branches.\n5. Indentation controls the tree structure.' },
      { title: 'State diagrams', body: '1. Write transitions: "Idle -> Processing: Start".\n2. Use [start] and [end] for initial/final states.\n3. Label transitions after a colon: "State -> State: Event".\n4. States are auto-discovered from transitions.\n5. States appear as rounded pill-shaped boxes.' },
      { title: 'ER diagrams', body: '1. Define entities: "entity User".\n2. Indent fields with 2 spaces.\n3. Mark primary keys with * prefix or PK suffix.\n4. Mark foreign keys with FK suffix.\n5. Define relationships: "User 1--* Post" (one-to-many).' },
      { title: 'Tips & tricks', body: '• Switch between all six diagram modes with the toggle buttons.\n• Try all five themes (Indigo, Emerald, Amber, Rose, Slate).\n• Use fullscreen mode for large diagrams.\n• The diagram auto-fits the preview; use zoom controls for manual adjustment.\n• Lines starting with // are treated as comments and ignored.' },
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
    guide: [
      { title: 'How to use', body: '1. Enter the home price and your down payment amount.\n2. Set the interest rate and loan term (15 or 30 years are common).\n3. Optionally add property tax and insurance estimates.\n4. View your monthly payment, principal/interest split, and amortization schedule.' },
      { title: 'Mortgage basics', body: '• Down payment: 20% avoids PMI (Private Mortgage Insurance) in most cases.\n• Fixed vs. adjustable rate: Fixed keeps the same rate; ARM may start lower but can change.\n• 15-year vs. 30-year: 15-year has higher payments but saves significantly on total interest.\n• Closing costs: Typically 2–5% of the loan amount, paid upfront.' },
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
    guide: [
      { title: 'How to use', body: '1. Enter your initial investment (principal).\n2. Set the annual interest rate and compounding frequency (monthly, quarterly, annually).\n3. Add optional recurring monthly contributions.\n4. Set the investment duration in years.\n5. View the projected growth chart and total breakdown.' },
      { title: 'The compound interest formula', body: 'A = P(1 + r/n)^(nt)\n\nWhere:\n• A = final amount\n• P = principal (initial investment)\n• r = annual interest rate (decimal)\n• n = number of times interest compounds per year\n• t = number of years\n\nMore frequent compounding (monthly vs. annually) produces slightly higher returns because interest earns interest sooner.' },
      { title: 'The power of time', body: '• Starting 10 years earlier can double your final balance, even with the same contributions.\n• At 8% annual return, money roughly doubles every 9 years (Rule of 72).\n• A $500/month contribution at 8% grows to ~$745,000 over 30 years — but only ~$298,000 over 20 years. The last decade contributes the most.' },
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
    guide: [
      { title: 'How to use', body: '1. Type your regex pattern in the Pattern field.\n2. Enter sample text in the Test String area.\n3. Matches highlight instantly as you type.\n4. Toggle flags (g, i, m) to change matching behaviour.\n5. Copy individual matches or all matches at once.' },
      { title: 'Regex quick reference', body: '• . — matches any character except newline.\n• \\d — matches any digit (0–9).\n• \\w — matches word characters (letters, digits, underscore).\n• * — zero or more of the preceding token.\n• + — one or more of the preceding token.\n• ? — zero or one (makes the preceding token optional).\n• ^ and $ — start and end of line anchors.\n• [abc] — character class matching a, b, or c.\n• (group) — capturing group for extraction.' },
      { title: 'Common patterns', body: '• Email: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\n• URL: https?://[^\\s]+\n• Phone (US): \\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\n• IPv4: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\n• Date (YYYY-MM-DD): \\d{4}-\\d{2}-\\d{2}' },
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
    guide: [
      { title: 'How to use', body: '1. Paste text into the input area.\n2. Click Encode to convert to Base64, or paste Base64 and click Decode.\n3. Copy the result with the copy button.' },
      { title: 'What is Base64?', body: 'Base64 encodes binary data into a set of 64 printable ASCII characters. It is commonly used to embed images in HTML/CSS, transmit binary data in JSON APIs, and encode email attachments. The encoded output is roughly 33% larger than the original.' },
      { title: 'Common use cases', body: '• Embedding small images as data URIs in CSS or HTML.\n• Encoding API authentication tokens (e.g., HTTP Basic Auth).\n• Inspecting Base64-encoded JWT payloads.\n• Debugging email MIME attachments.' },
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
    guide: [
      { title: 'How to use', body: '1. Click Generate to create a new UUID.\n2. The UUID appears instantly — click Copy to grab it.\n3. Generate as many as you need; each is unique.' },
      { title: 'UUID versions explained', body: '• Version 4 (random): The most common. 122 random bits generate roughly 5.3 × 10^36 unique values — collision is virtually impossible.\n• Version 1 (timestamp): Includes a timestamp and MAC address. Less common due to privacy concerns.\n• UUIDs follow the 8-4-4-4-12 hex format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.' },
      { title: 'When to use UUIDs', body: '• Primary keys in distributed databases where auto-increment is unavailable.\n• Correlation IDs for tracing requests across microservices.\n• Temporary file or session identifiers.\n• Any scenario needing globally unique IDs without coordination.' },
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
    guide: [
      { title: 'How to use', body: '1. Paste a Unix timestamp (seconds or milliseconds) to see the human-readable date.\n2. Or pick a date/time to get the Unix epoch value.\n3. Results show both UTC and your local timezone.' },
      { title: 'What is Unix time?', body: 'Unix time counts the number of seconds since January 1, 1970, 00:00:00 UTC (the "epoch"). It is the standard way servers, databases, and APIs store timestamps because it is timezone-independent and easy to compare mathematically.' },
      { title: 'Common timestamp values', body: '• 0 → January 1, 1970 (the epoch)\n• 1000000000 → September 9, 2001\n• 1700000000 → November 14, 2023\n• 2000000000 → May 18, 2033\n• Millisecond timestamps are 13 digits; second timestamps are 10 digits.' },
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
    guide: [
      { title: 'How to use', body: '1. Paste a JWT token into the input field.\n2. The header, payload, and signature are decoded and displayed instantly.\n3. Expiry (exp), issued-at (iat), and other claims are highlighted for quick inspection.' },
      { title: 'JWT structure explained', body: 'A JWT has three Base64url-encoded parts separated by dots:\n\n• Header: Algorithm and token type (e.g., {"alg": "HS256", "typ": "JWT"}).\n• Payload: Claims — data like user ID, roles, expiry time.\n• Signature: Cryptographic signature for integrity verification.' },
      { title: 'Common claims', body: '• iss — Issuer (who created the token).\n• sub — Subject (the user ID).\n• exp — Expiration time (Unix timestamp).\n• iat — Issued at (when the token was created).\n• aud — Audience (intended recipient).\n• nbf — Not before (token not valid before this time).' },
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
    guide: [
      { title: 'How to use', body: '1. Enter a color in any supported format (HEX, RGB, HSL, or HSV).\n2. All other formats update instantly with a live color preview.\n3. Click any value to copy it.' },
      { title: 'Color format reference', body: '• HEX: #4F46E5 — 6-digit hexadecimal, widely used in CSS and design tools.\n• RGB: rgb(79, 70, 229) — Red, Green, Blue channels from 0–255.\n• HSL: hsl(243, 75%, 59%) — Hue (0–360°), Saturation, Lightness. Great for creating variations.\n• HSV/HSB: Similar to HSL but uses Brightness instead of Lightness. Common in design software.' },
      { title: 'Tips', body: '• Use HSL when you need lighter/darker variants — just change the L value.\n• HEX is best for CSS shorthand.\n• RGB is required when you need alpha transparency: rgba(79, 70, 229, 0.5).' },
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
    guide: [
      { title: 'How to use', body: '1. Choose gradient type (linear or radial).\n2. Pick colors for each stop and adjust the angle or position.\n3. Preview updates live as you adjust.\n4. Copy the generated CSS code.' },
      { title: 'Gradient types', body: '• Linear: Colors transition along a straight line. Set the angle (0° = top to bottom, 90° = left to right).\n• Radial: Colors radiate outward from a center point. Use for spotlight or glow effects.\n• Conic: Colors rotate around a center point — great for pie-chart-like effects (CSS conic-gradient).' },
      { title: 'Design tips', body: '• Use analogous colors (neighbors on the color wheel) for smooth, natural gradients.\n• Add a middle stop to create a more complex transition.\n• Subtle gradients (e.g., #f8f9fa to #e9ecef) work well for card backgrounds without being distracting.' },
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
    guide: [
      { title: 'How to use', body: '1. Add each course with its name, grade, and credit hours.\n2. The GPA updates instantly as you add or change entries.\n3. Add more rows for additional courses.\n4. Review the weighted average at the bottom.' },
      { title: 'Grade scale reference', body: '• A / A+ = 4.0\n• A- = 3.7\n• B+ = 3.3\n• B = 3.0\n• B- = 2.7\n• C+ = 2.3\n• C = 2.0\n• C- = 1.7\n• D+ = 1.3\n• D = 1.0\n• F = 0.0' },
      { title: 'How weighted GPA works', body: 'GPA = Σ(grade points × credit hours) ÷ Σ(credit hours). A 4-credit A (4.0) contributes more than a 2-credit A because the credit weight is higher. This gives a more accurate picture of academic performance than a simple average.' },
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
    guide: [
      { title: 'How to use', body: '1. Paste or type your text into the input area.\n2. Word count, character count, sentence count, and paragraph count update in real time.\n3. Estimated reading time and speaking time are shown automatically.\n4. Top keyword frequency analysis appears below the stats.' },
      { title: 'Common word limits', body: '• Twitter/X post: 280 characters\n• Meta description: 155–160 characters\n• College essay (Common App): 650 words\n• Blog post (SEO-friendly): 1,500–2,500 words\n• Abstract: 150–300 words' },
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
    guide: [
      { title: 'How to use', body: '1. Set your work duration (default: 25 minutes) and break duration (default: 5 minutes).\n2. Click Start to begin a focus session.\n3. When the timer ends, take your break and then start the next session.' },
      { title: 'The Pomodoro Technique', body: 'Developed by Francesco Cirillo in the late 1980s, this method uses timed intervals to boost focus:\n• Work for 25 minutes (one "pomodoro").\n• Take a 5-minute short break.\n• After 4 pomodoros, take a 15–30 minute long break.\n\nThe technique works because time-boxing creates urgency and regular breaks prevent mental fatigue.' },
      { title: 'Tips for students', body: '• Use one pomodoro per subject/topic to maintain variety.\n• During breaks, stand up and look away from screens.\n• Track completed pomodoros to see your daily productivity trend.\n• If interrupted, restart the pomodoro — partial sessions break focus.' },
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
    guide: [
      { title: 'How to use', body: '1. Fill in your business name, client name, and invoice number.\n2. Add line items with descriptions, quantities, and unit prices.\n3. Review the subtotal, tax, and grand total.\n4. Click Print to generate a printer-friendly version or save as PDF via your browser\'s print dialog.' },
      { title: 'Invoice best practices', body: '• Always include a unique invoice number for tracking.\n• Specify payment terms clearly (e.g., Net 15, Net 30).\n• List each deliverable as a separate line item for transparency.\n• Include your payment methods and bank details.\n• Add a due date to set clear expectations.' },
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
    guide: [
      { title: 'How to use', body: '1. Enter your desired annual income (take-home goal).\n2. Add annual business expenses (software, insurance, equipment, etc.).\n3. Set your billable hours per week and weeks worked per year.\n4. Adjust the utilization rate — this is the percentage of your working hours that are actually billable.\n5. The calculated hourly rate appears instantly.' },
      { title: 'Understanding utilization rate', body: 'Not all working hours are billable. Admin, marketing, invoicing, and learning eat into your week. A typical freelancer is 60–70% utilized. If you work 40 hours but only bill 28, your utilization is 70%. The calculator factors this in so your rate covers the non-billable time.' },
      { title: 'Pricing strategies', body: '• Cost-plus: Start with this calculator\'s output as your floor rate.\n• Value-based: Charge based on the outcome you deliver, not hours spent.\n• Tiered: Offer different rates for different service levels or turnaround speeds.\n• Retainer: Offer a monthly package at a slight discount for predictable income.' },
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
    guide: [
      { title: 'How to use', body: '1. Enter the total bill amount.\n2. Select a tip percentage or enter a custom amount.\n3. Set the number of people splitting.\n4. View per-person total including tip.' },
      { title: 'Tipping reference', body: '• 15%: Standard for adequate service.\n• 18–20%: Good to excellent service.\n• 20–25%: Exceptional service or fine dining.\n• 10% or less: Reserved for poor service (consider feedback instead).\n\nNote: Tipping customs vary widely by country. In many European and Asian countries, tipping is not expected.' },
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
    guide: [
      { title: 'How to use', body: '1. Select source and target currencies.\n2. Enter the amount to convert.\n3. The converted value updates instantly using live exchange rates.\n4. Rates are cached for offline use when available.' },
      { title: 'About exchange rates', body: '• Rates are fetched from open.er-api.com — the only external request this app makes.\n• Rates update periodically and may differ slightly from bank or broker rates.\n• For large transactions, always check with your bank for the actual rate and fees.\n• This is the only UnTrackt tool that contacts an external server.' },
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
    guide: [
      { title: 'How to use', body: '1. Enter your age, weight, and height.\n2. Select your biological sex (the formula differs).\n3. Your BMR — the calories your body burns at complete rest — appears instantly.\n4. Pair with the TDEE Calculator to factor in your activity level.' },
      { title: 'The Mifflin-St Jeor formula', body: 'Men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 5\nWomen: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161\n\nThis is considered the most accurate BMR formula for most adults. It replaced the older Harris-Benedict equation in clinical practice.' },
      { title: 'What affects BMR', body: '• Muscle mass: More muscle raises BMR because muscle is metabolically active.\n• Age: BMR decreases roughly 1–2% per decade after 20.\n• Body size: Larger bodies require more energy at rest.\n• Hormones: Thyroid function, stress hormones, and others influence metabolic rate.\n• Temperature: Extreme cold or heat can temporarily raise BMR.' },
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
    guide: [
      { title: 'How to use', body: '1. Enter your stats (age, weight, height, sex) or use the value from the BMR Calculator.\n2. Select your activity level from sedentary to very active.\n3. Your TDEE — total calories burned per day including activity — appears instantly.\n4. Use the result to plan caloric surplus (muscle gain) or deficit (fat loss).' },
      { title: 'Activity level multipliers', body: '• Sedentary (desk job, little exercise): BMR × 1.2\n• Lightly active (1–3 days/week): BMR × 1.375\n• Moderately active (3–5 days/week): BMR × 1.55\n• Very active (6–7 days/week): BMR × 1.725\n• Extremely active (athlete/physical job): BMR × 1.9' },
      { title: 'Using TDEE for goals', body: '• Maintain weight: Eat at your TDEE.\n• Lose fat: Eat 300–500 calories below TDEE (moderate deficit).\n• Build muscle: Eat 200–400 calories above TDEE (lean bulk).\n• Recomp: Eat near TDEE with high protein and progressive resistance training.' },
    ],
  },

  // ── Finance tools ──
  'loan-calculator': {
    shortDescription: 'Calculate loan EMI and total interest.',
    longDescription: 'Estimate monthly loan payments, total interest paid, and view amortization breakdowns for personal loans, auto loans, and more.',
    keywords: ['loan calculator', 'emi calculator', 'loan payment estimator', 'amortization calculator'],
    faqs: [
      { q: 'Does this cover all loan types?', a: 'It works for any fixed-rate amortizing loan.' },
      { q: 'Is this a binding offer?', a: 'No, it is an estimate for planning purposes only.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the loan amount (principal).\n2. Set the annual interest rate.\n3. Choose the loan term in months or years.\n4. View your monthly EMI, total interest, and total repayment amount.\n5. Scroll down for the full amortization schedule showing principal vs. interest per payment.' },
      { title: 'The EMI formula', body: 'EMI = P × r × (1+r)^n / ((1+r)^n − 1)\n\nWhere:\n• P = loan principal\n• r = monthly interest rate (annual rate ÷ 12)\n• n = total number of monthly payments\n\nEarly payments are mostly interest; later payments are mostly principal. This is called front-loaded interest.' },
      { title: 'Ways to save on interest', body: '• Make extra principal payments — even small amounts shorten the term significantly.\n• Choose a shorter loan term if you can afford higher monthly payments.\n• Refinance when rates drop — even 0.5% lower can save thousands over the loan life.\n• Make biweekly payments instead of monthly — you end up making 13 full payments per year instead of 12.' },
    ],
  },
  'fire-number-calculator': {
    shortDescription: 'Calculate your FIRE number and timeline.',
    longDescription: 'Estimate the savings needed for Financial Independence, Retire Early using your expenses, savings rate, and expected returns.',
    keywords: ['fire calculator', 'financial independence calculator', 'retire early planner', 'fire number'],
    faqs: [
      { q: 'What is the 4% rule?', a: 'It assumes you can safely withdraw 4% of your portfolio annually in retirement.' },
      { q: 'Does this guarantee retirement?', a: 'No, it is a projection tool, not financial advice.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your annual expenses (what you need to live on).\n2. Set your current savings, monthly contributions, and expected return rate.\n3. View your FIRE number (25× annual expenses using the 4% rule).\n4. See how many years until you reach financial independence.' },
      { title: 'FIRE strategies', body: '• Lean FIRE: Minimize expenses to reach a smaller target faster (≤ $40k/year spending).\n• Fat FIRE: Maintain a comfortable lifestyle; larger target (> $100k/year spending).\n• Barista FIRE: Reach partial FI and cover remaining costs with part-time work.\n• Coast FIRE: Save enough that compound growth alone will fund retirement by a target age.' },
      { title: 'The 4% rule', body: 'Based on the Trinity Study, withdrawing 4% of your portfolio annually has a high probability of lasting 30+ years. FIRE number = Annual expenses × 25.\n\nExample: $50,000/year expenses → FIRE number = $1,250,000.' },
    ],
  },
  'sip-calculator': {
    shortDescription: 'Compare SIP and lumpsum investment growth.',
    longDescription: 'Model systematic investment plan (SIP) returns versus lumpsum investing over time with adjustable rates and durations.',
    keywords: ['sip calculator', 'systematic investment plan', 'mutual fund calculator', 'lumpsum vs sip'],
    faqs: [
      { q: 'Does this include market volatility?', a: 'No, it uses a fixed assumed rate of return.' },
      { q: 'Is SIP always better than lumpsum?', a: 'It depends on market conditions; this tool shows projections for both.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your monthly SIP amount or lumpsum amount (or both).\n2. Set the expected annual return rate and investment duration.\n3. Compare the projected values side by side.' },
      { title: 'SIP vs. Lumpsum', body: '• SIP (Systematic Investment Plan): Invest a fixed amount monthly. Benefits from rupee/dollar cost averaging — you buy more units when prices are low.\n• Lumpsum: Invest a large amount at once. Historically outperforms SIP in rising markets.\n• In volatile markets, SIP reduces timing risk. In consistently rising markets, lumpsum wins.\n• Many investors combine both strategies.' },
    ],
  },
  'retirement-calculator': {
    shortDescription: 'Plan your retirement savings timeline.',
    longDescription: 'Project how long your retirement savings will last based on current savings, monthly contributions, expected returns, and retirement age.',
    keywords: ['retirement calculator', 'retirement planner', 'pension calculator', 'savings projection'],
    faqs: [
      { q: 'Does this account for Social Security?', a: 'Not directly; you can factor it into your expected income.' },
      { q: 'Is this personalized advice?', a: 'No, consult a financial advisor for personalized planning.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your current age, retirement age, and life expectancy.\n2. Set your current savings, monthly contributions, and expected return rate.\n3. Enter your expected monthly spending in retirement.\n4. View projections for when savings run out or how much surplus you will have.' },
      { title: 'Retirement planning rules of thumb', body: '• Aim to replace 70–80% of pre-retirement income.\n• Save 15–20% of gross income annually for retirement.\n• By age 30: 1× salary saved. By 40: 3×. By 50: 6×. By 60: 8×. By 67: 10×.\n• Reduce investment risk as you approach retirement (shift from stocks to bonds).' },
    ],
  },
  'rule-of-72-calculator': {
    shortDescription: 'Estimate investment doubling time.',
    longDescription: 'Use the Rule of 72 to quickly estimate how many years it takes for an investment to double at a given return rate, and compare with the exact calculation.',
    keywords: ['rule of 72', 'doubling time calculator', 'investment growth estimator'],
    faqs: [
      { q: 'Is the Rule of 72 accurate?', a: 'It is a close approximation; the tool also shows the exact doubling time.' },
      { q: 'Does it work for any interest rate?', a: 'It works best for rates between 2% and 20%.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter an annual interest/return rate.\n2. See the Rule of 72 estimate and the exact doubling time side by side.' },
      { title: 'The Rule of 72', body: 'Years to double ≈ 72 ÷ annual rate (%).\n\n• At 6% → 72/6 = 12 years to double.\n• At 8% → 72/8 = 9 years.\n• At 10% → 72/10 = 7.2 years.\n• At 12% → 72/12 = 6 years.\n\nIt also works in reverse: if you want to double in 10 years, you need ~7.2% annual return (72/10).' },
    ],
  },
  'break-even-calculator': {
    shortDescription: 'Find your break-even point.',
    longDescription: 'Calculate how many units or how much revenue is needed to cover fixed and variable costs for products, services, or investments.',
    keywords: ['break-even calculator', 'break-even analysis', 'roi calculator', 'profitability tool'],
    faqs: [
      { q: 'Can I use this for services?', a: 'Yes, input fixed costs and per-unit variable costs for any offering.' },
      { q: 'Does this include taxes?', a: 'Not directly; include taxes in your cost estimates.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your fixed costs (rent, salaries, subscriptions).\n2. Enter the variable cost per unit (materials, labor per item).\n3. Set your selling price per unit.\n4. View the break-even quantity and revenue.' },
      { title: 'Break-even formula', body: 'Break-even units = Fixed Costs ÷ (Selling Price − Variable Cost per Unit)\n\nExample: $10,000 fixed costs, $50 price, $30 variable cost per unit.\nBreak-even = $10,000 ÷ ($50 − $30) = 500 units.\n\nBelow 500 units you lose money. Above 500, every sale contributes to profit.' },
    ],
  },
  'inflation-calculator': {
    shortDescription: 'Calculate inflation-adjusted values.',
    longDescription: 'See how purchasing power changes over time using historical US CPI data from 1950 to 2024. Compare past and future dollar values.',
    keywords: ['inflation calculator', 'cpi calculator', 'purchasing power calculator', 'dollar value over time'],
    faqs: [
      { q: 'What data does this use?', a: 'Historical US Consumer Price Index (CPI) data from 1950 to 2024.' },
      { q: 'Can I project future inflation?', a: 'Yes, you can set an assumed future inflation rate.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a dollar amount and the year it was valued in.\n2. Select a target year to see the inflation-adjusted equivalent.\n3. For future projections, set an assumed inflation rate.' },
      { title: 'Understanding inflation', body: '• Inflation measures the rate at which prices rise, reducing purchasing power.\n• Average US inflation: ~3% historically, ~2% target by the Federal Reserve.\n• At 3% inflation, $100 today buys what $74 will buy in 10 years.\n• CPI (Consumer Price Index) is the most common measure of US inflation.\n• "Real" returns = nominal returns minus inflation.' },
    ],
  },
  'net-worth-snapshot': {
    shortDescription: 'Calculate your net worth from assets and liabilities.',
    longDescription: 'Add assets and liabilities to instantly see your net worth, category breakdown, and asset allocation. Data can be saved locally and exported as CSV.',
    keywords: ['net worth calculator', 'personal finance tracker', 'asset liability calculator', 'wealth tracker'],
    faqs: [
      { q: 'Is my financial data stored online?', a: 'No, all data stays in your browser localStorage only.' },
      { q: 'Can I export my data?', a: 'Yes, you can download a full CSV breakdown.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add assets: savings, investments, property, vehicles, etc.\n2. Add liabilities: mortgage, student loans, credit card debt, etc.\n3. View your net worth (assets − liabilities), category breakdown, and allocation chart.\n4. Save locally or export as CSV.' },
      { title: 'Net worth benchmarks by age (US median)', body: '• Under 35: ~$39,000\n• 35–44: ~$135,000\n• 45–54: ~$247,000\n• 55–64: ~$364,000\n• 65–74: ~$410,000\n\nTrack quarterly for trends. Growing net worth over time is more important than any single snapshot.' },
    ],
  },
  'savings-goal-calculator': {
    shortDescription: 'Track progress on savings goals.',
    longDescription: 'Set savings goals with deadlines and track monthly contributions needed. Monitor multiple goals and see progress toward each target.',
    keywords: ['savings goal tracker', 'savings calculator', 'money goal planner', 'financial target calculator'],
    faqs: [
      { q: 'Can I track multiple goals?', a: 'Yes, you can add and monitor several goals at once.' },
      { q: 'Does this invest my money?', a: 'No, it is a calculator for planning purposes only.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Set a goal name, target amount, and deadline.\n2. Enter your current savings and expected return rate (if investing).\n3. The tool calculates the monthly contribution needed.\n4. Track progress with the visual progress bar.' },
      { title: 'Savings strategies', body: '• Pay yourself first: Automate transfers to savings before spending.\n• 50/30/20 rule: 50% needs, 30% wants, 20% savings.\n• Start with an emergency fund (3–6 months expenses).\n• Use separate accounts/goals for different objectives (vacation, car, house).' },
    ],
  },
  'credit-card-payoff-calculator': {
    shortDescription: 'Plan credit card debt payoff.',
    longDescription: 'Calculate how long it takes to pay off credit card balances, compare minimum vs fixed payment strategies, and view an amortization schedule.',
    keywords: ['credit card payoff calculator', 'debt calculator', 'credit card interest calculator', 'payoff planner'],
    faqs: [
      { q: 'Does this work for multiple cards?', a: 'It focuses on single-card payoff with strategy comparison.' },
      { q: 'Can I see total interest paid?', a: 'Yes, both total interest and payoff timeline are shown.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your credit card balance and APR.\n2. Set your planned monthly payment (or see minimum payment results).\n3. Compare how long payoff takes and how much interest you pay under each strategy.' },
      { title: 'Payoff strategies', body: '• Avalanche method: Pay minimums on all cards, put extra toward the highest APR card. Saves the most on interest.\n• Snowball method: Pay minimums on all cards, put extra toward the smallest balance. Faster psychological wins.\n• Balance transfer: Move debt to a 0% intro APR card (watch transfer fees).\n• Always pay more than the minimum — minimum payments can take 15–30 years to clear a balance.' },
    ],
  },
  'roi-calculator': {
    shortDescription: 'Calculate return on investment.',
    longDescription: 'Analyze ROI for basic investments, real estate with CAP rate, and marketing campaigns with ROAS metrics in one unified tool.',
    keywords: ['roi calculator', 'return on investment', 'investment analysis tool', 'real estate roi'],
    faqs: [
      { q: 'Can I compare different investment types?', a: 'Yes, switch between basic, real estate, and marketing modes.' },
      { q: 'Does this account for taxes?', a: 'Not automatically; factor taxes into your cost inputs.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select a mode: basic ROI, real estate, or marketing.\n2. Enter the investment cost and returns.\n3. View ROI percentage, annualized return, and payback period.' },
      { title: 'ROI formulas', body: '• Basic ROI = (Gain − Cost) / Cost × 100%.\n• Annualized ROI = ((1 + ROI)^(1/years) − 1) × 100%.\n• Real estate CAP rate = Net Operating Income / Property Value × 100%.\n• Marketing ROAS = Revenue from Campaign / Cost of Campaign.' },
    ],
  },

  // ── Freelance tools ──
  'meeting-cost-calculator': {
    shortDescription: 'Calculate the real cost of meetings.',
    longDescription: 'See how much team meetings actually cost based on attendee salaries and duration, helping prioritize which meetings are worth having.',
    keywords: ['meeting cost calculator', 'meeting roi', 'productivity cost', 'salary meeting calculator'],
    faqs: [
      { q: 'How is meeting cost calculated?', a: 'It multiplies each attendee\'s hourly rate by the meeting duration.' },
      { q: 'Is salary data uploaded?', a: 'No, all values stay in your browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the number of attendees.\n2. Set the average hourly salary (or total annual salary — the tool converts).\n3. Set meeting duration in minutes.\n4. The total cost and per-minute burn rate appear instantly.' },
      { title: 'Reducing meeting costs', body: '• Cut the guest list — only invite people who need to make or hear decisions.\n• Set a hard time limit and use a visible timer.\n• Replace status updates with async written updates.\n• Batch related topics into fewer, longer meetings instead of many short ones.\n• Start with a clear agenda and end with action items.' },
    ],
  },
  'working-days-calculator': {
    shortDescription: 'Count business days between dates.',
    longDescription: 'Calculate the number of working days between two dates, excluding weekends. Useful for project planning and deadline estimation.',
    keywords: ['working days calculator', 'business days counter', 'date range calculator', 'weekday counter'],
    faqs: [
      { q: 'Are public holidays excluded?', a: 'The tool counts weekdays; you can manually adjust for holidays.' },
      { q: 'Can I count backward from a deadline?', a: 'Yes, enter any two dates to see business days between them.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Pick a start date and an end date.\n2. The number of working days (Monday–Friday) is calculated instantly.\n3. Adjust manually for public holidays as needed.' },
      { title: 'Common use cases', body: '• Estimating project delivery timelines.\n• Calculating payment terms (e.g., Net 30 business days).\n• Planning PTO and leave requests.\n• Setting realistic sprint deadlines.' },
    ],
  },
  'project-timeline-estimator': {
    shortDescription: 'Estimate project timelines with Gantt charts.',
    longDescription: 'Plan projects with task dependencies, critical path analysis, and visual Gantt chart timelines for accurate scheduling.',
    keywords: ['project timeline estimator', 'gantt chart tool', 'project scheduling', 'critical path calculator'],
    faqs: [
      { q: 'Can I add task dependencies?', a: 'Yes, link tasks to calculate realistic timelines and critical path.' },
      { q: 'Is project data stored?', a: 'Task data stays in your browser only.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add project tasks with estimated durations.\n2. Set dependencies between tasks (e.g., Task B starts after Task A).\n3. View the auto-generated Gantt chart and critical path.\n4. Adjust durations to see how changes ripple through the timeline.' },
      { title: 'Critical path explained', body: 'The critical path is the longest sequence of dependent tasks. It determines the minimum project duration. Any delay on a critical-path task delays the entire project. Non-critical tasks have "float" (slack) and can shift without affecting the deadline.' },
      { title: 'Estimation tips', body: '• Add 20–30% buffer to your initial estimates for unknowns.\n• Break large tasks into smaller chunks (2–5 day units) for better accuracy.\n• Identify dependencies early — they reveal bottlenecks.\n• Review the critical path before committing to a deadline.' },
    ],
  },
  'tax-bracket-estimator': {
    shortDescription: 'Calculate taxes across multiple countries.',
    longDescription: 'Estimate income taxes for 8 countries with effective and marginal rate breakdowns, supporting various filing statuses.',
    keywords: ['tax bracket calculator', 'income tax estimator', 'international tax calculator', 'effective tax rate'],
    faqs: [
      { q: 'Is this official tax advice?', a: 'No, use it for estimation only. Consult a tax professional for filing.' },
      { q: 'Which countries are supported?', a: 'US, UK, Canada, Australia, India, Germany, France, and Japan.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select your country and filing status.\n2. Enter your gross annual income.\n3. View the bracket breakdown, effective rate, and marginal rate.\n4. Compare across countries by switching the country selector.' },
      { title: 'Marginal vs. effective rate', body: '• Marginal rate: The tax rate on your last dollar of income (highest bracket you fall into).\n• Effective rate: Your total tax divided by total income — this is the real percentage you pay.\n\nExample: In the US, a $100,000 income has a 24% marginal rate but roughly 18% effective rate because lower brackets are taxed at lower rates.' },
      { title: 'Tax planning tips', body: '• Contribute to tax-advantaged accounts (401k, IRA, ISA) to lower taxable income.\n• Track deductible business expenses if self-employed.\n• Understand your marginal rate to evaluate side income or raises.\n• Use this tool to compare take-home pay across countries for remote work.' },
    ],
  },
  'discount-markup-calculator': {
    shortDescription: 'Calculate discounts, markups, and margins.',
    longDescription: 'Compute discount savings, markup pricing, profit margins, and generate bulk pricing tables for business planning.',
    keywords: ['discount calculator', 'markup calculator', 'profit margin calculator', 'pricing tool'],
    faqs: [
      { q: 'What is the difference between markup and margin?', a: 'Markup is based on cost, margin is based on selling price.' },
      { q: 'Can I generate pricing tables?', a: 'Yes, bulk pricing tables are built in.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Choose a mode: discount, markup, or margin.\n2. Enter the original price and percentage.\n3. The result shows sale price, savings, or profit per unit.\n4. Use the bulk pricing table for volume scenarios.' },
      { title: 'Markup vs. margin', body: '• Markup = (Selling Price − Cost) / Cost × 100\n  A $10 item sold for $15 = 50% markup.\n\n• Margin = (Selling Price − Cost) / Selling Price × 100\n  A $10 item sold for $15 = 33.3% margin.\n\nMargin is always lower than markup for the same numbers. Businesses often use margin; retailers often use markup.' },
    ],
  },
  'contract-analyzer': {
    shortDescription: 'Analyze contracts for readability and key terms.',
    longDescription: 'Paste contract text to analyze readability, extract key terms, detect passive voice, and identify common contract keywords—all in-browser.',
    keywords: ['contract analyzer', 'legal text analyzer', 'readability checker', 'contract review tool'],
    faqs: [
      { q: 'Is contract text sent anywhere?', a: 'No, all analysis happens locally in your browser.' },
      { q: 'Does this replace legal review?', a: 'No, it is a readability and keyword tool, not legal advice.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste your contract text into the input area.\n2. The tool analyzes readability scores, word count, and key terms.\n3. Review flagged keywords (termination, liability, indemnity, etc.).\n4. Check the passive voice percentage for clarity improvement.' },
      { title: 'Key terms to watch for', body: '• Indemnification: Who bears liability for losses.\n• Termination clause: How and when either party can end the contract.\n• Non-compete/Non-solicitation: Restrictions after the contract ends.\n• Payment terms: When and how you get paid.\n• Intellectual property: Who owns the work product.' },
    ],
  },
  'proposal-builder': {
    shortDescription: 'Build professional proposals with auto-save.',
    longDescription: 'Create structured proposals with sections, live word count, and auto-save to browser storage so your work is never lost.',
    keywords: ['proposal builder', 'business proposal tool', 'proposal template', 'pitch builder'],
    faqs: [
      { q: 'Does auto-save use a server?', a: 'No, proposals are saved to your browser\'s localStorage only.' },
      { q: 'Can I export my proposal?', a: 'Yes, you can copy or print the formatted proposal.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Start with the project title and client name.\n2. Fill in sections: summary, scope, timeline, pricing, and terms.\n3. The word count updates live. Auto-save keeps your progress.\n4. Copy or print the formatted proposal when ready.' },
      { title: 'Proposal structure', body: '• Executive summary: 2–3 sentences on what you will deliver and why.\n• Scope of work: Detailed deliverables and milestones.\n• Timeline: Start and end dates with key milestones.\n• Pricing: Itemized costs with total.\n• Terms & conditions: Payment terms, revisions, cancellation policy.' },
    ],
  },
  'client-profitability-estimator': {
    shortDescription: 'Estimate client profitability and value.',
    longDescription: 'Score and compare clients based on hourly rate, overhead costs, payment reliability, and stress factors to optimize your client portfolio.',
    keywords: ['client profitability tool', 'freelance client scorer', 'client comparison calculator'],
    faqs: [
      { q: 'How is profitability scored?', a: 'It combines revenue, overhead, hours, and qualitative stress factors.' },
      { q: 'Is client data stored?', a: 'Only in your browser localStorage if you choose to save.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter client details: revenue, hours worked, and overhead costs.\n2. Rate qualitative factors like communication ease, payment speed, and stress level.\n3. View the profitability score and effective hourly rate.\n4. Compare multiple clients side by side.' },
      { title: 'Optimizing your client mix', body: '• High revenue + low stress = keep and grow.\n• High revenue + high stress = raise rates or set boundaries.\n• Low revenue + low stress = fill schedule gaps only.\n• Low revenue + high stress = phase out or restructure terms.\n\nAim for 2–3 anchor clients covering 60–70% of income, with room for passion projects.' },
    ],
  },
  'late-payment-fee-calculator': {
    shortDescription: 'Calculate late payment fees and interest.',
    longDescription: 'Compute late payment penalties with daily or monthly compounding, generate payment reminder timelines, and track overdue invoices.',
    keywords: ['late payment calculator', 'overdue invoice calculator', 'penalty interest calculator'],
    faqs: [
      { q: 'Does this send payment reminders?', a: 'No, it calculates fees and shows suggested reminder dates.' },
      { q: 'Can I choose compounding frequency?', a: 'Yes, both daily and monthly compounding are supported.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the invoice amount and due date.\n2. Set the late fee percentage and compounding frequency (daily or monthly).\n3. The tool calculates accumulated fees and suggested reminder dates.\n4. Copy the breakdown for your records or client communication.' },
      { title: 'Setting fair late fees', body: '• Common rates: 1–1.5% per month or a flat fee ($25–$50).\n• Always specify your late fee policy in the original contract before invoicing.\n• Many jurisdictions cap late fees — check local regulations.\n• Send reminders at 7 days, 14 days, and 30 days overdue before escalating.' },
    ],
  },
  'timezone-scheduler': {
    shortDescription: 'Find meeting times across time zones.',
    longDescription: 'Compare overlapping work hours across 8+ time zones with DST awareness to schedule international meetings efficiently.',
    keywords: ['timezone scheduler', 'world clock tool', 'meeting time finder', 'timezone converter'],
    faqs: [
      { q: 'Does this handle daylight saving time?', a: 'Yes, DST transitions are accounted for automatically.' },
      { q: 'How many time zones can I compare?', a: 'You can compare 8 or more zones simultaneously.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add the time zones of your meeting participants.\n2. The tool highlights overlapping work hours (9 AM–5 PM) across all zones.\n3. Select a time slot that falls within everyone\'s work hours.\n4. DST transitions are handled automatically.' },
      { title: 'Scheduling tips', body: '• When spanning 8+ hours apart, consider rotating meeting times to share the burden.\n• Record meetings for those who cannot attend live.\n• Use async communication (written updates) to reduce the need for real-time overlap.\n• Book recurring meetings during the narrowest overlap window to protect the slot.' },
    ],
  },

  // ── Health tools ──
  'water-intake-calculator': {
    shortDescription: 'Calculate your daily water intake needs.',
    longDescription: 'Estimate optimal daily water consumption based on your body weight, activity level, and climate to stay properly hydrated.',
    keywords: ['water intake calculator', 'hydration calculator', 'daily water needs', 'fluid intake estimator'],
    faqs: [
      { q: 'Is this a medical recommendation?', a: 'No, it is a general guideline. Consult a doctor for specific needs.' },
      { q: 'Does climate affect the recommendation?', a: 'Yes, hot or humid climates increase recommended intake.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your body weight.\n2. Select your activity level and climate.\n3. View your recommended daily water intake in cups and liters.' },
      { title: 'General hydration guidelines', body: '• Baseline: ~30–35 mL per kg of body weight per day.\n• Active people: Add 350–500 mL per 30 minutes of exercise.\n• Hot climates: Add 500–750 mL to the daily baseline.\n• Signs of dehydration: dark urine, fatigue, headache, dry mouth.\n• Water-rich foods (fruits, vegetables) also contribute to hydration.' },
    ],
  },
  'sleep-cycle-calculator': {
    shortDescription: 'Find optimal sleep and wake times.',
    longDescription: 'Calculate the best bedtime or alarm time based on 90-minute sleep cycles to wake up feeling refreshed instead of groggy.',
    keywords: ['sleep cycle calculator', 'bedtime calculator', 'wake up time calculator', 'sleep planner'],
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'Approximately 90 minutes, though it varies between individuals.' },
      { q: 'Is this a medical sleep tool?', a: 'No, it is a general guideline based on average cycle lengths.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the time you need to wake up, OR the time you want to go to bed.\n2. The calculator shows optimal times based on 90-minute sleep cycles.\n3. Allow ~15 minutes to fall asleep (factored in automatically).' },
      { title: 'Sleep cycle basics', body: 'Each cycle lasts ~90 minutes and includes:\n• Stage 1 (Light sleep): Transition from wakefulness, easily awakened.\n• Stage 2 (Deeper sleep): Heart rate and temperature drop.\n• Stage 3 (Deep/slow-wave sleep): Body repairs and grows. Hardest to wake from.\n• REM (Dream sleep): Memory consolidation, vivid dreams.\n\nWaking between cycles (not during deep sleep) helps you feel refreshed.' },
      { title: 'Sleep recommendations by age', body: '• Teens (14–17): 8–10 hours (5–6 cycles).\n• Adults (18–64): 7–9 hours (5–6 cycles).\n• Older adults (65+): 7–8 hours (4–5 cycles).' },
    ],
  },
  'ideal-weight-calculator': {
    shortDescription: 'Estimate your ideal weight range.',
    longDescription: 'Compare results from multiple medical formulas (Devine, Hamwi, Robinson, Miller) to see a range of healthy weight estimates for your height.',
    keywords: ['ideal weight calculator', 'healthy weight estimator', 'weight range calculator'],
    faqs: [
      { q: 'Which formula is best?', a: 'No single formula is best; the tool shows a range from multiple methods.' },
      { q: 'Does this replace a doctor visit?', a: 'No, use it as a reference and consult a healthcare provider.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your height and select your biological sex.\n2. View ideal weight estimates from multiple formulas.\n3. The range gives you a healthy weight window rather than a single number.' },
      { title: 'Formulas used', body: '• Devine (1974): Most widely used in pharmaceutical dosing.\n• Hamwi (1964): Common in dietetics.\n• Robinson (1983): Refinement of Devine.\n• Miller (1983): Tends to give higher estimates, better for larger frames.\n\nAll formulas are height-based estimates. They do not account for muscle mass, bone density, or body composition.' },
    ],
  },
  'body-fat-calculator': {
    shortDescription: 'Estimate body fat percentage.',
    longDescription: 'Estimate body fat using US Navy and BMI-derived methods, see fat mass versus lean mass, and understand your body composition category.',
    keywords: ['body fat calculator', 'body composition estimator', 'lean mass calculator', 'us navy body fat'],
    faqs: [
      { q: 'How accurate is this?', a: 'These are estimation methods; DEXA scans provide clinical accuracy.' },
      { q: 'Which method should I use?', a: 'The US Navy method requires body measurements; the BMI method is simpler.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Choose the US Navy method (requires neck, waist, and hip measurements) or BMI method (height and weight only).\n2. Enter your measurements.\n3. View your estimated body fat %, fat mass, lean mass, and category.' },
      { title: 'Body fat categories', body: 'Men / Women:\n• Essential fat: 2–5% / 10–13%\n• Athletic: 6–13% / 14–20%\n• Fit: 14–17% / 21–24%\n• Average: 18–24% / 25–31%\n• Above average: 25%+ / 32%+' },
      { title: 'Measurement tips', body: '• Measure at the same time of day for consistency.\n• Waist: Measure at the navel level.\n• Neck: Measure below the larynx, tape sloping slightly downward.\n• Hips (women): Measure at the widest point of the buttocks.' },
    ],
  },
  'macro-calculator': {
    shortDescription: 'Calculate daily protein, fat, and carb goals.',
    longDescription: 'Turn your calorie target into specific macronutrient gram amounts based on your selected diet split or custom ratios.',
    keywords: ['macro calculator', 'macronutrient calculator', 'protein calculator', 'diet planner'],
    faqs: [
      { q: 'Do I need my TDEE first?', a: 'Yes, knowing your daily calorie target helps set accurate macros.' },
      { q: 'Can I set custom ratios?', a: 'Yes, you can adjust protein, carbs, and fat percentages.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your daily calorie target (use the TDEE Calculator if needed).\n2. Select a preset diet split or enter custom percentages.\n3. View your daily grams of protein, carbs, and fat.' },
      { title: 'Common macro splits', body: '• Balanced: 30% protein, 40% carbs, 30% fat — general health.\n• High protein: 40% protein, 30% carbs, 30% fat — muscle building.\n• Low carb: 30% protein, 20% carbs, 50% fat — keto-adjacent.\n• Endurance: 20% protein, 55% carbs, 25% fat — runners and cyclists.' },
      { title: 'Calorie values per gram', body: '• Protein: 4 calories per gram.\n• Carbohydrates: 4 calories per gram.\n• Fat: 9 calories per gram.\n• Alcohol: 7 calories per gram (not a macronutrient but adds up).' },
    ],
  },
  'blood-pressure-classifier': {
    shortDescription: 'Classify blood pressure readings.',
    longDescription: 'Enter systolic and diastolic readings to see your blood pressure category (normal, elevated, stage 1/2 hypertension) with educational context.',
    keywords: ['blood pressure classifier', 'bp checker', 'hypertension calculator', 'blood pressure category'],
    faqs: [
      { q: 'Is this a medical diagnosis?', a: 'No, it classifies readings for educational purposes. Consult a doctor.' },
      { q: 'What is a normal reading?', a: 'Generally below 120/80 mmHg is considered normal.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your systolic (top number) and diastolic (bottom number) readings.\n2. The tool classifies your reading and shows the category.' },
      { title: 'Blood pressure categories (AHA)', body: '• Normal: < 120/80 mmHg.\n• Elevated: 120–129 / < 80 mmHg.\n• Stage 1 Hypertension: 130–139 / 80–89 mmHg.\n• Stage 2 Hypertension: ≥ 140 / ≥ 90 mmHg.\n• Hypertensive Crisis: > 180 / > 120 mmHg — seek emergency care.' },
      { title: 'Measurement tips', body: '• Sit quietly for 5 minutes before measuring.\n• Don\'t consume caffeine or exercise 30 minutes before.\n• Use a properly sized cuff on your bare upper arm.\n• Take 2–3 readings 1 minute apart and average them.\n• Measure at the same time daily for consistent tracking.' },
    ],
  },
  'heart-rate-zone-calculator': {
    shortDescription: 'Calculate heart rate training zones.',
    longDescription: 'Find your heart rate training zones using standard percentage or Karvonen method based on max heart rate and resting heart rate.',
    keywords: ['heart rate zone calculator', 'training zone calculator', 'karvonen calculator', 'cardio zones'],
    faqs: [
      { q: 'How do I find my max heart rate?', a: 'A common estimate is 220 minus your age.' },
      { q: 'What is the Karvonen method?', a: 'It uses heart rate reserve (max HR minus resting HR) for more personalized zones.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your age (max HR is estimated as 220 − age) or enter a known max HR.\n2. Optionally enter your resting heart rate for the Karvonen method.\n3. View your 5 training zones with BPM ranges.' },
      { title: 'Training zones', body: '• Zone 1 (50–60%): Recovery / warm-up. Very light effort.\n• Zone 2 (60–70%): Aerobic base / fat burning. Conversational pace.\n• Zone 3 (70–80%): Aerobic endurance. Moderate effort, steady-state.\n• Zone 4 (80–90%): Anaerobic threshold. Hard effort, builds speed.\n• Zone 5 (90–100%): VO2 max. Maximum effort, short bursts only.' },
    ],
  },
  'pregnancy-due-date-calculator': {
    shortDescription: 'Estimate pregnancy due date and milestones.',
    longDescription: 'Calculate estimated due date from last menstrual period or IVF transfer date, see gestational age, trimester timeline, and key milestones.',
    keywords: ['pregnancy due date calculator', 'due date estimator', 'gestational age calculator', 'pregnancy timeline'],
    faqs: [
      { q: 'How is the due date calculated?', a: 'Based on Naegele\'s rule: 280 days from the first day of your last period.' },
      { q: 'Is this a medical tool?', a: 'No, it is an estimate. Confirm with your OB-GYN.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the first day of your last menstrual period (LMP) or IVF transfer date.\n2. View your estimated due date, current gestational age, and trimester.\n3. See upcoming milestone dates.' },
      { title: 'Trimester overview', body: '• 1st Trimester (weeks 1–12): Major organ development. Morning sickness common. First ultrasound typically at week 8–12.\n• 2nd Trimester (weeks 13–26): Baby grows rapidly. Anatomy scan around week 20. Often called the "easiest" trimester.\n• 3rd Trimester (weeks 27–40): Baby gains weight and prepares for birth. More frequent check-ups. Due date at 40 weeks.' },
    ],
  },
  'ovulation-calculator': {
    shortDescription: 'Estimate ovulation and fertility windows.',
    longDescription: 'Calculate predicted ovulation dates, fertile windows, and next expected periods based on your cycle length and last period date.',
    keywords: ['ovulation calculator', 'fertility calculator', 'fertile window estimator', 'period tracker'],
    faqs: [
      { q: 'How accurate is ovulation prediction?', a: 'It is an estimate based on average cycles; actual ovulation varies.' },
      { q: 'Can I use this as contraception?', a: 'No, this is not reliable for birth control. Consult a healthcare provider.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the first day of your last period and your average cycle length.\n2. View your predicted ovulation date and fertile window.\n3. See your next expected period date.' },
      { title: 'Fertility window explained', body: '• Ovulation typically occurs 14 days before the next period.\n• The fertile window spans about 6 days: 5 days before ovulation and the day of ovulation.\n• Sperm can survive up to 5 days; the egg is viable for 12–24 hours after release.\n• Cycles vary — for irregular cycles, this estimate will be less reliable.' },
    ],
  },
  'alcohol-unit-calculator': {
    shortDescription: 'Estimate alcohol units and processing time.',
    longDescription: 'Calculate alcohol units from drink volume and ABV, see pure alcohol grams, estimated processing time, and calorie content.',
    keywords: ['alcohol unit calculator', 'drink calculator', 'alcohol calorie calculator', 'units of alcohol'],
    faqs: [
      { q: 'What is one alcohol unit?', a: '10ml (8g) of pure alcohol in the UK, or 14g in the US (one standard drink).' },
      { q: 'Is the processing time accurate?', a: 'It is an average estimate; individual metabolism varies significantly.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the drink volume (mL) and ABV (alcohol by volume %).\n2. View the calculated units, pure alcohol grams, estimated processing time, and calories.' },
      { title: 'Standard drink reference', body: '• UK unit = 10 mL (8 g) pure alcohol.\n• US standard drink = 14 g pure alcohol.\n• Beer (5% ABV, 330 mL) ≈ 1.3 UK units.\n• Wine (12% ABV, 175 mL) ≈ 2.1 UK units.\n• Spirit (40% ABV, 25 mL single) = 1.0 UK unit.\n• The body processes roughly 1 unit per hour.' },
    ],
  },
  'calorie-burn-estimator': {
    shortDescription: 'Estimate calories burned from exercise.',
    longDescription: 'Calculate calories burned based on activity type, MET values, duration, and your body weight for 50+ common activities.',
    keywords: ['calorie burn calculator', 'exercise calorie calculator', 'met calculator', 'activity calorie estimator'],
    faqs: [
      { q: 'What are MET values?', a: 'Metabolic Equivalent of Task: a ratio comparing activity energy to resting energy.' },
      { q: 'Is this exact?', a: 'It is an estimate; actual burn depends on intensity, fitness level, and body composition.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your body weight.\n2. Select an activity from the list.\n3. Enter the duration in minutes.\n4. View estimated calories burned.' },
      { title: 'Understanding MET values', body: '1 MET = energy at rest. Higher MET = more intense activity.\n• Walking (3.5 mph): 3.5 METs.\n• Cycling (moderate): 6.8 METs.\n• Running (6 mph): 9.8 METs.\n• Swimming (laps): 7.0 METs.\n• Yoga: 2.5 METs.\n\nCalories = MET × weight(kg) × duration(hours).' },
    ],
  },
  'medical-unit-converter': {
    shortDescription: 'Convert between medical measurement units.',
    longDescription: 'Convert glucose (mg/dL ↔ mmol/L), cholesterol, HbA1c, temperature, weight, and height between common medical units.',
    keywords: ['medical unit converter', 'glucose converter', 'cholesterol converter', 'health unit calculator'],
    faqs: [
      { q: 'Are conversion factors standard?', a: 'Yes, they follow internationally recognized medical conversion factors.' },
      { q: 'Can I use this for lab results?', a: 'Yes, to convert units. Always share original values with your doctor.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select the measurement type (glucose, cholesterol, HbA1c, etc.).\n2. Enter a value in one unit.\n3. The converted value appears instantly.' },
      { title: 'Common conversions', body: '• Blood glucose: mg/dL × 0.0555 = mmol/L. Normal fasting: 70–100 mg/dL (3.9–5.6 mmol/L).\n• Cholesterol: mg/dL × 0.0259 = mmol/L. Healthy total: < 200 mg/dL (< 5.2 mmol/L).\n• Temperature: (°F − 32) × 5/9 = °C. Normal body: 98.6°F (37°C).\n• Weight: 1 kg = 2.205 lb. 1 stone = 14 lb = 6.35 kg.' },
    ],
  },
  'vaccination-age-guide': {
    shortDescription: 'Browse vaccination schedules by country.',
    longDescription: 'View recommended vaccination milestones for children and adults across country-specific schedules including CDC (US) and NHS (UK) guidelines.',
    keywords: ['vaccination schedule', 'immunization guide', 'vaccine age chart', 'cdc vaccination schedule'],
    faqs: [
      { q: 'Is this an official schedule?', a: 'It references official sources but always verify with your healthcare provider.' },
      { q: 'Which countries are covered?', a: 'Primarily US (CDC) and UK (NHS) schedules.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select a country schedule (US CDC or UK NHS).\n2. Browse vaccination milestones by age group.\n3. View vaccine names, recommended ages, and dose information.' },
      { title: 'Important notes', body: '• Schedules are based on published guidelines from CDC and NHS.\n• Actual vaccination timing should be determined by your healthcare provider.\n• Catch-up schedules exist for missed vaccinations.\n• Some vaccinations require multiple doses at specific intervals.\n• Adult boosters (Tdap, flu, shingles) are also included where applicable.' },
    ],
  },

  // ── Student tools ──
  'citation-generator': {
    shortDescription: 'Generate citations in APA, MLA, and Chicago.',
    longDescription: 'Create properly formatted citations for books, journal articles, and websites in major academic citation styles.',
    keywords: ['citation generator', 'apa citation', 'mla citation', 'chicago citation', 'bibliography tool'],
    faqs: [
      { q: 'Which citation styles are supported?', a: 'APA 7th, MLA 9th, and Chicago 17th edition.' },
      { q: 'Are citations guaranteed correct?', a: 'They follow standard rules but always verify against your institution\'s guidelines.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select the source type (book, article, website).\n2. Fill in the details: author, title, year, publisher, etc.\n3. Choose your citation style (APA, MLA, Chicago).\n4. Copy the formatted citation into your paper.' },
      { title: 'Quick style comparison', body: '• APA (7th ed.): Author, A. A. (Year). Title of work. Publisher.\n  Used in: Psychology, social sciences, education.\n\n• MLA (9th ed.): Author. "Title." Container, Year, pp.\n  Used in: Humanities, literature, arts.\n\n• Chicago: Author. Title. Place: Publisher, Year.\n  Used in: History, some humanities.' },
      { title: 'Citation tips', body: '• Always include a DOI or URL for online sources.\n• Use hanging indentation for bibliography entries.\n• List multiple authors up to the style\'s limit, then use "et al."\n• When page numbers are unavailable for web sources, use paragraph numbers or section headings.' },
    ],
  },
  'readability-scorer': {
    shortDescription: 'Analyze text readability and grade level.',
    longDescription: 'Score text using Flesch-Kincaid, Gunning Fog, and other readability formulas to ensure your writing matches your target audience.',
    keywords: ['readability checker', 'flesch kincaid calculator', 'grade level analyzer', 'writing clarity tool'],
    faqs: [
      { q: 'What readability formulas are used?', a: 'Flesch-Kincaid, Gunning Fog, Coleman-Liau, and more.' },
      { q: 'What grade level should I target?', a: 'Grade 8-10 for general audiences; lower for broader reach.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste your text into the input area.\n2. Readability scores appear instantly with grade level interpretation.\n3. Use the scores to simplify your writing for your target audience.' },
      { title: 'Score interpretation', body: '• Flesch Reading Ease: 0–100 scale (higher = easier). 60–70 is standard.\n• Flesch-Kincaid Grade Level: US school grade needed to understand the text.\n• Gunning Fog Index: Estimates years of education needed. Below 12 is readable by most.\n• Coleman-Liau Index: Based on characters per word and sentences per 100 words.' },
      { title: 'How to improve readability', body: '• Shorten sentences — aim for 15–20 words per sentence.\n• Replace multi-syllable words with simpler alternatives.\n• Use active voice instead of passive.\n• Break long paragraphs into shorter ones.\n• Avoid jargon unless writing for a specialist audience.' },
    ],
  },
  'percentage-calculator': {
    shortDescription: 'Solve percentage problems instantly.',
    longDescription: 'Calculate percentages across multiple modes: what is X% of Y, percentage increase/decrease, and reverse percentage operations.',
    keywords: ['percentage calculator', 'percent change calculator', 'percentage increase calculator'],
    faqs: [
      { q: 'Can I calculate percentage change?', a: 'Yes, both increase and decrease modes are available.' },
      { q: 'Does it work offline?', a: 'Yes, all calculations are done locally in your browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Choose a calculation mode: percentage of a value, percentage change, or find the percentage.\n2. Enter your numbers.\n3. The result updates instantly.' },
      { title: 'Percentage formulas', body: '• What is X% of Y? → (X / 100) × Y\n• X is what % of Y? → (X / Y) × 100\n• % change from X to Y? → ((Y − X) / X) × 100\n• Increase Y by X%? → Y × (1 + X/100)\n• Decrease Y by X%? → Y × (1 − X/100)' },
    ],
  },
  'roman-numeral-converter': {
    shortDescription: 'Convert between Roman and Arabic numerals.',
    longDescription: 'Instantly convert Roman numerals to Arabic numbers and vice versa with validation up to 3,999.',
    keywords: ['roman numeral converter', 'roman to arabic', 'numeral converter'],
    faqs: [
      { q: 'What is the maximum number?', a: 'Standard Roman numerals support values up to 3,999 (MMMCMXCIX).' },
      { q: 'Are lowercase numerals accepted?', a: 'Yes, input is case-insensitive.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a decimal number to get the Roman numeral, or type a Roman numeral to get the decimal value.\n2. Results appear instantly.' },
      { title: 'Roman numeral reference', body: '• I = 1, V = 5, X = 10, L = 50\n• C = 100, D = 500, M = 1000\n• Subtractive notation: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900\n• Numerals are written largest to smallest, left to right.' },
      { title: 'Where Roman numerals appear', body: '• Outline numbering in academic papers (I, II, III for sections).\n• Copyright years in film and television (© MMXXIV).\n• Clock faces and watch dials.\n• Legal documents and formal numbering.' },
    ],
  },
  'scientific-calculator': {
    shortDescription: 'Evaluate math expressions with scientific functions.',
    longDescription: 'A full scientific calculator with trigonometric, logarithmic, and power functions, plus expression history and memory storage.',
    keywords: ['scientific calculator', 'math calculator', 'trig calculator', 'expression evaluator'],
    faqs: [
      { q: 'Does it support order of operations?', a: 'Yes, it follows standard mathematical operator precedence.' },
      { q: 'Is there a calculation history?', a: 'Yes, previous calculations are shown for reference.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Type an expression or use the on-screen buttons.\n2. Use parentheses for grouping: (2 + 3) × 4.\n3. Access functions like sin, cos, log, ln, and exponents.' },
      { title: 'Available functions', body: '• Trigonometric: sin, cos, tan, asin, acos, atan\n• Logarithmic: log (base 10), ln (natural log)\n• Powers: x², x³, x^y, √x, ∛x\n• Constants: π (pi), e (Euler\'s number)\n• Factorial: n!\n• Angle modes: degrees and radians' },
    ],
  },
  'unit-converter': {
    shortDescription: 'Convert between measurement units.',
    longDescription: 'Convert values across length, mass, temperature, volume, speed, and other categories with a clean and fast interface.',
    keywords: ['unit converter', 'measurement converter', 'length converter', 'temperature converter'],
    faqs: [
      { q: 'How many unit categories are supported?', a: 'Length, mass, temperature, volume, speed, and more.' },
      { q: 'Are conversions accurate?', a: 'Yes, standard conversion factors are used throughout.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select a category (length, mass, volume, etc.).\n2. Enter a value and choose the source and target units.\n3. The converted value appears instantly.' },
      { title: 'Supported categories', body: '• Length: mm, cm, m, km, in, ft, yd, mi\n• Mass: mg, g, kg, oz, lb, st\n• Volume: mL, L, gal, qt, pt, cup, fl oz\n• Temperature: °C, °F, K\n• Speed: m/s, km/h, mph, knots\n• Digital: bytes, KB, MB, GB, TB' },
    ],
  },
  'essay-outline-builder': {
    shortDescription: 'Build organized essay outlines.',
    longDescription: 'Structure your essay with thesis statement, body sections, and supporting points. Preview the outline in real time as you build it.',
    keywords: ['essay outline builder', 'essay planner', 'thesis builder', 'writing organizer'],
    faqs: [
      { q: 'Can I rearrange sections?', a: 'Yes, sections and points can be reordered as you plan.' },
      { q: 'Is my outline saved?', a: 'You can save to browser storage to continue later.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your essay topic and thesis statement.\n2. Add body paragraph topics with supporting points.\n3. Rearrange sections as needed.\n4. Copy the finished outline into your word processor.' },
      { title: 'Essay structure basics', body: '• Introduction: Hook → Background context → Thesis statement.\n• Body (3+ paragraphs): Topic sentence → Evidence → Analysis → Transition.\n• Conclusion: Restate thesis → Summarize key points → Final thought or call to action.' },
      { title: 'Outlining tips', body: '• Start with your thesis and work backward to identify supporting arguments.\n• Each body paragraph should cover ONE main idea.\n• Use parallel structure for outline headings.\n• Include evidence placeholders (quotes, data) so you know what to research.' },
    ],
  },
  'flashcard-session': {
    shortDescription: 'Create flashcards and run study sessions.',
    longDescription: 'Build flashcard decks and run self-graded study sessions with flip-to-reveal interactions to reinforce learning.',
    keywords: ['flashcard app', 'study flashcards', 'quiz tool', 'spaced repetition'],
    faqs: [
      { q: 'Can I save my flashcard decks?', a: 'Yes, decks are stored locally in your browser.' },
      { q: 'Is there spaced repetition?', a: 'The session uses self-grading; you control review frequency.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Create a new deck and add cards with front (question) and back (answer).\n2. Start a study session to flip through cards.\n3. Mark cards as correct or incorrect to track your progress.' },
      { title: 'Effective flashcard strategies', body: '• Keep each card focused on ONE concept.\n• Use the question-and-answer format rather than fill-in-the-blank.\n• Add context clues but avoid giving away the answer.\n• Include mnemonics or memory aids on the answer side.' },
      { title: 'Study tips', body: '• Review cards you got wrong more often (spaced repetition principle).\n• Study in short sessions (15–20 min) rather than marathon cramming.\n• Shuffle the deck to avoid memorizing order.\n• Say the answer out loud before flipping — active recall beats passive reading.' },
    ],
  },
  'quadratic-solver': {
    shortDescription: 'Solve quadratic equations step by step.',
    longDescription: 'Enter coefficients to find roots, vertex, and axis of symmetry for any quadratic equation, with visual graph rendering.',
    keywords: ['quadratic solver', 'quadratic formula calculator', 'parabola graph', 'algebra solver'],
    faqs: [
      { q: 'Does it show complex roots?', a: 'Yes, both real and complex roots are displayed when applicable.' },
      { q: 'Can I see the graph?', a: 'Yes, the parabola is rendered visually with vertex and roots marked.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter coefficients a, b, and c for the equation ax² + bx + c = 0.\n2. The discriminant, roots, and step-by-step solution appear instantly.\n3. View the parabola graph with vertex and roots marked.' },
      { title: 'The quadratic formula', body: 'x = (−b ± √(b² − 4ac)) / 2a\n\nThe discriminant (b² − 4ac) determines the nature of roots:\n• Positive: Two distinct real roots.\n• Zero: One repeated real root (vertex touches x-axis).\n• Negative: Two complex conjugate roots.' },
      { title: 'Quick examples', body: '• x² − 5x + 6 = 0 → x = 2, x = 3 (D = 1, two real roots).\n• x² − 4x + 4 = 0 → x = 2 (D = 0, repeated root).\n• x² + 1 = 0 → x = ±i (D = −4, complex roots).' },
    ],
  },
  'study-timer': {
    shortDescription: 'Advanced study timer with session tracking.',
    longDescription: 'A focus timer with multiple modes (Pomodoro, custom), daily goals, and session logs to track study habits over time.',
    keywords: ['study timer', 'focus timer', 'pomodoro timer', 'study session tracker'],
    faqs: [
      { q: 'How is this different from Pomodoro Timer?', a: 'It adds session logging, daily goals, and multiple timer modes.' },
      { q: 'Are my sessions saved?', a: 'Session logs are stored in browser localStorage.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Choose a timer mode (Pomodoro, countdown, or custom).\n2. Set a daily study goal in minutes.\n3. Start the timer when you begin studying. Stop it when you finish.\n4. View your session history and daily progress toward your goal.' },
      { title: 'Study time recommendations', body: '• High school: 1–2 hours per subject per week.\n• University: 2–3 hours of study per credit hour per week.\n• Exam prep: Increase gradually 2–4 weeks before exams.\n• Consistent daily sessions beat last-minute cramming.' },
    ],
  },

  // ── General tools ──
  'qr-code-generator': {
    shortDescription: 'Generate QR codes instantly.',
    longDescription: 'Create QR codes from any URL or text and download them as PNG images for sharing, printing, or embedding.',
    keywords: ['qr code generator', 'qr maker', 'qr code creator', 'url to qr code'],
    faqs: [
      { q: 'Can I download the QR code?', a: 'Yes, download it as a PNG image.' },
      { q: 'Is my data sent anywhere?', a: 'No, QR codes are generated entirely in your browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a URL, text, or any data you want to encode.\n2. The QR code generates instantly.\n3. Download as PNG for print or digital use.' },
      { title: 'QR code best practices', body: '• Keep the encoded data short — shorter data creates simpler, more scannable codes.\n• Use URL shorteners for very long links.\n• Test the QR code with your phone camera before printing.\n• Ensure sufficient contrast between the code and background (dark on light).\n• Leave a quiet zone (white border) around the code for reliable scanning.' },
    ],
  },
  'color-palette-generator': {
    shortDescription: 'Generate color palettes from a base color.',
    longDescription: 'Create harmonious color palettes from a base color, random generation, or image extraction with CSS variable and Tailwind exports.',
    keywords: ['color palette generator', 'design color picker', 'color harmony tool', 'palette from image'],
    faqs: [
      { q: 'Can I extract colors from an image?', a: 'Yes, upload an image to extract a palette.' },
      { q: 'Does it export CSS variables?', a: 'Yes, including CSS variables and Tailwind color values.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a base color or click Random for inspiration.\n2. Choose a harmony type: complementary, analogous, triadic, split-complementary, or tetradic.\n3. Or upload an image to extract its dominant colors.\n4. Export as CSS variables, Tailwind config, or copy hex values.' },
      { title: 'Color harmony types', body: '• Complementary: Two colors opposite on the color wheel. High contrast.\n• Analogous: 3 colors next to each other. Calm, cohesive feel.\n• Triadic: 3 colors evenly spaced (120° apart). Vibrant, balanced.\n• Split-complementary: A color + two neighbors of its complement. Less tension than complementary.\n• Tetradic: 4 colors forming a rectangle. Rich, needs careful balancing.' },
    ],
  },
  'aspect-ratio-calculator': {
    shortDescription: 'Calculate and maintain aspect ratios.',
    longDescription: 'Resize images and layouts while preserving aspect ratio for common formats like 16:9, 4:3, and custom dimensions.',
    keywords: ['aspect ratio calculator', 'image resize calculator', 'responsive dimensions tool'],
    faqs: [
      { q: 'Can I use custom aspect ratios?', a: 'Yes, enter any width and height for custom ratios.' },
      { q: 'Does it support social media sizes?', a: 'Yes, common presets for social media are included.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a width or height and select an aspect ratio preset (or enter custom).\n2. The calculator fills in the missing dimension to maintain the ratio.\n3. Use presets for common formats like 16:9, 4:3, 1:1.' },
      { title: 'Common aspect ratios', body: '• 16:9 — Widescreen video (YouTube, TV, most monitors).\n• 4:3 — Classic TV and iPad display.\n• 1:1 — Square (Instagram posts).\n• 9:16 — Vertical video (Stories, Reels, TikTok).\n• 21:9 — Ultrawide monitors and cinematic format.\n• 3:2 — Classic photography and Surface devices.' },
    ],
  },
  'image-to-base64': {
    shortDescription: 'Convert images to Base64 data URLs.',
    longDescription: 'Upload image files or paste URLs to convert them into Base64 encoded strings and data URLs for embedding in HTML and CSS.',
    keywords: ['image to base64', 'data url generator', 'image encoder', 'base64 image converter'],
    faqs: [
      { q: 'What image formats are supported?', a: 'PNG, JPG, GIF, WebP, and SVG files.' },
      { q: 'Is the image uploaded anywhere?', a: 'No, conversion happens entirely in your browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Upload an image file (PNG, JPG, GIF, WebP, SVG).\n2. The Base64 data URL is generated instantly.\n3. Copy the data URL for use in HTML img tags or CSS background-image.' },
      { title: 'When to use data URLs', body: '• Embedding small icons (< 5 KB) directly in CSS to reduce HTTP requests.\n• Including images in single-file HTML documents.\n• Email templates where external images may be blocked.\n\nAvoid for large images — Base64 increases file size by ~33% and cannot be cached separately by browsers.' },
    ],
  },
  'countdown-timer': {
    shortDescription: 'Create live countdowns for events.',
    longDescription: 'Set up countdowns for upcoming events with saved presets, real-time updates, and easy sharing of target dates.',
    keywords: ['countdown timer', 'event countdown', 'days until calculator', 'date countdown'],
    faqs: [
      { q: 'Can I save countdown presets?', a: 'Yes, presets are saved in your browser for quick reuse.' },
      { q: 'Does it update in real time?', a: 'Yes, the countdown ticks live down to the second.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a target date and optional event name.\n2. The countdown shows days, hours, minutes, and seconds remaining.\n3. Save frequently used countdowns as presets.' },
      { title: 'Ideas for countdowns', body: '• Product launch or release dates.\n• Exam deadlines or assignment due dates.\n• Vacation departures.\n• Project milestones and sprint ends.\n• Personal goals and challenges.' },
    ],
  },
  'word-frequency-counter': {
    shortDescription: 'Analyze text word frequency.',
    longDescription: 'Count word occurrences, find top repeated words, and export frequency data as CSV for text analysis and writing improvement.',
    keywords: ['word frequency counter', 'text analysis tool', 'word count analyzer', 'word cloud data'],
    faqs: [
      { q: 'Can I export the results?', a: 'Yes, frequency data can be exported as CSV.' },
      { q: 'Does it filter common words?', a: 'You can toggle stop word filtering for cleaner results.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste your text into the input area.\n2. The word frequency table appears instantly, sorted by count.\n3. Toggle stop word filtering to exclude common words (the, a, is, etc.).\n4. Export results as CSV for further analysis.' },
      { title: 'Use cases', body: '• SEO: Identify keyword density in web content.\n• Writing: Spot overused words to improve variety.\n• Research: Analyze interview transcripts or survey responses.\n• Academic: Text analysis for linguistics or content studies.' },
    ],
  },
  'typing-speed-test': {
    shortDescription: 'Measure your typing speed and accuracy.',
    longDescription: 'Test your typing with WPM, CPM, and accuracy metrics across different text modes with error tracking and performance feedback.',
    keywords: ['typing speed test', 'wpm test', 'typing practice', 'keyboard speed tester'],
    faqs: [
      { q: 'What metrics are tracked?', a: 'Words per minute, characters per minute, accuracy percentage, and error count.' },
      { q: 'Can I practice with different texts?', a: 'Yes, multiple text modes are available.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Choose a text mode and start typing when ready.\n2. Your WPM, CPM, and accuracy update in real time.\n3. Errors are highlighted as you type.\n4. Review your results at the end of the test.' },
      { title: 'Typing speed benchmarks', body: '• 20–30 WPM: Beginner.\n• 40–50 WPM: Average typist.\n• 60–75 WPM: Proficient / above average.\n• 80–100 WPM: Fast typist.\n• 100+ WPM: Professional / competitive level.\n\nMost office jobs require 40–60 WPM. Focus on accuracy first — speed follows naturally.' },
    ],
  },
  'random-number-generator': {
    shortDescription: 'Generate secure random numbers and picks.',
    longDescription: 'Generate cryptographically random numbers, dice rolls, coin flips, and random list picks using the Web Crypto API.',
    keywords: ['random number generator', 'dice roller', 'coin flip tool', 'random picker'],
    faqs: [
      { q: 'Is the randomness truly random?', a: 'Yes, it uses the browser\'s Web Crypto API for secure randomness.' },
      { q: 'Can I set a custom range?', a: 'Yes, specify minimum and maximum values.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Set the minimum and maximum values for your range.\n2. Click Generate for a random number.\n3. Use dice roll, coin flip, or list picker modes for special cases.' },
      { title: 'Why Web Crypto API?', body: 'The Web Crypto API provides cryptographically secure random values, unlike Math.random() which uses a pseudorandom algorithm. This means results are truly unpredictable and suitable for:\n• Fair drawings and giveaways.\n• Game mechanics (dice, card shuffling).\n• Sampling from a list without bias.' },
    ],
  },
  'binary-text-converter': {
    shortDescription: 'Convert between text, binary, Morse, and hex.',
    longDescription: 'Transform text into binary, Morse code, hexadecimal, and ASCII representations with instant two-way conversion.',
    keywords: ['binary text converter', 'morse code converter', 'hex converter', 'ascii converter'],
    faqs: [
      { q: 'Can I convert Morse back to text?', a: 'Yes, two-way conversion is supported for all formats.' },
      { q: 'Does it handle Unicode?', a: 'It works best with standard ASCII characters.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Type text to see its binary, hex, Morse, and ASCII equivalents.\n2. Or paste binary/hex/Morse to decode back to text.\n3. All conversions update in real time.' },
      { title: 'Encoding reference', body: '• Binary: Each character becomes 8 bits (e.g., A = 01000001).\n• Hexadecimal: Each character becomes 2 hex digits (e.g., A = 41).\n• Morse code: Letters map to dots and dashes (e.g., A = .−).\n• ASCII: The numeric code for each character (e.g., A = 65).' },
    ],
  },
  'case-converter': {
    shortDescription: 'Convert text between different cases.',
    longDescription: 'Transform text into sentence case, UPPER CASE, lower case, Title Case, camelCase, snake_case, kebab-case, and more.',
    keywords: ['case converter', 'text case tool', 'camelcase converter', 'snake case converter'],
    faqs: [
      { q: 'How many case formats are supported?', a: 'Over 8 formats including camelCase, snake_case, kebab-case, and more.' },
      { q: 'Can I convert code variable names?', a: 'Yes, it handles all common programming naming conventions.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste your text into the input area.\n2. Click any case format button to convert.\n3. Copy the result.' },
      { title: 'Case formats explained', body: '• camelCase: myVariableName — JavaScript/Java variables.\n• PascalCase: MyClassName — Class names, React components.\n• snake_case: my_variable_name — Python, Ruby, databases.\n• kebab-case: my-css-class — CSS classes, URLs, file names.\n• SCREAMING_SNAKE: MY_CONSTANT — Constants in most languages.\n• Title Case: My Article Title — Headlines and titles.' },
    ],
  },
  'json-to-csv-converter': {
    shortDescription: 'Convert JSON arrays to CSV and back.',
    longDescription: 'Transform JSON arrays into downloadable CSV files and parse CSV back into JSON with live preview and column detection.',
    keywords: ['json to csv converter', 'csv to json', 'data format converter', 'json export'],
    faqs: [
      { q: 'Does it handle nested JSON?', a: 'It works best with flat JSON arrays; nested objects are stringified.' },
      { q: 'Can I preview before downloading?', a: 'Yes, a live table preview shows the converted data.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste a JSON array or CSV text into the input.\n2. The converted output and table preview appear instantly.\n3. Download the CSV file or copy the JSON output.' },
      { title: 'Tips', body: '• JSON should be an array of objects for best results: [{"name":"Alice"},{"name":"Bob"}].\n• Nested objects will be stringified — flatten your data first for clean CSV columns.\n• CSV headers are auto-detected from JSON keys or the first row.\n• Use this to convert API responses into spreadsheet-friendly formats.' },
    ],
  },
  'text-to-slug': {
    shortDescription: 'Convert text to URL-friendly slugs.',
    longDescription: 'Turn titles and text into clean URL slugs, hashtags, and file-safe names with transliteration and batch processing support.',
    keywords: ['text to slug', 'url slug generator', 'seo slug tool', 'hashtag generator'],
    faqs: [
      { q: 'Does it handle special characters?', a: 'Yes, accented characters are transliterated and symbols are removed.' },
      { q: 'Can I process multiple titles at once?', a: 'Yes, batch mode is supported.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a title or text.\n2. The URL slug, hashtag, and file-safe name are generated instantly.\n3. Use batch mode to process multiple titles at once.' },
      { title: 'What makes a good slug', body: '• Use lowercase letters and hyphens only.\n• Keep it short: 3–5 words is ideal for SEO.\n• Remove stop words (the, a, an, of) when possible.\n• Include the primary keyword for the page.\n• Avoid numbers that may become outdated (e.g., "2024" in evergreen content).' },
    ],
  },
  'meta-tag-generator': {
    shortDescription: 'Generate SEO meta tags and Open Graph markup.',
    longDescription: 'Create page meta tags, Open Graph, Twitter Card, and JSON-LD structured data with a live preview for SEO optimization.',
    keywords: ['meta tag generator', 'seo tag builder', 'open graph generator', 'twitter card generator'],
    faqs: [
      { q: 'Does it generate JSON-LD?', a: 'Yes, structured data in JSON-LD format is included.' },
      { q: 'Can I preview how it looks?', a: 'Yes, Google and social media previews are shown.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your page title, description, URL, and image.\n2. The tool generates meta, Open Graph, Twitter Card, and JSON-LD tags.\n3. Preview how the page will appear in Google and social media shares.\n4. Copy the HTML code into your page\'s <head> section.' },
      { title: 'SEO meta tag essentials', body: '• Title tag: 50–60 characters. Include primary keyword near the start.\n• Meta description: 150–160 characters. Compelling summary with call to action.\n• Open Graph (og:title, og:description, og:image): Controls how links appear on Facebook, LinkedIn.\n• Twitter Card: Controls appearance in Twitter/X feeds.\n• JSON-LD: Structured data for rich search results (FAQ, article, product).' },
    ],
  },

  'data-sync': {
    shortDescription: 'Export, import, and QR-transfer your data between devices.',
    longDescription: 'The Data Sync & Backup tool lets you export all your UnTrackt data (favorites, stats, theme, preferences) as a JSON file, import it on another device, or transfer via QR code / copy-paste — all with total privacy. Everything runs 100% in your browser.',
    keywords: ['data backup', 'export import', 'sync data', 'qr transfer', 'local storage backup', 'privacy sync', 'cross device'],
    faqs: [
      { q: 'Is my data sent to any server?', a: 'No. Export/import and QR transfer are 100% local — nothing leaves your browser.' },
      { q: 'What data is included?', a: 'All UnTrackt data: favorites, theme preference, recent tools, usage stats, and any stored tool preferences.' },
      { q: 'What is the difference between merge and overwrite?', a: 'Merge keeps your existing data and only adds keys that are missing. Overwrite replaces all matching keys with the imported values.' },
      { q: 'What if my data is too large for a QR code?', a: 'The tool will notify you and suggest using the Copy Text option instead. You can paste the text on the other device to import.' },
    ],
    guide: [
      { title: 'Export & Import', body: '1. Click "Download Backup" to save a JSON file of all your data.\n2. Transfer the file to another device (email, USB, cloud drive).\n3. On that device, click "Select Backup File" and choose the JSON.\n4. Pick Merge or Overwrite mode, then confirm the import.\n5. Reload the page to see your restored data.' },
      { title: 'QR Code Transfer', body: '1. Switch to the "QR Transfer" tab.\n2. Click "Generate QR" to create a scannable QR code.\n3. On the other device, scan the QR with your camera (it copies the text).\n4. Paste the text into the "Receive" box and click "Import from Text".\n5. If data is too large for QR, use "Copy Text" and paste directly.' },
      { title: 'Tips', body: '• Export regularly as a backup before clearing browser data.\n• The tool compresses data for smaller QR codes.\n• Cloud sync (Google Drive, OneDrive) is coming soon as an additional option.\n• Your privacy-first local export will always remain available.' },
    ],
  },

  'image-resizer': {
    shortDescription: 'Resize images to exact pixel dimensions in your browser.',
    longDescription: 'Resize any image to custom dimensions with an optional aspect-ratio lock. Choose from common presets like HD or Full HD, pick an output format (PNG, JPEG, WebP), and download the result — all processed locally in your browser with zero uploads.',
    keywords: ['image resizer', 'resize image online', 'change image dimensions', 'scale image', 'aspect ratio', 'photo resizer', 'pixel resize'],
    faqs: [
      { q: 'Is my image uploaded to a server?', a: 'No. All processing happens in your browser using the Canvas API — nothing leaves your device.' },
      { q: 'Can I preserve the aspect ratio?', a: 'Yes. The lock button between width and height keeps the aspect ratio when you change either dimension.' },
      { q: 'What formats are supported?', a: 'You can upload any browser-supported image (PNG, JPEG, WebP, GIF, BMP, SVG) and export as PNG, JPEG, or WebP.' },
      { q: 'Is there a file size limit?', a: 'There is no hard limit, but very large images may be slow since processing is done in the browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Drop an image or click the upload area to select a file.\n2. Enter a custom width and height, or pick a preset size.\n3. Toggle the lock icon to preserve or unlock the aspect ratio.\n4. Choose an output format (PNG, JPEG, or WebP) and quality.\n5. Click "Resize Image" and download the result.' },
      { title: 'Aspect ratio explained', body: '• When the lock icon is active, changing width automatically adjusts height (and vice versa) to maintain the original proportions.\n• Unlock the aspect ratio to stretch or squash the image to any arbitrary size.\n• Presets respect the lock: if locked, the image fits within the preset while keeping proportions.' },
      { title: 'Tips', body: '• Use WebP format for the smallest file sizes with good quality.\n• The quality slider only applies to JPEG and WebP — PNG is always lossless.\n• You can resize the same image multiple times with different settings without re-uploading.' },
    ],
  },

  // ── Dev tools (remaining) ──
  'hash-generator': {
    shortDescription: 'Generate MD5 and SHA hashes.',
    longDescription: 'Compute MD5, SHA-256, SHA-512, and other hash digests for text or file inputs directly in your browser.',
    keywords: ['hash generator', 'sha256 generator', 'md5 hash', 'file checksum tool'],
    faqs: [
      { q: 'Can I hash files?', a: 'Yes, both text input and file uploads are supported.' },
      { q: 'Is my data sent to a server?', a: 'No, all hashing runs locally using the Web Crypto API.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Type or paste text into the input, or upload a file.\n2. Select the hash algorithm (MD5, SHA-1, SHA-256, SHA-512).\n3. The hash digest appears instantly — click Copy to grab it.' },
      { title: 'Hash algorithms compared', body: '• MD5 (128-bit): Fast but not collision-resistant. Use for checksums, not security.\n• SHA-1 (160-bit): Deprecated for security. Still seen in legacy systems.\n• SHA-256 (256-bit): Standard for security, certificates, and blockchain.\n• SHA-512 (512-bit): Stronger variant, used in high-security contexts.' },
      { title: 'Common use cases', body: '• Verifying file integrity after downloads (compare checksums).\n• Generating content-based cache keys.\n• Checking if two files are identical without comparing byte-by-byte.\n• Password hashing concepts (in practice, use bcrypt/argon2 with salts).' },
    ],
  },
  'cron-parser': {
    shortDescription: 'Parse cron expressions and preview runs.',
    longDescription: 'Enter cron expressions to see plain English explanations and the next scheduled run times for debugging scheduled jobs.',
    keywords: ['cron parser', 'cron expression tool', 'cron schedule viewer', 'crontab helper'],
    faqs: [
      { q: 'Does it support 5-field cron?', a: 'Yes, standard 5-field cron expressions are supported.' },
      { q: 'Can I see the next runs?', a: 'Yes, the next 5 scheduled run times are shown.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a cron expression (e.g., 0 9 * * 1-5).\n2. The plain English explanation appears instantly.\n3. The next 5 scheduled run times are listed below.' },
      { title: 'Cron field reference', body: '┌──── minute (0–59)\n│ ┌──── hour (0–23)\n│ │ ┌──── day of month (1–31)\n│ │ │ ┌──── month (1–12)\n│ │ │ │ ┌──── day of week (0–7, 0 and 7 = Sunday)\n* * * * *\n\nSpecial characters: * (any), , (list), - (range), / (step).' },
      { title: 'Common examples', body: '• 0 9 * * 1-5 → 9 AM every weekday.\n• */15 * * * * → Every 15 minutes.\n• 0 0 1 * * → Midnight on the 1st of every month.\n• 0 */2 * * * → Every 2 hours.\n• 30 4 * * 0 → 4:30 AM every Sunday.' },
    ],
  },
  'html-entity-encoder': {
    shortDescription: 'Encode and decode HTML entities.',
    longDescription: 'Convert special characters to HTML entities and decode entities back to text for safe HTML rendering and debugging.',
    keywords: ['html entity encoder', 'html escape tool', 'entity decoder', 'xss prevention'],
    faqs: [
      { q: 'Does this prevent XSS?', a: 'Encoding user input helps prevent XSS; this tool shows you the encoded output.' },
      { q: 'Can I decode entities too?', a: 'Yes, two-way encoding and decoding are supported.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste text with special characters to encode them as HTML entities.\n2. Or paste entity-encoded text to decode back to readable characters.\n3. Copy the result for use in HTML files.' },
      { title: 'Common entities', body: '• &amp; → & (ampersand)\n• &lt; → < (less than)\n• &gt; → > (greater than)\n• &quot; → " (double quote)\n• &#39; → \' (apostrophe)\n• &nbsp; → non-breaking space\n• &copy; → © (copyright)' },
      { title: 'Why encode HTML?', body: 'Encoding prevents browsers from interpreting special characters as HTML markup. This is critical for:\n• Preventing XSS (cross-site scripting) attacks in user-submitted content.\n• Safely displaying code snippets in web pages.\n• Ensuring characters like < and & render as text, not tags.' },
    ],
  },
  'http-status-lookup': {
    shortDescription: 'Browse and search HTTP status codes.',
    longDescription: 'Search the complete list of HTTP status codes with descriptions, categories, and usage examples for API development.',
    keywords: ['http status codes', 'http status lookup', 'api status reference', 'rest api codes'],
    faqs: [
      { q: 'Are all status codes included?', a: 'Yes, all standard HTTP/1.1 and HTTP/2 status codes are covered.' },
      { q: 'Can I search by code?', a: 'Yes, search by number or description text.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Browse or search for any HTTP status code by number or keyword.\n2. Each code shows its category, description, and typical usage.' },
      { title: 'Status code ranges', body: '• 1xx Informational: Request received, processing continues (100 Continue, 101 Switching Protocols).\n• 2xx Success: Request succeeded (200 OK, 201 Created, 204 No Content).\n• 3xx Redirection: Further action needed (301 Moved Permanently, 304 Not Modified).\n• 4xx Client Error: Bad request from client (400 Bad Request, 401, 403, 404, 429).\n• 5xx Server Error: Server failed (500 Internal Server Error, 502, 503).' },
      { title: 'Most common codes for APIs', body: '• 200 OK — successful GET/PUT.\n• 201 Created — successful POST that created a resource.\n• 204 No Content — successful DELETE.\n• 400 Bad Request — malformed input.\n• 401 Unauthorized — missing or invalid auth token.\n• 403 Forbidden — valid auth but insufficient permissions.\n• 404 Not Found — resource does not exist.\n• 429 Too Many Requests — rate limited.\n• 500 Internal Server Error — unhandled server exception.' },
    ],
  },
  'lorem-ipsum-generator': {
    shortDescription: 'Generate placeholder text.',
    longDescription: 'Create lorem ipsum placeholder text by words, sentences, or paragraphs for design mockups and content templates.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'filler text'],
    faqs: [
      { q: 'Can I specify the length?', a: 'Yes, choose by words, sentences, or paragraphs.' },
      { q: 'Is the text random?', a: 'It uses classic Lorem Ipsum text patterns with some variation.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select the unit: words, sentences, or paragraphs.\n2. Set the quantity you need.\n3. Click Generate and copy the result.' },
      { title: 'Why Lorem Ipsum?', body: 'Lorem Ipsum has been the standard placeholder text since the 1500s. Designers use it because it has a natural distribution of letters and word lengths that approximates real English, without distracting readers with meaningful content during layout review.' },
    ],
  },
  'text-diff-checker': {
    shortDescription: 'Compare text differences line by line.',
    longDescription: 'Paste two texts to compare changes line-by-line, word-by-word, or character-by-character with highlighted additions and deletions.',
    keywords: ['text diff checker', 'text compare tool', 'diff viewer', 'code diff tool'],
    faqs: [
      { q: 'What comparison modes are available?', a: 'Line-by-line, word-by-word, and character-by-character.' },
      { q: 'Can I compare code?', a: 'Yes, any text content including source code can be compared.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste original text on the left and modified text on the right.\n2. Differences are highlighted instantly — green for additions, red for deletions.\n3. Switch between line, word, or character diff modes.' },
      { title: 'Common use cases', body: '• Comparing config file versions before deploying.\n• Reviewing text changes in documents or emails.\n• Spotting unintended edits in code without a Git client.\n• Checking translations against source text.' },
    ],
  },
  'markdown-previewer': {
    shortDescription: 'Write and preview Markdown live.',
    longDescription: 'Edit Markdown text with a side-by-side live HTML preview, supporting headings, lists, code blocks, tables, and more.',
    keywords: ['markdown previewer', 'markdown editor', 'markdown to html', 'live markdown preview'],
    faqs: [
      { q: 'Does it support GitHub Flavored Markdown?', a: 'It supports common Markdown features including tables and code blocks.' },
      { q: 'Can I export the HTML?', a: 'You can copy the rendered HTML output.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Type Markdown in the left editor pane.\n2. The rendered HTML preview updates live on the right.\n3. Copy the rendered output or the raw HTML.' },
      { title: 'Markdown quick reference', body: '• # Heading 1, ## Heading 2, ### Heading 3\n• **bold**, *italic*, ~~strikethrough~~\n• - bullet list, 1. numbered list\n• [link text](url), ![alt](image-url)\n• `inline code`, ``` fenced code block ```\n• > blockquote\n• | table | header | with pipes' },
    ],
  },
  'number-base-converter': {
    shortDescription: 'Convert between number bases.',
    longDescription: 'Convert numbers between binary, octal, decimal, and hexadecimal with instant results and manual base conversion up to base 36.',
    keywords: ['number base converter', 'binary converter', 'hex converter', 'octal converter'],
    faqs: [
      { q: 'What bases are supported?', a: 'Binary (2), octal (8), decimal (10), hexadecimal (16), and any base from 2 to 36.' },
      { q: 'Can I convert large numbers?', a: 'Yes, JavaScript handles large integers within Number.MAX_SAFE_INTEGER.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a number in any base field (binary, octal, decimal, or hex).\n2. All other bases update instantly.\n3. Use the custom base field for bases 2–36.' },
      { title: 'Base reference', body: '• Binary (base 2): Uses 0 and 1. Fundamental to computing.\n• Octal (base 8): Uses 0–7. Common in Unix file permissions (e.g., 755).\n• Decimal (base 10): Human standard.\n• Hexadecimal (base 16): Uses 0–9 and A–F. Common for colors (#FF5733), memory addresses, and byte values.' },
    ],
  },
  'svg-optimizer': {
    shortDescription: 'Minify and clean SVG markup.',
    longDescription: 'Optimize SVG files by removing unnecessary metadata, comments, and whitespace to reduce file size while preserving visual output.',
    keywords: ['svg optimizer', 'svg minifier', 'svg cleaner', 'vector optimization'],
    faqs: [
      { q: 'Does it change the visual output?', a: 'No, optimization preserves the visual appearance.' },
      { q: 'Is my SVG uploaded?', a: 'No, all processing happens locally in your browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste SVG markup or upload an SVG file.\n2. Click Optimize to clean the code.\n3. Review the size reduction and copy the optimized SVG.' },
      { title: 'What gets removed', body: '• XML comments and editor metadata (Inkscape, Illustrator cruft).\n• Unnecessary whitespace and line breaks.\n• Empty attributes and default values.\n• Unused namespace declarations.\n\nTypical reduction: 20–60% smaller file size.' },
      { title: 'When to optimize SVGs', body: '• Before adding icons to your web project.\n• When SVG files from design tools are bloated with editor metadata.\n• Before inlining SVGs in HTML or React components.\n• When building icon sprite sheets.' },
    ],
  },
  'url-encoder-decoder': {
    shortDescription: 'Encode, decode, and parse URLs.',
    longDescription: 'URL-encode and decode strings, parse full URLs into components, and edit query parameters with a structured editor.',
    keywords: ['url encoder', 'url decoder', 'query string parser', 'uri encoder'],
    faqs: [
      { q: 'Can I edit query parameters?', a: 'Yes, a structured editor lets you add, remove, and modify params.' },
      { q: 'Does it handle special characters?', a: 'Yes, all characters are properly percent-encoded.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste a URL or text to encode/decode.\n2. Use the parser view to break a full URL into protocol, host, path, and query parameters.\n3. Edit query params in the structured editor and copy the rebuilt URL.' },
      { title: 'URL encoding basics', body: 'URLs can only contain a limited set of ASCII characters. Special characters are replaced with percent-encoded equivalents:\n• Space → %20 (or + in query strings)\n• & → %26\n• = → %3D\n• / → %2F\n\nThis ensures URLs are transmitted correctly across all systems.' },
    ],
  },
  'keyword-density-analyzer': {
    shortDescription: 'Analyze keyword frequency and density in your content.',
    longDescription: 'Paste any text to see keyword frequency, density percentage, TF-IDF scores, and prominence analysis. Helps optimize content for target keywords without overstuffing.',
    keywords: ['keyword density', 'seo analysis', 'keyword frequency', 'content optimization', 'tf-idf', 'keyword tool'],
    faqs: [
      { q: 'Does this tool send my content to a server?', a: 'No. All analysis happens in your browser — nothing is transmitted.' },
      { q: 'What keyword density should I aim for?', a: 'Most SEO experts recommend 1–2% for primary keywords. The tool flags densities above 3% as potential overstuffing.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste or type your content into the text area.\n2. Optionally enter a target keyword to get specific density feedback.\n3. Review the top-20 keyword table, density percentages, and TF-IDF scores.\n4. Check the prominence score to see if your keyword appears early in the content.' },
      { title: 'Understanding keyword density', body: '• Keyword density = (keyword count / total words) × 100.\n• 1–2% is generally ideal for primary keywords.\n• Above 3% risks keyword stuffing penalties.\n• TF-IDF weighs term frequency against document length for a more nuanced measure.' },
    ],
  },
  'title-tag-checker': {
    shortDescription: 'Check title tag length and preview SERP appearance.',
    longDescription: 'Evaluate title tags for optimal length, keyword placement, and readability. Preview exactly how your title appears in Google search results on desktop and mobile.',
    keywords: ['title tag checker', 'seo title', 'serp preview', 'google title', 'meta title', 'title length'],
    faqs: [
      { q: 'What is the ideal title tag length?', a: 'Google typically displays 50–60 characters. The tool shows both character and pixel width.' },
      { q: 'Does keyword position matter?', a: 'Yes — keywords closer to the beginning of the title tend to carry more weight for SEO.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your title tag text.\n2. See character count, estimated pixel width, and a live SERP preview.\n3. Toggle between desktop and mobile preview modes.\n4. Check the keyword position indicator if you entered a target keyword.' },
      { title: 'Title tag best practices', body: '• Keep titles under 60 characters to avoid truncation.\n• Put primary keywords near the beginning.\n• Include your brand name at the end (e.g., "… | BrandName").\n• Make each page title unique and descriptive.' },
    ],
  },
  'schema-markup-generator': {
    shortDescription: 'Generate JSON-LD structured data for rich results.',
    longDescription: 'Build valid JSON-LD schema markup for 11 common types including Article, Product, FAQ, LocalBusiness, and more. Copy the script tag directly into your pages for enhanced search appearance.',
    keywords: ['schema markup', 'json-ld', 'structured data', 'rich results', 'seo schema', 'google rich snippets'],
    faqs: [
      { q: 'Which schema types are supported?', a: 'Article, Product, FAQ, LocalBusiness, BreadcrumbList, HowTo, Event, Person, Organization, WebSite, and Review.' },
      { q: 'Do I need coding skills?', a: 'No — fill in the form fields and the JSON-LD is generated automatically.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select a schema type from the dropdown.\n2. Fill in the required and optional fields.\n3. Copy the generated JSON-LD or the full script tag.\n4. Paste it into your page\'s <head> or before </body>.\n5. Validate with Google\'s Rich Results Test.' },
      { title: 'Why structured data matters', body: '• Enables rich snippets (stars, FAQs, prices) in search results.\n• Helps search engines understand your content type.\n• Can significantly increase click-through rates.\n• Required for many Google Search features like recipe cards and event listings.' },
    ],
  },
  'robots-txt-generator': {
    shortDescription: 'Build and download a robots.txt file visually.',
    longDescription: 'Use a visual editor with presets to create robots.txt rules for your website. Preview the output, add sitemap references, and download the file — all without touching a text editor.',
    keywords: ['robots.txt generator', 'robots txt builder', 'crawl rules', 'seo robots', 'bot directives'],
    faqs: [
      { q: 'What does robots.txt do?', a: 'It tells search engine crawlers which pages they can and cannot access on your site.' },
      { q: 'Can I use presets?', a: 'Yes — choose from Allow All, Block All, Block AI Bots, or Standard presets as starting points.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Choose a preset or start from scratch.\n2. Add user-agent rules with allow/disallow paths.\n3. Optionally add your sitemap URL.\n4. Preview the generated robots.txt.\n5. Copy or download the file.' },
      { title: 'Robots.txt basics', body: '• Place robots.txt at your domain root (e.g., example.com/robots.txt).\n• User-agent: * applies to all bots.\n• Disallow: /admin/ blocks the /admin/ directory.\n• Allow: /admin/public/ creates exceptions within blocked paths.\n• Sitemap: https://example.com/sitemap.xml helps crawlers find your sitemap.' },
    ],
  },
  'open-graph-previewer': {
    shortDescription: 'Preview how links look on social platforms.',
    longDescription: 'Enter Open Graph and Twitter Card metadata to see live previews of how your links will appear on Facebook, Twitter/X, and messaging apps. Generates the HTML meta tags you need.',
    keywords: ['open graph preview', 'twitter card preview', 'social media preview', 'og tags', 'link preview'],
    faqs: [
      { q: 'Does this fetch my actual URL?', a: 'No — you enter the metadata manually and preview it locally.' },
      { q: 'What image size should I use?', a: 'Facebook recommends 1200×630px. Twitter summary_large_image works best at 2:1 ratio.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Fill in the OG title, description, image URL, and URL fields.\n2. Optionally configure Twitter Card settings.\n3. See live previews for Facebook, Twitter/X, and iMessage.\n4. Copy the generated HTML meta tags into your page\'s <head>.' },
      { title: 'Open Graph essentials', body: '• og:title — The title shown in the link preview.\n• og:description — A short summary (under 200 characters).\n• og:image — The preview image URL (use absolute URLs).\n• og:url — The canonical URL of the page.\n• twitter:card — Set to summary_large_image for big image previews.' },
    ],
  },
  'todo-list': {
    shortDescription: 'Simple, private todo list in your browser.',
    longDescription: 'A distraction-free todo list that saves to your browser\'s local storage. Drag to reorder, filter by status, and track your progress — all without accounts or cloud sync.',
    keywords: ['todo list', 'task manager', 'private todo', 'browser todo', 'productivity tool'],
    faqs: [
      { q: 'Is my data saved?', a: 'Yes, todos are saved in your browser\'s local storage and persist between sessions.' },
      { q: 'Can I reorder tasks?', a: 'Yes — drag and drop to reorder your tasks.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Type a task and press Enter or click Add.\n2. Click the checkbox to mark tasks complete.\n3. Use filters to show all, active, or completed tasks.\n4. Drag tasks to reorder priorities.\n5. Use Clear Completed to remove finished tasks.' },
      { title: 'Productivity tips', body: '• Start each day by adding your top 3 tasks.\n• Mark tasks complete as you finish them to build momentum.\n• Use the active filter during focus time to hide completed items.' },
    ],
  },
  'kanban-board': {
    shortDescription: 'Visual task board with drag-and-drop columns.',
    longDescription: 'Organize tasks visually across To Do, In Progress, and Done columns. Drag cards between columns to track workflow status. Everything saves locally in your browser.',
    keywords: ['kanban board', 'task board', 'project management', 'drag and drop', 'workflow board'],
    faqs: [
      { q: 'Can I add more columns?', a: 'The board has three standard columns: To Do, In Progress, and Done.' },
      { q: 'Is data saved between sessions?', a: 'Yes, your board state is saved in browser local storage.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add cards to the To Do column.\n2. Drag cards between columns as work progresses.\n3. Each column shows a card count badge.\n4. Delete cards you no longer need.' },
      { title: 'Kanban method basics', body: '• Limit work in progress — focus on finishing tasks before starting new ones.\n• Move cards left to right as they progress.\n• A healthy board has fewer cards in "In Progress" than in "To Do".' },
    ],
  },
  'eisenhower-matrix': {
    shortDescription: 'Prioritize tasks with the Urgent/Important framework.',
    longDescription: 'Sort tasks into four quadrants based on urgency and importance. The Eisenhower Matrix helps you focus on what truly matters and delegate or eliminate the rest.',
    keywords: ['eisenhower matrix', 'priority matrix', 'task prioritization', 'urgent important', 'time management'],
    faqs: [
      { q: 'What are the four quadrants?', a: 'Do First (urgent + important), Schedule (important, not urgent), Delegate (urgent, not important), and Eliminate (neither).' },
      { q: 'Can I move tasks between quadrants?', a: 'Yes — drag and drop tasks between any quadrant.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add tasks to the Inbox.\n2. Drag each task to the appropriate quadrant.\n3. Focus on the "Do First" quadrant during your workday.\n4. Schedule time for "Schedule" items and delegate or eliminate the rest.' },
      { title: 'The Eisenhower principle', body: '• Do First: Crisis, deadlines, emergencies.\n• Schedule: Long-term goals, planning, exercise, learning.\n• Delegate: Interruptions, some emails, certain meetings.\n• Eliminate: Time wasters, busy work, excessive social media.' },
    ],
  },
  'notepad': {
    shortDescription: 'Distraction-free writing with auto-save.',
    longDescription: 'A clean, minimal notepad with multiple tabs, auto-save to local storage, word/character counts, and a markdown preview mode. Perfect for quick notes and drafts.',
    keywords: ['notepad', 'text editor', 'markdown preview', 'writing tool', 'notes app', 'browser notepad'],
    faqs: [
      { q: 'How many tabs can I have?', a: 'Up to 5 tabs, each auto-saved independently.' },
      { q: 'Does it support markdown?', a: 'Yes — toggle the preview mode to see rendered bold, italic, headings, and lists.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Start typing — your content auto-saves every few seconds.\n2. Create up to 5 tabs for different notes.\n3. Toggle markdown preview to see formatted output.\n4. Word and character counts update in real time.' },
      { title: 'Markdown basics', body: '• **bold** → bold\n• *italic* → italic\n• # Heading 1, ## Heading 2\n• - Item → bullet list\n• 1. Item → numbered list' },
    ],
  },
  'smart-goal-setter': {
    shortDescription: 'Set structured SMART goals with tracking.',
    longDescription: 'Break goals into Specific, Measurable, Achievable, Relevant, and Time-bound components. Track up to 10 goals with completeness indicators and mark them done when achieved.',
    keywords: ['smart goals', 'goal setting', 'goal tracker', 'smart framework', 'objectives'],
    faqs: [
      { q: 'How many goals can I track?', a: 'Up to 10 goals at a time.' },
      { q: 'What makes a goal SMART?', a: 'It must be Specific, Measurable, Achievable, Relevant, and Time-bound.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click Add Goal and fill in each SMART component.\n2. The completeness indicator shows how well-defined your goal is.\n3. Mark goals complete when you achieve them.\n4. Review and refine goals that score low on completeness.' },
      { title: 'SMART framework', body: '• Specific: What exactly do you want to accomplish?\n• Measurable: How will you track progress?\n• Achievable: Is it realistic given your resources?\n• Relevant: Does it align with your broader objectives?\n• Time-bound: What is the deadline?' },
    ],
  },

  // ── Agile Tools ──────────────────────────────────────────────
  'sprint-planner': {
    shortDescription: 'Plan sprints with goals, stories, and progress tracking.',
    longDescription: 'Create and manage sprints with goal setting, story assignment, status tracking, and progress visualization. All data stays in your browser.',
    keywords: ['sprint planner', 'scrum', 'agile planning', 'sprint backlog', 'sprint goal'],
    faqs: [
      { q: 'Is my data stored on a server?', a: 'No. Everything is saved in your browser\'s local storage.' },
      { q: 'How many sprints can I create?', a: 'There is no hard limit — create as many as you need.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "New Sprint" and enter a name, goal, and date range.\n2. Add stories with titles, point estimates, and assignees.\n3. Update story status as work progresses (To Do → In Progress → Done).\n4. Track progress via the completion bar on each sprint.' },
    ],
  },
  'sprint-capacity-calculator': {
    shortDescription: 'Calculate team sprint capacity based on availability.',
    longDescription: 'Determine available team capacity for a sprint by accounting for individual hours, days off, ceremony overhead, and focus factor. Helps avoid over-commitment.',
    keywords: ['sprint capacity', 'team capacity', 'availability calculator', 'agile capacity planning'],
    faqs: [
      { q: 'What is focus factor?', a: 'The percentage of time a team member spends on sprint work vs. meetings, context switching, and other overhead. Typically 60–80%.' },
      { q: 'Are ceremony hours shared?', a: 'Yes. Total ceremony hours are divided equally across team members.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Set the sprint length in working days.\n2. Enter total ceremony hours (standup, planning, review, retro).\n3. Add team members with their daily hours, days off, and focus factor.\n4. View individual and total capacity calculations.' },
    ],
  },
  'release-planning-calculator': {
    shortDescription: 'Forecast release dates from velocity and backlog size.',
    longDescription: 'Estimate when your backlog will be delivered based on team velocity, sprint length, and an optional buffer. See a sprint-by-sprint breakdown with dates.',
    keywords: ['release planning', 'release forecast', 'agile release', 'delivery date estimator'],
    faqs: [
      { q: 'How accurate is the forecast?', a: 'It is an estimate based on constant velocity. Real velocity varies sprint to sprint.' },
      { q: 'What is the buffer for?', a: 'Buffer accounts for unknowns, scope changes, and velocity fluctuations.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter total remaining story points in the backlog.\n2. Set your team\'s average velocity per sprint.\n3. Choose sprint length and an optional buffer percentage.\n4. View the estimated number of sprints, total days, and projected release date.' },
    ],
  },
  'velocity-calculator': {
    shortDescription: 'Track team velocity across sprints with visual charts.',
    longDescription: 'Record committed vs. completed story points per sprint. View average velocity, rolling average, commitment rate, and trends to improve predictability.',
    keywords: ['velocity calculator', 'sprint velocity', 'agile metrics', 'velocity chart', 'team performance'],
    faqs: [
      { q: 'What is a good commitment rate?', a: 'Aim for 80–100%. Consistently over-committing signals estimation issues.' },
      { q: 'How many sprints should I track?', a: 'At least 3–5 sprints for a meaningful average. More data improves accuracy.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add sprint entries with committed and completed story points.\n2. The chart updates automatically showing committed (light) vs. completed (dark) bars.\n3. Review metrics: average velocity, rolling 3-sprint average, commitment rate, and trend.\n4. Use the rolling average for more accurate sprint planning.' },
    ],
  },
  'story-point-estimator': {
    shortDescription: 'Estimate story points using complexity, effort, and uncertainty.',
    longDescription: 'Break down estimation into three dimensions — complexity, effort, and uncertainty — then get a Fibonacci-scale story point recommendation. Helps teams estimate more consistently.',
    keywords: ['story points', 'estimation', 'agile estimation', 'fibonacci points', 'story sizing'],
    faqs: [
      { q: 'Why Fibonacci numbers?', a: 'Fibonacci scale (1, 2, 3, 5, 8, 13, 21) reflects that larger items have more uncertainty, making fine-grained distinctions meaningless.' },
      { q: 'How is the estimate calculated?', a: 'The average of complexity and effort scores is multiplied by the uncertainty factor, then mapped to the nearest Fibonacci number.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Story" and enter a title.\n2. Select complexity level (trivial to very complex).\n3. Select effort level (minimal to very large).\n4. Choose uncertainty (low to very high).\n5. The recommended story point appears in the blue badge.' },
    ],
  },
  'planning-poker': {
    shortDescription: 'Run planning poker estimation sessions.',
    longDescription: 'Facilitate planning poker with multiple participants and customizable card decks (Fibonacci, T-shirt, Powers of 2). Reveal votes simultaneously and identify consensus or outliers.',
    keywords: ['planning poker', 'agile estimation', 'team voting', 'fibonacci cards', 'estimation session'],
    faqs: [
      { q: 'Can multiple people use this on one screen?', a: 'Yes. Add participants, then each person selects their vote one at a time. Votes are hidden until revealed.' },
      { q: 'What decks are available?', a: 'Fibonacci (0–21), T-Shirt (XS–XXL), and Powers of 2 (0–32).' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the story being estimated.\n2. Add team participants by name.\n3. Click each participant to make them active, then select a card to vote.\n4. Once all votes are in, click "Reveal Votes" to see results.\n5. Discuss outliers and re-vote if needed.' },
    ],
  },
  'estimation-comparison': {
    shortDescription: 'Compare estimated vs actual effort to improve accuracy.',
    longDescription: 'Log story point estimates alongside actual effort. Track accuracy, variance, and trends over time to calibrate your team\'s estimation skills.',
    keywords: ['estimation accuracy', 'estimate vs actual', 'agile metrics', 'estimation improvement'],
    faqs: [
      { q: 'What is a good accuracy percentage?', a: 'Above 80% is strong. Most teams improve over time as they calibrate.' },
      { q: 'Does this track individual or team estimates?', a: 'It tracks per-story comparisons. You can use it for individual or team-level data.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add stories with their estimated and actual story points.\n2. View accuracy, average variance, and the over/under breakdown.\n3. The chart shows estimated (light) vs. actual (colored) bars for visual comparison.\n4. Use insights to adjust future estimations.' },
    ],
  },
  'daily-standup-template': {
    shortDescription: 'Structured daily standup notes with history.',
    longDescription: 'Record yesterday/today/blockers for each team member during daily standups. Saves by date so you can review past standups. Highlights blockers automatically.',
    keywords: ['daily standup', 'scrum meeting', 'standup notes', 'team status', 'daily scrum'],
    faqs: [
      { q: 'Are past standups saved?', a: 'Yes. Each date\'s entries are saved locally. Navigate dates to review history.' },
      { q: 'Can I share standup notes?', a: 'Use the Copy button to copy formatted notes to your clipboard for pasting into Slack, Teams, etc.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add team members using "Add Member".\n2. Fill in yesterday\'s work, today\'s plan, and any blockers for each person.\n3. Blockers are highlighted at the top if any are reported.\n4. Use the date picker to navigate to past standups.\n5. Copy all notes to share with the team.' },
    ],
  },
  'ceremony-timer': {
    shortDescription: 'Timebox agile ceremonies with preset durations.',
    longDescription: 'A countdown timer with presets for common agile ceremonies: standup, planning, review, retro, and refinement. Visual and audio alerts when time expires.',
    keywords: ['ceremony timer', 'timebox', 'agile timer', 'standup timer', 'meeting timer'],
    faqs: [
      { q: 'Does it make a sound?', a: 'Yes. An audio tone plays when time expires. You can mute it with the sound toggle.' },
      { q: 'Can I set custom durations?', a: 'Yes. Enter any duration in minutes and click Set.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select a ceremony preset or enter a custom duration.\n2. Press Play to start the countdown.\n3. The timer turns amber in the last 60 seconds and red when finished.\n4. Press Reset to restart the current timer.' },
    ],
  },
  'impediment-log': {
    shortDescription: 'Track and manage team impediments.',
    longDescription: 'Log blockers and impediments with priority, status, assignee, and dates. Filter by status to focus on open issues. All data stored locally in your browser.',
    keywords: ['impediment log', 'blocker tracker', 'agile impediments', 'issue tracking', 'scrum master tool'],
    faqs: [
      { q: 'What is an impediment?', a: 'Anything blocking the team from making progress — technical issues, missing information, external dependencies, etc.' },
      { q: 'Is this a replacement for Jira?', a: 'No. It is a lightweight local tool for quick impediment tracking during sprints.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Log Impediment" to add a new blocker.\n2. Set title, description, priority, and assignee.\n3. Update status as the impediment is worked on (Open → In Progress → Resolved).\n4. Filter by status to focus on active blockers.' },
    ],
  },
  'burndown-chart-generator': {
    shortDescription: 'Generate sprint burndown charts from daily data.',
    longDescription: 'Enter total sprint points and daily remaining effort to generate a visual burndown chart with ideal and actual trendlines. Export data as CSV.',
    keywords: ['burndown chart', 'sprint burndown', 'agile chart', 'progress tracking', 'sprint progress'],
    faqs: [
      { q: 'What does the ideal line show?', a: 'A straight line from total points to zero, representing even daily completion.' },
      { q: 'Can I export the chart?', a: 'You can export the data as CSV. The chart itself is an SVG rendered in the browser.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Set total story points and sprint length in days.\n2. Each day, enter the remaining points in the grid.\n3. The chart plots actual progress against the ideal burndown line.\n4. Use "Export CSV" to save data for external reporting.' },
    ],
  },
  'user-story-builder': {
    shortDescription: 'Build user stories with the standard format.',
    longDescription: 'Create user stories using the "As a / I want / So that" template. Add acceptance criteria, priority, point estimates, and notes. Copy formatted stories to paste into your backlog tool.',
    keywords: ['user story', 'story builder', 'agile requirements', 'as a i want', 'backlog item'],
    faqs: [
      { q: 'What format does this use?', a: 'The standard "As a [role], I want [feature], so that [benefit]" template.' },
      { q: 'Can I add acceptance criteria?', a: 'Yes. Add multiple acceptance criteria per story.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "New Story" to create a user story.\n2. Fill in the role, desired feature, and benefit.\n3. Add acceptance criteria, priority, and story point estimates.\n4. Use the Copy button to export the formatted story.' },
    ],
  },
  'acceptance-criteria-generator': {
    shortDescription: 'Write Given/When/Then acceptance criteria.',
    longDescription: 'Generate structured acceptance criteria using the Gherkin-style Given/When/Then format. Create multiple scenarios per story and copy the formatted output.',
    keywords: ['acceptance criteria', 'given when then', 'gherkin', 'bdd', 'test scenarios'],
    faqs: [
      { q: 'What is Given/When/Then?', a: 'A structured format from BDD: Given a precondition, When an action occurs, Then the expected result happens.' },
      { q: 'Can I use this with BDD tools?', a: 'Yes. The output follows Gherkin syntax and can be pasted into Cucumber or similar frameworks.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Optionally enter the user story being described.\n2. Fill in Given (precondition), When (action), and Then (outcome) for each scenario.\n3. Add multiple scenarios as needed.\n4. Preview and copy the formatted output.' },
    ],
  },
  'epic-breakdown-assistant': {
    shortDescription: 'Break epics into smaller user stories.',
    longDescription: 'Decompose large epics into manageable user stories with priority and point estimates. Track total points per epic and across all epics.',
    keywords: ['epic breakdown', 'story decomposition', 'agile backlog', 'epic to stories', 'work breakdown'],
    faqs: [
      { q: 'What is an epic?', a: 'A large body of work that can be broken into smaller user stories that each deliver value.' },
      { q: 'How small should stories be?', a: 'Aim for stories that can be completed within one sprint. If a story is too large, break it down further.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "New Epic" and describe the high-level goal.\n2. Break it into stories with titles, priorities, and point estimates.\n3. Track total points per epic to gauge overall size.\n4. Delete or add stories as the scope becomes clearer.' },
    ],
  },
  'story-mapping-tool': {
    shortDescription: 'Create visual user story maps with release slicing.',
    longDescription: 'Build user story maps organized by activities and tasks. Assign stories to releases for incremental delivery planning. Visualize the product backbone and prioritize features.',
    keywords: ['story mapping', 'user story map', 'release planning', 'product backbone', 'feature mapping'],
    faqs: [
      { q: 'What is a story map?', a: 'A visual layout of user activities (left-to-right) and stories (top-to-bottom by priority), helping teams see the big picture.' },
      { q: 'How do releases work?', a: 'Create release lanes and assign stories to them. Stories in Release 1 (MVP) ship first.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Create activities representing major user goals (left to right).\n2. Add tasks under each activity.\n3. Add stories under tasks and assign them to a release.\n4. Use release lanes to plan incremental delivery.' },
    ],
  },
  'retrospective-board': {
    shortDescription: 'Run sprint retrospectives with multiple formats.',
    longDescription: 'Choose from four retrospective formats: Went Well/Improve/Actions, Glad/Sad/Mad, Start/Stop/Continue, and 4Ls (Liked/Learned/Lacked/Longed For). Add items, vote on them, and copy results.',
    keywords: ['retrospective', 'retro board', 'sprint retro', 'team feedback', 'continuous improvement'],
    faqs: [
      { q: 'How many formats are available?', a: 'Four: Went Well/Improve/Actions, Glad/Sad/Mad, Start/Stop/Continue, and 4Ls.' },
      { q: 'Can team members vote?', a: 'Yes. Click the thumbs-up icon on any item to vote. Items sort by votes automatically.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select a retrospective format from the dropdown.\n2. Add items to each column.\n3. Vote on the most important items.\n4. Discuss top-voted items and create action items.\n5. Copy the board to share with the team.' },
    ],
  },
  'definition-of-done-checklist': {
    shortDescription: 'Track your team\'s Definition of Done criteria.',
    longDescription: 'Create and manage a Definition of Done checklist with customizable criteria. Check items per story, track progress, and copy the checklist for team reference.',
    keywords: ['definition of done', 'dod', 'quality checklist', 'done criteria', 'agile standards'],
    faqs: [
      { q: 'What is Definition of Done?', a: 'A shared checklist of criteria that must be met before a story can be considered complete.' },
      { q: 'Can I customize the criteria?', a: 'Yes. Add, remove, or edit any criteria. Use "Defaults" to restore the starter set.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Review the default criteria and customize for your team.\n2. Check items as they are completed for each story.\n3. The progress bar shows overall completion.\n4. Use "Uncheck" to reset for the next story.\n5. Copy the checklist to share with the team.' },
    ],
  },
  'definition-of-ready-checklist': {
    shortDescription: 'Ensure stories are ready for sprint with a DoR checklist.',
    longDescription: 'A Definition of Ready checklist to verify stories meet all prerequisites before entering a sprint. Customizable criteria with progress tracking.',
    keywords: ['definition of ready', 'dor', 'ready checklist', 'refinement', 'backlog readiness'],
    faqs: [
      { q: 'When do I use this?', a: 'During backlog refinement. Check criteria for each story before it enters a sprint.' },
      { q: 'How is it different from Definition of Done?', a: 'DoR checks if a story is ready to START. DoD checks if a story is ready to SHIP.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Review criteria during backlog refinement.\n2. Check items as they are confirmed for a story.\n3. A story is sprint-ready when all criteria are met.\n4. Customize criteria to match your team\'s needs.' },
    ],
  },
  'working-agreement-builder': {
    shortDescription: 'Build team working agreements collaboratively.',
    longDescription: 'Define team norms and working agreements across categories like communication, meetings, code quality, and work-life balance. Mark rules as agreed-upon and share with the team.',
    keywords: ['working agreement', 'team norms', 'team rules', 'social contract', 'team charter'],
    faqs: [
      { q: 'What is a working agreement?', a: 'A set of norms the team agrees to follow, covering communication, meetings, code practices, and collaboration.' },
      { q: 'Should the whole team agree?', a: 'Yes. Working agreements work best when everyone participates in creating them and the team revisits them periodically.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Review the default rules and customize for your team.\n2. Add new rules in any category.\n3. Click the circle next to each rule to mark it as team-agreed.\n4. Copy the agreement to share via Slack, Confluence, or email.\n5. Revisit and update the agreement during retrospectives.' },
    ],
  },

  // ── Project Management Tools ─────────────────────────────────
  'task-breakdown-wbs': {
    shortDescription: 'Build hierarchical work breakdown structures.',
    longDescription: 'Create a tree of project deliverables, phases, and work packages. Add, edit, delete, collapse, and reorder nodes. Export the full WBS as JSON or CSV.',
    keywords: ['wbs', 'work breakdown structure', 'task tree', 'project planning', 'hierarchy'],
    faqs: [
      { q: 'What is a WBS?', a: 'A Work Breakdown Structure is a hierarchical decomposition of a project into deliverables and tasks.' },
      { q: 'Can I export my WBS?', a: 'Yes. Export as JSON for re-import or CSV for spreadsheets.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Root" to create a top-level deliverable.\n2. Hover over any node and click + to add a child.\n3. Collapse/expand branches with the arrow icon.\n4. Export as JSON or CSV when finished.' },
    ],
  },
  'gantt-chart-generator': {
    shortDescription: 'Create Gantt charts with tasks, dates, and dependencies.',
    longDescription: 'Add tasks with start and end dates, define dependency links between them, and view a visual Gantt chart. Export the chart as SVG.',
    keywords: ['gantt chart', 'project schedule', 'timeline', 'dependencies', 'svg export'],
    faqs: [
      { q: 'Can I set dependencies?', a: 'Yes. Each task can depend on another task. Dependencies are shown as red arrows on the chart.' },
      { q: 'How do I export?', a: 'Click the SVG button to download the Gantt chart as an SVG file.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Task" and fill in name, start date, and end date.\n2. Optionally set a dependency from the dropdown.\n3. The Gantt chart renders automatically below the task list.\n4. Click "SVG" to export the chart.' },
    ],
  },
  'project-timeline-planner': {
    shortDescription: 'Plan timelines with milestones and phases.',
    longDescription: 'Create project timelines by adding milestones and phases with dates. Reorder items and view a visual timeline showing progress.',
    keywords: ['timeline', 'milestones', 'phases', 'project plan', 'visual timeline'],
    faqs: [
      { q: 'What\'s the difference between a milestone and a phase?', a: 'A milestone is a single point in time. A phase has a start and end date.' },
      { q: 'Can I reorder items?', a: 'Yes. Use the up/down arrows next to each item.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add milestones (single date) or phases (date range).\n2. Enter names and dates for each item.\n3. Use arrows to reorder items.\n4. The visual timeline updates automatically.' },
    ],
  },
  'milestone-tracker': {
    shortDescription: 'Track project milestones with status and progress.',
    longDescription: 'Define project milestones with names, due dates, and notes. Toggle status between pending and done. View overall progress with a summary bar.',
    keywords: ['milestone tracker', 'progress', 'project milestones', 'status tracking', 'deadlines'],
    faqs: [
      { q: 'How do I mark a milestone done?', a: 'Click the status icon next to the milestone to toggle between pending and done.' },
      { q: 'Is there a progress summary?', a: 'Yes. A progress bar shows completed vs. total milestones.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Milestone" and enter a name and due date.\n2. Click the icon to mark milestones as done.\n3. Add optional notes for context.\n4. Track progress via the summary bar at the top.' },
    ],
  },
  'time-blocking-planner': {
    shortDescription: 'Plan your day or week with time blocks.',
    longDescription: 'Assign tasks to hourly time slots for any day of the week. Switch between day and week views. Copy or export your schedule.',
    keywords: ['time blocking', 'schedule planner', 'day plan', 'week plan', 'time management'],
    faqs: [
      { q: 'What hours are shown?', a: '6 AM to 9 PM in one-hour slots.' },
      { q: 'Can I export my schedule?', a: 'Yes. Use the Export button to download as text, or Copy to clipboard.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Select Day or Week view.\n2. Type tasks into the time slots.\n3. Switch days using the dropdown.\n4. Copy or export your schedule.' },
    ],
  },
  'resource-allocation-planner': {
    shortDescription: 'Assign team members to tasks with capacity tracking.',
    longDescription: 'Add resources and tasks, then set percentage allocations per person per task. See total allocation per resource with over-allocation warnings.',
    keywords: ['resource allocation', 'team capacity', 'assignment', 'workload', 'over-allocation'],
    faqs: [
      { q: 'What triggers an over-allocation warning?', a: 'When a resource\'s total allocation exceeds 100%.' },
      { q: 'Can I see allocation percentages?', a: 'Yes. Each resource shows their total allocation alongside a visual indicator.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add team members with their names and roles.\n2. Add tasks and enter allocation percentages per person.\n3. Watch for red warnings on over-allocated resources.\n4. Adjust allocations to balance the team.' },
    ],
  },
  'effort-estimation-calculator': {
    shortDescription: 'Estimate total effort hours with buffer adjustment.',
    longDescription: 'List tasks with estimated hours. See total raw hours, apply a buffer percentage, and get the grand total effort. Useful for project proposals.',
    keywords: ['effort estimation', 'task hours', 'buffer', 'project estimate', 'total effort'],
    faqs: [
      { q: 'What is the buffer for?', a: 'Buffer accounts for unknowns, context switching, and unexpected complexity. Typically 15–30%.' },
      { q: 'How is total effort calculated?', a: 'Sum of task hours plus the buffer percentage applied to that sum.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add tasks with estimated hours.\n2. Set a buffer percentage using the slider.\n3. View the summary: raw hours, buffer hours, and total effort.\n4. Adjust tasks or buffer as needed.' },
    ],
  },
  'cost-estimator': {
    shortDescription: 'Estimate project cost with rates and fixed costs.',
    longDescription: 'Add variable cost items (hourly rate × hours) and fixed cost items. See a breakdown of variable, fixed, and total project cost.',
    keywords: ['cost estimator', 'project budget', 'hourly rate', 'fixed cost', 'variable cost'],
    faqs: [
      { q: 'What\'s the difference between fixed and variable?', a: 'Variable costs depend on hours worked (rate × hours). Fixed costs are flat amounts (licenses, equipment).' },
      { q: 'Can I mix both types?', a: 'Yes. Each line item is either variable or fixed.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Line Item" and select variable or fixed.\n2. For variable: enter hours and hourly rate.\n3. For fixed: enter the flat amount.\n4. View the total project cost in the summary.' },
    ],
  },
  'workload-calculator': {
    shortDescription: 'Track per-person workload with capacity balancing.',
    longDescription: 'Add team members with max hours, then assign tasks with hours and owners. View load bars per person with over-capacity warnings.',
    keywords: ['workload calculator', 'team capacity', 'load balancing', 'task assignment', 'hours'],
    faqs: [
      { q: 'How is overload detected?', a: 'When assigned hours exceed the person\'s max hours, the bar turns red.' },
      { q: 'Can tasks be unassigned?', a: 'Yes. Leave the assignee blank and the hours won\'t count toward anyone\'s load.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add team members with their available hours.\n2. Add tasks with estimated hours and assign to team members.\n3. Check load bars to see who is over or under capacity.\n4. Reassign tasks to balance the workload.' },
    ],
  },
  'raid-log': {
    shortDescription: 'Track Risks, Assumptions, Issues, and Dependencies.',
    longDescription: 'Maintain a RAID log with categorized entries. Set priority, owner, status, and dates. Filter by type, copy entries, or export as CSV.',
    keywords: ['raid log', 'risks', 'assumptions', 'issues', 'dependencies', 'project governance'],
    faqs: [
      { q: 'What does RAID stand for?', a: 'Risks, Assumptions, Issues, and Dependencies — the four categories of project governance items.' },
      { q: 'Can I export the log?', a: 'Yes. Export as CSV or copy to clipboard.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click a type button (Risk, Assumption, Issue, Dependency) to add an entry.\n2. Fill in title, description, priority, owner, and status.\n3. Filter by type to focus on specific categories.\n4. Export as CSV for external sharing.' },
    ],
  },
  'risk-assessment-matrix': {
    shortDescription: 'Assess risks on a likelihood × impact heatmap.',
    longDescription: 'Add risks with likelihood and impact ratings. See auto-calculated risk scores and a visual heatmap grid showing where each risk falls.',
    keywords: ['risk matrix', 'heatmap', 'likelihood', 'impact', 'risk scoring', 'assessment'],
    faqs: [
      { q: 'How is the score calculated?', a: 'Score = Likelihood (1–5) × Impact (1–5). Scores range from 1 (low) to 25 (critical).' },
      { q: 'What do the colors mean?', a: 'Green = low risk, yellow = medium, orange = high, red = critical.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Risk" and describe the risk.\n2. Select likelihood and impact levels from the dropdowns.\n3. View the auto-calculated score and severity label.\n4. Check the heatmap to see all risks plotted visually.' },
    ],
  },
  'dependency-tracker': {
    shortDescription: 'Map task dependencies with blocked/unblocked status.',
    longDescription: 'Define tasks and set dependencies between them. See which tasks are blocked vs. unblocked. View a simple dependency graph.',
    keywords: ['dependency tracker', 'blocked', 'unblocked', 'task dependencies', 'graph'],
    faqs: [
      { q: 'How do I add a dependency?', a: 'Click the dependency pills below a task to toggle which tasks it depends on.' },
      { q: 'What is a blocked task?', a: 'A task with one or more dependencies is considered blocked until those dependencies are resolved.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Add tasks with names.\n2. Click dependency badges to link tasks.\n3. Blocked tasks show an amber indicator.\n4. Use the graph view to visualize the dependency chain.' },
    ],
  },
  'scope-change-log': {
    shortDescription: 'Log and track project scope changes.',
    longDescription: 'Record change requests with impact level, decision status (Pending, Approved, Rejected, Deferred), and approval tracking. Export as CSV.',
    keywords: ['scope change', 'change request', 'impact assessment', 'approval', 'change log'],
    faqs: [
      { q: 'What decisions are available?', a: 'Pending, Approved, Rejected, and Deferred.' },
      { q: 'Can I export changes?', a: 'Yes. Use the CSV export to share with stakeholders.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Log Change" when a scope change is requested.\n2. Enter title, description, requester, and impact level.\n3. Set the decision status as discussions progress.\n4. Export as CSV for audit trails.' },
    ],
  },
  'action-item-tracker': {
    shortDescription: 'Track action items with owner, due date, and status.',
    longDescription: 'Create action items with owners and due dates. Filter by status or owner. Overdue items are highlighted in red.',
    keywords: ['action items', 'task tracker', 'owner', 'due date', 'status tracking'],
    faqs: [
      { q: 'How are overdue items shown?', a: 'Items past their due date with status other than Done are highlighted in red.' },
      { q: 'Can I filter by owner?', a: 'Yes. Use the owner dropdown to see items for a specific person.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add Item" to create an action item.\n2. Set the title, owner, due date, and status.\n3. Filter by status (Open, In Progress, Done) or by owner.\n4. Watch for red highlights on overdue items.' },
    ],
  },
  'project-status-report': {
    shortDescription: 'Generate RAG status reports for project updates.',
    longDescription: 'Set Red/Amber/Green status for Overall, Scope, Schedule, Budget, and Risk. Add key updates, risks, and next steps. Copy or export the report.',
    keywords: ['status report', 'rag status', 'red amber green', 'project update', 'report generator'],
    faqs: [
      { q: 'What is RAG?', a: 'Red/Amber/Green — a traffic-light system to quickly communicate project health.' },
      { q: 'Can I share the report?', a: 'Yes. Copy to clipboard or export as a text file.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter the project name and report date.\n2. Click the colored circles to set RAG status for each dimension.\n3. Fill in key updates, risks, and next steps.\n4. Copy or export the formatted report.' },
    ],
  },
  'kpi-metrics-tracker': {
    shortDescription: 'Define and track KPIs with trend sparklines.',
    longDescription: 'Create KPIs with names, units, and targets. Add data points over time and see sparkline trend charts. Track whether metrics are meeting targets.',
    keywords: ['kpi tracker', 'metrics', 'trend chart', 'performance', 'sparkline'],
    faqs: [
      { q: 'What is the dashed line on the chart?', a: 'It represents your target value for that KPI.' },
      { q: 'How many data points do I need for a chart?', a: 'At least 2 data points are needed to render a sparkline.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click "Add KPI" and enter a name, unit, and target.\n2. Add data points with dates and values.\n3. The sparkline shows the trend over time.\n4. The dashed line shows your target for comparison.' },
    ],
  },
  'project-health-dashboard': {
    shortDescription: 'Auto-score project health from scope, cost, time, and risk.',
    longDescription: 'Rate four dimensions (scope, cost, time, risk) on a 0–100 scale. Get an auto-calculated overall health score with Healthy/At Risk/Critical labels and a summary table.',
    keywords: ['project health', 'dashboard', 'health score', 'scope', 'cost', 'time', 'risk'],
    faqs: [
      { q: 'How is the overall score calculated?', a: 'It is the average of the four dimension scores.' },
      { q: 'What do the labels mean?', a: '80–100 = Healthy, 60–79 = At Risk, below 60 = Critical.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter your project name.\n2. Adjust the sliders for Scope, Cost, Time, and Risk.\n3. The overall health score and label update automatically.\n4. Add notes for additional context.' },
    ],
  },
  'checklist-builder': {
    shortDescription: 'Build custom checklists with templates and progress tracking.',
    longDescription: 'Create reusable checklists from scratch or from built-in templates (Product Launch, Team Onboarding, Code Review). Check items off, track progress, and copy results.',
    keywords: ['checklist builder', 'custom checklist', 'templates', 'progress tracking', 'reusable'],
    faqs: [
      { q: 'What templates are available?', a: 'Blank, Product Launch, Team Onboarding, and Code Review.' },
      { q: 'Can I reuse a checklist?', a: 'Yes. Click "Uncheck all" to reset for reuse, or create a new one from the same template.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Pick a template or start blank.\n2. Add or customize checklist items.\n3. Check items as they are completed.\n4. Track progress with the percentage bar.\n5. Copy the checklist to share.' },
    ],
  },

  // ── CSS/HTML Tools ───────────────────────────────────────────
  'css-box-shadow-generator': {
    shortDescription: 'Generate CSS box shadow values visually.',
    longDescription: 'Create and customize CSS box shadows with a visual editor. Add multiple shadow layers, adjust X/Y offsets, blur, spread, color, and inset — then copy the generated CSS instantly.',
    keywords: ['box shadow', 'css shadow', 'shadow generator', 'css tool', 'multiple shadows'],
    faqs: [
      { q: 'Can I add multiple shadow layers?', a: 'Yes. Click "Add Shadow Layer" to stack shadows. Each layer has independent controls.' },
      { q: 'What is inset?', a: 'Inset makes the shadow appear inside the element instead of outside.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Use sliders to adjust offset, blur, spread.\n2. Pick a shadow color and toggle inset if needed.\n3. Add more layers for complex effects.\n4. Preview updates live in the box above.\n5. Copy the generated CSS.' },
    ],
  },
  'css-border-radius-generator': {
    shortDescription: 'Generate CSS border-radius values with a visual editor.',
    longDescription: 'Adjust each corner independently or link all corners together. Choose px, %, or rem units. See the shape update in real time and copy the CSS.',
    keywords: ['border radius', 'css', 'rounded corners', 'corner builder'],
    faqs: [
      { q: 'Can I set each corner independently?', a: 'Yes. Uncheck "Link all corners" to adjust each corner separately.' },
      { q: 'What units are available?', a: 'px, %, and rem.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Toggle "Link all corners" on or off.\n2. Drag sliders to set each corner radius.\n3. Choose your preferred unit.\n4. Preview the shape live.\n5. Copy the CSS.' },
    ],
  },
  'css-flexbox-playground': {
    shortDescription: 'Interactive CSS flexbox layout visualizer.',
    longDescription: 'Toggle flex direction, wrap, justify-content, align-items, align-content, and gap. See colored flex items rearrange in real time. Copy the generated CSS.',
    keywords: ['flexbox', 'css layout', 'flex', 'visualizer', 'justify-content', 'align-items'],
    faqs: [
      { q: 'Can I change the number of items?', a: 'Yes. Use the +/- buttons to add or remove flex items (1–12).' },
      { q: 'Does it support all flex properties?', a: 'It covers direction, wrap, justify-content, align-items, align-content, and gap.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Pick values from the dropdown menus.\n2. Adjust the gap slider.\n3. Add or remove child items.\n4. Watch the layout update live.\n5. Copy the generated CSS.' },
    ],
  },
  'css-grid-generator': {
    shortDescription: 'Visual CSS Grid layout builder.',
    longDescription: 'Set columns, rows, gaps, and sizes. Choose fr, px, %, or auto units. See the grid render live with numbered cells and copy the CSS.',
    keywords: ['css grid', 'grid layout', 'columns', 'rows', 'grid template'],
    faqs: [
      { q: 'What units can I use?', a: 'fr, px, %, and auto for both columns and rows.' },
      { q: 'Can I set custom column sizes?', a: 'Yes. Enter comma-separated values like "1,2,1" in the sizes field.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Set the number of columns and rows.\n2. Customize sizes (comma-separated).\n3. Adjust column and row gaps.\n4. View the live grid preview.\n5. Copy the CSS.' },
    ],
  },
  'css-animation-generator': {
    shortDescription: 'Build CSS keyframe animations with live preview.',
    longDescription: 'Define @keyframes with custom offsets and CSS properties. Set duration, timing, delay, iterations, direction, and fill mode. Preview the animation and copy the CSS.',
    keywords: ['css animation', 'keyframes', 'timing', 'easing', 'motion', 'transition'],
    faqs: [
      { q: 'Can I add multiple keyframes?', a: 'Yes. Click "Add" to insert keyframes at any percentage offset.' },
      { q: 'How do I replay the animation?', a: 'Click the replay icon in the top-right of the preview.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Set animation name, duration, and timing.\n2. Define keyframes with offset % and CSS properties.\n3. Adjust iterations, direction, and fill mode.\n4. Watch the live preview.\n5. Copy the full @keyframes + animation CSS.' },
    ],
  },
  'css-filter-generator': {
    shortDescription: 'Adjust CSS filter effects with live preview.',
    longDescription: 'Use sliders for blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia. See the effect on a preview element and copy the CSS filter property.',
    keywords: ['css filter', 'blur', 'brightness', 'contrast', 'grayscale', 'hue-rotate', 'sepia'],
    faqs: [
      { q: 'How many filters can I combine?', a: 'All 9 filters can be combined simultaneously. Only non-default values are included in the output.' },
      { q: 'Can I reset all filters?', a: 'Yes. Click the reset button to restore all defaults.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Move sliders to adjust filter values.\n2. Preview the effect on the gradient box.\n3. Only changed values appear in the output.\n4. Copy the generated CSS filter property.' },
    ],
  },
  'css-clip-path-maker': {
    shortDescription: 'Build CSS clip-path polygon shapes visually.',
    longDescription: 'Drag points on a canvas or pick from presets (triangle, diamond, pentagon, hexagon, star, arrow). See the clipped shape update live and copy the clip-path CSS.',
    keywords: ['clip-path', 'polygon', 'css shape', 'mask', 'clip path maker'],
    faqs: [
      { q: 'Can I drag the points?', a: 'Yes. Click and drag any white circle on the canvas to move that vertex.' },
      { q: 'What presets are available?', a: 'Triangle, diamond, pentagon, hexagon, star, and arrow.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Pick a preset shape or start with a triangle.\n2. Drag points to reshape, or click the canvas to add points.\n3. Fine-tune coordinates in the points panel.\n4. Copy the clip-path CSS.' },
    ],
  },
  'css-units-converter': {
    shortDescription: 'Convert between px, rem, em, vh, vw, and pt.',
    longDescription: 'Enter a value and convert between CSS units. Set a custom base font size and viewport dimensions for accurate rem/em/vh/vw conversions. See all unit equivalents at once.',
    keywords: ['css units', 'px to rem', 'rem to px', 'em', 'vh', 'vw', 'converter'],
    faqs: [
      { q: 'How are rem and em calculated?', a: 'Both use the base font size (default 16px). 1rem = 1em = base font size.' },
      { q: 'How are vh/vw calculated?', a: '1vh = 1% of viewport height, 1vw = 1% of viewport width.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter a numeric value.\n2. Select "From" and "To" units.\n3. Adjust base font size and viewport if needed.\n4. See the result and quick reference for all units.\n5. Copy the converted value.' },
    ],
  },
  'html-formatter-beautifier': {
    shortDescription: 'Format and beautify messy HTML code.',
    longDescription: 'Paste unformatted HTML and get it properly indented with consistent whitespace. Choose 2-space, 4-space, or tab indentation.',
    keywords: ['html formatter', 'beautify', 'pretty print', 'indent', 'html cleanup'],
    faqs: [
      { q: 'Does it fix broken HTML?', a: 'It formats indentation and whitespace. It does not auto-close missing tags.' },
      { q: 'What indent options are available?', a: '2 spaces, 4 spaces, or tabs.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste messy HTML in the left panel.\n2. Choose your indent style (2/4 spaces or tab).\n3. Formatted output appears on the right.\n4. Copy the result.' },
    ],
  },
  'html-to-markdown': {
    shortDescription: 'Convert HTML to clean Markdown.',
    longDescription: 'Paste HTML and get Markdown output. Converts headings, bold, italic, links, images, lists, code blocks, blockquotes, and horizontal rules.',
    keywords: ['html to markdown', 'converter', 'markdown', 'html', 'transform'],
    faqs: [
      { q: 'What HTML elements are supported?', a: 'Headings (h1–h6), bold, italic, links, images, lists, code, pre, blockquotes, paragraphs, and hr.' },
      { q: 'Does it handle nested lists?', a: 'Basic list conversion is supported. Deeply nested lists may need manual adjustment.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste HTML in the left panel.\n2. Markdown output appears on the right.\n3. Copy the Markdown result.' },
    ],
  },
  'favicon-generator': {
    shortDescription: 'Generate all favicon sizes from one image.',
    longDescription: 'Upload an SVG or PNG and generate all standard favicon sizes (16, 32, 48, 180, 192, 512). Download each individually or all at once. Copy the HTML link tags.',
    keywords: ['favicon', 'icon generator', 'sizes', 'apple touch icon', 'meta tags'],
    faqs: [
      { q: 'What sizes are generated?', a: '16×16, 32×32, 48×48, 180×180 (Apple Touch Icon), 192×192 and 512×512 (Android Chrome).' },
      { q: 'What input formats work?', a: 'SVG, PNG, and JPEG. Square images at least 512×512 give the best results.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Upload an SVG or PNG image.\n2. All favicon sizes are generated instantly.\n3. Download individual sizes or all at once.\n4. Copy the HTML link tags for your <head>.' },
    ],
  },
  'button-generator': {
    shortDescription: 'Build CSS buttons with a visual editor.',
    longDescription: 'Customize text, colors (normal + hover), padding, font size, border, border-radius, shadow, and transition speed. Preview the button with hover and copy CSS + HTML.',
    keywords: ['button generator', 'css button', 'hover effect', 'button builder'],
    faqs: [
      { q: 'Can I preview the hover state?', a: 'Yes. Hover over the preview button to see the hover colors in action.' },
      { q: 'Does it generate HTML too?', a: 'Yes. Both CSS and the HTML button element are included in the output.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Enter button text.\n2. Adjust colors, padding, font, border, and shadow.\n3. Hover over the preview to test the hover state.\n4. Copy the generated CSS and HTML.' },
    ],
  },
  'glassmorphism-generator': {
    shortDescription: 'Create a CSS glassmorphism / frosted glass effect.',
    longDescription: 'Build a trendy frosted-glass card with adjustable transparency, blur, saturation, and border. Preview on a colorful background and copy the CSS with backdrop-filter.',
    keywords: ['glassmorphism', 'frosted glass', 'backdrop-filter', 'blur effect', 'css'],
    faqs: [
      { q: 'What is glassmorphism?', a: 'A design trend featuring semi-transparent backgrounds with a frosted glass blur, creating a sense of depth.' },
      { q: 'Does backdrop-filter work everywhere?', a: 'It is supported in all modern browsers. The generated CSS includes the -webkit- prefix for Safari.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Adjust opacity, blur, saturation, and border.\n2. Pick a base color.\n3. See the glass card on the colorful background.\n4. Copy the generated CSS.' },
    ],
  },
  'neumorphism-generator': {
    shortDescription: 'Build soft UI neumorphism effects in CSS.',
    longDescription: 'Create neumorphic (soft UI) elements with four shape modes: flat, concave, convex, and pressed. Adjust background color, distance, intensity, blur, and radius.',
    keywords: ['neumorphism', 'soft ui', 'css shadows', 'skeuomorphism', 'soft design'],
    faqs: [
      { q: 'What are the shape modes?', a: 'Flat (standard), concave (inward curve), convex (outward curve), and pressed (inset shadow).' },
      { q: 'Why does the background color matter?', a: 'Neumorphism works by creating light and dark shadows relative to the background, so the BG color is essential.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Pick a background color.\n2. Choose a shape mode (flat, concave, convex, pressed).\n3. Adjust distance, intensity, blur, and radius.\n4. Copy the generated CSS.' },
    ],
  },
  'css-variable-extractor': {
    shortDescription: 'Extract CSS custom properties from any stylesheet.',
    longDescription: 'Paste CSS and instantly extract all custom properties (--variable declarations). View them in a table with color swatches and copy as a clean :root block.',
    keywords: ['css variables', 'custom properties', 'extract', '--var', 'root block'],
    faqs: [
      { q: 'What does it extract?', a: 'All declarations that start with -- (CSS custom properties / variables).' },
      { q: 'Does it show color previews?', a: 'Yes. If a variable value looks like a color (hex, rgb, hsl), a swatch is shown.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Paste CSS in the input panel.\n2. Variables are extracted instantly.\n3. Review the table for names, values, and color swatches.\n4. Copy the :root block.' },
    ],
  },

  // ─── Maths & Science Tools ───
  'matrix-calculator': {
    shortDescription: 'Perform matrix operations up to 6×6.',
    longDescription: 'Add, subtract, multiply matrices. Compute determinant, inverse, and transpose with step-by-step solutions for matrices up to 6×6.',
    keywords: ['matrix', 'determinant', 'inverse', 'transpose', 'linear algebra', 'multiply matrices'],
    faqs: [
      { q: 'What size matrices are supported?', a: 'Up to 6×6 for all operations.' },
      { q: 'Does it show step-by-step?', a: 'Yes, determinant and inverse calculations show cofactor expansion steps.' },
    ],
    guide: [{ title: 'How to use', body: '1. Set matrix dimensions.\n2. Enter values.\n3. Choose an operation.\n4. View results and steps.' }],
  },
  'equation-solver': {
    shortDescription: 'Solve linear, quadratic, cubic equations and systems.',
    longDescription: 'Solve linear, quadratic (with discriminant analysis), and cubic equations using Cardano\'s formula. Also solves 2×2 and 3×3 systems using Cramer\'s Rule.',
    keywords: ['equation', 'quadratic', 'cubic', 'linear system', 'cramer rule', 'discriminant'],
    faqs: [
      { q: 'What types of equations?', a: 'Linear (ax+b=0), quadratic (ax²+bx+c=0), cubic, 2×2 systems, 3×3 systems.' },
      { q: 'Does it handle complex roots?', a: 'Yes, quadratic solver shows complex roots when discriminant is negative.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select equation type.\n2. Enter coefficients.\n3. View solutions with step-by-step working.' }],
  },
  'polynomial-calculator': {
    shortDescription: 'Polynomial arithmetic, roots, and graphing.',
    longDescription: 'Add, subtract, multiply polynomials. Find roots, evaluate at any x value, and visualize with an SVG plot.',
    keywords: ['polynomial', 'roots', 'factor', 'algebra', 'graph', 'evaluate'],
    faqs: [
      { q: 'How do I enter a polynomial?', a: 'Enter coefficients from highest to lowest degree, separated by commas.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter polynomial coefficients.\n2. Choose operation.\n3. View result and graph.' }],
  },
  'statistics-calculator': {
    shortDescription: 'Descriptive statistics with histogram and outlier detection.',
    longDescription: 'Calculate mean, median, mode, range, standard deviation, variance, quartiles, IQR, and Z-scores. Detect outliers and view histogram.',
    keywords: ['statistics', 'mean', 'median', 'standard deviation', 'histogram', 'quartile', 'outlier'],
    faqs: [
      { q: 'How do I enter data?', a: 'Enter numbers separated by commas or spaces.' },
      { q: 'Does it detect outliers?', a: 'Yes, using the 1.5×IQR rule.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter comma-separated numbers.\n2. View all statistics, histogram, and outlier analysis.' }],
  },
  'probability-calculator': {
    shortDescription: 'Permutations, combinations, and distributions.',
    longDescription: 'Calculate permutations (nPr), combinations (nCr), binomial distribution probabilities, and normal distribution CDF approximation.',
    keywords: ['probability', 'permutation', 'combination', 'binomial', 'normal distribution'],
    faqs: [
      { q: 'What distributions are supported?', a: 'Binomial and normal (Gaussian) distributions.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter parameters.\n3. View probability results.' }],
  },
  'prime-number-tools': {
    shortDescription: 'Prime checker, factorization, sieve, GCD/LCM.',
    longDescription: 'Check if a number is prime, find prime factorization with steps, list primes in a range using the Sieve of Eratosthenes, and calculate GCD/LCM.',
    keywords: ['prime', 'factorization', 'sieve', 'gcd', 'lcm', 'euclidean'],
    faqs: [
      { q: 'How large can numbers be?', a: 'Primality testing works for numbers up to several million. Factorization uses trial division.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose a mode.\n2. Enter number(s).\n3. View results with step-by-step working.' }],
  },
  'number-theory-calculator': {
    shortDescription: 'Factorial, Fibonacci, modular arithmetic, Euler totient.',
    longDescription: 'Calculate factorials (up to 1000 using BigInt), Fibonacci numbers, modular arithmetic with modular exponentiation, and Euler\'s totient function.',
    keywords: ['factorial', 'fibonacci', 'modular arithmetic', 'euler totient', 'number theory'],
    faqs: [
      { q: 'How large can factorials get?', a: 'Up to 1000! using BigInt for exact results.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter values.\n3. View results.' }],
  },
  'fraction-calculator': {
    shortDescription: 'Fraction arithmetic with mixed numbers and conversions.',
    longDescription: 'Add, subtract, multiply, divide fractions including mixed numbers. Automatically simplifies using GCD. Convert between fractions, decimals, and percentages.',
    keywords: ['fraction', 'mixed number', 'simplify', 'decimal', 'percentage'],
    faqs: [
      { q: 'Does it support mixed numbers?', a: 'Yes, enter whole part and fraction separately.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter fractions.\n2. Choose operation.\n3. View simplified result and conversions.' }],
  },
  'logarithm-calculator': {
    shortDescription: 'Log, natural log, antilog with step-by-step.',
    longDescription: 'Calculate logarithms of any base, natural log (ln), antilog, and change of base. Shows step-by-step explanation of each calculation.',
    keywords: ['logarithm', 'log', 'ln', 'antilog', 'change of base'],
    faqs: [
      { q: 'What bases are supported?', a: 'Any positive base. Common bases 10, e, and 2 are provided as presets.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter value and base.\n3. View result with step-by-step.' }],
  },
  'trigonometry-calculator': {
    shortDescription: 'Trig functions, unit circle, and triangle solver.',
    longDescription: 'Calculate all 6 trig functions and their inverses. Convert degrees to radians. Interactive SVG unit circle. Triangle solver using Law of Sines/Cosines for SSS, SAS, ASA, AAS.',
    keywords: ['trigonometry', 'sine', 'cosine', 'tangent', 'unit circle', 'triangle solver'],
    faqs: [
      { q: 'What triangle types can be solved?', a: 'SSS, SAS, ASA, and AAS configurations.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter angle or use unit circle.\n2. View all trig values.\n3. Use triangle solver for unknown sides/angles.' }],
  },
  'complex-number-calculator': {
    shortDescription: 'Complex number arithmetic and polar form.',
    longDescription: 'Add, subtract, multiply, divide complex numbers. Convert between rectangular and polar form. Calculate modulus, argument, and De Moivre\'s theorem with nth roots.',
    keywords: ['complex number', 'polar form', 'modulus', 'argument', 'de moivre'],
    faqs: [
      { q: 'What is De Moivre\'s theorem?', a: 'It computes powers and roots of complex numbers in polar form: (r∠θ)^n = r^n ∠ nθ.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter complex numbers (a+bi).\n2. Choose operation.\n3. View result in both rectangular and polar form.' }],
  },
  'set-theory-calculator': {
    shortDescription: 'Set operations with Venn diagram.',
    longDescription: 'Compute union, intersection, difference, symmetric difference, and complement. View interactive Venn diagram SVG. Check subsets and generate power sets.',
    keywords: ['set theory', 'union', 'intersection', 'venn diagram', 'power set'],
    faqs: [
      { q: 'How do I enter sets?', a: 'Enter elements separated by commas.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter elements for set A and B.\n2. View all operations and Venn diagram.\n3. Check subset relationships.' }],
  },
  'graph-plotter': {
    shortDescription: 'Plot mathematical functions with SVG.',
    longDescription: 'Plot up to 6 mathematical functions simultaneously on an SVG canvas. Adjustable x/y range, zoom, grid overlay, and color picker for each function.',
    keywords: ['graph', 'plot', 'function', 'svg', 'math graph', 'coordinate'],
    faqs: [
      { q: 'What functions can I plot?', a: 'Standard math expressions using x as variable: sin(x), x^2, sqrt(x), log(x), etc.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter function expression(s).\n2. Adjust x/y range.\n3. View the SVG plot.' }],
  },
  'calculus-reference-tool': {
    shortDescription: 'Derivative rules, integrals, limits, and Taylor series.',
    longDescription: 'Quick reference for 15 derivative rules, 12 integral rules, a numerical limit calculator (two-sided), and 7 common Taylor series expansions.',
    keywords: ['calculus', 'derivative', 'integral', 'limit', 'taylor series'],
    faqs: [
      { q: 'Can it compute symbolic derivatives?', a: 'No, it provides reference tables and a numerical limit approximation tool.' },
    ],
    guide: [{ title: 'How to use', body: '1. Browse derivative and integral rules.\n2. Use the limit calculator for numerical approximations.\n3. Reference Taylor series expansions.' }],
  },
  'binary-boolean-logic-calculator': {
    shortDescription: 'Base converter, truth tables, and logic gates.',
    longDescription: 'Convert between decimal, binary, hex, and octal. Generate truth tables for up to 5 variables. Interactive logic gate reference with 7 gates. Bitwise operations.',
    keywords: ['binary', 'boolean', 'logic gate', 'truth table', 'hex', 'bitwise'],
    faqs: [
      { q: 'How many variables for truth tables?', a: 'Up to 5 variables with AND, OR, NOT, XOR, NAND, NOR gates.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose mode.\n2. Enter values or select variables.\n3. View conversions, truth tables, or gate outputs.' }],
  },
  'kinematics-calculator': {
    shortDescription: 'SUVAT equations, projectile motion, free fall.',
    longDescription: 'Enter any 3 SUVAT variables to solve for the unknowns. Includes projectile motion with initial height and free fall calculator with position intervals.',
    keywords: ['kinematics', 'suvat', 'projectile', 'free fall', 'motion', 'velocity'],
    faqs: [
      { q: 'What are the SUVAT variables?', a: 's (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time).' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter 3 known SUVAT values.\n2. View calculated unknowns.\n3. Try projectile or free fall mode.' }],
  },
  'newtons-laws-calculator': {
    shortDescription: 'Force, weight, friction, and momentum calculator.',
    longDescription: 'F=ma solver (any 2→3rd), weight on 8 celestial bodies, friction with inclined plane analysis, and elastic/inelastic collision momentum calculator.',
    keywords: ['newton', 'force', 'mass', 'friction', 'momentum', 'collision'],
    faqs: [
      { q: 'What collision types?', a: 'Both elastic (kinetic energy conserved) and perfectly inelastic (objects stick together).' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter known values.\n3. View calculated results with working.' }],
  },
  'energy-work-calculator': {
    shortDescription: 'Kinetic energy, potential energy, work, power.',
    longDescription: 'Calculate KE=½mv², PE=mgh, W=Fd·cos(θ) with force components, P=W/t with unit conversions, and efficiency percentage.',
    keywords: ['energy', 'kinetic', 'potential', 'work', 'power', 'efficiency'],
    faqs: [
      { q: 'What is the efficiency calculator?', a: 'It calculates η = (useful output / total input) × 100%.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose energy type.\n2. Enter values.\n3. View results with unit conversions.' }],
  },
  'electricity-calculator': {
    shortDescription: 'Ohm\'s Law, series/parallel, resistor color codes.',
    longDescription: 'Ohm\'s Law 3-mode solver, power formulas, series/parallel resistance and capacitance, and 4-band resistor color code decoder with visual display.',
    keywords: ['electricity', 'ohm', 'resistance', 'capacitor', 'resistor color code'],
    faqs: [
      { q: 'How does the color code work?', a: 'Select 4 bands to decode the resistance value and tolerance.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose mode.\n2. Enter values or select color bands.\n3. View calculated results.' }],
  },
  'wave-sound-calculator': {
    shortDescription: 'Wave equations, decibels, Doppler effect.',
    longDescription: 'v=fλ wave equation solver, decibel calculator with common sound level references, Doppler effect (approach/recede), and EM spectrum classifier.',
    keywords: ['wave', 'sound', 'frequency', 'doppler', 'decibel', 'electromagnetic'],
    faqs: [
      { q: 'What is the Doppler effect?', a: 'The change in observed frequency when a source or observer is moving.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter wave parameters.\n3. View results and reference tables.' }],
  },
  'optics-calculator': {
    shortDescription: 'Snell\'s Law, lens/mirror equations, critical angle.',
    longDescription: 'Snell\'s Law with total internal reflection detection, thin lens and mirror equations with image properties, and critical angle calculator for common media.',
    keywords: ['optics', 'snell', 'lens', 'mirror', 'refraction', 'critical angle'],
    faqs: [
      { q: 'What is total internal reflection?', a: 'When light hits a boundary at an angle greater than the critical angle, it reflects entirely.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose mode.\n2. Enter refractive indices, focal length, or object distance.\n3. View results.' }],
  },
  'thermodynamics-calculator': {
    shortDescription: 'Ideal gas law and named gas laws.',
    longDescription: 'PV=nRT ideal gas calculator (solve for any variable), Boyle\'s/Charles\'s/Gay-Lussac\'s/Combined gas laws, thermal expansion, and Q=mcΔT heat transfer.',
    keywords: ['thermodynamics', 'ideal gas', 'heat transfer', 'specific heat', 'gas law'],
    faqs: [
      { q: 'What value of R is used?', a: 'R = 0.08206 L·atm/(mol·K) for ideal gas calculations.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select gas law.\n2. Enter known variables.\n3. View solved unknown with formula.' }],
  },
  'gravitational-calculator': {
    shortDescription: 'Gravitational force, orbital mechanics, escape velocity.',
    longDescription: 'Newton\'s law of gravitation F=Gm₁m₂/r², orbital velocity with period, escape velocity with planet comparison, and weight on 10 celestial bodies.',
    keywords: ['gravity', 'orbit', 'escape velocity', 'planet', 'gravitational force'],
    faqs: [
      { q: 'What planets are included?', a: 'All 8 planets plus the Moon and Sun for weight comparisons.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose mode.\n2. Enter masses and distances.\n3. View gravitational calculations.' }],
  },
  'electromagnetic-calculator': {
    shortDescription: 'Coulomb\'s Law, electric field, Faraday\'s law.',
    longDescription: 'Coulomb\'s Law for electrostatic force, electric field and potential, Lorentz force on moving charges, Faraday\'s Law EMF, and circuit power analysis.',
    keywords: ['electromagnetic', 'coulomb', 'electric field', 'faraday', 'lorentz force'],
    faqs: [
      { q: 'What is Faraday\'s Law?', a: 'EMF = -NΔΦ/Δt — induced voltage from changing magnetic flux.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter charge, field, or flux values.\n3. View calculated results.' }],
  },
  'mole-calculator': {
    shortDescription: 'Moles, grams, molecules conversion and molarity.',
    longDescription: 'Convert between mass, moles, and molecules using molar mass. Calculate molarity and dilution (C₁V₁=C₂V₂). Quick-select common molar masses.',
    keywords: ['mole', 'molar mass', 'avogadro', 'molarity', 'dilution'],
    faqs: [
      { q: 'What is Avogadro\'s number?', a: '6.022 × 10²³ — the number of particles in one mole.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter mass and molar mass.\n2. View moles and molecule count.\n3. Use molarity or dilution tool.' }],
  },
  'chemical-equation-balancer': {
    shortDescription: 'Auto-balance chemical equations.',
    longDescription: 'Enter a chemical equation and auto-balance it using brute-force method for up to 6 compounds. Supports parentheses like Ca(OH)₂. Shows atom count verification.',
    keywords: ['chemical equation', 'balance', 'stoichiometry', 'reaction', 'chemistry'],
    faqs: [
      { q: 'How does balancing work?', a: 'It tries coefficient combinations systematically up to 20 to find the balanced equation.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter reactants and products.\n2. Click Balance.\n3. Verify with atom count table.' }],
  },
  'periodic-table-reference': {
    shortDescription: 'Interactive periodic table with element details.',
    longDescription: 'Browse all 118 elements in a color-coded periodic table. Click any element for details. Filter by category (metals, nonmetals, noble gases, etc.) and search by name or symbol.',
    keywords: ['periodic table', 'element', 'atomic number', 'chemistry', 'metal', 'nonmetal'],
    faqs: [
      { q: 'What information is shown?', a: 'Atomic number, symbol, name, atomic mass, category, group, and period.' },
    ],
    guide: [{ title: 'How to use', body: '1. Click any element tile.\n2. Use search to find elements.\n3. Filter by category using the legend.' }],
  },
  'ph-calculator': {
    shortDescription: 'Convert between pH, pOH, [H⁺], and [OH⁻].',
    longDescription: 'Enter any one of pH, pOH, [H⁺], or [OH⁻] and get all others. Visual pH scale with position indicator, acid/base classification, and common solution reference.',
    keywords: ['pH', 'pOH', 'acid', 'base', 'hydrogen ion', 'hydroxide'],
    faqs: [
      { q: 'What is the relationship?', a: 'pH + pOH = 14, [H⁺] = 10^(-pH), [H⁺]×[OH⁻] = 10⁻¹⁴ at 25°C.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select input type.\n2. Enter value.\n3. View all conversions and pH scale position.' }],
  },
  'solution-concentration-calculator': {
    shortDescription: 'Molarity, molality, mass percent, dilution, PPM.',
    longDescription: 'Calculate solution concentration in multiple units: molarity (M), molality (m), mass percent, dilution (C₁V₁=C₂V₂), and parts per million/billion.',
    keywords: ['molarity', 'molality', 'dilution', 'concentration', 'ppm', 'mass percent'],
    faqs: [
      { q: 'What is the dilution equation?', a: 'C₁V₁ = C₂V₂ — concentration times volume is conserved.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select concentration mode.\n2. Enter known values.\n3. View calculated concentration.' }],
  },
  'gas-laws-calculator': {
    shortDescription: 'Ideal gas, Boyle\'s, Charles\'s, and combined gas laws.',
    longDescription: 'PV=nRT ideal gas calculator, Boyle\'s P₁V₁=P₂V₂, Charles\'s V₁/T₁=V₂/T₂, Gay-Lussac\'s P₁/T₁=P₂/T₂, combined gas law, and STP calculations.',
    keywords: ['gas law', 'ideal gas', 'boyle', 'charles', 'STP', 'PV=nRT'],
    faqs: [
      { q: 'What are STP conditions?', a: '0°C (273.15 K) and 1 atm, with molar volume 22.414 L/mol.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select gas law.\n2. Enter known values (leave one empty).\n3. View solved result.' }],
  },
  'genetics-calculator': {
    shortDescription: 'Punnett squares and blood type inheritance.',
    longDescription: 'Generate monohybrid and dihybrid Punnett squares with genotype/phenotype ratios. Blood type genetics with ABO alleles showing probability tables.',
    keywords: ['genetics', 'punnett square', 'blood type', 'genotype', 'phenotype', 'inheritance'],
    faqs: [
      { q: 'What is a dihybrid cross?', a: 'A cross tracking two genes at once (e.g., AaBb × AaBb), producing a 4×4 Punnett square.' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose cross type.\n2. Enter parent genotypes.\n3. View Punnett square and ratios.' }],
  },
  'dna-rna-tools': {
    shortDescription: 'DNA transcription, RNA translation, and sequence stats.',
    longDescription: 'Transcribe DNA to mRNA, translate to amino acid sequences with codon breakdown, view GC content and base composition, and reference the full RNA codon table.',
    keywords: ['DNA', 'RNA', 'transcription', 'translation', 'codon', 'amino acid'],
    faqs: [
      { q: 'What is the start codon?', a: 'AUG (codes for Methionine) — translation begins here.' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter DNA or RNA sequence.\n2. Choose transcription, translation, or stats.\n3. View results.' }],
  },
  'microscopy-calculator': {
    shortDescription: 'Magnification, FOV, scale bar, and resolution.',
    longDescription: 'Calculate total magnification, field of view at different powers, actual size from image size, scale bar conversions, and resolution limits.',
    keywords: ['microscope', 'magnification', 'field of view', 'scale bar', 'resolution'],
    faqs: [
      { q: 'How is total magnification calculated?', a: 'Total = Eyepiece × Objective (e.g., 10× × 40× = 400×).' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter known values.\n3. View calculated results and reference tables.' }],
  },
  'unit-converter-scientific': {
    shortDescription: 'Convert between scientific units across 10 categories.',
    longDescription: 'Convert length, mass, time, temperature, energy, pressure, force, volume, speed, and frequency units. Shows all conversions at once with scientific notation for extreme values.',
    keywords: ['unit converter', 'SI units', 'metric', 'energy', 'pressure', 'scientific'],
    faqs: [
      { q: 'How many unit categories?', a: '10 categories: length, mass, time, temperature, energy, pressure, force, volume, speed, frequency.' },
    ],
    guide: [{ title: 'How to use', body: '1. Select category.\n2. Enter value and units.\n3. View conversion and all equivalent values.' }],
  },
  'significant-figures-calculator': {
    shortDescription: 'Count, round, and calculate with significant figures.',
    longDescription: 'Count significant figures in any number with rule explanations, round to N sig figs, and perform arithmetic with proper sig fig handling.',
    keywords: ['significant figures', 'sig figs', 'rounding', 'precision', 'scientific notation'],
    faqs: [
      { q: 'Are trailing zeros significant?', a: 'Only with a decimal point (100. has 3 sig figs, 100 has 1).' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose count, round, or calculate mode.\n2. Enter numbers.\n3. View sig fig analysis.' }],
  },
  'error-uncertainty-calculator': {
    shortDescription: 'Absolute, relative, and propagation of errors.',
    longDescription: 'Calculate absolute and relative error, combine uncertainties with error propagation rules, and compute statistical uncertainty (mean, SD, SEM, 95% CI).',
    keywords: ['error', 'uncertainty', 'absolute error', 'relative error', 'propagation', 'standard error'],
    faqs: [
      { q: 'How are uncertainties combined?', a: 'Add/Sub: δ = √(δA² + δB²). Mul/Div: δ/result = √((δA/A)² + (δB/B)²).' },
    ],
    guide: [{ title: 'How to use', body: '1. Choose error type.\n2. Enter values and uncertainties.\n3. View calculated errors and formulas.' }],
  },
  'half-life-calculator': {
    shortDescription: 'Radioactive decay, dating, and isotope reference.',
    longDescription: 'Calculate remaining amount after decay, find half-life from data, date samples using decay ratios, and reference 10 common isotopes with their half-lives.',
    keywords: ['half-life', 'radioactive decay', 'carbon dating', 'isotope', 'decay constant'],
    faqs: [
      { q: 'What is the decay formula?', a: 'N = N₀ × (½)^(t/t½) or equivalently N = N₀ × e^(−λt).' },
    ],
    guide: [{ title: 'How to use', body: '1. Select mode.\n2. Enter known values.\n3. View decay results and visual chart.' }],
  },
  'scientific-notation-calculator': {
    shortDescription: 'Convert and calculate in scientific notation.',
    longDescription: 'Convert numbers to/from scientific and engineering notation with SI prefix identification. Perform arithmetic (×, ÷, +, −) in scientific notation with step-by-step working.',
    keywords: ['scientific notation', 'engineering notation', 'exponent', 'SI prefix', 'standard form'],
    faqs: [
      { q: 'What is engineering notation?', a: 'Like scientific notation but exponents are multiples of 3 (matching SI prefixes).' },
    ],
    guide: [{ title: 'How to use', body: '1. Enter a number or use examples.\n2. View scientific/engineering notation.\n3. Use calculate mode for arithmetic.' }],
  },
  'mind-map': {
    shortDescription: 'Create visual mind maps with unlimited depth and auto-layout.',
    longDescription: 'The UnTrackt Mindmap tool lets you brainstorm, plan, and organize ideas visually. Build unlimited-depth mind maps with auto-layout (tree or radial), color-coded branches, zoom and pan controls, and keyboard shortcuts. Manage multiple maps, import from indented text, and export as SVG, text, or Markdown — all 100% private in your browser.',
    keywords: ['mind map', 'mindmap', 'brainstorm', 'diagram', 'visual thinking', 'idea map', 'concept map', 'tree diagram', 'radial layout'],
    faqs: [
      { q: 'Where is my data stored?', a: 'All mind maps are saved in your browser localStorage. Nothing is sent to any server.' },
      { q: 'Can I have multiple mind maps?', a: 'Yes. Create, duplicate, rename, and switch between as many mind maps as you like.' },
      { q: 'How do I add a child node?', a: 'Select a node and click the + button, or press Tab on your keyboard.' },
      { q: 'Can I export my mind map?', a: 'Yes. Export as SVG (vector image), plain-text outline, or Markdown. You can also print directly.' },
      { q: 'What layouts are available?', a: 'Tree (horizontal hierarchy) and Radial (circular) layouts. Switch with one click.' },
    ],
    guide: [
      { title: 'How to use', body: '1. Click the central topic to select it, then double-click or press F2 to edit.\n2. Click the + button or press Tab to add child nodes.\n3. Build out your tree with unlimited nesting depth.\n4. Switch between Tree and Radial layouts.\n5. Use Ctrl+scroll to zoom, or drag the background to pan.' },
      { title: 'Tips & tricks', body: '• Press Space to collapse/expand a branch and focus on specific areas.\n• Use Import to paste an indented text outline and instantly create a mind map.\n• Duplicate a map to experiment with alternative structures.\n• Export as Markdown for use in documentation or notes apps.\n• Color coding is automatic — each branch from the root gets its own color.' },
      { title: 'Keyboard shortcuts', body: '• Tab or Insert → Add child node\n• F2 or Enter → Edit selected node\n• Delete → Remove selected node and children\n• Space → Collapse/expand branch\n• Ctrl + Scroll → Zoom in/out\n• Escape → Cancel editing' },
    ],
  },
}
