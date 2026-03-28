import { lazy } from 'react'

// Planning & Scheduling
const TaskBreakdownWBS = lazy(() => import('../../tools/pm/TaskBreakdownWBS.jsx'))
const GanttChartGenerator = lazy(() => import('../../tools/pm/GanttChartGenerator.jsx'))
const ProjectTimelinePlanner = lazy(() => import('../../tools/pm/ProjectTimelinePlanner.jsx'))
const MilestoneTracker = lazy(() => import('../../tools/pm/MilestoneTracker.jsx'))
const TimeBlockingPlanner = lazy(() => import('../../tools/pm/TimeBlockingPlanner.jsx'))

// Resources & Estimation
const ResourceAllocationPlanner = lazy(() => import('../../tools/pm/ResourceAllocationPlanner.jsx'))
const EffortEstimationCalculator = lazy(() => import('../../tools/pm/EffortEstimationCalculator.jsx'))
const CostEstimator = lazy(() => import('../../tools/pm/CostEstimator.jsx'))
const WorkloadCalculator = lazy(() => import('../../tools/pm/WorkloadCalculator.jsx'))

// Risk & Governance
const RaidLog = lazy(() => import('../../tools/pm/RaidLog.jsx'))
const RiskAssessmentMatrix = lazy(() => import('../../tools/pm/RiskAssessmentMatrix.jsx'))
const DependencyTracker = lazy(() => import('../../tools/pm/DependencyTracker.jsx'))
const ScopeChangeLog = lazy(() => import('../../tools/pm/ScopeChangeLog.jsx'))

// Tracking & Reporting
const ActionItemTracker = lazy(() => import('../../tools/pm/ActionItemTracker.jsx'))
const ProjectStatusReport = lazy(() => import('../../tools/pm/ProjectStatusReport.jsx'))
const KpiMetricsTracker = lazy(() => import('../../tools/pm/KpiMetricsTracker.jsx'))
const ProjectHealthDashboard = lazy(() => import('../../tools/pm/ProjectHealthDashboard.jsx'))
const ChecklistBuilder = lazy(() => import('../../tools/pm/ChecklistBuilder.jsx'))

