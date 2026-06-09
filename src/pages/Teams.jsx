import { useState, useEffect } from 'react'
import { getTeams } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTeams()
      .then(res => {
        const sorted = [...res.data.teams].sort((a, b) =>
          a.groups.localeCompare(b.groups) || a.name_en.localeCompare(b.name_en)
        )
        setTeams(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = teams.filter(t =>
    t.name_en.toLowerCase().includes(search.toLowerCase())
  )

  // group by group letter
  const grouped = filtered.reduce((acc, team) => {
    const g = team.groups
    if (!acc[g]) acc[g] = []
    acc[g].push(team)
    return acc
  }, {})

  return (
    <div className="px-10 py-16 max-w-5xl mx-auto">

      <div className="mb-16">
        <p className="text-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          FIFA World Cup 2026
        </p>
        <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mb-5">
          Teams
        </h1>
        <p className="text-white/30 text-xl font-medium">
          48 nations. one trophy.
        </p>
      </div>

      <input
        type="text"
        placeholder="search a team..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-6 py-4 text-white placeholder-white/20 font-bold text-lg outline-none focus:border-green-400/50 transition-all duration-200 mb-12"
      />

      {loading && (
        <div className="grid grid-cols-1 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 animate-pulse h-20" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([group, groupTeams]) => (
            <div key={group}>
              <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] mb-4">
                Group {group}
              </p>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
                {groupTeams.map((team, i) => (
                  <div
                    key={team.id}
                    className={`flex items-center gap-5 px-8 py-5 hover:bg-white/[0.05] transition-all duration-200 ${
                      i < groupTeams.length - 1 ? 'border-b border-white/[0.05]' : ''
                    }`}
                  >
                    <img
                      src={team.flag}
                      alt={team.name_en}
                      className="w-10 h-7 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-black text-lg">{team.name_en}</p>
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{team.fifa_code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-white/30 font-bold text-lg">no team found.</p>
          )}
        </div>
      )}

    </div>
  )
}

export default Teams