import { useEffect, useState, type FormEvent } from 'react'
import { useToast } from '../toast'
import { SITE_URL } from '../data'
import { renderCertificate } from '../certImage'
import { useTitle } from '../router'
import PageHead from '../components/PageHead'

const FILE_NAME = 'certificado-no-cuzinho.png'

function registry(text: string) {
  let hash = 0
  for (const c of text) hash = (hash * 31 + c.charCodeAt(0)) % 10000
  return 'MNC-' + String(hash).padStart(4, '0')
}

function download(blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = FILE_NAME
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function Certificado() {
  useTitle('Certificado')
  const toast = useToast()
  const [nome, setNome] = useState('Dev Sênior de Sexta')
  const [feito, setFeito] = useState('a migração do banco às 17:58')
  const [image, setImage] = useState<Blob | null>(null)

  const who = nome.trim() || 'Dev Anônimo'
  const what = feito.trim() || 'alguma coisa, no limite'
  const data = `emitido em ${new Date().toLocaleDateString('pt-BR')} às 17:59`
  const reg = `reg. ${registry(nome + feito)}`

  // Pre-render so the click handlers stay synchronous: share() and window.open() need the user gesture
  useEffect(() => {
    let cancelled = false
    setImage(null)
    const t = setTimeout(() => {
      renderCertificate({ nome: who, feito: what, data, reg })
        .then(b => { if (!cancelled) setImage(b) })
        .catch(() => {})
    }, 250)
    return () => { cancelled = true; clearTimeout(t) }
  }, [who, what, data, reg])

  const postText = `Peguei meu Certificado de Entrega No Cuzinho 🏆 Entreguei ${what}, com zero testes e cem por cento de fé. #NoCuzinho`

  const postOnX = (e: FormEvent) => {
    e.preventDefault()
    if (!image) { toast('Calma, o certificado tá sendo impresso. Tenta de novo.'); return }

    const file = new File([image], FILE_NAME, { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      navigator.share({ files: [file], text: `${postText} ${SITE_URL}` }).catch(() => {})
      return
    }

    const intent = new URL('https://x.com/intent/post')
    intent.searchParams.set('text', postText)
    intent.searchParams.set('url', SITE_URL)
    window.open(intent, '_blank', 'noopener')
    download(image)
    toast('Imagem baixada. Anexa no post e manda.')
  }

  const onDownload = () => {
    if (!image) { toast('Calma, o certificado tá sendo impresso. Tenta de novo.'); return }
    download(image)
    toast('Certificado baixado.')
  }

  return (
    <section className="dark"><div className="wrap">
      <PageHead
        n="07" label="Certificado" aside="Emissão imediata"
        title="Certificado oficial." mute="No cuzinho, mas entrega."
        sub="Preencha e poste no X pra todo mundo ver quem manda no deploy de sexta."
      />
      <div className="cert-grid">
        <form className="form" onSubmit={postOnX}>
          <div>
            <label htmlFor="nome">Seu nome</label>
            <input id="nome" maxLength={40} value={nome} onChange={e => setNome(e.target.value)} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="feito">O que você entregou</label>
            <input id="feito" maxLength={60} value={feito} onChange={e => setFeito(e.target.value)} />
          </div>
          <div className="actions">
            <button className="btn" type="submit">Postar no X</button>
            <button className="btn ghost" type="button" onClick={onDownload}>Baixar imagem</button>
          </div>
        </form>
        <div className="cert">
          <div className="stamp">APROVADO<br />SEM REVIEW</div>
          <div className="k">Instituto Brasileiro de Entregas No Limite</div>
          <h3>Certificado de Entrega No Cuzinho</h3>
          <div className="k">certificamos que</div>
          <div className="who">{who}</div>
          <p className="body">entregou <b>{what}</b>, com zero testes, zero documentação e cem por cento de fé, honrando os princípios da Metodologia No Cuzinho.</p>
          <div className="foot"><span>{data}</span><span>{reg}</span></div>
        </div>
      </div>
    </div></section>
  )
}
