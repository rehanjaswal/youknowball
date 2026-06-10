import axios from 'axios'

// In production, both endpoints are available via Vercel:
// - /api/* routes to worldcup26.ir
// - /api/football/* routes to the serverless function (api/football/[...path].js)
// In dev, vite.config.js proxies both

const client = axios.create({ baseURL: '/api' })
const footballClient = axios.create({ baseURL: '/api/football' })

export const getMatches = () => client.get('/get/games')
export const getTeams = () => client.get('/get/teams')
export const getGroups = () => client.get('/get/groups')
export const getStadiums = () => client.get('/get/stadiums')

export const getTopScorers = () =>
  footballClient.get('/players/topscorers', { params: { league: 1, season: 2026 } })

export const getTopAssists = () =>
  footballClient.get('/players/topassists', { params: { league: 1, season: 2026 } })

export const getSquadPlayers = (teamId) =>
  footballClient.get('/players', { params: { league: 1, season: 2026, team: teamId } })

export const getPlayerStats = (playerId) =>
  footballClient.get('/players', { params: { id: playerId, season: 2026 } })

export const getFootballTeams = () =>
  footballClient.get('/teams', { params: { league: 1, season: 2026 } })
