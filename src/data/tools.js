import { lazy } from 'react'

const JsonFormatter = lazy(() => import('../tools/dev/JsonFormatter.jsx'))
const Base64Tool = lazy(() => import('../tools/dev/Base64Tool.jsx'))
const UuidGenerator = lazy(() => import('../tools/dev/UuidGenerator.jsx'))
const RegexTester = lazy(() => import('../tools/dev/RegexTester.jsx'))
const JwtDecoder = lazy(() => import('../tools/dev/JwtDecoder.jsx'))
const HashGenerator = lazy(() => import('../tools/dev/HashGenerator.jsx'))
const UnixTimestampConverter = lazy(() => import('../tools/dev/UnixTimestampConverter.jsx'))
const CronParser = lazy(() => import('../tools/dev/CronParser.jsx'))
const HtmlEntityEncoder = lazy(() => import('../tools/dev/HtmlEntityEncoder.jsx'))
const ColorConverter = lazy(() => import('../tools/dev/ColorConverter.jsx'))
const CssGradientGenerator = lazy(() => import('../tools/dev/CssGradientGenerator.jsx'))
const HttpStatusLookup = lazy(() => import('../tools/dev/HttpStatusLookup.jsx'))
const LoremIpsumGenerator = lazy(() => import('../tools/dev/LoremIpsumGenerator.jsx'))
const TextDiffChecker = lazy(() => import('../tools/dev/TextDiffChecker.jsx'))
const MarkdownPreviewer = lazy(() => import('../tools/dev/MarkdownPreviewer.jsx'))
const NumberBaseConverter = lazy(() => import('../tools/dev/NumberBaseConverter.jsx'))
const SvgOptimizer = lazy(() => import('../tools/dev/SvgOptimizer.jsx'))
const UrlEncoderDecoder = lazy(() => import('../tools/dev/UrlEncoderDecoder.jsx'))

const GpaCalculator = lazy(() => import('../tools/student/GpaCalculator.jsx'))
const WordCounter = lazy(() => import('../tools/student/WordCounter.jsx'))
const PomodoroTimer = lazy(() => import('../tools/student/PomodoroTimer.jsx'))
const CitationGenerator = lazy(() => import('../tools/student/CitationGenerator.jsx'))
const ReadabilityScorer = lazy(() => import('../tools/student/ReadabilityScorer.jsx'))
const PercentageCalculator = lazy(() => import('../tools/student/PercentageCalculator.jsx'))
const RomanNumeralConverter = lazy(() => import('../tools/student/RomanNumeralConverter.jsx'))
const ScientificCalculator = lazy(() => import('../tools/student/ScientificCalculator.jsx'))
const UnitConverter = lazy(() => import('../tools/student/UnitConverter.jsx'))
const EssayOutlineBuilder = lazy(() => import('../tools/student/EssayOutlineBuilder.jsx'))
const FlashcardSession = lazy(() => import('../tools/student/FlashcardSession.jsx'))
const QuadraticSolver = lazy(() => import('../tools/student/QuadraticSolver.jsx'))
const StudyTimer = lazy(() => import('../tools/student/StudyTimer.jsx'))

const HourlyRateCalculator = lazy(() => import('../tools/freelance/HourlyRateCalculator.jsx'))
const MeetingCostCalculator = lazy(() => import('../tools/freelance/MeetingCostCalculator.jsx'))
const WorkingDaysCalculator = lazy(() => import('../tools/freelance/WorkingDaysCalculator.jsx'))
const PasswordGenerator = lazy(() => import('../tools/general/PasswordGenerator.jsx'))
const QrCodeGenerator = lazy(() => import('../tools/general/QrCodeGenerator.jsx'))
const TipSplitter = lazy(() => import('../tools/general/TipSplitter.jsx'))
const BmrCalculator = lazy(() => import('../tools/health/BmrCalculator.jsx'))
const WaterIntakeCalculator = lazy(() => import('../tools/health/WaterIntakeCalculator.jsx'))
const SleepCycleCalculator = lazy(() => import('../tools/health/SleepCycleCalculator.jsx'))
const CompoundInterestCalculator = lazy(() => import('../tools/finance/CompoundInterestCalculator.jsx'))
const LoanCalculator = lazy(() => import('../tools/finance/LoanCalculator.jsx'))
const FireNumberCalculator = lazy(() => import('../tools/finance/FireNumberCalculator.jsx'))

