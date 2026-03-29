export default {
  id: 'password-generator',
  title: 'Password Generator',
  description: 'Generate cryptographically secure passwords with customizable length, character sets, and entropy analysis to protect your online accounts.',
  content: {
    whatIs: {
      heading: 'What is the Password Generator?',
      body: 'The Password Generator is a client-side tool that creates strong, random passwords using the Web Crypto API. Unlike server-based generators, your passwords are never transmitted over the network--they are generated entirely in your browser. You can configure length, choose character sets (uppercase, lowercase, digits, symbols), exclude ambiguous characters, and instantly see the estimated entropy and crack-time of each password.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Reusing weak passwords is the single biggest cause of account compromise. A dedicated password generator removes human bias from the process and produces truly random strings that resist brute-force, dictionary, and credential-stuffing attacks. This tool also displays entropy in bits so you can verify a password meets your security policy before you use it.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the desired password length using the slider or input field (8-128 characters).',
        'Toggle the character sets you want: uppercase letters, lowercase letters, numbers, and special symbols.',
        'Optionally exclude ambiguous characters like 0, O, l, 1, I to avoid confusion.',
        'Click "Generate" to create a new password instantly.',
        'Review the entropy rating and estimated crack-time displayed below the password.',
        'Click the copy button to copy the password to your clipboard securely.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Cryptographically secure random generation via the Web Crypto API (crypto.getRandomValues).',
        'Adjustable length from 8 to 128 characters for any security requirement.',
        'Granular character-set toggles: uppercase, lowercase, digits, and over 30 special symbols.',
        'Ambiguous character exclusion to improve readability for manual entry.',
        'Real-time entropy calculation displayed in bits with a color-coded strength meter.',
        'Estimated crack-time based on current GPU brute-force benchmarks.',
        'One-click copy to clipboard with confirmation toast notification.',
        'Bulk generation mode to create multiple passwords at once.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating unique passwords for each website and storing them in a password manager.',
        'Generating API keys, tokens, or secret strings for development environments.',
        'Meeting corporate password policies that require specific length and complexity.',
        'Creating temporary one-time passwords for guest Wi-Fi or shared accounts.',
        'Producing random passphrases for disk encryption or SSH keys.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard 16-character password', description: 'Using all character sets: "aG7$kL9!mQ2&xR4#" -- approximately 105 bits of entropy.' },
        { title: 'Alphanumeric only (no symbols)', description: '"Tm8xRq3WnB6yKd2P" -- suitable for systems that disallow special characters.' },
        { title: 'PIN-style numeric code', description: '"482917" -- a 6-digit numeric code for quick-access locks or verification fields.' },
        { title: 'High-security 32-character password', description: 'A 32-char string with all character sets enabled provides ~210 bits of entropy, exceeding most security standards.' },
        { title: 'Readable password (no ambiguous chars)', description: '"Hx7rNw3kYp9sFm2d" -- excludes 0/O/l/1/I for easy manual entry on mobile devices.' },
        { title: 'Bulk generation for a team', description: 'Generate 10 unique 20-character passwords at once and export as a plain-text list for onboarding.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Entropy', definition: 'A measure of randomness in a password, expressed in bits. Higher entropy means a password is harder to guess or brute-force.' },
        { term: 'Brute-force attack', definition: 'An attack that tries every possible combination of characters until the correct password is found.' },
        { term: 'Character set', definition: 'The pool of characters from which a password is drawn, such as lowercase letters (26), digits (10), or symbols (32+).' },
        { term: 'Web Crypto API', definition: 'A browser-native JavaScript API that provides cryptographically strong random number generation without external libraries.' },
        { term: 'Credential stuffing', definition: 'An attack that uses leaked username/password pairs from one breach to access accounts on other sites.' },
        { term: 'Dictionary attack', definition: 'An attack that tries common words, phrases, and known leaked passwords instead of random combinations.' },
        { term: 'Passphrase', definition: 'A password composed of multiple random words, offering high entropy while remaining easier to memorize.' },
        { term: 'Salt', definition: 'A random value added to a password before hashing to ensure identical passwords produce different hashes.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is this password generator safe to use?', answer: 'Yes. Passwords are generated entirely in your browser using the Web Crypto API. No data is sent to any server.' },
        { question: 'What password length should I use?', answer: 'For general accounts, 16 characters with mixed character sets is strong. For high-security applications like encryption keys, use 24-32 characters or more.' },
        { question: 'Why is entropy important?', answer: 'Entropy quantifies how unpredictable a password is. A password with 80+ bits of entropy is considered very strong against modern brute-force hardware.' },
        { question: 'Can I generate a passphrase instead?', answer: 'This tool focuses on random-character passwords. For word-based passphrases, consider a dedicated passphrase generator or Diceware method.' },
        { question: 'Does the tool store my passwords?', answer: 'No. Generated passwords exist only in your browser session. Once you leave the page, they are gone unless you copied them.' },
        { question: 'Why exclude ambiguous characters?', answer: 'Characters like 0/O and l/1/I look similar in many fonts. Excluding them prevents mistakes when manually typing a password on another device.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use a unique password for every account--never reuse passwords across sites.',
        'Aim for at least 16 characters with mixed character sets for everyday accounts.',
        'Store generated passwords in a reputable password manager rather than writing them down.',
        'Enable two-factor authentication (2FA) alongside strong passwords for critical accounts.',
        'Regenerate passwords periodically, especially after a known data breach involving a service you use.',
        'Avoid patterns or substitutions (e.g., "P@ssw0rd") that are easily defeated by modern cracking tools.',
        'When sharing temporary credentials, use a secure channel and change the password after first use.',
        'Check the entropy meter--if it shows fewer than 60 bits, increase length or enable more character sets.'
      ]
    }
  },
  relatedTools: ['qr-code-generator', 'binary-text-converter', 'meta-tag-generator', 'case-converter'],
  seo: {
    metaTitle: 'Password Generator - Create Strong Secure Passwords | Wiki | UnTrackt',
    metaDescription: 'Generate cryptographically secure passwords with customizable length, character sets, and real-time entropy analysis. Fully client-side--no data leaves your browser.',
    keywords: ['password generator', 'secure password', 'random password', 'strong password', 'entropy', 'Web Crypto API', 'brute force', 'password strength', 'online password tool']
  }
};
