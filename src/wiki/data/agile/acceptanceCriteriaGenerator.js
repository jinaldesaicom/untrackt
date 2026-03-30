export default {
  id: 'acceptance-criteria-generator',
  title: 'Acceptance Criteria Generator',
  description: 'Generate Given/When/Then acceptance criteria for user stories to define clear, testable requirements.',
  content: {
    whatIs: {
      heading: 'What is the Acceptance Criteria Generator?',
      body: 'The Acceptance Criteria Generator helps you write clear, testable acceptance criteria using the Given/When/Then (Gherkin) format. Enter a user story and the tool guides you through defining preconditions (Given), actions (When), and expected outcomes (Then), producing structured criteria ready for development and QA.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Acceptance criteria are the contract between the Product Owner and the development team. Vague criteria lead to rework, scope disputes, and failed sprints. This tool enforces a consistent, testable format that removes ambiguity and serves as the basis for automated test scenarios.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter or paste the user story being refined.',
        'Define the Given (precondition or starting state).',
        'Define the When (action the user performs).',
        'Define the Then (expected outcome or result).',
        'Add additional And/But clauses as needed.',
        'Copy the formatted criteria for your backlog tool.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Structured Given/When/Then input fields.',
        'Multiple criteria per story with And/But extensions.',
        'Formatted output in Gherkin syntax for BDD compatibility.',
        'Copy as plain text, Markdown, or Gherkin feature file format.',
        'Story context field to keep criteria aligned with the story intent.',
        'Runs entirely in your browser — no data shared.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Defining acceptance criteria during backlog refinement.',
        'Creating Gherkin scenarios for behaviour-driven development (BDD).',
        'Clarifying edge cases and error handling before sprint commitment.',
        'Training new team members on how to write testable criteria.',
        'Reviewing story completeness before sprint planning.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Login Success', description: 'Given a registered user with valid credentials, When they submit the login form, Then they are redirected to the dashboard.' },
        { title: 'Login Failure', description: 'Given a user with an incorrect password, When they submit the login form, Then an error message "Invalid credentials" is displayed.' },
        { title: 'Empty Cart', description: 'Given an empty shopping cart, When the user clicks "Checkout", Then a message "Your cart is empty" is shown.' },
        { title: 'Search Results', description: 'Given a product catalog with 100 items, When the user searches for "blue shirt", Then all matching products are displayed within 2 seconds.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Given', definition: 'The precondition or context that must be true before the action takes place.' },
        { term: 'When', definition: 'The action or event performed by the user or system.' },
        { term: 'Then', definition: 'The expected outcome or result after the action is performed.' },
        { term: 'Gherkin', definition: 'A structured syntax for writing acceptance criteria in a human-readable, test-automatable format.' },
        { term: 'BDD (Behaviour-Driven Development)', definition: 'A development practice that uses Given/When/Then scenarios to drive feature implementation and testing.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many acceptance criteria does a story need?', answer: 'Enough to cover the happy path, key edge cases, and error scenarios — typically 3-7 criteria per story.' },
        { question: 'Can I use these directly in automated tests?', answer: 'Yes. The Gherkin format output is compatible with BDD frameworks like Cucumber, SpecFlow, and Behave.' },
        { question: 'Who should write acceptance criteria?', answer: 'The Product Owner defines what is expected, with input from developers (feasibility) and QA (testability).' },
        { question: 'What about non-functional requirements?', answer: 'Include them as Given/When/Then scenarios too. For example: "Given 1000 concurrent users, When they load the homepage, Then it responds within 3 seconds."' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Write criteria from the user\'s perspective, not the developer\'s.',
        'Keep each criterion focused on a single behavior.',
        'Include both positive (happy path) and negative (error) scenarios.',
        'Make outcomes measurable — "loads quickly" is vague, "responds within 2 seconds" is testable.',
        'Review criteria with the full team before committing the story to a sprint.',
        'Use And/But sparingly to keep individual criteria simple and focused.'
      ]
    }
  },
  relatedTools: ['user-story-builder', 'definition-of-done-checklist', 'definition-of-ready-checklist', 'epic-breakdown-assistant'],
  seo: {
    metaTitle: 'Acceptance Criteria Generator — Given/When/Then for User Stories | UnTrackt Wiki',
    metaDescription: 'Generate structured acceptance criteria using Given/When/Then (Gherkin) format. Create testable, unambiguous requirements for agile user stories.',
    keywords: ['acceptance criteria', 'given when then', 'gherkin', 'bdd', 'user story criteria', 'agile requirements']
  }
};
