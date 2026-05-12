/* ═══════════════════════════════════════════════════════
   PresentationMode.jsx — Overlay de présentation oral E6
   Top bar + Drawer + Flèches + Indicateur + Raccourcis
   ═══════════════════════════════════════════════════════ */
import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, Menu, Check,
  Monitor, Home, User, Zap, FolderOpen, Radio, GitBranch, Mail,
} from 'lucide-react'
import { usePresentationMode, SECTIONS } from '../../contexts/PresentationContext'

/* ── Icônes par section ── */
const ICONS = {
  accueil:     Home,
  apropos:     User,
  competences: Zap,
  projets:     FolderOpen,
  veille:      Radio,
  parcours:    GitBranch,
  contact:     Mail,
}

/* ── Liste des raccourcis affichés à l'entrée ── */
const SHORTCUTS_LIST = [
  { key: '→  /  Espace',  label: 'Section suivante'          },
  { key: '←  /  PageUp',  label: 'Section précédente'        },
  { key: 'S',             label: 'Ouvrir le sommaire'         },
  { key: 'Home  /  End',  label: 'Première / Dernière section'},
  { key: 'Ctrl+P',        label: 'Activer / Désactiver'       },
  { key: 'Échap',         label: 'Quitter la présentation'    },
]

/* ════════════════════════════════════════════
   Styles partagés (token design system)
   ════════════════════════════════════════════ */
const glass = {
  background:    'rgba(9, 9, 11, 0.88)',
  backdropFilter:'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
}
const borderCyan  = '1px solid rgba(6, 182, 212, 0.25)'
const fontMono    = "'JetBrains Mono Variable', monospace"
const fontHeading = "'Space Grotesk Variable', sans-serif"
const fontBody    = "'DM Sans Variable', sans-serif"
const C_CYAN      = '#06B6D4'
const C_MUTED     = '#A1A1AA'
const C_BASE      = '#09090B'
const C_TEXT      = '#FAFAFA'

