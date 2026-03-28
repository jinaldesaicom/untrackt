export default {
  id: 'number-theory-calculator',
  title: 'Number Theory Calculator',
  description: 'Explore modular arithmetic, Euler\'s totient, divisor functions, and other number theory operations.',
  content: {
    whatIs: {
      heading: 'What is the Number Theory Calculator?',
      body: 'The Number Theory Calculator provides tools for modular arithmetic and number-theoretic functions. Compute modular exponentiation, modular inverse, Euler\'s totient function φ(n), divisor count and sum, check for perfect numbers, and solve linear congruences. It is designed for students and developers working with number theory concepts.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Number theory calculations — especially modular arithmetic with large numbers — are tedious by hand. This tool handles them instantly and correctly, making it essential for cryptography study, competitive programming, and discrete mathematics coursework.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a function: modular arithmetic, totient, divisors, congruences.',
        'Enter the required parameters.',
        'View the result with explanation.',
        'For modular exponentiation, enter base, exponent, and modulus.',
        'For totient, enter n to compute φ(n).',
        'Copy results or explore related functions.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Modular arithmetic (add, subtract, multiply, exponentiate mod n).',
        'Modular inverse computation.',
        'Euler\'s totient function φ(n).',
        'Divisor count σ₀(n) and divisor sum σ₁(n).',
        'Linear congruence solver.',
        'Perfect number detection.',
        'Step-by-step explanations.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Cryptography coursework (RSA, modular exponentiation).',
        'Competitive programming problems involving number theory.',
        'Discrete mathematics homework.',
        'Exploring number-theoretic properties.',
        'Verifying hand calculations for number theory proofs.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Modular Exponentiation', description: '3^100 mod 7 = 4 (using repeated squaring).' },
        { title: 'Euler\'s Totient', description: 'φ(12) = 4 (the numbers 1, 5, 7, 11 are coprime to 12).' },
        { title: 'Modular Inverse', description: '3⁻¹ mod 11 = 4 (because 3×4 = 12 ≡ 1 mod 11).' },
        { title: 'Linear Congruence', description: '5x ≡ 3 (mod 7) → x = 2.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Modular Arithmetic', definition: 'Arithmetic where numbers wrap around after reaching a modulus. a ≡ b (mod n) means a and b have the same remainder when divided by n.' },
        { term: 'Euler\'s Totient', definition: 'φ(n) counts the number of integers from 1 to n that are coprime (share no common factors) with n.' },
        { term: 'Modular Inverse', definition: 'The number a⁻¹ such that a × a⁻¹ ≡ 1 (mod n). Exists only when gcd(a, n) = 1.' },
        { term: 'Congruence', definition: 'Two numbers are congruent modulo n if they have the same remainder when divided by n.' },
        { term: 'Coprime', definition: 'Two numbers are coprime if their greatest common divisor is 1.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is modular exponentiation used for?', answer: 'It is the core operation in RSA encryption and other cryptographic algorithms.' },
        { question: 'When does a modular inverse exist?', answer: 'Only when gcd(a, n) = 1 — i.e., a and n are coprime.' },
        { question: 'Why is Euler\'s totient important?', answer: 'It is used in RSA key generation and Euler\'s theorem: a^φ(n) ≡ 1 (mod n) when gcd(a, n) = 1.' },
        { question: 'Can it handle large numbers?', answer: 'Yes. Modular exponentiation uses efficient algorithms (repeated squaring) that handle large numbers quickly.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use modular exponentiation instead of computing large powers then reducing — it is much faster.',
        'Check gcd(a, n) = 1 before looking for a modular inverse.',
        'Use Euler\'s theorem to simplify large exponents in modular arithmetic.',
        'For φ(n), use the prime factorization of n for efficient computation.',
        'Verify congruence solutions by substituting back into the original equation.',
        'Combine with the Prime Number Tools for factorization-based calculations.'
      ]
    }
  },
  relatedTools: ['prime-number-tools', 'binary-boolean-logic-calculator', 'equation-solver', 'matrix-calculator'],
  seo: {
    metaTitle: 'Number Theory Calculator — Modular Arithmetic & Totient | UnTrackt Wiki',
    metaDescription: 'Compute modular arithmetic, Euler\'s totient, modular inverse, divisor functions, and solve linear congruences with step-by-step work.',
    keywords: ['number theory', 'modular arithmetic', 'Euler totient', 'modular inverse', 'congruence solver', 'number theory calculator']
  }
};
