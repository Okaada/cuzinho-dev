import { translations, useT } from '../i18n'
import { Link, useTitle } from '../router'

const T = translations(
  {
    label: 'Erro 404 · em produção',
    lede: 'Essa página foi pro ar na sexta às 17:59 e ninguém testou. Comportamento esperado.',
    back: 'Fazer rollback pra home',
  },
  {
    label: 'Error 404 · in production',
    lede: 'This page went live on Friday at 5:59 PM and nobody tested it. Expected behavior.',
    back: 'Roll back to home',
  },
)

export default function NotFound() {
  useTitle('404')
  const t = useT(T)
  return (
    <section><div className="wrap notfound">
      <span className="label"><span className="num">●</span> {t.label}</span>
      <h1>404</h1>
      <p className="lede">{t.lede}</p>
      <div className="actions">
        <Link className="btn" to="/">{t.back}</Link>
      </div>
    </div></section>
  )
}
