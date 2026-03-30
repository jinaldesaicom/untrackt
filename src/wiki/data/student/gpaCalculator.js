export default {
  id: 'gpa-calculator',
  title: 'GPA Calculator',
  description: 'Calculate your weighted and unweighted GPA, semester GPA, and cumulative GPA with support for multiple grading scales and credit hours.',
  content: {
    whatIs: {
      heading: 'What is the GPA Calculator?',
      body: 'The GPA Calculator is a comprehensive academic tool that computes your Grade Point Average based on course grades and credit hours. It supports both weighted and unweighted GPA calculations, handles multiple grading scales (4.0, 5.0, percentage-based), and lets you calculate semester GPA as well as cumulative GPA across multiple terms. Whether you\'re tracking your academic standing, planning for graduate school, or estimating what grades you need to reach a target GPA, this calculator provides accurate, instant results.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Manually computing GPA--especially across multiple semesters with varying credit hours and weighted courses--is tedious and error-prone. This tool eliminates arithmetic mistakes, instantly shows you how each grade impacts your overall GPA, and lets you run "what-if" scenarios to plan ahead. It\'s particularly valuable when applying to colleges, scholarships, or graduate programs that require precise GPA reporting.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select your grading scale (4.0 standard, 4.0 with plus/minus, 5.0 weighted, or custom).',
        'Enter each course name, the letter grade or percentage you received, and the number of credit hours.',
        'Add as many courses as needed for the semester using the "Add Course" button.',
        'View your calculated semester GPA displayed in real time.',
        'To calculate cumulative GPA, add courses from multiple semesters or enter your prior cumulative GPA and total credit hours.',
        'Use the "What-If" mode to experiment with hypothetical grades and see how they would affect your GPA.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports weighted and unweighted GPA calculations on 4.0 and 5.0 scales.',
        'Handles plus/minus grading (A+, A, A-, B+, etc.) with precise point values.',
        'Calculates both semester GPA and cumulative GPA across multiple terms.',
        'Credit hour weighting ensures accurate results for courses of different sizes.',
        'What-if scenario planner lets you see how future grades impact your GPA.',
        'Export or copy your GPA report for academic records and applications.',
        'Works entirely in your browser with no data sent to any server.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'High school students calculating weighted GPA for college applications.',
        'College students tracking semester and cumulative GPA each term.',
        'Graduate school applicants verifying their GPA meets admission requirements.',
        'Students planning which grades they need to achieve a target cumulative GPA.',
        'Academic advisors helping students understand their academic standing.',
        'Scholarship applicants confirming they meet minimum GPA thresholds.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Simple Semester GPA',
          description: 'Three courses--English (A, 3 credits), Math (B+, 4 credits), History (A-, 3 credits)--yield a semester GPA of 3.63 on a 4.0 scale.'
        },
        {
          title: 'Weighted High School GPA',
          description: 'AP Chemistry (A, 5.0 weight) and Regular English (B, 4.0 weight) with equal credits produce a weighted GPA of 4.5 vs. an unweighted 3.5.'
        },
        {
          title: 'Cumulative GPA Across Semesters',
          description: 'Semester 1 GPA of 3.4 (15 credits) combined with Semester 2 GPA of 3.8 (16 credits) gives a cumulative GPA of approximately 3.61.'
        },
        {
          title: 'What-If Scenario',
          description: 'Current cumulative GPA is 3.2 with 60 credits. The calculator shows you need straight A\'s in 15 credits next semester to raise it to 3.36.'
        },
        {
          title: 'Plus/Minus Impact',
          description: 'Comparing a B+ (3.33) vs. a B (3.00) in a 4-credit course shows a 0.04 difference in overall GPA across 16 total credits.'
        },
        {
          title: 'Graduate School Threshold',
          description: 'A student with 3.45 GPA and 90 credits completed calculates they need at least a 3.7 GPA over their remaining 30 credits to graduate with a 3.51.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'GPA', definition: 'Grade Point Average--a numerical representation of a student\'s academic performance, typically on a 4.0 scale.' },
        { term: 'Credit Hours', definition: 'The weight assigned to a course, usually reflecting the number of hours spent in class per week. A 3-credit course contributes more to GPA than a 1-credit course.' },
        { term: 'Weighted GPA', definition: 'A GPA calculation that assigns extra points to honors, AP, or IB courses, often using a 5.0 scale instead of 4.0.' },
        { term: 'Unweighted GPA', definition: 'A GPA calculated on a standard 4.0 scale regardless of course difficulty level.' },
        { term: 'Cumulative GPA', definition: 'The overall GPA computed across all semesters and courses in a student\'s academic career.' },
        { term: 'Semester GPA', definition: 'The GPA calculated for a single academic term based only on that semester\'s courses.' },
        { term: 'Quality Points', definition: 'The product of a course\'s grade points and its credit hours. Total quality points divided by total credits equals GPA.' },
        { term: 'Dean\'s List', definition: 'An academic honor typically awarded to students who achieve a semester GPA above a certain threshold, often 3.5 or higher.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What\'s the difference between weighted and unweighted GPA?', answer: 'Unweighted GPA uses a standard 4.0 scale for all courses. Weighted GPA adds extra points (usually 0.5 or 1.0) for advanced courses like AP or honors, allowing GPAs above 4.0.' },
        { question: 'How do credit hours affect my GPA?', answer: 'Courses with more credit hours have a larger impact on your GPA. A grade in a 4-credit course counts twice as much as the same grade in a 2-credit course.' },
        { question: 'Can I calculate my GPA if my school uses percentages instead of letter grades?', answer: 'Yes. Select the percentage-based grading scale, and the calculator will convert your percentage grades to the corresponding GPA points automatically.' },
        { question: 'How do I calculate my cumulative GPA with transfer credits?', answer: 'Enter your transfer GPA and total transfer credits, then add your current institution\'s courses. The calculator combines both to compute your overall cumulative GPA.' },
        { question: 'Is my data saved or sent anywhere?', answer: 'No. All calculations happen locally in your browser. No grades, courses, or personal information are transmitted or stored on any server.' },
        { question: 'What if my school uses a non-standard grading scale?', answer: 'You can customize the grade-to-point mapping in the settings to match your institution\'s specific scale.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Double-check that you\'ve entered the correct number of credit hours for each course--this is the most common source of errors.',
        'Use the what-if feature early in the semester to set realistic grade targets.',
        'When applying to schools, confirm whether they want your weighted or unweighted GPA.',
        'Include all courses in your cumulative GPA calculation, even those you plan to retake.',
        'Track your GPA each semester to spot trends and address issues early.',
        'Remember that some programs recalculate GPA using only relevant coursework, so the GPA on your transcript may differ from what schools compute.'
      ]
    }
  },
  relatedTools: ['percentage-calculator', 'word-counter', 'study-timer', 'essay-outline-builder'],
  seo: {
    metaTitle: 'GPA Calculator - Weighted & Cumulative GPA Tool - Wiki | UnTrackt',
    metaDescription: 'Calculate your weighted and unweighted GPA, semester GPA, and cumulative GPA. Supports credit hours, plus/minus grading, and what-if scenarios for academic planning.',
    keywords: ['GPA calculator', 'grade point average', 'weighted GPA', 'unweighted GPA', 'cumulative GPA', 'semester GPA', 'college GPA', 'credit hours', 'academic calculator']
  }
};
