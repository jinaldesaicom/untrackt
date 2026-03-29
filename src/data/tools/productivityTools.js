import { lazy } from 'react'

const TodoList = lazy(() => import('../../tools/productivity/TodoList.jsx'))
const Notepad = lazy(() => import('../../tools/productivity/Notepad.jsx'))
const StickyNotes = lazy(() => import('../../tools/productivity/StickyNotes.jsx'))
const KanbanBoard = lazy(() => import('../../tools/productivity/KanbanBoard.jsx'))
const DailyPlanner = lazy(() => import('../../tools/productivity/DailyPlanner.jsx'))
const EisenhowerMatrix = lazy(() => import('../../tools/productivity/EisenhowerMatrix.jsx'))
const DecisionMatrix = lazy(() => import('../../tools/productivity/DecisionMatrix.jsx'))
const SMARTGoalSetter = lazy(() => import('../../tools/productivity/SMARTGoalSetter.jsx'))
const WeeklyReviewTemplate = lazy(() => import('../../tools/productivity/WeeklyReviewTemplate.jsx'))
const MeetingAgendaBuilder = lazy(() => import('../../tools/productivity/MeetingAgendaBuilder.jsx'))
const MeetingMinutes = lazy(() => import('../../tools/productivity/MeetingMinutes.jsx'))
const OKRPlanner = lazy(() => import('../../tools/productivity/OKRPlanner.jsx'))
const FocusSessionLogger = lazy(() => import('../../tools/productivity/FocusSessionLogger.jsx'))
const BrainDumpCapture = lazy(() => import('../../tools/productivity/BrainDumpCapture.jsx'))
const ProjectScopeDefiner = lazy(() => import('../../tools/productivity/ProjectScopeDefiner.jsx'))
const EnergyLevelPlanner = lazy(() => import('../../tools/productivity/EnergyLevelPlanner.jsx'))
const TwoMinuteTaskFilter = lazy(() => import('../../tools/productivity/TwoMinuteTaskFilter.jsx'))
const DailyJournal = lazy(() => import('../../tools/productivity/DailyJournal.jsx'))