export const pmTools = [
  // Planning & Scheduling
  { id: 'task-breakdown-wbs', name: 'Task Breakdown (WBS) Tool', description: 'Build hierarchical work breakdown structures with add/edit/delete nodes and JSON/CSV export', category: 'pm', subcategory: 'planning', icon: 'Network', path: '/tools/task-breakdown-wbs', component: TaskBreakdownWBS, tags: ['wbs', 'work breakdown', 'task tree', 'project planning', 'hierarchy', 'structure'], isPopular: true, isNew: true },
  { id: 'gantt-chart-generator', name: 'Simple Gantt Chart Generator', description: 'Create Gantt charts with tasks, dates, dependency links, and SVG export', category: 'pm', subcategory: 'planning', icon: 'GanttChart', path: '/tools/gantt-chart-generator', component: GanttChartGenerator, tags: ['gantt chart', 'project schedule', 'timeline', 'dependencies', 'svg', 'planning'], isPopular: true, isNew: true },
  { id: 'project-timeline-planner', name: 'Project Timeline Planner', description: 'Plan project timelines with milestones, phases, and a visual timeline view', category: 'pm', subcategory: 'planning', icon: 'CalendarRange', path: '/tools/project-timeline-planner', component: ProjectTimelinePlanner, tags: ['timeline', 'milestones', 'phases', 'project plan', 'schedule', 'visual'], isPopular: true, isNew: true },
  { id: 'milestone-tracker', name: 'Milestone Tracker', description: 'Define project milestones, track pending/done status, and view progress summary', category: 'pm', subcategory: 'planning', icon: 'Flag', path: '/tools/milestone-tracker', component: MilestoneTracker, tags: ['milestones', 'tracker', 'progress', 'status', 'project', 'deadlines'], isPopular: false, isNew: true },
  { id: 'time-blocking-planner', name: 'Time Blocking Planner', description: 'Plan day and week time slots with task assignment and schedule export', category: 'pm', subcategory: 'planning', icon: 'Clock', path: '/tools/time-blocking-planner', component: TimeBlockingPlanner, tags: ['time blocking', 'schedule', 'planner', 'day plan', 'week plan', 'calendar'], isPopular: false, isNew: true },

  // Resources & Estimation
  { id: 'resource-allocation-planner', name: 'Resource Allocation Planner', description: 'Assign people to tasks with percentage allocation and over-allocation warnings', category: 'pm', subcategory: 'resources', icon: 'Users', path: '/tools/resource-allocation-planner', component: ResourceAllocationPlanner, tags: ['resource allocation', 'team', 'capacity', 'assignment', 'workload', 'planning'], isPopular: true, isNew: true },
  { id: 'effort-estimation-calculator', name: 'Effort Estimation Calculator', description: 'Estimate task effort hours with total roll-up and buffer adjustment', category: 'pm', subcategory: 'resources', icon: 'Calculator', path: '/tools/effort-estimation-calculator', component: EffortEstimationCalculator, tags: ['effort', 'estimation', 'hours', 'buffer', 'project cost', 'task hours'], isPopular: false, isNew: true },
  { id: 'cost-estimator', name: 'Cost Estimator', description: 'Estimate project cost with hourly rates, fixed costs, and variable costs', category: 'pm', subcategory: 'resources', icon: 'DollarSign', path: '/tools/cost-estimator', component: CostEstimator, tags: ['cost', 'budget', 'estimate', 'hourly rate', 'project cost', 'expenses'], isPopular: false, isNew: true },
  { id: 'workload-calculator', name: 'Workload Calculator', description: 'View tasks per person with total assigned hours and load balancing insights', category: 'pm', subcategory: 'resources', icon: 'Scale', path: '/tools/workload-calculator', component: WorkloadCalculator, tags: ['workload', 'balance', 'tasks', 'hours', 'team', 'capacity'], isPopular: false, isNew: true },

  // Risk & Governance
  { id: 'raid-log', name: 'RAID Log Tool', description: 'Track Risks, Assumptions, Issues, and Dependencies with priority, owner, and export', category: 'pm', subcategory: 'risk', icon: 'ShieldAlert', path: '/tools/raid-log', component: RaidLog, tags: ['raid', 'risks', 'assumptions', 'issues', 'dependencies', 'governance'], isPopular: true, isNew: true },
  { id: 'risk-assessment-matrix', name: 'Risk Assessment Matrix', description: 'Assess risks on a likelihood × impact grid with auto scoring and a visual heatmap', category: 'pm', subcategory: 'risk', icon: 'Grid3x3', path: '/tools/risk-assessment-matrix', component: RiskAssessmentMatrix, tags: ['risk matrix', 'likelihood', 'impact', 'heatmap', 'scoring', 'assessment'], isPopular: true, isNew: true },
  { id: 'dependency-tracker', name: 'Dependency Tracker', description: 'Map task dependencies with blocked/unblocked status and a simple graph view', category: 'pm', subcategory: 'risk', icon: 'GitBranch', path: '/tools/dependency-tracker', component: DependencyTracker, tags: ['dependencies', 'blocked', 'unblocked', 'graph', 'tasks', 'tracking'], isPopular: false, isNew: true },
  { id: 'scope-change-log', name: 'Scope Change Log', description: 'Log change requests with impact assessment, decision status, and approval tracking', category: 'pm', subcategory: 'risk', icon: 'FileEdit', path: '/tools/scope-change-log', component: ScopeChangeLog, tags: ['scope', 'change request', 'impact', 'approval', 'governance', 'log'], isPopular: false, isNew: true },

  // Tracking & Reporting
  { id: 'action-item-tracker', name: 'Action Item Tracker', description: 'Track action items with owner, due date, status, and filtering', category: 'pm', subcategory: 'tracking', icon: 'ListChecks', path: '/tools/action-item-tracker', component: ActionItemTracker, tags: ['action items', 'tasks', 'owner', 'due date', 'status', 'tracking'], isPopular: true, isNew: true },
  { id: 'project-status-report', name: 'Project Status Report Generator', description: 'Generate RAG status reports with key updates, risks, and exportable summaries', category: 'pm', subcategory: 'tracking', icon: 'FileBarChart', path: '/tools/project-status-report', component: ProjectStatusReport, tags: ['status report', 'rag', 'red amber green', 'project update', 'summary', 'export'], isPopular: true, isNew: true },
  { id: 'kpi-metrics-tracker', name: 'KPI / Metrics Tracker', description: 'Define KPIs, input values manually, and view basic trend charts', category: 'pm', subcategory: 'tracking', icon: 'BarChart3', path: '/tools/kpi-metrics-tracker', component: KpiMetricsTracker, tags: ['kpi', 'metrics', 'trend', 'chart', 'performance', 'tracking'], isPopular: false, isNew: true },
  { id: 'project-health-dashboard', name: 'Project Health Dashboard', description: 'Input scope, cost, time, and risk scores to get an auto-calculated health summary', category: 'pm', subcategory: 'tracking', icon: 'Activity', path: '/tools/project-health-dashboard', component: ProjectHealthDashboard, tags: ['project health', 'dashboard', 'score', 'summary', 'scope', 'cost', 'risk'], isPopular: true, isNew: true },
  { id: 'checklist-builder', name: 'Checklist Builder', description: 'Build custom checklists with progress tracking and reusable templates', category: 'pm', subcategory: 'tracking', icon: 'ClipboardCheck', path: '/tools/checklist-builder', component: ChecklistBuilder, tags: ['checklist', 'tasks', 'progress', 'templates', 'reusable', 'tracking'], isPopular: false, isNew: true },
]
