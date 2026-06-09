import { useState } from 'react'

const players = [
  { flag: 'https://flagcdn.com/w80/pt.png', name: 'Cristiano Ronaldo', team: 'Portugal', goals: 6, assists: 2, shots: 18, passes: 142, dribbles: 9, minutes: 270 },
  { flag: 'https://flagcdn.com/w80/fr.png', name: 'Kylian Mbappé', team: 'France', goals: 5, assists: 3, shots: 15, passes: 198, dribbles: 14, minutes: 270 },
  { flag: 'https://flagcdn.com/w80/br.png', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 4, shots: 12, passes: 176, dribbles: 18, minutes: 260 },
  { flag: 'https://flagcdn.com/w80/ar.png', name: 'Lionel Messi', team: 'Argentina', goals: 4, assists: 2, shots: 11, passes: 312, dribbles: 8, minutes: 245 },
  { flag: 'https://flagcdn.com/w80/no.png', name: 'Erling Haaland', team: 'Norway', goals: 3, assists: 1, shots: 14, passes: 89, dribbles: 4, minutes: 270 },
  { flag: 'https://flagcdn.com/w80/gb-eng.png', name: 'Jude Bellingham', team: 'England', goals: 2, assists: 3, shots: 9, passes: 203, dribbles: 11, minutes: 270 },
]

const stats = [
  { key: 'goals', label: 'Goals', color: 'bg-green-400' },
  { key: 'assists', label: 'Assists', color: 'bg-green-400' },
  { key: 'shots', label: 'Shots', color: 'bg-green-400' },
  { key: 'dribbles', label: 'Dribbles', color: 'bg-green-400' },
  { key: 'passes', label: 'Passes', color: 'bg-green-400' },
  { key: 'minutes', label: 'Minutes', color: 'bg-green-400' },
]

function PlayerPicker({ selected, onSelect, label }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <p className="text-white/25 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200"
      >
        <img src={selected.flag} className="w-9 h-6 object-cover rounded" />
        <div className="flex-1 text-left">
          <p className="font-black text-lg uppercase tracking-tight leading-none">{selected.name}</p>
          <p className="text-white/30 text-xs mt-0.5">{selected.team}</p>
        </div>
        <span className={`text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/[0.12] rounded-2xl overflow-hidden z-50 shadow-2xl">
          {players.map(p => (
            <button
              key={p.name}
              onClick={() => { onSelect(p); setOpen(false) }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.07] transition-all duration-150 text-left border-b border-white/[0.05] last:border-0
                ${p.name === selected.name ? 'bg-green-400/10' : ''}`}
            >
              <img src={p.flag} className="w-7 h-[18px] object-cover rounded-sm" />
              <div>
                <p className="font-black text-sm">{p.name}</p>
                <p className="text-white/30 text-xs">{p.team}</p>
              </div>
              {p.name === selected.name && <span className="ml-auto text-green-400 text-xs font-black">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function H2H() {
  const [playerA, setPlayerA] = useState(players[0])
  const [playerB, setPlayerB] = useState(players[1])

  return (
    <div className="px-6 md:px-10 py-8 max-w-4xl mx-auto">

      <div className="flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">FIFA World Cup 2026</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Head to Head</h1>
        </div>
        <p className="text-white/20 text-sm font-medium hidden md:block">pick two. let the numbers talk.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <PlayerPicker selected={playerA} onSelect={setPlayerA} label="player one" />
        <PlayerPicker selected={playerB} onSelect={setPlayerB} label="player two" />
      </div>

      {/* vs banner */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <img src={playerA.flag} className="w-10 h-7 object-cover rounded" />
          <p className="font-black text-xl uppercase tracking-tight truncate">{playerA.name.split(' ').pop()}</p>
        </div>
        <span className="text-white/20 font-black text-sm uppercase tracking-widest shrink-0">vs</span>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <p className="font-black text-xl uppercase tracking-tight truncate">{playerB.name.split(' ').pop()}</p>
          <img src={playerB.flag} className="w-10 h-7 object-cover rounded" />
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
        {stats.map((stat, i) => {
          const a = playerA[stat.key]
          const b = playerB[stat.key]
          const max = Math.max(a, b) || 1
          const aWins = a > b
          const bWins = b > a
          return (
            <div key={stat.key} className={`px-6 py-4 ${i < stats.length-1 ? 'border-b border-white/[0.04]' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-black ${aWins ? 'text-green-400' : 'text-white/30'}`}>{a}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/25">{stat.label}</span>
                <span className={`text-2xl font-black ${bWins ? 'text-green-400' : 'text-white/30'}`}>{b}</span>
              </div>
              <div className="flex gap-1.5 h-1">
                <div className="flex-1 bg-white/[0.05] rounded-full overflow-hidden flex justify-end">
                  <div className="h-full bg-green-400 rounded-full transition-all duration-700" style={{ width: `${(a/max)*100}%` }} />
                </div>
                <div className="flex-1 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-green-400/40 rounded-full transition-all duration-700" style={{ width: `${(b/max)*100}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default H2H