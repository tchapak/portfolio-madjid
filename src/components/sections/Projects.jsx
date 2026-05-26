/* POUR MODIFIER TES PROJETS : éditer src/data/projects.js */
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import GlitchText from '../ui/GlitchText'
import { PROJECTS, CATEGORY_COLORS } from '../../data/projects'
import ProjectModal from '../ui/ProjectModal'

/* ── Ping animé "UP" ── */
function UpPing() {
  return (
    <div className="glow-pulse" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} aria-label="Projet en ligne">
      <div style={{ position: 'relative', width: 8, height: 8 }}>
        <motion.div
          animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981' }}
        />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981', zIndex: 1 }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#10B981', letterSpacing: '0.06em' }}>UP</span>
    </div>
  )
}

/* ── Carte projet ── */
function ProjectCard({ project, onOpen }) {
  const cardRef    = useRef(null)
  const color      = CATEGORY_COLORS[project.category] ?? '#3B82F6'
  const visibleTechs = project.technologies.slice(0, 3)
  const extraCount   = project.technologies.length - 3

  const onTilt = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-3px)`
  }

  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}50`
        e.currentTarget.style.boxShadow   = `0 0 40px ${color}12`
      }}
      onClick={() => onOpen(project)}
      data-cursor="hover"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(project)}
      aria-label={`Voir le projet : ${project.title}`}
      style={{
        background:    'rgba(17,17,21,0.7)',
        border:        '1px solid var(--color-border-subtle)',
        borderRadius:  '12px',
        overflow:      'hidden',
        cursor:        'pointer',
        transition:    'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s',
        display:       'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image 16:9 */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={project.image}
          alt={`Visuel du projet ${project.title}`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        />
        {/* Badge catégorie */}
        <div style={{
          position:    'absolute', top: '0.75rem', left: '0.75rem',
          fontFamily:  'var(--font-mono)', fontSize: '0.62rem', padding: '0.15rem 0.5rem',
          borderRadius: '4px', background: `${color}22`, border: `1px solid ${color}45`,
          color,       letterSpacing: '0.07em',
        }}>
          {project.category}
        </div>
        {/* Ping UP */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          <UpPing />
        </div>
      </div>

      {/* Contenu texte */}
      <div className="project-card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#FAFAFA', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--color-text-muted)', lineHeight: 1.6, flex: 1 }}>
          {project.shortDescription}
        </p>

        {/* Badges technos */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {visibleTechs.map(tech => (
            <span key={tech} style={{
              fontFamily:    'var(--font-mono)', fontSize: '0.65rem',
              padding:       '0.15rem 0.5rem', borderRadius: '3px',
              background:    'rgba(39,39,42,0.8)', border: '1px solid var(--color-border-subtle)',
              color:         'var(--color-text-subtle)',
            }}>
              {tech}
            </span>
          ))}
          {extraCount > 0 && (
            <span style={{
              fontFamily:  'var(--font-mono)', fontSize: '0.65rem',
              padding:     '0.15rem 0.5rem', borderRadius: '3px',
              background:  `${color}15`, border: `1px solid ${color}30`, color,
            }}>
              +{extraCount}
            </span>
          )}
        </div>

        {/* Footer carte */}
        <div style={{
          display:        'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop:     '0.75rem', borderTop: '1px solid var(--color-border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={12} style={{ color: 'var(--color-text-subtle)' }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-text-subtle)' }}>
              {project.duration}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', transition: 'color 0.2s' }}
            className="card-cta">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Voir détails
            </span>
            <ChevronRight size={13} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Catégories de filtres ── */
const FILTERS = ['Tous', ...Object.keys(CATEGORY_COLORS)]

/* ── Section Projets ── */
export default function Projects() {
  const [activeFilter,  setActiveFilter]  = useState('Tous')
  const [selectedProject, setSelectedProject] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.3 })

  const filteredProjects = activeFilter === 'Tous'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  return (
    <section
      id="projets"
      aria-labelledby="projects-title"
      style={{
        padding:    '6rem 0',
        borderTop:  '1px solid var(--color-border-subtle)',
        scrollMarginTop: '4rem',
      }}
    >
      <div className="container-main" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Header */}
        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)', letterSpacing: '0.08em' }}
          >
            &gt; ls /projects
          </motion.span>

          <GlitchText
            tag="h2"
            id="projects-title"
            text="Projets réalisés"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#FAFAFA', lineHeight: 1.1 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem,1.8vw,1.02rem)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}
          >
            Infrastructures conçues, déployées et maintenues.
          </motion.p>
        </div>

        {/* Filtres par catégorie — scroll horizontal sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="filter-scroll"
          role="group"
          aria-label="Filtrer les projets par catégorie"
        >
          {FILTERS.map(filter => {
            const isActive = activeFilter === filter
            const filterColor = CATEGORY_COLORS[filter]
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={isActive}
                data-cursor="hover"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.82rem',
                  fontWeight:    isActive ? 600 : 400,
                  padding:       '0.55rem 1rem',
                  minHeight:     '44px',
                  borderRadius:  '999px',
                  whiteSpace:    'nowrap',
                  flexShrink:    0,
                  border:        `1px solid ${isActive ? (filterColor ?? '#3B82F6') : 'var(--color-border-subtle)'}`,
                  background:    isActive
                    ? (filterColor ? `${filterColor}22` : 'rgba(59,130,246,0.15)')
                    : 'transparent',
                  color:         isActive ? (filterColor ?? '#3B82F6') : 'var(--color-text-muted)',
                  cursor:        'pointer',
                  transition:    'all 0.2s ease',
                }}
              >
                {filter}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grille de projets avec layout animation */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,380px),1fr))', gap: '1.25rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{ opacity: 0, scale: 0.93,    y: 16 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modale détail */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
