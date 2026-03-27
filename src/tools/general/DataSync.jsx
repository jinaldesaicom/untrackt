import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, Upload, Copy, Check, QrCode, FileJson, AlertTriangle, Shield, ChevronRight, Smartphone, Cloud, LogIn, LogOut, RefreshCw, Trash2, CloudUpload, CloudDownload } from 'lucide-react'
import * as gdrive from '../../utils/googleDrive'

/* All known localStorage key prefixes used by UnTrackt tools */
const KNOWN_PREFIXES = [
  'untrackt:',      // core app data: favorites, theme, stats, prefs, tool data
  'untrackt_',      // productivity, finance, health tools (alternate convention)
  'general:',       // general tool prefs (typing best WPM, countdowns, palettes)
  'health:',        // health tool unit preferences
  'invoice:',       // invoice generator
  'proposal:',      // proposal builder
  'tax:',           // tax bracket estimator
  'timezone:',      // time zone scheduler
]

const isAppKey = (key) => KNOWN_PREFIXES.some((p) => key.startsWith(p))

/* ── Helpers ──────────────────────────────────────────────── */

function gatherData() {
  const data = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && isAppKey(key)) {
      try { data[key] = JSON.parse(localStorage.getItem(key)) }
      catch { data[key] = localStorage.getItem(key) }
    }
  }
  return data
}

function restoreData(data, mode) {
  let restored = 0
  const entries = Object.entries(data)
  const valid = entries.filter(([k]) => isAppKey(k))
  for (const [key, value] of valid) {
    if (mode === 'merge') {
      const existing = localStorage.getItem(key)
      if (existing !== null) continue
    }
    try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); restored++ }
    catch { /* full storage */ }
  }
  return { restored, total: valid.length }
}

function exportTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

/* Compress for QR: simple URI-safe base64 via CompressionStream if available, else raw base64 */
async function compressToString(obj) {
  const json = JSON.stringify(obj)
  if (typeof CompressionStream !== 'undefined') {
    const cs = new CompressionStream('deflate')
    const writer = cs.writable.getWriter()
    writer.write(new TextEncoder().encode(json))
    writer.close()
    const chunks = []
    const reader = cs.readable.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }
    const buf = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0))
    let off = 0
    for (const c of chunks) { buf.set(c, off); off += c.length }
    return 'Z:' + btoa(String.fromCharCode(...buf))
  }
  return 'R:' + btoa(unescape(encodeURIComponent(json)))
}

async function decompressFromString(str) {
  if (str.startsWith('Z:')) {
    const b64 = str.slice(2)
    const raw = atob(b64)
    const bytes = new Uint8Array(raw.length)
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)
    const ds = new DecompressionStream('deflate')
    const writer = ds.writable.getWriter()
    writer.write(bytes)
    writer.close()
    const chunks = []
    const reader = ds.readable.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }
    const buf = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0))
    let off = 0
    for (const c of chunks) { buf.set(c, off); off += c.length }
    return JSON.parse(new TextDecoder().decode(buf))
  }
  if (str.startsWith('R:')) {
    return JSON.parse(decodeURIComponent(escape(atob(str.slice(2)))))
  }
  return JSON.parse(str)
}

/* ── Tab definitions ──────────────────────────────────────── */

const TABS = [
  { id: 'export', label: 'Export / Import', icon: FileJson },
  { id: 'transfer', label: 'QR Transfer', icon: QrCode },
  { id: 'gdrive', label: 'Google Drive', icon: Cloud },
]

/* ── Component ────────────────────────────────────────────── */

