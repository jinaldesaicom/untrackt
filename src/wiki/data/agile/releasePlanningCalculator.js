export default {
  id: 'release-planning-calculator',
  title: 'Release Planning Calculator',
  description: 'Estimate release dates based on team velocity and remaining story points for confident delivery forecasts.',
  content: {
    whatIs: {
      heading: 'What is the Release Planning Calculator?',
      body: 'The Release Planning Calculator forecasts when a set of features will be delivered based on your team\'s historical velocity and the total story points remaining. It calculates the number of sprints needed, estimates a target release date, and shows optimistic, likely, and pessimistic scenarios to help stakeholders set realistic expectations.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Stakeholders constantly ask "when will it be done?" Without data-driven forecasting, teams resort to guessing, which erodes trust. This tool uses actual velocity data to produce defensible release date estimates with confidence ranges, enabling better roadmap decisions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the total remaining story points for the release.',
        'Input your team\'s average velocity (points per sprint).',
        'Set the sprint length in weeks.',
        'Optionally adjust for velocity variance to see optimistic and pessimistic scenarios.',
        'View the estimated number of sprints and projected release date.',
        'Adjust scope or velocity to explore trade-offs.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Release date forecasting based on velocity and remaining scope.',
        'Three-point estimation with optimistic, likely, and pessimistic scenarios.',
        'Sprint count calculation showing how many iterations are needed.',
        'Adjustable velocity variance for confidence range modeling.',
        'Visual timeline showing projected sprint-by-sprint progress.',
        'Client-side only — no data leaves your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Providing stakeholders with data-driven release date estimates.',
        'Evaluating whether to cut scope or add sprints to meet a deadline.',
        'Comparing release timelines for different feature sets.',
        'Planning quarterly roadmaps with realistic delivery expectations.',
        'Communicating delivery risk when velocity is unstable.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard Release Forecast', description: '120 remaining points at 30 points/sprint velocity = 4 sprints (8 weeks) to release.' },
        { title: 'Pessimistic Scenario', description: 'With velocity variance of ±10, pessimistic forecast is 6 sprints (12 weeks) giving stakeholders a worst-case window.' },
        { title: 'Scope Reduction', description: 'Reducing scope from 120 to 80 points brings the release from 4 sprints down to 3, saving 2 weeks.' },
        { title: 'New Team Velocity', description: 'A new team averaging 15 points/sprint needs 8 sprints for the same 120-point release.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Velocity', definition: 'The average number of story points a team completes per sprint, used as the primary input for forecasting.' },
        { term: 'Release', definition: 'A set of features or product increment delivered to users, typically spanning multiple sprints.' },
        { term: 'Scope', definition: 'The total amount of work (in story points) planned for the release.' },
        { term: 'Three-Point Estimation', definition: 'A forecasting technique using optimistic, most likely, and pessimistic values to produce a range.' },
        { term: 'Burnup', definition: 'A chart showing cumulative completed work over time against the total scope, indicating release progress.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many sprints of velocity data do I need?', answer: 'At least 3-5 sprints of historical data for a reliable average. More data points produce more accurate forecasts.' },
        { question: 'What if velocity is highly variable?', answer: 'Use a wider variance range and present the pessimistic scenario to stakeholders to manage expectations.' },
        { question: 'Should I include bug-fix sprints?', answer: 'If bug fixing consumes part of your velocity, account for it by reducing the effective velocity or adding scope for expected bugs.' },
        { question: 'Can I use this for fixed-date projects?', answer: 'Yes — enter your fixed date and work backwards to see how many points you can deliver, then prioritize accordingly.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Update the forecast every sprint as velocity and scope change.',
        'Always present a range rather than a single date to stakeholders.',
        'Use rolling average velocity (last 3-5 sprints) for more responsive forecasts.',
        'Factor in planned vacations and holidays that may reduce future velocity.',
        'Separate "must-have" from "nice-to-have" scope to show trade-offs clearly.',
        'Track forecast accuracy over time to build stakeholder confidence.'
      ]
    }
  },
  relatedTools: ['velocity-calculator', 'sprint-planner', 'sprint-capacity-calculator', 'burndown-chart-generator'],
  seo: {
    metaTitle: 'Release Planning Calculator — Forecast Delivery Dates from Velocity | UnTrackt Wiki',
    metaDescription: 'Estimate release dates using team velocity and remaining story points. See optimistic, likely, and pessimistic delivery forecasts for agile projects.',
    keywords: ['release planning', 'release forecast', 'velocity', 'story points', 'agile planning', 'delivery date estimate']
  }
};
