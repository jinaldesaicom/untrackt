export default {
  id: 'http-status-lookup',
  title: 'HTTP Status Code Lookup',
  description: 'Look up any HTTP status code with detailed descriptions, use cases, and troubleshooting guidance for REST API development.',
  content: {
    whatIs: {
      heading: 'What is the HTTP Status Code Lookup?',
      body: 'The HTTP Status Code Lookup is a comprehensive reference tool for all standard HTTP response status codes defined in RFC 9110 and related specifications. HTTP status codes are three-digit numbers returned by web servers to indicate the result of a client\'s request. They are grouped into five classes: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error). This tool provides detailed descriptions, common use cases, headers involved, and troubleshooting tips for every standard status code.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Knowing the precise meaning of HTTP status codes is essential for API development, debugging network issues, and implementing proper error handling. While "200 OK" and "404 Not Found" are well-known, many developers struggle with codes like 422, 429, 304, or 502. This tool gives you instant access to detailed explanations, correct usage guidance, and common pitfalls for every status code, helping you build robust APIs and debug HTTP issues faster.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a status code number (e.g., 404) or search by keyword (e.g., "not found").',
        'Browse by category: 1xx, 2xx, 3xx, 4xx, or 5xx.',
        'Read the detailed description, RFC reference, and common use cases for the status code.',
        'Review the typical response headers and body format associated with the code.',
        'Use the troubleshooting section specifically for error codes (4xx and 5xx).',
        'Copy the code and description for use in API documentation or error handling code.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Complete reference for all standard HTTP status codes (1xx through 5xx).',
        'Search by code number, name, or description keyword.',
        'Category-based browsing with visual grouping by class.',
        'Detailed descriptions with RFC references for each code.',
        'Common use cases and example scenarios for API development.',
        'Troubleshooting guidance for error codes.',
        'Related headers information (Location, Retry-After, WWW-Authenticate, etc.).',
        'API design recommendations for choosing the correct status code.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Choosing the correct status code for REST API endpoint responses.',
        'Debugging API errors by understanding what a specific status code means.',
        'Implementing proper error handling in frontend applications.',
        'Writing API documentation with accurate status code descriptions.',
        'Troubleshooting server issues indicated by 5xx responses.',
        'Understanding redirect behavior (301 vs 302 vs 307 vs 308).'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '201 Created', description: 'Returned after successfully creating a new resource (e.g., POST /api/users). Should include a Location header pointing to the new resource.' },
        { title: '304 Not Modified', description: 'Used for cache validation -- the server confirms the client\'s cached version is still fresh, saving bandwidth by not resending the body.' },
        { title: '401 vs 403', description: 'Understand the difference: 401 means "not authenticated" (provide credentials), while 403 means "authenticated but not authorized" (insufficient permissions).' },
        { title: '429 Too Many Requests', description: 'Indicates rate limiting -- the client has sent too many requests. Should include a Retry-After header suggesting when to try again.' },
        { title: '502 Bad Gateway', description: 'The server acting as a proxy received an invalid response from the upstream server -- common when a backend service is down or misconfigured.' },
        { title: '422 Unprocessable Entity', description: 'The request is well-formed but contains semantic errors (e.g., validation failures). Commonly used in REST APIs to indicate invalid input data.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: '1xx Informational', definition: 'Status codes indicating the request was received and processing is continuing. Examples: 100 Continue, 101 Switching Protocols.' },
        { term: '2xx Success', definition: 'Status codes indicating the request was successfully received, understood, and accepted. Examples: 200 OK, 201 Created, 204 No Content.' },
        { term: '3xx Redirection', definition: 'Status codes indicating further action is needed to complete the request. Examples: 301 Moved Permanently, 302 Found, 304 Not Modified.' },
        { term: '4xx Client Error', definition: 'Status codes indicating the client sent an invalid request. Examples: 400 Bad Request, 401 Unauthorized, 404 Not Found, 422 Unprocessable Entity.' },
        { term: '5xx Server Error', definition: 'Status codes indicating the server failed to fulfill a valid request. Examples: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.' },
        { term: 'REST API', definition: 'Representational State Transfer API -- an architectural style for web services that uses HTTP methods and status codes for communication.' },
        { term: 'Redirect Codes', definition: 'Status codes (301, 302, 307, 308) that instruct the client to make a new request to a different URL, differing in permanence and method preservation.' },
        { term: 'Idempotent', definition: 'A property of HTTP methods (GET, PUT, DELETE) where making the same request multiple times produces the same result as a single request.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between 301 and 302 redirects?', answer: '301 (Moved Permanently) tells search engines and browsers to permanently update the URL. 302 (Found) is a temporary redirect -- the original URL should still be used in the future.' },
        { question: 'When should I use 400 vs 422?', answer: '400 Bad Request means the request is malformed (bad JSON syntax, missing required header). 422 Unprocessable Entity means the request is well-formed but semantically invalid (e.g., email format wrong, date in the past).' },
        { question: 'What does 204 No Content mean?', answer: '204 means the request was successful but there is no response body to return. Commonly used for DELETE operations or PUT updates that do not need to return the modified resource.' },
        { question: 'What is the difference between 401 and 403?', answer: '401 Unauthorized means the client has not provided authentication credentials (or they are invalid). 403 Forbidden means the client is authenticated but lacks permission for the requested action.' },
        { question: 'When should I use 500 vs 503?', answer: '500 Internal Server Error is a generic error when something unexpected fails. 503 Service Unavailable indicates temporary overload or maintenance -- include a Retry-After header to indicate when to try again.' },
        { question: 'What is a 418 status code?', answer: '418 I\'m a teapot is a humorous code from the 1998 HTCPCP April Fools\' RFC. While not used seriously, it is sometimes used as an Easter egg in APIs.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use the most specific status code available rather than generic codes like 400 or 500.',
        'Always return 201 Created (not 200) when a new resource is successfully created.',
        'Include a Location header with 201 responses pointing to the newly created resource.',
        'Use 204 No Content for successful DELETE operations that do not return a body.',
        'Return 429 Too Many Requests with a Retry-After header when implementing rate limiting.',
        'Distinguish between 401 (unauthenticated) and 403 (unauthorized) -- they require different client actions.',
        'Use 307 or 308 instead of 301/302 when you need to preserve the HTTP method during redirect.',
        'Document all possible status codes for each API endpoint, including error responses with example bodies.'
      ]
    }
  },
  relatedTools: ['json-formatter', 'jwt-decoder', 'url-encoder-decoder', 'regex-tester', 'text-diff-checker'],
  seo: {
    metaTitle: 'HTTP Status Code Lookup - Complete Reference Guide | UnTrackt Wiki',
    metaDescription: 'Look up any HTTP status code with detailed descriptions, use cases, and troubleshooting tips. Complete reference for REST API development and debugging.',
    keywords: ['http status codes', 'http status lookup', 'rest api status codes', '404 not found', '500 error', 'http response codes', 'status code reference', 'api error codes']
  }
};
