import { timingSafeEqual } from 'node:crypto'

export const isAdmin = (pw) => {
  const want = Buffer.from(process.env.ADMIN_PASSWORD ?? '')
  const got = Buffer.from(String(pw ?? ''))
  // refuses everyone if the env password is missing or too short
  return want.length >= 8 && got.length === want.length && timingSafeEqual(got, want)
}
