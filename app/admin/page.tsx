'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in progress': 'bg-blue-100 text-blue-800 border-blue-200',
  done: 'bg-green-100 text-green-800 border-green-200',
}

export default function Admin() {
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        await fetchRequests()
      }
    }

    checkUser()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('repair_requests')
      .select('*')
      .order('id', { ascending: false })

    setRequests(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id)
    await supabase
      .from('repair_requests')
      .update({ status })
      .eq('id', id)

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    )
    setUpdatingId(null)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-neutral-50 p-6">

      <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Bozo Boards Admin</h1>
        <button
          onClick={logout}
          className="px-3 py-1 border rounded-lg bg-white hover:bg-neutral-100 transition text-sm"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm animate-pulse">
                <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-neutral-100 rounded w-1/4 mb-4" />
                <div className="h-3 bg-neutral-100 rounded w-full mb-1" />
                <div className="h-3 bg-neutral-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {!loading && requests.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            No repair requests yet.
          </div>
        )}

        {!loading && requests.map((req) => (
          <div key={req.id} className="bg-white border rounded-2xl p-5 shadow-sm">

            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="font-semibold">{req.name}</p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full border capitalize whitespace-nowrap ${STATUS_STYLES[req.status] ?? 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
                {req.status}
              </span>
            </div>

            <p className="text-sm text-neutral-500">{req.contact}</p>
            <p className="mt-2 text-sm">{req.description}</p>

            {req.image_url && (
              <img
                src={req.image_url}
                alt="Repair photo"
                className="mt-3 rounded-xl border max-h-48 object-cover"
              />
            )}

            <div className="flex gap-2 mt-4 flex-wrap">
              {['pending', 'in progress', 'done'].map((s) => (
                <button
                  key={s}
                  disabled={req.status === s || updatingId === req.id}
                  onClick={() => updateStatus(req.id, s)}
                  className={`px-3 py-1 border rounded-lg text-sm capitalize transition
                    ${req.status === s
                      ? 'bg-black text-white border-black'
                      : 'bg-white hover:bg-neutral-100'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {s}
                </button>
              ))}
            </div>

          </div>
        ))}

      </div>

    </main>
  )
}
