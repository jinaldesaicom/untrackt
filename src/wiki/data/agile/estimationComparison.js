export default {
  id: 'estimation-comparison',
  title: 'Estimation Comparison Tool',
  description: 'Compare story point estimates vs actual effort to identify patterns and improve estimation accuracy over time.',
  content: {
    whatIs: {
      heading: 'What is the Estimation Comparison Tool?',
      body: 'The Estimation Comparison Tool tracks estimated story points alongside actual effort for completed stories, revealing patterns of over- or under-estimation. By analyzing the gap between predicted and actual size, teams can calibrate their estimation process and identify which types of stories are consistently misjudged.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Teams that never review their estimation accuracy keep repeating the same mistakes. This tool provides a feedback loop by showing how estimates compare to reality, which stories types are hardest to size, and whether the team is improving over time. Better estimation leads to more predictable sprints and higher stakeholder trust.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter completed stories with their original estimate and actual effort.',
        'View the comparison chart showing estimate vs. actual side by side.',
        'Check the accuracy ratio and bias direction (over vs. under-estimation).',
        'Filter by story type, sprint, or team member to find patterns.',
        'Use insights to adjust your estimation approach in future sprints.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Side-by-side comparison of estimated vs. actual effort.',
        'Accuracy ratio and bias indicator (systematic over/under-estimation).',
        'Trend chart showing estimation accuracy improving over sprints.',
        'Filtering by story type, category, or sprint.',
        'Summary statistics with mean error and standard deviation.',
        'Browser-based with no data shared externally.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Sprint retrospective discussions about estimation quality.',
        'Identifying story types the team consistently misjudges.',
        'Tracking whether estimation workshops or calibration sessions are working.',
        'Providing data to support adjusting the team\'s estimation approach.',
        'Building confidence in forecasts by demonstrating estimation accuracy trends.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Under-Estimation Pattern', description: 'API integration stories are consistently 1.5× the estimate, revealing hidden complexity in third-party work.' },
        { title: 'Improving Accuracy', description: 'Over 10 sprints, the average estimate error dropped from 40% to 15% after introducing reference stories.' },
        { title: 'Bug Size Bias', description: 'Bugs estimated at 1 point frequently take 3 points of effort — team decides to minimum-size bugs at 2.' },
        { title: 'Team Calibration', description: 'After a calibration session, variance between estimates and actuals tightens noticeably in the next 3 sprints.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Estimation Accuracy', definition: 'How close the original story point estimate is to the actual effort required to complete the story.' },
        { term: 'Bias', definition: 'A systematic tendency to consistently over- or under-estimate, indicating a calibration issue rather than random error.' },
        { term: 'Accuracy Ratio', definition: 'The ratio of estimated to actual effort. A ratio of 1.0 means perfect accuracy; below 1.0 means under-estimation.' },
        { term: 'Mean Absolute Error', definition: 'The average absolute difference between estimated and actual values across all stories.' },
        { term: 'Calibration', definition: 'The process of adjusting estimation practices based on historical accuracy data to improve future estimates.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I measure "actual effort" for comparison?', answer: 'Common approaches include tracking hours spent or having the team retrospectively assign a "how big was this really" point value after completion.' },
        { question: 'Is some estimation error normal?', answer: 'Yes. Perfect accuracy is unrealistic. The goal is to reduce systematic bias and keep variance within an acceptable range (±20-30%).' },
        { question: 'Should I punish under-estimation?', answer: 'Never. Estimation is a learning process. Use the data to improve, not to assign blame.' },
        { question: 'How often should I review estimation accuracy?', answer: 'At least quarterly, or whenever the team suspects their estimates are off. Including it in retrospectives keeps it top of mind.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Record estimate vs. actual for every story — incomplete data gives misleading results.',
        'Look for patterns by story type rather than judging individual stories.',
        'Use insights to refine your reference stories and estimation baselines.',
        'Share accuracy trends with the team to build a culture of continuous improvement.',
        'Focus on reducing systematic bias first, then work on reducing variance.',
        'Celebrate improved accuracy to reinforce good estimation habits.'
      ]
    }
  },
  relatedTools: ['story-point-estimator', 'planning-poker', 'velocity-calculator', 'sprint-planner'],
  seo: {
    metaTitle: 'Estimation Comparison Tool — Track Agile Estimation Accuracy | UnTrackt Wiki',
    metaDescription: 'Compare story point estimates vs actual effort to improve agile estimation accuracy. Identify bias patterns and track calibration over time.',
    keywords: ['estimation comparison', 'estimation accuracy', 'story points', 'estimate vs actual', 'agile estimation', 'calibration']
  }
};
