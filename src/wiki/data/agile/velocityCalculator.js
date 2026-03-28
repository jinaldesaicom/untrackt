export default {
  id: 'velocity-calculator',
  title: 'Velocity Calculator',
  description: 'Track and analyze team velocity across sprints with trend charts to improve estimation and planning accuracy.',
  content: {
    whatIs: {
      heading: 'What is the Velocity Calculator?',
      body: 'The Velocity Calculator tracks the number of story points your team completes each sprint and calculates averages, trends, and variances. It plots velocity over time so you can see whether the team is accelerating, stable, or slowing down — essential data for accurate sprint planning and release forecasting.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Without tracking velocity, sprint commitments are guesswork. This tool turns past performance into reliable planning data. By visualizing trends, teams spot problems early — a declining velocity might signal technical debt or team morale issues — and can take corrective action before delivery is impacted.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter completed story points for each past sprint.',
        'Add new sprint data as each sprint closes.',
        'View the average velocity, trend line, and variance.',
        'Use the rolling average (last 3-5 sprints) for your next sprint commitment.',
        'Export the velocity chart for retrospective or stakeholder discussions.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Sprint-by-sprint velocity tracking with point totals.',
        'Average, rolling average, and variance calculations.',
        'Visual trend chart showing velocity over time.',
        'Standard deviation display to assess predictability.',
        'Data export for use in release planning or reports.',
        'Runs entirely in-browser — no external data sharing.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting a data-driven sprint commitment during planning.',
        'Feeding velocity data into release planning calculators.',
        'Identifying velocity trends during retrospectives.',
        'Comparing team performance before and after process changes.',
        'Reporting predictability metrics to leadership.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Stable Team', description: 'Sprint velocities of 28, 32, 30, 29, 31 show a stable average of 30 with low variance — ideal for planning.' },
        { title: 'Improving Trend', description: 'Velocities of 18, 22, 25, 28, 30 show a clear upward trend as the team matures.' },
        { title: 'High Variance', description: 'Velocities of 15, 35, 20, 40 indicate unpredictability that needs investigation in the retrospective.' },
        { title: 'Rolling Average', description: 'Using the last 3 sprints (28, 32, 30) gives a rolling average of 30 rather than the full-history average of 27.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Velocity', definition: 'The number of story points a team completes (marks as Done) in a single sprint.' },
        { term: 'Rolling Average', definition: 'The average velocity calculated over the most recent N sprints, giving more weight to recent performance.' },
        { term: 'Variance', definition: 'The degree to which velocity fluctuates from sprint to sprint, indicating predictability.' },
        { term: 'Standard Deviation', definition: 'A statistical measure of how spread out velocity values are from the mean.' },
        { term: 'Trend Line', definition: 'A line on the velocity chart showing the overall direction — upward, flat, or downward.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Should I count partially completed stories?', answer: 'No. Only count stories that meet the Definition of Done. Partial credit inflates velocity and misleads planning.' },
        { question: 'How many sprints do I need for a reliable average?', answer: 'At least 3-5 sprints. Fewer may be skewed by outliers.' },
        { question: 'What if team composition changes?', answer: 'Velocity history resets when the team changes significantly. Track separately and establish a new baseline.' },
        { question: 'Velocity is increasing — is that always good?', answer: 'Not necessarily. Check if story point estimates are being deflated or if quality is slipping. Stable, predictable velocity is often more valuable than high velocity.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Track velocity every sprint without exception to build reliable data.',
        'Use rolling averages for planning — they respond to recent changes better than full-history averages.',
        'Never use velocity to compare different teams — story point scales differ.',
        'Investigate significant drops or spikes rather than ignoring them.',
        'Present velocity alongside a standard deviation to communicate predictability.',
        'Review velocity trends during retrospectives to connect process changes with outcomes.'
      ]
    }
  },
  relatedTools: ['sprint-planner', 'sprint-capacity-calculator', 'release-planning-calculator', 'burndown-chart-generator'],
  seo: {
    metaTitle: 'Velocity Calculator — Track Team Velocity & Sprint Trends | UnTrackt Wiki',
    metaDescription: 'Track and analyze agile team velocity across sprints. Calculate averages, variance, and trends to improve sprint planning and release forecasting.',
    keywords: ['velocity calculator', 'sprint velocity', 'agile metrics', 'team velocity', 'velocity trend', 'story points per sprint']
  }
};
