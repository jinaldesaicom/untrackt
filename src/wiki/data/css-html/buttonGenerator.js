export default {
  id: 'button-generator',
  title: 'CSS Button Generator',
  description: 'Visual CSS button builder — adjust padding, colors, borders, shadows, hover states, and copy ready-to-use CSS.',
  content: {
    whatIs: {
      heading: 'What is the CSS Button Generator?',
      body: 'The CSS Button Generator is a visual tool for designing CSS buttons. Adjust background color, text color, padding, border, border-radius, box-shadow, font size, and hover/active states with live preview. The tool generates clean, production-ready CSS that you can copy and use immediately in your projects.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Buttons involve many CSS properties that need to work together — background, padding, border, shadow, hover transitions. This visual builder lets you experiment with all these properties simultaneously, see the button update in real time, and export CSS without manually typing and testing each property.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the button text for the preview.',
        'Adjust background color, text color, and font size.',
        'Set padding, border-radius, and border properties.',
        'Add box-shadow for depth.',
        'Configure hover and active state styles.',
        'Add a transition for smooth hover effects.',
        'Copy the generated CSS.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Full control over background, text color, font, padding, border, and shadow.',
        'Hover and active state customization.',
        'Transition timing configuration.',
        'Live preview with interactive hover testing.',
        'Generated CSS with separate normal, hover, and active selectors.',
        'Preset button styles as starting points.',
        'Browser-based — no data shared.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Designing primary, secondary, and outline button variants for a design system.',
        'Prototyping button styles before implementing in a component library.',
        'Creating consistent CTA buttons for marketing pages.',
        'Learning how button CSS properties interact.',
        'Quickly generating one-off button styles for emails or landing pages.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Primary Button', description: 'Solid background, white text, 12px 24px padding, 6px border-radius, subtle shadow — standard CTA style.' },
        { title: 'Outline Button', description: 'Transparent background, colored border and text, fill on hover — clean secondary action style.' },
        { title: 'Pill Button', description: 'border-radius: 999px with generous horizontal padding — rounded pill shape.' },
        { title: 'Ghost Button', description: 'Transparent background and border, text only, underline or background on hover.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'CTA (Call to Action)', definition: 'A button encouraging the user to take a specific action, typically prominently styled.' },
        { term: 'Hover State', definition: 'CSS styles applied when the user\'s cursor is over the button.' },
        { term: 'Active State', definition: 'CSS styles applied during the moment the button is being pressed.' },
        { term: 'Transition', definition: 'A CSS property enabling smooth animation between normal and hover/active states.' },
        { term: 'Outline Button', definition: 'A button style with a transparent background and visible border, often used for secondary actions.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I make the button accessible?', answer: 'Ensure sufficient color contrast (WCAG AA minimum), use a <button> element (not a div), and add focus styles for keyboard navigation.' },
        { question: 'Should I use <button> or <a> for buttons?', answer: 'Use <button> for actions (submit, toggle). Use <a> styled as a button for navigation links.' },
        { question: 'How do I add a focus ring?', answer: 'Add an :focus-visible selector with an outline or box-shadow to make the focus state visible for keyboard users.' },
        { question: 'Can I use gradients for button backgrounds?', answer: 'Yes. Replace the background-color with a background: linear-gradient() for gradient buttons.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent button styles across your site for visual coherence.',
        'Always include hover, active, and focus states for complete interactivity.',
        'Ensure text contrast meets WCAG AA standards (4.5:1 ratio minimum).',
        'Use CSS custom properties for button colors to enable easy theming.',
        'Keep padding proportional to font size for balanced sizing.',
        'Add subtle transitions (0.2-0.3s) for a polished feel.'
      ]
    }
  },
  relatedTools: ['css-box-shadow-generator', 'css-border-radius-generator', 'css-animation-generator', 'glassmorphism-generator'],
  seo: {
    metaTitle: 'CSS Button Generator — Visual Button Builder | UnTrackt Wiki',
    metaDescription: 'Design CSS buttons visually with controls for colors, padding, borders, shadows, hover states, and transitions. Copy production-ready CSS.',
    keywords: ['css button generator', 'button builder', 'css button', 'hover effects', 'button design', 'css button maker']
  }
};
