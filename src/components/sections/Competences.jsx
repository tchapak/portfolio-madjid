/* ═══════════════════════════════════════════════════════
   Competences.jsx — Fiches de compétences BTS SIO E6
   Stats animées · Filtres · Grille de cartes · Modale PDF
   ═══════════════════════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Download, Calendar, CheckCircle, Clock, Circle } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { COMPETENCES_DATA } from '../../data/competences'

/* ── Palette des blocs ── */
const BLOC_COLORS = {
  'Bloc 1': '#3B82F6',
  'Bloc 2': '#06B6D4',
  'Bloc 3': '#F59E0B',
}

/* ── Filtres disponibles ── */
const FILTERS = [
  { label: 'Toutes',                   value: 'all',    color: '#A1A1AA' },
  { label: 'Bloc 1 — Support',         value: 'Bloc 1', color: '#3B82F6' },
  { label: 'Bloc 2 — Administration',  value: 'Bloc 2', color: '#06B6D4' },
  { label: 'Bloc 3 — Cybersécurité',   value: 'Bloc 3', color: '#F59E0B' },
]

/* ── Compteur animé (requestAnimationFrame) ── */
function useCounter(target, active) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (target === 0) { setValue(0); return }

    /* Respecte prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target); return
    }

    let startTime = null
    const duration = 1100

    const tick = (now) => {
      if (!startTime) startTime = now
      const elapsed  = Math.min((now - startTime) / duration, 1)
      const eased    = 1 - Math.pow(1 - elapsed, 3) /* ease-out cubic */
      setValue(Math.round(eased * target))
      if (elapsed < 1) requestAnimationFrame(tick)
    }

    const rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [target, active])

  return value
}

/* ── Ping animé pour les fiches validées ── */
function ValidatedPing() {
  return (
    <div
      style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position:     'absolute',
          inset:        0,
          borderRadius: '50%',
          background:   '#10B981',
        }}
      />
      <div style={{
        position:     'absolute',
        inset:        0,
        borderRadius: '50%',
        background:   '#10B981',
        zIndex:       1,
      }} />
    </div>
  )
}

