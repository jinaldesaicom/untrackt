export default {
  id: 'ovulation-calculator',
  title: 'Ovulation Calculator',
  description: 'Estimate your ovulation date and fertile window based on your menstrual cycle length to support family planning or conception efforts.',
  content: {
    whatIs: {
      heading: 'What is the Ovulation Calculator?',
      body: 'The Ovulation Calculator estimates your likely ovulation date and fertile window based on the first day of your last menstrual period and your average cycle length. Ovulation typically occurs about 14 days before the start of the next period--the tool uses this luteal-phase assumption to identify the days when conception is most likely. This calculator provides general estimates for educational purposes only and is not a medical device. It should not be relied upon as a method of contraception. Consult a healthcare provider for personalized fertility or contraception guidance.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Timing intercourse around ovulation significantly increases the chances of conception. Conversely, understanding your fertile window helps you make informed decisions about family planning. The calculator removes manual math and presents a clear calendar view of your most fertile days, making cycle awareness simple and accessible.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the first day of your last menstrual period (LMP).',
        'Enter your average cycle length in days (default: 28).',
        'Click "Calculate" to see your estimated ovulation date and fertile window.',
        'Review the 6-day fertile window (5 days before ovulation + ovulation day).',
        'Use the calendar view to plan accordingly.',
        'Track multiple cycles for a more reliable pattern.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Calculates ovulation date based on a 14-day luteal phase assumption.',
        'Displays a 6-day fertile window highlighting peak fertility days.',
        'Supports cycle lengths from 21 to 40 days.',
        'Calendar view for easy visual reference.',
        'Multi-cycle tracking to identify patterns and cycle regularity.',
        'Fully client-side--no reproductive health data is transmitted or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Couples trying to conceive who want to identify the most fertile days.',
        'Women tracking menstrual cycles for general health awareness.',
        'Pairing with basal body temperature or OPK data for more accurate predictions.',
        'Understanding irregular cycles by logging multiple months of data.',
        'Health education about the menstrual cycle and reproductive biology.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '28-day cycle, LMP: March 1', description: 'Estimated ovulation: March 15. Fertile window: March 10-15. Peak fertility: March 13-15.' },
        { title: '32-day cycle, LMP: March 1', description: 'Estimated ovulation: March 19. Fertile window: March 14-19. Longer cycles shift ovulation later.' },
        { title: '24-day cycle, LMP: March 1', description: 'Estimated ovulation: March 11. Fertile window: March 6-11. Shorter cycles mean earlier ovulation.' },
        { title: 'Irregular cycles (26-34 days)', description: 'Using a 30-day average gives an estimate, but the actual fertile window could shift by several days. Confirm with OPK or BBT tracking.' },
        { title: 'Next 3 months projection', description: 'With a consistent 28-day cycle starting March 1, ovulation dates would fall approximately March 15, April 12, and May 10.' },
        { title: 'Conception planning with travel', description: 'If ovulation is estimated for June 20 and a partner travels June 15-22, intercourse on June 17-20 would fall within the fertile window.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Ovulation', definition: 'The release of a mature egg from the ovary, typically occurring once per menstrual cycle.' },
        { term: 'Fertile Window', definition: 'The approximately 6-day period when conception is possible: the 5 days before ovulation and the day of ovulation itself.' },
        { term: 'Luteal Phase', definition: 'The phase of the menstrual cycle from ovulation to the start of the next period, typically 12-16 days (average 14).' },
        { term: 'Follicular Phase', definition: 'The first phase of the cycle, from menstruation to ovulation, during which follicles in the ovary mature.' },
        { term: 'Basal Body Temperature (BBT)', definition: 'The body\'s lowest resting temperature, which rises slightly (0.2-0.5 °C) after ovulation due to progesterone.' },
        { term: 'Ovulation Predictor Kit (OPK)', definition: 'A home test that detects the surge in luteinizing hormone (LH) that occurs 24-36 hours before ovulation.' },
        { term: 'Luteinizing Hormone (LH)', definition: 'A pituitary hormone that triggers ovulation when it surges mid-cycle.' },
        { term: 'Anovulation', definition: 'A menstrual cycle in which ovulation does not occur, which can be caused by stress, hormonal imbalances, or medical conditions.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate is the ovulation estimate?', answer: 'The calculator assumes a 14-day luteal phase, which is average but varies between individuals (12-16 days). For greater accuracy, combine with BBT tracking or OPK tests.' },
        { question: 'Can I use this as contraception?', answer: 'No. Calendar-based methods alone are not reliable contraception. Ovulation timing can vary, and sperm can survive up to 5 days. Consult a healthcare provider for effective contraception options.' },
        { question: 'What if my cycles are irregular?', answer: 'If your cycle length varies by more than 7 days, calendar predictions are less reliable. Track several cycles, and consider using OPKs or consulting a fertility specialist.' },
        { question: 'How long is the egg viable after ovulation?', answer: 'The egg is viable for 12-24 hours after release. This is why the days before ovulation (when sperm are already present) are often more important than the day after.' },
        { question: 'Can stress affect ovulation?', answer: 'Yes. Physical or emotional stress can delay ovulation or cause anovulatory cycles. Illness, travel, and extreme exercise can also shift timing.' },
        { question: 'Is this tool medical advice?', answer: 'No. The Ovulation Calculator is an educational tool providing cycle estimates. For fertility concerns or contraception planning, consult a healthcare professional.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Track at least 3 consecutive cycles to establish your average cycle length for better predictions.',
        'Combine calendar estimates with OPK testing for the most reliable ovulation detection.',
        'Record the first day of your period consistently--a one-day error shifts the entire calculation.',
        'Use BBT charting as a secondary confirmation: a sustained temperature rise indicates ovulation occurred.',
        'Remember that the fertile window starts 5 days before ovulation, not just on the day itself.',
        'Do not rely solely on this tool for contraception--it is not designed for that purpose.',
        'Consult a fertility specialist if you have been unable to conceive after 12 months of trying (or 6 months if over 35).',
        'Note that factors like illness, travel, and stress can shift ovulation, so always cross-reference with physical signs.'
      ]
    }
  },
  relatedTools: ['pregnancy-due-date-calculator', 'mood-tracker', 'sleep-cycle-calculator', 'water-intake-calculator'],
  seo: {
    metaTitle: 'Ovulation Calculator - Fertile Window Estimator | Wiki | UnTrackt',
    metaDescription: 'Estimate your ovulation date and fertile window based on cycle length and last period. Plan conception or track your menstrual cycle with this free tool.',
    keywords: ['ovulation calculator', 'fertile window', 'ovulation date', 'menstrual cycle', 'conception planning', 'fertility tracker', 'LH surge', 'BBT tracking', 'cycle length']
  }
};
