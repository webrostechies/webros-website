import Navbar from './Navbar'
import Footer from './Footer'

/** App shell: skip link, fixed navbar, main landmark, footer. */
export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-brand-500 px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  )
}
