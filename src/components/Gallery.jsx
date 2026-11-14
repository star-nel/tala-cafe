import { useEffect, useRef, useState } from 'react'
import { menuItems } from '../data/menu.js'
import FoodArt from './FoodArt.jsx'
import TiltCard from './TiltCard.jsx'
import useReveal from '../hooks/useReveal.js'
import './Gallery.css'

const galleryItems = ['c1', 'c3', 'b3', 'm5', 'd1', 'd2', 'b4', 'd6']
  .map((id) => menuItems.find((item) => item.id === id))
  .filter(Boolean)

export default function Gallery() {
  const [ref, visible] = useReveal()
  const [selected, setSelected] = useState(null)
  const closeButton = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (!selected) return undefined
    previousFocus.current = document.activeElement
    closeButton.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previousFocus.current?.focus?.()
    }
  }, [selected])

  return (
    <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
      <div className="content-width">
        <div ref={ref} className={`section-heading gallery-heading reveal${visible ? ' is-visible' : ''}`}>
          <div><p className="eyebrow"><span /> Little moments, well spent</p><h2 id="gallery-title">Come on <em>in.</em></h2></div>
          <p className="section-lead">A peek at the plates, pours, and people that make this place feel like yours.</p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <TiltCard as="div" role="button" className={`gallery-card gallery-tile gallery-tile-${index + 1}`} key={item.id} onClick={() => setSelected(item)} label={`Enlarge: ${item.name}`}>
                <div className={`gallery-art gallery-art-${index + 1}`}><FoodArt name={item.name} category={item.category} label={item.name} /></div>
                <span className="gallery-overlay"><span><small>{item.category}</small><strong>{item.name}</strong></span><i aria-hidden="true">↗</i></span>
            </TiltCard>
          ))}
        </div>
      </div>
      {selected && (
        <div className="lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
          <div className="lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
            <button ref={closeButton} className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close image">×</button>
            <div className="lightbox-art"><FoodArt name={selected.name} category={selected.category} label={selected.name} /></div>
            <p>{selected.category}</p><h3 id="lightbox-title">{selected.name}</h3>
          </div>
        </div>
      )}
    </section>
  )
}
