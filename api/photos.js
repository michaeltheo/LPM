import { setTimeout as sleep } from 'node:timers/promises'
import { PHOTOS_OPEN } from '../src/countdown.js'
import { isAdmin } from './_lib/admin.js'
import { prisma } from './_lib/db.js'
import { parsePhoto } from './_lib/validate.js'

// GET: the gallery (staff with the password also get hidden ones) · POST: a guest adds a photo · PATCH: staff hide/unhide
export default async function handler(req, res) {
  // the public gallery is cached at the edge, so 100 phones polling cost ~1 function run per 30s, not 100
  const cached = req.method === 'GET' && !req.url.includes('all=1')
  res.setHeader('Cache-Control', cached ? 'public, max-age=0, s-maxage=30, stale-while-revalidate=60' : 'no-store')
  const pw = req.headers['x-admin-password']
  const admin = isAdmin(pw)
  if ((pw !== undefined || req.method === 'PATCH') && !admin) {
    await sleep(1500)
    return res.status(401).json({ error: 'wrong password' })
  }
  try {
    if (req.method === 'GET') {
      // admin reads ?all=1 so it never gets the cached public copy
      if (!cached && !admin) return res.status(401).json({ error: 'wrong password' })
      if (!admin && Date.now() < PHOTOS_OPEN) return res.status(200).json({ photos: [] })
      const photos = await prisma.photo.findMany({
        where: admin ? {} : { hidden: false },
        select: { id: true, url: true, hidden: admin },
        orderBy: { createdAt: 'desc' },
      })
      return res.status(200).json({ photos })
    }
    if (req.method === 'POST') {
      if (Date.now() < PHOTOS_OPEN) return res.status(403).json({ error: 'the camera roll opens when the party starts' })
      const { data, error } = parsePhoto(req.body, process.env.CLOUDINARY_CLOUD)
      if (error) return res.status(400).json({ error })
      await prisma.photo.upsert({ where: { url: data.url }, create: data, update: {} })
      return res.status(200).json({ ok: true })
    }
    if (req.method === 'PATCH') {
      const id = Number(req.body?.id)
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'which photo?' })
      await prisma.photo.update({ where: { id }, data: { hidden: req.body.hidden === true } })
      return res.status(200).json({ ok: true })
    }
    res.status(405).json({ error: 'method not allowed' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'the camera roll is jammed, try again' })
  }
}
