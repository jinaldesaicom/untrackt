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
const ColorPaletteGenerator = lazy(() => import('../tools/general/ColorPaletteGenerator.jsx'))
const AspectRatioCalculator = lazy(() => import('../tools/general/AspectRatioCalculator.jsx'))
const ImageToBase64 = lazy(() => import('../tools/general/ImageToBase64.jsx'))
const CountdownTimer = lazy(() => import('../tools/general/CountdownTimer.jsx'))
const WordFrequencyCounter = lazy(() => import('../tools/general/WordFrequencyCounter.jsx'))
const TypingSpeedTest = lazy(() => import('../tools/general/TypingSpeedTest.jsx'))
const RandomNumberGenerator = lazy(() => import('../tools/general/RandomNumberGenerator.jsx'))
const BinaryTextConverter = lazy(() => import('../tools/general/BinaryTextConverter.jsx'))
const CaseConverter = lazy(() => import('../tools/general/CaseConverter.jsx'))
const JsonToCsvConverter = lazy(() => import('../tools/general/JsonToCsvConverter.jsx'))
const TextToSlug = lazy(() => import('../tools/general/TextToSlug.jsx'))
const MetaTagGenerator = lazy(() => import('../tools/general/MetaTagGenerator.jsx'))
const BmrCalculator = lazy(() => import('../tools/health/BmrCalculator.jsx'))
const WaterIntakeCalculator = lazy(() => import('../tools/health/WaterIntakeCalculator.jsx'))
const SleepCycleCalculator = lazy(() => import('../tools/health/SleepCycleCalculator.jsx'))
const TDEECalculator = lazy(() => import('../tools/health/TDEECalculator.jsx'))
const IdealWeightCalculator = lazy(() => import('../tools/health/IdealWeightCalculator.jsx'))
const BodyFatCalculator = lazy(() => import('../tools/health/BodyFatCalculator.jsx'))
const MacroCalculator = lazy(() => import('../tools/health/MacroCalculator.jsx'))
const BloodPressureClassifier = lazy(() => import('../tools/health/BloodPressureClassifier.jsx'))
const HeartRateZoneCalculator = lazy(() => import('../tools/health/HeartRateZoneCalculator.jsx'))
const PregnancyDueDateCalculator = lazy(() => import('../tools/health/PregnancyDueDateCalculator.jsx'))
const OvulationCalculator = lazy(() => import('../tools/health/OvulationCalculator.jsx'))
const AlcoholUnitCalculator = lazy(() => import('../tools/health/AlcoholUnitCalculator.jsx'))
const CalorieBurnEstimator = lazy(() => import('../tools/health/CalorieBurnEstimator.jsx'))
const MedicalUnitConverter = lazy(() => import('../tools/health/MedicalUnitConverter.jsx'))
const VaccinationAgeGuide = lazy(() => import('../tools/health/VaccinationAgeGuide.jsx'))
const CompoundInterestCalculator = lazy(() => import('../tools/finance/CompoundInterestCalculator.jsx'))
const LoanCalculator = lazy(() => import('../tools/finance/LoanCalculator.jsx'))
const FireNumberCalculator = lazy(() => import('../tools/finance/FireNumberCalculator.jsx'))

const InvoiceGenerator = lazy(() => import('../tools/freelance/InvoiceGenerator.jsx'))
const ProjectTimelineEstimator = lazy(() => import('../tools/freelance/ProjectTimelineEstimator.jsx'))
const TaxBracketEstimator = lazy(() => import('../tools/freelance/TaxBracketEstimator.jsx'))
const DiscountMarkupCalculator = lazy(() => import('../tools/freelance/DiscountMarkupCalculator.jsx'))
const ContractAnalyzer = lazy(() => import('../tools/freelance/ContractAnalyzer.jsx'))
const ProposalBuilder = lazy(() => import('../tools/freelance/ProposalBuilder.jsx'))
const ClientProfitabilityEstimator = lazy(() => import('../tools/freelance/ClientProfitabilityEstimator.jsx'))
const LatePaymentFeeCalculator = lazy(() => import('../tools/freelance/LatePaymentFeeCalculator.jsx'))
const TimeZoneScheduler = lazy(() => import('../tools/freelance/TimeZoneScheduler.jsx'))

