/* ═══════════════════════════════════════════════════════
   NetworkIntro.jsx — Intro "Réseau Vivant" (Sous-étapes 1+2+3)
   Carte + nœuds + connexions + paquets + convergence + révélation
   ═══════════════════════════════════════════════════════ */
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { ChevronDown } from 'lucide-react'

/* ── Constantes ── */
const GEO_URL    = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const W          = 900
const H          = 450
const MAX_PKTS   = 30

const projection = geoMercator().scale(130).center([0, 30]).translate([W / 2, H / 2])
const pathGen    = geoPath(projection)

/* ── Nœuds réseau ── */
const NODES = [
  { id: 'paris',        coords: [2.3522,    48.8566], special: true },
  { id: 'madrid',       coords: [-3.7038,   40.4168] },
  { id: 'london',       coords: [-0.1276,   51.5074] },
  { id: 'berlin',       coords: [13.4050,   52.5200] },
  { id: 'rome',         coords: [12.4964,   41.9028] },
  { id: 'moscow',       coords: [37.6173,   55.7558] },
  { id: 'cairo',        coords: [31.2357,   30.0444] },
  { id: 'dubai',        coords: [55.2708,   25.2048] },
  { id: 'johannesburg', coords: [28.0473,  -26.2041] },
  { id: 'toronto',      coords: [-79.3832,  43.6532] },
  { id: 'newyork',      coords: [-74.0060,  40.7128] },
  { id: 'mumbai',       coords: [72.8777,   19.0760] },
  { id: 'losangeles',   coords: [-118.2437, 34.0522] },
  { id: 'saopaulo',     coords: [-46.6333, -23.5505] },
  { id: 'beijing',      coords: [116.4074,  39.9042] },
  { id: 'singapore',    coords: [103.8198,   1.3521] },
  { id: 'tokyo',        coords: [139.6917,  35.6895] },
  { id: 'sydney',       coords: [151.2093, -33.8688] },
]

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]))

/* ── 26 connexions stratégiques ── */
const CONNECTIONS = [
  ['paris', 'london'], ['paris', 'berlin'], ['paris', 'madrid'],
  ['paris', 'rome'],   ['paris', 'moscow'], ['paris', 'toronto'],
  ['paris', 'newyork'],['paris', 'cairo'],  ['paris', 'dubai'],
  ['newyork', 'london'], ['newyork', 'madrid'], ['losangeles', 'tokyo'],
  ['toronto', 'london'], ['london', 'berlin'],  ['berlin', 'moscow'],
  ['madrid', 'rome'],    ['tokyo', 'beijing'],  ['tokyo', 'singapore'],
  ['beijing', 'singapore'], ['sydney', 'singapore'], ['sydney', 'tokyo'],
  ['dubai', 'mumbai'],   ['cairo', 'johannesburg'], ['dubai', 'beijing'],
  ['newyork', 'saopaulo'], ['toronto', 'losangeles'],
]

/* Pairs (idx, reversed) dont le paquet ARRIVE à Paris */
const PARIS_TO = CONNECTIONS.reduce((acc, [from, to], idx) => {
  if (from === 'paris') acc.push({ idx, reversed: true  })
  if (to   === 'paris') acc.push({ idx, reversed: false })
  return acc
}, [])

