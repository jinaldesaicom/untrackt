export default {
  id: 'neumorphism-generator',
  title: 'Neumorphism Generator',
  description: 'Build soft UI shadow effects — adjust light/dark shadows, blur, and intensity for a neumorphic look.',
  content: {
    whatIs: {
      heading: 'What is the Neumorphism Generator?',
      body: 'The Neumorphism Generator creates the soft UI (skeuomorphic) shadow effect using paired light and dark box-shadows. Adjust the shadow distance, blur, intensity, background color, and light direction to create elements that appear to extrude from or press into the background surface. The tool generates copy-ready CSS.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Neumorphism requires carefully balanced light and dark shadows on a matching background color. Getting the subtle effect right by hand takes many iterations. This visual tool lets you fine-tune the shadow pair and background until the effect looks natural, then export the CSS.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the background color (the element and page background should match or be similar).',
        'Adjust the light shadow offset, blur, and color.',
        'Adjust the dark shadow offset, blur, and color.',
        'Toggle between raised (extruded) and pressed (inset) modes.',
        'Fine-tune intensity until the effect looks subtle and natural.',
        'Copy the generated CSS including background and box-shadow.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Dual shadow control (light + dark) for neumorphic effect.',
        'Raised and pressed (inset) modes.',
        'Background color picker with auto-calculated shadow colors.',
        'Blur and distance controls for shadow depth.',
        'Intensity slider for subtle to pronounced effects.',
        'One-click CSS copy with all needed properties.',
        'Browser-based — no server involved.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Designing soft UI card and button components.',
        'Creating neumorphic form inputs and toggles.',
        'Prototyping soft UI design concepts.',
        'Building dashboard widgets with pressed/raised states.',
        'Exploring the neumorphism design trend with live visual feedback.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Raised Card', description: 'Light shadow top-left, dark shadow bottom-right on a light gray background — element appears to pop out.' },
        { title: 'Pressed Button', description: 'Inset shadows create a pressed/recessed button state when clicked.' },
        { title: 'Toggle Switch', description: 'The track uses an inset (pressed) style while the thumb uses a raised style.' },
        { title: 'Dark Mode Neumorphism', description: 'Dark background (#2d2d2d) with lighter and darker shadow variants.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Neumorphism', definition: 'A design trend combining flat design with subtle shadows to create soft, extruded UI elements.' },
        { term: 'Soft UI', definition: 'Another name for neumorphism, describing the soft, rounded shadow aesthetic.' },
        { term: 'Light Shadow', definition: 'The lighter shadow cast on one side, simulating light hitting the element from a light source.' },
        { term: 'Dark Shadow', definition: 'The darker shadow on the opposite side, creating the illusion of depth.' },
        { term: 'Inset', definition: 'The CSS box-shadow keyword that places shadows inside the element, creating a pressed appearance.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is neumorphism accessible?', answer: 'It can be challenging for accessibility because low contrast between element and background makes boundaries hard to see. Add borders or increase contrast for interactive elements.' },
        { question: 'Why must the background match?', answer: 'The illusion works because the element appears to be part of the surface. Different background colors break the illusion.' },
        { question: 'Does it work on dark backgrounds?', answer: 'Yes, but you need to adjust shadow colors to be lighter/darker variants of the dark background.' },
        { question: 'Is neumorphism still popular?', answer: 'It is used selectively for specific UI elements (toggles, cards) rather than entire interfaces. Subtle neumorphism remains an effective design technique.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep the effect subtle — heavy shadows look unrealistic.',
        'Match the element background to the page background for a seamless effect.',
        'Add visible borders to interactive elements for accessibility.',
        'Use neumorphism selectively — not every element needs soft shadows.',
        'Test on both light and dark themes if your site supports both.',
        'Pair raised normal state with pressed active state for interactive buttons.'
      ]
    }
  },
  relatedTools: ['glassmorphism-generator', 'css-box-shadow-generator', 'button-generator', 'css-border-radius-generator'],
  seo: {
    metaTitle: 'Neumorphism Generator — Soft UI Shadow Effects | UnTrackt Wiki',
    metaDescription: 'Create neumorphic soft UI effects with dual light/dark shadows. Adjust intensity, blur, and direction for raised and pressed states with CSS output.',
    keywords: ['neumorphism', 'soft ui', 'neumorphism generator', 'css neumorphism', 'soft shadow', 'skeuomorphism css']
  }
};
