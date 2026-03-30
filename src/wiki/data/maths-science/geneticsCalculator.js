export default {
  id: 'genetics-calculator',
  title: 'Genetics Calculator',
  description: 'Create Punnett squares, calculate genotype and phenotype ratios, and analyze inheritance patterns.',
  content: {
    whatIs: {
      heading: 'What is the Genetics Calculator?',
      body: 'The Genetics Calculator creates Punnett squares for monohybrid and dihybrid crosses, calculates genotype and phenotype ratios, and models inheritance patterns including dominant/recessive, codominance, incomplete dominance, and sex-linked traits. Enter parental genotypes and see all possible offspring outcomes.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Genetics problems, especially dihybrid and multi-trait crosses, produce many offspring combinations. This tool generates accurate Punnett squares, computes ratios, and handles inheritance patterns correctly — saving time and eliminating counting errors.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select cross type (monohybrid or dihybrid).',
        'Enter parent 1 and parent 2 genotypes.',
        'Select the inheritance pattern.',
        'View the Punnett square with all offspring genotypes.',
        'See genotype and phenotype ratios.',
        'Explore probability of specific outcomes.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Monohybrid Punnett squares.',
        'Dihybrid (two-trait) Punnett squares.',
        'Genotype and phenotype ratios.',
        'Dominant/recessive, codominance, and incomplete dominance.',
        'Sex-linked inheritance.',
        'Probability calculations for specific offspring.',
        'Visual Punnett square display.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Biology genetics homework and lab work.',
        'AP Biology and IB Biology exam preparation.',
        'Understanding inheritance patterns in organisms.',
        'Predicting probabilities of traits in offspring.',
        'Teaching Mendelian genetics concepts.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Monohybrid', description: 'Aa × Aa → 1 AA : 2 Aa : 1 aa (genotype), 3 dominant : 1 recessive (phenotype).' },
        { title: 'Dihybrid', description: 'AaBb × AaBb → 9:3:3:1 phenotype ratio.' },
        { title: 'Test Cross', description: 'Aa × aa → 1 Aa : 1 aa (50% dominant, 50% recessive).' },
        { title: 'Incomplete Dominance', description: 'RR (red) × WW (white) → RW (pink).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Genotype', definition: 'The genetic makeup of an organism (e.g., Aa, BB, Tt).' },
        { term: 'Phenotype', definition: 'The observable trait expressed by the genotype.' },
        { term: 'Heterozygous', definition: 'Having two different alleles for a trait (e.g., Aa).' },
        { term: 'Homozygous', definition: 'Having two identical alleles (e.g., AA or aa).' },
        { term: 'Punnett Square', definition: 'A grid used to predict genotype and phenotype ratios from a genetic cross.' },
        { term: 'Allele', definition: 'A version of a gene. Different alleles can produce different traits.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a test cross?', answer: 'Crossing an organism with an unknown genotype with a homozygous recessive (aa) to determine its genotype from offspring ratios.' },
        { question: 'Can I do crosses with more than two traits?', answer: 'The tool supports monohybrid and dihybrid crosses. For 3+ traits, apply the product rule to individual trait probabilities.' },
        { question: 'What about sex-linked traits?', answer: 'Enter X-linked genotypes (e.g., X^A X^a, X^A Y) and the tool handles the cross correctly.' },
        { question: 'How accurate are the predictions?', answer: 'Punnett squares give probabilities, not guarantees. With large sample sizes, observed ratios approach predicted ratios.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use uppercase for dominant alleles and lowercase for recessive.',
        'Write the dominant allele first in heterozygous genotypes (Aa, not aA).',
        'For dihybrid crosses, first determine gametes using FOIL method.',
        'Use the product rule for multi-trait probability: P(trait1 AND trait2) = P(trait1) × P(trait2).',
        'Test crosses reveal whether a dominant phenotype is homozygous or heterozygous.',
        'Check ratios: monohybrid = 3:1, dihybrid = 9:3:3:1 for typical dominant/recessive with heterozygous parents.'
      ]
    }
  },
  relatedTools: ['dna-rna-tools', 'probability-calculator', 'statistics-calculator', 'microscopy-calculator'],
  seo: {
    metaTitle: 'Genetics Calculator — Punnett Squares & Inheritance | UnTrackt Wiki',
    metaDescription: 'Create Punnett squares, calculate genotype and phenotype ratios, and analyze dominant/recessive, codominance, and sex-linked inheritance.',
    keywords: ['genetics calculator', 'Punnett square', 'genotype phenotype', 'inheritance patterns', 'dihybrid cross', 'genetics tool']
  }
};
