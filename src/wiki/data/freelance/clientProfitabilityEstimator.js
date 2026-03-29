export default {
  id: 'client-profitability-estimator',
  title: 'Client Profitability Estimator',
  description:
    'Measure the true profitability of each client by tracking revenue, time invested, overhead, and hidden costs to optimize your freelance portfolio.',
  content: {
    whatIs: {
      heading: 'What is the Client Profitability Estimator?',
      body: 'The Client Profitability Estimator calculates the real profit you earn from each client by comparing total revenue against all associated costs--billable hours, non-billable communication time, project-specific expenses, and allocated overhead. It reveals which clients generate the most profit per hour and which ones quietly drain your resources, helping you make data-driven decisions about where to invest your energy and when to renegotiate or part ways.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Revenue is not profit. A client who pays $10,000 but requires 150 hours of work, 40 emails per week, and constant scope changes is far less profitable than one who pays $6,000 for 50 focused hours. Without measuring profitability per client, freelancers often over-serve their worst clients while under-investing in their best ones. This tool makes the invisible visible so you can build a client portfolio that maximizes your effective hourly rate and overall satisfaction.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the client name and the total revenue earned from that client over a period.',
        'Log the total billable hours invoiced to the client.',
        'Add non-billable hours spent on admin, calls, emails, and revisions for that client.',
        'Include any direct expenses such as software, stock assets, or subcontractor costs.',
        'Allocate a share of your overhead (rent, insurance, tools) proportional to this client\'s workload.',
        'Review the profitability summary: net profit, effective hourly rate, profit margin, and ranking compared to other clients.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Per-client profit and loss breakdown with revenue, costs, and net profit.',
        'Effective hourly rate calculation including non-billable time.',
        'Overhead allocation based on percentage of total working hours.',
        'Multi-period comparison to track profitability trends over time.',
        'Client ranking dashboard sorted by profit margin or effective rate.',
        'Visual charts comparing revenue, costs, and profit across clients.',
        'Export reports for accounting or business review.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Identifying your most and least profitable clients for strategic planning.',
        'Building a business case to raise rates with a specific client.',
        'Deciding which clients to prioritize when capacity is limited.',
        'Evaluating whether to continue a long-standing but low-margin relationship.',
        'Setting profitability targets for new client onboarding.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'High-Revenue, Low-Profit Client',
          description:
            'Client A pays $12,000/quarter but requires 160 hours of work (including 40 non-billable). After $2,000 in direct costs and $1,500 overhead, net profit is $8,500--an effective rate of $53/hr.',
        },
        {
          title: 'Low-Revenue, High-Profit Client',
          description:
            'Client B pays $5,000/quarter for 40 total hours. With $300 in costs and $500 overhead, net profit is $4,200--an effective rate of $105/hr, double Client A.',
        },
        {
          title: 'Retainer Client Profitability',
          description:
            'A $4,000/month retainer client averages 35 hours/month. After $800 in costs, the effective rate is $91/hr--well above the freelancer\'s $75/hr target.',
        },
        {
          title: 'Project-Based Evaluation',
          description:
            'A one-time project billed at $8,000 took 110 hours due to scope creep, plus $500 in stock photos. Net profit: $7,500, effective rate: $68/hr--below target, flagging a scope management issue.',
        },
        {
          title: 'Year-Over-Year Trend',
          description:
            'Client C\'s profitability dropped from $95/hr effective in Year 1 to $62/hr in Year 2 as communication overhead increased. The data supports a rate renegotiation conversation.',
        },
        {
          title: 'Portfolio Optimization',
          description:
            'Ranking 8 clients by profitability reveals the bottom 2 consume 35 % of time but generate only 15 % of profit. Replacing them with clients at average profitability would increase annual income by $18,000.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Effective Hourly Rate',
          definition:
            'Net profit from a client divided by total hours spent (billable and non-billable), showing your true earnings per hour.',
        },
        {
          term: 'Overhead Allocation',
          definition:
            'The process of distributing shared business costs (rent, tools, insurance) to individual clients based on their share of your workload.',
        },
        {
          term: 'Non-Billable Time',
          definition:
            'Hours spent on a client\'s work that are not invoiced, such as emails, meetings, revisions beyond scope, and admin tasks.',
        },
        {
          term: 'Profit Margin',
          definition:
            'Net profit divided by revenue, expressed as a percentage. A 40 % margin means you keep $0.40 of every dollar earned.',
        },
        {
          term: 'Direct Costs',
          definition:
            'Expenses directly attributable to a specific client or project, such as subcontractor fees, stock assets, or travel.',
        },
        {
          term: 'Client Lifetime Value (CLV)',
          definition:
            'The total net profit expected from a client over the entire duration of the business relationship.',
        },
        {
          term: 'Scope Creep',
          definition:
            'The gradual expansion of project requirements beyond the original agreement, increasing costs without proportional revenue.',
        },
        {
          term: 'Opportunity Cost',
          definition:
            'The potential income lost by spending time on a low-profit client instead of a higher-value opportunity.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'How do I track non-billable hours?',
          answer:
            'Use a time tracking tool or simple spreadsheet to log all time spent per client, including emails, meetings, and admin. Even rough estimates are better than ignoring non-billable time.',
        },
        {
          question: 'What is a healthy profit margin for freelancers?',
          answer:
            'Most freelancers should aim for 30-50 % profit margins after all costs. Below 20 % signals a pricing or efficiency problem.',
        },
        {
          question: 'Should I fire unprofitable clients?',
          answer:
            'Not necessarily. First try raising your rates, reducing scope, or streamlining processes. If profitability still cannot reach your target, transitioning the client may be the right move.',
        },
        {
          question: 'How often should I review profitability?',
          answer:
            'Quarterly reviews catch trends early. Monthly is ideal for high-volume freelancers with many active clients.',
        },
        {
          question: 'Does this account for taxes?',
          answer:
            'This tool measures pre-tax profitability. For after-tax analysis, apply your effective tax rate to the net profit figure.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Track all time--not just billable hours--to get an accurate picture of per-client costs.',
        'Include a reasonable overhead allocation; ignoring fixed costs inflates apparent profitability.',
        'Compare effective hourly rates across clients, not just total revenue.',
        'Use profitability data to strengthen rate negotiation conversations with evidence.',
        'Set a minimum acceptable effective rate and use it as a filter for new opportunities.',
        'Review and update your overhead costs annually to keep allocations accurate.',
        'Focus on improving your top clients\' experience rather than over-serving low-profit ones.',
      ],
    },
  },
  relatedTools: [
    'hourly-rate-calculator',
    'invoice-generator',
    'meeting-cost-calculator',
    'tax-bracket-estimator',
    'late-payment-fee-calculator',
  ],
  seo: {
    metaTitle: 'Client Profitability Estimator - Wiki | UnTrackt',
    metaDescription:
      'Measure true freelance client profitability by tracking revenue, time, expenses, and overhead. Optimize your client portfolio for maximum earnings.',
    keywords: [
      'client profitability',
      'freelance profit calculator',
      'effective hourly rate',
      'client revenue analysis',
      'overhead allocation',
      'freelance profit margin',
      'client portfolio optimization',
      'profitability tracking',
    ],
  },
};
