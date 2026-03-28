export default {
  id: 'qr-code-generator',
  title: 'QR Code Generator',
  description: 'Create customizable QR codes for URLs, text, Wi-Fi credentials, and more with adjustable size, error correction, and download options.',
  content: {
    whatIs: {
      heading: 'What is the QR Code Generator?',
      body: 'The QR Code Generator converts any text, URL, contact info, or Wi-Fi credentials into a scannable QR code image. QR (Quick Response) codes are two-dimensional barcodes that store data in a grid of black and white squares. This tool lets you customize size, error correction level, foreground and background colors, and then download the result as PNG or SVG for print or digital use.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'QR codes bridge the gap between physical and digital content. Whether you are adding a link to a business card, sharing Wi-Fi access at an event, or embedding a payment URL on a receipt, a reliable QR generator saves time and ensures scannability. This tool runs entirely in the browser so sensitive data like Wi-Fi passwords never leaves your device.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the data type: URL, plain text, Wi-Fi, vCard contact, email, or SMS.',
        'Enter the content you want to encode in the input field.',
        'Choose the error correction level (Low, Medium, Quartile, High) based on where the code will be used.',
        'Optionally customize foreground color, background color, and image size.',
        'Preview the QR code in real-time as you type.',
        'Download the QR code as PNG (raster) or SVG (vector) for print.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Support for multiple data types: URL, text, Wi-Fi (WPA/WEP/open), vCard, email, SMS, and phone.',
        'Four error correction levels (L/M/Q/H) to balance data density and damage tolerance.',
        'Custom foreground and background colors for brand-consistent QR codes.',
        'Real-time preview that updates as you type.',
        'Download as high-resolution PNG or scalable SVG.',
        'Adjustable module size and quiet zone (margin) for optimal scanning.',
        'Fully client-side generation -- no data sent to external servers.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Linking to a website or landing page from printed materials like flyers and posters.',
        'Sharing Wi-Fi network name and password at events, cafes, or offices.',
        'Encoding vCard contact info for quick business-card scanning.',
        'Adding QR codes to product packaging for manuals, warranties, or support pages.',
        'Restaurant menus that link to a digital menu or ordering system.',
        'Event tickets and boarding passes with embedded booking data.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'URL QR code', description: 'Encode "https://example.com/promo" as a QR code for a marketing flyer. Use Medium error correction for a good balance of size and resilience.' },
        { title: 'Wi-Fi QR code', description: 'Encode SSID "CafeGuest", password "welcome2024", and WPA2 encryption so guests can connect by scanning.' },
        { title: 'vCard contact', description: 'Embed your name, phone, email, and company into a QR code on the back of a business card.' },
        { title: 'SMS shortcode', description: 'Generate a QR code that pre-fills an SMS to a number with a message, e.g., "Text JOIN to 55555".' },
        { title: 'Custom-colored QR code', description: 'Create a brand-colored QR code with a dark-blue foreground (#1E3A5F) on a light-gray background (#F5F5F5) for a corporate brochure.' },
        { title: 'High error-correction QR code', description: 'Use the High (H) level for a QR code printed on a product label expected to undergo wear, allowing up to 30% damage recovery.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'QR Code', definition: 'A two-dimensional matrix barcode that stores information in a pattern of black and white modules arranged in a square grid.' },
        { term: 'Error correction level', definition: 'The degree to which a QR code can be read even if partially damaged. Levels range from Low (7% recovery) to High (30% recovery).' },
        { term: 'Module', definition: 'A single square unit (black or white) in a QR code grid. The number of modules determines the code version and data capacity.' },
        { term: 'Quiet zone', definition: 'The blank margin surrounding a QR code that scanners need to detect the code boundary. Minimum recommended is 4 modules wide.' },
        { term: 'Version', definition: 'QR codes range from Version 1 (21×21 modules) to Version 40 (177×177 modules). Higher versions store more data.' },
        { term: 'Encoding mode', definition: 'QR codes support numeric, alphanumeric, byte, and Kanji modes, each optimizing storage for different character sets.' },
        { term: 'Finder pattern', definition: 'The three large squares in the corners of a QR code used by scanners to detect the code orientation and boundaries.' },
        { term: 'Data URL', definition: 'A URI scheme that embeds the QR code image directly in HTML/CSS as a base64-encoded string, avoiding a separate file request.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How much data can a QR code hold?', answer: 'A Version 40 QR code with Low error correction can store up to 7,089 numeric characters or 4,296 alphanumeric characters. For most URLs and short text, lower versions are sufficient.' },
        { question: 'Which error correction level should I use?', answer: 'Use Low (L) for digital screens where damage is unlikely. Use Medium (M) for general printing. Use High (H) for outdoor signage or labels subject to wear.' },
        { question: 'Can I add a logo to the QR code?', answer: 'Placing a logo over the center of a QR code is possible if you use a high error correction level (Q or H) to compensate for the obscured modules.' },
        { question: 'What is the minimum print size?', answer: 'Each module should be at least 0.75 mm for reliable scanning. A typical Version 3 QR code should be printed at a minimum of about 2 cm × 2 cm.' },
        { question: 'Do QR codes expire?', answer: 'Static QR codes never expire--the data is encoded directly. Dynamic QR codes (which redirect through a service) can expire if the redirect service is discontinued.' },
        { question: 'Is my data secure when generating a QR code?', answer: 'Yes. This tool generates QR codes entirely in your browser. Your data is never sent to a server.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always test your QR code with at least two different scanner apps before printing.',
        'Maintain sufficient quiet zone (margin) around the QR code for reliable scanning.',
        'Use high contrast between foreground and background colors--dark on light works best.',
        'Choose SVG format for print materials to ensure crisp output at any size.',
        'Keep encoded data as short as possible to reduce QR code complexity and improve scan speed.',
        'Use URL shorteners if the target URL is very long, but ensure the shortener is reliable and permanent.',
        'For outdoor or high-wear environments, select the High error correction level.',
        'Include a brief call-to-action near the QR code (e.g., "Scan for menu") so users know what to expect.'
      ]
    }
  },
  relatedTools: ['password-generator', 'image-to-base64', 'meta-tag-generator', 'text-to-slug'],
  seo: {
    metaTitle: 'QR Code Generator - Create Custom QR Codes Online | Wiki | UnTrackt',
    metaDescription: 'Generate customizable QR codes for URLs, Wi-Fi, contacts, and more. Adjust error correction, colors, and size. Download as PNG or SVG--fully client-side.',
    keywords: ['QR code generator', 'create QR code', 'QR code maker', 'custom QR code', 'Wi-Fi QR code', 'vCard QR code', 'error correction', 'SVG QR code']
  }
};
