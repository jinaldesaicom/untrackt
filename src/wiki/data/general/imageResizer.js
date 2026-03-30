export default {
  id: 'image-resizer',
  title: 'Image Resizer',
  description: 'Resize images to exact pixel dimensions with an optional aspect-ratio lock, preset sizes, and multiple output formats — all in your browser.',
  content: {
    whatIs: {
      heading: 'What is the Image Resizer?',
      body: 'The Image Resizer is a browser-based tool that lets you change the width and height of any image to exact pixel dimensions. It supports an optional aspect-ratio lock so proportions are preserved automatically when you change one dimension. You can choose from common presets (HD, Full HD, QHD, icon sizes) or enter custom values, pick an output format (PNG, JPEG, or WebP), and adjust quality for lossy formats. All processing happens locally using the HTML Canvas API — no images are uploaded anywhere.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Resizing images to specific dimensions is a common need — preparing thumbnails, fitting platform requirements, scaling assets for different screen sizes, or simply making a photo smaller. Desktop software is overkill for a quick resize, and online services often add watermarks or require sign-ups. This tool gives you precise control over dimensions, aspect ratio, and output format with zero friction and full privacy.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Drag and drop an image onto the upload area, or click to select a file from your device.',
        'The original dimensions and file size are displayed automatically.',
        'Enter a custom width and height, or select a common preset from the dropdown.',
        'Toggle the lock icon between the width and height fields to preserve or unlock the aspect ratio.',
        'Choose an output format: PNG (lossless), JPEG, or WebP.',
        'For JPEG and WebP, adjust the quality slider to balance file size and visual fidelity.',
        'Click "Resize Image" to process the image.',
        'Preview the result and click "Download" to save the resized image.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Resize images to any custom width and height up to 10,000 pixels.',
        'Aspect-ratio lock that automatically adjusts the other dimension when you change one.',
        'Common size presets: 640×480, 800×600, 1024×768, HD (1280×720), Full HD (1920×1080), QHD (2560×1440), and icon sizes.',
        'Output format selection: PNG, JPEG, or WebP.',
        'Quality slider for JPEG and WebP formats.',
        'Live scale percentage indicator showing how the new size compares to the original.',
        'Real-time preview of the resized image with file size info.',
        'Drag-and-drop upload with visual feedback.',
        'Fully client-side processing — images never leave your browser.',
        'Checkerboard background in preview for transparent images.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Resizing photos to exact dimensions required by social media platforms.',
        'Creating thumbnails or icon-size images from larger originals.',
        'Scaling screenshots to fit documentation or presentation layouts.',
        'Preparing images for web pages with specific column widths.',
        'Downsizing camera photos for email attachments.',
        'Generating images at standard resolutions (HD, Full HD) for video projects.',
        'Batch-resizing a single image to multiple sizes by re-running with different settings.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Social media profile picture', description: 'Resize a portrait photo to 512×512 pixels with aspect ratio unlocked to fit the square format required by most social platforms.' },
        { title: 'Website hero image', description: 'Scale a 4000×3000 photo down to 1920×1080 with aspect ratio locked, outputting as WebP for fast page loads.' },
        { title: 'App icon generation', description: 'Take a logo image and resize to 256×256 PNG for use as an application icon.' },
        { title: 'Email-friendly photo', description: 'Reduce a 24 MP camera photo to 1280×720 JPEG at 80% quality, bringing the file size from 8 MB to under 200 KB.' },
        { title: 'Thumbnail grid', description: 'Resize product images to 300×300 for an e-commerce thumbnail grid, using the aspect-ratio lock to avoid distortion.' },
        { title: 'Presentation slides', description: 'Scale screenshots to 1024×768 to fit standard slide dimensions cleanly.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Aspect Ratio', definition: 'The proportional relationship between an image\'s width and height (e.g., 16:9, 4:3). Locking the aspect ratio ensures the image is scaled uniformly without distortion.' },
        { term: 'Resolution', definition: 'The total number of pixels in an image, expressed as width × height. Higher resolution means more detail but larger file sizes.' },
        { term: 'Downscaling', definition: 'Reducing an image\'s dimensions. Downscaling discards pixels using interpolation algorithms to maintain visual quality.' },
        { term: 'Upscaling', definition: 'Increasing an image\'s dimensions. Upscaling adds pixels through interpolation, which can introduce softness or blur since no new detail is created.' },
        { term: 'Interpolation', definition: 'The mathematical method used to calculate new pixel values when resizing. The tool uses high-quality bicubic-like interpolation via the Canvas API.' },
        { term: 'Lossless Format', definition: 'An image format like PNG that preserves every pixel exactly. File sizes are larger but no quality is lost.' },
        { term: 'Lossy Format', definition: 'An image format like JPEG or WebP that achieves smaller files by discarding some visual information. A quality slider controls the trade-off.' },
        { term: 'Canvas API', definition: 'A browser API that provides a drawing surface for rendering and manipulating images programmatically. This tool uses it to resize and export images entirely client-side.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are my images uploaded to a server?', answer: 'No. All resizing is performed locally in your browser using the Canvas API. Your images never leave your device.' },
        { question: 'Can I preserve the aspect ratio while resizing?', answer: 'Yes. Click the lock icon between the width and height fields. When locked, changing one dimension automatically adjusts the other to maintain the original proportions.' },
        { question: 'What happens if I unlock the aspect ratio?', answer: 'You can set width and height independently, which may stretch or squash the image if the proportions differ from the original.' },
        { question: 'What is the maximum image size I can resize?', answer: 'You can set dimensions up to 10,000×10,000 pixels. Very large images may be slow to process depending on your device.' },
        { question: 'Which output format should I choose?', answer: 'Use PNG for lossless quality or when you need transparency. Use JPEG for photographs where smaller file size matters. Use WebP for the best balance of quality and size with modern browser support.' },
        { question: 'Does the quality slider affect PNG?', answer: 'No. PNG is always lossless, so the quality slider is hidden when PNG is selected. It only applies to JPEG and WebP.' },
        { question: 'Can I resize the same image multiple times?', answer: 'Yes. After downloading, you can change the dimensions or format and click "Resize Image" again without re-uploading.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always resize from the highest quality original — avoid resizing an already-compressed or previously-resized image.',
        'Keep the aspect ratio locked unless you specifically need a non-proportional resize (e.g., square crop).',
        'Use presets for common sizes to save time and avoid typos in dimension inputs.',
        'Choose WebP for web use — it produces significantly smaller files than JPEG at comparable quality.',
        'Avoid upscaling beyond 150-200% of the original size, as the image will appear blurry.',
        'For icon or avatar use, resize to exact square dimensions (256×256, 512×512) with aspect ratio unlocked.',
        'Check the scale percentage indicator to understand how much the image is being resized relative to the original.',
        'Use the PNG format when your image has transparency that needs to be preserved.'
      ]
    }
  },
  relatedTools: ['image-compressor', 'image-converter', 'image-to-base64', 'aspect-ratio-calculator'],
  seo: {
    metaTitle: 'Image Resizer - Resize Images to Exact Dimensions | Wiki | UnTrackt',
    metaDescription: 'Resize images to exact pixel dimensions with aspect-ratio lock, common presets, and multiple output formats. Fully private, processed in your browser.',
    keywords: ['image resizer', 'resize image online', 'change image dimensions', 'scale image', 'aspect ratio lock', 'photo resizer', 'pixel dimensions', 'image scaling tool']
  }
}
