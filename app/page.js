'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '../components/ShareButton'

// Onboarding modal — shows once per visitor
function OnboardingModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: '#0F1E30',
        border: '1px solid rgba(232,160,32,0.2)',
        borderRadius: '24px 24px 0 0',
        padding: '32px 24px 40px',
        maxWidth: '520px',
        width: '100%',
        animation: 'slideUp 0.4s ease'
      }}>
        <div style={{
          width: '40px',
          height: '4px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '2px',
          margin: '0 auto 28px'
        }} />

        <div style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #E8A020, #C4622D)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          marginBottom: '20px'
        }}>
          ✚
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.6rem',
          color: '#F2EDE4',
          marginBottom: '14px',
          lineHeight: '1.2',
          fontWeight: '700'
        }}>
          Before you continue
        </h2>

        <p style={{
          color: '#9BA8B5',
          fontSize: '0.9rem',
          lineHeight: '1.7',
          marginBottom: '16px'
        }}>
          FirstCare Africa provides general medical guidance
          based on WHO and international first-aid protocols.
          It is designed to help when professional care is
          unavailable, delayed, or out of reach.
        </p>

        <div style={{
          background: 'rgba(232,160,32,0.08)',
          border: '1px solid rgba(232,160,32,0.2)',
          borderRadius: '14px',
          padding: '14px 16px',
          marginBottom: '24px'
        }}>
          <p style={{
            color: 'rgba(232,160,32,0.9)',
            fontSize: '0.82rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            ⚕️ This app does not replace a doctor.
            Drug guidance is for reference only —
            always confirm with a pharmacist.
            In a true emergency, seek professional
            help as soon as possible.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #E8A020, #C4622D)',
              border: 'none',
              borderRadius: '14px',
              padding: '16px',
              color: 'white',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
              letterSpacing: '0.02em'
            }}>
            I Understand — Enter FirstCare Africa
          </button>

          <p style={{
            color: '#3D5166',
            fontSize: '0.72rem',
            textAlign: 'center',
            margin: 0,
            lineHeight: '1.5'
          }}>
            This notice is shown once.
            No account or data required.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Animated ECG pulse line
