import { useEffect } from 'react'
import Lenis from 'lenis'

/* Hook qui initialise Lenis (smooth scroll) au montage
   et nettoie proprement au démontage. */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // Courbe d'accélération douce type "ease-out expo"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Boucle RAF — Lenis a besoin d'être appelé à chaque frame
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
