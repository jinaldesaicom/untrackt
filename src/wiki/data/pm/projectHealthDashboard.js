export default {
  id: 'project-health-dashboard',
  title: 'Project Health Dashboard',
  description: 'See project health at a glance — RAG indicators for scope, schedule, budget, risks, and team morale.',
  content: {
    whatIs: {
      heading: 'What is the Project Health Dashboard?',
      body: 'The Project Health Dashboard provides a single-page overview of project health across multiple dimensions: scope, schedule, budget, quality, risk, and team morale. Each dimension has a RAG (Red/Amber/Green) indicator with supporting data. It gives stakeholders and the team an instant read on the project\'s overall condition.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Project managers need a fast way to assess and communicate overall project health. Checking multiple tools and reports is slow. This dashboard consolidates the key health indicators in one view, making it easy to spot problems and communicate status in seconds rather than minutes.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set RAG status for each health dimension (scope, schedule, budget, etc.).',
        'Add supporting notes explaining each status.',
        'Include key metrics that support the assessment.',
        'Update the dashboard at regular intervals (weekly).',
        'Share the dashboard in status meetings and reports.',
        'Drill into problem areas for detailed investigation.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Multi-dimension RAG indicators (scope, schedule, budget, quality, risk, team).',
        'Supporting notes per dimension.',
        'Overall project health summary.',
        'Key metrics integration.',
        'Trend indicators (improving, stable, declining).',
        'Export as image or PDF for presentations.',
        'Browser-based — no setup required.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Weekly project health check-ins.',
        'Executive dashboard for project portfolio reviews.',
        'Sprint health assessment for agile teams.',
        'Client-facing project health visualization.',
        'PMO portfolio dashboards across multiple projects.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Healthy Project', description: 'All green: scope stable, on schedule, under budget, low risk, team morale high.' },
        { title: 'Schedule Risk', description: 'Schedule: Amber (2 days behind due to dependency delay). All other dimensions green.' },
        { title: 'Budget Overrun', description: 'Budget: Red (15% over due to scope changes). Scope: Amber (3 changes approved). Others: Green.' },
        { title: 'Team Concern', description: 'Team: Amber (2 members pulled to other projects, reducing capacity by 25%).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'RAG Status', definition: 'Red (critical issues), Amber (at risk), Green (on track) — a traffic light system for quick assessment.' },
        { term: 'Health Dimension', definition: 'A specific area of project health being assessed (e.g., scope, schedule, budget, quality, risk, team).' },
        { term: 'Trend Indicator', definition: 'An arrow or symbol showing whether a health dimension is improving, stable, or declining over time.' },
        { term: 'Dashboard', definition: 'A visual display of the most important information needed to achieve objectives, consolidated on a single screen.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many dimensions should I track?', answer: '5-7 dimensions is typical. Common ones: scope, schedule, budget, quality, risk, team, and stakeholder satisfaction.' },
        { question: 'Who sets the RAG status?', answer: 'The project manager sets the status based on objective criteria. Establish clear thresholds for each color beforehand.' },
        { question: 'Can I track multiple projects?', answer: 'Yes. Create a portfolio view showing health dashboards for all projects side by side.' },
        { question: 'How often should I update the dashboard?', answer: 'Weekly is standard. Update immediately when a major status change occurs.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Define clear criteria for Red, Amber, and Green before the project starts.',
        'Be honest about status — the dashboard is only useful if it reflects reality.',
        'Include trend indicators to show direction, not just current state.',
        'Use the dashboard as a conversation starter in status meetings.',
        'Combine with the KPI tracker for data-backed health assessments.',
        'Update immediately when significant events occur — do not wait for the weekly cadence.'
      ]
    }
  },
  relatedTools: ['project-status-report', 'kpi-metrics-tracker', 'milestone-tracker', 'risk-assessment-matrix'],
  seo: {
    metaTitle: 'Project Health Dashboard — Multi-Dimension RAG Status | UnTrackt Wiki',
    metaDescription: 'View project health at a glance with RAG indicators for scope, schedule, budget, quality, risk, and team. Single-page project health overview.',
    keywords: ['project health dashboard', 'project dashboard', 'RAG status', 'project health', 'project overview', 'health indicators']
  }
};
