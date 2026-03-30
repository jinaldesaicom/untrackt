import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Plus, Trash2, Download, ZoomIn, ZoomOut, Maximize2, Printer, FileText, Copy, Check, RotateCcw, Save, FolderOpen, X, ChevronDown, Palette } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_mindmaps'
const ACTIVE_KEY = 'untrackt_mindmap_active'

// ── Branch color palettes ──────────────────────────────────────────────────
const BRANCH_COLORS = [
  { bg: '#ede9fe', stroke: '#7c3aed', text: '#5b21b6', dark: { bg: '#2e1065', stroke: '#a78bfa', text: '#c4b5fd' } },
  { bg: '#dbeafe', stroke: '#2563eb', text: '#1e40af', dark: { bg: '#172554', stroke: '#60a5fa', text: '#93c5fd' } },
  { bg: '#d1fae5', stroke: '#059669', text: '#065f46', dark: { bg: '#052e16', stroke: '#34d399', text: '#6ee7b7' } },
  { bg: '#fef3c7', stroke: '#d97706', text: '#92400e', dark: { bg: '#451a03', stroke: '#fbbf24', text: '#fcd34d' } },
  { bg: '#fce7f3', stroke: '#db2777', text: '#9d174d', dark: { bg: '#500724', stroke: '#f472b6', text: '#f9a8d4' } },
  { bg: '#ffedd5', stroke: '#ea580c', text: '#9a3412', dark: { bg: '#431407', stroke: '#fb923c', text: '#fdba74' } },
  { bg: '#e0e7ff', stroke: '#4f46e5', text: '#3730a3', dark: { bg: '#1e1b4b', stroke: '#818cf8', text: '#a5b4fc' } },
  { bg: '#ccfbf1', stroke: '#0d9488', text: '#115e59', dark: { bg: '#042f2e', stroke: '#2dd4bf', text: '#5eead4' } },
]

const ROOT_COLOR = { bg: '#f1f5f9', stroke: '#475569', text: '#1e293b', dark: { bg: '#334155', stroke: '#94a3b8', text: '#f1f5f9' } }

const DRAG_THRESHOLD = 5

// ── Helpers ────────────────────────────────────────────────────────────────
let _idCounter = Date.now()
function uid() { return `n${++_idCounter}` }

function createNode(text = 'New topic', parentId = null) {
  return { id: uid(), text, parentId, children: [], collapsed: false, x: 0, y: 0 }
}

function createDefaultMap() {
  const root = createNode('Central Topic', null)
  root.id = uid()
  return { id: uid(), name: 'Untitled Mind Map', root, createdAt: new Date().toISOString() }
}

function findNode(node, id) {
  if (node.id === id) return node
  for (const child of node.children) {
    const found = findNode(child, id)
    if (found) return found
  }
  return null
}

function findParent(node, id) {
  for (const child of node.children) {
    if (child.id === id) return node
    const found = findParent(child, id)
    if (found) return found
  }
  return null
}

function cloneTree(node) {
  return { ...node, children: node.children.map(cloneTree) }
}

function countNodes(node) {
  return 1 + node.children.reduce((s, c) => s + countNodes(c), 0)
}

function getDepth(node, d = 0) {
  if (node.children.length === 0) return d
  return Math.max(...node.children.map(c => getDepth(c, d + 1)))
}

function collectDescendantIds(node, set) {
  set.add(node.id)
  node.children.forEach(c => collectDescendantIds(c, set))
}

// ── Layout algorithm (tree-based) ─────────────────────────────────────────
function layoutTree(root, originX, originY) {
  const H_GAP = 220
  const V_GAP = 56

  function getSubtreeHeight(node) {
    if (node.collapsed || node.children.length === 0) return V_GAP
    const childHeights = node.children.map(getSubtreeHeight)
    return Math.max(childHeights.reduce((s, h) => s + h, 0), V_GAP)
  }

  function layout(node, x, yStart, yEnd, depth) {
    const midY = (yStart + yEnd) / 2
    node.x = x
    node.y = midY

    if (node.collapsed || node.children.length === 0) return
    const totalH = node.children.map(getSubtreeHeight).reduce((s, h) => s + h, 0)
    let cy = midY - totalH / 2
    for (const child of node.children) {
      const ch = getSubtreeHeight(child)
      layout(child, x + H_GAP, cy, cy + ch, depth + 1)
      cy += ch
    }
  }

  const totalH = getSubtreeHeight(root)
  layout(root, originX, originY - totalH / 2, originY + totalH / 2, 0)
}

