export default {
  id: 'checklist-builder',
  title: 'Checklist Builder',
  description: 'Create reusable checklists — add items, group by category, and track completion for repeatable processes.',
  content: {
    whatIs: {
      heading: 'What is the Checklist Builder?',
      body: 'The Checklist Builder lets you create structured, reusable checklists for repeatable project processes. Add items, group them by category, set required vs. optional items, and track completion progress. Save templates for processes like deployment, onboarding, or sprint review to ensure consistency every time.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Checklists prevent human error in repeatable processes. When you do the same task repeatedly (deployments, reviews, launches), it is easy to forget a step. A saved checklist template ensures nothing is missed and provides an auditable completion record.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Create a new checklist with a name and description.',
        'Add checklist items grouped by category.',
        'Mark items as required or optional.',
        'Save as a template for future reuse.',
        'Use the template by creating an instance and checking off items.',
        'Track completion percentage and export if needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Checklist items with descriptions and categories.',
        'Required vs. optional item marking.',
        'Category grouping for organized checklists.',
        'Template save and reuse.',
        'Completion tracking with progress bar.',
        'Due date and assignee per item.',
        'Export as CSV or printable checklist.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Deployment checklists for software releases.',
        'Sprint review or retrospective preparation checklists.',
        'Onboarding checklists for new team members.',
        'Project kickoff checklists to ensure all setup steps are complete.',
        'Quality assurance checklists for testing processes.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Deploy Checklist', description: 'Run tests, update changelog, tag release, deploy to staging, smoke test, deploy to production, verify monitoring.' },
        { title: 'Sprint Review Prep', description: 'Update demo environment, prepare demo script, invite stakeholders, test demo data, prepare velocity chart.' },
        { title: 'New Hire Onboarding', description: 'Create accounts, assign onboarding buddy, schedule intro meetings, set up dev environment, share documentation.' },
        { title: 'Project Kickoff', description: 'Confirm scope, set up communication channels, define roles, schedule recurring meetings, create project plan.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Checklist', definition: 'An ordered list of items to be verified or completed, used to ensure thoroughness and consistency.' },
        { term: 'Template', definition: 'A saved checklist pattern that can be instantiated for repeated use across occurrences.' },
        { term: 'Instance', definition: 'A specific use of a checklist template, with its own completion state.' },
        { term: 'Required Item', definition: 'A checklist item that must be completed for the checklist to be considered done.' },
        { term: 'Completion Rate', definition: 'The percentage of checklist items that have been checked off.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can I modify a template after creating it?', answer: 'Yes. Update the template and new instances will use the updated version. Existing instances are not affected.' },
        { question: 'Can multiple people use the same checklist?', answer: 'Yes. Assign different items to different people and track overall completion together.' },
        { question: 'How detailed should checklist items be?', answer: 'Each item should be specific enough that anyone familiar with the process can complete it without ambiguity.' },
        { question: 'Should I date-stamp completed items?', answer: 'Yes, for audit and compliance purposes. The tool records when each item is checked.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Create templates for any process you repeat more than twice.',
        'Keep items specific and actionable — avoid vague items like "check everything."',
        'Order items in the sequence they should be performed.',
        'Review and update templates periodically based on lessons learned.',
        'Use categories to group related items for large checklists.',
        'Mark critical items as required to prevent accidental skipping.'
      ]
    }
  },
  relatedTools: ['action-item-tracker', 'project-status-report', 'milestone-tracker', 'task-breakdown-wbs'],
  seo: {
    metaTitle: 'Checklist Builder — Create Reusable Process Checklists | UnTrackt Wiki',
    metaDescription: 'Build structured, reusable checklists for repeatable processes. Group items by category, track completion, and save templates for consistent execution.',
    keywords: ['checklist builder', 'project checklist', 'process checklist', 'reusable checklist', 'checklist template', 'checklist tracker']
  }
};
