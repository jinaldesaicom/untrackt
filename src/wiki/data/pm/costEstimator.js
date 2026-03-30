export default {
  id: 'cost-estimator',
  title: 'Cost Estimator',
  description: 'Estimate project costs — enter labor rates, resource hours, and expenses to calculate total project cost.',
  content: {
    whatIs: {
      heading: 'What is the Cost Estimator?',
      body: 'The Cost Estimator calculates total project costs by combining labor costs (hourly rates × hours), material costs, and other expenses. Enter team member rates, estimated hours per task, and any fixed costs. The tool sums everything into a total project budget with breakdowns by category and person.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Accurate cost estimation prevents budget overruns and builds client trust. This tool structures the estimation process, ensures nothing is forgotten, and provides a clear breakdown that stakeholders can review and approve.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add team members or roles with hourly or daily rates.',
        'Enter estimated hours per task from your effort estimates.',
        'Add material costs, licenses, or other fixed expenses.',
        'Add contingency percentage for risk buffer.',
        'Review the cost breakdown by category and person.',
        'Export the cost estimate for proposals or budget approval.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Labor cost calculation (rate × hours).',
        'Multiple rate types (hourly, daily, fixed).',
        'Material and expense line items.',
        'Contingency percentage calculation.',
        'Cost breakdown by role, task, and category.',
        'Total project cost summary.',
        'Export as CSV or printable report.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating project budgets for approval.',
        'Preparing cost estimates for client proposals.',
        'Comparing in-house vs. outsourced development costs.',
        'Estimating costs for different project scope options.',
        'Tracking estimated vs. actual costs during execution.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Software Project', description: '2 developers × $100/hr × 400 hrs + 1 designer × $90/hr × 100 hrs + $5K tools = $94K + 15% contingency.' },
        { title: 'Freelance Proposal', description: 'Design: 20 hrs × $75 + Development: 60 hrs × $100 + Hosting: $200 = $7,700 total.' },
        { title: 'Event Budget', description: 'Venue: $5K, Catering: $3K, AV: $2K, Marketing: $1K, Staff: 100 hrs × $25 = $13.5K.' },
        { title: 'Scope Comparison', description: 'MVP: $40K vs. Full Scope: $120K — helping stakeholders choose the right approach.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Labor Cost', definition: 'The cost of human work, calculated as hours worked multiplied by the hourly rate.' },
        { term: 'Fixed Cost', definition: 'A cost that does not vary with the amount of work, such as a software license or venue rental.' },
        { term: 'Variable Cost', definition: 'A cost that changes proportionally with the amount of work performed.' },
        { term: 'Contingency', definition: 'An additional percentage added to the estimate to cover unforeseen costs and risks.' },
        { term: 'Bill Rate', definition: 'The rate charged to a client for work performed, which may differ from the internal cost rate.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How much contingency should I add?', answer: '10-20% is typical. Higher contingency (25-30%) for projects with significant unknowns.' },
        { question: 'Should I estimate in hours or days?', answer: 'Hours are more precise. Convert to days for high-level estimates (1 day = 6-8 productive hours).' },
        { question: 'How do I handle rate differences?', answer: 'Enter each role with its specific rate. The tool calculates per-role and total costs separately.' },
        { question: 'Should overhead be included?', answer: 'Yes. Include overhead costs (office, tools, management) as a percentage or line item for complete cost estimates.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Base cost estimates on detailed effort estimates, not rough guesses.',
        'Include all cost categories: labor, tools, infrastructure, overhead.',
        'Add appropriate contingency based on project risk level.',
        'Show the breakdown — stakeholders trust transparent estimates.',
        'Compare estimates against past projects for reasonableness.',
        'Update cost estimates when scope changes and communicate the impact.'
      ]
    }
  },
  relatedTools: ['effort-estimation-calculator', 'resource-allocation-planner', 'workload-calculator', 'project-status-report'],
  seo: {
    metaTitle: 'Cost Estimator — Project Budget Calculator | UnTrackt Wiki',
    metaDescription: 'Estimate project costs with labor rates, resource hours, materials, and contingency. Get clear budget breakdowns for proposals and approvals.',
    keywords: ['cost estimator', 'project budget', 'cost estimation', 'project costs', 'budget calculator', 'labor cost calculator']
  }
};
