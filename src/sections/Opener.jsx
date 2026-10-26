import { m, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import straws from '../assets/scene/04.jpg'
import marilyn from '../assets/scene/05.jpg'

const ease = [0.22, 1, 0.36, 1]

// photo is 130% tall so the parallax drift never uncovers the panel edge
function Panel({ src, position, y, children }) {
  return (
    <div className="relative h-[50svh] overflow-hidden md:h-auto">
      <m.img
        src={src}
        alt=""
        fetchPriority="high"
        initial={{ scale: 1.25 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease }}
        style={{ objectPosition: position, y }}
        className="absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover grayscale contrast-125 brightness-75"
      />
      {children}
    </div>
  )
}

// each line slides up out of its own mask, then keeps glitching like a signal that won't lock
function Line({ delay, speed, children }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <m.span
        className="block glitch"
        data-text={children}
        style={{ '--glitch-speed': speed }}
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </m.span>
    </span>
  )
}

// the "PERSONAL PROJECT | L[A]" banner from the case study, opened with a camera flash
export default function Opener() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '11%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header ref={ref} data-section="00 · Cover" className="relative grid bg-ink md:aspect-[3/1.3] md:grid-cols-2">
      <m.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transitionEnd: { display: 'none' } }}
        transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
      />

      <Panel src={straws} position="50% 35%" y={imgY}>
        <m.p aria-hidden style={{ y: textY, opacity: fade }} className="relative flex h-full flex-col justify-center px-[7%] font-condensed text-[28vw] leading-[0.86] uppercase fringe md:text-[13vw]">
          <Line delay={0.5} speed="2.6s">
            Let’s
          </Line>
          <Line delay={0.65} speed="3.3s">
            Disco
          </Line>
        </m.p>
      </Panel>

      <Panel src={marilyn} position="50% 30%" y={imgY}>
        <m.p aria-hidden style={{ y: textY, opacity: fade }} className="relative flex h-full items-center justify-center font-geo text-[34vw] leading-none font-medium md:text-[15vw]">
          <m.span initial={{ x: '0.7em', opacity: 0 }} animate={{ x: '0em', opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 1 }}>
            [
          </m.span>
          <span className="overflow-hidden">
            <m.span className="block" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.8, ease }}>
              54
            </m.span>
          </span>
          <m.span initial={{ x: '-0.7em', opacity: 0 }} animate={{ x: '0em', opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 1 }}>
            ]
          </m.span>
        </m.p>
      </Panel>

      <m.p
        aria-hidden
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-mono text-[0.65rem] tracking-[0.3em] text-white/70 uppercase"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        [ scroll ↓ ]
      </m.p>
    </header>
  )
}
