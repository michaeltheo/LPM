import { prisma } from './_lib/db.js'
import { parseRsvp } from './_lib/validate.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' })
  const { data, error } = parseRsvp(req.body)
  if (error) return res.status(400).json({ error })
  try {
    await prisma.reservation.upsert({ where: { phone: data.phone }, create: data, update: data })
    res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'the list is jammed, try again' })
  }
}
