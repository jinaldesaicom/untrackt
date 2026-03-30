export default {
  id: 'kpi-metrics-tracker',
  title: 'KPI / Metrics Tracker',
  description: 'Define and track project KPIs — set targets, log actuals, and see trends to keep the project on course.',
  content: {
    whatIs: {
      heading: 'What is the KPI / Metrics Tracker?',
      body: 'The KPI / Metrics Tracker helps you define key performance indicators for your project, set targets, and log actual values over time. Track metrics like velocity, budget burn rate, defect count, customer satisfaction, or any custom metric. The tool shows trends and target vs. actual comparisons to keep the project on course.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'What gets measured gets managed. Without explicit KPIs, project decisions are based on gut feel. This tool provides objective data on project performance, helps identify problems early through trend analysis, and gives stakeholders confidence that the project is data-driven.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Define KPIs relevant to your project (e.g., velocity, budget utilization).',
        'Set target values for each KPI.',
        'Log actual values at regular intervals (weekly, monthly).',
        'Review trend charts to spot patterns.',
        'Compare actuals to targets and investigate deviations.',
        'Include KPI summaries in status reports.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Custom KPI definitions with name, unit, and target.',
        'Time-series data logging at configurable intervals.',
        'Target vs. actual comparison.',
        'Trend charts and sparklines.',
        'RAG status per metric (on target, off target).',
        'KPI dashboard summary view.',
        'Export data as CSV.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking sprint velocity and predictability.',
        'Monitoring budget burn rate against plan.',
        'Measuring defect rates over time.',
        'Tracking team utilization and capacity.',
        'Reporting customer satisfaction or NPS scores.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Sprint Velocity', description: 'Target: 40 points/sprint. Actuals: 38, 42, 35, 41. Trend: stable with one dip.' },
        { title: 'Budget Burn', description: 'Target: $25K/month. Actuals: $23K, $27K, $24K. Flag: Month 2 overspend investigated.' },
        { title: 'Defect Count', description: 'Target: <5/sprint. Actuals: 3, 4, 8, 2. Flag: Sprint 3 spike due to new module.' },
        { title: 'Customer Satisfaction', description: 'Target: 4.5/5.0. Actuals: 4.2, 4.4, 4.6, 4.5. Trend: improving.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'KPI (Key Performance Indicator)', definition: 'A measurable value that demonstrates how effectively a project is achieving key objectives.' },
        { term: 'Target', definition: 'The desired value or range for a KPI that defines success.' },
        { term: 'Actual', definition: 'The measured or observed value of a KPI for a given period.' },
        { term: 'Trend', definition: 'The direction and pattern of KPI values over time (improving, declining, stable).' },
        { term: 'Variance', definition: 'The difference between the target and actual value of a KPI.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many KPIs should I track?', answer: '5-8 per project. Tracking too many dilutes focus. Choose the metrics that most directly indicate project health.' },
        { question: 'How do I choose the right KPIs?', answer: 'Pick metrics that are measurable, actionable, and aligned with project goals. If you cannot act on a metric, it is not useful.' },
        { question: 'How often should I update KPIs?', answer: 'Match the frequency to your reporting cycle — weekly for sprints, monthly for longer projects.' },
        { question: 'What if a KPI is consistently off target?', answer: 'Investigate root causes, adjust the approach, or reassess if the target is realistic.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Choose KPIs that align directly with project objectives.',
        'Keep the number manageable (5-8 per project).',
        'Set realistic targets based on historical data when available.',
        'Review trends, not just single data points.',
        'Act on KPI data — metrics without action are wasted effort.',
        'Include KPI summaries in stakeholder status reports.'
      ]
    }
  },
  relatedTools: ['project-health-dashboard', 'project-status-report', 'milestone-tracker', 'workload-calculator'],
  seo: {
    metaTitle: 'KPI / Metrics Tracker — Project Performance Metrics | UnTrackt Wiki',
    metaDescription: 'Define, track, and trend project KPIs with targets and actuals. Monitor velocity, budget, defects, and custom metrics for data-driven decisions.',
    keywords: ['KPI tracker', 'project metrics', 'key performance indicators', 'metrics dashboard', 'project KPIs', 'performance tracking']
  }
};
