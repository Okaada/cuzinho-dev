import { useState } from 'react'
import { COMPLIMENTS, COMPLIMENT_TAGS, type ComplimentTag } from '../data'
import { useTitle } from '../router'
import { pick, postOnX } from '../share'
import { useCopy } from '../toast'
import PageHead from '../components/PageHead'

export default function Elogios() {
  useTitle('Elogios Corporativos')
  const copy = useCopy()
  const [tag, setTag] = useState<ComplimentTag | null>(null)
  const pool = COMPLIMENTS.filter(([, , t]) => !tag || t === tag)
  const [compliment, setCompliment] = useState(() => pick(COMPLIMENTS))

  const next = (t = tag) => {
    const list = COMPLIMENTS.filter(([, , x]) => !t || x === t)
    setCompliment(prev => pick(list, prev))
  }

  const choose = (t: ComplimentTag | null) => {
    setTag(t)
    next(t)
  }

  const [setup, punch, complimentTag] = compliment
  const text = `${setup} ${punch}`
  const label = COMPLIMENT_TAGS.find(t => t.id === complimentTag)?.label

  return (
    <section><div className="wrap">
      <PageHead
        n="04" label="Elogios" aside={`${COMPLIMENTS.length} elogios`}
        title="Elogios corporativos," mute="com a sinceridade de sempre."
        sub="Pra quando o RH pede feedback positivo. Comece sorrindo e termine antes que a pessoa entenda."
      />

      <div className="chips" role="group" aria-label="Filtrar elogios">
        <button className="chip" type="button" aria-pressed={tag === null} onClick={() => choose(null)}>Todos</button>
        {COMPLIMENT_TAGS.map(t => (
          <button key={t.id} className="chip" type="button" aria-pressed={tag === t.id} onClick={() => choose(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="gen">
        <div className="gen-top"><span className="label"><span className="num">●</span> {label}</span><span className="label">{pool.length} no filtro</span></div>
        <div className="gen-body">
          <p className="quote" aria-live="polite">
            “{setup} <span key={setup} className="punch">{punch}</span>”
          </p>
          <div className="actions">
            <button className="btn" type="button" onClick={() => next()}>Outro elogio</button>
            <button className="btn ghost" type="button" onClick={() => copy(text, 'Copiado. Entregue com um sorriso sincero.')}>Copiar</button>
            <button className="btn ghost" type="button" onClick={() => postOnX(`Elogio do dia pro colega: "${text}"`, '/elogios')}>Postar no X</button>
          </div>
        </div>
      </div>
    </div></section>
  )
}
