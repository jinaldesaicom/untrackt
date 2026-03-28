export default {
  id: 'hash-generator',
  title: 'Hash Generator',
  description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) from text or file input for integrity verification and checksums.',
  content: {
    whatIs: {
      heading: 'What is the Hash Generator?',
      body: 'The Hash Generator is a browser-based tool that computes cryptographic hash digests from text or file inputs. It supports multiple hashing algorithms including MD5, SHA-1, SHA-256, and SHA-512, producing fixed-length hexadecimal output regardless of input size. Hash functions are one-way mathematical operations -- you cannot reverse a hash to recover the original data. This makes them essential for data integrity verification, password storage concepts, digital signatures, and file deduplication.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Hashes are fundamental to software development and security. Whether you need to verify a downloaded file\'s integrity, understand how password hashing works, generate checksums for data comparison, or compute content-based identifiers, this tool provides instant hash generation across all major algorithms. All computation happens locally in your browser using the Web Crypto API and JavaScript, so your data remains private.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the hashing algorithm (MD5, SHA-1, SHA-256, SHA-384, or SHA-512).',
        'Enter your text in the input field or drag and drop a file.',
        'The hash is computed instantly and displayed in hexadecimal format.',
        'Toggle between hex and Base64 output formats as needed.',
        'Copy the hash digest to your clipboard with one click.',
        'Use the compare feature to paste an expected hash and verify it matches your computed result.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Support for MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms.',
        'Text and file input -- compute hashes for any content type.',
        'Real-time hashing as you type for text input.',
        'Output in hexadecimal or Base64 format.',
        'Hash comparison tool to verify a computed hash against an expected value.',
        'Uppercase and lowercase hex output toggle.',
        'Client-side computation using the Web Crypto API -- no data sent to servers.',
        'Multi-hash mode to compute all algorithms simultaneously for comparison.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Verifying the integrity of downloaded files by comparing checksums.',
        'Generating content-addressable identifiers for caching or deduplication.',
        'Computing hashes for Subresource Integrity (SRI) tags in HTML.',
        'Understanding hash algorithms for educational and learning purposes.',
        'Creating test data for security-related application features.',
        'Generating ETag values for HTTP caching strategies.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'SHA-256 Text Hash', description: 'Input "Hello, World!" and get the SHA-256 hash: dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f.' },
        { title: 'File Integrity Check', description: 'Drop a downloaded ISO file onto the tool and compare the SHA-256 hash with the one published on the download page.' },
        { title: 'MD5 Checksum', description: 'Compute the MD5 hash of a text string for legacy systems that still use MD5 for non-security purposes like cache keys.' },
        { title: 'SRI Hash Generation', description: 'Generate a SHA-384 hash in Base64 format to create a Subresource Integrity attribute for a CDN-hosted script tag.' },
        { title: 'Compare Two Hashes', description: 'Paste an expected SHA-256 hash and compute the hash of your data -- the tool highlights whether they match.' },
        { title: 'Multi-Algorithm Comparison', description: 'Compute MD5, SHA-1, and SHA-256 for the same input simultaneously to compare hash lengths and formats.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'MD5', definition: 'Message Digest 5 -- a 128-bit hash function. Once widely used but now considered cryptographically broken; still used for non-security checksums.' },
        { term: 'SHA-256', definition: 'Secure Hash Algorithm producing a 256-bit (32-byte) digest. Part of the SHA-2 family; widely used for data integrity and digital signatures.' },
        { term: 'SHA-512', definition: 'Secure Hash Algorithm producing a 512-bit (64-byte) digest. Offers higher security margins than SHA-256 for sensitive applications.' },
        { term: 'Checksum', definition: 'A fixed-size value computed from data used to detect accidental changes or corruption during storage or transmission.' },
        { term: 'HMAC', definition: 'Hash-based Message Authentication Code -- a mechanism that combines a hash function with a secret key to verify both integrity and authenticity.' },
        { term: 'Digest', definition: 'The output of a hash function -- a fixed-length string of characters that uniquely represents the input data.' },
        { term: 'Collision Resistance', definition: 'The property of a hash function that makes it computationally infeasible to find two different inputs that produce the same hash output.' },
        { term: 'One-Way Function', definition: 'A function that is easy to compute in one direction but computationally infeasible to reverse -- the defining property of cryptographic hash functions.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can I reverse a hash to get the original data?', answer: 'No. Cryptographic hash functions are one-way -- they are computationally infeasible to reverse. If you need to verify data, you hash the candidate and compare it to the expected hash.' },
        { question: 'Is MD5 still safe to use?', answer: 'MD5 is cryptographically broken and should not be used for security purposes. It is still acceptable for non-security uses like cache keys, file deduplication, or content identifiers where collision resistance is not critical.' },
        { question: 'Which algorithm should I use?', answer: 'For most purposes, SHA-256 is the recommended choice. It offers a good balance of security and performance. Use SHA-512 when higher security margins are required.' },
        { question: 'Why do identical inputs always produce the same hash?', answer: 'Hash functions are deterministic -- the same input always produces the same output. This is what makes them useful for integrity verification and data comparison.' },
        { question: 'Is my data sent to a server?', answer: 'No. All hash computation happens in your browser using the Web Crypto API and JavaScript. Your data never leaves your device.' },
        { question: 'What is the difference between hashing and encryption?', answer: 'Hashing is a one-way operation that produces a fixed-size output and cannot be reversed. Encryption is a two-way operation that uses a key to transform data and can be decrypted back to the original.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use SHA-256 or SHA-512 for security-sensitive applications -- avoid MD5 and SHA-1.',
        'Always compare hashes to verify downloaded file integrity, especially for security-critical software.',
        'Use HMAC when you need to authenticate messages -- a plain hash does not protect against tampering by someone who can modify both data and hash.',
        'Generate SRI hashes for all third-party scripts and stylesheets loaded from CDNs.',
        'Use constant-time comparison functions when comparing hashes in code to prevent timing attacks.',
        'Remember that hash output length is fixed regardless of input size -- SHA-256 always produces 64 hex characters.'
      ]
    }
  },
  relatedTools: ['base64-tool', 'uuid-generator', 'jwt-decoder', 'url-encoder-decoder', 'json-formatter'],
  seo: {
    metaTitle: 'Hash Generator - MD5, SHA-256, SHA-512 Hash Online | UnTrackt Wiki',
    metaDescription: 'Generate MD5, SHA-256, and SHA-512 hashes from text or files. Verify checksums, compute SRI hashes, and compare digests -- all client-side for privacy.',
    keywords: ['hash generator', 'sha256 hash', 'md5 hash', 'sha512 online', 'checksum generator', 'file hash', 'sha hash generator', 'crypto hash']
  }
};
