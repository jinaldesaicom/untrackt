import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { Download, RotateCcw, Copy, Check, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react'

/* ── Diagram types & samples ─────────────────────────────── */

const DIAGRAM_TYPES = {
  sequence: {
    name: 'Sequence',
    sample: `title: User Authentication Flow

Client -> Server: POST /login (credentials)
Server -> Database: Query user record
Database --> Server: User found
Server -> Server: Validate password hash
Server --> Client: 200 OK + JWT token
Client -> Server: GET /profile (Bearer token)
Server -> Cache: Check session
Cache --> Server: Session valid
Server --> Client: User profile JSON`,
  },
  class: {
    name: 'Class',
    sample: `class Animal
  +name: string
  #age: int
  +speak(): void
  +move(distance: int): void

class Dog extends Animal
  +breed: string
  +bark(): void
  +fetch(item: string): void

class Cat extends Animal
  +indoor: boolean
  +purr(): void

interface Serializable
  +toJSON(): string
  +fromJSON(data: string): void`,
  },
  usecase: {
    name: 'Use Case',
    sample: `actor Customer
actor Admin

usecase Browse Products
usecase Add to Cart
usecase Checkout
usecase Make Payment
usecase Manage Inventory
usecase View Reports

Customer -> Browse Products
Customer -> Add to Cart
Customer -> Checkout
Checkout -> Make Payment
Admin -> Manage Inventory
Admin -> View Reports`,
  },
  activity: {
    name: 'Activity',
    sample: `[start]
Receive Order
[if] Check Stock
  [yes] Reserve Items
  [yes] Process Payment
  [yes] [if] Payment OK?
    [yes] Ship Order
    [yes] Send Confirmation
    [no] Notify Failure
  [no] Backorder Items
  [no] Notify Customer
[end]`,
  },
  state: {
    name: 'State',
    sample: `[start] -> Idle

Idle -> Processing: Submit Order
Processing -> Validating: Validate Data
Validating -> Processing: Invalid (retry)
Validating -> Approved: Valid
Approved -> Shipping: Ship Items
Shipping -> Delivered: Confirm Delivery
Delivered -> [end]
Processing -> Cancelled: Cancel Order
Cancelled -> [end]`,
  },
  er: {
    name: 'ER',
    sample: `entity Customer
  *id: int PK
  name: varchar
  email: varchar
  phone: varchar

entity Order
  *id: int PK
  date: datetime
  total: decimal
  status: varchar

entity Product
  *id: int PK
  name: varchar
  price: decimal
  stock: int

Customer 1--* Order
Order *--* Product`,
  },
}

/* ── Themes ───────────────────────────────────────────────── */

const THEMES = {
  indigo: { bg: '#eef2ff', border: '#6366f1', text: '#312e81', line: '#a5b4fc', header: '#6366f1', headerText: '#ffffff', arrow: '#6366f1', accent: '#818cf8', danger: '#ef4444', success: '#22c55e' },
  emerald: { bg: '#ecfdf5', border: '#10b981', text: '#064e3b', line: '#6ee7b7', header: '#10b981', headerText: '#ffffff', arrow: '#10b981', accent: '#34d399', danger: '#ef4444', success: '#22c55e' },
  amber: { bg: '#fffbeb', border: '#f59e0b', text: '#78350f', line: '#fcd34d', header: '#f59e0b', headerText: '#ffffff', arrow: '#f59e0b', accent: '#fbbf24', danger: '#ef4444', success: '#22c55e' },
  rose: { bg: '#fff1f2', border: '#f43f5e', text: '#881337', line: '#fda4af', header: '#f43f5e', headerText: '#ffffff', arrow: '#f43f5e', accent: '#fb7185', danger: '#ef4444', success: '#22c55e' },
  slate: { bg: '#f8fafc', border: '#64748b', text: '#1e293b', line: '#94a3b8', header: '#64748b', headerText: '#ffffff', arrow: '#64748b', accent: '#94a3b8', danger: '#ef4444', success: '#22c55e' },
}

const FONT = "system-ui,sans-serif"
const MONO = "'Menlo','Consolas',monospace"
const trunc = (s, n) => s.length > n ? s.slice(0, n - 1) + '\u2026' : s

/* ── Sequence diagram ─────────────────────────────────────── */

const SEQ = { PW: 130, PH: 38, HGAP: 50, VSTEP: 48, PAD: 30 }

function parseSequence(text) {
  const lines = text.split('\n')
  let title = ''
  const participants = []
  const pSet = new Set()
  const messages = []
  const addP = (name) => { if (!pSet.has(name)) { pSet.add(name); participants.push(name) } }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line || line.startsWith('//')) continue

    const tM = line.match(/^title:\s*(.+)/i)
    if (tM) { title = tM[1]; continue }

    const pM = line.match(/^participant\s+(.+)/i)
    if (pM) { addP(pM[1].trim()); continue }

    const mM = line.match(/^(.+?)\s*(-->>|-->|->>|->)\s*(.+?)(?:\s*:\s*(.*))?$/)
    if (mM) {
      const from = mM[1].trim(), arrow = mM[2], to = mM[3].trim(), label = (mM[4] || '').trim()
      addP(from); addP(to)
      messages.push({ from, to, label, dashed: arrow.includes('--'), open: arrow.includes('>>'), self: from === to })
    }
  }

  return { title, participants, messages }
}

