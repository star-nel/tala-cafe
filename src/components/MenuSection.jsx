import { useState } from 'react'
import { categories, formatPrice, menuItems } from '../data/menu.js'
import useReveal from '../hooks/useReveal.js'
import FoodArt from './FoodArt.jsx'
import TiltCard from './TiltCard.jsx'
import './MenuSection.css'

const supportedBadges = new Set(['Best seller', 'Customer favorite', "Chef's pick", 'Local', 'Vegetarian'])

export default function MenuSection() {
  const [category, setCategory] = useState(categories[0] ?? '')
  const [headingRef, headingVisible] = useReveal()
  const visibleItems = menuItems.filter((item) => item.category === category)
  const handleTabKey = (event) => {
    if (!categories.length) return
    const currentIndex = categories.indexOf(category)
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % categories.length
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + categories.length) % categories.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = categories.length - 1
    else return
    event.preventDefault()
    const nextCategory = categories[nextIndex]
    setCategory(nextCategory)
    document.getElementById(`tab-${nextCategory.toLowerCase()}`)?.focus()
  }
  const tabId = category ? `tab-${category.toLowerCase()}` : undefined

  return (
    <section className="menu-section section-pad" id="menu" aria-labelledby="menu-title">
      <div className="content-width">
        <div ref={headingRef} className={`section-heading reveal${headingVisible ? ' is-visible' : ''}`}>
          <div><p className="eyebrow"><span /> A little something for every hour</p><h2 id="menu-title">Good things,<br /><em>made from scratch.</em></h2></div>
          <p className="section-lead">Rooted in the seasons, made with people we know, and best enjoyed at your own pace.</p>
        </div>
        <div className="menu-controls" role="tablist" aria-label="Menu categories">
          {categories.map((name) => (
            <button type="button" role="tab" id={`tab-${name.toLowerCase()}`} aria-selected={category === name} aria-controls="menu-grid" tabIndex={category === name ? 0 : -1} key={name} onKeyDown={handleTabKey} onClick={() => setCategory(name)}>{name}<span>0{menuItems.filter((item) => item.category === name).length}</span></button>
          ))}
        </div>
        <div className="menu-grid" id="menu-grid" role="tabpanel" aria-labelledby={tabId} key={category}>
          {visibleItems.length ? visibleItems.map((item, index) => (
            <TiltCard key={item.id} className="menu-card" label={`${item.name}, ${formatPrice(item.price)}`}>
              <div className={`menu-art menu-art-${item.category.toLowerCase()}`}>
                <FoodArt name={item.name} category={item.category} label={item.name} />
                {supportedBadges.has(item.badge) && <span className="menu-badge">{item.badge}</span>}
              </div>
              <div className="menu-card-copy">
                <div className="menu-title-row"><h3>{item.name}</h3><span className="item-price">{formatPrice(item.price)}</span></div>
                <p>{item.description}</p>
                <div className="menu-meta"><span>Made fresh daily</span><span className="menu-index">0{index + 1}</span></div>
              </div>
            </TiltCard>
          )) : <p className="menu-empty" role="status">Coming soon — we're putting something delicious together.</p>}
        </div>
        <p className="menu-footnote">Prepared fresh with local ingredients. Please let our team know about any dietary needs.</p>
      </div>
    </section>
  )
}
