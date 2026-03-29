export default {
  id: 'daily-expense-tracker',
  title: 'Daily Expense Tracker',
  description: 'Log and categorize daily expenses to understand spending habits and manage your budget.',
  content: {
    whatIs: {
      heading: 'What is a Daily Expense Tracker?',
      body: 'A Daily Expense Tracker is a tool for recording every purchase and expense as it happens throughout the day. By logging amounts, categories, and notes for each transaction, you build a detailed picture of where your money goes. Over time, this data reveals spending patterns, highlights unnecessary expenses, and helps you make intentional choices about your money. The tracker categorizes spending into areas like food, transport, entertainment, and utilities for easy analysis.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most people significantly underestimate their spending. Studies show that small daily expenses -- coffee, snacks, subscriptions, impulse buys -- add up to thousands per year. This tracker makes every dollar visible, eliminates financial blind spots, and creates the awareness needed to take control of your budget. You cannot improve what you do not measure, and this tool ensures every expense is measured.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Log each expense as it occurs: enter the amount, category, and an optional note.',
        'Choose from preset categories (food, transport, entertainment, etc.) or create custom ones.',
        'Review daily, weekly, or monthly summaries to see spending patterns.',
        'Identify your top spending categories and look for areas to reduce.',
        'Set spending limits for categories and track against them.',
        'Export or review historical data to analyze trends over time.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Quick expense entry with amount, category, and optional notes.',
        'Preset and custom spending categories for organized tracking.',
        'Daily, weekly, and monthly spending summaries and breakdowns.',
        'Category-level spending analysis to identify where your money goes.',
        'All data stored locally in your browser for complete privacy.',
        'Simple, fast interface designed for logging expenses on the go.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Building awareness of daily spending habits to inform budgeting decisions.',
        'Tracking variable expenses (dining out, groceries, entertainment) that are hard to predict.',
        'Supporting a budgeting method like the envelope system or 50/30/20 rule.',
        'Monitoring spending during travel to stay within a trip budget.',
        'Identifying subscriptions, memberships, or recurring charges that can be cut.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Daily Coffee Habit', description: 'Logging $5.50 daily for coffee reveals $165/month or nearly $2,000/year -- a significant amount that could be redirected to savings.' },
        { title: 'Grocery Tracking', description: 'Tracking weekly grocery runs shows an average of $120/week. Comparing weeks helps identify when impulse purchases inflate the total.' },
        { title: 'Subscription Audit', description: 'Logging all subscriptions reveals $85/month across 8 services. Canceling 3 unused ones saves $35/month ($420/year).' },
        { title: 'Travel Budget', description: 'On a 10-day trip, daily logging keeps spending visible. Average $85/day across food, transport, and activities -- $850 total, under the $1,000 budget.' },
        { title: 'Dining Out Awareness', description: 'Tracking shows $450/month on restaurants and takeout -- 30% of the food budget. Cooking at home 3 more meals/week saves about $200/month.' },
        { title: 'Monthly Category Review', description: 'Month-end summary: Housing 35%, Food 20%, Transport 12%, Entertainment 10%, Utilities 8%, Other 15%. Helps set next month\'s targets.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Fixed Expenses', definition: 'Recurring costs that stay the same each month -- rent, insurance premiums, loan payments.' },
        { term: 'Variable Expenses', definition: 'Costs that fluctuate month to month -- groceries, dining out, entertainment, fuel.' },
        { term: 'Discretionary Spending', definition: 'Non-essential expenses that can be reduced or eliminated -- hobbies, luxury items, entertainment.' },
        { term: 'Needs vs. Wants', definition: 'Needs are essential for living (food, shelter, utilities). Wants are desirable but not necessary (dining out, new gadgets).' },
        { term: '50/30/20 Rule', definition: 'A budgeting guideline: 50% of income for needs, 30% for wants, 20% for savings and debt repayment.' },
        { term: 'Envelope Method', definition: 'A cash-based budgeting system where you allocate physical cash into envelopes for each spending category.' },
        { term: 'Spending Leak', definition: 'A small, recurring expense that goes unnoticed but adds up significantly over time.' },
        { term: 'Budget Variance', definition: 'The difference between what you planned to spend and what you actually spent in a category.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How often should I log my expenses?', answer: 'Ideally, as they happen. The longer you wait, the more likely you are to forget transactions. A quick 10-second log after each purchase keeps data accurate.' },
        { question: 'What categories should I use?', answer: 'Start with basics: Housing, Food/Groceries, Dining Out, Transport, Entertainment, Utilities, Health, Shopping, Subscriptions, and Miscellaneous. Add custom categories as needed.' },
        { question: 'How long should I track expenses?', answer: 'Track for at least 1-3 months to establish clear patterns. Many people find ongoing tracking becomes a quick, valuable habit that permanently improves financial awareness.' },
        { question: 'Is my spending data private?', answer: 'Yes. All data is stored locally in your browser. Nothing is sent to servers or third parties.' },
        { question: 'Should I track every single purchase?', answer: 'Yes, for the most accurate picture. Even small purchases add up. If you skip tracking small items, you miss the spending leaks that often account for the biggest surprises.' },
        { question: 'How does expense tracking help with budgeting?', answer: 'Tracking provides the data you need to create a realistic budget. Without knowing actual spending patterns, budgets are based on guesses and are unlikely to succeed.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Log expenses immediately -- waiting until the end of the day leads to forgotten transactions.',
        'Use specific categories rather than a catch-all "Miscellaneous" bucket.',
        'Review your spending weekly to catch issues early rather than waiting for a month-end surprise.',
        'Look for "spending leaks" -- small daily purchases that add up to large annual sums.',
        'Set category spending limits based on your first month of data, then aim to improve.',
        'Do not judge yourself -- the goal is awareness. Understanding your patterns is the first step to change.',
        'Use expense data to build or refine your monthly budget with realistic numbers.',
        'Celebrate progress when you reduce spending in target categories -- positive reinforcement builds habits.'
      ]
    }
  },
  relatedTools: ['savings-goal-calculator', 'emergency-fund-calculator', 'net-worth-snapshot', 'credit-card-payoff-calculator', 'break-even-calculator'],
  seo: {
    metaTitle: 'Daily Expense Tracker -- Log & Categorize Spending | Untrackt',
    metaDescription: 'Track daily expenses by category to understand your spending habits. Identify spending leaks, review summaries, and take control of your budget with complete privacy.',
    keywords: ['expense tracker', 'daily expense tracker', 'spending tracker', 'budget tracker', 'expense logger', 'spending categories', 'personal finance tracker']
  }
};
