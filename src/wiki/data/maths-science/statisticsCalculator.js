export default {
  id: 'statistics-calculator',
  title: 'Statistics Calculator',
  description: 'Compute mean, median, mode, standard deviation, variance, percentiles, and more from a data set.',
  content: {
    whatIs: {
      heading: 'What is the Statistics Calculator?',
      body: 'The Statistics Calculator computes descriptive statistics from a data set. Enter your numbers and get mean, median, mode, range, variance, standard deviation, quartiles, percentiles, skewness, and kurtosis. It provides a comprehensive statistical summary for quick data analysis.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Computing statistics manually is slow and error-prone for large data sets. This tool gives you a complete descriptive statistics summary instantly, letting you focus on interpreting the data rather than crunching numbers.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter numbers separated by commas, spaces, or newlines.',
        'Click calculate to generate the statistics summary.',
        'View measures of central tendency (mean, median, mode).',
        'View measures of spread (range, variance, standard deviation).',
        'View percentiles and quartiles.',
        'Copy the results or clear for a new data set.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Mean, median, and mode.',
        'Range, variance, and standard deviation (population and sample).',
        'Quartiles (Q1, Q2, Q3) and interquartile range.',
        'Percentile calculation.',
        'Skewness and kurtosis.',
        'Data count and sum.',
        'Frequency distribution table.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Analyzing survey results with descriptive statistics.',
        'Statistics homework and exam preparation.',
        'Quick data analysis for research projects.',
        'Quality control data analysis.',
        'Summarizing test scores or performance metrics.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Test Scores', description: 'Data: 85, 90, 78, 92, 88 → Mean: 86.6, Median: 88, StdDev: 4.98.' },
        { title: 'Monthly Sales', description: '12 values → Mean, variance, and quartiles showing sales distribution.' },
        { title: 'Survey Ratings', description: '1-5 ratings from 100 respondents → Mode, median, and frequency distribution.' },
        { title: 'Lab Measurements', description: 'Repeated measurements → Mean with standard deviation for error reporting.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Mean', definition: 'The arithmetic average — sum of all values divided by the count.' },
        { term: 'Median', definition: 'The middle value when data is sorted. For even counts, the average of the two middle values.' },
        { term: 'Standard Deviation', definition: 'A measure of how spread out the data values are from the mean.' },
        { term: 'Variance', definition: 'The average of the squared differences from the mean — the square of standard deviation.' },
        { term: 'Quartile', definition: 'Values that divide sorted data into four equal parts (Q1 = 25th percentile, Q2 = median, Q3 = 75th percentile).' },
        { term: 'Skewness', definition: 'A measure of asymmetry in the data distribution. Positive = right-skewed, negative = left-skewed.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between population and sample standard deviation?', answer: 'Population (σ) divides by N. Sample (s) divides by N-1 to account for estimation bias.' },
        { question: 'How many data points do I need?', answer: 'At least 2 for most statistics. More data points give more meaningful results.' },
        { question: 'What if my data has outliers?', answer: 'Median is more robust than mean for outlier-heavy data. Consider IQR for spread instead of standard deviation.' },
        { question: 'Can I enter grouped data?', answer: 'Enter individual values. For grouped frequency data, enter each value the number of times it appears.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Report both mean and median to check for skewed distributions.',
        'Use sample standard deviation (N-1) when working with a sample from a larger population.',
        'Check for outliers using the IQR method (values outside Q1 - 1.5×IQR or Q3 + 1.5×IQR).',
        'Report standard deviation alongside the mean for context about variability.',
        'Use the frequency distribution to quickly spot the mode and data patterns.',
        'For comparing data sets, use coefficients of variation rather than raw standard deviation.'
      ]
    }
  },
  relatedTools: ['probability-calculator', 'graph-plotter', 'significant-figures-calculator', 'error-uncertainty-calculator'],
  seo: {
    metaTitle: 'Statistics Calculator — Mean, Median, Standard Deviation | UnTrackt Wiki',
    metaDescription: 'Compute descriptive statistics: mean, median, mode, standard deviation, variance, quartiles, and more from any data set.',
    keywords: ['statistics calculator', 'mean median mode', 'standard deviation', 'variance', 'descriptive statistics', 'statistics tool']
  }
};
