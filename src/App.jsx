import { LazyMotion, MotionConfig, domAnimation, m, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import Countdown from './sections/Countdown.jsx'
import DressCode from './sections/DressCode.jsx'
import HouseRules from './sections/HouseRules.jsx'
import Invite from './sections/Invite.jsx'
import Moodboards from './sections/Moodboards.jsx'
import Opener from './sections/Opener.jsx'
import Program from './sections/Program.jsx'
import Rsvp from './sections/Rsvp.jsx'

// the issue's running header, always on top: which section you're in and how far through you are
function IssueBar() {
  const { scrollYProgress } = useScroll()
  const [label, setLabel] = useState('00 · Cover')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setLabel(e.target.dataset.section)),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-section]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/70 text-white backdrop-blur-md">
      <div className="flex justify-between px-4 py-3 font-mono text-[0.65rem] tracking-[0.2em] uppercase sm:px-8 sm:text-xs">
        <span>[ Studio 54 · LPM ]</span>
        <span>[ {label} ]</span>
      </div>
      <m.div className="absolute inset-x-0 -bottom-px h-px origin-left bg-white" style={{ scaleX: scrollYProgress }} />
    </div>
  )
}

function Ticker({ text, reverse = false }) {
  const run = text.repeat(6)
  return (
    <div className={`flex w-max motion-safe:animate-[marquee_40s_linear_infinite] ${reverse ? '[animation-direction:reverse]' : ''}`}>
      <span className="pr-4">{run}</span>
      <span className="pr-4">{run}</span>
    </div>
  )
}

// two tapes crossed over the seam between two sections, running in opposite directions
function Tapes({ seam, a, b }) {
  return (
    <div aria-hidden className={`relative z-10 overflow-x-clip py-10 font-condensed text-2xl uppercase sm:py-14 sm:text-4xl ${seam}`}>
      <div className={`-mx-10 -rotate-3 py-1.5 sm:py-2 ${a[1]}`}>
        <Ticker text={a[0]} />
      </div>
      <div className={`-mx-10 -mt-2 rotate-3 py-1.5 sm:-mt-10 sm:rotate-2 sm:py-2 ${b[1]}`}>
        <Ticker text={b[0]} reverse />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <IssueBar />
        <Opener />
        <main>
          <Invite />
          <Countdown />
          <Program />
          <DressCode />
          <Tapes
            seam="bg-linear-to-b from-blush from-50% to-ink to-50%"
            a={['pick your alter ego · ', 'bg-ink text-white']}
            b={['her · him · beauty · the night · ', 'bg-pink text-ink']}
          />
          <Moodboards />
          <HouseRules />
          <Tapes
            seam="bg-linear-to-b from-white from-50% to-ink to-50%"
            a={['rsvp by nov 5 · ', 'bg-red text-white']}
            b={['the doorman wants to know · ', 'bg-paper text-ink']}
          />
        </main>
        <Rsvp />
        <div aria-hidden className="pointer-events-none fixed -inset-[10%] z-50 grain opacity-[0.09] motion-safe:animate-[grain_1s_steps(5)_infinite]" />
      </MotionConfig>
    </LazyMotion>
  )
}
