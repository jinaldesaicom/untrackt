export default {
  id: 'matrix-calculator',
  title: 'Matrix Calculator',
  description: 'Perform matrix arithmetic — addition, subtraction, multiplication, transpose, determinant, inverse, and more.',
  content: {
    whatIs: {
      heading: 'What is the Matrix Calculator?',
      body: 'The Matrix Calculator performs arithmetic and algebraic operations on matrices. Enter matrices of any size and compute addition, subtraction, multiplication, scalar multiplication, transpose, determinant, inverse, rank, eigenvalues, and row echelon form. Results are displayed with step-by-step breakdowns.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Matrix operations by hand are tedious and error-prone, especially for larger matrices. This calculator handles the arithmetic instantly, shows intermediate steps for learning, and supports operations like determinant and inverse that are crucial for linear algebra, engineering, and data science.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Set the dimensions for matrix A (and matrix B if needed).',
        'Enter matrix values in the grid.',
        'Select an operation (add, multiply, transpose, determinant, inverse, etc.).',
        'View the result matrix and step-by-step solution.',
        'Copy the result or clear and start a new calculation.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Addition, subtraction, and multiplication of matrices.',
        'Scalar multiplication.',
        'Transpose, determinant, and inverse.',
        'Row echelon form and reduced row echelon form.',
        'Rank calculation.',
        'Step-by-step solution display.',
        'Variable matrix dimensions.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Solving systems of linear equations.',
        'Computing transformations in computer graphics.',
        'Linear algebra homework and exam preparation.',
        'Engineering calculations involving matrices.',
        'Data science operations (covariance matrices, PCA).'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '2×2 Determinant', description: '|[3,8],[4,6]| = 3×6 - 8×4 = 18 - 32 = -14.' },
        { title: 'Matrix Multiplication', description: '[1,2;3,4] × [5,6;7,8] = [19,22;43,50].' },
        { title: 'Inverse', description: 'Find A⁻¹ for a 3×3 matrix to solve Ax = b.' },
        { title: 'Transpose', description: 'Convert a 3×2 matrix to a 2×3 matrix by swapping rows and columns.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Matrix', definition: 'A rectangular array of numbers arranged in rows and columns.' },
        { term: 'Determinant', definition: 'A scalar value computed from a square matrix that indicates whether the matrix is invertible.' },
        { term: 'Inverse', definition: 'A matrix A⁻¹ such that A × A⁻¹ = I (the identity matrix). Only square matrices with non-zero determinant have inverses.' },
        { term: 'Transpose', definition: 'A matrix formed by swapping the rows and columns of the original matrix.' },
        { term: 'Row Echelon Form', definition: 'A matrix form where each leading entry is to the right of the leading entry in the row above.' },
        { term: 'Rank', definition: 'The number of linearly independent rows or columns in a matrix.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What matrix sizes are supported?', answer: 'Any size from 1×1 up to practical limits. Most operations work on matrices up to 10×10 for interactive use.' },
        { question: 'Can I multiply non-square matrices?', answer: 'Yes, as long as the number of columns of the first matrix equals the number of rows of the second.' },
        { question: 'What if the determinant is zero?', answer: 'The matrix is singular (not invertible). The inverse operation will indicate this.' },
        { question: 'Does it show steps?', answer: 'Yes. Operations like row reduction and determinant calculation show step-by-step work.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Check matrix dimensions before multiplication — columns of A must equal rows of B.',
        'Verify results by multiplying a matrix by its inverse to get the identity matrix.',
        'Use row echelon form to solve systems of equations efficiently.',
        'Double-check input values — small errors propagate through matrix operations.',
        'Use the step-by-step display to understand the process, not just the answer.',
        'Start with small matrices when learning, then scale up.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'complex-number-calculator', 'statistics-calculator', 'set-theory-calculator'],
  seo: {
    metaTitle: 'Matrix Calculator — Matrix Operations & Linear Algebra | UnTrackt Wiki',
    metaDescription: 'Perform matrix addition, multiplication, determinant, inverse, transpose, and row reduction with step-by-step solutions.',
    keywords: ['matrix calculator', 'matrix multiplication', 'determinant', 'inverse matrix', 'linear algebra', 'matrix operations']
  }
};
