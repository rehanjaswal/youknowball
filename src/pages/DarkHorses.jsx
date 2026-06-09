const horses = [
  {
    flag: '🇲🇦',
    name: 'Morocco',
    group: 'Group F',
    keyPlayer: 'Achraf Hakimi',
    reason: 'Knocked out Portugal in 2022. Built different defensively. Home continent energy carries into North American crowds.',
    stats: { fifaRank: 14, avgGoals: 1.8, cleanSheets: 4 },
    danger: 85,
  },
  {
    flag: '🇯🇵',
    name: 'Japan',
    group: 'Group C',
    keyPlayer: 'Takefusa Kubo',
    reason: 'Took down Germany and Spain in Qatar. Tactically elite, incredibly fit, and always underestimated. Dangerous.',
    stats: { fifaRank: 18, avgGoals: 1.6, cleanSheets: 3 },
    danger: 78,
  },
  {
    flag: '🇺🇸',
    name: 'USA',
    group: 'Group A',
    keyPlayer: 'Christian Pulisic',
    reason: 'Host nation, young hungry squad, playing in front of 80k home crowds. Tournament football is different and they know it.',
    stats: { fifaRank: 13, avgGoals: 1.9, cleanSheets: 3 },
    danger: 74,
  },
  {
    flag: '🇸🇳',
    name: 'Senegal',
    group: 'Group D',
    keyPlayer: 'Sadio Mané',
    reason: 'African champions. Physical, fast, direct. The kind of team that beats you before you realise what happened.',
    stats: { fifaRank: 20, avgGoals: 1.5, cleanSheets: 3 },
    danger: 70,
  },
]

function DangerBar({ value }) {
  return (
    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full rounded-full bg-green-400 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function DarkHorses() {
  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Dark<br />Horses
        </h1>
        <p className="text-white/30 text-xl font-medium">
          the teams nobody's talking about. they should be.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {horses.map((team) => (
          <div
            key={team.name}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 rounded-3xl p-8 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-8 mb-6">
              <div className="flex items-center gap-5">
                <span className="text-6xl">{team.flag}</span>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">{team.name}</h2>
                  <p className="text-white/30 text-sm font-bold uppercase tracking-widest mt-1">{team.group}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">danger rating</p>
                <p className="text-4xl font-black text-green-400">{team.danger}<span className="text-lg text-white/30">/100</span></p>
              </div>
            </div>

            <p className="text-white/60 text-base leading-relaxed mb-6">{team.reason}</p>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">threat level</span>
                <span className="text-xs font-bold text-green-400">{team.danger}%</span>
              </div>
              <DangerBar value={team.danger} />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-black">{team.stats.fifaRank}</p>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">FIFA rank</p>
                </div>
                <div>
                  <p className="text-2xl font-black">{team.stats.avgGoals}</p>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">avg goals</p>
                </div>
                <div>
                  <p className="text-2xl font-black">{team.stats.cleanSheets}</p>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">clean sheets</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">key player</p>
                <p className="text-base font-black">{team.keyPlayer}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default DarkHorses