function buildSequenceSVG(data, colors) {
  const { title, participants, messages } = data
  if (!participants.length) return { els: null, w: 0, h: 0 }

  const titleH = title ? 36 : 0
  const topY = SEQ.PAD + titleH
  const msgY0 = topY + SEQ.PH + 24
  const botY = msgY0 + messages.length * SEQ.VSTEP + 10
  const h = botY + SEQ.PH + SEQ.PAD
  const w = SEQ.PAD * 2 + participants.length * SEQ.PW + (participants.length - 1) * SEQ.HGAP
  const px = (i) => SEQ.PAD + i * (SEQ.PW + SEQ.HGAP) + SEQ.PW / 2

  const els = []

  if (title) {
    els.push(<text key="t" x={w / 2} y={SEQ.PAD + 14} textAnchor="middle" fontSize="15" fontWeight="700" fill={colors.text} fontFamily={FONT}>{title}</text>)
  }

  participants.forEach((_, i) => {
    const x = px(i)
    els.push(<line key={`ll${i}`} x1={x} y1={topY + SEQ.PH} x2={x} y2={botY} stroke={colors.line} strokeWidth="1.5" strokeDasharray="6,4" />)
  })

  const renderBox = (i, y, prefix) => {
    const x = px(i) - SEQ.PW / 2
    return (
      <g key={`${prefix}${i}`}>
        <rect x={x} y={y} width={SEQ.PW} height={SEQ.PH} rx="6" fill={colors.header} stroke={colors.border} strokeWidth="1.5" />
        <text x={px(i)} y={y + SEQ.PH / 2} textAnchor="middle" dominantBaseline="central" fill={colors.headerText} fontSize="12" fontWeight="600" fontFamily={FONT}>{trunc(participants[i], 16)}</text>
      </g>
    )
  }

  participants.forEach((_, i) => { els.push(renderBox(i, topY, 'pt')); els.push(renderBox(i, botY, 'pb')) })

  messages.forEach((m, i) => {
    const y = msgY0 + i * SEQ.VSTEP
    const fi = participants.indexOf(m.from)
    const ti = participants.indexOf(m.to)

    if (m.self) {
      const x = px(fi), lw = 36
      els.push(
        <g key={`m${i}`}>
          <path d={`M${x},${y} h${lw} v20 h-${lw}`} fill="none" stroke={colors.arrow} strokeWidth="1.5" strokeDasharray={m.dashed ? '6,3' : 'none'} />
          <polygon points={`${x + 5},${y + 16} ${x},${y + 20} ${x + 5},${y + 24}`} fill={colors.arrow} />
          {m.label && <text x={x + lw + 6} y={y + 12} fontSize="11" fill={colors.text} fontFamily={FONT}>{trunc(m.label, 36)}</text>}
        </g>
      )
    } else {
      const x1 = px(fi), x2 = px(ti), ltr = x2 > x1, tip = ltr ? x2 - 2 : x2 + 2
      const dir = ltr ? -1 : 1
      els.push(
        <g key={`m${i}`}>
          <line x1={x1} y1={y} x2={x2} y2={y} stroke={colors.arrow} strokeWidth="1.5" strokeDasharray={m.dashed ? '6,3' : 'none'} />
          {m.open
            ? <polyline points={`${tip + dir * 8},${y - 5} ${tip},${y} ${tip + dir * 8},${y + 5}`} fill="none" stroke={colors.arrow} strokeWidth="1.5" />
            : <polygon points={`${tip + dir * 8},${y - 5} ${tip},${y} ${tip + dir * 8},${y + 5}`} fill={colors.arrow} />
          }
          {m.label && <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" fontSize="11" fill={colors.text} fontFamily={FONT}>{trunc(m.label, 42)}</text>}
        </g>
      )
    }
  })

  return { els, w, h }
}

/* ── Class diagram ────────────────────────────────────────── */

const CLS = { MIN_W: 180, CHAR_W: 7.2, HDR_H: 34, LINE_H: 20, PAD: 10, GAP_X: 60, GAP_Y: 50 }

function parseClass(text) {
  const lines = text.split('\n')
  const classes = []
  const rels = []
  let cur = null

  for (const raw of lines) {
    const line = raw.trimEnd()
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//')) continue

    const cM = trimmed.match(/^(abstract\s+)?class\s+(\w+)(?:\s+(extends|implements)\s+(\w+))?/i)
    if (cM) {
      cur = { name: cM[2], isAbstract: !!cM[1], isInterface: false, fields: [], methods: [] }
      classes.push(cur)
      if (cM[3] && cM[4]) rels.push({ from: cM[2], to: cM[4], type: cM[3].toLowerCase() })
      continue
    }

    const iM = trimmed.match(/^interface\s+(\w+)/i)
    if (iM) {
      cur = { name: iM[1], isAbstract: false, isInterface: true, fields: [], methods: [] }
      classes.push(cur)
      continue
    }

    if (cur && (line.startsWith('  ') || line.startsWith('\t'))) {
      trimmed.includes('(') ? cur.methods.push(trimmed) : cur.fields.push(trimmed)
    }
  }

  return { classes, rels }
}

function measureClass(c) {
  const all = [c.name + (c.isInterface ? ' \u00ABinterface\u00BB' : ''), ...c.fields, ...c.methods]
  const maxLen = Math.max(...all.map((s) => s.length))
  const w = Math.max(CLS.MIN_W, maxLen * CLS.CHAR_W + CLS.PAD * 2 + 10)
  const fH = Math.max(CLS.PAD, c.fields.length * CLS.LINE_H + CLS.PAD)
  const mH = Math.max(CLS.PAD, c.methods.length * CLS.LINE_H + CLS.PAD)
  return { w, h: CLS.HDR_H + fH + mH, fH, mH }
}

function layoutClasses(classes) {
  const sized = classes.map((c) => ({ ...c, ...measureClass(c) }))
  const pos = {}
  const perRow = Math.max(1, Math.ceil(Math.sqrt(classes.length)))
  let x = CLS.GAP_X, y = CLS.GAP_Y, rowH = 0, col = 0

  for (const c of sized) {
    pos[c.name] = { x, y, w: c.w, h: c.h, fH: c.fH, mH: c.mH }
    rowH = Math.max(rowH, c.h)
    if (++col >= perRow) { col = 0; x = CLS.GAP_X; y += rowH + CLS.GAP_Y; rowH = 0 } else { x += c.w + CLS.GAP_X }
  }

  const all = Object.values(pos)
  if (!all.length) return { pos, w: 0, h: 0 }
  return { pos, w: Math.max(...all.map((p) => p.x + p.w)) + CLS.GAP_X, h: Math.max(...all.map((p) => p.y + p.h)) + CLS.GAP_Y }
}

function connectionPts(a, b) {
  const acx = a.x + a.w / 2, acy = a.y + a.h / 2, bcx = b.x + b.w / 2, bcy = b.y + b.h / 2
  const dx = bcx - acx, dy = bcy - acy
  if (Math.abs(dy) >= Math.abs(dx)) return dy > 0 ? { x1: acx, y1: a.y + a.h, x2: bcx, y2: b.y } : { x1: acx, y1: a.y, x2: bcx, y2: b.y + b.h }
  return dx > 0 ? { x1: a.x + a.w, y1: acy, x2: b.x, y2: bcy } : { x1: a.x, y1: acy, x2: b.x + b.w, y2: bcy }
}

function buildClassSVG(data, colors) {
  const { classes, rels } = data
  if (!classes.length) return { els: null, w: 0, h: 0 }

  const { pos, w, h } = layoutClasses(classes)
  const els = []

  rels.forEach((r, i) => {
    const a = pos[r.from], b = pos[r.to]
    if (!a || !b) return
    const { x1, y1, x2, y2 } = connectionPts(a, b)
    const isDash = r.type === 'implements' || r.type === '..>'
    const isInherit = r.type === 'extends' || r.type === '--|>' || r.type === 'implements' || r.type === '..>'
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const aLen = 12, aW = 7
    els.push(
      <g key={`r${i}`}>
        <path d={`M${x1},${y1} C${x1 + (x2 - x1) * 0.3},${y1} ${x2 - (x2 - x1) * 0.3},${y2} ${x2},${y2}`} fill="none" stroke={colors.line} strokeWidth="1.5" strokeDasharray={isDash ? '6,3' : 'none'} />
        <polygon points={`${x2},${y2} ${x2 - aLen * Math.cos(angle) + aW * Math.sin(angle)},${y2 - aLen * Math.sin(angle) - aW * Math.cos(angle)} ${x2 - aLen * Math.cos(angle) - aW * Math.sin(angle)},${y2 - aLen * Math.sin(angle) + aW * Math.cos(angle)}`} fill={isInherit ? 'white' : colors.arrow} stroke={colors.arrow} strokeWidth="1.5" />
      </g>
    )
  })

  for (const c of classes) {
    const p = pos[c.name]
    if (!p) continue
    els.push(
      <g key={`c-${c.name}`}>
        <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
        <rect x={p.x} y={p.y} width={p.w} height={CLS.HDR_H} rx="6" fill={colors.header} />
        <rect x={p.x} y={p.y + CLS.HDR_H - 6} width={p.w} height={6} fill={colors.header} />
        {(c.isInterface || c.isAbstract) && (
          <text x={p.x + p.w / 2} y={p.y + 11} textAnchor="middle" fontSize="9" fill={colors.headerText} fontFamily={FONT} fontStyle="italic">{c.isInterface ? '\u00ABinterface\u00BB' : '\u00ABabstract\u00BB'}</text>
        )}
        <text x={p.x + p.w / 2} y={p.y + CLS.HDR_H / 2 + ((c.isInterface || c.isAbstract) ? 4 : 0)} textAnchor="middle" dominantBaseline="central" fill={colors.headerText} fontSize="13" fontWeight="600" fontFamily={FONT} fontStyle={c.isAbstract ? 'italic' : 'normal'}>{c.name}</text>
        {c.fields.map((f, j) => <text key={`f${j}`} x={p.x + CLS.PAD} y={p.y + CLS.HDR_H + CLS.PAD / 2 + (j + 1) * CLS.LINE_H - 5} fontSize="11" fill={colors.text} fontFamily={MONO}>{trunc(f, 26)}</text>)}
        <line x1={p.x} y1={p.y + CLS.HDR_H + p.fH} x2={p.x + p.w} y2={p.y + CLS.HDR_H + p.fH} stroke={colors.border} strokeWidth="1" opacity="0.3" />
        {c.methods.map((m, j) => <text key={`m${j}`} x={p.x + CLS.PAD} y={p.y + CLS.HDR_H + p.fH + CLS.PAD / 2 + (j + 1) * CLS.LINE_H - 5} fontSize="11" fill={colors.text} fontFamily={MONO}>{trunc(m, 26)}</text>)}
      </g>
    )
  }

  return { els, w, h }
}

/* ── Use Case diagram ─────────────────────────────────────── */

const UC = { AW: 30, AH: 60, UCW: 140, UCH: 44, PAD: 40, AGAP: 100, UCGAP_X: 50, UCGAP_Y: 16 }

function parseUseCase(text) {
  const actors = [], usecases = [], links = [], aSet = new Set(), uSet = new Set()
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('//')) continue
    const aM = line.match(/^actor\s+(.+)/i)
    if (aM) { const n = aM[1].trim(); if (!aSet.has(n)) { aSet.add(n); actors.push(n) }; continue }
    const uM = line.match(/^usecase\s+(.+)/i)
    if (uM) { const n = uM[1].trim(); if (!uSet.has(n)) { uSet.add(n); usecases.push(n) }; continue }
    const lM = line.match(/^(.+?)\s*->\s*(.+)$/)
    if (lM) {
      const from = lM[1].trim(), to = lM[2].trim()
      if (!aSet.has(from)) { aSet.add(from); actors.push(from) }
      if (!uSet.has(to)) { uSet.add(to); usecases.push(to) }
      links.push({ from, to })
    }
  }
  return { actors, usecases, links }
}

