export default {
  id: 'inflation-calculator',
  title: 'Inflation Calculator',
  description: 'Calculate how inflation erodes purchasing power and understand the real value of money over time.',
  content: {
    whatIs: {
      heading: 'What is an Inflation Calculator?',
      body: 'An Inflation Calculator measures how the purchasing power of money changes over time due to inflation. It can show you the equivalent value of a past dollar amount in today\'s terms, project the future cost of goods at a given inflation rate, or determine the real return on an investment after adjusting for inflation. The tool uses consumer price index (CPI) data or user-specified inflation rates to perform these calculations.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Inflation is a silent force that erodes the value of money every year. Without understanding its impact, you might overestimate the value of future savings, underestimate future expenses, or misjudge investment returns. This calculator makes inflation tangible -- showing you exactly how much more you will need in the future to maintain today\'s standard of living and helping you make inflation-aware financial decisions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter an amount of money to evaluate.',
        'Specify the starting year or use the current year.',
        'Enter the target year (past or future) to compare.',
        'Input an inflation rate or use the historical average.',
        'Click "Calculate" to see the adjusted value and the cumulative inflation percentage.',
        'Use the results to understand real purchasing power changes over the selected period.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates the equivalent purchasing power of money across different time periods.',
        'Projects future costs based on current prices and an assumed inflation rate.',
        'Shows cumulative inflation and the total percentage change over the selected period.',
        'Supports custom inflation rates or uses historical CPI-based averages.',
        'Calculates real (inflation-adjusted) investment returns.',
        'Works for both forward-looking projections and backward-looking historical comparisons.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Understanding what today\'s salary would need to be in 20 years to maintain the same lifestyle.',
        'Adjusting retirement income targets for inflation to set a realistic savings goal.',
        'Comparing historical prices to current prices in real terms.',
        'Evaluating whether an investment\'s return actually outpaces inflation.',
        'Planning tuition costs for children based on education inflation rates.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Historical Purchasing Power', description: '$100 in 2000 has the same purchasing power as approximately $180 in 2024, reflecting 80% cumulative inflation over 24 years at an average of about 2.5%/year.' },
        { title: 'Future Cost Projection', description: 'A $50,000/year lifestyle today will cost about $90,300/year in 20 years at 3% annual inflation -- nearly doubling.' },
        { title: 'Real Investment Returns', description: 'An investment returning 8% nominal with 3% inflation yields a real return of approximately 4.85%, which is what actually grows your purchasing power.' },
        { title: 'Salary Negotiation', description: 'If you got a 2% raise but inflation was 4%, your purchasing power actually decreased by about 2%. You need at least a 4% raise to stay even.' },
        { title: 'Education Planning', description: 'College tuition at $30,000/year today may cost $54,000/year in 15 years at 4% education inflation -- plan contributions accordingly.' },
        { title: 'Retirement Income', description: 'Needing $40,000/year at retirement in 25 years requires planning for about $83,800 in future dollars at 3% inflation.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Inflation', definition: 'A sustained increase in the general price level of goods and services, reducing the purchasing power of money over time.' },
        { term: 'CPI (Consumer Price Index)', definition: 'A measure of the average change in prices paid by consumers for a basket of goods and services, used as the primary inflation indicator.' },
        { term: 'Purchasing Power', definition: 'The quantity of goods and services that a given amount of money can buy at a specific point in time.' },
        { term: 'Nominal Value', definition: 'The face value of money without adjusting for inflation -- the actual dollar amount.' },
        { term: 'Real Value', definition: 'The value of money after adjusting for inflation, reflecting true purchasing power.' },
        { term: 'Deflation', definition: 'A decrease in the general price level, increasing the purchasing power of money. Rare in modern economies.' },
        { term: 'Hyperinflation', definition: 'Extremely rapid inflation, typically exceeding 50% per month, causing the value of currency to collapse.' },
        { term: 'Core Inflation', definition: 'Inflation measured excluding volatile food and energy prices to show the underlying trend.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a normal inflation rate?', answer: 'Most developed economies target around 2% annual inflation. Historical U.S. averages range from 2-3% over long periods, with occasional spikes above 5% during economic disruptions.' },
        { question: 'Does inflation affect everyone equally?', answer: 'No. Inflation impacts different groups differently depending on spending patterns. Housing, healthcare, and education often inflate faster than the overall CPI average.' },
        { question: 'How does inflation affect my savings?', answer: 'If your savings earn less interest than the inflation rate, your purchasing power decreases. Money in a 1% savings account loses real value when inflation is 3%.' },
        { question: 'What is the difference between nominal and real returns?', answer: 'Nominal returns are the stated percentage gain. Real returns subtract inflation, showing actual purchasing power growth. A 7% nominal return with 3% inflation gives about 3.88% real return.' },
        { question: 'Should I use CPI or another measure?', answer: 'CPI is the most widely used measure for general inflation. For specific planning (e.g., education, healthcare), use sector-specific inflation rates which may be higher.' },
        { question: 'Can inflation be negative?', answer: 'Yes, that is called deflation. It is rare in modern economies and can signal economic weakness. Central banks actively work to prevent sustained deflation.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always adjust long-term financial goals for inflation to ensure your targets reflect real purchasing power.',
        'Use 3% as a baseline inflation rate for conservative planning in most developed economies.',
        'Evaluate investment performance in real (after-inflation) terms rather than nominal terms.',
        'Factor in sector-specific inflation for major expenses like healthcare and education, which often exceed general CPI.',
        'Ensure your salary growth at least matches inflation to maintain your standard of living.',
        'Consider inflation-protected investments like TIPS (Treasury Inflation-Protected Securities) for conservative portfolios.',
        'Revisit inflation assumptions periodically -- rates change with economic conditions.',
        'Use this tool alongside retirement and savings calculators for comprehensive planning.'
      ]
    }
  },
  relatedTools: ['retirement-calculator', 'compound-interest-calculator', 'savings-goal-calculator', 'rule-of-72-calculator'],
  seo: {
    metaTitle: 'Inflation Calculator -- Purchasing Power & Real Value | Untrackt',
    metaDescription: 'Calculate how inflation affects the value of money over time. Project future costs, compare historical purchasing power, and determine real investment returns.',
    keywords: ['inflation calculator', 'purchasing power calculator', 'CPI calculator', 'inflation rate', 'real value of money', 'cost of living calculator', 'inflation adjustment']
  }
};
