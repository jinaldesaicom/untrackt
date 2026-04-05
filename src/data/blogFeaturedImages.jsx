// Minimal SVG featured images for each blog post, keyed by slug.
// Each image is a self-contained component with unique gradient IDs.

function FreelanceProjectImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b1-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b1-grad)" />
      {/* clipboard body */}
      <rect x="270" y="105" width="260" height="265" rx="14" fill="white" fillOpacity="0.12" />
      {/* clipboard clip */}
      <rect x="340" y="88" width="120" height="34" rx="10" fill="white" fillOpacity="0.22" />
      {/* task lines */}
      <rect x="308" y="162" width="178" height="9" rx="4" fill="white" fillOpacity="0.5" />
      <rect x="308" y="202" width="155" height="9" rx="4" fill="white" fillOpacity="0.45" />
      <rect x="308" y="242" width="166" height="9" rx="4" fill="white" fillOpacity="0.35" />
      <rect x="308" y="282" width="144" height="9" rx="4" fill="white" fillOpacity="0.25" />
      {/* check circles */}
      <circle cx="292" cy="167" r="10" fill="#86efac" fillOpacity="0.85" />
      <polyline points="285,167 290,173 300,159" fill="none" stroke="#14532d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="292" cy="207" r="10" fill="#86efac" fillOpacity="0.85" />
      <polyline points="285,207 290,213 300,199" fill="none" stroke="#14532d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="292" cy="247" r="10" fill="white" fillOpacity="0.2" />
      <circle cx="292" cy="287" r="10" fill="white" fillOpacity="0.15" />
      {/* right: phase blocks */}
      <rect x="570" y="138" width="110" height="38" rx="10" fill="white" fillOpacity="0.13" />
      <rect x="570" y="196" width="110" height="38" rx="10" fill="white" fillOpacity="0.13" />
      <rect x="570" y="254" width="110" height="38" rx="10" fill="white" fillOpacity="0.13" />
      <line x1="625" y1="176" x2="625" y2="196" stroke="white" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="4 3" />
      <line x1="625" y1="234" x2="625" y2="254" stroke="white" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="4 3" />
      {/* clock */}
      <circle cx="140" cy="225" r="60" fill="white" fillOpacity="0.08" />
      <circle cx="140" cy="225" r="44" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <line x1="140" y1="198" x2="140" y2="225" stroke="white" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
      <line x1="140" y1="225" x2="160" y2="236" stroke="white" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
      <circle cx="140" cy="225" r="5" fill="white" fillOpacity="0.9" />
      {/* decorative circles */}
      <circle cx="710" cy="380" r="28" fill="white" fillOpacity="0.05" />
      <circle cx="80" cy="390" r="20" fill="white" fillOpacity="0.05" />
    </svg>
  )
}

function DeveloperMorningImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b2-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b2-grad)" />
      {/* terminal window */}
      <rect x="70" y="110" width="360" height="250" rx="14" fill="white" fillOpacity="0.07" />
      {/* title bar */}
      <rect x="70" y="110" width="360" height="38" rx="14" fill="white" fillOpacity="0.11" />
      <rect x="70" y="130" width="360" height="18" fill="white" fillOpacity="0.11" />
      {/* traffic lights */}
      <circle cx="103" cy="129" r="7" fill="#ef4444" fillOpacity="0.85" />
      <circle cx="125" cy="129" r="7" fill="#f59e0b" fillOpacity="0.85" />
      <circle cx="147" cy="129" r="7" fill="#22c55e" fillOpacity="0.85" />
      {/* code lines */}
      <rect x="100" y="170" width="220" height="9" rx="4" fill="#34d399" fillOpacity="0.7" />
      <rect x="100" y="192" width="180" height="9" rx="4" fill="#38bdf8" fillOpacity="0.5" />
      <rect x="100" y="214" width="200" height="9" rx="4" fill="#a78bfa" fillOpacity="0.5" />
      <rect x="100" y="236" width="160" height="9" rx="4" fill="#38bdf8" fillOpacity="0.4" />
      <rect x="100" y="258" width="190" height="9" rx="4" fill="#34d399" fillOpacity="0.35" />
      <rect x="100" y="280" width="62" height="9" rx="4" fill="#34d399" fillOpacity="0.6" />
      {/* cursor */}
      <rect x="166" y="278" width="10" height="12" rx="1" fill="#34d399" fillOpacity="0.85" />
      {/* sunrise */}
      <circle cx="600" cy="335" r="130" fill="#f59e0b" fillOpacity="0.1" />
      <circle cx="600" cy="335" r="72" fill="#f59e0b" fillOpacity="0.2" />
      {/* horizon */}
      <rect x="462" y="332" width="276" height="8" rx="4" fill="white" fillOpacity="0.18" />
      {/* rays */}
      <line x1="600" y1="228" x2="600" y2="250" stroke="#fde68a" strokeOpacity="0.65" strokeWidth="5" strokeLinecap="round" />
      <line x1="651" y1="246" x2="636" y2="262" stroke="#fde68a" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
      <line x1="549" y1="246" x2="564" y2="262" stroke="#fde68a" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
      <line x1="686" y1="290" x2="666" y2="298" stroke="#fde68a" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
      <line x1="514" y1="290" x2="534" y2="298" stroke="#fde68a" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function FinancePrivatelyImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b3-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b3-grad)" />
      {/* bar chart */}
      <rect x="118" y="258" width="60" height="112" rx="6" fill="#34d399" fillOpacity="0.35" />
      <rect x="198" y="208" width="60" height="162" rx="6" fill="#34d399" fillOpacity="0.45" />
      <rect x="278" y="168" width="60" height="202" rx="6" fill="#34d399" fillOpacity="0.55" />
      <rect x="358" y="128" width="60" height="242" rx="6" fill="#34d399" fillOpacity="0.65" />
      {/* baseline */}
      <rect x="98" y="368" width="350" height="6" rx="3" fill="white" fillOpacity="0.2" />
      {/* shield */}
      <path d="M558,98 L680,128 L680,270 Q680,342 619,372 Q558,342 558,270 Z" fill="white" fillOpacity="0.1" />
      <path d="M558,98 L680,128 L680,270 Q680,342 619,372 Q558,342 558,270 Z" fill="none" stroke="#6ee7b7" strokeOpacity="0.6" strokeWidth="5" />
      {/* lock body */}
      <rect x="595" y="228" width="48" height="38" rx="6" fill="#6ee7b7" fillOpacity="0.5" />
      {/* lock shackle */}
      <path d="M599,228 L599,208 Q619,188 639,208 L639,228" fill="none" stroke="#6ee7b7" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" />
      {/* keyhole */}
      <circle cx="619" cy="244" r="7" fill="#064e3b" fillOpacity="0.8" />
      <rect x="616" y="249" width="6" height="10" rx="2" fill="#064e3b" fillOpacity="0.8" />
      {/* trend line */}
      <polyline points="118,338 198,288 278,248 358,208" fill="none" stroke="#a7f3d0" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 5" />
    </svg>
  )
}

