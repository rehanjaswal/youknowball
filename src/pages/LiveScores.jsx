import { useState, useEffect } from 'react'
import { getMatches } from '../api'

const stageLabel = {
  group: null,
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter-final',
  sf: 'Semi-final',
  third: '3rd Place',
  final: 'Final',
}

function LiveScores() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    getMatches()
      .then(res => {
        setMatches(res.data.games)
        setLoading(false)
      })
      .catch(() => {
        setError('failed to load matches.')
        setLoading(false)
      })
  }, [])

  const isLive = m => ['1H', '2H', 'HT', 'ET', 'PT'].includes(m.time_elapsed)
  const isFinished = m => m.finished === 'TRUE'
  const isUpcoming = m => m.time_elapsed === 'notstarted' && m.finished === 'FALSE'

  const filtered = matches.filter(m => {
    if (filter === 'Live') return isLive(m)
    if (filter === 'Finished') return isFinished(m)
    if (filter === 'Upcoming') return isUpcoming(m)
    return true
  })

  // group by date for "All" view, flat otherwise
  const grouped = filtered.reduce((acc, m) => {
    const dateKey = m.local_date.split(' ')[0]
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(m)
    return acc
  }, {})

  const formatDate = (dateStr) => {
    const [datePart] = dateStr.split(' ')
    const [month, day, year] = datePart.split('/')
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric'
    })
  }

  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Live<br />Scores
        </h1>
        <p className="text-white/30 text-xl font-medium">
          every match. every goal. real time.
        </p>
      </div>

      <div className="flex gap-3 mb-10">
        {['All', 'Live', 'Upcoming', 'Finished'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${
              filter === f
                ? 'bg-green-400 text-black border-green-400'
                : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 animate-pulse h-28" />
          ))}
        </div>
      )}

      {error && <p className="text-red-400 font-bold">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([dateKey, dayMatches]) => (
            <div key={dateKey}>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-4">
                {formatDate(dayMatches[0].local_date)}
              </p>
              <div className="flex flex-col gap-3">
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
                      className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {live && <div className="absolute inset-0 bg-green-400/[0.03] rounded-3xl pointer-events-none" />}

                      {stage && (
                        <p className="text-green-400/60 text-[10px] font-black uppercase tracking-widest mb-3">{stage}</p>
                      )}
                      {!stage && (
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-3">Group {match.group}</p>
                      )}

                      <div className="relative flex items-center justify-between gap-6">

                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-2xl font-black uppercase tracking-tight leading-tight">{homeLabel}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5 min-w-[120px]">
                          <span className="text-4xl font-black tracking-tighter">
                            {finished || live
                              ? `${match.home_score} — ${match.away_score}`
                              : '— —'
                            }
                          </span>
                          {live ? (
                            <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-widest">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              {match.time_elapsed}
                            </span>
                          ) : finished ? (
                            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">ft</span>
                          ) : (
                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{time}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 flex-1 justify-end">
                          <span className="text-2xl font-black uppercase tracking-tight leading-tight text-right">{awayLabel}</span>
                        </div>

                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-white/30 font-bold text-lg">no matches right now.</p>
          )}
        </div>
      )}

    </div>
  )
}

export default LiveScores