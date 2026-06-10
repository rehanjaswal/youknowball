import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LiveScores from './pages/LiveScores'
import TopStats from './pages/TopStats'
import H2H from './pages/H2H'
import DarkHorses from './pages/DarkHorses'
import Standings from './pages/Standings'
import Teams from './pages/Teams'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-white bg-wc-gradient noise-overlay">
        <img
          src="/wc-trophy.png"
          alt=""
          aria-hidden
          className="fixed bottom-0 right-0 w-[min(420px,50vw)] opacity-[0.04] pointer-events-none select-none z-0"
        />
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<LiveScores />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/stats" element={<TopStats />} />
            <Route path="/h2h" element={<H2H />} />
            <Route path="/darkhorses" element={<DarkHorses />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
