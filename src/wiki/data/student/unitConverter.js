export default {
  id: 'unit-converter',
  title: 'Unit Converter',
  description: 'Convert between units of length, mass, temperature, volume, speed, area, time, and more with instant, accurate results.',
  content: {
    whatIs: {
      heading: 'What is the Unit Converter?',
      body: 'The Unit Converter is a comprehensive measurement conversion tool that supports all major unit categories: length, mass/weight, temperature, volume, area, speed, time, energy, pressure, data storage, and more. It handles both metric and imperial systems, provides instant bidirectional conversion, and supports hundreds of unit combinations. Whether you\'re converting kilometers to miles for a physics problem, Celsius to Fahrenheit for a chemistry lab, or gigabytes to megabytes for a computer science class, this tool delivers accurate results with the conversion formula shown.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Unit conversion is a daily need in STEM courses, cooking, travel, fitness, and professional work. While simple conversions can be done mentally, complex or unfamiliar conversions (e.g., pounds per square inch to atmospheres, or fluid ounces to milliliters) are error-prone without a reference. This tool provides instant, reliable conversions across dozens of unit categories and shows the conversion factor used, helping you learn the relationships between units.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the measurement category (length, mass, temperature, volume, etc.).',
        'Choose the source unit from the dropdown (e.g., kilometers).',
        'Choose the target unit from the dropdown (e.g., miles).',
        'Enter the value to convert in the input field.',
        'View the converted result instantly, along with the conversion factor.',
        'Swap the source and target units with one click for reverse conversion.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports 10+ measurement categories: length, mass, temperature, volume, area, speed, time, energy, pressure, and data.',
        'Hundreds of individual unit pairs across metric, imperial, and specialized systems.',
        'Instant bidirectional conversion with one-click unit swap.',
        'Displays the conversion factor and formula used for each calculation.',
        'Temperature conversion handles non-linear formulas (Celsius, Fahrenheit, Kelvin) correctly.',
        'Precise results with configurable decimal places.',
        'Works offline after initial page load--no server communication needed.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics students converting between SI and imperial units in homework and lab reports.',
        'Chemistry students converting mass, volume, and pressure units for calculations.',
        'Cooking and baking with recipes using different measurement systems.',
        'Travelers converting distances, temperatures, and currencies between countries.',
        'Fitness enthusiasts converting between pounds/kilograms and miles/kilometers.',
        'Computer science students converting between bytes, kilobytes, megabytes, and gigabytes.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Length Conversion',
          description: '5 kilometers = 3.10686 miles. Conversion factor: 1 km = 0.621371 miles.'
        },
        {
          title: 'Temperature Conversion',
          description: '100°C = 212°F. Formula: °F = (°C × 9/5) + 32. Also: 100°C = 373.15 K.'
        },
        {
          title: 'Mass Conversion',
          description: '150 pounds = 68.0389 kilograms. Conversion factor: 1 lb = 0.453592 kg.'
        },
        {
          title: 'Volume Conversion',
          description: '1 gallon (US) = 3.78541 liters. Useful for comparing fuel economy between US and metric systems.'
        },
        {
          title: 'Data Storage Conversion',
          description: '1 terabyte = 1,024 gigabytes = 1,048,576 megabytes (using binary prefixes).'
        },
        {
          title: 'Speed Conversion',
          description: '60 miles per hour = 96.5606 kilometers per hour = 26.8224 meters per second.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Metric System (SI)', definition: 'The International System of Units based on meters, kilograms, seconds, and their decimal multiples. Used by most countries worldwide.' },
        { term: 'Imperial System', definition: 'A measurement system using inches, feet, yards, miles, pounds, and gallons. Primarily used in the United States.' },
        { term: 'Conversion Factor', definition: 'A numerical multiplier used to convert from one unit to another. Example: multiply miles by 1.60934 to get kilometers.' },
        { term: 'Base Unit', definition: 'The fundamental unit in a measurement system from which others are derived. The meter is the SI base unit for length.' },
        { term: 'Absolute Zero', definition: '0 Kelvin (−273.15°C or −459.67°F)--the lowest theoretical temperature where all molecular motion ceases.' },
        { term: 'Binary Prefix', definition: 'Data measurement prefixes using powers of 2: kibi (2¹⁰ = 1,024), mebi (2²⁰), gibi (2³⁰). Distinct from decimal prefixes (kilo = 1,000).' },
        { term: 'Dimensional Analysis', definition: 'A method of converting units by multiplying by conversion factors arranged so unwanted units cancel out, leaving the desired unit.' },
        { term: 'Significant Figures', definition: 'The number of meaningful digits in a measurement. Conversion results should maintain the same number of significant figures as the input.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Why does the temperature conversion use a different formula than other conversions?', answer: 'Most conversions are simple multiplications (proportional). Temperature conversions between Celsius, Fahrenheit, and Kelvin involve both multiplication and addition because the scales have different zero points.' },
        { question: 'Is a "kilobyte" 1,000 or 1,024 bytes?', answer: 'Both conventions exist. The decimal prefix "kilo" means 1,000, but in computing, a kilobyte has traditionally meant 1,024 bytes (2¹⁰). The binary prefix "kibibyte" (KiB) formally refers to 1,024. This tool supports both conventions.' },
        { question: 'What\'s the difference between US and UK gallons?', answer: 'A US gallon is 3.785 liters while a UK (imperial) gallon is 4.546 liters. The converter distinguishes between the two--make sure you select the correct one.' },
        { question: 'How precise are the conversions?', answer: 'Conversions use standard conversion factors accurate to at least 6 significant figures. You can adjust the number of decimal places displayed in the results.' },
        { question: 'Can I chain conversions (e.g., mph to m/s)?', answer: 'Yes. Compound unit conversions like miles per hour to meters per second are handled directly--you don\'t need to do multiple separate conversions.' },
        { question: 'Does the tool handle scientific notation for very large or small values?', answer: 'Yes. Very large or very small results are automatically displayed in scientific notation for readability.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always verify you\'re using the correct unit variant (e.g., US gallon vs. imperial gallon, short ton vs. metric ton).',
        'For homework and lab reports, include the conversion factor or formula alongside your answer for full credit.',
        'Maintain appropriate significant figures in your converted result--don\'t report more precision than your input had.',
        'Learn the most common conversion factors for your field (e.g., 1 inch = 2.54 cm, 1 kg = 2.205 lbs) for quick mental estimates.',
        'Use dimensional analysis to understand multi-step conversions rather than memorizing every pair.',
        'When converting temperatures, remember that Celsius and Fahrenheit are equal at -40° -- a useful sanity check.',
        'For data storage, clarify whether you mean binary (1024-based) or decimal (1000-based) prefixes, as the difference grows with larger units.'
      ]
    }
  },
  relatedTools: ['scientific-calculator', 'percentage-calculator', 'quadratic-solver', 'roman-numeral-converter'],
  seo: {
    metaTitle: 'Unit Converter - Length, Mass, Temperature & More - Wiki | UnTrackt',
    metaDescription: 'Convert between units of length, mass, temperature, volume, speed, area, time, energy, and data. Supports metric, imperial, and binary systems with instant results.',
    keywords: ['unit converter', 'measurement converter', 'metric to imperial', 'temperature converter', 'length converter', 'mass converter', 'volume converter', 'unit conversion tool']
  }
};