function buildConnPath(fromId, toId) {
  const [x1, y1] = projection(NODE_MAP[fromId].coords)
  const [x2, y2] = projection(NODE_MAP[toId].coords)
  const mx   = (x1 + x2) / 2
  const my   = (y1 + y2) / 2
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  const lift = Math.min(dist * 0.18, 90)
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${mx.toFixed(1)},${(my - lift).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`
}
const CONN_PATHS = CONNECTIONS.map(([f, t]) => buildConnPath(f, t))

/* ── Nom — lettres + rotations initiales pré-calculées ── */
const NAME_CHARS = 'MADJID ALLOUTI'.split('')
const LETTER_ROTS = NAME_CHARS.map(() => (Math.random() - 0.5) * 10)

/* ── Nœud SVG standard (non-Paris) ── */
function NetworkNode({ node, index }) {
  const isSpecial  = node.special
  const r          = isSpecial ? 6  : 4
  const haloR      = isSpecial ? 14 : 10
  const fill       = isSpecial ? '#F59E0B' : '#06B6D4'
  const [cx, cy]   = projection(node.coords)

  return (
    <g transform={`translate(${cx},${cy})`}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ originX: '0px', originY: '0px' }}
        transition={{ delay: index * 0.1, duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <motion.circle
          r={haloR} fill={fill}
          animate={{ opacity: isSpecial ? [0.4, 0.85, 0.4] : [0.2, 0.55, 0.2] }}
          transition={{ duration: isSpecial ? 1.5 : 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle r={r} fill={fill} />
      </motion.g>
    </g>
  )
}

/* ── Nœud Paris — contrôlé par useAnimation pour la convergence ── */
const [PARIS_X, PARIS_Y] = projection([2.3522, 48.8566])

function ParisNode({ controls }) {
  return (
    <g transform={`translate(${PARIS_X},${PARIS_Y})`}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        style={{ originX: '0px', originY: '0px' }}
      >
        <motion.circle
          r={14} fill="#F59E0B"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle r={6} fill="#F59E0B" />
      </motion.g>
    </g>
  )
}

/* ════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ════════════════════════════════════════════ */
export default function NetworkIntro({ onComplete }) {
  const [countries,     setCountries]     = useState([])
  const [showSkip,      setShowSkip]      = useState(false)
  const [phase,         setPhase]         = useState('network')
  // phases : 'network' → 'convergence' → 'flash' → 'reveal' → 'ready'
  const [showSubtitle,  setShowSubtitle]  = useState(false)
  const [showScrollHint,setShowScrollHint]= useState(false)

  /* prefers-reduced-motion — évalué une seule fois au montage */
  const [skipAnim] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  /* Refs animation impérative */
  const packetsLayerRef  = useRef(null)
  const pathRefs         = useRef({})
  const packetsRef       = useRef([])
  const animFrameRef     = useRef(null)
  const spawnIntervalRef = useRef(null)
  const burstTimersRef   = useRef([])
  const nextId           = useRef(0)
  const completedRef     = useRef(false)
  const phaseRef         = useRef('network')

  /* Contrôles du nœud Paris */
  const parisControls = useAnimation()

  /* onComplete stable via ref */
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const doComplete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onCompleteRef.current()
  }, [])

  /* ── Chargement de la carte ── */
  useEffect(() => {
    fetch(GEO_URL)
      .then(r => r.json())
      .then(world => setCountries(feature(world, world.objects.countries).features))
    const t = setTimeout(() => setShowSkip(true), 1500)
    return () => clearTimeout(t)
  }, [])

  /* ── Timeline principale + RAF ── */
  useEffect(() => {
    /* Accessibilité : skip de toute l'animation */
    if (skipAnim) {
      setPhase('reveal')
      setShowSubtitle(true)
      setShowScrollHint(true)
      const t = setTimeout(doComplete, 3000)
      return () => clearTimeout(t)
    }

    /* Paris : animation d'apparition initiale (index=0, delay=0) */
    parisControls.start({
      scale: 1, opacity: 1,
      transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
    })

    /* ── Création d'un élément paquet SVG ── */
    function makePacketEl(big) {
      const g    = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      glow.setAttribute('r',            big ? '7'    : '4.5')
      glow.setAttribute('fill',         '#06B6D4')
      glow.setAttribute('fill-opacity', big ? '0.45' : '0.28')
      const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      core.setAttribute('r',    big ? '2.5'   : '1.8')
      core.setAttribute('fill', big ? '#FFFFFF': '#A5F3FF')
      g.appendChild(glow)
      g.appendChild(core)
      return g
    }

    /* ── Spawn d'un paquet ── */
    function spawnPacket(big = false) {
      if (!packetsLayerRef.current) return
      if (!big && packetsRef.current.length >= MAX_PKTS) return

      let connIdx, reversed
      if (big || Math.random() < 0.6) {
        const pick = PARIS_TO[Math.floor(Math.random() * PARIS_TO.length)]
        connIdx  = pick.idx
        reversed = pick.reversed
      } else {
        connIdx  = Math.floor(Math.random() * CONNECTIONS.length)
        reversed = Math.random() < 0.5
      }

      const pathEl = pathRefs.current[connIdx]
      if (!pathEl) return
      const totalLen = pathEl.getTotalLength()
      if (!totalLen) return

      const el = makePacketEl(big)
      packetsLayerRef.current.appendChild(el)
      packetsRef.current.push({
        id: nextId.current++,
        reversed, pathEl, totalLen,
        startTime: performance.now(),
        duration:  big ? 600 + Math.random() * 200 : 1000 + Math.random() * 1500,
        element: el,
      })
    }

    /* ── Boucle RAF (impérative, zéro re-render) ── */
    function rafLoop(now) {
      const p = phaseRef.current
      if (p === 'flash' || p === 'reveal' || p === 'ready') return

      const toRemove = []
      for (const pkt of packetsRef.current) {
        const raw = (now - pkt.startTime) / pkt.duration
        if (raw >= 1) { toRemove.push(pkt); continue }
        const t   = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2
        const len = pkt.reversed ? pkt.totalLen * (1 - t) : pkt.totalLen * t
        const pt  = pkt.pathEl.getPointAtLength(len)
        pkt.element.setAttribute('transform', `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})`)
        pkt.element.style.opacity = raw > 0.85 ? ((1 - raw) / 0.15).toFixed(3) : '1'
      }
      for (const pkt of toRemove) {
        pkt.element.remove()
        packetsRef.current = packetsRef.current.filter(p => p.id !== pkt.id)
      }
      animFrameRef.current = requestAnimationFrame(rafLoop)
    }
    animFrameRef.current = requestAnimationFrame(rafLoop)

    /* t=2.5s : spawn régulier des paquets */
    const tSpawn = setTimeout(() => {
      spawnIntervalRef.current = setInterval(() => spawnPacket(false), 100)
    }, 2500)

    /* t=4s : CONVERGENCE */
    const tConv = setTimeout(() => {
      phaseRef.current = 'convergence'
      setPhase('convergence')

      if (spawnIntervalRef.current) { clearInterval(spawnIntervalRef.current); spawnIntervalRef.current = null }

      /* Paris grossit */
      parisControls.start({ scale: 1.8, transition: { duration: 1, ease: 'easeInOut' } })

      /* Burst de 45 paquets de convergence étalés sur 900ms */
      for (let i = 0; i < 45; i++) {
        burstTimersRef.current.push(setTimeout(() => spawnPacket(true), i * 20))
      }
    }, 4000)

    /* t=5s : FLASH */
    const tFlash = setTimeout(() => {
      phaseRef.current = 'flash'
      setPhase('flash')

      /* Paris explose */
      parisControls.start({ scale: 7, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } })

      /* Vide tous les paquets → libère le GPU */
      packetsRef.current.forEach(p => p.element?.remove())
      packetsRef.current = []
    }, 5000)

    /* t=5.4s : RÉVÉLATION */
    const tReveal = setTimeout(() => {
      phaseRef.current = 'reveal'
      setPhase('reveal')
    }, 5400)

    /* t=6.2s : sous-titre */
    const tSub = setTimeout(() => setShowSubtitle(true), 6200)

    /* t=6.5s : indicateur scroll + phase ready */
    const tReady = setTimeout(() => {
      phaseRef.current = 'ready'
      setPhase('ready')
      setShowScrollHint(true)
    }, 6500)

    /* t=8s : transition automatique */
    const tAuto = setTimeout(doComplete, 8000)

    return () => {
      ;[tSpawn, tConv, tFlash, tReveal, tSub, tReady, tAuto].forEach(clearTimeout)
      burstTimersRef.current.forEach(clearTimeout)
      burstTimersRef.current = []
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
      if (animFrameRef.current)     cancelAnimationFrame(animFrameRef.current)
      packetsRef.current.forEach(p => p.element?.remove())
      packetsRef.current = []
    }
  }, [skipAnim, doComplete, parisControls])

  /* ── Clic / scroll pour passer en phase 'ready' ── */
  useEffect(() => {
    if (phase !== 'ready') return
    const handle = e => {
      if (e.target?.closest?.('button')) return
      doComplete()
    }
    window.addEventListener('click',   handle)
    window.addEventListener('keydown', handle)
    window.addEventListener('wheel',   handle, { passive: true })
    return () => {
      window.removeEventListener('click',   handle)
      window.removeEventListener('keydown', handle)
      window.removeEventListener('wheel',   handle)
    }
  }, [phase, doComplete])

  /* ── Dérivés ── */
  const mapVisible = phase === 'network' || phase === 'convergence' || phase === 'flash'

  /* ════════════════════════════
     RENDU
     ════════════════════════════ */
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#09090B',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >

      {/* ── Bouton "Passer l'intro" (toujours actif) ── */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            key="skip"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={doComplete}
            aria-label="Passer l'intro"
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              fontFamily: "'JetBrains Mono Variable', monospace",
              fontSize: '0.8rem', color: '#06B6D4',
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '0.5rem', padding: '0.45rem 1rem',
              cursor: 'pointer', backdropFilter: 'blur(8px)',
              letterSpacing: '0.05em', zIndex: 10000,
            }}
          >
            Passer l'intro →
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── CARTE + CONNEXIONS + NŒUDS + PAQUETS ── */}
      {!skipAnim && (
        <motion.div
          animate={{ opacity: mapVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '85%', maxWidth: '1400px' }}
          aria-hidden="true"
        >
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>

            {/* 1 — Continents */}
            {countries.map((geo, i) => (
              <path key={i} d={pathGen(geo)} fill="transparent" stroke="#1e3a8a" strokeWidth={0.5} />
            ))}

            {/* 2 — Connexions animées (tracé progressif framer-motion pathLength) */}
            {CONNECTIONS.map(([fromId, toId], index) => (
              <motion.path
                key={`${fromId}-${toId}`}
                ref={el => { if (el) pathRefs.current[index] = el }}
                d={CONN_PATHS[index]}
                stroke="#3B82F6"
                strokeWidth={0.6}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.8, delay: 2 + index * 0.05, ease: 'easeOut' }}
              />
            ))}

            {/* 3 — Couche paquets (DOM impératif) */}
            <g ref={packetsLayerRef} />

            {/* 4 — Nœuds standard (non-Paris, par-dessus tout) */}
            {NODES.filter(n => !n.special).map(node => (
              <NetworkNode
                key={node.id}
                node={node}
                index={NODES.findIndex(n => n.id === node.id)}
              />
            ))}

            {/* 5 — Nœud Paris (contrôles d'animation dédiés) */}
            <ParisNode controls={parisControls} />

          </svg>
        </motion.div>
      )}

      {/* ── FLASH RADIAL (t=5s → t=5.4s) ── */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.4, times: [0, 0.22, 1] }}
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse 65% 65% at ${(PARIS_X / W * 100).toFixed(1)}% ${(PARIS_Y / H * 100).toFixed(1)}%,
                #FFFFFF 0%, rgba(180, 210, 255, 0.85) 30%, transparent 100%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── RÉVÉLATION DU NOM (t=5.4s+) ── */}
      <AnimatePresence>
        {(phase === 'reveal' || phase === 'ready') && (
          <motion.div
            key="name-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1.25rem', padding: '0 1.5rem',
              zIndex: 3,
            }}
          >
            {/* Nom lettre par lettre */}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}
              aria-label="Madjid Allouti"
            >
              {NAME_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0, rotate: LETTER_ROTS[i] }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Space Grotesk Variable', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(2rem, 7.5vw, 5.5rem)',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.1,
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </div>

            {/* Sous-titre avec point "online" pulsé */}
            <AnimatePresence>
              {showSubtitle && (
                <motion.div
                  key="subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontFamily: "'Space Grotesk Variable', sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(0.85rem, 2.2vw, 1.35rem)',
                    color: '#A1A1AA',
                    letterSpacing: '0.02em',
                  }}
                >
                  <motion.span
                    style={{ color: '#06B6D4', fontSize: '0.75em', lineHeight: 1 }}
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  >
                    ●
                  </motion.span>
                  Futur Architecte Réseau
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INDICATEUR SCROLL (t=6.5s+) ── */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            key="scroll-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={doComplete}
            role="button"
            aria-label="Continuer vers le portfolio"
            style={{
              position: 'absolute', bottom: '2rem',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '0.4rem',
              cursor: 'pointer', zIndex: 4,
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <ChevronDown size={24} color="#06B6D4" />
            </motion.div>
            <span
              style={{
                fontFamily: "'JetBrains Mono Variable', monospace",
                fontSize: '0.72rem',
                color: '#06B6D4',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Scroll pour explorer
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
