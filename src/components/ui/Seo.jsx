import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

function upsert(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
}

/**
 * Per-route SEO + Open Graph metadata. Updates the tags that ship in
 * index.html (so non-JS crawlers still get sensible defaults) instead of
 * duplicating them.
 */
export default function Seo({ title, description = siteConfig.description, image = siteConfig.ogImage, noindex = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — Custom Websites, UI/UX, Web Apps & SEO`
    // Site root including any sub-folder, e.g. https://webrostechies.github.io/webros-website
    const root = (siteConfig.url || `${window.location.origin}${import.meta.env.BASE_URL}`).replace(/\/$/, '')
    const url = `${root}${pathname}`
    const imageUrl = image.startsWith('http') ? image : `${root}${image}`

    document.title = fullTitle
    upsert('meta[name="description"]', { name: 'description', content: description })
    upsert('meta[name="robots"]', { name: 'robots', content: noindex ? 'noindex, follow' : 'index, follow' })
    upsert('link[rel="canonical"]', { rel: 'canonical', href: url })
    upsert('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsert('meta[property="og:description"]', { property: 'og:description', content: description })
    upsert('meta[property="og:url"]', { property: 'og:url', content: url })
    upsert('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    upsert('meta[property="og:locale"]', { property: 'og:locale', content: siteConfig.locale })
    upsert('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsert('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  }, [title, description, image, noindex, pathname])

  return null
}
