export default {
  id: 'json-to-csv-converter',
  title: 'JSON to CSV Converter',
  description: 'Transform JSON arrays and objects into properly formatted CSV files with configurable delimiters, header options, and nested data flattening.',
  content: {
    whatIs: {
      heading: 'What is the JSON to CSV Converter?',
      body: 'The JSON to CSV Converter transforms JSON data structures into comma-separated values (CSV) format suitable for spreadsheets, databases, and data analysis tools. It handles JSON arrays of objects, nested structures (by flattening), and mixed-type fields. You can configure the delimiter, quote character, header inclusion, and null/undefined handling before exporting or copying the result.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'JSON is the standard data format for APIs and web applications, but many business tools--Excel, Google Sheets, SQL imports, analytics dashboards--expect CSV. This tool bridges that gap instantly without writing conversion scripts, handling edge cases like nested objects, special characters, and inconsistent fields automatically.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your JSON data into the input editor or upload a .json file.',
        'The tool validates the JSON and displays a preview of the detected structure.',
        'Configure options: delimiter (comma, semicolon, tab), include headers, flatten nested objects.',
        'View the CSV preview in a formatted table.',
        'Copy the CSV text to your clipboard or download as a .csv file.',
        'For nested JSON, review the flattened column names (e.g., "address.city") and adjust if needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic JSON validation with clear error messages for malformed input.',
        'Nested object flattening with dot-notation column names (e.g., "user.address.city").',
        'Configurable delimiters: comma, semicolon, tab, or custom character.',
        'Optional header row inclusion/exclusion.',
        'Proper CSV escaping: quotes around fields containing commas, newlines, or quote characters.',
        'Handles arrays of objects with inconsistent keys (union of all fields).',
        'Download as .csv file or copy to clipboard.',
        'Preview table showing the converted data before export.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting API response data into spreadsheet format for business analysis.',
        'Preparing JSON data exports for import into SQL databases or ETL pipelines.',
        'Converting configuration or log data from JSON to CSV for reporting.',
        'Sharing data with non-technical stakeholders who prefer Excel or Google Sheets.',
        'Migrating data between systems that use different formats.',
        'Testing and validating data transformations during development.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Simple array of objects', description: '[{"name":"Alice","age":30},{"name":"Bob","age":25}] → name,age\\nAlice,30\\nBob,25' },
        { title: 'Nested objects', description: '{"user":{"name":"Alice","address":{"city":"NYC"}}} → Flattened to columns "user.name" and "user.address.city".' },
        { title: 'Inconsistent fields', description: 'Objects with different keys are merged: missing fields become empty cells in the CSV output.' },
        { title: 'Fields with commas', description: '{"note":"Hello, world"} → note\\n"Hello, world" -- fields containing commas are properly quoted.' },
        { title: 'Semicolon delimiter', description: 'For European locales that use commas as decimal separators, export with semicolon delimiter: name;age\\nAlice;30.' },
        { title: 'Array values', description: '{"tags":["js","react"]} → tags column contains "js,react" or is expanded to "tags.0","tags.1" depending on flatten settings.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'JSON (JavaScript Object Notation)', definition: 'A lightweight text-based data format using key-value pairs and arrays, widely used for APIs and configuration files.' },
        { term: 'CSV (Comma-Separated Values)', definition: 'A plain-text format where each line is a data record and fields are separated by commas (or other delimiters).' },
        { term: 'Delimiter', definition: 'The character used to separate fields in a CSV file. Common delimiters are comma (,), semicolon (;), and tab (\\t).' },
        { term: 'Flattening', definition: 'The process of converting nested JSON structures into flat key-value pairs using dot notation for column names.' },
        { term: 'Escaping', definition: 'Wrapping field values in quotes and doubling internal quotes to prevent CSV parsing errors when fields contain special characters.' },
        { term: 'Header row', definition: 'The first row of a CSV file containing column names, corresponding to the keys of the JSON objects.' },
        { term: 'RFC 4180', definition: 'The formal specification for CSV format, defining rules for quoting, escaping, and line endings.' },
        { term: 'ETL (Extract, Transform, Load)', definition: 'A data processing pattern where data is extracted from a source, transformed (e.g., JSON to CSV), and loaded into a target system.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What JSON structures are supported?', answer: 'The tool works best with JSON arrays of objects (each object becomes a row). Single objects are treated as a one-row table. Nested objects are automatically flattened.' },
        { question: 'How are nested objects handled?', answer: 'Nested objects are flattened using dot notation. For example, {"user":{"name":"Alice"}} becomes a column named "user.name" with value "Alice".' },
        { question: 'What happens with null or undefined values?', answer: 'Null and undefined values become empty cells in the CSV output by default. You can configure a custom placeholder if needed.' },
        { question: 'Can I use a tab delimiter instead of commas?', answer: 'Yes. Select "Tab" from the delimiter options to produce a TSV (Tab-Separated Values) file, which works well with certain database import tools.' },
        { question: 'Is my data secure?', answer: 'Yes. All conversion happens in your browser. No JSON data is sent to any server.' },
        { question: 'What is the maximum file size?', answer: 'The tool handles JSON files up to several megabytes. Very large files (50 MB+) may be slow in the browser; consider a server-side tool for those.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Validate your JSON before converting--the tool highlights syntax errors to help you fix them.',
        'Use dot-notation flattening for nested data to produce clean, flat CSV columns.',
        'Choose semicolon delimiter for European locales where commas serve as decimal separators.',
        'Include the header row for data that will be opened in spreadsheets to ensure columns are labeled.',
        'Preview the converted data in the table view before downloading to catch unexpected formatting.',
        'For large datasets, test with a small sample first to verify the output structure.',
        'When importing CSV into a database, match the CSV columns to the database schema before loading.',
        'Use RFC 4180-compliant quoting to ensure compatibility with all CSV parsers.'
      ]
    }
  },
  relatedTools: ['word-frequency-counter', 'case-converter', 'meta-tag-generator', 'text-to-slug'],
  seo: {
    metaTitle: 'JSON to CSV Converter - Transform JSON Data to CSV | Wiki | UnTrackt',
    metaDescription: 'Convert JSON arrays and nested objects to properly formatted CSV files. Configurable delimiters, automatic flattening, and RFC 4180-compliant output.',
    keywords: ['JSON to CSV', 'JSON converter', 'CSV converter', 'data transformation', 'JSON export', 'CSV download', 'flatten JSON', 'data format conversion']
  }
};
