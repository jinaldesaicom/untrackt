export default {
  id: 'color-palette-generator',
  title: 'Color Palette Generator',
  description: 'Generate harmonious color palettes with CSS variables, Tailwind classes, and multiple export formats for designers and developers.',
  content: {
    whatIs: {
      heading: 'What is the Color Palette Generator?',
      body: 'The Color Palette Generator creates visually harmonious color palettes based on color theory rules like complementary, analogous, triadic, split-complementary, and monochromatic schemes. Starting from a single base color, it produces a complete palette with shades and tints, and exports the results as HEX, RGB, HSL, CSS custom properties, or Tailwind CSS configuration objects.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Choosing colors that work well together is one of the hardest parts of design. This tool applies proven color theory algorithms to eliminate guesswork, ensuring accessible contrast ratios and aesthetic harmony. Developers can export palettes directly as CSS variables or Tailwind config, bridging the gap between design and code in seconds.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a base color using the color picker, HEX input, or RGB/HSL fields.',
        'Select a harmony type: complementary, analogous, triadic, split-complementary, tetradic, or monochromatic.',
        'View the generated palette with primary, secondary, and accent colors plus their shades.',
        'Check the contrast ratio indicators against white and black backgrounds for accessibility.',
        'Copy individual colors in your preferred format (HEX, RGB, HSL) or export the entire palette.',
        'Export as CSS custom properties, Tailwind config, SCSS variables, or a JSON object.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Six color harmony algorithms: complementary, analogous, triadic, split-complementary, tetradic, monochromatic.',
        'Automatic shade and tint generation (50-950 scale) for each palette color.',
        'WCAG contrast ratio checker for text accessibility against each color.',
        'Export formats: HEX, RGB, HSL, CSS custom properties, Tailwind config, SCSS variables, JSON.',
        'Interactive color picker with real-time palette preview.',
        'Color blindness simulation to verify palette usability for all users.',
        'Lock individual colors and regenerate the rest of the palette around them.',
        'History of recently generated palettes for easy comparison.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Designing a brand color system for a website or application.',
        'Generating Tailwind CSS color configurations for a new project.',
        'Checking color accessibility compliance (WCAG 2.1 AA/AAA) during design reviews.',
        'Creating presentation or infographic color schemes that are visually coherent.',
        'Prototyping dark mode and light mode palettes from a single base color.',
        'Exploring color options for data visualization charts and dashboards.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Complementary palette from #3B82F6', description: 'Base blue (#3B82F6) paired with its complement orange (#F6923B), plus generated shades from 50 to 950 for both.' },
        { title: 'Analogous palette for a nature theme', description: 'Starting with forest green (#228B22), generates adjacent hues: teal, green, and yellow-green for a natural, cohesive feel.' },
        { title: 'Triadic palette for a vibrant UI', description: 'Base red (#EF4444) produces blue and yellow accents spaced 120° apart on the color wheel for maximum vibrancy.' },
        { title: 'Monochromatic palette for minimalist design', description: 'A single navy (#1E3A5F) generates 10 tints and shades, perfect for a clean, professional interface.' },
        { title: 'Accessible text colors', description: 'Generate a palette and instantly identify which color combinations meet WCAG AA (4.5:1) and AAA (7:1) contrast ratios.' },
        { title: 'Tailwind config export', description: 'Export a palette as a Tailwind CSS `colors` object ready to paste into `tailwind.config.js` with semantic names.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Hue', definition: 'The pure color on the color wheel, measured in degrees from 0° (red) through 120° (green) and 240° (blue) back to 360°.' },
        { term: 'Saturation', definition: 'The intensity or purity of a color. 100% saturation is a vivid color; 0% is a shade of gray.' },
        { term: 'Lightness', definition: 'How light or dark a color is. In HSL, 0% is black, 50% is the pure hue, and 100% is white.' },
        { term: 'Complementary colors', definition: 'Two colors located directly opposite each other on the color wheel (180° apart), creating maximum contrast.' },
        { term: 'Analogous colors', definition: 'Colors adjacent on the color wheel (within 30-60°), producing harmonious, low-contrast palettes.' },
        { term: 'Triadic colors', definition: 'Three colors evenly spaced 120° apart on the color wheel, offering vibrant contrast while maintaining balance.' },
        { term: 'WCAG contrast ratio', definition: 'A numeric ratio measuring the luminance difference between foreground and background colors. AA requires 4.5:1 for normal text.' },
        { term: 'CSS custom properties', definition: 'CSS variables (e.g., --color-primary: #3B82F6) that allow dynamic theming and consistent color usage across stylesheets.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the best harmony type for a website?', answer: 'Complementary palettes offer strong contrast for CTAs and accents. Analogous palettes create calmer, more cohesive designs. Choose based on the mood you want.' },
        { question: 'How do I ensure my colors are accessible?', answer: 'Use the built-in contrast checker. Ensure text colors have at least a 4.5:1 ratio against their background for WCAG AA compliance.' },
        { question: 'Can I start from a brand color I already have?', answer: 'Yes. Enter your existing brand color as the base and the tool generates a complete harmonious palette around it.' },
        { question: 'What is the shade scale (50-950)?', answer: 'It follows the Tailwind CSS convention: 50 is the lightest tint, 500 is the base color, and 950 is the darkest shade.' },
        { question: 'Can I use the palette in Figma or Sketch?', answer: 'Export the palette as HEX values and import them into your design tool\'s color library, or use the JSON export for plugins.' },
        { question: 'Does this work for dark mode?', answer: 'Yes. You can invert the shade scale or generate a separate palette with darker base values optimized for dark backgrounds.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with your most important brand color and build the palette outward from it.',
        'Limit your primary palette to 3-5 colors to maintain visual consistency.',
        'Always verify contrast ratios for text on colored backgrounds before shipping.',
        'Use the monochromatic scheme for backgrounds and subtle UI elements, reserving bold colors for actions.',
        'Test your palette under color blindness simulations to ensure inclusivity.',
        'Export as CSS custom properties for easy theme switching between light and dark modes.',
        'Use the 60-30-10 rule: 60% dominant color, 30% secondary, 10% accent for balanced layouts.',
        'Save palettes you like to your history before experimenting further.'
      ]
    }
  },
  relatedTools: ['aspect-ratio-calculator', 'image-to-base64', 'meta-tag-generator', 'case-converter'],
  seo: {
    metaTitle: 'Color Palette Generator - Create Harmonious Color Schemes | Wiki | UnTrackt',
    metaDescription: 'Generate beautiful color palettes using color theory. Export as CSS variables, Tailwind config, or HEX/RGB/HSL. Check WCAG accessibility contrast ratios instantly.',
    keywords: ['color palette generator', 'color scheme', 'color harmony', 'complementary colors', 'Tailwind colors', 'CSS variables', 'WCAG contrast', 'color picker', 'design tool']
  }
};
