export default {
  id: 'citation-generator',
  title: 'Citation Generator',
  description: 'Generate accurate citations in APA, MLA, Chicago, and other styles for books, articles, websites, and more.',
  content: {
    whatIs: {
      heading: 'What is the Citation Generator?',
      body: 'The Citation Generator is an academic referencing tool that creates properly formatted citations and bibliography entries in major citation styles including APA (7th edition), MLA (9th edition), Chicago/Turabian, and Harvard. Simply input your source details--author, title, publication date, URL, and other metadata--and the tool instantly produces a correctly formatted in-text citation and full reference entry. It eliminates the guesswork of punctuation, italicization, and ordering rules that differ across citation styles.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Citation formatting rules are notoriously complex and differ significantly between styles. A misplaced comma, incorrect italicization, or wrong date format can cost marks on academic papers. This tool ensures every citation is perfectly formatted according to the latest edition of your chosen style guide, saving you hours of manual formatting and reducing the risk of accidental plagiarism from improperly attributed sources.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select your desired citation style (APA, MLA, Chicago, or Harvard).',
        'Choose the source type: book, journal article, website, video, or other format.',
        'Fill in the required fields: author(s), title, publication date, publisher, URL, and other relevant details.',
        'Click "Generate Citation" to produce both the in-text citation and the full reference entry.',
        'Copy the formatted citation directly into your paper or bibliography.',
        'Generate additional citations for other sources and compile your complete reference list.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports APA 7th edition, MLA 9th edition, Chicago 17th edition, and Harvard style.',
        'Handles multiple source types: books, journal articles, websites, videos, podcasts, and more.',
        'Generates both in-text citations and full reference/bibliography entries.',
        'Supports multiple authors with proper formatting (et al. rules applied automatically).',
        'Produces correctly formatted hanging indents, italics, and punctuation.',
        'One-click copy to clipboard for easy pasting into documents.',
        'All processing happens locally--your research data stays private.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students writing research papers who need correctly formatted references.',
        'Graduate students compiling thesis or dissertation bibliographies.',
        'Researchers generating citations for literature reviews.',
        'Bloggers and journalists who want to properly attribute their sources.',
        'Students converting citations from one style to another when submitting to different courses.',
        'Group project members ensuring consistent citation formatting across contributions.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'APA Book Citation',
          description: 'Author: J. Smith, Title: "Cognitive Psychology," Year: 2023, Publisher: Academic Press → Smith, J. (2023). Cognitive psychology. Academic Press.'
        },
        {
          title: 'MLA Journal Article',
          description: 'Authors: A. Johnson and B. Lee, Title: "Climate Trends," Journal: Nature, Vol. 15, 2024 → Johnson, A., and B. Lee. "Climate Trends." Nature, vol. 15, 2024.'
        },
        {
          title: 'Chicago Website Citation',
          description: 'Author: World Health Organization, Title: "Mental Health Facts," URL: who.int/mental-health, Accessed: 2025 → World Health Organization. "Mental Health Facts." Accessed 2025. https://who.int/mental-health.'
        },
        {
          title: 'APA with Multiple Authors',
          description: 'Three authors produces "Smith, J., Johnson, A., & Lee, B. (2024)." In-text first use: (Smith et al., 2024) when there are three or more authors under APA 7th ed.'
        },
        {
          title: 'MLA In-Text Citation',
          description: 'A direct quote from page 45 of Smith\'s book: (Smith 45), or for a paraphrase with no page number: (Smith).'
        },
        {
          title: 'Edited Book Chapter',
          description: 'A chapter by A. Lee in a book edited by B. Park: Lee, A. (2023). Chapter title. In B. Park (Ed.), Book title (pp. 10-35). Publisher.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Citation', definition: 'A reference to a source used in academic writing, providing enough information for readers to locate the original work.' },
        { term: 'In-Text Citation', definition: 'A brief reference within the body of your paper, usually including the author\'s last name and year (APA) or page number (MLA).' },
        { term: 'Bibliography', definition: 'A complete list of all sources consulted during research, whether or not they were directly cited in the paper. Compare with "References."' },
        { term: 'References', definition: 'A list of only the sources directly cited in the paper. In APA style, this list is titled "References" rather than "Bibliography."' },
        { term: 'DOI', definition: 'Digital Object Identifier--a unique alphanumeric string assigned to academic articles for permanent identification and linking.' },
        { term: 'Hanging Indent', definition: 'A formatting style where the first line of a reference is flush left and subsequent lines are indented, standard in APA and MLA reference lists.' },
        { term: 'Et Al.', definition: 'Latin abbreviation meaning "and others," used in citations when a source has multiple authors to avoid listing every name.' },
        { term: 'Annotated Bibliography', definition: 'A bibliography that includes a brief summary and evaluation of each source, often assigned as a research exercise.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which citation style should I use?', answer: 'Use whatever your professor or institution requires. APA is standard in social sciences and psychology, MLA in humanities and literature, Chicago in history and some humanities, and Harvard in many UK and Australian institutions.' },
        { question: 'What\'s the difference between a bibliography and a reference list?', answer: 'A reference list includes only sources you directly cited. A bibliography includes all sources you consulted, even if not directly cited. APA uses "References"; Chicago may use "Bibliography."' },
        { question: 'How do I cite a source with no author listed?', answer: 'In APA, use the title (or a shortened version) in place of the author. In MLA, begin with the title. The citation generator handles these edge cases automatically.' },
        { question: 'Does the tool handle DOIs and URLs correctly?', answer: 'Yes. When you provide a DOI, it\'s formatted as a clickable link per the latest style guidelines. URLs are formatted according to each style\'s specific rules.' },
        { question: 'Can I export all my citations at once?', answer: 'Yes. After generating multiple citations, you can copy the complete formatted reference list to paste into your document.' },
        { question: 'How do I cite a source I found cited in another source (secondary source)?', answer: 'This is called a secondary citation. In APA, use "as cited in" for the in-text reference and list only the source you actually read in your reference list.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always double-check generated citations against your style guide, especially for unusual source types.',
        'Collect source details (author, title, date, URL, DOI) as you research rather than trying to reconstruct them later.',
        'Be consistent--use one citation style throughout your entire paper unless explicitly instructed otherwise.',
        'When in doubt about which fields to fill in, provide as much information as possible. More detail produces better citations.',
        'Use DOIs whenever available for journal articles--they\'re more reliable than URLs which may break over time.',
        'Keep a running list of all sources as you write. Adding citations retroactively often leads to missing references.',
        'Remember that citation generators are aids, not replacements for understanding citation rules. Learn the basics of your required style.'
      ]
    }
  },
  relatedTools: ['word-counter', 'readability-scorer', 'essay-outline-builder', 'gpa-calculator'],
  seo: {
    metaTitle: 'Citation Generator - APA, MLA, Chicago Formatter - Wiki | UnTrackt',
    metaDescription: 'Generate accurate citations in APA, MLA, Chicago, and Harvard styles. Create properly formatted in-text citations and reference list entries for any source type.',
    keywords: ['citation generator', 'APA citation', 'MLA citation', 'Chicago citation', 'bibliography generator', 'reference generator', 'academic citations', 'cite sources', 'Harvard citation']
  }
};
