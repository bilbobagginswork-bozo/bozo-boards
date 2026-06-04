'use client'

import { useEffect, useState } from 'react'

export default function CursorToggle() {
  const [on, setOn] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('surfcursor')
    if (saved === 'off') setOn(false)
  }, [])

  const toggle = () => {
    const next = !on
    setOn(next)
    localStorage.setItem('surfcursor', next ? 'on' : 'off')
    window.dispatchEvent(new CustomEvent('surfcursor', { detail: next }))
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle surfboard cursor"
      title={on ? 'Disable surfboard cursor' : 'Enable surfboard cursor'}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-white/50 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-800 dark:hover:text-white transition text-sm"
    >
      <svg viewBox="0 0 14 36" width="8" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: on ? 1 : 0.35 }}>
        <path d="M7,1 C10,2.5 12,8.5 12,18 C12,27.5 10,33 7,35 C4,33 2,27.5 2,18 C2,8.5 4,2.5 7,1 Z"
          fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
        <line x1="7" y1="1" x2="7" y2="35" stroke="white" strokeWidth="0.6" strokeDasharray="2 1.5" strokeOpacity="0.5"/>
      </svg>
    </button>
  )
}
