export default {
  id: 'project-status-report',
  title: 'Project Status Report',
  description: 'Generate a structured project status report — RAG status, accomplishments, upcoming work, risks, and blockers.',
  content: {
    whatIs: {
      heading: 'What is the Project Status Report?',
      body: 'The Project Status Report generates a structured weekly or bi-weekly status update for stakeholders. It includes an overall RAG (Red/Amber/Green) status, accomplishments from the reporting period, planned work for the next period, key risks and issues, and milestone status. It standardizes reporting and saves time on status communication.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Stakeholders need regular, consistent updates. Writing status reports from scratch is time-consuming. This tool provides a structured template that ensures you cover all the important information and present it in a format stakeholders trust and understand.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the overall project health (Green, Amber, or Red).',
        'List accomplishments (what was completed this period).',
        'List planned work (what is coming next period).',
        'Note key risks, issues, and blockers.',
        'Update milestone status.',
        'Add any decisions needed from stakeholders.',
        'Export or share the report.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'RAG (Red/Amber/Green) health status.',
        'Accomplishments section for completed work.',
        'Upcoming work section for planned activities.',
        'Risks and issues summary.',
        'Milestone status table.',
        'Decisions/approvals needed section.',
        'Export as PDF, Markdown, or email.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Weekly status updates for project sponsors.',
        'Sprint summary reports for stakeholders.',
        'Monthly status reports for steering committees.',
        'Client-facing project progress updates.',
        'Internal team progress summaries.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Green Status', description: 'On track. This week: completed user auth, started API integration. Next week: API testing, UI review. No blockers.' },
        { title: 'Amber Status', description: 'At risk. Design deliverables 3 days late. Mitigation: parallel start on development with placeholder designs.' },
        { title: 'Red Status', description: 'Off track. Key dependency not delivered. Impact: 2-week delay to launch. Escalation: requesting executive support.' },
        { title: 'Sprint Summary', description: 'Sprint 5 complete. 18 of 20 stories done. 2 carried over. Velocity: 42 points. Next sprint: payment integration.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'RAG Status', definition: 'Red (off track), Amber (at risk), Green (on track) — a traffic light indicator for project health.' },
        { term: 'Accomplishments', definition: 'Work items and milestones completed during the reporting period.' },
        { term: 'Blockers', definition: 'Issues currently preventing progress that require external intervention.' },
        { term: 'Burndown', definition: 'The rate at which work is being completed, often shown as a chart of remaining work over time.' },
        { term: 'Reporting Period', definition: 'The time span covered by the status report (typically one week or two weeks).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How often should I send status reports?', answer: 'Weekly is standard. Bi-weekly for stable projects, daily for high-risk or launch periods.' },
        { question: 'What is the difference between Amber and Red?', answer: 'Amber: at risk but recoverable with mitigation. Red: off track and needs escalation or significant intervention.' },
        { question: 'Who should receive the report?', answer: 'Project sponsors, key stakeholders, and the project team. Adjust detail level for the audience.' },
        { question: 'Should I include good and bad news?', answer: 'Always. Balanced reporting builds trust. Hiding problems erodes credibility.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Send reports on a consistent day and time so stakeholders expect them.',
        'Lead with the overall status — busy stakeholders need the headline first.',
        'Be honest about RAG status — sandbagging erodes trust.',
        'Keep accomplishments and plans specific and measurable.',
        'Highlight decisions needed to prompt stakeholder action.',
        'Use data (velocity, milestone progress) to support your status assessment.'
      ]
    }
  },
  relatedTools: ['project-health-dashboard', 'milestone-tracker', 'kpi-metrics-tracker', 'raid-log'],
  seo: {
    metaTitle: 'Project Status Report — RAG Status Updates | UnTrackt Wiki',
    metaDescription: 'Generate structured project status reports with RAG health status, accomplishments, upcoming work, risks, and milestone tracking.',
    keywords: ['project status report', 'RAG status', 'project update', 'status report template', 'project reporting', 'stakeholder update']
  }
};
