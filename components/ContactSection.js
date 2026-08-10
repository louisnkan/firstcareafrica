'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [role, setRole] = useState('User with feedback')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/mwlelnbq', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
        setRole('User with feedback')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#0F1E30',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '13px 14px',
    color: '#F2EDE4',
    fontSize: '0.88rem',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block',
    color: '#9BA8B5',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '8px'
  }

  return (
    <section id="contact" style={{
      padding: '100px 20px',
      background: '#0D1E35'
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '24px',
            height: '2px',
            background: '#E8A020',
            borderRadius: '1px'
          }} />
          <span style={{
            color: '#E8A020',
            fontSize: '0.68rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>Get In Touch</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: '800',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          marginBottom: '14px',
          color: '#F2EDE4'
        }}>
          Doctor, pharmacy,
          <span style={{ color: '#E8A020', fontStyle: 'italic' }}> journalist</span>,
          or just have something to say?
        </h2>
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.9rem',
          lineHeight: '1.7',
          marginBottom: '36px',
          maxWidth: '480px'
        }}>
          Whether you want to review our content, report a problem,
          partner with us, or share this with your patients — reach out.
          Every message is read.
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(47,158,68,0.08)',
            border: '1px solid rgba(47,158,68,0.25)',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>✓</div>
            <p style={{
              color: '#F2EDE4',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '6px'
            }}>
              Message sent
            </p>
            <p style={{
              color: '#9BA8B5',
              fontSize: '0.82rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Thank you for reaching out. We read every message
              and will get back to you as soon as we can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div>
              <label style={labelStyle} htmlFor="fca-name">Name</label>
              <input
                id="fca-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="fca-email">Email</label>
              <input
                id="fca-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="fca-role">I am a...</label>
              <select
                id="fca-role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option>User with feedback</option>
                <option>Medical professional</option>
                <option>Pharmacy or NGO</option>
                <option>Journalist</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle} htmlFor="fca-message">Message</label>
              <textarea
                id="fca-message"
                name="message"
                required
                rows={5}
                placeholder="Tell us what's on your mind..."
                style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              />
            </div>

            {status === 'error' && (
              <p style={{
                color: '#E03131',
                fontSize: '0.82rem',
                margin: 0
              }}>
                Something went wrong sending your message. Please try again,
                or reach out directly if this keeps happening.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: status === 'sending'
                  ? 'rgba(232,160,32,0.4)'
                  : 'linear-gradient(135deg, #E8A020, #C4622D)',
                border: 'none',
                borderRadius: '14px',
                padding: '15px',
                color: 'white',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: status === 'sending' ? 'default' : 'pointer',
                letterSpacing: '0.02em'
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
