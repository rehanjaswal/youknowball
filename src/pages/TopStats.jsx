const scorers = [
  { flag: 'https://flagcdn.com/w80/pt.png', name: 'Cristiano Ronaldo', team: 'Portugal', goals: 6, assists: 2 },
  { flag: 'https://flagcdn.com/w80/fr.png', name: 'Kylian Mbappé', team: 'France', goals: 5, assists: 3 },
  { flag: 'https://flagcdn.com/w80/br.png', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 4 },
  { flag: 'https://flagcdn.com/w80/ar.png', name: 'Lionel Messi', team: 'Argentina', goals: 4, assists: 2 },
  { flag: 'https://flagcdn.com/w80/no.png', name: 'Erling Haaland', team: 'Norway', goals: 3, assists: 1 },
  { flag: 'https://flagcdn.com/w80/de.png', name: 'Jamal Musiala', team: 'Germany', goals: 3, assists: 2 },
]

const assisters = [
  { flag: 'https://flagcdn.com/w80/br.png', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 4 },
  { flag: 'https://flagcdn.com/w80/fr.png', name: 'Kylian Mbappé', team: 'France', goals: 5, assists: 3 },
  { flag: 'https://flagcdn.com/w80/pt.png', name: 'Bruno Fernandes', team: 'Portugal', goals: 1, assists: 3 },
  { flag: 'https://flagcdn.com/w80/de.png', name: 'Jamal Musiala', team: 'Germany', goals: 2, assists: 2 },
  { flag: 'https://flagcdn.com/w80/ar.png', name: 'Lionel Messi', team: 'Argentina', goals: 4, assists: 2 },
  { flag: 'https://flagcdn.com/w80/es.png', name: 'Pedri', team: 'Spain', goals: 1, assists: 2 },
]

const medals = ['🥇','🥈','🥉']

function StatRow({ player, index, type }) {
  const value = type === 'goals' ? player.goals : player.assists
  const max = type === 'goals' ? scorers[0].goals : assisters[0].assists
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.04] transition-all duration-200 border-b border-white/[0.04] last:border-0">
      <span className="w-6 text-center text-lg shrink-0">
        {index < 3 ? medals[index] : <span className="text-white/20 font-black text-xs">{index+1}</span>}
      </span>
      <img src={player.flag} className="w-7 h-[18px] object-cover rounded-sm shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-black text-sm truncate">{player.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="h-1 rounded-full bg-white/[0.06] flex-1 overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${(value/max)*100}%` }} />
          </div>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-2xl font-black text-green-400 leading-none">{value}</p>
        <p className="text-[8px] font-black uppercase tracking-widest text-white/25">{type}</p>
      </div>
    </div>
  )
}

function TopStats() {
  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto">

      <div className="flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">FIFA World Cup 2026</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Top Stats</h1>
        </div>
        <p className="text-white/20 text-sm font-medium hidden md:block">the numbers that matter.</p>
      </div>

      <div className="mb-4 px-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400/60">
          ⚡ updates live once the tournament starts — jun 11
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-3">
            <span className="text-xl">⚽</span>
            <div>
              <p className="font-black uppercase tracking-tight text-base">Golden Boot</p>
              <p className="text-white/30 text-xs">top scorers</p>
            </div>
          </div>
          {scorers.map((p, i) => <StatRow key={p.name} player={p} index={i} type="goals" />)}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-3">
            <span className="text-xl">🎯</span>
            <div>
              <p className="font-black uppercase tracking-tight text-base">Top Assisters</p>
              <p className="text-white/30 text-xs">most assists</p>
            </div>
          </div>
          {assisters.map((p, i) => <StatRow key={p.name} player={p} index={i} type="assists" />)}
        </div>
      </div>
    </div>
  )
}

export default TopStats