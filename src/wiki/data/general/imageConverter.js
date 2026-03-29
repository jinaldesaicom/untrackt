export default {
  id: 'image-converter',
  title: 'Image Converter',
  description: 'Convert images between PNG, JPEG, WebP, AVIF, and ICO formats with quality control and multi-size ICO generation.',
  content: {
    whatIs: {
      heading: 'What is the Image Converter?',
      body: 'The Image Converter transforms images between multiple formats--PNG, JPEG, WebP, AVIF, and ICO--entirely in your browser. It uses the HTML5 Canvas API to decode and re-encode images in the target format. For ICO output, it generates multi-size favicon bundles (16x16, 32x32, 48x48). No images are uploaded to any server; all conversion happens locally on your device.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Different contexts require different image formats. Websites benefit from WebP or AVIF for smaller file sizes, email clients prefer JPEG or PNG for broad compatibility, and favicons require the ICO format. Instead of opening desktop image editors for simple format changes, this tool handles conversions instantly in your browser with adjustable quality settings.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Drop an image file or click to select one from your device.',
        'Choose the target format from the dropdown: PNG, JPEG, WebP, AVIF, or ICO.',
        'For lossy formats (JPEG, WebP, AVIF), adjust the quality slider as needed.',
        'Click convert to process the image.',
        'Preview the converted result and check the output file size.',
        'Download the converted image in the new format.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Convert between PNG, JPEG, WebP, AVIF, and ICO formats.',
        'Adjustable quality slider for lossy formats (JPEG, WebP, AVIF).',
        'ICO output generates multi-size favicons (16x16, 32x32, 48x48) in a single file.',
        'Real-time preview of the converted image.',
        'File size comparison between original and converted output.',
        'Drag-and-drop or click-to-upload file input.',
        'Fully client-side processing--images never leave your browser.',
        'Automatic MIME type detection and correct file extension naming.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting PNG screenshots to JPEG or WebP for smaller file sizes on blogs and websites.',
        'Generating ICO favicons from PNG or JPEG logo files for website branding.',
        'Converting JPEG photos to WebP or AVIF for modern web performance optimization.',
        'Preparing images in a specific format required by a platform or CMS.',
        'Converting AVIF images to PNG or JPEG for compatibility with older software.',
        'Batch format changes when migrating website assets to modern image formats.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'PNG to WebP', description: 'Convert a 1.2 MB PNG infographic to WebP at 85% quality, reducing the file to 300 KB with negligible visual difference.' },
        { title: 'JPEG to AVIF', description: 'Convert a product photo from JPEG to AVIF for 30-50% smaller files, ideal for performance-focused e-commerce sites.' },
        { title: 'Logo to ICO favicon', description: 'Upload a PNG logo and generate a multi-size ICO file containing 16x16, 32x32, and 48x48 versions for use as a website favicon.' },
        { title: 'WebP to PNG', description: 'Convert a WebP image to PNG for compatibility with an image editor or platform that doesn\'t support WebP.' },
        { title: 'AVIF to JPEG', description: 'Convert an AVIF photo to JPEG for sharing via email or messaging apps that lack AVIF support.' },
        { title: 'Screenshot to JPEG', description: 'Convert a large PNG screenshot to JPEG at 80% quality for embedding in documentation or presentations.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'PNG', definition: 'Portable Network Graphics--a lossless format supporting transparency, ideal for graphics, logos, and screenshots.' },
        { term: 'JPEG', definition: 'Joint Photographic Experts Group--a lossy format optimized for photographs with millions of colors.' },
        { term: 'WebP', definition: 'A modern format by Google offering both lossy and lossless compression with smaller file sizes than JPEG and PNG.' },
        { term: 'AVIF', definition: 'AV1 Image File Format--a next-generation format offering excellent compression ratios, based on the AV1 video codec.' },
        { term: 'ICO', definition: 'A container format for icons on Windows and web favicons, typically containing multiple sizes of the same image.' },
        { term: 'Canvas API', definition: 'A browser API for drawing and manipulating images programmatically, used here to decode source images and encode them in the target format.' },
        { term: 'MIME Type', definition: 'A media type label (e.g., image/png, image/webp) that identifies the format of a file, used by browsers and servers to handle content correctly.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are my images uploaded to a server?', answer: 'No. All conversion is done locally in your browser using the Canvas API. Your images never leave your device.' },
        { question: 'Which format produces the smallest files?', answer: 'AVIF typically produces the smallest files, followed by WebP, then JPEG. PNG is lossless and usually produces the largest files for photographs.' },
        { question: 'Does converting between formats lose quality?', answer: 'Converting to a lossy format (JPEG, WebP, AVIF) involves some quality loss. Converting to PNG is lossless. You can control the trade-off with the quality slider.' },
        { question: 'Can I create favicons with this tool?', answer: 'Yes. Select ICO as the output format to generate a multi-size favicon file containing 16x16, 32x32, and 48x48 versions.' },
        { question: 'Is AVIF supported in all browsers?', answer: 'AVIF is supported in Chrome, Firefox, and Safari. Some older browsers lack support, so provide JPEG or WebP fallbacks when using AVIF on websites.' },
        { question: 'Can I convert animated GIFs?', answer: 'The Canvas API renders a single frame. Animated GIFs converted through this tool will produce a static image of the first frame.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use WebP or AVIF for web images to achieve the smallest file sizes with good quality.',
        'Keep PNG for graphics requiring transparency or pixel-perfect lossless quality.',
        'Use JPEG as a universal fallback when broad compatibility is needed.',
        'When generating ICO favicons, start with a square source image for best results across all sizes.',
        'Set quality to 80-90% for JPEG and WebP to balance file size and visual fidelity.',
        'Test AVIF images in target browsers before deploying, as support is not yet universal.',
        'Convert from the highest quality source available to avoid compounding quality loss.',
        'For website optimization, convert existing JPEG assets to WebP and serve with <picture> fallbacks.'
      ]
    }
  },
  relatedTools: ['image-compressor', 'image-to-base64', 'favicon-generator', 'aspect-ratio-calculator'],
  seo: {
    metaTitle: 'Image Converter - Convert PNG, JPEG, WebP, AVIF, ICO | Wiki | UnTrackt',
    metaDescription: 'Convert images between PNG, JPEG, WebP, AVIF, and ICO formats in your browser. Generate multi-size favicons. Fully private, no uploads.',
    keywords: ['image converter', 'convert image format', 'png to webp', 'jpeg to avif', 'ico generator', 'favicon converter', 'image format converter', 'browser image converter']
  }
}
