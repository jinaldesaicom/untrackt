export default {
  id: 'ph-calculator',
  title: 'pH Calculator',
  description: 'Calculate pH, pOH, hydrogen ion concentration, and hydroxide ion concentration for acids and bases.',
  content: {
    whatIs: {
      heading: 'What is the pH Calculator?',
      body: 'The pH Calculator computes pH, pOH, [H⁺], and [OH⁻] from any one known value. Enter pH and get pOH and ion concentrations, or enter [H⁺] to get pH (and vice versa). It also identifies whether a solution is acidic, basic, or neutral and handles strong and weak acid/base calculations.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'pH calculations involve logarithms and the relationship between multiple quantities. This tool instantly converts between all four related values (pH, pOH, [H⁺], [OH⁻]) and identifies the solution type, saving time and reducing errors in chemistry coursework and lab work.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter any one value: pH, pOH, [H⁺], or [OH⁻].',
        'View all four computed values.',
        'See whether the solution is acidic, neutral, or basic.',
        'For weak acids/bases, enter Ka or Kb and concentration.',
        'View the pH scale visualization.',
        'Copy results or try a different input.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'pH ↔ pOH conversion (pH + pOH = 14).',
        'pH ↔ [H⁺] conversion (pH = -log[H⁺]).',
        '[H⁺] × [OH⁻] = Kw = 10⁻¹⁴.',
        'Weak acid/base equilibrium (Ka, Kb).',
        'Buffer solution pH (Henderson-Hasselbalch).',
        'Acid/base identification.',
        'pH scale visualization.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Chemistry acid-base homework.',
        'Lab calculations for solution preparation.',
        'Environmental science water quality analysis.',
        'Biology enzyme activity pH studies.',
        'Pool and aquarium water chemistry.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Strong Acid', description: '0.01 M HCl → [H⁺] = 0.01 → pH = -log(0.01) = 2.' },
        { title: 'pOH to pH', description: 'pOH = 3 → pH = 14 - 3 = 11 (basic solution).' },
        { title: 'Weak Acid', description: '0.1 M acetic acid (Ka = 1.8 × 10⁻⁵) → pH ≈ 2.87.' },
        { title: 'Buffer', description: '0.1 M acetic acid + 0.1 M sodium acetate → pH = pKa + log([A⁻]/[HA]) = 4.74.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'pH', definition: 'A measure of acidity: pH = -log₁₀[H⁺]. Range 0-14; 7 is neutral, < 7 is acidic, > 7 is basic.' },
        { term: 'pOH', definition: 'A measure of basicity: pOH = -log₁₀[OH⁻]. pH + pOH = 14.' },
        { term: 'Ka', definition: 'Acid dissociation constant — a measure of acid strength. Larger Ka = stronger acid.' },
        { term: 'Buffer', definition: 'A solution that resists pH changes when small amounts of acid or base are added.' },
        { term: 'Henderson-Hasselbalch', definition: 'pH = pKa + log([A⁻]/[HA]) — equation for buffer pH calculations.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can pH be negative or above 14?', answer: 'Yes, for very concentrated strong acids (pH < 0) or bases (pH > 14), though this is uncommon.' },
        { question: 'What is the pH of pure water?', answer: '7.0 at 25°C, where [H⁺] = [OH⁻] = 10⁻⁷ M.' },
        { question: 'Strong vs weak acid?', answer: 'Strong acids fully dissociate (pH = -log[acid]). Weak acids partially dissociate (requires Ka calculation).' },
        { question: 'What is Kw?', answer: 'The water autoionization constant: Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'For strong acids/bases, pH is directly from the concentration (no Ka/Kb needed).',
        'For weak acids, use the ICE table method or the Ka approximation.',
        'Use Henderson-Hasselbalch for buffer problems — it is simpler than ICE tables.',
        'Remember: pH + pOH = 14 at 25°C.',
        'Lower pH = more acidic, higher pH = more basic.',
        'Check reasonableness: acids should have pH < 7, bases > 7.'
      ]
    }
  },
  relatedTools: ['solution-concentration-calculator', 'mole-calculator', 'logarithm-calculator', 'periodic-table-reference'],
  seo: {
    metaTitle: 'pH Calculator — pH, pOH & Ion Concentration | UnTrackt Wiki',
    metaDescription: 'Calculate pH, pOH, hydrogen and hydroxide ion concentration. Handle strong/weak acids, bases, and buffer solutions.',
    keywords: ['pH calculator', 'pOH calculator', 'acid base', 'hydrogen ion concentration', 'Henderson-Hasselbalch', 'chemistry pH']
  }
};
