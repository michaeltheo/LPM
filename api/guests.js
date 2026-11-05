import { timingSafeEqual } from 'node:crypto'
import { setTimeout as sleep } from 'node:timers/promises'
import { prisma } from './_lib/db.js'

const ok = (pw) => {
  const want = Buffer.from(process.env.ADMIN_PASSWORD ?? '')
  const got = Buffer.from(String(pw ?? ''))
  // refuses everyone if the env password is missing or too short
  return want.length >= 8 && got.length === want.length && timingSafeEqual(got, want)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method not allowed' })
  res.setHeader('Cache-Control', 'no-store')
  if (!ok(req.headers['x-admin-password'])) {
    await sleep(1500)
    return res.status(401).json({ error: 'wrong password' })
  }
  try {
    const guests = await prisma.reservation.findMany({ orderBy: { updatedAt: 'desc' } })
    res.status(200).json({ guests })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'could not load the list' })
  }
}
