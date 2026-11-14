import useTilt from '../hooks/useTilt.js'
import './TiltCard.css'

export default function TiltCard({ children, className = '', as: Element = 'article', label, role, onClick }) {
  const ref = useTilt()
  const handleKeyDown = (event) => {
    if (role === 'button' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      onClick?.(event)
    }
  }
  return (
    <Element ref={ref} className={`tilt-card ${className}`} aria-label={label} role={role} onClick={onClick} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="tilt-card-inner">{children}</div>
      <span className="tilt-shine" aria-hidden="true" />
    </Element>
  )
}
