export default {
  id: 'decision-matrix',
  title: 'Decision Matrix',
  description: 'Make better decisions by comparing options against weighted criteria with a structured scoring system.',
  content: {
    whatIs: {
      heading: 'What is the Decision Matrix?',
      body: 'The Decision Matrix is a structured decision-making tool that helps you evaluate multiple options against a set of weighted criteria. By assigning scores to each option for every criterion and factoring in how important each criterion is, you get an objective, data-driven ranking that cuts through analysis paralysis and gut-feeling bias.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Complex decisions with multiple factors are hard to evaluate in your head. A decision matrix makes the process transparent and systematic. It forces you to define what matters, weigh each factor, and score objectively. This reduces bias, improves consistency, and gives you a defensible rationale for your choice--especially valuable when stakeholders need to understand your reasoning.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Define the decision you need to make and list all available options.',
        'Identify the criteria that matter for this decision (e.g., cost, quality, time).',
        'Assign a weight to each criterion based on its relative importance (e.g., 1-5 or percentage).',
        'Score each option against every criterion on a consistent scale (e.g., 1-10).',
        'The tool calculates weighted scores automatically and ranks the options.',
        'Review the results and use the ranking to guide your final decision.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Add unlimited options and criteria for comparison',
        'Adjustable weight for each criterion',
        'Customizable scoring scale',
        'Automatic weighted score calculation',
        'Visual ranking of options from best to worst',
        'Color-coded scores for quick visual comparison',
        'Export results for sharing or documentation'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Choosing between job offers based on salary, culture, growth, and location',
        'Selecting a software tool or vendor for your team',
        'Deciding on a new apartment by comparing rent, commute, size, and amenities',
        'Evaluating product features to include in the next release',
        'Comparing investment options based on risk, return, and liquidity',
        'Choosing a university by weighing academics, cost, location, and campus life'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Job Offer Comparison', description: 'Compare three job offers using criteria like salary (weight 5), work-life balance (4), career growth (4), commute (3), and benefits (3).' },
        { title: 'Software Selection', description: 'Evaluate CRM tools on price, features, ease of use, integrations, and customer support with weighted importance.' },
        { title: 'Apartment Hunting', description: 'Score apartments on rent, neighborhood safety, commute time, size, and natural light to find the best fit.' },
        { title: 'Feature Prioritization', description: 'Rank product features by customer demand (weight 5), development effort (4), revenue impact (5), and strategic alignment (3).' },
        { title: 'Hiring Decision', description: 'Compare candidates based on technical skills, cultural fit, experience, communication, and salary expectations.' },
        { title: 'Travel Destination', description: 'Choose a vacation spot by scoring options on cost, weather, activities, travel time, and food scene.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Option', definition: 'One of the alternatives being compared in the decision, such as a product, service, or course of action.' },
        { term: 'Criterion', definition: 'A factor or attribute used to evaluate and compare options, such as cost, quality, or speed.' },
        { term: 'Weight', definition: 'A numerical value representing the relative importance of a criterion compared to others.' },
        { term: 'Score', definition: 'A rating given to an option for a specific criterion, typically on a numeric scale.' },
        { term: 'Weighted Score', definition: 'The product of an option\'s score and the criterion\'s weight, reflecting the adjusted value of that rating.' },
        { term: 'Total Score', definition: 'The sum of all weighted scores for an option, used to rank it against alternatives.' },
        { term: 'Analysis Paralysis', definition: 'The inability to make a decision due to overthinking or having too many options, which a decision matrix helps overcome.' },
        { term: 'Scoring Scale', definition: 'The range used for scoring options (e.g., 1-5, 1-10), which should be consistent across all evaluations.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I decide what weights to use?', answer: 'Think about which criteria matter most for your decision. Rank them by importance and assign higher weights to the most critical factors.' },
        { question: 'What scoring scale should I use?', answer: 'A 1-10 scale offers good granularity. A 1-5 scale works well for simpler decisions. Just be consistent across all options.' },
        { question: 'What if two options tie?', answer: 'Look at the scores for your highest-weighted criteria. The option that performs better on the most important factors is usually the better choice.' },
        { question: 'How many criteria should I include?', answer: 'Aim for 4-8 criteria. Too few may miss important factors; too many can make the process tedious without adding clarity.' },
        { question: 'Can I use this for group decisions?', answer: 'Yes. Have each participant score independently, then average the scores for a fair, collective evaluation.' },
        { question: 'Should I always follow the highest score?', answer: 'The matrix is a guide, not a mandate. Use it to inform your decision, but factor in intuition and context that numbers may not capture.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Define criteria before looking at options to avoid biasing your evaluation toward a preferred choice.',
        'Use a consistent scoring scale and define what each score level means (e.g., 1 = poor, 10 = excellent).',
        'Limit criteria to the factors that genuinely differentiate the options.',
        'Score one criterion at a time across all options for more consistent comparisons.',
        'Be honest in scoring--the tool is only useful if the inputs are truthful.',
        'For group decisions, have individuals score independently before discussing to avoid groupthink.',
        'Revisit your weights if the result feels wrong--you may have misjudged the importance of a criterion.',
        'Document your rationale for scores so you can reference it later or explain your decision.'
      ]
    }
  },
  relatedTools: ['eisenhower-matrix', 'smart-goal-setter', 'project-scope-definer', 'okr-planner'],
  seo: {
    metaTitle: 'Decision Matrix - Weighted Scoring for Better Decisions | Untrackt',
    metaDescription: 'Compare options objectively with a weighted decision matrix. Score criteria, calculate rankings, and make confident, data-driven decisions.',
    keywords: ['decision matrix', 'weighted scoring', 'decision-making tool', 'comparison matrix', 'criteria comparison', 'rational decision', 'evaluation tool']
  }
};
