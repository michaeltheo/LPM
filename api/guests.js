import { setTimeout as sleep } from 'node:timers/promises'
import { isAdmin } from './_lib/admin.js'
import { prisma } from './_lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method not allowed' })
  res.setHeader('Cache-Control', 'no-store')
  if (!isAdmin(req.headers['x-admin-password'])) {
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
