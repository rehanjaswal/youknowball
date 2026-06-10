import { useState, useEffect } from 'react'
import { getTeams } from '../api'
import PageHeader from '../components/PageHeader'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTeams()
      .then(res => {
        const sorted = [...res.data.teams].sort((a, b) =>
          a.groups.localeCompare(b.groups) || a.name_en.localeCompare(b.name_en),
        )
        setTeams(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = teams.filter(t =>
    t.name_en.toLowerCase().includes(search.toLowerCase()),
  )

  const grouped = filtered.reduce((acc, team) => {
    const g = team.groups
    if (!acc[g]) acc[g] = []
    acc[g].push(team)
    return acc
  }, {})

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

      <PageHeader title="Teams" tagline="48 nations. one trophy." />

      <input
        type="text"
        placeholder="Search a team…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full card-glass rounded-2xl px-6 py-4 text-white placeholder-white/25 font-bold text-lg outline-none focus:border-wc-gold/40 transition-all duration-200 mb-10"
      />

      {loading && (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card-glass rounded-2xl animate-pulse h-20" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([group, groupTeams]) => (
            <div key={group}>
              <p className="text-wc-gold/50 text-[10px] font-black uppercase tracking-[0.3em] mb-4 font-display">
                Group {group}
              </p>
              <div className="card-glass rounded-2xl overflow-hidden">
                {groupTeams.map((team, i) => (
                  <div
                    key={team.id}
                    className={`flex items-center gap-5 px-6 py-5 hover:bg-wc-gold/5 transition-all duration-200 ${
                      i < groupTeams.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <img
                      src={team.flag}
                      alt={team.name_en}
                      className="w-12 h-8 object-cover rounded-lg shadow"
                    />
                    <div className="flex-1">
                      <p className="font-black text-lg font-display uppercase">{team.name_en}</p>
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{team.fifa_code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-white/30 font-bold text-lg">No team found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Teams
