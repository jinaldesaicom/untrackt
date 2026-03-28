export default {
  id: 'unix-timestamp-converter',
  title: 'Unix Timestamp Converter',
  description: 'Convert Unix timestamps to human-readable dates and vice versa, with support for multiple timezones and date formats.',
  content: {
    whatIs: {
      heading: 'What is the Unix Timestamp Converter?',
      body: 'The Unix Timestamp Converter is a tool that translates between Unix timestamps (the number of seconds or milliseconds since January 1, 1970 00:00:00 UTC -- known as the epoch) and human-readable date-time formats. Developers frequently encounter Unix timestamps in APIs, databases, log files, and system configurations. This tool converts them to readable dates in any timezone and format, and also converts human-readable dates back to Unix timestamps for use in code and queries.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Unix timestamps are compact and timezone-agnostic, making them ideal for computers but difficult for humans to read. Debugging time-related issues, parsing API responses, setting expiration times, or comparing log entries across timezones all require converting between timestamps and readable dates. This tool handles both directions instantly, supports seconds and milliseconds precision, and displays results in multiple timezones simultaneously.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a Unix timestamp (in seconds or milliseconds) to convert to a human-readable date.',
        'Or select a date and time using the date picker to convert to a Unix timestamp.',
        'Choose your target timezone from the dropdown or view results in multiple timezones.',
        'Toggle between seconds and milliseconds precision for the timestamp.',
        'View the result in multiple formats: ISO 8601, RFC 2822, locale-specific, and relative time.',
        'Copy any result to your clipboard with one click.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Bidirectional conversion: timestamp to date and date to timestamp.',
        'Support for both seconds and milliseconds precision.',
        'Display results in any timezone with IANA timezone database support.',
        'Multiple output formats: ISO 8601, RFC 2822, locale-specific, and custom.',
        'Live "now" clock showing the current Unix timestamp in real-time.',
        'Relative time display (e.g., "3 hours ago", "in 2 days").',
        'Batch conversion of multiple timestamps at once.',
        'Client-side processing with no server communication.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting API response timestamps to readable dates for debugging.',
        'Setting JWT expiration (exp) and issued-at (iat) claims in token configurations.',
        'Translating database timestamp columns to human-readable values.',
        'Comparing log entries from servers in different timezones.',
        'Calculating time differences between two Unix timestamps.',
        'Preparing timestamp values for SQL queries or API request parameters.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Decode Epoch', description: 'Input 1700000000 to see it represents November 14, 2023 at 22:13:20 UTC.' },
        { title: 'JWT Expiration Check', description: 'Paste the exp claim value from a JWT (e.g., 1700003600) to see exactly when the token expires.' },
        { title: 'Milliseconds Precision', description: 'Input 1700000000000 (13 digits) and the tool automatically detects milliseconds precision.' },
        { title: 'Date to Timestamp', description: 'Select "2025-01-01 00:00:00 UTC" to get the Unix timestamp 1735689600 for use in API calls.' },
        { title: 'Timezone Comparison', description: 'Convert a timestamp and view the same moment in UTC, EST, PST, CET, and JST simultaneously.' },
        { title: 'Relative Time', description: 'Input a past timestamp to see "2 months, 5 days ago" alongside the exact date and time.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Epoch', definition: 'The reference point for Unix timestamps: January 1, 1970 at 00:00:00 UTC. All timestamps are calculated as offsets from this moment.' },
        { term: 'UTC', definition: 'Coordinated Universal Time -- the primary time standard by which the world regulates clocks, used as the base timezone for Unix timestamps.' },
        { term: 'ISO 8601', definition: 'An international standard for representing dates and times: YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-01-15T14:30:00Z).' },
        { term: 'Milliseconds', definition: 'A timestamp precision of 1/1000th of a second. JavaScript\'s Date.now() returns milliseconds since the epoch (13-digit value).' },
        { term: 'Timezone Offset', definition: 'The difference in hours and minutes between a local timezone and UTC, expressed as +HH:MM or -HH:MM.' },
        { term: 'Unix Time', definition: 'The number of seconds elapsed since the epoch (January 1, 1970 00:00:00 UTC), not counting leap seconds.' },
        { term: 'RFC 2822', definition: 'A date-time format commonly used in email headers and HTTP: "Tue, 14 Nov 2023 22:13:20 +0000".' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is a Unix timestamp in seconds or milliseconds?', answer: 'Traditional Unix timestamps are in seconds (10 digits for current dates). JavaScript and some APIs use milliseconds (13 digits). This tool auto-detects based on the number of digits.' },
        { question: 'What is the Year 2038 problem?', answer: 'On systems using 32-bit signed integers for timestamps, the maximum representable time is January 19, 2038 at 03:14:07 UTC. After this, the value overflows. Most modern systems use 64-bit integers to avoid this.' },
        { question: 'Do Unix timestamps account for leap seconds?', answer: 'No. Unix timestamps do not count leap seconds -- they assume every day has exactly 86,400 seconds. This means Unix time can differ from UTC by the number of leap seconds that have occurred.' },
        { question: 'Can I convert negative timestamps?', answer: 'Yes. Negative timestamps represent dates before the epoch (January 1, 1970). For example, -86400 represents December 31, 1969.' },
        { question: 'How do I get the current Unix timestamp in code?', answer: 'In JavaScript: Math.floor(Date.now() / 1000). In Python: import time; int(time.time()). In PHP: time(). In Java: System.currentTimeMillis() / 1000.' },
        { question: 'Why do two systems show different timestamps for the same event?', answer: 'This usually happens when timestamps are stored in local time without timezone information. Always use UTC timestamps and convert to local time only for display.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always store timestamps in UTC and convert to local timezones only for display purposes.',
        'Use ISO 8601 format for human-readable date strings in APIs and data interchange.',
        'Include timezone information in all date strings to avoid ambiguity.',
        'Be aware of seconds vs. milliseconds precision -- JavaScript uses milliseconds, most APIs use seconds.',
        'Use 64-bit integers for timestamps to avoid the Y2038 overflow problem.',
        'When comparing timestamps from different systems, ensure they all use the same precision and timezone.',
        'Consider using ISO 8601 strings instead of raw timestamps in API responses for better developer experience.'
      ]
    }
  },
  relatedTools: ['jwt-decoder', 'cron-parser', 'json-formatter', 'number-base-converter', 'hash-generator'],
  seo: {
    metaTitle: 'Unix Timestamp Converter - Epoch to Date Online | UnTrackt Wiki',
    metaDescription: 'Convert Unix timestamps to readable dates and dates to timestamps. Supports seconds, milliseconds, multiple timezones, and ISO 8601 format.',
    keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to timestamp', 'unix time', 'epoch time', 'iso 8601 converter', 'utc converter']
  }
};
