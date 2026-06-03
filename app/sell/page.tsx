'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Sell() {
  const [form, setForm] = useState({ name: '', contact: '', description: '' })
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let imageUrl = null
    if (file) {
      const uploadName = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('repair-images').upload(`uploads/${uploadName}`, file)
      if (!error) {
        const { data } = supabase.storage.from('repair-images').getPublicUrl(`uploads/${uploadName}`)
        imageUrl = data.publicUrl
      }
    }

    await supabase.from('repair_requests').insert([{
      name: form.name,
      contact: form.contact,
      description: form.description,
      status: 'pending',
      image_url: imageUrl,
      type: 'sell_offer',
    }])

    setSubmitting(false)
    setSubmitted(true)
  }

  const reset = () => {
    setForm({ name: '', contact: '', description: '' })
    setFile(null)
    setFileName(null)
    setSubmitted(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16 bg-[#F7F4EE] dark:bg-[#0d0c0a]">
      <div className="w-full max-w-md">

        <div className="mb-8">
          <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-3">Sell your board</p>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">Make an Offer</h1>
          <p className="text-neutral-500 dark:text-white/40 text-sm mt-2">
            Tell us about your board and we&apos;ll get back to you with an offer.
          </p>
        </div>

        {submitted ? (
          <div className="border border-[#2BD9C6]/30 bg-[#2BD9C6]/5 rounded-lg p-8 text-center">
            <div className="w-14 h-14 bg-[#2BD9C6] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-neutral-900 dark:text-white font-black uppercase text-lg tracking-tight mb-2">Offer Sent</p>
            <p className="text-neutral-500 dark:text-white/50 text-sm mb-6">We&apos;ll take a look and get back to you with a number.</p>
            <button onClick={reset} className="px-6 py-2.5 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-sm rounded hover:bg-[#1fc4b3] transition">
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/30 px-4 py-3 rounded focus:outline-none focus:border-[#2BD9C6] transition"
              placeholder="Your name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/30 px-4 py-3 rounded focus:outline-none focus:border-[#2BD9C6] transition"
              placeholder="Phone or email"
              required
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
            />
            <textarea
              className="w-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/30 px-4 py-3 rounded focus:outline-none focus:border-[#2BD9C6] transition min-h-[120px]"
              placeholder="Tell us about the board — brand, size, shape, condition, any damage"
              required
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <label className="cursor-pointer block border border-neutral-200 dark:border-white/10 text-neutral-400 dark:text-white/60 text-sm text-center py-3 rounded hover:border-[#2BD9C6]/60 hover:text-neutral-700 dark:hover:text-white transition">
              {fileName ? `📎 ${fileName}` : 'Attach photos (optional)'}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0] || null; setFile(f); setFileName(f?.name ?? null) }} />
            </label>
            <button
              disabled={submitting}
              className="w-full bg-[#2BD9C6] text-black font-black uppercase tracking-wide py-3 rounded hover:bg-[#1fc4b3] transition disabled:opacity-50"
            >
              {submitting ? 'Sending…' : 'Submit Offer'}
            </button>
          </form>
        )}

        <p className="text-neutral-400 dark:text-white/20 text-xs text-center mt-6">
          Want a repair instead?{' '}
          <Link href="/repair" className="underline underline-offset-2 hover:text-neutral-600 transition">Submit a repair request</Link>
        </p>

      </div>
    </main>
  )
}
