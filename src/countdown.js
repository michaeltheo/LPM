// Friday, Nov 13 2026, 7 pm in Thessaloniki (EET, UTC+2)
export const PARTY_START = Date.parse('2026-11-13T19:00:00+02:00')

export function timeLeft(now, target = PARTY_START) {
  const ms = Math.max(0, target - now)
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    minutes: Math.floor(ms / 6e4) % 60,
    seconds: Math.floor(ms / 1e3) % 60,
    done: ms === 0,
  }
}
