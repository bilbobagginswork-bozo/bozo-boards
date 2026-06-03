'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Tab = 'repairs' | 'sell_offers' | 'for_sale' | 'pricing'

const STATUS_STYLES: Record<string, string> = {
  pending:     'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in progress':'bg-blue-100 text-blue-800 border-blue-200',
  done:        'bg-green-100 text-green-800 border-green-200',
}

// ── Repairs / Sell Offers ────────────────────────────────────────────────────
function RequestsPanel({ type }: { type: 'repair' | 'sell_offer' }) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const fetch = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('repair_requests')
      .select('*')
      .eq('type', type)
      .order('id', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [type])

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id)
    await supabase.from('repair_requests').update({ status }).eq('id', id)
    setItems(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setUpdatingId(null)
  }

  if (loading) return <Skeleton />
  if (!items.length) return (
    <p className="text-neutral-400 text-center py-16 text-sm">
      No {type === 'repair' ? 'repair requests' : 'sell offers'} yet.
    </p>
  )

  return (
    <div className="grid gap-4">
      {items.map(req => (
        <div key={req.id} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-neutral-900">{req.name}</p>
            <span className={`text-xs font-medium px-2 py-1 rounded-full border capitalize whitespace-nowrap ${STATUS_STYLES[req.status] ?? 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
              {req.status}
            </span>
          </div>
          <p className="text-sm text-neutral-500">{req.contact}</p>
          <p className="mt-2 text-sm text-neutral-700">{req.description}</p>
          {req.image_url && (
            <img src={req.image_url} alt="" className="mt-3 rounded-xl border max-h-48 object-cover" />
          )}
          <div className="flex gap-2 mt-4 flex-wrap">
            {['pending', 'in progress', 'done'].map(s => (
              <button
                key={s}
                disabled={req.status === s || updatingId === req.id}
                onClick={() => updateStatus(req.id, s)}
                className={`px-3 py-1 border rounded-lg text-sm capitalize transition
                  ${req.status === s ? 'bg-black text-white border-black' : 'bg-white hover:bg-neutral-100'}
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Boards for Sale ──────────────────────────────────────────────────────────
function BoardsPanel() {
  const [boards, setBoards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any | null>(null)
  const [adding, setAdding] = useState(false)
  const blank = { name: '', size: '', condition: '', price: '' }
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    setLoading(true)
    const { data } = await supabase.from('boards_for_sale').select('*').order('sort_order')
    setBoards(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const save = async () => {
    if (!form.name || !form.price) return
    setSaving(true)
    if (editing) {
      await supabase.from('boards_for_sale').update(form).eq('id', editing.id)
    } else {
      await supabase.from('boards_for_sale').insert([{ ...form, sort_order: boards.length + 1 }])
    }
    setSaving(false)
    setEditing(null)
    setAdding(false)
    setForm(blank)
    fetch()
  }

  const toggleVisible = async (id: number, visible: boolean) => {
    await supabase.from('boards_for_sale').update({ visible }).eq('id', id)
    setBoards(prev => prev.map(b => b.id === id ? { ...b, visible } : b))
  }

  const remove = async (id: number) => {
    if (!confirm('Delete this board?')) return
    await supabase.from('boards_for_sale').delete().eq('id', id)
    setBoards(prev => prev.filter(b => b.id !== id))
  }

  const startEdit = (b: any) => { setEditing(b); setForm({ name: b.name, size: b.size, condition: b.condition, price: b.price }); setAdding(true) }
  const cancel = () => { setEditing(null); setAdding(false); setForm(blank) }

  if (loading) return <Skeleton />

  return (
    <div className="space-y-4">
      {boards.map(b => (
        <div key={b.id} className={`bg-white border rounded-xl p-4 flex items-center gap-4 ${!b.visible ? 'opacity-50' : 'border-neutral-200'}`}>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-neutral-900">{b.name}</p>
            <p className="text-sm text-neutral-400">{b.size}{b.condition ? ` · ${b.condition}` : ''}</p>
          </div>
          <p className="font-black text-[#2BD9C6] text-lg shrink-0">{b.price}</p>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => toggleVisible(b.id, !b.visible)} className="text-xs px-2 py-1 border rounded-lg hover:bg-neutral-100 transition">
              {b.visible ? 'Hide' : 'Show'}
            </button>
            <button onClick={() => startEdit(b)} className="text-xs px-2 py-1 border rounded-lg hover:bg-neutral-100 transition">Edit</button>
            <button onClick={() => remove(b.id)} className="text-xs px-2 py-1 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition">✕</button>
          </div>
        </div>
      ))}

      {adding ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3">
          <p className="font-bold text-sm text-neutral-700">{editing ? 'Edit board' : 'Add board'}</p>
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2 text-sm col-span-2" placeholder="Board name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Size (e.g. 6'2″)" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Condition" value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} />
            <input className="border rounded-lg px-3 py-2 text-sm col-span-2" placeholder="Price *  (e.g. £180 or From £150)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={cancel} className="px-4 py-2 border text-sm rounded-lg hover:bg-neutral-100 transition">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-sm text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 transition">
          + Add board
        </button>
      )}
    </div>
  )
}

// ── Pricing ──────────────────────────────────────────────────────────────────
function PricingPanel() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any | null>(null)
  const [adding, setAdding] = useState(false)
  const blank = { name: '', description: '', price: '' }
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  const fetch = async () => {
    setLoading(true)
    const { data } = await supabase.from('services').select('*').order('sort_order')
    setServices(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const save = async () => {
    if (!form.name || !form.price) return
    setSaving(true)
    if (editing) {
      await supabase.from('services').update(form).eq('id', editing.id)
    } else {
      await supabase.from('services').insert([{ ...form, sort_order: services.length + 1 }])
    }
    setSaving(false)
    setEditing(null)
    setAdding(false)
    setForm(blank)
    fetch()
  }

  const remove = async (id: number) => {
    if (!confirm('Delete this service?')) return
    await supabase.from('services').delete().eq('id', id)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const startEdit = (s: any) => { setEditing(s); setForm({ name: s.name, description: s.description, price: s.price }); setAdding(true) }
  const cancel = () => { setEditing(null); setAdding(false); setForm(blank) }

  if (loading) return <Skeleton />

  return (
    <div className="space-y-3">
      {services.map(s => (
        <div key={s.id} className="bg-white border border-neutral-200 rounded-xl px-5 py-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-neutral-900">{s.name}</p>
            <p className="text-sm text-neutral-400 truncate">{s.description}</p>
          </div>
          <p className="font-black text-[#2BD9C6] text-lg shrink-0">{s.price}</p>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => startEdit(s)} className="text-xs px-2 py-1 border rounded-lg hover:bg-neutral-100 transition">Edit</button>
            <button onClick={() => remove(s.id)} className="text-xs px-2 py-1 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition">✕</button>
          </div>
        </div>
      ))}

      {adding ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3">
          <p className="font-bold text-sm text-neutral-700">{editing ? 'Edit service' : 'Add service'}</p>
          <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Service name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Price *  (e.g. £40 or Quote)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={cancel} className="px-4 py-2 border text-sm rounded-lg hover:bg-neutral-100 transition">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-sm text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 transition">
          + Add service
        </button>
      )}
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white border border-neutral-200 rounded-xl p-5 animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2" />
          <div className="h-3 bg-neutral-100 rounded w-1/4 mb-4" />
          <div className="h-3 bg-neutral-100 rounded w-full mb-1" />
          <div className="h-3 bg-neutral-100 rounded w-3/4" />
        </div>
      ))}
    </div>
  )
}

// ── Main admin page ──────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
  { id: 'repairs',     label: 'Repairs' },
  { id: 'sell_offers', label: 'Sell Offers' },
  { id: 'for_sale',    label: 'For Sale' },
  { id: 'pricing',     label: 'Pricing' },
]

export default function Admin() {
  const [user, setUser] = useState<any>(null)
  const [tab, setTab] = useState<Tab>('repairs')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-neutral-50 p-4 md:p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Bozo Boards</h1>
          <p className="text-xs text-neutral-400 mt-0.5">{user.email}</p>
        </div>
        <button onClick={logout} className="px-3 py-1.5 border rounded-lg bg-white text-sm hover:bg-neutral-100 transition">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex gap-1 bg-white border border-neutral-200 rounded-xl p-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition ${
                tab === t.id ? 'bg-black text-white' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="max-w-3xl mx-auto">
        {tab === 'repairs'     && <RequestsPanel type="repair" />}
        {tab === 'sell_offers' && <RequestsPanel type="sell_offer" />}
        {tab === 'for_sale'    && <BoardsPanel />}
        {tab === 'pricing'     && <PricingPanel />}
      </div>

    </main>
  )
}
