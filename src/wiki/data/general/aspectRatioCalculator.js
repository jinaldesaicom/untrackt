export default {
  id: 'aspect-ratio-calculator',
  title: 'Aspect Ratio Calculator',
  description: 'Calculate and convert aspect ratios for images, videos, and responsive design with instant width/height scaling and common preset ratios.',
  content: {
    whatIs: {
      heading: 'What is the Aspect Ratio Calculator?',
      body: 'The Aspect Ratio Calculator determines the proportional relationship between the width and height of an image, video, or screen. Enter any two dimensions and the tool calculates the aspect ratio, or enter a ratio and one dimension to find the missing value. It supports common presets like 16:9, 4:3, 1:1, and 21:9, making it easy to resize content while preserving proportions.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Maintaining the correct aspect ratio prevents images and videos from appearing stretched or cropped unexpectedly. Whether you are resizing photos for social media, setting up a video export, or building responsive CSS layouts, this tool ensures your dimensions are mathematically correct every time.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the original width and height to calculate the aspect ratio.',
        'Or select a common preset ratio (16:9, 4:3, 1:1, 9:16, 21:9, 3:2).',
        'Enter either a new width or new height and the tool calculates the other dimension.',
        'View the simplified ratio (e.g., 1920×1080 → 16:9) and decimal value (1.778).',
        'Copy the calculated dimensions or ratio for use in your project.',
        'Toggle between landscape and portrait orientation as needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic ratio simplification using greatest common divisor (GCD) algorithm.',
        'Common presets for 16:9, 4:3, 1:1, 9:16, 21:9, 3:2, and custom ratios.',
        'Bidirectional calculation: enter width to get height, or height to get width.',
        'Decimal ratio display alongside the simplified integer ratio.',
        'Visual preview box that dynamically adjusts to show the proportions.',
        'Orientation toggle between landscape and portrait modes.',
        'Social media dimension presets for Instagram, YouTube, Twitter, Facebook, and LinkedIn.',
        'CSS aspect-ratio property output for modern responsive layouts.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Resizing images for social media platforms that require specific dimensions.',
        'Calculating video export dimensions for YouTube (16:9), Instagram Reels (9:16), or cinema (21:9).',
        'Setting responsive image containers in CSS using the aspect-ratio property.',
        'Scaling photographs for print at standard frame sizes (5×7, 8×10, 11×14).',
        'Ensuring banner ads meet IAB standard dimensions without distortion.',
        'Determining monitor or projector resolution ratios for presentations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '1920×1080 → 16:9', description: 'A standard Full HD resolution simplifies to 16:9 (decimal 1.778). Scaling to 1280 width gives a height of 720.' },
        { title: 'Instagram square post', description: '1:1 ratio at 1080×1080 pixels. Enter width 1080 with 1:1 preset to confirm height is 1080.' },
        { title: 'YouTube thumbnail', description: '16:9 ratio at 1280×720. Enter the 16:9 preset and width 1280 to calculate height 720 automatically.' },
        { title: 'iPhone screenshot (9:16)', description: 'A 1170×2532 screenshot has a ratio of approximately 9:19.5. The tool shows the exact simplified ratio.' },
        { title: 'Print photo 8×10', description: 'An 8:10 ratio simplifies to 4:5. Scaling to 2400px width gives 3000px height for high-resolution print.' },
        { title: 'Ultrawide monitor (21:9)', description: '3440×1440 resolution. Enter dimensions and confirm the 21:9 (simplified 43:18) ultrawide aspect ratio.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Aspect ratio', definition: 'The proportional relationship between width and height, expressed as two numbers separated by a colon (e.g., 16:9).' },
        { term: 'GCD (Greatest Common Divisor)', definition: 'The largest number that divides both width and height evenly, used to simplify a ratio to its smallest terms.' },
        { term: 'Letterboxing', definition: 'Black bars added to the top and bottom of a video when displayed in a wider aspect ratio than the content.' },
        { term: 'Pillarboxing', definition: 'Black bars added to the left and right sides when content is narrower than the display aspect ratio.' },
        { term: 'Resolution', definition: 'The total number of pixels in each dimension (e.g., 1920×1080), which determines both size and aspect ratio.' },
        { term: 'Responsive design', definition: 'A web design approach where layouts adapt to different screen sizes while maintaining correct proportions.' },
        { term: 'CSS aspect-ratio', definition: 'A modern CSS property (aspect-ratio: 16/9) that sets a preferred aspect ratio for an element, replacing the padding-top hack.' },
        { term: 'Crop factor', definition: 'The ratio of a camera sensor size to a full-frame sensor, affecting the effective field of view and image proportions.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What aspect ratio is best for YouTube videos?', answer: '16:9 is the standard for YouTube. Upload at 1920×1080 (1080p) or 3840×2160 (4K) for best quality.' },
        { question: 'How do I calculate aspect ratio from pixel dimensions?', answer: 'Divide both the width and height by their greatest common divisor (GCD). For example, 1920÷120 = 16 and 1080÷120 = 9, giving 16:9.' },
        { question: 'What is the difference between 4:3 and 16:9?', answer: '4:3 is a more square, traditional TV shape. 16:9 is wider and is the modern standard for monitors, TVs, and video content.' },
        { question: 'Can I use custom ratios?', answer: 'Yes. Enter any custom ratio like 2.35:1 (CinemaScope) or an arbitrary ratio and the tool will calculate corresponding dimensions.' },
        { question: 'What ratio should I use for Instagram?', answer: 'Instagram supports 1:1 (square), 4:5 (portrait), and 1.91:1 (landscape). 4:5 portrait posts tend to get the most engagement.' },
        { question: 'Does this tool handle non-standard ratios?', answer: 'Yes. Enter any width and height and the tool simplifies the ratio, even for uncommon proportions like 1170×2532.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always maintain the original aspect ratio when resizing to prevent distortion.',
        'Use the CSS aspect-ratio property instead of the padding-top hack for modern browsers.',
        'For social media, check each platform\'s current recommended dimensions--they change periodically.',
        'When cropping photos, choose a standard aspect ratio (4:5, 3:2, 16:9) compatible with common frame sizes.',
        'Test responsive images at multiple breakpoints to ensure the aspect ratio holds across devices.',
        'For video, match your export ratio to the platform (16:9 for YouTube, 9:16 for TikTok/Reels).',
        'Use the visual preview to quickly compare different ratios side-by-side before committing to a design.'
      ]
    }
  },
  relatedTools: ['color-palette-generator', 'image-to-base64', 'qr-code-generator', 'meta-tag-generator'],
  seo: {
    metaTitle: 'Aspect Ratio Calculator - Resize Images & Videos Proportionally | Wiki | UnTrackt',
    metaDescription: 'Calculate and convert aspect ratios for images, videos, and responsive design. Common presets for 16:9, 4:3, 1:1, and more with instant dimension scaling.',
    keywords: ['aspect ratio calculator', 'image ratio', 'video aspect ratio', '16:9', '4:3', 'resize image', 'responsive design', 'CSS aspect-ratio', 'social media dimensions']
  }
};
