import { lazy } from 'react'

// Planning
const SprintPlanner = lazy(() => import('../../tools/agile/SprintPlanner.jsx'))
const SprintCapacityCalculator = lazy(() => import('../../tools/agile/SprintCapacityCalculator.jsx'))
const ReleasePlanningCalculator = lazy(() => import('../../tools/agile/ReleasePlanningCalculator.jsx'))
const VelocityCalculator = lazy(() => import('../../tools/agile/VelocityCalculator.jsx'))

// Estimation
const StoryPointEstimator = lazy(() => import('../../tools/agile/StoryPointEstimator.jsx'))
const PlanningPoker = lazy(() => import('../../tools/agile/PlanningPoker.jsx'))
const EstimationComparison = lazy(() => import('../../tools/agile/EstimationComparison.jsx'))

// Execution
const DailyStandupTemplate = lazy(() => import('../../tools/agile/DailyStandupTemplate.jsx'))
const CeremonyTimer = lazy(() => import('../../tools/agile/CeremonyTimer.jsx'))
const ImpedimentLog = lazy(() => import('../../tools/agile/ImpedimentLog.jsx'))
const BurndownChartGenerator = lazy(() => import('../../tools/agile/BurndownChartGenerator.jsx'))

// Backlog & Requirements
const UserStoryBuilder = lazy(() => import('../../tools/agile/UserStoryBuilder.jsx'))
const AcceptanceCriteriaGenerator = lazy(() => import('../../tools/agile/AcceptanceCriteriaGenerator.jsx'))
const EpicBreakdownAssistant = lazy(() => import('../../tools/agile/EpicBreakdownAssistant.jsx'))
const StoryMappingTool = lazy(() => import('../../tools/agile/StoryMappingTool.jsx'))

// Team Process
const RetrospectiveBoard = lazy(() => import('../../tools/agile/RetrospectiveBoard.jsx'))
const DefinitionOfDoneChecklist = lazy(() => import('../../tools/agile/DefinitionOfDoneChecklist.jsx'))
const DefinitionOfReadyChecklist = lazy(() => import('../../tools/agile/DefinitionOfReadyChecklist.jsx'))
const WorkingAgreementBuilder = lazy(() => import('../../tools/agile/WorkingAgreementBuilder.jsx'))