function buildUseCaseSVG(data, colors) {
  const { actors, usecases, links } = data
  if (!actors.length && !usecases.length) return { els: null, w: 0, h: 0 }

  const ucRows = usecases.length || 1
  const actRows = actors.length || 1
  const totalRows = Math.max(ucRows, actRows)

  const actorX = UC.PAD + UC.AW / 2
  const ucStartX = UC.PAD + UC.AW + UC.AGAP
  const totalH = UC.PAD * 2 + totalRows * (UC.UCH + UC.UCGAP_Y) - UC.UCGAP_Y
  const w = ucStartX + UC.UCW + UC.PAD
  const h = Math.max(totalH, 200)

  const aPos = {}, uPos = {}
  const actSpacing = actors.length > 1 ? (h - UC.PAD * 2 - UC.AH) / (actors.length - 1) : 0
  actors.forEach((a, i) => { aPos[a] = { x: actorX, y: UC.PAD + (actors.length > 1 ? i * actSpacing : (h - UC.AH) / 2 - UC.PAD) + UC.AH / 2 } })
  const ucSpacing = usecases.length > 1 ? (h - UC.PAD * 2 - UC.UCH) / (usecases.length - 1) : 0
  usecases.forEach((u, i) => { uPos[u] = { x: ucStartX + UC.UCW / 2, y: UC.PAD + (usecases.length > 1 ? i * ucSpacing : (h - UC.UCH) / 2 - UC.PAD) } })

  const els = []

  // System boundary box
  if (usecases.length) {
    const minY = Math.min(...usecases.map((u) => uPos[u].y)) - 16
    const maxY = Math.max(...usecases.map((u) => uPos[u].y + UC.UCH)) + 16
    els.push(
      <g key="sys">
        <rect x={ucStartX - 24} y={minY} width={UC.UCW + 48} height={maxY - minY} rx="12" fill="none" stroke={colors.border} strokeWidth="1.5" strokeDasharray="8,4" />
        <text x={ucStartX + UC.UCW / 2} y={minY + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={colors.border} fontFamily={FONT}>System</text>
      </g>
    )
  }

  // Links
  links.forEach((l, i) => {
    const a = aPos[l.from], u = uPos[l.to]
    if (!a || !u) return
    els.push(<line key={`l${i}`} x1={a.x + UC.AW / 2 + 4} y1={a.y} x2={u.x - UC.UCW / 2} y2={u.y + UC.UCH / 2} stroke={colors.line} strokeWidth="1.5" />)
  })

  // Actors (stick figures)
  actors.forEach((a, i) => {
    const p = aPos[a]
    if (!p) return
    const cx = p.x, headY = p.y - 18, headR = 8
    els.push(
      <g key={`a${i}`}>
        <circle cx={cx} cy={headY} r={headR} fill="none" stroke={colors.header} strokeWidth="2" />
        <line x1={cx} y1={headY + headR} x2={cx} y2={p.y + 6} stroke={colors.header} strokeWidth="2" />
        <line x1={cx - 12} y1={p.y - 6} x2={cx + 12} y2={p.y - 6} stroke={colors.header} strokeWidth="2" />
        <line x1={cx} y1={p.y + 6} x2={cx - 10} y2={p.y + 20} stroke={colors.header} strokeWidth="2" />
        <line x1={cx} y1={p.y + 6} x2={cx + 10} y2={p.y + 20} stroke={colors.header} strokeWidth="2" />
        <text x={cx} y={p.y + 34} textAnchor="middle" fontSize="11" fontWeight="600" fill={colors.text} fontFamily={FONT}>{trunc(a, 14)}</text>
      </g>
    )
  })

  // Use case ellipses
  usecases.forEach((u, i) => {
    const p = uPos[u]
    if (!p) return
    const cx = p.x, cy = p.y + UC.UCH / 2
    els.push(
      <g key={`u${i}`}>
        <ellipse cx={cx} cy={cy} rx={UC.UCW / 2} ry={UC.UCH / 2} fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="500" fill={colors.text} fontFamily={FONT}>{trunc(u, 20)}</text>
      </g>
    )
  })

  return { els, w, h }
}

/* ── Activity diagram ─────────────────────────────────────── */

const ACT = { NW: 160, NH: 36, VGAP: 20, HGAP: 40, PAD: 40, CR: 10 }

function parseActivity(text) {
  const nodes = [], edges = []
  const lines = text.split('\n')
  const stack = []

  let id = 0
  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//')) continue
    const indent = raw.search(/\S/)
    const depth = indent === 0 ? 0 : Math.floor(indent / 2)

    let type = 'action', label = trimmed
    if (trimmed === '[start]') { type = 'start'; label = '' }
    else if (trimmed === '[end]') { type = 'end'; label = '' }
    else if (trimmed.startsWith('[if]')) { type = 'decision'; label = trimmed.replace('[if]', '').trim() }
    else if (trimmed.startsWith('[yes]')) { type = 'action'; label = trimmed.replace('[yes]', '').trim(); if (label.startsWith('[if]')) { type = 'decision'; label = label.replace('[if]', '').trim() } }
    else if (trimmed.startsWith('[no]')) { type = 'action'; label = trimmed.replace('[no]', '').trim(); if (label.startsWith('[if]')) { type = 'decision'; label = label.replace('[if]', '').trim() } }

    const node = { id: id++, type, label, depth, branch: trimmed.startsWith('[yes]') ? 'yes' : trimmed.startsWith('[no]') ? 'no' : null }
    nodes.push(node)

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) stack.pop()
    if (stack.length > 0) {
      const edgeLabel = node.branch === 'yes' ? 'Yes' : node.branch === 'no' ? 'No' : ''
      edges.push({ from: stack[stack.length - 1].id, to: node.id, label: edgeLabel })
    }
    stack.push(node)
  }

  return { nodes, edges }
}