export const categories = [
  { id: 'dev', name: 'Dev Tools', icon: 'Code2', color: 'violet', description: 'Utilities for developers: formatters, encoders, generators.' },
  { id: 'student', name: 'Student', icon: 'GraduationCap', color: 'blue', description: 'Tools to help students study, track grades, and manage time.' },
  { id: 'freelance', name: 'Freelance', icon: 'Briefcase', color: 'amber', description: 'Rate calculators, cost estimators, and scheduling tools.' },
  { id: 'general', name: 'General', icon: 'Grid3x3', color: 'gray', description: 'Everyday utilities everyone can use.' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'green', description: 'Calculators for fitness, nutrition, and wellness.' },
  { id: 'finance', name: 'Finance', icon: 'TrendingUp', color: 'emerald', description: 'Personal finance calculators and planners.' },
]

export const categoryColorMap = {
  dev: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200', icon: 'text-violet-500', pill: 'bg-violet-500' },
  student: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-500', pill: 'bg-blue-500' },
  freelance: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: 'text-amber-500', pill: 'bg-amber-500' },
  general: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', icon: 'text-gray-500', pill: 'bg-gray-500' },
  health: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: 'text-green-500', pill: 'bg-green-500' },
  finance: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: 'text-emerald-500', pill: 'bg-emerald-500' },
}

