export default {
  id: 'rule-of-72-calculator',
  title: 'Rule of 72 Calculator',
  description: 'Quickly estimate how long it takes for an investment to double using the Rule of 72.',
  content: {
    whatIs: {
      heading: 'What is a Rule of 72 Calculator?',
      body: 'The Rule of 72 is a simple mathematical shortcut that estimates the number of years it takes for an investment to double in value at a given fixed annual rate of return. You divide 72 by the annual interest or return rate to get the approximate doubling time. This calculator automates that calculation and also provides the exact doubling time using logarithmic math so you can compare the estimate against the precise figure.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'The Rule of 72 is one of the most useful mental math tools in finance. It helps you quickly gauge the growth potential of investments, savings accounts, or even the erosion of purchasing power through inflation -- all without a full calculator. This tool extends the quick estimate with precise calculations and lets you explore multiple rates side by side to build financial intuition.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the annual interest rate or expected rate of return.',
        'The calculator instantly shows the estimated doubling time using the Rule of 72.',
        'Compare with the exact doubling time calculated using the logarithmic formula.',
        'Optionally enter multiple rates to compare doubling times side by side.',
        'Use the reverse mode to find what rate you need to double your money in a specific number of years.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Instant Rule of 72 estimate for any return rate.',
        'Exact doubling time using the precise logarithmic formula for comparison.',
        'Reverse calculation: find the required rate to double in a target number of years.',
        'Side-by-side comparison of multiple interest rates.',
        'Works for both investment growth and inflation erosion scenarios.',
        'Simple, clean interface for quick mental model building.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Quickly estimating how long an investment or savings account will take to double.',
        'Understanding how inflation halves the purchasing power of cash over time.',
        'Comparing the growth potential of different investments at varying return rates.',
        'Setting expectations for long-term portfolio growth during financial planning.',
        'Teaching or learning fundamental investment concepts.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Stock Market Returns', description: 'At 8% average annual returns, 72 ÷ 8 = 9 years to double. A $10,000 investment becomes $20,000 in about 9 years. Exact doubling: 9.01 years.' },
        { title: 'Savings Account', description: 'At a 4% savings rate, 72 ÷ 4 = 18 years to double. The exact figure is 17.67 years -- the rule is a close approximation.' },
        { title: 'High-Growth Investment', description: 'At 12% returns, 72 ÷ 12 = 6 years to double. Starting with $50,000, you would have $100,000 in roughly 6 years and $200,000 in 12 years.' },
        { title: 'Inflation Impact', description: 'At 3% inflation, 72 ÷ 3 = 24 years for prices to double. Your $100 in purchasing power today is worth about $50 in 24 years.' },
        { title: 'Required Rate', description: 'Want to double your money in 5 years? You need 72 ÷ 5 = 14.4% annual returns -- aggressive but possible with growth-oriented investments.' },
        { title: 'Low-Rate Environment', description: 'At 1.5% (typical checking account), 72 ÷ 1.5 = 48 years to double. This shows why keeping large sums in low-yield accounts significantly hinders growth.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Rule of 72', definition: 'A formula estimating the years to double an investment: divide 72 by the annual rate of return.' },
        { term: 'Doubling Time', definition: 'The number of years required for an investment to grow to twice its current value at a given rate.' },
        { term: 'Rate of Return', definition: 'The annual percentage gain or loss on an investment relative to its starting value.' },
        { term: 'Compound Growth', definition: 'Growth where returns are reinvested, causing the investment to grow at an accelerating rate over time.' },
        { term: 'Rule of 69.3', definition: 'A more precise variation of the Rule of 72 used for continuously compounded interest. The formula is 69.3 ÷ rate.' },
        { term: 'Rule of 114', definition: 'An extension that estimates the time for an investment to triple: divide 114 by the annual rate of return.' },
        { term: 'Purchasing Power', definition: 'The quantity of goods or services that a unit of money can buy, which decreases over time due to inflation.' },
        { term: 'Real Rate of Return', definition: 'The return on an investment after adjusting for inflation, reflecting actual purchasing power growth.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate is the Rule of 72?', answer: 'It is most accurate for rates between 6% and 10%. At very low or very high rates, the estimate deviates slightly from the exact logarithmic calculation, but it remains a useful approximation.' },
        { question: 'Can the Rule of 72 be used for things other than investments?', answer: 'Yes. It works for any exponential growth or decay -- including inflation, population growth, GDP growth, or even the spread of information.' },
        { question: 'What is the Rule of 69.3?', answer: 'The Rule of 69.3 is mathematically more precise for continuous compounding. The Rule of 72 uses 72 because it has more integer factors, making mental math easier.' },
        { question: 'Does the Rule of 72 work for negative rates?', answer: 'Yes. At -3% per year, 72 ÷ 3 = 24 years for your investment to halve. This is useful for understanding the impact of inflation or declining asset values.' },
        { question: 'How do I calculate tripling time?', answer: 'Use the Rule of 114: divide 114 by the annual rate. At 8%, an investment triples in about 114 ÷ 8 = 14.25 years.' },
        { question: 'Why is 72 used instead of another number?', answer: '72 is divisible by many small integers (2, 3, 4, 6, 8, 9, 12), making mental division easy. It also closely approximates the natural log of 2 (0.693) scaled by 100.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use the Rule of 72 for quick back-of-the-envelope estimates, then verify with exact calculations for important decisions.',
        'Apply the rule to inflation to understand how quickly your cash loses purchasing power.',
        'Compare doubling times of different investments to build intuition about long-term growth differences.',
        'Remember that real returns (after inflation) are what matter -- subtract inflation from your nominal rate before applying the rule.',
        'Use the tripling rule (Rule of 114) and quadrupling rule (Rule of 144) for extended projections.',
        'Teach family members and young investors the Rule of 72 -- it makes compounding tangible and motivating.',
        'Be cautious with high assumed rates -- sustained 15%+ returns are unusual for most asset classes.',
        'Combine the Rule of 72 with your FIRE or retirement calculations for quick sanity checks.'
      ]
    }
  },
  relatedTools: ['compound-interest-calculator', 'fire-number-calculator', 'inflation-calculator', 'sip-calculator'],
  seo: {
    metaTitle: 'Rule of 72 Calculator -- Investment Doubling Time | Untrackt',
    metaDescription: 'Estimate how long it takes your money to double with the Rule of 72. Compare approximate vs exact doubling times and find the rate needed for your target.',
    keywords: ['Rule of 72', 'doubling time calculator', 'investment doubling', 'compound interest rule', 'Rule of 72 calculator', 'money doubling time']
  }
};
