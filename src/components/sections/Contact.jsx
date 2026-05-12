import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Download, User, Tag, MessageSquare, Send, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { contactInfo } from '../../data/contact'

/* ── SVG icônes de marque ── */
function IconGithub({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}
function IconLinkedin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
const MailIcon = ({ size = 18 }) => <Mail size={size} strokeWidth={1.5} aria-hidden="true" />

const SOCIAL_ICON_MAP = { github: IconGithub, linkedin: IconLinkedin, Mail: MailIcon }
const SOCIAL_COLORS   = { github: '#A1A1AA',  linkedin: '#0A66C2',    Mail: '#06B6D4' }

/* ── Validation ── */
function validate(values) {
  const e = {}
  if (!values.nom.trim() || values.nom.trim().length < 2)
    e.nom = 'Veuillez renseigner votre nom (min. 2 caractères)'
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = 'Adresse email invalide'
  if (!values.sujet)
    e.sujet = 'Veuillez choisir un sujet'
  if (!values.message.trim() || values.message.trim().length < 10)
    e.message = 'Le message doit contenir au moins 10 caractères'
  return e
}

const SUJET_OPTIONS = ['Stage', 'Alternance', 'Collaboration', 'Autre']
const MSG_MAX       = 1000

/* ═══════════════════════════════════════════════
   Champ texte / email avec label flottant
   ═══════════════════════════════════════════════ */
function FloatingInput({ id, label, icon: Icon, type = 'text', value, onChange, onBlur, error, ...rest }) {
  const [focused, setFocused] = useState(false)
  const floated = focused || !!value

  const borderColor = error ? '#EF4444' : focused ? '#06B6D4' : 'rgba(63,63,70,0.8)'

  return (
    <div>
      <div style={{
        position:     'relative',
        borderRadius: '8px',
        border:       `1px solid ${borderColor}`,
        background:   'rgba(9,9,11,0.5)',
        boxShadow:    focused ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
        transition:   'border-color 0.2s, box-shadow 0.2s',
      }}>
        {/* Icône */}
        <div style={{
          position:   'absolute', left: '0.85rem', top: '50%',
          transform:  'translateY(-50%)',
          color:      focused ? '#06B6D4' : '#52525B',
          transition: 'color 0.2s',
          pointerEvents: 'none', display: 'flex', zIndex: 1,
        }}>
          <Icon size={16} aria-hidden="true" />
        </div>

        {/* Label flottant */}
        <label
          htmlFor={id}
          style={{
            position:   'absolute',
            left:       floated ? '0.6rem'  : '2.5rem',
            top:        floated ? 0         : '50%',
            transform:  'translateY(-50%)',
            fontSize:   floated ? '0.65rem' : '0.88rem',
            fontFamily: floated ? 'var(--font-mono)' : 'var(--font-body)',
            color:      error ? '#EF4444' : floated ? '#06B6D4' : 'var(--color-text-subtle)',
            background: floated ? '#111115' : 'transparent',
            padding:    floated ? '0 0.3rem' : '0',
            letterSpacing: floated ? '0.05em' : '0',
            transition: 'all 0.18s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: 'none',
            zIndex:     2,
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </label>

        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{
            width:      '100%',
            padding:    '0.875rem 1rem 0.875rem 2.5rem',
            background: 'transparent',
            border:     'none',
            outline:    'none',
            color:      '#FAFAFA',
            fontFamily: 'var(--font-body)',
            fontSize:   '0.88rem',
            lineHeight: 1.5,
          }}
          {...rest}
        />
      </div>

      {/* Erreur */}
      {error && (
        <p id={`${id}-error`} role="alert" style={{
          fontFamily: 'var(--font-body)', fontSize: '0.73rem',
          color: '#EF4444', marginTop: '0.3rem', paddingLeft: '0.5rem',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Select avec label flottant
   ═══════════════════════════════════════════════ */
function FloatingSelect({ id, label, options, value, onChange, onBlur, error }) {
  const [focused, setFocused] = useState(false)
  const floated = focused || !!value

  const borderColor = error ? '#EF4444' : focused ? '#06B6D4' : 'rgba(63,63,70,0.8)'

  return (
    <div>
      <div style={{
        position:     'relative',
        borderRadius: '8px',
        border:       `1px solid ${borderColor}`,
        background:   'rgba(9,9,11,0.5)',
        boxShadow:    focused ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
        transition:   'border-color 0.2s, box-shadow 0.2s',
      }}>
        {/* Icône Tag */}
        <div style={{
          position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)',
          color: focused ? '#06B6D4' : '#52525B', transition: 'color 0.2s',
          pointerEvents: 'none', zIndex: 1, display: 'flex',
        }}>
          <Tag size={16} aria-hidden="true" />
        </div>

        {/* Chevron */}
        <div style={{
          position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)',
          color: '#52525B', pointerEvents: 'none', zIndex: 1,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M2 4l4 4 4-4z" />
          </svg>
        </div>

        {/* Label flottant */}
        <label
          htmlFor={id}
          style={{
            position:   'absolute',
            left:       floated ? '0.6rem'  : '2.5rem',
            top:        floated ? 0         : '50%',
            transform:  'translateY(-50%)',
            fontSize:   floated ? '0.65rem' : '0.88rem',
            fontFamily: floated ? 'var(--font-mono)' : 'var(--font-body)',
            color:      error ? '#EF4444' : floated ? '#06B6D4' : 'var(--color-text-subtle)',
            background: floated ? '#111115' : 'transparent',
            padding:    floated ? '0 0.3rem' : '0',
            letterSpacing: floated ? '0.05em' : '0',
            transition: 'all 0.18s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: 'none', zIndex: 2, lineHeight: 1, whiteSpace: 'nowrap',
          }}
        >
          {label}
        </label>

        {/* Select */}
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{
            width:      '100%',
            padding:    '0.875rem 2rem 0.875rem 2.5rem',
            background: 'transparent',
            border:     'none',
            outline:    'none',
            color:      value ? '#FAFAFA' : 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize:   '0.88rem',
            cursor:     'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        >
          <option value="" disabled style={{ background: '#111115', color: '#52525B' }} />
          {options.map(opt => (
            <option key={opt} value={opt} style={{ background: '#111115', color: '#FAFAFA' }}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" style={{
          fontFamily: 'var(--font-body)', fontSize: '0.73rem',
          color: '#EF4444', marginTop: '0.3rem', paddingLeft: '0.5rem',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Textarea avec label flottant + compteur
   ═══════════════════════════════════════════════ */
function FloatingTextarea({ id, label, value, onChange, onBlur, error, maxLength = MSG_MAX }) {
  const [focused, setFocused] = useState(false)
  const floated    = focused || !!value
  const borderColor = error ? '#EF4444' : focused ? '#06B6D4' : 'rgba(63,63,70,0.8)'

  return (
    <div>
      <div style={{
        position:     'relative',
        borderRadius: '8px',
        border:       `1px solid ${borderColor}`,
        background:   'rgba(9,9,11,0.5)',
        boxShadow:    focused ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
        transition:   'border-color 0.2s, box-shadow 0.2s',
      }}>
        {/* Icône */}
        <div style={{
          position: 'absolute', left: '0.85rem', top: '1rem',
          color: focused ? '#06B6D4' : '#52525B', transition: 'color 0.2s',
          pointerEvents: 'none', zIndex: 1, display: 'flex',
        }}>
          <MessageSquare size={16} aria-hidden="true" />
        </div>

        {/* Label flottant */}
        <label
          htmlFor={id}
          style={{
            position:   'absolute',
            left:       floated ? '0.6rem'  : '2.5rem',
            top:        floated ? 0         : '1rem',
            transform:  floated ? 'translateY(-50%)' : 'translateY(0)',
            fontSize:   floated ? '0.65rem' : '0.88rem',
            fontFamily: floated ? 'var(--font-mono)' : 'var(--font-body)',
            color:      error ? '#EF4444' : floated ? '#06B6D4' : 'var(--color-text-subtle)',
            background: floated ? '#111115' : 'transparent',
            padding:    floated ? '0 0.3rem' : '0',
            letterSpacing: floated ? '0.05em' : '0',
            transition: 'all 0.18s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: 'none', zIndex: 2, lineHeight: 1, whiteSpace: 'nowrap',
          }}
        >
          {label}
        </label>

        {/* Textarea */}
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e) }}
          maxLength={maxLength}
          rows={5}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{
            width:      '100%',
            padding:    '0.875rem 1rem 2.25rem 2.5rem',
            background: 'transparent',
            border:     'none',
            outline:    'none',
            resize:     'vertical',
            color:      '#FAFAFA',
            fontFamily: 'var(--font-body)',
            fontSize:   '0.88rem',
            lineHeight: 1.65,
            minHeight:  '130px',
          }}
        />

        {/* Compteur */}
        <div style={{
          position:   'absolute', bottom: '0.65rem', right: '0.85rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color:      value.length > maxLength * 0.9 ? '#F59E0B' : 'var(--color-text-subtle)',
          transition: 'color 0.2s',
          pointerEvents: 'none',
        }}>
          {value.length}/{maxLength}
        </div>
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" style={{
          fontFamily: 'var(--font-body)', fontSize: '0.73rem',
          color: '#EF4444', marginTop: '0.3rem', paddingLeft: '0.5rem',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Carte réseau social (colonne info)
   ═══════════════════════════════════════════════ */
function SocialCard({ social }) {
  const Icon  = SOCIAL_ICON_MAP[social.icon] ?? MailIcon
  const color = SOCIAL_COLORS[social.icon]   ?? '#A1A1AA'
  const isExternal = !social.url.startsWith('mailto:')

  return (
    <a
      href={social.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={`${social.name} — ${social.handle}`}
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.85rem',
        padding:       '0.75rem 1rem',
        borderRadius:  '10px',
        background:    'rgba(17,17,21,0.5)',
        border:        '1px solid rgba(39,39,42,0.8)',
        textDecoration: 'none',
        cursor:        'pointer',
        transition:    'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'
        e.currentTarget.style.transform   = 'translateX(5px)'
        e.currentTarget.style.boxShadow   = '0 0 18px rgba(6,182,212,0.07)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'
        e.currentTarget.style.transform   = 'translateX(0)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Icône colorée */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}18`, border: `1px solid ${color}30`,
        color,
      }}>
        <Icon size={17} />
      </div>

      {/* Nom + handle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 600, color: '#FAFAFA', lineHeight: 1.2 }}>
          {social.name}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-subtle)', letterSpacing: '0.03em', marginTop: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {social.handle}
        </p>
      </div>

      {/* Flèche hover */}
      <ArrowRight size={14} style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} aria-hidden="true" />
    </a>
  )
}

/* ═══════════════════════════════════════════════
   Colonne gauche — Informations
   ═══════════════════════════════════════════════ */
function InfoColumn() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 })
  const btnRef           = useRef(null)

  const onMagnet = (e) => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) * 0.3
    const y = (e.clientY - r.top  - r.height / 2) * 0.3
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const resetMagnet = () => { if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding:          '2rem',
        borderRadius:     '14px',
        background:       'rgba(17,17,21,0.65)',
        backdropFilter:   'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border:           '1px solid rgba(39,39,42,0.9)',
        display:          'flex',
        flexDirection:    'column',
        gap:              '1.75rem',
      }}
    >
      {/* ── Disponibilité ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <motion.span
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', display: 'inline-block', flexShrink: 0 }}
            animate={{ boxShadow: ['0 0 0 0 rgba(245,158,11,0.4)', '0 0 0 6px rgba(245,158,11,0)', '0 0 0 0 rgba(245,158,11,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F59E0B', letterSpacing: '0.06em' }}>
            Disponible
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          {contactInfo.availability}
        </p>
      </div>

      {/* ── Séparateur ── */}
      <div style={{ height: '1px', background: 'var(--color-border-subtle)' }} />

      {/* ── Coordonnées ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <MapPin size={15} style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            {contactInfo.location}
          </span>
        </div>
        <a
          href={`mailto:${contactInfo.email}`}
          style={{
            display:    'flex', alignItems: 'center', gap: '0.65rem',
            textDecoration: 'none', cursor: 'pointer',
            color:      'var(--color-text-muted)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#06B6D4' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
        >
          <Mail size={15} style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem' }}>
            {contactInfo.email}
          </span>
        </a>
      </div>

      {/* ── Séparateur ── */}
      <div style={{ height: '1px', background: 'var(--color-border-subtle)' }} />

      {/* ── Socials ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {contactInfo.socials.map(social => (
          <SocialCard key={social.name} social={social} />
        ))}
      </div>

      {/* ── Bouton CV (magnétique) ── */}
      <a
        ref={btnRef}
        href={contactInfo.resumeUrl}
        download
        onMouseMove={onMagnet}
        onMouseLeave={resetMagnet}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '0.5rem',
          padding:        '0.8rem 1.5rem',
          borderRadius:   '8px',
          background:     'linear-gradient(135deg, #3B82F6, #06B6D4)',
          color:          '#FAFAFA',
          fontFamily:     'var(--font-body)',
          fontSize:       '0.9rem',
          fontWeight:     600,
          textDecoration: 'none',
          cursor:         'pointer',
          minHeight:      '44px',
          transition:     'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, opacity 0.2s',
          boxShadow:      '0 4px 24px rgba(59,130,246,0.25)',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 32px rgba(59,130,246,0.4)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(59,130,246,0.25)'; resetMagnet() }}
        aria-label="Télécharger le CV de Madjid ALLOUTI (PDF)"
      >
        <Download size={16} aria-hidden="true" />
        Télécharger mon CV
      </a>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   Colonne droite — Formulaire
   ═══════════════════════════════════════════════ */
function ContactForm() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const [form,    setForm]    = useState({ nom: '', email: '', sujet: '', message: '' })
  const [touched, setTouched] = useState({ nom: false, email: false, sujet: false, message: false })
  const [status,  setStatus]  = useState('idle') // 'idle' | 'loading' | 'success'

  const currentErrors = validate(form)
  const isFormValid   = Object.keys(currentErrors).length === 0

  /* Erreurs visibles uniquement sur les champs touchés */
  const visibleErrors = {
    nom:     touched.nom     ? currentErrors.nom     : undefined,
    email:   touched.email   ? currentErrors.email   : undefined,
    sujet:   touched.sujet   ? currentErrors.sujet   : undefined,
    message: touched.message ? currentErrors.message : undefined,
  }

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleBlur = (field) =>
    setTouched(prev => ({ ...prev, [field]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* Marque tous les champs comme touchés pour afficher toutes les erreurs */
    setTouched({ nom: true, email: true, sujet: true, message: true })
    if (!isFormValid) return

    setStatus('loading')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
  }

  const handleReset = () => {
    setForm({ nom: '', email: '', sujet: '', message: '' })
    setTouched({ nom: false, email: false, sujet: false, message: false })
    setStatus('idle')
  }

  /* ── Animation fade ── */
  const cardStyle = {
    padding:          '2rem',
    borderRadius:     '14px',
    background:       'rgba(17,17,21,0.65)',
    backdropFilter:   'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border:           '1px solid rgba(39,39,42,0.9)',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={cardStyle}
    >
      <AnimatePresence mode="wait">

        {/* ─── Vue formulaire ─── */}
        {status !== 'success' && (
          <motion.div
            key="form-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* En-tête carte */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, color: '#FAFAFA' }}>
                Envoyer un message
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-subtle)', marginTop: '0.3rem' }}>
                Réponse sous 24–48h
              </p>
            </div>

            {/* Formulaire */}
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulaire de contact"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
            >
              {/* Nom */}
              <FloatingInput
                id="contact-nom"
                label="Nom complet"
                icon={User}
                type="text"
                value={form.nom}
                onChange={e => handleChange('nom', e.target.value)}
                onBlur={() => handleBlur('nom')}
                error={visibleErrors.nom}
                autoComplete="name"
                minLength={2}
                required
              />

              {/* Email */}
              <FloatingInput
                id="contact-email"
                label="Adresse email"
                icon={Mail}
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={visibleErrors.email}
                autoComplete="email"
                required
              />

              {/* Sujet */}
              <FloatingSelect
                id="contact-sujet"
                label="Sujet"
                options={SUJET_OPTIONS}
                value={form.sujet}
                onChange={e => handleChange('sujet', e.target.value)}
                onBlur={() => handleBlur('sujet')}
                error={visibleErrors.sujet}
              />

              {/* Message */}
              <FloatingTextarea
                id="contact-message"
                label="Message"
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                error={visibleErrors.message}
              />

              {/* Bouton Submit */}
              <button
                type="submit"
                disabled={!isFormValid || status === 'loading'}
                aria-label="Envoyer le message"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '0.5rem',
                  padding:        '0.85rem 1.75rem',
                  borderRadius:   '8px',
                  background:     (!isFormValid || status === 'loading')
                    ? 'rgba(59,130,246,0.4)'
                    : 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                  color:          '#FAFAFA',
                  border:         'none',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '0.93rem',
                  fontWeight:     600,
                  cursor:         (!isFormValid || status === 'loading') ? 'not-allowed' : 'pointer',
                  minHeight:      '48px',
                  transition:     'background 0.25s, box-shadow 0.25s, opacity 0.2s',
                  boxShadow:      (!isFormValid || status === 'loading') ? 'none' : '0 4px 20px rgba(59,130,246,0.25)',
                }}
                onMouseEnter={e => {
                  if (!isFormValid || status === 'loading') return
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(59,130,246,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = (!isFormValid || status === 'loading') ? 'none' : '0 4px 20px rgba(59,130,246,0.25)'
                }}
              >
                {status === 'loading' ? (
                  <>
                    {/* Spinner */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width:        16, height: 16, borderRadius: '50%',
                        border:       '2px solid rgba(255,255,255,0.25)',
                        borderTopColor: 'white',
                        flexShrink:   0,
                      }}
                    />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send size={15} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* ─── Vue succès ─── */}
        {status === 'success' && (
          <motion.div
            key="success-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              textAlign:      'center',
              gap:            '1.25rem',
              padding:        '2.5rem 1rem',
              minHeight:      '340px',
            }}
          >
            {/* Checkmark animé */}
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" aria-hidden="true">
              <motion.circle
                cx="34" cy="34" r="32"
                stroke="#10B981" strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
              <motion.path
                d="M20 34 L30 44 L48 24"
                stroke="#10B981" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: '#FAFAFA' }}>
                Message envoyé avec succès !
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Je reviens vers vous très vite.
              </p>
            </div>

            {/* Bouton reset */}
            <button
              onClick={handleReset}
              style={{
                marginTop:   '0.5rem',
                padding:     '0.7rem 1.4rem',
                borderRadius: '8px',
                border:      '1px solid rgba(39,39,42,0.9)',
                background:  'transparent',
                color:       'var(--color-text-muted)',
                fontFamily:  'var(--font-body)',
                fontSize:    '0.85rem',
                cursor:      'pointer',
                minHeight:   '44px',
                transition:  'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#FAFAFA' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)'; e.currentTarget.style.color = 'var(--color-text-muted)' }}
            >
              Envoyer un autre message
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   Section Contact principale
   ═══════════════════════════════════════════════ */
export default function Contact() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.3 })

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{
        padding:         '6rem 0',
        borderTop:       '1px solid var(--color-border-subtle)',
        scrollMarginTop: '4rem',
      }}
    >
      <div
        className="container-main"
        style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}
      >

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)', letterSpacing: '0.08em' }}
          >
            &gt; establishing connection...
          </motion.span>

          <motion.h2
            id="contact-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#FAFAFA', lineHeight: 1.1 }}
          >
            Prenons contact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem,1.8vw,1.05rem)', color: 'var(--color-text-muted)', lineHeight: 1.75 }}
          >
            Une opportunité de stage, une alternance, ou juste envie d'échanger sur les réseaux ?
            <br />
            <span style={{ color: 'var(--color-text-subtle)' }}>Le port est ouvert.</span>
          </motion.p>
        </div>

        {/* ── Grille 2 colonnes ── */}
        <div className="contact-grid">
          <InfoColumn />
          <ContactForm />
        </div>

      </div>
    </section>
  )
}
