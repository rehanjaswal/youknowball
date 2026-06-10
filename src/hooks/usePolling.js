import { useEffect, useRef, useState, useCallback } from 'react'

export function usePolling(fetchFn, { interval = 60000, fastInterval = 30000, shouldFastPoll } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [error, setError] = useState(null)
  const dataRef = useRef(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchFn()
      setData(result)
      dataRef.current = result
      setLastUpdated(Date.now())
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [fetchFn])

  useEffect(() => {
    load()

    let timer
    const schedule = () => {
      const fast = shouldFastPoll?.(dataRef.current)
      const ms = fast ? fastInterval : interval
      timer = setTimeout(() => {
        if (!document.hidden) load()
        schedule()
      }, ms)
    }
    schedule()

    const onVisibility = () => {
      if (!document.hidden) load()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [load, interval, fastInterval, shouldFastPoll])

  const secondsAgo = lastUpdated
    ? Math.floor((Date.now() - lastUpdated) / 1000)
    : null

  return { data, loading, lastUpdated, secondsAgo, error, refresh: load }
}
