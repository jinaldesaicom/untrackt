import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'

const STATUSES = [
  [100, 'Continue', 'Request received; continue sending body.', 'Large uploads with Expect: 100-continue.'],
  [101, 'Switching Protocols', 'Server agrees to switch protocol.', 'WebSocket handshakes.'],
  [102, 'Processing', 'Server accepted and is processing.', 'Long-running WebDAV actions.'],
  [103, 'Early Hints', 'Preload hints sent before final response.', 'Sending Link preload headers early.'],
  [200, 'OK', 'Request succeeded.', 'Standard successful API and page responses.'],
  [201, 'Created', 'New resource created.', 'After POST creating a record.'],
  [202, 'Accepted', 'Accepted for async processing.', 'Queue-based jobs.'],
  [203, 'Non-Authoritative Information', 'Modified from origin response.', 'Proxy-transformed metadata.'],
  [204, 'No Content', 'Success with no body.', 'DELETE or idempotent updates.'],
  [205, 'Reset Content', 'Client should reset view.', 'Form reset after submit.'],
  [206, 'Partial Content', 'Only part of resource returned.', 'Range requests for media.'],
  [300, 'Multiple Choices', 'Several options available.', 'Language variants.'],
  [301, 'Moved Permanently', 'Resource moved permanently.', 'Domain migration and SEO redirects.'],
  [302, 'Found', 'Temporary redirect.', 'Short-term route forwarding.'],
  [303, 'See Other', 'Follow with GET request.', 'POST redirect to confirmation page.'],
  [304, 'Not Modified', 'Use browser cache copy.', 'Conditional caching with ETag.'],
  [307, 'Temporary Redirect', 'Temporary redirect preserving method.', 'Safe temporary API reroute.'],
  [308, 'Permanent Redirect', 'Permanent redirect preserving method.', 'Permanent API endpoint relocation.'],
  [400, 'Bad Request', 'Malformed request syntax.', 'Invalid JSON body.'],
  [401, 'Unauthorized', 'Authentication required.', 'Missing or invalid auth token.'],
  [402, 'Payment Required', 'Reserved for future use.', 'Subscription-gated resources.'],
  [403, 'Forbidden', 'Request understood but blocked.', 'Insufficient permissions.'],
  [404, 'Not Found', 'Resource not found.', 'Missing route or file.'],
  [405, 'Method Not Allowed', 'HTTP method is not allowed.', 'PUT on a read-only endpoint.'],
  [406, 'Not Acceptable', 'Cannot satisfy requested format.', 'Unsupported Accept header.'],
  [407, 'Proxy Authentication Required', 'Proxy auth needed.', 'Corporate proxy routes.'],
  [408, 'Request Timeout', 'Request took too long.', 'Slow or dropped client connection.'],
  [409, 'Conflict', 'State conflict prevents action.', 'Version conflict during update.'],
  [410, 'Gone', 'Resource permanently unavailable.', 'Deprecated endpoint intentionally removed.'],
  [411, 'Length Required', 'Missing Content-Length.', 'Servers requiring known body size.'],
  [412, 'Precondition Failed', 'If-* precondition failed.', 'ETag mismatch on update.'],
  [413, 'Payload Too Large', 'Request body too large.', 'File upload limit exceeded.'],
  [414, 'URI Too Long', 'URL too long to process.', 'Excessive query params.'],
  [415, 'Unsupported Media Type', 'Unsupported content type.', 'Posting XML to JSON-only endpoint.'],
  [416, 'Range Not Satisfiable', 'Invalid range requested.', 'Media seek beyond file size.'],
  [417, 'Expectation Failed', 'Cannot meet Expect header.', '100-continue expectations rejected.'],
  [418, "I'm a teapot", 'Deliberate playful status code.', 'Easter egg responses.'],
  [422, 'Unprocessable Content', 'Validation failed.', 'Semantically invalid field values.'],
  [423, 'Locked', 'Resource is locked.', 'WebDAV lock conflicts.'],
  [424, 'Failed Dependency', 'Dependency request failed.', 'WebDAV multi-step failure.'],
  [425, 'Too Early', 'Server unwilling to risk replay.', 'Early TLS replay protection.'],
  [426, 'Upgrade Required', 'Switch to newer protocol.', 'Require HTTPS or HTTP/2.'],
  [428, 'Precondition Required', 'Conditional request required.', 'Prevent lost updates.'],
  [429, 'Too Many Requests', 'Rate limit exceeded.', 'Burst traffic throttling.'],
  [431, 'Request Header Fields Too Large', 'Headers too large.', 'Oversized cookies/header payloads.'],
  [451, 'Unavailable For Legal Reasons', 'Blocked due to legal demand.', 'Regional takedown compliance.'],
  [500, 'Internal Server Error', 'Unexpected server failure.', 'Unhandled exceptions.'],
  [501, 'Not Implemented', 'Feature not implemented.', 'Method unsupported by backend.'],
  [502, 'Bad Gateway', 'Invalid upstream response.', 'Proxy received bad backend response.'],
  [503, 'Service Unavailable', 'Temporarily overloaded/unavailable.', 'Maintenance windows.'],
  [504, 'Gateway Timeout', 'Upstream timed out.', 'Slow backend in proxy chain.'],
  [505, 'HTTP Version Not Supported', 'Version unsupported.', 'Only HTTP/1.1 accepted.'],
  [506, 'Variant Also Negotiates', 'Negotiation config loop.', 'Misconfigured content negotiation.'],
  [507, 'Insufficient Storage', 'Server lacks storage.', 'WebDAV storage full.'],
  [508, 'Loop Detected', 'Infinite loop detected.', 'Recursive WebDAV binding.'],
  [510, 'Not Extended', 'Further extensions required.', 'Missing mandatory extension headers.'],
  [511, 'Network Authentication Required', 'Network auth required.', 'Captive portal interception.'],
]

function classColor(code) {
  if (code >= 500) return 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
  if (code >= 400) return 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300'
  if (code >= 300) return 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
  if (code >= 200) return 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
  return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
}

export default function HttpStatusLookup() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return STATUSES
    return STATUSES.filter(([code, name, desc, when]) => (
      String(code).includes(q) || name.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || when.toLowerCase().includes(q)
    ))
  }, [query])

  const grouped = useMemo(() => {
    const groups = { '1xx': [], '2xx': [], '3xx': [], '4xx': [], '5xx': [] }
    filtered.forEach((item) => {
      const code = item[0]
      const key = `${Math.floor(code / 100)}xx`
      if (groups[key]) groups[key].push(item)
    })
    return groups
  }, [filtered])

  return (
    <div className="space-y-4">
      <input value={query} onChange={(e) => setQuery(e.target.value)} className="input-field" placeholder="Search by code or keyword (e.g. 404, not found, server error)" />

      {Object.entries(grouped).map(([group, list]) => (
        list.length > 0 ? (
          <section key={group}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{group}</h3>
            <div className="space-y-2">
              {list.map(([code, name, description, whenSeen]) => (
                <article key={code} className={`rounded-xl border p-4 ${classColor(code)}`}>
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{code}</span>
                      <h4 className="font-semibold">{name}</h4>
                    </div>
                    <CopyButton text={`${code} ${name}`} label="Copy" className="text-xs" />
                  </div>
                  <p className="text-sm">{description}</p>
                  <p className="text-sm mt-1"><span className="font-semibold">In practice:</span> {whenSeen}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null
      ))}
    </div>
  )
}
