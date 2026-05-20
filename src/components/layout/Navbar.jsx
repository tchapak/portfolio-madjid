import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Accueil',         href: '#accueil'         },
  { label: 'À propos',        href: '#apropos'          },
  { label: 'Compétences',     href: '#competences'      },
  { label: 'Projets',         href: '#projets'          },
  { label: 'Compétences E6',  href: '#competences-e6'   },
  { label: 'Veille',          href: '#veille'           },
  { label: 'Parcours',        href: '#parcours'         },
  { label: 'Contact',         href: '#contact'          },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('accueil')
  const [menuOpen,       setMenuOpen]       = useState(false)

  /* ── Détection du scroll pour activer le blur ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Section active via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.45, rootMargin: '-72px 0px 0px 0px' }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* ── Ferme le menu mobile sur resize vers desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ── Bloque le scroll du body quand le menu mobile est ouvert ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Ferme le menu mobile avec la touche Escape ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  /* ── Gestion du clic sur un lien de nav ── */
  const handleNavClick = (href) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ──────────────── Barre de navigation ──────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b'
            : ''
        }`}
        style={scrolled ? {
          background:   'rgba(9, 9, 11, 0.8)',
          borderColor:  'rgba(39, 39, 42, 0.8)',
        } : {}}
      >
        <div className="container-main flex items-center justify-between h-16">

          {/* ── Logo style prompt terminal ── */}
          <a
            href="#accueil"
            onClick={(e) => { e.preventDefault(); handleNavClick('#accueil') }}
            className="group flex items-center gap-0"
            data-cursor="hover"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}
                  className="group-hover:text-primary transition-colors duration-200">
              ~/
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)' }}
                  className="group-hover:text-primary transition-colors duration-200">
              madjid.allouti
            </span>
            {/* Curseur clignotant */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'steps(1)' }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-cyan)', marginLeft: 1 }}
            >
              _
            </motion.span>
          </a>

          {/* ── Liens desktop ── */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  data-cursor="hover"
                  className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 group"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isActive ? '#3B82F6' : '#A1A1AA',
                  }}
                >
                  {link.label}
                  {/* Soulignement slide-in au hover / actif */}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px transition-transform duration-200 origin-left"
                    style={{
                      background:    '#3B82F6',
                      transform:     isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  {/* Surcharge hover via CSS group */}
                  <style>{`
                    a:hover .underline-slide { transform: scaleX(1) !important; }
                  `}</style>
                </a>
              )
            })}
          </nav>

          {/* ── Bouton hamburger (mobile) ── */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            data-cursor="hover"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block w-5 h-px origin-center"
              style={{ background: 'var(--color-text-primary)' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px"
              style={{ background: 'var(--color-text-primary)' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block w-5 h-px origin-center"
              style={{ background: 'var(--color-text-primary)' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ──────────────── Menu mobile overlay ──────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(9, 9, 11, 0.97)', backdropFilter: 'blur(20px)' }}
          >
            {/* Liens staggered */}
            <nav className="flex flex-col items-center gap-8" role="navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize:   'clamp(1.75rem, 5vw, 2.5rem)',
                    fontWeight: 700,
                    color:      activeSection === link.href.slice(1) ? '#3B82F6' : '#FAFAFA',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Badge terminal en bas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="absolute bottom-10 badge-terminal"
            >
              BTS SIO · SISR · 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
