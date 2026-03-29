export default {
  id: 'image-to-base64',
  title: 'Image to Base64 Converter',
  description: 'Convert images to Base64-encoded data URLs for embedding directly in HTML, CSS, and JavaScript without separate file requests.',
  content: {
    whatIs: {
      heading: 'What is the Image to Base64 Converter?',
      body: 'The Image to Base64 Converter transforms image files (PNG, JPEG, GIF, WebP, SVG, ICO) into Base64-encoded strings and data URLs. This allows you to embed images directly in HTML, CSS, or JavaScript source code, eliminating the need for separate HTTP requests. The conversion happens entirely in your browser using the FileReader API--no images are uploaded to any server.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Embedding small images as data URLs reduces HTTP requests, which can improve page load performance for icons, logos, and small UI assets. It also simplifies deployment by bundling images directly into your code. This tool is especially useful for email templates (where external images may be blocked), single-file HTML documents, and CSS background images.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Drag and drop an image file onto the upload area, or click to select a file from your device.',
        'The tool automatically detects the image format and converts it to a Base64 string.',
        'View the generated data URL with the correct MIME type prefix (e.g., data:image/png;base64,...).',
        'Preview the embedded image to verify it renders correctly.',
        'Copy the full data URL for use in HTML <img> tags, CSS url(), or JavaScript.',
        'Optionally copy just the raw Base64 string without the data URL prefix.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Support for PNG, JPEG, GIF, WebP, SVG, ICO, and BMP image formats.',
        'Automatic MIME type detection for correct data URL formatting.',
        'Drag-and-drop or click-to-upload file input.',
        'Real-time image preview of the Base64-encoded result.',
        'Copy as full data URL or raw Base64 string.',
        'File size display showing original size and encoded size (Base64 adds ~33% overhead).',
        'Fully client-side processing--images never leave your browser.',
        'Output ready for HTML img src, CSS background-image url(), or JSON payloads.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Embedding small icons and logos directly in HTML to reduce HTTP requests.',
        'Including images in email templates where external image loading may be blocked.',
        'Creating self-contained single-file HTML documents or demos.',
        'Using CSS background images as data URLs for critical above-the-fold assets.',
        'Storing image data in JSON configuration files or database fields.',
        'Generating image payloads for API requests that expect Base64-encoded data.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Inline HTML image', description: '<img src="data:image/png;base64,iVBORw0KGgo..." /> -- embeds a PNG directly in HTML.' },
        { title: 'CSS background image', description: 'background-image: url("data:image/svg+xml;base64,PHN2Zy...") -- embeds an SVG as a CSS background.' },
        { title: 'Email template logo', description: 'Embed a company logo as Base64 in an HTML email to ensure it displays even when image loading is disabled.' },
        { title: 'Favicon as data URL', description: '<link rel="icon" href="data:image/x-icon;base64,AAAB..." /> -- embed a favicon directly in the HTML head.' },
        { title: 'JSON API payload', description: 'Send an image to an API endpoint as a Base64 string in a JSON body: { "avatar": "data:image/jpeg;base64,/9j/4AAQ..." }.' },
        { title: 'Markdown image embedding', description: 'In environments supporting HTML in Markdown, embed small diagrams directly without hosting files.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Base64', definition: 'A binary-to-text encoding scheme that represents binary data as an ASCII string using 64 characters (A-Z, a-z, 0-9, +, /).' },
        { term: 'Data URL', definition: 'A URI scheme (data:[MIME];base64,[data]) that embeds file content directly in a document, avoiding a separate network request.' },
        { term: 'MIME type', definition: 'A label (e.g., image/png, image/jpeg) identifying a file\'s format, included in the data URL to tell the browser how to decode the content.' },
        { term: 'FileReader API', definition: 'A browser API that reads files from the user\'s device asynchronously, used here to convert image files to Base64 strings.' },
        { term: 'Overhead', definition: 'Base64 encoding increases file size by approximately 33% because it represents 3 bytes of binary data as 4 ASCII characters.' },
        { term: 'Inline resource', definition: 'Any asset embedded directly in the HTML/CSS/JS source code rather than loaded via a separate URL.' },
        { term: 'Content Security Policy (CSP)', definition: 'A security header that can restrict data URLs. Some CSP configurations may block inline data: URIs for images.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the maximum image size I should convert?', answer: 'Base64 is best for small images (under 10-20 KB). Larger images should be served as regular files because the 33% Base64 overhead increases page size and negates the benefit of saved HTTP requests.' },
        { question: 'Does Base64 encoding compress the image?', answer: 'No. Base64 is an encoding, not compression. The image data remains the same size (plus 33% overhead). Compress images before converting.' },
        { question: 'Is my image uploaded to a server?', answer: 'No. The conversion uses the browser\'s FileReader API entirely client-side. Your image data never leaves your device.' },
        { question: 'Can I use Base64 images in CSS?', answer: 'Yes. Use url("data:image/png;base64,...") in CSS properties like background-image. This is common for small repeating patterns and icons.' },
        { question: 'Will Base64 images work in all browsers?', answer: 'Data URLs are supported in all modern browsers. Very old browsers (IE < 8) have limited support, but this is rarely a concern today.' },
        { question: 'Why is the Base64 string longer than the original file?', answer: 'Base64 encodes every 3 bytes into 4 characters, resulting in approximately 33% size increase. This is by design and is expected.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Only use Base64 for small images (icons, logos, small UI elements under 10 KB). Serve larger images as files.',
        'Optimize and compress images before converting to Base64 to minimize the encoded size.',
        'Use SVG data URLs for vector graphics--they are often smaller and scale perfectly.',
        'Be aware of Content Security Policy (CSP) settings that may block data: URIs on your site.',
        'For CSS, consider using Base64 only for critical above-the-fold assets; lazy-load the rest.',
        'When embedding in JSON, ensure the receiving API accepts Base64 payloads and has appropriate size limits.',
        'Prefer modern image formats like WebP before Base64 encoding to minimize payload size.',
        'Cache the generated data URL string rather than re-encoding the same image repeatedly.'
      ]
    }
  },
  relatedTools: ['qr-code-generator', 'aspect-ratio-calculator', 'color-palette-generator', 'json-to-csv-converter'],
  seo: {
    metaTitle: 'Image to Base64 Converter - Encode Images as Data URLs | Wiki | UnTrackt',
    metaDescription: 'Convert PNG, JPEG, SVG, and other images to Base64 data URLs for embedding in HTML, CSS, and JavaScript. Fully client-side--no uploads required.',
    keywords: ['image to base64', 'base64 encoder', 'data URL', 'inline image', 'embed image', 'base64 converter', 'PNG to base64', 'SVG data URL']
  }
};
