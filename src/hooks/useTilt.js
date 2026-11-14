import { useEffect, useRef } from 'react'

export default function useTilt(maxTilt = 14) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let activePointer = false

    const reset = () => {
      activePointer = false
      cancelAnimationFrame(frame)
      element.style.setProperty('--tilt-x', '0deg')
      element.style.setProperty('--tilt-y', '0deg')
      element.style.setProperty('--shine-x', '50%')
      element.style.setProperty('--shine-y', '50%')
      element.dataset.tilting = 'false'
    }

    const move = (event) => {
      if (reducedMotion.matches || (event.pointerType === 'touch' && !activePointer)) return
      const bounds = element.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        element.style.setProperty('--tilt-x', `${(0.5 - y) * maxTilt}deg`)
        element.style.setProperty('--tilt-y', `${(x - 0.5) * maxTilt}deg`)
        element.style.setProperty('--shine-x', `${x * 100}%`)
        element.style.setProperty('--shine-y', `${y * 100}%`)
        element.dataset.tilting = 'true'
      })
    }
    const pointerDown = (event) => {
      activePointer = event.pointerType === 'touch'
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerdown', pointerDown)
    element.addEventListener('pointerup', reset)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('pointercancel', reset)
    reducedMotion.addEventListener?.('change', reset)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerdown', pointerDown)
      element.removeEventListener('pointerup', reset)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('pointercancel', reset)
      reducedMotion.removeEventListener?.('change', reset)
    }
  }, [maxTilt])

  return ref
}
