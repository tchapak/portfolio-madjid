import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  GraduationCap, Briefcase, Code,
  Target, Network, Crown,
} from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlitchText from '../ui/GlitchText'
import { timelineEvents } from '../../data/timeline'

/* ── Map icône Lucide ── */
const ICON_MAP = { GraduationCap, Briefcase, Code, Target, Network, Crown }

/* ── Config couleur / label par type ── */
const TYPE_CONFIG = {
  formation: { color: '#3B82F6', label: 'Formation' },
  stage:     { color: '#06B6D4', label: 'Stage'     },
  objectif:  { color: '#F59E0B', label: 'Objectif'  },
}

/* ═══════════════════════════════
   Nœud circulaire sur la ligne
   ═══════════════════════════════ */
function TimelineNode({ event, isVisible }) {
  const cfg  = TYPE_CONFIG[event.type] ?? TYPE_CONFIG.formation
  const Icon = ICON_MAP[event.icon] ?? GraduationCap

  return (
    /* paddingTop pour aligner le nœud avec le haut de la carte */
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.5rem', position: 'relative' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ position: 'relative' }}
      >
        {/* Cercle principal */}
        <div
          style={{
            width:         '46px',
            height:        '46px',
            borderRadius:  '50%',
            background:    `${cfg.color}18`,
            border:        `2px solid ${cfg.color}`,
            boxShadow:     `0 0 18px ${cfg.color}30`,
            display:       'flex',
            alignItems:    'center',
            justifyContent: 'center',
            position:      'relative',
            zIndex:        2,
          }}
          aria-hidden="true"
        >
          <Icon size={18} style={{ color: cfg.color }} />
        </div>

        {/* Ripples si événement en cours */}
        {event.current && (
          <>
            <motion.div
              style={{
                position:     'absolute',
                inset:        -7,
                borderRadius: '50%',
                border:       `2px solid ${cfg.color}`,
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              style={{
                position:     'absolute',
                inset:        -14,
                borderRadius: '50%',
                border:       `1px solid ${cfg.color}`,
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
            />
          </>
        )}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════
   Carte de contenu
   ═══════════════════════════════ */
function TimelineCard({ event, slideFrom, isVisible }) {
  const cfg = TYPE_CONFIG[event.type] ?? TYPE_CONFIG.formation

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom, y: 10 }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginTop:        '0.75rem',
        padding:          '1.25rem 1.5rem',
        borderRadius:     '12px',
        background:       'rgba(17,17,21,0.65)',
        backdropFilter:   'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border:           `1px solid ${cfg.color}25`,
        display:          'flex',
        flexDirection:    'column',
        gap:              '0.6rem',
        transition:       'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cfg.color}45`
        e.currentTarget.style.boxShadow   = `0 0 25px ${cfg.color}12`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${cfg.color}25`
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Période + badge type */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        flexWrap:       'wrap',
        gap:            '0.4rem',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          color:         'var(--color-text-subtle)',
          letterSpacing: '0.06em',
        }}>
          {event.period}
        </span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          padding:       '0.15rem 0.5rem',
          borderRadius:  '4px',
          background:    `${cfg.color}15`,
          border:        `1px solid ${cfg.color}35`,
          color:         cfg.color,
          letterSpacing: '0.04em',
          whiteSpace:    'nowrap',
        }}>
          {cfg.label}
        </span>
      </div>

      {/* Titre */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize:   '1.02rem',
        fontWeight: 600,
        color:      '#FAFAFA',
        lineHeight: 1.3,
      }}>
        {event.title}
        {/* Badge "En cours" si current */}
        {event.current && (
          <span style={{
            marginLeft:    '0.5rem',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.58rem',
            padding:       '0.1rem 0.4rem',
            borderRadius:  '3px',
            background:    'rgba(59,130,246,0.15)',
            border:        '1px solid rgba(59,130,246,0.4)',
            color:         '#3B82F6',
            verticalAlign: 'middle',
            letterSpacing: '0.04em',
          }}>
            En cours
          </span>
        )}
      </h3>

      {/* Sous-titre */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '0.82rem',
        color:      cfg.color,
        fontStyle:  'italic',
        lineHeight: 1.4,
      }}>
        {event.subtitle}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '0.83rem',
        color:      'var(--color-text-muted)',
        lineHeight: 1.65,
      }}>
        {event.description}
      </p>
    </motion.div>
  )
}

/* ═══════════════════════════════
   Événement (nœud + carte)
   — Mobile  : nœud col-1 | carte col-2
   — Desktop : alternance gauche/droite
   ═══════════════════════════════ */
function TimelineEvent({ event, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.25 })
  const isLeft           = index % 2 === 0
  /* Sur desktop la carte glisse depuis la direction correspondante */
  const slideFrom        = isLeft ? -24 : 24

  return (
    <div
      ref={ref}
      className="timeline-event"
      data-left={String(isLeft)}
      aria-label={`${event.period} — ${event.title}`}
    >
      {/* Nœud (col-2 desktop / col-1 mobile — géré en CSS) */}
      <div className="timeline-node-col">
        <TimelineNode event={event} isVisible={isVisible} />
      </div>

      {/* Carte (col variable desktop / col-2 mobile — géré en CSS) */}
      <div className="timeline-card-col">
        <TimelineCard event={event} slideFrom={slideFrom} isVisible={isVisible} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════
   Section Parcours & objectifs
   ═══════════════════════════════ */
export default function Timeline() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.3 })
  const sectionRef                 = useRef(null)

  /* Ligne verticale qui se trace au fur et à mesure du scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 0.95], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="parcours"
      aria-labelledby="timeline-title"
      style={{
        padding:         '6rem 0',
        borderTop:       '1px solid var(--color-border-subtle)',
        scrollMarginTop: '4rem',
      }}
    >
      <div
        className="container-main"
        style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}
      >

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.75rem',
              color:         'var(--color-cyan)',
              letterSpacing: '0.08em',
            }}
          >
            &gt; history --all
          </motion.span>

          <GlitchText
            tag="h2"
            id="timeline-title"
            text="Parcours & objectifs"
            style={{
              fontFamily:  'var(--font-heading)',
              fontSize:    'clamp(2rem,4vw,3rem)',
              fontWeight:  700,
              color:       '#FAFAFA',
              lineHeight:  1.1,
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.9rem,1.8vw,1.02rem)',
              color:      'var(--color-text-muted)',
              lineHeight: 1.7,
            }}
          >
            D'étudiant à architecte réseau.
          </motion.p>
        </div>

        {/* ── Track timeline ── */}
        <div className="timeline-track">

          {/* Ligne verticale animée au scroll */}
          <div className="timeline-line-wrapper" aria-hidden="true">
            <motion.div
              className="timeline-line-fill"
              style={{ scaleY: lineScale, transformOrigin: 'top' }}
            />
          </div>

          {/* Événements */}
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.id} event={event} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
