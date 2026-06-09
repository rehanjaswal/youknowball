import { useState, useEffect } from 'react'
import { getGroups, getTeams } from '../api'

function Standings() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getGroups(), getTeams()])
      .then(([groupsRes, teamsRes]) => {
        const teamsById = {}
        teamsRes.data.teams.forEach(t => { teamsById[t.id] = t })

        const enriched = groupsRes.data.groups
          .map(group => ({
            ...group,
            teams: [...group.teams]
              .sort((a, b) => Number(b.pts) - Number(a.pts) || Number(b.gd) - Number(a.gd))
              .map(t => ({ ...t, info: teamsById[t.team_id] }))
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setGroups(enriched)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Group<br />Standings
        </h1>
        <p className="text-white/30 text-xl font-medium">
          who's through. who's sweating.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 animate-pulse h-48" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups.map(group => (
            <div key={group._id} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">

              <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-base font-black uppercase tracking-widest">Group {group.name}</span>
                <div className="flex gap-5 text-[10px] font-black uppercase tracking-widest text-white/25">
                  <span className="w-5 text-center">MP</span>
                  <span className="w-5 text-center">W</span>
                  <span className="w-5 text-center">D</span>
                  <span className="w-5 text-center">L</span>
                  <span className="w-5 text-center">GD</span>
                  <span className="w-6 text-center text-white/50">PTS</span>
                </div>
              </div>

              {group.teams.map((team, i) => (
                <div
                  key={team._id}
                  className={`px-6 py-4 flex items-center justify-between hover:bg-white/[0.04] transition-all duration-200 ${
                    i < group.teams.length - 1 ? 'border-b border-white/[0.05]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`text-xs font-black w-4 ${i < 2 ? 'text-green-400' : 'text-white/20'}`}>
                      {i + 1}
                    </span>
                    {team.info ? (
                      <img src={team.info.flag} className="w-8 h-5 object-cover rounded-sm" />
                    ) : (
                      <div className="w-8 h-5 bg-white/10 rounded-sm" />
                    )}
                    <div>
                      <p className="font-bold text-sm leading-tight">{team.info?.name_en ?? `Team ${team.team_id}`}</p>
                      {i < 2 && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-400/60">through</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-5 text-xs font-bold text-white/40">
                    <span className="w-5 text-center">{team.mp}</span>
                    <span className="w-5 text-center">{team.w}</span>
                    <span className="w-5 text-center">{team.d}</span>
                    <span className="w-5 text-center">{team.l}</span>
                    <span className="w-5 text-center">{team.gd}</span>
                    <span className="w-6 text-center text-white font-black text-sm">{team.pts}</span>
                  </div>
                </div>
              ))}

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Standings