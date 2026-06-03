'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-white/50 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-800 dark:hover:text-white transition text-base"
    >
      {dark ? '☀︎' : '◗'}
    </button>
  )
}
