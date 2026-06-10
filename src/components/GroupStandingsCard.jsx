const STAT_COLS = ['mp', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts']
const STAT_LABELS = ['MP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'PTS']

function ChartIcon() {
  return (
    <svg className="w-4 h-4 text-wc-gold/60" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11zm4-4h2v14h-2V7z" />
    </svg>
  )
}

function GroupStandingsCard({ group }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* navy header */}
      <div className="bg-wc-navy-card px-4 py-3 border-b border-wc-gold/15">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-black uppercase tracking-widest text-wc-gold font-display">
            Group {group.name}
          </span>
          <ChartIcon />
        </div>
        <div className="flex gap-1.5">
          {group.teams.map(team => (
            team.info?.flag ? (
              <div key={team.team_id} className="flex-1 bg-black/30 rounded-md p-1.5 flex flex-col items-center gap-1">
                <img src={team.info.flag} alt="" className="w-full h-5 object-cover rounded-sm" />
                <span className="text-[8px] font-black text-white/50 uppercase">
                  {team.info.fifa_code}
                </span>
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* light body */}
      <div className="bg-[#E8ECF4] text-wc-navy flex-1">
        {/* stat header */}
        <div className="flex items-center px-3 py-2 border-b border-wc-navy/10 text-[8px] font-black uppercase tracking-wider text-wc-navy/40">
          <div className="flex-1" />
          <div className="flex gap-0">
            {STAT_LABELS.map(label => (
              <span
                key={label}
                className={`w-6 text-center ${label === 'PTS' ? 'text-wc-gold-dim font-black' : ''}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {group.teams.map((team, i) => (
          <div
            key={team._id}
            className={`flex items-center px-3 py-2.5 border-b border-wc-navy/8 last:border-0
              ${i < 2 ? 'border-l-[3px] border-l-wc-gold' : ''}`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
              <span className={`text-sm font-black w-4 shrink-0 font-display ${i < 2 ? 'text-wc-gold-dim' : 'text-wc-navy/25'}`}>
                {i + 1}
              </span>
              {team.info?.flag ? (
                <img src={team.info.flag} alt="" className="w-6 h-4 object-cover rounded-sm shrink-0" />
              ) : (
                <div className="w-6 h-4 bg-wc-navy/10 rounded-sm shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-black text-xs uppercase leading-tight break-words text-wc-navy font-display">
                  {team.info?.name_en ?? `Team ${team.team_id}`}
                </p>
                {i < 2 && (
                  <p className="text-[7px] font-black uppercase tracking-widest text-wc-gold-dim mt-0.5">
                    Through
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-0 shrink-0">
              {STAT_COLS.map(col => (
                <span
                  key={col}
                  className={`w-6 text-center text-xs font-bold tabular-nums
                    ${col === 'pts' ? 'text-wc-navy font-black text-sm' : 'text-wc-navy/50'}`}
                >
                  {team[col]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* navy footer */}
      <div className="bg-wc-navy-card py-2 flex justify-center border-t border-wc-gold/10">
        <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    </div>
  )
}

export default GroupStandingsCard
