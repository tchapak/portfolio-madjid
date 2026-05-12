import { useEffect, useRef, useState } from 'react'

/* Hook réutilisable pour déclencher une animation quand
   un élément entre dans le viewport (Intersection Observer).
   Retourne [ref, isVisible] — une fois visible, ne repasse pas à false. */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // On n'observe plus après la première apparition (optimisation)
          observer.unobserve(el)
        }
      },
      {
        threshold:   options.threshold   ?? 0.1,
        // Décale légèrement vers le bas pour que l'animation
        // se déclenche avant que l'élément touche le bas du viewport
        rootMargin:  options.rootMargin  ?? '0px 0px -60px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isVisible]
}
