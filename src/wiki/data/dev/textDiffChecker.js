export default {
  id: 'text-diff-checker',
  title: 'Text Diff Checker',
  description: 'Compare two texts side-by-side to find differences line-by-line or word-by-word with color-coded highlighting.',
  content: {
    whatIs: {
      heading: 'What is the Text Diff Checker?',
      body: 'The Text Diff Checker compares two blocks of text and highlights the differences between them. It uses the Longest Common Subsequence (LCS) algorithm to detect insertions, deletions, and modifications with precision. Results are displayed in a side-by-side or unified view with color-coded highlighting -- green for additions and red for removals. This tool supports line-by-line, word-by-word, and character-by-character comparison modes, making it invaluable for code reviews, content editing, configuration auditing, and debugging.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Manually comparing two versions of a file, configuration, or document is tedious and error-prone. A single changed character or moved line can be nearly impossible to spot by eye. This tool instantly highlights every difference between two texts, helping you identify exactly what changed, where it changed, and how -- saving significant time during code reviews, content updates, and troubleshooting.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Paste the original text in the left panel (or "before" field).',
        'Paste the modified text in the right panel (or "after" field).',
        'Select the comparison mode: line-by-line, word-by-word, or character-by-character.',
        'Review the highlighted differences -- red for removed content, green for added content.',
        'Toggle between side-by-side and unified diff views.',
        'Copy the diff output or download it as a patch file.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Side-by-side and unified diff views for flexible comparison.',
        'Line-by-line, word-by-word, and character-by-character comparison modes.',
        'Color-coded highlighting: red for deletions, green for additions, yellow for modifications.',
        'Line numbers for both original and modified text.',
        'Statistics showing total lines added, removed, and unchanged.',
        'Ignore whitespace option for focusing on meaningful content changes.',
        'Syntax highlighting for common programming languages in diff view.',
        'Copy or download the diff output as a unified patch file.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Comparing two versions of a configuration file to identify what changed.',
        'Reviewing code changes before committing or during pull request reviews.',
        'Verifying API response differences between environments (staging vs production).',
        'Checking content edits in documents, articles, or translations.',
        'Debugging by comparing expected output vs actual output in test results.',
        'Auditing changes in JSON, YAML, or XML configuration files.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Config File Comparison', description: 'Paste the production nginx.conf and staging nginx.conf to highlight configuration differences between environments.' },
        { title: 'Code Review', description: 'Compare the old and new version of a function to see exactly which lines were added, changed, or removed.' },
        { title: 'API Response Diff', description: 'Paste two JSON API responses side-by-side to identify which fields changed between requests.' },
        { title: 'Content Editing', description: 'Compare an original article draft with the edited version to see all text edits, additions, and removals.' },
        { title: 'Whitespace Detection', description: 'Use character-level comparison to detect invisible whitespace changes like trailing spaces or tab-to-space conversions.' },
        { title: 'Merge Conflict Resolution', description: 'Paste the two conflicting versions of a file to understand the differences before resolving a git merge conflict.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Diff', definition: 'The computed set of differences between two texts, showing what was added, removed, or changed.' },
        { term: 'LCS (Longest Common Subsequence)', definition: 'An algorithm that finds the longest sequence of characters or lines common to both texts, used as the basis for computing minimal diffs.' },
        { term: 'Line-by-Line Comparison', definition: 'A diff mode that treats each line as an atomic unit, highlighting entire lines that differ between the two texts.' },
        { term: 'Word-by-Word Comparison', definition: 'A diff mode that compares individual words within changed lines, providing finer-grained highlighting of modifications.' },
        { term: 'Unified Diff', definition: 'A diff format that shows changes in a single column with + and - prefixes, commonly used in git output and patch files.' },
        { term: 'Patch File', definition: 'A text file containing diff output in a standard format that can be applied to transform one text into another using tools like git apply.' },
        { term: 'Merge Conflict', definition: 'A situation where two different changes were made to the same lines, requiring manual resolution to combine both versions.' },
        { term: 'Side-by-Side View', definition: 'A diff display format showing the original text on the left and modified text on the right, with aligned lines for easy comparison.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the maximum text size supported?', answer: 'The tool handles texts up to several megabytes. Very large files (10,000+ lines) may take a few seconds to compute the diff depending on your device.' },
        { question: 'Can I ignore whitespace differences?', answer: 'Yes. Toggle the "Ignore whitespace" option to focus only on meaningful content changes, ignoring differences in spaces, tabs, and blank lines.' },
        { question: 'What is the difference between unified and side-by-side view?', answer: 'Side-by-side shows originals on the left and changes on the right. Unified view shows everything in one column with + and - markers, similar to git diff output.' },
        { question: 'Can I compare files, not just text?', answer: 'You can load files by pasting their contents. The tool compares text content, so it works with any text-based file format (code, config, markdown, etc.).' },
        { question: 'Is my text sent to a server?', answer: 'No. All comparison is performed entirely in your browser. Your text never leaves your device.' },
        { question: 'Can I download the diff as a patch file?', answer: 'Yes. Click the download button to export the diff in unified patch format, which can be applied using git apply or the patch command.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use word-by-word mode for prose and content editing to see exactly which words changed within a paragraph.',
        'Use line-by-line mode for code and configuration files where entire lines are the unit of change.',
        'Enable "Ignore whitespace" when comparing code that may have different formatting but identical logic.',
        'Format JSON and configuration files identically before comparing to avoid spurious formatting differences.',
        'Use the diff statistics to get a quick overview of how much changed before diving into details.',
        'For code reviews, combine this tool with the JSON Formatter to compare prettified API responses.'
      ]
    }
  },
  relatedTools: ['json-formatter', 'markdown-previewer', 'regex-tester', 'html-entity-encoder', 'base64-tool'],
  seo: {
    metaTitle: 'Text Diff Checker - Compare Two Texts Side-by-Side | UnTrackt Wiki',
    metaDescription: 'Compare two texts and find differences with color-coded highlighting. Line-by-line, word-by-word, and character-level comparison -- all client-side.',
    keywords: ['text diff checker', 'compare text', 'diff tool', 'text comparison', 'find differences', 'side by side diff', 'online diff', 'code diff']
  }
};
