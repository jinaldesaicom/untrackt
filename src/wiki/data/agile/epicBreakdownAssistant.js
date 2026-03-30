export default {
  id: 'epic-breakdown-assistant',
  title: 'Epic Breakdown Assistant',
  description: 'Break down epics into manageable user stories with effort estimates for effective backlog management.',
  content: {
    whatIs: {
      heading: 'What is the Epic Breakdown Assistant?',
      body: 'The Epic Breakdown Assistant helps you decompose large epics into smaller, actionable user stories. Enter an epic description and use the guided workflow to identify functional slices, define individual stories, assign preliminary effort estimates, and create a structured backlog ready for refinement and sprint planning.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Epics that are not broken down remain vague, hard to estimate, and impossible to deliver in a single sprint. This tool provides a structured approach to decomposition, ensuring no functional area is missed and that each resulting story is small enough to be independently deliverable, estimable, and testable.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the epic title and description.',
        'Identify the major functional areas or themes within the epic.',
        'Break each area into individual user stories.',
        'Add preliminary story point estimates to each story.',
        'Review the breakdown for completeness and gaps.',
        'Export the stories for import into your backlog tool.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Guided epic decomposition with theme grouping.',
        'User story generation in As a/I want/So that format.',
        'Preliminary effort estimation for each story.',
        'Total effort roll-up to size the epic.',
        'Gap analysis to identify missing functionality.',
        'Export as text, Markdown, or JSON.',
        'All processing happens locally in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Breaking down new features into sprint-sized stories during refinement.',
        'Estimating the total scope of an epic for roadmap planning.',
        'Ensuring comprehensive coverage of all functional aspects of a feature.',
        'Preparing a release backlog from a list of high-level epics.',
        'Onboarding product owners on how to decompose large requirements.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'User Registration Epic', description: 'Breaks into: signup form UI, email validation, password strength check, email verification, welcome email, profile creation — 6 stories totaling ~25 points.' },
        { title: 'Payment Integration', description: 'Decomposes into: payment form, card validation, payment processor integration, error handling, receipt generation, refund flow — 6 stories totaling ~40 points.' },
        { title: 'Dashboard Redesign', description: 'Splits by widget: summary cards, charts, recent activity, notifications, filters, responsive layout — 6 stories at ~30 points total.' },
        { title: 'Search Feature', description: 'Breaks into: search input, results display, filtering, sorting, pagination, no-results state — 6 stories at ~20 points.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Epic', definition: 'A large body of work that can be broken down into multiple smaller user stories, typically spanning multiple sprints.' },
        { term: 'Decomposition', definition: 'The process of breaking a large work item into smaller, more manageable pieces.' },
        { term: 'Vertical Slice', definition: 'A story that cuts through all layers (UI, logic, data) to deliver a thin but complete piece of functionality.' },
        { term: 'Theme', definition: 'A grouping of related stories within an epic, organized by functional area or user workflow.' },
        { term: 'Story Map', definition: 'A visual arrangement of stories showing user activities across the top and story details underneath.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How small should stories be?', answer: 'Small enough to be completed in 1-3 days. If a story takes more than half a sprint, it should be broken down further.' },
        { question: 'How do I know the breakdown is complete?', answer: 'Walk through the user journey for the epic. If every step has a corresponding story and edge case coverage, the breakdown is likely complete.' },
        { question: 'Should I estimate during breakdown or after?', answer: 'Add preliminary estimates during breakdown to size the epic. Refine them during formal backlog grooming with the team.' },
        { question: 'What if one story depends on another?', answer: 'Note the dependency, but try to minimize them. Ideally each story is independently deliverable.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Slice vertically (end-to-end) rather than horizontally (by layer).',
        'Ensure each story delivers user-visible value, not just a technical component.',
        'Start with the happy path, then add stories for error handling and edge cases.',
        'Use the INVEST checklist to validate each resulting story.',
        'Review the total estimate against the epic\'s expected size for sanity checking.',
        'Involve the whole team in decomposition to catch gaps early.'
      ]
    }
  },
  relatedTools: ['user-story-builder', 'story-mapping-tool', 'story-point-estimator', 'sprint-planner'],
  seo: {
    metaTitle: 'Epic Breakdown Assistant — Decompose Epics into Stories | UnTrackt Wiki',
    metaDescription: 'Break down large epics into manageable user stories with effort estimates. Ensure comprehensive coverage for backlog refinement and sprint planning.',
    keywords: ['epic breakdown', 'decompose epic', 'user stories', 'backlog refinement', 'agile decomposition', 'story splitting']
  }
};
