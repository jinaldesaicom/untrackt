export default {
  id: 'break-even-calculator',
  title: 'Break-Even Calculator',
  description: 'Determine the point at which revenue equals costs to understand when a business or product becomes profitable.',
  content: {
    whatIs: {
      heading: 'What is a Break-Even Calculator?',
      body: 'A Break-Even Calculator determines the exact point at which total revenue equals total costs -- meaning the business or product generates neither profit nor loss. It calculates the number of units you need to sell or the revenue you need to earn to cover both fixed costs (rent, salaries, equipment) and variable costs (materials, shipping, commissions). Understanding this break-even point is essential for pricing strategy, business planning, and investment decisions.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Every business needs to know its break-even point before launching a product, setting prices, or scaling operations. This calculator reveals the minimum sales volume needed to avoid losses, helps you evaluate whether a product idea is financially viable, and lets you experiment with pricing and cost structures to find the optimal balance. It transforms guesswork into data-driven decision-making for entrepreneurs and managers.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your total fixed costs (rent, salaries, insurance, etc.).',
        'Input the variable cost per unit (materials, labor per unit, shipping per unit).',
        'Specify the selling price per unit.',
        'Click "Calculate" to see the break-even point in units and revenue.',
        'Experiment with different prices or cost structures to see how they shift the break-even point.',
        'Review the margin of safety to understand your buffer above break-even.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates break-even point in both units and revenue dollars.',
        'Shows contribution margin per unit and contribution margin ratio.',
        'Supports "what-if" scenarios by adjusting prices, fixed costs, or variable costs.',
        'Displays the margin of safety when current/projected sales are entered.',
        'Works for product-based, service-based, or subscription business models.',
        'Clear visual representation of costs, revenue, and the break-even intersection.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Launching a new product and determining minimum viable sales volume.',
        'Setting prices that balance competitiveness with profitability.',
        'Evaluating whether to invest in new equipment that increases fixed costs but lowers variable costs.',
        'Preparing financial projections for a business plan or investor pitch.',
        'Deciding whether to accept a bulk order at a discounted price.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Product Launch', description: 'Fixed costs: $5,000/month. Variable cost: $12/unit. Selling price: $25/unit. Contribution margin: $13. Break-even: 385 units/month ($9,625 revenue).' },
        { title: 'Service Business', description: 'A consulting firm has $8,000/month fixed costs and charges $150/hour with $40/hour variable costs. Break-even: 73 billable hours/month.' },
        { title: 'Equipment Investment', description: 'Buying a $20,000 machine adds $800/month to fixed costs but reduces variable cost from $8 to $3 per unit (selling at $15). New break-even: 200 units vs. old 286 units.' },
        { title: 'Subscription Business', description: 'SaaS with $15,000/month fixed costs, $2/user variable cost, $20/month subscription. Break-even: 834 subscribers.' },
        { title: 'Margin of Safety', description: 'If break-even is 500 units and you sell 700, your margin of safety is 200 units (28.6%) -- the buffer before your business slips into loss.' },
        { title: 'Price Sensitivity', description: 'At $25/unit: break-even = 385 units. At $30/unit: break-even = 278 units. A $5 price increase reduces the required volume by 28%.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Break-Even Point', definition: 'The level of sales at which total revenue equals total costs, resulting in zero profit and zero loss.' },
        { term: 'Fixed Costs', definition: 'Expenses that remain constant regardless of production volume -- rent, salaries, insurance, depreciation.' },
        { term: 'Variable Costs', definition: 'Expenses that change in proportion to production or sales volume -- raw materials, packaging, shipping per unit.' },
        { term: 'Contribution Margin', definition: 'The selling price per unit minus the variable cost per unit. This amount "contributes" toward covering fixed costs and generating profit.' },
        { term: 'Contribution Margin Ratio', definition: 'Contribution margin expressed as a percentage of the selling price. Used to calculate break-even in revenue terms.' },
        { term: 'Margin of Safety', definition: 'The difference between actual or projected sales and the break-even point, indicating the buffer before losses occur.' },
        { term: 'Operating Leverage', definition: 'The degree to which a business uses fixed costs in its cost structure. Higher leverage means profits are more sensitive to sales changes.' },
        { term: 'Profit Target', definition: 'The desired profit amount above break-even, used to calculate the sales volume needed to achieve a specific profit goal.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What if I sell multiple products?', answer: 'For multiple products, calculate a weighted average contribution margin based on expected sales mix, then use that to find the overall break-even point.' },
        { question: 'Does break-even analysis work for service businesses?', answer: 'Yes. Replace "units" with billable hours or engagements, and adjust variable costs to reflect per-service expenses like contractor fees or materials.' },
        { question: 'How does break-even change when I raise or lower prices?', answer: 'Raising prices increases contribution margin, lowering the break-even volume. Lowering prices requires more sales to break even. The calculator lets you model both scenarios instantly.' },
        { question: 'Should I include my own salary in fixed costs?', answer: 'Yes. If you pay yourself a salary, include it as a fixed cost. If your income depends on profit, exclude it but remember break-even only covers costs, not your compensation.' },
        { question: 'Can I use this for project-based decisions?', answer: 'Absolutely. Enter project-specific fixed costs (setup, tooling) and variable costs to determine how many units or engagements the project needs to pay for itself.' },
        { question: 'What is a good margin of safety?', answer: 'It varies by industry, but a margin of safety of 20-30% is generally considered comfortable. Higher margins provide more resilience against downturns.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Accurately categorize all costs as fixed or variable -- misclassification skews the break-even result.',
        'Recalculate break-even whenever costs, prices, or product mix change significantly.',
        'Use break-even analysis alongside other financial tools, not in isolation.',
        'Build in a profit target above break-even when setting sales goals rather than just aiming to cover costs.',
        'Model best-case and worst-case scenarios to understand the range of outcomes.',
        'For new businesses, use conservative sales estimates when evaluating break-even feasibility.',
        'Consider the time dimension -- know not just the units to break even but how long it will take at your expected sales rate.',
        'Monitor your margin of safety regularly to catch early warning signs of financial stress.'
      ]
    }
  },
  relatedTools: ['roi-calculator', 'loan-calculator', 'net-worth-snapshot', 'daily-expense-tracker'],
  seo: {
    metaTitle: 'Break-Even Calculator -- Find Your Profitability Point | Untrackt',
    metaDescription: 'Calculate the break-even point for your business or product. Determine minimum sales volume, contribution margin, and margin of safety with what-if scenarios.',
    keywords: ['break-even calculator', 'break-even analysis', 'break-even point', 'contribution margin', 'fixed costs', 'variable costs', 'profitability calculator']
  }
};
