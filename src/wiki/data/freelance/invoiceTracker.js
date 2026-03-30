export default {
  id: 'invoice-tracker',
  title: 'Invoice Tracker',
  description: 'Track invoices, monitor payment status, identify overdue payments, and view monthly revenue summaries.',
  content: {
    whatIs: {
      heading: 'What is the Invoice Tracker?',
      body: 'The Invoice Tracker is a browser-based dashboard for managing all your invoices in one place. It lets you add, edit, and categorize invoices by status (Draft, Sent, Paid, Overdue), filter and search across clients, and view monthly revenue summaries with collection-rate metrics. It integrates with the Invoice Generator so invoices you create there automatically appear in your tracker. All data stays in your browser for complete privacy.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Freelancers and small business owners often juggle dozens of invoices across multiple clients. Without a centralized tracker, overdue invoices slip through the cracks, cash flow becomes unpredictable, and revenue reporting requires manual spreadsheet work. This tool gives you instant visibility into what is owed, what has been paid, and what is overdue--without any subscription fees or data leaving your device.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Add invoices manually or create them in the Invoice Generator to have them appear automatically.',
        'Set the status for each invoice: Draft, Sent, Paid, or Overdue.',
        'Use the search bar to find invoices by client name or invoice number.',
        'Filter by status to focus on overdue or unpaid invoices.',
        'Navigate between months to view revenue summaries and collection rates.',
        'Export invoice data as CSV for accounting or tax purposes.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Centralized dashboard showing all invoices with status indicators.',
        'Automatic overdue detection based on due dates.',
        'Monthly revenue summary with total billed, collected, and outstanding amounts.',
        'Collection rate percentage showing what proportion of billed invoices are paid.',
        'Search and filter by client name, invoice number, or status.',
        'Multi-currency support with per-invoice currency selection.',
        'Integration with Invoice Generator for automatic invoice syncing.',
        'CSV export for accounting and record-keeping.',
        'Local browser storage for complete data privacy.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Monitoring cash flow by tracking paid vs outstanding invoices each month.',
        'Identifying overdue invoices that need follow-up reminders.',
        'Reviewing monthly revenue trends to forecast future income.',
        'Preparing tax records by exporting all invoices for a fiscal year.',
        'Managing multi-client billing with quick search and status filtering.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Monthly Revenue Review', description: 'A freelancer opens the tracker to see $12,500 billed in March: $8,200 paid, $3,000 sent, and $1,300 overdue. The 65.6% collection rate signals a need for follow-up on outstanding invoices.' },
        { title: 'Overdue Follow-Up', description: 'Filtering by "Overdue" reveals 3 invoices past their due dates totaling $4,200. The freelancer sends payment reminders and updates the status as payments arrive.' },
        { title: 'Client Billing History', description: 'Searching for "Acme Corp" shows all invoices for that client across months, making it easy to see total billings and payment patterns.' },
        { title: 'Tax Season Export', description: 'At year-end, the freelancer exports all invoices as CSV, filters by paid status, and provides the data to their accountant for tax filing.' },
        { title: 'Invoice Generator Sync', description: 'After creating a new invoice in the Invoice Generator and clicking "Save to Tracker", the invoice automatically appears in the tracker with Sent status.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Collection Rate', definition: 'The percentage of total billed amount that has been collected (paid). A higher rate indicates healthier cash flow.' },
        { term: 'Overdue Invoice', definition: 'An invoice whose due date has passed without receiving payment. Requires follow-up action.' },
        { term: 'Outstanding Amount', definition: 'The total value of invoices that have been sent but not yet paid.' },
        { term: 'Revenue Summary', definition: 'A monthly overview showing total billed, collected, and outstanding amounts with collection rate.' },
        { term: 'Invoice Status', definition: 'The current state of an invoice: Draft (not sent), Sent (awaiting payment), Paid (collected), or Overdue (past due).' },
        { term: 'Payment Terms', definition: 'The agreed timeframe for payment, such as Net 15, Net 30, or Net 60 days from the invoice date.' },
        { term: 'Accounts Receivable', definition: 'The total amount of money owed to you by clients for invoiced work that has not yet been paid.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does the tracker sync with the Invoice Generator?', answer: 'Yes. When you create an invoice in the Invoice Generator and click "Save to Tracker", it automatically appears here with the correct details.' },
        { question: 'Is my invoice data stored on a server?', answer: 'No. All data is stored locally in your browser. Nothing is sent to any server or third party.' },
        { question: 'Can I track invoices in different currencies?', answer: 'Yes. Each invoice can be assigned its own currency (USD, GBP, EUR, CAD, AUD, INR, JPY) and amounts are displayed with the correct symbol.' },
        { question: 'How does overdue detection work?', answer: 'Any invoice with status "Sent" whose due date is before today is automatically flagged as overdue.' },
        { question: 'Can I export my invoice data?', answer: 'Yes. Use the CSV export feature to download all invoices for use in spreadsheets or accounting software.' },
        { question: 'What happens if I clear my browser data?', answer: 'Invoice data stored in local storage will be lost. Use the Data Sync & Backup tool to export a backup before clearing browser data.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Update invoice statuses promptly when payments are received to keep your dashboard accurate.',
        'Review the overdue filter weekly to catch missed payments early.',
        'Use the monthly revenue summary to track cash flow trends and forecast income.',
        'Back up your invoice data regularly using the Data Sync & Backup tool.',
        'Include clear payment terms on every invoice to reduce overdue occurrences.',
        'Use the search feature to quickly pull up a client\'s full billing history before meetings.',
        'Export data quarterly for tax preparation and accounting records.'
      ]
    }
  },
  relatedTools: ['invoice-generator', 'late-payment-fee-calculator', 'hourly-rate-calculator', 'daily-expense-tracker', 'tax-bracket-estimator'],
  seo: {
    metaTitle: 'Invoice Tracker - Monitor Payments & Revenue | Wiki | UnTrackt',
    metaDescription: 'Track invoices, monitor payment status, spot overdue payments, and view monthly revenue summaries. Free browser-based invoice management for freelancers.',
    keywords: ['invoice tracker', 'payment tracker', 'freelance invoices', 'overdue invoices', 'revenue summary', 'accounts receivable', 'invoice management', 'billing tracker']
  }
}
