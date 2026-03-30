export default {
  id: 'project-scope-definer',
  title: 'Project Scope Definer',
  description: 'Define clear project boundaries using MoSCoW prioritization, deliverables, and exclusions to prevent scope creep.',
  content: {
    whatIs: {
      heading: 'What is the Project Scope Definer?',
      body: 'The Project Scope Definer is a planning tool that helps you establish clear boundaries for any project. Using the MoSCoW method (Must have, Should have, Could have, Won\'t have), it guides you through defining what is included, what is excluded, key deliverables, success criteria, and constraints--creating a scope document that prevents scope creep and miscommunication.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Scope creep is the number one reason projects fail. Without a clear scope, requirements expand continuously, deadlines slip, and budgets are blown. The Project Management Institute reports that 52% of projects experience scope creep. A well-defined scope sets expectations, provides a reference for decision-making, and gives you the power to say "that\'s out of scope" with confidence.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the project name, description, and objective.',
        'List all potential features, tasks, and deliverables.',
        'Categorize each item using MoSCoW: Must have, Should have, Could have, Won\'t have.',
        'Define explicit exclusions--things the project will NOT include.',
        'Set success criteria: how will you know the project is complete?',
        'Document constraints like budget, timeline, and resource limitations.',
        'Export the scope document for stakeholder review and approval.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'MoSCoW prioritization framework for requirements',
        'Deliverables list with clear descriptions',
        'Exclusions section for out-of-scope items',
        'Success criteria definition',
        'Constraints and assumptions documentation',
        'Stakeholder sign-off checklist',
        'Export as a shareable scope document'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Defining the scope of a software development project',
        'Setting boundaries for a website redesign or marketing campaign',
        'Scoping a home renovation or event planning project',
        'Clarifying the scope of freelance work before starting a contract',
        'Planning an academic research project or thesis',
        'Scoping a business process improvement initiative'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Website Redesign', description: 'Must have: responsive design, new homepage. Should have: blog section. Could have: dark mode. Won\'t have: e-commerce. Exclusion: mobile app.' },
        { title: 'Product Launch', description: 'Must have: landing page, pricing, sign-up flow. Should have: demo video. Could have: referral program. Won\'t have: enterprise features in V1.' },
        { title: 'Office Move', description: 'Must have: new lease signed, furniture moved. Should have: new IT setup by day 1. Could have: custom signage. Won\'t have: full interior redesign.' },
        { title: 'Freelance Contract', description: 'Must have: 5 page designs. Should have: 2 revision rounds. Could have: social media templates. Won\'t have: ongoing maintenance. Exclusion: copywriting.' },
        { title: 'Research Paper', description: 'Must have: literature review, methodology, findings. Should have: 3 case studies. Could have: practitioner interviews. Won\'t have: policy recommendations.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Scope', definition: 'The defined boundaries of a project, specifying what is included and excluded.' },
        { term: 'MoSCoW', definition: 'A prioritization method: Must have, Should have, Could have, Won\'t have--used to rank requirements.' },
        { term: 'Scope Creep', definition: 'The uncontrolled expansion of project requirements beyond the original scope, often without corresponding increases in time or budget.' },
        { term: 'Deliverable', definition: 'A tangible output or result that the project is expected to produce.' },
        { term: 'Exclusion', definition: 'An explicit statement of what the project will not cover, preventing assumptions and misunderstandings.' },
        { term: 'Success Criteria', definition: 'Measurable conditions that define when the project is considered complete and successful.' },
        { term: 'Constraint', definition: 'A limitation that affects the project, such as budget, timeline, technology, or available resources.' },
        { term: 'Stakeholder', definition: 'Anyone who has an interest in the project\'s outcome and may influence or be affected by it.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When should I define the scope?', answer: 'At the very beginning of the project, before any work starts. A clear scope prevents misalignment from day one.' },
        { question: 'What if requirements change after the scope is set?', answer: 'Use a formal change request process. Evaluate the impact on timeline and budget before adding new requirements.' },
        { question: 'Who should be involved in defining scope?', answer: 'Key stakeholders, the project lead, and subject matter experts. The more perspectives included early, the fewer surprises later.' },
        { question: 'How do I handle "nice to have" requests?', answer: 'Place them in the "Could have" or "Won\'t have" categories. They can be revisited in future phases if time and budget allow.' },
        { question: 'Is a scope document legally binding?', answer: 'Not by itself, but it can be attached to a contract. For freelance work, a scope document helps prevent disputes over deliverables.' },
        { question: 'How detailed should the scope be?', answer: 'Detailed enough that all parties have the same understanding. Ambiguity in scope leads to disagreements later.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Write explicit exclusions--what the project will NOT include is just as important as what it will.',
        'Get stakeholder sign-off on the scope before starting work.',
        'Use MoSCoW to prioritize ruthlessly. Not everything can be a "Must have."',
        'Define success criteria upfront so everyone agrees on what "done" looks like.',
        'Keep the scope document visible and reference it when new requests come in.',
        'Build in a change management process for handling scope changes formally.',
        'Revisit the scope at project milestones to ensure it still reflects reality.',
        'Start with an MVP scope (Must haves only) and plan subsequent phases for Should/Could haves.'
      ]
    }
  },
  relatedTools: ['decision-matrix', 'okr-planner', 'kanban-board', 'smart-goal-setter'],
  seo: {
    metaTitle: 'Project Scope Definer - Define Boundaries & Prevent Scope Creep | Untrackt',
    metaDescription: 'Define clear project scope with MoSCoW prioritization. Set deliverables, exclusions, and success criteria to keep your project on track.',
    keywords: ['project scope', 'scope definer', 'MoSCoW method', 'scope creep', 'project planning', 'requirements prioritization', 'project boundaries']
  }
};
