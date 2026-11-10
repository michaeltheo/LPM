import { useEffect, useState } from 'react'
import { PHOTOS_OPEN } from '../countdown.js'
import { Kicker } from '../ui.jsx'

const CLOUD = import.meta.env.CLOUDINARY_CLOUD
const PRESET = import.meta.env.CLOUDINARY_PRESET
const thumb = (url) => url.replace('/upload/', '/upload/w_600,c_limit,f_auto,q_auto/')

// phone photos are 3-5 MB; a 1600px jpeg is ~300 KB and keeps the whole night inside the free tier
async function shrink(file) {
  const img = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  return new Promise((ok, fail) => canvas.toBlob((b) => (b ? ok(b) : fail(new Error('shrink failed'))), 'image/jpeg', 0.82))
}

async function upload(file) {
  const form = new FormData()
  form.append('file', await shrink(file))
  form.append('upload_preset', PRESET)
  const up = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: 'POST', body: form })
  if (!up.ok) throw new Error('cloudinary refused')
  const { secure_url } = await up.json()
  const res = await fetch('/api/photos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: secure_url }) })
  if (!res.ok) throw new Error('api refused')
  return secure_url
}

// the night's camera roll: locked until the doors open, then everyone drops their shots in
export default function Photos() {
  // shortcut: checked on page load, a tab opened before PHOTOS_OPEN needs a refresh to unlock
  const [open] = useState(() => Date.now() >= PHOTOS_OPEN)
  const [photos, setPhotos] = useState([])
  const [status, setStatus] = useState({ busy: false, msg: '' })
  // your own uploads show at once; the shared list is edge-cached and can lag ~30s behind
  const [mine, setMine] = useState([])

  useEffect(() => {
    if (!open) return
    let live = true
    const load = () =>
      document.visibilityState === 'visible' &&
      fetch('/api/photos')
        .then((r) => r.json())
        .then((b) => live && setPhotos(b.photos ?? []))
        .catch(() => {})
    load()
    // phones in pockets don't poll; coming back to the tab refreshes straight away
    const t = setInterval(load, 60_000)
    document.addEventListener('visibilitychange', load)
    return () => {
      live = false
      clearInterval(t)
      document.removeEventListener('visibilitychange', load)
    }
  }, [open])

  const shown = [...mine.filter((url) => !photos.some((p) => p.url === url)).map((url) => ({ url })), ...photos]

  async function pick(e) {
    const files = [...e.target.files].slice(0, 20)
    e.target.value = ''
    let done = 0
    for (const [i, f] of files.entries()) {
      setStatus({ busy: true, msg: `uploading ${i + 1} / ${files.length}…` })
      try {
        const url = await upload(f)
        setMine((m) => [url, ...m])
        done++
      } catch (err) {
        console.error(err)
      }
    }
    const failed = files.length - done
    setStatus({ busy: false, msg: failed ? `${done} in, ${failed} didn’t make it, try those again` : `${done} in the roll ✓` })
  }

  return (
    <div className="min-h-svh bg-ink px-4 pt-6 pb-20 text-white sm:px-8">
      <div className="flex justify-between font-mono text-[0.65rem] tracking-[0.2em] text-white/70 uppercase sm:text-xs">
        <a href="/" className="transition-colors hover:text-white">← back to the invite</a>
        <span>[ Studio 54 · LPM ]</span>
      </div>
      <div className="mx-auto mt-14 max-w-5xl text-center">
        <Kicker className="text-white/80">the night · camera roll</Kicker>
        <h1 data-text="PHOTOS" style={{ '--glitch-speed': '3.1s' }} className="mt-4 font-condensed text-[clamp(5rem,22vw,14rem)] leading-[0.85] uppercase glitch fringe">
          PHOTOS
        </h1>

        {!open ? (
          <p className="mt-8 font-marker text-2xl text-white/80">locked until the doors open · 11.13 · 19:00</p>
        ) : (
          <>
            <label
              className={`mt-6 inline-block -rotate-2 cursor-pointer bg-pink px-8 py-3 font-condensed text-3xl text-ink uppercase shadow-[6px_6px_0_var(--color-white)] transition-[rotate,box-shadow,translate] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-white hover:translate-x-1 hover:translate-y-1 hover:rotate-0 hover:shadow-[2px_2px_0_var(--color-white)] sm:text-4xl ${status.busy ? 'pointer-events-none opacity-60' : ''}`}
            >
              {status.busy ? 'uploading…' : 'drop your shots +'}
              <input type="file" accept="image/*" multiple disabled={status.busy} onChange={pick} className="sr-only" />
            </label>
            <p role="status" className="mt-4 h-5 font-mono text-sm tracking-wider text-white/70 uppercase">
              {status.msg}
            </p>

            <div className="mt-8 columns-2 gap-3 sm:columns-3">
              {shown.map((p) => (
                <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="mb-3 block break-inside-avoid">
                  <img src={thumb(p.url)} alt="a photo from the party" loading="lazy" className="w-full" />
                </a>
              ))}
            </div>
            {!shown.length && <p className="mt-4 font-marker text-2xl text-white/70">no shots yet. be the first.</p>}
          </>
        )}
      </div>
    </div>
  )
}
