import { useState } from 'react'
import type { ExcuseTag } from '../data'
import { translations, useContent, useT } from '../i18n'
import { useTitle } from '../router'
import { pick, postOnX } from '../share'
import { useCopy } from '../toast'
import PageHead from '../components/PageHead'

const T = translations(
  {
    title: 'Desculpas pra Daily',
    label: 'Desculpas',
    aside: (n: number) => `${n} desculpas`,
    head: 'Desculpas pra daily,',
    mute: 'testadas em produção.',
    sub: 'Sorteie, copie e leia com convicção na próxima reunião.',
    filter: 'Filtrar desculpas',
    all: 'Todas',
    inFilter: (n: number) => `${n} no filtro`,
    another: 'Outra desculpa',
    copy: 'Copiar',
    postOnX: 'Postar no X',
    copied: 'Copiado. Agora é só ler com cara séria.',
    postText: (text: string) => `Minha desculpa pra daily de hoje: "${text}"`,
  },
  {
    title: 'Standup Excuses',
    label: 'Excuses',
    aside: (n: number) => `${n} excuses`,
    head: 'Excuses for standup,',
    mute: 'tested in production.',
    sub: 'Draw one, copy it and read it with conviction at the next meeting.',
    filter: 'Filter excuses',
    all: 'All',
    inFilter: (n: number) => `${n} in filter`,
    another: 'Another excuse',
    copy: 'Copy',
    postOnX: 'Post on X',
    copied: 'Copied. Now read it with a straight face.',
    postText: (text: string) => `My excuse for today’s standup: “${text}”`,
  },
)

export default function Desculpas() {
  const t = useT(T)
  const { EXCUSES, EXCUSE_TAGS } = useContent()
  useTitle(t.title)
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
        n="03" label={t.label} aside={t.aside(EXCUSES.length)}
        title={t.head} mute={t.mute}
        sub={t.sub}
      />

      <div className="chips" role="group" aria-label={t.filter}>
        <button className="chip" type="button" aria-pressed={tag === null} onClick={() => choose(null)}>{t.all}</button>
        {EXCUSE_TAGS.map(x => (
          <button key={x.id} className="chip" type="button" aria-pressed={tag === x.id} onClick={() => choose(x.id)}>{x.label}</button>
        ))}
      </div>

      <div className="gen">
        <div className="gen-top"><span className="label"><span className="num">●</span> {label}</span><span className="label">{t.inFilter(pool.length)}</span></div>
        <div className="gen-body">
          <p className="quote" aria-live="polite">“{text}”</p>
          <div className="actions">
            <button className="btn" type="button" onClick={() => next()}>{t.another}</button>
            <button className="btn ghost" type="button" onClick={() => copy(text, t.copied)}>{t.copy}</button>
            <button className="btn ghost" type="button" onClick={() => postOnX(t.postText(text), '/desculpas')}>{t.postOnX}</button>
          </div>
        </div>
      </div>
    </div></section>
  )
}
