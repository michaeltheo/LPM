import { m } from 'motion/react'
import dancers from '../assets/dancers.gif'
import marilyn from '../assets/scene/05.jpg'
import { Badge, Kicker, Ransom, Reveal, RingText } from '../ui.jsx'

// [fill, text, color name, what it says at the door, optional]
const WRISTBANDS = [
  ['#d9b45a', '#0b0b0b', 'gold', 'shoot me, darling'],
  ['#ffffff', '#0b0b0b', 'white', 'not tonight, paparazzi'],
  ['#0b0b0b', '#ffffff', 'black', 'single', true],
  ['#d8352a', '#ffffff', 'red', 'taken', true],
  ['#9a40c4', '#ffffff', 'purple', 'it’s complicated', true],
]

const TILTS = [-6, 4, -3, 7, -5]
// repeat short phrases so every ring reads at roughly the same letter spacing
const ring = (s) => `${s} · `.repeat(Math.ceil(34 / (s.length + 3))).toUpperCase()
const OVERPRINTED = new Set([0, 1, 2, 4, 9, 10, 12, 14, 17, 19, 20, 22])

// a riso-printed zine page: pink paper, ransom title, marker notes, stickers and a badge sheet
export default function DressCode() {
  return (
    <section id="dress-code" className="overflow-hidden bg-blush px-4 py-16 text-ink sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Kicker className="text-purple">the dress code</Kicker>
        <h2 className="mt-6 text-6xl sm:text-8xl">
          <Ransom text="dress code" />
        </h2>
        <p className="mt-8 -rotate-2 font-marker text-3xl sm:text-5xl">studio 54, not woodstock.</p>
        <p className="mt-3 -rotate-1 font-marker text-xl text-purple sm:text-2xl">pick your alter ego, the moodboards are below ↓</p>

        <div className="mt-16 grid gap-16 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <Kicker className="text-purple">at the door · wear a color</Kicker>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {WRISTBANDS.map(([fill, fg, name, meaning, optional], i) => (
                <li key={name}>
                  <m.div
                    className="relative mx-auto aspect-square w-full max-w-44 rounded-full shadow-[0_6px_0_rgb(0_0_0/0.12)]"
                    style={{ background: fill, color: fg, rotate: TILTS[i] }}
                    whileHover={{ rotate: TILTS[i] + 25, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  >
                    <RingText text={ring(meaning)} size={8} r={38} />
                    <span className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-condensed text-3xl uppercase sm:text-4xl">{name}</span>
                      {optional && <span className="font-marker text-xs opacity-80">optional</span>}
                    </span>
                  </m.div>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.15} className="relative mx-auto max-w-md rotate-2">
            <span aria-hidden className="absolute -top-3 left-6 z-10 h-7 w-24 -rotate-6 bg-[#f4ecd2]/80" />
            <span aria-hidden className="absolute -top-3 right-6 z-10 h-7 w-24 rotate-6 bg-[#f4ecd2]/80" />
            <img
              src={dancers}
              alt="Photocopied photo of dancers, faces covered by pennies"
              loading="lazy"
              className="aspect-640/707 w-full bg-white object-cover object-left p-2 shadow-xl"
            />
          </Reveal>
        </div>
      </div>

      {/* the badge sheet from the zine, with the green pass overprinted on some */}
      <div aria-hidden className="mx-auto mt-24 grid max-w-6xl items-end gap-8 md:grid-cols-[1.6fr_1fr]">
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 24 }, (_, i) => (
            <Badge key={i} src={marilyn} ink="var(--color-pink)" overprint={OVERPRINTED.has(i)} />
          ))}
        </div>
        <div className="relative pb-6">
          <div className="bg-pink [clip-path:polygon(0_6%,62%_0,64%_10%,100%_8%,100%_100%,8%_100%,0_70%)]">
            <img src={marilyn} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale contrast-150 mix-blend-screen" />
          </div>
          <p className="absolute right-0 bottom-0 text-right font-geo text-[22vw] leading-[0.8] font-medium text-green uppercase misreg md:text-[7.5rem]">
            <span className="block text-[0.45em] text-white">54</span>
            Studio
          </p>
        </div>
      </div>
    </section>
  )
}
