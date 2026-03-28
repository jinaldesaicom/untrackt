export default {
  id: 'flashcard-session',
  title: 'Flashcard Session',
  description: 'Study with interactive flashcards using active recall and spaced repetition principles to maximize long-term retention.',
  content: {
    whatIs: {
      heading: 'What is the Flashcard Session?',
      body: 'The Flashcard Session is an interactive study tool that lets you create, review, and master flashcards using proven learning science principles. Each card has a front (prompt or question) and back (answer or explanation). During a session, you see the front of each card, attempt to recall the answer, then flip to check. You rate your confidence on each card, and the system prioritizes cards you struggle with--applying active recall and confidence-based repetition to move information from short-term to long-term memory efficiently.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Passive re-reading is one of the least effective study strategies, yet it\'s what most students default to. Flashcards force active recall--the act of retrieving information from memory--which research consistently shows is one of the most powerful techniques for long-term retention. Combined with spaced repetition (reviewing material at increasing intervals), flashcard study dramatically improves exam performance and knowledge retention compared to highlighting, re-reading, or summarizing.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Create a new flashcard deck by giving it a name (e.g., "Biology Chapter 5").',
        'Add cards with a front (question/term) and back (answer/definition).',
        'Start a study session to begin reviewing your cards.',
        'For each card, read the front and try to recall the answer before flipping.',
        'Flip the card to check your answer, then rate your confidence (easy, medium, hard).',
        'Cards you marked as "hard" will reappear more frequently in the session.',
        'Review session statistics at the end to see your accuracy and progress.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Create custom flashcard decks organized by subject or topic.',
        'Interactive flip-card interface with smooth animations.',
        'Confidence-based rating (easy, medium, hard) that prioritizes difficult cards.',
        'Shuffle mode to randomize card order and prevent sequence memorization.',
        'Progress tracking showing cards mastered, in progress, and needs review.',
        'Session statistics including accuracy, time spent, and cards reviewed.',
        'All flashcard data stored locally in your browser--study offline anytime.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Students memorizing vocabulary, definitions, and key terms for exams.',
        'Medical and science students learning anatomy terms, drug names, or chemical formulas.',
        'Language learners building vocabulary in a foreign language.',
        'History students memorizing dates, events, and historical figures.',
        'Law students reviewing case names, rulings, and legal principles.',
        'Professionals studying for certification exams (CPA, PMP, real estate, etc.).'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Vocabulary Flashcards',
          description: 'Front: "Ubiquitous" → Back: "Present, appearing, or found everywhere. Example: Smartphones have become ubiquitous in modern life."'
        },
        {
          title: 'Science Term Cards',
          description: 'Front: "What is mitosis?" → Back: "A type of cell division resulting in two daughter cells each having the same number and kind of chromosomes as the parent cell."'
        },
        {
          title: 'History Date Cards',
          description: 'Front: "When was the Declaration of Independence signed?" → Back: "August 2, 1776 (adopted July 4, 1776)."'
        },
        {
          title: 'Math Formula Cards',
          description: 'Front: "Quadratic Formula" → Back: "x = (-b ± √(b² - 4ac)) / 2a, where ax² + bx + c = 0."'
        },
        {
          title: 'Foreign Language Cards',
          description: 'Front: "Buenos días" → Back: "Good morning (Spanish). Used as a greeting until noon."'
        },
        {
          title: 'Confidence-Based Review',
          description: 'After reviewing 30 cards: 18 marked "easy" (won\'t repeat soon), 8 marked "medium" (review once more), 4 marked "hard" (repeated immediately until known).'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Active Recall', definition: 'A study technique where you actively stimulate your memory during learning by trying to retrieve information, rather than passively reviewing it.' },
        { term: 'Spaced Repetition', definition: 'A learning technique where review intervals increase over time. New or difficult material is reviewed frequently; well-known material at longer intervals.' },
        { term: 'Flashcard Deck', definition: 'A collection of related flashcards organized by topic, subject, or study goal.' },
        { term: 'Confidence Rating', definition: 'A self-assessment after each card indicating how well you knew the answer--typically easy, medium, or hard--used to adjust review frequency.' },
        { term: 'Leitner System', definition: 'A spaced repetition method using boxes. Correctly answered cards advance to higher boxes (reviewed less often); incorrect cards return to box one.' },
        { term: 'Retrieval Practice', definition: 'The cognitive process of recalling previously learned information. Research shows it strengthens memory more effectively than re-studying.' },
        { term: 'Interleaving', definition: 'Mixing different topics or card types during study sessions rather than studying one topic exclusively, which improves discrimination and long-term retention.' },
        { term: 'Mastery Threshold', definition: 'The point at which a card is considered "learned"--typically when it\'s been correctly recalled multiple times across different sessions.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many flashcards should I study per session?', answer: 'For new material, limit yourself to 20-30 new cards per session to avoid overwhelming your working memory. You can review more previously seen cards. Quality of recall matters more than quantity.' },
        { question: 'Is it better to study flashcards or re-read my notes?', answer: 'Flashcards are significantly more effective. Research consistently shows that active recall (flashcards) produces stronger, longer-lasting memory than passive review (re-reading). The effort of retrieval is what builds strong memory traces.' },
        { question: 'Should I include images on flashcards?', answer: 'When relevant, yes. Visual information can create additional memory associations. Diagrams, charts, or images paired with text create dual-coding that strengthens recall.' },
        { question: 'How often should I review my flashcard decks?', answer: 'Ideally, review new cards within 24 hours of first seeing them, then at increasing intervals (2 days, 5 days, 2 weeks, etc.). Consistent short sessions are more effective than infrequent long sessions.' },
        { question: 'What makes a good flashcard?', answer: 'Keep each card focused on one concept. Make the question specific ("What enzyme breaks down starch?") rather than vague ("Tell me about digestion"). Use your own words rather than textbook definitions.' },
        { question: 'Are my flashcards stored somewhere I can access later?', answer: 'Flashcards are stored locally in your browser. They persist between sessions as long as you don\'t clear your browser data. Export your decks for backup if needed.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Create your own flashcards rather than using pre-made ones. The process of writing cards is itself a powerful learning activity.',
        'Keep each flashcard focused on a single idea or fact. Avoid cramming multiple concepts onto one card.',
        'Be honest with your confidence ratings. Marking a card "easy" when you weren\'t sure defeats the purpose of the system.',
        'Study flashcards daily in short sessions (15-20 minutes) rather than in long, infrequent marathons.',
        'Shuffle your cards regularly to avoid learning them in a fixed sequence rather than as independent facts.',
        'Review difficult cards at the start of your session when your focus is freshest.',
        'Delete or archive cards you\'ve mastered to keep your active deck focused on what you still need to learn.',
        'Combine flashcards with other study methods (practice problems, teaching others) for comprehensive learning.'
      ]
    }
  },
  relatedTools: ['study-timer', 'pomodoro-timer', 'gpa-calculator', 'readability-scorer'],
  seo: {
    metaTitle: 'Flashcard Session - Active Recall & Spaced Repetition Study - Wiki | UnTrackt',
    metaDescription: 'Study smarter with interactive flashcards using active recall and spaced repetition. Create decks, track progress, and master any subject with confidence-based review.',
    keywords: ['flashcard study', 'flashcards online', 'active recall', 'spaced repetition', 'study flashcards', 'flashcard app', 'memorization tool', 'exam preparation', 'Leitner system']
  }
};
