const horses = [
  {
    iso: 'ma', name: 'Morocco', flag: 'https://flagcdn.com/w80/ma.png',
    group: 'Group C', keyPlayer: 'Achraf Hakimi',
    reason: 'Knocked out Portugal in 2022. Built different defensively. Home continent energy carries into North American crowds.',
    stats: { fifaRank: 14, avgGoals: 1.8, cleanSheets: 4 }, danger: 85,
  },
  {
    iso: 'jp', name: 'Japan', flag: 'https://flagcdn.com/w80/jp.png',
    group: 'Group F', keyPlayer: 'Takefusa Kubo',
    reason: 'Took down Germany and Spain in Qatar. Tactically elite, incredibly fit, always underestimated. Dangerous.',
    stats: { fifaRank: 18, avgGoals: 1.6, cleanSheets: 3 }, danger: 78,
  },
  {
    iso: 'us', name: 'USA', flag: 'https://flagcdn.com/w80/us.png',
    group: 'Group D', keyPlayer: 'Christian Pulisic',
    reason: 'Host nation, young hungry squad, playing in front of 80k home crowds. Tournament football is different and they know it.',
    stats: { fifaRank: 13, avgGoals: 1.9, cleanSheets: 3 }, danger: 74,
  },
  {
    iso: 'sn', name: 'Senegal', flag: 'https://flagcdn.com/w80/sn.png',
    group: 'Group I', keyPlayer: 'Sadio Mané',
    reason: 'African champions. Physical, fast, direct. The kind of team that beats you before you realise what happened.',
    stats: { fifaRank: 20, avgGoals: 1.5, cleanSheets: 3 }, danger: 70,
  },
]

function DarkHorses() {
  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto">

      <div className="flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">FIFA World Cup 2026</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Dark Horses</h1>
        </div>
        <p className="text-white/20 text-sm font-medium hidden md:block">the teams nobody's talking about.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {horses.map(team => (
          <div
            key={team.name}
            className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300"
          >
            {/* card header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-4">
                <img src={team.flag} className="w-12 h-8 object-cover rounded" />
                <div>
                  <p className="text-2xl font-black uppercase tracking-tight leading-none">{team.name}</p>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-0.5">{team.group}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-green-400 leading-none">{team.danger}</p>
                <p className="text-white/25 text-[9px] font-black uppercase tracking-widest">/100</p>
              </div>
            </div>

            {/* danger bar */}
            <div className="px-6 pb-4">
              <div className="w-full bg-white/[0.05] rounded-full h-1 overflow-hidden">
                <div className="h-full bg-green-400 rounded-full transition-all duration-700" style={{ width: `${team.danger}%` }} />
              </div>
            </div>

            {/* reason */}
            <div className="px-6 pb-5">
              <p className="text-white/50 text-sm leading-relaxed">{team.reason}</p>
            </div>

            {/* footer stats */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.05] bg-white/[0.02]">
              <div className="flex gap-6">
                <div>
                  <p className="text-lg font-black leading-none">#{team.stats.fifaRank}</p>
                  <p className="text-white/25 text-[9px] font-black uppercase tracking-widest">FIFA rank</p>
                </div>
                <div>
                  <p className="text-lg font-black leading-none">{team.stats.avgGoals}</p>
                  <p className="text-white/25 text-[9px] font-black uppercase tracking-widest">avg goals</p>
                </div>
                <div>
                  <p className="text-lg font-black leading-none">{team.stats.cleanSheets}</p>
                  <p className="text-white/25 text-[9px] font-black uppercase tracking-widest">clean sheets</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/25 text-[9px] font-black uppercase tracking-widest mb-0.5">key player</p>
                <p className="text-sm font-black">{team.keyPlayer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DarkHorses