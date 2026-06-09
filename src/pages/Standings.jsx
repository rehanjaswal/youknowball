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
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">

      <div className="flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">FIFA World Cup 2026</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Group Standings</h1>
        </div>
        <p className="text-white/20 text-sm font-medium hidden md:block">who's through. who's sweating.</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl animate-pulse h-52" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groups.map(group => (
            <div key={group._id} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300">

              <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                <span className="text-sm font-black uppercase tracking-widest text-green-400">Group {group.name}</span>
                <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-white/20">
                  <span>MP</span><span>W</span><span>D</span><span>L</span><span>GD</span><span className="text-white/40">PTS</span>
                </div>
              </div>

              {group.teams.map((team, i) => (
                <div
                  key={team._id}
                  className={`flex items-center px-5 py-3.5 transition-all duration-200 hover:bg-white/[0.04]
                    ${i < group.teams.length - 1 ? 'border-b border-white/[0.04]' : ''}
                    ${i < 2 ? 'bg-green-400/[0.02]' : ''}
                  `}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`text-xs font-black w-3 shrink-0 ${i < 2 ? 'text-green-400' : 'text-white/15'}`}>{i+1}</span>
                    {team.info
                      ? <img src={team.info.flag} className="w-7 h-[18px] object-cover rounded-sm shrink-0" />
                      : <div className="w-7 h-[18px] bg-white/10 rounded-sm shrink-0" />
                    }
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{team.info?.name_en ?? `Team ${team.team_id}`}</p>
                      {i < 2 && <p className="text-[8px] font-black uppercase tracking-widest text-green-400/50">through</p>}
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-white/30 shrink-0">
                    <span className="w-4 text-center">{team.mp}</span>
                    <span className="w-4 text-center">{team.w}</span>
                    <span className="w-4 text-center">{team.d}</span>
                    <span className="w-4 text-center">{team.l}</span>
                    <span className="w-4 text-center">{team.gd}</span>
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