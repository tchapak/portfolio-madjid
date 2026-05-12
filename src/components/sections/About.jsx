import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad, Dumbbell, Bike } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ── Placeholder SVG réseau (remplacé par une photo plus tard) ── */
function NetworkAvatar() {
  return (
    <svg viewBox="0 0 300 320" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }} aria-label="Topologie réseau — visuel placeholder">
      <rect width="300" height="320" fill="#111115" />
      {/* Grille de fond */}
      <line x1="0" y1="160" x2="300" y2="160" stroke="#27272A" strokeWidth="0.5" opacity="0.6" strokeDasharray="4 10" />
      <line x1="150" y1="0" x2="150" y2="320" stroke="#27272A" strokeWidth="0.5" opacity="0.6" strokeDasharray="4 10" />
      {/* Connexions */}
      {[
        [150,160, 80, 90],[150,160,220, 90],[150,160, 80,230],[150,160,220,230],
        [80, 90,150, 45],[220, 90,150, 45],[80, 90, 45,160],[80,230, 45,160],
        [220, 90,255,160],[220,230,255,160],[80,230,150,275],[220,230,150,275],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3B82F6" strokeWidth="1" opacity="0.2" />
      ))}
      {/* Nœud core */}
      <circle cx="150" cy="160" r="10" fill="#3B82F6" opacity="0.9" />
      <circle cx="150" cy="160" r="20" fill="#3B82F6" opacity="0.07" />
      <text x="150" y="185" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontFamily="monospace">CORE-01</text>
      {/* Nœuds distribution */}
      {[[80,90,'SW-01'],[220,90,'SW-02'],[80,230,'SW-03'],[220,230,'SW-04']].map(([cx,cy,label]) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="6" fill="#06B6D4" opacity="0.8" />
          <circle cx={cx} cy={cy} r="14" fill="#06B6D4" opacity="0.05" />
          <text x={cx} y={cy + 22} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="monospace">{label}</text>
        </g>
      ))}
      {/* Nœuds access */}
      {[[150,45],[45,160],[255,160],[150,275]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#3B82F6" opacity="0.45" />
      ))}
      {/* Label bas */}
      <text x="150" y="308" textAnchor="middle" fill="#3F3F46" fontSize="9" fontFamily="monospace" letterSpacing="3">
        SISR — TOPOLOGY
      </text>
    </svg>
  )
}

/* ── Compteur animé au scroll ── */
function AnimatedCounter({ target, suffix = '', symbol }) {
  const [count, setCount]   = useState(0)
  const [ref, isVisible]    = useScrollReveal({ threshold: 0.5 })
  const startedRef          = useRef(false)

  useEffect(() => {
    if (!isVisible || startedRef.current || symbol) return
    startedRef.current = true
    const duration  = 2000
    const startTime = Date.now()

    const tick = () => {
      const elapsed  = Date.now() - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased    = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [isVisible, target, symbol])

  return (
    <span ref={ref} aria-label={symbol ? symbol : `${target}${suffix}`}>
      {symbol ?? `${count}${suffix}`}
    </span>
  )
}

/* ── Données des stats ── */
const STATS = [
  { target: 2,  suffix: '',  label: 'Années de BTS'           },
  { target: 15, suffix: '+', label: 'Technologies maîtrisées' },
  { target: 5,  suffix: '+', label: 'Projets réalisés'        },
  { symbol: '∞',             label: 'Curiosité'               },
]

const PASSIONS = [
  { icon: Gamepad,  label: 'Jeux vidéo' },
  { icon: Dumbbell, label: 'Boxe'       },
  { icon: Bike,     label: 'Moto'       },
]

/* ── Section À propos ── */
export default function About() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const imgRef           = useRef(null)

  /* Effet tilt 3D sur la carte photo */
  const handleTilt = (e) => {
    const el = imgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.02)`
  }

  const resetTilt = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 30 },
    animate:    isVisible ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="apropos"
      ref={ref}
      aria-labelledby="about-title"
      style={{
        padding:    '6rem 0',
        borderTop:  '1px solid var(--color-border-subtle)',
        scrollMarginTop: '4rem',
      }}
    >
      <div className="container-main">
        <div className="about-grid">

          {/* ──────────── Colonne gauche — Visuel ──────────── */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Carte photo avec tilt */}
            <div
              ref={imgRef}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              style={{
                position:     'relative',
                aspectRatio:  '4 / 5',
                borderRadius: '12px',
                overflow:     'hidden',
                border:       '1px solid var(--color-border-subtle)',
                cursor:       'default',
                transition:   'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s',
                boxShadow:    '0 0 0 rgba(59,130,246,0)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
                e.currentTarget.style.boxShadow   = '0 0 40px rgba(59,130,246,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
                e.currentTarget.style.boxShadow   = '0 0 0 rgba(59,130,246,0)'
              }}
            >
              <NetworkAvatar />

              {/* Badge SISR */}
              <div style={{
                position:    'absolute', top: '1rem', right: '1rem',
                background:  'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.4)',
                borderRadius: '4px', padding: '0.2rem 0.6rem',
                fontFamily:  'var(--font-mono)', fontSize: '0.65rem',
                color:       '#F59E0B', letterSpacing: '0.1em',
              }}>
                SISR
              </div>

              {/* Overlay gradient bas */}
              <div style={{
                position:   'absolute', bottom: 0, left: 0, right: 0, height: '30%',
                background: 'linear-gradient(to top, rgba(9,9,11,0.8), transparent)',
              }} />
            </div>

            {/* Badges passions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {PASSIONS.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  style={{
                    display:     'flex', alignItems: 'center', gap: '0.4rem',
                    padding:     '0.4rem 0.8rem', borderRadius: '6px',
                    border:      '1px solid var(--color-border-subtle)',
                    background:  'rgba(17,17,21,0.8)',
                    cursor:      'default',
                  }}
                >
                  <Icon size={14} style={{ color: 'var(--color-cyan)' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ──────────── Colonne droite — Texte ──────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)', letterSpacing: '0.08em' }}>
                &gt; whoami
              </span>
              <h2 id="about-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#FAFAFA', lineHeight: 1.1 }}>
                À propos
              </h2>
            </motion.div>

            <motion.p {...fadeUp(0.3)} style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem,1.8vw,1.05rem)', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              Le BTS SIO a été un tremplin pour approfondir mes connaissances en informatique
              et me rapprocher de ma passion : concevoir et administrer des infrastructures réseau
              performantes. Aujourd'hui en formation SISR, je me prépare à devenir
              Administrateur Systèmes &amp; Réseaux, avec l'ambition de devenir Architecte Réseau.
            </motion.p>

            <motion.p {...fadeUp(0.4)} style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem,1.6vw,0.97rem)', color: 'var(--color-text-subtle)', lineHeight: 1.8 }}>
              En dehors du clavier, je retrouve la même discipline dans la boxe,
              la même stratégie dans les jeux vidéo, et la même liberté sur la moto.
            </motion.p>

            {/* Stats */}
            <motion.div {...fadeUp(0.5)} className="stats-grid">
              {STATS.map(({ target, suffix, symbol, label }) => (
                <div
                  key={label}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}
                  aria-label={`${symbol ?? `${target}${suffix ?? ''}`} — ${label}`}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize:   'clamp(2rem,4vw,2.8rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    <AnimatedCounter target={target ?? 0} suffix={suffix ?? ''} symbol={symbol} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
