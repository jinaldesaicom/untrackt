export default {
  id: 'definition-of-ready-checklist',
  title: 'Definition of Ready Checklist',
  description: 'Ensure stories are ready for sprint with a Definition of Ready checklist covering clarity, estimation, and dependencies.',
  content: {
    whatIs: {
      heading: 'What is the Definition of Ready Checklist?',
      body: 'The Definition of Ready (DoR) Checklist defines the criteria a user story must meet before it can be pulled into a sprint. It ensures stories have clear requirements, acceptance criteria, estimates, and no unresolved dependencies — preventing the team from starting work on incomplete or ambiguous items.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Pulling unclear stories into a sprint is a leading cause of mid-sprint rework and missed commitments. A DoR catches problems before sprint planning, not after. This tool provides a structured checklist that the team can apply during backlog refinement to ensure every story is genuinely ready for development.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Define your team\'s readiness criteria (e.g., story written, estimated, AC defined).',
        'During refinement, check each story against the DoR.',
        'Mark criteria as met or not met.',
        'Stories that fail the DoR go back for further refinement.',
        'Only stories passing all criteria are eligible for sprint planning.',
        'Review and update the DoR periodically based on experience.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Customizable readiness criteria with categories.',
        'Per-story readiness assessment with pass/fail tracking.',
        'Visual indicator showing readiness status.',
        'Templates for different story types.',
        'Export checklist for team documentation.',
        'Local storage for persistent checklists.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Validating stories during backlog refinement sessions.',
        'Preventing unclear stories from entering sprint planning.',
        'Standardizing quality expectations for Product Owner story writing.',
        'Onboarding new Product Owners to the team\'s expectations.',
        'Retrospective discussions about refinement effectiveness.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard DoR', description: 'Story written in user story format, acceptance criteria defined, estimated in points, no open dependencies, UX mockup attached.' },
        { title: 'API Story DoR', description: 'Adds: API contract/spec available, test data identified, error response codes defined.' },
        { title: 'Design Story DoR', description: 'Requirements gathered, user research completed, brand guidelines reviewed, accessibility requirements noted.' },
        { title: 'Failing Story', description: 'Story "Implement notifications" fails DoR because acceptance criteria are missing and the notification channel is undefined.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Definition of Ready (DoR)', definition: 'A team agreement listing criteria that stories must meet before they can be accepted into a sprint.' },
        { term: 'Backlog Refinement', definition: 'The ongoing process of reviewing, clarifying, and estimating backlog items, often where DoR is applied.' },
        { term: 'Dependencies', definition: 'External requirements or deliverables from other teams that must be resolved before work can begin.' },
        { term: 'Estimable', definition: 'A story is estimable when the team has enough information to assign a relative size or effort.' },
        { term: 'INVEST', definition: 'Criteria for good stories: Independent, Negotiable, Valuable, Estimable, Small, Testable.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is a DoR mandatory in Scrum?', answer: 'The Scrum Guide does not mandate it, but most experienced teams use one because it significantly improves sprint predictability.' },
        { question: 'How is DoR different from DoD?', answer: 'DoR defines when a story can enter a sprint (input quality). DoD defines when a story is complete (output quality).' },
        { question: 'What if an urgent story does not meet the DoR?', answer: 'The team can choose to accept it with acknowledged risk, but should track the outcome for retrospective discussion.' },
        { question: 'Should the DoR be strict or flexible?', answer: 'Start strict to build good habits, then relax criteria once the team consistently writes high-quality stories.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Apply the DoR during refinement, not during sprint planning — it is too late by then.',
        'Keep the DoR concise — 5-8 criteria is usually sufficient.',
        'Make the Product Owner a partner in defining the DoR, not a victim of it.',
        'Track what percentage of stories meet the DoR to measure refinement quality.',
        'Adjust the DoR based on the types of work your team handles.',
        'Use DoR failures as learning opportunities, not blame exercises.'
      ]
    }
  },
  relatedTools: ['definition-of-done-checklist', 'user-story-builder', 'acceptance-criteria-generator', 'checklist-builder'],
  seo: {
    metaTitle: 'Definition of Ready Checklist — Story Readiness for Sprint | UnTrackt Wiki',
    metaDescription: 'Define and apply a Definition of Ready checklist to ensure user stories are clear, estimated, and free of blockers before sprint planning.',
    keywords: ['definition of ready', 'dor', 'story readiness', 'backlog refinement', 'agile checklist', 'sprint readiness']
  }
};
