import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'UnTrackt'
const BASE_URL = 'https://untrackt.com'
const DEFAULT_DESCRIPTION =
  '88+ free browser-based tools. No tracking, no accounts, no data sent to any server. Runs 100% in your browser.'

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  toolName,
  category,
  jsonLd,
}) {
  const canonicalUrl = `${BASE_URL}${path}`
  const resolvedTitle = title || (toolName ? `${toolName} | ${SITE_NAME}` : `${SITE_NAME} | Free Private Browser Tools`)
  const ogType = toolName ? 'article' : 'website'

  let structuredData = jsonLd
  if (!structuredData && toolName) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: toolName,
      url: canonicalUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description,
    }
  }

  if (!structuredData && path === '/') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
      description: 'Free browser-based tools with zero tracking',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://untrackt.com/?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }
  }

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      {category ? <meta property="article:section" content={category} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />

      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </Helmet>
  )
}