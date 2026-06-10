import LiveBadge from './LiveBadge'

const stageLabel = {
  group: null,
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter-final',
  sf: 'Semi-final',
  third: '3rd Place',
  final: 'Final',
}

function parseScorers(raw) {
  if (!raw || raw === 'null') return []
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return typeof raw === 'string' ? [raw] : []
  }
}

function StadiumIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-white/30" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8 2 4 3 4 6v12c0 3 4 4 8 4s8-1 8-4V6c0-3-4-4-8-4zm0 2c3.5 0 6 .5 6 1.5S15.5 7 12 7 6 6.5 6 5.5 8.5 4 12 4zm-6 5.5c1.5.8 4 1 6 1s4.5-.2 6-1V18c0 .5-2.5 1.5-6 1.5S6.5 18.5 6 18V9.5z" />
    </svg>
  )
}

function FixtureCard({ match }) {
  const live = ['1H', '2H', 'HT', 'ET', 'PT'].includes(match.time_elapsed)
  const finished = match.finished === 'TRUE'
  const stage = stageLabel[match.type]
  const home = match.homeTeam
  const away = match.awayTeam
  const stadium = match.stadium?.name_en ?? 'TBD'
  const [datePart, timePart] = match.local_date.split(' ')
  const homeScorers = parseScorers(match.home_scorers)
  const awayScorers = parseScorers(match.away_scorers)

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 card-glass
        ${live ? 'ring-1 ring-green-400/40 shadow-lg shadow-green-400/5' : 'hover:shadow-lg hover:shadow-wc-gold/5'}`}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 bg-wc-navy-light/80 border-b border-wc-gold/10">
        <span className="text-wc-gold text-sm font-black uppercase tracking-widest font-display">
          {stage ?? `Group ${match.group}`}
        </span>
        <div className="flex items-center gap-2">
          {live && <LiveBadge elapsed={match.time_elapsed} />}
          {finished && !live && (
            <span className="text-white/30 text-[10px] font-black uppercase tracking-widest font-display">FT</span>
          )}
          {match.matchday && (
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
              Matchday {match.matchday}
            </span>
          )}
        </div>
      </div>

      {/* matchup */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1 flex flex-col items-center gap-2">
            {home?.flag ? (
              <img src={home.flag} alt={home.name_en} className="w-16 h-11 object-cover rounded-lg shadow-md" />
            ) : (
              <div className="w-16 h-11 bg-white/10 rounded-lg" />
            )}
            <p className="text-base md:text-lg font-black uppercase tracking-tight text-center font-display leading-tight">
              {match.home_team_name_en || match.home_team_label}
            </p>
          </div>

          <span className="text-white/20 text-xs font-black uppercase tracking-widest shrink-0">VS</span>

          <div className="flex-1 flex flex-col items-center gap-2">
            {away?.flag ? (
              <img src={away.flag} alt={away.name_en} className="w-16 h-11 object-cover rounded-lg shadow-md" />
            ) : (
              <div className="w-16 h-11 bg-white/10 rounded-lg" />
            )}
            <p className="text-base md:text-lg font-black uppercase tracking-tight text-center font-display leading-tight">
              {match.away_team_name_en || match.away_team_label}
            </p>
          </div>
        </div>

        <div className="text-center">
          {finished || live ? (
            <p className="text-4xl md:text-5xl font-black tracking-tighter font-display text-gold-gradient">
              {match.home_score} – {match.away_score}
            </p>
          ) : (
            <p className="text-3xl font-black text-white/20 font-display">{timePart}</p>
          )}
          {(homeScorers.length > 0 || awayScorers.length > 0) && (
            <div className="mt-3 flex justify-center gap-6 text-[10px] text-white/40 font-medium">
              {homeScorers.length > 0 && (
                <span>{homeScorers.join(', ')}</span>
              )}
              {awayScorers.length > 0 && (
                <span>{awayScorers.join(', ')}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between px-5 py-3 bg-wc-navy/60 border-t border-white/5 text-[11px] text-white/35 font-medium">
        <span>{datePart} {timePart}</span>
        <span className="flex items-center gap-1.5 max-w-[55%] truncate">
          <StadiumIcon />
          <span className="truncate">{stadium}</span>
        </span>
      </div>
    </div>
  )
}

export default FixtureCard
