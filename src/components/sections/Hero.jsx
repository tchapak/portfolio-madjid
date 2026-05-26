import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import NetworkTopology from '../three/NetworkTopology'

const TITLE      = 'Madjid ALLOUTI'
const TYPEWRITER = 'Futur Administrateur Systèmes & Réseaux'

/* ── Bouton avec effet magnétique ── */
function MagneticButton({ children, href, 'aria-label': ariaLabel, 'data-cursor': cur, style, className }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) * 0.28
    const y = (e.clientY - r.top  - r.height / 2) * 0.28
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      data-cursor={cur}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '0.5rem',
        padding:        '0.75rem 1.75rem',
        borderRadius:   '0.5rem',
        fontFamily:     'var(--font-body)',
        fontSize:       '0.93rem',
        fontWeight:     600,
        textDecoration: 'none',
        cursor:         'pointer',
        transition:     'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s',
      }}
    >
      {children}
    </a>
  )
}

/* ── Section Hero ── */
export default function Hero({ isVisible }) {
  const [typed, setTyped] = useState('')

  /* Typewriter — démarre après l'animation du titre */
  useEffect(() => {
    if (!isVisible) return
    let i = 0
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < TYPEWRITER.length) {
          setTyped(TYPEWRITER.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, 38)
      return () => clearInterval(interval)
    }, 1400)
    return () => clearTimeout(delay)
  }, [isVisible])

  /* Helper : props fadeUp réutilisables */
  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="accueil"
      aria-label="Accueil — Madjid ALLOUTI"
      style={{
        position:       'relative',
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
        background:     'radial-gradient(ellipse at 50% 55%, rgba(59,130,246,0.07) 0%, #09090B 65%)',
      }}
    >
      {/* ── Topologie réseau 3D en fond ── */}
      <NetworkTopology isVisible={isVisible} />

      {/* ── Contenu principal ── */}
      <div style={{
        position:       'relative',
        zIndex:         1,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        textAlign:      'center',
        gap:            '1.5rem',
        padding:        '5rem 1.5rem 8rem',
        maxWidth:       '1050px',
        width:          '100%',
      }}>

        {/* Label status */}
        <motion.div {...fadeUp(0.15)}>
          <span
            className="ping-dot"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)', letterSpacing: '0.08em' }}
          >
            status: online
          </span>
        </motion.div>

        {/* ── Titre split-text ── */}
        <h1
          aria-label={TITLE}
          style={{
            fontFamily:     'var(--font-heading)',
            fontSize:       'clamp(2rem, 8vw, 6rem)',
            fontWeight:     700,
            lineHeight:     1.04,
            letterSpacing:  '-0.02em',
            display:        'flex',
            flexWrap:       'nowrap',
            justifyContent: 'center',
            gap:            '0 0',
          }}
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: 55 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 55 }}
              transition={{ delay: 0.45 + i * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display:    'inline-block',
                color:      char === char.toUpperCase() && char !== ' ' ? 'transparent' : '#FAFAFA',
                background: char === char.toUpperCase() && char !== ' '
                  ? 'linear-gradient(135deg, #FAFAFA 30%, #A1A1AA 100%)'
                  : undefined,
                WebkitBackgroundClip: char === char.toUpperCase() && char !== ' ' ? 'text' : undefined,
                WebkitTextFillColor:  char === char.toUpperCase() && char !== ' ' ? 'transparent' : '#FAFAFA',
                backgroundClip:       char === char.toUpperCase() && char !== ' ' ? 'text' : undefined,
                marginRight:          char === ' ' ? '0.3em' : '0',
              }}
            >
              {char !== ' ' ? char : ' '}
            </motion.span>
          ))}
        </h1>

        {/* ── Sous-titre typewriter ── */}
        <motion.div {...fadeUp(0.35)} style={{ minHeight: '2rem' }}>
          <p style={{
            fontFamily:    'var(--font-heading)',
            fontSize:      'clamp(0.95rem, 2.5vw, 1.3rem)',
            fontWeight:    600,
            color:         'var(--color-primary)',
            letterSpacing: '0.01em',
          }}>
            {typed}
            {/* Curseur clignotant du typewriter */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'steps(1)' }}
              style={{ color: 'var(--color-cyan)', marginLeft: 2 }}
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* ── Bio ── */}
        <motion.p {...fadeUp(0.65)} style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'clamp(0.88rem, 1.8vw, 1.02rem)',
          color:      'var(--color-text-muted)',
          lineHeight: 1.75,
          maxWidth:   '560px',
        }}>
          BTS SIO — Option SISR · Passionné par les infrastructures réseau,
          je conçois et administre les systèmes qui font tenir le numérique debout.
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          {...fadeUp(0.9)}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <MagneticButton
            href="#projets"
            aria-label="Voir mes projets"
            data-cursor="cta"
            className="glow-pulse"
            style={{
              color:      '#FAFAFA',
              background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
              border:     'none',
            }}
          >
            Découvrir mes projets
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            aria-label="Me contacter"
            data-cursor="hover"
            className="glow-pulse"
            style={{
              color:      'var(--color-text-primary)',
              background: 'transparent',
              border:     '1px solid rgba(59,130,246,0.4)',
            }}
          >
            Me contacter
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Indicateur de scroll ── */}
      <motion.div
        {...fadeUp(1.2)}
        style={{
          position:      'absolute',
          bottom:        '2.5rem',
          left:          '50%',
          transform:     'translateX(-50%)',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '0.3rem',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} strokeWidth={1.5} style={{ color: 'var(--color-text-subtle)' }} />
        </motion.div>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         'var(--color-text-subtle)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          scroll
        </span>
      </motion.div>
    </section>
  )
}
