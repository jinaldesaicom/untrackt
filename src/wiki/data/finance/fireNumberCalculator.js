export default {
  id: 'fire-number-calculator',
  title: 'FIRE Number Calculator',
  description: 'Calculate the investment portfolio size needed to achieve financial independence and retire early.',
  content: {
    whatIs: {
      heading: 'What is a FIRE Number Calculator?',
      body: 'A FIRE Number Calculator determines the total investment portfolio size you need to achieve Financial Independence and Retire Early (FIRE). Based on the widely cited 4% rule from the Trinity Study, your FIRE number is typically 25 times your expected annual expenses. Once your portfolio reaches this amount, you can theoretically withdraw enough each year to cover living costs without depleting your savings. This tool lets you input your annual expenses, expected investment returns, and current savings to project when you will reach financial independence.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'The FIRE movement empowers people to take control of their financial future and escape the traditional work-until-65 path. This calculator gives you a concrete target number to aim for, shows how your savings rate and investment returns affect your timeline, and helps you experiment with different spending levels to see their dramatic impact on your FIRE date. Having a clear number turns an abstract dream into a measurable, actionable goal.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your expected annual expenses in retirement (or current annual spending as a baseline).',
        'Input your current total invested portfolio value.',
        'Specify your annual savings or investment contributions.',
        'Enter an expected average annual return on investments.',
        'Optionally adjust the safe withdrawal rate (default is 4%).',
        'Review your FIRE number, projected timeline, and savings milestones.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates your FIRE number based on annual expenses and withdrawal rate.',
        'Projects the number of years until you reach financial independence.',
        'Supports adjustable safe withdrawal rates (3%, 3.5%, 4%, etc.) for conservative or aggressive planning.',
        'Models different savings rates and their impact on the FIRE timeline.',
        'Accounts for expected investment returns to project portfolio growth.',
        'Shows the relationship between spending reduction and years-to-FIRE.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting a concrete financial independence target to guide savings and investment decisions.',
        'Exploring how cutting expenses by a specific amount accelerates your FIRE date.',
        'Comparing Lean FIRE, regular FIRE, and Fat FIRE scenarios based on different spending levels.',
        'Evaluating whether a career change or sabbatical is financially feasible.',
        'Planning a semi-retirement strategy with part-time income supplementing withdrawals.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard FIRE', description: 'With $40,000 annual expenses and a 4% withdrawal rate, your FIRE number is $1,000,000. If you save $2,000/month at 7% returns with $100,000 already invested, you reach FIRE in roughly 15 years.' },
        { title: 'Lean FIRE', description: 'Reduce annual expenses to $25,000. Your FIRE number drops to $625,000 -- significantly more achievable and potentially reachable in under 10 years with aggressive saving.' },
        { title: 'Fat FIRE', description: 'If you want $80,000/year in retirement, your FIRE number is $2,000,000. This requires a longer timeline or much higher savings rate but allows a more comfortable lifestyle.' },
        { title: 'Impact of Savings Rate', description: 'At a 50% savings rate on a $80,000 income, you save $40,000/year. At 7% returns, you could reach a $1M FIRE number from zero in about 15 years.' },
        { title: 'Conservative Withdrawal', description: 'Using a 3.5% withdrawal rate instead of 4% for extra safety raises the FIRE number from $1,000,000 to $1,142,857 for $40,000 expenses.' },
        { title: 'Coast FIRE', description: 'At age 30 with $200,000 invested and 7% average returns, your portfolio grows to $1,520,000 by age 60 without any additional contributions -- hitting a $60,000/year FIRE target.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'FIRE', definition: 'Financial Independence, Retire Early -- a movement focused on extreme saving and investing to retire far earlier than the traditional age.' },
        { term: 'FIRE Number', definition: 'The total portfolio value needed to sustain annual withdrawals equal to your expenses indefinitely.' },
        { term: '4% Rule', definition: 'A guideline stating you can withdraw 4% of your portfolio annually with a high probability of not running out of money over 30 years.' },
        { term: 'Safe Withdrawal Rate (SWR)', definition: 'The percentage of your portfolio you withdraw each year in retirement, typically 3-4%, chosen to minimize the risk of depleting funds.' },
        { term: 'Lean FIRE', definition: 'Reaching financial independence with a minimal budget, typically under $40,000/year in expenses.' },
        { term: 'Fat FIRE', definition: 'Achieving financial independence with a higher spending level, often $80,000-$100,000+ per year.' },
        { term: 'Coast FIRE', definition: 'Having enough invested that compound growth alone will reach your FIRE number by retirement age, even without further contributions.' },
        { term: 'Savings Rate', definition: 'The percentage of your after-tax income that you save and invest, a key factor in how quickly you reach FIRE.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is the 4% rule reliable?', answer: 'The 4% rule is based on historical U.S. market data and works well for 30-year retirement periods. For longer retirements (40-50 years), many FIRE proponents use a more conservative 3-3.5% rate.' },
        { question: 'Does the FIRE number account for inflation?', answer: 'The 4% rule already factors in inflation-adjusted withdrawals. Your nominal portfolio may be larger, but the purchasing power target remains your stated annual expenses.' },
        { question: 'What about healthcare costs before Medicare age?', answer: 'Healthcare is a significant pre-retirement expense. Include estimated premiums and out-of-pocket costs in your annual expenses for an accurate FIRE number.' },
        { question: 'Should I include Social Security in my plan?', answer: 'Social Security can supplement your withdrawals later, potentially lowering the amount you need to draw from your portfolio. Treat it as a bonus rather than a core assumption.' },
        { question: 'Can I still earn money after reaching FIRE?', answer: 'Absolutely. Many FIRE practitioners do part-time work, freelancing, or pursue passion projects that generate income, which provides additional financial cushion.' },
        { question: 'What investment returns should I assume?', answer: 'A diversified stock/bond portfolio has historically returned 7-10% before inflation. Using 6-7% is a common conservative estimate for planning purposes.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Focus on reducing expenses -- cutting spending has a double effect: it lowers your FIRE number and increases your savings rate.',
        'Use a conservative withdrawal rate of 3.5% or lower if you plan to retire before age 40.',
        'Track your actual spending for several months before setting your annual expense target.',
        'Build in a buffer for unexpected expenses like medical emergencies or home repairs.',
        'Diversify your investments across asset classes to reduce sequence-of-returns risk.',
        'Consider Coast FIRE as a milestone -- even partial financial independence opens up life options.',
        'Re-evaluate your FIRE number annually as expenses and life circumstances change.',
        'Do not forget to account for taxes on investment withdrawals in your expense planning.'
      ]
    }
  },
  relatedTools: ['retirement-calculator', 'compound-interest-calculator', 'savings-goal-calculator', 'net-worth-snapshot', 'rule-of-72-calculator'],
  seo: {
    metaTitle: 'FIRE Number Calculator -- Financial Independence & Early Retirement | Untrackt',
    metaDescription: 'Calculate your FIRE number and find out when you can achieve financial independence. Plan for Lean FIRE, Fat FIRE, or Coast FIRE with custom withdrawal rates.',
    keywords: ['FIRE number calculator', 'financial independence', 'retire early', '4% rule', 'FIRE movement', 'safe withdrawal rate', 'early retirement calculator']
  }
};
