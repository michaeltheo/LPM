import { m, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import mj from '../assets/scene/02.jpg'
import basquiat from '../assets/scene/03.jpg'
import { Kicker } from '../ui.jsx'

// the closing "THANKS" banner, turned into the rsvp
export default function Rsvp() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const left = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])
  const right = useTransform(scrollYProgress, [0, 1], ['12%', '0%'])

  return (
    <footer ref={ref} id="rsvp" data-section="07 · RSVP" className="relative bg-ink">
      <div className="relative overflow-hidden">
        {/* the two halves slide together as you reach the end of the page */}
        <div aria-hidden className="grid h-[75svh] grid-cols-2">
          <m.img style={{ x: left }} src={mj} alt="" loading="lazy" className="size-full scale-125 object-cover object-[50%_30%] grayscale brightness-[.55] contrast-125" />
          <m.img style={{ x: right }} src={basquiat} alt="" loading="lazy" className="size-full scale-125 object-cover object-[50%_30%] grayscale brightness-[.55] contrast-125" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <Kicker className="text-white/80">07 · the doorman wants to know</Kicker>
          <h2
            aria-label="RSVP"
            data-text="RSVP"
            style={{ '--glitch-speed': '2.9s' }}
            className="mt-6 flex font-condensed text-[clamp(7rem,30vw,22rem)] leading-[0.85] uppercase glitch fringe sm:mt-10"
          >
            {[...'RSVP'].map((c, i) => (
              <m.span
                key={i}
                aria-hidden
                initial={{ y: '70%', opacity: 0, rotate: i % 2 ? 8 : -8 }}
                whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 180, damping: 13, delay: 0.1 * i }}
              >
                {c}
              </m.span>
            ))}
          </h2>
          <m.a
            href="/rsvp"
            className="mt-2 inline-block -rotate-2 bg-pink px-8 py-3 font-condensed text-3xl text-ink uppercase shadow-[6px_6px_0_var(--color-white)] transition-[rotate,box-shadow,translate] hover:rotate-0 hover:shadow-[2px_2px_0_var(--color-white)] hover:translate-x-1 hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-12 sm:text-5xl"
            initial={{ opacity: 0, scale: 1.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
          >
            get on the list →
          </m.a>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 px-4 py-5 font-mono text-[0.65rem] tracking-[0.2em] text-white/60 uppercase sm:px-8 sm:text-xs">
        <span>Studio 54 · lpm’s birthday</span>
        <span>[11.13.2026] · Thessaloniki</span>
        <a href="https://mtwebstudio.gr" target="_blank" rel="noreferrer" className="w-full text-center transition-colors hover:text-white sm:w-auto">
          Development · mt-webstudio.gr ↗
        </a>
      </div>
    </footer>
  )
}
