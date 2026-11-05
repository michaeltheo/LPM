import assert from 'node:assert/strict'
import test from 'node:test'
import { parseRsvp } from './validate.js'

test('cleans a valid rsvp', () => {
  const r = parseRsvp({ name: '  Lena   P ', phone: '+30 694-123 4567', plusOne: true, notes: ' ' })
  assert.deepEqual(r.data, { name: 'Lena P', phone: '+306941234567', plusOne: true, notes: null })
})

test('same number written differently maps to the same phone', () => {
  assert.equal(parseRsvp({ name: 'Al', phone: '694 123 4567' }).data.phone, parseRsvp({ name: 'Al', phone: '694-123-4567' }).data.phone)
})

test('plus one only when explicitly true', () => {
  assert.equal(parseRsvp({ name: 'Al', phone: '6941234567', plusOne: 'yes' }).data.plusOne, false)
})

test('rejects bad input', () => {
  assert.ok(parseRsvp(null).error)
  assert.ok(parseRsvp({ name: 'A', phone: '6941234567' }).error)
  assert.ok(parseRsvp({ name: 'Al', phone: '123' }).error)
  assert.ok(parseRsvp({ name: 'Al', phone: '6941234567', notes: 'x'.repeat(501) }).error)
})
