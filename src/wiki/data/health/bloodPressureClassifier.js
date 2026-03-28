export default {
  id: 'blood-pressure-classifier',
  title: 'Blood Pressure Classifier',
  description: 'Classify your blood pressure reading according to AHA/ACC guidelines and understand what your systolic and diastolic numbers mean.',
  content: {
    whatIs: {
      heading: 'What is the Blood Pressure Classifier?',
      body: 'The Blood Pressure Classifier takes your systolic (top number) and diastolic (bottom number) blood pressure readings and categorizes them according to the American Heart Association (AHA) and American College of Cardiology (ACC) guidelines: Normal, Elevated, Hypertension Stage 1, Hypertension Stage 2, or Hypertensive Crisis. It provides educational context about what each category means. This tool is for informational purposes only--it does not diagnose or treat any condition. Always consult a healthcare professional for medical evaluation and treatment of blood pressure concerns.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'High blood pressure (hypertension) is often called the "silent killer" because it rarely produces symptoms until serious damage occurs. Understanding where your readings fall on the clinical scale helps you recognize early warning signs and motivates proactive lifestyle changes or timely medical follow-up.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your systolic blood pressure (the top number, in mmHg).',
        'Enter your diastolic blood pressure (the bottom number, in mmHg).',
        'Click "Classify" to see your blood pressure category.',
        'Review the educational notes about your category and recommended actions.',
        'Log readings over time to track trends.',
        'Share concerning results with your healthcare provider.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Classification based on current AHA/ACC 2017 guidelines.',
        'Color-coded categories from normal (green) to hypertensive crisis (red).',
        'Educational context for each category explaining health implications.',
        'Actionable recommendations (lifestyle changes, medical consultation) per category.',
        'Supports tracking multiple readings for trend awareness.',
        'Fully client-side--your health data remains on your device.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Quickly classifying a home blood pressure reading after using a personal monitor.',
        'Understanding what "130/85" or "145/92" means relative to clinical guidelines.',
        'Health education classes teaching students about cardiovascular risk factors.',
        'Wellness program participants tracking BP alongside other health metrics.',
        'Pre-screening before a doctor visit to prepare informed questions.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '118/76 mmHg', description: 'Category: Normal. Both systolic (<120) and diastolic (<80) are within the healthy range. Continue healthy habits.' },
        { title: '126/78 mmHg', description: 'Category: Elevated. Systolic is 120-129 and diastolic is under 80. Lifestyle modifications recommended to prevent progression.' },
        { title: '134/86 mmHg', description: 'Category: Hypertension Stage 1 (systolic 130-139 or diastolic 80-89). Lifestyle changes and possibly medication depending on cardiovascular risk.' },
        { title: '152/98 mmHg', description: 'Category: Hypertension Stage 2 (systolic ≥140 or diastolic ≥90). Medical consultation and likely medication are recommended.' },
        { title: '182/118 mmHg', description: 'Category: Hypertensive Crisis (systolic >180 and/or diastolic >120). Seek emergency medical attention immediately.' },
        { title: 'Isolated systolic hypertension', description: '148/72 mmHg -- systolic is Stage 2 while diastolic is normal. Classification uses the higher category (Stage 2). Common in older adults due to arterial stiffness.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Systolic Pressure', definition: 'The top number in a blood pressure reading, representing the force on artery walls when the heart beats (contracts).' },
        { term: 'Diastolic Pressure', definition: 'The bottom number, representing the force on artery walls when the heart rests between beats.' },
        { term: 'Hypertension', definition: 'Chronically elevated blood pressure (≥130/80 mmHg per AHA guidelines), a major risk factor for heart attack, stroke, and kidney disease.' },
        { term: 'Hypotension', definition: 'Abnormally low blood pressure (typically <90/60 mmHg), which can cause dizziness, fainting, and inadequate organ perfusion.' },
        { term: 'mmHg', definition: 'Millimeters of mercury--the standard unit of measurement for blood pressure.' },
        { term: 'White Coat Hypertension', definition: 'Elevated blood pressure that occurs in a clinical setting due to anxiety but is normal at home.' },
        { term: 'Ambulatory Blood Pressure Monitoring', definition: 'A 24-hour test using a portable device that records blood pressure at regular intervals during daily activities and sleep.' },
        { term: 'Pulse Pressure', definition: 'The difference between systolic and diastolic pressure. A wide pulse pressure (>60 mmHg) may indicate arterial stiffness.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is a normal blood pressure?', answer: 'According to AHA guidelines, normal blood pressure is below 120/80 mmHg. Readings above this may be classified as elevated or hypertensive.' },
        { question: 'Should I worry about one high reading?', answer: 'A single elevated reading does not necessarily mean you have hypertension. Blood pressure fluctuates throughout the day. Take multiple readings over several days and consult your doctor if consistently elevated.' },
        { question: 'When should I seek emergency care?', answer: 'If your reading exceeds 180/120 mmHg--especially with symptoms like chest pain, shortness of breath, vision changes, or severe headache--seek emergency medical attention immediately.' },
        { question: 'Can lifestyle changes lower blood pressure?', answer: 'Yes. The DASH diet, regular exercise, reducing sodium, maintaining a healthy weight, limiting alcohol, and managing stress can significantly lower blood pressure.' },
        { question: 'Is this tool a medical diagnosis?', answer: 'Absolutely not. This tool classifies readings for educational purposes based on published clinical guidelines. Only a qualified healthcare provider can diagnose and treat hypertension.' },
        { question: 'How often should I check my blood pressure?', answer: 'The AHA recommends that adults with normal blood pressure check at least once a year. Those with elevated readings or hypertension should monitor more frequently per their doctor\'s guidance.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Sit quietly for 5 minutes before taking a reading--do not measure immediately after exercise or caffeine.',
        'Use a validated upper-arm cuff monitor rather than wrist devices for more reliable readings.',
        'Take two readings 1-2 minutes apart and record the average.',
        'Measure at the same time each day for consistent trend tracking.',
        'Avoid caffeine, exercise, and smoking for 30 minutes before measuring.',
        'Keep a log of your readings (date, time, systolic, diastolic) to share with your healthcare provider.',
        'Do not self-adjust medication based on home readings--always consult your doctor.',
        'Understand that blood pressure varies naturally; focus on long-term averages rather than individual readings.'
      ]
    }
  },
  relatedTools: ['heart-rate-zone-calculator', 'bmr-calculator', 'mood-tracker', 'medical-unit-converter'],
  seo: {
    metaTitle: 'Blood Pressure Classifier - AHA/ACC Guidelines | Wiki | UnTrackt',
    metaDescription: 'Classify your blood pressure reading using AHA/ACC guidelines. Understand systolic and diastolic values, hypertension stages, and when to seek medical attention.',
    keywords: ['blood pressure classifier', 'blood pressure chart', 'hypertension', 'systolic', 'diastolic', 'AHA guidelines', 'blood pressure categories', 'high blood pressure', 'normal blood pressure']
  }
};
