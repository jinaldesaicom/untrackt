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

  // ── Finance tools ──
  'loan-calculator': {
    shortDescription: 'Calculate loan EMI and total interest.',
    longDescription: 'Estimate monthly loan payments, total interest paid, and view amortization breakdowns for personal loans, auto loans, and more.',
    keywords: ['loan calculator', 'emi calculator', 'loan payment estimator', 'amortization calculator'],
    faqs: [
      { q: 'Does this cover all loan types?', a: 'It works for any fixed-rate amortizing loan.' },
      { q: 'Is this a binding offer?', a: 'No, it is an estimate for planning purposes only.' },
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
  },
  'sip-calculator': {
    shortDescription: 'Compare SIP and lumpsum investment growth.',
    longDescription: 'Model systematic investment plan (SIP) returns versus lumpsum investing over time with adjustable rates and durations.',
    keywords: ['sip calculator', 'systematic investment plan', 'mutual fund calculator', 'lumpsum vs sip'],
    faqs: [
      { q: 'Does this include market volatility?', a: 'No, it uses a fixed assumed rate of return.' },
      { q: 'Is SIP always better than lumpsum?', a: 'It depends on market conditions; this tool shows projections for both.' },
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
  },
  'rule-of-72-calculator': {
    shortDescription: 'Estimate investment doubling time.',
    longDescription: 'Use the Rule of 72 to quickly estimate how many years it takes for an investment to double at a given return rate, and compare with the exact calculation.',
    keywords: ['rule of 72', 'doubling time calculator', 'investment growth estimator'],
    faqs: [
      { q: 'Is the Rule of 72 accurate?', a: 'It is a close approximation; the tool also shows the exact doubling time.' },
      { q: 'Does it work for any interest rate?', a: 'It works best for rates between 2% and 20%.' },
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
  },
  'inflation-calculator': {
    shortDescription: 'Calculate inflation-adjusted values.',
    longDescription: 'See how purchasing power changes over time using historical US CPI data from 1950 to 2024. Compare past and future dollar values.',
    keywords: ['inflation calculator', 'cpi calculator', 'purchasing power calculator', 'dollar value over time'],
    faqs: [
      { q: 'What data does this use?', a: 'Historical US Consumer Price Index (CPI) data from 1950 to 2024.' },
      { q: 'Can I project future inflation?', a: 'Yes, you can set an assumed future inflation rate.' },
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
  },
  'savings-goal-calculator': {
    shortDescription: 'Track progress on savings goals.',
    longDescription: 'Set savings goals with deadlines and track monthly contributions needed. Monitor multiple goals and see progress toward each target.',
    keywords: ['savings goal tracker', 'savings calculator', 'money goal planner', 'financial target calculator'],
    faqs: [
      { q: 'Can I track multiple goals?', a: 'Yes, you can add and monitor several goals at once.' },
      { q: 'Does this invest my money?', a: 'No, it is a calculator for planning purposes only.' },
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
  },
  'roi-calculator': {
    shortDescription: 'Calculate return on investment.',
    longDescription: 'Analyze ROI for basic investments, real estate with CAP rate, and marketing campaigns with ROAS metrics in one unified tool.',
    keywords: ['roi calculator', 'return on investment', 'investment analysis tool', 'real estate roi'],
    faqs: [
      { q: 'Can I compare different investment types?', a: 'Yes, switch between basic, real estate, and marketing modes.' },
      { q: 'Does this account for taxes?', a: 'Not automatically; factor taxes into your cost inputs.' },
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
  },
  'working-days-calculator': {
    shortDescription: 'Count business days between dates.',
    longDescription: 'Calculate the number of working days between two dates, excluding weekends. Useful for project planning and deadline estimation.',
    keywords: ['working days calculator', 'business days counter', 'date range calculator', 'weekday counter'],
    faqs: [
      { q: 'Are public holidays excluded?', a: 'The tool counts weekdays; you can manually adjust for holidays.' },
      { q: 'Can I count backward from a deadline?', a: 'Yes, enter any two dates to see business days between them.' },
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
  },
  'tax-bracket-estimator': {
    shortDescription: 'Calculate taxes across multiple countries.',
    longDescription: 'Estimate income taxes for 8 countries with effective and marginal rate breakdowns, supporting various filing statuses.',
    keywords: ['tax bracket calculator', 'income tax estimator', 'international tax calculator', 'effective tax rate'],
    faqs: [
      { q: 'Is this official tax advice?', a: 'No, use it for estimation only. Consult a tax professional for filing.' },
      { q: 'Which countries are supported?', a: 'US, UK, Canada, Australia, India, Germany, France, and Japan.' },
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
  },
  'contract-analyzer': {
    shortDescription: 'Analyze contracts for readability and key terms.',
    longDescription: 'Paste contract text to analyze readability, extract key terms, detect passive voice, and identify common contract keywords—all in-browser.',
    keywords: ['contract analyzer', 'legal text analyzer', 'readability checker', 'contract review tool'],
    faqs: [
      { q: 'Is contract text sent anywhere?', a: 'No, all analysis happens locally in your browser.' },
      { q: 'Does this replace legal review?', a: 'No, it is a readability and keyword tool, not legal advice.' },
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
  },
  'client-profitability-estimator': {
    shortDescription: 'Estimate client profitability and value.',
    longDescription: 'Score and compare clients based on hourly rate, overhead costs, payment reliability, and stress factors to optimize your client portfolio.',
    keywords: ['client profitability tool', 'freelance client scorer', 'client comparison calculator'],
    faqs: [
      { q: 'How is profitability scored?', a: 'It combines revenue, overhead, hours, and qualitative stress factors.' },
      { q: 'Is client data stored?', a: 'Only in your browser localStorage if you choose to save.' },
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
  },
  'timezone-scheduler': {
    shortDescription: 'Find meeting times across time zones.',
    longDescription: 'Compare overlapping work hours across 8+ time zones with DST awareness to schedule international meetings efficiently.',
    keywords: ['timezone scheduler', 'world clock tool', 'meeting time finder', 'timezone converter'],
    faqs: [
      { q: 'Does this handle daylight saving time?', a: 'Yes, DST transitions are accounted for automatically.' },
      { q: 'How many time zones can I compare?', a: 'You can compare 8 or more zones simultaneously.' },
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
  },
  'sleep-cycle-calculator': {
    shortDescription: 'Find optimal sleep and wake times.',
    longDescription: 'Calculate the best bedtime or alarm time based on 90-minute sleep cycles to wake up feeling refreshed instead of groggy.',
    keywords: ['sleep cycle calculator', 'bedtime calculator', 'wake up time calculator', 'sleep planner'],
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'Approximately 90 minutes, though it varies between individuals.' },
      { q: 'Is this a medical sleep tool?', a: 'No, it is a general guideline based on average cycle lengths.' },
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
  },
  'body-fat-calculator': {
    shortDescription: 'Estimate body fat percentage.',
    longDescription: 'Estimate body fat using US Navy and BMI-derived methods, see fat mass versus lean mass, and understand your body composition category.',
    keywords: ['body fat calculator', 'body composition estimator', 'lean mass calculator', 'us navy body fat'],
    faqs: [
      { q: 'How accurate is this?', a: 'These are estimation methods; DEXA scans provide clinical accuracy.' },
      { q: 'Which method should I use?', a: 'The US Navy method requires body measurements; the BMI method is simpler.' },
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
  },
  'blood-pressure-classifier': {
    shortDescription: 'Classify blood pressure readings.',
    longDescription: 'Enter systolic and diastolic readings to see your blood pressure category (normal, elevated, stage 1/2 hypertension) with educational context.',
    keywords: ['blood pressure classifier', 'bp checker', 'hypertension calculator', 'blood pressure category'],
    faqs: [
      { q: 'Is this a medical diagnosis?', a: 'No, it classifies readings for educational purposes. Consult a doctor.' },
      { q: 'What is a normal reading?', a: 'Generally below 120/80 mmHg is considered normal.' },
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
  },
  'pregnancy-due-date-calculator': {
    shortDescription: 'Estimate pregnancy due date and milestones.',
    longDescription: 'Calculate estimated due date from last menstrual period or IVF transfer date, see gestational age, trimester timeline, and key milestones.',
    keywords: ['pregnancy due date calculator', 'due date estimator', 'gestational age calculator', 'pregnancy timeline'],
    faqs: [
      { q: 'How is the due date calculated?', a: 'Based on Naegele\'s rule: 280 days from the first day of your last period.' },
      { q: 'Is this a medical tool?', a: 'No, it is an estimate. Confirm with your OB-GYN.' },
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
  },
  'alcohol-unit-calculator': {
    shortDescription: 'Estimate alcohol units and processing time.',
    longDescription: 'Calculate alcohol units from drink volume and ABV, see pure alcohol grams, estimated processing time, and calorie content.',
    keywords: ['alcohol unit calculator', 'drink calculator', 'alcohol calorie calculator', 'units of alcohol'],
    faqs: [
      { q: 'What is one alcohol unit?', a: '10ml (8g) of pure alcohol in the UK, or 14g in the US (one standard drink).' },
      { q: 'Is the processing time accurate?', a: 'It is an average estimate; individual metabolism varies significantly.' },
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
  },
  'medical-unit-converter': {
    shortDescription: 'Convert between medical measurement units.',
    longDescription: 'Convert glucose (mg/dL ↔ mmol/L), cholesterol, HbA1c, temperature, weight, and height between common medical units.',
    keywords: ['medical unit converter', 'glucose converter', 'cholesterol converter', 'health unit calculator'],
    faqs: [
      { q: 'Are conversion factors standard?', a: 'Yes, they follow internationally recognized medical conversion factors.' },
      { q: 'Can I use this for lab results?', a: 'Yes, to convert units. Always share original values with your doctor.' },
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
  },
  'readability-scorer': {
    shortDescription: 'Analyze text readability and grade level.',
    longDescription: 'Score text using Flesch-Kincaid, Gunning Fog, and other readability formulas to ensure your writing matches your target audience.',
    keywords: ['readability checker', 'flesch kincaid calculator', 'grade level analyzer', 'writing clarity tool'],
    faqs: [
      { q: 'What readability formulas are used?', a: 'Flesch-Kincaid, Gunning Fog, Coleman-Liau, and more.' },
      { q: 'What grade level should I target?', a: 'Grade 8-10 for general audiences; lower for broader reach.' },
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
  },
  'roman-numeral-converter': {
    shortDescription: 'Convert between Roman and Arabic numerals.',
    longDescription: 'Instantly convert Roman numerals to Arabic numbers and vice versa with validation up to 3,999.',
    keywords: ['roman numeral converter', 'roman to arabic', 'numeral converter'],
    faqs: [
      { q: 'What is the maximum number?', a: 'Standard Roman numerals support values up to 3,999 (MMMCMXCIX).' },
      { q: 'Are lowercase numerals accepted?', a: 'Yes, input is case-insensitive.' },
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
  },
  'unit-converter': {
    shortDescription: 'Convert between measurement units.',
    longDescription: 'Convert values across length, mass, temperature, volume, speed, and other categories with a clean and fast interface.',
    keywords: ['unit converter', 'measurement converter', 'length converter', 'temperature converter'],
    faqs: [
      { q: 'How many unit categories are supported?', a: 'Length, mass, temperature, volume, speed, and more.' },
      { q: 'Are conversions accurate?', a: 'Yes, standard conversion factors are used throughout.' },
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
  },
  'flashcard-session': {
    shortDescription: 'Create flashcards and run study sessions.',
    longDescription: 'Build flashcard decks and run self-graded study sessions with flip-to-reveal interactions to reinforce learning.',
    keywords: ['flashcard app', 'study flashcards', 'quiz tool', 'spaced repetition'],
    faqs: [
      { q: 'Can I save my flashcard decks?', a: 'Yes, decks are stored locally in your browser.' },
      { q: 'Is there spaced repetition?', a: 'The session uses self-grading; you control review frequency.' },
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
  },
  'study-timer': {
    shortDescription: 'Advanced study timer with session tracking.',
    longDescription: 'A focus timer with multiple modes (Pomodoro, custom), daily goals, and session logs to track study habits over time.',
    keywords: ['study timer', 'focus timer', 'pomodoro timer', 'study session tracker'],
    faqs: [
      { q: 'How is this different from Pomodoro Timer?', a: 'It adds session logging, daily goals, and multiple timer modes.' },
      { q: 'Are my sessions saved?', a: 'Session logs are stored in browser localStorage.' },
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
  },
  'color-palette-generator': {
    shortDescription: 'Generate color palettes from a base color.',
    longDescription: 'Create harmonious color palettes from a base color, random generation, or image extraction with CSS variable and Tailwind exports.',
    keywords: ['color palette generator', 'design color picker', 'color harmony tool', 'palette from image'],
    faqs: [
      { q: 'Can I extract colors from an image?', a: 'Yes, upload an image to extract a palette.' },
      { q: 'Does it export CSS variables?', a: 'Yes, including CSS variables and Tailwind color values.' },
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
  },
  'image-to-base64': {
    shortDescription: 'Convert images to Base64 data URLs.',
    longDescription: 'Upload image files or paste URLs to convert them into Base64 encoded strings and data URLs for embedding in HTML and CSS.',
    keywords: ['image to base64', 'data url generator', 'image encoder', 'base64 image converter'],
    faqs: [
      { q: 'What image formats are supported?', a: 'PNG, JPG, GIF, WebP, and SVG files.' },
      { q: 'Is the image uploaded anywhere?', a: 'No, conversion happens entirely in your browser.' },
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
  },
  'word-frequency-counter': {
    shortDescription: 'Analyze text word frequency.',
    longDescription: 'Count word occurrences, find top repeated words, and export frequency data as CSV for text analysis and writing improvement.',
    keywords: ['word frequency counter', 'text analysis tool', 'word count analyzer', 'word cloud data'],
    faqs: [
      { q: 'Can I export the results?', a: 'Yes, frequency data can be exported as CSV.' },
      { q: 'Does it filter common words?', a: 'You can toggle stop word filtering for cleaner results.' },
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
  },
  'random-number-generator': {
    shortDescription: 'Generate secure random numbers and picks.',
    longDescription: 'Generate cryptographically random numbers, dice rolls, coin flips, and random list picks using the Web Crypto API.',
    keywords: ['random number generator', 'dice roller', 'coin flip tool', 'random picker'],
    faqs: [
      { q: 'Is the randomness truly random?', a: 'Yes, it uses the browser\'s Web Crypto API for secure randomness.' },
      { q: 'Can I set a custom range?', a: 'Yes, specify minimum and maximum values.' },
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
  },
  'case-converter': {
    shortDescription: 'Convert text between different cases.',
    longDescription: 'Transform text into sentence case, UPPER CASE, lower case, Title Case, camelCase, snake_case, kebab-case, and more.',
    keywords: ['case converter', 'text case tool', 'camelcase converter', 'snake case converter'],
    faqs: [
      { q: 'How many case formats are supported?', a: 'Over 8 formats including camelCase, snake_case, kebab-case, and more.' },
      { q: 'Can I convert code variable names?', a: 'Yes, it handles all common programming naming conventions.' },
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
  },
  'text-to-slug': {
    shortDescription: 'Convert text to URL-friendly slugs.',
    longDescription: 'Turn titles and text into clean URL slugs, hashtags, and file-safe names with transliteration and batch processing support.',
    keywords: ['text to slug', 'url slug generator', 'seo slug tool', 'hashtag generator'],
    faqs: [
      { q: 'Does it handle special characters?', a: 'Yes, accented characters are transliterated and symbols are removed.' },
      { q: 'Can I process multiple titles at once?', a: 'Yes, batch mode is supported.' },
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
  },
  'cron-parser': {
    shortDescription: 'Parse cron expressions and preview runs.',
    longDescription: 'Enter cron expressions to see plain English explanations and the next scheduled run times for debugging scheduled jobs.',
    keywords: ['cron parser', 'cron expression tool', 'cron schedule viewer', 'crontab helper'],
    faqs: [
      { q: 'Does it support 5-field cron?', a: 'Yes, standard 5-field cron expressions are supported.' },
      { q: 'Can I see the next runs?', a: 'Yes, the next 5 scheduled run times are shown.' },
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
  },
  'http-status-lookup': {
    shortDescription: 'Browse and search HTTP status codes.',
    longDescription: 'Search the complete list of HTTP status codes with descriptions, categories, and usage examples for API development.',
    keywords: ['http status codes', 'http status lookup', 'api status reference', 'rest api codes'],
    faqs: [
      { q: 'Are all status codes included?', a: 'Yes, all standard HTTP/1.1 and HTTP/2 status codes are covered.' },
      { q: 'Can I search by code?', a: 'Yes, search by number or description text.' },
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
  },
  'text-diff-checker': {
    shortDescription: 'Compare text differences line by line.',
    longDescription: 'Paste two texts to compare changes line-by-line, word-by-word, or character-by-character with highlighted additions and deletions.',
    keywords: ['text diff checker', 'text compare tool', 'diff viewer', 'code diff tool'],
    faqs: [
      { q: 'What comparison modes are available?', a: 'Line-by-line, word-by-word, and character-by-character.' },
      { q: 'Can I compare code?', a: 'Yes, any text content including source code can be compared.' },
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
  },
  'number-base-converter': {
    shortDescription: 'Convert between number bases.',
    longDescription: 'Convert numbers between binary, octal, decimal, and hexadecimal with instant results and manual base conversion up to base 36.',
    keywords: ['number base converter', 'binary converter', 'hex converter', 'octal converter'],
    faqs: [
      { q: 'What bases are supported?', a: 'Binary (2), octal (8), decimal (10), hexadecimal (16), and any base from 2 to 36.' },
      { q: 'Can I convert large numbers?', a: 'Yes, JavaScript handles large integers within Number.MAX_SAFE_INTEGER.' },
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
  },
  'url-encoder-decoder': {
    shortDescription: 'Encode, decode, and parse URLs.',
    longDescription: 'URL-encode and decode strings, parse full URLs into components, and edit query parameters with a structured editor.',
    keywords: ['url encoder', 'url decoder', 'query string parser', 'uri encoder'],
    faqs: [
      { q: 'Can I edit query parameters?', a: 'Yes, a structured editor lets you add, remove, and modify params.' },
      { q: 'Does it handle special characters?', a: 'Yes, all characters are properly percent-encoded.' },
    ],
  },
}
