import { AnimatePresence, m } from 'motion/react'
import { useState } from 'react'
import { Kicker } from '../ui.jsx'

const field = 'w-full border-b-2 border-ink bg-transparent pb-1 font-condensed text-3xl uppercase placeholder:text-ink/25 focus:border-pink focus:outline-none sm:text-4xl'

// a pair of big cut-out stickers behaving as one radio group
function Choice({ name, value, onChange, options }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {options.map(([v, label, on], i) => (
        <label
          key={label}
          className={`cursor-pointer border-2 border-ink px-3 py-4 text-center font-condensed text-2xl uppercase transition-[rotate,background-color,color,box-shadow] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-pink sm:text-3xl ${
            value === v ? `${on} ${i ? 'rotate-2' : '-rotate-2'} shadow-[5px_5px_0_var(--color-ink)]` : 'hover:bg-ink/5'
          }`}
        >
          <input type="radio" name={name} className="sr-only" checked={value === v} onChange={() => onChange(v)} />
          {label}
        </label>
      ))}
    </div>
  )
}

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">
      [ {children} ]
    </label>
  )
}

export default function Reserve() {
  const [form, setForm] = useState({ name: '', phone: '', plusOne: false, notes: '' })
  const [state, setState] = useState({ status: 'idle', error: '' })
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v?.target ? v.target.value : v }))

  async function submit(e) {
    e.preventDefault()
    setState({ status: 'sending', error: '' })
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) return setState({ status: 'idle', error: body.error ?? 'something went wrong, try again' })
      setState({ status: 'done', error: '' })
    } catch {
      setState({ status: 'idle', error: 'no signal, try again' })
    }
  }

  return (
    <div className="min-h-svh bg-ink px-4 pt-6 pb-20 text-white sm:px-8">
      <div className="flex justify-between font-mono text-[0.65rem] tracking-[0.2em] text-white/70 uppercase sm:text-xs">
        <a href="/" className="transition-colors hover:text-white">← back to the invite</a>
        <span>[ 07 · RSVP ]</span>
      </div>

      <header className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
        <Kicker className="text-white/80">the doorman wants to know</Kicker>
        <h1 data-text="THE LIST" style={{ '--glitch-speed': '3.1s' }} className="mt-4 font-condensed text-[clamp(5rem,22vw,11rem)] leading-[0.85] uppercase glitch fringe">
          THE LIST
        </h1>
        <p className="mt-4 font-mono text-xs tracking-[0.2em] text-white/60 uppercase sm:text-sm">Studio 54 · lpm’s birthday · 11.13.2026 · Thessaloniki</p>
      </header>

      <m.div
        className="relative mx-auto mt-12 max-w-xl -rotate-1 bg-paper px-5 pt-8 pb-8 text-ink paper-edge shadow-[0_30px_60px_-25px_rgb(0_0_0/0.8)] sm:px-10 sm:pt-10"
        initial={{ opacity: 0, y: 60, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
      >
        <div aria-hidden className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-2 bg-white/70" />
        <AnimatePresence mode="wait">
          {state.status === 'done' ? (
            <m.div key="done" className="py-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <m.p
                className="mx-auto inline-block border-4 border-pink px-6 py-3 font-condensed text-5xl text-pink uppercase sm:text-6xl"
                initial={{ scale: 2.4, rotate: 0, opacity: 0 }}
                animate={{ scale: 1, rotate: -6, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              >
                you’re on the list
              </m.p>
              <p className="mt-8 font-marker text-2xl">{form.plusOne ? 'see you both on the dance floor.' : 'see you on the dance floor.'}</p>
              <button type="button" onClick={() => setState({ status: 'idle', error: '' })} className="mt-8 font-mono text-xs tracking-[0.2em] uppercase underline underline-offset-4 hover:text-pink">
                change my answer
              </button>
            </m.div>
          ) : (
            <m.form key="form" onSubmit={submit} className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="-rotate-3 font-marker text-3xl sm:text-4xl">guest list</h2>
                <p aria-hidden className="font-marker text-5xl leading-none">54</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">your name</Label>
                <input id="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Bianca Jagger" value={form.name} onChange={set('name')} className={field} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">phone</Label>
                <input id="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="+30 69…" value={form.phone} onChange={set('phone')} className={field} />
              </div>

              <fieldset className="space-y-3">
                <legend className="mb-3 font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">[ bringing someone? ]</legend>
                <Choice
                  name="plusOne"
                  value={form.plusOne}
                  onChange={set('plusOne')}
                  options={[
                    [false, 'just me', 'bg-pink text-ink'],
                    [true, 'me + 1', 'bg-purple text-lilac'],
                  ]}
                />
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="notes">a note for the doorman · optional</Label>
                <textarea id="notes" rows={3} maxLength={500} placeholder="allergies, song requests, alter ego…" value={form.notes} onChange={set('notes')} className="w-full resize-none border-2 border-ink/20 bg-white/40 p-3 font-marker text-xl placeholder:text-ink/30 focus:border-pink focus:outline-none" />
              </div>

              {state.error && (
                <p role="alert" className="font-mono text-sm tracking-wider text-red uppercase">
                  ✕ {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={state.status === 'sending'}
                className="w-full bg-ink py-4 font-condensed text-3xl text-white uppercase shadow-[6px_6px_0_var(--color-pink)] transition-[box-shadow,translate] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--color-pink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink disabled:opacity-60"
              >
                {state.status === 'sending' ? 'sending…' : 'put me on the list'}
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  )
}
