export default {
  id: 'binary-boolean-logic-calculator',
  title: 'Binary & Boolean Logic Calculator',
  description: 'Work with binary numbers and boolean logic — convert bases, perform bitwise operations, and build truth tables.',
  content: {
    whatIs: {
      heading: 'What is the Binary & Boolean Logic Calculator?',
      body: 'The Binary & Boolean Logic Calculator combines base conversion and boolean algebra tools. Convert between binary, decimal, octal, and hexadecimal. Perform bitwise operations (AND, OR, XOR, NOT, shifts). Build truth tables for boolean expressions and simplify them.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Binary and boolean operations are core to computer science, digital logic design, and low-level programming. This tool handles conversions and operations instantly, generates truth tables for verification, and helps learn how digital logic works.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'For base conversion: enter a number and select source/target base.',
        'For bitwise operations: enter two numbers and select the operation.',
        'For truth tables: enter a boolean expression with variables.',
        'View the result with bit-level breakdown.',
        'See the truth table for all input combinations.',
        'Copy results or explore additional operations.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Base conversion: binary, decimal, octal, hexadecimal.',
        'Bitwise operations: AND, OR, XOR, NOT, left shift, right shift.',
        'Truth table generator for boolean expressions.',
        'Boolean expression simplification.',
        'Bit-level visualization.',
        'Two\'s complement representation.',
        'Up to 32-bit number support.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Computer science coursework on digital logic.',
        'Debugging bit manipulation code.',
        'Understanding network subnet masks.',
        'Digital circuit design verification.',
        'Learning boolean algebra with truth tables.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Base Conversion', description: '255 decimal = 11111111 binary = FF hex = 377 octal.' },
        { title: 'Bitwise AND', description: '0b1100 AND 0b1010 = 0b1000 (8 in decimal).' },
        { title: 'Truth Table', description: 'A AND (B OR C) — generates 8-row truth table for all combinations.' },
        { title: 'XOR', description: '0b1010 XOR 0b0110 = 0b1100 — bits differ? 1. Same? 0.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Binary', definition: 'Base-2 number system using digits 0 and 1.' },
        { term: 'Hexadecimal', definition: 'Base-16 number system using digits 0-9 and A-F.' },
        { term: 'Bitwise AND', definition: 'Operation that returns 1 only when both corresponding bits are 1.' },
        { term: 'XOR (Exclusive OR)', definition: 'Returns 1 when exactly one of the corresponding bits is 1.' },
        { term: 'Truth Table', definition: 'A table showing all possible input combinations and the resulting output for a boolean expression.' },
        { term: 'Two\'s Complement', definition: 'The standard representation for signed integers in binary, where the most significant bit represents the sign.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many bits are supported?', answer: 'Up to 32 bits for integer operations.' },
        { question: 'What boolean operators are supported?', answer: 'AND, OR, NOT, XOR, NAND, NOR, and XNOR.' },
        { question: 'How does two\'s complement work?', answer: 'Flip all bits and add 1 to get the negative representation. The MSB indicates sign (0 = positive, 1 = negative).' },
        { question: 'Can I enter numbers in different bases?', answer: 'Yes. Prefix with 0b for binary, 0x for hex, 0o for octal, or enter plain decimal.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Group binary digits in sets of 4 for readability (1010 0011).',
        'Use hex as a compact representation of binary — each hex digit = 4 bits.',
        'Use truth tables to verify boolean simplifications.',
        'Remember: XOR is addition without carry in binary.',
        'Learn common bit patterns: 0xFF = all 1s in a byte, 0x80 = MSB set.',
        'Use bitwise AND with a mask to isolate specific bits.'
      ]
    }
  },
  relatedTools: ['number-theory-calculator', 'set-theory-calculator', 'prime-number-tools', 'equation-solver'],
  seo: {
    metaTitle: 'Binary & Boolean Logic Calculator — Base Conversion & Truth Tables | UnTrackt Wiki',
    metaDescription: 'Convert between binary, decimal, hex, and octal. Perform bitwise operations, build truth tables, and simplify boolean expressions.',
    keywords: ['binary calculator', 'boolean logic', 'truth table', 'base conversion', 'bitwise operations', 'binary converter']
  }
};
