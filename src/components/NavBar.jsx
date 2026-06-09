import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex gap-6 p-6 border-b border-white/10">
      <Link to="/">Live</Link>
      <Link to="/standings">Standings</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/h2h">H2H</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/darkhorses">Dark Horses</Link>
    </nav>
  )
}
export default Navbar