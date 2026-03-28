export default {
  id: 'sleep-cycle-calculator',
  title: 'Sleep Cycle Calculator',
  description: 'Find optimal bedtimes and wake times aligned with your natural sleep cycles to wake up feeling refreshed instead of groggy.',
  content: {
    whatIs: {
      heading: 'What is the Sleep Cycle Calculator?',
      body: 'The Sleep Cycle Calculator helps you determine the best times to fall asleep or wake up based on 90-minute sleep cycles. Each cycle includes stages of light sleep, deep sleep, and REM sleep. Waking at the end of a complete cycle--rather than in the middle--reduces sleep inertia and helps you feel more alert. This tool provides general guidance for educational purposes and is not a substitute for professional sleep medicine advice.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Even with enough total sleep hours, waking mid-cycle can leave you feeling groggy and disoriented. By aligning your alarm with the end of a sleep cycle, you can improve perceived sleep quality without changing total sleep duration. The calculator also accounts for the average 15-minute sleep-onset latency so the suggested times are practical, not theoretical.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Choose your mode: "I want to wake up at…" or "I want to go to bed at…".',
        'Enter your target wake-up time or desired bedtime.',
        'Optionally adjust the average time it takes you to fall asleep (default: 15 minutes).',
        'Click "Calculate" to see a list of optimal times based on completing 4, 5, or 6 full sleep cycles.',
        'Pick the suggested time that best fits your schedule.',
        'Try the schedule for a week and adjust the sleep-onset value if needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Bi-directional calculation: input either a bedtime or a wake-up time.',
        'Adjustable sleep-onset latency (5-30 minutes) for personalized results.',
        'Displays multiple options based on 4, 5, and 6 complete 90-minute cycles.',
        'Visual timeline showing light sleep, deep sleep, and REM stages.',
        'Tips for improving sleep hygiene alongside your schedule.',
        'Entirely client-side--no personal data is collected or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting an alarm that aligns with the end of a sleep cycle for a more refreshing wake-up.',
        'Shift workers planning sleep windows around rotating schedules.',
        'Students optimizing study and sleep balance during exam periods.',
        'New parents finding the best nap windows between feedings.',
        'Travelers adjusting sleep schedules to reduce jet lag.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Wake up at 6:30 AM', description: 'Suggested bedtimes: 9:00 PM (6 cycles, 9 h), 10:30 PM (5 cycles, 7.5 h), or 12:00 AM (4 cycles, 6 h), each including 15 min to fall asleep.' },
        { title: 'Go to bed at 11:00 PM', description: 'Suggested wake times: 5:00 AM (4 cycles), 6:30 AM (5 cycles), or 8:00 AM (6 cycles), assuming 15 min sleep onset.' },
        { title: 'Short nap planning', description: 'A 20-minute power nap avoids deep sleep. Alternatively, a 90-minute nap completes one full cycle for better cognitive restoration.' },
        { title: 'Shift worker, 7 AM bedtime', description: 'Suggested wake times: 12:45 PM (4 cycles) or 2:15 PM (5 cycles). Blackout curtains and a cool room improve daytime sleep quality.' },
        { title: 'Fast sleeper (5 min onset)', description: 'Adjusting onset to 5 min shifts all suggested times 10 minutes later, giving a more accurate schedule for people who fall asleep quickly.' },
        { title: 'Jet lag recovery', description: 'After flying east across 6 time zones, use the calculator to gradually shift bedtime 30-60 minutes earlier each night until aligned with the local schedule.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Sleep Cycle', definition: 'A repeating 90-minute pattern of sleep stages including light sleep, deep sleep, and REM sleep.' },
        { term: 'REM Sleep', definition: 'Rapid Eye Movement sleep, the stage associated with vivid dreaming, memory consolidation, and emotional processing.' },
        { term: 'NREM Sleep', definition: 'Non-Rapid Eye Movement sleep, divided into stages N1 (light), N2 (moderate), and N3 (deep/slow-wave) sleep.' },
        { term: 'Sleep Inertia', definition: 'The grogginess and impaired cognition experienced when waking during deep sleep rather than at the end of a cycle.' },
        { term: 'Circadian Rhythm', definition: 'The internal ~24-hour biological clock that regulates sleep-wake patterns, hormone release, and body temperature.' },
        { term: 'Sleep-Onset Latency', definition: 'The time it takes to transition from full wakefulness to the first stage of sleep, typically 10-20 minutes.' },
        { term: 'Melatonin', definition: 'A hormone produced by the pineal gland that signals the body to prepare for sleep, typically rising in the evening.' },
        { term: 'Sleep Hygiene', definition: 'Habits and environmental conditions that promote consistent, high-quality sleep.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are sleep cycles exactly 90 minutes?', answer: '90 minutes is an average. Individual cycles range from 80 to 120 minutes and may vary throughout the night. Use the calculator as a guideline and adjust based on how you feel.' },
        { question: 'How many sleep cycles do I need?', answer: 'Most adults need 5-6 full cycles (7.5-9 hours). Four cycles (6 hours) may suffice occasionally but is not recommended long-term.' },
        { question: 'Will this cure my insomnia?', answer: 'No. The Sleep Cycle Calculator is an educational tool, not a medical treatment. If you consistently struggle to fall or stay asleep, consult a sleep specialist.' },
        { question: 'Should I adjust the sleep-onset time?', answer: 'Yes. If you typically fall asleep quickly (under 10 minutes), lower the value. If it takes you longer than 20 minutes, increase it for more accurate suggestions.' },
        { question: 'Is napping good or bad?', answer: 'Short naps (15-20 minutes) can boost alertness without disrupting nighttime sleep. Long naps may cause sleep inertia and interfere with your circadian rhythm.' },
        { question: 'Is this tool a replacement for a sleep study?', answer: 'No. If you suspect a sleep disorder such as sleep apnea or restless leg syndrome, seek evaluation from a healthcare provider. This tool is for general educational use only.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Keep a consistent sleep and wake schedule--even on weekends--to strengthen your circadian rhythm.',
        'Avoid screens for 30-60 minutes before bed; blue light suppresses melatonin production.',
        'Keep your bedroom cool (18-20 °C / 65-68 °F), dark, and quiet for optimal sleep quality.',
        'Limit caffeine intake after early afternoon, as its half-life is 5-6 hours.',
        'Avoid heavy meals and alcohol within 2-3 hours of bedtime.',
        'Use the calculator for at least a week before judging effectiveness--your body needs time to adjust.',
        'If you wake during the night, avoid checking the clock, which can increase anxiety and delay sleep onset.',
        'Consider a brief morning light exposure (10-15 minutes of sunlight) to reinforce your circadian rhythm.'
      ]
    }
  },
  relatedTools: ['bmr-calculator', 'mood-tracker', 'calorie-burn-estimator', 'water-intake-calculator'],
  seo: {
    metaTitle: 'Sleep Cycle Calculator - Optimal Bedtime & Wake Time | Wiki | UnTrackt',
    metaDescription: 'Calculate the best times to sleep and wake up based on 90-minute sleep cycles. Reduce grogginess and improve sleep quality with cycle-aligned scheduling.',
    keywords: ['sleep cycle calculator', 'sleep cycles', 'REM sleep', 'NREM sleep', 'circadian rhythm', 'bedtime calculator', 'wake up refreshed', 'sleep stages', 'sleep hygiene']
  }
};
