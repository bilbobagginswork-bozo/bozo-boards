'use client'
import { useInView } from '@/hooks/useInView'

const ROUGHEN = (
  <defs>
    <filter id="roughen" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" result="noise" seed="2"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
)

/* ── Shared board path ─────────────────────────────────── */
const B = "M40,5 C53,9 60,36 60,82 C60,128 51,153 40,158 C29,153 20,128 20,82 C20,36 27,9 40,5 Z"
const FIN = "M35,154 L28,172 L48,164 L40,154 Z"
const STRINGER = "M40,5 L40,158"

/* ── Panel 1: Intact board ─────────────────────────────── */
function PanelBoard() {
  return (
    <svg viewBox="0 0 80 190" className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {ROUGHEN}
      <g filter="url(#roughen)">
        {/* Board */}
        <path d={B} strokeWidth="2.5"/>
        <path d={FIN} strokeWidth="2"/>
        <line x1="40" y1="5" x2="40" y2="158" strokeWidth="1" strokeDasharray="5 4"/>
        {/* Sun */}
        <circle cx="67" cy="20" r="7" strokeWidth="2"/>
        {[0,60,120,180,240,300].map(a => {
          const r = a * Math.PI / 180
          return <line key={a} x1={67+9*Math.cos(r)} y1={20+9*Math.sin(r)} x2={67+13*Math.cos(r)} y2={20+13*Math.sin(r)} strokeWidth="1.5"/>
        })}
        {/* Small waves at bottom */}
        <path d="M8,175 Q14,169 20,175 Q26,181 32,175" strokeWidth="1.5"/>
        <path d="M22,182 Q28,176 34,182 Q40,188 46,182" strokeWidth="1.5"/>
      </g>
    </svg>
  )
}

/* ── Panel 2: Broken board ─────────────────────────────── */
function PanelDinged() {
  return (
    <svg viewBox="0 0 80 190" className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {ROUGHEN}
      <g filter="url(#roughen)">
        {/* Board */}
        <path d={B} strokeWidth="2.5"/>
        <path d={FIN} strokeWidth="2"/>
        {/* Big crack */}
        <path d="M36,55 L45,70 L34,82 L46,98 L38,112" strokeWidth="3" stroke="currentColor"/>
        {/* Impact lines radiating */}
        <line x1="48" y1="62" x2="58" y2="54" strokeWidth="1.5"/>
        <line x1="52" y1="68" x2="64" y2="66" strokeWidth="1.5"/>
        <line x1="50" y1="75" x2="62" y2="80" strokeWidth="1.5"/>
        <line x1="32" y1="60" x2="20" y2="52" strokeWidth="1.5"/>
        <line x1="28" y1="68" x2="16" y2="68" strokeWidth="1.5"/>
        {/* X mark */}
        <line x1="58" y1="28" x2="70" y2="16" strokeWidth="2.5"/>
        <line x1="70" y1="28" x2="58" y2="16" strokeWidth="2.5"/>
        {/* Sad drops */}
        <path d="M36,120 Q34,125 36,128 Q38,125 36,120" strokeWidth="1.5"/>
        <path d="M44,115 Q42,120 44,123 Q46,120 44,115" strokeWidth="1.5"/>
      </g>
    </svg>
  )
}

/* ── Panel 3: Being repaired ──────────────────────────── */
function PanelRepair() {
  return (
    <svg viewBox="0 0 100 190" className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {ROUGHEN}
      <g filter="url(#roughen)">
        {/* Board lying flat, perspective */}
        <path d="M20,85 C22,72 50,66 80,72 C82,80 82,100 80,108 C50,114 22,108 20,100 Z" strokeWidth="2.5"/>
        {/* Stringer line */}
        <line x1="20" y1="92" x2="80" y2="90" strokeWidth="1" strokeDasharray="4 3"/>
        {/* Crack being fixed */}
        <path d="M42,78 L50,88 L42,98" strokeWidth="2.5"/>
        {/* Left hand + squeegee */}
        <path d="M18,70 C14,66 10,68 10,72 C10,76 14,78 18,76" strokeWidth="2"/>
        <line x1="18" y1="73" x2="42" y2="82" strokeWidth="2.5"/>
        {/* Right hand */}
        <path d="M82,70 C86,66 90,68 90,72 C90,76 86,78 82,76" strokeWidth="2"/>
        <line x1="82" y1="73" x2="58" y2="86" strokeWidth="2.5"/>
        {/* Resin drips */}
        <path d="M48,88 Q47,95 48,99 Q49,95 48,88" strokeWidth="1.5"/>
        <path d="M52,86 Q51,93 52,97 Q53,93 52,86" strokeWidth="1.5"/>
        {/* Sparkles */}
        <path d="M25,50 L27,44 L29,50 L35,52 L29,54 L27,60 L25,54 L19,52 Z" strokeWidth="1.5"/>
        <path d="M72,50 L74,46 L76,50 L80,52 L76,54 L74,58 L72,54 L68,52 Z" strokeWidth="1.5"/>
        <circle cx="50" cy="45" r="2" strokeWidth="1.5"/>
        <circle cx="60" cy="40" r="1.5" strokeWidth="1.5"/>
      </g>
    </svg>
  )
}

