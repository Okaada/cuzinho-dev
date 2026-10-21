import { useEffect, useState } from 'react'

export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval)
    return () => clearInterval(id)
  }, [interval])
  return now
}

export const isDeployMinute = (d: Date) => d.getDay() === 5 && d.getHours() === 17 && d.getMinutes() === 59

export function nextFriday(now: Date) {
  const d = new Date(now)
  d.setHours(17, 59, 0, 0)
  let add = (5 - d.getDay() + 7) % 7
  if (add === 0 && now >= d) add = 7
  d.setDate(d.getDate() + add)
  return d
}

// ?sexta forces the panic mode, handy to preview it on any day
const forced = typeof location !== 'undefined' && new URLSearchParams(location.search).has('sexta')

export function useDeployMinute() {
  const [on, setOn] = useState(() => forced || isDeployMinute(new Date()))
  useEffect(() => {
    if (forced) return
    const id = setInterval(() => setOn(isDeployMinute(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return on
}
