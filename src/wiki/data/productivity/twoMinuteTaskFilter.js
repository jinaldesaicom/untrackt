export default {
  id: 'two-minute-task-filter',
  title: 'Two-Minute Task Filter',
  description: 'Apply the GTD two-minute rule to quickly identify and complete tasks that take less than two minutes.',
  content: {
    whatIs: {
      heading: 'What is the Two-Minute Task Filter?',
      body: 'The Two-Minute Task Filter is based on David Allen\'s famous rule from Getting Things Done: if a task takes less than two minutes, do it immediately instead of adding it to your list. This tool helps you evaluate incoming tasks, filter the quick wins, and either complete them on the spot or route longer tasks to your to-do list or planner for scheduling.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Small tasks accumulate faster than you realize. Individually, each one is trivial, but collectively, they create mental overhead and clutter your task list. The two-minute rule eliminates this by handling quick tasks immediately. It reduces your backlog, creates momentum through quick wins, and frees your mind to focus on larger, more complex work.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a task or list of tasks you need to evaluate.',
        'For each task, the tool asks: "Can this be done in two minutes or less?"',
        'If yes, the task is flagged as a "Do Now" item--complete it immediately.',
        'If no, choose to schedule it, delegate it, or add it to your task list.',
        'Work through your "Do Now" queue to clear quick items.',
        'Review the remaining tasks and plan when to tackle them.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Quick decision filter: under two minutes or not',
        'Immediate action queue for quick tasks',
        'Routing options: schedule, delegate, or add to list',
        'Task counter showing how many quick wins are available',
        'Completion tracking for "Done Now" items',
        'Integration prompts for to-do lists and planners',
        'Batch processing for multiple incoming tasks'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Processing a full email inbox by acting on quick replies immediately',
        'Clearing small administrative tasks that pile up during the day',
        'Handling quick requests from colleagues without adding them to your backlog',
        'Processing items captured during a brain dump session',
        'Triaging tasks during a daily or weekly review',
        'Building momentum at the start of the day with a few quick wins'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Email Triage', description: 'Review 20 emails: 8 need just a quick reply (under 2 min each). Fire off all 8 immediately, then schedule time for the 12 that require deeper thought.' },
        { title: 'Desk Cleanup', description: 'File that paper (1 min), reply to a Slack message (30 sec), update a calendar event (1 min)--all done in under 5 minutes instead of sitting on your list for days.' },
        { title: 'Morning Quick Wins', description: 'Start the day by knocking out 5 two-minute tasks: send a follow-up, approve a request, book a room, update a document, water the plant.' },
        { title: 'Post-Meeting Processing', description: 'After a meeting, immediately send the thank-you email, add one action item to your list, and share one link--all under two minutes each.' },
        { title: 'Brain Dump Triage', description: 'From a 20-item brain dump, identify 6 items that are two-minute tasks. Complete them immediately and plan the remaining 14.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Two-Minute Rule', definition: 'The GTD principle that if a task takes less than two minutes, you should do it immediately rather than tracking it.' },
        { term: 'Quick Win', definition: 'A small, easily completed task that provides an immediate sense of progress and momentum.' },
        { term: 'GTD (Getting Things Done)', definition: 'A productivity methodology by David Allen focused on capturing, organizing, and completing tasks systematically.' },
        { term: 'Triage', definition: 'The process of quickly evaluating tasks to decide what to do now, schedule, delegate, or discard.' },
        { term: 'Batch Processing', definition: 'Grouping similar small tasks together and completing them in one session for efficiency.' },
        { term: 'Delegation', definition: 'Assigning a task to someone else who is better suited or available to handle it.' },
        { term: 'Task Routing', definition: 'Deciding the destination for a task: do now, schedule for later, delegate, or discard.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Why two minutes specifically?', answer: 'David Allen found that the overhead of tracking and scheduling a task often exceeds the time to just do it if it takes under two minutes. Two minutes is the sweet spot.' },
        { question: 'What if I have 50 two-minute tasks?', answer: 'That would take nearly two hours. In that case, batch them into a dedicated session rather than letting them interrupt deeper work.' },
        { question: 'Does this replace my to-do list?', answer: 'No. It works alongside your to-do list. Tasks over two minutes still go on your list for proper scheduling.' },
        { question: 'What if a task seems quick but takes longer?', answer: 'If you start and realize it will take more than two minutes, stop and add it to your task list with a note about where you left off.' },
        { question: 'Can I adjust the time threshold?', answer: 'The two-minute rule is a guideline. Some people use five minutes as their threshold. Choose what works for your workflow.' },
        { question: 'When should I NOT apply this rule?', answer: 'During deep focus sessions, don\'t interrupt yourself with two-minute tasks. Save them for transition times or dedicated triage sessions.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Apply the two-minute rule during natural transition points--between meetings, at the start of the day, or during email processing.',
        'Don\'t let quick tasks interrupt deep work. Batch them for a dedicated triage session instead.',
        'If you consistently have many two-minute tasks, look for ways to automate or systematize them.',
        'Use this filter as the first step when processing your inbox, brain dump, or task list.',
        'Track how many two-minute tasks you complete each day to see the hidden productivity you\'re gaining.',
        'Combine with the Eisenhower Matrix: quick + important = do now; quick + unimportant = consider delegating or skipping.',
        'Build the two-minute habit gradually. Start by applying it to email, then expand to other areas.'
      ]
    }
  },
  relatedTools: ['todo-list', 'eisenhower-matrix', 'brain-dump-capture', 'daily-planner'],
  seo: {
    metaTitle: 'Two-Minute Task Filter - GTD Quick Win Productivity Tool | Untrackt',
    metaDescription: 'Apply the GTD two-minute rule to filter and complete quick tasks immediately. Build momentum, clear your backlog, and focus on what matters.',
    keywords: ['two-minute rule', 'GTD', 'quick tasks', 'task filter', 'productivity', 'getting things done', 'quick wins', 'task triage']
  }
};
