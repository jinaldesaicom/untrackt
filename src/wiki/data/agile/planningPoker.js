export default {
  id: 'planning-poker',
  title: 'Planning Poker',
  description: 'Run planning poker sessions with customizable card decks for collaborative agile estimation.',
  content: {
    whatIs: {
      heading: 'What is Planning Poker?',
      body: 'Planning Poker is a consensus-based estimation technique where each team member privately selects a card representing their estimate for a user story, then all cards are revealed simultaneously. This tool provides a digital card deck with Fibonacci values, allows multiple rounds of voting, and highlights when estimates diverge so the team can discuss and converge on a shared understanding.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Verbal estimation is susceptible to anchoring bias — the first person to speak influences everyone else. Planning Poker forces simultaneous reveals, ensuring independent judgment. This digital version eliminates the need for physical cards and makes it easy to capture results for backlog grooming sessions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the user story to be estimated.',
        'Each participant selects a card value from the deck.',
        'Click "Reveal" to show all selections simultaneously.',
        'If estimates diverge, discuss differences and re-vote.',
        'Record the agreed estimate once the team converges.',
        'Move to the next story and repeat.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Fibonacci deck (0, 1, 2, 3, 5, 8, 13, 21, ?, ☕).',
        'Customizable card values for different scales.',
        'Simultaneous card reveal to prevent anchoring bias.',
        'Divergence indicator highlighting large estimate gaps.',
        'Round history showing how estimates evolved through discussion.',
        'Browser-based — no login or account required.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Backlog refinement sessions for sizing upcoming stories.',
        'Sprint planning to confirm estimates before committing to work.',
        'Remote team estimation when physical cards are not practical.',
        'Quick sizing of a batch of stories during a grooming marathon.',
        'Teaching new team members the planning poker technique.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Consensus on First Round', description: 'All five team members pick 5 — the story is a 5 and you move on.' },
        { title: 'Wide Divergence', description: 'Votes of 2, 3, 8, 3, 13 — the 2 and the 13 discuss their reasoning, revealing a missed dependency, and the re-vote converges on 8.' },
        { title: 'Coffee Card', description: 'One member plays the ☕ card to signal the estimation session has been too long and the team needs a break.' },
        { title: 'Question Card', description: 'A vote of "?" indicates the estimator needs more information before they can size the story.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Planning Poker', definition: 'An agile estimation technique using simultaneous card reveals to produce unbiased, consensus-driven estimates.' },
        { term: 'Anchoring Bias', definition: 'A cognitive bias where the first estimate spoken influences all subsequent estimates from other team members.' },
        { term: 'Fibonacci Sequence', definition: 'The number series 1, 2, 3, 5, 8, 13, 21 used for card values, reflecting that larger items have more estimation uncertainty.' },
        { term: 'Convergence', definition: 'The process of the team reaching agreement on a single estimate through discussion after divergent votes.' },
        { term: 'Facilitator', definition: 'The person (often the Scrum Master) who reads the story, manages the timer, and guides discussion between rounds.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many rounds should we do?', answer: 'Aim for consensus in 2-3 rounds. If the team cannot converge after 3 rounds, take the majority vote or split the story for further refinement.' },
        { question: 'Can I use custom scales?', answer: 'Yes. The tool supports Fibonacci, T-shirt sizes, or any custom numeric scale you define.' },
        { question: 'What does the "?" card mean?', answer: 'It signals the voter needs more information or clarification before they can estimate.' },
        { question: 'Is this for co-located or remote teams?', answer: 'Both. Each person opens the tool in their own browser. The facilitator calls "reveal" and everyone shares their screen or reads out the value.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always read the full story and acceptance criteria before voting.',
        'Let the highest and lowest voters explain their reasoning before re-voting.',
        'Timebox each story to 5 minutes — skip or spike stories that take longer.',
        'Use the "?" card honestly rather than guessing under pressure.',
        'Keep the session energized — take breaks if attention drops.',
        'Record the agreed estimate and any key assumptions immediately.'
      ]
    }
  },
  relatedTools: ['story-point-estimator', 'estimation-comparison', 'sprint-planner', 'user-story-builder'],
  seo: {
    metaTitle: 'Planning Poker — Collaborative Agile Estimation Cards | UnTrackt Wiki',
    metaDescription: 'Run digital planning poker sessions with Fibonacci card decks. Eliminate anchoring bias with simultaneous reveals for better agile estimation.',
    keywords: ['planning poker', 'agile estimation', 'fibonacci cards', 'team estimation', 'scrum poker', 'consensus estimation']
  }
};
