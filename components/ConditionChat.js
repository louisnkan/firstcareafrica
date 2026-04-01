'use client'

import { useState } from 'react'

export default function ConditionChat({ conditionName, conditionCategory }) {
  const [open, setOpen] = useState(false)
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
          mode: 'condition',
          question: question,
          conditionName: conditionName,
          conditionCategory: conditionCategory,
          history: history
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong.')
        setHistory(newHistory)
        setLoading(false)
        return
      }

      setHistory([
        ...newHistory,
        { role: 'assistant', content: data.response }
      ])

    } catch {
      setError('Could not connect. Check your internet connection.')
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

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          background: 'rgba(103,65,217,0.08)',
          border: '1px solid rgba(103,65,217,0.25)',
          borderRadius: '16px',
          padding: '16px',
          cursor: 'pointer',
          textAlign: 'left',
          minHeight: '44px'
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '1.3rem' }}>🤖</span>
          <div>
            <p style={{
              color: '#6741D9',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '0 0 3px 0'
            }}>
              AI Follow-Up
            </p>
            <p style={{
              color: '#9BA8B5',
              fontSize: '0.82rem',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Have a question about {conditionName}?
              Tap to ask.
            </p>
          </div>
          <span style={{
            color: '#6741D9',
            marginLeft: 'auto',
            fontSize: '1rem'
          }}>+</span>
        </div>
      </button>
    )
  }

  return (
    <div style={{
      background: 'rgba(103,65,217,0.05)',
      border: '1px solid rgba(103,65,217,0.2)',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🤖</span>
          <p style={{
            color: '#6741D9',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: 0
          }}>
            AI Follow-Up — {conditionName}
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          style={{
            color: '#5C6E7E',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            minHeight: 0,
            padding: '4px'
          }}>
          ×
        </button>
      </div>

      {/* Conversation */}
      {history.length === 0 && (
        <p style={{
          color: '#5C6E7E',
          fontSize: '0.8rem',
          marginBottom: '14px',
          lineHeight: '1.5'
        }}>
          Ask anything about {conditionName}.
          I'll answer based on the guidance above.
        </p>
      )}

      {history.map((msg, i) => (
        <div key={i} style={{
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
        }}>
          <div style={{
            background: msg.role === 'user'
              ? 'rgba(103,65,217,0.2)'
              : '#1C2B3A',
            border: msg.role === 'user'
              ? '1px solid rgba(103,65,217,0.3)'
              : '1px solid rgba(255,255,255,0.06)',
            borderRadius: msg.role === 'user'
              ? '12px 12px 3px 12px'
              : '12px 12px 12px 3px',
            padding: '10px 12px',
            maxWidth: '92%'
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

      {loading && (
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '8px 4px',
          alignItems: 'center'
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: '#6741D9',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
            }} />
          ))}
        </div>
      )}

      {error && (
        <p style={{
          color: '#E03131',
          fontSize: '0.78rem',
          marginBottom: '10px'
        }}>
          {error}
        </p>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask about ${conditionName}...`}
          maxLength={500}
          disabled={loading}
          style={{
            flex: 1,
            background: '#0F1923',
            border: '1px solid rgba(103,65,217,0.3)',
            borderRadius: '10px',
            padding: '10px 12px',
            color: '#F5F0E8',
            fontSize: '0.85rem',
            outline: 'none',
            minHeight: '44px'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim()
              ? 'rgba(103,65,217,0.3)'
              : '#6741D9',
            border: 'none',
            borderRadius: '10px',
            padding: '0 14px',
            color: 'white',
            cursor: loading || !input.trim()
              ? 'not-allowed'
              : 'pointer',
            minHeight: '44px',
            flexShrink: 0,
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}>
          {loading ? '…' : '→'}
        </button>
      </div>

      <div className="ai-disclaimer">
        AI guidance only. Does not replace a doctor.
        Seek professional help as soon as possible.
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
