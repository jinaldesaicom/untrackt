export default {
  id: 'svg-optimizer',
  title: 'SVG Optimizer',
  description: 'Optimize and minify SVG files by removing unnecessary metadata, comments, and redundant attributes to reduce file size.',
  content: {
    whatIs: {
      heading: 'What is the SVG Optimizer?',
      body: 'The SVG Optimizer is a client-side tool that reduces the file size of SVG (Scalable Vector Graphics) files by removing unnecessary metadata, comments, editor-specific attributes, empty groups, default values, and redundant code. SVG files exported from design tools like Figma, Illustrator, and Inkscape often contain bloated XML that increases file size without affecting the visual appearance. This tool can reduce SVG file sizes by 20-60% while preserving the visual output, improving web page load times and performance.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'SVGs are essential for modern web design -- they scale perfectly at any resolution, can be styled with CSS, and are accessible. However, SVGs from design tools contain excessive metadata, hidden layers, editor namespaces, and verbose path data that bloat file sizes. Optimizing SVGs reduces bandwidth, improves page load times, and makes the code easier to read and maintain. This tool automates the optimization process without altering the visual appearance of your graphics.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your SVG code into the input editor or drag and drop an .svg file.',
        'Review the optimization options and toggle settings as needed.',
        'Click "Optimize" to process the SVG.',
        'View the before/after comparison with a visual preview and file size reduction meter.',
        'Copy the optimized SVG code or download it as a file.',
        'Fine-tune specific optimizations using the advanced settings panel.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Remove unnecessary metadata, comments, and editor namespaces.',
        'Minify SVG by removing whitespace, line breaks, and indentation.',
        'Optimize path data by reducing coordinate precision and removing redundant commands.',
        'Remove hidden elements, empty groups, and unused definitions.',
        'Convert shapes (rect, circle, ellipse) to equivalent <path> elements for smaller output.',
        'Clean up style attributes by removing default values.',
        'Visual before/after preview with file size comparison.',
        'Configurable optimization options with presets for different use cases.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Optimizing SVG icons and logos for web use to reduce page load times.',
        'Cleaning up SVGs exported from Figma, Illustrator, Sketch, or Inkscape.',
        'Preparing SVG sprites for icon systems with minimal file sizes.',
        'Optimizing inline SVGs in HTML to reduce document size.',
        'Converting verbose designer-exported SVGs to production-ready code.',
        'Reducing SVG animation file sizes for smoother web performance.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Figma Export Cleanup', description: 'Optimize a 15 KB SVG icon exported from Figma down to 3 KB by removing metadata, comments, and Figma-specific attributes.' },
        { title: 'Illustrator Namespace Removal', description: 'Strip Adobe Illustrator namespaces (xmlns:x, xmlns:i) and editor metadata to clean up exported artwork.' },
        { title: 'Path Data Optimization', description: 'Reduce path data precision from 6 decimal places to 2, shrinking complex path elements by 30-40% without visible difference.' },
        { title: 'Icon Sprite Optimization', description: 'Batch-optimize 50 SVG icons for an icon sprite, reducing total sprite size from 200 KB to 80 KB.' },
        { title: 'Inline SVG Cleanup', description: 'Optimize an inline SVG in HTML by removing width/height attributes and adding proper viewBox for responsive scaling.' },
        { title: 'Shape Conversion', description: 'Convert <rect>, <circle>, and <ellipse> elements to compact <path> equivalents, reducing the number of unique element types.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'SVG', definition: 'Scalable Vector Graphics -- an XML-based image format for two-dimensional graphics that scales perfectly at any resolution.' },
        { term: 'Vector Graphics', definition: 'Graphics defined by mathematical shapes (paths, curves, points) rather than pixels, enabling infinite scaling without quality loss.' },
        { term: 'Minification', definition: 'The process of removing whitespace, comments, and unnecessary characters from SVG code to reduce file size.' },
        { term: 'viewBox', definition: 'An SVG attribute that defines the coordinate system and aspect ratio, enabling responsive scaling: viewBox="x y width height".' },
        { term: 'Path Data', definition: 'The "d" attribute of an SVG <path> element containing commands (M, L, C, Z, etc.) that define the shape\'s outline.' },
        { term: 'Namespace', definition: 'XML namespace declarations (xmlns:...) in SVG files, often added by design tools and not needed for web rendering.' },
        { term: 'Metadata', definition: 'Non-visual information embedded in SVG files by design tools, including creator info, software version, and editing history.' },
        { term: 'SVG Sprite', definition: 'A technique of combining multiple SVG icons into a single file using <symbol> elements, referenced individually via <use> tags.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Will optimization change how my SVG looks?', answer: 'No. The optimizer only removes data that has no visual effect. The before/after preview lets you verify the SVG appears identical after optimization.' },
        { question: 'How much file size reduction can I expect?', answer: 'Typical reductions range from 20-60%, depending on the source. SVGs from design tools (Figma, Illustrator) often have the highest reduction potential due to embedded metadata.' },
        { question: 'Can I optimize SVGs with animations?', answer: 'Yes, but use caution with aggressive optimization settings. Animated SVGs may rely on specific attributes and element IDs that should not be removed.' },
        { question: 'Should I use this for production SVGs?', answer: 'Yes. SVG optimization should be part of your build pipeline for production websites. This tool lets you preview results before integrating into automated workflows.' },
        { question: 'Does optimization affect accessibility?', answer: 'By default, the tool preserves <title> and <desc> elements used for accessibility. You can configure whether to keep or remove these elements.' },
        { question: 'Is my SVG data sent to a server?', answer: 'No. All optimization happens in your browser using JavaScript. Your SVG files remain on your device.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always optimize SVGs before using them on the web -- design tool exports contain significant bloat.',
        'Use the visual preview to verify the optimized SVG looks identical to the original.',
        'Preserve viewBox attributes and remove fixed width/height for responsive SVGs.',
        'Keep <title> and <desc> elements for accessible SVGs used as meaningful images.',
        'Reduce path precision to 1-2 decimal places for icons -- the visual difference is imperceptible.',
        'Consider combining frequently used icons into an SVG sprite to reduce HTTP requests.',
        'Run optimization as part of your build pipeline using tools like SVGO for automated processing.',
        'Test optimized SVGs across browsers -- some optimizations may affect rendering in older browsers.'
      ]
    }
  },
  relatedTools: ['color-converter', 'css-gradient-generator', 'html-entity-encoder', 'base64-tool', 'text-diff-checker'],
  seo: {
    metaTitle: 'SVG Optimizer - Minify & Clean SVG Files Online | UnTrackt Wiki',
    metaDescription: 'Optimize SVG files by removing metadata, comments, and redundant code. Reduce file sizes by 20-60% while preserving visual quality -- all client-side.',
    keywords: ['svg optimizer', 'svg minifier', 'optimize svg', 'svg cleaner', 'reduce svg size', 'svg compression', 'svgo', 'svg minification']
  }
};
