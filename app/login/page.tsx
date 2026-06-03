'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-sm">

        <div className="mb-8">
          <Link href="/" className="text-[#2BD9C6] font-black uppercase tracking-tighter text-xl">
            BOZO<span className="text-white">.</span>
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white mt-4">Login</h1>
          <p className="text-white/40 text-sm mt-1">Admin access only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">

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
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-[#2BD9C6] text-black font-black uppercase tracking-wide py-3 rounded hover:bg-[#1fc4b3] transition disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

        </form>

        <p className="text-white/30 text-sm text-center mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-white hover:text-[#2BD9C6] transition">
            Sign up
          </Link>
        </p>

      </div>
    </main>
  )
}
