import { lazy } from 'react'

const JsonFormatter = lazy(() => import('../../tools/dev/JsonFormatter.jsx'))
const Base64Tool = lazy(() => import('../../tools/dev/Base64Tool.jsx'))
const UuidGenerator = lazy(() => import('../../tools/dev/UuidGenerator.jsx'))
const RegexTester = lazy(() => import('../../tools/dev/RegexTester.jsx'))
const JwtDecoder = lazy(() => import('../../tools/dev/JwtDecoder.jsx'))
const HashGenerator = lazy(() => import('../../tools/dev/HashGenerator.jsx'))
const UnixTimestampConverter = lazy(() => import('../../tools/dev/UnixTimestampConverter.jsx'))
const CronParser = lazy(() => import('../../tools/dev/CronParser.jsx'))
const HtmlEntityEncoder = lazy(() => import('../../tools/dev/HtmlEntityEncoder.jsx'))
const ColorConverter = lazy(() => import('../../tools/dev/ColorConverter.jsx'))
const CssGradientGenerator = lazy(() => import('../../tools/dev/CssGradientGenerator.jsx'))
const HttpStatusLookup = lazy(() => import('../../tools/dev/HttpStatusLookup.jsx'))
const LoremIpsumGenerator = lazy(() => import('../../tools/dev/LoremIpsumGenerator.jsx'))
const TextDiffChecker = lazy(() => import('../../tools/dev/TextDiffChecker.jsx'))
const MarkdownPreviewer = lazy(() => import('../../tools/dev/MarkdownPreviewer.jsx'))
const NumberBaseConverter = lazy(() => import('../../tools/dev/NumberBaseConverter.jsx'))
const SvgOptimizer = lazy(() => import('../../tools/dev/SvgOptimizer.jsx'))
const UrlEncoderDecoder = lazy(() => import('../../tools/dev/UrlEncoderDecoder.jsx'))
const TextToFlowchart = lazy(() => import('../../tools/dev/TextToFlowchart.jsx'))
const TextToUML = lazy(() => import('../../tools/dev/TextToUML.jsx'))

