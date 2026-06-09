const scorers = [
  { flag: '🇵🇹', name: 'Cristiano Ronaldo', team: 'Portugal', goals: 6, assists: 2 },
  { flag: '🇫🇷', name: 'Kylian Mbappé', team: 'France', goals: 5, assists: 3 },
  { flag: '🇧🇷', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 4 },
  { flag: '🇦🇷', name: 'Lionel Messi', team: 'Argentina', goals: 4, assists: 2 },
  { flag: '🇳🇴', name: 'Erling Haaland', team: 'Norway', goals: 3, assists: 1 },
]

const assisters = [
  { flag: '🇧🇷', name: 'Vinicius Jr.', team: 'Brazil', goals: 4, assists: 4 },
  { flag: '🇫🇷', name: 'Kylian Mbappé', team: 'France', goals: 5, assists: 3 },
  { flag: '🇵🇹', name: 'Bruno Fernandes', team: 'Portugal', goals: 1, assists: 3 },
  { flag: '🇩🇪', name: 'Jamal Musiala', team: 'Germany', goals: 2, assists: 2 },
  { flag: '🇦🇷', name: 'Lionel Messi', team: 'Argentina', goals: 4, assists: 2 },
]

const medals = ['🥇', '🥈', '🥉']

function StatRow({ player, index, type }) {
  return (
    <div className="flex items-center gap-6 px-8 py-5 hover:bg-white/[0.04] transition-all duration-200 border-b border-white/[0.05] last:border-0">
      <span className="text-2xl w-8 text-center">
        {index < 3 ? medals[index] : <span className="text-white/20 font-black text-sm">{index + 1}</span>}
      </span>
      <span className="text-3xl">{player.flag}</span>
      <div className="flex-1">
        <p className="font-black text-lg">{player.name}</p>
        <p className="text-white/30 text-sm font-medium">{player.team}</p>
      </div>
      <div className="flex gap-6 text-right">
        <div>
          <p className="text-3xl font-black text-green-400">{type === 'goals' ? player.goals : player.assists}</p>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{type === 'goals' ? 'goals' : 'assists'}</p>
        </div>
      </div>
    </div>
  )
}

function TopStats() {
  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Top<br />Stats
        </h1>
        <p className="text-white/30 text-xl font-medium">
          the numbers that matter.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/[0.08]">
            <h2 className="text-2xl font-black uppercase tracking-tight">⚽ Golden Boot</h2>
            <p className="text-white/30 text-sm mt-1">top scorers</p>
          </div>
          {scorers.map((player, i) => (
            <StatRow key={player.name} player={player} index={i} type="goals" />
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/[0.08]">
            <h2 className="text-2xl font-black uppercase tracking-tight">🎯 Top Assisters</h2>
            <p className="text-white/30 text-sm mt-1">most assists</p>
          </div>
          {assisters.map((player, i) => (
            <StatRow key={player.name} player={player} index={i} type="assists" />
          ))}
        </div>

      </div>
    </div>
  )
}

export default TopStats