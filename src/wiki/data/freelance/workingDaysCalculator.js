export default {
  id: 'working-days-calculator',
  title: 'Working Days Calculator',
  description:
    'Count the number of business days between two dates, accounting for weekends, public holidays, and custom non-working days.',
  content: {
    whatIs: {
      heading: 'What is the Working Days Calculator?',
      body: 'The Working Days Calculator determines the exact number of business days--Monday through Friday, excluding holidays--between any two dates. It is an essential planning tool for freelancers, project managers, and HR professionals who need to calculate deadlines, estimate project durations, or compute prorated payments based on actual working days rather than calendar days.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Manually counting working days is tedious and error-prone, especially across months with varying lengths and holiday schedules. A single miscounted day can throw off a project timeline, delay an invoice, or create payroll discrepancies. This tool eliminates those risks by automatically subtracting weekends and holidays, giving you an accurate count in seconds. For freelancers, knowing the exact number of working days in a billing period is critical for setting realistic deadlines and pricing fixed-scope projects.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a start date from the date picker or type it in.',
        'Select an end date.',
        'Choose your country or region to auto-load public holidays, or manually add custom holidays.',
        'Optionally exclude additional non-working days such as company shutdown periods.',
        'View the total working days, total calendar days, weekends, and holidays in the results panel.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic weekend detection and exclusion for standard Monday-Friday work weeks.',
        'Built-in public holiday calendars for multiple countries and regions.',
        'Custom holiday support for adding company-specific days off.',
        'Configurable work week--exclude Saturdays only, or set a 4-day week.',
        'Bi-directional calculation: find the end date given a start date and a number of working days.',
        'Exportable results for use in project plans and invoices.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Estimating a project delivery date based on effort in working days.',
        'Calculating prorated freelance fees for partial months.',
        'Determining SLA deadlines that are measured in business days.',
        'Planning vacation schedules by visualizing remaining working days in a quarter.',
        'Computing payroll periods for contractors paid on a per-day basis.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Q1 Working Days in the US',
          description:
            'January 1 to March 31, 2026 contains 63 working days after removing weekends and US federal holidays (New Year\'s Day, Martin Luther King Jr. Day, Presidents\' Day).',
        },
        {
          title: 'Two-Week Sprint',
          description:
            'A sprint starting Monday March 2 and ending Friday March 13 yields exactly 10 working days--no holidays involved.',
        },
        {
          title: 'Cross-Month Invoice',
          description:
            'A freelancer bills from February 15 to March 15, 2026. The calculator shows 20 working days, which at $500/day equals a $10,000 invoice.',
        },
        {
          title: 'Holiday-Heavy December',
          description:
            'December 1-31, 2026 in the US has 23 weekdays but only 21 working days after excluding Christmas Day and the day after.',
        },
        {
          title: 'International Comparison',
          description:
            'Comparing April 2026 working days: the US has 22, the UK has 20 (Easter Monday and Early May Bank Holiday), and Germany has 19.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Business Day',
          definition:
            'A day on which normal business operations are conducted--typically Monday through Friday, excluding public holidays.',
        },
        {
          term: 'Calendar Day',
          definition:
            'Any day of the year including weekends and holidays.',
        },
        {
          term: 'Public Holiday',
          definition:
            'A government-recognized day off such as Independence Day or Christmas, which is excluded from working day counts.',
        },
        {
          term: 'Prorated',
          definition:
            'Adjusted proportionally based on the fraction of working days in a period, often used for partial-month billing.',
        },
        {
          term: 'SLA (Service Level Agreement)',
          definition:
            'A commitment to deliver a service within a specified number of business days.',
        },
        {
          term: 'Work Week',
          definition:
            'The days in a week designated as working days. The standard is Monday through Friday, but some regions differ.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'Does the tool handle half-day holidays?',
          answer:
            'Currently it counts full days only. If your region observes half-day holidays, you can adjust the final count manually or add the day as a custom exclusion.',
        },
        {
          question: 'Can I set a non-standard work week?',
          answer:
            'Yes. You can configure which days of the week are working days--for example, Sunday through Thursday for Middle Eastern schedules.',
        },
        {
          question: 'Are regional or state holidays included?',
          answer:
            'The tool loads national holidays by default. You can add state or regional holidays as custom dates.',
        },
        {
          question: 'How far into the future can I calculate?',
          answer:
            'The calculator supports date ranges spanning several years. Holiday data is available for the current year and the next two years.',
        },
        {
          question: 'Can I use this to find an end date from a day count?',
          answer:
            'Yes. Switch to reverse mode, enter a start date and the desired number of working days, and the tool computes the end date.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always confirm the holiday calendar matches your client\'s location, not just your own.',
        'Add a 10-15 % buffer to working-day estimates for projects with external dependencies.',
        'Use working days rather than calendar days in contracts to avoid ambiguity.',
        'Recheck calculations at the start of each year when holiday dates are confirmed.',
        'Combine this tool with the Project Timeline Estimator for full scheduling.',
        'Keep a personal holiday list saved for quick reuse across projects.',
      ],
    },
  },
  relatedTools: [
    'project-timeline-estimator',
    'hourly-rate-calculator',
    'invoice-generator',
    'meeting-cost-calculator',
    'timezone-scheduler',
  ],
  seo: {
    metaTitle: 'Working Days Calculator - Wiki | UnTrackt',
    metaDescription:
      'Count business days between two dates with automatic holiday and weekend exclusion. Plan project timelines and prorate invoices accurately.',
    keywords: [
      'working days calculator',
      'business days between dates',
      'count working days',
      'exclude holidays',
      'business day counter',
      'project deadline calculator',
      'prorated billing days',
    ],
  },
};
