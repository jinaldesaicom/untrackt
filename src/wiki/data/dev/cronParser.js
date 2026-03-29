export default {
  id: 'cron-parser',
  title: 'Cron Expression Parser',
  description: 'Parse, validate, and explain cron expressions with a visual schedule preview showing the next execution times.',
  content: {
    whatIs: {
      heading: 'What is the Cron Expression Parser?',
      body: 'The Cron Expression Parser is a tool that takes cron schedule expressions and translates them into plain-English descriptions with a visual timeline of upcoming execution times. Cron expressions are the standard format for scheduling recurring tasks in Unix-like systems, CI/CD pipelines, cloud functions, and job schedulers. This tool helps you write, validate, and understand cron syntax by showing exactly when your schedule will trigger, preventing costly scheduling mistakes.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Cron syntax is compact but notoriously confusing -- even experienced developers struggle with field ordering, wildcards, ranges, and step values. A misconfigured cron expression can cause jobs to run too frequently (wasting resources), too infrequently (missing deadlines), or at the wrong times entirely. This tool provides instant visual feedback, showing the next N execution times so you can confirm your schedule is correct before deploying.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a 5-field cron expression (minute, hour, day-of-month, month, day-of-week).',
        'Read the plain-English description of your schedule.',
        'Review the list of next 10 execution times to verify the schedule.',
        'Use the interactive builder to construct expressions by selecting values from dropdowns.',
        'Toggle between standard (5-field) and extended (6-field with seconds) cron formats.',
        'Copy the validated cron expression for use in your configuration files or code.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Plain-English translation of any valid cron expression.',
        'Preview of the next 10 (or more) scheduled execution times.',
        'Interactive cron builder with dropdown selectors for each field.',
        'Support for standard 5-field and extended 6-field (with seconds) expressions.',
        'Real-time validation with specific error messages for invalid syntax.',
        'Common presets: every minute, hourly, daily, weekly, monthly, yearly.',
        'Timezone-aware schedule preview -- see execution times in your local timezone.',
        'Support for ranges (1-5), lists (1,3,5), step values (*/5), and special characters (L, W, #).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Configuring scheduled tasks in crontab for Linux servers.',
        'Setting up CI/CD pipeline schedules in GitHub Actions, GitLab CI, or Jenkins.',
        'Scheduling cloud functions (AWS Lambda, Google Cloud Functions, Azure Functions).',
        'Configuring database backup schedules for automated maintenance.',
        'Setting up recurring data processing or ETL jobs.',
        'Verifying cron expressions before deploying to production environments.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Every 15 Minutes', description: '*/15 * * * * -- Runs at :00, :15, :30, :45 of every hour, every day.' },
        { title: 'Weekdays at 9 AM', description: '0 9 * * 1-5 -- Runs at 9:00 AM Monday through Friday.' },
        { title: 'First of Every Month', description: '0 0 1 * * -- Runs at midnight on the 1st day of every month.' },
        { title: 'Every Sunday at 2 AM', description: '0 2 * * 0 -- Runs at 2:00 AM every Sunday, commonly used for weekly maintenance.' },
        { title: 'Twice Daily', description: '0 8,20 * * * -- Runs at 8:00 AM and 8:00 PM every day.' },
        { title: 'Every 6 Hours', description: '0 */6 * * * -- Runs at midnight, 6 AM, noon, and 6 PM every day.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Cron', definition: 'A time-based job scheduler in Unix-like operating systems. Users define schedules using cron expressions to automate recurring tasks.' },
        { term: 'Cron Expression', definition: 'A string of 5 (or 6) fields representing minute, hour, day-of-month, month, and day-of-week, defining when a scheduled task should execute.' },
        { term: 'Wildcard (*)', definition: 'Matches all possible values for a field. For example, * in the hour field means "every hour".' },
        { term: 'Range (1-5)', definition: 'Specifies a continuous range of values. For example, 1-5 in the day-of-week field means Monday through Friday.' },
        { term: 'Step Value (*/n)', definition: 'Specifies intervals. */15 in the minute field means "every 15 minutes" (0, 15, 30, 45).' },
        { term: 'List (1,3,5)', definition: 'Specifies a comma-separated set of discrete values. 1,15 in the day-of-month field means the 1st and 15th.' },
        { term: 'Field Order', definition: 'Standard cron uses 5 fields in order: minute (0-59), hour (0-23), day-of-month (1-31), month (1-12), day-of-week (0-7).' },
        { term: 'Crontab', definition: 'The cron table -- a configuration file in Unix systems that lists cron expressions and the commands they should execute.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between 5-field and 6-field cron?', answer: 'Standard cron uses 5 fields (minute through day-of-week). Some systems like Quartz and Spring add a 6th field for seconds at the beginning. This tool supports both formats.' },
        { question: 'Is day-of-week 0 Sunday or Monday?', answer: 'In standard cron, 0 and 7 both represent Sunday. 1 is Monday, through 6 for Saturday. Some systems may differ, so always verify with your scheduler documentation.' },
        { question: 'What does */5 mean?', answer: 'The step value */5 means "every 5 units." In the minute field, it triggers at 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, and 55.' },
        { question: 'Can I combine ranges and lists?', answer: 'Yes. Most cron implementations support combinations like 1-5,15,30 meaning "1 through 5, and 15, and 30" in one field.' },
        { question: 'What timezone do cron jobs run in?', answer: 'By default, cron uses the system timezone. Many cloud platforms allow you to specify a timezone. This tool shows execution times in your selected timezone for accurate preview.' },
        { question: 'What do L, W, and # mean?', answer: 'These are extended syntax: L means "last" (last day of month/week), W means "nearest weekday," and # means "nth occurrence" (e.g., 5#2 = second Friday). Not all systems support these.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always preview the next several execution times before deploying a cron schedule to production.',
        'Use descriptive comments alongside cron expressions in crontab files to explain the schedule purpose.',
        'Avoid scheduling resource-intensive jobs at common times like the top of the hour to reduce system contention.',
        'Stagger recurring jobs by a few minutes to prevent thundering herd problems on shared infrastructure.',
        'Use the interactive builder for complex schedules and switch to the expression view for fine-tuning.',
        'Test cron expressions locally before deploying to production CI/CD or cloud function triggers.',
        'Document your cron timezone explicitly -- ambiguity causes jobs to run at unexpected times after DST transitions.',
        'Prefer specific times over broad wildcards to minimize unintended executions.'
      ]
    }
  },
  relatedTools: ['unix-timestamp-converter', 'json-formatter', 'regex-tester', 'text-diff-checker', 'lorem-ipsum-generator'],
  seo: {
    metaTitle: 'Cron Expression Parser - Validate & Explain Cron Schedules | UnTrackt Wiki',
    metaDescription: 'Parse and validate cron expressions with plain-English explanations and a preview of next execution times. Build schedules with the interactive cron builder.',
    keywords: ['cron parser', 'cron expression', 'cron validator', 'cron schedule', 'crontab generator', 'cron builder', 'cron syntax', 'cron job scheduler']
  }
};
