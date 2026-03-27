import { lazy } from 'react'

const GpaCalculator = lazy(() => import('../../tools/student/GpaCalculator.jsx'))
const WordCounter = lazy(() => import('../../tools/student/WordCounter.jsx'))
const PomodoroTimer = lazy(() => import('../../tools/student/PomodoroTimer.jsx'))
const CitationGenerator = lazy(() => import('../../tools/student/CitationGenerator.jsx'))
const ReadabilityScorer = lazy(() => import('../../tools/student/ReadabilityScorer.jsx'))
const PercentageCalculator = lazy(() => import('../../tools/student/PercentageCalculator.jsx'))
const RomanNumeralConverter = lazy(() => import('../../tools/student/RomanNumeralConverter.jsx'))
const ScientificCalculator = lazy(() => import('../../tools/student/ScientificCalculator.jsx'))
const UnitConverter = lazy(() => import('../../tools/student/UnitConverter.jsx'))
const EssayOutlineBuilder = lazy(() => import('../../tools/student/EssayOutlineBuilder.jsx'))
const FlashcardSession = lazy(() => import('../../tools/student/FlashcardSession.jsx'))
const QuadraticSolver = lazy(() => import('../../tools/student/QuadraticSolver.jsx'))
const StudyTimer = lazy(() => import('../../tools/student/StudyTimer.jsx'))

export const studentTools = [
  { id: 'gpa-calculator', name: 'GPA Calculator', description: 'Calculate your weighted GPA from course grades', category: 'student', subcategory: 'calculators', icon: 'BookOpen', path: '/tools/gpa-calculator', component: GpaCalculator, tags: ['gpa', 'grade', 'credits', 'university', 'college', 'academic'], isPopular: false, isNew: false },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and reading time', category: 'student', subcategory: 'writing', icon: 'AlignLeft', path: '/tools/word-counter', component: WordCounter, tags: ['word count', 'character count', 'reading time', 'text', 'essay'], isPopular: true, isNew: false },
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', description: 'Focus timer with work and break intervals', category: 'student', subcategory: 'learning', icon: 'Timer', path: '/tools/pomodoro-timer', component: PomodoroTimer, tags: ['pomodoro', 'timer', 'focus', 'productivity', 'break', 'study'], isPopular: true, isNew: false },
  { id: 'citation-generator', name: 'Citation Generator', description: 'Generate citations in APA, MLA, and Chicago styles', category: 'student', subcategory: 'writing', icon: 'BookOpen', path: '/tools/citation-generator', component: CitationGenerator, tags: ['citation', 'apa', 'mla', 'chicago', 'references', 'bibliography'], isPopular: false, isNew: false },
  { id: 'readability-scorer', name: 'Readability Scorer', description: 'Analyze readability and grade level for any text', category: 'student', subcategory: 'writing', icon: 'AlignLeft', path: '/tools/readability-scorer', component: ReadabilityScorer, tags: ['readability', 'flesch', 'grade level', 'writing', 'text analysis'], isPopular: false, isNew: false },
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Solve percentage problems instantly across multiple modes', category: 'student', subcategory: 'calculators', icon: 'Calculator', path: '/tools/percentage-calculator', component: PercentageCalculator, tags: ['percentage', 'math', 'increase', 'decrease', 'ratio', 'calculator'], isPopular: false, isNew: false },
  { id: 'roman-numeral-converter', name: 'Roman Numeral Converter', description: 'Convert between Roman numerals and Arabic numbers', category: 'student', subcategory: 'converters', icon: 'BookOpen', path: '/tools/roman-numeral-converter', component: RomanNumeralConverter, tags: ['roman numerals', 'converter', 'latin', 'numbers', 'history'], isPopular: false, isNew: false },
  { id: 'scientific-calculator', name: 'Scientific Calculator', description: 'Evaluate expressions with scientific functions and history', category: 'student', subcategory: 'calculators', icon: 'Calculator', path: '/tools/scientific-calculator', component: ScientificCalculator, tags: ['scientific calculator', 'trig', 'log', 'expression', 'math', 'memory'], isPopular: false, isNew: false },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert values across length, mass, temperature, and more', category: 'student', subcategory: 'converters', icon: 'Wrench', path: '/tools/unit-converter', component: UnitConverter, tags: ['unit converter', 'length', 'temperature', 'mass', 'volume', 'science'], isPopular: false, isNew: false },
  { id: 'essay-outline-builder', name: 'Essay Outline Builder', description: 'Build and organize essay outlines with live preview', category: 'student', subcategory: 'writing', icon: 'AlignLeft', path: '/tools/essay-outline-builder', component: EssayOutlineBuilder, tags: ['essay', 'outline', 'writing', 'thesis', 'structure', 'study'], isPopular: false, isNew: false },
  { id: 'flashcard-session', name: 'Flashcard Session', description: 'Create flashcards and run self-graded study sessions', category: 'student', subcategory: 'learning', icon: 'BookOpen', path: '/tools/flashcard-session', component: FlashcardSession, tags: ['flashcards', 'study', 'quiz', 'memory', 'revision', 'learning'], isPopular: false, isNew: false },
  { id: 'quadratic-solver', name: 'Quadratic Solver', description: 'Solve quadratic equations with roots, vertex, and graph', category: 'student', subcategory: 'calculators', icon: 'TrendingUp', path: '/tools/quadratic-solver', component: QuadraticSolver, tags: ['quadratic', 'algebra', 'roots', 'vertex', 'parabola', 'math'], isPopular: false, isNew: false },
  { id: 'study-timer', name: 'Study Timer', description: 'Advanced focus timer with modes, goals, and session logs', category: 'student', subcategory: 'learning', icon: 'Timer', path: '/tools/study-timer', component: StudyTimer, tags: ['study timer', 'pomodoro', 'focus', 'productivity', 'sessions', 'goal'], isPopular: false, isNew: false },
]
