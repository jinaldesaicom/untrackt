export default {
  id: 'definition-of-done-checklist',
  title: 'Definition of Done Checklist',
  description: 'Create and manage your team\'s Definition of Done criteria to ensure consistent quality standards.',
  content: {
    whatIs: {
      heading: 'What is the Definition of Done Checklist?',
      body: 'The Definition of Done (DoD) Checklist helps agile teams create and maintain a shared list of criteria that every user story must meet before it can be considered complete. This tool lets you define categories (code, testing, documentation, deployment), add specific checklist items to each, and use the checklist during sprint reviews to verify completeness.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Without a clear Definition of Done, "done" means different things to different people. One developer might consider a story complete when the code is written, while another includes testing and documentation. A shared DoD eliminates ambiguity, ensures consistent quality, and prevents half-finished work from being counted as completed.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Create categories for your DoD (e.g., Code, Testing, Documentation, Deployment).',
        'Add specific, verifiable criteria to each category.',
        'Use the checklist when reviewing each story before marking it as done.',
        'Check off each criterion as it is verified.',
        'Review and update the DoD periodically as the team matures.',
        'Export or share the DoD with the team and stakeholders.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Categorized checklist with custom categories and items.',
        'Per-story checklist usage with progress tracking.',
        'Template saving for reuse across sprints.',
        'Editable criteria that evolve with the team.',
        'Export as Markdown or text for documentation.',
        'Browser-based with persistent local storage.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Defining team quality standards during team formation.',
        'Verifying story completeness during sprint review.',
        'Onboarding new team members to quality expectations.',
        'Audit trail for compliance-sensitive projects.',
        'Retrospective discussions about whether the DoD needs updating.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Software Development DoD', description: 'Code reviewed, unit tests >80% coverage, no critical bugs, documentation updated, deployed to staging.' },
        { title: 'Design DoD', description: 'Designs reviewed by stakeholders, responsive breakpoints confirmed, accessibility audit passed, assets exported.' },
        { title: 'Content DoD', description: 'Content reviewed for accuracy, SEO-optimized, proofread, approved by legal, published in CMS.' },
        { title: 'Minimal DoD', description: 'Code compiles, tests pass, peer-reviewed — a starting point for new teams that grows over time.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Definition of Done (DoD)', definition: 'A shared team agreement listing the criteria every increment of work must meet to be considered complete.' },
        { term: 'Increment', definition: 'The sum of all completed backlog items during a sprint, meeting the Definition of Done.' },
        { term: 'Quality Gate', definition: 'A checkpoint that work must pass before proceeding to the next stage, embodied by the DoD.' },
        { term: 'Technical Debt', definition: 'Shortcuts taken during development that must be addressed later — a strong DoD prevents technical debt.' },
        { term: 'Transparency', definition: 'A Scrum pillar that the DoD supports by making quality standards visible to everyone.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Who decides the Definition of Done?', answer: 'The development team owns the DoD, with input from the Product Owner and stakeholders on quality expectations.' },
        { question: 'How often should we update the DoD?', answer: 'Review it at least once per quarter or whenever the team identifies a recurring quality issue during retrospectives.' },
        { question: 'What if a story does not meet the DoD?', answer: 'It is not done. Move it back to the backlog or carry it into the next sprint. Never mark incomplete work as done.' },
        { question: 'Is DoD the same as acceptance criteria?', answer: 'No. Acceptance criteria are specific to each story. The DoD applies to every story equally — it is the team\'s baseline quality standard.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with a minimal DoD and expand it as the team matures.',
        'Make every criterion verifiable — "code is good" is not verifiable, "code passes linting" is.',
        'Post the DoD visibly so it is always top of mind.',
        'Treat DoD violations seriously — lowering the bar erodes quality over time.',
        'Use retrospectives to discuss whether criteria should be added or removed.',
        'Align the DoD with organizational compliance requirements where applicable.'
      ]
    }
  },
  relatedTools: ['definition-of-ready-checklist', 'acceptance-criteria-generator', 'checklist-builder', 'retrospective-board'],
  seo: {
    metaTitle: 'Definition of Done Checklist — Team Quality Standards | UnTrackt Wiki',
    metaDescription: 'Create and manage your agile team\'s Definition of Done checklist. Ensure consistent quality with categorized, verifiable criteria for every story.',
    keywords: ['definition of done', 'dod', 'agile checklist', 'quality standards', 'done criteria', 'scrum done']
  }
};