const tools = [
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Validate and prettify JSON instantly', category: 'dev', icon: 'Braces', path: '/tools/json-formatter', component: JsonFormatter, tags: ['json', 'format', 'validate', 'pretty print', 'minify'] },
  { id: 'base64-tool', name: 'Base64 Tool', description: 'Encode and decode Base64 strings in real-time', category: 'dev', icon: 'Binary', path: '/tools/base64-tool', component: Base64Tool, tags: ['base64', 'encode', 'decode', 'binary', 'string'] },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate secure random UUIDs using the Web Crypto API', category: 'dev', icon: 'Fingerprint', path: '/tools/uuid-generator', component: UuidGenerator, tags: ['uuid', 'guid', 'random', 'unique id', 'generator'] },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regex patterns against text in real time', category: 'dev', icon: 'Braces', path: '/tools/regex-tester', component: RegexTester, tags: ['regex', 'pattern', 'match', 'validator', 'tester', 'flags'] },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT headers and payload claims instantly', category: 'dev', icon: 'Fingerprint', path: '/tools/jwt-decoder', component: JwtDecoder, tags: ['jwt', 'token', 'decode', 'claims', 'auth', 'payload'] },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5 and SHA hashes for text or files', category: 'dev', icon: 'ShieldCheck', path: '/tools/hash-generator', component: HashGenerator, tags: ['hash', 'sha256', 'sha512', 'md5', 'checksum', 'hmac'] },
  { id: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', description: 'Convert Unix timestamps to readable date formats', category: 'dev', icon: 'Timer', path: '/tools/unix-timestamp-converter', component: UnixTimestampConverter, tags: ['unix', 'timestamp', 'epoch', 'date', 'utc', 'iso'] },
  { id: 'cron-parser', name: 'Cron Parser', description: 'Parse cron expressions and preview next run times', category: 'dev', icon: 'CalendarDays', path: '/tools/cron-parser', component: CronParser, tags: ['cron', 'schedule', 'parser', 'jobs', 'automation', 'time'] },
  { id: 'html-entity-encoder', name: 'HTML Entity Encoder', description: 'Encode and decode HTML entities quickly', category: 'dev', icon: 'Code2', path: '/tools/html-entity-encoder', component: HtmlEntityEncoder, tags: ['html', 'entities', 'encode', 'decode', 'escape', 'xss'] },
  { id: 'color-converter', name: 'Color Converter', description: 'Convert HEX, RGB, HSL, HSV, and color names', category: 'dev', icon: 'Droplets', path: '/tools/color-converter', component: ColorConverter, tags: ['color', 'hex', 'rgb', 'hsl', 'hsv', 'contrast'] },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', description: 'Build custom gradients and copy ready-to-use CSS', category: 'dev', icon: 'Wrench', path: '/tools/css-gradient-generator', component: CssGradientGenerator, tags: ['css', 'gradient', 'linear', 'radial', 'conic', 'background'] },
  { id: 'http-status-lookup', name: 'HTTP Status Lookup', description: 'Search and browse complete HTTP status codes', category: 'dev', icon: 'Search', path: '/tools/http-status-lookup', component: HttpStatusLookup, tags: ['http', 'status', 'api', 'error', 'response', 'codes'] },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text by words, sentences, or paragraphs', category: 'dev', icon: 'AlignLeft', path: '/tools/lorem-ipsum-generator', component: LoremIpsumGenerator, tags: ['lorem ipsum', 'placeholder', 'text generator', 'paragraph', 'sentences'] },
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text changes line-by-line, word-by-word, or character-by-character', category: 'dev', icon: 'Code2', path: '/tools/text-diff-checker', component: TextDiffChecker, tags: ['diff', 'compare', 'text', 'changes', 'lcs', 'patch'] },
  { id: 'markdown-previewer', name: 'Markdown Previewer', description: 'Write markdown and preview rendered HTML side-by-side', category: 'dev', icon: 'AlignLeft', path: '/tools/markdown-previewer', component: MarkdownPreviewer, tags: ['markdown', 'preview', 'editor', 'html', 'notes', 'tables'] },
  { id: 'number-base-converter', name: 'Number Base Converter', description: 'Convert between binary, octal, decimal, and hexadecimal', category: 'dev', icon: 'Binary', path: '/tools/number-base-converter', component: NumberBaseConverter, tags: ['binary', 'hex', 'octal', 'decimal', 'base converter', 'bits'] },
  { id: 'svg-optimizer', name: 'SVG Optimizer', description: 'Minify and clean SVG code directly in your browser', category: 'dev', icon: 'Wrench', path: '/tools/svg-optimizer', component: SvgOptimizer, tags: ['svg', 'optimize', 'minify', 'vector', 'compress', 'markup'] },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', description: 'Encode, decode, and parse URLs with query editing', category: 'dev', icon: 'Search', path: '/tools/url-encoder-decoder', component: UrlEncoderDecoder, tags: ['url', 'encode', 'decode', 'query params', 'parser', 'uri'] },

  { id: 'gpa-calculator', name: 'GPA Calculator', description: 'Calculate your weighted GPA from course grades', category: 'student', icon: 'BookOpen', path: '/tools/gpa-calculator', component: GpaCalculator, tags: ['gpa', 'grade', 'credits', 'university', 'college', 'academic'] },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and reading time', category: 'student', icon: 'AlignLeft', path: '/tools/word-counter', component: WordCounter, tags: ['word count', 'character count', 'reading time', 'text', 'essay'] },
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', description: 'Focus timer with work and break intervals', category: 'student', icon: 'Timer', path: '/tools/pomodoro-timer', component: PomodoroTimer, tags: ['pomodoro', 'timer', 'focus', 'productivity', 'break', 'study'] },
  { id: 'citation-generator', name: 'Citation Generator', description: 'Generate citations in APA, MLA, and Chicago styles', category: 'student', icon: 'BookOpen', path: '/tools/citation-generator', component: CitationGenerator, tags: ['citation', 'apa', 'mla', 'chicago', 'references', 'bibliography'] },
  { id: 'readability-scorer', name: 'Readability Scorer', description: 'Analyze readability and grade level for any text', category: 'student', icon: 'AlignLeft', path: '/tools/readability-scorer', component: ReadabilityScorer, tags: ['readability', 'flesch', 'grade level', 'writing', 'text analysis'] },
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Solve percentage problems instantly across multiple modes', category: 'student', icon: 'Calculator', path: '/tools/percentage-calculator', component: PercentageCalculator, tags: ['percentage', 'math', 'increase', 'decrease', 'ratio', 'calculator'] },
  { id: 'roman-numeral-converter', name: 'Roman Numeral Converter', description: 'Convert between Roman numerals and Arabic numbers', category: 'student', icon: 'BookOpen', path: '/tools/roman-numeral-converter', component: RomanNumeralConverter, tags: ['roman numerals', 'converter', 'latin', 'numbers', 'history'] },
  { id: 'scientific-calculator', name: 'Scientific Calculator', description: 'Evaluate expressions with scientific functions and history', category: 'student', icon: 'Calculator', path: '/tools/scientific-calculator', component: ScientificCalculator, tags: ['scientific calculator', 'trig', 'log', 'expression', 'math', 'memory'] },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert values across length, mass, temperature, and more', category: 'student', icon: 'Wrench', path: '/tools/unit-converter', component: UnitConverter, tags: ['unit converter', 'length', 'temperature', 'mass', 'volume', 'science'] },
  { id: 'essay-outline-builder', name: 'Essay Outline Builder', description: 'Build and organize essay outlines with live preview', category: 'student', icon: 'AlignLeft', path: '/tools/essay-outline-builder', component: EssayOutlineBuilder, tags: ['essay', 'outline', 'writing', 'thesis', 'structure', 'study'] },
  { id: 'flashcard-session', name: 'Flashcard Session', description: 'Create flashcards and run self-graded study sessions', category: 'student', icon: 'BookOpen', path: '/tools/flashcard-session', component: FlashcardSession, tags: ['flashcards', 'study', 'quiz', 'memory', 'revision', 'learning'] },
  { id: 'quadratic-solver', name: 'Quadratic Solver', description: 'Solve quadratic equations with roots, vertex, and graph', category: 'student', icon: 'TrendingUp', path: '/tools/quadratic-solver', component: QuadraticSolver, tags: ['quadratic', 'algebra', 'roots', 'vertex', 'parabola', 'math'] },
  { id: 'study-timer', name: 'Study Timer', description: 'Advanced focus timer with modes, goals, and session logs', category: 'student', icon: 'Timer', path: '/tools/study-timer', component: StudyTimer, tags: ['study timer', 'pomodoro', 'focus', 'productivity', 'sessions', 'goal'] },

  { id: 'hourly-rate-calculator', name: 'Hourly Rate Calculator', description: 'Calculate your minimum and recommended freelance rate', category: 'freelance', icon: 'DollarSign', path: '/tools/hourly-rate-calculator', component: HourlyRateCalculator, tags: ['hourly rate', 'freelance', 'salary', 'income', 'consulting'] },
  { id: 'meeting-cost-calculator', name: 'Meeting Cost Calculator', description: 'See how much that meeting is actually costing your team', category: 'freelance', icon: 'Users', path: '/tools/meeting-cost-calculator', component: MeetingCostCalculator, tags: ['meeting', 'cost', 'salary', 'team', 'productivity', 'waste'] },
  { id: 'working-days-calculator', name: 'Working Days Calculator', description: 'Count business days between two dates', category: 'freelance', icon: 'CalendarDays', path: '/tools/working-days-calculator', component: WorkingDaysCalculator, tags: ['working days', 'business days', 'calendar', 'date', 'holidays'] },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate cryptographically secure random passwords', category: 'general', icon: 'ShieldCheck', path: '/tools/password-generator', component: PasswordGenerator, tags: ['password', 'generator', 'secure', 'random', 'crypto', 'security'] },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes for URLs or any text, download as PNG', category: 'general', icon: 'QrCode', path: '/tools/qr-code-generator', component: QrCodeGenerator, tags: ['qr code', 'qr', 'barcode', 'url', 'share', 'scan'] },
  { id: 'tip-splitter', name: 'Tip & Bill Splitter', description: 'Split bills and calculate tips between people', category: 'general', icon: 'Receipt', path: '/tools/tip-splitter', component: TipSplitter, tags: ['tip', 'bill', 'split', 'restaurant', 'percent', 'share'] },
  { id: 'bmr-calculator', name: 'BMR Calculator', description: 'Calculate your basal metabolic rate and daily calorie needs', category: 'health', icon: 'Flame', path: '/tools/bmr-calculator', component: BmrCalculator, tags: ['bmr', 'calories', 'tdee', 'metabolism', 'diet', 'fitness'] },
  { id: 'water-intake-calculator', name: 'Water Intake Calculator', description: 'Find your optimal daily water intake based on weight and activity', category: 'health', icon: 'Droplets', path: '/tools/water-intake-calculator', component: WaterIntakeCalculator, tags: ['water', 'hydration', 'intake', 'health', 'drink', 'fluid'] },
  { id: 'sleep-cycle-calculator', name: 'Sleep Cycle Calculator', description: 'Find the best times to sleep or wake up based on sleep cycles', category: 'health', icon: 'Moon', path: '/tools/sleep-cycle-calculator', component: SleepCycleCalculator, tags: ['sleep', 'wake up', 'cycle', 'rem', 'rest', 'alarm'] },
  { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'See how your investments grow with compound interest', category: 'finance', icon: 'TrendingUp', path: '/tools/compound-interest-calculator', component: CompoundInterestCalculator, tags: ['compound interest', 'investment', 'savings', 'growth', 'interest rate'] },
  { id: 'loan-calculator', name: 'Loan / EMI Calculator', description: 'Calculate monthly payments and total interest on any loan', category: 'finance', icon: 'Landmark', path: '/tools/loan-calculator', component: LoanCalculator, tags: ['loan', 'emi', 'mortgage', 'interest', 'payment', 'amortization'] },
  { id: 'fire-number-calculator', name: 'FIRE Number Calculator', description: 'Calculate your Financial Independence number and retirement timeline', category: 'finance', icon: 'PiggyBank', path: '/tools/fire-number-calculator', component: FireNumberCalculator, tags: ['fire', 'financial independence', 'retire early', 'savings', 'wealth'] },
]

export default tools
