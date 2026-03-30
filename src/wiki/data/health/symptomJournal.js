export default {
  id: 'symptom-journal',
  title: 'Symptom Journal',
  description: 'A privacy-first daily symptom logger with severity tracking, calendar heatmap, and PDF export for sharing with your doctor.',
  content: {
    whatIs: {
      heading: 'What is the Symptom Journal?',
      body: 'The Symptom Journal is a personal health logging tool that lets you record daily symptoms with severity levels, time-of-day context, and notes. It provides three views--a logging form, a history timeline, and a calendar heatmap--to help you spot patterns over time. You can export your data as a PDF for sharing with your doctor or healthcare provider. All data is stored locally in your browser and never leaves your device. This tool is for personal tracking only and is not a medical diagnostic tool. Consult a healthcare professional for any medical concerns.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Remembering symptom details during a doctor\'s visit is unreliable. A daily log with severity, timing, and context provides accurate data that helps healthcare providers identify patterns, track treatment effectiveness, and make better-informed decisions. The calendar heatmap makes it easy to visualize flare-ups and correlate them with lifestyle factors.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a symptom from the common suggestions or type a custom symptom name.',
        'Set the severity level (mild, moderate, severe).',
        'Choose the time of day (morning, afternoon, evening, night).',
        'Optionally add notes about context, triggers, or associated activities.',
        'Save the entry--it is stored locally in your browser.',
        'Switch to History view to see your entries in a timeline.',
        'Use Calendar view to see a heatmap of symptom frequency and severity.',
        'Export a date range as PDF to share with your healthcare provider.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Log symptoms with severity (mild, moderate, severe) and time-of-day tagging.',
        'Common symptom suggestions for quick entry.',
        'Three views: Log (entry form), History (timeline), and Calendar (heatmap).',
        'Calendar heatmap visualization showing symptom patterns over weeks and months.',
        'Most-frequent symptom tracking to identify recurring issues.',
        'PDF export with date range selection for doctor visits.',
        'Local-only storage--your health data never leaves your browser.',
        'Free-text notes for context (triggers, medications, activities).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking chronic condition symptoms (migraines, joint pain, digestive issues) to identify triggers.',
        'Monitoring medication side effects and sharing a log with your prescribing doctor.',
        'Recording allergy symptoms to correlate with seasons, weather, or dietary changes.',
        'Preparing for doctor appointments with a printed or PDF symptom history.',
        'Tracking post-surgical recovery progress day by day.',
        'Logging mental health symptoms (anxiety, insomnia) alongside physical symptoms for holistic pattern recognition.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Migraine tracking', description: 'Log: "Migraine", Severe, Morning. Note: "Woke up with aura, poor sleep last night, skipped breakfast." Building a pattern of triggers over weeks.' },
        { title: 'Allergy monitoring', description: 'Log: "Sneezing / Congestion", Moderate, Afternoon. Note: "High pollen count today, was outdoors 2 hours." Correlate with pollen data.' },
        { title: 'Medication side effects', description: 'Log: "Nausea", Mild, Morning. Note: "Started new medication 3 days ago." Track whether the side effect diminishes over time.' },
        { title: 'Doctor visit prep', description: 'Export 30 days of symptom entries as PDF. Your doctor sees a clear timeline of symptoms, severity, and your notes.' },
        { title: 'Post-surgery recovery', description: 'Daily log of pain level and mobility, showing gradual improvement from severe to mild over 4 weeks.' },
        { title: 'Flare-up pattern', description: 'Calendar heatmap reveals a cluster of severe entries every Monday--possibly work-stress related, worth discussing with your doctor.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Symptom', definition: 'A physical or mental sign of a condition experienced by the patient, such as pain, fatigue, nausea, or anxiety.' },
        { term: 'Severity', definition: 'A rating of symptom intensity--mild, moderate, or severe--used to track changes over time.' },
        { term: 'Trigger', definition: 'A factor (food, activity, weather, stress) that may cause or worsen a symptom.' },
        { term: 'Flare-up', definition: 'A period of increased symptom severity, often visible as a cluster on the calendar heatmap.' },
        { term: 'Heatmap', definition: 'A calendar visualization using color intensity to represent symptom frequency or severity on each day.' },
        { term: 'Self-report', definition: 'Health data recorded by the patient rather than measured by a clinical instrument. Valuable for subjective symptoms like pain and fatigue.' },
        { term: 'Health Diary', definition: 'A daily log of symptoms, activities, and health observations, used to identify patterns and support clinical conversations.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is my health data private?', answer: 'Yes. All data is stored exclusively in your browser\'s local storage. Nothing is transmitted to any server. Clearing your browser data will erase the journal.' },
        { question: 'Can I share my journal with my doctor?', answer: 'Yes. Use the PDF export feature to generate a printable report for any date range. Share the PDF with your healthcare provider.' },
        { question: 'How far back does the history go?', answer: 'The tool stores all entries in local storage. You can scroll back through your full history and export any date range.' },
        { question: 'Can this tool diagnose a condition?', answer: 'No. The Symptom Journal is a personal logging tool, not a diagnostic instrument. Always consult a qualified healthcare professional for medical advice.' },
        { question: 'What if I forget to log some days?', answer: 'That is fine. Partial data is still valuable for spotting patterns. Resume logging when you can.' },
        { question: 'Can I track multiple symptoms on the same day?', answer: 'Yes. You can log as many individual symptom entries as needed for each day, each with its own severity and time-of-day.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Log symptoms at or near the time they occur for the most accurate records.',
        'Include context in notes: what you ate, activity level, sleep quality, stress, weather--anything potentially related.',
        'Use the common symptom suggestions for consistency, or create custom entries when needed.',
        'Review the calendar heatmap weekly to spot emerging patterns early.',
        'Export a PDF before every doctor appointment to make the most of your visit.',
        'Track medication start dates in notes so you can correlate entries with treatment changes.',
        'Do not use this tool as a substitute for professional medical advice or emergency care.',
        'Be honest and consistent in severity ratings--relative consistency is more important than absolute precision.'
      ]
    }
  },
  relatedTools: ['mood-tracker', 'sleep-cycle-calculator', 'blood-pressure-classifier', 'medical-unit-converter'],
  seo: {
    metaTitle: 'Symptom Journal - Daily Symptom Logger with PDF Export | Wiki | UnTrackt',
    metaDescription: 'Log daily symptoms with severity, timing, and notes. Calendar heatmap visualization and PDF export for doctor visits. Fully private, browser-based health tracker.',
    keywords: ['symptom journal', 'symptom tracker', 'health diary', 'symptom log', 'pain tracker', 'medical journal', 'doctor visit prep', 'health tracker', 'pdf export']
  }
}
