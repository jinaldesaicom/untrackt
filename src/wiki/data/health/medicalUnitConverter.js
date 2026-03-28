export default {
  id: 'medical-unit-converter',
  title: 'Medical Unit Converter',
  description: 'Convert common medical lab values between conventional (US) and SI (international) units for glucose, cholesterol, HbA1c, and more.',
  content: {
    whatIs: {
      heading: 'What is the Medical Unit Converter?',
      body: 'The Medical Unit Converter translates common clinical lab values between conventional units (used primarily in the US) and SI units (used internationally). It covers frequently tested biomarkers such as blood glucose, cholesterol, HbA1c, creatinine, hemoglobin, and more. This tool is for educational and reference purposes only--it does not interpret results or provide medical diagnoses. Always discuss lab values with your healthcare provider for proper interpretation.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Lab results can be reported in different units depending on your country or laboratory. Comparing results across systems--or understanding a foreign lab report--becomes difficult without conversion. This tool eliminates the guesswork by applying the correct conversion factors for each biomarker, saving time and reducing the risk of misinterpretation.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the biomarker you want to convert (e.g., glucose, cholesterol, creatinine).',
        'Enter the value in its current unit.',
        'Select the source unit system (conventional or SI).',
        'Click "Convert" to see the equivalent value in the other unit system.',
        'Review the reference range for both unit systems displayed alongside the result.',
        'Discuss any concerns about your lab values with a healthcare professional.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports 15+ common biomarkers: glucose, total cholesterol, LDL, HDL, triglycerides, HbA1c, creatinine, hemoglobin, and more.',
        'Bidirectional conversion: conventional ↔ SI with verified conversion factors.',
        'Reference ranges displayed for both unit systems.',
        'Searchable biomarker list for quick access.',
        'Precise conversion factors sourced from established clinical laboratory references.',
        'Fully client-side--no lab data is transmitted or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Patients comparing lab results from different countries or hospitals.',
        'Healthcare professionals verifying unit conversions for international patients.',
        'Medical students studying lab values in both unit systems.',
        'Researchers converting published data between conventional and SI units.',
        'Expatriates understanding blood test results from their new country of residence.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Blood glucose: 100 mg/dL → mmol/L', description: '100 mg/dL ÷ 18.018 = 5.55 mmol/L. Normal fasting range: 70-100 mg/dL (3.9-5.6 mmol/L).' },
        { title: 'Total cholesterol: 200 mg/dL → mmol/L', description: '200 mg/dL ÷ 38.67 = 5.17 mmol/L. Desirable: <200 mg/dL (<5.18 mmol/L).' },
        { title: 'Creatinine: 1.0 mg/dL → µmol/L', description: '1.0 mg/dL × 88.4 = 88.4 µmol/L. Normal range varies by age and sex.' },
        { title: 'Hemoglobin: 14 g/dL → g/L', description: '14 g/dL × 10 = 140 g/L. Normal range for males: 13.5-17.5 g/dL (135-175 g/L).' },
        { title: 'HbA1c: 6.5 % → mmol/mol', description: 'Using the IFCC formula: (6.5 − 2.152) / 0.09148 ≈ 48 mmol/mol. Diabetes threshold: ≥6.5 % (≥48 mmol/mol).' },
        { title: 'Triglycerides: 150 mg/dL → mmol/L', description: '150 mg/dL ÷ 88.57 = 1.69 mmol/L. Borderline high: 150-199 mg/dL (1.7-2.2 mmol/L).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Conventional Units', definition: 'The unit system commonly used in the United States (e.g., mg/dL, g/dL), based on mass per volume.' },
        { term: 'SI Units', definition: 'Système International units used worldwide (e.g., mmol/L, µmol/L), based on molar concentration.' },
        { term: 'Conversion Factor', definition: 'A constant multiplied or divided to convert between conventional and SI units, specific to each biomarker.' },
        { term: 'Reference Range', definition: 'The expected range of normal lab values for a healthy population, varying by age, sex, and laboratory methodology.' },
        { term: 'HbA1c', definition: 'Glycated hemoglobin--a measure reflecting average blood glucose over the past 2-3 months, used to monitor diabetes control.' },
        { term: 'Fasting Glucose', definition: 'Blood sugar measured after at least 8 hours of fasting, a key diagnostic marker for diabetes and prediabetes.' },
        { term: 'Lipid Panel', definition: 'A group of blood tests that includes total cholesterol, LDL, HDL, and triglycerides, used to assess cardiovascular risk.' },
        { term: 'Creatinine', definition: 'A waste product from muscle metabolism filtered by the kidneys, used to assess kidney function.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are the conversion factors accurate?', answer: 'Yes. The conversion factors used are sourced from established clinical references. However, slight rounding differences may occur. Always verify critical values with your laboratory or physician.' },
        { question: 'Can I use this to interpret my lab results?', answer: 'This tool converts units only--it does not diagnose conditions or interpret results. Always discuss lab values with your healthcare provider for clinical interpretation.' },
        { question: 'Why do different countries use different units?', answer: 'The US historically adopted mass-based conventional units, while most other countries and international organizations use SI (mole-based) units for standardization. Neither system is inherently better; the difference is convention.' },
        { question: 'What if my biomarker is not listed?', answer: 'The tool covers the most commonly tested biomarkers. For specialized tests, consult your laboratory report or a clinical reference manual for conversion factors.' },
        { question: 'Is this a medical device?', answer: 'No. This is an educational reference tool. It is not approved as a clinical or medical device and should not be used for clinical decision-making without professional verification.' },
        { question: 'Can labs have different reference ranges?', answer: 'Yes. Reference ranges can vary slightly between laboratories due to differences in methodology, population, and equipment. Always use the reference range provided on your specific lab report.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always double-check the source unit before converting--entering mg/dL when the value is already mmol/L will produce incorrect results.',
        'Use the reference ranges displayed alongside conversions to contextualize your values.',
        'For HbA1c, note that % (NGSP/DCCT) and mmol/mol (IFCC) use a non-linear conversion formula.',
        'Keep a personal health record with lab values in one consistent unit system for easier trend tracking.',
        'Do not make medication or dietary changes based solely on converted values--consult your healthcare provider.',
        'Remember that reference ranges on the tool are general guidelines; your lab may have different ranges.',
        'Use this tool to prepare informed questions for your doctor, not to self-diagnose.',
        'Bookmark common conversions if you routinely compare results across international reports.'
      ]
    }
  },
  relatedTools: ['blood-pressure-classifier', 'bmr-calculator', 'body-fat-calculator', 'heart-rate-zone-calculator'],
  seo: {
    metaTitle: 'Medical Unit Converter - Lab Values Conversion | Wiki | UnTrackt',
    metaDescription: 'Convert medical lab values between conventional and SI units for glucose, cholesterol, HbA1c, creatinine, and more. Free reference tool with standard ranges.',
    keywords: ['medical unit converter', 'lab value conversion', 'mg/dL to mmol/L', 'glucose conversion', 'cholesterol units', 'HbA1c conversion', 'SI units', 'conventional units', 'creatinine conversion']
  }
};
