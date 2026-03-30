export default {
  id: 'workload-calculator',
  title: 'Workload Calculator',
  description: 'Calculate individual and team workloads — enter tasks, durations, and capacity to see if workloads are balanced.',
  content: {
    whatIs: {
      heading: 'What is the Workload Calculator?',
      body: 'The Workload Calculator compares assigned work against available capacity for individuals and teams. Enter each person\'s available hours, then add their assigned tasks with estimated durations. The calculator shows total assigned hours, utilization percentage, and whether anyone is overloaded or underutilized.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Unbalanced workloads cause burnout, missed deadlines, and low morale. This tool makes workload distribution visible and quantitative, helping managers redistribute tasks before problems occur rather than reacting after the fact.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add team members with their available hours per week.',
        'Assign tasks to each team member with estimated hours.',
        'View the utilization dashboard showing each person\'s load.',
        'Identify overloaded (red) and underutilized (yellow) members.',
        'Reassign tasks to balance workloads.',
        'Export the workload summary.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Per-person capacity and assigned hours.',
        'Utilization percentage per individual.',
        'Team-wide workload summary.',
        'Color-coded status (underloaded, balanced, overloaded).',
        'Task list per person with hours.',
        'Weekly and monthly views.',
        'Client-side data processing.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Sprint planning — checking if the sprint is feasible given team capacity.',
        'Balancing work across a remote team.',
        'Identifying who has bandwidth for new requests.',
        'Justifying additional headcount with workload data.',
        'Ensuring equitable task distribution across team members.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Sprint Check', description: '5 developers, 40 hrs/week each = 200 hrs capacity. Sprint backlog: 230 hrs → 115% utilization (overloaded).' },
        { title: 'Individual Balance', description: 'Alice: 45 hrs assigned / 40 hrs available = 112% (overloaded). Bob: 25 hrs / 40 hrs = 63% (room for more).' },
        { title: 'Agency Team', description: '8 designers across 6 client projects — workload grid shows 2 designers under 50% utilization.' },
        { title: 'Quarterly View', description: 'Monthly workload projections showing the team at 95% in March (too tight) and 60% in April (capacity available).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Workload', definition: 'The total amount of work assigned to a person or team in a given time period.' },
        { term: 'Capacity', definition: 'The total available hours a person can work, after accounting for meetings, admin, and time off.' },
        { term: 'Utilization', definition: 'The ratio of assigned work to available capacity, expressed as a percentage.' },
        { term: 'Overloaded', definition: 'When assigned work exceeds available capacity (>100% utilization).' },
        { term: 'Bandwidth', definition: 'The remaining capacity available after current assignments are accounted for.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What utilization percentage is healthy?', answer: '70-85% is healthy. Below 70% may indicate underutilization. Above 85% leaves no room for unplanned work.' },
        { question: 'Should I account for non-project time?', answer: 'Yes. Reduce available capacity by time spent in meetings, admin, and other non-project activities.' },
        { question: 'How do I handle shared resources?', answer: 'Enter partial allocations. If someone splits time 50/50 between two teams, set their capacity at 50% for each team.' },
        { question: 'What if estimates are wrong?', answer: 'Track actuals and compare to estimates. Over time, calibrate your estimation to improve workload accuracy.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Account for meetings, admin, and overhead when calculating available capacity.',
        'Target 80% utilization to leave room for unplanned work.',
        'Check workloads weekly and rebalance proactively.',
        'Use historical data to improve task hour estimates.',
        'Involve team members in reviewing their own workload.',
        'Document and communicate workload when declining or deferring requests.'
      ]
    }
  },
  relatedTools: ['resource-allocation-planner', 'effort-estimation-calculator', 'time-blocking-planner', 'project-health-dashboard'],
  seo: {
    metaTitle: 'Workload Calculator — Balance Team Workloads | UnTrackt Wiki',
    metaDescription: 'Calculate individual and team workloads by comparing assigned tasks against available capacity. Spot overloads and balance work distribution.',
    keywords: ['workload calculator', 'team workload', 'capacity planning', 'utilization calculator', 'workload balance', 'team capacity']
  }
};
