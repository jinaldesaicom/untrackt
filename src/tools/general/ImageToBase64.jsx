import { useRef, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function getImageSize(source) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve({ width: image.width, height: image.height })
    image.onerror = reject
    image.src = source
  })
}

export default function ImageToBase64() {
  const [mode, setMode] = useState('file')
  const [urlInput, setUrlInput] = useState('')
  const [dataUrl, setDataUrl] = useState('')
  const [fileInfo, setFileInfo] = useState(null)
  const [warning, setWarning] = useState('')
  const fileInputRef = useRef(null)

  const processFile = async (file) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setWarning('Max file size is 5MB. Choose a smaller image.')
      return
    }

    const nextDataUrl = await readFile(file)
    const dimensions = await getImageSize(nextDataUrl)
    setWarning('')
    setDataUrl(nextDataUrl)
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
      dimensions,
    })
  }

  const processUrl = async () => {
    try {
      const response = await fetch(urlInput)
      const blob = await response.blob()
      const file = new File([blob], 'remote-image', { type: blob.type || 'image/png' })
      await processFile(file)
    } catch {
      setWarning('Could not fetch the image URL. CORS rules may be blocking the request.')
    }
  }

  const base64Only = dataUrl.includes(',') ? dataUrl.split(',')[1] : ''

  return (
    <ToolLayout
      title="Image to Base64"
      description="Convert an image file or fetchable image URL to a Base64 string entirely in the browser, with preview and copy helpers."
      path="/tools/image-to-base64"
    >
      <div className="rounded-2xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 px-5 py-4 text-indigo-900 dark:text-indigo-200 text-sm font-medium">
        Your image never leaves your device. All processing happens in your browser.
      </div>

      <Panel>
        <SegmentedToggle options={[{ label: 'File upload', value: 'file' }, { label: 'Image URL', value: 'url' }]} value={mode} onChange={setMode} />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Panel>
          {mode === 'file' ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">Drag and drop is supported by your browser, or choose a file manually.</p>
              <button type="button" className="btn-primary mt-4" onClick={() => fileInputRef.current?.click()}>Choose image</button>
              <input ref={fileInputRef} className="hidden" type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml" onChange={(event) => processFile(event.target.files?.[0])} />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <FieldLabel>Image URL</FieldLabel>
                <input className="input-field" value={urlInput} onChange={(event) => setUrlInput(event.target.value)} placeholder="https://example.com/image.png" />
              </div>
              <button type="button" className="btn-primary" onClick={processUrl}>Fetch and convert</button>
              <p className="text-sm text-gray-500 dark:text-gray-400">Remote conversion depends on browser CORS access.</p>
            </div>
          )}
          {warning && <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{warning}</p>}
        </Panel>

        <div className="space-y-6">
          {fileInfo && (
            <Panel>
              <div className="grid gap-4 sm:grid-cols-2">
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium text-gray-900 dark:text-gray-100">Name:</span> {fileInfo.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium text-gray-900 dark:text-gray-100">Type:</span> {fileInfo.type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium text-gray-900 dark:text-gray-100">Size:</span> {(fileInfo.size / 1024).toFixed(1)} KB</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-medium text-gray-900 dark:text-gray-100">Dimensions:</span> {fileInfo.dimensions.width} × {fileInfo.dimensions.height}</p>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Base64 output is roughly {(base64Only.length / Math.max(fileInfo.size, 1) * 100).toFixed(0)}% of the original bytes, usually about 33% larger once encoded.</p>
            </Panel>
          )}

          {dataUrl && (
            <>
              <Panel>
                <img src={dataUrl} alt="Preview" className="max-h-64 rounded-2xl border border-gray-200 dark:border-gray-700 mx-auto" />
              </Panel>
              <Panel>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Full Data URL</p>
                      <CopyButton text={dataUrl} label="Copy" />
                    </div>
                    <textarea className="textarea-field min-h-[120px]" readOnly value={dataUrl} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Base64 only</p>
                      <CopyButton text={base64Only} label="Copy" />
                    </div>
                    <textarea className="textarea-field min-h-[120px]" readOnly value={base64Only} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <CopyButton text={`<img src="${dataUrl}" alt="" />`} label="Copy as HTML img tag" />
                    <CopyButton text={`background-image: url('${dataUrl}');`} label="Copy as CSS background" />
                  </div>
                </div>
              </Panel>
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}