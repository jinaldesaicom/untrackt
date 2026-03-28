export default {
  id: 'lorem-ipsum-generator',
  title: 'Lorem Ipsum Generator',
  description: 'Generate placeholder text in paragraphs, sentences, or words for wireframes, mockups, and layout testing.',
  content: {
    whatIs: {
      heading: 'What is the Lorem Ipsum Generator?',
      body: 'The Lorem Ipsum Generator produces dummy placeholder text based on the classic "Lorem Ipsum" passage, which has been used by typesetters and designers since the 1500s. The text is derived from sections 1.10.32 and 1.10.33 of Cicero\'s "De Finibus Bonorum et Malorum" (45 BC), scrambled to be meaningless in any language. This tool lets you generate precise amounts of placeholder content -- by paragraphs, sentences, words, or characters -- for use in wireframes, mockups, font previews, and layout testing.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'During design and development, you often need realistic-looking text to fill layouts before actual content is available. Using real content creates distracting focus on the words rather than the design. Lorem Ipsum provides a natural distribution of letters and word lengths that mimics real text, letting designers and stakeholders evaluate layouts, typography, and spacing without being influenced by the meaning of the words.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the output unit: paragraphs, sentences, words, or characters.',
        'Enter the desired quantity (e.g., 5 paragraphs, 100 words).',
        'Choose whether the text should start with the classic "Lorem ipsum dolor sit amet..."',
        'Toggle options for HTML paragraph tags or plain text output.',
        'Click "Generate" to produce the placeholder text.',
        'Copy the generated text to your clipboard or download as a text file.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Generate by paragraphs, sentences, words, or exact character count.',
        'Option to start with the classic "Lorem ipsum dolor sit amet" opening.',
        'Plain text or HTML-wrapped output with <p> tags.',
        'Randomized text that maintains natural Latin word patterns.',
        'Adjustable paragraph length (short, medium, long).',
        'One-click copy to clipboard.',
        'Preview the text in different font sizes and families.',
        'Character and word count display for the generated output.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Filling wireframes and mockups with realistic-looking text during the design phase.',
        'Testing typography, font sizes, and line-height settings with varied text.',
        'Populating CMS templates and themes to preview layout before content is ready.',
        'Generating test data for text-heavy components like blog posts, cards, or comment sections.',
        'Demonstrating layouts to stakeholders without distracting them with actual content.',
        'Testing responsive text wrapping and overflow behavior at different screen sizes.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '3 Paragraphs', description: 'Generate three paragraphs of Lorem Ipsum wrapped in <p> tags for a blog post template preview.' },
        { title: '50 Words', description: 'Generate exactly 50 words of placeholder text to fill a product description card in a wireframe.' },
        { title: 'Classic Opening', description: 'Start with the traditional "Lorem ipsum dolor sit amet, consectetur adipiscing elit" for a familiar design-phase placeholder.' },
        { title: '200 Characters', description: 'Generate exactly 200 characters to test a meta description field or character-limited input.' },
        { title: 'Short Paragraphs', description: 'Generate 5 short paragraphs (2-3 sentences each) for a compact card layout preview.' },
        { title: 'HTML Output', description: 'Generate paragraphs with <p> tags for direct paste into an HTML template or CMS editor.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Lorem Ipsum', definition: 'Scrambled Latin-derived placeholder text used since the 1500s, originating from Cicero\'s philosophical work "De Finibus Bonorum et Malorum."' },
        { term: 'Placeholder Text', definition: 'Temporary text used in design mockups and templates to simulate the appearance of real content without providing actual meaning.' },
        { term: 'Typography', definition: 'The art and technique of arranging type, including font selection, size, line-height, and spacing -- often tested with Lorem Ipsum text.' },
        { term: 'Wireframe', definition: 'A low-fidelity visual representation of a web page layout, typically using boxes and placeholder text to define structure and content areas.' },
        { term: 'Mockup', definition: 'A medium to high-fidelity design that shows how a page will look with styles, colors, and placeholder content applied.' },
        { term: 'Layout Testing', definition: 'The process of verifying that a design handles varying amounts of content gracefully, including long text, short text, and edge cases.' },
        { term: 'Greeking', definition: 'The practice of using nonsensical text (like Lorem Ipsum) in place of real content during the design process, named after the idiom "it\'s Greek to me."' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What does Lorem Ipsum mean?', answer: 'Lorem Ipsum is scrambled Latin derived from Cicero\'s "De Finibus Bonorum et Malorum" (45 BC). The text has been intentionally altered so it does not form coherent Latin sentences.' },
        { question: 'Why not use real text as placeholder?', answer: 'Real text draws attention to the content rather than the design. Lorem Ipsum has a natural letter distribution that mimics real text while being content-neutral, keeping the focus on layout and typography.' },
        { question: 'Can I generate text other than Latin?', answer: 'This tool generates classic Latin-derived Lorem Ipsum. For other language patterns, consider dedicated generators for your target language.' },
        { question: 'Is Lorem Ipsum copyrighted?', answer: 'No. Lorem Ipsum is derived from a 2,000-year-old Latin text and is in the public domain. It can be used freely in any project.' },
        { question: 'How many paragraphs can I generate?', answer: 'You can generate up to 100 paragraphs at a time. For most design purposes, 3-10 paragraphs are sufficient.' },
        { question: 'Does the output include HTML tags?', answer: 'Optionally. You can toggle HTML paragraph tags (<p>) on or off depending on whether you need plain text or HTML-formatted output.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use Lorem Ipsum during early design phases, but replace it with real content as soon as possible.',
        'Generate different lengths to test how your layout handles varying content sizes.',
        'Test with very short text (1-2 words) and very long text to catch overflow and wrapping issues.',
        'Use HTML-wrapped output when pasting directly into templates or CMS systems.',
        'Start with the classic "Lorem ipsum" opening when presenting to clients, as it is universally recognized as placeholder text.',
        'Match the generated text amount to realistic content lengths for the layout you are designing.'
      ]
    }
  },
  relatedTools: ['markdown-previewer', 'text-diff-checker', 'json-formatter', 'svg-optimizer', 'color-converter'],
  seo: {
    metaTitle: 'Lorem Ipsum Generator - Generate Placeholder Text | UnTrackt Wiki',
    metaDescription: 'Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. Perfect for wireframes, mockups, and typography testing -- classic or custom length.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text', 'lorem ipsum', 'filler text', 'sample text generator', 'wireframe text', 'design placeholder']
  }
};
