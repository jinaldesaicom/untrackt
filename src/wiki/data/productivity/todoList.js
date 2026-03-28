export default {
  id: 'todo-list',
  title: 'To-Do List',
  description: 'Organize tasks, set priorities, and track progress with a simple and effective to-do list manager.',
  content: {
    whatIs: {
      heading: 'What is the To-Do List?',
      body: 'The To-Do List is a task management tool that helps you capture, organize, and complete your daily tasks. It provides a clean interface for adding tasks, setting priorities, marking items as complete, and filtering your list so you can focus on what matters most.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Keeping tasks in your head leads to forgotten items, stress, and reduced productivity. A to-do list externalizes your commitments, giving you a clear overview of what needs to be done. Studies show that writing down tasks increases the likelihood of completing them by up to 42%. This tool keeps everything in one place with zero friction.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Type a task into the input field and press Enter or click Add to create it.',
        'Optionally set a priority level (high, medium, low) for the task.',
        'Click the checkbox next to a task to mark it as complete.',
        'Use the filter buttons to view all, active, or completed tasks.',
        'Drag and drop tasks to reorder them manually.',
        'Click the delete icon to remove a task you no longer need.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Add, edit, and delete tasks with a single click',
        'Priority levels with color-coded indicators',
        'Filter tasks by status: all, active, or completed',
        'Drag-and-drop reordering for manual prioritization',
        'Persistent storage so your tasks survive page refreshes',
        'Bulk actions to clear all completed tasks at once',
        'Task counter showing remaining items'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Managing daily work tasks and errands',
        'Creating grocery or shopping lists',
        'Tracking assignments and homework deadlines',
        'Planning event preparation checklists',
        'Organizing household chores and maintenance tasks',
        'Keeping a quick list of follow-up items after meetings'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Morning Routine Checklist', description: 'Create tasks for each step of your morning routine--exercise, breakfast, review calendar--and check them off to build consistent habits.' },
        { title: 'Project Deliverables', description: 'Break a project into individual deliverables like "Draft proposal," "Review budget," and "Submit report" to track each milestone.' },
        { title: 'Weekly Errands', description: 'List errands such as "Pick up dry cleaning," "Buy groceries," and "Return library books" so nothing slips through the cracks.' },
        { title: 'Meeting Action Items', description: 'After a meeting, quickly capture all assigned action items with priorities so you can follow through promptly.' },
        { title: 'Travel Packing List', description: 'Build a packing checklist for an upcoming trip, marking items as packed to ensure you don\'t forget essentials.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Task', definition: 'A single actionable item that needs to be completed.' },
        { term: 'Priority', definition: 'A ranking (high, medium, low) indicating how urgent or important a task is.' },
        { term: 'Active Task', definition: 'A task that has not yet been marked as complete.' },
        { term: 'Completed Task', definition: 'A task that has been finished and checked off the list.' },
        { term: 'Bulk Action', definition: 'An operation that applies to multiple tasks at once, such as clearing all completed items.' },
        { term: 'Drag-and-Drop', definition: 'A method of reordering tasks by clicking and dragging them to a new position.' },
        { term: 'Persistent Storage', definition: 'Data saved locally in the browser so it remains available after closing the page.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are my tasks saved if I close the browser?', answer: 'Yes. Tasks are stored in your browser\'s local storage and will persist across sessions.' },
        { question: 'Is there a limit to how many tasks I can add?', answer: 'There is no hard limit. You can add as many tasks as you need, though very large lists may benefit from filtering.' },
        { question: 'Can I edit a task after creating it?', answer: 'Yes. Click on the task text to enter edit mode, make your changes, and press Enter to save.' },
        { question: 'How do I reorder tasks?', answer: 'Click and hold a task, then drag it to a new position in the list.' },
        { question: 'Can I undo deleting a task?', answer: 'Deleted tasks cannot be recovered, so use the delete action carefully.' },
        { question: 'Does this sync across devices?', answer: 'No. Tasks are stored locally on your current browser. For cross-device access, export your list or bookmark the page.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start each task with an action verb like "Call," "Write," "Review," or "Send" to make it clear and actionable.',
        'Limit your daily list to 5-7 tasks to avoid overwhelm and maintain focus.',
        'Review and update your list at the start and end of each day.',
        'Use priority levels consistently--reserve "high" for truly urgent items.',
        'Clear completed tasks regularly to keep your list clean and motivating.',
        'Break large tasks into smaller, specific sub-tasks that are easier to complete.',
        'If a task has been sitting untouched for days, reconsider whether it truly needs to be done.'
      ]
    }
  },
  relatedTools: ['daily-planner', 'kanban-board', 'eisenhower-matrix', 'two-minute-task-filter'],
  seo: {
    metaTitle: 'To-Do List Tool - Organize Tasks & Boost Productivity | Untrackt',
    metaDescription: 'Manage your tasks with a simple, prioritized to-do list. Add, complete, and filter tasks to stay organized and productive every day.',
    keywords: ['to-do list', 'task manager', 'productivity tool', 'task tracker', 'daily tasks', 'checklist', 'task organizer']
  }
};
