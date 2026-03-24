import SEOHead from '../components/SEOHead.jsx'

const updatedDate = new Date().toISOString().slice(0, 10)

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose dark:prose-invert prose-headings:tracking-tight">
      <SEOHead
        title="Privacy Policy | UnTrackt"
        description="How UnTrackt protects your privacy with a browser-only architecture and zero tracking."
        path="/privacy"
      />

      <h1>Privacy Policy</h1>
      <p>UnTrackt is designed from the ground up to be private. We do not collect, store, or transmit personal data.</p>

      <h2>1. Overview</h2>
      <p>UnTrackt is a fully static tool suite. Most features run entirely inside your browser and your data remains on your device.</p>

      <h2>2. What We Collect</h2>
      <p>Nothing. UnTrackt does not collect personal data.</p>

      <h2>3. Local Storage</h2>
      <p>To improve your experience, UnTrackt may store limited preferences in browser localStorage:</p>
      <ul>
        <li>Theme preference (light, dark, or system)</li>
        <li>Recently visited tools (tool IDs only)</li>
        <li>Saved favorite tools (tool IDs only)</li>
        <li>Tool-specific preferences such as unit or currency choices</li>
        <li>Local usage statistics (visit counts and timestamps)</li>
      </ul>
      <p>All of this data stays on your device. It never leaves your browser and is never sent to any server. You can clear it any time via My Stats or your browser settings.</p>

      <h2>4. Third-Party Services</h2>
      <p>UnTrackt uses no third-party analytics, advertising, or tracking services.</p>
      <p>The Currency Converter tool fetches live exchange rates from open.er-api.com. This is the only external request made by UnTrackt, and only when you use that tool.</p>

      <h2>5. Hosting Infrastructure</h2>
      <p>UnTrackt is hosted on Cloudflare Pages. Cloudflare may maintain standard infrastructure logs such as IP addresses and request timestamps. See Cloudflare&apos;s privacy documentation for their data handling details.</p>

      <h2>6. Cookies</h2>
      <p>UnTrackt does not use cookies.</p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>UnTrackt does not knowingly collect data from anyone under 13.</p>

      <h2>8. Your Rights</h2>
      <p>Because we do not store your personal data on our systems, there is no server-side personal profile to access or delete. To clear local data, visit <strong>/my-stats</strong> and use the clear options.</p>

      <h2>9. Contact</h2>
      <p>Questions about privacy: privacy@untrackt.com</p>

      <h2>10. Last Updated</h2>
      <p>{updatedDate}</p>
    </div>
  )
}