function PulseLine() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '80px',
      transform: 'translateY(-50%)',
      overflow: 'hidden',
      opacity: 0.25,
      pointerEvents: 'none'
    }}>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{
          width: '200%',
          height: '100%',
          animation: 'pulseSweep 6s linear infinite'
        }}>
        <polyline
          points="0,40 100,40 120,40 140,10 160,70 180,40 200,40 220,40 240,20 260,60 280,40 300,40 400,40 420,40 440,5 460,75 480,30 500,55 520,40 540,40 640,40 660,40 680,10 700,70 720,40 740,40 840,40 860,20 880,60 900,40 1000,40 1020,40 1040,5 1060,75 1080,30 1100,55 1120,40 1200,40"
          fill="none"
          stroke="#E8A020"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style>{`
        @keyframes pulseSweep {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

// Stat card component
function StatCard({ number, label, sub }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '20px 16px',
      textAlign: 'center',
      flex: '1',
      minWidth: '100px'
    }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2rem',
        fontWeight: '800',
        color: '#E8A020',
        margin: '0 0 4px',
        lineHeight: 1
      }}>
        {number}
      </p>
      <p style={{
        color: '#F2EDE4',
        fontSize: '0.78rem',
        fontWeight: '600',
        margin: '0 0 2px',
        lineHeight: 1.3
      }}>
        {label}
      </p>
      {sub && (
        <p style={{
          color: '#5C6E7E',
          fontSize: '0.65rem',
          margin: 0,
          lineHeight: 1.3
        }}>
          {sub}
        </p>
      )}
    </div>
  )
}

// Section label component
function SectionLabel({ children, color = '#E8A020' }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    }}>
      <div style={{
        width: '24px',
        height: '2px',
        background: color,
        borderRadius: '1px'
      }} />
      <span style={{
        color: color,
        fontSize: '0.68rem',
        fontWeight: '700',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        {children}
      </span>
    </div>
  )
}

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false)
  const [hasVisited, setHasVisited] = useState(true)

  useEffect(() => {
    try {
      const visited = localStorage.getItem('fca_visited')
      if (!visited) {
        setShowModal(true)
        setHasVisited(false)
      }
    } catch {
      // localStorage not available — skip modal
    }
  }, [])

  function handleModalClose() {
    try {
      localStorage.setItem('fca_visited', 'true')
    } catch {
      // ignore
    }
    setShowModal(false)
    setHasVisited(true)
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: '#0A1628',
      color: '#F2EDE4',
      overflowX: 'hidden'
    }}>

      {/* Onboarding modal */}
      {showModal && (
        <OnboardingModal onClose={handleModalClose} />
      )}

      {/* ── NAVIGATION ───────────────────────────── */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10,22,40,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 20px'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #E8A020, #C4622D)',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              flexShrink: 0,
              boxShadow: '0 2px 12px rgba(232,160,32,0.3)'
            }}>✚</div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              color: '#F2EDE4',
              fontWeight: '700',
              letterSpacing: '-0.01em'
            }}>
              FirstCare
              <span style={{ color: '#E8A020' }}> Africa</span>
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Link href="/category/emergency" style={{
              color: '#9BA8B5',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: '500',
              display: 'none'
            }}>
              Conditions
            </Link>
            <Link href="/category/emergency" style={{
              background: 'linear-gradient(135deg, #E03131, #C92A2A)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: '700',
              letterSpacing: '0.02em',
              boxShadow: '0 2px 12px rgba(224,49,49,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: 0
            }}>
              🚨 Open App
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '80px 20px'
      }}>

        {/* Background mesh gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 10% 50%,
              rgba(232,160,32,0.06) 0%,
              transparent 60%),
            radial-gradient(ellipse 60% 80% at 90% 30%,
              rgba(196,98,45,0.05) 0%,
              transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 100%,
              rgba(103,65,217,0.04) 0%,
              transparent 50%)
          `,
          pointerEvents: 'none'
        }} />

        {/* Grain texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.6
        }} />

        {/* ECG pulse line */}
        <PulseLine />

        {/* Grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>

          {/* Pre-headline badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(232,160,32,0.1)',
            border: '1px solid rgba(232,160,32,0.25)',
            borderRadius: '20px',
            padding: '6px 14px',
            marginBottom: '28px',
            animation: 'fadeInUp 0.6s ease 0.1s both'
          }}>
            <div style={{
              width: '7px',
              height: '7px',
              background: '#E8A020',
              borderRadius: '50%',
              animation: 'blink 2s ease-in-out infinite'
            }} />
            <span style={{
              color: '#E8A020',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              Free · Works Offline · No Login Required
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 8vw, 5rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '700px',
            animation: 'fadeInUp 0.6s ease 0.2s both'
          }}>
            When the doctor
            <span style={{
              display: 'block',
              color: '#E8A020',
              fontStyle: 'italic'
            }}>
              is hours away —
            </span>
            <span style={{ color: '#F2EDE4' }}>
              we are already there.
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            color: '#9BA8B5',
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            lineHeight: '1.7',
            maxWidth: '520px',
            marginBottom: '40px',
            animation: 'fadeInUp 0.6s ease 0.3s both'
          }}>
            Emergency guidance. Illness advice. Drug recommendations.
            AI-powered medical knowledge — built for the millions
            across Africa where professional care is far,
            unavailable, or hasn't arrived yet.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '56px',
            animation: 'fadeInUp 0.6s ease 0.4s both'
          }}>
            <Link href="/category/emergency" style={{
              background: 'linear-gradient(135deg, #E03131, #C92A2A)',
              color: 'white',
              textDecoration: 'none',
              padding: '16px 28px',
              borderRadius: '14px',
              fontSize: '1rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: 0,
              boxShadow: '0 4px 24px rgba(224,49,49,0.35)',
              letterSpacing: '0.02em'
            }}>
              🚨 Open App Now
            </Link>
            <a href="#how-it-works" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#F2EDE4',
              textDecoration: 'none',
              padding: '16px 28px',
              borderRadius: '14px',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: 0
            }}>
              Learn More ↓
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '12px',
            animation: 'fadeInUp 0.6s ease 0.5s both',
            flexWrap: 'wrap'
          }}>
            <StatCard number="75+" label="Conditions Covered" sub="Across 7 categories" />
            <StatCard number="1 in 5" label="Africans" sub="Has no nearby doctor" />
            <StatCard number="0₦" label="Forever Free" sub="No account needed" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInUp 0.6s ease 0.8s both'
        }}>
          <span style={{
            color: '#3D5166',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #3D5166, transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite'
          }} />
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────── */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(180deg, #0A1628 0%, #0D1E35 100%)',
        position: 'relative'
      }}>
        {/* Diagonal top divider */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: '#0A1628',
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>The Problem</SectionLabel>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: '20px'
              }}>
                The gap between
                needing help and
                <span style={{
                  color: '#E8A020',
                  fontStyle: 'italic',
                  display: 'block'
                }}>
                  getting it costs lives.
                </span>
              </h2>
              <p style={{
                color: '#9BA8B5',
                fontSize: '0.95rem',
                lineHeight: '1.75',
                maxWidth: '440px'
              }}>
                Across Sub-Saharan Africa, the reality is stark.
                Hospitals are hours away. Ambulances are unavailable.
                Trained help hasn't arrived. And in those critical
                minutes, most people have nothing to turn to.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                {
                  stat: '1 doctor',
                  desc: 'per 5,000 people across Sub-Saharan Africa',
                  source: 'WHO Global Health Observatory'
                },
                {
                  stat: '50%+',
                  desc: 'of Africans live more than 5km from a health facility',
                  source: 'World Bank Health Data'
                },
                {
                  stat: 'Millions',
                  desc: 'die annually from conditions treatable with early intervention',
                  source: 'Lancet Global Health'
                }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '3px solid #E8A020',
                  borderRadius: '0 14px 14px 0',
                  padding: '16px 20px'
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    color: '#E8A020',
                    margin: '0 0 4px'
                  }}>
                    {item.stat}
                  </p>
                  <p style={{
                    color: '#F2EDE4',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    margin: '0 0 4px'
                  }}>
                    {item.desc}
                  </p>
                  <p style={{
                    color: '#3D5166',
                    fontSize: '0.65rem',
                    margin: 0,
                    letterSpacing: '0.03em'
                  }}>
                    {item.source}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bridge statement */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(232,160,32,0.08), rgba(196,98,45,0.08))',
            border: '1px solid rgba(232,160,32,0.15)',
            borderRadius: '20px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: '700',
              color: '#F2EDE4',
              lineHeight: '1.5',
              margin: 0
            }}>
              "FirstCareAfrica was built for the gap — the critical
              hours between when something goes wrong and when
              professional help finally arrives."
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" style={{
        padding: '100px 20px',
        background: '#0D1E35'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>Getting Started</SectionLabel>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            maxWidth: '500px'
          }}>
            No app store.
            <span style={{ color: '#E8A020', fontStyle: 'italic' }}>
              {' '}No account.{' '}
            </span>
            No waiting.
          </h2>

          <p style={{
            color: '#9BA8B5',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            marginBottom: '48px',
            maxWidth: '440px'
          }}>
            Open it on any phone, any browser, anywhere.
            Works offline after the first visit.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                number: '01',
                title: 'Open the website',
                desc: 'Visit firstcareafrica.health on any phone or computer. No download. No sign-up. Just open it.',
                icon: '🌐'
              },
              {
                number: '02',
                title: 'Find your situation',
                desc: 'Search by symptom, browse by category, or tap the AI doctor button and describe what\'s happening in plain language.',
                icon: '🔍'
              },
              {
                number: '03',
                title: 'Get clear guidance',
                desc: 'Step-by-step instructions, drug recommendations with safety checks, and red flags that tell you when to go to hospital.',
                icon: '✅'
              }
            ].map((step, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: 'rgba(232,160,32,0.08)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em'
                }}>
                  {step.number}
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  marginBottom: '16px'
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#F2EDE4',
                  marginBottom: '10px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: '#9BA8B5',
                  fontSize: '0.85rem',
                  lineHeight: '1.65',
                  margin: 0
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ────────────────────────── */}
      <section style={{
        padding: '100px 20px',
        background: '#0A1628',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>What's Inside</SectionLabel>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start'
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: '20px'
              }}>
                75+ conditions.
                <span style={{
                  color: '#E8A020',
                  fontStyle: 'italic',
                  display: 'block'
                }}>
                  Every emergency.
                </span>
                Any situation.
              </h2>
              <p style={{
                color: '#9BA8B5',
                fontSize: '0.9rem',
                lineHeight: '1.75',
                marginBottom: '28px',
                maxWidth: '380px'
              }}>
                From severe bleeding to malaria to mental health —
                comprehensive guidance built specifically for
                African health contexts. Drug names you can
                actually find at your local pharmacy.
              </p>
              <Link href="/category/emergency" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#E8A020',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderBottom: '1px solid rgba(232,160,32,0.3)',
                paddingBottom: '2px',
                minHeight: 0
              }}>
                Browse all conditions →
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              {[
                { icon: '🚨', label: 'Emergency', count: '16 conditions', color: '#E03131', href: '/category/emergency' },
                { icon: '🤒', label: 'Acute Illness', count: '12 conditions', color: '#D4500A', href: '/category/acute' },
                { icon: '💊', label: 'Common Conditions', count: '13 conditions', color: '#1971C2', href: '/category/common' },
                { icon: '🌸', label: "Women's Health", count: '8 conditions', color: '#6741D9', href: '/category/womens-health' },
                { icon: '🫀', label: 'Chronic', count: '8 conditions', color: '#0C8599', href: '/category/chronic' },
                { icon: '👶', label: 'Maternal & Child', count: '10 conditions', color: '#2F9E44', href: '/category/maternal-child' },
                { icon: '🔬', label: 'Sexual Health', count: '6 conditions', color: '#0C8599', href: '/category/sexual-health' },
                { icon: '🤖', label: 'AI Doctor', count: 'Anything else', color: '#6741D9', href: '/triage' }
              ].map((cat, i) => (
                <Link key={i} href={cat.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderTop: `2px solid ${cat.color}`,
                    borderRadius: '0 0 14px 14px',
                    padding: '14px 12px',
                    cursor: 'pointer',
                    minHeight: '90px'
                  }}>
                    <span style={{
                      fontSize: '1.2rem',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      {cat.icon}
                    </span>
                    <p style={{
                      color: '#F2EDE4',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      margin: '0 0 2px'
                    }}>
                      {cat.label}
                    </p>
                    <p style={{
                      color: '#5C6E7E',
                      fontSize: '0.65rem',
                      margin: 0
                    }}>
                      {cat.count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderTop: `2px solid ${cat.color}`,
                  borderRadius: '0 0 14px 14px',
                  padding: '14px 12px'
                }}>
                  <span style={{
                    fontSize: '1.2rem',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    {cat.icon}
                  </span>
                  <p style={{
                    color: '#F2EDE4',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    margin: '0 0 2px'
                  }}>
                    {cat.label}
                  </p>
                  <p style={{
                    color: '#5C6E7E',
                    fontSize: '0.65rem',
                    margin: 0
                  }}>
                    {cat.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DR FIRSTCARE AI ───────────────────────── */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(180deg, #0D1E35 0%, #0A1628 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(103,65,217,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          <SectionLabel color="#6741D9">AI Doctor</SectionLabel>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: '20px'
              }}>
                Meet
                <span style={{
                  color: '#8B5CF6',
                  fontStyle: 'italic'
                }}>
                  {' '}Dr. FirstCare.
                </span>
              </h2>
              <p style={{
                color: '#9BA8B5',
                fontSize: '0.95rem',
                lineHeight: '1.75',
                marginBottom: '24px',
                maxWidth: '420px'
              }}>
                An AI clinical advisor available 24 hours a day.
                Describe any symptom in plain language — including
                typos, incomplete sentences, or describing it for
                someone else. Dr. FirstCare asks the right
                questions, then gives structured guidance.
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '28px'
              }}>
                {[
                  'Asks safety questions before recommending drugs',
                  'Covers conditions not listed in the app',
                  'Understands African drug brands and availability',
                  'Tells you exactly when to go to hospital'
                ].map((point, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <span style={{
                      color: '#8B5CF6',
                      fontSize: '0.85rem',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      ✓
                    </span>
                    <p style={{
                      color: '#9BA8B5',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock conversation */}
            <div style={{
              background: '#0F1E30',
              border: '1px solid rgba(103,65,217,0.2)',
              borderRadius: '20px',
              overflow: 'hidden'
            }}>
              {/* Chat header */}
              <div style={{
                background: 'rgba(103,65,217,0.1)',
                borderBottom: '1px solid rgba(103,65,217,0.15)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #6741D9, #5433B0)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  🩺
                </div>
                <div>
                  <p style={{
                    color: '#F2EDE4',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    margin: 0
                  }}>
                    Dr. FirstCare
                  </p>
                  <p style={{
                    color: '#2F9E44',
                    fontSize: '0.65rem',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{
                      width: '5px',
                      height: '5px',
                      background: '#2F9E44',
                      borderRadius: '50%',
                      display: 'inline-block'
                    }} />
                    AI Medical Guidance
                  </p>
                </div>
              </div>

              {/* Conversation */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* AI message */}
                <div style={{
                  background: '#1C2B3A',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px 12px 12px 4px',
                  padding: '12px 14px',
                  maxWidth: '85%'
                }}>
                  <p style={{
                    color: '#F2EDE4',
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    What's happening right now?
                  </p>
                </div>

                {/* Option buttons */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  maxWidth: '85%'
                }}>
                  {['Fever or high temperature', 'Child is sick', 'Chest pain or breathing'].map((opt, i) => (
                    <div key={i} style={{
                      background: '#1C2B3A',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      padding: '9px 12px'
                    }}>
                      <p style={{
                        color: '#F2EDE4',
                        fontSize: '0.78rem',
                        margin: 0
                      }}>
                        {opt}
                      </p>
                    </div>
                  ))}
                </div>

                {/* User reply */}
                <div style={{
                  alignSelf: 'flex-end',
                  background: 'rgba(103,65,217,0.2)',
                  border: '1px solid rgba(103,65,217,0.3)',
                  borderRadius: '12px 12px 4px 12px',
                  padding: '10px 14px',
                  maxWidth: '85%'
                }}>
                  <p style={{
                    color: '#F2EDE4',
                    fontSize: '0.82rem',
                    margin: 0
                  }}>
                    My 3 year old has fever
                  </p>
                </div>

                {/* AI follow-up */}
                <div style={{
                  background: '#1C2B3A',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px 12px 12px 4px',
                  padding: '12px 14px',
                  maxWidth: '90%'
                }}>
                  <p style={{
                    color: '#F2EDE4',
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Before I advise, how high is the temperature?
                  </p>
                </div>

                {/* Options */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  maxWidth: '85%'
                }}>
                  {['Above 39°C (very hot)', '38 to 39°C (warm)', 'No thermometer'].map((opt, i) => (
                    <div key={i} style={{
                      background: '#1C2B3A',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      padding: '9px 12px'
                    }}>
                      <p style={{
                        color: '#F2EDE4',
                        fontSize: '0.78rem',
                        margin: 0
                      }}>
                        {opt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TRUST US ─────────────────────────── */}
      <section style={{
        padding: '100px 20px',
        background: '#0A1628'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>Why Trust Us</SectionLabel>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: '800',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '48px',
            maxWidth: '500px'
          }}>
            Built with
            <span style={{ color: '#E8A020', fontStyle: 'italic' }}>
              {' '}medical rigour.
            </span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '48px'
          }}>
            {[
              {
                icon: '⚕️',
                title: 'Medically Reviewed',
                desc: 'All content reviewed by medical professionals before publication. Based on WHO, Red Cross, and international first-aid protocols.',
                accent: '#E8A020'
              },
              {
                icon: '🌍',
                title: 'Africa-Specific',
                desc: 'Drug names, brands, and dosages match what is actually available at pharmacies across Nigeria, Kenya, Ghana, and beyond.',
                accent: '#2F9E44'
              },
              {
                icon: '📶',
                title: 'Offline First',
                desc: 'Works after a single visit even without internet connection. Built for areas where data is expensive or unavailable.',
                accent: '#1971C2'
              },
              {
                icon: '🔒',
                title: 'Private By Design',
                desc: 'No account. No tracking. No data collection. Your health questions stay on your device. Always.',
                accent: '#6741D9'
              }
            ].map((trust, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '28px 24px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: `${trust.accent}15`,
                  border: `1px solid ${trust.accent}30`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  marginBottom: '16px'
                }}>
                  {trust.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#F2EDE4',
                  marginBottom: '10px'
                }}>
                  {trust.title}
                </h3>
                <p style={{
                  color: '#9BA8B5',
                  fontSize: '0.83rem',
                  lineHeight: '1.65',
                  margin: 0
                }}>
                  {trust.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Medical disclaimer box */}
          <div style={{
            background: 'rgba(232,160,32,0.06)',
            border: '1px solid rgba(232,160,32,0.15)',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
            maxWidth: '700px'
          }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⚕️</span>
            <p style={{
              color: 'rgba(232,160,32,0.8)',
              fontSize: '0.82rem',
              lineHeight: '1.6',
              margin: 0
            }}>
              FirstCare Africa provides general medical guidance only.
              It does not replace a doctor or professional medical advice.
              Always seek professional help when available.
              In a true emergency, call for help and go to the
              nearest clinic immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE STORY ────────────────────────────── */}
      <section style={{
        padding: '100px 20px',
        background: 'linear-gradient(180deg, #0D1E35 0%, #0A1628 100%)'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <SectionLabel>The Story</SectionLabel>

          <div style={{
            fontSize: '3rem',
            marginBottom: '24px',
            opacity: 0.6
          }}>
            📖
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            fontWeight: '800',
            lineHeight: '1.3',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            color: '#F2EDE4'
          }}>
            Inspired by a book written
            <span style={{ color: '#E8A020', fontStyle: 'italic' }}>
              {' '}for people just like you.
            </span>
          </h2>

          {/* Story placeholder — your personal words go here */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: '3px solid #E8A020',
            borderRadius: '0 16px 16px 0',
            padding: '24px 28px',
            textAlign: 'left',
            marginBottom: '28px'
          }}>
            <p style={{
              color: '#9BA8B5',
              fontSize: '0.95rem',
              lineHeight: '1.85',
              margin: 0,
              fontStyle: 'italic'
            }}>
              "Where There Is No Doctor is a book that has saved
              countless lives in rural communities — a practical
              guide for situations exactly like the ones
              FirstCare Africa addresses. That book proved that
              accessible medical knowledge saves lives.
              We built FirstCare Africa to prove it again,
              for a new generation, on the device already
              in every hand across Africa."
            </p>
            <p style={{
              color: '#5C6E7E',
              fontSize: '0.78rem',
              marginTop: '16px',
              marginBottom: 0
            }}>
              — Louis Nkan Enobong, Founder
            </p>
          </div>

          <p style={{
            color: '#5C6E7E',
            fontSize: '0.8rem',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}>
            Your personal story goes here. 2 to 3 sentences
            in your own voice about why you built this.
            Replace this placeholder before launch.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <section style={{
        padding: '100px 20px',
        background: '#0A1628',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background pulse */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%,
              rgba(232,160,32,0.05) 0%,
              transparent 70%)
          `,
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            marginBottom: '20px'
          }}>
            Someone you know
            <span style={{
              color: '#E8A020',
              fontStyle: 'italic',
              display: 'block'
            }}>
              needs this right now.
            </span>
          </h2>

          <p style={{
            color: '#9BA8B5',
            fontSize: '1rem',
            lineHeight: '1.7',
            marginBottom: '40px',
            maxWidth: '440px',
            margin: '0 auto 40px'
          }}>
            Share FirstCare Africa with your family,
            your community, and anyone who lives far
            from a hospital. It is free. It works offline.
            It could save a life.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            <Link href="/category/emergency" style={{
              background: 'linear-gradient(135deg, #E03131, #C92A2A)',
              color: 'white',
              textDecoration: 'none',
              padding: '18px 32px',
              borderRadius: '14px',
              fontSize: '1.05rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: 0,
              boxShadow: '0 4px 32px rgba(224,49,49,0.3)',
              letterSpacing: '0.02em'
            }}>
              🚨 Open FirstCare Africa
            </Link>
          </div>

          {/* Share buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            <a
              href="https://wa.me/?text=FirstCare%20Africa%20%E2%80%94%20Medical%20guidance%20when%20doctors%20aren't%20available.%20Works%20offline.%20Free%20forever.%20https%3A%2F%2Ffirstcareafrica.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.25)',
                borderRadius: '10px',
                padding: '10px 16px',
                color: '#25D366',
                fontSize: '0.82rem',
                fontWeight: '600',
                textDecoration: 'none',
                minHeight: '44px'
              }}>
              💬 WhatsApp
            </a>

            <a
              href="https://twitter.com/intent/tweet?text=FirstCare%20Africa%20%E2%80%94%20Medical%20guidance%20when%20doctors%20aren't%20available.%20Free%2C%20works%20offline.&url=https%3A%2F%2Ffirstcareafrica.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '10px 16px',
                color: '#F2EDE4',
                fontSize: '0.82rem',
                fontWeight: '600',
                textDecoration: 'none',
                minHeight: '44px'
              }}>
              𝕏 Twitter
            </a>

            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ffirstcareafrica.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(10,102,194,0.1)',
                border: '1px solid rgba(10,102,194,0.25)',
                borderRadius: '10px',
                padding: '10px 16px',
                color: '#0A66C2',
                fontSize: '0.82rem',
                fontWeight: '600',
                textDecoration: 'none',
                minHeight: '44px'
              }}>
              💼 LinkedIn
            </a>

            <ShareButton />
          </div>

          <p style={{
            color: '#3D5166',
            fontSize: '0.72rem',
            lineHeight: '1.6'
          }}>
            Free forever · Works offline · No account required ·
            Built for Africa
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 20px',
        background: '#060E1A'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #E8A020, #C4622D)',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  ✚
                </div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.95rem',
                  color: '#F2EDE4',
                  fontWeight: '700'
                }}>
                  FirstCare Africa
                </span>
              </div>
              <p style={{
                color: '#3D5166',
                fontSize: '0.75rem',
                lineHeight: '1.6',
                maxWidth: '260px',
                margin: 0
              }}>
                Medical guidance when doctors aren't available.
                Built for Africa. Free forever.
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap'
            }}>
              <div>
                <p style={{
                  color: '#F2EDE4',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  Conditions
                </p>
                {[
                  ['Emergency', '/category/emergency'],
                  ['Acute Illness', '/category/acute'],
                  ["Women's Health", '/category/womens-health'],
                  ['Maternal & Child', '/category/maternal-child']
                ].map(([label, href]) => (
                  <Link key={href} href={href} style={{
                    display: 'block',
                    color: '#5C6E7E',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    marginBottom: '6px',
                    minHeight: 0
                  }}>
                    {label}
                  </Link>
                ))}
              </div>

              <div>
                <p style={{
                  color: '#F2EDE4',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  Tools
                </p>
                {[
                  ['AI Doctor', '/triage'],
                  ['Quick Reference', '/quick-reference'],
                  ['Search', '/'],
                  ['Sexual Health', '/category/sexual-health']
                ].map(([label, href]) => (
                  <Link key={href} href={href} style={{
                    display: 'block',
                    color: '#5C6E7E',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    marginBottom: '6px',
                    minHeight: 0
                  }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <p style={{
              color: '#3D5166',
              fontSize: '0.7rem',
              margin: 0
            }}>
              © 2025 FirstCare Africa · Free forever · Built for Africa
            </p>
            <p style={{
              color: '#3D5166',
              fontSize: '0.7rem',
              margin: 0,
              textAlign: 'right',
              maxWidth: '400px',
              lineHeight: '1.5'
            }}>
              This platform provides general medical guidance only.
              It does not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>

      {/* Global animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>

    </div>
  )
  }
