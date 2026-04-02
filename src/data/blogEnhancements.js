export const blogEnhancements = {
  'pomodoro-vs-52-17-which-actually-works': {
    ogImage: '/og-blog-pomodoro-vs-52-17-which-actually-works.svg',
    palette: { from: '#0f766e', to: '#1d4ed8', accent: '#99f6e4' },
    eyebrow: 'Focus Systems',
    relatedSlugs: [
      'why-your-online-tools-should-not-track-you',
      'notion-vs-browser-only-tools-privacy-comparison',
      'the-hidden-cost-of-free-tools',
    ],
    internalLinks: [
      {
        to: '/tools/pomodoro-timer',
        title: 'Try the Pomodoro Timer',
        description: 'Run short or custom focus intervals privately in your browser.',
        kind: 'tool',
      },
      {
        to: '/tools/focus-session-logger',
        title: 'Log your 14-day experiment',
        description: 'Track session quality, energy, and consistency without a SaaS dashboard.',
        kind: 'tool',
      },
      {
        to: '/blog/why-your-online-tools-should-not-track-you',
        title: 'Why tracking should not define productivity',
        description: 'Read the philosophy behind privacy-first utility workflows.',
        kind: 'article',
      },
      {
        to: '/blog/notion-vs-browser-only-tools-privacy-comparison',
        title: 'Compare cloud tools vs browser-only workflows',
        description: 'See how privacy posture changes when your work stays local.',
        kind: 'article',
      },
    ],
  },
  'notion-vs-browser-only-tools-privacy-comparison': {
    ogImage: '/og-blog-notion-vs-browser-only-tools-privacy-comparison.svg',
    palette: { from: '#1f2937', to: '#0891b2', accent: '#a5f3fc' },
    eyebrow: 'Privacy Comparison',
    relatedSlugs: [
      'why-i-stopped-using-google-tools-for-sensitive-calculations',
      'why-we-built-untrackt-without-a-database',
      'why-your-online-tools-should-not-track-you',
    ],
    internalLinks: [
      {
        to: '/tools/notepad',
        title: 'Use a local-first Notepad',
        description: 'Draft sensitive notes without default cloud storage or account lock-in.',
        kind: 'tool',
      },
      {
        to: '/tools/data-sync',
        title: 'Export only when you choose',
        description: 'Move data between devices with explicit backup and restore controls.',
        kind: 'tool',
      },
      {
        to: '/blog/why-we-built-untrackt-without-a-database',
        title: 'Why architecture matters more than slogans',
        description: 'See why we chose a no-database model for private utilities.',
        kind: 'article',
      },
      {
        to: '/privacy-policy',
        title: 'Read the privacy policy',
        description: 'Check the platform-level privacy commitments behind the product.',
        kind: 'policy',
      },
    ],
  },
  'why-i-stopped-using-google-tools-for-sensitive-calculations': {
    ogImage: '/og-blog-why-i-stopped-using-google-tools-for-sensitive-calculations.svg',
    palette: { from: '#7c2d12', to: '#991b1b', accent: '#fdba74' },
    eyebrow: 'Sensitive Workflows',
    relatedSlugs: [
      'notion-vs-browser-only-tools-privacy-comparison',
      'why-we-built-untrackt-without-a-database',
      'the-hidden-cost-of-free-tools',
    ],
    internalLinks: [
      {
        to: '/tools/cost-estimator',
        title: 'Estimate costs locally',
        description: 'Run pricing and budget scenarios without pushing assumptions into cloud apps.',
        kind: 'tool',
      },
      {
        to: '/tools/decision-matrix',
        title: 'Compare tool choices with a Decision Matrix',
        description: 'Score privacy, convenience, and risk before adopting a workflow.',
        kind: 'tool',
      },
      {
        to: '/blog/why-we-built-untrackt-without-a-database',
        title: 'Why no-database design reduces exposure',
        description: 'Understand the architectural reasoning behind local-first utilities.',
        kind: 'article',
      },
      {
        to: '/privacy-policy',
        title: 'Review the privacy baseline',
        description: 'See what data UnTrackt avoids collecting in the first place.',
        kind: 'policy',
      },
    ],
  },
  'why-your-online-tools-should-not-track-you': {
    ogImage: '/og-blog-why-your-online-tools-should-not-track-you.svg',
    palette: { from: '#312e81', to: '#0f766e', accent: '#c4b5fd' },
    eyebrow: 'Our Philosophy',
    relatedSlugs: [
      'the-hidden-cost-of-free-tools',
      'why-we-built-untrackt-without-a-database',
      'notion-vs-browser-only-tools-privacy-comparison',
    ],
    internalLinks: [
      {
        to: '/privacy-policy',
        title: 'See the privacy commitments',
        description: 'Policy should match architecture and product behavior.',
        kind: 'policy',
      },
      {
        to: '/tools/data-sync',
        title: 'Keep your data portable',
        description: 'Use export and backup tools instead of passive vendor lock-in.',
        kind: 'tool',
      },
      {
        to: '/blog/the-hidden-cost-of-free-tools',
        title: 'Read about the economics behind tracking',
        description: 'Free tools often hide costs in attention, data, and lock-in.',
        kind: 'article',
      },
      {
        to: '/blog/why-we-built-untrackt-without-a-database',
        title: 'See how we implemented this philosophy',
        description: 'The architecture article explains how no-tracking becomes real.',
        kind: 'article',
      },
    ],
  },
  'the-hidden-cost-of-free-tools': {
    ogImage: '/og-blog-the-hidden-cost-of-free-tools.svg',
    palette: { from: '#7f1d1d', to: '#78350f', accent: '#fca5a5' },
    eyebrow: 'Product Trade-offs',
    relatedSlugs: [
      'why-your-online-tools-should-not-track-you',
      'notion-vs-browser-only-tools-privacy-comparison',
      'why-i-stopped-using-google-tools-for-sensitive-calculations',
    ],
    internalLinks: [
      {
        to: '/tools/decision-matrix',
        title: 'Audit trade-offs with a Decision Matrix',
        description: 'Score free tools against privacy, exportability, and reliability.',
        kind: 'tool',
      },
      {
        to: '/blog/why-your-online-tools-should-not-track-you',
        title: 'Understand why tracking changes incentives',
        description: 'See how product metrics can drift away from user outcomes.',
        kind: 'article',
      },
      {
        to: '/blog/notion-vs-browser-only-tools-privacy-comparison',
        title: 'See the privacy comparison in practice',
        description: 'Compare cloud convenience against local control and lower exposure.',
        kind: 'article',
      },
      {
        to: '/privacy-policy',
        title: 'Check what this product does not monetize',
        description: 'Transparent policy is part of understanding true cost.',
        kind: 'policy',
      },
    ],
  },
  'why-we-built-untrackt-without-a-database': {
    ogImage: '/og-blog-why-we-built-untrackt-without-a-database.svg',
    palette: { from: '#111827', to: '#4338ca', accent: '#93c5fd' },
    eyebrow: 'Technical Architecture',
    relatedSlugs: [
      'why-your-online-tools-should-not-track-you',
      'notion-vs-browser-only-tools-privacy-comparison',
      'why-i-stopped-using-google-tools-for-sensitive-calculations',
    ],
    internalLinks: [
      {
        to: '/tools/data-sync',
        title: 'Use explicit backup instead of silent storage',
        description: 'This is the user-facing side of a no-database architecture.',
        kind: 'tool',
      },
      {
        to: '/privacy-policy',
        title: 'See how policy and architecture align',
        description: 'The privacy page explains what data we do not collect by design.',
        kind: 'policy',
      },
      {
        to: '/blog/why-your-online-tools-should-not-track-you',
        title: 'Read the product philosophy',
        description: 'The philosophy article explains the user-trust rationale.',
        kind: 'article',
      },
      {
        to: '/blog/notion-vs-browser-only-tools-privacy-comparison',
        title: 'Compare local-first with cloud-first tools',
        description: 'See how storage architecture changes privacy outcomes.',
        kind: 'article',
      },
    ],
  },
}

export function getBlogEnhancement(slug) {
  return blogEnhancements[slug] || null
}
