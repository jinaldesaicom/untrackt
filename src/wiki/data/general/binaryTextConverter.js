export default {
  id: 'binary-text-converter',
  title: 'Binary & Text Converter',
  description: 'Convert between text, binary, hexadecimal, octal, Morse code, and ASCII/Unicode encodings with real-time bidirectional translation.',
  content: {
    whatIs: {
      heading: 'What is the Binary & Text Converter?',
      body: 'The Binary & Text Converter is a multi-format encoding tool that translates between plain text and various numeric and symbolic representations: binary (base-2), hexadecimal (base-16), octal (base-8), decimal ASCII codes, and Morse code. It works bidirectionally--enter text to get binary, or enter binary to get text--with real-time conversion as you type.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Understanding binary and encoding systems is fundamental to computer science, networking, and cybersecurity. This tool serves as both a practical converter and an educational resource, letting students see how text is represented at the machine level, helping developers debug encoding issues, and allowing hobbyists to encode messages in Morse code or hexadecimal.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the input format: text, binary, hexadecimal, octal, decimal, or Morse code.',
        'Select the desired output format from the remaining options.',
        'Type or paste your input in the source field.',
        'View the converted output in real-time in the result field.',
        'Use the swap button to reverse input and output formats instantly.',
        'Copy the result to your clipboard with the copy button.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Bidirectional conversion between text, binary, hex, octal, decimal ASCII, and Morse code.',
        'Real-time conversion as you type with no submit button required.',
        'Support for full Unicode text including emoji and international characters.',
        'Formatted binary output with configurable spacing (e.g., 01001000 01101001 for "Hi").',
        'Swap button to instantly reverse input and output formats.',
        'Hexadecimal output with optional 0x prefix and configurable case (upper/lower).',
        'Morse code with standard ITU representations and audio playback option.',
        'Bulk text support for converting entire paragraphs or documents.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Computer science education: learning how text is stored as binary data.',
        'Debugging encoding issues by inspecting the hex or binary representation of characters.',
        'Creating encoded messages in Morse code for fun, puzzles, or amateur radio.',
        'Network analysis: converting packet data between hex dump and readable text.',
        'Programming: verifying character codes and bit patterns during development.',
        'Cybersecurity CTF challenges that require encoding/decoding between formats.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Text to binary', description: '"Hello" → 01001000 01100101 01101100 01101100 01101111 -- each letter becomes its 8-bit ASCII binary representation.' },
        { title: 'Binary to text', description: '01010100 01100101 01110011 01110100 → "Test" -- decode binary bytes back to readable ASCII text.' },
        { title: 'Text to hexadecimal', description: '"Hi" → 48 69 -- the hexadecimal representation of the ASCII values for H (72) and i (105).' },
        { title: 'Text to Morse code', description: '"SOS" → "... --- ..." -- the universal distress signal in International Morse Code.' },
        { title: 'Unicode emoji to binary', description: '"😀" → 11110000 10011111 10011000 10000000 -- the UTF-8 binary encoding of the grinning face emoji.' },
        { title: 'Hex to text debugging', description: '4A 53 4F 4E → "JSON" -- useful for reading hexadecimal dumps from network tools or file editors.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Binary (Base-2)', definition: 'A numbering system using only 0 and 1. Computers store all data as binary at the hardware level.' },
        { term: 'Hexadecimal (Base-16)', definition: 'A numbering system using 0-9 and A-F, commonly used in programming to represent binary data compactly (4 bits per hex digit).' },
        { term: 'Octal (Base-8)', definition: 'A numbering system using digits 0-7, historically used in Unix file permissions and some legacy systems.' },
        { term: 'ASCII', definition: 'American Standard Code for Information Interchange--a 7-bit character encoding standard mapping 128 characters to numeric values.' },
        { term: 'UTF-8', definition: 'A variable-width Unicode encoding that uses 1-4 bytes per character, backward-compatible with ASCII for the first 128 characters.' },
        { term: 'Morse code', definition: 'A character encoding using sequences of dots (.) and dashes (-) to represent letters, digits, and punctuation, developed for telegraphy.' },
        { term: 'Byte', definition: 'A unit of 8 bits, capable of representing values from 0 to 255 (or one ASCII character).' },
        { term: 'Code point', definition: 'A unique numeric identifier assigned to each character in the Unicode standard (e.g., U+0041 for "A").' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What encoding does this tool use for text?', answer: 'The tool uses UTF-8 encoding by default, which covers the entire Unicode character set including emoji and international scripts.' },
        { question: 'Can I convert emoji to binary?', answer: 'Yes. Emoji are represented as multi-byte UTF-8 sequences. For example, "😀" becomes four bytes in binary (32 bits).' },
        { question: 'What is the difference between ASCII and UTF-8?', answer: 'ASCII covers 128 characters with 7 bits. UTF-8 extends this to support over 1.1 million Unicode characters using variable-length encoding (1-4 bytes).' },
        { question: 'Is the Morse code output standard?', answer: 'Yes. The tool uses International Telecommunication Union (ITU) standard Morse code representations.' },
        { question: 'Can I convert between hex and binary directly?', answer: 'Yes. Select hexadecimal as input and binary as output (or vice versa) for direct conversion without going through text.' },
        { question: 'Why are there spaces between binary groups?', answer: 'Each group of 8 bits (one byte) represents one character. Spaces between groups improve readability and help you identify character boundaries.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use hexadecimal for compact representation--it\'s 4× shorter than binary and the standard in most programming contexts.',
        'When debugging encoding issues, convert suspect characters to hex to identify invisible Unicode characters.',
        'Remember that each hex digit represents exactly 4 binary bits (one nibble), making hex-to-binary conversion straightforward.',
        'For Morse code, use standard spacing: 1 unit between parts of a letter, 3 units between letters, 7 units between words.',
        'When working with network data, hexadecimal is the standard format for packet dumps and memory addresses.',
        'Use this tool to verify encoding when debugging garbled text (mojibake) caused by character set mismatches.',
        'For educational purposes, try converting your name to binary and back to build intuition for how text encoding works.'
      ]
    }
  },
  relatedTools: ['password-generator', 'case-converter', 'json-to-csv-converter', 'random-number-generator'],
  seo: {
    metaTitle: 'Binary & Text Converter - Binary, Hex, Morse Code & More | Wiki | UnTrackt',
    metaDescription: 'Convert between text, binary, hexadecimal, octal, and Morse code in real-time. Bidirectional translation with Unicode support--fully client-side.',
    keywords: ['binary converter', 'text to binary', 'hex converter', 'Morse code', 'ASCII converter', 'binary translator', 'hexadecimal', 'encoding tool', 'UTF-8']
  }
};
