const groups = [
  {
    name: 'Group A',
    teams: [
      { flag: '🇺🇸', name: 'USA', p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 2, pts: 7 },
      { flag: '🇲🇽', name: 'Mexico', p: 3, w: 1, d: 2, l: 0, gf: 3, ga: 2, pts: 5 },
      { flag: '🇨🇦', name: 'Canada', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, pts: 3 },
      { flag: '🇵🇱', name: 'Poland', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, pts: 1 },
    ]
  },
  {
    name: 'Group B',
    teams: [
      { flag: '🇵🇹', name: 'Portugal', p: 3, w: 3, d: 0, l: 0, gf: 8, ga: 1, pts: 9 },
      { flag: '🇪🇸', name: 'Spain', p: 3, w: 1, d: 1, l: 1, gf: 4, ga: 3, pts: 4 },
      { flag: '🇹🇷', name: 'Turkey', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 5, pts: 3 },
      { flag: '🇨🇿', name: 'Czech Rep.', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 6, pts: 1 },
    ]
  },
]

function Standings() {
  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Group<br />Standings
        </h1>
        <p className="text-white/30 text-xl font-medium">
          who's through. who's sweating.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {groups.map(group => (
          <div key={group.name} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">

            <div className="px-8 py-5 border-b border-white/[0.08] flex items-center justify-between">
              <span className="text-lg font-black uppercase tracking-widest">{group.name}</span>
              <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/30">
                <span className="w-6 text-center">P</span>
                <span className="w-6 text-center">W</span>
                <span className="w-6 text-center">D</span>
                <span className="w-6 text-center">L</span>
                <span className="w-8 text-center">GF</span>
                <span className="w-8 text-center">GA</span>
                <span className="w-8 text-center">GD</span>
                <span className="w-8 text-center text-white">PTS</span>
              </div>
            </div>

            {group.teams.map((team, i) => (
              <div
                key={team.name}
                className={`px-8 py-5 flex items-center justify-between hover:bg-white/[0.04] transition-all duration-200 ${i < group.teams.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className={`text-xs font-black w-5 ${i < 2 ? 'text-green-400' : 'text-white/20'}`}>{i + 1}</span>
                  <span className="text-2xl">{team.flag}</span>
                  <span className="font-bold text-base">{team.name}</span>
                  {i < 2 && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400/70 bg-green-400/10 px-2 py-0.5 rounded-full">
                      through
                    </span>
                  )}
                </div>
                <div className="flex gap-8 text-sm font-bold text-white/50">
                  <span className="w-6 text-center">{team.p}</span>
                  <span className="w-6 text-center">{team.w}</span>
                  <span className="w-6 text-center">{team.d}</span>
                  <span className="w-6 text-center">{team.l}</span>
                  <span className="w-8 text-center">{team.gf}</span>
                  <span className="w-8 text-center">{team.ga}</span>
                  <span className="w-8 text-center">{team.gf - team.ga}</span>
                  <span className="w-8 text-center text-white font-black text-base">{team.pts}</span>
                </div>
              </div>
            ))}

          </div>
        ))}
      </div>

    </div>
  )
}

export default Standings