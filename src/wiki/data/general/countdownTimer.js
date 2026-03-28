export default {
  id: 'countdown-timer',
  title: 'Countdown Timer',
  description: 'Set custom countdown timers with presets, audio alerts, and visual notifications for events, deadlines, and productivity sessions.',
  content: {
    whatIs: {
      heading: 'What is the Countdown Timer?',
      body: 'The Countdown Timer lets you set a precise countdown to any target time--from a few seconds to days away. It displays a live, updating readout of days, hours, minutes, and seconds remaining. You can choose from quick presets (5 min, 15 min, 25 min Pomodoro, 1 hour), enter a custom duration, or set a specific future date and time. When the timer reaches zero, it triggers an audio alert and visual notification.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Countdown timers help you stay focused during work sessions, track time for cooking or exercise, and build anticipation for upcoming events. Unlike phone timers that require unlocking your device, this browser-based timer stays visible in your tab and supports browser notifications so you are alerted even if the tab is in the background.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a preset duration (5 min, 15 min, 25 min, 1 hour) or enter a custom time.',
        'Alternatively, set a specific target date and time for an event countdown.',
        'Click "Start" to begin the countdown.',
        'Use the pause and resume buttons to control the timer as needed.',
        'When the timer reaches zero, an audio chime plays and a browser notification appears.',
        'Reset the timer to start over or select a new duration.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Quick-start presets: 5 min, 15 min, 25 min (Pomodoro), 1 hour.',
        'Custom duration input with hours, minutes, and seconds fields.',
        'Event countdown mode for a specific future date and time.',
        'Live display of days, hours, minutes, and seconds remaining.',
        'Audio alert with adjustable volume when the timer completes.',
        'Browser notification support for background tab alerts.',
        'Pause, resume, and reset controls.',
        'Tab title updates to show remaining time even when the tab is not active.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Pomodoro technique work sessions (25 minutes of focused work, 5-minute breaks).',
        'Cooking and baking timers for precise recipe timing.',
        'Event countdowns for product launches, holidays, or deadlines.',
        'Exam or meeting time management to stay on schedule.',
        'Exercise intervals and rest periods during workouts.',
        'Presentation practice sessions to stay within time limits.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '25-minute Pomodoro session', description: 'Select the 25-minute preset, start the timer, and focus on a single task until the chime sounds.' },
        { title: 'Event countdown', description: 'Set a target date of "2026-12-31 23:59:59" to count down to New Year\'s Eve with a days/hours/minutes display.' },
        { title: 'Cooking timer', description: 'Enter 12 minutes and 30 seconds for a recipe step. The audio alert ensures you don\'t miss it.' },
        { title: 'Meeting reminder', description: 'Set a 45-minute timer at the start of a meeting to receive an alert when time is almost up.' },
        { title: 'Workout intervals', description: 'Use 30-second and 60-second timers alternately for high-intensity interval training (HIIT).' },
        { title: 'Background tab timer', description: 'Start a 15-minute timer and switch to another tab. The tab title updates and a browser notification appears when done.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Pomodoro Technique', definition: 'A time management method that breaks work into 25-minute focused intervals (pomodoros) separated by 5-minute breaks.' },
        { term: 'Countdown', definition: 'A backward-running timer that decrements from a set duration to zero.' },
        { term: 'Browser notification', definition: 'A system-level alert triggered by a web page (with user permission) that appears outside the browser window.' },
        { term: 'Interval timer', definition: 'A timer that alternates between work and rest periods, commonly used in fitness and productivity.' },
        { term: 'Tab title update', definition: 'Dynamically changing the browser tab title to display the remaining time so users can monitor progress from other tabs.' },
        { term: 'requestAnimationFrame', definition: 'A browser API for efficient animation and timer display updates, synchronized with the screen refresh rate.' },
        { term: 'Alarm', definition: 'An audio or visual signal triggered when the countdown reaches zero to alert the user.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does the timer work if I switch tabs?', answer: 'Yes. The timer continues running in the background. The tab title updates with the remaining time, and a browser notification alerts you when it completes.' },
        { question: 'Can I set a timer for more than 24 hours?', answer: 'Yes. Use the event countdown mode to set a target date days or even months in the future.' },
        { question: 'Do I need to allow notifications?', answer: 'Browser notifications are optional but recommended. If you decline, the timer still plays an audio alert and updates the tab title.' },
        { question: 'Will the timer survive a page refresh?', answer: 'The timer state is saved to localStorage, so refreshing the page restores the countdown from where it left off.' },
        { question: 'Can I run multiple timers at once?', answer: 'The current tool supports one active timer at a time. For multiple concurrent timers, open the tool in separate browser tabs.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use the 25-minute Pomodoro preset for focused work sessions and take a 5-minute break after each.',
        'Allow browser notifications so you get alerted even when the timer tab is not visible.',
        'Keep the timer tab pinned in your browser for quick access during the day.',
        'For event countdowns, double-check the timezone to ensure accuracy.',
        'Pair the countdown timer with a task list to time-box individual tasks.',
        'Use shorter intervals (5-10 minutes) for high-focus tasks and longer ones (45-60 minutes) for deep work.'
      ]
    }
  },
  relatedTools: ['typing-speed-test', 'tip-splitter', 'random-number-generator', 'word-frequency-counter'],
  seo: {
    metaTitle: 'Countdown Timer - Set Custom Timers & Event Countdowns | Wiki | UnTrackt',
    metaDescription: 'Set countdown timers with presets, custom durations, and event countdowns. Audio alerts, browser notifications, and background tab support included.',
    keywords: ['countdown timer', 'online timer', 'Pomodoro timer', 'event countdown', 'browser timer', 'custom timer', 'productivity timer', 'time management']
  }
};
