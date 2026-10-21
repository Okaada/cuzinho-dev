import { BADGE_MD } from '../data'
import { useCopy } from '../toast'

export default function Badge() {
  const copy = useCopy()
  return (
    <section id="badge"><div className="wrap">
      <h2>Badge pro README</h2>
      <p className="sub">Avise a comunidade que o seu repositório segue a metodologia.</p>
      <div className="badge-row">
        <div className="shield" aria-label="deploy: no cuzinho"><span>deploy</span><span>no cuzinho</span></div>
        <pre>{BADGE_MD}</pre>
        <div><button className="btn ghost" type="button" onClick={() => copy(BADGE_MD, 'Markdown copiado.')}>Copiar markdown</button></div>
      </div>
    </div></section>
  )
}
