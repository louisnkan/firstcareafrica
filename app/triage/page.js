'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TriagePage() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    const question = input.trim()
    if (!question || loading) return

    setLoading(true)
    setError('')

    const newHistory = [
      ...history,
      { role: 'user', content: question }
    ]

    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'triage',
          question: question,
          history: history
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.')
        setHistory(newHistory)
        setLoading(false)
        return
      }

      setHistory([
        ...newHistory,
        { role: 'assistant', content: data.response }
      ])

    } catch {
      setError('Could not connect. Please check your internet and try again.')
      setHistory(newHistory)
    }

    setLoading(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function clearChat() {
    setHistory([])
    setInput('')
    setError('')
  }

  return (
    <div style={{ paddingTop: '16px', paddingBottom: '100px' }}>

      {/* Back */}
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: '#9BA8B5',
        textDecoration: 'none',
        fontSize: '0.82rem',
        marginBottom: '20px',
        minHeight: '36px'
      }}>
        ← Home
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.7rem',
          color: '#F5F0E8',
          marginBottom: '8px'
        }}>
          Describe Your Situation
        </h1>
        <p style={{
          color: '#9BA8B5',
          fontSize: '0.85rem',
          lineHeight: '1.6'
        }}>
          Tell me what's happening in plain language.
          I'll ask a question or two if needed, then give you
          clear, structured guidance.
        </p>
      </div>

      {/* Disclaimer */}
      <div style={{
        background: 'rgba(240,140,0,0.08)',
        border: '1px solid rgba(240,140,0,0.2)',
        borderRadius: '14px',
        padding: '12px 14px',
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start'
      }}>
        <span style={{ flexShrink: 0 }}>⚕️</span>
        <p style={{
          color: 'rgba(240,140,0,0.85)',
          fontSize: '0.75rem',
          lineHeight: '1.5',
          margin: 0
        }}>
          This AI provides general guidance only.
          It does not diagnose or replace a doctor.
          In a life-threatening emergency, use the
          Emergency section instead.
        </p>
      </div>

      {/* Emergency redirect */}
      <Link href="/category/emergency" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(224,49,49,0.08)',
        border: '1px solid rgba(224,49,49,0.25)',
        borderRadius: '14px',
        padding: '12px 14px',
        marginBottom: '24px',
        textDecoration: 'none'
      }}>
        <span>🚨</span>
        <p style={{
          color: '#E03131',
          fontSize: '0.8rem',
          fontWeight: '600',
          margin: 0
        }}>
          Life-threatening emergency? Tap here instead →
        </p>
      </Link>

      {/* Conversation history */}
      {history.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {history.map((msg, i) => (
            <div key={i} style={{
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {/* Role label */}
              <p style={{
                fontSize: '0.65rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: msg.role === 'user' ? '#6741D9' : '#F08C00',
                marginBottom: '4px',
                paddingLeft: msg.role === 'assistant' ? '4px' : 0,
                paddingRight: msg.role === 'user' ? '4px' : 0
              }}>
                {msg.role === 'user' ? 'You' : 'FirstCare AI'}
              </p>

              {/* Message bubble */}
              <div style={{
                background: msg.role === 'user'
                  ? 'rgba(103,65,217,0.15)'
                  : '#1C2B3A',
                border: msg.role === 'user'
                  ? '1px solid rgba(103,65,217,0.3)'
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: msg.role === 'user'
                  ? '16px 16px 4px 16px'
                  : '16px 16px 16px 4px',
                padding: '12px 14px',
                maxWidth: '90%'
              }}>
                <p style={{
                  color: '#F5F0E8',
                  fontSize: '0.88rem',
                  lineHeight: '1.65',
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content
                    .replace(/\*\*(.*?)\*\*/g, '$1')
                    .replace(/\*(.*?)\*/g, '$1')
                    .replace(/^#{1,3}\s/gm, '')
                    .trim()
                  }
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '12px'
            }}>
              <div style={{
                background: '#1C2B3A',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px 16px 16px 4px',
                padding: '12px 16px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#F08C00',
                      animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={{
          background: 'rgba(224,49,49,0.08)',
          border: '1px solid rgba(224,49,49,0.25)',
          borderRadius: '12px',
          padding: '12px 14px',
          marginBottom: '16px'
        }}>
          <p style={{
            color: '#E03131',
            fontSize: '0.82rem',
            margin: 0
          }}>
            {error}
          </p>
        </div>
      )}

      {/* Input area — sticky at bottom */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(15,25,35,0.97)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 16px 24px',
        backdropFilter: 'blur(12px)',
        zIndex: 40
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          {history.length > 0 && (
            <button
              onClick={clearChat}
              style={{
                color: '#5C6E7E',
                fontSize: '0.72rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '8px',
                minHeight: 0,
                padding: 0
              }}>
              Clear conversation ×
            </button>
          )}
          <div style={{ display: 'flex', gap: '8px' }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                history.length === 0
                  ? "Describe what's wrong — e.g. 'My child has had a fever of 39°C for 2 days and won't eat'"
                  : "Continue the conversation..."
              }
              className="triage-input"
              style={{ minHeight: '52px', maxHeight: '120px' }}
              maxLength={500}
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim()
                  ? 'rgba(103,65,217,0.3)'
                  : '#6741D9',
                border: 'none',
                borderRadius: '12px',
                padding: '0 16px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: loading || !input.trim()
                  ? 'not-allowed'
                  : 'pointer',
                minHeight: '52px',
                flexShrink: 0,
                transition: 'background 0.2s'
              }}>
              {loading ? '...' : '→'}
            </button>
          </div>
          <p style={{
            color: '#3D5166',
            fontSize: '0.65rem',
            marginTop: '6px',
            textAlign: 'right'
          }}>
            {input.length}/500
          </p>
        </div>
      </div>

      {/* Pulse animation style */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  )
}
