import { useCallback } from 'react'
import { getTopScorers, getTopAssists } from '../api'
import { usePolling } from '../hooks/usePolling'
import PageHeader from '../components/PageHeader'

const medals = ['🥇', '🥈', '🥉']

function parseLeaderboard(res) {
  const items = res?.data?.response ?? []
  return items.slice(0, 10).map(entry => {
    const stat = entry.statistics?.[0] ?? {}
    return {
      id: entry.player?.id,
      name: entry.player?.name ?? 'Unknown',
      photo: entry.player?.photo,
      flag: stat.team?.logo,
      team: stat.team?.name ?? '',
      goals: stat.goals?.total ?? 0,
      assists: stat.goals?.assists ?? 0,
    }
  })
}

function StatRow({ player, index, type, max }) {
  const value = type === 'goals' ? player.goals : player.assists
  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-wc-gold/5 transition-all duration-200 border-b border-white/5 last:border-0">
      <span className="w-6 text-center text-lg shrink-0">
        {index < 3 ? medals[index] : <span className="text-white/20 font-black text-xs">{index + 1}</span>}
      </span>
      {player.flag ? (
        <img src={player.flag} alt="" className="w-8 h-8 object-contain rounded-full shrink-0 bg-white/5" />
      ) : (
        <div className="w-8 h-8 bg-white/10 rounded-full shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-black text-sm font-display break-words">{player.name}</p>
        <p className="text-white/30 text-[10px] uppercase tracking-wider">{player.team}</p>
        <div className="h-1 rounded-full bg-white/5 mt-1.5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${max ? (value / max) * 100 : 0}%`,
              background: 'linear-gradient(90deg, #D4A017, #F5C842)',
            }}
          />
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-3xl font-black leading-none font-display text-gold-gradient">{value}</p>
        <p className="text-[8px] font-black uppercase tracking-widest text-white/25">{type}</p>
      </div>
    </div>
  )
}

function LeaderboardCard({ title, subtitle, icon, players, type, empty }) {
  const max = players[0]?.[type] || 1

  return (
    <div className="card-glass rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-wc-gold/10 bg-wc-navy-light/50 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="font-black uppercase tracking-tight text-lg font-display">{title}</p>
          <p className="text-white/30 text-xs">{subtitle}</p>
        </div>
      </div>
      {empty ? (
        <div className="px-5 py-12 text-center">
          <p className="text-white/30 text-sm">Waiting for tournament data…</p>
          <p className="text-white/15 text-xs mt-2">Updates live once goals are scored</p>
        </div>
      ) : (
        players.map((p, i) => (
          <StatRow key={p.id ?? p.name} player={p} index={i} type={type} max={max} />
        ))
      )}
    </div>
  )
}

function TopStats() {
  const fetchData = useCallback(async () => {
    const [scorersRes, assistsRes] = await Promise.all([
      getTopScorers().catch(() => ({ data: { response: [] } })),
      getTopAssists().catch(() => ({ data: { response: [] } })),
    ])
    return {
      scorers: parseLeaderboard(scorersRes),
      assisters: parseLeaderboard(assistsRes),
    }
  }, [])

  const { data, loading } = usePolling(fetchData, { interval: 300000 })

  const scorers = data?.scorers ?? []
  const assisters = data?.assisters ?? []
  const hasData = scorers.length > 0 || assisters.length > 0

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

      <PageHeader
        title="Top Stats"
        tagline="the numbers that matter."
      />

      <div className="mb-6 px-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-wc-gold/70 font-display">
          {hasData ? '⚡ Live from API-Football' : '⚡ Updates live once the tournament starts'}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map(i => (
            <div key={i} className="card-glass rounded-2xl animate-pulse h-96" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LeaderboardCard
            title="Golden Boot"
            subtitle="top scorers"
            icon="⚽"
            players={scorers}
            type="goals"
            empty={scorers.length === 0}
          />
          <LeaderboardCard
            title="Top Assisters"
            subtitle="most assists"
            icon="🎯"
            players={assisters}
            type="assists"
            empty={assisters.length === 0}
          />
        </div>
      )}
    </div>
  )
}

export default TopStats
