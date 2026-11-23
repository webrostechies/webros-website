import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On navigation: scroll to the `#hash` target if present (e.g. /services#seo),
 * otherwise to the top of the page. Runs after the page transition mounts.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait for the incoming page to render before locating the anchor
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const timer = setInterval(() => {
        const el = document.getElementById(id)
        if (el || ++tries > 20) {
          clearInterval(timer)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
      return () => clearInterval(timer)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
