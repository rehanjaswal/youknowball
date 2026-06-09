import { useState } from 'react'

const players = [
  { flag: '🇵🇹', name: 'Cristiano Ronaldo', team: 'Portugal', goals: 6, assists: 2, shots: 18, passes: 142, dribbles: 9, minutes: 270 },
  { flag: '🇫🇷', name: 'Kylian Mbappé', team: 'France', goals: 5, assists: 3, shots: 15, passes: 198, dribbles: 14, minutes: 270 },
  { flag: '🇧🇷', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 4, shots: 12, passes: 176, dribbles: 18, minutes: 260 },
  { flag: '🇦🇷', name: 'Lionel Messi', team: 'Argentina', goals: 4, assists: 2, shots: 11, passes: 312, dribbles: 8, minutes: 245 },
  { flag: '🇳🇴', name: 'Erling Haaland', team: 'Norway', goals: 3, assists: 1, shots: 14, passes: 89, dribbles: 4, minutes: 270 },
]

const stats = [
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'shots', label: 'Shots' },
  { key: 'dribbles', label: 'Dribbles' },
  { key: 'passes', label: 'Passes' },
  { key: 'minutes', label: 'Minutes' },
]

function H2H() {
  const [playerA, setPlayerA] = useState(players[0])
  const [playerB, setPlayerB] = useState(players[1])

  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Head<br />to Head
        </h1>
        <p className="text-white/30 text-xl font-medium">
          pick two. let the numbers talk.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        {[{ selected: playerA, setter: setPlayerA }, { selected: playerB, setter: setPlayerB }].map((slot, si) => (
          <div key={si} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">
              {si === 0 ? 'player one' : 'player two'}
            </p>
            <select
              value={slot.selected.name}
              onChange={e => slot.setter(players.find(p => p.name === e.target.value))}
              className="w-full bg-transparent text-white font-black text-xl uppercase tracking-tight outline-none cursor-pointer"
            >
              {players.map(p => (
                <option key={p.name} value={p.name} className="bg-zinc-900 text-white">
                  {p.flag} {p.name}
                </option>
              ))}
            </select>
            <p className="text-white/30 text-sm mt-1">{slot.selected.team}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
        {stats.map((stat, i) => {
          const a = playerA[stat.key]
          const b = playerB[stat.key]
          const max = Math.max(a, b)
          const aWins = a > b
          const bWins = b > a

          return (
            <div key={stat.key} className={`px-8 py-6 ${i < stats.length - 1 ? 'border-b border-white/[0.05]' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-black ${aWins ? 'text-green-400' : 'text-white/40'}`}>{a}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</span>
                <span className={`text-2xl font-black ${bWins ? 'text-green-400' : 'text-white/40'}`}>{b}</span>
              </div>
              <div className="flex gap-2 h-1.5">
                <div className="flex-1 bg-white/[0.06] rounded-full overflow-hidden flex justify-end">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${(a / max) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400/50 rounded-full transition-all duration-500"
                    style={{ width: `${(b / max) * 100}%` }}
                  />
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