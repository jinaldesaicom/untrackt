export default {
  id: 'timezone-scheduler',
  title: 'Timezone Scheduler',
  description:
    'Find overlapping working hours across time zones, account for daylight saving time, and schedule meetings that work for global freelance teams.',
  content: {
    whatIs: {
      heading: 'What is the Timezone Scheduler?',
      body: 'The Timezone Scheduler is a visual planning tool that displays multiple time zones side by side, highlights overlapping business hours, and accounts for daylight saving time (DST) transitions. It helps freelancers who work with international clients and distributed teams find the best meeting times without the confusion of manual timezone math. Select the cities or UTC offsets involved, and the tool instantly shows the common windows where everyone is within reasonable working hours.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Freelancers increasingly work with clients and collaborators across the globe. Scheduling across time zones is a constant source of missed meetings, late-night calls, and frustration--especially when DST shifts happen at different dates in different countries. This tool removes ambiguity by showing exact local times for all parties, flagging DST changes, and identifying the fairest overlap windows. It saves you from the embarrassment of showing up an hour early (or late) and helps you propose meeting times that respect everyone\'s work-life boundaries.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add the cities or time zones of all meeting participants.',
        'Set each participant\'s preferred working hours (e.g., 9 AM - 6 PM local time).',
        'View the overlap chart showing shared available windows.',
        'Select a meeting time from the highlighted overlap zone.',
        'Check the DST indicator to confirm whether any zone is about to shift.',
        'Copy the meeting details with all local times to share with participants.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Side-by-side time zone comparison for up to 10 zones.',
        'Visual overlap bar highlighting shared working hours.',
        'Automatic DST detection and adjustment with upcoming shift alerts.',
        'Customizable working hours per participant or zone.',
        'One-click copy of meeting time in all local formats.',
        'Support for half-hour and quarter-hour UTC offsets (e.g., India UTC+5:30, Nepal UTC+5:45).',
        'World clock view showing current time in all selected zones.',
        'Date-specific mode to check what times look like on a future date, accounting for DST.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Scheduling a kickoff call with a client in a different country.',
        'Coordinating daily stand-ups for a distributed freelance team.',
        'Planning a webinar that accommodates audiences in multiple regions.',
        'Avoiding scheduling during unsociable hours for any participant.',
        'Confirming that a recurring meeting time still works after a DST transition.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'New York ↔ London',
          description:
            'New York (EST, UTC-5) and London (GMT, UTC+0) have a 5-hour difference. Overlap during standard working hours: 2 PM - 6 PM London / 9 AM - 1 PM New York.',
        },
        {
          title: 'San Francisco ↔ Tokyo',
          description:
            'San Francisco (PST, UTC-8) and Tokyo (JST, UTC+9) are 17 hours apart. The only reasonable overlap is early morning SF (6-8 AM) which is late evening Tokyo (11 PM - 1 AM)--challenging for recurring meetings.',
        },
        {
          title: 'Three-Way: Berlin, Dubai, Sydney',
          description:
            'Berlin (CET, UTC+1), Dubai (GST, UTC+4), Sydney (AEDT, UTC+11). Overlap window: 8 AM - 10 AM Berlin / 11 AM - 1 PM Dubai / 6 PM - 8 PM Sydney. Tight but workable.',
        },
        {
          title: 'DST Transition Alert',
          description:
            'A weekly Monday 3 PM GMT call with a US participant shifts by one hour when the US enters daylight saving on the second Sunday of March--the scheduler alerts both parties two weeks in advance.',
        },
        {
          title: 'India Half-Hour Offset',
          description:
            'India (IST, UTC+5:30) creates an unusual offset with UTC-based zones. A 10 AM EST meeting is 8:30 PM IST--the scheduler flags this as outside typical working hours.',
        },
        {
          title: 'Global Webinar Planning',
          description:
            'A webinar targeting US West Coast, UK, and Australia finds the least-bad time at 6 PM PST / 2 AM GMT / 1 PM AEDT. The scheduler suggests two sessions to cover all audiences fairly.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'UTC (Coordinated Universal Time)',
          definition:
            'The global time standard from which all time zones are defined as positive or negative offsets.',
        },
        {
          term: 'DST (Daylight Saving Time)',
          definition:
            'The practice of advancing clocks by one hour during warmer months, observed in many but not all regions, and at different dates.',
        },
        {
          term: 'Overlap Window',
          definition:
            'The period during which all participants\' working hours coincide, making it suitable for meetings.',
        },
        {
          term: 'UTC Offset',
          definition:
            'The number of hours (and sometimes minutes) a time zone is ahead of or behind UTC, such as UTC+5:30 for India.',
        },
        {
          term: 'IANA Time Zone',
          definition:
            'A standardized timezone identifier like "America/New_York" or "Europe/London" that accounts for historical DST changes.',
        },
        {
          term: 'Standard Time',
          definition:
            'The local time in a region when daylight saving time is not in effect.',
        },
        {
          term: 'Time Zone Abbreviation',
          definition:
            'A short label like EST, PST, or CET that represents a specific offset. Note: some abbreviations are ambiguous (e.g., CST can mean Central Standard Time in the US or China Standard Time).',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'Does the tool automatically adjust for daylight saving time?',
          answer:
            'Yes. When you select a city-based time zone, DST transitions are applied automatically based on the selected date. The tool also alerts you to upcoming DST changes.',
        },
        {
          question: 'How many time zones can I compare at once?',
          answer:
            'You can add up to 10 time zones simultaneously. For larger groups, focus on the extremes and find a window that covers the widest span.',
        },
        {
          question: 'What about regions that do not observe DST?',
          answer:
            'Those zones remain constant year-round. The tool correctly handles mixed scenarios where some participants observe DST and others do not.',
        },
        {
          question: 'Can I set different working hours for each participant?',
          answer:
            'Yes. Each time zone slot allows custom start and end hours, so you can accommodate early risers, night owls, or part-time schedules.',
        },
        {
          question: 'How do I share the proposed meeting time?',
          answer:
            'Click the copy button to get a formatted summary listing the meeting date and time in every participant\'s local timezone, ready to paste into an email or calendar invite.',
        },
        {
          question: 'Does this integrate with my calendar?',
          answer:
            'Currently the tool provides time information for manual calendar entry. Direct calendar integration is not yet available.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always reference a specific city (e.g., "America/Chicago") rather than an abbreviation to avoid ambiguity.',
        'Check for DST transitions a week before any recurring meeting to catch shifts early.',
        'Rotate meeting times periodically so the same participants are not always stuck with early-morning or late-night slots.',
        'When no good overlap exists, consider async alternatives like recorded video updates.',
        'Include the UTC time in every calendar invite so participants can independently verify their local time.',
        'Use the date-specific mode when scheduling weeks in advance--DST status may differ from today.',
        'For multi-zone teams, designate one "anchor" timezone and express all deadlines relative to it.',
      ],
    },
  },
  relatedTools: [
    'meeting-cost-calculator',
    'working-days-calculator',
    'project-timeline-estimator',
    'hourly-rate-calculator',
    'proposal-builder',
  ],
  seo: {
    metaTitle: 'Timezone Scheduler for Global Teams - Wiki | UnTrackt',
    metaDescription:
      'Find overlapping working hours across time zones, handle DST transitions, and schedule meetings that work for international freelance collaborations.',
    keywords: [
      'timezone scheduler',
      'time zone converter',
      'meeting time finder',
      'DST calculator',
      'overlap working hours',
      'international scheduling',
      'world clock',
      'remote team scheduling',
    ],
  },
};
