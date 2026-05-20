/* ═══════════════════════════════════════════════════════
   CompetenceModal.jsx — Modale d'aperçu PDF
   Fermeture : Escape, clic hors modale, bouton X
   ═══════════════════════════════════════════════════════ */
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, FileText } from 'lucide-react'

const glass = {
  background:          'rgba(9, 9, 11, 0.96)',
  backdropFilter:      'blur(20px)',
  WebkitBackdropFilter:'blur(20px)',
}

export default function CompetenceModal({ fiche, onClose }) {
  /* ── Fermeture au clavier ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* ── Bloque le scroll du body ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!fiche) return null

  const blocColor = {
    'Bloc 1': '#3B82F6',
    'Bloc 2': '#06B6D4',
    'Bloc 3': '#F59E0B',
  }[fiche.bloc] ?? '#06B6D4'

  return (
    <AnimatePresence>
      {/* ── Fond assombri — clic pour fermer ── */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     300,
          background: 'rgba(0, 0, 0, 0.75)',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding:    'clamp(0.5rem, 2vw, 1.5rem)',
        }}
        aria-modal="true"
        role="dialog"
        aria-label={`Aperçu — ${fiche.title}`}
      >
        {/* ── Panneau modal ── */}
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            ...glass,
            border:       `1px solid ${blocColor}40`,
            borderRadius: '1rem',
            width:        '100%',
            maxWidth:     '900px',
            maxHeight:    '90vh',
            display:      'flex',
            flexDirection:'column',
            overflow:     'hidden',
            boxShadow:    `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${blocColor}20`,
          }}
        >
          {/* ── En-tête ── */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '1rem 1.25rem',
            borderBottom:   `1px solid ${blocColor}25`,
            gap:            '0.75rem',
            flexShrink:     0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden', flex: 1 }}>
              <FileText size={18} style={{ color: blocColor, flexShrink: 0 }} aria-hidden="true" />
              <div style={{ overflow: 'hidden' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono Variable', monospace",
                  fontSize:   '0.65rem',
                  color:      blocColor,
                  letterSpacing: '0.08em',
                  display:    'block',
                }}>
                  {fiche.code} — {fiche.bloc}
                </span>
                <h2 style={{
                  fontFamily:  "'Space Grotesk Variable', sans-serif",
                  fontSize:    'clamp(0.85rem, 2vw, 1rem)',
                  fontWeight:  600,
                  color:       '#FAFAFA',
                  margin:      0,
                  overflow:    'hidden',
                  textOverflow:'ellipsis',
                  whiteSpace:  'nowrap',
                }}>
                  {fiche.title}
                </h2>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              {/* Bouton télécharger */}
              <a
                href={fiche.pdfFile}
                download
                aria-label={`Télécharger la fiche ${fiche.title}`}
                data-cursor="hover"
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '0.4rem',
                  padding:      '0.45rem 0.85rem',
                  borderRadius: '0.5rem',
                  border:       `1px solid ${blocColor}40`,
                  background:   `${blocColor}12`,
                  color:        blocColor,
                  fontFamily:   "'DM Sans Variable', sans-serif",
                  fontSize:     '0.8rem',
                  fontWeight:   500,
                  cursor:       'pointer',
                  textDecoration:'none',
                  transition:   'background 0.2s, border-color 0.2s',
                  minHeight:    '36px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background    = `${blocColor}22`
                  e.currentTarget.style.borderColor   = `${blocColor}70`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background    = `${blocColor}12`
                  e.currentTarget.style.borderColor   = `${blocColor}40`
                }}
              >
                <Download size={14} aria-hidden="true" />
                <span>Télécharger</span>
              </a>

              {/* Bouton fermer */}
              <button
                onClick={onClose}
                aria-label="Fermer l'aperçu"
                data-cursor="hover"
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent:'center',
                  width:        '36px',
                  height:       '36px',
                  borderRadius: '0.5rem',
                  border:       '1px solid rgba(39,39,42,0.8)',
                  background:   'rgba(39,39,42,0.4)',
                  color:        '#A1A1AA',
                  cursor:       'pointer',
                  transition:   'background 0.2s, color 0.2s',
                  flexShrink:   0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
                  e.currentTarget.style.color      = '#EF4444'
                  e.currentTarget.style.borderColor= 'rgba(239,68,68,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(39,39,42,0.4)'
                  e.currentTarget.style.color       = '#A1A1AA'
                  e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'
                }}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ── Corps : iframe PDF ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <iframe
              src={fiche.pdfFile}
              title={`Aperçu PDF — ${fiche.title}`}
              sandbox="allow-scripts allow-same-origin"
              style={{
                flex:    1,
                width:   '100%',
                border:  0,
                display: 'block',
                minHeight: '65vh',
                background: '#111115',
              }}
            />

            {/* ── Fallback navigateur ── */}
            <div style={{
              padding:    '0.6rem 1.25rem',
              borderTop:  '1px solid rgba(39,39,42,0.6)',
              background: 'rgba(9,9,11,0.6)',
              flexShrink: 0,
            }}>
              <p style={{
                fontFamily:  "'DM Sans Variable', sans-serif",
                fontSize:    '0.72rem',
                color:       '#52525B',
                margin:      0,
                textAlign:   'center',
              }}>
                Si l'aperçu ne s'affiche pas,{' '}
                <a
                  href={fiche.pdfFile}
                  download
                  style={{ color: blocColor, textDecoration: 'underline', cursor: 'pointer' }}
                >
                  téléchargez le PDF directement
                </a>
                {' '}· Escape pour fermer
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
