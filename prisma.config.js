import { defineConfig, env } from 'prisma/config'

// locally the url lives in .env; on vercel it's a project env var and there is no file
try {
  process.loadEnvFile()
} catch {
  // no .env file, env vars come from the host
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: { url: env('DATABASE_URL') },
})
