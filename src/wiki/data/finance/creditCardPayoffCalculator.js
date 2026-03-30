export default {
  id: 'credit-card-payoff-calculator',
  title: 'Credit Card Payoff Calculator',
  description: 'Calculate how long it takes to pay off credit card debt and how much interest you will pay.',
  content: {
    whatIs: {
      heading: 'What is a Credit Card Payoff Calculator?',
      body: 'A Credit Card Payoff Calculator estimates the time and total cost required to pay off credit card debt based on your current balance, interest rate (APR), and monthly payment amount. It reveals how much of each payment goes toward interest versus principal, how long the debt will persist at minimum payments, and how increasing your payment accelerates debt freedom. The tool can also calculate the exact monthly payment needed to become debt-free by a target date.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Credit card debt is one of the most expensive forms of borrowing, with APRs often exceeding 20%. Minimum payments are designed to keep you in debt as long as possible, with interest consuming the majority of each payment. This calculator exposes the true cost of carrying a balance, motivates you to pay more than the minimum, and helps you create a realistic payoff plan that saves hundreds or thousands in interest.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your current credit card balance.',
        'Input the annual percentage rate (APR) on your card.',
        'Enter your planned monthly payment amount.',
        'Optionally set a target payoff date to calculate the required monthly payment.',
        'Click "Calculate" to see the payoff timeline, total interest paid, and payment breakdown.',
        'Experiment with higher monthly payments to see how much time and interest you save.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates exact payoff date and total interest for any payment amount.',
        'Shows month-by-month breakdown of principal vs. interest in each payment.',
        'Compares minimum payments against accelerated payment plans.',
        'Reverse calculation: find the monthly payment needed for a target payoff date.',
        'Supports multiple card balances for a combined debt payoff strategy.',
        'Highlights total interest savings from increasing monthly payments.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Understanding how long it takes to pay off a credit card balance at the minimum payment.',
        'Calculating the monthly payment needed to become debt-free within a specific timeframe.',
        'Comparing the debt avalanche (highest rate first) vs. debt snowball (smallest balance first) strategies.',
        'Motivating higher payments by seeing the dramatic interest savings.',
        'Planning a balance transfer strategy to reduce interest costs.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Minimum Payment Trap', description: 'A $5,000 balance at 22% APR with $100/month minimum payment takes 9+ years to pay off and costs over $5,800 in interest -- more than the original balance.' },
        { title: 'Accelerated Payoff', description: 'The same $5,000 at 22% APR with $300/month payments is paid off in 20 months with only $1,020 in interest -- saving $4,800 and 7+ years.' },
        { title: 'Target Date Payoff', description: 'Want to pay off $8,000 at 19% APR in 12 months? You need to pay approximately $739/month, with total interest of about $865.' },
        { title: 'Multiple Cards', description: 'Card A: $3,000 at 24%. Card B: $5,000 at 18%. Using the avalanche method (paying off Card A first) saves more interest than the snowball method.' },
        { title: 'Balance Transfer Benefit', description: 'Transfer $6,000 from a 22% card to a 0% intro APR card for 18 months. Pay $334/month to clear the balance before the promo ends, saving over $2,000 in interest.' },
        { title: 'Double the Minimum', description: 'Doubling your minimum payment from $150 to $300 on a $7,000 balance at 20% cuts payoff time from 7 years to under 2.5 years and saves $4,000+.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'APR (Annual Percentage Rate)', definition: 'The yearly interest rate charged on the outstanding credit card balance.' },
        { term: 'Minimum Payment', definition: 'The smallest amount the card issuer requires you to pay each month, usually 1-3% of the balance or a fixed floor.' },
        { term: 'Balance', definition: 'The total amount currently owed on the credit card.' },
        { term: 'Debt Avalanche', definition: 'A payoff strategy that targets the highest-interest debt first, minimizing total interest paid.' },
        { term: 'Debt Snowball', definition: 'A payoff strategy that targets the smallest balance first for psychological wins, then rolls payments to the next debt.' },
        { term: 'Balance Transfer', definition: 'Moving an existing credit card balance to a new card with a lower or 0% introductory APR to reduce interest costs.' },
        { term: 'Grace Period', definition: 'The time between the end of a billing cycle and the payment due date, during which no interest accrues if the balance is paid in full.' },
        { term: 'Revolving Credit', definition: 'A type of credit that does not have a fixed number of payments, allowing you to borrow, repay, and borrow again up to a credit limit.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Why does it take so long to pay off credit cards with minimum payments?', answer: 'Minimum payments are typically only 1-3% of the balance. At high APRs, most of the payment goes to interest, leaving very little to reduce the principal. This keeps the balance high and the interest accruing.' },
        { question: 'Should I use the avalanche or snowball method?', answer: 'The avalanche method (highest rate first) saves the most money. The snowball method (smallest balance first) provides quicker psychological wins. Choose based on whether you are motivated more by math or momentum.' },
        { question: 'Is a balance transfer worth it?', answer: 'Yes, if you can pay off the balance during the 0% intro period. Watch for transfer fees (typically 3-5%) and make sure you will not add new charges to the old card.' },
        { question: 'Should I pay off credit cards before saving?', answer: 'Generally, yes -- if your card APR is 18-25%, paying it off gives a guaranteed "return" that far exceeds savings account interest. Keep a small emergency buffer, but prioritize high-interest debt.' },
        { question: 'Does carrying a balance help my credit score?', answer: 'No, this is a common myth. You do not need to carry a balance or pay interest to build credit. Using your card and paying the full statement balance each month is ideal.' },
        { question: 'What if I cannot make more than the minimum payment?', answer: 'Contact your card issuer to negotiate a lower rate, explore balance transfer options, or consider a debt consolidation loan at a lower APR. Even small increases above the minimum help.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always pay more than the minimum -- even $50 extra per month makes a significant difference.',
        'Target the highest-APR card first (avalanche method) to minimize total interest paid.',
        'Stop using cards while paying down debt to avoid adding to the balance.',
        'Negotiate with your card issuer for a lower APR -- especially if you have a good payment history.',
        'Consider a 0% balance transfer for large balances, but have a plan to pay it off before the promo ends.',
        'Automate payments above the minimum to ensure consistency.',
        'Track your payoff progress monthly to stay motivated and adjust the plan if needed.',
        'Once debt-free, pay your statement balance in full every month to avoid future interest charges.'
      ]
    }
  },
  relatedTools: ['loan-calculator', 'net-worth-snapshot', 'savings-goal-calculator', 'daily-expense-tracker'],
  seo: {
    metaTitle: 'Credit Card Payoff Calculator -- Debt-Free Timeline & Interest | Untrackt',
    metaDescription: 'Calculate how long it takes to pay off credit card debt and how much interest you\'ll pay. Compare payoff strategies and find the fastest path to debt freedom.',
    keywords: ['credit card payoff calculator', 'debt payoff calculator', 'credit card interest', 'debt snowball', 'debt avalanche', 'pay off credit card', 'credit card debt calculator']
  }
};
