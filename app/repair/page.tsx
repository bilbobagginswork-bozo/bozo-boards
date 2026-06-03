'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function Repair() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    description: '',
  })

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

      const { error } = await supabase
        .storage
        .from('repair-images')
        .upload(`uploads/${uploadName}`, file)

      if (!error) {
        const { data } = supabase
          .storage
          .from('repair-images')
          .getPublicUrl(`uploads/${uploadName}`)

        imageUrl = data.publicUrl
      }
    }

    await supabase.from('repair_requests').insert([
      {
        name: form.name,
        contact: form.contact,
        description: form.description,
        status: 'pending',
        image_url: imageUrl,
      },
    ])

    setSubmitting(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm({ name: '', contact: '', description: '' })
    setFile(null)
    setFileName(null)
    setSubmitted(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100 px-4 relative overflow-hidden">

      {/* GEOMETRIC BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-black rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-96 h-96 bg-neutral-400 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />
      </div>

      {/* CARD */}
      <div className="relative w-full max-w-md bg-white border rounded-2xl shadow-md p-6 space-y-4">

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black">Request Submitted</h2>
            <p className="text-neutral-500 text-sm">
              We&apos;ve received your repair request and will be in touch soon.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition"
            >
              Submit another
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">Repair Request</h1>
              <p className="text-sm text-neutral-600 mt-1">Tell us what needs fixing</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                className="w-full border p-3 rounded-xl text-black"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full border p-3 rounded-xl text-black"
                placeholder="Contact"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />

              <textarea
                className="w-full border p-3 rounded-xl text-black"
                placeholder="Describe the issue"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <label className="cursor-pointer block bg-black text-white text-center py-3 rounded-xl font-semibold hover:bg-neutral-800 transition">
                {fileName ? `📎 ${fileName}` : 'Upload photos'}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setFile(f)
                    setFileName(f?.name ?? null)
                  }}
                />
              </label>

              <button
                disabled={submitting}
                className="w-full bg-white border border-black text-black p-3 rounded-xl font-semibold hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : 'Submit Request'}
              </button>

            </form>
          </>
        )}

      </div>

    </main>
  )
}
