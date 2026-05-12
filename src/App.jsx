/* ═══════════════════════════════════════════════════════
   App.jsx — Racine de l'application

   POUR MODIFIER TES CONTENUS, éditez les fichiers :
     • src/data/projects.js   → projets
     • src/data/skills.js     → compétences
     • src/data/veille.js     → veille technologique
     • src/data/timeline.js   → parcours / objectifs
     • src/data/contact.js    → coordonnées & socials
   ═══════════════════════════════════════════════════════ */
import { useState, lazy, Suspense } from 'react'
import { MotionConfig, AnimatePresence, motion } from 'framer-motion'
import { useLenis } from './hooks/useLenis'

/* ── Présentation ── */
import { PresentationProvider, usePresentationMode } from './contexts/PresentationContext'
import PresentationMode, { ActivateButton } from './components/layout/PresentationMode'

/* ── Composants critiques (chargés immédiatement) ── */
import NetworkIntro from './components/layout/NetworkIntro'
import Navbar       from './components/layout/Navbar'
import Footer       from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import Hero         from './components/sections/Hero'

/* ── Sections lazy : chunks JS séparés créés par Vite ── */
const About    = lazy(() => import('./components/sections/About'))
const Skills   = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Veille   = lazy(() => import('./components/sections/Veille'))
const Timeline = lazy(() => import('./components/sections/Timeline'))
const Contact  = lazy(() => import('./components/sections/Contact'))

function SectionSkeleton() {
  return (
    <div aria-hidden="true" style={{
      minHeight: '8rem',
      borderTop: '1px solid var(--color-border-subtle)',
      background: 'var(--color-base)',
    }} />
  )
}

/* Contenu du site — séparé pour pouvoir utiliser usePresentationMode */
function SiteContent() {
  const { isPresentationMode } = usePresentationMode()

  return (
    <>
      {/* Curseur et navbar masqués en mode présentation */}
      <AnimatePresence>
        {!isPresentationMode && (
          <motion.div
            key="chrome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CustomCursor />
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero isVisible={true} />

        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Skills />
          <Projects />
          <Veille />
          <Timeline />
          <Contact />
        </Suspense>
      </main>

      <Footer />

      {/* Overlay de présentation (s'affiche quand isPresentationMode=true) */}
      <PresentationMode />

      {/* Bouton d'activation flottant (masqué quand mode actif) */}
      <ActivateButton />
    </>
  )
}

export default function App() {
  /* 'intro' → NetworkIntro, 'site' → portfolio complet */
  const [phase, setPhase] = useState('intro')

  useLenis()

  return (
    /* reducedMotion="user" : respecte le réglage OS */
    <MotionConfig reducedMotion="user">

      {/* Lien skip-to-main — navigation clavier WCAG */}
      <a className="skip-to-main" href="#accueil">
        Passer au contenu principal
      </a>

      {/* ── Intro réseau vivant ── */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <NetworkIntro key="intro" onComplete={() => setPhase('site')} />
        )}
      </AnimatePresence>

      {/* ── Site complet — PresentationProvider wrap ──
          Rendu dès la phase 'site' ; Hero reçoit isVisible pour
          déclencher le typewriter et les animations d'entrée. */}
      <AnimatePresence mode="wait">
        {phase === 'site' && (
          <PresentationProvider key="site">
            <SiteContent />
          </PresentationProvider>
        )}
      </AnimatePresence>

    </MotionConfig>
  )
}