function layoutActivity(nodes, edges) {
  if (!nodes.length) return { positions: {}, w: 0, h: 0 }

  const children = {}
  const hasParent = new Set()
  for (const e of edges) { if (!children[e.from]) children[e.from] = []; children[e.from].push(e.to); hasParent.add(e.to) }

  const roots = nodes.filter((n) => !hasParent.has(n.id)).map((n) => n.id)
  if (!roots.length && nodes.length) roots.push(0)

  const subtreeW = {}
  function calcW(id) {
    const kids = children[id] || []
    if (!kids.length) { subtreeW[id] = ACT.NW; return ACT.NW }
    let t = 0
    for (const k of kids) t += calcW(k)
    t += (kids.length - 1) * ACT.HGAP
    subtreeW[id] = Math.max(ACT.NW, t)
    return subtreeW[id]
  }
  let totalRootW = 0
  for (const r of roots) totalRootW += calcW(r)
  totalRootW += (roots.length - 1) * ACT.HGAP

  const positions = {}
  let maxY = 0
  function place(id, x, y) {
    const kids = children[id] || []
    positions[id] = { x, y }
    maxY = Math.max(maxY, y)
    if (!kids.length) return
    let totalKW = 0
    for (const k of kids) totalKW += subtreeW[k]
    totalKW += (kids.length - 1) * ACT.HGAP
    let sx = x + ACT.NW / 2 - totalKW / 2
    for (const k of kids) {
      const kw = subtreeW[k]
      place(k, sx + kw / 2 - ACT.NW / 2, y + ACT.NH + ACT.VGAP)
      sx += kw + ACT.HGAP
    }
  }
  let sx = ACT.PAD
  for (const r of roots) { const rw = subtreeW[r]; place(r, sx + rw / 2 - ACT.NW / 2, ACT.PAD); sx += rw + ACT.HGAP }

  let minX = Infinity
  for (const p of Object.values(positions)) minX = Math.min(minX, p.x)
  for (const p of Object.values(positions)) p.x -= minX - ACT.PAD

  const maxX = Math.max(...Object.values(positions).map((p) => p.x)) + ACT.NW + ACT.PAD
  return { positions, w: maxX, h: maxY + ACT.NH + ACT.PAD * 2 }
}

