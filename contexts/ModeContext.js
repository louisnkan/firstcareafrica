'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ModeContext = createContext({
  mode: 'patient',
  setMode: () => {},
  showAcknowledgment: false,
  acknowledgeClinicalMode: () => {}
})

export function ModeProvider({ children }) {
  const [mode, setModeState] = useState('patient')
  const [showAcknowledgment, setShowAcknowledgment] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fca_mode')
      if (saved === 'clinical' || saved === 'patient') {
        setModeState(saved)
      }
    } catch {
      // localStorage not available
    }
  }, [])

  function setMode(newMode) {
    if (newMode === 'clinical') {
      let acknowledged = false
      try {
        acknowledged = localStorage.getItem('fca_clinical_ack') === 'true'
      } catch {}

      if (!acknowledged) {
        setShowAcknowledgment(true)
        return
      }
    }

    setModeState(newMode)
    try {
      localStorage.setItem('fca_mode', newMode)
    } catch {}
  }

  function acknowledgeClinicalMode() {
    try {
      localStorage.setItem('fca_clinical_ack', 'true')
      localStorage.setItem('fca_mode', 'clinical')
    } catch {}
    setShowAcknowledgment(false)
    setModeState('clinical')
  }

  return (
    <ModeContext.Provider
      value={{ mode, setMode, showAcknowledgment, acknowledgeClinicalMode }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
