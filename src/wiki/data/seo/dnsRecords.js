export default {
  id: 'dns-records',
  title: 'DNS Records Lookup',
  description: 'Look up DNS records for any domain using Cloudflare DNS-over-HTTPS, with color-coded record types and DNSSEC verification.',
  content: {
    whatIs: {
      heading: 'What is the DNS Records Lookup Tool?',
      body: 'The DNS Records Lookup tool queries DNS records for any domain using Cloudflare\'s DNS-over-HTTPS (DoH) API. It retrieves and displays A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, CAA, and PTR records with color-coded labels, formatted TTL values, and DNSSEC verification status. The query goes through Cloudflare\'s public resolver (1.1.1.1)--no data is stored on any server and results are displayed entirely in your browser.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'DNS records control how a domain resolves, where email is delivered, and what services are authorized. Checking DNS is essential when troubleshooting website issues, verifying email configuration, migrating domains, or auditing SEO-related settings. This tool provides a clean, color-coded interface for quickly inspecting all record types without using command-line tools like dig or nslookup.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a domain name (e.g., example.com) in the input field.',
        'Click lookup or press Enter to query DNS records.',
        'View results organized by record type with color-coded labels.',
        'Check TTL values displayed in human-readable format.',
        'Review the DNSSEC verification status for the domain.',
        'Copy individual records or the full result set to your clipboard.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Look up 10+ DNS record types: A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, CAA, PTR.',
        'Color-coded record type labels for quick visual identification.',
        'Human-readable TTL formatting (e.g., "5 minutes" instead of "300").',
        'DNSSEC verification status display.',
        'Powered by Cloudflare DNS-over-HTTPS (1.1.1.1) for fast, private queries.',
        'Copy individual records or full results to clipboard.',
        'Clean, organized display grouping records by type.',
        'No installation required--runs entirely in your browser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Verifying A/AAAA records point to the correct server IP after a migration.',
        'Checking MX records to troubleshoot email delivery issues.',
        'Confirming TXT records for domain verification (Google, Microsoft, SPF, DKIM, DMARC).',
        'Auditing NS records to verify which DNS provider is authoritative for a domain.',
        'Checking CNAME records for CDN or subdomain configurations.',
        'Verifying CAA records that restrict which certificate authorities can issue SSL certificates.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Website migration check', description: 'After migrating a site to a new server, look up A records to confirm the domain points to the new IP address.' },
        { title: 'Email troubleshooting', description: 'Check MX records to ensure mail is routed to the correct email service (e.g., Google Workspace, Microsoft 365).' },
        { title: 'SPF/DKIM verification', description: 'Look up TXT records to verify that SPF, DKIM, and DMARC entries are correctly configured for email authentication.' },
        { title: 'SSL certificate audit', description: 'Query CAA records to confirm which certificate authorities are authorized to issue certificates for the domain.' },
        { title: 'CDN configuration', description: 'Check CNAME records to verify that a subdomain (e.g., cdn.example.com) correctly points to the CDN provider.' },
        { title: 'DNS propagation check', description: 'After updating DNS records, query the domain to verify changes are visible through Cloudflare\'s resolver, indicating propagation progress.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'A Record', definition: 'Maps a domain name to an IPv4 address (e.g., 93.184.216.34). The most fundamental DNS record type.' },
        { term: 'AAAA Record', definition: 'Maps a domain name to an IPv6 address. The IPv6 equivalent of an A record.' },
        { term: 'CNAME Record', definition: 'Canonical Name--an alias that points one domain name to another (e.g., www.example.com → example.com).' },
        { term: 'MX Record', definition: 'Mail Exchanger--specifies the mail server(s) responsible for receiving email for the domain, with priority values.' },
        { term: 'TXT Record', definition: 'A text record holding arbitrary data, commonly used for SPF, DKIM, DMARC, and domain verification strings.' },
        { term: 'NS Record', definition: 'Nameserver--identifies the authoritative DNS servers for a domain.' },
        { term: 'SOA Record', definition: 'Start of Authority--contains administrative information about the domain including the primary nameserver, admin email, and zone serial number.' },
        { term: 'TTL', definition: 'Time to Live--the duration (in seconds) that a DNS record is cached by resolvers before re-querying the authoritative server.' },
        { term: 'DNSSEC', definition: 'DNS Security Extensions--a suite of cryptographic signatures that verify DNS responses have not been tampered with.' },
        { term: 'DNS-over-HTTPS (DoH)', definition: 'A protocol that sends DNS queries over encrypted HTTPS connections, preventing eavesdropping and tampering by intermediaries.' },
        { term: 'CAA Record', definition: 'Certificate Authority Authorization--specifies which CAs are allowed to issue SSL/TLS certificates for the domain.' },
        { term: 'SRV Record', definition: 'Service record--specifies the hostname, port, priority, and weight for a specific service (e.g., SIP, XMPP).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is this tool accurate?', answer: 'Yes. It queries Cloudflare\'s public DNS resolver (1.1.1.1) via DNS-over-HTTPS, which provides authoritative and up-to-date results. Note that recently changed records may still be cached at the old TTL.' },
        { question: 'Does this tool store my queries?', answer: 'No. Queries are sent to Cloudflare\'s DoH API and results are displayed in your browser. Nothing is stored on any UnTrackt server.' },
        { question: 'Why don\'t I see recently changed records?', answer: 'DNS records are cached by resolvers based on their TTL value. Recent changes may take minutes to hours to propagate depending on the TTL.' },
        { question: 'What does DNSSEC verification mean?', answer: 'DNSSEC uses cryptographic signatures to verify that DNS responses are authentic and have not been altered in transit. A verified status means the domain has valid DNSSEC signatures.' },
        { question: 'Can I look up subdomains?', answer: 'Yes. Enter any subdomain (e.g., blog.example.com) to query its specific DNS records.' },
        { question: 'Why are some record types empty?', answer: 'Not all domains have every record type configured. For example, a domain without email may have no MX records, and many domains lack SRV or CAA records.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always verify DNS records after making changes to confirm they have propagated correctly.',
        'Check MX, SPF, DKIM, and DMARC records together when troubleshooting email delivery.',
        'Use low TTL values (300 seconds) before planned DNS migrations, then increase after confirming the change.',
        'Verify CAA records if you are having issues obtaining SSL certificates from a specific CA.',
        'Check NS records to confirm which DNS provider is authoritative before making changes.',
        'Cross-reference A/AAAA records with your hosting provider\'s expected IP addresses.',
        'Look up both the root domain and www subdomain to ensure both are correctly configured.',
        'Enable DNSSEC on your domain to prevent DNS spoofing and cache poisoning attacks.'
      ]
    }
  },
  relatedTools: ['robots-txt-generator', 'robots-txt-tester', 'schema-markup-generator', 'canonical-tag-generator'],
  seo: {
    metaTitle: 'DNS Records Lookup - Query A, MX, TXT, CNAME & More | Wiki | UnTrackt',
    metaDescription: 'Look up DNS records for any domain via Cloudflare DoH. View A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, CAA records with DNSSEC verification.',
    keywords: ['dns lookup', 'dns records', 'domain lookup', 'mx records', 'txt records', 'dns checker', 'nameserver lookup', 'dnssec', 'dns over https']
  }
}
