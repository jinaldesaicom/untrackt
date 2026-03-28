import { useState, useEffect } from 'react'
import { Plus, Trash2, Calculator } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_sprint_capacity'

function emptyMember() {
  return { id: Date.now(), name: '', hoursPerDay: 8, daysOff: 0, focusFactor: 80 }
}

export default function SprintCapacityCalculator() {
  const [sprintDays, setSprintDays] = useState(() => getItem(STORAGE_KEY + '_days', 10))
  const [members, setMembers] = useState(() => getItem(STORAGE_KEY + '_members', [emptyMember()]))
  const [ceremonies, setCeremonies] = useState(() => getItem(STORAGE_KEY + '_ceremonies', 8))

  useEffect(() => {
    setItem(STORAGE_KEY + '_days', sprintDays)
    setItem(STORAGE_KEY + '_members', members)
    setItem(STORAGE_KEY + '_ceremonies', ceremonies)
  }, [sprintDays, members, ceremonies])

  const addMember = () => setMembers(prev => [...prev, { ...emptyMember(), id: Date.now() + Math.random() }])
  const removeMember = (id) => setMembers(prev => prev.filter(m => m.id !== id))
  const updateMember = (id, key, val) => setMembers(prev => prev.map(m => m.id === id ? { ...m, [key]: val } : m))

  const calcMemberCapacity = (m) => {
    const availDays = Math.max(0, sprintDays - m.daysOff)
    const rawHours = availDays * m.hoursPerDay
    const ceremonyHours = ceremonies / members.length
    const netHours = Math.max(0, rawHours - ceremonyHours)
    return Math.round(netHours * (m.focusFactor / 100) * 10) / 10
  }

  const totalCapacity = members.reduce((sum, m) => sum + calcMemberCapacity(m), 0)
  const totalRawHours = members.reduce((sum, m) => sum + Math.max(0, sprintDays - m.daysOff) * m.hoursPerDay, 0)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sprint Length (days)</label>
          <input type="number" min="1" max="30" value={sprintDays} onChange={e => setSprintDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="input-field text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ceremony Hours (total)</label>
          <input type="number" min="0" max="100" value={ceremonies} onChange={e => setCeremonies(Math.max(0, parseFloat(e.target.value) || 0))}
            className="input-field text-sm" />
          <p className="text-[10px] text-gray-400 mt-0.5">Standup, planning, review, retro — total for team</p>
        </div>
        <div className="flex items-end">
          <div className="w-full rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3 text-center">
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Total Capacity</p>
            <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{Math.round(totalCapacity)} hrs</p>
            <p className="text-[10px] text-gray-400">{Math.round(totalRawHours)} raw hrs</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Team Members</h3>
          <button onClick={addMember} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Member
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 pr-2">Name</th>
                <th className="pb-2 px-2 text-center">Hrs/Day</th>
                <th className="pb-2 px-2 text-center">Days Off</th>
                <th className="pb-2 px-2 text-center">Focus %</th>
                <th className="pb-2 px-2 text-center">Capacity</th>
                <th className="pb-2 pl-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-2">
                    <input type="text" value={m.name} onChange={e => updateMember(m.id, 'name', e.target.value)}
                      className="bg-transparent text-sm text-gray-900 dark:text-white outline-none w-full" placeholder="Team member" />
                  </td>
                  <td className="py-2 px-2">
                    <input type="number" min="1" max="24" value={m.hoursPerDay}
                      onChange={e => updateMember(m.id, 'hoursPerDay', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 mx-auto block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-center" />
                  </td>
                  <td className="py-2 px-2">
                    <input type="number" min="0" max={sprintDays} value={m.daysOff}
                      onChange={e => updateMember(m.id, 'daysOff', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 mx-auto block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-center" />
                  </td>
                  <td className="py-2 px-2">
                    <input type="number" min="10" max="100" value={m.focusFactor}
                      onChange={e => updateMember(m.id, 'focusFactor', Math.min(100, Math.max(10, parseInt(e.target.value) || 10)))}
                      className="w-16 mx-auto block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs text-center" />
                  </td>
                  <td className="py-2 px-2 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                    {calcMemberCapacity(m)} hrs
                  </td>
                  <td className="py-2 pl-2">
                    <button onClick={() => removeMember(m.id)} className="text-gray-300 hover:text-red-500" disabled={members.length <= 1}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-3">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Tip:</strong> Focus factor accounts for meetings, context switching, and other non-sprint work.
          A typical value is 60–80%. Adjust per team member based on their role and responsibilities.
        </p>
      </div>
    </div>
  )
}
