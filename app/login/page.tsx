'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white border rounded-2xl shadow-sm p-6"
      >

        <h1 className="text-2xl font-bold mb-4">
          Admin Login
        </h1>

        <input
          className="border p-3 rounded-lg w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full p-3 rounded-lg">
          Login
        </button>

      </form>

    </main>
  )
}