const fs = require('fs');
const path = require('path');
const root = 'c:/data/code2026/untrackt/src/tests/tools';

const files = [
  'general/RandomNumberGenerator-func.test.jsx',
  'general/BinaryTextConverter-func.test.jsx',
  'general/ImageConverter-func.test.jsx',
  'general/ImageCompressor-func.test.jsx',
  'general/TextSnippets-func.test.jsx',
  'pm/RaidLog-func.test.jsx',
  'health/MoodTracker-func.test.jsx',
  'health/SymptomJournal-func.test.jsx',
  'pm/ProjectTimelinePlanner-func.test.jsx',
  'pm/WorkloadCalculator-func.test.jsx',
  'freelance/ClientProfitabilityEstimator-func.test.jsx',
  'dev/MarkdownPreviewer-func.test.jsx',
  'productivity/MeetingMinutes-func.test.jsx',
  'maths-science/FractionCalculator-func.test.jsx',
  'dev/ColorConverter-func.test.jsx',
  'finance/DailyExpenseTracker-func.test.jsx',
  'seo/RobotsTxtGenerator-func.test.jsx',
  'maths-science/ChemicalEquationBalancer-func.test.jsx',
  'dev/HashGenerator-func.test.jsx',
];

let deleted = 0;
for (const f of files) {
  const full = path.join(root, f);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
    deleted++;
  }
}
console.log('Deleted', deleted, 'files');
// Check
for (const f of files) {
  const full = path.join(root, f);
  if (fs.existsSync(full)) console.log('STILL EXISTS:', f);
}
console.log('DONE');
