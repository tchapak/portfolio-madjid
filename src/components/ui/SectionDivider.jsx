/* ═══════════════════════════════════════════════════════
   SectionDivider.jsx — Séparateur "terminal boot" entre sections
   Une ligne de commande style terminal qui se "tape" caractère
   par caractère lorsqu'elle entre dans le viewport, avec un
   curseur bloc (█) clignotant.
   prefers-reduced-motion : texte affiché en entier, sans typing.
   ═══════════════════════════════════════════════════════ */
import { useRef, useState, useEffect } from 'react'
import { useInView, motion } from 'framer-motion'

const REDUCED = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function SectionDivider({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [typed, setTyped] = useState(REDUCED ? text : '')

  useEffect(() => {
    if (!inView || REDUCED) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [inView, text])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        display:        'flex',
        justifyContent: 'center',
        padding:        '2rem 1.5rem',
      }}
    >
      <span
        style={{
          maxWidth:      '500px',
          fontFamily:    "'JetBrains Mono Variable', monospace",
          fontSize:      'clamp(0.62rem, 2.2vw, 0.75rem)',
          color:         'rgba(6, 182, 212, 0.4)',
          letterSpacing: '0.04em',
          whiteSpace:    'nowrap',
          overflow:      'hidden',
        }}
      >
        {typed}
        <motion.span
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
          style={{ marginLeft: '2px' }}
        >
          █
        </motion.span>
      </span>
    </div>
  )
}
