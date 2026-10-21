import { AXIOMS, BADGE_MD } from '../data'
import { Link, navigate, useTitle } from '../router'
import { isDeployMinute, nextFriday, useNow } from '../time'
import { useCopy } from '../toast'
import PageHead from '../components/PageHead'

const p = (n: number) => String(n).padStart(2, '0')

// Building heights (% of the hero) for the outlined skyline; the 5th one carries the crane
const SKYLINE = [34, 22, 52, 88, 40, 66, 28, 58, 36]

function Countdown() {
  const now = useNow()
  const deployNow = isDeployMinute(now)

  let clock = 'DEPLOY AGORA'
  let note = 'vai, vai, vai'
  if (!deployNow) {
    let s = Math.max(0, Math.floor((nextFriday(now).getTime() - now.getTime()) / 1000))
    const d = Math.floor(s / 86400); s %= 86400
    const h = Math.floor(s / 3600); s %= 3600
    const m = Math.floor(s / 60); s %= 60
    clock = `${p(d)}:${p(h)}:${p(m)}:${p(s)}`
    note = d > 2 ? 'd : h : m : s · ainda dá pra procrastinar' : 'd : h : m : s · começa a suar'
  }

  return (
    <div className="countdown" aria-live="off">
      <span className="label">Entrega oficial · sexta 17:59</span>
      <span className={deployNow ? 'clock now' : 'clock'}>{clock}</span>
      <span className="label">{note}</span>
    </div>
  )
}

const PAGES = [
  { to: '/manifesto', k: '13 axiomas', title: 'O Manifesto', text: 'Os princípios de quem sobe na sexta às 17:59 e dorme tranquilo.', art: [30, 55, 40, 80] },
  { to: '/tradutor', k: 'RH aprovado', title: 'Tradutor Corporativo', text: 'O que você pensa versus o que você manda no e-mail.', art: [70, 70, 35, 35] },
  { to: '/desculpas', k: 'Gerador', title: 'Desculpas pra Daily', text: 'Sorteie a desculpa certa pra cada ocasião. Produção caiu? Tem.', art: [25, 45, 65, 85] },
  { to: '/commit', k: 'Gerador', title: 'Mensagem de Commit', text: 'fix: agora vai. Com modo sexta, que já vem com --force.', art: [90, 20, 60, 40] },
  { to: '/bingo', k: 'Jogo', title: 'Bingo da Daily', text: 'Marque cada "dá pra ver rapidinho?" e grite bingo no meio da reunião.', art: [50, 50, 50, 50] },
  { to: '/certificado', k: 'Oficial', title: 'Certificado', text: 'Comprove que você entrega. No cuzinho, mas entrega. E poste no X.', art: [40, 75, 40, 100] },
]

// Same axiom for everyone on the same day
const dayIndex = () => {
  const d = new Date()
  return (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % AXIOMS.length
}

export default function Home() {
  useTitle()
  const copy = useCopy()
  const i = dayIndex()
  const [title, note] = AXIOMS[i]

  const randomAxiom = () => navigate(`/manifesto#a${1 + Math.floor(Math.random() * AXIOMS.length)}`)

  return (
    <>
      <header className="hero">
        <div className="skyline" aria-hidden="true">
          {SKYLINE.map((h, j) => <i key={j} className={j === 4 ? 'crane' : undefined} style={{ height: `${h}%` }} />)}
        </div>
        <div className="wrap">
          <div className="hero-top">
            <span className="label">Obra nº 001 · Metodologia No Cuzinho</span>
            <span className="label">v0.0.1-rc-final-agora-vai</span>
          </div>
          <div className="hero-center">
            <h1>cuzinho<span className="tld">.dev</span></h1>
            <p className="lede">A metodologia ágil brasileira pra entregar software no último segundo.</p>
            <div className="cota"><span>prazo · sexta 17:59</span></div>
          </div>
          <div className="hero-bottom">
            <Countdown />
            <div className="actions">
              <Link className="btn" to="/manifesto">Ler o manifesto</Link>
              <button className="btn ghost" type="button" onClick={randomAxiom}>Axioma aleatório</button>
            </div>
          </div>
        </div>
      </header>

      <section><div className="wrap">
        <div className="daily">
          <span className="label">Axioma do dia <span className="num">§{p(i + 1)}</span></span>
          <p>{title}<small>{note}</small></p>
          <Link className="share" to={`/manifesto#a${i + 1}`}>ver no manifesto</Link>
        </div>
      </div></section>

      <section className="dark"><div className="wrap">
        <PageHead n="01" label="Ferramentas" title="Tudo pra sobreviver" mute="até sexta." sub="Seis ferramentas testadas em produção. Nenhuma em homologação." />
        <div className="cards">
          {PAGES.map((pg, j) => (
            <Link key={pg.to} className="card" to={pg.to}>
              <div className="art" aria-hidden="true">{pg.art.map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</div>
              <div>
                <h3>{pg.title}</h3>
                <p>{pg.text}</p>
              </div>
              <div className="foot"><span>{pg.k}</span><span>{p(j + 1)} <span className="x">→</span></span></div>
            </Link>
          ))}
        </div>
      </div></section>

      <section><div className="wrap">
        <PageHead n="02" label="Badge" title="Placa da obra" mute="pro seu README." sub="Avise a comunidade que o seu repositório segue a metodologia." />
        <div className="badge-row">
          <div className="shield" aria-label="deploy: no cuzinho"><span>deploy</span><span>no cuzinho</span></div>
          <pre>{BADGE_MD}</pre>
          <button className="btn ghost" type="button" onClick={() => copy(BADGE_MD, 'Markdown copiado.')}>Copiar markdown</button>
        </div>
      </div></section>
    </>
  )
}
