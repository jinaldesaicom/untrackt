import { devTools } from './tools/devTools.js'
import { studentTools } from './tools/studentTools.js'
import { freelanceTools } from './tools/freelanceTools.js'
import { generalTools } from './tools/generalTools.js'
import { healthTools } from './tools/healthTools.js'
import { financeTools } from './tools/financeTools.js'
import { seoTools } from './tools/seoTools.js'
import { productivityTools } from './tools/productivityTools.js'
import { scrumTools } from './tools/scrumTools.js'
import { cssHtmlTools } from './tools/cssHtmlTools.js'
import { agileTools } from './tools/agileTools.js'
import { pmTools } from './tools/pmTools.js'
import { mathsScienceTools } from './tools/mathsScienceTools.js'

export const categories = [
  { id: 'dev', name: 'Dev Tools', icon: 'Code2', color: 'violet', description: 'Utilities for developers: formatters, encoders, generators.' },
  { id: 'student', name: 'Student', icon: 'GraduationCap', color: 'blue', description: 'Tools to help students study, track grades, and manage time.' },
  { id: 'freelance', name: 'Freelance', icon: 'Briefcase', color: 'amber', description: 'Rate calculators, cost estimators, and scheduling tools.' },
  { id: 'general', name: 'General', icon: 'Grid3x3', color: 'gray', description: 'Everyday utilities everyone can use.' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'green', description: 'Calculators for fitness, nutrition, and wellness.' },
  { id: 'finance', name: 'Finance', icon: 'TrendingUp', color: 'emerald', description: 'Personal finance calculators and planners.' },
  { id: 'seo', name: 'SEO Tools', icon: 'Search', color: 'rose', description: 'Search engine optimization tools for better rankings.' },
  { id: 'productivity', name: 'Productivity', icon: 'Zap', color: 'cyan', description: 'Tools to organize your work and get more done.' },
  { id: 'agile', name: 'Agile Tools', icon: 'Kanban', color: 'orange', description: 'Sprint planning, estimation, retrospectives, and agile team tools.' },
  { id: 'pm', name: 'Project Management', icon: 'FolderKanban', color: 'indigo', description: 'Planning, tracking, risk management, and reporting tools for projects.' },
  { id: 'css-html', name: 'CSS/HTML Tools', icon: 'Paintbrush', color: 'teal', description: 'CSS generators, HTML utilities, and visual design tools.' },
  { id: 'maths-science', name: 'Maths & Science Tools', icon: 'Atom', color: 'purple', description: 'Mathematics, physics, chemistry, biology, and general science calculators.' },
]

export const categoryColorMap = {
  dev:      { bg: 'bg-violet-100',  darkBg: 'dark:bg-violet-900/30',  text: 'text-violet-700',  darkText: 'dark:text-violet-300',  border: 'border-violet-200',  darkBorder: 'dark:border-violet-800',  icon: 'text-violet-500',  pill: 'bg-violet-500'  },
  student:  { bg: 'bg-blue-100',    darkBg: 'dark:bg-blue-900/30',    text: 'text-blue-700',    darkText: 'dark:text-blue-300',    border: 'border-blue-200',    darkBorder: 'dark:border-blue-800',    icon: 'text-blue-500',    pill: 'bg-blue-500'    },
  freelance:{ bg: 'bg-amber-100',   darkBg: 'dark:bg-amber-900/30',   text: 'text-amber-700',   darkText: 'dark:text-amber-300',   border: 'border-amber-200',   darkBorder: 'dark:border-amber-800',   icon: 'text-amber-500',   pill: 'bg-amber-500'   },
  general:  { bg: 'bg-gray-100',    darkBg: 'dark:bg-gray-700',       text: 'text-gray-700',    darkText: 'dark:text-gray-300',    border: 'border-gray-200',    darkBorder: 'dark:border-gray-600',    icon: 'text-gray-500',    pill: 'bg-gray-500'    },
  health:   { bg: 'bg-green-100',   darkBg: 'dark:bg-green-900/30',   text: 'text-green-700',   darkText: 'dark:text-green-300',   border: 'border-green-200',   darkBorder: 'dark:border-green-800',   icon: 'text-green-500',   pill: 'bg-green-500'   },
  finance:  { bg: 'bg-yellow-100',  darkBg: 'dark:bg-yellow-900/30',  text: 'text-yellow-700',  darkText: 'dark:text-yellow-300',  border: 'border-yellow-200',  darkBorder: 'dark:border-yellow-800',  icon: 'text-yellow-500',  pill: 'bg-yellow-500'  },
  seo:      { bg: 'bg-rose-100',    darkBg: 'dark:bg-rose-900/30',    text: 'text-rose-700',    darkText: 'dark:text-rose-300',    border: 'border-rose-200',    darkBorder: 'dark:border-rose-800',    icon: 'text-rose-500',    pill: 'bg-rose-500'    },
  productivity: { bg: 'bg-cyan-100', darkBg: 'dark:bg-cyan-900/30', text: 'text-cyan-700', darkText: 'dark:text-cyan-300', border: 'border-cyan-200', darkBorder: 'dark:border-cyan-800', icon: 'text-cyan-500', pill: 'bg-cyan-500' },
  agile: { bg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/30', text: 'text-orange-700', darkText: 'dark:text-orange-300', border: 'border-orange-200', darkBorder: 'dark:border-orange-800', icon: 'text-orange-500', pill: 'bg-orange-500' },
  pm: { bg: 'bg-indigo-100', darkBg: 'dark:bg-indigo-900/30', text: 'text-indigo-700', darkText: 'dark:text-indigo-300', border: 'border-indigo-200', darkBorder: 'dark:border-indigo-800', icon: 'text-indigo-500', pill: 'bg-indigo-500' },
  'css-html': { bg: 'bg-pink-100', darkBg: 'dark:bg-pink-900/30', text: 'text-pink-700', darkText: 'dark:text-pink-300', border: 'border-pink-200', darkBorder: 'dark:border-pink-800', icon: 'text-pink-500', pill: 'bg-pink-500' },
  'maths-science': { bg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/30', text: 'text-purple-700', darkText: 'dark:text-purple-300', border: 'border-purple-200', darkBorder: 'dark:border-purple-800', icon: 'text-purple-500', pill: 'bg-purple-500' },
}

const tools = [
  ...devTools,
  ...studentTools,
  ...freelanceTools,
  ...generalTools,
  ...healthTools,
  ...financeTools,
  ...seoTools,
  ...productivityTools,
  ...scrumTools,
  ...cssHtmlTools,
  ...agileTools,
  ...pmTools,
  ...mathsScienceTools,
]

export function getToolsByCategory(category) {
  return tools.filter(t => t.category === category)
}

export function getToolById(id) {
  return tools.find(t => t.id === id)
}

export const toolCount = tools.length

export default tools
