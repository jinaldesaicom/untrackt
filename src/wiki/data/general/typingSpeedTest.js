export default {
  id: 'typing-speed-test',
  title: 'Typing Speed Test',
  description: 'Measure your typing speed in WPM and CPM with accuracy tracking, real-time feedback, and practice modes to improve your keyboard skills.',
  content: {
    whatIs: {
      heading: 'What is the Typing Speed Test?',
      body: 'The Typing Speed Test measures how fast and accurately you can type by presenting a passage of text for you to reproduce. It tracks words per minute (WPM), characters per minute (CPM), accuracy percentage, and error count in real-time as you type. After completing a test, you receive a detailed breakdown of your performance with historical tracking to monitor improvement over time.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Typing speed directly impacts productivity for anyone who works with a keyboard. Whether you are a programmer, writer, student, or data entry professional, faster and more accurate typing saves hours over time. Regular practice with measurable feedback is the most effective way to improve, and this tool provides exactly that--right in your browser.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a test duration (30 seconds, 1 minute, 2 minutes, or 5 minutes).',
        'Optionally choose a difficulty level or text category (common words, quotes, code snippets).',
        'Click the text area and begin typing--the timer starts automatically on first keypress.',
        'Watch the real-time WPM, CPM, and accuracy stats update as you type.',
        'Correct errors with backspace or continue typing--both approaches affect your final score differently.',
        'View your results summary when the timer expires, including WPM, accuracy, and error details.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Real-time WPM and CPM calculation updating live as you type.',
        'Accuracy tracking with per-character error highlighting.',
        'Multiple test durations: 30 seconds, 1 minute, 2 minutes, 5 minutes.',
        'Difficulty levels with different word sets: easy (common words), medium (varied vocabulary), hard (technical/code).',
        'Color-coded feedback: green for correct characters, red for errors, gray for upcoming text.',
        'Historical performance tracking stored in localStorage to chart improvement.',
        'Auto-start on first keypress with no need to click a separate button.',
        'Keyboard heatmap showing which keys are most error-prone.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Developers practicing typing code snippets to improve programming speed.',
        'Students preparing for standardized typing tests or certification exams.',
        'Data entry professionals benchmarking and improving their input speed.',
        'Writers and journalists aiming to type articles faster without sacrificing accuracy.',
        'Remote workers optimizing typing efficiency for chat and email communication.',
        'Gamers improving keyboard responsiveness for competitive play.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Beginner test (30 seconds)', description: 'A new typist scores 25 WPM at 92% accuracy on common English words. The result highlights frequent errors on "th" combinations.' },
        { title: 'Intermediate 1-minute test', description: 'An office worker scores 55 WPM at 97% accuracy, showing consistent improvement from 45 WPM a month ago.' },
        { title: 'Advanced code typing test', description: 'A developer types a JavaScript code snippet at 70 WPM with 95% accuracy, noting errors on curly braces and semicolons.' },
        { title: '5-minute endurance test', description: 'A sustained test reveals that WPM drops from 65 to 52 after 3 minutes, identifying fatigue as a factor to address.' },
        { title: 'Error analysis', description: 'The keyboard heatmap shows "q" and "z" are the most error-prone keys, suggesting targeted practice drills.' },
        { title: 'Progress tracking', description: 'A student\'s weekly history chart shows improvement from 30 WPM to 50 WPM over two months of daily practice.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'WPM (Words Per Minute)', definition: 'A standard measure of typing speed where one "word" is defined as 5 characters (including spaces), regardless of actual word length.' },
        { term: 'CPM (Characters Per Minute)', definition: 'The number of individual characters typed per minute, providing a more granular speed measurement than WPM.' },
        { term: 'Accuracy', definition: 'The percentage of characters typed correctly out of the total characters attempted. Calculated as (correct / total) × 100.' },
        { term: 'Gross WPM', definition: 'Total words typed per minute before accounting for errors. Gross WPM measures raw speed.' },
        { term: 'Net WPM', definition: 'Gross WPM minus penalties for errors. Net WPM reflects effective typing speed accounting for mistakes.' },
        { term: 'Touch typing', definition: 'Typing without looking at the keyboard, using muscle memory to locate keys by feel, relying on the home row position.' },
        { term: 'Home row', definition: 'The middle row of the keyboard (ASDF JKL;) where fingers rest in the standard touch-typing position.' },
        { term: 'Keyboard heatmap', definition: 'A visual representation showing which keys are pressed most often or produce the most errors during a typing test.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a good typing speed?', answer: 'The average adult types 40-45 WPM. 60+ WPM is considered proficient. Professional typists often exceed 80 WPM. Top-tier typists reach 120+ WPM.' },
        { question: 'How is WPM calculated?', answer: 'WPM = (total characters typed / 5) / minutes elapsed. The standard "word" is defined as 5 characters including spaces.' },
        { question: 'Should I correct errors or keep typing?', answer: 'For accuracy-focused practice, correct errors with backspace. For speed-focused tests, keep typing--both approaches are valid and affect scores differently.' },
        { question: 'How often should I practice?', answer: 'Daily practice of 10-15 minutes is more effective than infrequent long sessions. Consistency builds muscle memory faster.' },
        { question: 'Does the test work on mobile devices?', answer: 'While the test functions on mobile, it is designed for physical keyboards. Mobile typing uses different skills and benchmark ranges.' },
        { question: 'What is the difference between gross and net WPM?', answer: 'Gross WPM counts all characters typed; net WPM subtracts a penalty for each uncorrected error, giving a more realistic speed measure.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Practice touch typing with proper finger placement on the home row (ASDF JKL;).',
        'Focus on accuracy first--speed will follow naturally as muscle memory develops.',
        'Take the test daily for 10-15 minutes and track your progress over weeks.',
        'Use the error heatmap to identify weak keys and practice them specifically.',
        'Start with shorter test durations (30 seconds) and increase as your endurance improves.',
        'Maintain good posture and ergonomic keyboard positioning to prevent strain.',
        'Try different text categories (prose, code, quotes) to develop versatile typing skills.',
        'Avoid looking at the keyboard during tests--build trust in your muscle memory.'
      ]
    }
  },
  relatedTools: ['word-frequency-counter', 'countdown-timer', 'case-converter', 'binary-text-converter'],
  seo: {
    metaTitle: 'Typing Speed Test - Measure WPM, CPM & Accuracy | Wiki | UnTrackt',
    metaDescription: 'Test your typing speed with real-time WPM, CPM, and accuracy tracking. Multiple durations, difficulty levels, and progress history to improve your skills.',
    keywords: ['typing speed test', 'WPM test', 'typing practice', 'words per minute', 'typing accuracy', 'keyboard speed', 'touch typing', 'typing improvement']
  }
};
