export default {
  id: 'working-agreement-builder',
  title: 'Working Agreement Builder',
  description: 'Build team working agreements with collaborative rule definition to establish shared norms and expectations.',
  content: {
    whatIs: {
      heading: 'What is the Working Agreement Builder?',
      body: 'The Working Agreement Builder helps agile teams create a shared document of team norms, communication expectations, and process agreements. It guides the team through defining rules for meetings, code reviews, communication channels, availability, and more — producing a living document that the team references and updates regularly.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Teams without explicit working agreements rely on assumptions, which inevitably lead to friction. "I thought we always review PRs within 4 hours" versus "I check PRs daily" creates delays and frustration. A working agreement makes implicit expectations explicit, reducing conflict and improving collaboration from day one.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Choose categories for your agreement (communication, meetings, code review, etc.).',
        'Add specific rules or norms the team agrees to follow.',
        'Discuss and refine each item until there is consensus.',
        'Finalize the agreement and make it visible (exported, posted, shared).',
        'Review and update the agreement periodically, especially after retrospectives.',
        'Use the agreement as a reference when conflicts arise.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Categorized agreement sections (communication, meetings, code, etc.).',
        'Template suggestions for common agreement topics.',
        'Editable rules with discussion notes.',
        'Export as Markdown, text, or printable format.',
        'Version tracking to see how the agreement evolves.',
        'Browser-based — your team\'s agreements stay private.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Team formation — establishing norms when a new team starts.',
        'Onboarding new team members to existing team expectations.',
        'Resolving recurring conflicts by making implicit rules explicit.',
        'Retrospective action items that require a new team agreement.',
        'Cross-team collaboration agreements with shared process rules.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Communication Rules', description: 'Slack for quick questions, email for external stakeholders, no messages expected after 6 PM.' },
        { title: 'Code Review Agreement', description: 'PRs reviewed within 4 hours, maximum 400 lines per PR, at least 2 approvals required.' },
        { title: 'Meeting Norms', description: 'Camera on for standups, all meetings have an agenda, no meetings on Fridays.' },
        { title: 'Availability', description: 'Core hours 10 AM–3 PM, flex time outside core hours, update Slack status when away.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Working Agreement', definition: 'A set of explicitly defined guidelines that team members agree to follow, covering communication, work practices, and team interactions.' },
        { term: 'Team Norms', definition: 'The established patterns of behavior and expectations within a team, ideally made explicit.' },
        { term: 'Consensus', definition: 'A decision-making approach where all team members agree to support the outcome, even if it was not everyone\'s first choice.' },
        { term: 'Social Contract', definition: 'Another term for a working agreement, emphasizing the mutual commitment between team members.' },
        { term: 'Core Hours', definition: 'The time window during which all team members are expected to be available for collaboration.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many rules should a working agreement have?', answer: '10-15 rules is a good range. Too few may miss important topics; too many become hard to remember.' },
        { question: 'What if someone does not follow the agreement?', answer: 'Address it directly and respectfully. The agreement is a tool for constructive conversation, not punishment.' },
        { question: 'How often should we update it?', answer: 'Review it quarterly or whenever a retrospective identifies a need for a new norm or a change to an existing one.' },
        { question: 'Should managers be part of the agreement?', answer: 'If managers work closely with the team, yes. The agreement applies to everyone who participates in the team\'s daily work.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Every team member should have input — a working agreement imposed by one person is not an agreement.',
        'Keep rules specific and actionable — "communicate well" is vague, "respond to Slack within 2 hours during core hours" is clear.',
        'Post the agreement visibly — on a team wiki, in the chat channel, or on a wall.',
        'Review the agreement when team composition changes.',
        'Use the agreement to resolve conflicts constructively: "Our agreement says X — let\'s discuss."',
        'Update it as the team matures — remove rules that are now second nature and add new ones as needed.'
      ]
    }
  },
  relatedTools: ['retrospective-board', 'definition-of-done-checklist', 'definition-of-ready-checklist', 'meeting-agenda-builder'],
  seo: {
    metaTitle: 'Working Agreement Builder — Team Norms & Rules | UnTrackt Wiki',
    metaDescription: 'Build team working agreements with categorized rules for communication, meetings, code review, and more. Establish shared norms for effective collaboration.',
    keywords: ['working agreement', 'team norms', 'team rules', 'social contract', 'agile agreement', 'team collaboration']
  }
};
