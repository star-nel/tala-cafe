import { useEffect, useState } from 'react'

export default function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveId(visible.target.id)
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
