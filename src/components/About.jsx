import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import FoodArt from './FoodArt.jsx'
import './About.css'

const stats = [
  { value: 12, suffix: '', label: 'years around the table' },
  { value: 86, suffix: 'k', label: 'cups poured with care' },
  { value: 24, suffix: 'k', label: 'happy guests & counting' },
]

function Counter({ value, suffix, active }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return undefined
    const start = performance.now()
    const duration = 1400
    let frame
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(value * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [active, value])
  return <>{count}{suffix}</>
}

export default function About() {
  const [ref, visible] = useReveal()
  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="content-width about-layout">
        <div ref={ref} className={`about-copy reveal${visible ? ' is-visible' : ''}`}>
          <p className="eyebrow"><span /> The story behind the table</p>
          <h2 id="about-title">A neighborhood<br />kind of <em>place.</em></h2>
          <p>We opened our doors with one simple idea: good food brings people closer. A dozen years later, we still start each morning at the market, make everything we can by hand, and leave the lights on for one more conversation.</p>
          <a className="text-link" href="#gallery">A look around <span aria-hidden="true">↗</span></a>
          <div className="about-stats">
            {stats.map((stat) => <div className="stat" key={stat.label}><strong><Counter value={stat.value} suffix={stat.suffix} active={visible} /><span>+</span></strong><span>{stat.label}</span></div>)}
          </div>
        </div>
        <div className="about-visual" aria-hidden="true">
          <div className="about-frame"><FoodArt type="toast" label="Fresh garden toast" /></div>
          <div className="about-circle"><span>Good food.<br />Good company.</span><span className="about-circle-icon">✳</span></div>
          <span className="about-vertical">Gather around · since 2014</span>
        </div>
      </div>
    </section>
  )
}
