export default {
  id: 'url-encoder-decoder',
  title: 'URL Encoder & Decoder',
  description: 'Encode and decode URLs and query parameters using percent-encoding (RFC 3986) for safe transmission in web requests.',
  content: {
    whatIs: {
      heading: 'What is the URL Encoder & Decoder?',
      body: 'The URL Encoder & Decoder converts between human-readable text and percent-encoded URL format as defined by RFC 3986. URLs can only contain a limited set of ASCII characters -- letters, digits, and a few special characters. All other characters (spaces, accented letters, symbols, Unicode) must be encoded as percent-encoded triplets (e.g., space → %20, é → %C3%A9). This tool encodes text for safe inclusion in URLs and decodes percent-encoded strings back to readable text.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Improperly encoded URLs are a common source of bugs in web applications -- broken links, failed API requests, and data corruption. Special characters in query parameters, path segments, or hash fragments must be percent-encoded to be transmitted correctly. This tool ensures proper RFC 3986 encoding and helps debug URL issues by decoding percent-encoded strings, revealing the original characters hidden behind %XX sequences.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the mode: Encode or Decode.',
        'Paste your text or URL into the input field.',
        'Choose encoding scope: encode full URL, encode component only, or encode specific characters.',
        'View the encoded or decoded result instantly.',
        'Copy the result to your clipboard with one click.',
        'Use the URL parser to break down a complete URL into its components (scheme, host, path, query, fragment).'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Encode text to percent-encoded URL format per RFC 3986.',
        'Decode percent-encoded URLs back to readable text.',
        'Separate modes for full URL encoding and component encoding (encodeURI vs encodeURIComponent).',
        'URL parser that breaks a URL into scheme, host, port, path, query, and fragment components.',
        'Query parameter builder and parser for constructing and deconstructing query strings.',
        'Support for UTF-8 Unicode character encoding.',
        'Real-time encoding/decoding as you type.',
        'Detect and highlight double-encoding issues.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Encoding query parameter values that contain special characters or spaces.',
        'Decoding percent-encoded URLs from log files, analytics, or API responses.',
        'Debugging broken URLs caused by missing or incorrect encoding.',
        'Encoding file names for use in download URLs.',
        'Constructing API request URLs with properly encoded parameters.',
        'Decoding tracking URLs and marketing campaign parameters.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Encode Space', description: 'Input: "hello world" → Encoded: "hello%20world" -- spaces are encoded as %20 per RFC 3986 (or + in form data).' },
        { title: 'Encode Query Value', description: 'Encode "price=100&currency=EUR" as a query value: "price%3D100%26currency%3DEUR" -- the = and & are encoded to avoid being interpreted as delimiters.' },
        { title: 'Decode Tracking URL', description: 'Decode "%2Fproducts%3Fcategory%3Dshoes%26color%3Dred" to reveal "/products?category=shoes&color=red".' },
        { title: 'Unicode Encoding', description: 'Encode "café" → "caf%C3%A9" -- the accented é is represented as the UTF-8 byte sequence %C3%A9.' },
        { title: 'URL Parsing', description: 'Break down "https://example.com:8080/api/v1?page=2&limit=10#results" into its constituent parts.' },
        { title: 'Fix Double Encoding', description: 'Detect that "%2520" is a double-encoded space (% was encoded as %25, then 20 remained), and decode both layers.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Percent-Encoding', definition: 'The mechanism for encoding characters in URLs by replacing them with a % followed by two hexadecimal digits representing the byte value.' },
        { term: 'URI', definition: 'Uniform Resource Identifier -- a string that identifies a resource. URLs are a subset of URIs that also specify how to locate the resource.' },
        { term: 'Query Parameter', definition: 'A key-value pair in the URL query string (after ?) used to pass data to the server: ?key=value&key2=value2.' },
        { term: 'RFC 3986', definition: 'The standard specification defining URI syntax, including which characters are allowed literally and which must be percent-encoded.' },
        { term: 'Reserved Characters', definition: 'Characters with special meaning in URLs (: / ? # [ ] @ ! $ & \' ( ) * + , ; =) that must be encoded when used as data.' },
        { term: 'Unreserved Characters', definition: 'Characters that do not need encoding in URLs: A-Z, a-z, 0-9, hyphen (-), period (.), underscore (_), and tilde (~).' },
        { term: 'encodeURIComponent', definition: 'A JavaScript function that encodes a URI component, encoding all characters except unreserved characters -- used for encoding query parameter values.' },
        { term: 'Double Encoding', definition: 'When an already-encoded character is encoded again (%20 becomes %2520), causing decoding issues. Must be avoided or detected and corrected.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between encodeURI and encodeURIComponent?', answer: 'encodeURI encodes a full URL, preserving characters like : / ? # that have structural meaning. encodeURIComponent encodes a single component (like a query value), encoding all special characters including : / ? #.' },
        { question: 'Should spaces be %20 or +?', answer: 'In URLs (RFC 3986), spaces should be %20. In HTML form data (application/x-www-form-urlencoded), spaces are represented as +. This tool uses %20 by default with an option for + encoding.' },
        { question: 'What is double encoding?', answer: 'When already-encoded text is encoded again: %20 (encoded space) becomes %2520. This breaks the URL because decoding once produces %20 instead of a space. This tool detects and warns about double encoding.' },
        { question: 'Can I encode non-ASCII characters?', answer: 'Yes. Non-ASCII characters are first converted to their UTF-8 byte representation, then each byte is percent-encoded. For example, é = %C3%A9.' },
        { question: 'Is my URL data sent to a server?', answer: 'No. All encoding and decoding happens entirely in your browser. No data is transmitted.' },
        { question: 'Why does my URL break with special characters?', answer: 'Characters like &, =, #, and ? have special meaning in URLs. When they appear in data (query values, path segments), they must be percent-encoded to avoid being interpreted as URL delimiters.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always encode query parameter values with encodeURIComponent -- never encode the entire URL with it.',
        'Use encodeURI for full URLs that already contain the correct structure (scheme, host, path).',
        'Be cautious of double encoding -- encode data once, at the point where it is inserted into the URL.',
        'Decode URLs from external sources before processing to avoid working with encoded data unnecessarily.',
        'Remember that + and %20 both represent spaces, but in different contexts (forms vs URLs).',
        'Test URLs with Unicode characters, ampersands, and equals signs to catch encoding issues early.',
        'Use the URL parser to verify that each component of a complex URL is correctly structured.'
      ]
    }
  },
  relatedTools: ['html-entity-encoder', 'base64-tool', 'json-formatter', 'http-status-lookup', 'regex-tester'],
  seo: {
    metaTitle: 'URL Encoder & Decoder - Percent-Encoding Tool Online | UnTrackt Wiki',
    metaDescription: 'Encode and decode URLs with percent-encoding per RFC 3986. Parse query parameters, fix double encoding, and debug URL issues -- all client-side.',
    keywords: ['url encoder', 'url decoder', 'percent encoding', 'encode url online', 'decode url', 'url parser', 'query string encoder', 'rfc 3986']
  }
};
