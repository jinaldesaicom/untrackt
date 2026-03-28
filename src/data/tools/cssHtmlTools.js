import { lazy } from 'react'

// CSS Generators
const CssBoxShadowGenerator = lazy(() => import('../../tools/css-html/CssBoxShadowGenerator.jsx'))
const CssBorderRadiusGenerator = lazy(() => import('../../tools/css-html/CssBorderRadiusGenerator.jsx'))
const CssFlexboxPlayground = lazy(() => import('../../tools/css-html/CssFlexboxPlayground.jsx'))
const CssGridGenerator = lazy(() => import('../../tools/css-html/CssGridGenerator.jsx'))
const CssAnimationGenerator = lazy(() => import('../../tools/css-html/CssAnimationGenerator.jsx'))
const CssFilterGenerator = lazy(() => import('../../tools/css-html/CssFilterGenerator.jsx'))
const CssClipPathMaker = lazy(() => import('../../tools/css-html/CssClipPathMaker.jsx'))
const CssUnitsConverter = lazy(() => import('../../tools/css-html/CssUnitsConverter.jsx'))

// HTML Utilities
const HtmlFormatterBeautifier = lazy(() => import('../../tools/css-html/HtmlFormatterBeautifier.jsx'))
const HtmlToMarkdown = lazy(() => import('../../tools/css-html/HtmlToMarkdown.jsx'))

// Design Generators
const FaviconGenerator = lazy(() => import('../../tools/css-html/FaviconGenerator.jsx'))
const ButtonGenerator = lazy(() => import('../../tools/css-html/ButtonGenerator.jsx'))
const GlassmorphismGenerator = lazy(() => import('../../tools/css-html/GlassmorphismGenerator.jsx'))
const NeumorphismGenerator = lazy(() => import('../../tools/css-html/NeumorphismGenerator.jsx'))
const CssVariableExtractor = lazy(() => import('../../tools/css-html/CssVariableExtractor.jsx'))

