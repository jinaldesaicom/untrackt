export default {
  id: 'word-counter',
  title: 'Word Counter',
  description: 'Count words, characters, sentences, and paragraphs in your text with estimated reading and speaking times.',
  content: {
    whatIs: {
      heading: 'What is the Word Counter?',
      body: 'The Word Counter is a real-time text analysis tool that instantly counts words, characters (with and without spaces), sentences, and paragraphs as you type or paste text. Beyond basic counting, it estimates reading time and speaking time, making it an essential utility for students writing essays, journalists meeting word limits, bloggers optimizing content length, and anyone who needs precise text metrics without installing software.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Many assignments, applications, and publications have strict word or character limits. Manually counting is impractical for anything beyond a few sentences. This tool provides instant, accurate counts and additional insights like reading time and keyword density--helping you stay within limits, gauge content length for presentations, and improve your writing efficiency.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Type directly into the text area or paste your content from any source.',
        'View the live word, character, sentence, and paragraph counts displayed above the text area.',
        'Check the estimated reading time (based on 238 words per minute) and speaking time (based on 150 words per minute).',
        'Use the character count toggle to switch between counting with or without spaces.',
        'Copy the statistics summary to your clipboard if needed for reference.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time word, character, sentence, and paragraph counting as you type.',
        'Character count with and without spaces for platforms with character limits.',
        'Estimated reading time based on average adult reading speed.',
        'Estimated speaking time for presentations and speeches.',
        'Top keyword frequency analysis to identify overused words.',
        'Clean, distraction-free writing interface.',
        'Works offline--no internet connection required after loading.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students ensuring essays meet minimum or maximum word count requirements.',
        'Writers crafting social media posts within character limits (Twitter/X, Instagram bios).',
        'Bloggers and content creators optimizing article length for SEO.',
        'Public speakers estimating how long their speech will take to deliver.',
        'Job applicants staying within word limits on application essays.',
        'Translators comparing source and target text lengths.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'College Essay Word Limit',
          description: 'A 650-word Common App essay shows exactly 650 words, 3,412 characters, approximately 2.7 minutes reading time, and 4.3 minutes speaking time.'
        },
        {
          title: 'Tweet Character Check',
          description: 'Paste a draft tweet to verify it\'s under 280 characters. The tool shows both character-with-spaces and character-without-spaces counts.'
        },
        {
          title: 'Research Paper Section',
          description: 'A methods section shows 1,200 words across 8 paragraphs and 47 sentences, with an average of 25.5 words per sentence.'
        },
        {
          title: 'Presentation Script Timing',
          description: 'A 2,250-word script shows an estimated speaking time of 15 minutes, helping plan for a 20-minute presentation slot.'
        },
        {
          title: 'Blog Post SEO Length',
          description: 'A 1,800-word blog post falls within the recommended 1,500-2,500 word range for in-depth SEO content.'
        },
        {
          title: 'Abstract Word Limit',
          description: 'A research abstract needs to be under 250 words. The counter shows 243 words, confirming it meets the journal\'s requirement.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Word Count', definition: 'The total number of words in a text, where a word is defined as a sequence of characters separated by spaces or punctuation.' },
        { term: 'Character Count', definition: 'The total number of individual characters in the text, optionally including or excluding spaces.' },
        { term: 'Reading Time', definition: 'An estimate of how long it takes to read the text, typically calculated at 238 words per minute for average adult readers.' },
        { term: 'Speaking Time', definition: 'An estimate of how long it takes to speak the text aloud, typically calculated at 130-150 words per minute for natural speech.' },
        { term: 'Sentence Count', definition: 'The number of sentences in the text, determined by terminal punctuation marks (periods, question marks, exclamation points).' },
        { term: 'Keyword Density', definition: 'The frequency with which a specific word or phrase appears relative to the total word count, often expressed as a percentage.' },
        { term: 'Paragraph Count', definition: 'The number of distinct paragraphs, typically separated by line breaks or blank lines.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How does the tool count words?', answer: 'Words are counted by splitting text on whitespace boundaries. Hyphenated words like "well-known" count as one word, consistent with most style guides.' },
        { question: 'Are the reading and speaking time estimates accurate?', answer: 'They\'re based on widely accepted averages (238 wpm for reading, 150 wpm for speaking). Actual times vary by individual, text complexity, and delivery style.' },
        { question: 'Does the character count include spaces?', answer: 'Both counts are displayed: characters with spaces and characters without spaces. Toggle between them depending on your platform\'s requirements.' },
        { question: 'Can I count words in a specific section of my text?', answer: 'Yes--simply select and paste only the section you want to analyze. The counter works on whatever text is in the input area.' },
        { question: 'Is my text stored or transmitted anywhere?', answer: 'No. All counting happens locally in your browser. Your text is never sent to any server or stored anywhere.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Paste your final draft to get an accurate count--editing after counting can change word and character totals.',
        'For social media platforms, use the character-without-spaces count if the platform doesn\'t count spaces (most do count spaces, though).',
        'When preparing a speech, aim for about 150 words per minute of allotted time to maintain a natural pace.',
        'Check sentence count relative to word count to gauge your average sentence length--aim for 15-20 words per sentence for readability.',
        'Use keyword frequency data to identify words you may be overusing and find synonyms for variety.',
        'Remember that word count tools may count differently from your professor\'s or publisher\'s tool--always verify with the official count if stakes are high.'
      ]
    }
  },
  relatedTools: ['readability-scorer', 'essay-outline-builder', 'citation-generator', 'pomodoro-timer'],
  seo: {
    metaTitle: 'Word Counter - Count Words, Characters & Reading Time - Wiki | UnTrackt',
    metaDescription: 'Count words, characters, sentences, and paragraphs instantly. Get estimated reading and speaking times for essays, blog posts, speeches, and social media content.',
    keywords: ['word counter', 'character counter', 'word count tool', 'reading time calculator', 'speaking time', 'essay word count', 'character limit', 'text analysis']
  }
};
