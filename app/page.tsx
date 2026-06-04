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
      <section className="relative flex flex-col justify-end pt-20 pb-0 px-4 md:px-8 overflow-hidden min-h-[85vh]">

        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Gradient — subtle teal bleed only at very bottom */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 70%, rgba(43,217,198,0.85) 100%)' }} />
        </div>


        {/* Vertical side text — left edge */}
        <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center hidden sm:block z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-white/30 whitespace-nowrap">
            DINGS FIXED · BOARDS SOLD · SW UK
          </p>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-6xl pl-4 sm:pl-8">

          {/* Small label above */}
          <p className="inline-flex items-center gap-2 text-[#2BD9C6] text-sm font-black uppercase tracking-[0.4em] mb-4 md:mb-6 bg-[#2BD9C6]/15 border border-[#2BD9C6]/40 px-3 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-[#2BD9C6] inline-block" />
            Surfboard Repairs
          </p>

          {/* Giant headline */}
          <h1 className="font-black uppercase leading-[0.82] tracking-tighter text-white -ml-1">
            <span className="block text-[23vw] md:text-[19vw]">BOZO</span>
            <span className="block text-[23vw] md:text-[19vw] relative">
              BOARDS
              <span className="absolute -bottom-2 left-0 w-1/3 h-[3px] bg-[#2BD9C6]" />
            </span>
          </h1>

          {/* Tagline + CTAs */}
          <div className="mt-10 mb-0 flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            <div>
              <p className="font-display text-white text-3xl md:text-4xl leading-tight max-w-xs font-bold">
                Don&apos;t be a bozo, fix your board.
              </p>
              <p className="text-white/50 text-sm mt-2 max-w-xs leading-relaxed">
                We fix dings, sell used shapes, and buy boards you no longer ride.
              </p>
            </div>
            <div className="flex flex-row gap-3 shrink-0 sm:mt-1 flex-wrap">
              <Link href="/repair" className="px-6 py-3 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-sm rounded hover:bg-[#1fc4b3] transition">
                Submit a Repair
              </Link>
              <Link href="/services" className="px-6 py-3 border-2 border-white/30 text-white font-black uppercase tracking-wide text-sm rounded hover:border-white hover:bg-white/10 transition">
                View Pricing
              </Link>
            </div>
          </div>

          {/* Bottom stat strip */}
          <div className="flex gap-8 mt-10 pb-2 border-t border-white/20 pt-6">
            {[
              { n: '2–5', label: 'Day turnaround' },
              { n: 'All', label: 'Board types' },
              { n: '£20+', label: 'Starting from' },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white leading-none">{n}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
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
              <p className="font-display text-black/70 text-lg leading-relaxed mb-6 font-semibold">{desc}</p>
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