export const agileTools = [
  // Planning
  { id: 'sprint-planner', name: 'Sprint Planner', description: 'Plan sprints with goal setting, story assignment, and capacity tracking', category: 'agile', subcategory: 'planning', icon: 'CalendarRange', path: '/tools/sprint-planner', component: SprintPlanner, tags: ['sprint', 'planning', 'agile', 'scrum', 'backlog', 'goals'], isPopular: true, isNew: true },
  { id: 'sprint-capacity-calculator', name: 'Sprint Capacity Calculator', description: 'Calculate team capacity based on availability, holidays, and focus factor', category: 'agile', subcategory: 'planning', icon: 'Users', path: '/tools/sprint-capacity-calculator', component: SprintCapacityCalculator, tags: ['capacity', 'sprint', 'team', 'availability', 'agile', 'hours'], isPopular: true, isNew: true },
  { id: 'release-planning-calculator', name: 'Release Planning Calculator', description: 'Estimate release dates based on velocity and remaining story points', category: 'agile', subcategory: 'planning', icon: 'Rocket', path: '/tools/release-planning-calculator', component: ReleasePlanningCalculator, tags: ['release', 'planning', 'velocity', 'forecast', 'agile', 'timeline'], isPopular: false, isNew: true },
  { id: 'velocity-calculator', name: 'Velocity Calculator', description: 'Track and analyze team velocity across sprints with trend charts', category: 'agile', subcategory: 'planning', icon: 'TrendingUp', path: '/tools/velocity-calculator', component: VelocityCalculator, tags: ['velocity', 'sprints', 'metrics', 'agile', 'performance', 'chart'], isPopular: true, isNew: true },

  // Estimation
  { id: 'story-point-estimator', name: 'Story Point Estimator', description: 'Estimate story points using complexity, effort, and uncertainty factors', category: 'agile', subcategory: 'estimation', icon: 'Hash', path: '/tools/story-point-estimator', component: StoryPointEstimator, tags: ['story points', 'estimation', 'agile', 'complexity', 'effort', 'sizing'], isPopular: true, isNew: true },
  { id: 'planning-poker', name: 'Planning Poker', description: 'Run planning poker sessions with customizable card decks', category: 'agile', subcategory: 'estimation', icon: 'Layers', path: '/tools/planning-poker', component: PlanningPoker, tags: ['planning poker', 'estimation', 'fibonacci', 'team', 'voting', 'agile'], isPopular: true, isNew: true },
  { id: 'estimation-comparison', name: 'Estimation Comparison Tool', description: 'Compare story point estimates vs actual effort to improve accuracy', category: 'agile', subcategory: 'estimation', icon: 'BarChart3', path: '/tools/estimation-comparison', component: EstimationComparison, tags: ['estimation', 'comparison', 'accuracy', 'points', 'actual', 'agile'], isPopular: false, isNew: true },

  // Execution
  { id: 'daily-standup-template', name: 'Daily Standup Template', description: 'Structured template for daily standups with yesterday/today/blockers format', category: 'agile', subcategory: 'execution', icon: 'MessageSquare', path: '/tools/daily-standup-template', component: DailyStandupTemplate, tags: ['standup', 'daily', 'scrum', 'meeting', 'status', 'agile'], isPopular: true, isNew: true },
  { id: 'ceremony-timer', name: 'Ceremony Timer', description: 'Timebox agile ceremonies with presets for standup, retro, review, and more', category: 'agile', subcategory: 'execution', icon: 'Timer', path: '/tools/ceremony-timer', component: CeremonyTimer, tags: ['timer', 'ceremony', 'timebox', 'standup', 'retro', 'agile'], isPopular: false, isNew: true },
  { id: 'impediment-log', name: 'Impediment Log', description: 'Track and manage team impediments with priority and resolution status', category: 'agile', subcategory: 'execution', icon: 'AlertTriangle', path: '/tools/impediment-log', component: ImpedimentLog, tags: ['impediment', 'blocker', 'issue', 'tracking', 'resolution', 'agile'], isPopular: false, isNew: true },
  { id: 'burndown-chart-generator', name: 'Burndown Chart Generator', description: 'Generate sprint burndown charts from daily remaining effort data', category: 'agile', subcategory: 'execution', icon: 'LineChart', path: '/tools/burndown-chart-generator', component: BurndownChartGenerator, tags: ['burndown', 'chart', 'sprint', 'progress', 'tracking', 'agile'], isPopular: true, isNew: true },

  // Backlog & Requirements
  { id: 'user-story-builder', name: 'User Story Builder', description: 'Build user stories with the As a/I want/So that format and acceptance criteria', category: 'agile', subcategory: 'backlog', icon: 'FileText', path: '/tools/user-story-builder', component: UserStoryBuilder, tags: ['user story', 'requirements', 'agile', 'backlog', 'acceptance criteria'], isPopular: true, isNew: true },
  { id: 'acceptance-criteria-generator', name: 'Acceptance Criteria Generator', description: 'Generate Given/When/Then acceptance criteria for user stories', category: 'agile', subcategory: 'backlog', icon: 'CheckCircle', path: '/tools/acceptance-criteria-generator', component: AcceptanceCriteriaGenerator, tags: ['acceptance criteria', 'gherkin', 'given when then', 'bdd', 'agile'], isPopular: false, isNew: true },
  { id: 'epic-breakdown-assistant', name: 'Epic Breakdown Assistant', description: 'Break down epics into manageable user stories with effort estimates', category: 'agile', subcategory: 'backlog', icon: 'GitBranch', path: '/tools/epic-breakdown-assistant', component: EpicBreakdownAssistant, tags: ['epic', 'breakdown', 'stories', 'decomposition', 'agile', 'backlog'], isPopular: false, isNew: true },
  { id: 'story-mapping-tool', name: 'Story Mapping Tool', description: 'Create user story maps to visualize product features and release slicing', category: 'agile', subcategory: 'backlog', icon: 'Map', path: '/tools/story-mapping-tool', component: StoryMappingTool, tags: ['story map', 'mapping', 'releases', 'features', 'agile', 'product'], isPopular: false, isNew: true },

  // Team Process
  { id: 'retrospective-board', name: 'Retrospective Board', description: 'Run sprint retrospectives with customizable column formats', category: 'agile', subcategory: 'process', icon: 'MessagesSquare', path: '/tools/retrospective-board', component: RetrospectiveBoard, tags: ['retrospective', 'retro', 'feedback', 'team', 'improvement', 'agile'], isPopular: true, isNew: true },
  { id: 'definition-of-done-checklist', name: 'Definition of Done Checklist', description: 'Create and manage your team\'s Definition of Done criteria', category: 'agile', subcategory: 'process', icon: 'ClipboardCheck', path: '/tools/definition-of-done-checklist', component: DefinitionOfDoneChecklist, tags: ['definition of done', 'dod', 'checklist', 'quality', 'agile', 'standards'], isPopular: false, isNew: true },
  { id: 'definition-of-ready-checklist', name: 'Definition of Ready Checklist', description: 'Ensure stories are ready for sprint with a Definition of Ready checklist', category: 'agile', subcategory: 'process', icon: 'ClipboardList', path: '/tools/definition-of-ready-checklist', component: DefinitionOfReadyChecklist, tags: ['definition of ready', 'dor', 'checklist', 'refinement', 'agile', 'ready'], isPopular: false, isNew: true },
  { id: 'working-agreement-builder', name: 'Working Agreement Builder', description: 'Build team working agreements with collaborative rule definition', category: 'agile', subcategory: 'process', icon: 'Handshake', path: '/tools/working-agreement-builder', component: WorkingAgreementBuilder, tags: ['working agreement', 'team norms', 'rules', 'collaboration', 'agile', 'contract'], isPopular: false, isNew: true },
]
