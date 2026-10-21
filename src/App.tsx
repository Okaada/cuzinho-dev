import { useCallback, useState } from 'react'
import { ToastProvider } from './toast'
import { AXIOMS } from './data'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Translator from './components/Translator'
import Certificate from './components/Certificate'
import Badge from './components/Badge'

// Wrapped in an object so picking the same axiom twice still re-triggers the scroll
export type Hit = { id: string } | null

const initialHit = (): Hit => (/^#a\d+$/.test(location.hash) ? { id: location.hash.slice(1) } : null)

export default function App() {
  const [hit, setHit] = useState<Hit>(initialHit)

  const randomAxiom = useCallback(() => {
    setHit({ id: 'a' + (1 + Math.floor(Math.random() * AXIOMS.length)) })
  }, [])

  return (
    <ToastProvider>
      <div className="bar"><div className="wrap">
        <span><span className="dot"></span>status: <b>em produção (não testado)</b></span>
        <span>dias sem deploy na sexta: <b>0</b></span>
      </div></div>
      <div className="tape" aria-hidden="true"></div>

      <Hero onRandom={randomAxiom} />

      <div className="tape" aria-hidden="true"></div>
      <Manifesto hit={hit} />

      <div className="tape" aria-hidden="true"></div>
      <Translator />
      <Certificate />
      <Badge />

      <footer><div className="wrap">
        <span>cuzinho.dev · feito na sexta às 17:59</span>
        <span>Contribua com axiomas via pull request (sem review, claro)</span>
      </div></footer>
    </ToastProvider>
  )
}
