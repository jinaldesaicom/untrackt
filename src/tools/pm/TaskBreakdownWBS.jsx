import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronRight, ChevronDown, Download, Copy } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_wbs'

let _id = Date.now()
function uid() { return _id++ }

function newNode(name = '', parentId = null) {
  return { id: uid(), name, parentId, children: [] }
}

function cloneTree(nodes) {
  return nodes.map(n => ({ ...n, children: cloneTree(n.children) }))
}

function addChild(nodes, parentId, child) {
  return nodes.map(n => {
    if (n.id === parentId) return { ...n, children: [...n.children, child] }
    return { ...n, children: addChild(n.children, parentId, child) }
  })
}

function removeNode(nodes, id) {
  return nodes.filter(n => n.id !== id).map(n => ({ ...n, children: removeNode(n.children, id) }))
}

function updateNode(nodes, id, name) {
  return nodes.map(n => {
    if (n.id === id) return { ...n, name }
    return { ...n, children: updateNode(n.children, id, name) }
  })
}

function flattenForCSV(nodes, level = 0, rows = []) {
  nodes.forEach(n => {
    rows.push({ level, name: n.name || '(untitled)' })
    flattenForCSV(n.children, level + 1, rows)
  })
  return rows
}

export default function TaskBreakdownWBS() {
  const [tree, setTree] = useState(() => getItem(STORAGE_KEY, []))
  const [collapsed, setCollapsed] = useState({})

  useEffect(() => { setItem(STORAGE_KEY, tree) }, [tree])

  const addRoot = () => setTree(prev => [...prev, newNode()])
  const addChildNode = (parentId) => setTree(prev => addChild(prev, parentId, newNode()))
  const remove = (id) => setTree(prev => removeNode(prev, id))
  const rename = (id, name) => setTree(prev => updateNode(prev, id, name))
  const toggle = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(tree, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'wbs.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = () => {
    const rows = flattenForCSV(tree)
    const csv = 'Level,Name\n' + rows.map(r => `${r.level},"${r.name}"`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'wbs.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const countNodes = (nodes) => nodes.reduce((s, n) => s + 1 + countNodes(n.children), 0)

  function renderNode(node, depth = 0) {
    const isCollapsed = collapsed[node.id]
    const hasChildren = node.children.length > 0
    return (
      <div key={node.id} style={{ marginLeft: depth * 24 }}>
        <div className="flex items-center gap-1.5 py-1 group">
          <button onClick={() => toggle(node.id)} className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            {hasChildren ? (isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : <span className="w-4 h-4 inline-block" />}
          </button>
          <input
            value={node.name}
            onChange={(e) => rename(node.id, e.target.value)}
            placeholder={depth === 0 ? 'Deliverable / Phase' : 'Work package'}
            className="flex-1 bg-transparent border-b border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 outline-none text-sm py-0.5 text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
          />
          <button onClick={() => addChildNode(node.id)} title="Add child" className="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-700 text-xs px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30 transition-opacity">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => remove(node.id)} title="Remove" className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs px-1 py-0.5 rounded transition-opacity">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        {!isCollapsed && node.children.map(c => renderNode(c, depth + 1))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{countNodes(tree)} node{countNodes(tree) !== 1 ? 's' : ''}</span>
        <div className="flex items-center gap-2">
          <button onClick={exportJSON} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-3.5 h-3.5" /> JSON
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button onClick={addRoot} className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus className="w-4 h-4" /> Add Root
          </button>
        </div>
      </div>

      {tree.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-8 text-center text-sm text-gray-400">
          No nodes yet. Click &quot;Add Root&quot; to start building your WBS.
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          {tree.map(n => renderNode(n, 0))}
        </div>
      )}
    </div>
  )
}
