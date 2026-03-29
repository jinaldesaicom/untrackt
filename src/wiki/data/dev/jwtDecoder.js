export default {
  id: 'jwt-decoder',
  title: 'JWT Decoder',
  description: 'Decode and inspect JSON Web Tokens (JWTs) to view the header, payload, claims, and signature without verification.',
  content: {
    whatIs: {
      heading: 'What is the JWT Decoder?',
      body: 'The JWT Decoder is a client-side tool that parses JSON Web Tokens (JWTs) and displays their three components -- header, payload, and signature -- in a readable, formatted view. JWTs are compact, URL-safe tokens used extensively for authentication and authorization in web applications. This tool decodes the Base64url-encoded header and payload sections, displays registered claims (iss, sub, exp, iat, etc.) with human-readable timestamps, and highlights token expiration status. All processing happens in your browser -- the token is never sent to any server.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Debugging authentication issues often requires inspecting JWT tokens to verify claims, check expiration times, or confirm the signing algorithm. Manually decoding Base64url and parsing JSON is tedious. This tool instantly breaks down any JWT, highlights expired tokens, converts Unix timestamps to readable dates, and helps you spot misconfigured claims -- all without exposing your tokens to third-party services.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste your complete JWT token (the three dot-separated parts) into the input field.',
        'The tool automatically decodes and displays the header, payload, and signature sections.',
        'Review the header to see the signing algorithm (alg) and token type (typ).',
        'Inspect the payload to see all claims -- registered, public, and private.',
        'Check the expiration indicator to see if the token is still valid or has expired.',
        'Copy individual sections or the formatted JSON for documentation or debugging.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Instant decoding of JWT header and payload from Base64url encoding.',
        'Color-coded display of the three JWT sections (header, payload, signature).',
        'Human-readable timestamps for exp, iat, and nbf claims.',
        'Token expiration status indicator with countdown to expiry.',
        'Support for all common signing algorithms: HS256, HS384, HS512, RS256, RS384, RS512, ES256, ES384, ES512.',
        'Claim-by-claim breakdown with descriptions of registered claim names.',
        'Client-side only -- your tokens never leave your browser.',
        'Validation of JWT structure (three parts, valid Base64url encoding).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Debugging authentication failures by inspecting token claims and expiration.',
        'Verifying that an API is issuing tokens with the correct claims and algorithm.',
        'Checking token expiration before making authenticated API requests.',
        'Inspecting OAuth 2.0 access tokens and OpenID Connect ID tokens.',
        'Teaching JWT structure and claims to team members or students.',
        'Validating that sensitive data is not inadvertently included in token payloads.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Decode Access Token', description: 'Paste an OAuth 2.0 access token to see the issuer (iss), subject (sub), audience (aud), and expiration (exp) claims.' },
        { title: 'Check Expiration', description: 'Decode a token and instantly see whether it has expired, with the exact expiration date and time displayed.' },
        { title: 'Inspect Algorithm', description: 'Decode the header to confirm the signing algorithm is RS256 (asymmetric) rather than HS256 (symmetric) for security purposes.' },
        { title: 'Review Custom Claims', description: 'Inspect private claims like user roles, permissions, or tenant IDs embedded in the token payload.' },
        { title: 'Compare Tokens', description: 'Decode two tokens side-by-side to identify differences in claims or configuration between environments.' },
        { title: 'Validate Token Structure', description: 'Paste a malformed token to see which component (header, payload, or signature) has structural issues.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'JWT (JSON Web Token)', definition: 'A compact, URL-safe token format consisting of three Base64url-encoded parts (header, payload, signature) separated by dots.' },
        { term: 'Header', definition: 'The first part of a JWT containing metadata: the signing algorithm (alg) and token type (typ), typically "JWT".' },
        { term: 'Payload', definition: 'The second part of a JWT containing claims -- statements about the user and additional metadata.' },
        { term: 'Claims', definition: 'Key-value pairs in the JWT payload. Registered claims include iss (issuer), sub (subject), exp (expiration), and iat (issued at).' },
        { term: 'Signature', definition: 'The third part of a JWT, created by signing the encoded header and payload with a secret key or private key to ensure integrity.' },
        { term: 'HS256', definition: 'HMAC using SHA-256 -- a symmetric signing algorithm where the same secret key is used for both signing and verification.' },
        { term: 'RS256', definition: 'RSA Signature using SHA-256 -- an asymmetric algorithm where a private key signs and a public key verifies.' },
        { term: 'Bearer Token', definition: 'An HTTP authentication scheme where the JWT is sent in the Authorization header as "Bearer <token>".' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does this tool verify JWT signatures?', answer: 'No. This tool decodes and displays the token contents but does not verify the cryptographic signature. Signature verification requires the secret key or public key, which should only be done server-side.' },
        { question: 'Is it safe to paste my JWT here?', answer: 'Yes. All decoding happens in your browser -- the token is never transmitted to any server. However, avoid sharing JWTs in public channels as they may contain sensitive claims.' },
        { question: 'Why can I read the JWT payload without a key?', answer: 'JWT payloads are encoded (Base64url) but not encrypted. The signature ensures integrity and authenticity, not confidentiality. Never store sensitive secrets in JWT payloads.' },
        { question: 'What does the exp claim mean?', answer: 'The exp (expiration) claim is a Unix timestamp indicating when the token expires. After this time, the token should be rejected by the server.' },
        { question: 'Can I edit the JWT payload?', answer: 'You can view and copy the decoded payload, but editing it would invalidate the signature. To create new tokens with different claims, you need to sign them with the appropriate key.' },
        { question: 'What is the difference between HS256 and RS256?', answer: 'HS256 uses a shared secret (symmetric) -- both parties need the same key. RS256 uses a public/private key pair (asymmetric) -- only the issuer has the private key, and anyone can verify with the public key.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always check the exp claim when debugging authentication failures -- expired tokens are a common cause.',
        'Verify the alg header matches your expected algorithm to prevent algorithm confusion attacks.',
        'Never store sensitive information (passwords, API keys) in JWT payloads -- they are readable by anyone.',
        'Use short expiration times for access tokens and implement refresh token rotation.',
        'Prefer RS256 over HS256 for microservices where multiple services need to verify tokens independently.',
        'Check the iss (issuer) and aud (audience) claims to ensure the token was intended for your application.',
        'Monitor token size -- JWTs with many claims can become large and impact HTTP header size limits.',
        'Use this decoder during development only -- never log or expose production tokens unnecessarily.'
      ]
    }
  },
  relatedTools: ['base64-tool', 'json-formatter', 'hash-generator', 'unix-timestamp-converter', 'url-encoder-decoder'],
  seo: {
    metaTitle: 'JWT Decoder - Decode & Inspect JSON Web Tokens Online | UnTrackt Wiki',
    metaDescription: 'Decode JSON Web Tokens (JWTs) to inspect the header, payload, and claims. Check expiration, verify algorithms, and debug authentication -- all client-side.',
    keywords: ['jwt decoder', 'decode jwt', 'json web token', 'jwt debugger', 'jwt claims', 'jwt payload', 'jwt header', 'token decoder']
  }
};
