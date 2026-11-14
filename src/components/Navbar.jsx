import { useEffect, useState } from 'react'
import useScrollSpy from '../hooks/useScrollSpy.js'
import './Navbar.css'

const links = [
  ['Home', 'home'],
  ['Menu', 'menu'],
  ['Signature', 'signature'],
  ['About', 'about'],
  ['Gallery', 'gallery'],
  ['Reviews', 'reviews'],
  ['Reserve', 'reserve'],
]
const sectionIds = links.map(([, id]) => id)

export default function Navbar() {
  const activeId = useScrollSpy(sectionIds)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Tala Cafe home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">tala <i>cafe</i></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <div id="primary-navigation" className={`nav-content${menuOpen ? ' menu-open' : ''}`}>
          <div className="nav-links">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={activeId === id ? 'active' : ''} aria-current={activeId === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </div>
          <a className="nav-book" href="#reserve" onClick={() => setMenuOpen(false)}>Book a table <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  )
}