/* ── Bouton iconique glassmorphism ── */
function GlassButton({ onClick, disabled, children, style = {}, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...glass,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.4rem',
        border: borderCyan,
        borderRadius: '0.5rem',
        padding: '0.45rem 0.9rem',
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? 'rgba(6,182,212,0.3)' : C_CYAN,
        fontSize: '0.8rem',
        fontFamily: fontBody,
        letterSpacing: '0.02em',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        minHeight: '36px',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

/* ── Toast temporaire ── */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', bottom: '4.5rem', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 300,
            ...glass,
            border: borderCyan,
            borderRadius: '0.5rem',
            padding: '0.55rem 1.1rem',
            fontFamily: fontMono,
            fontSize: '0.75rem',
            color: C_CYAN,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ════════════════════════════════════════════
   COMPOSANT PRINCIPAL — Overlay de présentation
   ════════════════════════════════════════════ */
export default function PresentationMode() {
  const {
    isPresentationMode,
    currentSection, currentIndex,
    visitedSections,
    exitPresentationMode,
    goToSection, goToNextSection, goToPrevSection,
    updateCurrentSection,
  } = usePresentationMode()

  const [drawerOpen,     setDrawerOpen]     = useState(false)
  const [showShortcuts,  setShowShortcuts]  = useState(false)
  const [toast,          setToast]          = useState({ visible: false, msg: '' })
  const [isMobile,       setIsMobile]       = useState(() => window.innerWidth < 640)
  const toastTimer   = useRef(null)
  const shortcutTimer= useRef(null)

  /* ── Détection responsive ── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* ── Helper toast ── */
  const showToast = useCallback((msg, duration = 3000) => {
    setToast({ visible: true, msg })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast({ visible: false, msg: '' }), duration)
  }, [])

  /* ── Entrée / sortie du mode ── */
  useEffect(() => {
    if (isPresentationMode) {
      setDrawerOpen(false)
      setShowShortcuts(true)
      shortcutTimer.current = setTimeout(() => setShowShortcuts(false), 3000)
    } else {
      setDrawerOpen(false)
      setShowShortcuts(false)
      clearTimeout(shortcutTimer.current)
    }
    return () => clearTimeout(shortcutTimer.current)
  }, [isPresentationMode])

  /* ── IntersectionObserver — section active ── */
  useEffect(() => {
    if (!isPresentationMode) return
    const observers = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) updateCurrentSection(id)
      }, {
        threshold: 0,
        rootMargin: '-20% 0px -60% 0px',
      })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [isPresentationMode, updateCurrentSection])

  /* ── Raccourcis clavier (actifs seulement en mode présentation) ── */
  useEffect(() => {
    if (!isPresentationMode) return
    const handler = e => {
      /* Ignorer si focus dans un input */
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault(); goToNextSection(); break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault(); goToPrevSection(); break
        case 'Escape':
          e.preventDefault()
          exitPresentationMode()
          showToast('Mode présentation désactivé', 1500)
          break
        case 's': case 'S':
          e.preventDefault(); setDrawerOpen(p => !p); break
        case 'Home':
          e.preventDefault(); goToSection(SECTIONS[0].id); break
        case 'End':
          e.preventDefault(); goToSection(SECTIONS[SECTIONS.length - 1].id); break
        default: break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isPresentationMode, goToNextSection, goToPrevSection,
      exitPresentationMode, goToSection, showToast])

  const isFirst = currentIndex === 0
  const isLast  = currentIndex === SECTIONS.length - 1
  const section = SECTIONS[currentIndex] ?? SECTIONS[0]

  /* Ne rien rendre hors du mode présentation */
  if (!isPresentationMode) return null

  return (
    <>
      {/* ════════════════ 1 — BARRE DU HAUT ════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        role="navigation"
        aria-label="Navigation de présentation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '56px', zIndex: 200,
          ...glass,
          borderBottom: borderCyan,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          gap: '1rem',
        }}
      >
        {/* Gauche : menu + quitter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <GlassButton
            onClick={() => setDrawerOpen(p => !p)}
            aria-label="Ouvrir le sommaire"
            aria-expanded={drawerOpen}
            style={{ padding: '0.45rem' }}
          >
            <Menu size={18} />
          </GlassButton>
          <GlassButton
            onClick={() => {
              exitPresentationMode()
              showToast('Mode présentation désactivé', 1500)
            }}
            aria-label="Quitter le mode présentation"
            style={{ gap: '0.35rem' }}
          >
            <X size={14} />
            {!isMobile && <span>Quitter</span>}
          </GlassButton>
        </div>

        {/* Centre : indicateur de section */}
        <div
          style={{
            flex: 1, textAlign: 'center',
            fontFamily: fontHeading, fontWeight: 600,
            fontSize: isMobile ? '0.75rem' : '0.85rem',
            color: C_TEXT, letterSpacing: '0.01em',
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span style={{ color: C_CYAN, fontFamily: fontMono, fontSize: '0.8em' }}>
            {currentIndex + 1}/{SECTIONS.length}
          </span>
          {' — '}
          {section.label}
        </div>

        {/* Droite : précédent / suivant */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <GlassButton
            onClick={goToPrevSection}
            disabled={isFirst}
            aria-label="Section précédente"
          >
            <ChevronLeft size={16} />
            {!isMobile && <span>Préc.</span>}
          </GlassButton>
          <GlassButton
            onClick={goToNextSection}
            disabled={isLast}
            aria-label="Section suivante"
          >
            {!isMobile && <span>Suiv.</span>}
            <ChevronRight size={16} />
          </GlassButton>
        </div>
      </motion.div>

      {/* ════════════════ 2 — FLÈCHES LATÉRALES ════════════════ */}
      {isMobile ? (
        /* Mobile : flèches en bas */
        <div style={{
          position: 'fixed', bottom: '3rem', left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between',
          padding: '0 1rem', zIndex: 200, pointerEvents: 'none',
        }}>
          {[
            { disabled: isFirst, onClick: goToPrevSection, icon: ChevronLeft, label: 'Section précédente' },
            { disabled: isLast,  onClick: goToNextSection, icon: ChevronRight, label: 'Section suivante'   },
          ].map(({ disabled, onClick, icon: Icon, label }) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.92 }}
              onClick={onClick}
              disabled={disabled}
              aria-label={label}
              style={{
                ...glass, border: borderCyan,
                borderRadius: '50%',
                width: '48px', height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: disabled ? 'default' : 'pointer',
                color: disabled ? 'rgba(6,182,212,0.25)' : C_CYAN,
                pointerEvents: 'auto',
              }}
            >
              <Icon size={22} />
            </motion.button>
          ))}
        </div>
      ) : (
        /* Desktop : flèches sur les côtés */
        <>
          {[
            { side: 'left:  1rem', disabled: isFirst, onClick: goToPrevSection, icon: ChevronLeft, label: 'Section précédente' },
            { side: 'right: 1rem', disabled: isLast,  onClick: goToNextSection, icon: ChevronRight, label: 'Section suivante'   },
          ].map(({ side, disabled, onClick, icon: Icon, label }) => {
            const [prop, val] = side.split(':').map(s => s.trim())
            return (
              <motion.button
                key={label}
                whileHover={{ scale: disabled ? 1 : 1.08 }}
                whileTap={{ scale: disabled ? 1 : 0.92 }}
                onClick={onClick}
                disabled={disabled}
                aria-label={label}
                style={{
                  position: 'fixed', top: '50%',
                  transform: 'translateY(-50%)',
                  [prop]: val,
                  zIndex: 200,
                  ...glass, border: borderCyan,
                  borderRadius: '50%',
                  width: '52px', height: '52px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: disabled ? 'default' : 'pointer',
                  color: disabled ? 'rgba(6,182,212,0.25)' : C_CYAN,
                  boxShadow: disabled ? 'none' : '0 4px 20px rgba(6,182,212,0.15)',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <Icon size={24} />
              </motion.button>
            )
          })}
        </>
      )}

      {/* ════════════════ 3 — INDICATEUR BAS ════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        style={{
          position: 'fixed', bottom: '1rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.35rem',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <span style={{
          fontFamily: fontMono, fontSize: '0.72rem',
          color: C_CYAN, letterSpacing: '0.12em',
        }}>
          {currentIndex + 1} / {SECTIONS.length}
        </span>
        {/* Barre de progression */}
        <div style={{
          width: '80px', height: '2px',
          background: 'rgba(6,182,212,0.15)',
          borderRadius: '1px', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${((currentIndex + 1) / SECTIONS.length) * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ height: '100%', background: C_CYAN, borderRadius: '1px' }}
          />
        </div>
      </motion.div>

      {/* ════════════════ 4 — DRAWER SOMMAIRE ════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Fond semi-transparent */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0, 0, 0, 0.55)',
                zIndex: 201,
              }}
              aria-hidden="true"
            />

            {/* Panneau drawer */}
            <motion.nav
              key="drawer"
              initial={{ x: isMobile ? '-100%' : -320 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? '-100%' : -320 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              role="navigation"
              aria-label="Sommaire des sections"
              style={{
                position: 'fixed',
                top: '56px', left: 0, bottom: 0,
                width: isMobile ? '100%' : '320px',
                zIndex: 202,
                ...glass,
                borderRight: isMobile ? 'none' : borderCyan,
                overflowY: 'auto',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* En-tête drawer */}
              <div style={{
                padding: '1rem 1.25rem 0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: fontMono, fontSize: '0.7rem',
                  color: C_MUTED, letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Sommaire ({SECTIONS.length} sections)
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Fermer le sommaire"
                  style={{
                    background: 'none', border: 'none',
                    cursor: 'pointer', color: C_MUTED,
                    display: 'flex', padding: '0.25rem',
                    borderRadius: '0.25rem',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Liste des sections */}
              {SECTIONS.map((s, i) => {
                const isActive  = s.id === currentSection
                const isVisited = visitedSections.has(s.id)
                const Icon      = ICONS[s.id] ?? Home
                return (
                  <button
                    key={s.id}
                    onClick={() => { goToSection(s.id); setDrawerOpen(false) }}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      display: 'flex', alignItems: 'center',
                      gap: '0.75rem', width: '100%',
                      padding: '0.9rem 1.25rem',
                      background: isActive ? 'rgba(6,182,212,0.08)' : 'transparent',
                      borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                      borderLeft: isActive
                        ? '2px solid #06B6D4'
                        : '2px solid transparent',
                      cursor: 'pointer', textAlign: 'left',
                      color: isActive ? C_CYAN : C_TEXT,
                      fontFamily: fontBody,
                      fontSize: '0.88rem',
                      transition: 'background 0.15s, color 0.15s, border-left-color 0.15s',
                      outline: 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Icon size={16} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.6 }} />
                    <span style={{ flex: 1, lineHeight: 1.3 }}>
                      <span style={{
                        fontFamily: fontMono, fontSize: '0.68rem',
                        color: C_MUTED, marginRight: '0.4em',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.label}
                    </span>
                    {isVisited && !isActive && (
                      <Check size={13} color="#22C55E" style={{ flexShrink: 0 }} />
                    )}
                    {isActive && (
                      <span style={{
                        fontSize: '0.62rem', fontFamily: fontMono,
                        color: C_CYAN, background: 'rgba(6,182,212,0.12)',
                        padding: '0.1rem 0.4rem', borderRadius: '0.25rem',
                        flexShrink: 0,
                      }}>
                        actuelle
                      </span>
                    )}
                  </button>
                )
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════ 5 — OVERLAY RACCOURCIS (3s) ════════════════ */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            key="shortcuts"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowShortcuts(false)}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 250,
              ...glass,
              border: borderCyan,
              borderRadius: '0.75rem',
              padding: '1.5rem 1.75rem',
              minWidth: '280px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.1)',
              cursor: 'pointer',
            }}
            role="dialog"
            aria-label="Raccourcis clavier disponibles"
          >
            <p style={{
              fontFamily: fontHeading, fontWeight: 700,
              color: C_TEXT, marginBottom: '0.9rem',
              fontSize: '0.92rem', letterSpacing: '0.01em',
            }}>
              Raccourcis clavier
            </p>
            {SHORTCUTS_LIST.map(({ key, label }) => (
              <div key={key} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', gap: '1.5rem',
                marginBottom: '0.45rem',
              }}>
                <code style={{
                  fontFamily: fontMono, fontSize: '0.72rem',
                  color: C_CYAN,
                  background: 'rgba(6,182,212,0.08)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  padding: '0.15rem 0.45rem', borderRadius: '0.3rem',
                  whiteSpace: 'nowrap',
                }}>
                  {key}
                </code>
                <span style={{
                  color: C_MUTED, fontSize: '0.8rem',
                  fontFamily: fontBody, textAlign: 'right',
                }}>
                  {label}
                </span>
              </div>
            ))}
            <p style={{
              color: '#52525B', fontSize: '0.65rem',
              marginTop: '0.85rem', fontFamily: fontMono,
              textAlign: 'center',
            }}>
              Clic pour fermer · se ferme dans 3s
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════ 6 — TOAST ════════════════ */}
      <Toast message={toast.msg} visible={toast.visible} />
    </>
  )
}

/* ════════════════════════════════════════════
   BOUTON D'ACTIVATION — Flottant bas-droite
   ════════════════════════════════════════════ */
export function ActivateButton() {
  const { isPresentationMode, enterPresentationMode, exitPresentationMode } = usePresentationMode()
  const [visible,     setVisible]     = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  /* Fade-in après 1s */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  /* Ctrl+P — global (actif même hors mode présentation) */
  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        isPresentationMode ? exitPresentationMode() : enterPresentationMode()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isPresentationMode, enterPresentationMode, exitPresentationMode])

  /* Invisible quand le mode est actif */
  if (isPresentationMode) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="activate-btn"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 0.6rem)',
                  right: 0,
                  ...glass,
                  border: borderCyan,
                  borderRadius: '0.4rem',
                  padding: '0.4rem 0.75rem',
                  whiteSpace: 'nowrap',
                  fontFamily: fontMono,
                  fontSize: '0.7rem',
                  color: C_CYAN,
                  pointerEvents: 'none',
                }}
              >
                Mode présentation
                <span style={{ color: C_MUTED, marginLeft: '0.35rem' }}>Ctrl+P</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={enterPresentationMode}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Activer le mode présentation (Ctrl+P)"
            style={{
              width: '48px', height: '48px',
              ...glass,
              border: '1px solid rgba(6,182,212,0.4)',
              borderRadius: '0.75rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: C_CYAN,
              boxShadow: '0 4px 24px rgba(6,182,212,0.15)',
              outline: 'none',
            }}
          >
            <Monitor size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