function buildActivitySVG(data, colors) {
  const { nodes, edges } = data
  if (!nodes.length) return { els: null, w: 0, h: 0 }

  const { positions, w, h } = layoutActivity(nodes, edges)
  const els = []

  // Edges
  edges.forEach((e, i) => {
    const f = positions[e.from], t = positions[e.to]
    if (!f || !t) return
    const x1 = f.x + ACT.NW / 2, y1 = f.y + ACT.NH, x2 = t.x + ACT.NW / 2, y2 = t.y
    const midY = (y1 + y2) / 2
    els.push(
      <g key={`ae${i}`}>
        <path d={`M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`} fill="none" stroke={colors.line} strokeWidth="1.5" />
        <polygon points={`${x2 - 4},${y2 - 6} ${x2 + 4},${y2 - 6} ${x2},${y2}`} fill={colors.arrow} />
        {e.label && <text x={(x1 + x2) / 2 + (x2 > x1 ? 8 : -8)} y={midY - 2} textAnchor="middle" fontSize="10" fontWeight="600" fill={e.label === 'Yes' ? colors.success : colors.danger} fontFamily={FONT}>{e.label}</text>}
      </g>
    )
  })

  // Nodes
  nodes.forEach((n) => {
    const p = positions[n.id]
    if (!p) return
    const cx = p.x + ACT.NW / 2, cy = p.y + ACT.NH / 2

    if (n.type === 'start') {
      els.push(<circle key={`an${n.id}`} cx={cx} cy={cy} r={12} fill={colors.header} />)
    } else if (n.type === 'end') {
      els.push(
        <g key={`an${n.id}`}>
          <circle cx={cx} cy={cy} r={14} fill="none" stroke={colors.header} strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r={8} fill={colors.header} />
        </g>
      )
    } else if (n.type === 'decision') {
      const s = ACT.NH / 2 + 4
      els.push(
        <g key={`an${n.id}`}>
          <polygon points={`${cx},${cy - s} ${cx + s + 10},${cy} ${cx},${cy + s} ${cx - s - 10},${cy}`} fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="500" fill={colors.text} fontFamily={FONT}>{trunc(n.label || '?', 16)}</text>
        </g>
      )
    } else {
      els.push(
        <g key={`an${n.id}`}>
          <rect x={p.x} y={p.y} width={ACT.NW} height={ACT.NH} rx={ACT.CR} fill={n.depth === 0 && n.type === 'action' ? colors.header : colors.bg} stroke={colors.border} strokeWidth="1.5" />
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill={n.depth === 0 && n.type === 'action' ? colors.headerText : colors.text} fontFamily={FONT}>{trunc(n.label, 20)}</text>
        </g>
      )
    }
  })

  return { els, w, h }
}

/* ── State diagram ────────────────────────────────────────── */

const ST = { NW: 140, NH: 40, PAD: 40, HGAP: 60, VGAP: 60 }

function parseState(text) {
  const states = [], transitions = [], sSet = new Set()
  const addS = (n) => { if (n !== '[start]' && n !== '[end]' && !sSet.has(n)) { sSet.add(n); states.push(n) } }

  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('//')) continue
    const tM = line.match(/^(.+?)\s*->\s*(.+?)(?:\s*:\s*(.*))?$/)
    if (tM) {
      const from = tM[1].trim(), to = tM[2].trim(), label = (tM[3] || '').trim()
      addS(from); addS(to)
      transitions.push({ from, to, label })
    }
  }

  return { states, transitions, hasStart: transitions.some((t) => t.from === '[start]'), hasEnd: transitions.some((t) => t.to === '[end]') }
}

function buildStateSVG(data, colors) {
  const { states, transitions, hasStart, hasEnd } = data
  if (!states.length) return { els: null, w: 0, h: 0 }

  // Layout in a grid
  const totalItems = (hasStart ? 1 : 0) + states.length + (hasEnd ? 1 : 0)
  const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(totalItems))))
  const positions = {}
  let col = 0, row = 0

  if (hasStart) { positions['[start]'] = { x: ST.PAD + col * (ST.NW + ST.HGAP), y: ST.PAD + row * (ST.NH + ST.VGAP), w: 24, h: 24, isCircle: true }; col++ }
  for (const s of states) {
    if (col >= cols) { col = 0; row++ }
    positions[s] = { x: ST.PAD + col * (ST.NW + ST.HGAP), y: ST.PAD + row * (ST.NH + ST.VGAP), w: ST.NW, h: ST.NH }
    col++
  }
  if (hasEnd) { if (col >= cols) { col = 0; row++ }; positions['[end]'] = { x: ST.PAD + col * (ST.NW + ST.HGAP), y: ST.PAD + row * (ST.NH + ST.VGAP), w: 28, h: 28, isCircle: true } }

  const allPos = Object.values(positions)
  const w = Math.max(...allPos.map((p) => p.x + (p.w || ST.NW))) + ST.PAD
  const h = Math.max(...allPos.map((p) => p.y + (p.h || ST.NH))) + ST.PAD * 2
  const els = []

  // Transitions
  transitions.forEach((t, i) => {
    const a = positions[t.from], b = positions[t.to]
    if (!a || !b) return
    const ax = a.x + a.w / 2, ay = a.y + a.h / 2, bx = b.x + b.w / 2, by = b.y + b.h / 2
    // Find edge point
    const angle = Math.atan2(by - ay, bx - ax)
    const x2 = b.isCircle ? bx - Math.cos(angle) * (b.w / 2 + 2) : bx - Math.cos(angle) * Math.min(b.w / 2, Math.abs(b.w / 2 / Math.cos(angle) || 999))
    const y2 = b.isCircle ? by - Math.sin(angle) * (b.h / 2 + 2) : by - Math.sin(angle) * Math.min(b.h / 2, Math.abs(b.h / 2 / Math.sin(angle) || 999))
    const x1 = a.isCircle ? ax + Math.cos(angle) * (a.w / 2 + 2) : ax + Math.cos(angle) * Math.min(a.w / 2, Math.abs(a.w / 2 / Math.cos(angle) || 999))
    const y1 = a.isCircle ? ay + Math.sin(angle) * (a.h / 2 + 2) : ay + Math.sin(angle) * Math.min(a.h / 2, Math.abs(a.h / 2 / Math.sin(angle) || 999))

    els.push(
      <g key={`st${i}`}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.line} strokeWidth="1.5" />
        <polygon points={`${x2},${y2} ${x2 - 8 * Math.cos(angle) + 4 * Math.sin(angle)},${y2 - 8 * Math.sin(angle) - 4 * Math.cos(angle)} ${x2 - 8 * Math.cos(angle) - 4 * Math.sin(angle)},${y2 - 8 * Math.sin(angle) + 4 * Math.cos(angle)}`} fill={colors.arrow} />
        {t.label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" fontSize="10" fill={colors.text} fontFamily={FONT}>{trunc(t.label, 24)}</text>}
      </g>
    )
  })

  // States
  for (const [name, p] of Object.entries(positions)) {
    if (name === '[start]') {
      els.push(<circle key="ss" cx={p.x + p.w / 2} cy={p.y + p.h / 2} r={12} fill={colors.header} />)
    } else if (name === '[end]') {
      els.push(
        <g key="se">
          <circle cx={p.x + p.w / 2} cy={p.y + p.h / 2} r={14} fill="none" stroke={colors.header} strokeWidth="2.5" />
          <circle cx={p.x + p.w / 2} cy={p.y + p.h / 2} r={8} fill={colors.header} />
        </g>
      )
    } else {
      els.push(
        <g key={`s-${name}`}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={20} fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
          <text x={p.x + p.w / 2} y={p.y + p.h / 2} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="500" fill={colors.text} fontFamily={FONT}>{trunc(name, 18)}</text>
        </g>
      )
    }
  }

  return { els, w, h }
}

