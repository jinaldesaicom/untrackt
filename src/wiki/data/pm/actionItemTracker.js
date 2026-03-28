export default {
  id: 'action-item-tracker',
  title: 'Action Item Tracker',
  description: 'Track meeting action items — who, what, when, and status. Follow up on commitments from meetings and reviews.',
  content: {
    whatIs: {
      heading: 'What is the Action Item Tracker?',
      body: 'The Action Item Tracker captures and monitors commitments from meetings, reviews, and discussions. Each action item has an owner, description, due date, and status. The tool ensures that the decisions and commitments made in meetings are actually followed through, not lost or forgotten.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most meetings generate action items that never get done because nobody tracks them. This tool closes the loop — every commitment is logged, assigned, dated, and followed up on until complete. Accountability and execution improve dramatically.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add action items during or immediately after meetings.',
        'Assign an owner and due date to each item.',
        'Categorize by meeting, project, or topic.',
        'Update status: open, in progress, complete, overdue.',
        'Review outstanding action items at the next meeting.',
        'Close items when complete.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Action item log with description, owner, and due date.',
        'Status tracking: open, in progress, complete, overdue.',
        'Source/meeting field to link items to their origin.',
        'Filter by owner, status, or date.',
        'Overdue item highlighting.',
        'Meeting-based grouping view.',
        'Export as CSV or email summary.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Capturing action items from team meetings.',
        'Tracking commitments from client calls.',
        'Following up on review feedback and decisions.',
        'Managing personal task commitments across multiple meetings.',
        'Creating accountability for stakeholder commitments.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Team Meeting', description: 'Action: Dave to update the API docs by Friday — Status: In Progress.' },
        { title: 'Client Call', description: 'Action: Sarah to send revised proposal by EOD Tuesday — Status: Complete.' },
        { title: 'Sprint Retro', description: 'Action: Team to add test coverage for auth module by end of sprint — Status: Open.' },
        { title: 'Stakeholder Review', description: 'Action: PM to escalate budget issue to sponsor by Wednesday — Status: Overdue.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Action Item', definition: 'A specific task or commitment arising from a meeting or discussion, assigned to a person with a due date.' },
        { term: 'Owner', definition: 'The person responsible for completing the action item.' },
        { term: 'Due Date', definition: 'The date by which the action item should be completed.' },
        { term: 'Follow-Up', definition: 'The process of checking on the status of outstanding action items, typically at the next meeting.' },
        { term: 'Overdue', definition: 'An action item that has passed its due date without being completed.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How is this different from a task tracker?', answer: 'Action items come from meetings and conversations. Tasks are planned work. The action item tracker bridges the gap between decisions and execution.' },
        { question: 'Who should capture action items?', answer: 'Designate one person per meeting (often the meeting organizer or PM) to capture items as they arise.' },
        { question: 'What if an action item becomes a larger task?', answer: 'Convert it to a formal task in your project tracker and close the action item with a reference to the task.' },
        { question: 'How do I handle action items from different meetings?', answer: 'Tag or group items by their source meeting for easy filtering and follow-up.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Capture action items in real time during the meeting, not afterward.',
        'Every action item needs a specific owner — "the team" is not an owner.',
        'Set realistic due dates — avoid defaulting to "ASAP."',
        'Review open action items at the start of each meeting.',
        'Escalate overdue items rather than letting them linger.',
        'Close completed items promptly to keep the list current.'
      ]
    }
  },
  relatedTools: ['checklist-builder', 'raid-log', 'project-status-report', 'milestone-tracker'],
  seo: {
    metaTitle: 'Action Item Tracker — Follow Up on Meeting Commitments | UnTrackt Wiki',
    metaDescription: 'Track action items from meetings with owners, due dates, and status. Ensure commitments are followed through and nothing falls through the cracks.',
    keywords: ['action item tracker', 'meeting action items', 'follow up tracker', 'action items', 'meeting commitments', 'task follow up']
  }
};
