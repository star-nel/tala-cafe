import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-width">
        <div className="footer-main">
          <div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">tala <i>cafe</i></span></a><p>A neighborhood place for good food<br />and the people you love.</p></div>
          <div className="footer-column"><h2>Come by</h2><address>Makati City<br />Metro Manila, Philippines<br /><a href="tel:+63285550148">+63 2 8555 0148</a></address></div>
          <div className="footer-column"><h2>When we're here</h2><p>Every day<br />8:00 am — 10:00 pm</p><small>Kitchen closes at 9:30 pm</small></div>
          <div className="footer-column"><h2>Stay a while</h2><div className="social-links"><a href="#" aria-label="Instagram">ig <span>↗</span></a><a href="#" aria-label="Facebook">fb <span>↗</span></a><a href="#" aria-label="Pinterest">pin <span>↗</span></a></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Tala Cafe. Made with care.</span><a href="#home">Back to the top ↑</a><span>Good things take time.</span></div>
      </div>
    </footer>
  )
}
