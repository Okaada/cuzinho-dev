import { Link, useTitle } from '../router'

export default function NotFound() {
  useTitle('404')
  return (
    <section><div className="wrap notfound">
      <span className="label"><span className="num">●</span> Erro 404 · em produção</span>
      <h1>404</h1>
      <p className="lede">Essa página foi pro ar na sexta às 17:59 e ninguém testou. Comportamento esperado.</p>
      <div className="actions">
        <Link className="btn" to="/">Fazer rollback pra home</Link>
      </div>
    </div></section>
  )
}
