export default {
  id: 'focus-session-logger',
  title: 'Focus Session Logger',
  description: 'Log focused work sessions, track deep work hours, and build a consistent habit of distraction-free productivity.',
  content: {
    whatIs: {
      heading: 'What is the Focus Session Logger?',
      body: 'The Focus Session Logger is a time-tracking tool designed for recording focused work sessions. Inspired by the concept of "deep work" by Cal Newport, it lets you start a timer, log what you worked on, and review your history of focused sessions. Over time, you build a visual record of your deep work habits and can identify patterns in your most productive hours.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'In a world full of distractions, the ability to focus deeply is a superpower. Cal Newport argues that deep work is becoming increasingly rare and increasingly valuable. By logging your focus sessions, you create accountability, track how much deep work you actually do (versus how much you think you do), and build momentum through visible streaks and progress.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Click "Start Session" to begin a focus timer.',
        'Optionally name the session with what you plan to work on.',
        'Work without distractions until you are ready to stop.',
        'Click "End Session" to log the completed session with its duration.',
        'Add notes about what you accomplished during the session.',
        'Review your session history, total hours, and streaks over time.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'One-click session start and stop timer',
        'Session labeling with project or task names',
        'Post-session notes for capturing accomplishments',
        'Daily, weekly, and monthly session summaries',
        'Streak tracking for consecutive focus days',
        'Total deep work hours counter',
        'Session history log with search and filter'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking daily deep work hours for software development or writing',
        'Building a consistent focus habit with visible streaks',
        'Measuring how much productive time you actually spend each week',
        'Logging study sessions for exam preparation',
        'Tracking creative work sessions for freelance projects',
        'Identifying your peak focus hours by reviewing session patterns'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Developer Deep Work', description: 'Log a 90-minute session on "Build authentication module" with notes about completing the login flow and starting the password reset feature.' },
        { title: 'Writing Sprint', description: 'Record a 45-minute writing session for a blog post, noting 800 words written and the outline for the next section.' },
        { title: 'Study Session', description: 'Track a 60-minute study session on "Organic Chemistry Chapter 5" with notes on key concepts reviewed and practice problems completed.' },
        { title: 'Design Focus Block', description: 'Log a 2-hour design session working on website mockups, noting three pages completed and feedback items to address.' },
        { title: 'Weekly Review', description: 'At the end of the week, review session logs to find that you logged 18 hours of deep work, with mornings being your most productive time.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Deep Work', definition: 'Professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit.' },
        { term: 'Focus Session', definition: 'A defined period of concentrated, uninterrupted work on a single task or project.' },
        { term: 'Shallow Work', definition: 'Non-cognitively demanding tasks often performed while distracted, such as emails or administrative work.' },
        { term: 'Streak', definition: 'A consecutive series of days where at least one focus session was completed, encouraging habit consistency.' },
        { term: 'Time Log', definition: 'A chronological record of focus sessions including duration, topic, and notes.' },
        { term: 'Peak Hours', definition: 'The time of day when you consistently do your best focused work, identifiable through session patterns.' },
        { term: 'Pomodoro', definition: 'A time management technique using 25-minute work intervals followed by 5-minute breaks, often used within focus sessions.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How long should a focus session be?', answer: 'There is no fixed rule. Common durations range from 25 minutes (Pomodoro) to 90 minutes. Start with what feels manageable and build up.' },
        { question: 'What counts as a focus session?', answer: 'Any period of uninterrupted, concentrated work on a specific task. Checking email or browsing social media doesn\'t count.' },
        { question: 'How many hours of deep work should I aim for?', answer: 'Cal Newport suggests that four hours of deep work per day is a realistic maximum for most people. Start with 1-2 hours and build gradually.' },
        { question: 'Can I pause a session?', answer: 'It\'s better to end the session if you lose focus and start a new one when you\'re ready. Logging honest sessions gives you more accurate data.' },
        { question: 'What if I forget to start the timer?', answer: 'You can manually add a session with the time and duration. Consistency is important, but don\'t stress over missed logs.' },
        { question: 'How do streaks work?', answer: 'A streak counts consecutive days with at least one logged focus session. Missing a day resets the streak, encouraging daily consistency.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Schedule focus sessions in your calendar and treat them as non-negotiable appointments.',
        'Remove all distractions before starting: close unnecessary tabs, silence notifications, put your phone away.',
        'Start with shorter sessions (25-30 minutes) and gradually increase as your focus stamina improves.',
        'Label each session clearly so your log is meaningful and reviewable.',
        'Add brief notes after each session to capture what you accomplished and where to pick up next time.',
        'Review your session history weekly to identify your peak productivity times.',
        'Use streaks as motivation, but don\'t let a broken streak discourage you--just start again.',
        'Pair focus sessions with a daily planner to ensure your deep work aligns with your priorities.'
      ]
    }
  },
  relatedTools: ['daily-planner', 'energy-level-planner', 'todo-list', 'daily-journal'],
  seo: {
    metaTitle: 'Focus Session Logger - Track Deep Work & Build Focus Habits | Untrackt',
    metaDescription: 'Log focused work sessions, track deep work hours, and build streaks of productive focus time. Measure and improve your concentration habits.',
    keywords: ['focus session', 'deep work tracker', 'focus timer', 'productivity logger', 'time tracking', 'focus habit', 'concentration tracker']
  }
};
