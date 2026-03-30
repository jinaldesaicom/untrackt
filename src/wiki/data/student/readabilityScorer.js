export default {
  id: 'readability-scorer',
  title: 'Readability Scorer',
  description: 'Analyze your writing\'s readability with Flesch-Kincaid, Gunning Fog, and other industry-standard scoring algorithms.',
  content: {
    whatIs: {
      heading: 'What is the Readability Scorer?',
      body: 'The Readability Scorer analyzes your text using established readability formulas--including Flesch-Kincaid Grade Level, Flesch Reading Ease, Gunning Fog Index, Coleman-Liau Index, and SMOG Index--to determine how easy or difficult your writing is to understand. It assigns a grade level indicating the education needed to comprehend the text, helping you tailor your writing to your intended audience. Whether you\'re writing a children\'s book, an academic paper, or web content, this tool quantifies readability so you can adjust your style accordingly.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Even skilled writers can unintentionally produce text that\'s too complex or too simple for their audience. Readability scores provide objective, data-driven feedback on sentence length, word complexity, and overall accessibility. Students can ensure their essays match the expected academic level, content creators can optimize for wider audiences, and technical writers can verify documentation is clear. The tool turns subjective "Does this read well?" into measurable, actionable metrics.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your text into the input area or type directly.',
        'View the readability scores calculated automatically across multiple formulas.',
        'Check the Flesch-Kincaid Grade Level to see the U.S. school grade needed to understand the text.',
        'Review the Flesch Reading Ease score--higher scores mean easier reading (aim for 60-70 for general audiences).',
        'Examine highlighted complex sentences and difficult words to identify areas for simplification.',
        'Revise your text and re-score to track improvement.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Multiple readability formulas: Flesch-Kincaid, Flesch Reading Ease, Gunning Fog, Coleman-Liau, SMOG, and ARI.',
        'Grade level assessment showing the U.S. education level required to understand the text.',
        'Average sentence length and syllable count analysis.',
        'Identification of complex words (three or more syllables) and their frequency.',
        'Side-by-side comparison when you edit and rescore your text.',
        'Text statistics including total words, sentences, paragraphs, and average words per sentence.',
        'Entirely browser-based--your writing is never uploaded or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students checking that academic essays match the expected complexity level for their course.',
        'Content writers ensuring blog posts are accessible to a general audience (grades 7-9).',
        'Technical writers verifying documentation readability for non-expert users.',
        'ESL/EFL teachers selecting or creating texts appropriate for learners\' proficiency levels.',
        'Marketing teams optimizing copy for maximum clarity and engagement.',
        'Authors adjusting prose complexity to match their target demographic.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Academic Paper Analysis',
          description: 'A research paper introduction scores Flesch-Kincaid Grade 14.2 and Flesch Reading Ease 28--appropriate for graduate-level academic writing.'
        },
        {
          title: 'Blog Post Optimization',
          description: 'A lifestyle blog post scores Flesch Reading Ease 72 and Grade Level 6.8--ideal for general web audiences who prefer easy, skimmable content.'
        },
        {
          title: 'Children\'s Story Check',
          description: 'A story intended for 8-year-olds scores Grade Level 3.1--correctly matching the target reading level of third graders.'
        },
        {
          title: 'Technical Documentation',
          description: 'An API guide scores Gunning Fog 16.5, suggesting it\'s too complex. After simplifying jargon and shortening sentences, it drops to 11.2.'
        },
        {
          title: 'College Application Essay',
          description: 'A personal statement scores Grade Level 10.5 and Reading Ease 55--demonstrating strong vocabulary without being impenetrable.'
        },
        {
          title: 'Before and After Revision',
          description: 'Original text: Grade 16, Reading Ease 22. After breaking long sentences and replacing jargon: Grade 11, Reading Ease 48--significantly more accessible.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Flesch Reading Ease', definition: 'A score from 0-100 where higher values indicate easier text. 60-70 is considered ideal for general audiences. Above 80 is very easy; below 30 is very difficult.' },
        { term: 'Flesch-Kincaid Grade Level', definition: 'A formula that converts readability into a U.S. school grade level. A score of 8.0 means an eighth grader can understand the text.' },
        { term: 'Gunning Fog Index', definition: 'A readability index that estimates the years of formal education needed to understand text on first reading. It emphasizes complex (polysyllabic) words.' },
        { term: 'Coleman-Liau Index', definition: 'A readability formula based on characters per word and sentences per 100 words, rather than syllable counting.' },
        { term: 'SMOG Index', definition: 'Simple Measure of Gobbledygook--estimates the years of education needed to understand a piece of writing, based on polysyllabic word counts.' },
        { term: 'Polysyllabic Word', definition: 'A word with three or more syllables. High frequency of polysyllabic words generally increases text difficulty.' },
        { term: 'Automated Readability Index (ARI)', definition: 'A formula using character count and word count to approximate the grade level needed to comprehend the text.' },
        { term: 'Sentence Complexity', definition: 'A measure of how long and structurally complicated sentences are. Longer sentences with multiple clauses are harder to read.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What\'s a good Flesch Reading Ease score?', answer: 'It depends on your audience. 60-70 is ideal for general public content. Academic papers typically score 30-50. Legal or scientific texts may score below 30. Children\'s content should score above 80.' },
        { question: 'Why do different formulas give different scores?', answer: 'Each formula weighs different factors. Flesch-Kincaid emphasizes syllables and sentence length; Gunning Fog focuses on complex words; Coleman-Liau uses character counts. Using multiple formulas gives a more complete picture.' },
        { question: 'Can readability scores be too low (too easy)?', answer: 'For academic writing, yes. If your college essay scores at a 5th-grade level, your vocabulary and sentence structure may be too simplistic for the expected standard.' },
        { question: 'How many words does the tool need for accurate results?', answer: 'Readability formulas are most reliable with at least 100-200 words. Very short text samples can produce misleading scores.' },
        { question: 'Should I aim for the lowest possible grade level?', answer: 'Not necessarily. Match your audience. A medical journal article should be more complex than a patient handout. The goal is appropriate readability, not minimal readability.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use shorter sentences and simpler words to lower your readability score when writing for general audiences.',
        'Don\'t sacrifice accuracy or meaning just to improve a readability score--technical terms are sometimes necessary.',
        'Run readability checks on individual sections rather than your entire document, as complexity often varies between introduction, body, and conclusion.',
        'Aim for an average sentence length of 15-20 words for general readability.',
        'Break up long paragraphs--visual density affects perceived readability even when formula scores are acceptable.',
        'Use readability scores as one input among many. They don\'t capture tone, engagement, logical flow, or factual accuracy.',
        'Compare your scores to benchmark texts in your genre to calibrate expectations.'
      ]
    }
  },
  relatedTools: ['word-counter', 'essay-outline-builder', 'citation-generator', 'flashcard-session'],
  seo: {
    metaTitle: 'Readability Scorer - Flesch-Kincaid & Grade Level Analysis - Wiki | UnTrackt',
    metaDescription: 'Analyze text readability with Flesch-Kincaid, Gunning Fog, SMOG, and more. Get grade level scores, reading ease ratings, and tips to improve your writing clarity.',
    keywords: ['readability scorer', 'Flesch-Kincaid', 'reading ease', 'grade level', 'Gunning Fog', 'readability analysis', 'text complexity', 'writing clarity', 'SMOG index']
  }
};
