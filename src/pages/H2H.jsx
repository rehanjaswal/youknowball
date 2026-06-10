import { useState, useEffect, useCallback } from 'react'
import { getFootballTeams, getSquadPlayers, getPlayerStats } from '../api'
import PageHeader from '../components/PageHeader'

const STAT_DEFS = [
  { key: 'goals', label: 'Goals' },
  { key: 'assists', label: 'Assists' },
  { key: 'shots', label: 'Shots' },
  { key: 'dribbles', label: 'Dribbles' },
  { key: 'passes', label: 'Passes' },
  { key: 'minutes', label: 'Minutes' },
]

function extractStats(apiRes) {
  const stat = apiRes?.data?.response?.[0]?.statistics?.[0] ?? {}
  return {
    goals: stat.goals?.total ?? 0,
    assists: stat.goals?.assists ?? 0,
    shots: stat.shots?.total ?? 0,
    dribbles: stat.dribbles?.attempts ?? stat.dribbles?.success ?? 0,
    passes: stat.passes?.total ?? 0,
    minutes: stat.games?.minutes ?? 0,
  }
}

function parseSquad(res) {
  return (res?.data?.response ?? []).map(entry => ({
    id: entry.player?.id,
    name: entry.player?.name ?? 'Unknown',
    photo: entry.player?.photo,
    flag: entry.statistics?.[0]?.team?.logo,
    team: entry.statistics?.[0]?.team?.name ?? '',
  })).filter(p => p.id)
}

function PlayerPicker({ players, selected, onSelect, label }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <p className="text-wc-gold/50 text-[10px] font-black uppercase tracking-widest mb-2 font-display">{label}</p>
      <button
        onClick={() => setOpen(!open)}
        className="w-full card-glass rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200 hover:border-wc-gold/30"
      >
        {selected?.flag ? (
          <img src={selected.flag} alt="" className="w-10 h-10 object-contain rounded-full bg-white/5" />
        ) : (
          <div className="w-10 h-10 bg-white/10 rounded-full" />
        )}
        <div className="flex-1 text-left">
          <p className="font-black text-lg uppercase tracking-tight leading-none font-display">
            {selected?.name ?? 'Select player'}
          </p>
          <p className="text-white/30 text-xs mt-0.5">{selected?.team}</p>
        </div>
        <span className={`text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-wc-navy-card border border-wc-gold/15 rounded-2xl overflow-hidden z-50 shadow-2xl max-h-64 overflow-y-auto">
          {players.map(p => (
            <button
              key={p.id}
              onClick={() => { onSelect(p); setOpen(false) }}
              className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-wc-gold/10 transition-all duration-150 text-left border-b border-white/5 last:border-0
                ${p.id === selected?.id ? 'bg-wc-gold/10' : ''}`}
            >
              {p.flag && <img src={p.flag} alt="" className="w-7 h-7 object-contain rounded-full" />}
              <div>
                <p className="font-black text-sm font-display">{p.name}</p>
                <p className="text-white/30 text-xs">{p.team}</p>
              </div>
              {p.id === selected?.id && <span className="ml-auto text-wc-gold text-xs font-black">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function H2H() {
  const [players, setPlayers] = useState([])
  const [playerA, setPlayerA] = useState(null)
  const [playerB, setPlayerB] = useState(null)
  const [statsA, setStatsA] = useState(null)
  const [statsB, setStatsB] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiReady, setApiReady] = useState(false)

  const loadPlayers = useCallback(async () => {
    try {
      const teamsRes = await getFootballTeams()
      const teams = teamsRes?.data?.response ?? []
      if (teams.length === 0) {
        setApiReady(false)
        setLoading(false)
        return
      }

      const squadResults = await Promise.all(
        teams.slice(0, 12).map(t => getSquadPlayers(t.team.id).catch(() => null)),
      )

      const all = squadResults.flatMap(r => parseSquad(r))
      const unique = [...new Map(all.map(p => [p.id, p])).values()]

      if (unique.length >= 2) {
        setPlayers(unique)
        setPlayerA(unique[0])
        setPlayerB(unique[1])
        setApiReady(true)
      }
    } catch {
      setApiReady(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadPlayers() }, [loadPlayers])

  useEffect(() => {
    if (!playerA?.id) return
    getPlayerStats(playerA.id)
      .then(res => setStatsA(extractStats(res)))
      .catch(() => setStatsA({ goals: 0, assists: 0, shots: 0, dribbles: 0, passes: 0, minutes: 0 }))
  }, [playerA])

  useEffect(() => {
    if (!playerB?.id) return
    getPlayerStats(playerB.id)
      .then(res => setStatsB(extractStats(res)))
      .catch(() => setStatsB({ goals: 0, assists: 0, shots: 0, dribbles: 0, passes: 0, minutes: 0 }))
  }, [playerB])

  const a = statsA ?? {}
  const b = statsB ?? {}

  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto">

      <PageHeader
        title="Head to Head"
        tagline="pick two. let the numbers talk."
      />

      {loading && (
        <div className="card-glass rounded-2xl animate-pulse h-96" />
      )}

      {!loading && !apiReady && (
        <div className="card-glass rounded-2xl px-8 py-16 text-center">
          <p className="text-white/40 text-lg font-display">Full player stats unlock when the tournament kicks off</p>
          <p className="text-white/20 text-sm mt-2">Powered by API-Football — squads populate as matches begin</p>
        </div>
      )}

      {!loading && apiReady && playerA && playerB && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <PlayerPicker players={players} selected={playerA} onSelect={setPlayerA} label="player one" />
            <PlayerPicker players={players} selected={playerB} onSelect={setPlayerB} label="player two" />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {playerA.flag && <img src={playerA.flag} alt="" className="w-10 h-10 object-contain rounded-full" />}
              <p className="font-black text-xl uppercase tracking-tight font-display break-words">
                {playerA.name.split(' ').pop()}
              </p>
            </div>
            <span className="text-wc-gold/40 font-black text-sm uppercase tracking-widest shrink-0 font-display">vs</span>
            <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
              <p className="font-black text-xl uppercase tracking-tight font-display break-words text-right">
                {playerB.name.split(' ').pop()}
              </p>
              {playerB.flag && <img src={playerB.flag} alt="" className="w-10 h-10 object-contain rounded-full" />}
            </div>
          </div>

          <div className="card-glass rounded-2xl overflow-hidden">
            {STAT_DEFS.map((stat, i) => {
              const valA = a[stat.key] ?? 0
              const valB = b[stat.key] ?? 0
              const max = Math.max(valA, valB) || 1
              const aWins = valA > valB
              const bWins = valB > valA
              return (
                <div key={stat.key} className={`px-6 py-5 ${i < STAT_DEFS.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-3xl font-black font-display ${aWins ? 'text-gold-gradient' : 'text-white/25'}`}>
                      {valA}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/25 font-display">
                      {stat.label}
                    </span>
                    <span className={`text-3xl font-black font-display ${bWins ? 'text-gold-gradient' : 'text-white/25'}`}>
                      {valB}
                    </span>
                  </div>
                  <div className="flex gap-1.5 h-1.5">
                    <div className="flex-1 bg-white/5 rounded-full overflow-hidden flex justify-end">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(valA / max) * 100}%`,
                          background: aWins ? 'linear-gradient(90deg, #D4A017, #F5C842)' : 'rgba(232,185,35,0.3)',
                        }}
                      />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(valB / max) * 100}%`,
                          background: bWins ? 'linear-gradient(90deg, #D4A017, #F5C842)' : 'rgba(232,185,35,0.3)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default H2H
