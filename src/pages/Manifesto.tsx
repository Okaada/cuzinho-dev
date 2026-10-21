import { useEffect, useState } from 'react'
import { AXIOMS, SITE_URL } from '../data'
import { useCopy } from '../toast'
import { useLocation, useTitle } from '../router'
import { postOnX } from '../share'
import PageHead from '../components/PageHead'

// Wrapped in an object so picking the same axiom twice still re-triggers the scroll
type Hit = { id: string } | null

const fromHash = (hash: string): Hit => (/^#a\d+$/.test(hash) ? { id: hash.slice(1) } : null)

export default function Manifesto() {
  useTitle('O Manifesto')
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
        n="01" label="Manifesto" aside="16 axiomas"
        title="O manifesto" mute="em dezesseis axiomas."
        sub={<>Pra quem já entregou tarefa com o PO digitando "e aí, subiu?" no Slack. Copie o link e mande o axioma certo pro grupo certo.</>}
      />
      <div className="actions" style={{ marginBottom: 32 }}>
        <button className="btn" type="button" onClick={random}>Axioma aleatório</button>
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
                  onClick={() => copy(`Axioma ${i + 1}: ${title} ${SITE_URL}/manifesto#${id}`, 'Link copiado. Manda no grupo.')}
                >copiar link</button>
                <button className="share" type="button" onClick={() => postOnX(`Axioma ${i + 1} da Metodologia No Cuzinho: ${title}`, `/manifesto#${id}`)}>postar no X</button>
              </span>
            </li>
          )
        })}
      </ol>
    </div></section>
  )
}
