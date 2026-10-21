import type { ReactNode } from 'react'

type Props = { n: string; label: string; title: ReactNode; mute?: ReactNode; sub?: ReactNode; aside?: ReactNode }

// Section header: "01 Manifesto" rule, then a two-tone title
export default function PageHead({ n, label, title, mute, sub, aside }: Props) {
  return (
    <div className="head">
      <div className="head-top">
        <span className="t"><span className="num">{n}</span>{label}</span>
        {aside && <span className="label">{aside}</span>}
      </div>
      <h2>{title}{mute && <> <span>{mute}</span></>}</h2>
      {sub && <p className="sub">{sub}</p>}
    </div>
  )
}
