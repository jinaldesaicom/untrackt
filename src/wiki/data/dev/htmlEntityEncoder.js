export default {
  id: 'html-entity-encoder',
  title: 'HTML Entity Encoder & Decoder',
  description: 'Encode special characters to HTML entities and decode HTML entities back to their original characters for safe web content.',
  content: {
    whatIs: {
      heading: 'What is the HTML Entity Encoder & Decoder?',
      body: 'The HTML Entity Encoder & Decoder converts special characters to their HTML entity equivalents and vice versa. Characters like <, >, &, ", and \' have special meaning in HTML and must be encoded as &lt;, &gt;, &amp;, &quot;, and &#39; to be displayed literally on a web page. This tool also handles named entities (&copy;, &mdash;, &nbsp;), numeric entities (&#169;), and hex entities (&#xA9;), making it essential for web developers who need to safely embed text content in HTML documents.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Failing to encode HTML special characters is one of the most common sources of cross-site scripting (XSS) vulnerabilities and rendering bugs in web applications. When user-generated content or data from external sources is inserted into HTML without proper encoding, it can break the page layout or -- worse -- execute malicious scripts. This tool helps you encode content safely and decode entity-encoded text back to readable form for debugging and content migration.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the mode: Encode or Decode.',
        'Paste your text or HTML into the input field.',
        'For encoding, choose between named entities (&amp;), decimal (&#38;), or hex (&#x26;) output format.',
        'Click "Convert" or view the real-time output as you type.',
        'Copy the encoded or decoded result to your clipboard.',
        'Use the "Encode All" option to encode every character, or "Encode Special Only" to encode just HTML-significant characters.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Encode special characters (<, >, &, ", \') to named HTML entities.',
        'Decode named, decimal, and hexadecimal HTML entities back to characters.',
        'Multiple encoding formats: named (&amp;), decimal (&#38;), hexadecimal (&#x26;).',
        'Option to encode all characters or only HTML-special characters.',
        'Real-time conversion as you type.',
        'Support for all named HTML entities including &copy;, &trade;, &mdash;, &nbsp;, and more.',
        'Bulk text processing for large documents.',
        'XSS prevention reference showing which characters must always be encoded.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Encoding user input before displaying it in HTML to prevent XSS attacks.',
        'Preparing code snippets for display on web pages without rendering as HTML.',
        'Decoding HTML entities in scraped web content for data processing.',
        'Converting special characters for email HTML templates.',
        'Encoding content for inclusion in XML and RSS feeds.',
        'Debugging rendering issues caused by unencoded or double-encoded entities.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Encode HTML Tags', description: 'Input: <script>alert("xss")</script> → Output: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; -- safely displayable on any web page.' },
        { title: 'Decode Entities', description: 'Input: &amp;lt;div&amp;gt; → Output: <div> -- convert entity-encoded text back to readable HTML.' },
        { title: 'Copyright Symbol', description: 'Encode © to &copy; (named), &#169; (decimal), or &#xA9; (hexadecimal) depending on your preferred format.' },
        { title: 'Code Display', description: 'Encode a JavaScript snippet so it displays as text on a web page instead of being executed by the browser.' },
        { title: 'Fix Double Encoding', description: 'Identify and correct double-encoded entities like &amp;amp; (which should be just &amp;).' },
        { title: 'Non-Breaking Space', description: 'Decode &nbsp; to see it is a non-breaking space character (U+00A0), often used for layout spacing.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'HTML Entity', definition: 'A string that begins with & and ends with ; representing a character that cannot or should not be used literally in HTML markup.' },
        { term: 'Character Reference', definition: 'A way to represent a Unicode character in HTML using either a named entity (&amp;), decimal (&#38;), or hexadecimal (&#x26;) notation.' },
        { term: 'Named Entity', definition: 'An HTML entity identified by a name, such as &amp; for &, &lt; for <, and &copy; for ©.' },
        { term: 'Numeric Entity', definition: 'An HTML entity identified by its Unicode code point number, either in decimal (&#169;) or hexadecimal (&#xA9;) form.' },
        { term: 'Ampersand Encoding', definition: 'The process of replacing the & character with &amp; to prevent it from being interpreted as the start of an entity reference.' },
        { term: 'XSS (Cross-Site Scripting)', definition: 'A security vulnerability where unencoded user input is rendered as HTML, allowing attackers to inject and execute malicious scripts.' },
        { term: 'Double Encoding', definition: 'When entities are encoded twice (e.g., &amp;amp; instead of &amp;), causing the entity text itself to display rather than the intended character.' },
        { term: 'Non-Breaking Space (&nbsp;)', definition: 'A space character that prevents line breaks at its position. Represented as &nbsp; in HTML and U+00A0 in Unicode.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which characters must always be encoded in HTML?', answer: 'The five critical characters are: < (&lt;), > (&gt;), & (&amp;), " (&quot;), and \' (&#39; or &apos;). These have special meaning in HTML syntax and must be encoded to avoid parsing issues and XSS vulnerabilities.' },
        { question: 'What is double encoding and how do I fix it?', answer: 'Double encoding occurs when already-encoded entities are encoded again (e.g., &amp; becomes &amp;amp;). Use this tool to decode once, verify the result, then re-encode if needed.' },
        { question: 'Should I use named or numeric entities?', answer: 'Named entities (&amp;) are more readable. Numeric entities (&#38;) work universally even if the name is not supported. Use named entities for common characters and numeric for obscure ones.' },
        { question: 'Does encoding prevent all XSS?', answer: 'HTML entity encoding prevents XSS when inserting content into HTML body text. However, different contexts (JavaScript, CSS, URLs, HTML attributes) require different encoding strategies.' },
        { question: 'Is my text sent to a server?', answer: 'No. All encoding and decoding happens entirely in your browser. Your text remains on your device.' },
        { question: 'What about encoding content in HTML attributes?', answer: 'Always encode quotes inside attribute values: use &quot; for double quotes and &#39; for single quotes. Also encode <, >, and & as usual.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always encode user-generated content before inserting it into HTML to prevent XSS vulnerabilities.',
        'Use your framework\'s built-in encoding (React JSX, Angular templates, etc.) rather than manual encoding when possible.',
        'Encode for the correct context -- HTML body, attributes, JavaScript, CSS, and URLs each require different encoding.',
        'Never double-encode -- if input is already encoded, decode it first before re-encoding.',
        'Use named entities for readability in hand-written HTML, and numeric entities for programmatic output.',
        'Test encoding with edge cases: nested quotes, angle brackets inside attributes, and Unicode characters.',
        'Remember that &nbsp; is not the same as a regular space -- it prevents line breaks and is non-collapsible.'
      ]
    }
  },
  relatedTools: ['url-encoder-decoder', 'base64-tool', 'json-formatter', 'markdown-previewer', 'text-diff-checker'],
  seo: {
    metaTitle: 'HTML Entity Encoder & Decoder - Encode Special Characters | UnTrackt Wiki',
    metaDescription: 'Encode HTML special characters to entities and decode entities back to text. Prevent XSS vulnerabilities and fix rendering issues -- all client-side.',
    keywords: ['html entity encoder', 'html entity decoder', 'encode html', 'html special characters', 'xss prevention', 'html entities', 'character encoding', 'html escape']
  }
};
