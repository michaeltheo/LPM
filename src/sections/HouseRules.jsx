import freddie from '../assets/scene/01.jpg'
import { Badge, Reveal } from '../ui.jsx'

const RULES = [
  ['leave the “happy birthday” at the door.', 'inside, the only wish that counts is your mood.'],
  ['no gifts. bring what you drink.', 'sodas, beers or your favorite bottle. the dance floor takes care of the rest.'],
]

// the zine's record sleeve: glassine paper, pen notes, a printed badge grid and the label hole
export default function HouseRules() {
  return (
    <section className="bg-white px-4 py-16 text-ink sm:px-8 sm:py-28">
      <Reveal className="relative mx-auto max-w-4xl -rotate-1 border-x-10 border-[#e2d8c4] bg-[#ece4d4] px-5 pt-8 pb-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.35)] sm:px-12 sm:pt-12">
        <div className="flex items-start justify-between gap-6">
          <h2 className="-rotate-3 font-marker text-4xl sm:text-6xl">house rules</h2>
          <p aria-hidden className="font-marker text-6xl leading-none sm:text-8xl">54</p>
        </div>

        <ol className="mt-8 space-y-6">
          {RULES.map(([rule, note], i) => (
            <li key={rule} className="font-marker">
              <p className="text-2xl sm:text-3xl">
                {i + 1}. {rule}
              </p>
              <p className="mt-1 pl-7 text-lg text-blue sm:text-xl">{note}</p>
            </li>
          ))}
        </ol>

        <div className="relative mt-10">
          <div className="grid grid-cols-6 gap-1 sm:grid-cols-9">
            {Array.from({ length: 27 }, (_, i) => (
              <Badge key={i} src={freddie} ink="var(--color-blue)" className={i >= 18 ? 'hidden sm:block' : ''} />
            ))}
          </div>
          <div aria-hidden className="absolute top-1/2 left-1/2 aspect-square w-[34%] -translate-1/2 rounded-full bg-white shadow-[inset_0_2px_8px_rgb(0_0_0/0.2)]" />
        </div>

        <div className="mt-4 flex justify-between gap-4 text-[0.6rem] tracking-wide uppercase sm:text-xs">
          <p>Made in Thessaloniki · 11/26</p>
          <p className="text-right">
            LPM patent no: 11.13.2026
            <br />
            Birthday wishes pending.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
