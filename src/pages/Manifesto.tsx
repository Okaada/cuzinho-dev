import { useEffect, useState } from 'react'
import { REPO_URL } from '../data'
import { translations, useContent, useT } from '../i18n'
import { useCopy } from '../toast'
import { useLocation, useTitle } from '../router'
import { postOnX, siteUrl } from '../share'
import PageHead from '../components/PageHead'

// Wrapped in an object so picking the same axiom twice still re-triggers the scroll
type Hit = { id: string } | null

const fromHash = (hash: string): Hit => (/^#a\d+$/.test(hash) ? { id: hash.slice(1) } : null)

const T = translations(
  {
    title: 'O Manifesto',
    aside: '16 axiomas',
    head: 'O manifesto',
    mute: 'em dezesseis axiomas.',
    sub: 'Pra quem já entregou tarefa com o PO digitando "e aí, subiu?" no Slack. Copie o link e mande o axioma certo pro grupo certo.',
    random: 'Axioma aleatório',
    suggest: 'Sugerir axioma no GitHub',
    copyLink: 'copiar link',
    postOnX: 'postar no X',
    copied: 'Link copiado. Manda no grupo.',
    linkText: (n: number, title: string) => `Axioma ${n}: ${title}`,
    postText: (n: number, title: string) => `Axioma ${n} da Metodologia No Cuzinho: ${title}`,
  },
  {
    title: 'The Manifesto',
    aside: '16 axioms',
    head: 'The manifesto',
    mute: 'in sixteen axioms.',
    sub: 'For anyone who has shipped a ticket while the PO kept typing "so, is it live yet?" on Slack. Copy the link and drop the right axiom in the right channel.',
    random: 'Random axiom',
    suggest: 'Suggest an axiom on GitHub',
    copyLink: 'copy link',
    postOnX: 'post on X',
    copied: 'Link copied. Drop it in the channel.',
    linkText: (n: number, title: string) => `Axiom ${n}: ${title}`,
    postText: (n: number, title: string) => `Axiom ${n} of the No Cuzinho Methodology: ${title}`,
  },
)

export default function Manifesto() {
  const t = useT(T)
  const { AXIOMS } = useContent()
  useTitle(t.title)
  const copy = useCopy()
  const { hash } = useLocation()
  const [hit, setHit] = useState<Hit>(() => fromHash(hash))

  useEffect(() => setHit(fromHash(hash)), [hash])

  useEffect(() => {
    if (!hit) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(hit.id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }, [hit])

  const random = () => setHit({ id: 'a' + (1 + Math.floor(Math.random() * AXIOMS.length)) })

  return (
    <section><div className="wrap">
      <PageHead
        n="01" label="Manifesto" aside={t.aside}
        title={t.head} mute={t.mute}
        sub={t.sub}
      />
      <div className="actions" style={{ marginBottom: 32 }}>
        <button className="btn" type="button" onClick={random}>{t.random}</button>
        <a className="btn ghost" href={REPO_URL} target="_blank" rel="noopener">{t.suggest}</a>
      </div>
      <ol className="axioms">
        {AXIOMS.map(([title, note], i) => {
          const id = `a${i + 1}`
          return (
            <li key={id} id={id} className={hit?.id === id ? 'ax hit' : 'ax'}>
              <span className="n">§{String(i + 1).padStart(2, '0')}</span>
              <p>{title}<small>{note}</small></p>
              <span className="ax-actions">
                <button
                  className="share"
                  type="button"
                  onClick={() => copy(`${t.linkText(i + 1, title)} ${siteUrl(`/manifesto#${id}`)}`, t.copied)}
                >{t.copyLink}</button>
                <button className="share" type="button" onClick={() => postOnX(t.postText(i + 1, title), `/manifesto#${id}`)}>{t.postOnX}</button>
              </span>
            </li>
          )
        })}
      </ol>
    </div></section>
  )
}
