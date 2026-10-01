import { useState } from 'react'

const EMAIL = 'hanhdomy127@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-inner">
          <h2 className="reveal">
            Let's build the<br />next report — or<br />the next release.
          </h2>
          <div className="contact-list reveal">
            <div className="contact-row">
              <a href={`mailto:${EMAIL}`}>
                <span><span className="k">Email</span>{EMAIL}</span>
              </a>
              <button
                className={`copy-btn${copied ? ' copied' : ''}`}
                type="button"
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <a href="/assets/Do%20My%20Hanh%20-%20CV.pdf" download="Do-My-Hanh-CV.pdf">
              <span><span className="k">CV</span>Download PDF ↓</span>
            </a>
            <a href="tel:+84912762003">
              <span><span className="k">Phone</span>+84 912 762 003</span>
            </a>
            {/* plain text, not a link: href="#" used to throw visitors back to the top of the page */}
            <div className="contact-static">
              <span><span className="k">Location</span>Ho Chi Minh City, Vietnam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
