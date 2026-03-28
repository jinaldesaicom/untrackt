export default {
  id: 'notepad',
  title: 'Notepad',
  description: 'A distraction-free writing space with markdown support, auto-save, and a clean minimal interface.',
  content: {
    whatIs: {
      heading: 'What is the Notepad?',
      body: 'The Notepad is a distraction-free text editor designed for quick writing, note-taking, and drafting. It supports markdown formatting, automatically saves your work as you type, and provides a clean minimal interface that lets you focus entirely on your words without clutter or distractions.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most text editors are bloated with features you rarely need. The Notepad strips everything down to the essentials--just you and your text. With auto-save, you never lose work. Markdown support lets you add structure without reaching for a mouse. It is perfect for capturing thoughts quickly before they disappear.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Start typing in the text area--your content auto-saves continuously.',
        'Use markdown syntax for formatting: **bold**, *italic*, # headings, - lists.',
        'Toggle the preview mode to see rendered markdown output.',
        'Use the word and character count display to track your writing progress.',
        'Click the download button to export your text as a .txt or .md file.',
        'Clear the notepad when you want to start fresh.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Auto-save that persists your content in local storage',
        'Markdown formatting support with live preview',
        'Word count and character count display',
        'Distraction-free, minimal interface',
        'Export as .txt or .md file',
        'Full-screen writing mode for maximum focus',
        'Keyboard shortcuts for common formatting actions'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Quickly jotting down an idea or thought during the day',
        'Drafting emails, messages, or social media posts',
        'Writing meeting notes or lecture notes in real time',
        'Creating markdown-formatted documentation or README files',
        'Journaling or free-writing sessions',
        'Drafting blog posts or articles before publishing'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Quick Idea Capture', description: 'Open the notepad, type a product idea or creative thought in a few sentences, and know it will be there when you come back.' },
        { title: 'Meeting Notes', description: 'Use markdown headings and bullet points to take structured notes during a meeting, then export the file for sharing.' },
        { title: 'Blog Post Draft', description: 'Draft an entire blog post with headers, lists, and emphasis using markdown, then preview it before copying to your CMS.' },
        { title: 'Daily Brain Dump', description: 'Spend five minutes each morning writing down everything on your mind to clear mental clutter and prioritize your day.' },
        { title: 'Code Snippet Notes', description: 'Save quick code snippets or terminal commands you frequently use, formatted in markdown code blocks for easy reference.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Markdown', definition: 'A lightweight markup language that uses plain-text syntax to create formatted text, such as headings, bold, italics, and lists.' },
        { term: 'Auto-Save', definition: 'A feature that automatically saves your content at regular intervals without requiring manual action.' },
        { term: 'Live Preview', definition: 'A real-time rendering of your markdown text showing how it will appear when formatted.' },
        { term: 'Distraction-Free Mode', definition: 'A full-screen writing experience that hides menus, toolbars, and other interface elements.' },
        { term: 'Word Count', definition: 'The total number of words in your document, useful for tracking writing progress.' },
        { term: 'Plain Text', definition: 'Unformatted text without any styling, fonts, or embedded media.' },
        { term: 'Export', definition: 'The action of saving your notepad content as a downloadable file in a specific format.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Will my notes be saved if I close the tab?', answer: 'Yes. Your content is auto-saved to local storage and will be available when you return.' },
        { question: 'Can I use the notepad offline?', answer: 'Yes. Once the page is loaded, it works entirely in your browser without needing an internet connection.' },
        { question: 'Does it support rich text formatting?', answer: 'It supports markdown-based formatting. Use the preview mode to see rendered output with headings, bold, lists, and more.' },
        { question: 'How do I export my notes?', answer: 'Click the download button and choose your preferred format (.txt or .md).' },
        { question: 'Is there a character or word limit?', answer: 'There is no imposed limit. You can write as much as you need.' },
        { question: 'Can I use keyboard shortcuts?', answer: 'Yes. Common shortcuts like Ctrl+B for bold and Ctrl+I for italic are supported in the editor.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use markdown headings (# ## ###) to structure longer documents and make them scannable.',
        'Write first, edit later--use the notepad for capturing thoughts without worrying about perfection.',
        'Export important notes to a file as a backup beyond local storage.',
        'Use full-screen mode when you need to focus deeply on writing.',
        'Create a habit of daily writing using the notepad for journaling or brain dumps.',
        'Keep one note per topic and clear the pad when switching subjects to avoid clutter.',
        'Use bullet points and numbered lists to organize information quickly.'
      ]
    }
  },
  relatedTools: ['sticky-notes', 'daily-journal', 'brain-dump-capture', 'meeting-minutes'],
  seo: {
    metaTitle: 'Notepad - Distraction-Free Writing with Markdown & Auto-Save | Untrackt',
    metaDescription: 'Write freely in a distraction-free notepad with markdown support, auto-save, and a minimal interface. Perfect for quick notes, drafts, and idea capture.',
    keywords: ['notepad', 'distraction-free writing', 'markdown editor', 'auto-save notepad', 'online notepad', 'text editor', 'note-taking']
  }
};
