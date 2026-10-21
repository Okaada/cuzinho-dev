import { DICT } from '../data'
import { useCopy } from '../toast'

export default function Translator() {
  const copy = useCopy()
  return (
    <section id="tradutor"><div className="wrap">
      <h2>Tradutor Corporativo</h2>
      <p className="sub">O que você pensa versus o que você manda no e-mail. Copie a versão do lado direito e mantenha o emprego.</p>
      <div className="dict-head" aria-hidden="true"><span>O que você pensa</span><span>O que você escreve</span></div>
      <ul className="dict">
        {DICT.map(([raw, corp]) => (
          <li key={raw} className="pair">
            <p className="raw">{raw}</p>
            <div className="corp">
              <p>{corp}</p>
              <button className="share" type="button" onClick={() => copy(corp, 'Copiado. Seu RH agradece.')}>copiar versão corporativa</button>
            </div>
          </li>
        ))}
      </ul>
    </div></section>
  )
}