// ── Radial layout algorithm ───────────────────────────────────────────────
function layoutRadial(root, originX, originY) {
  const RING_GAP = 200

  function countLeaves(node) {
    if (node.collapsed || node.children.length === 0) return 1
    return node.children.reduce((s, c) => s + countLeaves(c), 0)
  }

  function lay(node, startAngle, endAngle, depth) {
    if (depth === 0) {
      node.x = originX
      node.y = originY
    } else {
      const midAngle = (startAngle + endAngle) / 2
      const radius = RING_GAP * depth
      node.x = originX + radius * Math.cos(midAngle)
      node.y = originY + radius * Math.sin(midAngle)
    }
    if (node.collapsed || node.children.length === 0) return
    const totalLeaves = countLeaves(node)
    let currentAngle = startAngle
    for (const child of node.children) {
      const proportion = countLeaves(child) / totalLeaves
      const childEnd = currentAngle + proportion * (endAngle - startAngle)
      lay(child, currentAngle, childEnd, depth + 1)
      currentAngle = childEnd
    }
  }

  lay(root, -Math.PI, Math.PI, 0)
}

// ── Indented text export ──────────────────────────────────────────────────
function toIndentedText(node, depth = 0) {
  const indent = '  '.repeat(depth)
  let text = `${indent}${node.text}\n`
  for (const child of node.children) text += toIndentedText(child, depth + 1)
  return text
}

// ── Markdown outline export ───────────────────────────────────────────────
function toMarkdown(node, depth = 0) {
  const prefix = depth === 0 ? '# ' : '  '.repeat(depth - 1) + '- '
  let text = `${prefix}${node.text}\n`
  for (const child of node.children) text += toMarkdown(child, depth + 1)
  return text
}