export const devTools = [
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Validate and prettify JSON instantly', category: 'dev', subcategory: 'formatters', icon: 'Braces', path: '/tools/json-formatter', component: JsonFormatter, tags: ['json', 'format', 'validate', 'pretty print', 'minify'], isPopular: true, isNew: false },
  { id: 'base64-tool', name: 'Base64 Tool', description: 'Encode and decode Base64 strings in real-time', category: 'dev', subcategory: 'encoders', icon: 'Binary', path: '/tools/base64-tool', component: Base64Tool, tags: ['base64', 'encode', 'decode', 'binary', 'string'], isPopular: true, isNew: false },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate secure random UUIDs using the Web Crypto API', category: 'dev', subcategory: 'generators', icon: 'Fingerprint', path: '/tools/uuid-generator', component: UuidGenerator, tags: ['uuid', 'guid', 'random', 'unique id', 'generator'], isPopular: false, isNew: false },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regex patterns against text in real time', category: 'dev', subcategory: 'testers', icon: 'Braces', path: '/tools/regex-tester', component: RegexTester, tags: ['regex', 'pattern', 'match', 'validator', 'tester', 'flags'], isPopular: true, isNew: false },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT headers and payload claims instantly', category: 'dev', subcategory: 'testers', icon: 'Fingerprint', path: '/tools/jwt-decoder', component: JwtDecoder, tags: ['jwt', 'token', 'decode', 'claims', 'auth', 'payload'], isPopular: false, isNew: false },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5 and SHA hashes for text or files', category: 'dev', subcategory: 'encoders', icon: 'ShieldCheck', path: '/tools/hash-generator', component: HashGenerator, tags: ['hash', 'sha256', 'sha512', 'md5', 'checksum', 'hmac'], isPopular: false, isNew: false },
  { id: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', description: 'Convert Unix timestamps to readable date formats', category: 'dev', subcategory: 'converters', icon: 'Timer', path: '/tools/unix-timestamp-converter', component: UnixTimestampConverter, tags: ['unix', 'timestamp', 'epoch', 'date', 'utc', 'iso'], isPopular: false, isNew: false },
  { id: 'cron-parser', name: 'Cron Parser', description: 'Parse cron expressions and preview next run times', category: 'dev', subcategory: 'reference', icon: 'CalendarDays', path: '/tools/cron-parser', component: CronParser, tags: ['cron', 'schedule', 'parser', 'jobs', 'automation', 'time'], isPopular: false, isNew: false },
  { id: 'html-entity-encoder', name: 'HTML Entity Encoder', description: 'Encode and decode HTML entities quickly', category: 'dev', subcategory: 'formatters', icon: 'Code2', path: '/tools/html-entity-encoder', component: HtmlEntityEncoder, tags: ['html', 'entities', 'encode', 'decode', 'escape', 'xss'], isPopular: false, isNew: false },
  { id: 'color-converter', name: 'Color Converter', description: 'Convert HEX, RGB, HSL, HSV, and color names', category: 'dev', subcategory: 'converters', icon: 'Droplets', path: '/tools/color-converter', component: ColorConverter, tags: ['color', 'hex', 'rgb', 'hsl', 'hsv', 'contrast'], isPopular: true, isNew: false },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', description: 'Build custom gradients and copy ready-to-use CSS', category: 'dev', subcategory: 'generators', icon: 'Wrench', path: '/tools/css-gradient-generator', component: CssGradientGenerator, tags: ['css', 'gradient', 'linear', 'radial', 'conic', 'background'], isPopular: false, isNew: false },
  { id: 'http-status-lookup', name: 'HTTP Status Lookup', description: 'Search and browse complete HTTP status codes', category: 'dev', subcategory: 'reference', icon: 'Search', path: '/tools/http-status-lookup', component: HttpStatusLookup, tags: ['http', 'status', 'api', 'error', 'response', 'codes'], isPopular: false, isNew: false },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text by words, sentences, or paragraphs', category: 'dev', subcategory: 'generators', icon: 'AlignLeft', path: '/tools/lorem-ipsum-generator', component: LoremIpsumGenerator, tags: ['lorem ipsum', 'placeholder', 'text generator', 'paragraph', 'sentences'], isPopular: false, isNew: false },
  { id: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare text changes line-by-line, word-by-word, or character-by-character', category: 'dev', subcategory: 'testers', icon: 'Code2', path: '/tools/text-diff-checker', component: TextDiffChecker, tags: ['diff', 'compare', 'text', 'changes', 'lcs', 'patch'], isPopular: false, isNew: false },
  { id: 'markdown-previewer', name: 'Markdown Previewer', description: 'Write markdown and preview rendered HTML side-by-side', category: 'dev', subcategory: 'formatters', icon: 'AlignLeft', path: '/tools/markdown-previewer', component: MarkdownPreviewer, tags: ['markdown', 'preview', 'editor', 'html', 'notes', 'tables'], isPopular: false, isNew: false },
  { id: 'number-base-converter', name: 'Number Base Converter', description: 'Convert between binary, octal, decimal, and hexadecimal', category: 'dev', subcategory: 'converters', icon: 'Binary', path: '/tools/number-base-converter', component: NumberBaseConverter, tags: ['binary', 'hex', 'octal', 'decimal', 'base converter', 'bits'], isPopular: false, isNew: false },
  { id: 'svg-optimizer', name: 'SVG Optimizer', description: 'Minify and clean SVG code directly in your browser', category: 'dev', subcategory: 'formatters', icon: 'Wrench', path: '/tools/svg-optimizer', component: SvgOptimizer, tags: ['svg', 'optimize', 'minify', 'vector', 'compress', 'markup'], isPopular: false, isNew: false },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', description: 'Encode, decode, and parse URLs with query editing', category: 'dev', subcategory: 'encoders', icon: 'Search', path: '/tools/url-encoder-decoder', component: UrlEncoderDecoder, tags: ['url', 'encode', 'decode', 'query params', 'parser', 'uri'], isPopular: false, isNew: false },
  { id: 'text-to-flowchart', name: 'Text to Flowchart', description: 'Turn indented text into flowcharts and org charts instantly', category: 'dev', subcategory: 'generators', icon: 'GitBranch', path: '/tools/text-to-flowchart', component: TextToFlowchart, tags: ['flowchart', 'diagram', 'chart', 'text to diagram', 'org chart', 'mind map', 'tree'], isPopular: false, isNew: true },
  { id: 'text-to-uml', name: 'Text to UML Diagram', description: 'Create sequence and class diagrams from simple text syntax', category: 'dev', subcategory: 'generators', icon: 'Share2', path: '/tools/text-to-uml', component: TextToUML, tags: ['uml', 'sequence diagram', 'class diagram', 'diagram', 'plantuml', 'architecture', 'design'], isPopular: false, isNew: true },
]
