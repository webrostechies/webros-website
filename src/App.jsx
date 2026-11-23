import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import PageWrapper from './components/layout/PageWrapper'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'

// Home ships in the main bundle for the fastest first paint; other routes are code-split.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Legacy .html URLs → new routes, so old links and search results keep working. */
const legacyRedirects = {
  '/index.html': '/',
  '/about.html': '/about',
  '/services.html': '/services',
  '/portfolio.html': '/portfolio',
  '/contact.html': '/contact',
  '/blog.html': '/',
  '/blog-details.html': '/',
  '/main.html': '/',
}

const page = (el) => <PageWrapper>{el}</PageWrapper>

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={page(<Home />)} />
            <Route path="/about" element={page(<About />)} />
            <Route path="/services" element={page(<Services />)} />
            <Route path="/portfolio" element={page(<Portfolio />)} />
            <Route path="/contact" element={page(<Contact />)} />
            {Object.entries(legacyRedirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={page(<NotFound />)} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
