import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import scene1 from './assets/scene/01.jpg'
import scene2 from './assets/scene/02.jpg'
import scene3 from './assets/scene/03.jpg'
import scene4 from './assets/scene/04.jpg'
import scene5 from './assets/scene/05.jpg'
import flare from './assets/scene/flare.jpg'
import Countdown from './sections/Countdown.jsx'
import DressCode from './sections/DressCode.jsx'
import HouseRules from './sections/HouseRules.jsx'
import Invite from './sections/Invite.jsx'
import Moodboards from './sections/Moodboards.jsx'
import Opener from './sections/Opener.jsx'
import Program from './sections/Program.jsx'
import Rsvp from './sections/Rsvp.jsx'

const STRIP = [scene1, scene2, flare, scene3, scene4, scene5]

// the 3-up portrait strips from the case study, running as a loop
function FilmStrip() {
  // four copies so each half of the track is wider than any screen; -50% then loops seamlessly
  return (
    <div aria-hidden className="overflow-hidden bg-ink py-2">
      <div className="flex w-max motion-safe:animate-[marquee_80s_linear_infinite]">
        {[...STRIP, ...STRIP, ...STRIP, ...STRIP].map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" className="mr-2 aspect-816/1456 h-80 w-auto sm:h-[30rem]" />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Opener />
        <main>
          <Invite />
          <Countdown />
          <Program />
          <FilmStrip />
          <DressCode />
          <Moodboards />
          <HouseRules />
        </main>
        <Rsvp />
        <div aria-hidden className="pointer-events-none fixed -inset-[10%] z-50 grain opacity-[0.09] motion-safe:animate-[grain_1s_steps(5)_infinite]" />
      </MotionConfig>
    </LazyMotion>
  )
}
