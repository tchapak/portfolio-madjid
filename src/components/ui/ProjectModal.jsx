import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Clock, Calendar, ExternalLink, FileText, ArrowUpRight } from 'lucide-react'
import { CATEGORY_COLORS } from '../../data/projects'
import { useIsMobile } from '../../hooks/useIsMobile'

/* ── Ping "UP" ── */
function UpPing() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ position: 'relative', width: 10, height: 10 }}>
        <motion.div
          animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981' }}
        />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981', zIndex: 1 }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10B981', letterSpacing: '0.06em' }}>UP</span>
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  const color    = CATEGORY_COLORS[project?.category] ?? '#3B82F6'
  const isMobile = useIsMobile()

  /* Fermeture via Escape */
  const handleKey = useCallback((e) => { if (e.key === 'Escape') onClose() }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  if (!project) return null

  return (
    <AnimatePresence>
      {/* ── Overlay ── */}
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="presentation"
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         1000,
          background:     'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display:        'flex',
          alignItems:     isMobile ? 'flex-end'  : 'center',
          justifyContent: 'center',
          padding:        isMobile ? '0'         : '1rem',
        }}
      >
        {/* ── Panel modal ── */}
        <motion.div
          key="modal-content"
          initial={isMobile
            ? { opacity: 0, y: 60 }
            : { opacity: 0, scale: 0.94, y: 20 }}
          animate={isMobile
            ? { opacity: 1, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }}
          exit={isMobile
            ? { opacity: 0, y: 60 }
            : { opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          style={{
            width:        '100%',
            maxWidth:     isMobile ? '100%'  : '900px',
            maxHeight:    isMobile ? '92dvh' : '90vh',
            overflowY:    'auto',
            background:   '#111115',
            border:       isMobile ? 'none' : '1px solid var(--color-border-visible)',
            borderRadius: isMobile ? '16px 16px 0 0' : '16px',
            position:     'relative',
          }}
        >
          {/* ── Bouton fermer (44×44 minimum pour touch) ── */}
          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre de détail du projet"
            data-cursor="hover"
            style={{
              position:      'absolute',
              top:           '0.75rem',
              right:         '0.75rem',
              zIndex:        10,
              width:         '44px',
              height:        '44px',
              borderRadius:  '50%',
              border:        '1px solid var(--color-border-visible)',
              background:    'rgba(17,17,21,0.9)',
              color:         'var(--color-text-muted)',
              display:       'flex',
              alignItems:    'center',
              justifyContent: 'center',
              cursor:        'pointer',
              transition:    'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color       = '#FAFAFA'
              e.currentTarget.style.borderColor = 'var(--color-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color       = 'var(--color-text-muted)'
              e.currentTarget.style.borderColor = 'var(--color-border-visible)'
            }}
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>

          {/* ── Image hero ── */}
          <div style={{
            width:        '100%',
            aspectRatio:  '16/6',
            overflow:     'hidden',
            borderRadius: isMobile ? '16px 16px 0 0' : '16px 16px 0 0',
            position:     'relative',
          }}>
            <img
              src={project.image}
              alt={`Illustration du projet : ${project.title}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position:   'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 50%, rgba(17,17,21,0.9) 100%)',
            }} />
          </div>

          {/* ── Contenu ── */}
          <div style={{ padding: isMobile ? '1.25rem' : '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* En-tête */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{
                  fontFamily:   'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.6rem',
                  borderRadius: '4px', background: `${color}18`, border: `1px solid ${color}40`,
                  color,        letterSpacing: '0.07em',
                }}>
                  {project.category}
                </span>
                <UpPing />
              </div>

              {/* h2 accessible via aria-labelledby */}
              <h2
                id="modal-project-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize:   'clamp(1.25rem,3vw,2rem)',
                  fontWeight: 700,
                  color:      '#FAFAFA',
                  lineHeight: 1.2,
                  paddingRight: '2.5rem', /* espace pour le bouton close */
                }}
              >
                {project.title}
              </h2>

              {/* Méta-infos */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {[
                  { icon: FileText,  text: project.context  },
                  { icon: Clock,     text: project.duration  },
                  { icon: Calendar,  text: project.date      },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Icon size={14} style={{ color: 'var(--color-text-subtle)' }} aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-subtle)' }} />

            {/* Problématique */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Problématique
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Solution apportée
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
                {project.solution}
              </p>
            </div>

            {/* Technologies */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Technologies utilisées
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.technologies.map(tech => (
                  <span key={tech} style={{
                    fontFamily:    'var(--font-mono)', fontSize: '0.72rem',
                    padding:       '0.25rem 0.65rem', borderRadius: '4px',
                    background:    'rgba(39,39,42,0.6)', border: '1px solid var(--color-border-subtle)',
                    color:         'var(--color-text-muted)', letterSpacing: '0.03em',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Compétences E6 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Compétences E6 validées
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                {project.skills.map(skill => (
                  <li key={skill} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <Check size={14} strokeWidth={2.5} style={{ color: 'var(--color-cyan)', marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Points clés */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Points clés &amp; Résultats
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                {project.highlights.map(h => (
                  <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color, fontSize: '0.7rem', marginTop: '0.2rem', flexShrink: 0 }} aria-hidden="true">▸</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#FAFAFA' }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Liens */}
            {(project.links.github || project.links.demo || project.links.documentation) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', minHeight: '44px', padding: '0 0.25rem' }}
                    data-cursor="hover">
                    <ArrowUpRight size={14} aria-hidden="true" /> GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', minHeight: '44px', padding: '0 0.25rem' }}
                    data-cursor="hover">
                    <ExternalLink size={14} aria-hidden="true" /> Démo live
                  </a>
                )}
                {project.links.documentation && (
                  <a href={project.links.documentation} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', minHeight: '44px', padding: '0 0.25rem' }}
                    data-cursor="hover">
                    <FileText size={14} aria-hidden="true" /> Documentation
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
