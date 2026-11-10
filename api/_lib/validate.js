// untrusted form input -> clean row, or an error message for the guest
export function parseRsvp(body) {
  const b = body && typeof body === 'object' ? body : {}
  const name = typeof b.name === 'string' ? b.name.trim().replace(/\s+/g, ' ') : ''
  const raw = typeof b.phone === 'string' ? b.phone.trim() : ''
  const phone = (raw.startsWith('+') ? '+' : '') + raw.replace(/\D/g, '')
  const notes = typeof b.notes === 'string' ? b.notes.trim() : ''

  if (name.length < 2 || name.length > 80) return { error: 'tell the doorman your name' }
  if (phone.replace('+', '').length < 8 || phone.length > 16) return { error: 'that phone number looks off' }
  if (notes.length > 500) return { error: 'keep the note under 500 characters' }

  return { data: { name, phone, plusOne: b.plusOne === true, notes: notes || null } }
}

// only images that landed in our own cloudinary account, so nobody can post links to anything else
export function parsePhoto(body, cloud) {
  const url = body && typeof body.url === 'string' ? body.url : ''
  const ok = !!cloud && url.length <= 300 && url.startsWith(`https://res.cloudinary.com/${cloud}/image/upload/`)
  return ok ? { data: { url } } : { error: 'that photo did not make it, try again' }
}
