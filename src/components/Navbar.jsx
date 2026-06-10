import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Live' },
  { to: '/standings', label: 'Standings' },
  { to: '/stats', label: 'Stats' },
  { to: '/h2h', label: 'H2H' },
  { to: '/teams', label: 'Teams' },
  { to: '/darkhorses', label: 'Dark Horses' },
]

function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-wc-navy/80 backdrop-blur-xl border-b border-wc-gold/10">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/wc-trophy.png" alt="" className="w-8 h-8 object-contain opacity-90" />
          <span className="text-2xl font-black tracking-tight text-white font-display">
            you<span className="text-wc-gold">know</span>ball
          </span>
        </Link>

        {/* desktop */}
        <div className="hidden lg:flex gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 font-display ${
                location.pathname === link.to
                  ? 'text-wc-gold'
                  : 'text-white/45 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-wc-gold transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-wc-gold transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-wc-gold transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-wc-gold/10 bg-wc-navy/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest py-2 font-display ${
                location.pathname === link.to ? 'text-wc-gold' : 'text-white/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
