import { lazy } from 'react'

const JsonFormatter = lazy(() => import('../tools/dev/JsonFormatter.jsx'))
const Base64Tool = lazy(() => import('../tools/dev/Base64Tool.jsx'))
const UuidGenerator = lazy(() => import('../tools/dev/UuidGenerator.jsx'))
const GpaCalculator = lazy(() => import('../tools/student/GpaCalculator.jsx'))
const WordCounter = lazy(() => import('../tools/student/WordCounter.jsx'))
const PomodoroTimer = lazy(() => import('../tools/student/PomodoroTimer.jsx'))
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
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Validate and prettify JSON instantly',
    category: 'dev',
    icon: 'Braces',
    path: '/tools/json-formatter',
    component: JsonFormatter,
    tags: ['json', 'format', 'validate', 'pretty print', 'minify'],
  },
  {
    id: 'base64-tool',
    name: 'Base64 Tool',
    description: 'Encode and decode Base64 strings in real-time',
    category: 'dev',
    icon: 'Binary',
    path: '/tools/base64-tool',
    component: Base64Tool,
    tags: ['base64', 'encode', 'decode', 'binary', 'string'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate secure random UUIDs using the Web Crypto API',
    category: 'dev',
    icon: 'Fingerprint',
    path: '/tools/uuid-generator',
    component: UuidGenerator,
    tags: ['uuid', 'guid', 'random', 'unique id', 'generator'],
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Calculate your weighted GPA from course grades',
    category: 'student',
    icon: 'BookOpen',
    path: '/tools/gpa-calculator',
    component: GpaCalculator,
    tags: ['gpa', 'grade', 'credits', 'university', 'college', 'academic'],
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and reading time',
    category: 'student',
    icon: 'AlignLeft',
    path: '/tools/word-counter',
    component: WordCounter,
    tags: ['word count', 'character count', 'reading time', 'text', 'essay'],
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'Focus timer with work and break intervals',
    category: 'student',
    icon: 'Timer',
    path: '/tools/pomodoro-timer',
    component: PomodoroTimer,
    tags: ['pomodoro', 'timer', 'focus', 'productivity', 'break', 'study'],
  },
  {
    id: 'hourly-rate-calculator',
    name: 'Hourly Rate Calculator',
    description: 'Calculate your minimum and recommended freelance rate',
    category: 'freelance',
    icon: 'DollarSign',
    path: '/tools/hourly-rate-calculator',
    component: HourlyRateCalculator,
    tags: ['hourly rate', 'freelance', 'salary', 'income', 'consulting'],
  },
  {
    id: 'meeting-cost-calculator',
    name: 'Meeting Cost Calculator',
    description: 'See how much that meeting is actually costing your team',
    category: 'freelance',
    icon: 'Users',
    path: '/tools/meeting-cost-calculator',
    component: MeetingCostCalculator,
    tags: ['meeting', 'cost', 'salary', 'team', 'productivity', 'waste'],
  },
  {
    id: 'working-days-calculator',
    name: 'Working Days Calculator',
    description: 'Count business days between two dates',
    category: 'freelance',
    icon: 'CalendarDays',
    path: '/tools/working-days-calculator',
    component: WorkingDaysCalculator,
    tags: ['working days', 'business days', 'calendar', 'date', 'holidays'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate cryptographically secure random passwords',
    category: 'general',
    icon: 'ShieldCheck',
    path: '/tools/password-generator',
    component: PasswordGenerator,
    tags: ['password', 'generator', 'secure', 'random', 'crypto', 'security'],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs or any text, download as PNG',
    category: 'general',
    icon: 'QrCode',
    path: '/tools/qr-code-generator',
    component: QrCodeGenerator,
    tags: ['qr code', 'qr', 'barcode', 'url', 'share', 'scan'],
  },
  {
    id: 'tip-splitter',
    name: 'Tip & Bill Splitter',
    description: 'Split bills and calculate tips between people',
    category: 'general',
    icon: 'Receipt',
    path: '/tools/tip-splitter',
    component: TipSplitter,
    tags: ['tip', 'bill', 'split', 'restaurant', 'percent', 'share'],
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Calculate your basal metabolic rate and daily calorie needs',
    category: 'health',
    icon: 'Flame',
    path: '/tools/bmr-calculator',
    component: BmrCalculator,
    tags: ['bmr', 'calories', 'tdee', 'metabolism', 'diet', 'fitness'],
  },
  {
    id: 'water-intake-calculator',
    name: 'Water Intake Calculator',
    description: 'Find your optimal daily water intake based on weight and activity',
    category: 'health',
    icon: 'Droplets',
    path: '/tools/water-intake-calculator',
    component: WaterIntakeCalculator,
    tags: ['water', 'hydration', 'intake', 'health', 'drink', 'fluid'],
  },
  {
    id: 'sleep-cycle-calculator',
    name: 'Sleep Cycle Calculator',
    description: 'Find the best times to sleep or wake up based on sleep cycles',
    category: 'health',
    icon: 'Moon',
    path: '/tools/sleep-cycle-calculator',
    component: SleepCycleCalculator,
    tags: ['sleep', 'wake up', 'cycle', 'rem', 'rest', 'alarm'],
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'See how your investments grow with compound interest',
    category: 'finance',
    icon: 'TrendingUp',
    path: '/tools/compound-interest-calculator',
    component: CompoundInterestCalculator,
    tags: ['compound interest', 'investment', 'savings', 'growth', 'interest rate'],
  },
  {
    id: 'loan-calculator',
    name: 'Loan / EMI Calculator',
    description: 'Calculate monthly payments and total interest on any loan',
    category: 'finance',
    icon: 'Landmark',
    path: '/tools/loan-calculator',
    component: LoanCalculator,
    tags: ['loan', 'emi', 'mortgage', 'interest', 'payment', 'amortization'],
  },
  {
    id: 'fire-number-calculator',
    name: 'FIRE Number Calculator',
    description: 'Calculate your Financial Independence number and retirement timeline',
    category: 'finance',
    icon: 'PiggyBank',
    path: '/tools/fire-number-calculator',
    component: FireNumberCalculator,
    tags: ['fire', 'financial independence', 'retire early', 'savings', 'wealth'],
  },
]

export default tools
