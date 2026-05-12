/* ═══════════════════════════════════════════════════════
   PresentationContext.jsx — État global du mode présentation
   Sections, navigation, état visitées
   ═══════════════════════════════════════════════════════ */
import { createContext, useContext, useState, useCallback, useMemo } from 'react'

/* IDs des sections dans l'ordre d'apparition dans le DOM */
export const SECTIONS = [
  { id: 'accueil',     label: 'Accueil'                },
  { id: 'apropos',     label: 'À propos'               },
  { id: 'competences', label: 'Compétences techniques' },
  { id: 'projets',     label: 'Projets réalisés'       },
  { id: 'veille',      label: 'Veille technologique'   },
  { id: 'parcours',    label: 'Parcours'               },
  { id: 'contact',     label: 'Contact'                },
]

const PresentationContext = createContext(null)

export function PresentationProvider({ children }) {
  const [isPresentationMode, setIsPresentationMode] = useState(false)
  const [currentSection,     setCurrentSection]     = useState('accueil')
  const [visitedSections,    setVisitedSections]    = useState(() => new Set(['accueil']))

  const currentIndex = useMemo(
    () => SECTIONS.findIndex(s => s.id === currentSection),
    [currentSection]
  )

  const markVisited = useCallback((id) => {
    setVisitedSections(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  /* Scroll programmé — Lenis intercepte window.scrollTo */
  const scrollToSection = useCallback((sectionId, topBarOffset = 0) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - topBarOffset
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }, [])

  /* Met à jour la section courante sans scroll (utilisé par l'IntersectionObserver) */
  const updateCurrentSection = useCallback((id) => {
    setCurrentSection(id)
    markVisited(id)
  }, [markVisited])

  const enterPresentationMode = useCallback(() => {
    document.body.classList.add('presentation-mode')
    setIsPresentationMode(true)
  }, [])

  const exitPresentationMode = useCallback(() => {
    document.body.classList.remove('presentation-mode')
    setIsPresentationMode(false)
  }, [])

  const goToSection = useCallback((sectionId) => {
    scrollToSection(sectionId, 56) // 56px = hauteur de la barre du haut
    setCurrentSection(sectionId)
    markVisited(sectionId)
  }, [scrollToSection, markVisited])

  const goToNextSection = useCallback(() => {
    const idx = SECTIONS.findIndex(s => s.id === currentSection)
    if (idx < SECTIONS.length - 1) goToSection(SECTIONS[idx + 1].id)
  }, [currentSection, goToSection])

  const goToPrevSection = useCallback(() => {
    const idx = SECTIONS.findIndex(s => s.id === currentSection)
    if (idx > 0) goToSection(SECTIONS[idx - 1].id)
  }, [currentSection, goToSection])

  const value = useMemo(() => ({
    isPresentationMode,
    currentSection,
    currentIndex,
    visitedSections,
    enterPresentationMode,
    exitPresentationMode,
    goToSection,
    goToNextSection,
    goToPrevSection,
    updateCurrentSection,
  }), [
    isPresentationMode, currentSection, currentIndex, visitedSections,
    enterPresentationMode, exitPresentationMode,
    goToSection, goToNextSection, goToPrevSection, updateCurrentSection,
  ])

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  )
}

export function usePresentationMode() {
  const ctx = useContext(PresentationContext)
  if (!ctx) throw new Error('usePresentationMode doit être utilisé dans un PresentationProvider')
  return ctx
}
