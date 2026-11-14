import { useEffect, useRef } from 'react'
import FoodArt from './FoodArt.jsx'
import useReveal from '../hooks/useReveal.js'
import './Hero.css'

export default function Hero() {
  const stageRef = useRef(null)
  const [copyRef, visible] = useReveal()

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    let frame = 0
    const move = (event) => {
      const bounds = stage.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--stage-x', `${x * 18}px`)
        stage.style.setProperty('--stage-y', `${y * 14}px`)
      })
    }
    const reset = () => {
      cancelAnimationFrame(frame)
      stage.style.setProperty('--stage-x', '0px')
      stage.style.setProperty('--stage-y', '0px')
    }
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner content-width">
        <div ref={copyRef} className={`hero-copy reveal${visible ? ' is-visible' : ''}`}>
          <p className="eyebrow"><span /> Kape, kwento, at salu-salo</p>
          <h1 id="hero-title">A little more<br /><em>room to linger.</em></h1>
          <p className="hero-intro">Filipino comfort food, local coffee, and the kind of welcome that makes you stay for one more.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">Explore the menu <span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href="#reserve"><span className="play-mark" aria-hidden="true">↗</span> Save your seat</a>
          </div>
          <div className="hero-note"><span className="note-line" /> Open daily, from the first pour to the last plate</div>
        </div>
        <div className="hero-art-wrap">
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-stage" ref={stageRef} aria-label="Illustrations of cafe favorites">
            <div className="stage-item stage-coffee"><FoodArt name="Dirty Matcha" category="Coffee" label="Dirty Matcha" /></div>
            <div className="stage-item stage-croissant"><FoodArt name="Ensaymada French Toast" category="Breakfast" label="Ensaymada French Toast" /></div>
            <div className="stage-item stage-pasta"><FoodArt name="Pork Sisig Rice Bowl" category="Mains" label="Pork Sisig Rice Bowl" /></div>
            <div className="stage-item stage-cake"><FoodArt name="Ube Cheesecake" category="Desserts" label="Ube Cheesecake" /></div>
            <span className="stage-spark spark-one" aria-hidden="true">✳</span>
            <span className="stage-spark spark-two" aria-hidden="true">✦</span>
          </div>
          <div className="stage-caption"><span className="caption-dot" /> Made with a little extra care</div>
        </div>
      </div>
      <a className="scroll-cue" href="#menu"><span /> Scroll to savor</a>
    </section>
  )
}
