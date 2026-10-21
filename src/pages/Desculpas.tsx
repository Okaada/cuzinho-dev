import { useState } from 'react'
import { EXCUSES, EXCUSE_TAGS, type ExcuseTag } from '../data'
import { useTitle } from '../router'
import { pick, postOnX } from '../share'
import { useCopy } from '../toast'
import PageHead from '../components/PageHead'

export default function Desculpas() {
  useTitle('Desculpas pra Daily')
  const copy = useCopy()
  const [tag, setTag] = useState<ExcuseTag | null>(null)
  const pool = EXCUSES.filter(([, t]) => !tag || t === tag)
  const [excuse, setExcuse] = useState(() => pick(EXCUSES))

  const next = (t = tag) => {
    const list = EXCUSES.filter(([, x]) => !t || x === t)
    setExcuse(prev => pick(list, prev))
  }

  const choose = (t: ExcuseTag | null) => {
    setTag(t)
    next(t)
  }

  const [text, excuseTag] = excuse
  const label = EXCUSE_TAGS.find(t => t.id === excuseTag)?.label

  return (
    <section><div className="wrap">
      <PageHead
        n="03" label="Desculpas" aside={`${EXCUSES.length} desculpas`}
        title="Desculpas pra daily," mute="testadas em produção."
        sub="Sorteie, copie e leia com convicção na próxima reunião."
      />

      <div className="chips" role="group" aria-label="Filtrar desculpas">
        <button className="chip" type="button" aria-pressed={tag === null} onClick={() => choose(null)}>Todas</button>
        {EXCUSE_TAGS.map(t => (
          <button key={t.id} className="chip" type="button" aria-pressed={tag === t.id} onClick={() => choose(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="gen">
        <div className="gen-top"><span className="label"><span className="num">●</span> {label}</span><span className="label">{pool.length} no filtro</span></div>
        <div className="gen-body">
          <p className="quote" aria-live="polite">“{text}”</p>
          <div className="actions">
            <button className="btn" type="button" onClick={() => next()}>Outra desculpa</button>
            <button className="btn ghost" type="button" onClick={() => copy(text, 'Copiado. Agora é só ler com cara séria.')}>Copiar</button>
            <button className="btn ghost" type="button" onClick={() => postOnX(`Minha desculpa pra daily de hoje: "${text}"`, '/desculpas')}>Postar no X</button>
          </div>
        </div>
      </div>
    </div></section>
  )
}