/* ── Panel 4: Back surfing ────────────────────────────── */
function PanelSurfing() {
  return (
    <svg viewBox="0 0 120 190" className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {ROUGHEN}
      <g filter="url(#roughen)">
        {/* Wave */}
        <path d="M5,130 C20,100 40,155 60,125 C80,95 100,150 115,120" strokeWidth="2.5"/>
        <path d="M5,145 C25,120 45,165 65,140 C85,115 105,162 115,140" strokeWidth="1.5"/>
        {/* Spray at crest */}
        <path d="M58,122 C55,110 52,104 58,100" strokeWidth="1.5"/>
        <path d="M62,120 C60,108 58,102 64,99" strokeWidth="1.5"/>
        <path d="M55,125 C50,114 46,108 50,103" strokeWidth="1.5"/>
        {/* Board on wave */}
        <path d="M42,118 C52,112 72,114 78,120 C72,126 52,128 42,122 Z" strokeWidth="2.5"/>
        {/* Surfer - simplified person */}
        <circle cx="60" cy="102" r="6" strokeWidth="2"/>
        <path d="M60,108 L60,118" strokeWidth="2"/>
        <path d="M60,112 L52,116 M60,112 L68,116" strokeWidth="2"/>
        <path d="M60,118 L55,126 M60,118 L65,126" strokeWidth="2"/>
        {/* Stars / sparkles above */}
        <path d="M20,60 L22,54 L24,60 L30,62 L24,64 L22,70 L20,64 L14,62 Z" strokeWidth="1.5"/>
        <path d="M90,45 L92,40 L94,45 L99,47 L94,49 L92,54 L90,49 L85,47 Z" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="2.5" strokeWidth="1.5"/>
        <circle cx="75" cy="58" r="2" strokeWidth="1.5"/>
        <circle cx="35" cy="75" r="1.5" strokeWidth="1.5"/>
        {/* Sun */}
        <circle cx="100" cy="28" r="9" strokeWidth="2"/>
        {[0,45,90,135,180,225,270,315].map(a => {
          const r = a * Math.PI / 180
          return <line key={a} x1={100+11*Math.cos(r)} y1={28+11*Math.sin(r)} x2={100+15*Math.cos(r)} y2={28+15*Math.sin(r)} strokeWidth="1.5"/>
        })}
      </g>
    </svg>
  )
}

const PANELS = [
  { num: '01', title: 'Your board', sub: 'All good, rides perfect.', Illustration: PanelBoard },
  { num: '02', title: 'Gets dinged', sub: 'Rock, reef, or a bad wipeout.', Illustration: PanelDinged },
  { num: '03', title: 'We fix it', sub: 'Resin, glass, and skill.', Illustration: PanelRepair },
  { num: '04', title: 'Back out there', sub: 'Like it never happened.', Illustration: PanelSurfing },
]

export default function StoryStrip() {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="bg-[#1a1714] py-16 px-4 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.4em] mb-2 text-center">The Process</p>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white text-center mb-12">
          How it works
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {PANELS.map(({ num, title, sub, Illustration }, i) => (
            <div
              key={num}
              className="flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Illustration box */}
              <div className="w-full aspect-[1/1.4] text-white/90 mb-5 max-w-[140px]">
                <Illustration />
              </div>
              <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-1">{num}</p>
              <p className="text-white font-black uppercase text-base tracking-tight leading-tight">{title}</p>
              <p className="text-white/40 text-xs mt-1 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
