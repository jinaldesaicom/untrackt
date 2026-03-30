export default {
  id: 'personal-finance-dashboard',
  title: 'Personal Finance Dashboard',
  description: 'Get a complete overview of income vs expenses, net cash flow, savings rate, and spending breakdowns.',
  content: {
    whatIs: {
      heading: 'What is the Personal Finance Dashboard?',
      body: 'The Personal Finance Dashboard is a read-only overview that pulls data from your Daily Expense Tracker to present a unified view of your financial health. It shows monthly income vs expenses, net cash flow, savings rate, spending-by-category breakdowns, daily spending trends, and budget adherence--all calculated automatically from your existing expense and income data. No duplicate data entry is needed.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Tracking individual expenses is valuable, but the real insight comes from seeing the big picture. Are you spending more than you earn? What is your savings rate? Which categories consume the most? The dashboard answers these questions at a glance, turning raw transaction data into actionable financial intelligence. It gives you the monthly overview that transforms reactive spending into intentional money management.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'First, log your expenses and income in the Daily Expense Tracker.',
        'Open the Personal Finance Dashboard to see your monthly overview.',
        'Review the top-line metrics: total income, total expenses, net cash flow, and savings rate.',
        'Navigate between months using the month selector to compare periods.',
        'Check the spending breakdown to see which categories consume the most.',
        'Use the daily spending trend to spot high-spend days or patterns.',
        'Monitor budget adherence if you have set category budgets in the expense tracker.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic data import from the Daily Expense Tracker--no duplicate entry.',
        'Monthly income vs expense comparison with net cash flow calculation.',
        'Savings rate percentage showing what proportion of income is being saved.',
        'Category-level spending breakdown with visual indicators.',
        'Daily spending trend showing how expenses are distributed throughout the month.',
        'Budget vs actual comparison for categories with set budgets.',
        'Financial health score based on savings rate and budget adherence.',
        'Month-over-month navigation for comparing financial periods.',
        'Direct link to the Daily Expense Tracker for adding new data.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Monthly financial health check to see if income exceeds expenses.',
        'Identifying the highest spending categories to target for reduction.',
        'Tracking savings rate progress toward a savings goal.',
        'Comparing month-over-month spending trends to detect lifestyle inflation.',
        'Reviewing budget adherence before the month ends to make spending adjustments.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Monthly Overview', description: 'March shows $5,200 income and $3,800 expenses, yielding $1,400 net cash flow and a 26.9% savings rate--above the recommended 20% minimum.' },
        { title: 'Category Analysis', description: 'The dashboard reveals Housing (35%), Food (22%), and Transport (15%) are the top three spending categories, accounting for 72% of total expenses.' },
        { title: 'Savings Rate Tracking', description: 'Over three months, the savings rate improved from 12% to 22% after identifying and reducing discretionary spending highlighted by the dashboard.' },
        { title: 'Budget Check', description: 'Mid-month, the dashboard shows dining out is at 85% of budget with two weeks remaining, signaling a need to cook more meals at home.' },
        { title: 'Income vs Expense Trend', description: 'Comparing January through June, the dashboard shows expenses growing faster than income--an early warning of unsustainable spending growth.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Net Cash Flow', definition: 'Total income minus total expenses for a period. Positive means you saved money; negative means you spent more than you earned.' },
        { term: 'Savings Rate', definition: 'The percentage of income that is saved (not spent). Calculated as (Income - Expenses) / Income × 100.' },
        { term: 'Budget Adherence', definition: 'How closely actual spending matches planned budgets for each category.' },
        { term: 'Spending Breakdown', definition: 'A categorized view showing what percentage of total spending goes to each category (housing, food, transport, etc.).' },
        { term: 'Lifestyle Inflation', definition: 'The tendency to increase spending as income rises, preventing savings from growing proportionally.' },
        { term: 'Financial Health Score', definition: 'A composite indicator based on savings rate, budget adherence, and spending patterns.' },
        { term: 'Burn Rate', definition: 'The rate at which you are spending money, often expressed as daily or monthly average expenses.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Where does the dashboard get its data?', answer: 'It reads directly from the Daily Expense Tracker data stored in your browser. No separate data entry is required.' },
        { question: 'Can I edit data from the dashboard?', answer: 'The dashboard is read-only. To add or modify expenses and income, use the Daily Expense Tracker.' },
        { question: 'What savings rate should I aim for?', answer: 'Financial advisors commonly recommend 20% or higher. The FIRE community targets 50%+. Any positive savings rate is a good starting point.' },
        { question: 'Is my financial data private?', answer: 'Yes. All data is stored locally in your browser. Nothing is sent to any server or third party.' },
        { question: 'Why does my dashboard show no data?', answer: 'You need to log expenses and income in the Daily Expense Tracker first. The dashboard cannot display data that has not been recorded.' },
        { question: 'Can I compare multiple months?', answer: 'Use the month navigator to switch between months and compare metrics. Each month shows its own independent summary.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Check the dashboard at least once a week to stay on top of your spending trends.',
        'Aim for a positive net cash flow every month--even a small surplus builds financial resilience.',
        'Use the category breakdown to identify your top 3 spending areas and focus savings efforts there.',
        'Set category budgets in the expense tracker to enable budget vs actual comparisons on the dashboard.',
        'Compare your savings rate month-over-month to track progress toward financial goals.',
        'If spending exceeds income for two consecutive months, review discretionary categories for cuts.',
        'Use the dashboard data to set realistic savings goals in the Savings Goal Calculator.'
      ]
    }
  },
  relatedTools: ['daily-expense-tracker', 'savings-goal-calculator', 'net-worth-snapshot', 'emergency-fund-calculator', 'fire-number-calculator'],
  seo: {
    metaTitle: 'Personal Finance Dashboard - Income vs Expenses Overview | Wiki | UnTrackt',
    metaDescription: 'View your income vs expenses, net cash flow, savings rate, and spending breakdowns. Automatic monthly financial overview from your Daily Expense Tracker data.',
    keywords: ['personal finance dashboard', 'income vs expenses', 'savings rate', 'cash flow', 'spending breakdown', 'budget tracker', 'financial overview', 'money management']
  }
}
