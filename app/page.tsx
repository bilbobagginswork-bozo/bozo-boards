'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import WaveDivider from '@/components/WaveDivider'
import { useInView } from '@/hooks/useInView'

const StoryStrip = dynamic(() => import('@/components/StoryStrip'), { ssr: false })

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bozo Boards',
  description: 'Surfboard ding repairs, used boards for sale, and we buy unwanted surfboards.',
  url: 'https://bozo-boards.com',
  logo: 'https://bozo-boards.com/logo.png',
  image: 'https://bozo-boards.com/logo.png',
  areaServed: 'South West UK',
  address: { '@type': 'PostalAddress', addressRegion: 'South West England', addressCountry: 'GB' },
  priceRange: '££',
  openingHours: ['Mo-Fr 08:00-17:00', 'Sa 09:00-14:00'],
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-end pt-24 pb-0 px-4 bg-[#F7F4EE] dark:bg-[#0d0c0a] overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#2BD9C6]" />

        <div className="absolute top-8 left-4 md:left-8">
          <p className="text-neutral-900 dark:text-white text-xs font-black uppercase tracking-[0.4em]">Est. 2024</p>
          <p className="text-neutral-400 dark:text-white/30 text-xs uppercase tracking-widest mt-0.5">South West UK</p>
        </div>

        <div className="relative z-10 max-w-6xl">
          <h1 className="text-[22vw] md:text-[18vw] font-black uppercase leading-[0.85] tracking-tighter text-neutral-900 dark:text-white -ml-1">
            BOZO<br />BOARDS
          </h1>
          <div className="mt-8 mb-0 flex flex-col sm:flex-row items-start gap-6">
            <p className="text-neutral-500 dark:text-white/50 text-base max-w-xs leading-relaxed">
              Ding repairs done right. We fix boards, sell used shapes, and buy boards you no longer ride.
            </p>
            <div className="flex gap-3 shrink-0">
              <Link href="/repair" className="px-6 py-3 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-sm rounded hover:bg-[#1fc4b3] transition">
                Submit Repair
              </Link>
              <Link href="/services" className="px-6 py-3 border-2 border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white font-black uppercase tracking-wide text-sm rounded hover:border-neutral-500 dark:hover:border-white transition">
                Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider into teal */}
        <div className="mt-12">
          <WaveDivider fill="#2BD9C6" bg="transparent" />
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="bg-[#2BD9C6] pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { num: '01', label: 'We Repair', desc: 'Dings, cracks, delams, snapped boards. All shapes, quick turnaround.', cta: 'Get a quote', href: '/repair' },
            { num: '02', label: 'We Sell', desc: 'Fully repaired used boards ready to ride. Quality checked, priced fairly.', cta: 'See pricing', href: '/services' },
            { num: '03', label: 'We Buy', desc: 'Got a board collecting dust? We buy unwanted surfboards. Get cash today.', cta: 'Contact us', href: '/contact' },
          ].map(({ num, label, desc, cta, href }, i) => (
            <Link
              key={num}
              href={href}
              className={`group block p-8 md:p-10 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-black/10' : ''} hover:bg-black/5 transition`}
            >
              <p className="text-black/30 text-6xl font-black leading-none mb-4">{num}</p>
              <p className="text-black font-black uppercase text-xl tracking-tight mb-2">{label}</p>
              <p className="text-black/60 text-sm leading-relaxed mb-6">{desc}</p>
              <span className="text-black font-black text-xs uppercase tracking-widest group-hover:underline underline-offset-4">{cta} →</span>
            </Link>
          ))}
        </div>
        {/* Wave into story strip */}
        <WaveDivider fill="#1a1714" bg="#2BD9C6" />
      </section>

      {/* ── STORY STRIP ── */}
      <StoryStrip />

      {/* ── POSTER BAND ── */}
      <section className="bg-[#1a1714] py-20 px-4 overflow-hidden relative">
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.03] leading-none select-none pointer-events-none pr-4">
          SW
        </span>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.4em] mb-4">Book now</p>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                  Board<br />Needs<br />Fixing?
                </h2>
              </div>
              <div className="md:text-right">
                <p className="text-white/50 text-sm mb-6 max-w-xs md:ml-auto">
                  Drop us the details and we&apos;ll get back to you with a quote — usually same day.
                </p>
                <Link
                  href="/repair"
                  className="inline-block px-10 py-4 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-sm rounded hover:bg-[#1fc4b3] transition"
                >
                  Submit a Repair Request
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6 sm:gap-16">
              {[
                { stat: '2–5', label: 'day turnaround' },
                { stat: 'All', label: 'board types' },
                { stat: 'SW', label: 'South West UK' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="text-4xl font-black text-white">{stat}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave back to page bg */}
      <div className="bg-[#F7F4EE] dark:bg-[#0d0c0a]">
        <WaveDivider fill="#F7F4EE" bg="#1a1714" />
      </div>

    </main>
  )
}