export const cssHtmlTools = [
  // CSS Generators
  { id: 'css-box-shadow-generator', name: 'CSS Box Shadow Generator', description: 'Visual builder for CSS box-shadow values — adjust offsets, blur, spread, color, and inset, then copy the CSS.', category: 'css-html', subcategory: 'css-generators', icon: 'Square', path: '/tools/css-box-shadow-generator', component: CssBoxShadowGenerator, tags: ['box shadow', 'css', 'shadow generator', 'visual'], isPopular: true, isNew: true },
  { id: 'css-border-radius-generator', name: 'CSS Border Radius Generator', description: 'Visual corner builder — independently adjust each corner radius and preview the shape in real time.', category: 'css-html', subcategory: 'css-generators', icon: 'RectangleHorizontal', path: '/tools/css-border-radius-generator', component: CssBorderRadiusGenerator, tags: ['border radius', 'css', 'rounded corners'], isPopular: false, isNew: true },
  { id: 'css-flexbox-playground', name: 'CSS Flexbox Playground', description: 'Interactive flexbox visualizer — toggle direction, wrap, justify, align, and gap to see the layout update live.', category: 'css-html', subcategory: 'css-generators', icon: 'Columns3', path: '/tools/css-flexbox-playground', component: CssFlexboxPlayground, tags: ['flexbox', 'css layout', 'flex', 'visualizer'], isPopular: true, isNew: true },
  { id: 'css-grid-generator', name: 'CSS Grid Generator', description: 'Visual grid layout builder — set columns, rows, and gaps, name areas, and copy the generated CSS.', category: 'css-html', subcategory: 'css-generators', icon: 'LayoutGrid', path: '/tools/css-grid-generator', component: CssGridGenerator, tags: ['css grid', 'grid layout', 'columns', 'rows'], isPopular: true, isNew: true },
  { id: 'css-animation-generator', name: 'CSS Animation Generator', description: 'Keyframe animation builder — define timing, easing, direction, and keyframes, then preview and copy CSS.', category: 'css-html', subcategory: 'css-generators', icon: 'Play', path: '/tools/css-animation-generator', component: CssAnimationGenerator, tags: ['animation', 'keyframes', 'css', 'motion'], isPopular: true, isNew: true },
  { id: 'css-filter-generator', name: 'CSS Filter Generator', description: 'Adjust blur, brightness, contrast, grayscale, hue-rotate, and more with sliders — live preview and copy CSS.', category: 'css-html', subcategory: 'css-generators', icon: 'SlidersHorizontal', path: '/tools/css-filter-generator', component: CssFilterGenerator, tags: ['css filter', 'blur', 'brightness', 'contrast'], isPopular: false, isNew: true },
  { id: 'css-clip-path-maker', name: 'CSS Clip Path Maker', description: 'Visual polygon clip-path builder — drag points or pick presets, see the shape update live, and copy the CSS.', category: 'css-html', subcategory: 'css-generators', icon: 'Pentagon', path: '/tools/css-clip-path-maker', component: CssClipPathMaker, tags: ['clip-path', 'polygon', 'css shape', 'mask'], isPopular: false, isNew: true },
  { id: 'css-units-converter', name: 'CSS Units Converter', description: 'Convert between px, rem, em, vh, and vw — set a base font size and viewport dimensions for accurate results.', category: 'css-html', subcategory: 'css-generators', icon: 'Ruler', path: '/tools/css-units-converter', component: CssUnitsConverter, tags: ['px', 'rem', 'em', 'vh', 'vw', 'units'], isPopular: false, isNew: true },

  // HTML Utilities
  { id: 'html-formatter-beautifier', name: 'HTML Formatter / Beautifier', description: 'Paste messy HTML and get it formatted with proper indentation, syntax highlighting, and consistent whitespace.', category: 'css-html', subcategory: 'html-utilities', icon: 'FileCode2', path: '/tools/html-formatter-beautifier', component: HtmlFormatterBeautifier, tags: ['html formatter', 'beautify', 'pretty print', 'indent'], isPopular: true, isNew: true },
  { id: 'html-to-markdown', name: 'HTML to Markdown Converter', description: 'Paste HTML and get clean Markdown output — converts headings, lists, links, images, bold, italic, and code.', category: 'css-html', subcategory: 'html-utilities', icon: 'FileText', path: '/tools/html-to-markdown', component: HtmlToMarkdown, tags: ['html to markdown', 'converter', 'markdown'], isPopular: false, isNew: true },

  // Design Generators
  { id: 'favicon-generator', name: 'Favicon Generator', description: 'Upload an SVG or PNG and generate all standard favicon sizes as a downloadable ZIP with the HTML link tags.', category: 'css-html', subcategory: 'design-generators', icon: 'Image', path: '/tools/favicon-generator', component: FaviconGenerator, tags: ['favicon', 'icon', 'sizes', 'zip', 'meta tags'], isPopular: true, isNew: true },
  { id: 'button-generator', name: 'CSS Button Generator', description: 'Visual CSS button builder — adjust padding, colors, borders, shadows, hover states, and copy ready-to-use CSS.', category: 'css-html', subcategory: 'design-generators', icon: 'MousePointerClick', path: '/tools/button-generator', component: ButtonGenerator, tags: ['button', 'css button', 'generator', 'hover'], isPopular: true, isNew: true },
  { id: 'glassmorphism-generator', name: 'Glassmorphism Generator', description: 'Create a frosted-glass CSS effect — adjust transparency, blur, and border to get a trendy glassmorphism card.', category: 'css-html', subcategory: 'design-generators', icon: 'Sparkles', path: '/tools/glassmorphism-generator', component: GlassmorphismGenerator, tags: ['glassmorphism', 'frosted glass', 'css', 'blur effect'], isPopular: false, isNew: true },
  { id: 'neumorphism-generator', name: 'Neumorphism Generator', description: 'Build soft UI shadow effects — adjust light/dark shadows, blur, and intensity for a neumorphic look.', category: 'css-html', subcategory: 'design-generators', icon: 'Circle', path: '/tools/neumorphism-generator', component: NeumorphismGenerator, tags: ['neumorphism', 'soft ui', 'css shadows', 'skeuomorphism'], isPopular: false, isNew: true },
  { id: 'css-variable-extractor', name: 'CSS Variable Extractor', description: 'Paste CSS and extract all custom properties (--var) into a clean list. Copy or download the variable declarations.', category: 'css-html', subcategory: 'design-generators', icon: 'Variable', path: '/tools/css-variable-extractor', component: CssVariableExtractor, tags: ['css variables', 'custom properties', 'extract', '--var'], isPopular: false, isNew: true },
]
