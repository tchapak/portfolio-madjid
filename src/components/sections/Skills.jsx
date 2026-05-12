import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Network, Layers, Shield, Globe, Terminal } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SKILLS_CATEGORIES } from '../../data/skills'

/* Map nom d'icône → composant Lucide */
const ICON_MAP = { Server, Network, Layers, Shield, Globe, Terminal }

/* ── Barre de progression animée ── */
function SkillBar({ level, delay, color, isVisible }) {
  return (
    <div
      style={{ width: '100%', height: 3, background: 'rgba(39,39,42,0.8)', borderRadius: 2, overflow: 'hidden' }}
      role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isVisible ? `${level}%` : 0 }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height:       '100%',
          background:   `linear-gradient(90deg, var(--color-primary), var(--color-cyan))`,
          borderRadius: 2,
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}

/* ── Carte d'une catégorie de compétences ── */
function SkillCard({ category, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })
  const cardRef          = useRef(null)
  const Icon             = ICON_MAP[category.icon] ?? Server

  /* Tilt 3D au survol */
  const onTilt = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-2px)`
  }

  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        style={{
          padding:           '1.5rem',
          borderRadius:      '12px',
          background:        'rgba(17,17,21,0.65)',
          backdropFilter:    'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:            '1px solid rgba(39,39,42,0.9)',
          transition:        'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s',
          cursor:            'default',
          display:           'flex',
          flexDirection:     'column',
          gap:               '1.25rem',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${category.color}55`
          e.currentTarget.style.boxShadow   = `0 0 35px ${category.color}14`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)'
          e.currentTarget.style.boxShadow   = 'none'
          resetTilt()
        }}
      >
        {/* Header carte */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width:        '36px', height: '36px', borderRadius: '8px', display: 'flex',
              alignItems:   'center', justifyContent: 'center',
              background:   `${category.color}18`,
              border:       `1px solid ${category.color}30`,
              flexShrink:   0,
            }}>
              <Icon size={18} style={{ color: category.color }} aria-hidden="true" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#FAFAFA' }}>
              {category.title}
            </h3>
          </div>
          {/* Badge couche OSI */}
          <span style={{
            fontFamily:    'var(--font-mono)', fontSize: '0.62rem',
            padding:       '0.15rem 0.5rem', borderRadius: '4px',
            background:    `${category.color}15`, border: `1px solid ${category.color}35`,
            color:         category.color, letterSpacing: '0.06em', whiteSpace: 'nowrap',
          }}>
            {category.layerNum} · {category.layer}
          </span>
        </div>

        {/* Liste des compétences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {category.skills.map((skill, i) => (
            <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--color-text-muted)' }}>
                  {skill.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-subtle)' }}>
                  {skill.level}%
                </span>
              </div>
              <SkillBar
                level={skill.level}
                delay={index * 0.09 + i * 0.08}
                color={category.color}
                isVisible={isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section Compétences ── */
export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.3 })

  return (
    <section
      id="competences"
      aria-labelledby="skills-title"
      style={{
        padding:    '6rem 0',
        borderTop:  '1px solid var(--color-border-subtle)',
        scrollMarginTop: '4rem',
      }}
    >
      <div className="container-main" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Header section */}
        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)', letterSpacing: '0.08em' }}
          >
            &gt; skills --list
          </motion.span>

          <motion.h2
            id="skills-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#FAFAFA', lineHeight: 1.1 }}
          >
            Compétences techniques
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem,1.8vw,1.02rem)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}
          >
            Organisées par couche, comme le modèle OSI.
          </motion.p>
        </div>

        {/* Grille des cartes */}
        <div className="skills-grid">
          {SKILLS_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
