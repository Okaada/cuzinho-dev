import { DICT } from '../data'
import { useCopy } from '../toast'
import { useTitle } from '../router'
import PageHead from '../components/PageHead'

export default function Tradutor() {
  useTitle('Tradutor Corporativo')
  const copy = useCopy()
  return (
    <section><div className="wrap">
      <PageHead
        n="02" label="Tradutor" aside="RH aprovado"
        title="O que você pensa," mute="o que você manda no e-mail."
        sub="Copie a versão da direita e mantenha o emprego."
      />
      <div className="dict-head label" aria-hidden="true"><span>O que você pensa</span><span>O que você escreve</span></div>
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
