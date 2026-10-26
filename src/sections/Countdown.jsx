import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import halftone from '../assets/scene/halftone.jpg'
import { timeLeft } from '../countdown.js'
import { Kicker, Reveal } from '../ui.jsx'

const UNITS = ['days', 'hours', 'minutes', 'seconds']

// only the digit that changed rolls; the rest stay put
function Digit({ value }) {
  return (
    <span className="relative inline-block w-[0.5em] text-center">
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={value}
          className="inline-block"
          initial={{ y: '0.35em', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0em', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.35em', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

// the "THANKS" banner: giant condensed white type, rgb-split, over a grainy flash photo
export default function Countdown() {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const t = timeLeft(now)

  return (
    <section className="relative overflow-hidden bg-ink px-4 py-20 sm:py-28">
      <img src={halftone} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-45 grayscale contrast-125" />
      <div className="absolute inset-0 bg-radial from-ink/30 to-ink/90" />

      <div className="relative mx-auto max-w-6xl text-center">
        <Kicker>{t.done ? 'the floor is open' : 'doors open in'}</Kicker>
        {!t.done && (
          <Reveal className="mt-8 grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {UNITS.map((unit) => (
              <div key={unit} className="flex flex-col items-center gap-3" role="timer" aria-label={`${t[unit]} ${unit}`}>
                <span aria-hidden className="font-condensed text-[clamp(5.5rem,17vw,13rem)] leading-[0.9] fringe">
                  {String(t[unit]).padStart(2, '0').split('').map((d, i) => <Digit key={i} value={d} />)}
                </span>
                <span className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase">[{unit}]</span>
              </div>
            ))}
          </Reveal>
        )}
        <p className="mt-12 font-condensed text-3xl tracking-wide uppercase sm:text-5xl">Friday · 11.13.2026 · 7 pm</p>
      </div>
    </section>
  )
}
