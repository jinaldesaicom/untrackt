export default {
  id: 'user-story-builder',
  title: 'User Story Builder',
  description: 'Build user stories with the As a/I want/So that format and generate acceptance criteria.',
  content: {
    whatIs: {
      heading: 'What is the User Story Builder?',
      body: 'The User Story Builder helps you write well-structured user stories using the standard "As a [role], I want [capability], so that [benefit]" format. It guides you through defining the role, the desired functionality, and the business value, then helps generate acceptance criteria to define what "done" looks like.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Poorly written user stories lead to misunderstandings, rework, and scope creep. This tool enforces a proven structure that captures who needs the feature, what they need, and why it matters. By building stories with clear acceptance criteria from the start, teams reduce ambiguity and improve delivery quality.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select or enter the user role (e.g., "registered user", "admin").',
        'Describe what the user wants to accomplish.',
        'Explain the business value or benefit.',
        'Add acceptance criteria using the Given/When/Then format.',
        'Review the complete story and copy or export it.',
        'Repeat for each story in your backlog.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Guided "As a / I want / So that" story format.',
        'Acceptance criteria builder with Given/When/Then templates.',
        'Story preview with formatted output.',
        'Copy story to clipboard in plain text or Markdown.',
        'Saved roles for quick re-use across stories.',
        'INVEST checklist to validate story quality.',
        'Browser-based with no external data sharing.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Writing user stories during backlog refinement.',
        'Onboarding new product owners or business analysts to story writing.',
        'Quickly drafting stories before a planning session.',
        'Ensuring every story has clear acceptance criteria.',
        'Documenting requirements in a consistent, team-readable format.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Login Story', description: 'As a registered user, I want to log in with my email and password, so that I can access my account. AC: Given valid credentials, when I click login, then I am redirected to my dashboard.' },
        { title: 'Search Story', description: 'As a shopper, I want to search products by name, so that I can find items quickly. AC: Given a search term, when I press Enter, then matching products appear within 2 seconds.' },
        { title: 'Admin Story', description: 'As an admin, I want to deactivate a user account, so that I can enforce our terms of service. AC: Given a user ID, when I click deactivate, then the user can no longer log in.' },
        { title: 'Notification Story', description: 'As a team lead, I want email notifications for overdue tasks, so that I can follow up proactively.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'User Story', definition: 'A short description of a feature from the end user\'s perspective, following the format: As a [role], I want [goal], so that [benefit].' },
        { term: 'Acceptance Criteria', definition: 'Specific conditions that must be met for a story to be considered complete, often written in Given/When/Then format.' },
        { term: 'INVEST', definition: 'An acronym for good story qualities: Independent, Negotiable, Valuable, Estimable, Small, and Testable.' },
        { term: 'Persona', definition: 'A fictional representation of a user type with specific goals, needs, and behaviors.' },
        { term: 'Definition of Done', definition: 'The team\'s shared criteria for when any story is considered fully complete.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is the "As a / I want / So that" format required?', answer: 'It is not mandatory, but it is the most widely adopted format because it captures role, intent, and value in a concise structure.' },
        { question: 'How many acceptance criteria should a story have?', answer: 'Typically 3-7. Fewer may indicate the story is under-specified; more may indicate it should be split.' },
        { question: 'Who writes user stories?', answer: 'Usually the Product Owner, but the whole team should collaborate on refining them during backlog grooming.' },
        { question: 'What if the story is too big?', answer: 'If the story cannot be completed in a single sprint, split it into smaller stories that each deliver testable value.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start every story with the "So that" (benefit) to ensure it delivers real value.',
        'Use the INVEST criteria to validate story quality before committing to a sprint.',
        'Write acceptance criteria before estimation — they clarify scope.',
        'Keep stories small enough to complete in 1-3 days of work.',
        'Involve developers in story refinement to catch technical ambiguity early.',
        'Use consistent role names across all stories for clarity.'
      ]
    }
  },
  relatedTools: ['acceptance-criteria-generator', 'epic-breakdown-assistant', 'story-mapping-tool', 'story-point-estimator'],
  seo: {
    metaTitle: 'User Story Builder — Write Stories with Acceptance Criteria | UnTrackt Wiki',
    metaDescription: 'Build structured user stories with the As a/I want/So that format. Generate Given/When/Then acceptance criteria for clear, testable requirements.',
    keywords: ['user story builder', 'user stories', 'acceptance criteria', 'as a i want so that', 'agile requirements', 'given when then']
  }
};
