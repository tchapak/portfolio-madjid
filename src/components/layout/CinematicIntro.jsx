/* ══════════════════════════════════════════════════════════════════
   CinematicIntro.jsx
   Zoom scroll-driven en 4 étapes distinctes vers l'écran du setup.
   ══════════════════════════════════════════════════════════════════ */
import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Mouse, FastForward } from 'lucide-react'

/* ── Point de zoom : centre de l'écran courbé dans la photo ── */
const ORIGIN_X = '50%'
const ORIGIN_Y = '35%'

export default function CinematicIntro({ onComplete }) {
  const [showHint, setShowHint] = useState(true)
  const [showSkip, setShowSkip] = useState(false)

  const progressMV    = useMotionValue(0)
  const targetRef     = useRef(0)
  const rafRef        = useRef(null)
  const doneRef       = useRef(false)
  const hintDoneRef   = useRef(false)

  /* ── Courbe de zoom : scale max 3.5 — vue à 30 cm de l'écran ── */
  const scale = useTransform(
    progressMV,
    [0,  0.4, 0.8, 1  ],
    [1,  1.8, 2.8, 3.5]
  )

  /* ── Légère perte de luminosité (1 → 0.85), sans rotation ni blur ── */
  const imgFilter = useTransform(
    progressMV,
    (p) => `brightness(${(1 - p * 0.15).toFixed(3)})`
  )

  /* ── Vignette qui s'intensifie ── */
  const vignetteOpacity = useTransform(
    progressMV,
    [0,    0.2,  1],
    [0.25, 0.45, 1]
  )

  /* ── Fondu noir pour la transition Preloader (0.95 → 1.0) ── */
  const overlayOpacity = useTransform(
    progressMV,
    [0, 0.94, 1, 1],
    [0, 0,    1, 1]
  )

  /* ── RAF : lerp smooth vers la cible ── */
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      const cur  = progressMV.get()
      const next = lerp(cur, targetRef.current, 0.082)
      if (Math.abs(next - cur) > 0.0003) progressMV.set(Math.min(next, 1))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [progressMV])

  /* ── Masquage du hint à 5 %, déclenchement onComplete à 100 % ── */
  useEffect(() => {
    return progressMV.on('change', (v) => {
      if (v > 0.05 && !hintDoneRef.current) {
        hintDoneRef.current = true
        setShowHint(false)
      }
      if (v >= 1 && !doneRef.current) {
        doneRef.current = true
        onComplete()
      }
    })
  }, [progressMV, onComplete])

  /* ── Wheel + touch + blocage scroll natif ── */
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (doneRef.current) return
      /* Bloque le scroll arrière une fois dépassé 10 % */
      if (targetRef.current > 0.1 && e.deltaY < 0) return
      targetRef.current = Math.min(1, Math.max(0,
        targetRef.current + Math.min(0.025, e.deltaY * 0.001)
      ))
    }

    let lastY = 0
    const onTouchStart = (e) => { lastY = e.touches[0].clientY }
    const onTouchMove  = (e) => {
      if (doneRef.current) return
      e.preventDefault()
      const dy = lastY - e.touches[0].clientY
      lastY    = e.touches[0].clientY
      if (targetRef.current > 0.1 && dy < 0) return
      targetRef.current = Math.min(1, Math.max(0,
        targetRef.current + Math.min(0.025, dy * 0.001)
      ))
    }

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow             = 'hidden'
    window.addEventListener('wheel',      onWheel,      { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true  })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow             = ''
      window.removeEventListener('wheel',      onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
    }
  }, [])

  /* ── Bouton skip visible après 2 s ── */
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const handleSkip = () => {
    if (!doneRef.current) {
      doneRef.current = true
      sessionStorage.setItem('intro_seen', 'true')
      onComplete()
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#000', overflow: 'hidden' }}>

      {/* ── Image + zoom scroll-driven ── */}
      <motion.div
        style={{
          position:        'absolute',
          inset:           0,
          transformOrigin: `${ORIGIN_X} ${ORIGIN_Y}`,
          scale,
          filter:          imgFilter,
          willChange:      'transform, filter',
        }}
      >
        <img
          src="/setup-intro.jpg"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 40%',
            display:        'block',
          }}
        />
      </motion.div>

      {/* ── Vignette (bords sombres) ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    `radial-gradient(
            ellipse 70% 60% at ${ORIGIN_X} ${ORIGIN_Y},
            transparent 20%,
            rgba(0,0,0,0.6) 60%,
            rgba(0,0,0,0.98) 100%
          )`,
          opacity:       vignetteOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* ── Fondu noir → transition vers le Preloader ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    '#09090B',
          opacity:       overlayOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* ── Barre de progression (bas-gauche) ── */}
      <div
        aria-hidden="true"
        style={{
          position:     'absolute',
          bottom:       '1.5rem',
          left:         '1.5rem',
          width:        '80px',
          height:       '2px',
          borderRadius: '1px',
          background:   'rgba(255,255,255,0.1)',
          overflow:     'hidden',
        }}
      >
        <motion.div
          style={{
            height:          '100%',
            background:      '#06B6D4',
            scaleX:          progressMV,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* ── Indicateur scroll (disparaît à progress > 5 %) ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              position:      'absolute',
              bottom:        '2.5rem',
              left:          '50%',
              transform:     'translateX(-50%)',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           '0.45rem',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Mouse
                size={26}
                style={{ color: '#06B6D4', filter: 'drop-shadow(0 0 6px #06B6D4)' }}
                aria-hidden="true"
              />
            </motion.div>

            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              color:         '#06B6D4',
              letterSpacing: '0.14em',
              textShadow:    '0 0 12px rgba(6,182,212,0.5)',
              whiteSpace:    'nowrap',
            }}>
              Scrollez pour entrer ↓
            </span>

            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              color:         'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
              whiteSpace:    'nowrap',
            }}>
              Vous allez être propulsé dans l'écran
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton skip (apparaît après 2 s) ── */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            key="skip"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleSkip}
            aria-label="Passer l'introduction cinématique"
            style={{
              position:           'absolute',
              top:                '1.5rem',
              right:              '1.5rem',
              display:            'flex',
              alignItems:         'center',
              gap:                '0.45rem',
              padding:            '0.5rem 1rem',
              minHeight:          '44px',
              borderRadius:       '8px',
              border:             '1px solid rgba(255,255,255,0.14)',
              background:         'rgba(0,0,0,0.55)',
              backdropFilter:     'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color:              'rgba(255,255,255,0.6)',
              fontFamily:         'var(--font-body)',
              fontSize:           '0.8rem',
              cursor:             'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color       = '#FAFAFA'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color       = 'rgba(255,255,255,0.6)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
            }}
          >
            <FastForward size={13} aria-hidden="true" />
            Passer l'intro
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}
