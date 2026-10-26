import { m } from 'motion/react'
import freddie from '../assets/scene/01.jpg'
import mj from '../assets/scene/02.jpg'
import basquiat from '../assets/scene/03.jpg'
import flare from '../assets/scene/flare.jpg'

const ease = [0.22, 1, 0.36, 1]

// on phones the four prints fan out like a hand of cards; from sm up they sit in the case-study row
const PHOTOS = [
  [flare, '-rotate-6 translate-y-4 sm:translate-y-1'],
  [mj, '-rotate-2 sm:-translate-y-1'],
  [freddie, 'rotate-2 sm:translate-y-0'],
  [basquiat, 'rotate-6 translate-y-4 sm:-translate-y-2'],
]

const TAGS = ['Friday the 13th', '7 pm → late', 'Veroias 4 · Thessaloniki', 'Dress code: Studio 54', 'BYOB', 'RSVP by Nov 5']

// the grey case-study card: photo row, bold/regular title, bracketed mono date, tag chips
export default function Invite() {
  return (
    <section id="invite" data-section="01 · Invite" className="overflow-x-clip bg-card px-4 pt-12 pb-8 text-ink sm:px-9 sm:pt-14">
      <nav className="flex items-baseline justify-between gap-4 text-sm sm:text-lg">
        <p>
          01/07 <span className="ml-2 underline underline-offset-4">Invitation</span>
        </p>
        <div className="flex gap-4 font-bold sm:gap-8">
          <a href="#program" className="hover:underline">Program</a>
          <a href="#dress-code" className="hover:underline">Dress code</a>
          <a href="#rsvp" className="hover:underline">RSVP</a>
        </div>
      </nav>

      <div className="mt-10 flex justify-center sm:grid sm:grid-cols-4 sm:gap-10 lg:gap-24">
        {PHOTOS.map(([src, tilt], i) => (
          <m.div
            key={src}
            className={`-ml-[4%] w-[28%] shrink-0 first:ml-0 sm:ml-0 sm:w-auto sm:rotate-0 ${tilt}`}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -14, transition: { duration: 0.3 } }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.12 }}
          >
            <img src={src} alt="" loading="lazy" width={816} height={1456} className="h-auto w-full border-4 border-white shadow-xl grayscale sm:border-0 sm:shadow-none" />
          </m.div>
        ))}
      </div>

      <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-[1.5fr_0.7fr_1.3fr] md:items-end">
        <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl">
          {['Studio 54', 'lpm’s birthday'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <m.span
                className={`block ${i ? '' : 'font-black tracking-tight uppercase'}`}
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </h1>
        <div className="flex items-end justify-between gap-4 md:contents">
          <p className="text-3xl font-black tracking-tight sm:text-6xl md:text-center">[LPM]</p>
          <p className="font-mono text-2xl tracking-[0.08em] sm:text-5xl md:text-right">[11.13.2026]</p>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2 font-mono text-[0.7rem] tracking-wider uppercase sm:mt-12 sm:gap-3 sm:text-sm">
        {TAGS.map((t, i) => (
          <m.li
            key={t}
            className="border border-ink/60 px-1.5 py-0.5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease }}
          >
            {t}
          </m.li>
        ))}
      </ul>
    </section>
  )
}