export default function DataSync() {
  const [tab, setTab] = useState('export')
  const [status, setStatus] = useState(null)
  const [importMode, setImportMode] = useState('merge')
  const [showConfirm, setShowConfirm] = useState(null)

  // Export/Import state
  const fileRef = useRef(null)

  // QR state
  const [qrPayload, setQrPayload] = useState('')
  const [qrReady, setQrReady] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const [copied, setCopied] = useState(false)
  const qrCanvasRef = useRef(null)

  // Google Drive state
  const [driveSignedIn, setDriveSignedIn] = useState(gdrive.isSignedIn)
  const [driveLoading, setDriveLoading] = useState(false)
  const [driveBackups, setDriveBackups] = useState([])
  const [driveLastSync, setDriveLastSync] = useState(() => localStorage.getItem('untrackt:gdrive-last-sync') || null)

  const dataSnapshot = useMemo(() => gatherData(), [])
  const keyCount = Object.keys(dataSnapshot).length
  const dataSize = useMemo(() => {
    const bytes = new Blob([JSON.stringify(dataSnapshot)]).size
    return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`
  }, [dataSnapshot])

  const flash = useCallback((msg, type = 'success') => {
    setStatus({ msg, type })
    setTimeout(() => setStatus(null), 4000)
  }, [])

  /* ── Export JSON ── */
  const handleExport = useCallback(() => {
    const data = gatherData()
    const wrapper = { _meta: { app: 'untrackt', version: 1, exportedAt: new Date().toISOString(), keyCount: Object.keys(data).length }, data }
    const blob = new Blob([JSON.stringify(wrapper, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `untrackt-backup-${exportTimestamp()}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash(`Exported ${Object.keys(data).length} keys`)
  }, [flash])

  /* ── Import JSON ── */
  const handleFileSelected = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    if (!file.name.endsWith('.json')) { flash('Please select a .json file', 'error'); return }
    if (file.size > 10 * 1024 * 1024) { flash('File too large (max 10 MB)', 'error'); return }

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result)
        const data = parsed?.data ?? parsed
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid format')
        const validKeys = Object.keys(data).filter(isAppKey)
        if (!validKeys.length) { flash('No UnTrackt data found in file', 'error'); return }

        setShowConfirm({
          data,
          keys: validKeys.length,
          meta: parsed?._meta,
          mode: importMode,
        })
      } catch {
        flash('Invalid backup file', 'error')
      }
    }
    reader.readAsText(file)
  }, [flash, importMode])

  const confirmImport = useCallback(() => {
    if (!showConfirm) return
    const { restored, total } = restoreData(showConfirm.data, showConfirm.mode)
    flash(`Imported ${restored} of ${total} keys (${showConfirm.mode} mode). Reload the page to see changes.`)
    setShowConfirm(null)
  }, [showConfirm, flash])

  /* ── QR / Text Transfer ── */
  const handleGenerateQR = useCallback(async () => {
    try {
      const data = gatherData()
      const payload = await compressToString(data)
      if (payload.length > 2800) {
        flash('Data too large for QR code. Use Copy Text instead.', 'error')
        setQrPayload(payload)
        setQrReady(false)
        return
      }
      setQrPayload(payload)
      setQrReady(true)
      flash('QR code generated')
    } catch {
      flash('Failed to generate QR code', 'error')
    }
  }, [flash])

  const handleCopyPayload = useCallback(async () => {
    try {
      const data = gatherData()
      const payload = await compressToString(data)
      await navigator.clipboard.writeText(payload)
      setQrPayload(payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      flash('Copied to clipboard')
    } catch {
      flash('Failed to copy', 'error')
    }
  }, [flash])

  const handlePasteImport = useCallback(async () => {
    const text = pasteText.trim()
    if (!text) { flash('Paste the transfer text first', 'error'); return }
    try {
      const data = await decompressFromString(text)
      if (typeof data !== 'object' || Array.isArray(data)) throw new Error()
      const validKeys = Object.keys(data).filter(isAppKey)
      if (!validKeys.length) { flash('No valid data found', 'error'); return }

      setShowConfirm({ data, keys: validKeys.length, meta: null, mode: importMode })
    } catch {
      flash('Invalid transfer data', 'error')
    }
  }, [pasteText, flash, importMode])

  const handleDownloadQR = useCallback(() => {
    const canvas = qrCanvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `untrackt-qr-${exportTimestamp()}.png`
    a.click()
  }, [])

  /* ── Google Drive handlers ── */
  const refreshDriveBackups = useCallback(async () => {
    try {
      const files = await gdrive.listBackups()
      setDriveBackups(files)
    } catch { /* ignore - handled by caller */ }
  }, [])

  const handleDriveSignIn = useCallback(async () => {
    setDriveLoading(true)
    try {
      await gdrive.signIn()
      setDriveSignedIn(true)
      await refreshDriveBackups()
      flash('Signed in to Google Drive')
    } catch (err) {
      flash(err.message || 'Sign-in failed', 'error')
    } finally {
      setDriveLoading(false)
    }
  }, [flash, refreshDriveBackups])

  const handleDriveSignOut = useCallback(async () => {
    await gdrive.signOut()
    setDriveSignedIn(false)
    setDriveBackups([])
    flash('Signed out from Google Drive')
  }, [flash])

  const handleDriveBackup = useCallback(async () => {
    setDriveLoading(true)
    try {
      const data = gatherData()
      await gdrive.uploadBackup(data)
      const now = new Date().toISOString()
      setDriveLastSync(now)
      localStorage.setItem('untrackt:gdrive-last-sync', now)
      await refreshDriveBackups()
      flash(`Backed up ${Object.keys(data).length} keys to Google Drive`)
    } catch (err) {
      if (err.message?.includes('Not signed in') || err.message?.includes('Session expired')) {
        setDriveSignedIn(false)
      }
      flash(err.message || 'Backup failed', 'error')
    } finally {
      setDriveLoading(false)
    }
  }, [flash, refreshDriveBackups])

  const handleDriveRestore = useCallback(async () => {
    setDriveLoading(true)
    try {
      const result = await gdrive.downloadBackup()
      if (!result) { flash('No backup found on Google Drive', 'error'); return }

      const { data, meta } = result
      if (typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid backup format')
      const validKeys = Object.keys(data).filter(isAppKey)
      if (!validKeys.length) { flash('No valid UnTrackt data in backup', 'error'); return }

      setShowConfirm({ data, keys: validKeys.length, meta, mode: importMode, source: 'gdrive' })
    } catch (err) {
      if (err.message?.includes('Not signed in') || err.message?.includes('Session expired')) {
        setDriveSignedIn(false)
      }
      flash(err.message || 'Restore failed', 'error')
    } finally {
      setDriveLoading(false)
    }
  }, [flash, importMode])

  const handleDriveDelete = useCallback(async (fileId) => {
    setDriveLoading(true)
    try {
      await gdrive.deleteBackup(fileId)
      await refreshDriveBackups()
      flash('Backup deleted from Google Drive')
    } catch (err) {
      flash(err.message || 'Delete failed', 'error')
    } finally {
      setDriveLoading(false)
    }
  }, [flash, refreshDriveBackups])

  // Refresh backup list when switching to Drive tab while signed in
  useEffect(() => {
    if (tab === 'gdrive' && driveSignedIn) {
      refreshDriveBackups()
    }
  }, [tab, driveSignedIn, refreshDriveBackups])

  return (
    <div className="space-y-5">
      {/* Privacy badge */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
        <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-800 dark:text-emerald-300">
          <strong>100% Private</strong> — All data stays on your device. No accounts, no servers, no tracking. Export files and QR codes are generated entirely in your browser.
        </div>
      </div>

      {/* Data summary */}
      <div className="flex flex-wrap gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Stored Keys</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{keyCount}</div>
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-700" />
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Data Size</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{dataSize}</div>
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-700" />
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Includes</div>
          <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mt-0.5">
            Favorites, theme, recent tools, stats, preferences
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {TABS.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Import mode selector (shared) */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Import Mode</label>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-fit">
          {[
            { id: 'merge', label: 'Merge', desc: 'Keep existing, add missing' },
            { id: 'overwrite', label: 'Overwrite', desc: 'Replace all matching keys' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setImportMode(m.id)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                importMode === m.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              title={m.desc}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
          {importMode === 'merge' ? 'Keeps your existing data, only adds keys that are missing.' : 'Replaces all matching keys with imported values.'}
        </p>
      </div>

      {/* ── Tab: Export / Import ── */}
      {tab === 'export' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export card */}
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Export Data</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Download all your UnTrackt data as a JSON file. Transfer it to another device or keep it as a backup.
            </p>
            <button onClick={handleExport} className="btn-primary text-sm flex items-center gap-2 w-full justify-center">
              <Download className="w-4 h-4" />
              Download Backup ({dataSize})
            </button>
          </div>

          {/* Import card */}
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Import Data</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Restore data from a previously exported JSON backup file. Choose merge or overwrite mode above.
            </p>
            <input ref={fileRef} type="file" accept=".json" onChange={handleFileSelected} className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="btn-secondary text-sm flex items-center gap-2 w-full justify-center">
              <Upload className="w-4 h-4" />
              Select Backup File
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: QR Transfer ── */}
      {tab === 'transfer' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Send side */}
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Send</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Generate a QR code or copy a transfer string. Scan or paste it on the other device.
            </p>
            <div className="flex gap-2">
              <button onClick={handleGenerateQR} className="btn-primary text-xs flex items-center gap-1.5 flex-1 justify-center">
                <QrCode className="w-3.5 h-3.5" />
                Generate QR
              </button>
              <button onClick={handleCopyPayload} className="btn-secondary text-xs flex items-center gap-1.5 flex-1 justify-center">
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            </div>

            {qrReady && qrPayload && (
              <div className="flex flex-col items-center gap-2 pt-2">
                <div ref={qrCanvasRef} className="p-3 bg-white rounded-lg border border-gray-200">
                  <QRCodeCanvas value={qrPayload} size={220} level="L" includeMargin={false} />
                </div>
                <button onClick={handleDownloadQR} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Save QR as PNG
                </button>
              </div>
            )}

            {qrPayload && !qrReady && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-700 dark:text-amber-300">Data is too large for a QR code ({(qrPayload.length / 1024).toFixed(1)} KB). Use the &quot;Copy Text&quot; button instead and paste it on the other device.</p>
              </div>
            )}
          </div>

          {/* Receive side */}
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Receive</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              After scanning the QR code with your phone camera (it copies the text), paste the transfer string below.
            </p>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste transfer text here..."
              className="textarea-field text-xs font-mono resize-none"
              rows={4}
            />
            <button
              onClick={handlePasteImport}
              disabled={!pasteText.trim()}
              className="btn-primary text-sm flex items-center gap-2 w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4" />
              Import from Text
            </button>
          </div>
        </div>
      )}

      {/* ── Tab: Google Drive ── */}
      {tab === 'gdrive' && (
        <div className="space-y-4">
          {!driveSignedIn ? (
            /* Sign-in card */
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <Cloud className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Connect Google Drive</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Back up your UnTrackt data to a private app folder in your Google Drive.
                  Only this app can access the backup file — we never see your other Drive files.
                </p>
              </div>
              <button
                onClick={handleDriveSignIn}
                disabled={driveLoading}
                className="btn-primary text-sm inline-flex items-center gap-2 px-6 disabled:opacity-50"
              >
                {driveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                {driveLoading ? 'Connecting…' : 'Sign in with Google'}
              </button>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                Uses <code className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1 rounded">drive.appdata</code> scope — minimal, privacy-safe permission.
              </p>
            </div>
          ) : (
            /* Signed-in view */
            <>
              {/* Status bar */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-blue-800 dark:text-blue-300">Connected to Google Drive</span>
                </div>
                <button onClick={handleDriveSignOut} className="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-3">
                  <div className="flex items-center gap-2">
                    <CloudUpload className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Backup to Drive</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Upload your current data to Google Drive. This replaces any existing backup.
                  </p>
                  {driveLastSync && (
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">
                      Last backup: {new Date(driveLastSync).toLocaleString()}
                    </p>
                  )}
                  <button
                    onClick={handleDriveBackup}
                    disabled={driveLoading}
                    className="btn-primary text-sm flex items-center gap-2 w-full justify-center disabled:opacity-50"
                  >
                    {driveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CloudUpload className="w-4 h-4" />}
                    {driveLoading ? 'Uploading…' : `Backup Now (${dataSize})`}
                  </button>
                </div>

                <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-3">
                  <div className="flex items-center gap-2">
                    <CloudDownload className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Restore from Drive</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Download your latest backup from Google Drive and import it. Choose merge or overwrite mode above.
                  </p>
                  <button
                    onClick={handleDriveRestore}
                    disabled={driveLoading}
                    className="btn-secondary text-sm flex items-center gap-2 w-full justify-center disabled:opacity-50"
                  >
                    {driveLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CloudDownload className="w-4 h-4" />}
                    {driveLoading ? 'Downloading…' : 'Restore Latest Backup'}
                  </button>
                </div>
              </div>

              {/* Backup history */}
              {driveBackups.length > 0 && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300">Backups on Drive</h3>
                  </div>
                  <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {driveBackups.map((f) => (
                      <li key={f.id} className="px-4 py-3 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-medium text-gray-800 dark:text-gray-200">{f.name}</div>
                          <div className="text-[11px] text-gray-400 dark:text-gray-500">
                            {new Date(f.modifiedTime).toLocaleString()}
                            {f.size && ` · ${(Number(f.size) / 1024).toFixed(1)} KB`}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDriveDelete(f.id)}
                          disabled={driveLoading}
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-40"
                          title="Delete backup"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Confirmation modal ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowConfirm(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Confirm Import</h3>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>This will import <strong>{showConfirm.keys}</strong> data keys using <strong>{showConfirm.mode}</strong> mode.</p>
              {showConfirm.meta && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Backup from {new Date(showConfirm.meta.exportedAt).toLocaleString()}
                </p>
              )}
              {showConfirm.mode === 'overwrite' && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Overwrite mode will replace existing values for matching keys.
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowConfirm(null)} className="btn-secondary text-sm flex-1">Cancel</button>
              <button onClick={confirmImport} className="btn-primary text-sm flex-1 flex items-center justify-center gap-1.5">
                <ChevronRight className="w-4 h-4" />
                Import Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Status toast ── */}
      {status && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          status.type === 'error'
            ? 'bg-red-600 text-white'
            : 'bg-emerald-600 text-white'
        }`}>
          {status.msg}
        </div>
      )}

      {/* Future cloud sync hint */}
      <div className="p-3.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <strong>Coming soon:</strong> Optional OneDrive sync for automatic cross-device backup. Your privacy-first export options will always remain available.
        </p>
      </div>
    </div>
  )
}
