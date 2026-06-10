import { useState, useCallback, useMemo } from 'react'
import { getMatches, getTeams, getStadiums } from '../api'
import { usePolling } from '../hooks/usePolling'
import PageHeader from '../components/PageHeader'
import FixtureCard from '../components/FixtureCard'

function enrichMatches(games, teams, stadiums) {
  const teamsById = {}
  teams.forEach(t => { teamsById[t.id] = t })
  const stadiumsById = {}
  stadiums.forEach(s => { stadiumsById[s.id] = s })

  return games.map(m => ({
    ...m,
    homeTeam: teamsById[m.home_team_id],
    awayTeam: teamsById[m.away_team_id],
    stadium: stadiumsById[m.stadium_id],
  }))
}

function LiveScores() {
  const [filter, setFilter] = useState('All')

  const fetchData = useCallback(async () => {
    const [matchesRes, teamsRes, stadiumsRes] = await Promise.all([
      getMatches(), getTeams(), getStadiums(),
    ])
    return enrichMatches(
      matchesRes.data.games,
      teamsRes.data.teams,
      stadiumsRes.data.stadiums,
    )
  }, [])

  const isAnyLive = useCallback((matches) =>
    matches?.some(m => ['1H', '2H', 'HT', 'ET', 'PT'].includes(m.time_elapsed)),
  [])

  const { data: matches = [], loading, secondsAgo } = usePolling(fetchData, {
    interval: 60000,
    fastInterval: 30000,
    shouldFastPoll: isAnyLive,
  })

  const isLive = m => ['1H', '2H', 'HT', 'ET', 'PT'].includes(m.time_elapsed)
  const isFinished = m => m.finished === 'TRUE'
  const isUpcoming = m => m.time_elapsed === 'notstarted' && m.finished === 'FALSE'

  const filtered = matches.filter(m => {
    if (filter === 'Live') return isLive(m)
    if (filter === 'Finished') return isFinished(m)
    if (filter === 'Upcoming') return isUpcoming(m)
    return true
  })

  const grouped = useMemo(() => filtered.reduce((acc, m) => {
    const key = m.local_date.split(' ')[0]
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {}), [filtered])

  const formatDate = (dateStr) => {
    const [m, d, y] = dateStr.split(' ')[0].split('/')
    return new Date(`${y}-${m}-${d}`).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    })
  }

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

      <PageHeader
        title="Live Scores"
        tagline="every match. every goal. real time."
        extra={secondsAgo != null && (
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
            Updated {secondsAgo}s ago
          </p>
        )}
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Live', 'Upcoming', 'Finished'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-200 font-display ${
              filter === f
                ? 'bg-wc-gold text-wc-navy border-wc-gold'
                : 'border-white/15 text-white/40 hover:text-white hover:border-wc-gold/40'
            }`}
          >{f}</button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card-glass rounded-2xl animate-pulse h-64" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([dateKey, dayMatches]) => (
            <div key={dateKey}>
              <p className="text-wc-gold/50 text-[10px] font-black uppercase tracking-[0.3em] mb-4 font-display">
                {formatDate(dayMatches[0].local_date)}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {dayMatches.map(match => (
                  <FixtureCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-white/25 font-bold text-lg">No matches here.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default LiveScores
