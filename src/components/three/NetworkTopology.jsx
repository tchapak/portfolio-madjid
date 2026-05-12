import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useIsMobile } from '../../hooks/useIsMobile'

/* ── 16 nœuds desktop : core → distribution → access ── */
const NODES = [
  { pos: [ 0.0,  0.0,  0.0], speed: 1.2, offset: 0.0 },
  { pos: [ 0.0,  0.0,  2.0], speed: 0.8, offset: 1.0 },
  { pos: [-3.0,  2.0, -1.0], speed: 1.5, offset: 0.5 },
  { pos: [ 3.0,  2.0, -1.0], speed: 0.9, offset: 2.0 },
  { pos: [-3.0, -2.0, -1.0], speed: 1.1, offset: 0.8 },
  { pos: [ 3.0, -2.0, -1.0], speed: 1.4, offset: 1.5 },
  { pos: [-5.0,  3.5,  0.0], speed: 0.7, offset: 3.0 },
  { pos: [ 5.0,  3.5,  0.0], speed: 1.3, offset: 0.2 },
  { pos: [-5.0, -3.5,  0.0], speed: 1.0, offset: 2.5 },
  { pos: [ 5.0, -3.5,  0.0], speed: 1.6, offset: 1.2 },
  { pos: [ 0.0,  4.0, -2.5], speed: 0.6, offset: 0.7 },
  { pos: [ 0.0, -4.0, -2.5], speed: 1.2, offset: 3.5 },
  { pos: [-5.0,  0.0, -2.5], speed: 0.9, offset: 1.8 },
  { pos: [ 5.0,  0.0, -2.5], speed: 1.4, offset: 0.3 },
  { pos: [-2.0,  3.0,  2.5], speed: 1.1, offset: 2.2 },
  { pos: [ 2.0, -3.0,  2.5], speed: 0.8, offset: 1.7 },
]

/* ── 10 nœuds mobile (économie de ressources) ── */
const MOBILE_NODES = NODES.slice(0, 10)

function buildEdges(nodes, threshold = 5.5) {
  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const [ax, ay, az] = nodes[i].pos
      const [bx, by, bz] = nodes[j].pos
      const d = Math.sqrt((ax-bx)**2 + (ay-by)**2 + (az-bz)**2)
      if (d < threshold) edges.push([i, j])
    }
  }
  return edges
}

const EDGES        = buildEdges(NODES)
const MOBILE_EDGES = buildEdges(MOBILE_NODES)

/* ─────────────────────────────────────────────────────
   Scène Three.js (accepte nodes/edges/packetCount en props)
   ───────────────────────────────────────────────────── */
function NetworkScene({ nodes, edges, packetCount }) {
  const groupRef   = useRef()
  const nodeRefs   = useRef([])
  const packetRefs = useRef([])

  const fromVec = useMemo(() => new THREE.Vector3(), [])
  const toVec   = useMemo(() => new THREE.Vector3(), [])

  /* État mutable des paquets (ref → pas de re-render) */
  const packetsState = useRef(
    Array.from({ length: packetCount }, (_, i) => ({
      edgeIdx: (i * 3) % Math.max(1, edges.length),
      t:       i / packetCount,
      speed:   0.003 + i * 0.001,
    }))
  )

  /* Arêtes en un seul drawcall */
  const edgeLines = useMemo(() => {
    const positions = []
    edges.forEach(([i, j]) => positions.push(...nodes[i].pos, ...nodes[j].pos))
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#3B82F6'), transparent: true, opacity: 0.13,
    })
    return new THREE.LineSegments(geo, mat)
  }, [nodes, edges])

  useFrame(({ clock, pointer }) => {
    /* Parallax doux basé sur la position de la souris */
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, -pointer.y * 0.15, 0.04
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,  pointer.x * 0.20, 0.04
      )
    }

    /* Pulsation LED */
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh?.material || i >= nodes.length) return
      const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * nodes[i].speed + nodes[i].offset)
      mesh.material.opacity = 0.25 + pulse * 0.65
    })

    /* Paquets de données en transit */
    packetsState.current.forEach((pkt, i) => {
      pkt.t += pkt.speed
      if (pkt.t > 1) {
        pkt.t       = 0
        pkt.edgeIdx = Math.floor(Math.random() * edges.length)
        pkt.speed   = 0.003 + Math.random() * 0.004
      }
      const edge = edges[pkt.edgeIdx]
      if (!edge || !packetRefs.current[i]) return
      fromVec.set(...nodes[edge[0]].pos)
      toVec.set(...nodes[edge[1]].pos)
      fromVec.lerp(toVec, pkt.t)
      packetRefs.current[i].position.copy(fromVec)
    })
  })

  return (
    <group ref={groupRef}>
      <primitive object={edgeLines} />

      {nodes.map((node, i) => (
        <group key={`node-${i}`} position={node.pos}>
          <mesh ref={el => { nodeRefs.current[i] = el }}>
            <sphereGeometry args={[0.10, 8, 8]} />
            <meshBasicMaterial color="#3B82F6" transparent />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.04} />
          </mesh>
        </group>
      ))}

      {Array.from({ length: packetCount }).map((_, i) => (
        <mesh key={`pkt-${i}`} ref={el => { packetRefs.current[i] = el }}>
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────────────
   Export — wrapper Canvas avec fade-in
   Mobile : 10 nœuds, 3 paquets, DPR=1, low-power
   Desktop : 16 nœuds, 5 paquets, DPR≤1.5
   ───────────────────────────────────────────────────── */
export default function NetworkTopology({ isVisible }) {
  const isMobile = useIsMobile()

  const nodes       = isMobile ? MOBILE_NODES : NODES
  const edges       = isMobile ? MOBILE_EDGES : EDGES
  const packetCount = isMobile ? 3             : 5

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 0.9 : 0 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{
          alpha:           true,
          antialias:       false,
          powerPreference: isMobile ? 'low-power' : 'default',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* key force le remontage lors du passage mobile ↔ desktop */}
        <NetworkScene
          key={isMobile ? 'mobile' : 'desktop'}
          nodes={nodes}
          edges={edges}
          packetCount={packetCount}
        />
      </Canvas>
    </motion.div>
  )
}
