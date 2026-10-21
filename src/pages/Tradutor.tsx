import { translations, useContent, useT } from '../i18n'
import { useCopy } from '../toast'
import { useTitle } from '../router'
import PageHead from '../components/PageHead'

const T = translations(
  {
    title: 'Tradutor Corporativo',
    label: 'Tradutor',
    aside: 'RH aprovado',
    head: 'O que você pensa,',
    mute: 'o que você manda no e-mail.',
    sub: 'Copie a versão da direita e mantenha o emprego.',
    think: 'O que você pensa',
    write: 'O que você escreve',
    copyCorp: 'copiar versão corporativa',
    copied: 'Copiado. Seu RH agradece.',
  },
  {
    title: 'Corporate Translator',
    label: 'Translator',
    aside: 'HR approved',
    head: 'What you think,',
    mute: 'what you put in the email.',
    sub: 'Copy the version on the right and keep your job.',
    think: 'What you think',
    write: 'What you write',
    copyCorp: 'copy corporate version',
    copied: 'Copied. HR thanks you.',
  },
)

export default function Tradutor() {
  const t = useT(T)
  const { DICT } = useContent()
  useTitle(t.title)
  const copy = useCopy()
  return (
    <section><div className="wrap">
      <PageHead
        n="02" label={t.label} aside={t.aside}
        title={t.head} mute={t.mute}
        sub={t.sub}
      />
      <div className="dict-head label" aria-hidden="true"><span>{t.think}</span><span>{t.write}</span></div>
      <ul className="dict">
        {DICT.map(([raw, corp]) => (
          <li key={raw} className="pair">
            <p className="raw">{raw}</p>
            <div className="corp">
              <p>{corp}</p>
              <button className="share" type="button" onClick={() => copy(corp, t.copied)}>{t.copyCorp}</button>
            </div>
          </li>
        ))}
      </ul>
    </div></section>
  )
}
