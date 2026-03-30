export default {
  id: 'retrospective-board',
  title: 'Retrospective Board',
  description: 'Run sprint retrospectives with customizable column formats to capture what went well, what to improve, and action items.',
  content: {
    whatIs: {
      heading: 'What is the Retrospective Board?',
      body: 'The Retrospective Board is a digital facilitation tool for sprint retrospectives. It provides customizable column layouts (e.g., What Went Well / What Didn\'t / Action Items, or Start / Stop / Continue) where team members add cards, vote on the most important items, and define action items with owners. Everything runs in your browser with no external server.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Retrospectives are the engine of continuous improvement, but they lose effectiveness when they are unstructured or when action items are not tracked. This tool provides structure, anonymity options for honest feedback, voting to surface the highest-impact items, and action item tracking to ensure improvements actually happen.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Choose a retrospective format (e.g., Went Well / To Improve / Action Items).',
        'Team members add cards to each column anonymously or with names.',
        'Group similar cards together to identify themes.',
        'Vote on the most important items to discuss.',
        'Discuss the top-voted items and define action items with owners.',
        'Export the board and action items for follow-up.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Multiple built-in formats: Went Well / To Improve, Start / Stop / Continue, 4Ls, Mad / Sad / Glad.',
        'Custom column support for creating your own format.',
        'Card voting to prioritize discussion topics.',
        'Action item creation with owner assignment.',
        'Card grouping to consolidate related feedback.',
        'Export board as text, Markdown, or image.',
        'Privacy-first — all data stays in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Running the sprint retrospective ceremony at the end of each sprint.',
        'Facilitating team health checks and process reviews.',
        'Collecting anonymous feedback on sensitive process issues.',
        'Tracking whether retrospective action items are completed sprint over sprint.',
        'Running project post-mortems or lessons-learned sessions.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Went Well / To Improve', description: 'Team adds 12 cards to Went Well and 8 to To Improve. Voting reveals "code review speed" as the top improvement area.' },
        { title: 'Start / Stop / Continue', description: 'Team decides to Start pair programming, Stop skipping standups, and Continue the new testing approach.' },
        { title: 'Action Item Follow-Up', description: 'Last sprint\'s action item "automate deployment" was completed — board shows it checked off with the owner\'s name.' },
        { title: 'Anonymous Feedback', description: 'In anonymous mode, a sensitive concern about unrealistic deadlines surfaces that would not have been raised otherwise.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Retrospective', definition: 'A ceremony at the end of each sprint where the team reflects on their process and identifies improvements.' },
        { term: 'Action Item', definition: 'A specific, assignable task that comes out of the retrospective, aimed at implementing an improvement.' },
        { term: 'Dot Voting', definition: 'A voting technique where each participant gets a limited number of votes to allocate to the items they consider most important.' },
        { term: 'Psychological Safety', definition: 'An environment where team members feel safe to speak honestly without fear of negative consequences.' },
        { term: 'Continuous Improvement', definition: 'The ongoing effort to improve processes, practices, and outcomes based on regular reflection.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How long should a retrospective last?', answer: '45-90 minutes for a 2-week sprint. Shorter sprints deserve shorter retros.' },
        { question: 'Should comments be anonymous?', answer: 'Anonymous mode encourages honest feedback, especially in teams still building trust. Use named mode when the team is comfortable.' },
        { question: 'How many action items should we take away?', answer: 'Limit to 1-3 action items per retrospective. Too many leads to nothing getting done.' },
        { question: 'What if the same issues keep coming up?', answer: 'This signals the action items are not being completed or do not address the root cause. Discuss why and escalate if needed.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Review the previous retro\'s action items first to ensure follow-through.',
        'Vary the format occasionally to keep retrospectives fresh.',
        'Keep action items small and achievable within one sprint.',
        'Assign every action item a specific owner — shared ownership means no ownership.',
        'Create psychological safety by starting with positives (what went well).',
        'Timebox each phase (brainstorm, group, vote, discuss) to keep the meeting focused.'
      ]
    }
  },
  relatedTools: ['daily-standup-template', 'ceremony-timer', 'impediment-log', 'working-agreement-builder'],
  seo: {
    metaTitle: 'Retrospective Board — Run Agile Retrospectives | UnTrackt Wiki',
    metaDescription: 'Run sprint retrospectives with customizable formats, voting, and action item tracking. Went Well / To Improve, Start / Stop / Continue, and more.',
    keywords: ['retrospective board', 'sprint retrospective', 'agile retro', 'continuous improvement', 'action items', 'team feedback']
  }
};
