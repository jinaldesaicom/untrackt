export default {
  id: 'time-zone-converter',
  title: 'Time Zone Converter',
  description: 'Convert times between time zones and compare multiple zones simultaneously with a live world clock display.',
  content: {
    whatIs: {
      heading: 'What is the Time Zone Converter?',
      body: 'The Time Zone Converter lets you convert any date and time from one time zone to another, compare multiple time zones side by side, and view a live world clock. It uses the browser\'s built-in Intl.DateTimeFormat API for accurate timezone calculations including daylight saving time adjustments. No external services are called--everything runs locally in your browser.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Coordinating across time zones is a constant challenge for remote teams, international businesses, and global event planning. Mental arithmetic with UTC offsets is error-prone, especially when daylight saving time is involved. This tool eliminates guesswork by showing exact conversions and letting you compare multiple zones at a glance.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter or select the date and time you want to convert.',
        'Choose the source time zone from the searchable dropdown.',
        'Select one or more target time zones to convert to.',
        'View the converted times displayed for each target zone.',
        'Use the live clock display to see current times in all selected zones.',
        'Copy a converted time to your clipboard with a single click.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Convert any date and time between hundreds of time zones worldwide.',
        'Compare multiple time zones side by side.',
        'Live world clock showing current time in selected zones.',
        'Searchable time zone dropdown with common zones and full IANA list.',
        'Automatic daylight saving time (DST) adjustment.',
        'Copy converted times to clipboard.',
        'Date picker for converting future or past dates.',
        'Fully client-side using the Intl.DateTimeFormat API--no external API calls.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Scheduling meetings across multiple time zones for distributed teams.',
        'Converting event times for international conference attendees.',
        'Planning travel itineraries with arrival and departure times in local zones.',
        'Coordinating release windows for global software deployments.',
        'Finding overlapping work hours between team members in different countries.',
        'Converting timestamps in logs or data from UTC to local time.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Team standup scheduling', description: 'Find a 9:00 AM EST meeting time in PST (6:00 AM), GMT (2:00 PM), and IST (7:30 PM) to pick the best overlap for a global team.' },
        { title: 'Conference call planning', description: 'Convert a 3:00 PM CET webinar time for attendees in New York (9:00 AM EST), Tokyo (11:00 PM JST), and Sydney (1:00 AM AEDT next day).' },
        { title: 'Flight arrival time', description: 'A flight departs London at 10:00 AM GMT and lands 8 hours later. Convert the arrival to the destination\'s local time zone.' },
        { title: 'Software release window', description: 'Plan a deployment at 2:00 AM UTC to minimise impact, and check what local time that is for support teams in the US and India.' },
        { title: 'DST transition check', description: 'Verify whether a meeting time shifts due to daylight saving changes in March or November by converting dates before and after the transition.' },
        { title: 'Timestamp debugging', description: 'Convert a UTC timestamp from a server log (e.g., 2026-03-29T14:30:00Z) to your local time zone for investigation.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'UTC', definition: 'Coordinated Universal Time--the primary time standard used worldwide. Time zones are expressed as offsets from UTC (e.g., UTC+5:30 for IST).' },
        { term: 'IANA Time Zone', definition: 'A named identifier like "America/New_York" or "Europe/London" from the IANA Time Zone Database, which the browser uses for accurate conversions.' },
        { term: 'Daylight Saving Time (DST)', definition: 'The practice of advancing clocks during warmer months. DST changes UTC offsets temporarily, making manual conversions error-prone.' },
        { term: 'Offset', definition: 'The difference in hours (and sometimes minutes) between a time zone and UTC. For example, EST is UTC-5 and IST is UTC+5:30.' },
        { term: 'GMT', definition: 'Greenwich Mean Time--historically the reference time standard, now effectively equivalent to UTC for civilian purposes.' },
        { term: 'Intl.DateTimeFormat', definition: 'A JavaScript API that formats dates and times according to locale and time zone rules, ensuring accurate DST handling.' },
        { term: 'Epoch', definition: 'The number of milliseconds since January 1, 1970, 00:00:00 UTC--used internally by JavaScript\'s Date object for time calculations.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does this handle daylight saving time?', answer: 'Yes. The tool uses the browser\'s Intl API which automatically accounts for DST transitions based on the IANA time zone database.' },
        { question: 'How many time zones can I compare at once?', answer: 'You can add multiple target zones and compare them all simultaneously against your source time.' },
        { question: 'Is this tool accurate for future dates?', answer: 'Yes, for currently scheduled DST rules. However, governments occasionally change DST policies, so very far-future conversions may not reflect future legislative changes.' },
        { question: 'Does the tool work offline?', answer: 'Yes. All time zone calculations use the browser\'s built-in APIs. No internet connection or external API calls are needed.' },
        { question: 'Why do some time zones have 30 or 45 minute offsets?', answer: 'Several countries use non-hourly offsets. India (UTC+5:30), Nepal (UTC+5:45), and parts of Australia use fractional offsets for historical and geographical reasons.' },
        { question: 'What is the difference between GMT and UTC?', answer: 'For practical purposes they are the same. GMT is the historical term based on solar time at Greenwich, while UTC is the modern atomic-clock-based standard.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always specify the source time zone explicitly to avoid ambiguity when scheduling.',
        'Use IANA zone names (e.g., "America/New_York") rather than abbreviations ("EST") because abbreviations can be ambiguous.',
        'Check DST transitions around March and November when scheduling recurring cross-timezone meetings.',
        'When coordinating across many zones, find the overlapping window of business hours rather than forcing one zone\'s time.',
        'Store and transmit times in UTC, converting to local zones only for display.',
        'Double-check conversions for dates near DST boundaries, as one-hour shifts can cause confusion.',
        'For regular cross-timezone collaboration, bookmark your most-used zone set for quick reference.',
        'Be aware of half-hour and quarter-hour offset zones (India, Nepal, parts of Australia) when scheduling.'
      ]
    }
  },
  relatedTools: ['countdown-timer', 'timezone-scheduler', 'working-days-calculator', 'daily-planner'],
  seo: {
    metaTitle: 'Time Zone Converter - Convert & Compare Time Zones | Wiki | UnTrackt',
    metaDescription: 'Convert times between time zones, compare multiple zones, and view a live world clock. Handles daylight saving time automatically. Fully browser-based.',
    keywords: ['time zone converter', 'timezone converter', 'world clock', 'convert time zones', 'utc converter', 'dst converter', 'time zone comparison', 'meeting scheduler']
  }
}
