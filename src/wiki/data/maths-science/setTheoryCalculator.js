export default {
  id: 'set-theory-calculator',
  title: 'Set Theory Calculator',
  description: 'Perform set operations — union, intersection, difference, symmetric difference, subsets, and Venn diagrams.',
  content: {
    whatIs: {
      heading: 'What is the Set Theory Calculator?',
      body: 'The Set Theory Calculator performs operations on sets of elements. Enter two or more sets and compute union (A ∪ B), intersection (A ∩ B), difference (A - B), symmetric difference (A △ B), check subset relationships, compute power sets, and visualize with Venn diagrams.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Set operations are fundamental in discrete mathematics, database theory, and logic. This tool computes results instantly, generates Venn diagrams for visual understanding, and handles the edge cases that students often miss.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter elements for Set A (comma-separated).',
        'Enter elements for Set B (and optionally Set C).',
        'Select an operation: union, intersection, difference, etc.',
        'View the result set.',
        'See the Venn diagram visualization.',
        'Check subset and superset relationships.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Union, intersection, and difference.',
        'Symmetric difference.',
        'Subset and superset checking.',
        'Power set generation.',
        'Cartesian product.',
        'Venn diagram visualization.',
        'Set cardinality display.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Discrete mathematics coursework.',
        'Database query logic (SQL JOINs conceptualized as set operations).',
        'Probability problems involving event sets.',
        'Logic and proof verification.',
        'Data analysis — finding common or unique elements between data sets.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Union', description: 'A = {1,2,3}, B = {2,3,4} → A ∪ B = {1,2,3,4}.' },
        { title: 'Intersection', description: 'A = {1,2,3}, B = {2,3,4} → A ∩ B = {2,3}.' },
        { title: 'Difference', description: 'A = {1,2,3}, B = {2,3,4} → A - B = {1}.' },
        { title: 'Symmetric Difference', description: 'A △ B = {1,4} — elements in exactly one of the sets.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Set', definition: 'An unordered collection of distinct elements.' },
        { term: 'Union (∪)', definition: 'The set of elements that are in A or B (or both).' },
        { term: 'Intersection (∩)', definition: 'The set of elements that are in both A and B.' },
        { term: 'Difference (A - B)', definition: 'The set of elements in A that are not in B.' },
        { term: 'Subset', definition: 'A ⊆ B means every element of A is also in B.' },
        { term: 'Power Set', definition: 'The set of all subsets of a set. A set with n elements has 2^n subsets.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can sets contain non-numeric elements?', answer: 'Yes. Enter strings or any elements — the tool treats them as set members.' },
        { question: 'What is the symmetric difference?', answer: 'Elements that are in one set or the other but not both. Equivalent to (A - B) ∪ (B - A).' },
        { question: 'How large can sets be?', answer: 'The tool handles sets with hundreds of elements for operations. Power set size grows exponentially (2^n).' },
        { question: 'Can I use more than two sets?', answer: 'Yes. Operations can be chained across three or more sets.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use Venn diagrams to visualize operations before computing.',
        'Remember: sets have no duplicate elements.',
        'Check De Morgan\'s laws: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ.',
        'Use subset checking to verify containment relationships.',
        'Be careful with empty sets — they are subsets of every set.',
        'Verify results by checking cardinality: |A ∪ B| = |A| + |B| - |A ∩ B|.'
      ]
    }
  },
  relatedTools: ['probability-calculator', 'binary-boolean-logic-calculator', 'matrix-calculator', 'number-theory-calculator'],
  seo: {
    metaTitle: 'Set Theory Calculator — Union, Intersection & Venn Diagrams | UnTrackt Wiki',
    metaDescription: 'Perform set operations: union, intersection, difference, symmetric difference. Visualize with Venn diagrams and check subset relationships.',
    keywords: ['set theory', 'set operations', 'union intersection', 'Venn diagram', 'set calculator', 'discrete mathematics']
  }
};
