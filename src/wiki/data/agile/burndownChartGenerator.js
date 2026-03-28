export default {
  id: 'burndown-chart-generator',
  title: 'Burndown Chart Generator',
  description: 'Generate sprint burndown charts from daily remaining effort data to visualize sprint progress.',
  content: {
    whatIs: {
      heading: 'What is the Burndown Chart Generator?',
      body: 'The Burndown Chart Generator creates visual charts showing remaining work over the course of a sprint. By plotting the ideal burndown line against actual remaining story points or hours each day, you get an instant visual of whether the team is on track, ahead, or behind schedule. The chart is generated as SVG for easy sharing and embedding.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'A burndown chart is the simplest way to answer "are we on track?" during a sprint. Without one, teams rely on gut feelings until the last day when it is too late to course-correct. This tool makes it trivial to generate a chart from daily data, giving the team and stakeholders a shared visual of progress.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the total story points or hours committed at sprint start.',
        'Set the sprint length in days.',
        'Enter remaining work for each day as it progresses.',
        'View the burndown chart with ideal and actual lines.',
        'Use the chart to identify trends — flat lines indicate stalled progress.',
        'Export the chart as SVG or PNG for reports and retrospectives.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Ideal burndown line calculated automatically from sprint length and total work.',
        'Actual burndown line plotted from daily remaining-work entries.',
        'Visual gap analysis between ideal and actual progress.',
        'SVG chart output for clean scaling and embedding.',
        'Configurable for story points or hours.',
        'Sprint-over-sprint comparison to track improvement.',
        'Client-side only — no data sent to any server.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Daily sprint progress tracking during standup.',
        'Identifying mid-sprint that the team is behind and needs to re-scope.',
        'Providing stakeholders with a visual progress report.',
        'Retrospective analysis of sprint execution patterns.',
        'Comparing burndown shapes across multiple sprints to spot trends.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'On Track', description: 'The actual line closely follows the ideal line — the team is on pace to complete all committed work.' },
        { title: 'Flat Start', description: 'No points burned in the first 3 days, then a steep drop — stories were not broken down small enough.' },
        { title: 'Scope Creep', description: 'The actual line goes up mid-sprint because new work was added — a signal to review scope management.' },
        { title: 'Early Finish', description: 'The actual line hits zero two days before sprint end — the team can pull in additional stories.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Burndown Chart', definition: 'A chart plotting remaining work (y-axis) against time (x-axis) to visualize sprint progress.' },
        { term: 'Ideal Burndown', definition: 'A straight diagonal line from total committed work to zero, representing perfectly even daily progress.' },
        { term: 'Remaining Work', definition: 'The total story points or hours still to be completed at a given point in the sprint.' },
        { term: 'Scope Creep', definition: 'The addition of unplanned work during a sprint, visible as an upward spike in the burndown chart.' },
        { term: 'Burnup Chart', definition: 'The inverse of a burndown — showing cumulative completed work rising toward the total scope.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Should I update the chart daily?', answer: 'Yes. Daily updates give the most accurate picture of progress and make trends visible early.' },
        { question: 'What if the line goes up?', answer: 'This means more work was added (scope creep) or a story was re-opened. Investigate and address with the team.' },
        { question: 'Is it better to use story points or hours?', answer: 'Either works. Story points are more common for sprint burndowns; hours are more granular but harder to track consistently.' },
        { question: 'Why is my burndown flat for the first few days?', answer: 'This often happens when stories are too large to be completed in a day. Break stories into smaller slices for smoother burndowns.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Update the burndown at the same time each day for consistency.',
        'Break stories into small slices so the burndown shows daily progress.',
        'Use the chart in standups to give the team a shared view of the sprint.',
        'Address flat lines immediately — they signal stalled work.',
        'Do not add scope mid-sprint without removing equivalent scope.',
        'Compare burndown shapes across sprints during retrospectives to improve flow.'
      ]
    }
  },
  relatedTools: ['velocity-calculator', 'sprint-planner', 'sprint-capacity-calculator', 'release-planning-calculator'],
  seo: {
    metaTitle: 'Burndown Chart Generator — Visualize Sprint Progress | UnTrackt Wiki',
    metaDescription: 'Generate sprint burndown charts from daily remaining effort data. Compare ideal vs. actual progress with exportable SVG charts.',
    keywords: ['burndown chart', 'sprint burndown', 'agile chart', 'sprint progress', 'remaining work', 'sprint tracking']
  }
};
