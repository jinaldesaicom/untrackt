export default {
  id: 'daily-planner',
  title: 'Daily Planner',
  description: 'Plan your day with time blocking, scheduled tasks, and priority management to make the most of every hour.',
  content: {
    whatIs: {
      heading: 'What is the Daily Planner?',
      body: 'The Daily Planner is a time-blocking tool that helps you schedule tasks across your day in specific time slots. It provides a structured view of your day from morning to evening, allowing you to assign tasks to particular hours, set priorities, and ensure you allocate enough time for what matters most.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'A to-do list tells you what to do, but a daily planner tells you when to do it. Time blocking has been shown to increase productivity by 80% because it eliminates decision fatigue and ensures dedicated focus time. By planning your day in advance, you take control of your schedule instead of reacting to whatever comes up.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the date you want to plan for.',
        'Click on a time slot to add a task or event to that block.',
        'Set the duration of the task by dragging the block or entering start and end times.',
        'Assign a priority or category to each block.',
        'Rearrange blocks by dragging them to different time slots.',
        'Review your planned day and adjust for balance between focus work, meetings, and breaks.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Time-block scheduling with hour and half-hour slots',
        'Priority tagging for each scheduled item',
        'Category labels for work, personal, health, and more',
        'Drag-and-drop rescheduling of time blocks',
        'Daily overview showing all planned activities',
        'Persistent data saved across sessions',
        'Visual indicators for overbooked or free time'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Planning a productive workday with dedicated focus blocks',
        'Scheduling study sessions around classes and breaks',
        'Balancing work tasks with personal appointments',
        'Preparing for a busy day with back-to-back meetings',
        'Allocating deep work time in the morning and admin tasks in the afternoon',
        'Planning a balanced day that includes exercise, meals, and rest'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Focused Work Day', description: 'Block 9-11 AM for deep work, 11-12 for emails, 1-3 PM for project work, and 3-4 PM for meetings to create a structured day.' },
        { title: 'Student Schedule', description: 'Plan study blocks between classes: 8-9 AM study, 9-10 lecture, 10-12 study, 1-2 PM lab, 3-5 PM library session.' },
        { title: 'Freelancer Time Blocking', description: 'Assign client A from 9-12, lunch break 12-1, client B from 1-3, and admin work from 3-5 to manage multiple commitments.' },
        { title: 'Interview Day', description: 'Block preparation time before each interview, with buffers between slots for notes and mental resets.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Time Blocking', definition: 'A scheduling method where you assign specific tasks to defined blocks of time throughout the day.' },
        { term: 'Time Slot', definition: 'A defined period on the planner (e.g., 9:00-9:30 AM) where a task can be assigned.' },
        { term: 'Deep Work', definition: 'Focused, uninterrupted work on cognitively demanding tasks that produce high-value output.' },
        { term: 'Buffer Time', definition: 'Short gaps scheduled between tasks to allow for transitions, breaks, or unexpected delays.' },
        { term: 'Overbooking', definition: 'Scheduling more tasks than available time allows, leading to an unrealistic plan.' },
        { term: 'Priority', definition: 'The relative importance of a task, used to decide what to schedule first.' },
        { term: 'Daily Review', definition: 'The practice of reviewing your plan at the end of the day to assess what was completed and adjust for tomorrow.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can I plan multiple days in advance?', answer: 'You can select any date to plan for. Each day has its own independent schedule.' },
        { question: 'What happens if I don\'t finish a task in its time block?', answer: 'You can drag the task to a later slot or extend the block. Unfinished tasks remain visible for rescheduling.' },
        { question: 'Is the planner saved automatically?', answer: 'Yes. Your schedule is saved in local storage and persists across browser sessions.' },
        { question: 'Can I set recurring tasks?', answer: 'Currently, tasks are set per day. You can recreate recurring blocks manually for each day.' },
        { question: 'How small can a time block be?', answer: 'Time blocks can be as short as 15 minutes, giving you fine-grained control over your schedule.' },
        { question: 'Does it integrate with my calendar?', answer: 'The planner is standalone. You can use it alongside your existing calendar for additional structure.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Plan your day the evening before so you can start each morning with clarity and purpose.',
        'Schedule your most important and demanding tasks during your peak energy hours.',
        'Include buffer time between blocks to avoid a rigid, stressful schedule.',
        'Block time for breaks, meals, and movement--productivity requires recovery.',
        'Be realistic about how long tasks take; when in doubt, add extra time.',
        'Review your plan at the end of the day and note what worked and what needs adjustment.',
        'Protect your deep work blocks by treating them as non-negotiable appointments.',
        'Leave some unscheduled time for unexpected tasks or spontaneous opportunities.'
      ]
    }
  },
  relatedTools: ['todo-list', 'eisenhower-matrix', 'energy-level-planner', 'focus-session-logger'],
  seo: {
    metaTitle: 'Daily Planner - Time Blocking & Task Scheduling Tool | Untrackt',
    metaDescription: 'Plan your day with time-blocked scheduling. Assign tasks to time slots, set priorities, and build a productive daily routine.',
    keywords: ['daily planner', 'time blocking', 'day planner', 'schedule planner', 'task scheduling', 'productivity planner', 'time management']
  }
};
