import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Newspaper, Shield, AlertTriangle, BookOpen,
  Users, Rss, Activity, ExternalLink,
} from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { veilleTheme, veilleSources, veilleTopics } from '../../data/veille'

/* ── Map icône Lucide ── */
const ICON_MAP = { Newspaper, Shield, AlertTriangle, BookOpen, Users, Rss }

/* ── Couleurs badges catégorie sujet ── */
const TOPIC_COLORS = {
  'Sécurité': '#F59E0B',
  'Réseau':   '#06B6D4',
  'Système':  '#3B82F6',
  'Cloud':    '#8B5CF6',
}

/* ── Formate "2024-09" → "septembre 2024" ── */
function formatSince(yearMonth) {
  const d = new Date(yearMonth + '-01')
  return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

/* ═══════════════════════════════
   Sous-header de bloc (réutilisable)
   ═══════════════════════════════ */
function BlockHeader({ icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ color: 'var(--color-cyan)', display: 'flex' }} aria-hidden="true">
        {icon}
      </span>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize:   '1.1rem',
        fontWeight: 600,
        color:      '#FAFAFA',
      }}>
        {label}
      </h3>
    </div>
  )
}

/* ═══════════════════════════════
   Carte source
   ═══════════════════════════════ */
function SourceCard({ source, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 })
  const cardRef          = useRef(null)
  const Icon             = ICON_MAP[source.icon] ?? Rss

  const onTilt = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-2px)`
  }

  const resetTilt = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        style={{
          padding:          '1.25rem',
          borderRadius:     '12px',
          background:       'rgba(17,17,21,0.65)',
          backdropFilter:   'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:           '1px solid rgba(39,39,42,0.9)',
          transition:       'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s',
          cursor:           'default',
          display:          'flex',
          flexDirection:    'column',
          gap:              '0.85rem',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${source.color}50`
          e.currentTarget.style.boxShadow   = `0 0 30px ${source.color}12`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)'
          e.currentTarget.style.boxShadow   = 'none'
          resetTilt()
        }}
      >
        {/* Icône + lien externe */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{
            width:        '40px',
            height:       '40px',
            borderRadius: '10px',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            background:   `${source.color}18`,
            border:       `1px solid ${source.color}30`,
            flexShrink:   0,
          }}>
            <Icon size={20} style={{ color: source.color }} aria-hidden="true" />
          </div>

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visiter ${source.name}`}
            style={{
              color:      'var(--color-text-subtle)',
              display:    'flex',
              alignItems: 'center',
              padding:    '0.3rem',
              borderRadius: '4px',
              transition: 'color 0.2s',
              cursor:     'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-subtle)' }}
          >
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Nom + type */}
        <div>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize:   '0.93rem',
            fontWeight: 600,
            color:      '#FAFAFA',
            lineHeight: 1.3,
          }}>
            {source.name}
          </p>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            color:         'var(--color-text-subtle)',
            marginTop:     '0.2rem',
            letterSpacing: '0.04em',
          }}>
            {source.type}
          </p>
        </div>

        {/* Badge fréquence */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          padding:       '0.2rem 0.55rem',
          background:    'rgba(6,182,212,0.1)',
          border:        '1px solid rgba(6,182,212,0.3)',
          borderRadius:  '4px',
          color:         'var(--color-cyan)',
          letterSpacing: '0.05em',
          alignSelf:     'flex-start',
        }}>
          {source.frequency}
        </span>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════
   Carte sujet de veille
   ═══════════════════════════════ */
function TopicCard({ topic, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 })
  const catColor         = TOPIC_COLORS[topic.category] ?? '#3B82F6'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding:          '1.25rem 1.5rem',
        borderRadius:     '12px',
        background:       'rgba(17,17,21,0.65)',
        backdropFilter:   'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border:           '1px solid rgba(39,39,42,0.8)',
        display:          'flex',
        flexDirection:    'column',
        gap:              '0.75rem',
        transition:       'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${catColor}35`
        e.currentTarget.style.boxShadow   = `0 0 25px ${catColor}10`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Date + badge catégorie */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            '0.5rem',
        flexWrap:       'wrap',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          color:         'var(--color-text-subtle)',
          letterSpacing: '0.06em',
        }}>
          {topic.date}
        </span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          padding:       '0.15rem 0.5rem',
          borderRadius:  '4px',
          background:    `${catColor}15`,
          border:        `1px solid ${catColor}35`,
          color:         catColor,
          letterSpacing: '0.05em',
          whiteSpace:    'nowrap',
        }}>
          {topic.category}
        </span>
      </div>

      {/* Titre */}
      <h4 style={{
        fontFamily: 'var(--font-heading)',
        fontSize:   '1rem',
        fontWeight: 600,
        color:      '#FAFAFA',
        lineHeight: 1.3,
      }}>
        {topic.title}
      </h4>

      {/* Résumé */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '0.85rem',
        color:      'var(--color-text-muted)',
        lineHeight: 1.65,
      }}>
        {topic.summary}
      </p>

      {/* Keywords */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.1rem' }}>
        {topic.keywords.map((kw) => (
          <span
            key={kw}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.62rem',
              padding:       '0.15rem 0.45rem',
              borderRadius:  '3px',
              border:        '1px solid rgba(63,63,70,0.9)',
              color:         'var(--color-text-subtle)',
              letterSpacing: '0.04em',
            }}
          >
            {kw}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════
   Section Veille technologique
   ═══════════════════════════════ */
export default function Veille() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.3 })
  const [themeRef,  themeVisible]  = useScrollReveal({ threshold: 0.15 })

  const fadeUp = (delay = 0, ref) => ({
    ref,
    initial:    { opacity: 0, y: 20 },
    animate:    headerVisible ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      id="veille"
      aria-labelledby="veille-title"
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
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '620px' }}
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
            &gt; cat veille.log
          </motion.span>

          <motion.h2
            id="veille-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:  'var(--font-heading)',
              fontSize:    'clamp(2rem,4vw,3rem)',
              fontWeight:  700,
              color:       '#FAFAFA',
              lineHeight:  1.1,
            }}
          >
            Veille technologique
          </motion.h2>

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
            Rester à jour sur les évolutions du métier.
          </motion.p>
        </div>

        {/* ── Bloc thème principal ── */}
        <motion.div
          ref={themeRef}
          initial={{ opacity: 0, y: 30 }}
          animate={themeVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display:          'flex',
            borderRadius:     '14px',
            overflow:         'hidden',
            background:       'rgba(17,17,21,0.65)',
            backdropFilter:   'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border:           '1px solid rgba(39,39,42,0.9)',
            transition:       'border-color 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'
            e.currentTarget.style.boxShadow   = '0 0 40px rgba(6,182,212,0.08)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)'
            e.currentTarget.style.boxShadow   = 'none'
          }}
        >
          {/* Barre accent cyan gauche */}
          <div style={{
            width:      '4px',
            flexShrink: 0,
            background: 'linear-gradient(to bottom, #06B6D4, rgba(6,182,212,0.2))',
          }} />

          <div style={{
            padding:       '2rem',
            display:       'flex',
            flexDirection: 'column',
            gap:           '1rem',
            flex:          1,
          }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.68rem',
              color:         'var(--color-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Thème principal
            </span>

            <h3 style={{
              fontFamily:  'var(--font-heading)',
              fontSize:    'clamp(1.25rem,3vw,1.85rem)',
              fontWeight:  600,
              color:       '#FAFAFA',
              lineHeight:  1.2,
            }}>
              {veilleTheme.mainTopic}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.88rem,1.7vw,0.97rem)',
              color:      'var(--color-text-muted)',
              lineHeight: 1.75,
              maxWidth:   '680px',
            }}>
              {veilleTheme.subtitle}
            </p>

            <span className="badge-terminal">
              Depuis {formatSince(veilleTheme.since)}
            </span>
          </div>
        </motion.div>

        {/* ── Mes sources ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <BlockHeader icon={<Rss size={16} />} label="Mes sources" />
          <div className="veille-sources-grid">
            {veilleSources.map((src, i) => (
              <SourceCard key={src.name} source={src} index={i} />
            ))}
          </div>
        </div>

        {/* ── Sujets récents ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <BlockHeader icon={<Activity size={16} />} label="Sujets récents étudiés" />
          <div className="veille-topics-grid">
            {veilleTopics.map((topic, i) => (
              <TopicCard key={topic.id} topic={topic} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
