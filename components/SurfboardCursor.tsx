'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

function Board() {
  return (
    <svg width="18" height="46" viewBox="0 0 18 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9,1 C13,3 16,11 16,23 C16,35 13,42 9,45 C5,42 2,35 2,23 C2,11 5,3 9,1 Z"
        fill="white" stroke="#2BD9C6" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="9" y1="1" x2="9" y2="45" stroke="#2BD9C6" strokeWidth="0.75" strokeDasharray="3 2"/>
    </svg>
  )
}

function BrokenBoard() {
  return (
    <svg width="22" height="52" viewBox="0 0 22 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9,1 C13,3 16,11 16,22 L2,25 C2,13 5,3 9,1 Z"
        fill="white" stroke="#2BD9C6" strokeWidth="1.5"/>
      <path d="M16.5,26 C17,34 14,42 9.5,47 C5.5,44 2.5,35 3,27 L16.5,26 Z"
        fill="white" stroke="#2BD9C6" strokeWidth="1.5" transform="translate(1,1)"/>
      <path d="M7,20 L11,24 L6,29 L12,33" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="14" y1="22" x2="18" y2="18" stroke="#ef4444" strokeWidth="1.2"/>
      <line x1="15" y1="25" x2="20" y2="24" stroke="#ef4444" strokeWidth="1.2"/>
    </svg>
  )
}

export default function SurfboardCursor() {
  const pathname = usePathname()
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [broken, setBroken] = useState(false)
  const [active, setActive] = useState(false) // true when cursor should show

  const isAdmin = pathname.startsWith('/admin')

  // Read enabled preference
  const [enabled, setEnabled] = useState(true)
  useEffect(() => {
    if (localStorage.getItem('surfcursor') === 'off') setEnabled(false)
    const handler = (e: Event) => setEnabled((e as CustomEvent<boolean>).detail)
    window.addEventListener('surfcursor', handler)
    return () => window.removeEventListener('surfcursor', handler)
  }, [])

  const triggerBreak = useCallback(() => {
    setBroken(true)
    setTimeout(() => setBroken(false), 600)
  }, [])

  useEffect(() => {
    const shouldShow = !isAdmin && enabled
    if (!shouldShow) {
      document.body.classList.remove('hide-cursor')
      setActive(false)
      return
    }
    const hasMouse = window.matchMedia('(pointer: fine)').matches
    if (!hasMouse) return

    document.body.classList.add('hide-cursor')
    setActive(true)

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', triggerBreak)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', triggerBreak)
      document.body.classList.remove('hide-cursor')
    }
  }, [isAdmin, enabled, triggerBreak])

  if (!active) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -20%)' }}
    >
      {broken ? <BrokenBoard /> : <Board />}
    </div>
  )
}
