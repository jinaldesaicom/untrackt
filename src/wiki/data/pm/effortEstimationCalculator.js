export default {
  id: 'effort-estimation-calculator',
  title: 'Effort Estimation Calculator',
  description: 'Estimate project effort using PERT, analogous, or parametric methods. Calculate expected, optimistic, and pessimistic hours.',
  content: {
    whatIs: {
      heading: 'What is the Effort Estimation Calculator?',
      body: 'The Effort Estimation Calculator helps you estimate the effort required for tasks and projects using proven estimation techniques. Choose PERT (three-point estimation), analogous (comparison-based), or parametric (rate-based) methods. Enter optimistic, most likely, and pessimistic estimates to calculate expected effort with confidence ranges.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Inaccurate estimates are a top cause of project failure. Single-point estimates are almost always wrong. This tool applies statistical methods (PERT) to produce more realistic ranges, helping you set expectations and plan with appropriate buffers.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select an estimation method (PERT, analogous, or parametric).',
        'For PERT: enter optimistic (O), most likely (M), and pessimistic (P) estimates per task.',
        'Review the calculated expected estimate: (O + 4M + P) / 6.',
        'See the standard deviation for each estimate.',
        'Sum task estimates for total project effort.',
        'Apply confidence ranges (±1σ for 68%, ±2σ for 95%).'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'PERT three-point estimation (O, M, P).',
        'Analogous estimation using historical reference data.',
        'Parametric estimation (rate × quantity).',
        'Standard deviation and variance calculation.',
        'Confidence range output (68%, 95%, 99%).',
        'Task-level and total project roll-up.',
        'Export estimates as CSV or report.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Estimating software development tasks before sprint planning.',
        'Creating project proposals with effort and cost estimates.',
        'Applying PERT analysis to high-uncertainty tasks.',
        'Comparing estimates across team members for calibration.',
        'Building contingency buffers based on estimation uncertainty.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'PERT Estimate', description: 'Task: API Development — O: 3 days, M: 5 days, P: 12 days → Expected: 5.8 days, σ: 1.5 days.' },
        { title: 'Analogous Estimate', description: 'Last similar project took 200 hours. This project is ~20% larger → Estimate: 240 hours.' },
        { title: 'Parametric Estimate', description: '50 screens × 4 hours/screen = 200 hours for UI development.' },
        { title: 'Project Roll-Up', description: '10 tasks estimated with PERT → Total: 480 hours (95% confidence: 400-560 hours).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'PERT', definition: 'Program Evaluation and Review Technique — a statistical tool using three estimates (O, M, P) to calculate expected duration.' },
        { term: 'Three-Point Estimate', definition: 'An estimation technique using optimistic, most likely, and pessimistic values to account for uncertainty.' },
        { term: 'Standard Deviation (σ)', definition: 'A measure of estimate uncertainty, calculated as (P - O) / 6 in PERT.' },
        { term: 'Analogous Estimation', definition: 'Estimating based on actual data from a similar past project.' },
        { term: 'Parametric Estimation', definition: 'Estimating by multiplying a rate or unit cost by a quantity.' },
        { term: 'Contingency', definition: 'Extra time or budget added to account for estimation uncertainty and risk.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which estimation method is best?', answer: 'PERT is best for uncertain tasks. Analogous works well when you have similar past projects. Parametric is good for repetitive tasks with known rates.' },
        { question: 'What does the standard deviation mean?', answer: 'It measures the spread of the estimate. ±1σ gives 68% confidence, ±2σ gives 95% confidence.' },
        { question: 'How accurate is PERT?', answer: 'PERT is more accurate than single-point estimates because it accounts for uncertainty. Accuracy improves with experience in providing O, M, P values.' },
        { question: 'Should I add contingency?', answer: 'Yes. Use the standard deviation to add appropriate contingency, especially for high-risk tasks.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use PERT for tasks with high uncertainty; analogous for familiar work.',
        'Break tasks down before estimating — smaller tasks are easier to estimate accurately.',
        'Involve the people doing the work in the estimation.',
        'Track actual vs. estimated effort to calibrate future estimates.',
        'Use confidence ranges rather than single numbers when communicating estimates.',
        'Add contingency proportional to the estimation uncertainty.'
      ]
    }
  },
  relatedTools: ['cost-estimator', 'workload-calculator', 'task-breakdown-wbs', 'resource-allocation-planner'],
  seo: {
    metaTitle: 'Effort Estimation Calculator — PERT & Three-Point Estimates | UnTrackt Wiki',
    metaDescription: 'Estimate project effort using PERT three-point estimation, analogous, or parametric methods. Calculate expected effort with confidence ranges.',
    keywords: ['effort estimation', 'PERT estimate', 'three-point estimation', 'project estimation', 'task estimation', 'estimation calculator']
  }
};
