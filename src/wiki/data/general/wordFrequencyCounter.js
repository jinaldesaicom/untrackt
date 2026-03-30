export default {
  id: 'word-frequency-counter',
  title: 'Word Frequency Counter',
  description: 'Analyze text to count word frequencies, character counts, and reading time with sortable results and CSV export.',
  content: {
    whatIs: {
      heading: 'What is the Word Frequency Counter?',
      body: 'The Word Frequency Counter analyzes any text input and produces a detailed breakdown of how often each word appears. It displays total words, unique words, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. Results are presented in a sortable table and can be exported as CSV for further analysis in spreadsheets or data tools.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Understanding word frequency is essential for writers optimizing content for SEO, researchers performing text analysis, students checking essay metrics, and editors identifying overused words. This tool provides instant, detailed statistics without needing to install software or write scripts.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste or type your text into the input area.',
        'View the instant statistics panel: total words, unique words, characters, sentences, paragraphs, and reading time.',
        'Scroll down to the frequency table showing each word and its count.',
        'Sort the table by frequency (most to least) or alphabetically.',
        'Optionally filter out common stop words (the, is, and, etc.) to focus on meaningful content.',
        'Export the frequency data as CSV for use in Excel, Google Sheets, or data analysis tools.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time word, character, sentence, and paragraph counting as you type.',
        'Word frequency table sorted by occurrence count or alphabetically.',
        'Stop-word filtering to exclude common English words from the frequency analysis.',
        'Estimated reading time based on an average of 200-250 words per minute.',
        'CSV export of frequency data with word and count columns.',
        'Case-insensitive counting (treats "The" and "the" as the same word).',
        'Top N words filter to highlight the most frequent terms.',
        'Support for large text inputs (articles, essays, entire book chapters).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'SEO content analysis to check keyword density and distribution.',
        'Academic writing to ensure essays meet word count requirements.',
        'Editing to identify overused words or repetitive phrasing.',
        'Linguistic research and text corpus analysis.',
        'Social media post optimization to stay within character limits.',
        'Translation quality checks to compare term frequency between source and target texts.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Blog post keyword density', description: 'Paste a 1,500-word blog post and check that the target keyword appears 15-20 times (1-1.5% density) for SEO purposes.' },
        { title: 'Essay word count verification', description: 'Paste a college essay to confirm it meets the 2,000-word minimum and check the estimated 8-minute reading time.' },
        { title: 'Overused word detection', description: 'Sort by frequency to discover that "very" appears 47 times in a draft--a clear signal to revise word choice.' },
        { title: 'Stop-word filtered analysis', description: 'Filter out stop words to see that "climate", "policy", and "emissions" are the top content words in a research paper.' },
        { title: 'CSV export for data analysis', description: 'Export the frequency table as CSV and import it into a spreadsheet to create a word cloud or bar chart.' },
        { title: 'Character count for tweets', description: 'Paste a draft tweet to verify it is under 280 characters, with exact character count including spaces.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Word frequency', definition: 'The number of times a specific word appears in a text, used to analyze content patterns and keyword density.' },
        { term: 'Stop words', definition: 'Common words (a, the, is, and, etc.) that carry little meaning and are often excluded from frequency analysis.' },
        { term: 'Keyword density', definition: 'The percentage of times a keyword appears relative to the total word count, used in SEO to gauge content relevance.' },
        { term: 'Unique words', definition: 'The count of distinct words in a text, regardless of how many times each appears (also called vocabulary size).' },
        { term: 'Reading time', definition: 'An estimate of how long it takes to read a text, typically calculated at 200-250 words per minute for average adult readers.' },
        { term: 'Tokenization', definition: 'The process of splitting text into individual words (tokens) for analysis, handling punctuation, hyphens, and contractions.' },
        { term: 'N-gram', definition: 'A sequence of N consecutive words. Bigrams (2-grams) and trigrams (3-grams) reveal common phrases in a text.' },
        { term: 'Corpus', definition: 'A large, structured collection of text used for linguistic and statistical analysis.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does the tool count hyphenated words as one or two?', answer: 'Hyphenated compounds like "well-known" are counted as a single word. This matches standard editorial convention.' },
        { question: 'Is the counting case-sensitive?', answer: 'No. "The" and "the" are treated as the same word by default. All words are normalized to lowercase for counting.' },
        { question: 'What counts as a sentence?', answer: 'Sentences are detected by terminal punctuation (. ! ?) followed by a space or end of text. Abbreviations like "Dr." are handled as edge cases.' },
        { question: 'Can I analyze text in languages other than English?', answer: 'The word and character counting works for any language. Stop-word filtering is currently English-only, but you can disable it for other languages.' },
        { question: 'Is there a text length limit?', answer: 'The tool handles texts up to hundreds of thousands of words. Very large inputs (e.g., full novels) may take a moment to process.' },
        { question: 'How is reading time calculated?', answer: 'Reading time is estimated at 238 words per minute, the widely cited average for adult English readers.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use stop-word filtering for content analysis to focus on meaningful keywords.',
        'Aim for 1-2% keyword density in SEO content--higher can appear spammy to search engines.',
        'Check unique-to-total word ratio to gauge vocabulary diversity in your writing.',
        'Export frequency data to a spreadsheet for advanced visualizations like word clouds.',
        'Run the analysis after each draft revision to track how your word choice evolves.',
        'For academic papers, verify word count meets requirements before submission.',
        'Use the reading time estimate to gauge whether an article length matches your audience\'s attention span.',
        'Compare frequency tables of two texts side-by-side to identify thematic differences.'
      ]
    }
  },
  relatedTools: ['typing-speed-test', 'case-converter', 'text-to-slug', 'json-to-csv-converter'],
  seo: {
    metaTitle: 'Word Frequency Counter - Analyze Text & Count Words | Wiki | UnTrackt',
    metaDescription: 'Count word frequencies, characters, sentences, and reading time in any text. Filter stop words, sort results, and export as CSV for SEO and content analysis.',
    keywords: ['word frequency counter', 'word count', 'text analysis', 'keyword density', 'character count', 'reading time', 'SEO tool', 'CSV export', 'content analysis']
  }
};