export const productivityTools = [
  { id: 'todo-list', name: 'Todo List', description: 'Simple, private todo list that saves in your browser', category: 'productivity', subcategory: 'tasks', icon: 'CheckSquare', path: '/tools/todo-list', component: TodoList, tags: ['todo', 'tasks', 'list', 'productivity', 'organize'], isPopular: false, isNew: false },
  { id: 'notepad', name: 'Notepad', description: 'Distraction-free writing tool with auto-save and markdown preview', category: 'productivity', subcategory: 'writing', icon: 'FileText', path: '/tools/notepad', component: Notepad, tags: ['notepad', 'notes', 'writing', 'markdown', 'text editor'], isPopular: false, isNew: false },
  { id: 'sticky-notes', name: 'Sticky Notes', description: 'Visual sticky note board with colors and pinning', category: 'productivity', subcategory: 'writing', icon: 'StickyNote', path: '/tools/sticky-notes', component: StickyNotes, tags: ['sticky notes', 'notes', 'board', 'organize', 'ideas'], isPopular: false, isNew: false },
  { id: 'kanban-board', name: 'Kanban Board', description: 'Visual task management board with drag-and-drop columns', category: 'productivity', subcategory: 'tasks', icon: 'LayoutGrid', path: '/tools/kanban-board', component: KanbanBoard, tags: ['kanban', 'board', 'tasks', 'project', 'agile', 'drag'], isPopular: false, isNew: false },
  { id: 'daily-planner', name: 'Daily Planner', description: 'Time-blocked day planning with priorities and notes', category: 'productivity', subcategory: 'planning', icon: 'Calendar', path: '/tools/daily-planner', component: DailyPlanner, tags: ['daily planner', 'schedule', 'time blocking', 'calendar', 'day'], isPopular: false, isNew: false },
  { id: 'eisenhower-matrix', name: 'Eisenhower Matrix', description: 'Prioritize tasks with the Urgent/Important framework', category: 'productivity', subcategory: 'tasks', icon: 'Grid3x3', path: '/tools/eisenhower-matrix', component: EisenhowerMatrix, tags: ['eisenhower', 'matrix', 'priority', 'urgent', 'important', 'quadrant'], isPopular: false, isNew: false },
  { id: 'decision-matrix', name: 'Decision Matrix', description: 'Make objective decisions with weighted criteria scoring', category: 'productivity', subcategory: 'planning', icon: 'Calculator', path: '/tools/decision-matrix', component: DecisionMatrix, tags: ['decision', 'matrix', 'scoring', 'criteria', 'compare', 'weighted'], isPopular: false, isNew: false },
  { id: 'smart-goal-setter', name: 'SMART Goal Setter', description: 'Set structured SMART goals with milestones and tracking', category: 'productivity', subcategory: 'goals', icon: 'Target', path: '/tools/smart-goal-setter', component: SMARTGoalSetter, tags: ['smart', 'goals', 'milestones', 'planning', 'tracking', 'objectives'], isPopular: false, isNew: false },
  { id: 'weekly-review-template', name: 'Weekly Review Template', description: 'Structured weekly review with reflection and planning', category: 'productivity', subcategory: 'planning', icon: 'Clipboard', path: '/tools/weekly-review-template', component: WeeklyReviewTemplate, tags: ['weekly review', 'reflection', 'planning', 'retrospective', 'journal'], isPopular: false, isNew: false },
  { id: 'meeting-agenda-builder', name: 'Meeting Agenda Builder', description: 'Build structured meeting agendas with time tracking', category: 'productivity', subcategory: 'planning', icon: 'ListChecks', path: '/tools/meeting-agenda-builder', component: MeetingAgendaBuilder, tags: ['meeting', 'agenda', 'schedule', 'facilitation', 'notes'], isPopular: false, isNew: false },
  { id: 'meeting-minutes', name: 'Meeting Minutes', description: 'Record meeting outcomes, decisions, and action items with status tracking', category: 'productivity', subcategory: 'planning', icon: 'Clipboard', path: '/tools/meeting-minutes', component: MeetingMinutes, tags: ['meeting', 'minutes', 'mom', 'actions', 'decisions', 'notes', 'record'], isPopular: false, isNew: true },
  { id: 'okr-planner', name: 'OKR Planner', description: 'Plan Objectives and Key Results with progress tracking', category: 'productivity', subcategory: 'goals', icon: 'Target', path: '/tools/okr-planner', component: OKRPlanner, tags: ['okr', 'objectives', 'key results', 'goals', 'tracking', 'quarterly'], isPopular: false, isNew: false },
  { id: 'focus-session-logger', name: 'Focus Session Logger', description: 'Log focused work sessions with energy and quality ratings', category: 'productivity', subcategory: 'focus', icon: 'Focus', path: '/tools/focus-session-logger', component: FocusSessionLogger, tags: ['focus', 'session', 'log', 'productivity', 'time', 'tracking'], isPopular: false, isNew: false },
  { id: 'brain-dump-capture', name: 'Brain Dump Capture', description: 'Rapid idea capture with organize-later philosophy', category: 'productivity', subcategory: 'writing', icon: 'Brain', path: '/tools/brain-dump-capture', component: BrainDumpCapture, tags: ['brain dump', 'ideas', 'capture', 'brainstorm', 'organize'], isPopular: false, isNew: false },
  { id: 'project-scope-definer', name: 'Project Scope Definer', description: 'Define project scope with in/out boundaries and MoSCoW priorities', category: 'productivity', subcategory: 'planning', icon: 'Briefcase', path: '/tools/project-scope-definer', component: ProjectScopeDefiner, tags: ['project', 'scope', 'moscow', 'planning', 'boundaries', 'requirements'], isPopular: false, isNew: false },
  { id: 'energy-level-planner', name: 'Energy Level Planner', description: 'Match tasks to your natural energy rhythm throughout the day', category: 'productivity', subcategory: 'focus', icon: 'Zap', path: '/tools/energy-level-planner', component: EnergyLevelPlanner, tags: ['energy', 'planner', 'rhythm', 'productivity', 'schedule', 'tasks'], isPopular: false, isNew: false },
  { id: 'two-minute-task-filter', name: 'Two-Minute Task Filter', description: 'Sort tasks by the GTD two-minute rule for quick wins', category: 'productivity', subcategory: 'tasks', icon: 'Timer', path: '/tools/two-minute-task-filter', component: TwoMinuteTaskFilter, tags: ['two minute', 'gtd', 'quick wins', 'filter', 'tasks', 'productivity'], isPopular: false, isNew: false },
  { id: 'daily-journal', name: 'Daily Journal', description: 'Private freeform journal with tags, search, and writing streaks', category: 'productivity', subcategory: 'writing', icon: 'BookOpen', path: '/tools/daily-journal', component: DailyJournal, tags: ['journal', 'diary', 'writing', 'daily', 'reflection', 'tags', 'search'], isPopular: false, isNew: true },
]
