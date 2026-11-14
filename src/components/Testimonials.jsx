import { useEffect, useState } from 'react'
import { testimonials } from '../data/testimonials.js'
import useReveal from '../hooks/useReveal.js'
import './Testimonials.css'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [ref, visible] = useReveal()
  const review = testimonials[index]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener?.('change', updatePreference)
    return () => preference.removeEventListener?.('change', updatePreference)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return undefined
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 6000)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion])

  const move = (direction) => setIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  return (
    <section className="reviews-section section-pad" id="reviews" aria-labelledby="reviews-title">
      <div className="content-width">
        <div ref={ref} className={`reviews-layout reveal${visible ? ' is-visible' : ''}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
          <div className="reviews-intro"><p className="eyebrow"><span /> Kind words from around here</p><h2 id="reviews-title">Better when<br /><em>shared.</em></h2><p>We could tell you how much we love this place. But we think our neighbors say it best.</p><div className="review-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous review">←</button><button type="button" onClick={() => move(1)} aria-label="Next review">→</button><span>{String(index + 1).padStart(2, '0')} <i>/</i> {String(testimonials.length).padStart(2, '0')}</span></div></div>
          <div className="review-card" aria-live="polite" aria-atomic="true" key={index}>
            <div className="quote-mark" aria-hidden="true">“</div>
            <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, star) => <span key={star} aria-hidden="true" />)}</div>
            <blockquote>{review.quote}</blockquote>
            <div className="review-person"><span className="person-monogram" aria-hidden="true">{review.name.slice(0, 1)}</span><span><strong>{review.name}</strong><small>{review.detail}</small></span><span className="review-verified">Local love <b aria-hidden="true" /></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
