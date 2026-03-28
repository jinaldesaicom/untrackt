export default {
  id: 'vaccination-age-guide',
  title: 'Vaccination Age Guide',
  description: 'View recommended vaccination schedules by age group based on CDC and WHO immunization guidelines for children, teens, and adults.',
  content: {
    whatIs: {
      heading: 'What is the Vaccination Age Guide?',
      body: 'The Vaccination Age Guide provides a reference of recommended vaccinations organized by age group, based on schedules published by the CDC (Centers for Disease Control and Prevention) and WHO (World Health Organization). It covers childhood immunizations, adolescent boosters, and adult vaccines. This guide is for general educational reference only--vaccination schedules may vary by country, and individual medical history can affect recommendations. Always consult your healthcare provider or pediatrician for personalized immunization advice.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Vaccination schedules are complex, with multiple doses, boosters, and catch-up windows spread across years. This guide presents the information in a clear, age-based format so parents, caregivers, and adults can quickly see what vaccines are recommended and when. It helps you prepare for well-child visits and stay current on your own immunizations.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select an age group: birth-2 years, 4-6 years, 11-12 years, or adult.',
        'Review the list of recommended vaccines for that age range.',
        'Check dose numbers and timing for multi-dose vaccines.',
        'Note any catch-up recommendations if previous doses were missed.',
        'Print or save the schedule for your next healthcare appointment.',
        'Confirm the schedule with your doctor, as individual factors may require adjustments.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Age-based vaccine schedule covering birth through adulthood.',
        'Aligned with CDC and WHO recommended immunization schedules.',
        'Multi-dose tracking showing primary series and booster timelines.',
        'Catch-up schedule guidance for missed or delayed vaccinations.',
        'Searchable vaccine list with brief descriptions of each immunization.',
        'Fully client-side--no personal health information is collected.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'New parents reviewing the infant immunization schedule before well-baby visits.',
        'Parents of school-age children checking requirements for enrollment.',
        'Teenagers and college students confirming required boosters (e.g., meningococcal, HPV).',
        'Adults checking if they are due for tetanus boosters, flu shots, or shingles vaccines.',
        'Travelers reviewing age-appropriate vaccines before international trips.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Newborn (birth)', description: 'Hepatitis B (HepB) first dose is recommended within 24 hours of birth.' },
        { title: '2 months old', description: 'DTaP (dose 1), IPV (polio, dose 1), Hib (dose 1), PCV13 (pneumococcal, dose 1), RV (rotavirus, dose 1), HepB (dose 2).' },
        { title: '12-15 months', description: 'MMR (dose 1), Varicella (dose 1), Hep A (dose 1), PCV13 (dose 4). A busy period for immunizations.' },
        { title: '11-12 years', description: 'Tdap booster, HPV (2-dose series if started before age 15), Meningococcal ACWY (dose 1).' },
        { title: 'Adult (every 10 years)', description: 'Td or Tdap booster. Adults 50+ should discuss shingles (Shingrix) and pneumococcal vaccines.' },
        { title: 'Catch-up example', description: 'A 7-year-old who missed the 4-6 year DTaP booster should receive it at the next visit. The catch-up schedule specifies minimum intervals between doses.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Immunization', definition: 'The process by which a person becomes protected against a disease through vaccination or natural exposure.' },
        { term: 'Vaccine', definition: 'A biological preparation that stimulates the immune system to develop immunity to a specific pathogen without causing the disease.' },
        { term: 'Booster Dose', definition: 'An additional vaccine dose given after the primary series to maintain or strengthen immunity over time.' },
        { term: 'Catch-Up Schedule', definition: 'A vaccination timeline for individuals who missed one or more recommended doses, specifying minimum age and intervals.' },
        { term: 'DTaP / Tdap', definition: 'Vaccines protecting against diphtheria, tetanus, and pertussis. DTaP is for children <7; Tdap is the adolescent/adult booster formulation.' },
        { term: 'MMR', definition: 'A combination vaccine protecting against measles, mumps, and rubella, typically given in two doses.' },
        { term: 'Herd Immunity', definition: 'Indirect protection from an infectious disease when a large percentage of the population is immune, reducing transmission.' },
        { term: 'Adjuvant', definition: 'A substance added to a vaccine to enhance the body\'s immune response to the antigen.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are these the official vaccine schedules?', answer: 'The guide is based on CDC and WHO published schedules. However, schedules are updated periodically and may vary by country. Always verify with your healthcare provider.' },
        { question: 'Can vaccines be given at the same visit?', answer: 'Yes. Many vaccines can be safely co-administered at the same visit. Your healthcare provider will determine which combinations are appropriate.' },
        { question: 'What if my child missed a vaccine dose?', answer: 'Catch-up schedules exist for most vaccines. You generally do not need to restart the series--just resume from where you left off, respecting minimum intervals.' },
        { question: 'Are there side effects?', answer: 'Mild side effects (soreness at injection site, low-grade fever) are common and usually resolve within 1-2 days. Severe reactions are rare. Discuss concerns with your healthcare provider.' },
        { question: 'Is this guide a substitute for pediatric advice?', answer: 'No. This guide provides general reference information. Individual vaccination plans should be determined by your child\'s pediatrician based on medical history.' },
        { question: 'Do adults need vaccines too?', answer: 'Yes. Adults need periodic boosters (Td/Tdap every 10 years), annual flu vaccines, and age-specific vaccines like shingles (50+) and pneumococcal (65+). Travel vaccines may also apply.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep a personal or family immunization record and bring it to every medical appointment.',
        'Set reminders for multi-dose series to ensure timely completion.',
        'Review the schedule before well-child visits so you can ask informed questions.',
        'Check catch-up guidance if your child has fallen behind--it is never too late to catch up.',
        'Verify travel vaccine requirements well in advance of international trips (some require multiple doses over weeks).',
        'Adults should review their vaccination status annually, especially for flu, COVID-19, and tetanus boosters.',
        'Discuss any allergies or previous adverse reactions with your doctor before vaccination.',
        'Remember that this guide is a reference tool--your healthcare provider makes the final recommendation based on your individual health.'
      ]
    }
  },
  relatedTools: ['medical-unit-converter', 'mood-tracker', 'blood-pressure-classifier', 'pregnancy-due-date-calculator'],
  seo: {
    metaTitle: 'Vaccination Age Guide - Immunization Schedule | Wiki | UnTrackt',
    metaDescription: 'View recommended vaccination schedules by age group based on CDC and WHO guidelines. Covers childhood immunizations, teen boosters, and adult vaccines.',
    keywords: ['vaccination schedule', 'immunization guide', 'childhood vaccines', 'CDC vaccine schedule', 'booster shots', 'catch-up vaccination', 'adult vaccines', 'MMR', 'DTaP', 'vaccine age guide']
  }
};
