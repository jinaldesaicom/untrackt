export default {
  id: 'css-animation-generator',
  title: 'CSS Animation Generator',
  description: 'Keyframe animation builder — define timing, easing, direction, and keyframes, then preview and copy CSS.',
  content: {
    whatIs: {
      heading: 'What is the CSS Animation Generator?',
      body: 'The CSS Animation Generator lets you build @keyframes animations visually. Define keyframes at percentage breakpoints, set properties like transform, opacity, and color at each keyframe, then configure timing, easing, delay, iteration count, and direction. The tool previews the animation in real time and generates copy-ready CSS.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'CSS animations involve multiple moving parts — keyframes, timing functions, and animation properties — that are tedious to get right by editing code. This visual builder lets you see the animation as you build it, experiment with easing curves, and export clean CSS without the guesswork.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add keyframe stops (0%, 50%, 100%, etc.).',
        'Set CSS properties at each keyframe (transform, opacity, color, etc.).',
        'Configure animation duration, easing, delay, and iteration count.',
        'Set direction (normal, reverse, alternate) and fill mode.',
        'Preview the animation on the live preview element.',
        'Copy the generated @keyframes and animation CSS.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Visual keyframe editor with percentage-based stops.',
        'Property controls for transform, opacity, color, and more.',
        'Easing curve selection with common presets and cubic-bezier support.',
        'Duration, delay, iteration count, and direction controls.',
        'Real-time animation preview.',
        'Generated @keyframes and animation shorthand CSS.',
        'Browser-based — no server required.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Creating entrance animations (fade in, slide up, bounce).',
        'Building loading spinners and progress indicators.',
        'Designing hover or click micro-interactions.',
        'Prototyping animation ideas before implementing in production.',
        'Learning CSS animation syntax with visual feedback.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Fade In', description: '0% opacity: 0 → 100% opacity: 1, ease-in, 0.3s duration — smooth element appearance.' },
        { title: 'Bounce', description: 'Keyframes at 0%, 50%, 100% with translateY values creating a bounce effect, ease-in-out timing.' },
        { title: 'Spinner', description: '0% rotate(0deg) → 100% rotate(360deg), linear, infinite iteration — continuous spin.' },
        { title: 'Pulse', description: 'Scale from 1 to 1.05 and back, alternate direction, infinite — subtle breathing effect.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: '@keyframes', definition: 'A CSS at-rule defining the stages of an animation by specifying property values at named percentage stops.' },
        { term: 'Easing Function', definition: 'A timing function controlling the acceleration curve of the animation (ease, linear, ease-in-out, cubic-bezier).' },
        { term: 'Iteration Count', definition: 'How many times the animation repeats — a number or "infinite" for continuous looping.' },
        { term: 'Animation Direction', definition: 'Whether the animation runs forward (normal), backward (reverse), or alternates between both.' },
        { term: 'Fill Mode', definition: 'Determines how styles are applied before (backwards) and after (forwards) the animation runs.' },
        { term: 'cubic-bezier()', definition: 'A CSS function for custom easing curves, defined by four control points.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between animation and transition?', answer: 'Transitions animate between two states on a trigger (hover, class change). Animations can have multiple keyframes and run automatically.' },
        { question: 'Are CSS animations performant?', answer: 'Animations on transform and opacity are GPU-accelerated and very performant. Animating layout properties (width, top) can cause jank.' },
        { question: 'Can I pause an animation?', answer: 'Yes, using animation-play-state: paused in CSS or via JavaScript.' },
        { question: 'How do I loop an animation?', answer: 'Set animation-iteration-count: infinite for continuous looping.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Animate transform and opacity for best performance — they do not trigger layout recalculation.',
        'Use will-change: transform to hint the browser about upcoming animations.',
        'Keep animations subtle — excessive motion can be distracting or cause motion sickness.',
        'Respect prefers-reduced-motion by disabling or simplifying animations for users who prefer reduced motion.',
        'Use animation-fill-mode: forwards to retain the final keyframe styles after the animation ends.',
        'Name keyframes descriptively (fadeIn, slideUp) for maintainable code.'
      ]
    }
  },
  relatedTools: ['css-filter-generator', 'css-box-shadow-generator', 'button-generator', 'glassmorphism-generator'],
  seo: {
    metaTitle: 'CSS Animation Generator — Keyframe Animation Builder | UnTrackt Wiki',
    metaDescription: 'Build CSS @keyframes animations visually with timing, easing, and direction controls. Preview animations in real time and copy production-ready CSS.',
    keywords: ['css animation generator', 'keyframes builder', 'css animation', 'easing curve', 'animation tool', 'css keyframes']
  }
};
