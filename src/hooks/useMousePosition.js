import { useEffect, useState } from 'react'

/* Hook qui retourne la position courante de la souris.
   Utile pour les effets magnétiques, le parallax et le curseur custom. */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}
