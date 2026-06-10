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

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-white/10">
      <span className="text-2xl font-black tracking-tight text-white">
        you<span className="text-green-400">know</span>ball
      </span>
      <div className="flex gap-8">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-200 ${location.pathname === link.to
              ? 'text-green-400'
              : 'text-white/50 hover:text-white'
              }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar