'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const INITIAL_MESSAGE = {
  role: 'assistant',
  type: 'question',
  message: "Hello, I am Dr. FirstCare. I am here to help with any health concern, any time. What is happening right now?",
  options: [
    'Fever or high temperature',
    'Chest pain or breathing problem',
    'Child is sick',
    'Bleeding or injury',
    'I feel very unwell',
    'Something else'
  ],
  conditionLink: null,
  severity: 'low'
}

function cleanMessage(text) {
  if (!text) return ''
  return text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,3}\s/gm, '')
    .replace(/"type":\s*"[^"]*",?\s*/g, '')
    .replace(/"options":\s*\[[^\]]*\],?\s*/g, '')
    .replace(/"conditionLink":\s*(null|"[^"]*"),?\s*/g, '')
    .replace(/"severity":\s*"[^"]*",?\s*/g, '')
    .replace(/"message":\s*"/g, '')
    .replace(/^[{"\s]+/, '')
    .replace(/[}"]+$/, '')
    .trim()
}

export default function FABChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [messages, open])

  useEffect(() => {
    if (showInput && open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [showInput, open])

  async function sendMessage(text) {
    if (!text.trim() || loading) return

    const userMessage = { role: 'user', message: text.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setShowInput(false)
    setLoading(true)

    const history = updatedMessages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.message }))

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: history.slice(0, -1)
        })
      })

      const data = await res.json()

      // Clean the message as a safety net
      const cleanedMessage = cleanMessage(data.message || '')

      setMessages(prev => [...prev, {
        role: 'assistant',
        type: data.type || 'guidance',
        message: cleanedMessage || 'I was unable to process that. Please try again.',
        options: Array.isArray(data.options) ? data.options : [],
        conditionLink: data.conditionLink || null,
        severity: data.severity || 'medium'
      }])

    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        type: 'guidance',
        message: 'I lost connection for a moment. Please check your internet and try again. For anything urgent, use the Emergency section.',
        options: [],
        conditionLink: null,
        severity: 'low'
      }])
    }

    setLoading(false)
  }

  function handleOption(option) { sendMessage(option) }

  function handleSubmit() {
    if (input.trim()) sendMessage(input.trim())
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleGoToCondition(slug) {
    router.push(`/condition/${slug}`)
    setOpen(false)
  }

  function resetChat() {
    setMessages([INITIAL_MESSAGE])
    setInput('')
    setShowInput(false)
    setLoading(false)
  }

  const lastMessage = messages[messages.length - 1]
  const isEmergency = lastMessage?.type === 'emergency' ||
    lastMessage?.severity === 'emergency'

  return (
    <>
      {/* FAB Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Dr. FirstCare AI Chat"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6741D9, #5433B0)',
            border: '2px solid rgba(103,65,217,0.4)',
            boxShadow: '0 4px 20px rgba(103,65,217,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fabPulse 3s ease-in-out infinite'
          }}>
          <span style={{ fontSize: '1.5rem' }}>🩺</span>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)'
            }}
          />

          {/* Panel */}
          <div style={{
            position: 'relative',
            background: '#0F1923',
            borderRadius: '24px 24px 0 0',
            border: '1px solid rgba(255,255,255,0.08)',
            borderBottom: 'none',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.3s ease'
          }}>

            {/* Handle */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0 0'
            }}>
              <div style={{
                width: '40px',
                height: '4px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '2px'
              }} />
            </div>

            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #6741D9, #5433B0)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>🩺</div>
                <div>
                  <p style={{
                    color: '#F5F0E8',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    margin: 0,
                    fontFamily: "'DM Sans', sans-serif"
                  }}>Dr. FirstCare</p>
                  <p style={{
                    color: '#2F9E44',
                    fontSize: '0.68rem',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: '#2F9E44',
                      borderRadius: '50%',
                      display: 'inline-block'
                    }} />
                    AI Medical Guidance
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {messages.length > 1 && (
                  <button
                    onClick={resetChat}
                    style={{
                      color: '#5C6E7E',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      minHeight: 0
                    }}>
                    New chat
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    color: '#9BA8B5',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 0
                  }}>×</button>
              </div>
            </div>

            {/* Emergency banner */}
            {isEmergency && (
              <div style={{
                background: 'rgba(224,49,49,0.12)',
                borderBottom: '1px solid rgba(224,49,49,0.3)',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🚨</span>
                <p style={{
                  color: '#E03131',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  margin: 0
                }}>
                  This may be an emergency — act immediately
                </p>
              </div>
            )}

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}>

                  {/* Message bubble */}
                  <div style={{
                    maxWidth: '88%',
                    background: msg.role === 'user'
                      ? 'rgba(103,65,217,0.2)'
                      : msg.type === 'emergency'
                        ? 'rgba(224,49,49,0.1)'
                        : '#1C2B3A',
                    border: msg.role === 'user'
                      ? '1px solid rgba(103,65,217,0.35)'
                      : msg.type === 'emergency'
                        ? '1px solid rgba(224,49,49,0.3)'
                        : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: msg.role === 'user'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    padding: '12px 14px'
                  }}>
                    <p style={{
                      color: '#F5F0E8',
                      fontSize: '0.9rem',
                      lineHeight: '1.65',
                      margin: 0,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.message}
                    </p>
                  </div>

                  {/* Condition link */}
                  {msg.conditionLink && (
                    <button
                      onClick={() => handleGoToCondition(msg.conditionLink)}
                      style={{
                        background: 'rgba(240,140,0,0.1)',
                        border: '1px solid rgba(240,140,0,0.3)',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        maxWidth: '88%',
                        minHeight: '44px'
                      }}>
                      <span>📋</span>
                      <p style={{
                        color: '#F08C00',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        margin: 0,
                        textAlign: 'left'
                      }}>
                        See full step-by-step guide →
                      </p>
                    </button>
                  )}

                  {/* Options */}
                  {msg.options && msg.options.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      width: '100%',
                      maxWidth: '88%'
                    }}>
                      {msg.options.map((option, j) => (
                        <button
                          key={j}
                          onClick={() => handleOption(option)}
                          disabled={loading || i < messages.length - 1}
                          style={{
                            background: i === messages.length - 1
                              ? '#1C2B3A'
                              : 'rgba(28,43,58,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '11px 14px',
                            cursor: i === messages.length - 1
                              ? 'pointer' : 'default',
                            textAlign: 'left',
                            opacity: i < messages.length - 1 ? 0.4 : 1,
                            minHeight: '44px',
                            transition: 'background 0.15s'
                          }}>
                          <p style={{
                            color: '#F5F0E8',
                            fontSize: '0.88rem',
                            margin: 0,
                            lineHeight: '1.3'
                          }}>
                            {option}
                          </p>
                        </button>
                      ))}

                      {/* Type instead option */}
                      {i === messages.length - 1 && !showInput && (
                        <button
                          onClick={() => setShowInput(true)}
                          style={{
                            background: 'transparent',
                            border: '1px dashed rgba(255,255,255,0.15)',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            minHeight: '44px'
                          }}>
                          <p style={{
                            color: '#5C6E7E',
                            fontSize: '0.8rem',
                            margin: 0
                          }}>
                            ✏️ Describe it yourself instead
                          </p>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 0'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#6741D9',
                      animation: `fabDot 1.2s ease-in-out ${i * 0.2}s infinite`
                    }} />
                  ))}
                  <span style={{
                    color: '#5C6E7E',
                    fontSize: '0.75rem',
                    marginLeft: '4px'
                  }}>
                    Dr. FirstCare is thinking...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {(showInput ||
              messages[messages.length - 1]?.options?.length === 0
            ) && (
              <div style={{
                padding: '12px 16px 20px',
                borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe what's happening..."
                    maxLength={600}
                    disabled={loading}
                    style={{
                      flex: 1,
                      background: '#1C2B3A',
                      border: '1px solid rgba(103,65,217,0.4)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      color: '#F5F0E8',
                      fontSize: '0.9rem',
                      fontFamily: "'DM Sans', sans-serif",
                      outline: 'none',
                      minHeight: '48px'
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
                      borderRadius: '12px',
                      width: '48px',
                      cursor: loading || !input.trim()
                        ? 'not-allowed' : 'pointer',
                      color: 'white',
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '48px',
                      flexShrink: 0,
                      transition: 'background 0.2s'
                    }}>
                    →
                  </button>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{
              padding: '0 16px 20px',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#3D5166',
                fontSize: '0.65rem',
                lineHeight: '1.5',
                margin: 0
              }}>
                AI guidance only · Does not replace a doctor ·
                For emergencies tap 🚨 Emergency on home screen
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(103,65,217,0.5); }
          50% { box-shadow: 0 4px 32px rgba(103,65,217,0.8), 0 0 0 8px rgba(103,65,217,0.1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fabDot {
          0%, 100% { opacity: 0.3; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
        }
