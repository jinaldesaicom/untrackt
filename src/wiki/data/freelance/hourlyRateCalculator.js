export default {
  id: 'hourly-rate-calculator',
  title: 'Hourly Rate Calculator',
  description:
    'Calculate your ideal freelance hourly rate based on desired salary, expenses, taxes, and billable hours to ensure profitability.',
  content: {
    whatIs: {
      heading: 'What is the Hourly Rate Calculator?',
      body: 'The Hourly Rate Calculator is a freelance pricing tool that helps independent professionals determine the minimum hourly rate they need to charge in order to cover expenses, pay taxes, and reach their target annual income. Unlike a simple salary-to-hourly conversion, this calculator factors in non-billable hours, business overhead, vacation time, and profit margins--giving you a realistic, sustainable rate that reflects the true cost of running a freelance business.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most freelancers undercharge because they base their rate on employee salaries without accounting for self-employment taxes, health insurance, software subscriptions, unpaid time off, and the hours spent on admin tasks that cannot be billed. This calculator removes the guesswork by walking you through every cost category so you can set a rate that sustains your business, funds your growth, and still leaves room for profit. It is especially valuable when transitioning from full-time employment to freelancing, renegotiating contracts, or expanding into new markets.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your desired annual net income--the take-home pay you want after all expenses and taxes.',
        'Add your estimated annual business expenses such as software, equipment, coworking space, insurance, and professional development.',
        'Specify your estimated tax rate or let the tool apply a default self-employment estimate.',
        'Set the number of weeks you plan to work per year, subtracting vacation and sick days.',
        'Enter the number of billable hours you expect per week (typically 60-70 % of total working hours).',
        'Review the calculated hourly rate, adjust inputs as needed, and optionally add a profit margin buffer.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Accounts for self-employment taxes, federal and state income taxes, and common deductions.',
        'Separates billable and non-billable hours for a realistic workload picture.',
        'Includes expense categories like software, insurance, equipment depreciation, and office costs.',
        'Lets you add a configurable profit margin on top of break-even rate.',
        'Supports multiple currencies for international freelancers.',
        'Provides a side-by-side comparison of different rate scenarios.',
        'Instantly recalculates as you tweak any input value.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting your baseline rate when starting a freelance career.',
        'Re-evaluating pricing after a significant expense change such as new health insurance premiums.',
        'Comparing hourly, daily, and project-based pricing strategies.',
        'Preparing rate justification data for client negotiations.',
        'Budgeting for upcoming quarters by modeling different utilization rates.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Web Developer Transitioning from Employment',
          description:
            'A developer earning $90,000 as an employee wants the same take-home. After adding $12,000 in expenses, 30 % taxes, 4 weeks off, and 25 billable hours per week, the calculator recommends a minimum rate of $85/hr.',
        },
        {
          title: 'Graphic Designer with Low Overhead',
          description:
            'A designer targeting $60,000 net with only $4,000 in annual expenses, 25 % tax, 48 working weeks, and 30 billable hours per week sees a suggested rate of $56/hr.',
        },
        {
          title: 'Marketing Consultant Adding Profit Margin',
          description:
            'A consultant needs $100,000 net, has $20,000 in expenses, 35 % tax, 46 weeks, and 20 billable hours per week. The break-even rate is $100/hr; adding a 15 % margin brings it to $115/hr.',
        },
        {
          title: 'Copywriter Working Part-Time',
          description:
            'A part-time copywriter targeting $40,000 with $3,000 in expenses, 22 % tax, 50 weeks, and 15 billable hours per week calculates a rate of $46/hr.',
        },
        {
          title: 'Agency Owner Covering Team Costs',
          description:
            'An agency owner factors in $150,000 of combined salary goals and $60,000 in overhead. With 3 billable team members averaging 25 hours each per week across 48 weeks, the per-person billable rate comes to $58/hr.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Billable Hours',
          definition:
            'Hours spent on client work that can be directly invoiced, excluding admin, marketing, and professional development time.',
        },
        {
          term: 'Utilization Rate',
          definition:
            'The percentage of total working hours that are billable. A healthy freelance utilization rate is typically 60-75 %.',
        },
        {
          term: 'Overhead',
          definition:
            'Ongoing business costs not tied to a specific project, such as rent, subscriptions, insurance, and accounting fees.',
        },
        {
          term: 'Self-Employment Tax',
          definition:
            'The combined Social Security and Medicare tax that freelancers pay on net earnings, currently 15.3 % in the United States.',
        },
        {
          term: 'Profit Margin',
          definition:
            'The percentage added on top of costs to ensure the business generates surplus revenue beyond break-even.',
        },
        {
          term: 'Effective Hourly Rate',
          definition:
            'Your actual earnings per hour worked when total income is divided by all hours (billable and non-billable).',
        },
        {
          term: 'Break-Even Rate',
          definition:
            'The minimum hourly rate required to cover all costs and taxes without any profit.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'How many hours should I count as billable?',
          answer:
            'Most freelancers can realistically bill 60-70 % of their working hours. The rest goes to admin, marketing, invoicing, and learning. Start conservatively and adjust as you track your time.',
        },
        {
          question: 'Should I charge different rates for different clients?',
          answer:
            'Yes. Many freelancers use tiered pricing based on project complexity, client budget, turnaround time, and the value delivered. Your calculated rate serves as a floor, not a ceiling.',
        },
        {
          question: 'How often should I recalculate my rate?',
          answer:
            'Reassess at least once a year or whenever your expenses, tax situation, or target income changes significantly.',
        },
        {
          question: 'Does this replace a full financial plan?',
          answer:
            'No. This tool gives you a pricing baseline. For comprehensive tax planning and retirement strategy, consult a financial advisor or accountant.',
        },
        {
          question: 'What if my rate seems too high for my market?',
          answer:
            'If the calculated rate exceeds market norms, look for ways to reduce expenses, increase billable hours, or shift to value-based pricing where you charge per deliverable instead of per hour.',
        },
        {
          question: 'Can I use this for project-based pricing?',
          answer:
            'Absolutely. Estimate how many hours a project will take, multiply by your hourly rate, and add a buffer for scope creep to arrive at a fixed project price.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Track your time for at least a month before setting your rate so you know your real billable-to-total ratio.',
        'Build an emergency fund equal to 3-6 months of expenses so you can decline low-paying work.',
        'Increase your rate by 5-10 % annually to keep pace with inflation and growing expertise.',
        'Always quote a range rather than a single number; it gives you negotiation room.',
        'Factor in retirement contributions--freelancers do not get employer-matched 401(k) plans.',
        'Include a buffer for late or non-payment; not every invoice is paid on time.',
        'Revisit this calculator whenever you onboard a new recurring expense or lose a major client.',
      ],
    },
  },
  relatedTools: [
    'invoice-generator',
    'meeting-cost-calculator',
    'client-profitability-estimator',
    'tax-bracket-estimator',
    'working-days-calculator',
  ],
  seo: {
    metaTitle: 'Hourly Rate Calculator for Freelancers - Wiki | UnTrackt',
    metaDescription:
      'Learn how to calculate your ideal freelance hourly rate by factoring in expenses, taxes, billable hours, and profit margins with the UnTrackt Hourly Rate Calculator.',
    keywords: [
      'freelance hourly rate calculator',
      'calculate freelance rate',
      'billable hours',
      'freelance pricing',
      'self-employment rate',
      'freelancer income',
      'hourly rate formula',
      'freelance expenses',
    ],
  },
};
