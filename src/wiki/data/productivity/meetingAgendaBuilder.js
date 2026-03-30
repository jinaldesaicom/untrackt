export default {
  id: 'meeting-agenda-builder',
  title: 'Meeting Agenda Builder',
  description: 'Create structured meeting agendas with timed topics, facilitator notes, and participant assignments.',
  content: {
    whatIs: {
      heading: 'What is the Meeting Agenda Builder?',
      body: 'The Meeting Agenda Builder helps you plan effective meetings by creating a structured agenda with timed topics, assigned speakers, and clear objectives. It ensures every meeting has a purpose, stays on track, and respects participants\' time by defining what will be discussed, who is responsible, and how long each topic should take.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Meetings without agendas waste time and frustrate participants. Research by Harvard Business Review shows that 71% of senior managers consider meetings unproductive. A well-structured agenda transforms meetings from aimless discussions into focused, outcome-driven sessions. It sets expectations, keeps conversations on track, and ensures all important topics are covered.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the meeting title, date, time, and overall duration.',
        'Add agenda items with a topic title, description, and time allocation.',
        'Assign a facilitator or presenter to each agenda item.',
        'Reorder items by priority or logical flow using drag-and-drop.',
        'Add a notes section for any pre-meeting preparation or materials.',
        'Share or export the agenda before the meeting so participants can prepare.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Timed agenda items with duration tracking',
        'Facilitator and presenter assignments per topic',
        'Drag-and-drop reordering of agenda items',
        'Total time calculation with overrun warnings',
        'Pre-meeting notes and preparation section',
        'Export and share agenda in clean format',
        'Templates for common meeting types'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Planning weekly team stand-ups or check-ins',
        'Structuring project kickoff meetings with multiple stakeholders',
        'Preparing board meetings or executive briefings',
        'Organizing brainstorming or workshop sessions',
        'Running client review or status update meetings',
        'Planning one-on-one meetings with direct reports'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Weekly Team Stand-Up', description: 'Agenda: Welcome (2 min), Individual updates (15 min), Blockers discussion (5 min), Action items (3 min). Total: 25 minutes.' },
        { title: 'Project Kickoff', description: 'Agenda: Introductions (5 min), Project overview (10 min), Roles and responsibilities (10 min), Timeline review (10 min), Q&A (10 min), Next steps (5 min).' },
        { title: 'Client Review Meeting', description: 'Agenda: Progress summary (10 min), Demo (15 min), Feedback and discussion (15 min), Next milestones (5 min), Wrap-up (5 min).' },
        { title: 'One-on-One', description: 'Agenda: Check-in (5 min), Progress on goals (10 min), Challenges and support needed (10 min), Career development (5 min).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Agenda', definition: 'A structured list of topics to be discussed during a meeting, typically with time allocations and responsible parties.' },
        { term: 'Facilitator', definition: 'The person responsible for guiding the meeting, keeping discussions on track, and managing time.' },
        { term: 'Time Box', definition: 'A fixed amount of time allocated to a specific agenda item, preventing any single topic from consuming the entire meeting.' },
        { term: 'Action Item', definition: 'A specific task assigned to a person during the meeting with a clear deadline.' },
        { term: 'Parking Lot', definition: 'A list of topics or ideas raised during the meeting that are important but off-topic, saved for later discussion.' },
        { term: 'Stand-Up', definition: 'A brief, time-boxed meeting (usually 15 minutes) where team members share quick updates.' },
        { term: 'Pre-Read', definition: 'Materials or documents shared before the meeting that participants should review in advance to come prepared.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How far in advance should I share the agenda?', answer: 'Share it at least 24 hours before the meeting so participants can prepare. For larger meetings, 2-3 days is ideal.' },
        { question: 'What if we run out of time on a topic?', answer: 'Use the parking lot to capture remaining points and schedule a follow-up or allocate time in the next meeting.' },
        { question: 'Should every meeting have an agenda?', answer: 'Yes. Even short meetings benefit from a brief agenda that sets expectations and keeps the conversation focused.' },
        { question: 'How do I handle agenda items that need more time?', answer: 'Adjust time allocations before the meeting or split large topics into multiple shorter items.' },
        { question: 'Can I save agenda templates for recurring meetings?', answer: 'Yes. Save a template once and reuse it for recurring meetings like weekly stand-ups or monthly reviews.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start every agenda with a clear meeting objective--what outcome do you want by the end?',
        'Allocate specific times to each item and stick to them to respect everyone\'s schedule.',
        'Put the most important or time-sensitive items first in case the meeting runs short.',
        'Assign a facilitator to keep the discussion on track and manage transitions between topics.',
        'End every meeting with clear action items: who does what by when.',
        'Include a "parking lot" for off-topic ideas so discussions stay focused without losing good ideas.',
        'Keep meetings as short as possible. Default to 25 or 50 minutes instead of 30 or 60.',
        'Review the previous meeting\'s action items at the start to ensure accountability.'
      ]
    }
  },
  relatedTools: ['meeting-minutes', 'daily-planner', 'todo-list', 'okr-planner'],
  seo: {
    metaTitle: 'Meeting Agenda Builder - Plan Effective, Focused Meetings | Untrackt',
    metaDescription: 'Build structured meeting agendas with timed topics, facilitator assignments, and clear objectives. Run meetings that are focused and productive.',
    keywords: ['meeting agenda', 'agenda builder', 'meeting planner', 'meeting template', 'agenda template', 'effective meetings', 'meeting facilitation']
  }
};