function DevToolsBookmarkImage() {
  const rows = [0, 1, 2]
  const cols = [0, 1, 2]
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b4-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5b21b6" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b4-grad)" />
      {/* 3x3 grid of tool boxes */}
      {rows.map(row => cols.map(col => (
        <rect
          key={`grid-${row}-${col}`}
          x={200 + col * 120}
          y={90 + row * 110}
          width="90"
          height="90"
          rx="14"
          fill="white"
          fillOpacity={0.07 + (row + col) * 0.02}
        />
      )))}
      {/* center cell highlight */}
      <rect x="320" y="200" width="90" height="90" rx="14" fill="white" fillOpacity="0.18" />
      {/* code brackets in center cell */}
      <path d="M342,228 L327,245 L342,262" fill="none" stroke="#c4b5fd" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M388,228 L403,245 L388,262" fill="none" stroke="#c4b5fd" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="360" y1="228" x2="370" y2="262" stroke="#c4b5fd" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" />
      {/* bookmark ribbon on top-right cell */}
      <path d="M495,90 L495,162 L525,148 L555,162 L555,90 Z" fill="#f59e0b" fillOpacity="0.78" />
      {/* icon dots in other cells */}
      <circle cx="245" cy="135" r="14" fill="white" fillOpacity="0.25" />
      <circle cx="245" cy="245" r="14" fill="white" fillOpacity="0.2" />
      <circle cx="365" cy="135" r="14" fill="white" fillOpacity="0.2" />
      <circle cx="485" cy="245" r="14" fill="white" fillOpacity="0.2" />
      <circle cx="245" cy="355" r="14" fill="white" fillOpacity="0.18" />
      <circle cx="365" cy="355" r="14" fill="white" fillOpacity="0.18" />
      <circle cx="485" cy="355" r="14" fill="white" fillOpacity="0.18" />
      {/* "10" badge */}
      <circle cx="648" cy="118" r="50" fill="white" fillOpacity="0.1" />
      <circle cx="648" cy="118" r="32" fill="white" fillOpacity="0.1" />
    </svg>
  )
}

function SeoToolsImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b5-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b5-grad)" />
      {/* magnifying glass circle */}
      <circle cx="380" cy="208" r="130" fill="white" fillOpacity="0.07" />
      <circle cx="380" cy="208" r="100" fill="white" fillOpacity="0.09" />
      <circle cx="380" cy="208" r="100" fill="none" stroke="#fcd34d" strokeOpacity="0.55" strokeWidth="12" />
      {/* handle */}
      <line x1="456" y1="284" x2="530" y2="358" stroke="#fcd34d" strokeOpacity="0.55" strokeWidth="18" strokeLinecap="round" />
      {/* search result lines inside */}
      <rect x="313" y="173" width="132" height="9" rx="4" fill="white" fillOpacity="0.5" />
      <rect x="313" y="196" width="112" height="9" rx="4" fill="white" fillOpacity="0.4" />
      <rect x="313" y="219" width="122" height="9" rx="4" fill="white" fillOpacity="0.35" />
      <rect x="313" y="242" width="102" height="9" rx="4" fill="white" fillOpacity="0.3" />
      {/* "7" badge circle */}
      <circle cx="168" cy="178" r="62" fill="white" fillOpacity="0.1" />
      <circle cx="168" cy="178" r="44" fill="white" fillOpacity="0.1" />
      {/* no-tracking eye+slash */}
      <ellipse cx="638" cy="290" rx="55" ry="32" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="5" />
      <circle cx="638" cy="290" r="16" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="4" />
      <line x1="603" y1="258" x2="673" y2="322" stroke="#fca5a5" strokeOpacity="0.65" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function BestFreelancerToolsImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b6-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b6-grad)" />
      {/* briefcase body */}
      <rect x="228" y="178" width="344" height="222" rx="20" fill="white" fillOpacity="0.13" />
      <rect x="228" y="178" width="344" height="222" rx="20" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="5" />
      {/* handle */}
      <path d="M328,178 L328,146 Q328,118 370,118 Q400,118 432,118 Q472,118 472,146 L472,178" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="10" strokeLinecap="round" />
      {/* horizontal latch divider */}
      <rect x="228" y="268" width="344" height="12" rx="6" fill="white" fillOpacity="0.15" />
      {/* latch clasp */}
      <rect x="368" y="256" width="64" height="36" rx="8" fill="white" fillOpacity="0.2" />
      <rect x="382" y="270" width="36" height="8" rx="4" fill="white" fillOpacity="0.4" />
      {/* sparkle circles (star substitutes) */}
      <circle cx="640" cy="120" r="38" fill="#fde68a" fillOpacity="0.25" />
      <circle cx="640" cy="120" r="22" fill="#fde68a" fillOpacity="0.35" />
      <circle cx="682" cy="158" r="22" fill="#fde68a" fillOpacity="0.2" />
      <circle cx="682" cy="158" r="12" fill="#fde68a" fillOpacity="0.28" />
      <circle cx="610" cy="168" r="16" fill="#fde68a" fillOpacity="0.18" />
      <circle cx="610" cy="168" r="9" fill="#fde68a" fillOpacity="0.25" />
      {/* time/year indicator */}
      <circle cx="130" cy="225" r="30" fill="white" fillOpacity="0.1" />
      <circle cx="130" cy="225" r="18" fill="white" fillOpacity="0.1" />
    </svg>
  )
}

function PomodoroVsImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b7-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="b7-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* split background */}
      <rect x="0" y="0" width="400" height="450" fill="url(#b7-left)" />
      <rect x="400" y="0" width="400" height="450" fill="url(#b7-right)" />
      {/* divider */}
      <line x1="400" y1="0" x2="400" y2="450" stroke="white" strokeOpacity="0.2" strokeWidth="3" />
      {/* VS badge */}
      <circle cx="400" cy="225" r="36" fill="#1e293b" fillOpacity="0.75" />
      <line x1="390" y1="214" x2="384" y2="236" stroke="white" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      <line x1="390" y1="214" x2="396" y2="225" stroke="white" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      <line x1="396" y1="225" x2="390" y2="236" stroke="white" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      <line x1="406" y1="214" x2="416" y2="236" stroke="white" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      {/* LEFT: Pomodoro tomato */}
      <circle cx="200" cy="225" r="100" fill="#ef4444" fillOpacity="0.25" />
      <circle cx="200" cy="225" r="80" fill="#ef4444" fillOpacity="0.35" />
      {/* tomato stem */}
      <path d="M200,145 Q190,122 174,116 Q180,105 200,116" fill="#4ade80" fillOpacity="0.65" />
      {/* round timer face */}
      <circle cx="200" cy="225" r="80" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="5" />
      {/* progress arc: ~75% stroke. Circumference = 2π×60 ≈ 377; 75% ≈ 283 */}
      <circle cx="200" cy="225" r="60" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="8"
        strokeDasharray="283 94" transform="rotate(-90, 200, 225)" />
      <circle cx="200" cy="225" r="8" fill="white" fillOpacity="0.7" />
      {/* RIGHT: 52/17 rectangular timer */}
      <rect x="510" y="143" width="180" height="162" rx="18" fill="white" fillOpacity="0.12" />
      <rect x="510" y="143" width="180" height="162" rx="18" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="5" />
      {/* time segments */}
      <rect x="530" y="166" width="140" height="26" rx="6" fill="#f59e0b" fillOpacity="0.5" />
      <rect x="530" y="204" width="140" height="26" rx="6" fill="white" fillOpacity="0.2" />
      <rect x="530" y="242" width="140" height="26" rx="6" fill="white" fillOpacity="0.15" />
      {/* break indicator */}
      <circle cx="600" cy="330" r="26" fill="white" fillOpacity="0.1" />
      <rect x="576" y="316" width="48" height="8" rx="4" fill="#fcd34d" fillOpacity="0.5" />
    </svg>
  )
}

function NotionVsBrowserImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b8-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b8-grad)" />
      {/* left box: Notion-style */}
      <rect x="78" y="118" width="262" height="232" rx="18" fill="white" fillOpacity="0.1" />
      <rect x="78" y="118" width="262" height="232" rx="18" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="4" />
      {/* N letterform */}
      <polyline points="128,188 128,290 202,188 202,290" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      {/* cloud: above N */}
      <circle cx="178" cy="332" r="20" fill="white" fillOpacity="0.14" />
      <circle cx="208" cy="327" r="26" fill="white" fillOpacity="0.14" />
      <circle cx="238" cy="332" r="20" fill="white" fillOpacity="0.14" />
      {/* right box: Browser */}
      <rect x="460" y="118" width="262" height="232" rx="18" fill="white" fillOpacity="0.1" />
      <rect x="460" y="118" width="262" height="232" rx="18" fill="none" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="4" />
      {/* browser title bar */}
      <rect x="460" y="118" width="262" height="38" rx="18" fill="white" fillOpacity="0.08" />
      <rect x="460" y="138" width="262" height="18" fill="white" fillOpacity="0.08" />
      <circle cx="490" cy="137" r="6" fill="white" fillOpacity="0.4" />
      <circle cx="510" cy="137" r="6" fill="white" fillOpacity="0.4" />
      <circle cx="530" cy="137" r="6" fill="white" fillOpacity="0.4" />
      {/* URL bar */}
      <rect x="542" y="128" width="160" height="18" rx="6" fill="white" fillOpacity="0.15" />
      {/* shield inside browser */}
      <path d="M590,178 L656,196 L656,272 Q656,312 623,330 Q590,312 590,272 Z" fill="#38bdf8" fillOpacity="0.18" />
      <path d="M590,178 L656,196 L656,272 Q656,312 623,330 Q590,312 590,272 Z" fill="none" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="4" />
      {/* checkmark in shield */}
      <polyline points="606,252 620,268 644,228" fill="none" stroke="#38bdf8" strokeOpacity="0.9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* VS divider */}
      <rect x="372" y="198" width="56" height="56" rx="12" fill="white" fillOpacity="0.07" />
    </svg>
  )
}

function GoogleToolsCalcImage() {
  const calcRows = [0, 1, 2, 3]
  const calcCols = [0, 1, 2, 3]
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b9-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b9-grad)" />
      {/* calculator body */}
      <rect x="198" y="78" width="284" height="322" rx="20" fill="white" fillOpacity="0.1" />
      <rect x="198" y="78" width="284" height="322" rx="20" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="5" />
      {/* display area */}
      <rect x="222" y="106" width="236" height="68" rx="10" fill="white" fillOpacity="0.12" />
      {/* button grid 4×4 */}
      {calcRows.map(row => calcCols.map(col => (
        <rect
          key={`calc-${row}-${col}`}
          x={226 + col * 56}
          y={194 + row * 56}
          width="44"
          height="44"
          rx="8"
          fill="white"
          fillOpacity={col === 3 ? 0.22 : 0.12}
        />
      )))}
      {/* highlighted = button */}
      <rect x="226" y={194 + 3 * 56} width="44" height="44" rx="8" fill="#6366f1" fillOpacity="0.6" />
      {/* shield overlay */}
      <path d="M558,98 L680,128 L680,282 Q680,362 619,392 Q558,362 558,282 Z" fill="#312e81" fillOpacity="0.45" />
      <path d="M558,98 L680,128 L680,282 Q680,362 619,392 Q558,362 558,282 Z" fill="none" stroke="#818cf8" strokeOpacity="0.7" strokeWidth="5" />
      {/* lock in shield */}
      <rect x="595" y="240" width="48" height="38" rx="7" fill="#818cf8" fillOpacity="0.5" />
      <path d="M599,240 L599,218 Q619,198 639,218 L639,240" fill="none" stroke="#818cf8" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
      <circle cx="619" cy="256" r="8" fill="#312e81" fillOpacity="0.8" />
      <rect x="616" y="260" width="6" height="10" rx="2" fill="#312e81" fillOpacity="0.8" />
      {/* warning circle */}
      <circle cx="148" cy="200" r="52" fill="#ef4444" fillOpacity="0.1" />
      <line x1="148" y1="174" x2="148" y2="208" stroke="#fca5a5" strokeWidth="6" strokeLinecap="round" />
      <circle cx="148" cy="220" r="5" fill="#fca5a5" />
    </svg>
  )
}

function NoTrackingPhilosophyImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b10-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b10-grad)" />
      {/* background network dots */}
      <circle cx="100" cy="100" r="6" fill="white" fillOpacity="0.15" />
      <circle cx="700" cy="100" r="6" fill="white" fillOpacity="0.15" />
      <circle cx="100" cy="350" r="6" fill="white" fillOpacity="0.15" />
      <circle cx="700" cy="350" r="6" fill="white" fillOpacity="0.15" />
      <circle cx="400" cy="78" r="6" fill="white" fillOpacity="0.1" />
      <circle cx="400" cy="372" r="6" fill="white" fillOpacity="0.1" />
      {/* broken network lines */}
      <line x1="100" y1="100" x2="260" y2="176" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="8 6" />
      <line x1="700" y1="100" x2="540" y2="176" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="8 6" />
      <line x1="100" y1="350" x2="258" y2="292" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="8 6" />
      <line x1="700" y1="350" x2="542" y2="292" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="8 6" />
      {/* eye outer ellipse */}
      <ellipse cx="400" cy="225" rx="176" ry="100" fill="none" stroke="white" strokeOpacity="0.38" strokeWidth="7" />
      {/* iris */}
      <circle cx="400" cy="225" r="65" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="6" />
      {/* pupil */}
      <circle cx="400" cy="225" r="36" fill="white" fillOpacity="0.1" />
      {/* highlight */}
      <circle cx="418" cy="212" r="10" fill="white" fillOpacity="0.25" />
      {/* slash */}
      <line x1="218" y1="73" x2="582" y2="377" stroke="#ef4444" strokeOpacity="0.72" strokeWidth="12" strokeLinecap="round" />
    </svg>
  )
}

function HiddenCostImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b11-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b11-grad)" />
      {/* price tag hexagon */}
      <polygon points="258,98 462,98 562,225 462,352 258,352 158,225" fill="white" fillOpacity="0.1" />
      <polygon points="258,98 462,98 562,225 462,352 258,352 158,225" fill="none" stroke="#fcd34d" strokeOpacity="0.5" strokeWidth="5" />
      {/* tag hole */}
      <circle cx="274" cy="225" r="21" fill="#78350f" />
      <circle cx="274" cy="225" r="21" fill="none" stroke="#fcd34d" strokeOpacity="0.5" strokeWidth="4" />
      {/* dollar sign */}
      <line x1="360" y1="173" x2="360" y2="277" stroke="#fcd34d" strokeOpacity="0.7" strokeWidth="8" strokeLinecap="round" />
      <path d="M328,193 Q328,173 360,173 Q393,173 393,205 Q393,225 360,225 Q393,225 393,258 Q393,278 360,278 Q327,278 327,258" fill="none" stroke="#fcd34d" strokeOpacity="0.7" strokeWidth="8" strokeLinecap="round" />
      {/* asterisk (hidden extra cost) */}
      <circle cx="582" cy="128" r="55" fill="#fef3c7" fillOpacity="0.1" />
      <line x1="582" y1="88" x2="582" y2="168" stroke="#fcd34d" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
      <line x1="543" y1="108" x2="621" y2="148" stroke="#fcd34d" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
      <line x1="543" y1="148" x2="621" y2="108" stroke="#fcd34d" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
      {/* hidden gear (shadow) */}
      <circle cx="168" cy="342" r="52" fill="white" fillOpacity="0.05" />
      <circle cx="168" cy="342" r="38" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="6" strokeDasharray="12 10" />
      <circle cx="168" cy="342" r="18" fill="white" fillOpacity="0.07" />
    </svg>
  )
}

function NoDatabaseImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="b12-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#134e4a" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#b12-grad)" />
      {/* database cylinder sides */}
      <line x1="198" y1="140" x2="198" y2="342" stroke="#6ee7b7" strokeOpacity="0.4" strokeWidth="4" />
      <line x1="462" y1="140" x2="462" y2="342" stroke="#6ee7b7" strokeOpacity="0.4" strokeWidth="4" />
      <rect x="198" y="140" width="264" height="202" fill="white" fillOpacity="0.07" />
      {/* top oval */}
      <ellipse cx="330" cy="140" rx="132" ry="36" fill="white" fillOpacity="0.13" />
      <ellipse cx="330" cy="140" rx="132" ry="36" fill="none" stroke="#6ee7b7" strokeOpacity="0.5" strokeWidth="4" />
      {/* middle ovals */}
      <ellipse cx="330" cy="207" rx="132" ry="36" fill="none" stroke="#6ee7b7" strokeOpacity="0.28" strokeWidth="3" />
      <ellipse cx="330" cy="274" rx="132" ry="36" fill="none" stroke="#6ee7b7" strokeOpacity="0.22" strokeWidth="3" />
      {/* bottom oval */}
      <ellipse cx="330" cy="342" rx="132" ry="36" fill="white" fillOpacity="0.1" />
      <ellipse cx="330" cy="342" rx="132" ry="36" fill="none" stroke="#6ee7b7" strokeOpacity="0.45" strokeWidth="4" />
      {/* large X over database */}
      <line x1="184" y1="108" x2="476" y2="372" stroke="#f87171" strokeOpacity="0.8" strokeWidth="14" strokeLinecap="round" />
      <line x1="476" y1="108" x2="184" y2="372" stroke="#f87171" strokeOpacity="0.8" strokeWidth="14" strokeLinecap="round" />
      {/* shield right */}
      <path d="M558,118 L680,148 L680,292 Q680,362 619,388 Q558,362 558,292 Z" fill="#065f46" fillOpacity="0.5" />
      <path d="M558,118 L680,148 L680,292 Q680,362 619,388 Q558,362 558,292 Z" fill="none" stroke="#6ee7b7" strokeOpacity="0.65" strokeWidth="5" />
      {/* checkmark in shield */}
      <polyline points="581,252 608,278 662,213" fill="none" stroke="#6ee7b7" strokeOpacity="0.9" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DefaultBlogImage() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="bdef-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#bdef-grad)" />
      <circle cx="400" cy="225" r="122" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="5" />
      <circle cx="400" cy="225" r="82" fill="white" fillOpacity="0.07" />
      <rect x="366" y="230" width="68" height="56" rx="10" fill="white" fillOpacity="0.25" />
      <path d="M372,230 L372,204 Q400,176 428,204 L428,230" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="7" strokeLinecap="round" />
      <circle cx="400" cy="254" r="10" fill="#1e1b4b" fillOpacity="0.8" />
      <rect x="397" y="260" width="6" height="14" rx="3" fill="#1e1b4b" fillOpacity="0.8" />
    </svg>
  )
}

const BLOG_FEATURED_IMAGES = {
  'how-to-plan-a-freelance-project-using-only-untrackt': FreelanceProjectImage,
  'a-developers-morning-workflow-with-untrackt': DeveloperMorningImage,
  'how-i-use-untrackt-to-manage-my-finances-privately': FinancePrivatelyImage,
  '10-free-tools-every-developer-should-bookmark': DevToolsBookmarkImage,
  '7-free-seo-tools-that-dont-track-you': SeoToolsImage,
  'best-free-tools-for-freelancers-in-2026': BestFreelancerToolsImage,
  'pomodoro-vs-52-17-which-actually-works': PomodoroVsImage,
  'notion-vs-browser-only-tools-privacy-comparison': NotionVsBrowserImage,
  'why-i-stopped-using-google-tools-for-sensitive-calculations': GoogleToolsCalcImage,
  'why-your-online-tools-should-not-track-you': NoTrackingPhilosophyImage,
  'the-hidden-cost-of-free-tools': HiddenCostImage,
  'why-we-built-untrackt-without-a-database': NoDatabaseImage,
}

/**
 * Renders a thematic SVG featured image for a blog post.
 * @param {{ slug: string, className?: string }} props
 */
export default function BlogFeaturedImage({ slug, className = '' }) {
  const Component = BLOG_FEATURED_IMAGES[slug] || DefaultBlogImage
  return (
    <div className={`w-full aspect-video ${className}`}>
      <Component />
    </div>
  )
}
