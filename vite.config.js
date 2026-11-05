import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// dev only: serve api/*.js like vercel does, so `pnpm dev` works without `vercel dev`
function vercelApi() {
  return {
    name: 'vercel-api',
    configureServer(server) {
      try {
        process.loadEnvFile()
      } catch {
        // no .env file, env vars come from the shell
      }
      server.middlewares.use('/api', async (req, res, next) => {
        const route = req.url.split('?')[0].replace(/^\/|\/$/g, '')
        if (!/^[a-z-]+$/.test(route)) return next()
        let handler
        try {
          handler = (await server.ssrLoadModule(`/api/${route}.js`)).default
        } catch {
          return next()
        }
        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = raw ? JSON.parse(raw) : undefined
        } catch {
          req.body = raw
        }
        res.status = (code) => ((res.statusCode = code), res)
        res.json = (body) => (res.setHeader('Content-Type', 'application/json'), res.end(JSON.stringify(body)))
        try {
          await handler(req, res)
        } catch (e) {
          server.config.logger.error(e.stack ?? String(e))
          if (!res.headersSent) res.status(500).json({ error: 'server error' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vercelApi()],
})
