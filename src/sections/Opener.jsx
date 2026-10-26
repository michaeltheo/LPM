import { m } from 'motion/react'
import straws from '../assets/scene/04.jpg'
import marilyn from '../assets/scene/05.jpg'

const ease = [0.22, 1, 0.36, 1]

function Panel({ src, position, children }) {
  return (
    <div className="relative h-[50svh] overflow-hidden md:h-auto">
      <m.img
        src={src}
        alt=""
        fetchPriority="high"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        style={{ objectPosition: position }}
        className="absolute inset-0 size-full object-cover grayscale contrast-125 brightness-75"
      />
      <div className="relative flex h-full items-center px-[7%]">{children}</div>
    </div>
  )
}

// each line slides up out of its own mask
function Line({ delay, children }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <m.span className="block" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </m.span>
    </span>
  )
}

// the "PERSONAL PROJECT | L[A]" banner from the case study, as the opening shot
export default function Opener() {
  return (
    <header className="grid bg-ink md:aspect-[3/1.3] md:grid-cols-2">
      <Panel src={straws} position="50% 35%">
        <p aria-hidden className="font-condensed text-[28vw] leading-[0.86] uppercase fringe md:text-[13vw]">
          <Line delay={0.3}>Let’s</Line>
          <Line delay={0.45}>Disco</Line>
        </p>
      </Panel>
      <Panel src={marilyn} position="50% 30%">
        <p aria-hidden className="w-full text-center font-geo text-[34vw] leading-none font-medium md:text-[15vw]">
          <Line delay={0.6}>[54]</Line>
        </p>
      </Panel>
    </header>
  )
}
