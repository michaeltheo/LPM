import assert from 'node:assert/strict'
import test from 'node:test'
import { PARTY_START, RSVP_CLOSES, timeLeft } from './countdown.js'

test('party starts Friday 13 Nov 2026, 17:00 UTC', () => {
  const d = new Date(PARTY_START)
  assert.equal(d.getUTCDay(), 5)
  assert.equal(d.toISOString(), '2026-11-13T17:00:00.000Z')
})

test('splits the remaining time into units', () => {
  const ms = ((2 * 24 + 3) * 60 * 60 + 4 * 60 + 5) * 1000 + 999
  assert.deepEqual(timeLeft(PARTY_START - ms), { days: 2, hours: 3, minutes: 4, seconds: 5, done: false })
})

test('stops at zero once the party has started', () => {
  assert.deepEqual(timeLeft(PARTY_START + 1000), { days: 0, hours: 0, minutes: 0, seconds: 0, done: true })
})

test('rsvp closes at midnight after Nov 10, Thessaloniki time', () => {
  assert.equal(new Date(RSVP_CLOSES).toISOString(), '2026-11-10T22:00:00.000Z')
  assert.ok(RSVP_CLOSES < PARTY_START)
})
