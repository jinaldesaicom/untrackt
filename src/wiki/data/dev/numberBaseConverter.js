export default {
  id: 'number-base-converter',
  title: 'Number Base Converter',
  description: 'Convert numbers between binary, octal, decimal, and hexadecimal bases with step-by-step explanations and bit visualization.',
  content: {
    whatIs: {
      heading: 'What is the Number Base Converter?',
      body: 'The Number Base Converter is a tool that converts numbers between different numeral systems: binary (base-2), octal (base-8), decimal (base-10), and hexadecimal (base-16). It also supports arbitrary bases from 2 to 36. Enter a number in any base, and the tool instantly shows the equivalent in all other bases, with optional step-by-step conversion explanations and visual bit-level representations. This tool is essential for developers working with low-level programming, networking, color codes, memory addresses, and bitwise operations.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Developers frequently need to convert between number bases when reading memory dumps, working with color codes (hex), analyzing network packets (binary/hex), or debugging bitwise operations. Performing base conversions mentally is error-prone, especially for large numbers. This tool provides instant, accurate conversions with visual aids that help you understand the relationship between different number representations.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a number in the input field.',
        'Select the input base (binary, octal, decimal, hex, or custom base 2-36).',
        'View the instant conversion to all standard bases simultaneously.',
        'Use the bit visualization to see the binary representation with grouped nibbles.',
        'Toggle the step-by-step explanation to understand the conversion process.',
        'Copy any converted value to your clipboard.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Convert between binary (base-2), octal (base-8), decimal (base-10), and hexadecimal (base-16).',
        'Support for any custom base from 2 to 36.',
        'Simultaneous display of all standard base conversions.',
        'Visual bit representation with nibble (4-bit) grouping.',
        'Step-by-step conversion explanation for educational purposes.',
        'Support for both integer and fractional number conversions.',
        'Signed and unsigned integer toggle (two\'s complement).',
        'Large number support -- handles values beyond standard 32-bit and 64-bit ranges.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting hexadecimal color codes to RGB decimal values.',
        'Analyzing binary data in network protocols and packet captures.',
        'Working with memory addresses and register values in embedded systems.',
        'Debugging bitwise operations by visualizing binary representations.',
        'Converting between octal file permissions (chmod 755) and their binary equivalents.',
        'Understanding number encoding in different programming languages.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Hex to Decimal', description: 'Convert 0xFF to decimal: 255 -- commonly used for color channel values and byte maximums.' },
        { title: 'Decimal to Binary', description: 'Convert 42 to binary: 101010 -- visualize the bit pattern with nibble grouping as 0010 1010.' },
        { title: 'Binary to Hex', description: 'Convert 11001010 to hexadecimal: CA -- group binary digits into nibbles (1100 = C, 1010 = A).' },
        { title: 'Octal Permissions', description: 'Convert chmod 755 to binary: 111 101 101 -- showing rwx r-x r-x file permissions.' },
        { title: 'IP Address Octets', description: 'Convert the decimal IP octet 192 to binary: 11000000 -- useful for subnet mask calculations.' },
        { title: 'Two\'s Complement', description: 'See how -42 is represented as 11010110 in 8-bit two\'s complement binary.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Binary (Base-2)', definition: 'A numeral system using only two digits (0 and 1). The fundamental representation of data in digital computers.' },
        { term: 'Octal (Base-8)', definition: 'A numeral system using digits 0-7. Used in Unix file permissions and some programming contexts.' },
        { term: 'Decimal (Base-10)', definition: 'The standard numeral system used by humans, using digits 0-9. Also called the "denary" system.' },
        { term: 'Hexadecimal (Base-16)', definition: 'A numeral system using digits 0-9 and letters A-F. Widely used for color codes, memory addresses, and compact binary representation.' },
        { term: 'Radix', definition: 'The base of a numeral system -- the number of unique digits used. Binary has radix 2, decimal has radix 10, hex has radix 16.' },
        { term: 'Bit', definition: 'A binary digit -- the smallest unit of data in computing, representing a 0 or 1.' },
        { term: 'Nibble', definition: 'A group of 4 bits, representing a single hexadecimal digit. One byte consists of two nibbles.' },
        { term: 'Two\'s Complement', definition: 'A method for representing signed integers in binary, where the most significant bit indicates the sign (0 for positive, 1 for negative).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the largest number I can convert?', answer: 'The tool supports arbitrary-precision integers. For practical purposes, it handles numbers with hundreds of digits across all bases.' },
        { question: 'Can I convert fractional numbers?', answer: 'Yes. The tool supports fractional numbers in all bases, though some fractions may result in repeating digits in certain bases (like 1/3 in decimal).' },
        { question: 'What does the 0x prefix mean?', answer: '0x is the conventional prefix for hexadecimal numbers in most programming languages (C, JavaScript, Python). Similarly, 0b is used for binary and 0o for octal.' },
        { question: 'How does two\'s complement work?', answer: 'In two\'s complement, the most significant bit represents the sign. Negative numbers are represented by inverting all bits and adding 1. For example, -1 in 8-bit is 11111111.' },
        { question: 'Why is hex used for colors?', answer: 'Each hex digit represents 4 bits (a nibble), so two hex digits represent one byte (0-255), which is the exact range for each RGB color channel. #FF = 255 = maximum intensity.' },
        { question: 'Can I convert between any arbitrary bases?', answer: 'Yes. The tool supports custom bases from 2 to 36. Bases above 10 use letters (A=10, B=11, ... Z=35).' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Group binary digits into nibbles (4-bit groups) for easier reading and hex conversion.',
        'Use hexadecimal as a shorthand for binary -- each hex digit maps exactly to 4 binary digits.',
        'Remember that 0xFF = 255 = 11111111 -- the maximum value for one byte.',
        'Use the bit visualization to verify bitwise operations and masks.',
        'When working with file permissions, remember that each octal digit maps to 3 binary bits (rwx).',
        'Be aware of signed vs unsigned interpretation -- the same bit pattern can represent different values.'
      ]
    }
  },
  relatedTools: ['hash-generator', 'color-converter', 'unix-timestamp-converter', 'base64-tool', 'json-formatter'],
  seo: {
    metaTitle: 'Number Base Converter - Binary, Octal, Decimal, Hex | UnTrackt Wiki',
    metaDescription: 'Convert numbers between binary, octal, decimal, and hexadecimal bases instantly. Visual bit representation and step-by-step explanations included.',
    keywords: ['number base converter', 'binary to decimal', 'hex to decimal', 'decimal to binary', 'base converter', 'binary converter', 'hexadecimal converter', 'radix conversion']
  }
};
