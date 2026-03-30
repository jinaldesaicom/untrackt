export default {
  id: 'sprint-capacity-calculator',
  title: 'Sprint Capacity Calculator',
  description: 'Calculate team capacity based on availability, holidays, and focus factor to plan realistic sprints.',
  content: {
    whatIs: {
      heading: 'What is the Sprint Capacity Calculator?',
      body: 'The Sprint Capacity Calculator determines how much work your agile team can realistically take on during a sprint. By factoring in the number of working days, individual availability (vacation, part-time), holidays, and a focus factor for meetings and interruptions, it produces a concrete capacity figure in hours or story points. This avoids the common mistake of over-committing by treating capacity as total available days.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Teams that plan without accounting for holidays, absences, and focus time consistently over-commit. This calculator makes invisible drag factors visible, helping teams set honest commitments they can actually deliver. It replaces back-of-napkin math with a clear, repeatable process.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the sprint length in working days.',
        'Add each team member with their daily available hours.',
        'Mark any vacation days, holidays, or partial availability.',
        'Set the focus factor (typically 0.6–0.8) to account for meetings and overhead.',
        'View the calculated total capacity in hours or story points.',
        'Adjust inputs to model different scenarios.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Per-member availability tracking with vacation and holiday support.',
        'Configurable focus factor to account for meetings and interruptions.',
        'Total capacity output in hours and estimated story points.',
        'Scenario comparison for different sprint lengths or team compositions.',
        'Visual breakdown of each member\'s contribution to total capacity.',
        'Runs entirely in your browser — no data leaves your device.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Preparing for sprint planning by knowing exact team capacity.',
        'Adjusting capacity when a team member is on vacation.',
        'Comparing capacity between a two-week and three-week sprint.',
        'Onboarding new team members with reduced initial focus factor.',
        'Accounting for company holidays mid-sprint.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard Two-Week Sprint', description: 'Five developers, 6 hours/day productive, 10 working days, 0.7 focus factor = 210 hours capacity.' },
        { title: 'Holiday Sprint', description: 'Same team but 2 public holidays — capacity drops to 168 hours, suggesting fewer stories.' },
        { title: 'Mixed Availability', description: 'Three full-time and two half-time members yield a capacity that prevents overloading part-timers.' },
        { title: 'New Team Member', description: 'Assign a lower focus factor (0.5) for a new joiner to reflect ramp-up time.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Capacity', definition: 'The total amount of productive work a team can deliver in a sprint, typically measured in hours or story points.' },
        { term: 'Focus Factor', definition: 'A multiplier (usually 0.6–0.8) applied to raw hours to account for meetings, context switching, and other non-story work.' },
        { term: 'Availability', definition: 'The number of hours or days a team member is available to work during the sprint, accounting for PTO and holidays.' },
        { term: 'Sprint Length', definition: 'The number of working days in a sprint iteration, typically 5–15 days.' },
        { term: 'Productive Hours', definition: 'The hours remaining after subtracting meetings, emails, and other overhead from total working hours.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What focus factor should I use?', answer: 'Most teams use 0.6 to 0.8. Start at 0.7 and adjust based on how much non-sprint work (meetings, support) your team handles.' },
        { question: 'Should I count the Scrum Master in capacity?', answer: 'Only if the Scrum Master also works on stories. Otherwise their time is accounted for through ceremonies and facilitation.' },
        { question: 'How do I convert hours to story points?', answer: 'Use your historical velocity. If your team typically completes 40 points in 200 hours, 1 point ≈ 5 hours.' },
        { question: 'Does this account for meetings automatically?', answer: 'The focus factor is your way of accounting for meetings. Reduce it if your team has heavy ceremony overhead.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Recalculate capacity every sprint — team composition and holidays change.',
        'Use historical data to calibrate your focus factor over time.',
        'Do not assume 8 productive hours per day — 5 to 6 is more realistic.',
        'Account for planned PTO before committing to sprint scope.',
        'Share the capacity calculation with the team for transparency and buy-in.',
        'Track actual vs. planned capacity sprint-over-sprint to improve accuracy.'
      ]
    }
  },
  relatedTools: ['sprint-planner', 'velocity-calculator', 'story-point-estimator', 'workload-calculator'],
  seo: {
    metaTitle: 'Sprint Capacity Calculator — Team Availability & Focus Factor | UnTrackt Wiki',
    metaDescription: 'Calculate agile sprint capacity based on team availability, holidays, and focus factor. Plan realistic sprint commitments your team can deliver.',
    keywords: ['sprint capacity', 'capacity calculator', 'agile capacity', 'focus factor', 'team availability', 'sprint planning']
  }
};
