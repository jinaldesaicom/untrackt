export default {
  id: 'study-timer',
  title: 'Study Timer',
  description: 'Track your study sessions with customizable timers, focus modes, daily goals, and detailed session analytics.',
  content: {
    whatIs: {
      heading: 'What is the Study Timer?',
      body: 'The Study Timer is a flexible time-tracking tool designed specifically for students who want to monitor and optimize their study habits. Unlike the Pomodoro Timer which follows a fixed interval structure, the Study Timer lets you track open-ended study sessions, set daily hour goals, categorize time by subject, and review detailed analytics on your study patterns. It\'s a personal study journal that quantifies your effort--showing exactly how much time you\'re investing in each subject and whether you\'re meeting your goals.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most students significantly overestimate how much time they actually spend studying. The Study Timer provides objective data, revealing whether your "three hours of studying" was genuinely three focused hours or one hour of work with two hours of distractions. By tracking real study time, setting goals, and reviewing patterns, you can make informed decisions about time allocation, identify subjects that need more attention, and build consistent study habits backed by data rather than guesswork.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the subject or category you\'re about to study.',
        'Click "Start" to begin tracking your study session.',
        'Study with focus--the timer runs in the background and tracks elapsed time.',
        'Pause the timer during breaks or interruptions so only actual study time is recorded.',
        'Stop the session when finished to log the completed study block.',
        'Set daily study goals (e.g., 4 hours total, 1 hour per subject) and track your progress.',
        'Review your session history and analytics to spot patterns and adjust your schedule.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Flexible session tracking with start, pause, and stop controls.',
        'Subject/category tagging to track time per topic or course.',
        'Daily and weekly study goals with progress indicators.',
        'Session history log showing date, duration, and subject for each study block.',
        'Analytics dashboard with study time trends, subject distribution, and goal streaks.',
        'Focus mode option that locks the timer screen to discourage phone distractions.',
        'All data stored locally--your study history stays private on your device.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students tracking total study hours per subject to ensure balanced preparation before exams.',
        'Pre-med or law students logging study hours for personal accountability.',
        'Students building consistent study habits by setting and meeting daily time goals.',
        'College students managing time across 4-6 courses with different study demands.',
        'Competitive exam candidates tracking hundreds of preparation hours across months.',
        'Students with ADHD or focus challenges who benefit from externalizing time awareness.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Daily Goal Tracking',
          description: 'A student sets a 4-hour daily goal. After three sessions--Biology (1.5h), Calculus (1h), English (45min)--the tracker shows 3h 15min completed, 45 minutes remaining.'
        },
        {
          title: 'Subject Distribution',
          description: 'Weekly analytics reveal 8 hours on Biology, 3 hours on History, and 2 hours on Math--highlighting an imbalance that needs correction before the Math exam.'
        },
        {
          title: 'Exam Preparation Log',
          description: 'Over four weeks of finals prep, the timer logs 67 total study hours distributed across five subjects, providing a documented record of preparation effort.'
        },
        {
          title: 'Consistent Habit Building',
          description: 'A student maintains a 14-day streak of meeting their 2-hour minimum daily study goal, building a reliable habit reinforced by visual streak tracking.'
        },
        {
          title: 'Pause During Distractions',
          description: 'During a 90-minute study session, a student pauses the timer for a 10-minute phone call. Actual logged study time: 80 minutes--an honest, useful metric.'
        },
        {
          title: 'Multi-Course Time Management',
          description: 'A student taking 5 courses allocates target hours per week: Physics (6h), Chemistry (5h), Calculus (5h), English (3h), History (3h). The timer tracks actual vs. target each week.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Study Session', definition: 'A single continuous block of focused study time, tracked from start to stop, typically ranging from 20 minutes to several hours.' },
        { term: 'Focus Mode', definition: 'A distraction-reduction feature that keeps the timer visible and may restrict navigation to maintain study concentration.' },
        { term: 'Daily Goal', definition: 'A target number of study hours or minutes set for each day. Meeting daily goals consistently builds strong study habits.' },
        { term: 'Study Streak', definition: 'The number of consecutive days a student has met their daily study goal. Streaks incentivize consistency.' },
        { term: 'Subject Tag', definition: 'A label assigned to each study session indicating the course or topic being studied, enabling per-subject time analysis.' },
        { term: 'Active Study Time', definition: 'The actual time spent studying, excluding pauses and breaks. A more accurate measure of effort than total elapsed time.' },
        { term: 'Time Blocking', definition: 'A scheduling method where specific time slots are dedicated to specific subjects or tasks, reducing decision fatigue about what to study when.' },
        { term: 'Session Analytics', definition: 'Statistical summaries of study behavior including total hours, average session length, subject distribution, and goal completion rates.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How is this different from the Pomodoro Timer?', answer: 'The Pomodoro Timer uses fixed intervals (25 min work / 5 min break). The Study Timer is open-ended--you start and stop freely, making it better for tracking total study time per subject and setting daily hour goals rather than following a rigid interval pattern.' },
        { question: 'How many hours should I study per day?', answer: 'It varies by course load and difficulty. A common guideline is 2-3 hours of study per credit hour per week. Start with a realistic goal and adjust based on your performance and energy levels.' },
        { question: 'Should I pause the timer for short mental breaks?', answer: 'For breaks under 2 minutes (glancing away, stretching), you can keep the timer running. For longer breaks (phone calls, snacks, social media), pause it to keep your logged time honest and useful.' },
        { question: 'Can I track study time across multiple devices?', answer: 'Currently, data is stored locally on each device. For cross-device tracking, export your session data and import it on another device.' },
        { question: 'Does tracking study time actually help?', answer: 'Yes. Research on self-monitoring shows that simply measuring a behavior tends to improve it. Students who track study time typically study more consistently and allocate time more effectively.' },
        { question: 'What if I forget to start or stop the timer?', answer: 'You can manually add or edit study sessions in the history log to correct for missed start/stop events.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Set realistic daily goals that you can actually achieve. Sustainable consistency beats occasional marathon sessions.',
        'Always tag your sessions with a subject so your analytics are useful for identifying time allocation imbalances.',
        'Pause the timer honestly during distractions--inflated study hours only mislead yourself.',
        'Review your weekly analytics every Sunday to plan the coming week\'s study schedule based on real data.',
        'Use study streaks as motivation but don\'t beat yourself up over a broken streak--just restart.',
        'Combine the Study Timer with the Pomodoro Timer: use pomodoros within a tracked study session for structured focus.',
        'Front-load difficult subjects when your energy is highest, and track whether morning or evening sessions are more productive for you.',
        'Aim for quality over quantity. Two focused hours often accomplish more than four distracted hours.'
      ]
    }
  },
  relatedTools: ['pomodoro-timer', 'flashcard-session', 'gpa-calculator', 'essay-outline-builder'],
  seo: {
    metaTitle: 'Study Timer - Track Sessions, Set Goals & Build Habits - Wiki | UnTrackt',
    metaDescription: 'Track your study sessions with customizable timers, daily goals, subject tagging, and analytics. Build consistent study habits with data-driven insights.',
    keywords: ['study timer', 'study tracker', 'study session timer', 'study goals', 'study habits', 'time tracking', 'student productivity', 'study analytics', 'focus timer']
  }
};
