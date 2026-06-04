'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Used Surfboards For Sale',
  description: 'Used surfboards for sale in the South West UK. All boards repaired and checked. Shortboards, mid-lengths, longboards and foamies.',
}

export default function Boards() {
  const [boards, setBoards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('boards_for_sale')
      .select('*')
      .eq('visible', true)
      .order('sort_order')
      .then(({ data }) => {
        setBoards(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 py-16">

      <div className="mb-12">
        <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-3">Used boards</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">
          For Sale
        </h1>
        <p className="text-neutral-500 dark:text-white/50 text-sm mt-3 max-w-md">
          All boards have been repaired and checked. Stock changes regularly — if something catches your eye, get in touch quickly.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 animate-pulse">
              <div className="bg-neutral-200 dark:bg-white/10 h-56" />
              <div className="p-5 space-y-2">
                <div className="h-4 bg-neutral-200 dark:bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-neutral-100 dark:bg-white/5 rounded w-1/2" />
                <div className="h-6 bg-neutral-200 dark:bg-white/10 rounded w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && boards.length === 0 && (
        <div className="text-center py-24 border border-dashed border-neutral-200 dark:border-white/10 rounded-2xl">
          <p className="text-neutral-400 dark:text-white/30 font-black uppercase tracking-wide text-sm">No boards listed right now</p>
          <p className="text-neutral-400 dark:text-white/20 text-xs mt-2">Check back soon — stock changes regularly</p>
        </div>
      )}

      {!loading && boards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map(board => (
            <div key={board.id} className="group bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#2BD9C6]/50 transition">

              {/* Photo */}
              <div className="relative h-56 bg-neutral-100 dark:bg-white/5 overflow-hidden">
                {board.image_url
                  ? <img
                      src={board.image_url}
                      alt={board.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  : <div className="w-full h-full flex items-center justify-center">
                      <span className="text-neutral-300 dark:text-white/20 text-xs uppercase tracking-widest">No photo</span>
                    </div>
                }
              </div>

              {/* Details */}
              <div className="p-5">
                <h2 className="font-black uppercase text-neutral-900 dark:text-white text-lg leading-tight">{board.name}</h2>
                <p className="text-neutral-400 dark:text-white/40 text-sm mt-1">
                  {[board.size, board.condition].filter(Boolean).join(' · ')}
                </p>
                <div className="flex items-end justify-between mt-4">
                  <p className="text-[#2BD9C6] font-black text-2xl">{board.price}</p>
                  <Link
                    href="/contact"
                    className="text-xs font-black uppercase tracking-wide text-neutral-500 dark:text-white/40 hover:text-[#2BD9C6] transition"
                  >
                    Interested? →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Sell CTA */}
      <div className="mt-16 border border-neutral-200 dark:border-white/10 rounded-2xl p-8 bg-neutral-50 dark:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-2">Got one to sell?</p>
          <p className="text-neutral-900 dark:text-white font-black uppercase text-xl">We buy boards too</p>
          <p className="text-neutral-500 dark:text-white/50 text-sm mt-1">All conditions considered — get in touch with photos.</p>
        </div>
        <Link
          href="/sell"
          className="shrink-0 px-6 py-3 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-sm rounded hover:bg-[#1fc4b3] transition"
        >
          Make an offer
        </Link>
      </div>

    </main>
  )
}
