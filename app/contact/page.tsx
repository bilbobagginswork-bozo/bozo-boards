import Link from 'next/link'

export default function Contact() {
  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 py-16">

      <div className="mb-16">
        <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.3em] mb-3">Get in touch</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">Contact</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div className="space-y-10">
          <div>
            <p className="text-neutral-400 dark:text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-2">Location</p>
            <p className="text-neutral-900 dark:text-white font-bold">South West, UK</p>
            <p className="text-neutral-500 dark:text-white/50 text-sm mt-1">Drop-off and pick-up by arrangement</p>
          </div>

          <div>
            <p className="text-neutral-400 dark:text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-2">Hours</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between max-w-xs">
                <span className="text-neutral-500 dark:text-white/60">Mon – Fri</span>
                <span className="text-neutral-900 dark:text-white font-bold">8am – 5pm</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span className="text-neutral-500 dark:text-white/60">Saturday</span>
                <span className="text-neutral-900 dark:text-white font-bold">9am – 2pm</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span className="text-neutral-500 dark:text-white/60">Sunday</span>
                <span className="text-neutral-400 dark:text-white/40">Closed</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-neutral-400 dark:text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-2">Turnaround</p>
            <p className="text-neutral-900 dark:text-white font-bold">2 – 5 business days</p>
            <p className="text-neutral-500 dark:text-white/50 text-sm mt-1">Complex repairs may take longer — we&apos;ll let you know upfront.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-neutral-200 dark:border-white/10 rounded-lg p-6 bg-white dark:bg-transparent hover:border-[#2BD9C6]/60 transition">
            <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.2em] mb-2">Submit a repair</p>
            <p className="text-neutral-500 dark:text-white/60 text-sm mb-4">Fill out our repair form and we&apos;ll get back to you with a quote.</p>
            <Link href="/repair" className="inline-block px-5 py-2.5 bg-[#2BD9C6] text-black font-black uppercase tracking-wide text-xs rounded hover:bg-[#1fc4b3] transition">
              Start here →
            </Link>
          </div>

          <div className="border border-neutral-200 dark:border-white/10 rounded-lg p-6 bg-white dark:bg-transparent hover:border-[#2BD9C6]/60 transition">
            <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.2em] mb-2">Selling your board</p>
            <p className="text-neutral-500 dark:text-white/60 text-sm mb-4">Send us photos and a brief description — we&apos;ll make you an offer.</p>
            <Link href="/repair" className="inline-block px-5 py-2.5 border border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-white font-black uppercase tracking-wide text-xs rounded hover:border-neutral-500 dark:hover:border-white transition">
              Use the form →
            </Link>
          </div>

          <div className="border border-neutral-200 dark:border-white/10 rounded-lg p-6 bg-white dark:bg-transparent hover:border-[#2BD9C6]/60 transition">
            <p className="text-[#2BD9C6] text-xs font-black uppercase tracking-[0.2em] mb-2">Buying a board</p>
            <p className="text-neutral-500 dark:text-white/60 text-sm">
              Check our{' '}
              <Link href="/services#boards" className="text-neutral-900 dark:text-white underline underline-offset-2">services page</Link>
              {' '}for current stock. Prices and availability change regularly.
            </p>
          </div>
        </div>

      </div>

    </main>
  )
}
