export default {
  id: 'compound-interest-calculator',
  title: 'Compound Interest Calculator',
  description: 'Calculate how your investments grow over time with the power of compound interest.',
  content: {
    whatIs: {
      heading: 'What is a Compound Interest Calculator?',
      body: 'A Compound Interest Calculator estimates how an investment or savings balance grows over time when interest is earned on both the original principal and the accumulated interest from previous periods. Unlike simple interest, which is calculated only on the initial amount, compound interest accelerates wealth building by reinvesting earnings. This tool lets you input a principal amount, interest rate, compounding frequency, and time horizon to project your future balance.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Understanding compound interest is fundamental to making informed financial decisions. This calculator helps you visualize the long-term impact of saving and investing, compare different interest rates or compounding frequencies, set realistic financial goals, and appreciate why starting early matters. Whether you are planning retirement contributions, evaluating a savings account, or comparing investment options, seeing exact numbers motivates better money habits.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your initial principal amount (the starting investment or deposit).',
        'Specify the annual interest rate as a percentage.',
        'Choose the compounding frequency -- monthly, quarterly, semi-annually, or annually.',
        'Enter the investment duration in years.',
        'Optionally add a recurring monthly or annual contribution.',
        'Click "Calculate" to see the projected future value, total interest earned, and a breakdown over time.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports multiple compounding frequencies: daily, monthly, quarterly, semi-annual, and annual.',
        'Allows additional recurring contributions to model real-world savings plans.',
        'Displays a year-by-year or period-by-period growth breakdown.',
        'Shows total interest earned separately from total contributions.',
        'Instant recalculation as you adjust inputs for quick comparisons.',
        'Works entirely in the browser -- no data is sent to any server.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Projecting the growth of a retirement savings account over 20-30 years.',
        'Comparing savings accounts with different interest rates or compounding frequencies.',
        'Estimating how much a college fund will be worth when a child turns 18.',
        'Determining how long it takes for an investment to reach a specific goal.',
        'Evaluating the true cost of debt when interest compounds against you.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Basic Savings Growth', description: 'Invest $5,000 at 6% annual interest compounded monthly for 10 years. The calculator shows a future value of approximately $9,070, earning about $4,070 in interest.' },
        { title: 'Monthly Contributions', description: 'Start with $1,000 and add $200/month at 7% compounded monthly for 20 years. You contribute $49,000 total and end up with roughly $106,000.' },
        { title: 'Compounding Frequency Comparison', description: 'Compare $10,000 at 5% for 15 years compounded annually ($20,789) vs. monthly ($21,137) to see how frequency affects returns.' },
        { title: 'Early Start Advantage', description: 'Person A invests $5,000/year from age 25-35 then stops. Person B invests $5,000/year from age 35-65. At 8%, Person A ends up with more despite contributing less.' },
        { title: 'High-Yield Savings Account', description: 'Deposit $20,000 in a 4.5% APY high-yield savings account compounded daily for 5 years. The balance grows to approximately $24,986.' },
        { title: 'Debt Compounding', description: 'See how a $3,000 credit card balance at 22% APR compounded daily grows to over $3,700 in just one year if no payments are made.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Principal', definition: 'The initial amount of money invested or deposited before any interest is earned.' },
        { term: 'Compound Interest', definition: 'Interest calculated on both the initial principal and the accumulated interest from previous periods.' },
        { term: 'Simple Interest', definition: 'Interest calculated only on the original principal, without compounding.' },
        { term: 'APR (Annual Percentage Rate)', definition: 'The yearly interest rate charged on a loan or earned on an investment, not accounting for compounding.' },
        { term: 'APY (Annual Percentage Yield)', definition: 'The effective annual rate of return that accounts for the effect of compounding interest.' },
        { term: 'Compounding Frequency', definition: 'How often accumulated interest is added back to the principal -- daily, monthly, quarterly, or annually.' },
        { term: 'Future Value', definition: 'The projected worth of an investment at a specified date in the future, including all compounded interest.' },
        { term: 'Time Horizon', definition: 'The total length of time an investment is held before it is liquidated or the goal is reached.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between compound and simple interest?', answer: 'Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously accumulated interest, causing the balance to grow exponentially over time.' },
        { question: 'How often should interest compound for the best results?', answer: 'More frequent compounding (e.g., daily vs. annually) yields slightly higher returns because interest is reinvested sooner. However, the difference narrows at very high frequencies.' },
        { question: 'Does this calculator account for taxes?', answer: 'This calculator shows pre-tax growth. In practice, investment gains may be subject to capital gains tax, income tax, or other levies depending on your jurisdiction and account type.' },
        { question: 'Can I use this for debt calculations?', answer: 'Yes. Enter the debt amount as the principal and the loan APR as the interest rate. The result shows how much you would owe over time if no payments are made.' },
        { question: 'What is a realistic rate of return to use?', answer: 'Savings accounts typically offer 1-5%, bonds 3-6%, and diversified stock portfolios have historically averaged 7-10% annually before inflation. Use conservative estimates for planning.' },
        { question: 'Is the result guaranteed?', answer: 'No. The calculator assumes a constant interest rate. Real-world returns fluctuate, and past performance does not guarantee future results.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start investing as early as possible -- even small amounts benefit enormously from compounding over decades.',
        'Use conservative interest rate estimates to avoid overestimating future wealth.',
        'Compare APY rather than APR when evaluating savings accounts to get a true picture of earnings.',
        'Reinvest dividends and interest rather than withdrawing them to maximize the compound effect.',
        'Factor in inflation to understand the real purchasing power of your future balance.',
        'Run multiple scenarios with different contribution amounts and rates to build a flexible plan.',
        'Remember that compound interest works against you on debt -- pay off high-interest balances quickly.',
        'Review and adjust your projections annually as rates and contributions change.'
      ]
    }
  },
  relatedTools: ['loan-calculator', 'savings-goal-calculator', 'retirement-calculator', 'rule-of-72-calculator', 'sip-calculator'],
  seo: {
    metaTitle: 'Compound Interest Calculator -- Project Investment Growth | Untrackt',
    metaDescription: 'Calculate how your savings and investments grow over time with compound interest. Compare compounding frequencies, add contributions, and plan your financial future.',
    keywords: ['compound interest calculator', 'investment growth', 'savings calculator', 'compounding frequency', 'future value calculator', 'interest on interest', 'APY calculator']
  }
};
