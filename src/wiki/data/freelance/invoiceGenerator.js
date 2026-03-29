export default {
  id: 'invoice-generator',
  title: 'Invoice Generator',
  description:
    'Create professional invoices with customizable templates, automatic tax calculations, and PDF export for seamless client billing.',
  content: {
    whatIs: {
      heading: 'What is the Invoice Generator?',
      body: 'The Invoice Generator is a browser-based tool that lets freelancers and small business owners create polished, itemized invoices in minutes. It supports customizable templates, automatic subtotal and tax calculations, payment term configuration, and one-click PDF export--all without requiring accounting software or an internet connection after the page loads. Your data stays in your browser for maximum privacy.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Professional invoicing is essential for getting paid on time and maintaining credibility with clients. Sloppy or inconsistent invoices lead to payment delays, disputes, and a less-than-professional impression. This tool standardizes your billing process, ensures every invoice includes the correct tax and payment details, and saves you the recurring cost of premium invoicing SaaS platforms. For freelancers managing multiple clients, quick invoice generation means more time spent on billable work.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your business name, address, and contact information in the "From" section.',
        'Add the client\'s name, address, and email in the "Bill To" section.',
        'Set the invoice number, issue date, and due date.',
        'Add line items with descriptions, quantities, unit prices, and applicable tax rates.',
        'Review the automatically calculated subtotal, taxes, and grand total.',
        'Choose a template style, add optional notes or payment instructions, and export to PDF.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Multiple professional invoice templates to match your brand.',
        'Automatic calculation of subtotals, discounts, taxes, and totals.',
        'Configurable payment terms including Net 15, Net 30, Net 60, and custom terms.',
        'PDF export for easy emailing or printing.',
        'Support for multiple tax rates and tax-exempt line items.',
        'Recurring invoice capability for retainer clients.',
        'Auto-incrementing invoice numbers to keep your records sequential.',
        'Local storage auto-save so you never lose a draft.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Billing clients for completed freelance projects or milestones.',
        'Creating recurring monthly invoices for retainer agreements.',
        'Generating itemized invoices for time-and-materials engagements.',
        'Issuing credit notes or adjusted invoices after scope changes.',
        'Preparing tax-ready records by exporting all invoices for the fiscal year.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Web Design Project Invoice',
          description:
            'A freelancer invoices a client for a 3-page website redesign: "Homepage Design - $2,000", "About Page - $800", "Contact Page - $600". With 8% sales tax applied, the total comes to $3,672.',
        },
        {
          title: 'Monthly Retainer Invoice',
          description:
            'A marketing consultant bills $4,000/month for ongoing SEO services. The invoice auto-generates on the 1st with Net 15 terms and the same line item each month.',
        },
        {
          title: 'Hourly Development Invoice',
          description:
            'A developer logs 42.5 hours at $95/hr for back-end API work. The single line item totals $4,037.50, with a 5 % early-payment discount offered.',
        },
        {
          title: 'Multi-Currency International Invoice',
          description:
            'A UK-based copywriter invoices a US client in USD. Line items are listed in dollars, and the invoice notes include the GBP equivalent for bookkeeping.',
        },
        {
          title: 'Milestone-Based Invoice',
          description:
            'A mobile app project split into 4 milestones: Discovery ($3,000), Design ($5,000), Development ($10,000), Launch ($2,000). Each milestone triggers a separate invoice upon approval.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Invoice Number',
          definition:
            'A unique sequential identifier assigned to each invoice for tracking and accounting purposes.',
        },
        {
          term: 'Net Terms',
          definition:
            'The number of days a client has to pay after the invoice date. Common terms include Net 15, Net 30, and Net 60.',
        },
        {
          term: 'Line Item',
          definition:
            'An individual entry on an invoice describing a specific product, service, quantity, and price.',
        },
        {
          term: 'Subtotal',
          definition:
            'The sum of all line items before taxes, discounts, or additional fees are applied.',
        },
        {
          term: 'Credit Note',
          definition:
            'A document issued to reduce the amount owed on a previous invoice, often used for refunds or billing corrections.',
        },
        {
          term: 'Retainer',
          definition:
            'A recurring fee paid in advance to secure ongoing services, typically billed monthly.',
        },
        {
          term: 'Payment Terms',
          definition:
            'The conditions under which a payment is expected, including due date, accepted methods, and any early-payment discounts.',
        },
        {
          term: 'Tax-Exempt',
          definition:
            'A line item or transaction not subject to sales or value-added tax, often due to the buyer\'s status or product category.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is my invoice data stored on a server?',
          answer:
            'No. All data remains in your browser\'s local storage. Nothing is uploaded to any server unless you explicitly export and send the PDF yourself.',
        },
        {
          question: 'Can I add my logo to the invoice?',
          answer:
            'Yes. Upload your logo in the branding section and it will appear at the top of every invoice you generate.',
        },
        {
          question: 'Does the tool support multiple currencies?',
          answer:
            'Yes. Select your preferred currency from the settings, and all amounts will be formatted accordingly.',
        },
        {
          question: 'Can I send invoices directly from the tool?',
          answer:
            'The tool generates a PDF that you can attach to an email or upload to a payment platform. Direct email sending is not currently supported.',
        },
        {
          question: 'How do I handle partial payments?',
          answer:
            'Record partial payments in your accounting system and issue an updated invoice or statement reflecting the remaining balance.',
        },
        {
          question: 'Are the invoices legally valid?',
          answer:
            'The invoices include all standard fields required in most jurisdictions. Check your local regulations for any additional requirements such as VAT registration numbers.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent invoice numbering across all clients to simplify year-end accounting.',
        'Always include clear payment instructions--bank details, PayPal, or payment link.',
        'Send invoices promptly upon project completion or milestone delivery.',
        'Set automated reminders for unpaid invoices at 7, 14, and 30 days past due.',
        'Keep a copy of every invoice in a dedicated folder organized by year and client.',
        'Include a brief description of the work performed so clients can match invoices to projects.',
        'Specify late payment penalties in your payment terms to encourage timely payment.',
      ],
    },
  },
  relatedTools: [
    'hourly-rate-calculator',
    'late-payment-fee-calculator',
    'tax-bracket-estimator',
    'client-profitability-estimator',
    'discount-markup-calculator',
  ],
  seo: {
    metaTitle: 'Free Invoice Generator for Freelancers - Wiki | UnTrackt',
    metaDescription:
      'Create professional invoices with customizable templates, tax calculations, and PDF export. Learn best practices for freelance billing and payment terms.',
    keywords: [
      'invoice generator',
      'freelance invoice',
      'create invoice online',
      'PDF invoice',
      'invoice template',
      'billing tool',
      'payment terms',
      'freelancer billing',
    ],
  },
};
