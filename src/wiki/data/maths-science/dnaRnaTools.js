export default {
  id: 'dna-rna-tools',
  title: 'DNA & RNA Tools',
  description: 'Transcribe DNA to RNA, translate to amino acids, find complementary strands, and analyze nucleic acid sequences.',
  content: {
    whatIs: {
      heading: 'What are the DNA & RNA Tools?',
      body: 'The DNA & RNA Tools provide utilities for working with nucleic acid sequences. Find the complementary DNA strand, transcribe DNA to mRNA, translate mRNA codons to amino acid sequences using the genetic code, and analyze sequence properties like GC content, length, and molecular weight.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Manually transcribing and translating nucleic acid sequences is tedious and error-prone. This tool handles the conversions instantly, applies the codon table accurately, and provides sequence analysis — essential for biology coursework and basic bioinformatics.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a DNA sequence (5\' to 3\').',
        'Select an operation: complement, transcribe, translate, or analyze.',
        'View the complementary strand, mRNA, or amino acid sequence.',
        'For translation, see the codon-by-codon breakdown.',
        'View sequence statistics (length, GC content, molecular weight).',
        'Copy the result sequence.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Complementary DNA strand generation.',
        'DNA → mRNA transcription.',
        'mRNA → amino acid translation.',
        'Codon table reference.',
        'GC content calculation.',
        'Sequence length and molecular weight.',
        'Start and stop codon identification.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Biology and biochemistry homework.',
        'Translating gene sequences to protein.',
        'Analyzing DNA sequences for GC content.',
        'Understanding the central dogma (DNA → RNA → protein).',
        'Bioinformatics coursework.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Complement', description: 'DNA: 5\'-ATCG-3\' → Complement: 3\'-TAGC-5\'.' },
        { title: 'Transcription', description: 'DNA template: 3\'-TACG-5\' → mRNA: 5\'-AUGC-3\'.' },
        { title: 'Translation', description: 'mRNA: AUG-GCU-UAA → Met-Ala-Stop (2 amino acids).' },
        { title: 'GC Content', description: 'ATCGGCTA → 4 G/C out of 8 = 50% GC content.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'DNA', definition: 'Deoxyribonucleic acid — double-stranded nucleic acid containing genetic information (bases: A, T, C, G).' },
        { term: 'RNA', definition: 'Ribonucleic acid — single-stranded nucleic acid (bases: A, U, C, G). Uracil replaces thymine.' },
        { term: 'Codon', definition: 'A three-nucleotide sequence in mRNA that codes for a specific amino acid.' },
        { term: 'Transcription', definition: 'The process of creating mRNA from a DNA template.' },
        { term: 'Translation', definition: 'The process of creating a protein (amino acid chain) from mRNA codons.' },
        { term: 'GC Content', definition: 'The percentage of guanine and cytosine bases in a sequence — relates to melting temperature and stability.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between template and coding strands?', answer: 'The template strand is read by RNA polymerase (3\' to 5\'). The coding strand has the same sequence as mRNA (except T instead of U).' },
        { question: 'What does AUG code for?', answer: 'AUG codes for methionine (Met) and is also the start codon that initiates translation.' },
        { question: 'What are stop codons?', answer: 'UAA, UAG, and UGA — they signal the end of translation. No amino acid is added.' },
        { question: 'Why does GC content matter?', answer: 'Higher GC content means more hydrogen bonds (G-C has 3 vs A-T\'s 2), resulting in higher melting temperature and stability.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always specify strand direction (5\' → 3\' or 3\' → 5\') when working with sequences.',
        'Remember base pairing: DNA: A-T, C-G. RNA: A-U, C-G.',
        'Translation reads mRNA in triplets (codons) starting from the start codon (AUG).',
        'The reading frame matters — shifting by one base changes all downstream codons.',
        'Use the codon table to verify amino acid assignments.',
        'GC content above 50% suggests higher thermal stability.'
      ]
    }
  },
  relatedTools: ['genetics-calculator', 'microscopy-calculator', 'statistics-calculator', 'probability-calculator'],
  seo: {
    metaTitle: 'DNA & RNA Tools — Transcription, Translation & Sequence Analysis | UnTrackt Wiki',
    metaDescription: 'Transcribe DNA to RNA, translate codons to amino acids, find complementary strands, and analyze GC content and sequence properties.',
    keywords: ['DNA RNA tools', 'transcription translation', 'codon table', 'complementary strand', 'GC content', 'nucleic acid analysis']
  }
};
