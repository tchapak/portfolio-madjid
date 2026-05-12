import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

/* Curseur personnalisé desktop uniquement (pointer: fine).
   Structure : point central précis + anneau avec spring lag.
   L'anneau affiche ">_" au survol d'éléments cliquables. */
export default function CustomCursor() {
  const [isDesktop,     setIsDesktop]     = useState(false)
  const [isVisible,     setIsVisible]     = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')

  /* ── Vérification côté client (évite le SSR mismatch) ── */
  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
  }, [])

  /* ── Motion values pour les deux éléments ── */
  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)

  /* L'anneau suit avec un spring (lag visuel intentionnel) */
  const springCfg = { damping: 28, stiffness: 220, mass: 0.5 }
  const ringX = useSpring(dotX, springCfg)
  const ringY = useSpring(dotY, springCfg)

  useEffect(() => {
    if (!isDesktop) return

    /* Masque le curseur natif */
    document.documentElement.style.cursor = 'none'

    const onMove = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      /* Détection du variant selon l'élément survolé */
      const t = e.target
      if (t.closest('[data-cursor="cta"]')) {
        setCursorVariant('cta')
      } else if (t.closest('[data-cursor="accent"]')) {
        setCursorVariant('accent')
      } else if (t.closest('a, button, [role="button"], [data-cursor="hover"]')) {
        setCursorVariant('hover')
      } else {
        setCursorVariant('default')
      }
    }

    const onLeave  = () => setIsVisible(false)
    const onEnter  = () => setIsVisible(true)

    window.addEventListener('mousemove',                 onMove,  { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [isDesktop, isVisible, dotX, dotY])

  /* ── Couleurs et tailles par variant ── */
  const variants = {
    default: { color: '#3B82F6', dotSize: 5,  ringSize: 32 },
    hover:   { color: '#3B82F6', dotSize: 3,  ringSize: 46 },
    accent:  { color: '#06B6D4', dotSize: 5,  ringSize: 36 },
    cta:     { color: '#F59E0B', dotSize: 5,  ringSize: 40 },
  }
  const v = variants[cursorVariant]

  if (!isDesktop) return null

  return (
    <div aria-hidden="true">

      {/* ── Point central (suit la souris instantanément) ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x:          dotX,
          y:          dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity:    isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{ width: v.dotSize, height: v.dotSize, backgroundColor: v.color }}
          transition={{ duration: 0.15 }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>

      {/* ── Anneau avec lag spring ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x:          ringX,
          y:          ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity:    isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width:       v.ringSize,
            height:      v.ringSize,
            borderColor: v.color,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            borderWidth:  1.5,
            borderStyle: 'solid',
            borderRadius: '50%',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
          }}
        >
          {/* Prompt ">_" — apparaît uniquement en mode hover */}
          <AnimatePresence>
            {cursorVariant === 'hover' && (
              <motion.span
                key="prompt"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1   }}
                exit={{ opacity: 0, scale: 0.6    }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '9px',
                  color:         v.color,
                  letterSpacing: '-0.5px',
                  lineHeight:    1,
                  userSelect:    'none',
                }}
              >
                {'>_'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

    </div>
  )
}
