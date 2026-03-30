export default {
  id: 'contract-analyzer',
  title: 'Contract Analyzer',
  description:
    'Analyze freelance contracts for readability, passive voice, legal jargon complexity, and potential red flags to negotiate with confidence.',
  content: {
    whatIs: {
      heading: 'What is the Contract Analyzer?',
      body: 'The Contract Analyzer is a text analysis tool designed to help freelancers evaluate contracts before signing. It scores readability, flags excessive passive voice, identifies complex legal terminology, highlights potentially unfavorable clauses, and provides a plain-language summary of key terms. Rather than replacing legal counsel, it arms you with the knowledge to ask better questions and negotiate from a position of understanding.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Freelancers often receive contracts drafted by client legal teams stacked with dense legalese and one-sided terms. Signing without understanding can expose you to unlimited liability, IP assignment traps, non-compete restrictions, and punitive termination clauses. This tool surfaces those risks in seconds, helping you spot the clauses that matter most before you spend money on a lawyer. It is not a substitute for legal advice, but it is a powerful first pass that saves time and protects your interests.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste the full contract text or upload a plain-text document into the analyzer.',
        'Click "Analyze" to run readability, structure, and clause detection scans.',
        'Review the readability score and grade level--lower is clearer.',
        'Check the highlighted passive-voice sentences and complex jargon flags.',
        'Read the flagged clauses section for potentially unfavorable terms.',
        'Use the findings to prepare questions or redline requests for negotiation.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Readability scoring using Flesch-Kincaid and Gunning Fog indexes.',
        'Passive voice detection with percentage breakdown and line-by-line highlights.',
        'Legal jargon identification with plain-language definitions.',
        'Clause risk flagging for indemnification, IP assignment, non-compete, and termination terms.',
        'Word count, sentence length, and structural statistics.',
        'Summary panel with key dates, parties, payment terms, and obligations.',
        'Side-by-side comparison mode for before-and-after contract revisions.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Reviewing a new client contract before signing to identify unfavorable terms.',
        'Comparing two versions of a contract to see what changed in a revision.',
        'Simplifying complex legal language to communicate terms to a business partner.',
        'Preparing a redline negotiation by targeting the most problematic clauses.',
        'Auditing your own contract templates for readability and professionalism.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Readability Red Flag',
          description:
            'A 10-page contract scores a Flesch-Kincaid grade level of 18.3--university-postgraduate reading level. The analyzer highlights 42 passive-voice sentences and suggests specific rewrites.',
        },
        {
          title: 'IP Assignment Clause',
          description:
            'The analyzer flags: "All work product, including preliminary drafts, shall become the sole property of the Client upon creation." It explains that "upon creation" means you lose ownership before payment.',
        },
        {
          title: 'Non-Compete Discovery',
          description:
            'A buried clause states "Contractor shall not provide similar services to competitors for 24 months." The tool highlights this as a high-risk restriction and recommends narrowing the scope.',
        },
        {
          title: 'Payment Terms Hidden in Legalese',
          description:
            'Net 90 payment terms are embedded inside a dense paragraph. The summary panel extracts: "Payment: Net 90 days from invoice acceptance," making it immediately visible.',
        },
        {
          title: 'Indemnification Overreach',
          description:
            'The contract requires the freelancer to indemnify the client against "any and all claims." The analyzer flags unlimited indemnification as high-risk and suggests capping liability.',
        },
        {
          title: 'Termination Without Cause',
          description:
            'A clause allows the client to terminate "at any time without cause and without compensation for work in progress." The tool flags this and recommends adding a kill fee provision.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Flesch-Kincaid Score',
          definition:
            'A readability metric that estimates the US school grade level needed to understand the text. Lower scores mean easier reading.',
        },
        {
          term: 'Passive Voice',
          definition:
            'A sentence structure where the subject receives the action rather than performing it (e.g., "Payment will be made" vs. "Client will pay"). Overuse obscures responsibility.',
        },
        {
          term: 'Indemnification',
          definition:
            'A clause requiring one party to compensate the other for losses, damages, or legal costs arising from the contract.',
        },
        {
          term: 'IP Assignment',
          definition:
            'A provision transferring intellectual property ownership from the creator to the client, specifying when and under what conditions.',
        },
        {
          term: 'Non-Compete Clause',
          definition:
            'A restriction preventing the contractor from working with competing businesses for a specified period and geographic scope.',
        },
        {
          term: 'Kill Fee',
          definition:
            'A payment owed to the freelancer if the client cancels the project before completion, typically a percentage of the total contract value.',
        },
        {
          term: 'Scope of Work (SOW)',
          definition:
            'A section defining the specific deliverables, timelines, and responsibilities agreed upon in the contract.',
        },
        {
          term: 'Redline',
          definition:
            'A marked-up version of a contract showing proposed changes, deletions, and additions during negotiation.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'Does this tool provide legal advice?',
          answer:
            'No. It provides text analysis and pattern-based flagging. For legally binding decisions, always consult a qualified attorney.',
        },
        {
          question: 'What contract formats are supported?',
          answer:
            'Paste plain text directly or upload .txt files. PDF and Word document support depends on your ability to copy-paste the text content.',
        },
        {
          question: 'Can it analyze contracts in languages other than English?',
          answer:
            'Currently the readability metrics and clause detection are optimized for English-language contracts.',
        },
        {
          question: 'How reliable is the clause detection?',
          answer:
            'The tool uses keyword and pattern matching to flag common clause types. It may miss unusually worded provisions or flag benign clauses. Treat it as a starting point.',
        },
        {
          question: 'Is my contract data stored or shared?',
          answer:
            'No. All analysis happens in your browser. The contract text is never sent to a server.',
        },
        {
          question: 'Can I use this for employment contracts too?',
          answer:
            'Yes. While it is optimized for freelance service agreements, the readability and clause analysis works on any English-language contract.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Run every contract through the analyzer before signing, even from trusted clients.',
        'Pay special attention to IP ownership, payment terms, termination, and liability clauses.',
        'Negotiate non-competes down to a reasonable scope, duration, and geography.',
        'Insist on a kill fee clause to protect against mid-project cancellations.',
        'If readability scores are extremely high, ask the client for a plain-language summary.',
        'Keep a personal clause library of fair alternatives to propose during negotiation.',
        'Always clarify whether IP transfers upon payment or upon creation--the difference matters enormously.',
        'Compare contract versions side by side when the client sends a revised draft.',
      ],
    },
  },
  relatedTools: [
    'proposal-builder',
    'invoice-generator',
    'hourly-rate-calculator',
    'client-profitability-estimator',
    'late-payment-fee-calculator',
  ],
  seo: {
    metaTitle: 'Contract Analyzer for Freelancers - Wiki | UnTrackt',
    metaDescription:
      'Analyze freelance contracts for readability, passive voice, legal jargon, and risky clauses. Negotiate better terms with data-driven insights.',
    keywords: [
      'contract analyzer',
      'freelance contract review',
      'readability score',
      'contract red flags',
      'IP assignment clause',
      'non-compete analysis',
      'legal jargon checker',
      'contract negotiation',
    ],
  },
};