const MortgageCalculator = lazy(() => import('../tools/finance/MortgageCalculator.jsx'))
const SIPCalculator = lazy(() => import('../tools/finance/SIPCalculator.jsx'))
const RetirementCalculator = lazy(() => import('../tools/finance/RetirementCalculator.jsx'))
const RuleOf72Calculator = lazy(() => import('../tools/finance/RuleOf72Calculator.jsx'))
const BreakEvenCalculator = lazy(() => import('../tools/finance/BreakEvenCalculator.jsx'))
const InflationCalculator = lazy(() => import('../tools/finance/InflationCalculator.jsx'))
const NetWorthSnapshot = lazy(() => import('../tools/finance/NetWorthSnapshot.jsx'))
const SavingsGoalCalculator = lazy(() => import('../tools/finance/SavingsGoalCalculator.jsx'))
const CreditCardPayoffCalculator = lazy(() => import('../tools/finance/CreditCardPayoffCalculator.jsx'))
const ROICalculator = lazy(() => import('../tools/finance/ROICalculator.jsx'))
const CurrencyConverter = lazy(() => import('../tools/finance/CurrencyConverter.jsx'))
const EmergencyFundCalculator = lazy(() => import('../tools/finance/EmergencyFundCalculator.jsx'))

export const categories = [
  { id: 'dev', name: 'Dev Tools', icon: 'Code2', color: 'violet', description: 'Utilities for developers: formatters, encoders, generators.' },
  { id: 'student', name: 'Student', icon: 'GraduationCap', color: 'blue', description: 'Tools to help students study, track grades, and manage time.' },
  { id: 'freelance', name: 'Freelance', icon: 'Briefcase', color: 'amber', description: 'Rate calculators, cost estimators, and scheduling tools.' },
  { id: 'general', name: 'General', icon: 'Grid3x3', color: 'gray', description: 'Everyday utilities everyone can use.' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'green', description: 'Calculators for fitness, nutrition, and wellness.' },
  { id: 'finance', name: 'Finance', icon: 'TrendingUp', color: 'emerald', description: 'Personal finance calculators and planners.' },
]

