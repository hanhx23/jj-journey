import { useEffect, useRef, useState } from 'react'
import useScrollSpy from '../hooks/useScrollSpy'
import scrollToTop from '../utils/scrollToTop'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'case-study', label: 'Case study' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
]
// contact is spied on too, so "Get in touch" lights up when you reach it
const SPY_IDS = [...LINKS.map((l) => l.id), 'contact']

export default function Header() {
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(SPY_IDS)
  const navRef = useRef(null)

  // phone menu: close on Escape, on a tap outside the header, or once you start scrolling
  useEffect(() => {
    if (!open) return undefined
    const startY = window.scrollY
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(false) }
    const onScroll = () => { if (Math.abs(window.scrollY - startY) > 40) setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  function handleLogoClick(e) {
    setOpen(false)
    scrollToTop(e)
  }

  return (
    <header>
      <nav className="wrap" ref={navRef}>
        <a href="#top" className="logo" onClick={handleLogoClick} aria-label="Do My Hanh, back to top">
          <span className="dot"></span>DO MY HANH
        </a>
        <div className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeId === link.id ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className={`nav-cta${activeId === 'contact' ? ' active' : ''}`}
          onClick={() => setOpen(false)}
        >
          Get in touch
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  )
}
