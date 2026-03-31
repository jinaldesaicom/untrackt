const https = require('https');
const http = require('http');
const { URL } = require('url');

// All status URLs extracted from statusPages.js
const services = [
  { id: 'aws', url: 'https://health.aws.amazon.com/health/status' },
  { id: 'google-cloud', url: 'https://status.cloud.google.com' },
  { id: 'azure', url: 'https://status.azure.com' },
  { id: 'cloudflare', url: 'https://www.cloudflarestatus.com' },
  { id: 'digitalocean', url: 'https://status.digitalocean.com' },
  { id: 'vercel', url: 'https://www.vercel-status.com' },
  { id: 'netlify', url: 'https://www.netlifystatus.com' },
  { id: 'heroku', url: 'https://status.heroku.com' },
  { id: 'fly-io', url: 'https://status.flyio.net' },
  { id: 'railway', url: 'https://status.railway.app' },
  { id: 'render', url: 'https://status.render.com' },
  { id: 'supabase', url: 'https://status.supabase.com' },
  { id: 'firebase', url: 'https://status.firebase.google.com' },
  { id: 'mongodb-atlas', url: 'https://status.mongodb.com' },
  { id: 'planetscale', url: 'https://www.planetscalestatus.com' },
  { id: 'upstash', url: 'https://status.upstash.com' },
  { id: 'github', url: 'https://www.githubstatus.com' },
  { id: 'gitlab', url: 'https://status.gitlab.com' },
  { id: 'bitbucket', url: 'https://bitbucket.status.atlassian.com' },
  { id: 'npm', url: 'https://status.npmjs.org' },
  { id: 'docker-hub', url: 'https://www.dockerstatus.com' },
  { id: 'jira', url: 'https://jira-software.status.atlassian.com' },
  { id: 'confluence', url: 'https://confluence.status.atlassian.com' },
  { id: 'linear', url: 'https://linearstatus.com' },
  { id: 'sentry', url: 'https://status.sentry.io' },
  { id: 'datadog', url: 'https://status.datadoghq.com' },
  { id: 'new-relic', url: 'https://status.newrelic.com' },
  { id: 'pagerduty', url: 'https://status.pagerduty.com' },
  { id: 'circleci', url: 'https://status.circleci.com' },
  { id: 'travis-ci', url: 'https://www.traviscistatus.com' },
  { id: 'sonarcloud', url: 'https://status.sonarcloud.io' },
  { id: 'slack', url: 'https://status.slack.com' },
  { id: 'discord', url: 'https://discordstatus.com' },
  { id: 'microsoft-teams', url: 'https://status.office.com' },
  { id: 'zoom', url: 'https://status.zoom.us' },
  { id: 'google-meet', url: 'https://workspace.google.com/status' },
  { id: 'intercom', url: 'https://www.intercomstatus.com' },
  { id: 'zendesk', url: 'https://status.zendesk.com' },
  { id: 'twilio', url: 'https://status.twilio.com' },
  { id: 'sendgrid', url: 'https://status.sendgrid.com' },
  { id: 'mailchimp', url: 'https://status.mailchimp.com' },
  { id: 'mailgun', url: 'https://status.mailgun.com' },
  { id: 'postmark', url: 'https://status.postmarkapp.com' },
  { id: 'stripe', url: 'https://status.stripe.com' },
  { id: 'paypal', url: 'https://www.paypal-status.com' },
  { id: 'square', url: 'https://www.issquareup.com' },
  { id: 'wise', url: 'https://status.wise.com' },
  { id: 'shopify', url: 'https://www.shopifystatus.com' },
  { id: 'braintree', url: 'https://status.braintreepayments.com' },
  { id: 'adyen', url: 'https://status.adyen.com' },
  { id: 'notion', url: 'https://status.notion.so' },
  { id: 'figma', url: 'https://status.figma.com' },
  { id: 'airtable', url: 'https://status.airtable.com' },
  { id: 'asana', url: 'https://status.asana.com' },
  { id: 'trello', url: 'https://trello.status.atlassian.com' },
  { id: 'monday', url: 'https://status.monday.com' },
  { id: 'clickup', url: 'https://status.clickup.com' },
  { id: 'dropbox', url: 'https://status.dropbox.com' },
  { id: 'google-workspace', url: 'https://workspace.google.com/status' },
  { id: 'microsoft-365', url: 'https://status.office.com' },
  { id: 'miro', url: 'https://status.miro.com' },
  { id: 'loom', url: 'https://status.loom.com' },
  { id: 'twitter-x', url: 'https://status.twitterstat.us' },
  { id: 'facebook', url: 'https://metastatus.com' },
  { id: 'instagram', url: 'https://metastatus.com' },
  { id: 'linkedin', url: 'https://www.linkedinstatus.com' },
  { id: 'youtube', url: 'https://www.google.com/appsstatus/dashboard' },
  { id: 'tiktok', url: 'https://www.tiktokstatus.com' },
  { id: 'reddit', url: 'https://www.redditstatus.com' },
  { id: 'pinterest', url: 'https://www.pintereststatus.com' },
  { id: 'okta', url: 'https://status.okta.com' },
  { id: 'auth0', url: 'https://status.auth0.com' },
  { id: 'fastly', url: 'https://status.fastly.com' },
  { id: 'akamai', url: 'https://cloudharmony.com/status-for-akamai' },
  { id: '1password', url: 'https://status.1password.com' },
  { id: 'lastpass', url: 'https://status.lastpass.com' },
  { id: 'openai', url: 'https://status.openai.com' },
  { id: 'anthropic', url: 'https://status.anthropic.com' },
  { id: 'google-ai', url: 'https://status.cloud.google.com' },
  { id: 'hugging-face', url: 'https://status.huggingface.co' },
  { id: 'perplexity', url: 'https://status.perplexity.ai' },
  { id: 'replicate', url: 'https://status.replicate.com' },
  { id: 'google-search', url: 'https://www.google.com/appsstatus' },
  { id: 'hubspot', url: 'https://status.hubspot.com' },
  { id: 'salesforce', url: 'https://status.salesforce.com' },
  { id: 'segment', url: 'https://status.segment.com' },
  { id: 'mixpanel', url: 'https://status.mixpanel.com' },
  { id: 'hotjar', url: 'https://status.hotjar.com' },
  { id: 'typeform', url: 'https://status.typeform.com' },
  { id: 'netflix', url: 'https://help.netflix.com/en/is-netflix-down' },
  { id: 'spotify', url: 'https://status.spotify.com' },
  { id: 'twitch', url: 'https://status.twitch.tv' },
  { id: 'cloudinary', url: 'https://status.cloudinary.com' },
  { id: 'linode', url: 'https://status.linode.com' },
  { id: 'vultr', url: 'https://status.vultr.com' },
  { id: 'oracle-cloud', url: 'https://ocistatus.oraclecloud.com' },
  { id: 'ibm-cloud', url: 'https://cloud.ibm.com/status' },
  { id: 'elastic-cloud', url: 'https://status.elastic.co' },
  { id: 'redis-cloud', url: 'https://status.redis.io' },
  { id: 'cockroachdb', url: 'https://status.cockroachlabs.cloud' },
  { id: 'neon', url: 'https://neonstatus.com' },
  { id: 'github-actions', url: 'https://www.githubstatus.com' },
  { id: 'vercel-analytics', url: 'https://www.vercel-status.com' },
  { id: 'terraform-cloud', url: 'https://status.hashicorp.com' },
  { id: 'vault', url: 'https://status.hashicorp.com' },
  { id: 'grafana-cloud', url: 'https://status.grafana.com' },
  { id: 'launchdarkly', url: 'https://status.launchdarkly.com' },
  { id: 'snyk', url: 'https://status.snyk.io' },
  { id: 'cloudsmith', url: 'https://status.cloudsmith.com' },
  { id: 'webex', url: 'https://status.webex.com' },
  { id: 'freshdesk', url: 'https://status.freshdesk.com' },
  { id: 'crisp', url: 'https://status.crisp.chat' },
  { id: 'plivo', url: 'https://status.plivo.com' },
  { id: 'woocommerce', url: 'https://www.woocommercestatus.com' },
  { id: 'gumroad', url: 'https://status.gumroad.com' },
  { id: 'lemonsqueezy', url: 'https://status.lemonsqueezy.com' },
  { id: 'paddle', url: 'https://status.paddle.com' },
  { id: 'coda', url: 'https://status.coda.io' },
  { id: 'canva', url: 'https://status.canva.com' },
  { id: 'todoist', url: 'https://status.todoist.com' },
  { id: 'evernote', url: 'https://status.evernote.com' },
  { id: 'calendly', url: 'https://status.calendly.com' },
  { id: 'zapier', url: 'https://status.zapier.com' },
  { id: 'make', url: 'https://status.make.com' },
  { id: 'slack-api', url: 'https://status.slack.com' },
  { id: 'snapchat', url: 'https://status.snap.com' },
  { id: 'whatsapp', url: 'https://metastatus.com' },
  { id: 'telegram', url: 'https://downdetector.com/status/telegram/' },
  { id: 'signal', url: 'https://status.signal.org' },
  { id: 'crowdstrike', url: 'https://status.crowdstrike.com' },
  { id: 'bitwarden', url: 'https://status.bitwarden.com' },
  { id: 'cloudflare-workers', url: 'https://www.cloudflarestatus.com' },
  { id: 'aws-lambda', url: 'https://health.aws.amazon.com/health/status' },
  { id: 'cohere', url: 'https://status.cohere.com' },
  { id: 'stability-ai', url: 'https://status.stability.ai' },
  { id: 'midjourney', url: 'https://status.midjourney.com' },
  { id: 'amplitude', url: 'https://status.amplitude.com' },
  { id: 'google-analytics', url: 'https://www.google.com/appsstatus/dashboard' },
  { id: 'convertkit', url: 'https://status.kit.com' },
  { id: 'beehiiv', url: 'https://status.beehiiv.com' },
  { id: 'apple-music', url: 'https://www.apple.com/support/systemstatus/' },
  { id: 'disney-plus', url: 'https://help.disneyplus.com' },
  { id: 'hbo-max', url: 'https://help.max.com' },
  { id: 'prime-video', url: 'https://www.primevideostatus.com' },
  { id: 'vimeo', url: 'https://status.vimeo.com' },
  { id: 'mux', url: 'https://status.mux.com' },
  { id: 'imgix', url: 'https://status.imgix.com' },
  { id: 'apple-icloud', url: 'https://www.apple.com/support/systemstatus/' },
  { id: 'box', url: 'https://status.box.com' },
  { id: 'onedrive', url: 'https://status.office.com' },
  { id: 'gitlab-ci', url: 'https://status.gitlab.com' },
  { id: 'buildkite', url: 'https://buildkitestatus.com' },
  { id: 'doppler', url: 'https://status.doppler.com' },
  { id: 'retool', url: 'https://status.retool.com' },
  { id: 'webflow', url: 'https://status.webflow.com' },
  { id: 'framer', url: 'https://status.framer.com' },
  { id: 'algolia', url: 'https://status.algolia.com' },
  { id: 'contentful', url: 'https://www.contentfulstatus.com' },
  { id: 'sanity', url: 'https://status.sanity.io' },
  { id: 'storyblok', url: 'https://status.storyblok.com' },
  { id: 'plausible', url: 'https://status.plausible.io' },
  { id: 'fathom', url: 'https://status.usefathom.com' },
  { id: 'resend', url: 'https://resend-status.com' },
  { id: 'deno-deploy', url: 'https://www.denostatus.com' },
  { id: 'turso', url: 'https://status.turso.tech' },
  { id: 'github-copilot', url: 'https://www.githubstatus.com' },
  { id: 'cursor', url: 'https://status.cursor.com' },
  { id: 'vercel-ai', url: 'https://www.vercel-status.com' },
  { id: 'stripe-atlas', url: 'https://status.stripe.com' },
];

