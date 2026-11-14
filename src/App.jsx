import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import MenuSection from './components/MenuSection.jsx'
import Signature from './components/Signature.jsx'
import About from './components/About.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import Reservation from './components/Reservation.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <MenuSection />
        <Signature />
        <About />
        <Gallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}
