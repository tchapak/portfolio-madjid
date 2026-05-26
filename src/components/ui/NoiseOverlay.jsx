/* ═══════════════════════════════════════════════════════
   NoiseOverlay.jsx — Bruit visuel (film grain) très subtil
   SVG feTurbulence statique, opacity 0.03, pointer-events none.
   Renforce l'ambiance dark cinématique. Styles : .noise-overlay.
   ═══════════════════════════════════════════════════════ */
export default function NoiseOverlay() {
  return (
    <div className="noise-overlay" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.5" />
      </svg>
    </div>
  )
}
