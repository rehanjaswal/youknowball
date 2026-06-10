import PageHeader from '../components/PageHeader'

const horses = [
  {
    iso: 'ma', name: 'Morocco', flag: 'https://flagcdn.com/w160/ma.png',
    group: 'Group C', keyPlayer: 'Achraf Hakimi',
    reason: 'Knocked out Portugal in 2022. Built different defensively. Home continent energy carries into North American crowds.',
    stats: { fifaRank: 14, avgGoals: 1.8, cleanSheets: 4 }, danger: 85,
    tint: 'from-red-900/20 via-green-900/10 to-transparent',
  },
  {
    iso: 'jp', name: 'Japan', flag: 'https://flagcdn.com/w160/jp.png',
    group: 'Group F', keyPlayer: 'Takefusa Kubo',
    reason: 'Took down Germany and Spain in Qatar. Tactically elite, incredibly fit, always underestimated. Dangerous.',
    stats: { fifaRank: 18, avgGoals: 1.6, cleanSheets: 3 }, danger: 78,
    tint: 'from-red-800/15 via-white/5 to-transparent',
  },
  {
    iso: 'us', name: 'USA', flag: 'https://flagcdn.com/w160/us.png',
    group: 'Group D', keyPlayer: 'Christian Pulisic',
    reason: 'Host nation, young hungry squad, playing in front of 80k home crowds. Tournament football is different and they know it.',
    stats: { fifaRank: 13, avgGoals: 1.9, cleanSheets: 3 }, danger: 74,
    tint: 'from-blue-900/20 via-red-900/10 to-transparent',
  },
  {
    iso: 'sn', name: 'Senegal', flag: 'https://flagcdn.com/w160/sn.png',
    group: 'Group I', keyPlayer: 'Sadio Mané',
    reason: 'African champions. Physical, fast, direct. The kind of team that beats you before you realise what happened.',
    stats: { fifaRank: 20, avgGoals: 1.5, cleanSheets: 3 }, danger: 70,
    tint: 'from-green-900/20 via-yellow-800/10 to-transparent',
  },
]

function DarkHorses() {
  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

      <PageHeader
        title="Dark Horses"
        tagline="the teams nobody's talking about."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {horses.map(team => (
          <div
            key={team.name}
            className="group relative rounded-3xl overflow-hidden min-h-[340px] card-glass transition-all duration-300 hover:shadow-2xl hover:shadow-wc-gold/10"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${team.tint} pointer-events-none`} />

            <div className="relative p-7 flex flex-col h-full">
              {/* header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                  <img
                    src={team.flag}
                    alt={team.name}
                    className="w-20 h-14 object-cover rounded-lg shadow-lg ring-2 ring-wc-gold/20"
                  />
                  <div>
                    <p className="text-4xl font-black uppercase tracking-tight leading-none font-display">
                      {team.name}
                    </p>
                    <p className="text-wc-gold/60 text-xs font-black uppercase tracking-[0.25em] mt-1.5 font-display">
                      {team.group}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-6xl font-black leading-none font-display text-gold-gradient">
                    {team.danger}
                  </p>
                  <p className="text-white/25 text-[9px] font-black uppercase tracking-widest">/100</p>
                </div>
              </div>

              {/* danger bar */}
              <div className="mb-6">
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${team.danger}%`,
                      background: 'linear-gradient(90deg, #D4A017, #F5C842)',
                    }}
                  />
                </div>
              </div>

              {/* reason */}
              <p className="text-white/55 text-base leading-relaxed flex-1 mb-6">
                {team.reason}
              </p>

              {/* footer */}
              <div className="flex items-end justify-between pt-5 border-t border-wc-gold/10">
                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-black leading-none font-display">#{team.stats.fifaRank}</p>
                    <p className="text-white/25 text-[9px] font-black uppercase tracking-widest mt-1">FIFA Rank</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black leading-none font-display">{team.stats.avgGoals}</p>
                    <p className="text-white/25 text-[9px] font-black uppercase tracking-widest mt-1">Avg Goals</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black leading-none font-display">{team.stats.cleanSheets}</p>
                    <p className="text-white/25 text-[9px] font-black uppercase tracking-widest mt-1">Clean Sheets</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-wc-gold/60 text-[9px] font-black uppercase tracking-widest mb-1">Key Player</p>
                  <p className="text-lg font-black font-display">{team.keyPlayer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DarkHorses
