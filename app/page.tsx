export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center bg-neutral-100 px-4">

      {/* BACKGROUND SHAPES */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-black rounded-full blur-3xl top-[-120px] left-[-120px]" />
        <div className="absolute w-96 h-96 bg-neutral-500 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />
      </div>

      {/* CONTENT */}
      <div className="relative text-center max-w-xl space-y-6">

        <h1 className="text-5xl font-bold text-black">
          Bozo Boards
        </h1>

        <p className="text-neutral-600 text-lg">
          Repair requests made simple
        </p>

        <div className="flex gap-3 justify-center">

          <a
            href="/repair"
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition"
          >
            Submit Repair
          </a>

          <a
            href="/login"
            className="border border-black text-black px-6 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition"
          >
            Admin
          </a>

        </div>

      </div>

    </main>
  )
}