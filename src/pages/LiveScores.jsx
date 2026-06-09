import { useState, useEffect } from 'react'
import { getMatches } from '../api'

const stageLabel = {
  group: null, r32: 'Round of 32', r16: 'Round of 16',
  qf: 'Quarter-final', sf: 'Semi-final', third: '3rd Place', final: 'Final',
}

function LiveScores() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    getMatches()
      .then(res => { setMatches(res.data.games); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const isLive = m => ['1H','2H','HT','ET','PT'].includes(m.time_elapsed)
  const isFinished = m => m.finished === 'TRUE'
  const isUpcoming = m => m.time_elapsed === 'notstarted' && m.finished === 'FALSE'

  const filtered = matches.filter(m => {
    if (filter === 'Live') return isLive(m)
    if (filter === 'Finished') return isFinished(m)
    if (filter === 'Upcoming') return isUpcoming(m)
    return true
  })

  const grouped = filtered.reduce((acc, m) => {
    const key = m.local_date.split(' ')[0]
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  const formatDate = (dateStr) => {
    const [m, d, y] = dateStr.split(' ')[0].split('/')
    return new Date(`${y}-${m}-${d}`).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric'
    })
  }

  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto">

      {/* compact hero */}
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">FIFA World Cup 2026</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Live Scores</h1>
        </div>
        <p className="text-white/20 text-sm font-medium hidden md:block">every match. every goal. real time.</p>
      </div>

      {/* filters */}
      <div className="flex gap-2 mb-8">
        {['All','Live','Upcoming','Finished'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-200 ${
              filter === f
                ? 'bg-green-400 text-black border-green-400'
                : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
            }`}
          >{f}</button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col gap-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl animate-pulse h-20" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([dateKey, dayMatches]) => (
            <div key={dateKey}>
              <p className="text-white/25 text-[10px] font-black uppercase tracking-[0.25em] mb-3">
                {formatDate(dayMatches[0].local_date)}
              </p>
              <div className="flex flex-col gap-2">
                {dayMatches.map(match => {
                  const live = isLive(match)
                  const finished = isFinished(match)
                  const stage = stageLabel[match.type]
                  const homeLabel = match.home_team_name_en || match.home_team_label
                  const awayLabel = match.away_team_name_en || match.away_team_label
                  const time = match.local_date.split(' ')[1]

                  return (
                    <div
                      key={match.id}
                      className={`relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                        ${live
                          ? 'bg-green-400/[0.06] border-green-400/30 hover:border-green-400/60'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20'
                        }`}
                    >
                      <div className="flex items-center px-5 py-4 gap-4">

                        {/* stage/group badge */}
                        <div className="w-16 shrink-0 text-center">
                          {live ? (
                            <span className="flex flex-col items-center gap-1">
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-green-400 text-[10px] font-black uppercase">{match.time_elapsed}</span>
                            </span>
                          ) : finished ? (
                            <span className="text-white/25 text-[10px] font-black uppercase">FT</span>
                          ) : (
                            <span className="text-white/40 text-xs font-black">{time}</span>
                          )}
                        </div>

                        {/* home */}
                        <div className="flex-1 text-right">
                          <p className="text-base md:text-lg font-black uppercase tracking-tight">{homeLabel}</p>
                        </div>

                        {/* score */}
                        <div className="text-center w-20 shrink-0">
                          <p className={`text-2xl font-black tracking-tighter ${live ? 'text-green-400' : 'text-white'}`}>
                            {finished || live
                              ? `${match.home_score}–${match.away_score}`
                              : '–'}
                          </p>
                          <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mt-0.5">
                            {stage ?? `Group ${match.group}`}
                          </p>
                        </div>

                        {/* away */}
                        <div className="flex-1 text-left">
                          <p className="text-base md:text-lg font-black uppercase tracking-tight">{awayLabel}</p>
                        </div>

                        <div className="w-16 shrink-0" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-white/20 font-bold text-lg">no matches here.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default LiveScores