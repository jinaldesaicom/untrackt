export default {
  id: 'meeting-minutes',
  title: 'Meeting Minutes',
  description: 'Capture meeting notes, decisions, and action items in a structured format for easy reference and follow-up.',
  content: {
    whatIs: {
      heading: 'What is Meeting Minutes?',
      body: 'Meeting Minutes is a structured note-taking tool for capturing what was discussed, decided, and assigned during a meeting. It provides a clear template for recording attendees, key discussion points, decisions made, and action items with owners and deadlines--creating an official record that keeps everyone aligned after the meeting ends.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Without written minutes, meetings produce no lasting record. Participants forget decisions, action items get lost, and the same topics resurface repeatedly. Meeting minutes create accountability, serve as a reference for absent team members, and provide documentation that can be reviewed weeks or months later. They turn talk into trackable action.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the meeting title, date, time, and list of attendees.',
        'During the meeting, capture key discussion points under each agenda topic.',
        'Record all decisions made with context for why they were chosen.',
        'Log action items with clear descriptions, assigned owners, and due dates.',
        'Note any items deferred to future meetings.',
        'Review and share the minutes with all participants and stakeholders after the meeting.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Structured sections for discussion, decisions, and action items',
        'Attendee list with roles',
        'Action items with owner assignment and due dates',
        'Linkable reference to the meeting agenda',
        'Export as PDF or markdown for sharing',
        'Historical archive of past meeting minutes',
        'Quick templates for common meeting types'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Recording team meeting outcomes and assignments',
        'Documenting board meeting decisions for compliance',
        'Capturing client meeting notes for internal reference',
        'Creating a record of project status updates and blockers',
        'Tracking commitments made in one-on-one meetings',
        'Sharing meeting outcomes with team members who could not attend'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Team Sprint Review', description: 'Record which features were demo\'d, feedback received, decisions on next sprint priorities, and action items for the team.' },
        { title: 'Client Discovery Call', description: 'Capture client requirements discussed, technical constraints identified, agreed scope, and follow-up tasks with deadlines.' },
        { title: 'Board Meeting Minutes', description: 'Document motions proposed, votes taken, resolutions passed, and assigned responsibilities for formal record-keeping.' },
        { title: 'One-on-One Notes', description: 'Record goals discussed, feedback shared, career development plans, and action items for both manager and report.' },
        { title: 'Cross-Team Sync', description: 'Note dependencies discussed, timeline agreements, blockers raised, and owners assigned to resolve each issue.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Minutes', definition: 'The official written record of what was discussed, decided, and assigned during a meeting.' },
        { term: 'MoM', definition: 'Minutes of Meeting--a common abbreviation for the documented meeting record.' },
        { term: 'Action Item', definition: 'A specific task resulting from the meeting, assigned to a person with a deadline.' },
        { term: 'Decision Log', definition: 'A record of all decisions made during the meeting, including the rationale behind each.' },
        { term: 'Attendees', definition: 'The list of people present at the meeting, often including their roles.' },
        { term: 'Deferred Item', definition: 'A topic or action that was raised but postponed to a future meeting for further discussion.' },
        { term: 'Follow-Up', definition: 'Actions or communications required after the meeting to implement decisions or track progress.' },
        { term: 'Quorum', definition: 'The minimum number of members required to be present for a meeting\'s decisions to be valid.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Who should take the meeting minutes?', answer: 'Assign a dedicated note-taker before the meeting. Rotating this role across team members distributes the workload fairly.' },
        { question: 'How detailed should minutes be?', answer: 'Capture decisions, action items, and key discussion points. You don\'t need to record everything--focus on what is actionable and referenceable.' },
        { question: 'When should minutes be shared?', answer: 'Share within 24 hours while the meeting is still fresh. Same-day distribution is ideal.' },
        { question: 'Should verbatim quotes be included?', answer: 'Generally no. Summarize discussions and capture the essence. Use direct quotes only when precision matters, such as formal decisions.' },
        { question: 'How long should I keep meeting minutes?', answer: 'Keep them as long as they are relevant. For formal meetings (board, legal), minutes may need to be retained permanently.' },
        { question: 'Can I link minutes to the original agenda?', answer: 'Yes. Linking minutes to the agenda item they address makes it easy to see how planned topics were resolved.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use the meeting agenda as the skeleton for your minutes--organize notes by agenda item.',
        'Capture action items in real time with who, what, and by when clearly stated.',
        'Distinguish between discussion points, decisions, and action items using clear formatting.',
        'Share minutes promptly--within a few hours of the meeting if possible.',
        'Review minutes at the start of the next meeting to track follow-through on action items.',
        'Keep minutes concise and scannable. Use bullet points, not paragraphs.',
        'Include absent attendees in the distribution so they stay informed.',
        'Store minutes in a consistent, searchable location for easy retrieval later.'
      ]
    }
  },
  relatedTools: ['meeting-agenda-builder', 'todo-list', 'notepad', 'weekly-review-template'],
  seo: {
    metaTitle: 'Meeting Minutes - Capture Decisions & Action Items | Untrackt',
    metaDescription: 'Record structured meeting minutes with discussion points, decisions, and action items. Keep everyone aligned with clear, shareable meeting records.',
    keywords: ['meeting minutes', 'meeting notes', 'MoM', 'action items', 'meeting record', 'minutes of meeting', 'meeting documentation']
  }
};