/* ── Badge de statut ── */
function StatusBadge({ status }) {
  const config = {
    'validee':   { label: 'Validée',   color: '#10B981', bg: 'rgba(16,185,129,0.12)', Icon: CheckCircle },
    'en-cours':  { label: 'En cours',  color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', Icon: Clock       },
    'a-valider': { label: 'À valider', color: '#52525B', bg: 'rgba(82,82,91,0.12)',   Icon: Circle      },
  }[status] ?? { label: status, color: '#A1A1AA', bg: 'rgba(161,161,170,0.1)', Icon: Circle }

  const { label, color, bg, Icon } = config
  return (
    <div style={{
      display:      'inline-flex',
      alignItems:   'center',
      gap:          '0.3rem',
      padding:      '0.2rem 0.55rem',
      borderRadius: '999px',
      background:   bg,
      border:       `1px solid ${color}40`,
      flexShrink:   0,
    }}>
      <Icon size={10} style={{ color }} aria-hidden="true" />
      <span style={{
        fontFamily:    "'JetBrains Mono Variable', monospace",
        fontSize:      '0.62rem',
        color,
        letterSpacing: '0.04em',
        whiteSpace:    'nowrap',
      }}>
        {label}
      </span>
    </div>
  )
}

/* ── Carte de compétence ── */
function CompetenceCard({ fiche, index }) {
  const cardRef   = useRef(null)
  const blocColor = BLOC_COLORS[fiche.bloc] ?? '#3B82F6'
  const visibleTechs = fiche.technologies.slice(0, 4)
  const extraCount   = fiche.technologies.length - 4

  /* Tilt 3D au hover */
  const onTilt = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-4px)`
  }

  const resetTilt = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  /* Formattage de la date */
  const dateFormatted = fiche.date
    ? new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })
        .format(new Date(fiche.date + '-01'))
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${blocColor}50`
          e.currentTarget.style.boxShadow   = `0 0 40px ${blocColor}10`
        }}
        style={{
          background:    'rgba(17,17,21,0.75)',
          border:        `1px solid var(--color-border-subtle)`,
          borderLeft:    `3px solid ${blocColor}`,
          borderRadius:  '12px',
          padding:       '1.25rem',
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.9rem',
          cursor:        'default',
          transition:    'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s',
          height:        '100%',
        }}
      >
        {/* ── Ligne du haut : bloc + code + statut ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {/* Badge de bloc */}
            <span style={{
              fontFamily:    "'JetBrains Mono Variable', monospace",
              fontSize:      '0.6rem',
              padding:       '0.18rem 0.5rem',
              borderRadius:  '4px',
              background:    `${blocColor}18`,
              border:        `1px solid ${blocColor}40`,
              color:         blocColor,
              letterSpacing: '0.06em',
              whiteSpace:    'nowrap',
            }}>
              {fiche.bloc}
            </span>
            {/* Ping pour les validées */}
            {fiche.status === 'validee' && <ValidatedPing />}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Code de compétence */}
            <span style={{
              fontFamily:    "'JetBrains Mono Variable', monospace",
              fontSize:      '0.7rem',
              fontWeight:    700,
              color:         'var(--color-cyan)',
              letterSpacing: '0.06em',
            }}>
              {fiche.code}
            </span>
            <StatusBadge status={fiche.status} />
          </div>
        </div>

        {/* ── Titre ── */}
        <h3 style={{
          fontFamily: "'Space Grotesk Variable', sans-serif",
          fontSize:   'clamp(0.92rem, 1.8vw, 1rem)',
          fontWeight: 600,
          color:      '#FAFAFA',
          lineHeight: 1.35,
          margin:     0,
        }}>
          {fiche.title}
        </h3>

        {/* ── Description ── */}
        <p style={{
          fontFamily: "'DM Sans Variable', sans-serif",
          fontSize:   '0.82rem',
          color:      'var(--color-text-muted)',
          lineHeight: 1.65,
          margin:     0,
          flex:       1,
        }}>
          {fiche.description}
        </p>

        {/* ── Contexte du projet ── */}
        <p style={{
          fontFamily: "'DM Sans Variable', sans-serif",
          fontSize:   '0.75rem',
          color:      'var(--color-text-subtle)',
          fontStyle:  'italic',
          margin:     0,
          lineHeight: 1.5,
        }}>
          {fiche.contextProject}
        </p>

        {/* ── Badges technos ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {visibleTechs.map(tech => (
            <span key={tech} style={{
              fontFamily:  "'JetBrains Mono Variable', monospace",
              fontSize:    '0.62rem',
              padding:     '0.15rem 0.5rem',
              borderRadius:'3px',
              background:  'rgba(39,39,42,0.8)',
              border:      '1px solid var(--color-border-subtle)',
              color:       'var(--color-text-subtle)',
              whiteSpace:  'nowrap',
            }}>
              {tech}
            </span>
          ))}
          {extraCount > 0 && (
            <span style={{
              fontFamily:  "'JetBrains Mono Variable', monospace",
              fontSize:    '0.62rem',
              padding:     '0.15rem 0.5rem',
              borderRadius:'3px',
              background:  `${blocColor}12`,
              border:      `1px solid ${blocColor}30`,
              color:       blocColor,
            }}>
              +{extraCount}
            </span>
          )}
        </div>

        {/* ── Footer : date + boutons ── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          paddingTop:     '0.75rem',
          borderTop:      '1px solid var(--color-border-subtle)',
          gap:            '0.5rem',
          flexWrap:       'wrap',
        }}>
          {/* Date */}
          {dateFormatted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={11} style={{ color: 'var(--color-text-subtle)' }} aria-hidden="true" />
              <span style={{
                fontFamily:    "'JetBrains Mono Variable', monospace",
                fontSize:      '0.65rem',
                color:         'var(--color-text-subtle)',
                textTransform: 'capitalize',
              }}>
                {dateFormatted}
              </span>
            </div>
          )}

          {/* Boutons Aperçu + Télécharger */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {/* Aperçu — ouvre le PDF dans un nouvel onglet */}
            <button
              onClick={() => window.open(fiche.pdfFile, '_blank', 'noopener,noreferrer')}
              aria-label={`Aperçu de la fiche ${fiche.title} (nouvel onglet)`}
              data-cursor="hover"
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '0.3rem',
                padding:      '0.38rem 0.7rem',
                borderRadius: '6px',
                border:       `1px solid ${blocColor}35`,
                background:   `${blocColor}10`,
                color:        blocColor,
                fontFamily:   "'DM Sans Variable', sans-serif",
                fontSize:     '0.75rem',
                fontWeight:   500,
                cursor:       'pointer',
                transition:   'background 0.2s, border-color 0.2s',
                minHeight:    '32px',
                whiteSpace:   'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background   = `${blocColor}20`
                e.currentTarget.style.borderColor  = `${blocColor}60`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background   = `${blocColor}10`
                e.currentTarget.style.borderColor  = `${blocColor}35`
              }}
            >
              <Eye size={12} aria-hidden="true" />
              Aperçu
            </button>

            {/* Télécharger */}
            <a
              href={fiche.pdfFile}
              download
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Télécharger la fiche ${fiche.title}`}
              data-cursor="hover"
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '0.3rem',
                padding:        '0.38rem 0.7rem',
                borderRadius:   '6px',
                border:         '1px solid var(--color-border-subtle)',
                background:     'rgba(39,39,42,0.5)',
                color:          'var(--color-text-muted)',
                fontFamily:     "'DM Sans Variable', sans-serif",
                fontSize:       '0.75rem',
                fontWeight:     500,
                cursor:         'pointer',
                transition:     'background 0.2s, border-color 0.2s, color 0.2s',
                minHeight:      '32px',
                textDecoration: 'none',
                whiteSpace:     'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(39,39,42,0.9)'
                e.currentTarget.style.color       = '#FAFAFA'
                e.currentTarget.style.borderColor = 'rgba(63,63,70,0.9)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(39,39,42,0.5)'
                e.currentTarget.style.color       = 'var(--color-text-muted)'
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)'
              }}
            >
              <Download size={12} aria-hidden="true" />
              Télécharger
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Carte stat glassmorphism ── */
function StatCard({ label, value, color, active }) {
  const count = useCounter(value, active)

  return (
    <div style={{
      flex:          '1 1 0',
      minWidth:      '120px',
      padding:       'clamp(1rem, 2.5vw, 1.5rem)',
      borderRadius:  '12px',
      background:    'rgba(17,17,21,0.7)',
      backdropFilter:'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border:        `1px solid ${color}30`,
      textAlign:     'center',
      display:       'flex',
      flexDirection: 'column',
      gap:           '0.4rem',
    }}>
      <span style={{
        fontFamily:  "'Space Grotesk Variable', sans-serif",
        fontSize:    'clamp(2rem, 5vw, 2.8rem)',
        fontWeight:  700,
        color,
        lineHeight:  1,
        letterSpacing: '-0.02em',
      }}>
        {count}
      </span>
      <span style={{
        fontFamily:    "'JetBrains Mono Variable', monospace",
        fontSize:      '0.65rem',
        color:         'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        {label}
      </span>
    </div>
  )
}

/* ════════════════════════════════════════════
   SECTION PRINCIPALE — Compétences E6
   ════════════════════════════════════════════ */
export default function Competences() {
  const [activeFilter,   setActiveFilter]   = useState('all')
  const [headerRef,      headerVisible]     = useScrollReveal({ threshold: 0.25 })
  const [statsRef,       statsVisible]      = useScrollReveal({ threshold: 0.3 })

  const { meta, fiches } = COMPETENCES_DATA

  /* Calcul dynamique des stats depuis les statuts */
  const stats = {
    validees: fiches.filter(f => f.status === 'validee').length,
    enCours:  fiches.filter(f => f.status === 'en-cours').length,
    total:    fiches.length,
  }

  /* Filtrage des fiches */
  const filteredFiches = activeFilter === 'all'
    ? fiches
    : fiches.filter(f => f.bloc === activeFilter)

  return (
    <section
      id="competences-e6"
      aria-labelledby="competences-e6-title"
      style={{
        padding:         '6rem 0',
        borderTop:       '1px solid var(--color-border-subtle)',
        scrollMarginTop: '4rem',
      }}
    >
      <div className="container-main" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* ── En-tête ── */}
        <div
          ref={headerRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '620px' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:    "'JetBrains Mono Variable', monospace",
              fontSize:      '0.75rem',
              color:         'var(--color-cyan)',
              letterSpacing: '0.08em',
            }}
          >
            &gt; ls /competences-e6
          </motion.span>

          <motion.h2
            id="competences-e6-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:  "'Space Grotesk Variable', sans-serif",
              fontSize:    'clamp(2rem, 4vw, 3rem)',
              fontWeight:  700,
              color:       '#FAFAFA',
              lineHeight:  1.1,
              margin:      0,
            }}
          >
            Fiches de compétences
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Sans Variable', sans-serif",
              fontSize:   'clamp(0.9rem, 1.8vw, 1.02rem)',
              color:      'var(--color-text-muted)',
              lineHeight: 1.7,
              margin:     0,
            }}
          >
            {meta.description}
          </motion.p>
        </div>

        {/* ── Bloc Stats ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display:  'flex',
            gap:      '1rem',
            flexWrap: 'wrap',
          }}
          aria-label="Statistiques des compétences"
        >
          <StatCard label="Validées"  value={stats.validees} color="#10B981" active={statsVisible} />
          <StatCard label="En cours"  value={stats.enCours}  color="#F59E0B" active={statsVisible} />
          <StatCard label="Total"     value={stats.total}    color="#FAFAFA" active={statsVisible} />
        </motion.div>

        {/* ── Filtres ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="filter-scroll"
          role="group"
          aria-label="Filtrer les fiches par bloc"
        >
          {FILTERS.map(filter => {
            const isActive = activeFilter === filter.value
            return (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={isActive}
                data-cursor="hover"
                style={{
                  fontFamily:  "'DM Sans Variable', sans-serif",
                  fontSize:    '0.82rem',
                  fontWeight:  isActive ? 600 : 400,
                  padding:     '0.55rem 1rem',
                  minHeight:   '44px',
                  borderRadius:'999px',
                  whiteSpace:  'nowrap',
                  flexShrink:  0,
                  border:      `1px solid ${isActive ? filter.color : 'var(--color-border-subtle)'}`,
                  background:  isActive ? `${filter.color}18` : 'transparent',
                  color:       isActive ? filter.color : 'var(--color-text-muted)',
                  cursor:      'pointer',
                  transition:  'all 0.2s ease',
                }}
              >
                {filter.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Grille de cartes ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
              gap:                 '1.25rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredFiches.map((fiche, i) => (
                <CompetenceCard
                  key={fiche.id}
                  fiche={fiche}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Message si aucune fiche dans le filtre */}
        {filteredFiches.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily:  "'JetBrains Mono Variable', monospace",
              fontSize:    '0.78rem',
              color:       'var(--color-text-subtle)',
              textAlign:   'center',
              padding:     '3rem 0',
            }}
          >
            Aucune fiche pour ce bloc pour l'instant.
          </motion.p>
        )}

      </div>
    </section>
  )
}
