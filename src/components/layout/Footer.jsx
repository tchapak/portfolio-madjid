import { motion } from 'framer-motion'
import { Network, Mail } from 'lucide-react'
import { contactInfo } from '../../data/contact'

/* ── SVG icônes de marque ── */
function IconGithub({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function IconLinkedin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIAL_ICON_MAP = {
  github:   IconGithub,
  linkedin: IconLinkedin,
  Mail:     ({ size = 16 }) => <Mail size={size} strokeWidth={1.5} aria-hidden="true" />,
}

/* ── Liens de navigation du footer ── */
const FOOTER_NAV = [
  { label: 'Accueil',     href: '#accueil'     },
  { label: 'À propos',    href: '#apropos'      },
  { label: 'Compétences', href: '#competences'  },
  { label: 'Projets',     href: '#projets'      },
  { label: 'Veille',      href: '#veille'       },
  { label: 'Parcours',    href: '#parcours'     },
  { label: 'Contact',     href: '#contact'      },
]

export default function Footer() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      role="contentinfo"
      style={{
        position:    'relative',
        overflow:    'hidden',
        borderTop:   '1px solid var(--color-border-subtle)',
        background:  'var(--color-base)',
      }}
    >
      {/* ── Dégradé décoratif radial en haut ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute', top: 0, left: 0, right: 0, height: '220px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Pattern grille réseau en fond ── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}
      >
        <defs>
          <pattern id="footer-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0 L0 0 0 48" fill="none" stroke="#3B82F6" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      <div className="container-main" style={{ position: 'relative', zIndex: 1, paddingTop: '3.5rem', paddingBottom: '2rem' }}>

        {/* ── 3 colonnes ── */}
        <div className="footer-cols">

          {/* ── Colonne 1 : Branding ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Logo terminal */}
            <a
              href="#accueil"
              onClick={(e) => { e.preventDefault(); scrollTo('#accueil') }}
              style={{ textDecoration: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
              aria-label="Retour en haut"
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>~/</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>madjid.allouti</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'steps(1)' }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-cyan)', marginLeft: 2 }}
                aria-hidden="true"
              >
                _
              </motion.span>
            </a>

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.85rem',
              color:      'var(--color-text-subtle)',
              lineHeight: 1.65,
              maxWidth:   '280px',
            }}>
              Futur administrateur systèmes &amp; réseaux, architecte en devenir.
            </p>

            {/* Badge SISR */}
            <div style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.4rem',
              padding:       '0.3rem 0.65rem',
              borderRadius:  '5px',
              background:    'rgba(59,130,246,0.1)',
              border:        '1px solid rgba(59,130,246,0.25)',
              width:         'fit-content',
            }}>
              <Network size={12} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-primary)', letterSpacing: '0.06em' }}>
                BTS SIO · SISR
              </span>
            </div>
          </div>

          {/* ── Colonne 2 : Navigation ── */}
          <nav aria-label="Navigation footer">
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--color-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom:  '1rem',
            }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {FOOTER_NAV.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href) }}
                    style={{
                      fontFamily:     'var(--font-body)',
                      fontSize:       '0.88rem',
                      color:          'var(--color-text-muted)',
                      textDecoration: 'none',
                      cursor:         'pointer',
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            '0.4rem',
                      transition:     'color 0.2s',
                      paddingBottom:  '1px',
                      borderBottom:   '1px solid transparent',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color       = '#FAFAFA'
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color       = 'var(--color-text-muted)'
                      e.currentTarget.style.borderColor = 'transparent'
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Colonne 3 : Contact rapide ── */}
          <div>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--color-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom:  '1rem',
            }}>
              Contact
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '0.5rem',
                  textDecoration: 'none',
                  color:          'var(--color-text-muted)',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '0.85rem',
                  transition:     'color 0.2s',
                  cursor:         'pointer',
                  wordBreak:      'break-all',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#06B6D4' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
              >
                <Mail size={14} aria-hidden="true" />
                {contactInfo.email}
              </a>

              {/* Liens sociaux */}
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {contactInfo.socials
                  .filter(s => s.icon !== 'Mail')
                  .map(social => {
                    const Icon = SOCIAL_ICON_MAP[social.icon] ?? IconGithub
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.name} de Madjid ALLOUTI`}
                        style={{
                          display:     'flex',
                          alignItems:  'center',
                          gap:         '0.4rem',
                          padding:     '0.45rem 0.75rem',
                          borderRadius: '7px',
                          border:      '1px solid rgba(39,39,42,0.8)',
                          background:  'rgba(17,17,21,0.5)',
                          color:       'var(--color-text-muted)',
                          textDecoration: 'none',
                          fontFamily:  'var(--font-body)',
                          fontSize:    '0.78rem',
                          cursor:      'pointer',
                          transition:  'border-color 0.2s, color 0.2s, transform 0.15s',
                          minHeight:   '36px',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
                          e.currentTarget.style.color       = '#FAFAFA'
                          e.currentTarget.style.transform   = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'
                          e.currentTarget.style.color       = 'var(--color-text-muted)'
                          e.currentTarget.style.transform   = 'translateY(0)'
                        }}
                      >
                        <Icon size={14} />
                        {social.name}
                      </a>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Séparateur ── */}
        <div style={{ height: '1px', background: 'var(--color-border-subtle)', margin: '2.5rem 0 1.5rem' }} />

        {/* ── Bas du footer — responsive via .footer-bottom ── */}
        <div className="footer-bottom">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
            © 2026 Madjid ALLOUTI — Tous droits réservés.
          </span>

          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
            Conçu avec React, Three.js &amp; Framer Motion
          </span>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-text-subtle)', letterSpacing: '0.06em' }}>
            v1.0.0 · BTS SIO SISR
          </span>
        </div>

      </div>
    </footer>
  )
}
