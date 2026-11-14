import { formatPrice, menuItems } from '../data/menu.js'
import FoodArt from './FoodArt.jsx'
import TiltCard from './TiltCard.jsx'
import useReveal from '../hooks/useReveal.js'
import './Signature.css'

export default function Signature() {
  const [ref, visible] = useReveal()
  const signatureItem = menuItems.find((item) => item.id === 'c3')
    ?? menuItems.find((item) => item.id === 'm5')
  const highlights = signatureItem?.id === 'c3'
    ? ['Matcha', 'Espresso', 'Steamed milk']
    : signatureItem ? ['Pork sisig', 'Garlic rice', 'Calamansi'] : []

  return (
    <section className="signature-section section-pad" id="signature" aria-labelledby="signature-title">
      <div className="content-width">
        <div ref={ref} className={`signature-layout reveal${visible ? ' is-visible' : ''}`}>
          <div className="signature-copy">
            <p className="eyebrow"><span /> A Filipino cafe favorite</p>
            {signatureItem ? (
              <>
                <p className="signature-kicker">Made for your next visit <span>№ 01</span></p>
                <h2 id="signature-title">{signatureItem.name}</h2>
                <p className="signature-description">{signatureItem.description}</p>
                <div className="ingredient-list" aria-label="Dish highlights">
                  {highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                </div>
                <div className="signature-bottom"><span>Made fresh to order</span><strong>{formatPrice(signatureItem.price)}</strong></div>
                <a className="text-link" href="#reserve">Come taste it <span aria-hidden="true">↗</span></a>
              </>
            ) : (
              <>
                <p className="signature-kicker">A little something special</p>
                <h2 id="signature-title">Coming soon</h2>
                <p className="signature-description">Our featured cafe favorite will be back on the menu soon.</p>
              </>
            )}
          </div>
          {signatureItem && (
            <TiltCard className="signature-card" label={`${signatureItem.name} signature dish`}>
              <div className="signature-card-glow" />
              <FoodArt name={signatureItem.name} category={signatureItem.category} label={signatureItem.name} />
              <span className="dish-stamp">A house<br />favorite</span>
              <span className="dish-sprig" aria-hidden="true" />
            </TiltCard>
          )}
        </div>
      </div>
    </section>
  )
}
