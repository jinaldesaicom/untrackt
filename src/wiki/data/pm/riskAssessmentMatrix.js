export default {
  id: 'risk-assessment-matrix',
  title: 'Risk Assessment Matrix',
  description: 'Plot risks on a probability × impact grid to prioritize mitigation. Color-coded risk heat map.',
  content: {
    whatIs: {
      heading: 'What is the Risk Assessment Matrix?',
      body: 'The Risk Assessment Matrix plots project risks on a probability × impact grid, producing a color-coded heat map. Rate each risk\'s likelihood (1-5) and impact (1-5), and the matrix automatically classifies it as low (green), medium (yellow), high (orange), or critical (red). This visualization helps prioritize which risks need immediate attention.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Not all risks are equal. Without a systematic way to assess and prioritize them, teams either ignore risks or waste time on low-impact ones. The risk matrix provides a visual, quantitative framework for focusing mitigation efforts on the risks that matter most.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'List all identified project risks.',
        'Rate each risk\'s probability (1-5, rare to almost certain).',
        'Rate each risk\'s impact (1-5, negligible to catastrophic).',
        'View the risk heat map with color-coding.',
        'Add mitigation strategies for high and critical risks.',
        'Review and update ratings as the project progresses.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        '5×5 probability × impact grid.',
        'Color-coded heat map: green, yellow, orange, red.',
        'Risk score calculation (probability × impact).',
        'Risk list with descriptions and ratings.',
        'Mitigation plan field per risk.',
        'Owner and status tracking.',
        'Export as image or CSV.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Prioritizing project risks during planning.',
        'Communicating risk exposure to stakeholders.',
        'Conducting team risk assessment workshops.',
        'Monitoring risk levels throughout the project lifecycle.',
        'Compliance and audit risk assessments.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Critical Risk', description: 'Probability: 4, Impact: 5, Score: 20 (red) — key vendor may go bankrupt. Mitigation: identify backup vendor.' },
        { title: 'High Risk', description: 'Probability: 3, Impact: 4, Score: 12 (orange) — regulatory approval may be delayed. Mitigation: submit early.' },
        { title: 'Medium Risk', description: 'Probability: 2, Impact: 3, Score: 6 (yellow) — junior developer may need extra training time.' },
        { title: 'Low Risk', description: 'Probability: 1, Impact: 2, Score: 2 (green) — minor tool license price increase at renewal.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Risk Score', definition: 'The product of probability and impact ratings, used to rank and prioritize risks.' },
        { term: 'Probability', definition: 'The likelihood that a risk event will occur, rated on a defined scale.' },
        { term: 'Impact', definition: 'The severity of consequences if the risk event occurs, rated on a defined scale.' },
        { term: 'Risk Appetite', definition: 'The level of risk an organization is willing to accept before requiring mitigation.' },
        { term: 'Residual Risk', definition: 'The remaining risk after mitigation actions have been applied.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I rate probability and impact?', answer: 'Use a consistent scale (1-5) with defined criteria. For example, Probability 1 = <10% chance, 5 = >90% chance.' },
        { question: 'Should I assess risks individually or as a team?', answer: 'Team assessment is more accurate. Different perspectives catch different risks and produce more balanced ratings.' },
        { question: 'How often should the matrix be updated?', answer: 'Review monthly or when significant project changes occur. Risk profiles evolve throughout the project lifecycle.' },
        { question: 'What do I do with critical risks?', answer: 'Critical risks need immediate mitigation plans, assigned owners, and regular monitoring. Consider risk avoidance or transfer for the highest risks.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Define rating scales clearly before assessment to ensure consistency.',
        'Involve cross-functional team members in risk identification.',
        'Focus mitigation efforts on high and critical risks first.',
        'Reassess risks regularly — probability and impact change over time.',
        'Document the rationale behind each rating for future reference.',
        'Track residual risk after mitigation to confirm risk reduction.'
      ]
    }
  },
  relatedTools: ['raid-log', 'scope-change-log', 'project-health-dashboard', 'project-status-report'],
  seo: {
    metaTitle: 'Risk Assessment Matrix — Probability × Impact Grid | UnTrackt Wiki',
    metaDescription: 'Assess and prioritize project risks with a probability × impact matrix. Color-coded heat map with risk scores and mitigation tracking.',
    keywords: ['risk assessment matrix', 'risk matrix', 'probability impact', 'risk heat map', 'risk rating', 'risk prioritization']
  }
};
