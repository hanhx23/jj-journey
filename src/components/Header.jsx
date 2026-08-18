import { useState } from 'react'
import useScrollSpy from '../hooks/useScrollSpy'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(LINKS.map((l) => l.id))

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <header>
      <nav className="wrap">
        <a href="#" className="logo">
          <span className="dot"></span>DO MY HANH
        </a>
        <div className={`nav-links${open ? ' open' : ''}`} id="navLinks">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeId === link.id ? 'active' : ''}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-cta">Get in touch</a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  )
}
