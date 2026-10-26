import freddie from '../assets/scene/01.jpg'
import mj from '../assets/scene/02.jpg'
import basquiat from '../assets/scene/03.jpg'
import flare from '../assets/scene/flare.jpg'
import { Reveal } from '../ui.jsx'

const PHOTOS = [
  [flare, 'translate-y-1'],
  [mj, '-translate-y-1'],
  [freddie, 'translate-y-0'],
  [basquiat, '-translate-y-2'],
]

const TAGS = ['Friday the 13th', '7 pm → late', 'Veroias 4 · Thessaloniki', 'Dress code: Studio 54', 'BYOB', 'RSVP by Nov 5']

// the grey case-study card: photo row, bold/regular title, bracketed mono date, tag chips
export default function Invite() {
  return (
    <section id="invite" className="bg-card px-4 py-6 text-ink sm:px-9 sm:py-8">
      <nav className="flex items-baseline justify-between gap-4 text-sm sm:text-lg">
        <p>
          1/5 <span className="ml-2 underline underline-offset-4">Invitation</span>
        </p>
        <div className="flex gap-4 font-bold sm:gap-8">
          <a href="#program" className="hover:underline">Program</a>
          <a href="#dress-code" className="hover:underline">Dress code</a>
          <a href="#rsvp" className="hover:underline">RSVP</a>
        </div>
      </nav>

      <div className="mt-6 grid grid-cols-4 gap-2 sm:mt-10 sm:gap-10 lg:gap-24">
        {PHOTOS.map(([src, shift], i) => (
          <Reveal key={src} delay={i * 0.1} className={shift}>
            <img src={src} alt="" loading="lazy" width={816} height={1456} className="h-auto w-full grayscale" />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:mt-16 md:grid-cols-[1.5fr_0.7fr_1.3fr] md:items-end">
        <h1 className="text-4xl leading-[1.05] sm:text-6xl">
          <span className="block font-black tracking-tight uppercase">Studio 54</span>
          <span className="block">lpm’s birthday</span>
        </h1>
        <p className="text-4xl font-black tracking-tight sm:text-6xl md:text-center">[LPM]</p>
        <p className="font-mono text-3xl tracking-[0.12em] sm:text-5xl md:text-right">[11.13.2026]</p>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2 font-mono text-[0.7rem] tracking-wider uppercase sm:mt-12 sm:gap-3 sm:text-sm">
        {TAGS.map((t) => (
          <li key={t} className="border border-ink/60 px-1.5 py-0.5">
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
