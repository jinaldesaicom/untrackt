export default {
  id: 'image-compressor',
  title: 'Image Compressor',
  description: 'Compress and optimize images in JPEG, PNG, or WebP format directly in your browser with adjustable quality and dimension controls.',
  content: {
    whatIs: {
      heading: 'What is the Image Compressor?',
      body: 'The Image Compressor is a browser-based tool that reduces image file sizes by adjusting quality settings and optionally resizing dimensions. It supports JPEG, PNG, and WebP output formats and uses the browser-image-compression library to process files entirely on your device. No images are uploaded to any server--compression happens locally, keeping your files private.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Large image files slow down websites, consume storage, and increase bandwidth costs. Manually optimizing images in desktop software is time-consuming. This tool lets you quickly compress one or more images with precise quality and size controls, producing optimized files ready for the web, email, or storage--all without installing any software or uploading to third-party services.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Drag and drop image files or click to select them from your device.',
        'Choose the output format: JPEG, PNG, or WebP.',
        'Adjust the quality slider to balance file size against visual fidelity.',
        'Optionally set maximum width and height to resize large images.',
        'Click compress and wait for the processing to complete.',
        'Preview the results and compare file sizes before and after compression.',
        'Download individual compressed images or all at once.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Support for JPEG, PNG, and WebP output formats.',
        'Adjustable quality slider for fine control over compression level.',
        'Optional maximum width and height settings for resizing.',
        'Before-and-after file size comparison showing savings.',
        'Batch processing of multiple images at once.',
        'Real-time preview of compressed output.',
        'Fully client-side processing--images never leave your browser.',
        'Download compressed images individually or in bulk.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Optimizing images for websites and blogs to improve page load speed.',
        'Reducing photo file sizes before emailing or uploading to cloud storage.',
        'Preparing images for social media platforms with file size limits.',
        'Batch compressing product photos for e-commerce listings.',
        'Reducing image sizes for mobile app assets.',
        'Compressing screenshots and diagrams for documentation.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Website hero image', description: 'Compress a 5 MB JPEG hero image to under 200 KB at 75% quality with a max width of 1920px for fast page loads.' },
        { title: 'Email attachments', description: 'Reduce a batch of 20 vacation photos from 80 MB total to 10 MB for easy email sharing.' },
        { title: 'WebP conversion', description: 'Convert PNG screenshots to WebP format, achieving 40-60% smaller files with similar visual quality.' },
        { title: 'Thumbnail generation', description: 'Set max dimensions to 300x300 and compress product images for e-commerce thumbnail grids.' },
        { title: 'Blog optimization', description: 'Compress article images to under 100 KB each, keeping total page weight low for mobile visitors.' },
        { title: 'Social media prep', description: 'Compress images to meet platform upload limits while preserving enough quality for display.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Lossy Compression', definition: 'A method that reduces file size by permanently removing some image data. JPEG and WebP use lossy compression--lower quality means smaller files but some detail loss.' },
        { term: 'Lossless Compression', definition: 'A method that reduces file size without losing any image data. PNG uses lossless compression--files are smaller but every pixel is preserved exactly.' },
        { term: 'Quality Setting', definition: 'A percentage (0-100) controlling the trade-off between file size and visual fidelity in lossy formats. 75-85% is typically a good balance for web use.' },
        { term: 'WebP', definition: 'A modern image format developed by Google that provides superior lossy and lossless compression compared to JPEG and PNG, with broad browser support.' },
        { term: 'Resolution', definition: 'The width and height of an image in pixels. Reducing resolution (downscaling) significantly decreases file size.' },
        { term: 'Compression Ratio', definition: 'The ratio of original file size to compressed file size. A 5:1 ratio means the compressed file is one-fifth the size of the original.' },
        { term: 'Artifact', definition: 'Visible distortion (blocking, banding, blurring) introduced by aggressive lossy compression, especially around edges and areas of high contrast.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are my images uploaded to a server?', answer: 'No. All compression happens locally in your browser using JavaScript. Your images never leave your device.' },
        { question: 'What quality setting should I use?', answer: 'For web images, 75-85% quality provides a good balance between file size and visual quality. For print or archival use, stay above 90%.' },
        { question: 'Which format gives the smallest file size?', answer: 'WebP generally produces the smallest files for both lossy and lossless compression. JPEG is best for photographs, and PNG is best when you need transparency or lossless quality.' },
        { question: 'Can I compress images without losing quality?', answer: 'PNG uses lossless compression, so quality is preserved. For JPEG and WebP, some quality loss occurs, but at 80%+ quality it is usually imperceptible.' },
        { question: 'Is there a file size limit?', answer: 'The tool processes images in your browser, so very large files (50 MB+) may be slow depending on your device. There is no hard limit.' },
        { question: 'Does compressing an already-compressed JPEG reduce quality?', answer: 'Yes. Re-compressing a lossy image introduces additional artifacts. Start from the highest quality source available for best results.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always compress from the highest quality original--avoid re-compressing already compressed files.',
        'Use WebP for web images when browser support allows; fall back to JPEG for broad compatibility.',
        'Set maximum dimensions appropriate for the display context--a 4000px image is unnecessary for a 800px column.',
        'Target 75-85% quality for most web use cases; the visual difference from 100% is usually imperceptible.',
        'Use PNG only when you need transparency or pixel-perfect lossless output.',
        'Test compressed images at their actual display size to verify quality is acceptable.',
        'For e-commerce, compress product thumbnails aggressively (60-70%) and keep full-size images at higher quality.',
        'Consider lazy loading optimized images on web pages for additional performance gains.'
      ]
    }
  },
  relatedTools: ['image-converter', 'image-to-base64', 'aspect-ratio-calculator', 'favicon-generator'],
  seo: {
    metaTitle: 'Image Compressor - Optimize Images in Your Browser | Wiki | UnTrackt',
    metaDescription: 'Compress JPEG, PNG, and WebP images directly in your browser with adjustable quality and dimension controls. Fully private, no uploads required.',
    keywords: ['image compressor', 'compress images', 'optimize images', 'reduce file size', 'jpeg compression', 'webp converter', 'image optimization', 'browser image compressor']
  }
}
