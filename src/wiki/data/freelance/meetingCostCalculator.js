export default {
  id: 'meeting-cost-calculator',
  title: 'Meeting Cost Calculator',
  description:
    'Estimate the real cost of any meeting by factoring in attendee salaries, duration, and opportunity cost to improve productivity.',
  content: {
    whatIs: {
      heading: 'What is the Meeting Cost Calculator?',
      body: 'The Meeting Cost Calculator quantifies the financial impact of meetings by combining attendee compensation, meeting length, and preparation time into a single dollar figure. It transforms the vague feeling that "this meeting could have been an email" into hard data, helping freelancers, managers, and team leads make informed decisions about when a meeting is truly worthwhile versus when asynchronous communication would be more cost-effective.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Meetings are one of the largest hidden costs in any business. Research shows that the average professional spends over 15 hours per week in meetings, and more than half of that time is considered unproductive. For freelancers who bill by the hour, every minute spent in an unnecessary meeting is lost revenue. This calculator makes that cost visible so you can prioritize high-value interactions, set meeting budgets, and advocate for leaner communication practices with clients and collaborators.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the number of attendees joining the meeting.',
        'Provide the average hourly rate or salary for each attendee (or use role-based defaults).',
        'Set the planned meeting duration in minutes.',
        'Optionally add preparation and follow-up time per attendee.',
        'Review the total meeting cost broken down by labor, opportunity cost, and overhead.',
        'Use the results to decide whether the meeting agenda justifies the expense.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports per-attendee rates or a single average rate for quick estimates.',
        'Includes optional preparation and follow-up time multipliers.',
        'Calculates opportunity cost based on each attendee\'s billable rate.',
        'Provides cost-per-minute and cost-per-attendee breakdowns.',
        'Lets you compare meeting cost against alternative communication methods.',
        'Offers a recurring meeting mode to see weekly, monthly, and annual costs.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Evaluating whether a weekly status meeting is worth its cumulative annual cost.',
        'Justifying an async stand-up tool to replace daily video calls.',
        'Helping clients understand the cost impact of extra revision rounds conducted via meetings.',
        'Setting an internal meeting budget for a project sprint.',
        'Demonstrating productivity savings when pitching workflow improvements.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Weekly Client Sync',
          description:
            'A 1-hour call with 4 attendees averaging $75/hr costs $300 per session. Over 48 weeks, that is $14,400--enough to hire a part-time assistant.',
        },
        {
          title: 'Internal Brainstorming Session',
          description:
            'A 90-minute brainstorm with 6 team members at $50/hr totals $450. Adding 30 minutes of prep per person raises the real cost to $600.',
        },
        {
          title: 'Quick 15-Minute Check-In',
          description:
            'Three freelancers at $100/hr join a 15-minute call. The cost is $75--minimal, but multiplied daily it becomes $375/week or ~$18,000/year.',
        },
        {
          title: 'All-Hands Company Meeting',
          description:
            'A 1-hour all-hands with 25 employees averaging $60/hr costs $1,500 per occurrence. Held monthly, that is $18,000/year.',
        },
        {
          title: 'Sales Demo for Prospect',
          description:
            'Two sales reps at $80/hr and one engineer at $120/hr run a 45-minute demo. Total cost: $140. If the deal closes at $10,000, the ROI is clear.',
        },
        {
          title: 'Unnecessary Status Update',
          description:
            'A 30-minute meeting with 8 people at $55/hr costs $220. Replacing it with a Loom video saves most of that cost while still sharing the update.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Opportunity Cost',
          definition:
            'The value of the work attendees could have completed during the time spent in a meeting.',
        },
        {
          term: 'Billable Rate',
          definition:
            'The hourly rate at which a professional\'s time is charged to clients, used to quantify meeting cost.',
        },
        {
          term: 'Meeting ROI',
          definition:
            'The return on investment of a meeting, measured by comparing the decisions made or value created against the total cost of attendance.',
        },
        {
          term: 'Async Communication',
          definition:
            'Exchanges that do not require real-time presence, such as email, recorded video, or shared documents.',
        },
        {
          term: 'Recurring Cost',
          definition:
            'The cumulative expense of a meeting held on a regular schedule, calculated over weeks, months, or a year.',
        },
        {
          term: 'Preparation Time',
          definition:
            'The time each attendee spends reviewing materials, creating agendas, or gathering data before the meeting begins.',
        },
        {
          term: 'Follow-Up Time',
          definition:
            'The time spent after a meeting writing notes, distributing action items, and completing assigned tasks.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'How accurate is the meeting cost estimate?',
          answer:
            'The estimate is only as accurate as the hourly rates and time values you provide. It is designed as a directional guide, not a precise accounting figure.',
        },
        {
          question: 'Should I include travel time?',
          answer:
            'Yes for in-person meetings. Add the average round-trip commute time per attendee to the preparation time field.',
        },
        {
          question: 'What is a good cost threshold for a meeting?',
          answer:
            'There is no universal number--it depends on the decisions at stake. Use the tool to compare the meeting cost against the value of the outcomes it produces.',
        },
        {
          question: 'Can I use this for client meetings as a freelancer?',
          answer:
            'Absolutely. Enter your own hourly rate and the estimated rates of client-side attendees to see the full cost picture.',
        },
        {
          question: 'Does this factor in overhead like office space?',
          answer:
            'Not by default, but you can include a per-person overhead multiplier to approximate those costs.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always create an agenda before scheduling a meeting; if you cannot fill it, the meeting may not be necessary.',
        'Limit attendees to only those who need to make or receive decisions.',
        'Set a hard stop time and stick to it--meetings expand to fill available time.',
        'Replace recurring status meetings with async updates whenever possible.',
        'Share the calculated cost with your team to build a culture of meeting-awareness.',
        'Use the 2-pizza rule: if you need more than two pizzas to feed the group, the meeting is too large.',
        'Track meeting costs monthly alongside project budgets to identify waste.',
      ],
    },
  },
  relatedTools: [
    'hourly-rate-calculator',
    'working-days-calculator',
    'project-timeline-estimator',
    'timezone-scheduler',
    'client-profitability-estimator',
  ],
  seo: {
    metaTitle: 'Meeting Cost Calculator - Wiki | UnTrackt',
    metaDescription:
      'Calculate the true cost of meetings by factoring in attendee salaries, preparation time, and opportunity cost. Make smarter scheduling decisions.',
    keywords: [
      'meeting cost calculator',
      'cost of meetings',
      'meeting productivity',
      'meeting ROI',
      'salary cost per meeting',
      'async vs meetings',
      'meeting budget',
      'team meeting cost',
    ],
  },
};
