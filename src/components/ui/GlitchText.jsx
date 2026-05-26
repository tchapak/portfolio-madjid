/* ═══════════════════════════════════════════════════════
   GlitchText.jsx — Titre avec effet "glitch" au reveal
   Au moment où le texte entre dans le viewport :
     • tremblement (translateX aléatoire toutes les 50ms)
     • double vision : 2 copies décalées (cyan + rouge)
     • stabilisation après 0.5s → texte normal lisible
   prefers-reduced-motion : aucun glitch, texte affiché normalement.
   ═══════════════════════════════════════════════════════ */
import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

/* Évalué une seule fois — respecte le réglage OS */
const REDUCED = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function GlitchText({ text, tag = 'h2', className, style, ...rest }) {
  const Tag = tag
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const [glitching, setGlitching] = useState(false)
  const [offset,    setOffset]    = useState(0)

  useEffect(() => {
    if (!inView || REDUCED) return
    setGlitching(true)

    /* Tremblement horizontal aléatoire (-3px → +3px) toutes les 50ms */
    const jitter = setInterval(() => {
      setOffset((Math.random() - 0.5) * 6)
    }, 50)

    /* Fin du glitch après 0.5s : stabilisation + disparition des copies */
    const stop = setTimeout(() => {
      clearInterval(jitter)
      setGlitching(false)
      setOffset(0)
    }, 500)

    return () => { clearInterval(jitter); clearTimeout(stop) }
  }, [inView])

  /* Copie colorée "fantôme" (double vision) */
  const ghost = (color, dx) => (
    <span
      aria-hidden="true"
      style={{
        position:            'absolute',
        inset:               0,
        display:             'block',
        color,
        WebkitTextFillColor: color,
        mixBlendMode:        'screen',
        opacity:             0.7,
        pointerEvents:       'none',
        userSelect:          'none',
        transform:           `translateX(${offset + dx}px)`,
      }}
    >
      {text}
    </span>
  )

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ position: 'relative', ...style }}
      {...rest}
    >
      {glitching && (
        <>
          {ghost('#06B6D4', -2)}
          {ghost('#EF4444',  2)}
        </>
      )}
      <span
        style={{
          position:  'relative',
          display:   'block',
          zIndex:    1,
          transform: glitching ? `translateX(${offset}px)` : 'none',
        }}
      >
        {text}
      </span>
    </Tag>
  )
}
