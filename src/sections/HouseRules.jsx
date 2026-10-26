import { m, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import freddie from '../assets/scene/01.jpg'
import { Badge, Kicker, RingText, Tear } from '../ui.jsx'

const RULES = [
  ['leave the “happy birthday” at the door.', 'inside, the only wish that counts is your mood.'],
  ['no gifts. bring what you drink.', 'sodas, beers or your favorite bottle. the dance floor takes care of the rest.'],
]

// the zine's record sleeve: glassine paper, pen notes, a printed badge grid and the label hole.
// as you scroll in, the record slides out of the sleeve and keeps spinning.
export default function HouseRules() {
  const ref = useRef(null)
  // shortcut: breakpoint read once on mount, a resize across 768px keeps the first direction
  const [wide] = useState(() => matchMedia('(min-width: 768px)').matches)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  // diagonally out of the top-right on desktop; straight up on phones, where there's no room to the side
  const x = useTransform(scrollYProgress, [0, 1], ['0%', wide ? '22%' : '6%'])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', wide ? '-48%' : '-62%'])

  return (
    <section data-section="06 · House rules" className="relative overflow-x-clip bg-white px-4 pt-14 pb-20 text-ink sm:px-8 sm:pt-20 sm:pb-28">
      <Tear />
      <div className="mx-auto max-w-4xl">
        <Kicker>06 · house rules</Kicker>
      </div>

      <div ref={ref} className="relative mx-auto mt-40 max-w-4xl md:mt-56">
        <m.div aria-hidden style={{ x, y }} className="absolute top-[5%] right-[6%] aspect-square w-[78%] sm:w-[60%]">
          <div className="size-full rounded-full bg-[repeating-radial-gradient(circle_at_center,#141414_0_1.5px,#262626_1.5px_3px)] shadow-[0_20px_40px_-10px_rgb(0_0_0/0.6)] motion-safe:animate-[spin_7s_linear_infinite]">
            <div className="absolute inset-[33%] rounded-full bg-pink text-ink">
              <RingText text="LPM · SIDE A · 11.13.2026 · LET’S DISCO · " size={8} r={40} />
              <span className="absolute inset-0 flex items-center justify-center font-condensed text-xl sm:text-3xl">54</span>
            </div>
          </div>
          {/* the light catching the grooves stays put while the record turns underneath */}
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_20deg,transparent,rgb(255_255_255/0.12)_8%,transparent_18%,transparent_50%,rgb(255_255_255/0.12)_58%,transparent_68%)]" />
          <div className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-white" />
        </m.div>

        <div className="relative -rotate-1 border-x-10 border-[#e2d8c4] bg-[#ece4d4] px-5 pt-8 pb-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.35)] sm:px-12 sm:pt-12">
          <div className="flex items-start justify-between gap-6">
            <h2 className="-rotate-3 font-marker text-4xl sm:text-6xl">house rules</h2>
            <p aria-hidden className="font-marker text-6xl leading-none sm:text-8xl">54</p>
          </div>

          <ol className="mt-8 space-y-6">
            {RULES.map(([rule, note], i) => (
              <m.li
                key={rule}
                className="font-marker"
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.5, ease: 'easeInOut' }}
              >
                <p className="text-2xl sm:text-3xl">
                  {i + 1}. {rule}
                </p>
                <p className="mt-1 pl-7 text-lg text-blue sm:text-xl">{note}</p>
              </m.li>
            ))}
          </ol>

          <div className="relative mt-10">
            <div className="grid grid-cols-6 gap-1 sm:grid-cols-9">
              {Array.from({ length: 27 }, (_, i) => (
                <Badge key={i} src={freddie} ink="var(--color-blue)" className={i >= 18 ? 'max-sm:hidden' : ''} />
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
        </div>
      </div>
    </section>
  )
}