export const categoryColorMap = {
  dev:      { bg: 'bg-violet-100',  darkBg: 'dark:bg-violet-900/30',  text: 'text-violet-700',  darkText: 'dark:text-violet-300',  border: 'border-violet-200',  darkBorder: 'dark:border-violet-800',  icon: 'text-violet-500',  pill: 'bg-violet-500'  },
  student:  { bg: 'bg-blue-100',    darkBg: 'dark:bg-blue-900/30',    text: 'text-blue-700',    darkText: 'dark:text-blue-300',    border: 'border-blue-200',    darkBorder: 'dark:border-blue-800',    icon: 'text-blue-500',    pill: 'bg-blue-500'    },
  freelance:{ bg: 'bg-amber-100',   darkBg: 'dark:bg-amber-900/30',   text: 'text-amber-700',   darkText: 'dark:text-amber-300',   border: 'border-amber-200',   darkBorder: 'dark:border-amber-800',   icon: 'text-amber-500',   pill: 'bg-amber-500'   },
  general:  { bg: 'bg-gray-100',    darkBg: 'dark:bg-gray-700',       text: 'text-gray-700',    darkText: 'dark:text-gray-300',    border: 'border-gray-200',    darkBorder: 'dark:border-gray-600',    icon: 'text-gray-500',    pill: 'bg-gray-500'    },
  health:   { bg: 'bg-green-100',   darkBg: 'dark:bg-green-900/30',   text: 'text-green-700',   darkText: 'dark:text-green-300',   border: 'border-green-200',   darkBorder: 'dark:border-green-800',   icon: 'text-green-500',   pill: 'bg-green-500'   },
  finance:  { bg: 'bg-emerald-100', darkBg: 'dark:bg-emerald-900/30', text: 'text-emerald-700', darkText: 'dark:text-emerald-300', border: 'border-emerald-200', darkBorder: 'dark:border-emerald-800', icon: 'text-emerald-500', pill: 'bg-emerald-500' },
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

  { id: 'invoice-generator', name: 'Invoice Generator', description: 'Create professional invoices with PDF export and template saving', category: 'freelance', icon: 'FileText', path: '/tools/invoice-generator', component: InvoiceGenerator, tags: ['invoice', 'invoicing', 'pdf', 'receipt', 'payment', 'template'] },
  { id: 'project-timeline-estimator', name: 'Project Timeline Estimator', description: 'Estimate project timelines with dependencies, critical path analysis, and Gantt chart visualization', category: 'freelance', icon: 'Calendar', path: '/tools/project-timeline-estimator', component: ProjectTimelineEstimator, tags: ['project', 'timeline', 'gantt', 'estimation', 'schedule', 'dependencies'] },
  { id: 'tax-bracket-estimator', name: 'Tax Bracket Estimator', description: 'Calculate taxes across 8 countries with effective and marginal rates', category: 'freelance', icon: 'TrendingUp', path: '/tools/tax-bracket-estimator', component: TaxBracketEstimator, tags: ['tax', 'brackets', 'income tax', 'effective rate', 'marginal', 'international'] },
  { id: 'discount-markup-calculator', name: 'Discount & Markup Calculator', description: 'Calculate discounts, markups, profit margins, and bulk pricing tables', category: 'freelance', icon: 'Percent', path: '/tools/discount-markup-calculator', component: DiscountMarkupCalculator, tags: ['discount', 'markup', 'margin', 'pricing', 'profit', 'bulk'] },
  { id: 'contract-analyzer', name: 'Contract Analyzer', description: 'Analyze contracts for readability, keywords, passive voice, and key terms extraction', category: 'freelance', icon: 'FileText', path: '/tools/contract-analyzer', component: ContractAnalyzer, tags: ['contract', 'analysis', 'legal', 'readability', 'keywords', 'text'] },
  { id: 'proposal-builder', name: 'Proposal Builder', description: 'Build professional proposals with auto-save and live word count', category: 'freelance', icon: 'Pen', path: '/tools/proposal-builder', component: ProposalBuilder, tags: ['proposal', 'business', 'pitch', 'auto-save', 'writing', 'template'] },
  { id: 'client-profitability-estimator', name: 'Client Profitability Estimator', description: 'Track client profitability with hourly rate, overhead, and stress factors', category: 'freelance', icon: 'Users', path: '/tools/client-profitability-estimator', component: ClientProfitabilityEstimator, tags: ['client', 'profitability', 'score', 'comparison', 'revenue', 'metrics'] },
  { id: 'late-payment-fee-calculator', name: 'Late Payment Fee Calculator', description: 'Calculate late payment fees with daily/monthly compounding and payment reminders', category: 'freelance', icon: 'AlertCircle', path: '/tools/late-payment-fee-calculator', component: LatePaymentFeeCalculator, tags: ['late payment', 'fee', 'invoice', 'reminder', 'penalty', 'debt'] },
  { id: 'timezone-scheduler', name: 'Time Zone Scheduler', description: 'Find overlapping meeting times across 8+ time zones with DST support', category: 'freelance', icon: 'Globe', path: '/tools/timezone-scheduler', component: TimeZoneScheduler, tags: ['timezone', 'scheduling', 'meeting', 'asia', 'europe', 'dst'] },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate cryptographically secure random passwords', category: 'general', icon: 'ShieldCheck', path: '/tools/password-generator', component: PasswordGenerator, tags: ['password', 'generator', 'secure', 'random', 'crypto', 'security'] },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes for URLs or any text, download as PNG', category: 'general', icon: 'QrCode', path: '/tools/qr-code-generator', component: QrCodeGenerator, tags: ['qr code', 'qr', 'barcode', 'url', 'share', 'scan'] },
  { id: 'tip-splitter', name: 'Tip & Bill Splitter', description: 'Split bills and calculate tips between people', category: 'general', icon: 'Receipt', path: '/tools/tip-splitter', component: TipSplitter, tags: ['tip', 'bill', 'split', 'restaurant', 'percent', 'share'] },
  { id: 'color-palette-generator', name: 'Color Palette Generator', description: 'Generate palettes from a base color, random style, or uploaded image', category: 'general', icon: 'Palette', path: '/tools/color-palette-generator', component: ColorPaletteGenerator, tags: ['color palette', 'design', 'harmony', 'swatches', 'css variables', 'tailwind'] },
  { id: 'aspect-ratio-calculator', name: 'Aspect Ratio Calculator', description: 'Resize images and layouts while preserving aspect ratio', category: 'general', icon: 'Crop', path: '/tools/aspect-ratio-calculator', component: AspectRatioCalculator, tags: ['aspect ratio', 'image size', 'resize', 'dimensions', 'preview', 'social media'] },
  { id: 'image-to-base64', name: 'Image to Base64', description: 'Convert image files or URLs into Base64 strings and Data URLs', category: 'general', icon: 'Image', path: '/tools/image-to-base64', component: ImageToBase64, tags: ['base64', 'image', 'data url', 'file upload', 'embed', 'preview'] },
  { id: 'countdown-timer', name: 'Countdown Timer', description: 'Track live countdowns for upcoming events with saved presets', category: 'general', icon: 'Timer', path: '/tools/countdown-timer', component: CountdownTimer, tags: ['countdown', 'timer', 'event', 'new year', 'birthday', 'reminder'] },
  { id: 'word-frequency-counter', name: 'Word Frequency Counter', description: 'Analyze text frequency, top words, and export word counts', category: 'general', icon: 'BarChart3', path: '/tools/word-frequency-counter', component: WordFrequencyCounter, tags: ['word frequency', 'text analysis', 'word cloud', 'csv export', 'writing', 'counter'] },
  { id: 'typing-speed-test', name: 'Typing Speed Test', description: 'Measure WPM, CPM, accuracy, and errors across different typing modes', category: 'general', icon: 'Keyboard', path: '/tools/typing-speed-test', component: TypingSpeedTest, tags: ['typing', 'wpm', 'cpm', 'accuracy', 'keyboard', 'practice'] },
  { id: 'random-number-generator', name: 'Random Number Generator', description: 'Generate secure random numbers, dice rolls, list picks, and coin flips', category: 'general', icon: 'Dices', path: '/tools/random-number-generator', component: RandomNumberGenerator, tags: ['random', 'number generator', 'dice', 'coin flip', 'crypto', 'picker'] },
  { id: 'binary-text-converter', name: 'Binary Text Converter', description: 'Convert text with binary, Morse code, hex, and ASCII formats', category: 'general', icon: 'Binary', path: '/tools/binary-text-converter', component: BinaryTextConverter, tags: ['binary', 'morse', 'hex', 'ascii', 'converter', 'encoding'] },
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text into sentence case, snake_case, kebab-case, and more', category: 'general', icon: 'CaseSensitive', path: '/tools/case-converter', component: CaseConverter, tags: ['case converter', 'camelCase', 'snake_case', 'kebab-case', 'text transform', 'title case'] },
  { id: 'json-to-csv-converter', name: 'JSON to CSV Converter', description: 'Convert JSON arrays to CSV and CSV back to JSON with previews', category: 'general', icon: 'FileJson', path: '/tools/json-to-csv-converter', component: JsonToCsvConverter, tags: ['json', 'csv', 'converter', 'download', 'table', 'export'] },
  { id: 'text-to-slug', name: 'Text to Slug', description: 'Turn titles and text into clean URL slugs, hashtags, and file-safe names', category: 'general', icon: 'Link2', path: '/tools/text-to-slug', component: TextToSlug, tags: ['slug', 'seo', 'url', 'hashtag', 'transliteration', 'batch'] },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate page meta tags, Open Graph, Twitter cards, and JSON-LD', category: 'general', icon: 'Tags', path: '/tools/meta-tag-generator', component: MetaTagGenerator, tags: ['meta tags', 'seo', 'open graph', 'twitter card', 'json-ld', 'html'] },
  { id: 'bmr-calculator', name: 'BMR Calculator', description: 'Calculate your basal metabolic rate and daily calorie needs', category: 'health', icon: 'Flame', path: '/tools/bmr-calculator', component: BmrCalculator, tags: ['bmr', 'calories', 'tdee', 'metabolism', 'diet', 'fitness'] },
  { id: 'water-intake-calculator', name: 'Water Intake Calculator', description: 'Find your optimal daily water intake based on weight and activity', category: 'health', icon: 'Droplets', path: '/tools/water-intake-calculator', component: WaterIntakeCalculator, tags: ['water', 'hydration', 'intake', 'health', 'drink', 'fluid'] },
  { id: 'sleep-cycle-calculator', name: 'Sleep Cycle Calculator', description: 'Find the best times to sleep or wake up based on sleep cycles', category: 'health', icon: 'Moon', path: '/tools/sleep-cycle-calculator', component: SleepCycleCalculator, tags: ['sleep', 'wake up', 'cycle', 'rem', 'rest', 'alarm'] },
  { id: 'tdee-calculator', name: 'TDEE Calculator', description: 'Calculate your total daily energy expenditure and calorie targets for your fitness goals.', category: 'health', icon: 'Flame', path: '/tools/tdee-calculator', component: TDEECalculator, tags: ['tdee', 'calories', 'bmr', 'metabolism', 'weight loss', 'nutrition', 'fitness'] },
  { id: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', description: 'Compare multiple formulas to estimate a broad ideal weight range.', category: 'health', icon: 'Scale', path: '/tools/ideal-weight-calculator', component: IdealWeightCalculator, tags: ['ideal weight', 'healthy weight', 'bmi range', 'devine', 'hamwi', 'robinson'] },
  { id: 'body-fat-calculator', name: 'Body Fat Calculator', description: 'Estimate body fat percentage, fat mass, and lean mass with two methods.', category: 'health', icon: 'Activity', path: '/tools/body-fat-calculator', component: BodyFatCalculator, tags: ['body fat', 'us navy', 'bmi method', 'lean mass', 'fitness', 'composition'] },
  { id: 'macro-calculator', name: 'Macro Calculator', description: 'Turn your calorie target into daily protein, fat, and carb goals.', category: 'health', icon: 'PieChart', path: '/tools/macro-calculator', component: MacroCalculator, tags: ['macros', 'protein', 'carbs', 'fat', 'diet', 'nutrition'] },
  { id: 'blood-pressure-classifier', name: 'Blood Pressure Classifier', description: 'Classify blood pressure readings and understand what the result means.', category: 'health', icon: 'HeartPulse', path: '/tools/blood-pressure-classifier', component: BloodPressureClassifier, tags: ['blood pressure', 'hypertension', 'systolic', 'diastolic', 'classifier', 'health'] },
  { id: 'heart-rate-zone-calculator', name: 'Heart Rate Zone Calculator', description: 'Calculate standard and Karvonen heart rate training zones.', category: 'health', icon: 'HeartPulse', path: '/tools/heart-rate-zone-calculator', component: HeartRateZoneCalculator, tags: ['heart rate zones', 'karvonen', 'training', 'cardio', 'max hr', 'fitness'] },
  { id: 'pregnancy-due-date-calculator', name: 'Pregnancy Due Date Calculator', description: 'Estimate due date, gestational age, and key milestone dates.', category: 'health', icon: 'Baby', path: '/tools/pregnancy-due-date-calculator', component: PregnancyDueDateCalculator, tags: ['pregnancy', 'due date', 'gestational age', 'ivf', 'lmp', 'milestones'] },
  { id: 'ovulation-calculator', name: 'Ovulation Calculator', description: 'Estimate ovulation dates, fertile windows, and the next expected period.', category: 'health', icon: 'CalendarDays', path: '/tools/ovulation-calculator', component: OvulationCalculator, tags: ['ovulation', 'fertile window', 'period', 'cycle', 'fertility', 'calendar'] },
  { id: 'alcohol-unit-calculator', name: 'Alcohol Unit Calculator', description: 'Estimate alcohol units, pure alcohol grams, and processing time.', category: 'health', icon: 'Wine', path: '/tools/alcohol-unit-calculator', component: AlcoholUnitCalculator, tags: ['alcohol units', 'abv', 'drinks', 'processing time', 'weekly limit', 'calories'] },
  { id: 'calorie-burn-estimator', name: 'Calorie Burn Estimator', description: 'Estimate calories burned from activity duration, MET values, and body weight.', category: 'health', icon: 'Flame', path: '/tools/calorie-burn-estimator', component: CalorieBurnEstimator, tags: ['calories burned', 'met', 'exercise', 'activity', 'weight', 'fitness'] },
  { id: 'medical-unit-converter', name: 'Medical Unit Converter', description: 'Convert glucose, cholesterol, HbA1c, temperature, weight, and height.', category: 'health', icon: 'Calculator', path: '/tools/medical-unit-converter', component: MedicalUnitConverter, tags: ['medical units', 'glucose', 'cholesterol', 'hba1c', 'temperature', 'converter'] },
  { id: 'vaccination-age-guide', name: 'Vaccination Age Guide', description: 'Browse country-specific vaccination milestones and childhood schedules.', category: 'health', icon: 'Syringe', path: '/tools/vaccination-age-guide', component: VaccinationAgeGuide, tags: ['vaccination', 'immunization', 'schedule', 'cdc', 'nhs', 'reference'] },
  { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'See how your investments grow with compound interest', category: 'finance', icon: 'TrendingUp', path: '/tools/compound-interest-calculator', component: CompoundInterestCalculator, tags: ['compound interest', 'investment', 'savings', 'growth', 'interest rate'] },
  { id: 'loan-calculator', name: 'Loan / EMI Calculator', description: 'Calculate monthly payments and total interest on any loan', category: 'finance', icon: 'Landmark', path: '/tools/loan-calculator', component: LoanCalculator, tags: ['loan', 'emi', 'mortgage', 'interest', 'payment', 'amortization'] },
  { id: 'fire-number-calculator', name: 'FIRE Number Calculator', description: 'Calculate your Financial Independence number and retirement timeline', category: 'finance', icon: 'PiggyBank', path: '/tools/fire-number-calculator', component: FireNumberCalculator, tags: ['fire', 'financial independence', 'retire early', 'savings', 'wealth'] },

  { id: 'mortgage-calculator', name: 'Mortgage Calculator', description: 'Calculate monthly payments, amortization schedule, and PMI removal dates', category: 'finance', icon: 'Home', path: '/tools/mortgage-calculator', component: MortgageCalculator, tags: ['mortgage', 'payment', 'amortization', 'pmi', 'home loan', 'property'] },
  { id: 'sip-calculator', name: 'SIP Calculator', description: 'Calculate SIP (monthly) vs Lumpsum investment growth and returns', category: 'finance', icon: 'TrendingUp', path: '/tools/sip-calculator', component: SIPCalculator, tags: ['sip', 'systematic investment', 'mutual fund', 'lumpsum', 'return', 'simulation'] },
  { id: 'retirement-calculator', name: 'Retirement Calculator', description: 'Plan retirement with age, savings, contributions, and longevity projection', category: 'finance', icon: 'PiggyBank', path: '/tools/retirement-calculator', component: RetirementCalculator, tags: ['retirement', 'planning', 'pension', 'savings', 'age', 'longevity'] },
  { id: 'rule-of-72-calculator', name: 'Rule of 72 Calculator', description: 'Calculate doubling time for investments and compare estimate vs actual', category: 'finance', icon: 'Calculator', path: '/tools/rule-of-72-calculator', component: RuleOf72Calculator, tags: ['rule of 72', 'doubling time', 'investment', 'compound', 'growth', 'rate'] },
  { id: 'break-even-calculator', name: 'Break-Even Calculator', description: 'Find your break-even point for products, services, or investments', category: 'finance', icon: 'TrendingUp', path: '/tools/break-even-calculator', component: BreakEvenCalculator, tags: ['break-even', 'business', 'revenue', 'investment', 'roi', 'payback'] },
  { id: 'inflation-calculator', name: 'Inflation Calculator', description: 'Calculate inflation-adjusted values using historical US CPI data (1950-2024)', category: 'finance', icon: 'TrendingUp', path: '/tools/inflation-calculator', component: InflationCalculator, tags: ['inflation', 'cpi', 'purchasing power', 'historical', 'economics', 'value'] },
  { id: 'net-worth-snapshot', name: 'Net Worth Snapshot', description: 'Calculate your net worth from assets and liabilities with breakdowns', category: 'finance', icon: 'PieChart', path: '/tools/net-worth-snapshot', component: NetWorthSnapshot, tags: ['net worth', 'assets', 'liabilities', 'wealth', 'balance sheet', 'tracker'] },
  { id: 'savings-goal-calculator', name: 'Savings Goal Calculator', description: 'Track multiple savings goals with progress, deadlines, and monthly targets', category: 'finance', icon: 'Target', path: '/tools/savings-goal-calculator', component: SavingsGoalCalculator, tags: ['savings', 'goal', 'tracking', 'deadline', 'progress', 'targets'] },
  { id: 'credit-card-payoff-calculator', name: 'Credit Card Payoff Calculator', description: 'Calculate payoff timeline, compare strategies, and see amortization schedule', category: 'finance', icon: 'CreditCard', path: '/tools/credit-card-payoff-calculator', component: CreditCardPayoffCalculator, tags: ['credit card', 'payoff', 'debt', 'interest', 'amortization', 'strategy'] },
  { id: 'roi-calculator', name: 'ROI Calculator', description: 'Calculate ROI for basic investments, real estate CAP rate, and marketing campaigns', category: 'finance', icon: 'TrendingUp', path: '/tools/roi-calculator', component: ROICalculator, tags: ['roi', 'return', 'investment', 'real estate', 'marketing', 'analysis'] },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between 20+ currencies with real-time rates and offline fallback', category: 'finance', icon: 'DollarSign', path: '/tools/currency-converter', component: CurrencyConverter, tags: ['currency', 'converter', 'exchange rate', 'forex', 'international', 'rates'] },
  { id: 'emergency-fund-calculator', name: 'Emergency Fund Calculator', description: 'Calculate emergency fund needs based on monthly essentials and coverage months', category: 'finance', icon: 'Shield', path: '/tools/emergency-fund-calculator', component: EmergencyFundCalculator, tags: ['emergency fund', 'savings', 'financial security', 'essentials', 'planning', 'safety'] },
]

export default tools
