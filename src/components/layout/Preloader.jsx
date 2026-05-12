import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const NAME = 'MADJID ALLOUTI'

/* Messages terminal affichés selon la progression */
const MESSAGES = [
  { at:  0, text: '> Initialisation du réseau...'   },
  { at: 25, text: '> Résolution des routes...'       },
  { at: 50, text: '> Chargement des interfaces...'   },
  { at: 75, text: '> Authentification en cours...'   },
  { at: 95, text: '> Connexion établie.'             },
]

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [exiting,  setExiting]  = useState(false)
  const calledRef = useRef(false)  /* garde-fou : onComplete appelé une seule fois */

  /* ── Progression non-linéaire : rapide → lente ── */
  useEffect(() => {
    let current = 0
    let timerId

    const tick = () => {
      const step = current < 70 ? 3 : current < 90 ? 1.5 : 0.5
      current = Math.min(100, current + step)
      setProgress(Math.floor(current))
      if (current >= 100) {
        setTimeout(() => setExiting(true), 380)
      } else {
        timerId = setTimeout(tick, 26)
      }
    }

    timerId = setTimeout(tick, 180)
    return () => clearTimeout(timerId)
  }, [])

  /* Appelé quand l'animation de sortie est terminée */
  const handleExitDone = useCallback(() => {
    if (!calledRef.current) {
      calledRef.current = true
      onComplete()
    }
  }, [onComplete])

  /* Message courant */
  const msg = MESSAGES.reduce((acc, m) => (progress >= m.at ? m.text : acc), MESSAGES[0].text)

  /* Barre de progression [████────] */
  const filled = Math.min(10, Math.floor(progress / 10))
  const bar    = '█'.repeat(filled) + '─'.repeat(10 - filled)

  const panelBase = {
    position:   'fixed',
    left:       0,
    right:      0,
    background: '#09090B',
    zIndex:     9999,
  }

  return (
    <>
      {/* ── Panneau supérieur — sort vers le haut ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: exiting ? '-100%' : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => exiting && handleExitDone()}
        style={{ ...panelBase, top: 0, height: '50vh' }}
      />

      {/* ── Panneau inférieur — sort vers le bas ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: exiting ? '100%' : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ ...panelBase, bottom: 0, height: '50vh' }}
      />

      {/* ── Contenu centré (z-index supérieur aux deux panneaux) ── */}
      <motion.div
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         10000,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '2.5rem',
          pointerEvents:  'none',
        }}
      >
        {/* Nom — révélation lettre par lettre */}
        <div style={{ display: 'flex', alignItems: 'center' }} aria-label={NAME} role="heading">
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.048, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily:    'var(--font-heading)',
                fontSize:      'clamp(1.6rem, 5vw, 3rem)',
                fontWeight:    700,
                color:         '#FAFAFA',
                letterSpacing: '0.07em',
                display:       'inline-block',
                width:         char === ' ' ? '0.45em' : 'auto',
              }}
            >
              {char !== ' ' && char}
            </motion.span>
          ))}
        </div>

        {/* Terminal : message + barre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>
            {msg}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-cyan)' }}>
            [{bar}] {progress}%
          </p>
        </motion.div>
      </motion.div>
    </>
  )
}
