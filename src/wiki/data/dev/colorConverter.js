export default {
  id: 'color-converter',
  title: 'Color Converter',
  description: 'Convert colors between HEX, RGB, HSL, and HSV formats with a live preview, contrast ratio checker, and WCAG accessibility evaluation.',
  content: {
    whatIs: {
      heading: 'What is the Color Converter?',
      body: 'The Color Converter is a tool that translates color values between the most common formats used in web development and design: HEX (#FF5733), RGB (rgb(255, 87, 51)), HSL (hsl(11, 100%, 60%)), and HSV. It provides a live color preview, lets you fine-tune values with sliders, checks contrast ratios between foreground and background colors, and evaluates WCAG accessibility compliance. Whether you are matching brand colors across platforms, converting design tokens, or ensuring accessible color combinations, this tool provides instant, accurate results.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Designers and developers constantly switch between color formats -- CSS uses HEX and RGB, design tools often use HSL or HSV, and accessibility audits require contrast ratio calculations. Manually converting between these formats is error-prone and time-consuming. This tool handles all conversions instantly, provides visual feedback, and includes built-in WCAG contrast checking so you can ensure your color choices are both beautiful and accessible.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a color value in any supported format (HEX, RGB, HSL, or HSV).',
        'View the instant conversion to all other formats simultaneously.',
        'Use the color picker or sliders to visually adjust the color.',
        'Enable the contrast checker by selecting a foreground and background color.',
        'Review the WCAG AA and AAA compliance indicators for text contrast.',
        'Copy any format to your clipboard with one click for use in CSS, Figma, or other tools.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Convert between HEX, RGB, HSL, and HSV color formats instantly.',
        'Live color preview swatch that updates in real-time.',
        'Interactive color picker and slider controls for fine adjustment.',
        'Contrast ratio calculator for foreground/background color pairs.',
        'WCAG 2.1 AA and AAA compliance indicators for normal and large text.',
        'Support for 8-digit HEX and RGBA/HSLA with alpha channel transparency.',
        'Named CSS color lookup -- type "coral" and get the HEX, RGB, and HSL values.',
        'Color palette generation: complementary, analogous, triadic, and split-complementary schemes.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting brand colors between HEX (for CSS) and RGB (for JavaScript canvas).',
        'Checking WCAG contrast ratios to ensure text is readable against background colors.',
        'Translating Figma HSL values to CSS HEX codes for implementation.',
        'Generating accessible color palettes that meet AA or AAA standards.',
        'Converting colors with alpha transparency for overlay and gradient effects.',
        'Finding complementary or analogous colors for cohesive design systems.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'HEX to RGB', description: 'Input #FF5733 → Output: rgb(255, 87, 51) -- convert a brand color from HEX to RGB for use in a canvas drawing API.' },
        { title: 'RGB to HSL', description: 'Input rgb(51, 153, 255) → Output: hsl(210, 100%, 60%) -- convert to HSL for easier hue and saturation adjustments.' },
        { title: 'Contrast Check', description: 'Set foreground #FFFFFF on background #3366CC -- the tool shows a contrast ratio of 5.1:1, passing WCAG AA for normal text.' },
        { title: 'Alpha Channel', description: 'Convert #FF573380 (50% opacity) to rgba(255, 87, 51, 0.5) for CSS transparency.' },
        { title: 'Named Color Lookup', description: 'Type "tomato" to instantly see its values: #FF6347, rgb(255, 99, 71), hsl(9, 100%, 64%).' },
        { title: 'Palette Generation', description: 'Input a primary color to generate a complementary palette with 5 harmonious colors.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'HEX', definition: 'A hexadecimal color notation (#RRGGBB) used in CSS, representing red, green, and blue channels as two-digit hex values (00-FF).' },
        { term: 'RGB', definition: 'Red, Green, Blue -- a color model that defines colors by mixing red, green, and blue light at intensities from 0 to 255.' },
        { term: 'HSL', definition: 'Hue, Saturation, Lightness -- a cylindrical color model that is often more intuitive for humans to work with than RGB.' },
        { term: 'HSV/HSB', definition: 'Hue, Saturation, Value (or Brightness) -- similar to HSL but uses "value" instead of "lightness," commonly used in color pickers.' },
        { term: 'Color Space', definition: 'A specific organization of colors defining how color values map to visible colors. sRGB is the standard web color space.' },
        { term: 'Contrast Ratio', definition: 'The ratio of luminance between foreground and background colors, measured from 1:1 (no contrast) to 21:1 (maximum contrast).' },
        { term: 'WCAG', definition: 'Web Content Accessibility Guidelines -- standards that define minimum contrast ratios: 4.5:1 for AA normal text, 3:1 for AA large text, and 7:1 for AAA normal text.' },
        { term: 'Alpha Channel', definition: 'The transparency component of a color, expressed as a value from 0 (fully transparent) to 1 (fully opaque).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What contrast ratio is needed for WCAG AA?', answer: 'WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18px+ bold or 24px+ regular). AAA requires 7:1 for normal text and 4.5:1 for large text.' },
        { question: 'What is the difference between HSL and HSV?', answer: 'Both use Hue and Saturation, but HSL uses Lightness (0% = black, 100% = white, 50% = pure color) while HSV uses Value (0% = black, 100% = pure color). HSL is used in CSS; HSV is common in design tool color pickers.' },
        { question: 'Can I input colors with transparency?', answer: 'Yes. The tool supports 8-digit HEX (#RRGGBBAA), rgba(), and hsla() formats for colors with alpha channel transparency.' },
        { question: 'Are conversions exact?', answer: 'Conversions between HEX and RGB are exact. Conversions involving HSL or HSV may have minor rounding differences due to floating-point arithmetic, but are accurate within 1 unit.' },
        { question: 'Can I use CSS named colors?', answer: 'Yes. All 147 CSS named colors (like "coral", "steelblue", "tomato") are supported. Type the name and get all format conversions.' },
        { question: 'Is my color data sent to a server?', answer: 'No. All conversions and calculations happen entirely in your browser.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always check contrast ratios when choosing text colors -- aim for WCAG AA (4.5:1) at minimum.',
        'Use HSL for CSS when you need to create variations of a color -- adjusting lightness is more intuitive than changing RGB values.',
        'Define a consistent color format in your design system and use this tool to convert as needed.',
        'Test colors in both light and dark mode contexts to ensure readability.',
        'Use the alpha channel for overlay effects instead of creating separate semi-transparent color values.',
        'Generate color palettes using complementary or triadic schemes for harmonious designs.',
        'Remember that colors appear differently on various screens -- test on multiple devices when color accuracy matters.'
      ]
    }
  },
  relatedTools: ['css-gradient-generator', 'svg-optimizer', 'html-entity-encoder', 'markdown-previewer', 'lorem-ipsum-generator'],
  seo: {
    metaTitle: 'Color Converter - HEX, RGB, HSL, HSV & Contrast Checker | UnTrackt Wiki',
    metaDescription: 'Convert colors between HEX, RGB, HSL, and HSV formats. Check WCAG contrast ratios, generate palettes, and ensure accessibility -- all in your browser.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hsl', 'color picker', 'contrast ratio checker', 'wcag contrast', 'css color converter', 'color palette generator']
  }
};
