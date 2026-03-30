/**
 * Google Drive integration for UnTrackt Data Sync.
 *
 * Uses Google Identity Services (GIS) for OAuth 2.0 token acquisition
 * and Google Drive API v3 REST endpoints for file operations.
 *
 * Scope: drive.appdata — only accesses a hidden app-specific folder,
 * so the app never sees any of the user's personal Drive files.
 */

const SCOPES = 'https://www.googleapis.com/auth/drive.appdata'
const DRIVE_API = 'https://www.googleapis.com/drive/v3'
const UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3'
const BACKUP_FILENAME = 'untrackt-backup.json'

let tokenClient = null
let accessToken = null
let tokenExpiresAt = 0

/* ── Script loader ──────────────────────────────────────── */

let gisLoaded = false
let gisLoadPromise = null

function loadGisScript() {
  if (gisLoaded) return Promise.resolve()
  if (gisLoadPromise) return gisLoadPromise

  gisLoadPromise = new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
      gisLoaded = true
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => { gisLoaded = true; resolve() }
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'))
    document.head.appendChild(script)
  })

  return gisLoadPromise
}

/* ── Auth helpers ───────────────────────────────────────── */

function getClientId() {
  const id = import.meta.env.VITE_GOOGLE_CLIENT_ID
  if (!id) throw new Error('Google Drive sync is not available yet. Please check back later!')
  return id
}

/**
 * Request an access token via the GIS popup consent flow.
 * Returns the token string on success.
 */
export async function signIn() {
  await loadGisScript()
  const clientId = getClientId()

  return new Promise((resolve, reject) => {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error_description || response.error))
          return
        }
        accessToken = response.access_token
        tokenExpiresAt = Date.now() + (response.expires_in || 3600) * 1000
        resolve(accessToken)
      },
      error_callback: (err) => {
        reject(new Error(err?.message || 'Google sign-in was cancelled'))
      },
    })

    tokenClient.requestAccessToken({ prompt: '' })
  })
}

/** Revoke the current token and clear local state. */
export async function signOut() {
  if (accessToken) {
    try {
      window.google.accounts.oauth2.revoke(accessToken)
    } catch { /* ignore revoke errors */ }
  }
  accessToken = null
  tokenExpiresAt = 0
  tokenClient = null
}

/** Check whether we have a valid (non-expired) token. */
export function isSignedIn() {
  return !!accessToken && Date.now() < tokenExpiresAt
}

/** Check if Google Drive sync is configured (client ID exists). */
export function isDriveConfigured() {
  return !!import.meta.env.VITE_GOOGLE_CLIENT_ID
}

function getToken() {
  if (!accessToken || Date.now() >= tokenExpiresAt) {
    throw new Error('Not signed in to Google')
  }
  return accessToken
}

/* ── Drive API helpers ──────────────────────────────────── */

async function driveRequest(url, options = {}) {
  const token = getToken()
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (res.status === 401) {
    accessToken = null
    tokenExpiresAt = 0
    throw new Error('Session expired. Please sign in again.')
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Drive API error ${res.status}: ${body}`)
  }

  return res
}

/**
 * List backup files in appDataFolder, newest first.
 * Returns array of { id, name, modifiedTime, size }.
 */
export async function listBackups() {
  const params = new URLSearchParams({
    spaces: 'appDataFolder',
    q: `name = '${BACKUP_FILENAME}'`,
    fields: 'files(id, name, modifiedTime, size)',
    orderBy: 'modifiedTime desc',
    pageSize: '10',
  })

  const res = await driveRequest(`${DRIVE_API}/files?${params}`)
  const data = await res.json()
  return data.files || []
}

/**
 * Upload data as a backup to Google Drive appDataFolder.
 * If a backup already exists, updates it; otherwise creates a new one.
 */
export async function uploadBackup(backupData) {
  const existing = await listBackups()
  const fileContent = JSON.stringify({
    _meta: {
      app: 'untrackt',
      version: 1,
      exportedAt: new Date().toISOString(),
      keyCount: Object.keys(backupData).length,
      source: 'google-drive',
    },
    data: backupData,
  }, null, 2)

  if (existing.length > 0) {
    // Update existing file
    const fileId = existing[0].id
    await driveRequest(`${UPLOAD_API}/files/${fileId}?uploadType=media`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: fileContent,
    })
  } else {
    // Create new file in appDataFolder
    const metadata = {
      name: BACKUP_FILENAME,
      parents: ['appDataFolder'],
    }

    const form = new FormData()
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
    form.append('file', new Blob([fileContent], { type: 'application/json' }))

    await driveRequest(`${UPLOAD_API}/files?uploadType=multipart`, {
      method: 'POST',
      body: form,
    })
  }
}

/**
 * Download the latest backup from Google Drive.
 * Returns the parsed data object or null if no backup exists.
 */
export async function downloadBackup() {
  const files = await listBackups()
  if (!files.length) return null

  const res = await driveRequest(`${DRIVE_API}/files/${files[0].id}?alt=media`)
  const parsed = await res.json()
  return {
    data: parsed?.data ?? parsed,
    meta: parsed?._meta ?? null,
  }
}

/**
 * Delete a specific backup file by ID.
 */
export async function deleteBackup(fileId) {
  await driveRequest(`${DRIVE_API}/files/${fileId}`, { method: 'DELETE' })
}

/**
 * Get metadata about the latest backup without downloading the full content.
 * Returns { id, modifiedTime, size } or null.
 */
export async function getLatestBackupInfo() {
  const files = await listBackups()
  return files.length > 0 ? files[0] : null
}
