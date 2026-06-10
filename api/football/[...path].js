const API_BASE = 'https://v3.football.api-sports.io'

export default async function handler(req, res) {
  const key = process.env.API_FOOTBALL_KEY || process.env.VITE_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'API_FOOTBALL_KEY not configured' })
  }

  const pathSegments = req.query.path || []
  const apiPath = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments
  const query = new URLSearchParams(req.query)
  query.delete('path')
  const qs = query.toString()
  const url = `${API_BASE}/${apiPath}${qs ? `?${qs}` : ''}`

  try {
    const response = await fetch(url, {
      headers: { 'x-apisports-key': key },
    })
    const data = await response.json()

    const cacheable = apiPath.includes('topscorers') || apiPath.includes('topassists')
    res.setHeader('Cache-Control', cacheable ? 's-maxage=60, stale-while-revalidate' : 's-maxage=300, stale-while-revalidate')
    res.status(response.status).json(data)
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach API-Football', message: err.message })
  }
}
