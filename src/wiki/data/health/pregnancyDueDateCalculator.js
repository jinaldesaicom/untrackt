export default {
  id: 'pregnancy-due-date-calculator',
  title: 'Pregnancy Due Date Calculator',
  description: 'Estimate your pregnancy due date and track gestational milestones based on your last menstrual period, conception date, or IVF transfer date.',
  content: {
    whatIs: {
      heading: 'What is the Pregnancy Due Date Calculator?',
      body: 'The Pregnancy Due Date Calculator estimates your expected delivery date (EDD) using Naegele\'s rule and related methods. You can calculate from your last menstrual period (LMP), known conception date, or IVF transfer date. The tool also shows your current gestational age and key pregnancy milestones week by week. This calculator provides general estimates for informational purposes only--it is not a medical tool. Always confirm your due date with your obstetrician or midwife through clinical assessment and ultrasound.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Knowing your estimated due date helps you plan prenatal care appointments, prepare for delivery, and track developmental milestones. While only about 5 % of babies are born exactly on their due date, having an EDD provides a central reference point for the entire pregnancy timeline and helps healthcare providers assess fetal growth.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Choose your calculation method: Last Menstrual Period (LMP), conception date, or IVF transfer date.',
        'Enter the relevant date.',
        'For IVF, specify whether it was a Day 3 or Day 5 (blastocyst) transfer.',
        'Click "Calculate" to see your estimated due date and current gestational age.',
        'Review the week-by-week milestone timeline for developmental highlights.',
        'Confirm the estimated date with your healthcare provider.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Three calculation methods: LMP (Naegele\'s rule), conception date, and IVF transfer date.',
        'Displays current gestational age in weeks and days.',
        'Week-by-week milestone timeline with key developmental events.',
        'Trimester breakdown with relevant health information for each phase.',
        'Estimated conception date and due date window displayed together.',
        'Client-side only--no pregnancy or personal data is transmitted.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Quickly estimating a due date after a positive pregnancy test.',
        'IVF patients calculating EDD based on embryo transfer date.',
        'Expecting parents planning maternity/paternity leave and nursery preparation.',
        'Understanding which trimester you are in and what milestones to expect.',
        'Preparing informed questions for prenatal appointments.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'LMP: January 1, 2026', description: 'Using Naegele\'s rule (LMP + 280 days), estimated due date = October 8, 2026. Gestational age on April 1 = 13 weeks (start of second trimester).' },
        { title: 'Conception date: January 15, 2026', description: 'EDD = October 8, 2026 (conception date + 266 days). Useful when ovulation date is known through tracking.' },
        { title: 'IVF Day 5 transfer: February 1, 2026', description: 'EDD = October 18, 2026. The calculation adds 261 days for Day 5 transfers (263 for Day 3).' },
        { title: 'Irregular cycle adjustment', description: 'If cycles are 35 days instead of 28, ovulation likely occurred around Day 21. Adjusting LMP forward by 7 days gives a more accurate EDD.' },
        { title: 'Trimester milestones', description: 'Week 12: first trimester screening. Week 20: anatomy scan. Week 28: third trimester begins. Week 37: term pregnancy.' },
        { title: 'Due date window', description: 'Full-term delivery ranges from 37 to 42 weeks. An EDD of Oct 8 means the likely delivery window is Sep 17 - Nov 5.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Estimated Due Date (EDD)', definition: 'The projected date of delivery, calculated as 280 days (40 weeks) from the first day of the last menstrual period.' },
        { term: 'Naegele\'s Rule', definition: 'The standard method for estimating due date: LMP + 7 days − 3 months + 1 year.' },
        { term: 'Gestational Age', definition: 'The age of the pregnancy measured from the first day of the last menstrual period, expressed in weeks and days.' },
        { term: 'Last Menstrual Period (LMP)', definition: 'The first day of the most recent menstrual period, used as the starting point for gestational age calculation.' },
        { term: 'Trimester', definition: 'One of three pregnancy phases: first (weeks 1-12), second (weeks 13-27), and third (weeks 28-40).' },
        { term: 'Viability', definition: 'The gestational age at which a fetus can survive outside the womb, generally considered around 24 weeks with intensive care.' },
        { term: 'Full Term', definition: 'A pregnancy that has reached 37-42 weeks of gestation, with 39-40 weeks considered "full term" per ACOG guidelines.' },
        { term: 'Blastocyst Transfer', definition: 'An IVF procedure where a Day 5 embryo (blastocyst) is placed in the uterus, offering slightly higher implantation rates than Day 3 transfers.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate is the due date calculation?', answer: 'Naegele\'s rule assumes a 28-day cycle with ovulation on Day 14. Only ~5 % of babies are born on their exact EDD. Most deliver within a 2-week window around it. Your healthcare provider will refine the date with ultrasound measurements.' },
        { question: 'What if my cycles are irregular?', answer: 'If your cycle is longer or shorter than 28 days, adjust the LMP date or use a known conception date for better accuracy. An early ultrasound (6-9 weeks) is the most reliable method for irregular cycles.' },
        { question: 'Can the due date change?', answer: 'Yes. An early ultrasound that differs by more than 7 days from the LMP-based EDD may lead your provider to adjust the due date.' },
        { question: 'Is this tool a substitute for prenatal care?', answer: 'Absolutely not. This calculator provides estimates for planning purposes. Prenatal care with a qualified healthcare provider is essential for monitoring the health of both mother and baby.' },
        { question: 'How is IVF due date calculated differently?', answer: 'IVF due date is calculated from the transfer date: add 261 days for a Day 5 transfer or 263 days for a Day 3 transfer, since the embryo age is already known.' },
        { question: 'What does "full term" mean?', answer: 'ACOG defines full term as 39 weeks 0 days through 40 weeks 6 days. Early term is 37-38 weeks, and late term is 41-41 weeks 6 days.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Record the first day of your last menstrual period accurately--even a few days\' error shifts the EDD.',
        'If you track ovulation (via basal body temperature or OPKs), use the conception date method for better accuracy.',
        'Confirm your calculator-based EDD with an early pregnancy ultrasound at 6-9 weeks.',
        'Use the gestational age tracker to prepare for scheduled screenings (e.g., first-trimester screen at 11-14 weeks).',
        'Remember that the due date is an estimate--prepare for delivery as early as 37 weeks.',
        'Keep your healthcare provider informed about any date discrepancies between different calculation methods.',
        'Do not use this tool as a substitute for regular prenatal visits and clinical monitoring.',
        'Plan maternity leave and logistics around a delivery window (EDD ± 2 weeks) rather than a single date.'
      ]
    }
  },
  relatedTools: ['ovulation-calculator', 'mood-tracker', 'water-intake-calculator', 'sleep-cycle-calculator'],
  seo: {
    metaTitle: 'Pregnancy Due Date Calculator - EDD & Milestones | Wiki | UnTrackt',
    metaDescription: 'Calculate your pregnancy due date from LMP, conception date, or IVF transfer. Track gestational age and week-by-week milestones with this free online tool.',
    keywords: ['pregnancy due date calculator', 'due date', 'gestational age', 'Naegele rule', 'LMP', 'IVF due date', 'pregnancy milestones', 'trimester', 'expected delivery date']
  }
};
