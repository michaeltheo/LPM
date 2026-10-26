import { m } from 'motion/react'
import { Kicker } from '../ui.jsx'

const sorted = (glob) => Object.keys(glob).sort().map((k) => glob[k])

// each board is dressed as one of the magazine covers from the reference project
const BOARDS = [
  {
    // NIGHTLIFE '78: aged paper, giant geometric masthead, cover lines in bold
    title: 'her',
    cols: 4,
    photos: sorted(import.meta.glob('../assets/her/*.jpg', { eager: true, import: 'default' })),
    heights: [479, 331, 390, 409, 163, 202, 282, 291, 389, 262, 336, 394, 135, 394, 309, 355, 175, 164, 316, 345, 311, 297, 328],
    frame: 'bg-aged text-ink paper-edge',
    head: (
      <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
        <h3 className="font-geo text-[clamp(5.5rem,24vw,12rem)] leading-[0.78] font-extrabold tracking-tight whitespace-nowrap uppercase">
          Her<span className="hidden sm:inline"> ’78</span>
        </h3>
        <p className="hidden text-right font-geo text-2xl leading-tight font-bold sm:block lg:text-4xl">
          Inside
          <br />
          Studio 54
          <span className="mt-3 block border-t-2 border-ink pt-3">
            Fashion
            <br />
            Special
          </span>
        </p>
      </div>
    ),
    foot: <p className="text-right font-mono text-xs uppercase">Nº 54 · 11.13.26</p>,
  },
  {
    // DISCO NIGHTLIFE: black cover, condensed white masthead, cover lines, barcode
    title: 'him',
    cols: 4,
    photos: sorted(import.meta.glob('../assets/him/*.jpg', { eager: true, import: 'default' })),
    heights: [377, 333, 387, 316, 447, 310, 373, 282, 304, 379, 342, 388, 369, 403, 314, 171, 146],
    frame: 'bg-[#141414] text-white border-10 border-[#d9d6cf]',
    head: (
      <div className="text-center">
        <h3 className="font-condensed text-[clamp(6rem,26vw,18rem)] leading-[0.85] uppercase fringe">Him</h3>
        <p className="font-condensed text-2xl tracking-wide sm:text-4xl">Inside Studio 54’s Wildest Nights</p>
      </div>
    ),
    foot: (
      <div className="flex items-end justify-between gap-6">
        <p className="font-condensed text-xl leading-tight uppercase sm:text-3xl">
          Satin shirts
          <br />
          Open collars
          <br />
          White suits
          <br />
          Gold chains
        </p>
        <div className="bg-white px-2 pt-2 pb-1 text-ink">
          <div className="h-12 w-32 barcode sm:h-16 sm:w-44" />
          <p className="mt-1 text-center font-mono text-[0.6rem] tracking-[0.2em]">0 54 11132026 4</p>
        </div>
      </div>
    ),
  },
  {
    // VINTAGE NIGHTLIFE: charcoal cover, outlined masthead, serif "special issue"
    title: 'beauty',
    cols: 3,
    photos: sorted(import.meta.glob('../assets/beauty/*.jpg', { eager: true, import: 'default' })),
    heights: [734, 300, 262, 375, 388, 420, 384, 220],
    frame: 'bg-[#262626] text-white',
    head: (
      <div className="text-center">
        <h3 className="font-geo text-[clamp(4.5rem,19vw,14rem)] leading-[0.85] font-bold text-[#262626] uppercase [-webkit-text-stroke:4px_white] [paint-order:stroke_fill]">Beauty</h3>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="hidden text-left text-xl leading-tight font-bold sm:block">
            Disco
            <br />
            Icons
          </p>
          <p className="flex-1 font-serif text-2xl sm:text-4xl">Studio 54 Special Issue</p>
          <p className="hidden text-right text-xl leading-tight font-bold sm:block">
            Midnight
            <br />
            Style
          </p>
        </div>
      </div>
    ),
  },
  {
    // NIGHT FEVER: cream border, black page, red slab masthead
    title: 'the night',
    cols: 3,
    photos: sorted(import.meta.glob('../assets/night/*.jpg', { eager: true, import: 'default' })),
    heights: [231, 476, 418, 726, 409, 321, 330, 474],
    frame: 'bg-ink text-white border-12 border-aged',
    head: (
      <div className="text-center">
        <h3 className="font-slab text-[clamp(3rem,12vw,9rem)] leading-[0.95] text-red uppercase">The Night</h3>
        <div className="mt-2 flex items-center justify-between gap-4 font-slab text-sm uppercase sm:text-2xl">
          <span className="hidden sm:inline">Exclusive photos</span>
          <span className="flex-1">The Studio 54 Phenomenon</span>
          <span className="hidden sm:inline">Disco glamour</span>
        </div>
      </div>
    ),
  },
]

const COLUMNS = { 3: 'md:columns-3', 4: 'md:columns-4' }

// phones: a swipeable rail of 3:4 cards. md up: the masonry from the collage mockups.
// b&w until hovered, or tapped (data-dev is toggled on tap)
const PHOTO =
  'block h-[46svh] w-auto shrink-0 snap-center object-cover max-md:aspect-[3/4]! md:mb-2.5 md:h-auto md:w-full md:break-inside-avoid ' +
  'grayscale contrast-125 transition-[filter] duration-700 hover:grayscale-0 hover:contrast-100 data-dev:grayscale-0 data-dev:contrast-100'

export default function Moodboards() {
  return (
    <section
      id="moodboards"
      data-section="05 · Moodboards"
      className="overflow-x-clip bg-ink px-4 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28"
      onClick={(e) => e.target.tagName === 'IMG' && e.target.toggleAttribute('data-dev')}
    >
      <div className="mx-auto max-w-6xl">
        <Kicker>05 · the moodboards · four issues · tap a photo to develop it</Kicker>
        <div className="mt-10 flex flex-col gap-16 sm:gap-28">
          {BOARDS.map(({ title, cols, photos, heights, frame, head, foot }, b) => {
            // crops from the collage mockups (1080px artboard minus padding and gaps), kept as
            // aspect ratios so the columns match the design and nothing jumps while photos lazy-load
            const colWidth = (992 - (cols - 1) * 10) / cols
            const side = b % 2 ? 1 : -1
            return (
              // each issue lands on the table with a little spin, alternating sides
              <m.article
                key={title}
                aria-label={title}
                className={`p-4 sm:p-8 md:w-[92%] ${b % 2 ? 'md:ml-auto' : ''} ${frame}`}
                initial={{ opacity: 0, y: 100, rotate: side * 6 }}
                whileInView={{ opacity: 1, y: 0, rotate: side * 0.8 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ type: 'spring', stiffness: 70, damping: 15 }}
              >
                {head}
                <div className={`-mx-4 mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 no-scrollbar sm:-mx-8 sm:mt-8 sm:px-8 md:mx-0 md:block md:gap-2.5 md:overflow-visible md:px-0 ${COLUMNS[cols]}`}>
                  {photos.map((src, i) => (
                    <m.img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ aspectRatio: `${colWidth} / ${heights[i]}` }}
                      className={PHOTO}
                      initial={{ clipPath: 'inset(0 0 100% 0)' }}
                      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
                <p className="mt-3 font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-60 md:hidden">[ swipe → {photos.length} looks ]</p>
                {foot && <div className="mt-4">{foot}</div>}
              </m.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
