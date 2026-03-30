export default {
  id: 'story-point-estimator',
  title: 'Story Point Estimator',
  description: 'Estimate story points using complexity, effort, and uncertainty factors for consistent agile sizing.',
  content: {
    whatIs: {
      heading: 'What is the Story Point Estimator?',
      body: 'The Story Point Estimator helps agile teams size user stories by evaluating three dimensions: complexity (how hard is it?), effort (how much work?), and uncertainty (how much is unknown?). By scoring each factor independently, the tool produces a recommended story point value using Fibonacci or T-shirt sizing scales, promoting consistent estimation across the team.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Story point estimation is often inconsistent because team members weigh different factors in their heads. This tool makes the evaluation explicit by separating complexity, effort, and uncertainty, producing more defensible and consistent estimates. It also serves as a learning aid for teams new to relative estimation.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the user story title and description.',
        'Rate complexity on a scale (low, medium, high, very high).',
        'Rate effort on the same scale.',
        'Rate uncertainty or risk level.',
        'View the recommended story point value based on the combined score.',
        'Adjust the recommendation if the team consensus differs.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Three-factor estimation: complexity, effort, and uncertainty.',
        'Fibonacci scale (1, 2, 3, 5, 8, 13, 21) or T-shirt sizing output.',
        'Visual scoring matrix showing how factors combine.',
        'History of previous estimates for reference.',
        'Shareable outputs for sprint planning discussions.',
        'Runs offline in your browser with no server communication.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Sizing stories during backlog refinement sessions.',
        'Training new team members on relative estimation concepts.',
        'Breaking down stories that score too high into smaller pieces.',
        'Documenting estimation rationale for future reference.',
        'Preparing estimates before a planning poker session.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Simple Bug Fix', description: 'Low complexity, low effort, low uncertainty → 1 or 2 story points.' },
        { title: 'New Feature with Known Tech', description: 'Medium complexity, medium effort, low uncertainty → 5 story points.' },
        { title: 'Integration with External API', description: 'Medium complexity, high effort, high uncertainty → 13 story points.' },
        { title: 'Spike for Research', description: 'Low complexity, low effort, very high uncertainty → timeboxed spike, not sized.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Story Points', definition: 'A relative unit of measure used to express the overall size of a user story, factoring in effort, complexity, and uncertainty.' },
        { term: 'Fibonacci Scale', definition: 'A sequence (1, 2, 3, 5, 8, 13, 21) used for story point values, with larger gaps at higher values reflecting greater estimation uncertainty.' },
        { term: 'T-Shirt Sizing', definition: 'An estimation technique using XS, S, M, L, XL labels as a quick, relative sizing approach.' },
        { term: 'Complexity', definition: 'How technically difficult or intricate the work is, independent of how much time it takes.' },
        { term: 'Spike', definition: 'A timeboxed research activity used when uncertainty is too high to estimate the actual story.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are story points hours?', answer: 'No. Story points are relative measures of size, not time. A 5-point story is roughly 2.5× the size of a 2-point story, but the hours depend on the team.' },
        { question: 'What if the team disagrees on the estimate?', answer: 'Use the tool as a starting point, then discuss differences. Disagreements often reveal hidden complexity or assumptions.' },
        { question: 'Should I size bugs with story points?', answer: 'Most teams do, treating bugs like any other work item. Some teams track bugs separately for velocity clarity.' },
        { question: 'When should I use a spike instead?', answer: 'When uncertainty is so high that you cannot estimate with any confidence. Timebox a spike to reduce uncertainty first.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Establish a reference story (e.g., "a 3-pointer is like X") so everyone calibrates from the same baseline.',
        'Estimate as a team, not individually — the discussion is more valuable than the number.',
        'If a story scores above 13, consider breaking it into smaller stories.',
        'Re-estimate stories if requirements change significantly after initial sizing.',
        'Use uncertainty scores to identify stories that need refinement or spikes.',
        'Track estimation accuracy over time to improve the team\'s calibration.'
      ]
    }
  },
  relatedTools: ['planning-poker', 'estimation-comparison', 'sprint-planner', 'user-story-builder'],
  seo: {
    metaTitle: 'Story Point Estimator — Size Stories by Complexity, Effort & Risk | UnTrackt Wiki',
    metaDescription: 'Estimate story points using complexity, effort, and uncertainty factors. Get consistent Fibonacci or T-shirt size estimates for agile sprint planning.',
    keywords: ['story point estimator', 'story points', 'agile estimation', 'fibonacci', 'complexity', 'effort', 'uncertainty']
  }
};
