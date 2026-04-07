'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const categoryColors = {
  emergency: '#E03131',
  acute: '#D4500A',
  common: '#1971C2',
  'womens-health': '#6741D9',
  chronic: '#0C8599',
  'maternal-child': '#2F9E44'
}

const categoryLabels = {
  emergency: 'Emergency',
  acute: 'Acute',
  common: 'Common',
  'womens-health': "Women's Health",
  chronic: 'Chronic',
  'maternal-child': 'Maternal & Child'
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setSelectedIndex(-1)
      return
    }

    // Debounce — wait 250ms after typing stops
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        )
        const data = await res.json()
        setResults(data.results || [])
        setSelectedIndex(-1)
      } catch {
        setResults([])
      }
      setLoading(false)
    }, 250)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  function handleSelect(result) {
    router.push(`/condition/${result.id}`)
    setQuery('')
    setResults([])
    setFocused(false)
    inputRef.current?.blur()
  }

  function handleKeyDown(e) {
    if (!results.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i =>
        i < results.length - 1 ? i + 1 : 0
      )
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i =>
        i > 0 ? i - 1 : results.length - 1
      )
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSelect(results[selectedIndex])
      } else if (results.length > 0) {
        handleSelect(results[0])
      }
    }
    if (e.key === 'Escape') {
      setQuery('')
      setResults([])
      inputRef.current?.blur()
    }
  }

  const showDropdown = focused &&
    (results.length > 0 || (loading && query.length >= 2))

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>

      {/* Search input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#1C2B3A',
        border: `1px solid ${focused
          ? 'rgba(240,140,0,0.5)'
          : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '14px',
        padding: '12px 16px',
        transition: 'border-color 0.2s',
        boxShadow: focused
          ? '0 0 0 3px rgba(240,140,0,0.08)'
          : 'none'
      }}>
        {/* Search icon */}
        <span style={{
          color: focused ? '#F08C00' : '#5C6E7E',
          fontSize: '1rem',
          flexShrink: 0,
          transition: 'color 0.2s'
        }}>
          🔍
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // Delay so tap on result registers first
            setTimeout(() => setFocused(false), 150)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search any condition, symptom..."
          maxLength={100}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#F5F0E8',
            fontSize: '0.95rem',
            fontFamily: "'DM Sans', sans-serif"
          }}
        />

        {/* Loading spinner */}
        {loading && (
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(240,140,0,0.3)',
            borderTop: '2px solid #F08C00',
            borderRadius: '50%',
            flexShrink: 0,
            animation: 'spin 0.6s linear infinite'
          }} />
        )}

        {/* Clear button */}
        {query.length > 0 && !loading && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              inputRef.current?.focus()
            }}
            style={{
              color: '#5C6E7E',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              minHeight: 0,
              padding: '2px',
              flexShrink: 0
            }}>
            ×
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: '#162030',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          overflow: 'hidden',
          zIndex: 100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>

          {results.length === 0 && !loading && (
            <div style={{
              padding: '16px',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#5C6E7E',
                fontSize: '0.85rem',
                margin: 0
              }}>
                No results for "{query}"
              </p>
              <p style={{
                color: '#3D5166',
                fontSize: '0.75rem',
                marginTop: '6px',
                marginBottom: 0
              }}>
                Try the AI triage instead →
              </p>
            </div>
          )}

          {results.map((result, i) => {
            const color = categoryColors[result.category]
            const isSelected = i === selectedIndex

            return (
              <button
                key={result.id}
                onClick={() => handleSelect(result)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  background: isSelected
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
                  border: 'none',
                  borderBottom: i < results.length - 1
                    ? '1px solid rgba(255,255,255,0.04)'
                    : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  minHeight: '60px'
                }}>

                {/* Icon */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  background: `${color}20`,
                  border: `1px solid ${color}30`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  flexShrink: 0
                }}>
                  {result.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    color: '#F5F0E8',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    margin: '0 0 3px 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {result.title}
                  </p>
                  <p style={{
                    color: '#9BA8B5',
                    fontSize: '0.72rem',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {result.summary?.slice(0, 60)}
                    {result.summary?.length > 60 ? '...' : ''}
                  </p>
                </div>

                {/* Category badge */}
                <div style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  borderRadius: '6px',
                  padding: '3px 7px',
                  flexShrink: 0
                }}>
                  <span style={{
                    color: color,
                    fontSize: '0.62rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    {categoryLabels[result.category]}
                  </span>
                </div>

              </button>
            )
          })}

          {/* AI fallback at bottom of results */}
          {results.length > 0 && (
            <button
              onClick={() => {
                router.push('/triage')
                setQuery('')
                setResults([])
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(103,65,217,0.06)',
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '44px'
              }}>
              <span style={{ fontSize: '0.85rem' }}>🔍</span>
              <p style={{
                color: '#6741D9',
                fontSize: '0.78rem',
                fontWeight: '600',
                margin: 0
              }}>
                Not what you're looking for? Ask the AI instead
              </p>
            </button>
          )}

        </div>
      )}

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  )
}
