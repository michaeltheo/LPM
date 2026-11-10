import { m } from 'motion/react'
import { useEffect, useState } from 'react'
import { Kicker } from '../ui.jsx'

// the door: a password checked by the server, never stored in the page
function Door({ onOpen }) {
  const [password, setPassword] = useState('')
  const [state, setState] = useState({ busy: false, error: '' })

  async function submit(e) {
    e.preventDefault()
    setState({ busy: true, error: '' })
    try {
      const res = await fetch('/api/guests', { headers: { 'x-admin-password': password } })
      const body = await res.json().catch(() => ({}))
      if (res.ok) return onOpen({ guests: body.guests, password })
      setState({ busy: false, error: body.error ?? 'something went wrong' })
    } catch {
      setState({ busy: false, error: 'no signal, try again' })
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-20 max-w-md text-center sm:mt-28">
      <Kicker className="text-white/80">staff only</Kicker>
      <h1 data-text="THE DOOR" style={{ '--glitch-speed': '2.7s' }} className="mt-4 font-condensed text-[clamp(4.5rem,20vw,9rem)] leading-[0.85] uppercase glitch fringe">
        THE DOOR
      </h1>
      <label htmlFor="password" className="mt-10 block font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
        [ password ]
      </label>
      <m.input
        id="password"
        type="password"
        required
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={state.busy}
        aria-invalid={!!state.error}
        animate={state.error ? { x: [0, -14, 12, -8, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 w-full border-2 border-white bg-transparent px-4 py-4 text-center font-mono text-2xl tracking-[0.2em] focus:border-pink focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={state.busy || !password}
        className="mt-6 w-full bg-pink py-3 font-condensed text-3xl text-ink uppercase shadow-[6px_6px_0_var(--color-white)] transition-[box-shadow,translate] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--color-white)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:opacity-50"
      >
        {state.busy ? 'checking…' : 'open the door'}
      </button>
      <p role="alert" className="mt-4 h-5 font-mono text-sm tracking-wider text-red uppercase">
        {state.error && `✕ ${state.error}`}
      </p>
    </form>
  )
}

function Stat({ n, label, className }) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      <p className="font-condensed text-5xl leading-none sm:text-6xl">{n}</p>
      <p className="mt-1 font-mono text-[0.65rem] tracking-[0.2em] uppercase sm:text-xs">{label}</p>
    </div>
  )
}

function List({ guests }) {
  const plusOnes = guests.filter((g) => g.plusOne).length

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <Kicker className="text-white/80">guest list · {guests.length} names</Kicker>
      <h1 className="mt-4 font-condensed text-7xl uppercase fringe sm:text-9xl">The list</h1>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <Stat n={guests.length + plusOnes} label="heads at the door" className="-rotate-1 bg-pink text-ink" />
        <Stat n={guests.length} label="on the list" className="rotate-1 bg-paper text-ink" />
        <Stat n={plusOnes} label="plus ones" className="-rotate-1 bg-lilac text-purple" />
      </div>

      <div className="mt-10 overflow-x-auto bg-paper text-ink paper-edge">
        <table className="w-full min-w-[36rem] text-left">
          <thead className="border-b-2 border-ink font-mono text-[0.65rem] tracking-[0.2em] uppercase sm:text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">+1</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g, i) => (
              <tr key={g.id} className="border-b border-ink/15 align-top last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-ink/50">{String(i + 1).padStart(2, '0')}</td>
                <td className="px-4 py-3 font-condensed text-xl uppercase">{g.name}</td>
                <td className="px-4 py-3 font-mono text-sm whitespace-nowrap">
                  <a href={`tel:${g.phone}`} className="hover:text-pink hover:underline">{g.phone}</a>
                </td>
                <td className="px-4 py-3 font-condensed text-lg">{g.plusOne ? '+1' : '—'}</td>
                <td className="px-4 py-3 font-marker text-base">{g.notes ?? ''}</td>
              </tr>
            ))}
            {!guests.length && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center font-marker text-2xl">nobody on the list yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// every guest upload, with a switch to pull it from the public gallery
function Photos({ password }) {
  const [photos, setPhotos] = useState(null)
  const headers = { 'x-admin-password': password, 'Content-Type': 'application/json' }

  useEffect(() => {
    fetch('/api/photos?all=1', { headers: { 'x-admin-password': password } })
      .then((r) => r.json())
      .then((b) => setPhotos(b.photos ?? []))
      .catch(() => setPhotos([]))
  }, [password])

  async function toggle(p) {
    const res = await fetch('/api/photos', { method: 'PATCH', headers, body: JSON.stringify({ id: p.id, hidden: !p.hidden }) })
    if (res.ok) setPhotos((ps) => ps.map((x) => (x.id === p.id ? { ...x, hidden: !p.hidden } : x)))
  }

  if (!photos) return null
  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <Kicker className="text-white/80">camera roll · {photos.length} photos · {photos.filter((p) => p.hidden).length} hidden</Kicker>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((p) => (
          <div key={p.id} className="relative">
            <img src={p.url.replace('/upload/', '/upload/w_400,c_limit,f_auto,q_auto/')} alt="" loading="lazy" className={`aspect-square w-full object-cover ${p.hidden ? 'opacity-30 grayscale' : ''}`} />
            <button
              type="button"
              onClick={() => toggle(p)}
              className={`absolute right-2 bottom-2 px-3 py-1 font-mono text-xs tracking-wider uppercase ${p.hidden ? 'bg-white text-ink' : 'bg-red text-white'}`}
            >
              {p.hidden ? 'show' : 'hide'}
            </button>
          </div>
        ))}
      </div>
      {!photos.length && <p className="mt-4 font-marker text-2xl text-white/70">no photos yet.</p>}
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(null)
  return (
    <div className="min-h-svh bg-ink px-4 pt-6 pb-20 text-white sm:px-8">
      <div className="flex justify-between font-mono text-[0.65rem] tracking-[0.2em] text-white/70 uppercase sm:text-xs">
        <a href="/" className="transition-colors hover:text-white">← back to the invite</a>
        <span>[ Studio 54 · LPM · staff ]</span>
      </div>
      {session ? (
        <>
          <List guests={session.guests} />
          <Photos password={session.password} />
        </>
      ) : (
        <Door onOpen={setSession} />
      )}
    </div>
  )
}
