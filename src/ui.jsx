import { m } from 'motion/react'
import { useId } from 'react'

export function Reveal({ delay = 0, className, children }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

// the bracketed mono labels from the case-study cards: [03.25.2025]
export function Kicker({ className = '', children }) {
  return <p className={`font-mono text-xs tracking-[0.2em] uppercase sm:text-sm ${className}`}>[ {children} ]</p>
}

// text running round a circle, stretched to close the loop exactly
export function RingText({ text, size = 9, r = 41 }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full">
      <path id={id} d={`M50,50 m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 -${2 * r},0`} fill="none" />
      <text fill="currentColor" fontSize={size} fontWeight="700" fontFamily="Jost, sans-serif">
        <textPath href={`#${id}`} textLength={2 * Math.PI * r - 1} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  )
}

// zine sticker: one photo printed in a single riso ink, studio 54 round the rim
export function Badge({ src, ink, overprint = false, className = '' }) {
  return (
    <div className={`relative aspect-square ${className}`} style={{ color: ink }}>
      {/* green pass first, the ink pass multiplies over it like stacked riso layers */}
      {overprint && <div className="absolute inset-[9%] translate-x-[4%] -translate-y-[3%] rounded-full bg-green/70" />}
      <div className="absolute inset-[17%] overflow-hidden rounded-full mix-blend-multiply" style={{ background: ink }}>
        <img src={src} alt="" loading="lazy" className="size-full object-cover object-top grayscale brightness-150 contrast-150 mix-blend-screen" />
      </div>
      <RingText text="STUDIO 54 · STUDIO 54 · STUDIO 54 · " />
    </div>
  )
}

const CUTS = [
  'bg-purple text-lilac font-geo font-bold',
  'bg-ink text-white font-condensed',
  'bg-pink text-white font-serif font-black',
  'bg-white text-purple font-slab',
  'bg-lilac text-purple font-geo font-extrabold',
]
const TILT = [-4, 3, -2, 5, -3, 2, -5, 4, -1]

// ransom-note headline: every letter cut from a different page
export function Ransom({ text, className = '' }) {
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden className="inline-flex gap-[0.06em]">
          {[...word].map((c, i) => {
            const k = w * 5 + i
            return (
              <span key={i} className={`inline-block px-[0.12em] leading-[1.15] uppercase ${CUTS[(k * 3) % CUTS.length]}`} style={{ rotate: `${TILT[k % TILT.length]}deg` }}>
                {c}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
