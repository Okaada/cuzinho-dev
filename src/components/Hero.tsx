import { useEffect, useState } from 'react'

function nextFriday(now: Date) {
  const d = new Date(now)
  d.setHours(17, 59, 0, 0)
  let add = (5 - d.getDay() + 7) % 7
  if (add === 0 && now >= d) add = 7
  d.setDate(d.getDate() + add)
  return d
}

const p = (n: number) => String(n).padStart(2, '0')

function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function Countdown() {
  const now = useNow()
  const deployNow = now.getDay() === 5 && now.getHours() === 17 && now.getMinutes() === 59

  let clock = 'DEPLOY AGORA'
  let note = 'vai, vai, vai'
  if (!deployNow) {
    let s = Math.max(0, Math.floor((nextFriday(now).getTime() - now.getTime()) / 1000))
    const d = Math.floor(s / 86400); s %= 86400
    const h = Math.floor(s / 3600); s %= 3600
    const m = Math.floor(s / 60); s %= 60
    clock = `${p(d)}:${p(h)}:${p(m)}:${p(s)}`
    note = d > 2 ? 'dias : horas : min : seg (ainda dá pra procrastinar)' : 'dias : horas : min : seg (começa a suar)'
  }

  return (
    <div className="countdown" aria-live="off">
      <div className="lab">Tempo até o deploy oficial (sexta, 17:59)</div>
      <div className="clock" style={deployNow ? { color: 'var(--hot)' } : undefined}>{clock}</div>
      <div className="note">{note}</div>
    </div>
  )
}

export default function Hero({ onRandom }: { onRandom: () => void }) {
  return (
    <header className="hero"><div className="wrap">
      <div className="eyebrow">Metodologia No Cuzinho · MNC v0.0.1-rc-final-agora-vai</div>
      <h1>cuzinho<span className="tld">.dev</span></h1>
      <p className="lede">A metodologia ágil brasileira para entregar software no último segundo. Desde o primeiro commit.</p>

      <Countdown />

      <div className="actions">
        <a className="btn" href="#manifesto">Ler o manifesto</a>
        <button className="btn ghost" type="button" onClick={onRandom}>Axioma aleatório</button>
        <a className="btn ghost" href="#tradutor">Tradutor corporativo</a>
        <a className="btn ghost" href="#certificado">Pegar meu certificado</a>
      </div>
    </div></header>
  )
}
