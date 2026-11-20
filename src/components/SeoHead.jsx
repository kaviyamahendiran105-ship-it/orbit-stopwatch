import { useEffect } from 'react'

const title = 'Stopwatch'
const description = 'A cinematic precision stopwatch with Orbit timing, flip-style readouts, laps, history, sound, and focus mode.'

function upsertMeta(attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function SeoHead() {
  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)

    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
    if (!siteUrl) return

    const canonical = `${siteUrl}/`
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', `${siteUrl}/brand-header.png`)
    upsertMeta('name', 'twitter:image', `${siteUrl}/brand-header.png`)
  }, [])

  return null
}

export { description, title }
export default SeoHead
