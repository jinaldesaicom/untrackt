export default {
  id: 'roman-numeral-converter',
  title: 'Roman Numeral Converter',
  description: 'Convert between Roman numerals and Arabic numbers instantly, with explanations of conversion rules and numeral construction.',
  content: {
    whatIs: {
      heading: 'What is the Roman Numeral Converter?',
      body: 'The Roman Numeral Converter is a bidirectional conversion tool that translates between Roman numerals (I, V, X, L, C, D, M) and standard Arabic numbers (1, 2, 3…). It handles numbers from 1 to 3,999 using standard Roman numeral notation, explains the additive and subtractive rules behind each conversion, and breaks down the numeral construction step by step. It\'s invaluable for students studying Roman numerals in math class, history courses, or anyone encountering Roman numerals in outlines, clock faces, movie credits, or formal numbering.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Roman numerals follow a system of additive and subtractive rules that can be confusing, especially for larger or less common numbers. Quick mental conversion works for simple values like III (3) or X (10), but numbers like MCMXCIV (1994) require understanding multiple subtractive combinations. This tool provides instant, accurate conversion in both directions and shows you how the numeral is constructed, reinforcing your understanding of the system.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Choose your conversion direction: Roman to Arabic or Arabic to Roman.',
        'Enter your value--type a Roman numeral (e.g., XLII) or an Arabic number (e.g., 42).',
        'View the converted result displayed instantly.',
        'Review the step-by-step breakdown showing how the conversion works.',
        'Use the tool to verify your own manual conversions for homework or study.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Bidirectional conversion between Roman numerals and Arabic numbers.',
        'Supports the full standard range from 1 (I) to 3,999 (MMMCMXCIX).',
        'Step-by-step breakdown of how each numeral is constructed or decoded.',
        'Input validation that catches invalid Roman numeral combinations (e.g., IIII, VV).',
        'Reference chart of all base Roman numeral values visible alongside the converter.',
        'Explains additive and subtractive rules for educational use.',
        'Instant conversion with no page reload required.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students completing math homework involving Roman numeral conversions.',
        'History students reading dates on monuments, buildings, or historical documents.',
        'Writers using Roman numerals for formal outlines (I, II, III…).',
        'Anyone reading clock faces, movie sequel numbers, or Super Bowl numbering.',
        'Students verifying their manual conversions during study sessions.',
        'Creating numbered lists or sections using Roman numeral formatting.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Simple Conversion',
          description: '7 → VII. Breakdown: V (5) + I (1) + I (1) = 7 using the additive rule.'
        },
        {
          title: 'Subtractive Rule',
          description: '9 → IX. Instead of VIIII, the subtractive rule places I before X to mean 10 - 1 = 9.'
        },
        {
          title: 'Year Conversion',
          description: '2024 → MMXXIV. Breakdown: MM (2000) + XX (20) + IV (4).'
        },
        {
          title: 'Large Number',
          description: '3,497 → MMMCDXCVII. Breakdown: MMM (3000) + CD (400) + XC (90) + VII (7).'
        },
        {
          title: 'Roman to Arabic',
          description: 'MCMXCIV → 1994. Breakdown: M (1000) + CM (900) + XC (90) + IV (4).'
        },
        {
          title: 'Outline Numbering',
          description: 'Sections I through XII of a paper correspond to 1 through 12: I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Roman Numerals', definition: 'A numeral system originating in ancient Rome using seven symbols: I (1), V (5), X (10), L (50), C (100), D (500), M (1000).' },
        { term: 'Arabic Numerals', definition: 'The standard decimal number system (0-9) used worldwide today, also called Hindu-Arabic numerals.' },
        { term: 'Additive Rule', definition: 'When a smaller or equal numeral follows a larger one, their values are added. Example: VI = 5 + 1 = 6.' },
        { term: 'Subtractive Rule', definition: 'When a smaller numeral precedes a larger one, the smaller value is subtracted. Example: IV = 5 - 1 = 4.' },
        { term: 'Base Numerals', definition: 'The seven fundamental symbols (I, V, X, L, C, D, M) from which all Roman numerals are constructed.' },
        { term: 'Vinculum', definition: 'A line placed over a Roman numeral to multiply its value by 1,000. Used historically for very large numbers beyond 3,999.' },
        { term: 'Subtractive Pair', definition: 'A two-character combination where a smaller numeral precedes a larger one: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Why does the converter only go up to 3,999?', answer: 'Standard Roman numeral notation uses M (1000) as the largest symbol, and convention limits repetition to three consecutive identical symbols (MMM = 3000). Historical extensions like the vinculum exist but aren\'t part of standard modern usage.' },
        { question: 'Is IIII valid for 4?', answer: 'Some clock faces use IIII for 4, but the standard and widely accepted form is IV (subtractive notation). This converter uses the standard subtractive rules.' },
        { question: 'Can Roman numerals represent zero?', answer: 'No. The Roman numeral system has no symbol for zero. It was a positional placeholder concept introduced later with the Hindu-Arabic system.' },
        { question: 'What are the valid subtractive combinations?', answer: 'Only six subtractive pairs are standard: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). Combinations like IC or XM are not valid.' },
        { question: 'Are Roman numerals still used today?', answer: 'Yes. They appear on clock faces, in movie/TV sequel numbering, for Super Bowl numbers, in formal outlines, for monarchs and popes (Queen Elizabeth II), and on building cornerstones.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Memorize the seven base values (I=1, V=5, X=10, L=50, C=100, D=500, M=1000) as the foundation for all conversions.',
        'Learn the six subtractive pairs (IV, IX, XL, XC, CD, CM) to handle the most commonly confusing numbers.',
        'When converting large numbers, work from left to right, matching the largest possible numeral at each step.',
        'Use this tool to check your work, not replace learning--understanding the rules helps on tests and in real life.',
        'Remember that Roman numerals never repeat more than three times consecutively (III is valid, IIII is not standard).',
        'Practice with years (your birth year, current year) as they combine multiple numeral groups and are practical to know.'
      ]
    }
  },
  relatedTools: ['scientific-calculator', 'unit-converter', 'percentage-calculator', 'quadratic-solver'],
  seo: {
    metaTitle: 'Roman Numeral Converter - Roman to Arabic & Back - Wiki | UnTrackt',
    metaDescription: 'Convert Roman numerals to Arabic numbers and back instantly. Step-by-step breakdowns with additive and subtractive rule explanations for numbers 1 to 3,999.',
    keywords: ['Roman numeral converter', 'Roman numerals', 'Roman to Arabic', 'Arabic to Roman', 'numeral conversion', 'Roman numeral chart', 'MCMXCIV', 'Roman numeral rules']
  }
};
