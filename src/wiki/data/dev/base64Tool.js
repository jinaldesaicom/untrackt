export default {
  id: 'base64-tool',
  title: 'Base64 Encoder & Decoder',
  description: 'Encode text or files to Base64 and decode Base64 strings back to their original format instantly in your browser.',
  content: {
    whatIs: {
      heading: 'What is the Base64 Encoder & Decoder?',
      body: 'The Base64 Encoder & Decoder is a client-side tool that converts text, binary data, or files to and from Base64 encoding. Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters (A-Z, a-z, 0-9, +, /). This tool is essential for developers who need to embed binary content in text-based formats like JSON, XML, HTML, CSS, or email headers without data corruption.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Base64 encoding is ubiquitous in web development -- from embedding images in CSS as data URIs, to encoding authentication credentials in HTTP headers, to transmitting binary attachments in email (MIME). Manually encoding and decoding Base64 is impractical and error-prone. This tool provides instant, accurate conversion with support for text, files, and URL-safe variants, all processed locally for maximum privacy.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the operation mode: Encode or Decode.',
        'Paste your plain text or Base64 string into the input field, or drag-and-drop a file.',
        'Choose encoding options if needed (standard Base64 or URL-safe Base64).',
        'Click "Convert" to process the input.',
        'Copy the output to your clipboard or download it as a file.',
        'For data URIs, toggle the "Include data URI prefix" option to prepend the appropriate MIME type header.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Encode plain text to Base64 and decode Base64 back to text.',
        'Support for file encoding -- convert images, PDFs, and other binary files to Base64.',
        'URL-safe Base64 variant (replaces + with - and / with _).',
        'Data URI generation with automatic MIME type detection for images.',
        'Real-time encoding and decoding as you type.',
        'Handles UTF-8, UTF-16, and other character encodings correctly.',
        'Client-side processing -- no data uploaded to any server.',
        'Output size indicator showing the Base64 overhead (approximately 33% larger than the original).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Embedding small images directly in HTML or CSS as data URIs to reduce HTTP requests.',
        'Encoding credentials for HTTP Basic Authentication headers.',
        'Decoding Base64-encoded API responses or webhook payloads.',
        'Preparing binary data for inclusion in JSON or XML documents.',
        'Encoding email attachments in MIME format.',
        'Converting SVG files to Base64 for inline embedding in stylesheets.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Encode Text', description: 'Input: "Hello, World!" → Output: "SGVsbG8sIFdvcmxkIQ==" -- a simple text-to-Base64 conversion.' },
        { title: 'Decode Credentials', description: 'Decode "dXNlcjpwYXNzd29yZA==" from an Authorization header to reveal "user:password".' },
        { title: 'Image to Data URI', description: 'Drop a small PNG icon onto the tool to generate a data:image/png;base64,... string for CSS embedding.' },
        { title: 'Decode JWT Payload', description: 'Extract and decode the Base64url-encoded payload section of a JWT token to inspect its claims.' },
        { title: 'Encode Binary Config', description: 'Convert a binary certificate file to Base64 for inclusion in a YAML configuration file.' },
        { title: 'URL-Safe Encoding', description: 'Encode a string using URL-safe Base64 to safely pass binary data in query parameters without percent-encoding.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Base64', definition: 'A binary-to-text encoding scheme that uses 64 ASCII characters to represent binary data, enabling safe transport over text-based protocols.' },
        { term: 'Encoding', definition: 'The process of converting data from one format to another -- in this case, binary or text to Base64 representation.' },
        { term: 'ASCII', definition: 'American Standard Code for Information Interchange -- a character encoding standard that Base64 output is composed of.' },
        { term: 'Binary Data', definition: 'Raw data represented as sequences of bytes (0s and 1s), such as images, executables, or compressed files.' },
        { term: 'MIME', definition: 'Multipurpose Internet Mail Extensions -- a standard that uses Base64 to encode binary attachments in email messages.' },
        { term: 'Data URI', definition: 'A URI scheme (data:[mediatype][;base64],data) that allows inline embedding of Base64-encoded content directly in HTML or CSS.' },
        { term: 'Padding', definition: 'The = characters appended to Base64 output to ensure the encoded string length is a multiple of 4 characters.' },
        { term: 'Base64url', definition: 'A URL-safe variant of Base64 that replaces + with - and / with _ to avoid conflicts with URL special characters.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is Base64 encryption?', answer: 'No. Base64 is an encoding scheme, not encryption. It does not provide any security -- anyone can decode a Base64 string. Never use Base64 alone to protect sensitive data.' },
        { question: 'Why is Base64 output larger than the input?', answer: 'Base64 encodes every 3 bytes of input into 4 ASCII characters, resulting in approximately 33% size overhead. This is the trade-off for safe text-based transmission.' },
        { question: 'Can I encode files?', answer: 'Yes. You can drag and drop files (images, PDFs, etc.) into the tool to encode them as Base64 strings.' },
        { question: 'What is URL-safe Base64?', answer: 'URL-safe Base64 replaces the + and / characters with - and _ respectively, making the output safe for use in URLs and filenames without additional encoding.' },
        { question: 'Is my data sent to a server?', answer: 'No. All encoding and decoding happens entirely in your browser using JavaScript. Your data remains on your device.' },
        { question: 'What character encodings are supported?', answer: 'The tool correctly handles UTF-8 text including multi-byte characters like emojis, accented letters, and CJK characters.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Only embed small files (under 10 KB) as Base64 data URIs -- larger files are better served as separate HTTP resources.',
        'Use URL-safe Base64 when encoding data for query parameters or URL path segments.',
        'Never rely on Base64 for security -- it is trivially reversible and provides no confidentiality.',
        'Strip unnecessary padding (=) characters when working with APIs that expect unpadded Base64.',
        'When decoding, ensure the input contains only valid Base64 characters to avoid silent data corruption.',
        'Use data URIs for critical above-the-fold icons in CSS to eliminate render-blocking requests.',
        'Remember that Base64 increases payload size by ~33% -- factor this into bandwidth calculations.'
      ]
    }
  },
  relatedTools: ['jwt-decoder', 'hash-generator', 'url-encoder-decoder', 'json-formatter', 'html-entity-encoder'],
  seo: {
    metaTitle: 'Base64 Encoder & Decoder - Encode and Decode Base64 Online | UnTrackt Wiki',
    metaDescription: 'Encode text and files to Base64 or decode Base64 strings instantly. Supports data URIs, URL-safe Base64, and file encoding -- all client-side for privacy.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 online', 'data uri generator', 'encode base64', 'decode base64', 'base64 image', 'url-safe base64']
  }
};