/* ── ER diagram ───────────────────────────────────────────── */

const ER = { MIN_W: 160, CHAR_W: 7.2, HDR_H: 34, LINE_H: 20, PAD: 10, GAP_X: 80, GAP_Y: 50 }

function parseER(text) {
  const entities = [], rels = []
  let cur = null

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd(), trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//')) continue

    const eM = trimmed.match(/^entity\s+(\w+)/i)
    if (eM) { cur = { name: eM[1], fields: [] }; entities.push(cur); continue }

    if (cur && (line.startsWith('  ') || line.startsWith('\t'))) {
      const isPK = trimmed.startsWith('*')
      const fieldText = isPK ? trimmed.slice(1).trim() : trimmed
      const hasPK = /\bPK\b/i.test(fieldText)
      const hasFK = /\bFK\b/i.test(fieldText)
      const cleanText = fieldText.replace(/\s*(PK|FK)\s*/gi, '').trim()
      cur.fields.push({ text: cleanText, isPK: isPK || hasPK, isFK: hasFK })
      continue
    }

    const rM = trimmed.match(/^(\w+)\s+(1--1|1--\*|\*--1|\*--\*)\s+(\w+)/i)
    if (rM) {
      rels.push({ from: rM[1], to: rM[3], card: rM[2] })
      cur = null
      continue
    }
  }

  return { entities, rels }
}

function buildERSVG(data, colors) {
  const { entities, rels } = data
  if (!entities.length) return { els: null, w: 0, h: 0 }

  // Measure & layout
  const sized = entities.map((e) => {
    const maxLen = Math.max(e.name.length + 2, ...e.fields.map((f) => f.text.length + 4))
    const w = Math.max(ER.MIN_W, maxLen * ER.CHAR_W + ER.PAD * 2 + 10)
    const h = ER.HDR_H + Math.max(ER.PAD, e.fields.length * ER.LINE_H + ER.PAD)
    return { ...e, w, h }
  })

  const pos = {}
  const perRow = Math.max(1, Math.ceil(Math.sqrt(entities.length)))
  let x = ER.GAP_X, y = ER.GAP_Y, rowH = 0, col = 0
  for (const e of sized) {
    pos[e.name] = { x, y, w: e.w, h: e.h }
    rowH = Math.max(rowH, e.h)
    if (++col >= perRow) { col = 0; x = ER.GAP_X; y += rowH + ER.GAP_Y; rowH = 0 } else { x += e.w + ER.GAP_X }
  }

  const allP = Object.values(pos)
  const w = Math.max(...allP.map((p) => p.x + p.w)) + ER.GAP_X
  const h = Math.max(...allP.map((p) => p.y + p.h)) + ER.GAP_Y

  const els = []

  // Relationships
  rels.forEach((r, i) => {
    const a = pos[r.from], b = pos[r.to]
    if (!a || !b) return
    const { x1, y1, x2, y2 } = connectionPts(a, b)
    const parts = r.card.split('--')
    els.push(
      <g key={`er${i}`}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.line} strokeWidth="1.5" />
        <text x={x1 + (x2 > x1 ? 12 : -12)} y={y1 - 6} textAnchor={x2 > x1 ? 'start' : 'end'} fontSize="11" fontWeight="700" fill={colors.arrow} fontFamily={FONT}>{parts[0] === '*' ? '*' : '1'}</text>
        <text x={x2 + (x2 > x1 ? -12 : 12)} y={y2 - 6} textAnchor={x2 > x1 ? 'end' : 'start'} fontSize="11" fontWeight="700" fill={colors.arrow} fontFamily={FONT}>{parts[1] === '*' ? '*' : '1'}</text>
      </g>
    )
  })

  // Entity boxes
  for (const e of sized) {
    const p = pos[e.name]
    if (!p) continue
    els.push(
      <g key={`e-${e.name}`}>
        <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
        <rect x={p.x} y={p.y} width={p.w} height={ER.HDR_H} rx="6" fill={colors.header} />
        <rect x={p.x} y={p.y + ER.HDR_H - 6} width={p.w} height={6} fill={colors.header} />
        <text x={p.x + p.w / 2} y={p.y + ER.HDR_H / 2} textAnchor="middle" dominantBaseline="central" fill={colors.headerText} fontSize="13" fontWeight="600" fontFamily={FONT}>{e.name}</text>
        {e.fields.map((f, j) => (
          <g key={`ef${j}`}>
            {f.isPK && <text x={p.x + ER.PAD - 2} y={p.y + ER.HDR_H + ER.PAD / 2 + (j + 1) * ER.LINE_H - 5} fontSize="10" fill={colors.arrow} fontFamily={MONO} fontWeight="700">{'\uD83D\uDD11'}</text>}
            <text x={p.x + ER.PAD + (f.isPK ? 16 : 0)} y={p.y + ER.HDR_H + ER.PAD / 2 + (j + 1) * ER.LINE_H - 5} fontSize="11" fill={colors.text} fontFamily={MONO} textDecoration={f.isPK ? 'underline' : 'none'}>{trunc(f.text, 22)}</text>
            {f.isFK && <text x={p.x + p.w - ER.PAD} y={p.y + ER.HDR_H + ER.PAD / 2 + (j + 1) * ER.LINE_H - 5} textAnchor="end" fontSize="9" fill={colors.accent} fontFamily={FONT} fontWeight="600">FK</text>}
          </g>
        ))}
      </g>
    )
  }

  return { els, w, h }
}

/* ── Dispatcher: parse + build by type ────────────────────── */

function parseDiagram(type, text) {
  switch (type) {
    case 'sequence': return parseSequence(text)
    case 'class': return parseClass(text)
    case 'usecase': return parseUseCase(text)
    case 'activity': return parseActivity(text)
    case 'state': return parseState(text)
    case 'er': return parseER(text)
    default: return {}
  }
}

function buildDiagram(type, parsed, colors) {
  switch (type) {
    case 'sequence': return buildSequenceSVG(parsed, colors)
    case 'class': return buildClassSVG(parsed, colors)
    case 'usecase': return buildUseCaseSVG(parsed, colors)
    case 'activity': return buildActivitySVG(parsed, colors)
    case 'state': return buildStateSVG(parsed, colors)
    case 'er': return buildERSVG(parsed, colors)
    default: return { els: null, w: 0, h: 0 }
  }
}

