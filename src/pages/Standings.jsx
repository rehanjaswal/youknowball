import { useCallback } from 'react'
import { getGroups, getTeams } from '../api'
import { usePolling } from '../hooks/usePolling'
import PageHeader from '../components/PageHeader'
import GroupStandingsCard from '../components/GroupStandingsCard'

async function fetchStandings() {
  const [groupsRes, teamsRes] = await Promise.all([getGroups(), getTeams()])
  const teamsById = {}
  teamsRes.data.teams.forEach(t => { teamsById[t.id] = t })

  return groupsRes.data.groups
    .map(group => ({
      ...group,
      teams: [...group.teams]
        .sort((a, b) => Number(b.pts) - Number(a.pts) || Number(b.gd) - Number(a.gd))
        .map(t => ({ ...t, info: teamsById[t.team_id] })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function Standings() {
  const fetchData = useCallback(fetchStandings, [])
  const { data, loading, secondsAgo } = usePolling(fetchData, {
    interval: 60000,
  })

  const groups = data ?? []

  return (
    <div className="px-6 md:px-10 py-8 max-w-[1600px] mx-auto">

      <PageHeader
        title="Group Standings"
        tagline="who's through. who's sweating."
        extra={secondsAgo != null && (
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
            Updated {secondsAgo}s ago
          </p>
        )}
      />

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl animate-pulse h-80 bg-wc-navy-card" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {groups.map(group => (
            <GroupStandingsCard key={group._id} group={group} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Standings
