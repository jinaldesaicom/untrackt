export default {
  id: 'text-snippets',
  title: 'Text Snippets',
  description: 'Create shortcode text expansions with dynamic placeholders, prefix triggers, category grouping, and import/export support.',
  content: {
    whatIs: {
      heading: 'What is the Text Snippets Tool?',
      body: 'The Text Snippets tool lets you create reusable text expansions triggered by shortcodes. Define a prefix (e.g., "/sig") and its expansion text, then use the quick expander overlay (Ctrl+;) to expand shortcodes instantly. Snippets support dynamic placeholders like {{date}}, {{time}}, and {{cursor}} that are replaced at expansion time. You can organize snippets into categories, track usage, clone entries, and import/export your collection as JSON. All data is stored locally in your browser.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Typing the same phrases, templates, and boilerplate text repeatedly wastes time and introduces errors. Text expansion tools let you type a short trigger and instantly replace it with a full block of text--complete with dynamic values like today\'s date. This tool brings that functionality to your browser without installing any desktop software.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Click "New Snippet" and enter a prefix trigger (e.g., "/greet") and the expansion text.',
        'Optionally use placeholders: {{date}} for today\'s date, {{time}} for current time, {{cursor}} for cursor position.',
        'Assign the snippet to a category for organization.',
        'Use Ctrl+; (or the quick expand button) to open the expander overlay.',
        'Type or select a snippet prefix to expand it and copy the result to your clipboard.',
        'Import or export your snippet collection as JSON for backup or sharing.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Shortcode-triggered text expansion with custom prefixes.',
        'Dynamic placeholders: {{date}}, {{time}}, and {{cursor}} replaced at expansion time.',
        'Quick expander overlay activated with Ctrl+; keyboard shortcut.',
        'Category grouping for organizing snippets by topic or use case.',
        'Usage tracking showing how many times each snippet has been expanded.',
        'Clone functionality to duplicate and modify existing snippets.',
        'Import and export snippet collections as JSON files.',
        'Local browser storage--snippets persist across sessions and never leave your device.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Expanding email greetings and sign-offs with a short trigger.',
        'Inserting code boilerplate (HTML templates, React components, SQL patterns) instantly.',
        'Filling in standardized support responses with dynamic date/time stamps.',
        'Creating meeting agenda templates that auto-populate with today\'s date.',
        'Quick-inserting addresses, contact details, or legal disclaimers.',
        'Sharing a team snippet library by exporting and importing JSON files.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Email signature', description: 'Prefix: "/sig". Expansion: "Best regards,\\nJane Doe\\nSenior Developer\\n{{date}}". Typing /sig inserts the full signature with today\'s date.' },
        { title: 'Support response', description: 'Prefix: "/ack". Expansion: "Thank you for reaching out. We received your request on {{date}} at {{time}} and will respond within 24 hours."' },
        { title: 'HTML boilerplate', description: 'Prefix: "/html". Expansion: a full HTML5 document template with doctype, head, meta tags, and body structure.' },
        { title: 'Meeting notes header', description: 'Prefix: "/mtg". Expansion: "## Meeting Notes - {{date}}\\n\\n**Attendees:**\\n**Agenda:**\\n**Action Items:**"' },
        { title: 'Git commit message', description: 'Prefix: "/fix". Expansion: "fix: [description]\\n\\nResolves #{{cursor}}". The cursor placeholder positions your cursor for quick editing.' },
        { title: 'Legal disclaimer', description: 'Prefix: "/disc". Expansion: your standard disclaimer text, ensuring consistency across all communications.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Snippet', definition: 'A stored piece of text with a trigger prefix that can be expanded on demand.' },
        { term: 'Prefix', definition: 'The short trigger string (e.g., "/sig", "/greet") that identifies which snippet to expand.' },
        { term: 'Text Expansion', definition: 'The process of replacing a short trigger with its full text content, optionally including dynamic values.' },
        { term: 'Placeholder', definition: 'A token like {{date}} or {{time}} in the snippet body that is replaced with a live value when the snippet is expanded.' },
        { term: 'Quick Expander', definition: 'An overlay interface (Ctrl+;) for rapidly searching and expanding snippets without leaving your current context.' },
        { term: 'Category', definition: 'A label used to group related snippets (e.g., "Email", "Code", "Support") for easier browsing and management.' },
        { term: 'Usage Count', definition: 'A counter tracking how many times each snippet has been expanded, helping identify your most-used entries.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is my data stored on a server?', answer: 'No. All snippets are saved in browser local storage on your device. Nothing is transmitted externally.' },
        { question: 'How do I use the quick expander?', answer: 'Press Ctrl+; to open the overlay, type a snippet prefix, and select it to expand and copy the text to your clipboard.' },
        { question: 'What placeholders are supported?', answer: '{{date}} inserts today\'s date, {{time}} inserts the current time, and {{cursor}} marks where to position the cursor after expansion.' },
        { question: 'Can I share my snippets with teammates?', answer: 'Yes. Export your collection as a JSON file and share it. Others can import the JSON to load your snippets into their browser.' },
        { question: 'Is there a limit to how many snippets I can create?', answer: 'No hard limit. Browser local storage typically allows 5-10 MB, sufficient for thousands of text snippets.' },
        { question: 'Can I use the same prefix for multiple snippets?', answer: 'Each prefix should be unique to avoid ambiguity. The tool will warn you if a duplicate prefix is detected.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use a consistent prefix convention (e.g., starting with "/" or ";") so triggers don\'t conflict with normal typing.',
        'Keep prefixes short and memorable: "/sig", "/addr", "/mtg" are easy to recall.',
        'Use categories to organize snippets by context (work, personal, code, support).',
        'Take advantage of {{date}} and {{time}} in templates that need current timestamps.',
        'Regularly export your snippets as JSON for backup in case browser data is cleared.',
        'Review usage counts periodically--low-usage snippets may need better prefixes or can be cleaned up.',
        'Clone existing snippets to create variations rather than writing from scratch.',
        'Use the Ctrl+; shortcut for the fastest workflow instead of browsing the snippet list manually.'
      ]
    }
  },
  relatedTools: ['clipboard-manager', 'notepad', 'case-converter', 'lorem-ipsum-generator'],
  seo: {
    metaTitle: 'Text Snippets - Shortcode Text Expansion Tool | Wiki | UnTrackt',
    metaDescription: 'Create reusable text snippets with shortcode triggers, dynamic placeholders, categories, and import/export. Browser-based text expansion without installation.',
    keywords: ['text snippets', 'text expansion', 'shortcode', 'text macro', 'snippet manager', 'template expansion', 'clipboard tool', 'boilerplate text']
  }
}
