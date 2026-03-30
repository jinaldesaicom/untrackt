export default {
  id: 'data-sync',
  title: 'Data Sync & Backup',
  description: 'Export, import, and QR-transfer all your UnTrackt data between devices without any server or cloud.',
  content: {
    whatIs: {
      heading: 'What is Data Sync & Backup?',
      body: 'Data Sync & Backup is a utility that lets you export all your UnTrackt tool data as a JSON file, import a backup to restore your data, or transfer data between devices using QR codes or text strings. Since all UnTrackt tools store data locally in your browser, this tool provides the bridge for backing up, migrating, and syncing across browsers or devices--all without any server, account, or cloud service.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Browser local storage is private and fast, but it is also tied to a single browser on a single device. If you clear your browser data, switch devices, or reinstall your browser, all your saved tool data is lost. Data Sync & Backup protects against this by letting you create portable backups and transfer data anywhere. It is your safety net for all 228+ tools in UnTrackt.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Open Data Sync & Backup from the General tools or the header icon.',
        'To export: click "Export JSON" to download a backup file containing all your tool data.',
        'To import: select a previously exported JSON file, choose merge or overwrite mode, and confirm.',
        'To transfer via QR: generate a QR code on the source device and scan it on the target device.',
        'To transfer via text: copy the compressed data string on one device and paste it on the other.',
        'After importing, reload the page to see your restored data across all tools.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'One-click JSON export of all tool data with timestamped file naming.',
        'Import with merge (keep existing) or overwrite (replace all) modes.',
        'QR code generation for device-to-device transfer without file sharing.',
        'Compressed text transfer for data that exceeds QR code capacity.',
        'Key count and data size preview before export or import.',
        'Validation and filtering--only recognized UnTrackt keys are exported or imported.',
        'Data integrity check during import with confirmation dialog.',
        'No server, no account, no cloud--everything happens locally in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Backing up all tool data before clearing browser storage or reinstalling.',
        'Migrating data from one computer to another (work to personal, old laptop to new).',
        'Syncing data between your desktop browser and mobile browser.',
        'Sharing a tool configuration (like sprint planner data) with a colleague.',
        'Restoring data after an accidental browser data wipe.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Weekly Backup', description: 'Every Friday, a user exports their data as JSON and saves the file to their cloud drive. If browser storage is ever cleared, they can restore everything in seconds.' },
        { title: 'New Laptop Migration', description: 'When switching to a new laptop, the user exports data from the old browser, transfers the JSON file, and imports it on the new machine--all tool data is restored instantly.' },
        { title: 'Phone to Desktop Sync', description: 'A user generates a QR code on their phone, scans it with their desktop browser camera, and all their mobile tool data is transferred without any file handling.' },
        { title: 'Team Data Sharing', description: 'A project manager exports their sprint planner and retrospective data, shares the JSON file with the team, and each member imports it to start with the same baseline.' },
        { title: 'Merge vs Overwrite', description: 'When importing on a device that already has data, choosing "merge" keeps existing entries intact and only adds new keys. Choosing "overwrite" replaces everything with the backup.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Local Storage', definition: 'Browser-based key-value storage that persists data on your device. Each domain gets its own isolated storage space.' },
        { term: 'JSON Export', definition: 'A backup file in JSON format containing all your tool data as key-value pairs, wrapped with metadata (app name, version, timestamp, key count).' },
        { term: 'Merge Mode', definition: 'An import strategy that only restores keys that do not already exist in your browser, preserving any current data.' },
        { term: 'Overwrite Mode', definition: 'An import strategy that replaces all existing data with the contents of the backup file.' },
        { term: 'QR Transfer', definition: 'Encoding compressed data into a QR code that another device can scan to import the data without file transfer.' },
        { term: 'CompressionStream', definition: 'A browser API used to compress data before encoding it for QR codes or text transfer, reducing payload size.' },
        { term: 'Key Prefix', definition: 'The naming convention (e.g., untrackt:, untrackt_, invoice:) used to identify which localStorage keys belong to UnTrackt tools.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What data is included in the export?', answer: 'All data from every UnTrackt tool that stores data locally: favorites, theme preferences, tool-specific data (invoices, expenses, journals, planners, etc.), and unit preferences.' },
        { question: 'Is the export file secure?', answer: 'The JSON file contains your raw data. Treat it as you would any sensitive file--store it securely and do not share it publicly if it contains personal information.' },
        { question: 'What if my data is too large for a QR code?', answer: 'If the compressed data exceeds QR code capacity (~2,800 characters), use the "Copy Text" option instead and paste it on the target device.' },
        { question: 'Will importing overwrite my current data?', answer: 'Only if you choose "overwrite" mode. In "merge" mode, existing data is preserved and only missing keys are added.' },
        { question: 'Do I need an internet connection?', answer: 'No. Export, import, and QR generation all happen locally in your browser. No data is sent to any server.' },
        { question: 'How often should I back up?', answer: 'Whenever you have made significant data changes. A weekly backup is a good habit for active users.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Create a backup before clearing browser data, switching browsers, or uninstalling browser extensions.',
        'Store exported JSON files in a secure location like an encrypted cloud drive or external storage.',
        'Use merge mode when importing to a device that already has data you want to keep.',
        'After importing, always reload the page to ensure all tools pick up the restored data.',
        'Use the key count indicator to verify that the expected number of entries were exported or imported.',
        'For regular backups, adopt a naming convention like "untrackt-backup-YYYY-MM-DD.json".',
        'Test your backup by importing it on a different browser to confirm data integrity.'
      ]
    }
  },
  relatedTools: ['clipboard-manager', 'text-snippets', 'notepad', 'todo-list'],
  seo: {
    metaTitle: 'Data Sync & Backup - Export, Import & QR Transfer | Wiki | UnTrackt',
    metaDescription: 'Export, import, and transfer your UnTrackt data between devices with JSON backup and QR codes. No server, no account--complete data privacy.',
    keywords: ['data backup', 'data sync', 'export import', 'QR transfer', 'browser backup', 'local storage backup', 'data migration', 'privacy-first backup']
  }
}