function checkUrl(id, url, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      resolve({ id, url, status: 'TOO_MANY_REDIRECTS', code: 0 });
      return;
    }
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(url, {
        method: 'GET',
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      }, (res) => {
        // Consume response data to free up memory
        res.resume();
        if (res.statusCode >= 301 && res.statusCode <= 308 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (redirectUrl.startsWith('/')) {
            redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
          }
          checkUrl(id, redirectUrl, redirectCount + 1).then(result => {
            resolve({ ...result, originalUrl: url, redirectedTo: redirectUrl });
          });
        } else {
          resolve({ id, url, status: res.statusCode >= 200 && res.statusCode < 400 ? 'OK' : 'FAIL', code: res.statusCode });
        }
      });
      req.on('timeout', () => {
        req.destroy();
        resolve({ id, url, status: 'TIMEOUT', code: 0 });
      });
      req.on('error', (err) => {
        resolve({ id, url, status: 'ERROR', code: 0, error: err.message });
      });
      req.end();
    } catch (e) {
      resolve({ id, url, status: 'INVALID_URL', code: 0, error: e.message });
    }
  });
}

async function main() {
  // Dedupe URLs to avoid checking the same URL multiple times
  const uniqueUrls = [...new Map(services.map(s => [s.url, s])).values()];
  const urlResults = new Map();

  console.log(`Checking ${services.length} services (${uniqueUrls.length} unique URLs)...`);
  console.log('');

  // Check in batches of 10
  for (let i = 0; i < uniqueUrls.length; i += 10) {
    const batch = uniqueUrls.slice(i, i + 10);
    const results = await Promise.all(batch.map(s => checkUrl(s.id, s.url)));
    for (const r of results) {
      urlResults.set(r.url, r);
    }
    process.stdout.write(`  Checked ${Math.min(i + 10, uniqueUrls.length)}/${uniqueUrls.length}\r`);
  }

  console.log('\n');

  // Map results back to all services
  const broken = [];
  const ok = [];
  for (const s of services) {
    const result = urlResults.get(s.url);
    if (result && result.status !== 'OK') {
      broken.push({ ...s, ...result });
    } else {
      ok.push(s);
    }
  }

  if (broken.length === 0) {
    console.log('ALL URLs are working!');
  } else {
    console.log(`BROKEN URLs (${broken.length}):`);
    console.log('─'.repeat(80));
    for (const b of broken) {
      console.log(`  ${b.id}`);
      console.log(`    URL: ${b.url}`);
      console.log(`    Status: ${b.status} (code: ${b.code})`);
      if (b.error) console.log(`    Error: ${b.error}`);
      if (b.redirectedTo) console.log(`    Redirected to: ${b.redirectedTo}`);
      console.log('');
    }
  }

  console.log(`\nSummary: ${ok.length} OK, ${broken.length} broken out of ${services.length} total`);
}

main();
