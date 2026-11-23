import { useId, useRef, useState } from 'react'
import { FileText, Paperclip, X } from 'lucide-react'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Single-file picker with drag & drop, a removable "selected file" chip and
 * inline errors. Controlled: pass `file` and `onChange(file | null)`.
 */
export default function FileField({ label, hint, accept, file, onChange, error, className = '' }) {
  const id = useId()
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const describedBy = error ? `${id}-error` : `${id}-hint`

  function clear() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
    inputRef.current?.focus()
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) onChange(dropped)
  }

  return (
    <div className={className}>
      <p className="mb-2 text-sm font-medium text-fog-100" id={`${id}-label`}>
        {label}
      </p>

      {/* The real input stays in the DOM (visually hidden) so keyboard and screen-reader users can use it. */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="peer sr-only"
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {file ? (
        <div
          className={`flex items-center gap-3 rounded-2xl border bg-ink-950/60 px-4 py-3 ${error ? 'border-rose-400/70' : 'hairline'}`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20">
            <FileText size={18} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium text-fog-100">{file.name}</span>
            <span className="text-xs text-fog-500">{formatBytes(file.size)}</span>
          </span>
          <button
            type="button"
            onClick={clear}
            aria-label={`Remove ${file.name}`}
            className="grid size-9 shrink-0 place-items-center rounded-full border hairline text-fog-300 transition hover:border-rose-400/50 hover:text-rose-300"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed px-4 py-4 transition peer-focus-visible:border-brand-400/60 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/15 hover:border-brand-400/50 hover:bg-white/3 ${
            dragging ? 'border-brand-400/70 bg-brand-500/5' : error ? 'border-rose-400/70' : 'border-white/15'
          }`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-fog-300">
            <Paperclip size={18} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium text-fog-100">
              Choose a file <span className="font-normal text-fog-500">or drop it here</span>
            </span>
            <span className="block text-xs text-fog-500">{hint}</span>
          </span>
        </label>
      )}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="sr-only">
          {hint}
        </p>
      )}
    </div>
  )
}
