import { useState } from 'react'
import { COMMITS } from '../data'
import { useTitle } from '../router'
import { pick, postOnX } from '../share'
import { useCopy } from '../toast'
import PageHead from '../components/PageHead'

export default function Commit() {
  useTitle('Mensagem de Commit')
  const copy = useCopy()
  const [msg, setMsg] = useState(() => pick(COMMITS))
  const [friday, setFriday] = useState(false)

  const cmd = friday
    ? `git add -A && git commit --no-verify -m "${msg}" && git push --force origin main`
    : `git commit -m "${msg}"`

  return (
    <section><div className="wrap">
      <PageHead
        n="04" label="Commit" aside={`${COMMITS.length} mensagens`}
        title="Mensagem de commit" mute="pra quem não sabe o que mudou."
        sub="Mas precisa commitar antes das 18h."
      />

      <div className="gen">
        <div className="gen-top"><span className="label"><span className="num">●</span> Mensagem sugerida</span><span className="label">{friday ? 'modo sexta' : 'modo normal'}</span></div>
        <div className="gen-body">
          <p className="quote" aria-live="polite">{msg}</p>
          <pre className="term"><span className="p" aria-hidden="true">$ </span>{cmd}</pre>
          <label className="check">
            <input type="checkbox" checked={friday} onChange={e => setFriday(e.target.checked)} />
            Modo sexta (pula os hooks e força o push na main)
          </label>
          <div className="actions">
            <button className="btn" type="button" onClick={() => setMsg(m => pick(COMMITS, m))}>Outra mensagem</button>
            <button className="btn ghost" type="button" onClick={() => copy(cmd, friday ? 'Copiado. Que Deus te acompanhe.' : 'Comando copiado.')}>Copiar comando</button>
            <button className="btn ghost" type="button" onClick={() => postOnX(`Meu commit de hoje: ${msg}`, '/commit')}>Postar no X</button>
          </div>
        </div>
      </div>
    </div></section>
  )
}
