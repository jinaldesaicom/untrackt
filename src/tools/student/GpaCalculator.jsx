import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const GRADES = [
  { label: 'A+ (4.0)', value: 4.0 },
  { label: 'A (4.0)', value: 4.0 },
  { label: 'A- (3.7)', value: 3.7 },
  { label: 'B+ (3.3)', value: 3.3 },
  { label: 'B (3.0)', value: 3.0 },
  { label: 'B- (2.7)', value: 2.7 },
  { label: 'C+ (2.3)', value: 2.3 },
  { label: 'C (2.0)', value: 2.0 },
  { label: 'D (1.0)', value: 1.0 },
  { label: 'F (0.0)', value: 0.0 },
]

let nextId = 1
function newRow() {
  return { id: nextId++, name: '', credits: '', grade: 4.0 }
}

export default function GpaCalculator() {
  const [courses, setCourses] = useState([newRow(), newRow()])

  const updateCourse = (id, field, value) => {
    setCourses((cs) => cs.map((c) => c.id === id ? { ...c, [field]: value } : c))
  }

  const addCourse = () => setCourses((cs) => [...cs, newRow()])
  const removeCourse = (id) => setCourses((cs) => cs.filter((c) => c.id !== id))

  const validCourses = courses.filter((c) => c.credits && !isNaN(Number(c.credits)) && Number(c.credits) > 0)
  const totalCredits = validCourses.reduce((sum, c) => sum + Number(c.credits), 0)
  const weightedSum = validCourses.reduce((sum, c) => sum + Number(c.credits) * c.grade, 0)
  const gpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : null

  const gpaColor = () => {
    if (!gpa) return 'text-gray-400'
    const n = parseFloat(gpa)
    if (n >= 3.7) return 'text-green-600'
    if (n >= 3.0) return 'text-blue-600'
    if (n >= 2.0) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-5">
      {/* Course rows */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left font-medium text-gray-600 pb-2 pr-3">Course Name</th>
              <th className="text-left font-medium text-gray-600 pb-2 pr-3 w-24">Credits</th>
              <th className="text-left font-medium text-gray-600 pb-2 pr-3">Grade</th>
              <th className="pb-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="py-2 pr-3">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g. Calculus"
                    className="input-field"
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    placeholder="3"
                    min="0"
                    max="12"
                    className="input-field"
                  />
                </td>
                <td className="py-2 pr-3">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', parseFloat(e.target.value))}
                    className="input-field"
                  >
                    {GRADES.map((g, i) => (
                      <option key={i} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addCourse} className="btn-secondary flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Course
      </button>

      {/* Result */}
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Credits</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalCredits}</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-300">Cumulative GPA</p>
          <p className={`text-4xl font-bold ${gpaColor()}`}>
            {gpa ?? '—'}
          </p>
        </div>
      </div>
    </div>
  )
}
