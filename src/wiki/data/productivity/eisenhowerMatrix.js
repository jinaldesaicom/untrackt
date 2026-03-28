export default {
  id: 'eisenhower-matrix',
  title: 'Eisenhower Matrix',
  description: 'Prioritize tasks using the urgent/important framework to focus on what truly matters and eliminate distractions.',
  content: {
    whatIs: {
      heading: 'What is the Eisenhower Matrix?',
      body: 'The Eisenhower Matrix is a prioritization framework that organizes tasks into four quadrants based on two criteria: urgency and importance. Named after President Dwight D. Eisenhower, who famously said "What is important is seldom urgent and what is urgent is seldom important," this tool helps you distinguish between tasks that need immediate attention and those that contribute to long-term goals.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most people spend their days reacting to urgent tasks while neglecting important ones. The Eisenhower Matrix breaks this cycle by forcing you to evaluate every task against two dimensions. Research shows that people who regularly prioritize using this framework accomplish more meaningful work and experience less stress because they spend less time on busywork and distractions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add all your current tasks to the input area.',
        'For each task, assess whether it is urgent (time-sensitive) and whether it is important (contributes to goals).',
        'Place or drag each task into the appropriate quadrant.',
        'Do tasks in Quadrant 1 (Urgent + Important) immediately.',
        'Schedule tasks in Quadrant 2 (Not Urgent + Important) for focused work time.',
        'Delegate Quadrant 3 (Urgent + Not Important) tasks when possible.',
        'Eliminate or drop Quadrant 4 (Not Urgent + Not Important) tasks.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Four-quadrant visual grid with color-coded sections',
        'Drag-and-drop task placement between quadrants',
        'Quick-add tasks directly into any quadrant',
        'Task count per quadrant for balance awareness',
        'Clear action labels: Do, Schedule, Delegate, Eliminate',
        'Persistent storage of your matrix state',
        'One-click task completion and removal'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Prioritizing a long backlog of work tasks at the start of the week',
        'Deciding which tasks to focus on when everything feels urgent',
        'Identifying time-wasting activities that can be eliminated',
        'Planning strategic work that often gets pushed aside by daily fires',
        'Coaching team members on effective prioritization',
        'Making decisions about commitments and saying no to low-value requests'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Work Prioritization', description: 'Q1: Client deadline today. Q2: Prepare quarterly strategy. Q3: Reply to non-critical emails. Q4: Reorganize desktop files.' },
        { title: 'Student Life', description: 'Q1: Study for tomorrow\'s exam. Q2: Work on research paper due next month. Q3: Group chat about logistics. Q4: Browse social media.' },
        { title: 'Personal Goals', description: 'Q1: Doctor appointment this week. Q2: Start an exercise routine. Q3: Return a friend\'s call. Q4: Watch trending shows.' },
        { title: 'Project Management', description: 'Q1: Fix production bug. Q2: Refactor technical debt. Q3: Attend optional status meeting. Q4: Update unused documentation.' },
        { title: 'Weekly Review', description: 'At the end of each week, categorize next week\'s tasks into the four quadrants to start Monday with crystal-clear priorities.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Urgent', definition: 'Tasks that require immediate attention and have a pressing deadline or consequence if delayed.' },
        { term: 'Important', definition: 'Tasks that contribute to long-term goals, values, or meaningful outcomes.' },
        { term: 'Quadrant 1 (Do)', definition: 'Urgent and Important--tasks that need immediate action, like crises and deadlines.' },
        { term: 'Quadrant 2 (Schedule)', definition: 'Not Urgent but Important--strategic tasks like planning, learning, and relationship building.' },
        { term: 'Quadrant 3 (Delegate)', definition: 'Urgent but Not Important--tasks that demand attention but don\'t advance your goals, like some emails and interruptions.' },
        { term: 'Quadrant 4 (Eliminate)', definition: 'Not Urgent and Not Important--time-wasting activities like excessive social media or busywork.' },
        { term: 'Prioritization', definition: 'The process of determining the order and importance of tasks to allocate time and energy effectively.' },
        { term: 'Decision Fatigue', definition: 'The deteriorating quality of decisions after a long session of decision-making, which frameworks like this help reduce.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What if a task feels both urgent and not urgent?', answer: 'Ask yourself: "What happens if I don\'t do this today?" If there is a real consequence, it is urgent. If not, it belongs in Quadrant 2.' },
        { question: 'How often should I update my matrix?', answer: 'Review and update it at the start of each day or at least once a week during your weekly review.' },
        { question: 'What if most of my tasks are in Quadrant 1?', answer: 'This usually means you are in reactive mode. Try to spend more time in Quadrant 2 to prevent tasks from becoming urgent crises.' },
        { question: 'Can I use this for team tasks?', answer: 'Yes. The matrix works well for personal and team prioritization. You can assign Quadrant 3 tasks to team members who are better suited for them.' },
        { question: 'How is this different from a to-do list?', answer: 'A to-do list captures what needs to be done. The Eisenhower Matrix adds a layer of prioritization by evaluating urgency and importance.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Spend the majority of your productive time on Quadrant 2 tasks--they drive long-term success.',
        'Be honest about Quadrant 4 items. If something adds no value, let it go.',
        'Limit Quadrant 1 tasks by planning ahead--most urgent crises were once preventable Quadrant 2 items.',
        'Delegate genuinely, not just in theory. Identify who can handle Quadrant 3 tasks and hand them off.',
        'Revisit the matrix when you feel overwhelmed--it quickly reveals where your time is going.',
        'Use the matrix alongside your daily planner to schedule Quadrant 2 tasks into specific time blocks.',
        'Don\'t overthink placement. If you are unsure, pick a quadrant and adjust later.'
      ]
    }
  },
  relatedTools: ['todo-list', 'daily-planner', 'decision-matrix', 'two-minute-task-filter'],
  seo: {
    metaTitle: 'Eisenhower Matrix - Urgent/Important Task Prioritization | Untrackt',
    metaDescription: 'Prioritize tasks with the Eisenhower Matrix. Sort tasks by urgency and importance into four quadrants to focus on what matters most.',
    keywords: ['eisenhower matrix', 'prioritization tool', 'urgent important matrix', 'task prioritization', 'time management', 'productivity framework', 'eisenhower box']
  }
};
