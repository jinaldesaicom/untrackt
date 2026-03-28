export default {
  id: 'resource-allocation-planner',
  title: 'Resource Allocation Planner',
  description: 'Assign team members to projects and tasks — see allocation percentages, spot overloads, and balance workloads.',
  content: {
    whatIs: {
      heading: 'What is the Resource Allocation Planner?',
      body: 'The Resource Allocation Planner helps you assign team members to projects and tasks while tracking their utilization. Enter team members with their available capacity, assign them to projects at specific percentages, and instantly see who is overloaded, underutilized, or balanced. It prevents burnout by making workload distribution visible.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Resource conflicts are the number one cause of schedule delays. When people are assigned to more work than they can handle, everything slows down. This tool makes allocation visible so you can balance workloads before problems arise.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add team members with their available hours/capacity.',
        'Add projects or tasks requiring resources.',
        'Assign team members to projects with allocation percentages.',
        'View the allocation grid showing each person\'s total utilization.',
        'Identify overloaded (>100%) and underutilized resources.',
        'Adjust allocations to balance the workload.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Team member roster with capacity hours.',
        'Project/task list with required effort.',
        'Allocation matrix (person × project).',
        'Utilization percentages with overload warnings.',
        'Color-coded allocation bars (green, yellow, red).',
        'Time-period view (weekly, monthly).',
        'Export allocation plan as CSV.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Planning team assignments for the next sprint or quarter.',
        'Balancing workloads across multiple simultaneous projects.',
        'Identifying resource gaps for hiring decisions.',
        'Preparing resource plans for project proposals.',
        'Tracking utilization for professional services teams.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Dev Team Allocation', description: '5 developers across 3 projects — allocation grid shows one developer at 120% (needs rebalancing).' },
        { title: 'Agency Resource Plan', description: '10 team members across 8 client projects with weekly allocation percentages.' },
        { title: 'Quarterly Planning', description: 'Allocation plan across Q1 showing ramp-up on new project and ramp-down on ending project.' },
        { title: 'Hiring Gap Analysis', description: 'Total required capacity exceeds available capacity by 2 FTE — justifying a hiring request.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Resource Allocation', definition: 'The process of assigning available resources (people, budget, equipment) to tasks and projects.' },
        { term: 'Utilization', definition: 'The percentage of available capacity that is assigned to productive work.' },
        { term: 'Overallocation', definition: 'When a person is assigned to more work than their available capacity (>100%).' },
        { term: 'FTE (Full-Time Equivalent)', definition: 'A unit representing one person working full time. 0.5 FTE = half-time allocation.' },
        { term: 'Capacity', definition: 'The total available work hours for a person in a given time period.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a healthy utilization target?', answer: '80% is a common target. The remaining 20% accounts for meetings, admin, unplanned work, and personal time.' },
        { question: 'How do I handle part-time team members?', answer: 'Set their capacity to their actual available hours (e.g., 20 hrs/week instead of 40).' },
        { question: 'What if someone is assigned to too many projects?', answer: 'Context switching becomes costly above 2-3 projects. Try to keep individuals focused on fewer, larger allocations.' },
        { question: 'Should I include non-project time?', answer: 'Yes. Account for meetings, admin, and overhead to avoid overallocating productive hours.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Target 80% utilization — leave room for unplanned work and overhead.',
        'Limit individuals to 2-3 projects to reduce context switching.',
        'Review allocations weekly and adjust as priorities change.',
        'Include vacation and PTO in capacity calculations.',
        'Communicate allocation changes to affected team members promptly.',
        'Use allocation data to make evidence-based hiring and staffing decisions.'
      ]
    }
  },
  relatedTools: ['workload-calculator', 'effort-estimation-calculator', 'cost-estimator', 'project-health-dashboard'],
  seo: {
    metaTitle: 'Resource Allocation Planner — Balance Team Workloads | UnTrackt Wiki',
    metaDescription: 'Assign team members to projects, track utilization, and spot overloads. Balance workloads with visual allocation grids and capacity planning.',
    keywords: ['resource allocation', 'team planning', 'workload balance', 'resource management', 'capacity planning', 'utilization tracking']
  }
};
