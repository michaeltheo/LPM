import { m } from 'motion/react'
import dancers from '../assets/dancers.gif'
import marilyn from '../assets/scene/05.jpg'
import { Badge, Kicker, Ransom, RingText, Tear } from '../ui.jsx'

const spring = { type: 'spring', stiffness: 260, damping: 16 }

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
    <section id="dress-code" data-section="04 · Dress code" className="relative overflow-x-clip bg-blush px-4 pt-14 pb-16 text-ink sm:px-8 sm:pt-20 sm:pb-24">
      <Tear />
      <div className="mx-auto max-w-6xl">
        <Kicker className="text-purple">04 · the dress code</Kicker>
        <h2 className="mt-6 text-6xl sm:text-8xl">
          <Ransom text="dress code" />
        </h2>
        <m.p
          className="mt-8 font-marker text-3xl sm:text-5xl"
          initial={{ opacity: 0, rotate: -8, x: -30 }}
          whileInView={{ opacity: 1, rotate: -2, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.8 }}
        >
          studio 54, not woodstock.
        </m.p>
        <m.p
          className="mt-3 -rotate-1 font-marker text-xl text-purple sm:text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          pick your alter ego, the moodboards are below ↓
        </m.p>

        <div className="mt-14 grid gap-14 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <Kicker className="text-purple">at the door · wear a color</Kicker>
            {/* stickers get slapped down one after another */}
            <ul className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start sm:gap-4">
              {WRISTBANDS.map(([fill, fg, name, meaning, optional], i) => (
                <m.li
                  key={name}
                  className="w-[45%] max-w-44 sm:w-[30%]"
                  initial={{ opacity: 0, scale: 1.8, rotate: TILTS[i] - 40 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: TILTS[i] }}
                  whileHover={{ rotate: TILTS[i] + 25, scale: 1.06, transition: { type: 'spring', stiffness: 200, damping: 12 } }}
                  whileTap={{ scale: 0.92 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ ...spring, delay: i * 0.12 }}
                >
                  <div className="relative aspect-square rounded-full shadow-[0_6px_0_rgb(0_0_0/0.12)]" style={{ background: fill, color: fg }}>
                    <RingText text={ring(meaning)} size={8} r={38} />
                    <span className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-condensed text-3xl uppercase sm:text-4xl">{name}</span>
                      {optional && <span className="font-marker text-xs opacity-80">optional</span>}
                    </span>
                  </div>
                </m.li>
              ))}
            </ul>
          </div>

          <m.figure
            className="relative mx-auto w-[88%] max-w-md"
            initial={{ opacity: 0, y: -80, rotate: -10 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          >
            {[
              ['left-6 -rotate-6', -1],
              ['right-6 rotate-6', 1],
            ].map(([place, side]) => (
              <m.span
                key={place}
                aria-hidden
                className={`absolute -top-3 z-10 h-7 w-24 bg-[#f4ecd2]/80 ${place}`}
                initial={{ opacity: 0, x: side * 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
            ))}
            <img
              src={dancers}
              alt="Photocopied photo of dancers, faces covered by pennies"
              loading="lazy"
              className="aspect-640/707 w-full bg-white object-cover object-left p-2 shadow-xl"
            />
          </m.figure>
        </div>
      </div>

      {/* the badge sheet from the zine, with the green pass overprinted on some */}
      <div aria-hidden className="mx-auto mt-20 grid max-w-6xl items-end gap-10 md:grid-cols-[1.6fr_1fr]">
        <m.div
          className="grid grid-cols-6 gap-1"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.03 } } }}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <m.div
              key={i}
              className={i >= 18 ? 'max-sm:hidden' : ''}
              variants={{ hidden: { scale: 0, rotate: -120 }, show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } } }}
            >
              <Badge src={marilyn} ink="var(--color-pink)" overprint={OVERPRINTED.has(i)} />
            </m.div>
          ))}
        </m.div>
        <m.div
          className="relative mx-auto w-[85%] pb-6 md:w-full"
          initial={{ opacity: 0, x: 80, rotate: 6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        >
          <div className="bg-pink [clip-path:polygon(0_6%,62%_0,64%_10%,100%_8%,100%_100%,8%_100%,0_70%)]">
            <img src={marilyn} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale contrast-150 mix-blend-screen" />
          </div>
          <p className="absolute right-0 bottom-0 text-right font-geo text-[20vw] leading-[0.8] font-medium text-green uppercase misreg md:text-[7.5rem]">
            <span className="block text-[0.45em] text-white">54</span>
            Studio
          </p>
        </m.div>
      </div>
    </section>
  )
}
