export default {
  id: 'prime-number-tools',
  title: 'Prime Number Tools',
  description: 'Test primality, find prime factors, generate primes in a range, and explore prime number properties.',
  content: {
    whatIs: {
      heading: 'What are the Prime Number Tools?',
      body: 'The Prime Number Tools provide a suite of utilities for working with prime numbers. Test whether a number is prime, find its prime factorization, generate all primes in a range, find the nth prime, compute greatest common divisor (GCD) and least common multiple (LCM), and explore properties like twin primes and prime gaps.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Prime numbers are fundamental to number theory, cryptography, and algorithm design. Testing large numbers for primality or finding factors by hand is impractical. This tool handles it instantly, whether for homework, coding challenges, or exploring number theory.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a function: primality test, factorization, prime generation, GCD/LCM.',
        'Enter the number(s) for the selected operation.',
        'View the result with explanation.',
        'For prime generation, set the range or count.',
        'Explore additional properties like twin primes.',
        'Copy results or try another number.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Primality testing for large numbers.',
        'Prime factorization with factor tree.',
        'Prime number generation in a range.',
        'Nth prime finder.',
        'GCD and LCM calculator.',
        'Twin prime detection.',
        'Step-by-step factorization display.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Number theory homework and exploration.',
        'Finding prime factors for simplifying fractions.',
        'Generating prime numbers for coding challenges.',
        'Computing GCD/LCM for math problems.',
        'Exploring prime distribution patterns.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Primality Test', description: 'Is 997 prime? Yes — it has no divisors other than 1 and itself.' },
        { title: 'Factorization', description: '360 = 2³ × 3² × 5¹.' },
        { title: 'Primes in Range', description: 'Primes between 100 and 200: 101, 103, 107, 109, 113, ..., 199.' },
        { title: 'GCD/LCM', description: 'GCD(48, 36) = 12. LCM(48, 36) = 144.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Prime Number', definition: 'A natural number greater than 1 that has no positive divisors other than 1 and itself.' },
        { term: 'Prime Factorization', definition: 'Expressing a number as a product of its prime factors.' },
        { term: 'GCD (Greatest Common Divisor)', definition: 'The largest number that divides two or more numbers without a remainder.' },
        { term: 'LCM (Least Common Multiple)', definition: 'The smallest number that is a multiple of two or more numbers.' },
        { term: 'Twin Primes', definition: 'Pairs of primes that differ by 2 (e.g., 11 and 13, 17 and 19).' },
        { term: 'Composite Number', definition: 'A natural number greater than 1 that is not prime — it has at least one divisor other than 1 and itself.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How large a number can I test?', answer: 'The tool handles numbers up to several billion. Very large numbers use probabilistic tests.' },
        { question: 'Is 1 a prime number?', answer: 'No. By convention, 1 is neither prime nor composite.' },
        { question: 'What is the largest known prime?', answer: 'The largest known primes are Mersenne primes (2^p - 1). They have millions of digits.' },
        { question: 'How do I find GCD of more than two numbers?', answer: 'Apply GCD pairwise: GCD(a, b, c) = GCD(GCD(a, b), c).' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Check divisibility by small primes (2, 3, 5, 7, 11, 13) first for quick primality intuition.',
        'Use prime factorization to compute GCD and LCM efficiently.',
        'Remember: you only need to check divisors up to √n for primality.',
        'For factoring, divide out the smallest prime first, then repeat.',
        'Use the Sieve of Eratosthenes approach for generating primes in a range.',
        'GCD × LCM = product of the two numbers — use this as a verification check.'
      ]
    }
  },
  relatedTools: ['number-theory-calculator', 'fraction-calculator', 'binary-boolean-logic-calculator', 'equation-solver'],
  seo: {
    metaTitle: 'Prime Number Tools — Primality, Factorization, GCD/LCM | UnTrackt Wiki',
    metaDescription: 'Test primality, find prime factors, generate primes in a range, and compute GCD and LCM. Explore prime number properties.',
    keywords: ['prime number tools', 'primality test', 'prime factorization', 'GCD LCM', 'prime generator', 'number theory']
  }
};
