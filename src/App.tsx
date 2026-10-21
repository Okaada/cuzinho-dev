import { useEffect, type ComponentType } from 'react'
import { ToastProvider } from './toast'
import { REPO_URL } from './data'
import { Link, navigate, useLocation } from './router'
import { useDeployMinute } from './time'
import Logo from './components/Logo'
import Home from './pages/Home'
import Manifesto from './pages/Manifesto'
import Tradutor from './pages/Tradutor'
import Desculpas from './pages/Desculpas'
import Elogios from './pages/Elogios'
import Commit from './pages/Commit'
import Bingo from './pages/Bingo'
import Certificado from './pages/Certificado'
import NotFound from './pages/NotFound'

const ROUTES: Record<string, ComponentType> = {
  '/': Home,
  '/manifesto': Manifesto,
  '/tradutor': Tradutor,
  '/desculpas': Desculpas,
  '/elogios': Elogios,
  '/commit': Commit,
  '/bingo': Bingo,
  '/certificado': Certificado,
}

const NAV = [
  ['/manifesto', 'Manifesto'],
  ['/tradutor', 'Tradutor'],
  ['/desculpas', 'Desculpas'],
  ['/elogios', 'Elogios'],
  ['/commit', 'Commit'],
  ['/bingo', 'Bingo'],
  ['/certificado', 'Certificado'],
]

export default function App() {
  const { path, hash } = useLocation()
  const panic = useDeployMinute()

  // Axiom links used to live on the home page (cuzinho.dev/#a5)
  useEffect(() => {
    if (path === '/' && /^#a\d+$/.test(hash)) navigate('/manifesto' + hash, { replace: true })
  }, [path, hash])

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [path])

  useEffect(() => {
    document.body.classList.toggle('panic', panic)
  }, [panic])

  const Page = ROUTES[path] ?? NotFound

  return (
    <ToastProvider>
      <nav className="site" aria-label="Principal"><div className="wrap">
        <Link className="brand" to="/"><Logo />cuzinho.dev</Link>
        <div className="links">
          {NAV.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <span className="status"><span className="dot"></span>{panic ? 'Deployando, não mexe' : 'Em obra'}</span>
      </div></nav>

      <main><Page /></main>

      <footer><div className="wrap">
        <span>cuzinho.dev · obra iniciada numa sexta às 17:59</span>
        <a href={REPO_URL} target="_blank" rel="noopener">Contribua via pull request (sem review, claro) ↗</a>
      </div></footer>
    </ToastProvider>
  )
}
