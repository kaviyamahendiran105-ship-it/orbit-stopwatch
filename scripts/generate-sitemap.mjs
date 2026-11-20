import { mkdir, writeFile } from 'node:fs/promises'

const siteUrl = (process.env.VITE_SITE_URL || 'https://your-domain.example').replace(/\/$/, '')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`

await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', sitemap)
if (!process.env.VITE_SITE_URL) console.warn('VITE_SITE_URL is not set; sitemap uses https://your-domain.example as a placeholder.')
