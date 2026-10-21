import { useState, type FormEvent } from 'react'
import { useToast } from '../toast'

function registry(text: string) {
  let hash = 0
  for (const c of text) hash = (hash * 31 + c.charCodeAt(0)) % 10000
  return 'MNC-' + String(hash).padStart(4, '0')
}

export default function Certificate() {
  const toast = useToast()
  const [nome, setNome] = useState('Dev Sênior de Sexta')
  const [feito, setFeito] = useState('a migração do banco às 17:58')
  const hoje = new Date().toLocaleDateString('pt-BR')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    toast('Certificado emitido. Agora é print e LinkedIn.')
  }

  return (
    <section className="dark" id="certificado"><div className="wrap">
      <h2>Certificado Oficial</h2>
      <p className="sub">Comprove para o mercado que você entrega. No cuzinho, mas entrega. Preencha, tire um print e poste no LinkedIn com "Feliz em compartilhar".</p>
      <div className="cert-grid">
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="nome">Seu nome</label>
            <input id="nome" maxLength={40} value={nome} onChange={e => setNome(e.target.value)} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="feito">O que você entregou</label>
            <input id="feito" maxLength={60} value={feito} onChange={e => setFeito(e.target.value)} />
          </div>
          <button className="btn" type="submit">Emitir certificado</button>
        </form>
        <div className="cert">
          <div className="stamp">APROVADO<br />SEM REVIEW</div>
          <div className="k">Instituto Brasileiro de Entregas No Limite</div>
          <h3>Certificado de Entrega No Cuzinho</h3>
          <div className="k">certificamos que</div>
          <div className="who">{nome.trim() || 'Dev Anônimo'}</div>
          <p className="body">entregou <b>{feito.trim() || 'alguma coisa, no limite'}</b>, com zero testes, zero documentação e cem por cento de fé, honrando os princípios da Metodologia No Cuzinho.</p>
          <div className="foot"><span>emitido em {hoje} às 17:59</span><span>reg. {registry(nome + feito)}</span></div>
        </div>
      </div>
    </div></section>
  )
}
