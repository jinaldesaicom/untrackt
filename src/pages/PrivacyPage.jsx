import SEOHead from '../components/SEOHead.jsx'

const updatedDate = new Date().toISOString().slice(0, 10)

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose dark:prose-invert prose-headings:tracking-tight">
      <SEOHead
        title="Privacy Policy | UnTrackt"
        description="How UnTrackt protects your privacy with a browser-only architecture and zero tracking."
        path="/privacy-policy"
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
      <p>UnTrackt uses no third-party analytics, advertising, or tracking services. A small number of tools make external requests to provide their functionality. These requests are only made when you actively use the tool — never in the background.</p>

      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>External Service</th>
            <th>What Is Sent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Currency Converter</strong></td>
            <td>open.er-api.com</td>
            <td>A standard HTTP request to fetch the latest exchange rates. No personal data is sent.</td>
          </tr>
          <tr>
            <td><strong>PageSpeed Recommendations</strong></td>
            <td>googleapis.com (PageSpeed Insights API)</td>
            <td>The URL you enter for analysis, plus your chosen strategy (mobile/desktop). If you provide a Google API key, it is sent with the request. No other data is transmitted.</td>
          </tr>
          <tr>
            <td><strong>Robots.txt Tester</strong></td>
            <td>The domain you enter</td>
            <td>A direct browser fetch to <code>/robots.txt</code> on the domain you specify. No data beyond the standard browser request headers is sent.</td>
          </tr>
          <tr>
            <td><strong>Image to Base64</strong></td>
            <td>The image URL you enter</td>
            <td>When you paste a remote image URL, your browser fetches that image directly. No data beyond the standard browser request headers is sent.</td>
          </tr>
          <tr>
            <td><strong>DNS Records</strong></td>
            <td>cloudflare-dns.com (Cloudflare DNS over HTTPS)</td>
            <td>The domain name you enter is sent to Cloudflare&apos;s public DoH resolver to look up DNS records. No personal data is transmitted.</td>
          </tr>
          <tr>
            <td><strong>DataSync (Bring Your Own Storage)</strong></td>
            <td>googleapis.com (Google Drive API)</td>
            <td>When you choose to sync your data via Google Drive, you authenticate directly with Google using your own account. UnTrackt reads and writes only its own app-specific files in your Drive. Your Google credentials are handled entirely by Google&apos;s OAuth flow and are never seen or stored by UnTrackt.</td>
          </tr>
        </tbody>
      </table>

      <p>All other tools run entirely in your browser with zero external requests.</p>

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
