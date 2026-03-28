export default {
  id: 'percentage-calculator',
  title: 'Percentage Calculator',
  description: 'Calculate percentages, percentage changes, increases, decreases, and ratios with a fast and intuitive math tool.',
  content: {
    whatIs: {
      heading: 'What is the Percentage Calculator?',
      body: 'The Percentage Calculator is a versatile math tool that handles all common percentage operations: finding what percentage one number is of another, calculating a percentage of a number, determining percentage increase or decrease, and converting between fractions, decimals, and percentages. It supports the everyday percentage questions students encounter in math classes, science labs, finance courses, and daily life--providing instant, step-by-step results so you understand the math behind the answer.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Percentage problems appear everywhere--from calculating grades and discounts to understanding statistical data and financial reports. While the math isn\'t difficult, it\'s easy to make errors with decimal placement or to confuse percentage-of vs. percentage-change calculations. This tool handles the arithmetic instantly and shows you the formula used, reinforcing your understanding while eliminating calculation mistakes.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the type of percentage calculation you need from the available modes.',
        'Enter the required values in the input fields (e.g., "What is 15% of 200?").',
        'View the result calculated instantly below the inputs.',
        'Review the formula and step-by-step breakdown shown alongside the answer.',
        'Switch between calculation modes to perform different types of percentage operations.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Multiple calculation modes: percentage of a number, percentage change, percentage difference, and reverse percentage.',
        'Step-by-step formula display showing how the answer was derived.',
        'Fraction-to-percentage and decimal-to-percentage conversions.',
        'Percentage increase and decrease calculations with clear direction indicators.',
        'History of recent calculations for quick reference.',
        'Clean, focused interface designed for fast input and results.',
        'No sign-up or internet connection required--runs entirely in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students calculating their score as a percentage on tests and assignments.',
        'Shoppers determining the actual price after a discount percentage.',
        'Finance students computing interest rates, returns, and profit margins.',
        'Science students converting experimental data to percentage compositions.',
        'Anyone calculating tips at restaurants or splitting bills by percentage.',
        'Data analysis involving percentage distributions and comparisons.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Test Score Percentage',
          description: 'You scored 42 out of 50 on a quiz. The calculator shows: (42 ÷ 50) × 100 = 84%.'
        },
        {
          title: 'Percentage Increase',
          description: 'Your rent went from $1,200 to $1,350. The percentage increase is: ((1350 - 1200) ÷ 1200) × 100 = 12.5%.'
        },
        {
          title: 'Discount Calculation',
          description: 'A $89.99 item is 30% off. The discount is $27.00, making the sale price $63.00 (rounded).'
        },
        {
          title: 'Finding the Original Price',
          description: 'After a 20% discount, an item costs $64. The original price was: 64 ÷ (1 - 0.20) = $80.00.'
        },
        {
          title: 'Grade Weight Calculation',
          description: 'Your exam is worth 40% of your grade and you scored 88%. The weighted contribution is: 88 × 0.40 = 35.2 points out of 40.'
        },
        {
          title: 'Tip Calculation',
          description: 'A dinner bill of $67.50 with an 18% tip: 67.50 × 0.18 = $12.15 tip, $79.65 total.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Percentage', definition: 'A number expressed as a fraction of 100. The symbol % means "per hundred." So 45% means 45 out of every 100.' },
        { term: 'Percentage Change', definition: 'The amount of increase or decrease expressed as a percentage of the original value. Formula: ((New - Old) ÷ Old) × 100.' },
        { term: 'Base Value', definition: 'The original or reference number in a percentage calculation--the "whole" that the percentage is calculated from.' },
        { term: 'Percentage Point', definition: 'The arithmetic difference between two percentages. A change from 10% to 15% is 5 percentage points, but a 50% increase.' },
        { term: 'Markup', definition: 'The percentage added to the cost of a product to determine its selling price. A $50 item with 40% markup sells for $70.' },
        { term: 'Margin', definition: 'The percentage of the selling price that is profit. A $70 item with $20 profit has a margin of 28.6%, distinct from the 40% markup.' },
        { term: 'Basis Point', definition: 'One hundredth of a percentage point (0.01%). Used in finance--a rate change from 5.00% to 5.25% is a 25 basis point increase.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What\'s the difference between percentage change and percentage points?', answer: 'Percentage change is relative to the original value. Percentage points are the absolute difference. Going from 20% to 25% is a 5 percentage point increase but a 25% increase in relative terms.' },
        { question: 'How do I calculate what percentage one number is of another?', answer: 'Divide the part by the whole and multiply by 100. For example, 30 out of 80: (30 ÷ 80) × 100 = 37.5%.' },
        { question: 'How do I find the original number before a percentage change?', answer: 'For a percentage increase: divide the new number by (1 + rate). For a decrease: divide by (1 - rate). Example: $75 after 25% increase → 75 ÷ 1.25 = $60 original.' },
        { question: 'Why does a 50% decrease followed by a 50% increase not return to the original?', answer: 'Because the base changes. $100 decreased by 50% = $50. Then $50 increased by 50% = $75, not $100. The increase applies to the reduced amount.' },
        { question: 'Can I calculate compound percentages?', answer: 'Yes. Enter sequential percentage changes and the tool will compute the compound result, which is often different from simply adding the percentages.' },
        { question: 'Is there a difference between "percent of" and "percent off"?', answer: 'Yes. "20% of $100" is $20. "20% off $100" means $100 minus 20% of $100, which is $80. They\'re complementary operations.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always identify the base value (the "of what?") before performing percentage calculations to avoid errors.',
        'Use the step-by-step display to understand the formula, not just the answer--this builds your math skills.',
        'Remember that percentage increase and decrease use the original value as the base, not the new value.',
        'When comparing prices or data, be clear whether you mean percentage change or percentage point difference.',
        'For financial calculations, pay attention to rounding--small decimal differences can matter over large amounts.',
        'Double-check results by working backward: if 25% of X is 50, then X should be 200. Verify: 200 × 0.25 = 50 ✓'
      ]
    }
  },
  relatedTools: ['gpa-calculator', 'scientific-calculator', 'unit-converter', 'quadratic-solver'],
  seo: {
    metaTitle: 'Percentage Calculator - Percent Change, Increase & Decrease - Wiki | UnTrackt',
    metaDescription: 'Calculate percentages, percentage changes, increases, decreases, discounts, and tips. Step-by-step formulas for all percentage operations.',
    keywords: ['percentage calculator', 'percent change', 'percentage increase', 'percentage decrease', 'calculate percentage', 'discount calculator', 'percentage formula', 'math tool']
  }
};
