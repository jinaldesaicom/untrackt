export default {
  id: 'random-number-generator',
  title: 'Random Number Generator',
  description: 'Generate cryptographically secure random numbers, dice rolls, coin flips, and custom ranges for games, statistics, and decision-making.',
  content: {
    whatIs: {
      heading: 'What is the Random Number Generator?',
      body: 'The Random Number Generator produces random numbers within a specified range using the Web Crypto API for cryptographic-grade randomness. Beyond simple number ranges, it includes modes for dice rolling (d4, d6, d8, d10, d12, d20, d100), coin flips, lottery number picks, and custom distributions. All generation happens client-side in your browser with no server involvement.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'True randomness is surprisingly hard to achieve. Humans are poor at generating random sequences, and basic Math.random() in JavaScript is not cryptographically secure. This tool uses crypto.getRandomValues() to ensure unbiased, unpredictable results suitable for games, raffles, statistical sampling, and security-related tasks.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a mode: number range, dice roll, coin flip, or lottery picker.',
        'For number range mode, enter the minimum and maximum values (supports integers and decimals).',
        'For dice mode, select the die type(s) and the number of dice to roll.',
        'Click "Generate" to produce the random result.',
        'View the result with an optional animation for dice and coin flips.',
        'Generate multiple results at once by setting a count (e.g., 10 random numbers).',
        'Copy results or view the history of all generated values in the session.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Cryptographically secure random generation via Web Crypto API.',
        'Custom integer and decimal range with min/max bounds.',
        'Dice rolling: d4, d6, d8, d10, d12, d20, d100 with multi-die support.',
        'Coin flip with heads/tails result and streak tracking.',
        'Lottery number picker with configurable pool size and pick count.',
        'Bulk generation of multiple random numbers at once.',
        'No-repeat mode to generate unique values within a range.',
        'Session history log of all generated results.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tabletop RPG dice rolling for D&D, Pathfinder, and other games.',
        'Drawing raffle or lottery winners from a numbered pool.',
        'Random sampling for surveys, A/B testing, or statistical experiments.',
        'Making unbiased decisions (coin flip, random selection from a list).',
        'Generating random seeds for simulations or game development.',
        'Classroom activities where a random student number needs to be picked.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Random integer 1-100', description: 'Generate a single random integer between 1 and 100 for a quick pick or classroom activity.' },
        { title: '2d6 dice roll', description: 'Roll two six-sided dice and see the individual results (e.g., 3 + 5 = 8) for a board game turn.' },
        { title: 'Coin flip', description: 'Flip a virtual coin with an animated result: Heads or Tails, plus a running tally of flips in the session.' },
        { title: 'Lottery pick (6 from 49)', description: 'Generate 6 unique random numbers from 1-49, sorted in ascending order, simulating a standard lottery draw.' },
        { title: 'Bulk random generation', description: 'Generate 50 random decimals between 0 and 1 for statistical Monte Carlo sampling.' },
        { title: 'D20 RPG roll', description: 'Roll a d20 for an attack check: result is 17 -- a hit! Includes critical hit/miss indication for 20s and 1s.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'CSPRNG', definition: 'Cryptographically Secure Pseudo-Random Number Generator--an algorithm that produces random numbers suitable for security applications.' },
        { term: 'Entropy', definition: 'The degree of randomness or unpredictability in a system. Higher entropy means more truly random output.' },
        { term: 'Uniform distribution', definition: 'A probability distribution where every value in the range is equally likely to be generated.' },
        { term: 'Seed', definition: 'An initial value used to start a pseudo-random number generator. The same seed produces the same sequence.' },
        { term: 'Dice notation (NdX)', definition: 'Standard notation where N is the number of dice and X is the number of sides (e.g., 2d6 means two six-sided dice).' },
        { term: 'Modular bias', definition: 'A subtle bias introduced when mapping random bytes to a range using the modulo operator. Proper algorithms avoid this.' },
        { term: 'Web Crypto API', definition: 'A browser API (crypto.getRandomValues) that provides cryptographically strong random values from the operating system\'s entropy pool.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are the numbers truly random?', answer: 'They are cryptographically secure pseudo-random numbers generated by the Web Crypto API, which draws from the operating system\'s entropy pool. For all practical purposes, they are indistinguishable from true randomness.' },
        { question: 'Can I generate numbers without repeats?', answer: 'Yes. Enable the no-repeat mode to ensure all generated numbers within a batch are unique. This is useful for lottery draws and raffle picks.' },
        { question: 'What is the maximum range?', answer: 'The tool supports integer ranges up to ±2^53 (JavaScript\'s safe integer limit of 9,007,199,254,740,992), which covers virtually any practical use case.' },
        { question: 'Is the coin flip fair?', answer: 'Yes. The coin flip uses the same CSPRNG as the number generator, ensuring an unbiased 50/50 probability.' },
        { question: 'Can I use this for gambling?', answer: 'This tool is for entertainment, education, and general-purpose use. It is not certified for regulated gambling applications.' },
        { question: 'Does Math.random() work the same way?', answer: 'No. Math.random() is not cryptographically secure and should not be used for security-sensitive applications. This tool uses crypto.getRandomValues() instead.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use the Web Crypto API (as this tool does) for any application where randomness must be unpredictable.',
        'For lottery or raffle draws, enable no-repeat mode to ensure unique picks.',
        'When rolling multiple dice, check individual results as well as the sum for RPG rule accuracy.',
        'Use bulk generation for statistical sampling rather than generating numbers one at a time.',
        'Be aware of modular bias--this tool uses rejection sampling to ensure uniform distribution.',
        'For scientific simulations, document the generation method and parameters for reproducibility.'
      ]
    }
  },
  relatedTools: ['password-generator', 'countdown-timer', 'tip-splitter', 'binary-text-converter'],
  seo: {
    metaTitle: 'Random Number Generator - Dice Rolls, Coin Flips & More | Wiki | UnTrackt',
    metaDescription: 'Generate cryptographically secure random numbers, dice rolls, coin flips, and lottery picks. Custom ranges and bulk generation--fully client-side.',
    keywords: ['random number generator', 'RNG', 'dice roller', 'coin flip', 'lottery generator', 'crypto random', 'secure random', 'D&D dice', 'random picker']
  }
};
