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
}
