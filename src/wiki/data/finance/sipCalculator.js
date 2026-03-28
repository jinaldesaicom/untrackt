export default {
  id: 'sip-calculator',
  title: 'SIP Calculator',
  description: 'Calculate returns from Systematic Investment Plans in mutual funds with lumpsum comparison.',
  content: {
    whatIs: {
      heading: 'What is a SIP Calculator?',
      body: 'A SIP (Systematic Investment Plan) Calculator estimates the future value of regular, fixed investments made into mutual funds or other investment vehicles over a specified period. Instead of investing a large sum at once, SIPs let you invest a fixed amount at regular intervals -- typically monthly. This calculator projects the total corpus you will accumulate, the wealth gained, and allows you to compare SIP returns against a one-time lumpsum investment.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'SIPs are one of the most popular and disciplined ways to build wealth over time, especially for investors who cannot commit a large lumpsum upfront. This calculator helps you set realistic expectations for your mutual fund investments, understand how different monthly amounts and time horizons affect wealth accumulation, and take advantage of rupee cost averaging. It makes the abstract concept of long-term investing tangible with concrete numbers.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your monthly SIP investment amount.',
        'Specify the expected annual rate of return.',
        'Set the investment duration in years.',
        'Optionally enter a lumpsum amount for comparison.',
        'Click "Calculate" to see the projected corpus, total invested amount, and estimated wealth gain.',
        'Compare the SIP projection with a lumpsum investment over the same period.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Projects the future value of monthly SIP investments with compound growth.',
        'Compares SIP returns against lumpsum investing over the same duration.',
        'Shows the total amount invested versus the wealth gained from returns.',
        'Supports step-up SIP modeling where you increase contributions annually.',
        'Calculates the monthly SIP needed to reach a specific financial goal.',
        'Provides clear visualization of investment growth over time.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Planning monthly mutual fund investments for long-term wealth creation.',
        'Determining how much to invest monthly to accumulate a target corpus.',
        'Comparing the outcome of starting SIPs now versus waiting a few years.',
        'Modeling step-up SIPs where annual contributions increase with salary growth.',
        'Evaluating whether to invest via SIP or deploy a lumpsum when markets are volatile.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Basic SIP Growth', description: 'Invest ₹10,000/month at 12% expected return for 15 years. Total investment: ₹18,00,000. Estimated corpus: approximately ₹50,45,000, with ₹32,45,000 in wealth gain.' },
        { title: 'SIP vs. Lumpsum', description: 'Compare ₹5,000/month SIP for 10 years at 10% (corpus: ₹10,32,000) against a ₹6,00,000 lumpsum at 10% for 10 years (corpus: ₹15,56,000). Lumpsum grows more due to full compounding, but SIP is more practical.' },
        { title: 'Goal-Based SIP', description: 'To accumulate ₹1 crore in 20 years at 12% returns, you need a monthly SIP of approximately ₹10,100.' },
        { title: 'Step-Up SIP', description: 'Start with ₹8,000/month and increase by 10% each year for 15 years at 12% returns. The corpus grows to about ₹72,00,000 -- significantly more than a flat ₹8,000 SIP.' },
        { title: 'Early Start Advantage', description: 'Starting a ₹5,000 SIP at age 25 for 30 years at 12% yields ₹1.76 crore. Starting at 35 for 20 years yields only ₹49.9 lakh -- starting early multiplies wealth dramatically.' },
        { title: 'Short-Term SIP', description: 'Invest ₹15,000/month for 3 years at 8% for a near-term goal. Corpus: approximately ₹5,98,000 on total investment of ₹5,40,000.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'SIP (Systematic Investment Plan)', definition: 'An investment method where a fixed amount is invested at regular intervals into a mutual fund or similar vehicle.' },
        { term: 'Lumpsum Investment', definition: 'Investing a large single amount at one time, as opposed to spreading it out through periodic investments.' },
        { term: 'NAV (Net Asset Value)', definition: 'The per-unit market value of a mutual fund, used to determine how many units you purchase with each SIP installment.' },
        { term: 'Rupee Cost Averaging', definition: 'A benefit of SIPs where you buy more units when prices are low and fewer when prices are high, averaging out the purchase cost over time.' },
        { term: 'CAGR (Compound Annual Growth Rate)', definition: 'The annualized rate of return that represents the geometric progression of an investment over a period.' },
        { term: 'Step-Up SIP', definition: 'A SIP variant where the monthly contribution amount increases by a fixed percentage each year, typically aligned with income growth.' },
        { term: 'Corpus', definition: 'The total accumulated investment value at the end of the investment period, including principal and returns.' },
        { term: 'XIRR', definition: 'Extended Internal Rate of Return -- a method to calculate returns on investments made at irregular intervals, often used to evaluate SIP performance.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a good expected return rate for SIP calculations?', answer: 'Equity mutual funds have historically delivered 10-15% CAGR over long periods in India. Use 10-12% for balanced estimates. Debt funds typically return 6-8%.' },
        { question: 'Is SIP better than lumpsum investing?', answer: 'SIP is generally better for managing risk through rupee cost averaging, especially in volatile markets. Lumpsum investing can yield higher returns in a consistently rising market. SIP is more practical for most salaried investors.' },
        { question: 'Can I stop or modify my SIP anytime?', answer: 'Yes, SIPs are flexible. You can pause, stop, increase, or decrease your SIP amount at any time without penalties in most mutual fund schemes.' },
        { question: 'Are SIP returns guaranteed?', answer: 'No. SIP returns depend on market performance. The calculator shows estimates based on assumed returns. Actual results will vary based on market conditions.' },
        { question: 'What is a step-up SIP and should I use one?', answer: 'A step-up SIP increases your monthly contribution by a set percentage each year. It is highly recommended as it aligns with salary growth and dramatically boosts the final corpus.' },
        { question: 'How long should I invest via SIP?', answer: 'Longer durations (10+ years) maximize the benefits of compounding and rupee cost averaging. SIPs work best as a long-term wealth-building strategy.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start your SIP as early as possible -- even small amounts grow significantly over long periods.',
        'Use step-up SIPs to increase contributions by 5-10% annually as your income grows.',
        'Do not stop SIPs during market downturns -- that is when you benefit most from rupee cost averaging.',
        'Choose direct plans over regular plans to save on commissions and boost net returns.',
        'Diversify across equity, debt, and hybrid funds based on your risk tolerance and goals.',
        'Set specific goals (retirement, education, home) and run separate SIPs for each.',
        'Review your SIP portfolio annually but avoid frequent switching based on short-term performance.',
        'Use the goal-based calculation to work backward from your target corpus to determine the right SIP amount.'
      ]
    }
  },
  relatedTools: ['compound-interest-calculator', 'retirement-calculator', 'savings-goal-calculator', 'rule-of-72-calculator'],
  seo: {
    metaTitle: 'SIP Calculator -- Mutual Fund Returns & Lumpsum Comparison | Untrackt',
    metaDescription: 'Calculate the future value of your SIP investments in mutual funds. Compare SIP vs lumpsum, model step-up contributions, and plan your wealth-building goals.',
    keywords: ['SIP calculator', 'systematic investment plan', 'mutual fund calculator', 'SIP returns', 'lumpsum vs SIP', 'step-up SIP', 'rupee cost averaging']
  }
};
