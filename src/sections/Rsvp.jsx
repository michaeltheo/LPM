import mj from '../assets/scene/02.jpg'
import basquiat from '../assets/scene/03.jpg'
import { Kicker, Reveal } from '../ui.jsx'

// the closing "THANKS" banner, turned into the rsvp
export default function Rsvp() {
  return (
    <footer id="rsvp" className="bg-ink">
      <div className="relative overflow-hidden">
        <div aria-hidden className="grid h-[70svh] grid-cols-2">
          <img src={mj} alt="" loading="lazy" className="size-full object-cover object-[50%_30%] grayscale brightness-[.55] contrast-125" />
          <img src={basquiat} alt="" loading="lazy" className="size-full object-cover object-[50%_30%] grayscale brightness-[.55] contrast-125" />
        </div>
        {/* shortcut: rsvp is text only, add the form or link here once the backend exists */}
        <Reveal className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <Kicker className="text-white/80">the doorman wants to know</Kicker>
          <h2 className="mt-6 font-condensed text-[clamp(7rem,30vw,22rem)] leading-[0.85] uppercase fringe sm:mt-10">RSVP</h2>
          <p className="font-condensed text-4xl uppercase fringe sm:text-6xl">by Nov 5</p>
        </Reveal>
      </div>
      <div className="flex flex-wrap justify-between gap-2 px-4 py-5 font-mono text-[0.65rem] tracking-[0.2em] text-white/60 uppercase sm:px-8 sm:text-xs">
        <span>Studio 54 · lpm’s birthday</span>
        <span>[11.13.2026] · Thessaloniki</span>
      </div>
    </footer>
  )
}
