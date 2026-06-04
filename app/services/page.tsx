'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Services & Pricing',
  description: 'Surfboard repair prices for dings, cracks, delamination, fin box repairs and more. Used boards for sale. South West UK.',
}

const FALLBACK_REPAIRS = [
  { id: 1, name: 'Small ding repair',      description: 'Single pressure ding or small crack, up to 3cm', price: '$20' },
  { id: 2, name: 'Medium ding repair',     description: 'Larger crack, multiple dings, or rail damage',   price: '$40' },
  { id: 3, name: 'Large ding / deep crack',description: 'Deep structural cracks or heavy impact damage',  price: '$60–$90' },
  { id: 4, name: 'Delamination (small)',   description: 'Bubbling or lifted fibreglass, palm-sized area', price: '$50' },
  { id: 5, name: 'Delamination (large)',   description: 'Extensive delam covering a large section',       price: 'Quote' },
  { id: 6, name: 'Snap repair',            description: 'Full board snap — structural resin and glass work', price: 'Quote' },
  { id: 7, name: 'Fin box repair',         description: 'Loose, cracked, or fully removed fin box',      price: '$35–$60' },
  { id: 8, name: 'Full board respray',     description: 'Sanded back and reglassed. New life, new look.', price: 'Quote' },
]

const FALLBACK_BOARDS = [
  { id: 1, name: 'Various shortboards',     size: "5'8″ – 6'4″", condition: 'Repaired / good', price: 'From $150' },
  { id: 2, name: 'Mid-lengths',             size: "6'6″ – 7'6″", condition: 'Repaired / good', price: 'From $200' },
  { id: 3, name: 'Longboards',              size: "8'0″+",        condition: 'Repaired / good', price: 'From $250' },
  { id: 4, name: 'Foamies / learner boards',size: 'Various',      condition: 'Good condition',  price: 'From $100' },
]

export default function Services() {
  const [repairs, setRepairs] = useState(FALLBACK_REPAIRS)
  const [boards, setBoards] = useState(FALLBACK_BOARDS)

  useEffect(() => {
    supabase.from('services').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length) setRepairs(data)
    })
    supabase.from('boards_for_sale').select('*').eq('visible', true).order('sort_order').then(({ data }) => {
      if (data && data.length) setBoards(data)
    })
  }, [])

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 py-16">

      <div className="mb-16">
        <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-3">What we offer</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">
          Services &<br />Pricing
        </h1>
      </div>

      {/* Repairs */}
      <section className="mb-20">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-white/40 mb-6">Repair Services</h2>
        <div className="border border-neutral-200 dark:border-white/10 rounded-lg overflow-hidden">
          {repairs.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-6 px-6 py-5 bg-white dark:bg-transparent ${i !== repairs.length - 1 ? 'border-b border-neutral-200 dark:border-white/10' : ''} hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition`}
            >
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-neutral-500 dark:text-white/50 mt-0.5">{item.description}</p>
              </div>
              <p className="text-[#2BD9C6] font-black text-lg whitespace-nowrap">{item.price}</p>
            </div>
          ))}
        </div>
        <p className="text-neutral-400 dark:text-white/30 text-xs mt-4">
          All prices are guides. Complex repairs will be quoted after assessment. Turnaround is typically 2–5 days.
        </p>
      </section>

      {/* Boards for sale */}
      <section id="boards" className="mb-20">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-white/40 mb-6">Used Boards For Sale</h2>
        {boards.length === 0 ? (
          <p className="text-neutral-400 text-sm">No boards listed right now — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {boards.map(board => (
              <div key={board.id} className="border border-neutral-200 dark:border-white/10 rounded-lg p-6 bg-white dark:bg-transparent hover:border-[#2BD9C6]/60 transition">
                <p className="font-black uppercase text-neutral-900 dark:text-white text-lg">{board.name}</p>
                <p className="text-neutral-400 dark:text-white/40 text-sm mt-1">
                  {board.size}{board.condition ? ` · ${board.condition}` : ''}
                </p>
                <p className="text-[#2BD9C6] font-black text-2xl mt-4">{board.price}</p>
              </div>
            ))}
          </div>
        )}
        <p className="text-neutral-400 dark:text-white/30 text-xs mt-4">
          Stock changes regularly. Contact us to see what&apos;s currently available.
        </p>
      </section>

      {/* Sell your board */}
      <section className="border border-neutral-200 dark:border-white/10 rounded-lg p-8 bg-neutral-50 dark:bg-white/[0.02]">
        <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-3">Selling your board?</p>
        <h3 className="text-2xl font-black uppercase text-neutral-900 dark:text-white mb-3">We Buy Boards</h3>
        <p className="text-neutral-500 dark:text-white/60 text-sm leading-relaxed mb-6 max-w-lg">
          Got a board gathering dust? We buy unwanted surfboards — all conditions considered. Get in touch with photos and we&apos;ll make you an offer.
        </p>
        <Link href="/sell" className="inline-block px-6 py-3 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-sm rounded hover:bg-[#1fc4b3] transition">
          Make an offer
        </Link>
      </section>

    </main>
  )
}
