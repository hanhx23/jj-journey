import { useEffect, useRef, useState } from 'react'

/* "View certificate" button + a popup that shows the PDF inside the page.
   <CertificateViewer src="/assets/certificates/frontend-developer.pdf" title="..." />
   ratio: "297 / 210" = A4 landscape (default), "210 / 297" = A4 portrait */

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
    strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export default function CertificateViewer({
  src,
  title = 'Certificate',
  label = 'View Certificate',
  ratio = '297 / 210',
}) {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const [open, setOpen] = useState(false)

  // Chrome on Android can't show a PDF inside the page, so there the button just opens the file.
  const canEmbed = typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    if (open) {
      if (!dialog.open) dialog.showModal()
      closeRef.current?.focus()
    } else if (dialog.open) {
      dialog.close()
    }
    // locks page scroll and swaps the custom cursor for the normal one (see index.css)
    document.documentElement.classList.toggle('cert-lock', open)
    return () => document.documentElement.classList.remove('cert-lock')
  }, [open])

  // runs however the popup closes: X button, Esc, or a click on the dark area
  const handleClose = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const fileName = src.split('/').pop()

  if (!canEmbed) {
    return (
      <a className="cert-trigger" href={src} target="_blank" rel="noopener noreferrer" data-cursor="open PDF">
        <DocIcon />
        {label}
      </a>
    )
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="cert-trigger"
        aria-haspopup="dialog"
        data-cursor="view PDF"
        onClick={() => setOpen(true)}
      >
        <DocIcon />
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className="cert-dialog"
        aria-label={title}
        style={{ '--cert-ratio': ratio }}
        onClose={handleClose}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
      >
        <div className="cert-dialog__panel">
          {/* a div, not <header>: the site styles every <header> as the fixed top nav */}
          <div className="cert-dialog__bar">
            <p className="cert-dialog__title">{title}</p>
            <div className="cert-dialog__actions">
              <a className="cert-dialog__link-tab" href={src} target="_blank" rel="noopener noreferrer">New Tab</a>
              <a href={src} download={fileName}>Download</a>
              <button
                ref={closeRef}
                type="button"
                className="cert-dialog__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* the PDF only loads once someone opens the popup */}
          {open && (
            <iframe
              className="cert-dialog__frame"
              src={`${src}#toolbar=0&navpanes=0&view=FitH`}
              title={title}
            />
          )}
        </div>
      </dialog>
    </>
  )
}
