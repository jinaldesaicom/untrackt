export default {
  id: 'currency-converter',
  title: 'Currency Converter',
  description: 'Convert between world currencies using current exchange rates for travel, business, or personal finance.',
  content: {
    whatIs: {
      heading: 'What is a Currency Converter?',
      body: 'A Currency Converter translates an amount of money from one currency to another based on current or recent exchange rates. It supports major world currencies as well as many emerging market currencies, allowing travelers, businesses, freelancers, and investors to quickly understand the equivalent value of money across borders. This tool provides instant conversions and helps you track how exchange rates fluctuate over time.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'In an increasingly globalized world, currency conversions are a daily need -- whether you are traveling abroad, receiving payment in a foreign currency, importing goods, investing internationally, or simply comparing prices across countries. This converter gives you accurate, up-to-date rates in a clean interface, eliminating the need to search multiple sources or manually calculate conversions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the source currency from the dropdown.',
        'Enter the amount you want to convert.',
        'Select the target currency.',
        'The converted amount is displayed instantly using the current rate.',
        'Swap currencies with one click to see the reverse conversion.',
        'Use the rate display to understand how much one unit of each currency is worth.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports 100+ world currencies with up-to-date exchange rates.',
        'Instant conversion as you type with no delays.',
        'One-click swap between source and target currencies.',
        'Shows the exchange rate per unit for both directions.',
        'Supports multi-currency comparison for a single base amount.',
        'Works offline with recently cached rates for convenience.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting prices while shopping online from international retailers.',
        'Calculating travel budgets in a destination country\'s currency.',
        'Invoicing international clients and understanding payment values.',
        'Comparing salaries or cost of living across different countries.',
        'Evaluating foreign investment returns in your home currency.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Travel Budget', description: 'Convert $2,000 USD to EUR for a European trip. At a rate of 0.92, you get approximately €1,840.' },
        { title: 'Freelance Payment', description: 'A client pays £3,500 GBP. Convert to USD at 1.27 rate to know you are receiving about $4,445.' },
        { title: 'International Shopping', description: 'A product costs ¥15,000 JPY. At 0.0067 USD/JPY, that is approximately $100.50 USD.' },
        { title: 'Remittance Calculation', description: 'Sending $500 USD to India. At a rate of 83.5 INR/USD, the recipient gets approximately ₹41,750.' },
        { title: 'Investment Return', description: 'Your European stock gained €2,000. Convert to USD at 1.09 to see the gain is approximately $2,180 in home currency.' },
        { title: 'Cost of Living Comparison', description: 'Rent of $1,500/month USD equals roughly ₹125,250 INR, £1,181 GBP, or €1,380 EUR -- useful when comparing job offers across countries.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Exchange Rate', definition: 'The price of one currency expressed in terms of another currency.' },
        { term: 'Base Currency', definition: 'The currency you are converting from -- the first currency in a currency pair.' },
        { term: 'Quote Currency', definition: 'The currency you are converting to -- the second currency in a currency pair.' },
        { term: 'Forex (Foreign Exchange)', definition: 'The global marketplace for trading currencies, the largest and most liquid financial market in the world.' },
        { term: 'Bid/Ask Spread', definition: 'The difference between the buy (bid) and sell (ask) prices of a currency, representing the cost of conversion.' },
        { term: 'Cross Rate', definition: 'An exchange rate between two currencies calculated via a third currency, usually USD.' },
        { term: 'Floating Exchange Rate', definition: 'A currency value determined by market forces of supply and demand, without government fixing.' },
        { term: 'Pegged Currency', definition: 'A currency whose value is fixed to another currency or a basket of currencies by the issuing government.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How often are exchange rates updated?', answer: 'Rates are updated regularly throughout the day during forex market hours. The rates shown are indicative mid-market rates; actual rates at banks or exchange services may differ.' },
        { question: 'Why is the rate different from what my bank offers?', answer: 'Banks and exchange services add a markup (spread) to the mid-market rate. The rate here is the true market rate -- your bank may charge 1-5% more depending on the service.' },
        { question: 'What is the best time to convert currency?', answer: 'Exchange rates fluctuate constantly. For large conversions, monitor the rate over days or weeks and convert when favourable. For small amounts, the difference is usually negligible.' },
        { question: 'Are cryptocurrency conversions supported?', answer: 'This tool focuses on traditional fiat currencies. For cryptocurrency conversions, use a dedicated crypto exchange or converter.' },
        { question: 'Can I use this for accounting or invoicing?', answer: 'The rates provided are indicative and suitable for estimates and planning. For official accounting, use rates from your central bank or an agreed-upon rate source.' },
        { question: 'What affects exchange rates?', answer: 'Exchange rates are influenced by interest rate differentials, inflation, trade balances, political stability, economic performance, and market speculation.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use the mid-market rate as a benchmark and expect banks to charge a markup on top.',
        'Compare rates from multiple services (banks, online services, ATMs) before converting large amounts.',
        'Avoid airport and hotel currency exchange counters -- they typically offer the worst rates.',
        'For travel, consider using a no-foreign-transaction-fee credit card instead of converting cash.',
        'Monitor rates for large transfers and set alerts for your target rate if your platform supports it.',
        'Be aware of transfer fees in addition to the exchange rate when sending money internationally.',
        'For business invoicing, agree on the rate source and date with clients to avoid disputes.',
        'Factor in exchange rate risk when pricing international contracts or making foreign investments.'
      ]
    }
  },
  relatedTools: ['inflation-calculator', 'roi-calculator', 'daily-expense-tracker'],
  seo: {
    metaTitle: 'Currency Converter -- Live Exchange Rates for 100+ Currencies | Untrackt',
    metaDescription: 'Convert between world currencies with up-to-date exchange rates. Perfect for travel, international business, freelancing, and comparing prices across countries.',
    keywords: ['currency converter', 'exchange rate calculator', 'forex converter', 'currency exchange', 'money converter', 'international currency', 'USD to EUR']
  }
};
