import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
})

export const getMatches = () => client.get('/get/games')
export const getTeams = () => client.get('/get/teams')
export const getGroups = () => client.get('/get/groups')