// ── Node component ────────────────────────────────────────────────────────
function MindMapNode({ node, branchColor, isDark, isRoot, selectedId, onSelect, onAdd, onDelete, onToggleCollapse, onStartEdit, dragNodeId, dropTargetId, dragInvalidIds, onNodeMouseDown, onNodeMouseEnter }) {
  const color = isRoot ? (isDark ? ROOT_COLOR.dark : ROOT_COLOR) : (isDark ? branchColor.dark : branchColor)
  const isSelected = selectedId === node.id
  const isDragSource = dragNodeId === node.id
  const canDrop = dragNodeId && !dragInvalidIds.has(node.id)
  const isDragTarget = dropTargetId === node.id && canDrop

  return (
    <g style={isDragSource ? { opacity: 0.4 } : undefined}>
      {/* Connector lines to children */}
      {!node.collapsed && node.children.map(child => {
        const startX = node.x + 80
        const startY = node.y
        const endX = child.x - 5
        const endY = child.y
        const cpx = (startX + endX) / 2
        return (
          <path
            key={`edge-${node.id}-${child.id}`}
            d={`M${startX},${startY} C${cpx},${startY} ${cpx},${endY} ${endX},${endY}`}
            fill="none"
            stroke={color.stroke}
            strokeWidth={isRoot ? 2.5 : 1.8}
            opacity={0.5}
          />
        )
      })}

      {/* Node body */}
      <g
        className="cursor-pointer"
        onMouseDown={(e) => { e.stopPropagation(); onNodeMouseDown(node.id, e) }}
        onMouseEnter={() => { if (dragNodeId) onNodeMouseEnter(node.id) }}
        onDoubleClick={(e) => { e.stopPropagation(); onStartEdit(node.id) }}
      >
        <rect
          x={node.x - (isRoot ? 90 : 75)}
          y={node.y - (isRoot ? 24 : 18)}
          width={isRoot ? 180 : 150}
          height={isRoot ? 48 : 36}
          rx={isRoot ? 24 : 10}
          fill={color.bg}
          stroke={isDragTarget ? '#22c55e' : isSelected ? '#3b82f6' : color.stroke}
          strokeWidth={isDragTarget ? 3 : isSelected ? 2.5 : 1.5}
          strokeDasharray={isDragTarget ? '6 3' : 'none'}
        />
        <text
          x={node.x}
          y={node.y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill={color.text}
          fontSize={isRoot ? 15 : 13}
          fontWeight={isRoot ? 700 : 500}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {node.text.length > 18 ? node.text.slice(0, 17) + '…' : node.text}
        </text>
      </g>

      {/* Add child button */}
      {isSelected && !dragNodeId && (
        <g
          className="cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onAdd(node.id) }}
        >
          <circle cx={node.x + (isRoot ? 90 : 75) + 14} cy={node.y} r={11} fill="#3b82f6" />
          <text x={node.x + (isRoot ? 90 : 75) + 14} y={node.y + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={16} fontWeight={700}>+</text>
        </g>
      )}

      {/* Collapse indicator */}
      {node.children.length > 0 && (
        <g
          className="cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onToggleCollapse(node.id) }}
        >
          <circle
            cx={node.x + (isRoot ? 90 : 75) + (isSelected && !dragNodeId ? 36 : 14)}
            cy={node.y}
            r={9}
            fill={isDark ? '#374151' : '#e5e7eb'}
            stroke={color.stroke}
            strokeWidth={1}
          />
          <text
            x={node.x + (isRoot ? 90 : 75) + (isSelected && !dragNodeId ? 36 : 14)}
            y={node.y + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill={color.text}
            fontSize={10}
            fontWeight={700}
          >
            {node.collapsed ? `+${countNodes(node) - 1}` : '−'}
          </text>
        </g>
      )}

      {/* Recurse children */}
      {!node.collapsed && node.children.map((child, i) => (
        <MindMapNode
          key={child.id}
          node={child}
          branchColor={branchColor}
          isDark={isDark}
          isRoot={false}
          selectedId={selectedId}
          onSelect={onSelect}
          onAdd={onAdd}
          onDelete={onDelete}
          onToggleCollapse={onToggleCollapse}
          onStartEdit={onStartEdit}
          dragNodeId={dragNodeId}
          dropTargetId={dropTargetId}
          dragInvalidIds={dragInvalidIds}
          onNodeMouseDown={onNodeMouseDown}
          onNodeMouseEnter={onNodeMouseEnter}
        />
      ))}
    </g>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function MindMap() {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const editRef = useRef(null)
  const panStartRef = useRef({ x: 0, y: 0 })

  // Load mind maps from storage
  const [maps, setMaps] = useState(() => {
    const saved = getItem(STORAGE_KEY, null)
    if (saved && Array.isArray(saved) && saved.length > 0) return saved
    return [createDefaultMap()]
  })
  const [activeMapId, setActiveMapId] = useState(() => {
    const saved = getItem(ACTIVE_KEY, null)
    if (saved && maps.some(m => m.id === saved)) return saved
    return maps[0]?.id
  })

  const [selectedId, setSelectedId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [zoom, setZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const [layoutMode, setLayoutMode] = useState('tree')
  const [showMapList, setShowMapList] = useState(false)
  const [renamingMapId, setRenamingMapId] = useState(null)
  const [renameText, setRenameText] = useState('')
  const [copied, setCopied] = useState(false)

  // Drag-and-drop state
  const [dragState, setDragState] = useState(null) // { nodeId, startX, startY, isDragging }
  const [dropTargetId, setDropTargetId] = useState(null)

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  const activeMap = useMemo(() => maps.find(m => m.id === activeMapId) || maps[0], [maps, activeMapId])

  // Compute invalid drop target IDs (dragged node + all its descendants)
  const dragInvalidIds = useMemo(() => {
    if (!dragState?.isDragging || !activeMap) return new Set()
    const dragNode = findNode(activeMap.root, dragState.nodeId)
    if (!dragNode) return new Set()
    const ids = new Set()
    collectDescendantIds(dragNode, ids)
    return ids
  }, [dragState?.isDragging, dragState?.nodeId, activeMap])

  // Persist to storage
  useEffect(() => { setItem(STORAGE_KEY, maps) }, [maps])
  useEffect(() => { setItem(ACTIVE_KEY, activeMapId) }, [activeMapId])

  // Apply layout whenever tree or mode changes
  useEffect(() => {
    if (!activeMap) return
    const root = cloneTree(activeMap.root)
    if (layoutMode === 'radial') {
      layoutRadial(root, 0, 0)
    } else {
      layoutTree(root, 0, 0)
    }
    updateRoot(root)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutMode])

  // Focus edit input
  useEffect(() => {
    if (editingId && editRef.current) editRef.current.focus()
  }, [editingId])

  // ── Tree mutation helpers ─────────────────────────────────────────────
  function updateRoot(newRoot) {
    setMaps(prev => prev.map(m => m.id === activeMapId ? { ...m, root: newRoot } : m))
  }

  function updateTree(mutator) {
    const root = cloneTree(activeMap.root)
    mutator(root)
    if (layoutMode === 'radial') {
      layoutRadial(root, 0, 0)
    } else {
      layoutTree(root, 0, 0)
    }
    updateRoot(root)
  }

  const addChild = useCallback((parentId) => {
    updateTree(root => {
      const parent = findNode(root, parentId)
      if (parent) {
        parent.collapsed = false
        const child = createNode('New topic', parentId)
        parent.children.push(child)
        setEditingId(child.id)
        setEditText(child.text)
        setSelectedId(child.id)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMap, layoutMode, activeMapId])

  const deleteNode = useCallback((nodeId) => {
    if (!activeMap || nodeId === activeMap.root.id) return
    updateTree(root => {
      const parent = findParent(root, nodeId)
      if (parent) {
        parent.children = parent.children.filter(c => c.id !== nodeId)
      }
    })
    setSelectedId(null)
    setEditingId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMap, layoutMode, activeMapId])

  const toggleCollapse = useCallback((nodeId) => {
    updateTree(root => {
      const node = findNode(root, nodeId)
      if (node) node.collapsed = !node.collapsed
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMap, layoutMode, activeMapId])

  const startEdit = useCallback((nodeId) => {
    const node = findNode(activeMap.root, nodeId)
    if (node) {
      setEditingId(nodeId)
      setEditText(node.text)
      setSelectedId(nodeId)
    }
  }, [activeMap])

  const commitEdit = useCallback(() => {
    if (!editingId) return
    const text = editText.trim()
    if (text) {
      updateTree(root => {
        const node = findNode(root, editingId)
        if (node) node.text = text
      })
    }
    setEditingId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId, editText, activeMap, layoutMode, activeMapId])

  // ── Drag-and-drop: move node to new parent ────────────────────────────
  const moveNode = useCallback((nodeId, newParentId) => {
    if (nodeId === newParentId) return
    if (nodeId === activeMap?.root?.id) return
    updateTree(root => {
      const node = findNode(root, nodeId)
      const newParent = findNode(root, newParentId)
      if (!node || !newParent) return
      // Prevent circular: can't drop onto own descendant
      const ids = new Set()
      collectDescendantIds(node, ids)
      if (ids.has(newParentId)) return
      // Remove from old parent
      const oldParent = findParent(root, nodeId)
      if (oldParent) {
        oldParent.children = oldParent.children.filter(c => c.id !== nodeId)
      }
      // Add to new parent
      newParent.collapsed = false
      newParent.children.push(node)
      node.parentId = newParentId
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMap, layoutMode, activeMapId])

  // Node mousedown handler (child nodes → start drag; root → just select)
  const handleNodeMouseDown = useCallback((nodeId, e) => {
    if (editingId) return
    if (nodeId === activeMap?.root?.id) {
      setSelectedId(nodeId)
      return
    }
    setDragState({ nodeId, startX: e.clientX, startY: e.clientY, isDragging: false })
  }, [activeMap, editingId])

  // Node mouseenter handler (set drop target while dragging)
  const handleNodeMouseEnter = useCallback((nodeId) => {
    if (dragState?.isDragging) {
      setDropTargetId(nodeId)
    }
  }, [dragState?.isDragging])

  // ── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) {
      if (editingId) {
        if (e.key === 'Enter') { e.preventDefault(); commitEdit() }
        if (e.key === 'Escape') { setEditingId(null) }
        return
      }
      if (!selectedId) return
      if (e.key === 'Tab' || e.key === 'Insert') { e.preventDefault(); addChild(selectedId) }
      if (e.key === 'Delete' && selectedId !== activeMap?.root?.id) { e.preventDefault(); deleteNode(selectedId) }
      if (e.key === 'F2' || e.key === 'Enter') { e.preventDefault(); startEdit(selectedId) }
      if (e.key === ' ') { e.preventDefault(); toggleCollapse(selectedId) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedId, editingId, editText, commitEdit, addChild, deleteNode, startEdit, toggleCollapse, activeMap])

  // ── Mouse event handlers (pan + drag) ─────────────────────────────────
  function handleWheel(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const newZoom = Math.min(3, Math.max(0.2, zoom + delta))

      // Adjust scroll position to keep content under cursor stable when zoomed in
      if (containerRef.current && newZoom > 1 && zoom > 1) {
        const ct = containerRef.current
        const rect = ct.getBoundingClientRect()
        const mx = e.clientX - rect.left + ct.scrollLeft
        const my = e.clientY - rect.top + ct.scrollTop
        const scale = newZoom / zoom
        requestAnimationFrame(() => {
          ct.scrollLeft = mx * scale - (e.clientX - rect.left)
          ct.scrollTop = my * scale - (e.clientY - rect.top)
        })
      }

      setZoom(newZoom)
    }
    // else: native scroll handled by overflow:auto
  }

  function handleSvgMouseDown(e) {
    // Only pan on background clicks (not on nodes — those stopPropagation)
    if (e.target === svgRef.current || e.target.tagName === 'svg' || e.target.getAttribute?.('fill')?.startsWith('url(')) {
      setIsPanning(true)
      panStartRef.current = {
        x: e.clientX + (containerRef.current?.scrollLeft || 0),
        y: e.clientY + (containerRef.current?.scrollTop || 0),
      }
    }
  }

  function handleContainerMouseMove(e) {
    // Drag threshold check
    if (dragState && !dragState.isDragging) {
      const dx = e.clientX - dragState.startX
      const dy = e.clientY - dragState.startY
      if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        setDragState(prev => prev ? { ...prev, isDragging: true } : null)
      }
    }

    // Scroll-based pan
    if (isPanning && containerRef.current) {
      containerRef.current.scrollLeft = panStartRef.current.x - e.clientX
      containerRef.current.scrollTop = panStartRef.current.y - e.clientY
    }
  }

  function handleContainerMouseUp() {
    if (dragState) {
      if (dragState.isDragging && dropTargetId && !dragInvalidIds.has(dropTargetId)) {
        moveNode(dragState.nodeId, dropTargetId)
      } else if (!dragState.isDragging) {
        // Was a click, not a drag → select the node
        setSelectedId(dragState.nodeId)
      }
      setDragState(null)
      setDropTargetId(null)
    }
    if (isPanning) {
      setIsPanning(false)
    }
  }

  function handleBgClick(e) {
    if (e.target === svgRef.current || e.target.tagName === 'svg' || e.target.getAttribute?.('fill')?.startsWith('url(')) {
      setSelectedId(null)
      if (editingId) commitEdit()
    }
  }

  function zoomIn() { setZoom(z => Math.min(3, z + 0.2)) }
  function zoomOut() { setZoom(z => Math.max(0.2, z - 0.2)) }
  function zoomFit() {
    setZoom(1)
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
      containerRef.current.scrollTop = 0
    }
  }

  // ── Map management ────────────────────────────────────────────────────
  function addNewMap() {
    const m = createDefaultMap()
    setMaps(prev => [...prev, m])
    setActiveMapId(m.id)
    setSelectedId(m.root.id)
    setEditingId(m.root.id)
    setEditText(m.root.text)
    setZoom(1)
    if (containerRef.current) { containerRef.current.scrollLeft = 0; containerRef.current.scrollTop = 0 }
  }

  function duplicateMap() {
    if (!activeMap) return
    const newRoot = cloneTree(activeMap.root)
    function reId(n) { n.id = uid(); n.children.forEach(reId) }
    reId(newRoot)
    const m = { id: uid(), name: activeMap.name + ' (copy)', root: newRoot, createdAt: new Date().toISOString() }
    setMaps(prev => [...prev, m])
    setActiveMapId(m.id)
  }

  function deleteMap(mapId) {
    if (maps.length <= 1) return
    setMaps(prev => {
      const next = prev.filter(m => m.id !== mapId)
      if (activeMapId === mapId) setActiveMapId(next[0]?.id)
      return next
    })
  }

  function renameMap(mapId) {
    const m = maps.find(m => m.id === mapId)
    if (m) { setRenamingMapId(mapId); setRenameText(m.name) }
  }

  function commitRename() {
    if (!renamingMapId) return
    const text = renameText.trim()
    if (text) setMaps(prev => prev.map(m => m.id === renamingMapId ? { ...m, name: text } : m))
    setRenamingMapId(null)
  }

  function clearMap() {
    const root = createNode('Central Topic', null)
    if (layoutMode === 'radial') layoutRadial(root, 0, 0)
    else layoutTree(root, 0, 0)
    setMaps(prev => prev.map(m => m.id === activeMapId ? { ...m, root } : m))
    setSelectedId(null)
    setEditingId(null)
  }

  // ── Export ────────────────────────────────────────────────────────────
  function downloadSVG() {
    if (!svgRef.current) return
    const clone = svgRef.current.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeMap?.name || 'mindmap'}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  function downloadText() {
    if (!activeMap) return
    const text = toIndentedText(activeMap.root)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeMap.name || 'mindmap'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function downloadMarkdown() {
    if (!activeMap) return
    const text = toMarkdown(activeMap.root)
    const blob = new Blob([text], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeMap.name || 'mindmap'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyOutline() {
    if (!activeMap) return
    navigator.clipboard.writeText(toIndentedText(activeMap.root)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function printMap() {
    if (!svgRef.current) return
    const clone = svgRef.current.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const svgStr = new XMLSerializer().serializeToString(clone)
    const win = window.open('', '_blank')
    if (win) {
      win.document.write(`<!DOCTYPE html><html><head><title>${activeMap?.name || 'Mind Map'}</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh}svg{max-width:100%;max-height:100vh}</style></head><body>${svgStr}</body></html>`)
      win.document.close()
      win.onload = () => { win.print(); win.close() }
    }
  }

  // ── Import from indented text ─────────────────────────────────────────
  function importFromText() {
    const text = window.prompt('Paste indented text (2-space indent per level):')
    if (!text) return
    const lines = text.split('\n').filter(l => l.trim())
    if (lines.length === 0) return

    function getIndent(line) { return line.search(/\S/) }

    const root = createNode(lines[0].trim(), null)
    const stack = [{ node: root, indent: getIndent(lines[0]) }]

    for (let i = 1; i < lines.length; i++) {
      const indent = getIndent(lines[i])
      const newNode = createNode(lines[i].trim(), null)

      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop()
      }
      const parent = stack[stack.length - 1].node
      newNode.parentId = parent.id
      parent.children.push(newNode)
      stack.push({ node: newNode, indent })
    }

    if (layoutMode === 'radial') layoutRadial(root, 0, 0)
    else layoutTree(root, 0, 0)

    const m = { id: uid(), name: root.text, root, createdAt: new Date().toISOString() }
    setMaps(prev => [...prev, m])
    setActiveMapId(m.id)
    setZoom(1)
    if (containerRef.current) { containerRef.current.scrollLeft = 0; containerRef.current.scrollTop = 0 }
  }

  // ── Branch colors for root's children ─────────────────────────────────
  function isDescendant(subtree, id) {
    if (subtree.id === id) return true
    return subtree.children.some(c => isDescendant(c, id))
  }

  // ── Stats ─────────────────────────────────────────────────────────────
  const totalNodes = activeMap ? countNodes(activeMap.root) : 0
  const depth = activeMap ? getDepth(activeMap.root) : 0

  // ── SVG bounds ────────────────────────────────────────────────────────
  function getTreeBounds(node) {
    let minX = node.x - 90, maxX = node.x + 90, minY = node.y - 30, maxY = node.y + 30
    if (!node.collapsed) {
      for (const child of node.children) {
        const cb = getTreeBounds(child)
        minX = Math.min(minX, cb.minX)
        maxX = Math.max(maxX, cb.maxX)
        minY = Math.min(minY, cb.minY)
        maxY = Math.max(maxY, cb.maxY)
      }
    }
    return { minX, maxX, minY, maxY }
  }

  const bounds = activeMap ? getTreeBounds(activeMap.root) : { minX: -200, maxX: 200, minY: -200, maxY: 200 }
  const padding = 100
  const baseVbX = bounds.minX - padding
  const baseVbY = bounds.minY - padding
  const baseVbW = bounds.maxX - bounds.minX + padding * 2
  const baseVbH = bounds.maxY - bounds.minY + padding * 2

  // Zoom >= 1: enlarge SVG so scrollbar appears. Zoom < 1: expand viewBox to show more.
  let actualVb, svgStyle
  if (zoom >= 1) {
    actualVb = `${baseVbX} ${baseVbY} ${baseVbW} ${baseVbH}`
    svgStyle = {
      width: `${zoom * 100}%`,
      height: `${zoom * 100}%`,
      minWidth: `${zoom * 100}%`,
      minHeight: `${zoom * 100}%`,
    }
  } else {
    const factor = 1 / zoom
    const cx = baseVbX + baseVbW / 2
    const cy = baseVbY + baseVbH / 2
    const newW = baseVbW * factor
    const newH = baseVbH * factor
    actualVb = `${cx - newW / 2} ${cy - newH / 2} ${newW} ${newH}`
    svgStyle = { width: '100%', height: '100%' }
  }

  const cursorStyle = dragState?.isDragging ? 'grabbing' : isPanning ? 'grabbing' : 'grab'

  // Drag target check for root node
  const rootCanDrop = dragState?.isDragging && !dragInvalidIds.has(activeMap?.root?.id)
  const rootIsDragTarget = dropTargetId === activeMap?.root?.id && rootCanDrop

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Toolbar row 1: Map management */}
      <div className="panel-card p-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Map selector */}
          <div className="relative">
            <button
              onClick={() => setShowMapList(!showMapList)}
              className="btn-secondary flex items-center gap-1.5 text-sm"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="max-w-[160px] truncate">{activeMap?.name || 'Untitled'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showMapList && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[240px] max-h-64 overflow-y-auto">
                {maps.map(m => (
                  <div
                    key={m.id}
                    className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${m.id === activeMapId ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                  >
                    {renamingMapId === m.id ? (
                      <input
                        value={renameText}
                        onChange={e => setRenameText(e.target.value)}
                        onBlur={commitRename}
                        onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingMapId(null) }}
                        className="input-field text-sm flex-1 py-0.5"
                        autoFocus
                      />
                    ) : (
                      <>
                        <span
                          className="flex-1 truncate"
                          onClick={() => { setActiveMapId(m.id); setShowMapList(false); setSelectedId(null); setZoom(1); if (containerRef.current) { containerRef.current.scrollLeft = 0; containerRef.current.scrollTop = 0 } }}
                        >
                          {m.name}
                        </span>
                        <button onClick={() => renameMap(m.id)} className="text-gray-400 hover:text-blue-500 text-xs" title="Rename">✎</button>
                        {maps.length > 1 && (
                          <button onClick={() => deleteMap(m.id)} className="text-gray-400 hover:text-red-500" title="Delete">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                  <button onClick={() => { addNewMap(); setShowMapList(false) }} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> New mind map
                  </button>
                </div>
              </div>
            )}
          </div>

          <button onClick={addNewMap} className="btn-secondary text-sm flex items-center gap-1" title="New mind map">
            <Plus className="w-4 h-4" /> New
          </button>
          <button onClick={duplicateMap} className="btn-secondary text-sm flex items-center gap-1" title="Duplicate">
            <Copy className="w-4 h-4" /> Duplicate
          </button>
          <button onClick={importFromText} className="btn-secondary text-sm flex items-center gap-1" title="Import from text">
            <FileText className="w-4 h-4" /> Import
          </button>
          <button onClick={clearMap} className="btn-secondary text-sm flex items-center gap-1 text-red-600 dark:text-red-400" title="Clear map">
            <RotateCcw className="w-4 h-4" /> Clear
          </button>

          <div className="flex-1" />

          {/* Stats */}
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            {totalNodes} nodes · depth {depth}
          </span>
        </div>
      </div>

      {/* Toolbar row 2: Actions */}
      <div className="panel-card p-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout toggle */}
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setLayoutMode('tree')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${layoutMode === 'tree' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Tree
            </button>
            <button
              onClick={() => setLayoutMode('radial')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${layoutMode === 'radial' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Radial
            </button>
          </div>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

          {/* Node actions */}
          {selectedId && (
            <>
              <button onClick={() => addChild(selectedId)} className="btn-primary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Child
              </button>
              <button onClick={() => startEdit(selectedId)} className="btn-secondary text-sm flex items-center gap-1">
                ✎ Edit
              </button>
              {selectedId !== activeMap?.root?.id && (
                <button onClick={() => deleteNode(selectedId)} className="btn-secondary text-sm flex items-center gap-1 text-red-600 dark:text-red-400">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              )}
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            </>
          )}

          {/* Zoom */}
          <button onClick={zoomOut} className="btn-secondary p-1.5" title="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} className="btn-secondary p-1.5" title="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={zoomFit} className="btn-secondary p-1.5" title="Fit to view">
            <Maximize2 className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          {/* Export */}
          <button onClick={copyOutline} className="btn-secondary text-sm flex items-center gap-1" title="Copy outline">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={downloadSVG} className="btn-secondary text-sm flex items-center gap-1" title="Download SVG">
            <Download className="w-4 h-4" /> SVG
          </button>
          <button onClick={downloadText} className="btn-secondary text-sm flex items-center gap-1" title="Download text">
            <FileText className="w-4 h-4" /> TXT
          </button>
          <button onClick={downloadMarkdown} className="btn-secondary text-sm flex items-center gap-1" title="Download markdown">
            <FileText className="w-4 h-4" /> MD
          </button>
          <button onClick={printMap} className="btn-secondary text-sm flex items-center gap-1" title="Print">
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      {/* Inline edit overlay */}
      {editingId && (
        <div className="panel-card p-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Edit node:</label>
            <input
              ref={editRef}
              type="text"
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditingId(null) }}
              className="input-field flex-1 text-sm"
              maxLength={100}
              placeholder="Node text…"
            />
            <button onClick={commitEdit} className="btn-primary text-sm">Save</button>
            <button onClick={() => setEditingId(null)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Drag indicator banner */}
      {dragState?.isDragging && (
        <div className="panel-card p-2 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-center">
          <span className="text-xs text-blue-700 dark:text-blue-300">
            Dragging node — drop onto another node to reparent, or release to cancel
          </span>
        </div>
      )}

      {/* SVG canvas */}
      <div
        ref={containerRef}
        className="panel-card relative"
        style={{ height: '65vh', minHeight: 400, overflow: 'auto', cursor: cursorStyle }}
        onWheel={handleWheel}
        onMouseMove={handleContainerMouseMove}
        onMouseUp={handleContainerMouseUp}
        onMouseLeave={handleContainerMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox={actualVb}
          style={svgStyle}
          onMouseDown={handleSvgMouseDown}
          onClick={handleBgClick}
        >
          {/* Grid pattern */}
          <defs>
            <pattern id="mindmap-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x={bounds.minX - 1000} y={bounds.minY - 1000} width={bounds.maxX - bounds.minX + 2000} height={bounds.maxY - bounds.minY + 2000} fill="url(#mindmap-grid)" />

          {/* Root node tree */}
          {activeMap && (
            <g>
              {/* Children branches with colors */}
              {activeMap.root.children.map((child, i) => (
                <MindMapNode
                  key={child.id}
                  node={child}
                  branchColor={BRANCH_COLORS[i % BRANCH_COLORS.length]}
                  isDark={isDark}
                  isRoot={false}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onAdd={addChild}
                  onDelete={deleteNode}
                  onToggleCollapse={toggleCollapse}
                  onStartEdit={startEdit}
                  dragNodeId={dragState?.isDragging ? dragState.nodeId : null}
                  dropTargetId={dropTargetId}
                  dragInvalidIds={dragInvalidIds}
                  onNodeMouseDown={handleNodeMouseDown}
                  onNodeMouseEnter={handleNodeMouseEnter}
                />
              ))}

              {/* Root connector lines */}
              {!activeMap.root.collapsed && activeMap.root.children.map((child, i) => {
                const childColor = isDark ? BRANCH_COLORS[i % BRANCH_COLORS.length].dark : BRANCH_COLORS[i % BRANCH_COLORS.length]
                const startX = activeMap.root.x + 90
                const startY = activeMap.root.y
                const endX = child.x - 5
                const endY = child.y
                const cpx = (startX + endX) / 2
                return (
                  <path
                    key={`root-edge-${child.id}`}
                    d={`M${startX},${startY} C${cpx},${startY} ${cpx},${endY} ${endX},${endY}`}
                    fill="none"
                    stroke={childColor.stroke}
                    strokeWidth={2.5}
                    opacity={0.6}
                  />
                )
              })}

              {/* Root node body */}
              <g
                className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSelectedId(activeMap.root.id) }}
                onDoubleClick={(e) => { e.stopPropagation(); startEdit(activeMap.root.id) }}
                onMouseEnter={() => { if (dragState?.isDragging) setDropTargetId(activeMap.root.id) }}
              >
                <rect
                  x={activeMap.root.x - 90}
                  y={activeMap.root.y - 28}
                  width={180}
                  height={56}
                  rx={28}
                  fill={isDark ? ROOT_COLOR.dark.bg : ROOT_COLOR.bg}
                  stroke={rootIsDragTarget ? '#22c55e' : selectedId === activeMap.root.id ? '#3b82f6' : (isDark ? ROOT_COLOR.dark.stroke : ROOT_COLOR.stroke)}
                  strokeWidth={rootIsDragTarget ? 3 : selectedId === activeMap.root.id ? 2.5 : 2}
                  strokeDasharray={rootIsDragTarget ? '6 3' : 'none'}
                />
                <text
                  x={activeMap.root.x}
                  y={activeMap.root.y + (activeMap.root.text === 'Central Topic' ? -4 : 1)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isDark ? ROOT_COLOR.dark.text : ROOT_COLOR.text}
                  fontSize={15}
                  fontWeight={700}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {activeMap.root.text.length > 18 ? activeMap.root.text.slice(0, 17) + '…' : activeMap.root.text}
                </text>
                {activeMap.root.text === 'Central Topic' && (
                  <text
                    x={activeMap.root.x}
                    y={activeMap.root.y + 12}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isDark ? '#64748b' : '#94a3b8'}
                    fontSize={10}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    double-click to rename
                  </text>
                )}
              </g>

              {/* Root add button */}
              {selectedId === activeMap.root.id && !dragState?.isDragging && (
                <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); addChild(activeMap.root.id) }}>
                  <circle cx={activeMap.root.x + 104} cy={activeMap.root.y} r={12} fill="#3b82f6" />
                  <text x={activeMap.root.x + 104} y={activeMap.root.y + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={18} fontWeight={700}>+</text>
                </g>
              )}

              {/* Root collapse indicator */}
              {activeMap.root.children.length > 0 && (
                <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleCollapse(activeMap.root.id) }}>
                  <circle
                    cx={activeMap.root.x + (selectedId === activeMap.root.id && !dragState?.isDragging ? 128 : 104)}
                    cy={activeMap.root.y}
                    r={10}
                    fill={isDark ? '#374151' : '#e5e7eb'}
                    stroke={isDark ? ROOT_COLOR.dark.stroke : ROOT_COLOR.stroke}
                    strokeWidth={1}
                  />
                  <text
                    x={activeMap.root.x + (selectedId === activeMap.root.id && !dragState?.isDragging ? 128 : 104)}
                    y={activeMap.root.y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isDark ? ROOT_COLOR.dark.text : ROOT_COLOR.text}
                    fontSize={10}
                    fontWeight={700}
                  >
                    {activeMap.root.collapsed ? `+${countNodes(activeMap.root) - 1}` : '−'}
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>

        {/* Keyboard shortcuts hint */}
        <div className="sticky bottom-0 left-0 right-0 px-2 py-1 text-[10px] text-gray-400 dark:text-gray-500 hidden sm:block bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          Tab: add child · F2/Enter: edit · Del: delete · Space: collapse · Ctrl+scroll: zoom · Drag node: reparent · Drag bg: pan
        </div>
      </div>

      {/* Help panel */}
      <div className="panel-card p-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-400">
          <div><strong className="text-gray-700 dark:text-gray-300">Select:</strong> Click a node</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Add child:</strong> Click + or press Tab</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Edit:</strong> Double-click or F2</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Delete:</strong> Select + press Delete</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Collapse:</strong> Click ± badge or Space</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Zoom:</strong> Ctrl + scroll or buttons</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Pan:</strong> Drag background or use scrollbar</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Rearrange:</strong> Drag a node onto another</div>
          <div><strong className="text-gray-700 dark:text-gray-300">Layout:</strong> Toggle Tree / Radial</div>
        </div>
      </div>
    </div>
  )
}
