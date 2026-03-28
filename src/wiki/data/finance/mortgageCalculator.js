export default {
  id: 'mortgage-calculator',
  title: 'Mortgage Calculator',
  description: 'Estimate monthly mortgage payments including principal, interest, taxes, insurance, and PMI.',
  content: {
    whatIs: {
      heading: 'What is a Mortgage Calculator?',
      body: 'A Mortgage Calculator estimates your monthly home loan payment based on the property price, down payment, interest rate, and loan term. Beyond the basic principal and interest, it can factor in property taxes, homeowners insurance, and private mortgage insurance (PMI) to give a realistic picture of your total monthly housing cost. It also generates an amortization schedule showing how each payment is allocated over the life of the mortgage.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Buying a home is one of the largest financial commitments most people make. This calculator helps you understand the true monthly cost of homeownership before you start shopping, ensures you stay within a comfortable budget, reveals how much you will actually pay in interest over 15 or 30 years, and shows the financial benefits of a larger down payment. It turns the complex math of mortgages into clear, actionable numbers.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the home purchase price.',
        'Specify your down payment amount or percentage.',
        'Input the annual interest rate from your lender.',
        'Select the loan term (e.g., 15 or 30 years).',
        'Optionally add annual property tax, homeowners insurance, and HOA fees.',
        'Review the monthly payment breakdown, total cost over the loan, and amortization schedule.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates monthly principal and interest payments for any loan term.',
        'Includes optional property tax, homeowners insurance, and HOA fee estimates.',
        'Automatically estimates PMI when the down payment is below 20%.',
        'Generates a full amortization schedule with year-by-year or monthly views.',
        'Shows total interest paid over the life of the loan.',
        'Supports comparison between 15-year and 30-year terms.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Determining what home price you can afford based on a target monthly payment.',
        'Comparing the total cost of a 15-year vs. 30-year mortgage.',
        'Estimating how a larger down payment reduces monthly costs and eliminates PMI.',
        'Planning for refinancing an existing mortgage at a lower rate.',
        'Understanding how property taxes and insurance affect the total housing expense.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard 30-Year Mortgage', description: 'A $350,000 home with 20% down ($70,000) at 6.5% for 30 years results in a monthly P&I payment of about $1,770. Total interest over the life of the loan: approximately $357,000.' },
        { title: '15-Year vs. 30-Year', description: 'The same $280,000 loan at 6% for 15 years costs $2,363/month but only $145,000 in total interest -- compared to $1,679/month and $324,000 interest over 30 years.' },
        { title: 'PMI Impact', description: 'Put 10% down on a $300,000 home ($270,000 loan). PMI at 0.5% adds about $113/month until you reach 20% equity, increasing the effective monthly cost.' },
        { title: 'Full PITI Payment', description: 'On a $400,000 home with 20% down at 6.5% for 30 years, add $4,000/year taxes and $1,500/year insurance. Total monthly payment: approximately $2,479.' },
        { title: 'Extra Payment Savings', description: 'On a $250,000 30-year mortgage at 6%, paying an extra $200/month cuts the loan term by about 7 years and saves over $60,000 in interest.' },
        { title: 'Refinancing Scenario', description: 'Refinance a $220,000 balance from 7% to 5.5% with 25 years remaining. Monthly payment drops from $1,556 to $1,351, saving roughly $205/month.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Principal', definition: 'The amount borrowed to purchase the home, equal to the purchase price minus the down payment.' },
        { term: 'Down Payment', definition: 'The upfront cash payment made toward the home purchase, typically expressed as a percentage of the price.' },
        { term: 'PMI (Private Mortgage Insurance)', definition: 'Insurance required by lenders when the down payment is less than 20%, protecting the lender if the borrower defaults.' },
        { term: 'Amortization', definition: 'The process of paying off the mortgage through regular payments that gradually shift from mostly interest to mostly principal.' },
        { term: 'PITI', definition: 'The total monthly housing payment including Principal, Interest, Taxes, and Insurance.' },
        { term: 'Escrow', definition: 'An account managed by the lender that collects and disburses property taxes and insurance on the borrower\'s behalf.' },
        { term: 'LTV (Loan-to-Value Ratio)', definition: 'The ratio of the loan amount to the appraised property value. An LTV above 80% typically requires PMI.' },
        { term: 'Fixed-Rate Mortgage', definition: 'A mortgage where the interest rate and monthly payment remain constant for the entire loan term.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How much should I put down on a home?', answer: 'Putting 20% down avoids PMI and lowers your monthly payment. However, many buyers start with 3-10% down and refinance or wait for PMI to drop off as equity builds.' },
        { question: 'What is the difference between fixed and adjustable-rate mortgages?', answer: 'A fixed-rate mortgage keeps the same rate for the entire term. An adjustable-rate mortgage (ARM) has a lower initial rate that resets periodically based on market conditions, adding uncertainty.' },
        { question: 'When does PMI get removed?', answer: 'PMI is typically removed when you reach 20% equity (80% LTV) through payments or home appreciation. You usually need to request removal or it auto-cancels at 78% LTV.' },
        { question: 'Should I choose a 15-year or 30-year mortgage?', answer: 'A 15-year mortgage has higher monthly payments but dramatically lower total interest. A 30-year mortgage offers more cash-flow flexibility. Choose based on your budget and financial goals.' },
        { question: 'Does this calculator include closing costs?', answer: 'Closing costs are not included in the monthly payment calculation. They are one-time fees paid at the time of purchase, typically 2-5% of the loan amount.' },
        { question: 'How accurate is this calculator?', answer: 'It provides a reliable estimate. Actual payments may vary slightly based on exact tax assessments, insurance quotes, HOA specifics, and lender-specific terms.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Aim for a total monthly housing payment no more than 28% of your gross monthly income.',
        'Save for at least a 20% down payment to avoid PMI and secure better interest rates.',
        'Get pre-approved before house hunting to know your exact budget and strengthen offers.',
        'Compare rates from at least 3-5 lenders -- even small rate differences save thousands.',
        'Consider a 15-year mortgage if you can afford the payments to save massively on interest.',
        'Factor in all costs -- taxes, insurance, HOA, maintenance -- not just the mortgage payment.',
        'Make one extra mortgage payment per year to shave years off your loan.',
        'Build an emergency fund covering 3-6 months of housing payments before buying.'
      ]
    }
  },
  relatedTools: ['loan-calculator', 'compound-interest-calculator', 'break-even-calculator', 'net-worth-snapshot'],
  seo: {
    metaTitle: 'Mortgage Calculator -- Monthly Payment, PMI & Amortization | Untrackt',
    metaDescription: 'Estimate your monthly mortgage payment with principal, interest, taxes, insurance, and PMI. Compare 15 vs 30-year terms and view full amortization schedules.',
    keywords: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment', 'PMI calculator', 'amortization schedule', 'mortgage interest', 'PITI calculator']
  }
};