function diagramStats(type, parsed) {
  switch (type) {
    case 'sequence': return `${parsed.participants?.length || 0} participants \u00B7 ${parsed.messages?.length || 0} messages`
    case 'class': return `${parsed.classes?.length || 0} classes \u00B7 ${parsed.rels?.length || 0} relationships`
    case 'usecase': return `${parsed.actors?.length || 0} actors \u00B7 ${parsed.usecases?.length || 0} use cases`
    case 'activity': return `${parsed.nodes?.length || 0} nodes \u00B7 ${parsed.edges?.length || 0} connections`
    case 'state': return `${parsed.states?.length || 0} states \u00B7 ${parsed.transitions?.length || 0} transitions`
    case 'er': return `${parsed.entities?.length || 0} entities \u00B7 ${parsed.rels?.length || 0} relationships`
    default: return ''
  }
}

/* ── Main component ───────────────────────────────────────── */

export default function TextToUML() {
  const [type, setType] = useState('sequence')
  const [text, setText] = useState(DIAGRAM_TYPES.sequence.sample)
  const [theme, setTheme] = useState('indigo')
  const [zoom, setZoom] = useState(1)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [containerSize, setContainerSize] = useState({ w: 600, h: 400 })
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const fsContainerRef = useRef(null)
  const colors = THEMES[theme]

  const parsed = useMemo(() => parseDiagram(type, text), [text, type])
  const { els, w: svgW, h: svgH } = useMemo(() => buildDiagram(type, parsed, colors), [parsed, colors, type])

  /* Auto-fit via ResizeObserver */
  useEffect(() => {
    const el = isFullscreen ? fsContainerRef.current : containerRef.current
    if (!el) return
    const update = () => {
      const { width: w, height: h } = el.getBoundingClientRect()
      if (w > 0 && h > 0) setContainerSize({ w, h })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isFullscreen])

  const fitZoom = useMemo(() => {
    if (!svgW || !svgH) return 1
    return Math.min((containerSize.w - 16) / svgW, (containerSize.h - 16) / svgH, 1.5)
  }, [svgW, svgH, containerSize])

  useEffect(() => { setZoom(fitZoom) }, [fitZoom])

  useEffect(() => {
    if (!isFullscreen) return
    const fn = (e) => { if (e.key === 'Escape') setIsFullscreen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isFullscreen])

  const handleZoomIn = () => setZoom((z) => Math.min(3, z + 0.15))
  const handleZoomOut = () => setZoom((z) => Math.max(0.1, z - 0.15))
  const handleZoomFit = () => setZoom(fitZoom)

  const switchType = (t) => {
    setType(t)
    setText(DIAGRAM_TYPES[t].sample)
    setZoom(1)
  }

  const cloneSVG = useCallback(() => {
    if (!svgRef.current) return null
    const c = svgRef.current.cloneNode(true)
    c.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    c.setAttribute('width', svgW)
    c.setAttribute('height', svgH)
    return c
  }, [svgW, svgH])

  const handleDownloadSVG = useCallback(() => {
    const c = cloneSVG()
    if (!c) return
    const url = URL.createObjectURL(new Blob([c.outerHTML], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url; a.download = `uml-${type}.svg`; a.click()
    URL.revokeObjectURL(url)
  }, [cloneSVG, type])

  const handleDownloadPNG = useCallback(() => {
    const c = cloneSVG()
    if (!c) return
    const data = new XMLSerializer().serializeToString(c)
    const img = new Image()
    const s = 2
    img.onload = () => {
      const cv = document.createElement('canvas')
      cv.width = svgW * s; cv.height = svgH * s
      const ctx = cv.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, cv.width, cv.height)
      ctx.drawImage(img, 0, 0, cv.width, cv.height)
      const a = document.createElement('a')
      a.href = cv.toDataURL('image/png'); a.download = `uml-${type}.png`; a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)))
  }, [cloneSVG, svgW, svgH, type])

  const handleCopy = useCallback(() => {
    const c = cloneSVG()
    if (!c) return
    navigator.clipboard.writeText(c.outerHTML).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [cloneSVG])

  const handleReset = () => { setText(DIAGRAM_TYPES[type].sample); setZoom(fitZoom) }

  const svgContent = (
    <>
      <rect width={svgW} height={svgH} fill="white" />
      {els}
    </>
  )

  const placeholder = DIAGRAM_TYPES[type]?.sample || ''

  return (
    <div className="space-y-4">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Diagram type */}
        <div className="flex items-center gap-1">
          {Object.entries(DIAGRAM_TYPES).map(([key, d]) => (
            <button
              key={key}
              onClick={() => switchType(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${type === key ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {d.name}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

        {/* Theme */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Theme</span>
          {Object.entries(THEMES).map(([key, c]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${theme === key ? 'scale-125 border-gray-900 dark:border-white' : 'border-transparent'}`}
              style={{ backgroundColor: c.border }}
              aria-label={`${key} theme`}
            />
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <button onClick={handleZoomOut} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom out"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom in"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={handleZoomFit} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Fit"><Maximize2 className="w-3.5 h-3.5" /></button>
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <button onClick={handleReset} className="btn-secondary text-xs flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" />Reset</button>
        <button onClick={handleCopy} className="btn-secondary text-xs flex items-center gap-1">
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy SVG'}
        </button>
        <button onClick={handleDownloadSVG} className="btn-secondary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />SVG</button>
        <button onClick={handleDownloadPNG} className="btn-primary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />PNG</button>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ minHeight: 480 }}>
        {/* Editor */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{DIAGRAM_TYPES[type].name} Diagram Input</h3>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {diagramStats(type, parsed)}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea-field flex-1 font-mono text-sm leading-relaxed resize-none"
            style={{ minHeight: 400, tabSize: 2 }}
            placeholder={placeholder}
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">UML Preview</h3>
            <button onClick={() => setIsFullscreen(true)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400" aria-label="Fullscreen" title="Fullscreen"><Maximize2 className="w-4 h-4" /></button>
          </div>
          <div
            ref={containerRef}
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-auto"
            style={{ minHeight: 400 }}
          >
            {!els ? (
              <div className="flex items-center justify-center h-full text-sm text-gray-400 dark:text-gray-500">Type text on the left to generate a UML diagram</div>
            ) : (
              <div style={{ display: 'inline-block', minWidth: '100%', textAlign: 'center' }}>
                <svg ref={svgRef} viewBox={`0 0 ${svgW} ${svgH}`} width={svgW * zoom} height={svgH * zoom} style={{ display: 'inline-block' }}>
                  {svgContent}
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-auto">UML Preview &mdash; {DIAGRAM_TYPES[type].name}</span>
            <button onClick={handleZoomOut} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom out"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom in"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={handleZoomFit} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Fit"><Maximize2 className="w-3.5 h-3.5" /></button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <button onClick={handleDownloadSVG} className="btn-secondary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />SVG</button>
            <button onClick={handleDownloadPNG} className="btn-primary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />PNG</button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <button onClick={() => setIsFullscreen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button>
          </div>
          <div ref={fsContainerRef} className="flex-1 overflow-auto p-4">
            {els && (
              <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW * zoom} height={svgH * zoom} style={{ display: 'block', margin: '0 auto' }}>
                {svgContent}
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Syntax guide */}
      <details className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <summary className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none">Syntax Guide</summary>
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
          {type === 'sequence' && (
            <>
              <p><strong>Sequence Diagram</strong> &mdash; model interactions between participants over time.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`title: My Flow\n\nAlice -> Bob: Request\nBob --> Alice: Response\nAlice ->> Bob: Async call\nBob -->> Alice: Async reply\nAlice -> Alice: Self note`}</div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
                  <p>&bull; <strong>{'->'}</strong> solid arrow (synchronous call)</p>
                  <p>&bull; <strong>{'-->'}</strong> dashed arrow (return / response)</p>
                  <p>&bull; <strong>{'->>'}  </strong> open arrow (async call)</p>
                  <p>&bull; <strong>{'-->>'}  </strong> dashed open arrow (async reply)</p>
                  <p>&bull; <strong>{'A -> A'}</strong> self-message loop</p>
                  <p>&bull; <strong>title:</strong> optional diagram title</p>
                  <p>&bull; <strong>participant</strong> declare participant order</p>
                </div>
              </div>
            </>
          )}
          {type === 'class' && (
            <>
              <p><strong>Class Diagram</strong> &mdash; model classes, interfaces, and their relationships.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`class Animal\n  +name: string\n  #age: int\n  -id: uuid\n  +speak(): void\n\ninterface Movable\n  +move(d: int): void\n\nclass Dog extends Animal\n  +bark(): void`}</div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
                  <p>&bull; <strong>class Name</strong> &mdash; define a class</p>
                  <p>&bull; <strong>interface Name</strong> &mdash; define an interface</p>
                  <p>&bull; <strong>abstract class</strong> &mdash; italic class name</p>
                  <p>&bull; Indent members with 2 spaces</p>
                  <p>&bull; <strong>+</strong> public &nbsp;<strong>-</strong> private &nbsp;<strong>#</strong> protected</p>
                  <p>&bull; Parentheses &rarr; method, otherwise field</p>
                  <p>&bull; <strong>extends / implements</strong> after class name</p>
                </div>
              </div>
            </>
          )}
          {type === 'usecase' && (
            <>
              <p><strong>Use Case Diagram</strong> &mdash; model actors and their interactions with system features.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`actor Customer\n\nusecase Browse Products\nusecase Place Order\nusecase Make Payment\n\nCustomer -> Browse Products\nCustomer -> Place Order\nCustomer -> Make Payment`}</div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
                  <p>&bull; <strong>actor Name</strong> &mdash; define an actor (stick figure)</p>
                  <p>&bull; <strong>usecase Name</strong> &mdash; define a use case (ellipse)</p>
                  <p>&bull; <strong>{'Actor -> Use Case'}</strong> &mdash; connect actor to use case</p>
                  <p>&bull; Actors auto-created from connections</p>
                  <p>&bull; System boundary shown as dashed box</p>
                </div>
              </div>
            </>
          )}
          {type === 'activity' && (
            <>
              <p><strong>Activity Diagram</strong> &mdash; model workflows with actions, decisions, and branching.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`[start]\nReceive Order\n[if] In Stock?\n  [yes] Pack Items\n    Ship Order\n  [no] Backorder\n    Notify Customer\n[end]`}</div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
                  <p>&bull; <strong>[start]</strong> &mdash; start node (filled circle)</p>
                  <p>&bull; <strong>[end]</strong> &mdash; end node (bull&apos;s-eye circle)</p>
                  <p>&bull; <strong>[if] Label</strong> &mdash; decision diamond</p>
                  <p>&bull; <strong>[yes] Action</strong> &mdash; &ldquo;Yes&rdquo; branch</p>
                  <p>&bull; <strong>[no] Action</strong> &mdash; &ldquo;No&rdquo; branch</p>
                  <p>&bull; Indentation controls tree structure</p>
                  <p>&bull; Plain text &rarr; action (rounded rectangle)</p>
                </div>
              </div>
            </>
          )}
          {type === 'state' && (
            <>
              <p><strong>State Diagram</strong> &mdash; model object states and transitions triggered by events.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`[start] -> Idle\nIdle -> Processing: Start\nProcessing -> Done: Complete\nProcessing -> Error: Fail\nError -> Idle: Retry\nDone -> [end]`}</div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
                  <p>&bull; <strong>{'State -> State'}</strong> &mdash; transition arrow</p>
                  <p>&bull; <strong>{'State -> State: Event'}</strong> &mdash; labeled transition</p>
                  <p>&bull; <strong>[start]</strong> &mdash; initial pseudo-state (filled dot)</p>
                  <p>&bull; <strong>[end]</strong> &mdash; final pseudo-state (bull&apos;s-eye)</p>
                  <p>&bull; States rendered as rounded rectangles</p>
                  <p>&bull; States auto-discovered from transitions</p>
                </div>
              </div>
            </>
          )}
          {type === 'er' && (
            <>
              <p><strong>ER Diagram</strong> &mdash; model database entities, fields, and relationships.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`entity User\n  *id PK\n  name\n  email\n\nentity Post\n  *id PK\n  title\n  user_id FK\n\nUser 1--* Post`}</div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
                  <p>&bull; <strong>entity Name</strong> &mdash; define an entity table</p>
                  <p>&bull; Indent fields with 2 spaces or tab</p>
                  <p>&bull; <strong>*field</strong> or <strong>PK</strong> &mdash; primary key (underlined + key icon)</p>
                  <p>&bull; <strong>FK</strong> &mdash; foreign key label</p>
                  <p>&bull; <strong>{'A 1--* B'}</strong> &mdash; one-to-many relationship</p>
                  <p>&bull; <strong>{'1--1'}</strong>, <strong>{'1--*'}</strong>, <strong>{'*--1'}</strong>, <strong>{'*--*'}</strong> &mdash; cardinalities</p>
                </div>
              </div>
            </>
          )}
        </div>
      </details>
    </div>
  )
}
