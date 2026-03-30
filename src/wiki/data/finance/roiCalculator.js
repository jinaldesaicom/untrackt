export default {
  id: 'roi-calculator',
  title: 'ROI Calculator',
  description: 'Calculate the return on investment for any project, asset, or business decision.',
  content: {
    whatIs: {
      heading: 'What is an ROI Calculator?',
      body: 'An ROI (Return on Investment) Calculator measures the profitability of an investment by comparing the net gain or loss to the initial cost. Expressed as a percentage, ROI tells you how efficiently your money was used. This tool accepts the initial investment cost and the final value (or revenue generated) to calculate ROI percentage, net profit, and annualized returns for time-adjusted comparisons.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Every financial decision is ultimately an investment -- whether buying stocks, launching a marketing campaign, purchasing equipment, or pursuing education. ROI provides a universal metric to compare completely different opportunities on the same scale. This calculator helps you objectively evaluate past decisions, compare potential investments, justify business expenditures, and make data-driven choices about where to allocate money and resources.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the initial investment amount (total cost).',
        'Enter the final value or total revenue generated from the investment.',
        'Optionally specify the investment duration for annualized ROI.',
        'Click "Calculate" to see ROI percentage, net profit/loss, and annualized return.',
        'Compare multiple investments by running separate calculations.',
        'Use the results to decide which investment delivers the best return per dollar spent.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates basic ROI as a simple percentage.',
        'Shows net profit or loss in absolute dollar terms.',
        'Computes annualized ROI for fair comparisons across different time periods.',
        'Supports gain-based and cost-based ROI calculations.',
        'Handles both positive and negative returns clearly.',
        'Clean interface for quick, iterative comparisons.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Evaluating the return on a stock, real estate, or business investment.',
        'Measuring the effectiveness of a marketing campaign or advertising spend.',
        'Comparing the ROI of different education or certification programs.',
        'Justifying capital expenditures to stakeholders or management.',
        'Analyzing the profitability of a real estate flip or rental property.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Stock Investment', description: 'Bought $10,000 in stocks, sold for $13,500 after 3 years. ROI: 35%. Annualized ROI: approximately 10.5% per year.' },
        { title: 'Marketing Campaign', description: 'Spent $5,000 on ads that generated $18,000 in revenue. Net profit: $13,000. ROI: 260%.' },
        { title: 'Real Estate', description: 'Purchased a property for $200,000, sold for $265,000 after 5 years. ROI: 32.5%. Annualized: about 5.8% per year.' },
        { title: 'Education Investment', description: 'Spent $40,000 on a certification. Within 2 years, it led to a $15,000/year salary increase. 2-year ROI: 75%. Ongoing returns increase over time.' },
        { title: 'Equipment Purchase', description: 'A $12,000 machine reduces labor costs by $5,000/year. After 3 years, total savings: $15,000. ROI: 25%. Payback period: 2.4 years.' },
        { title: 'Negative ROI', description: 'Invested $8,000 in a venture that returned only $6,000. Net loss: $2,000. ROI: -25%. Helps identify failed investments for future decisions.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'ROI (Return on Investment)', definition: 'A percentage measuring the profit or loss from an investment relative to its cost: (Gain - Cost) / Cost × 100.' },
        { term: 'Net Profit', definition: 'The total return minus the total cost of the investment.' },
        { term: 'Annualized ROI', definition: 'ROI adjusted for time, showing the equivalent annual return for fair comparison of investments held for different durations.' },
        { term: 'Initial Investment', definition: 'The total upfront cost or capital deployed for the investment.' },
        { term: 'Final Value', definition: 'The total value received from the investment, including any revenue, sale proceeds, or residual value.' },
        { term: 'Payback Period', definition: 'The time required for an investment to generate enough returns to recover the initial cost.' },
        { term: 'Cost of Capital', definition: 'The minimum return required on an investment to justify the use of funds, considering alternative opportunities.' },
        { term: 'IRR (Internal Rate of Return)', definition: 'The discount rate at which the net present value of all cash flows from an investment equals zero, providing a more nuanced return measure.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a good ROI?', answer: 'It depends on the context. Stock markets historically average 7-10% annually. Real estate targets 8-12%. Marketing campaigns often aim for 200%+. Compare ROI to your cost of capital and available alternatives.' },
        { question: 'How is ROI different from profit?', answer: 'Profit is the absolute dollar amount gained. ROI expresses profit as a percentage of the investment cost, making it easier to compare investments of different sizes.' },
        { question: 'Does ROI account for time?', answer: 'Basic ROI does not -- a 50% return over 1 year is much better than 50% over 10 years. Use annualized ROI for fair time-adjusted comparisons.' },
        { question: 'Can ROI be negative?', answer: 'Yes. A negative ROI means you lost money on the investment. It is still useful information for evaluating and learning from past decisions.' },
        { question: 'Does this calculator include fees and taxes?', answer: 'Include all costs (fees, commissions, taxes) in your initial cost input and deduct them from your final value for the most accurate ROI.' },
        { question: 'How is annualized ROI calculated?', answer: 'Annualized ROI = ((1 + ROI)^(1/years) - 1) × 100. It computes the equivalent annual return, enabling apples-to-apples comparison across different holding periods.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Include all costs -- purchase price, fees, taxes, maintenance -- for an accurate ROI calculation.',
        'Use annualized ROI when comparing investments held for different lengths of time.',
        'Consider risk alongside ROI -- higher returns often come with higher risk.',
        'Factor in opportunity cost: what else could you have done with the same money?',
        'Track ROI on business expenditures (marketing, equipment, training) to optimize budget allocation.',
        'Use ROI as one of several metrics -- also consider payback period, NPV, and IRR for complex decisions.',
        'Be cautious with projected ROI -- use conservative estimates to avoid overcommitting.',
        'Revisit ROI calculations after investments mature to learn from actual outcomes versus projections.'
      ]
    }
  },
  relatedTools: ['compound-interest-calculator', 'break-even-calculator', 'rule-of-72-calculator', 'inflation-calculator'],
  seo: {
    metaTitle: 'ROI Calculator -- Return on Investment & Annualized Returns | Untrackt',
    metaDescription: 'Calculate the return on any investment, project, or business decision. Compare ROI percentages, net profit, and annualized returns across different opportunities.',
    keywords: ['ROI calculator', 'return on investment', 'investment return calculator', 'annualized ROI', 'profitability calculator', 'net profit calculator', 'investment comparison']
  }
};
