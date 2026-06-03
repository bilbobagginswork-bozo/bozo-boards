'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">

        <div className="mb-8">
          <Link href="/" className="text-[#2BD9C6] font-black uppercase tracking-tighter text-xl">
            BOZO<span className="text-white">.</span>
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white mt-4">Sign Up</h1>
          <p className="text-white/40 text-sm mt-1">Create your account</p>
        </div>

        {done ? (
          <div className="border border-[#2BD9C6]/30 bg-[#2BD9C6]/5 rounded-lg p-6 text-center">
            <p className="text-[#2BD9C6] font-black uppercase text-sm tracking-wide mb-2">Check your email</p>
            <p className="text-white/60 text-sm">We&apos;ve sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account.</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded">
                {error}
              </div>
            )}

            <input
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 rounded focus:outline-none focus:border-[#2BD9C6]/60 transition"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 rounded focus:outline-none focus:border-[#2BD9C6]/60 transition"
              placeholder="Password (min. 6 characters)"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-[#2BD9C6] text-black font-black uppercase tracking-wide py-3 rounded hover:bg-[#1fc4b3] transition disabled:opacity-50"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>

          </form>
        )}

        <p className="text-white/30 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:text-[#2BD9C6] transition">
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}
