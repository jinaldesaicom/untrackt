import SEOHead from '../components/SEOHead.jsx'

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose dark:prose-invert prose-headings:tracking-tight">
      <SEOHead
        title="Terms of Use | UnTrackt"
        description="Terms governing use of UnTrackt browser tools."
        path="/terms"
      />

      <h1>Terms of Use</h1>

      <h2>1. Acceptance of Terms</h2>
      <p>By using UnTrackt, you agree to these terms. If you do not agree, please do not use the service.</p>

      <h2>2. Use of the Service</h2>
      <ul>
        <li>UnTrackt is free to use for personal or commercial purposes.</li>
        <li>No account is required.</li>
        <li>Tools are provided on an as-is and as-available basis.</li>
      </ul>

      <h2>3. Disclaimer of Warranties</h2>
      <p>UnTrackt provides estimates and calculations for informational purposes only and does not provide professional advice.</p>
      <ul>
        <li>Financial tools are not financial advice.</li>
        <li>Health tools are not medical advice.</li>
        <li>Legal-related tools are not legal advice.</li>
      </ul>

      <h2>4. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, UnTrackt and contributors are not liable for any direct or indirect damages resulting from use of the tools.</p>

      <h2>5. Intellectual Property</h2>
      <p>UnTrackt is open source. The codebase, UI, and tools are available under the MIT License.</p>

      <h2>6. Changes to Terms</h2>
      <p>We may update these terms from time to time. Continued use after updates means you accept the revised terms.</p>

      <h2>7. Contact</h2>
      <p>Questions about these terms: support@untrackt.com</p>
    </div>
  )
}
