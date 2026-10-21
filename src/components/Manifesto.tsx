import { useEffect } from 'react'
import { AXIOMS, SITE_URL } from '../data'
import { useCopy } from '../toast'
import type { Hit } from '../App'

export default function Manifesto({ hit }: { hit: Hit }) {
  const copy = useCopy()

  useEffect(() => {
    if (!hit) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(hit.id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }, [hit])

  return (
    <section id="manifesto"><div className="wrap">
      <h2>O Manifesto</h2>
      <p className="sub">Doze axiomas para quem já entregou tarefa com o PO digitando "e aí, subiu?" no Slack. Clique em "copiar link" e mande o axioma certo pro grupo certo.</p>
      <ol className="axioms">
        {AXIOMS.map(([title, note], i) => {
          const id = `a${i + 1}`
          return (
            <li key={id} id={id} className={hit?.id === id ? 'ax hit' : 'ax'}>
              <span className="n">§{String(i + 1).padStart(2, '0')}</span>
              <p>{title}<small>{note}</small></p>
              <button
                className="share"
                type="button"
                onClick={() => copy(`Axioma ${i + 1}: ${title} ${SITE_URL}/#${id}`, 'Link copiado. Manda no grupo.')}
              >copiar link</button>
            </li>
          )
        })}
      </ol>
    </div></section>
  )
}
