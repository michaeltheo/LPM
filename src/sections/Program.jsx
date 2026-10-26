import basquiat from '../assets/scene/03.jpg'
import flare from '../assets/scene/flare.jpg'
import { Reveal } from '../ui.jsx'

const PROGRAM = [
  ['7 pm', 'Tasting · old school R&B & rap'],
  ['9 pm', 'To the dance floor · tech disco → techno → surprise'],
  ['Midnight', 'The moment of the night · be on the floor'],
  ['Late', 'Or until your shoes betray you'],
]

const PHOTO = 'w-full object-cover grayscale sepia-[.25] contrast-125'

// the "Vintage Scene" newspaper spread: masthead, rules, bold serif heads, captioned photos
export default function Program() {
  return (
    <section id="program" className="bg-paper px-4 py-14 text-ink lining-nums sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between gap-3 border-b border-ink/60 pb-2 font-serif text-[0.65rem] tracking-[0.2em] uppercase sm:text-xs">
          <span>Vol. 54</span>
          <span>Friday, November 13, 2026</span>
          <span className="hidden sm:inline">Thessaloniki</span>
          <span>Free · if you’re on the list</span>
        </div>
        <h2 className="py-2 text-center font-serif text-4xl font-black tracking-tight fringe-soft sm:py-4 sm:text-8xl">The Night Edition</h2>
        <div className="border-t-[3px] border-double border-ink pt-1" />

        <div className="relative mt-8 grid gap-14 md:grid-cols-2 md:gap-16">
          <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 bg-linear-to-r from-transparent via-ink/10 to-transparent md:block" />

          <Reveal>
            <h3 className="text-center font-serif text-4xl leading-[0.95] font-black tracking-tight fringe-soft sm:text-5xl lg:text-6xl">
              Friday the 13th:
              <br />
              Nights of Glitz &amp; Chaos
            </h3>
            <figure className="mt-6">
              <img src={basquiat} alt="Black and white flash photo of guests at the bar" loading="lazy" className={`aspect-[4/3] object-[50%_40%] ${PHOTO}`} />
              <figcaption className="mt-3 text-center font-serif text-2xl sm:text-3xl">Inside the Legendary Club</figcaption>
            </figure>
            <p className="mt-6 font-serif text-lg leading-relaxed first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:text-7xl first-letter:leading-[0.75] first-letter:font-black">
              Another lap around the sun, and this one we’re taking under a disco ball. On Friday the 13th the house on Veroias turns into Studio 54 for
              one night only, velvet rope and all. And yes, you’re on the list.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border-y border-ink/60 py-3 text-center">
              <h3 className="font-serif text-4xl leading-none font-black tracking-tight fringe-soft sm:text-6xl">The Program</h3>
            </div>
            <p className="mt-2 text-center font-serif text-2xl italic">The Heart of the Party</p>

            <dl className="mt-6 font-serif">
              {PROGRAM.map(([time, what]) => (
                <div key={time} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-ink/30 py-4 sm:grid-cols-[8rem_1fr]">
                  <dt className="text-2xl font-bold italic">{time}</dt>
                  <dd className="text-xl leading-snug">{what}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="text-2xl font-bold italic">The house</dt>
                <dd className="text-xl">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Veroias%204%2C%20Thessaloniki"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    Veroias 4, Thessaloniki ↗
                  </a>
                </dd>
              </div>
            </dl>

            <figure className="mt-4">
              <img src={flare} alt="Flash photo of a crowd in sunglasses" loading="lazy" className={`aspect-[16/10] object-[50%_45%] ${PHOTO}`} />
              <figcaption className="mt-3 text-center font-serif text-2xl sm:text-3xl">The Flash at the Door</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
