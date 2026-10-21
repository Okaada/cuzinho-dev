import { useEffect, useMemo, useRef, useState } from 'react'
import { BINGO, BINGO_FREE } from '../data'
import { useTitle } from '../router'
import { postOnX } from '../share'
import { useToast } from '../toast'
import PageHead from '../components/PageHead'

const STORAGE_KEY = 'mnc-bingo'
const CENTER = 12

type Board = { cells: string[]; marked: boolean[] }

function newBoard(): Board {
  const pool = [...BINGO]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const cells = pool.slice(0, 24)
  cells.splice(CENTER, 0, BINGO_FREE)
  return { cells, marked: cells.map((_, i) => i === CENTER) }
}

function loadBoard(): Board {
  try {
    const b = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '') as Board
    if (b.cells?.length === 25 && b.marked?.length === 25) return b
  } catch { /* first visit or storage blocked */ }
  return newBoard()
}

const LINES = [
  ...[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4].map(c => r * 5 + c)),
  ...[0, 1, 2, 3, 4].map(c => [0, 1, 2, 3, 4].map(r => r * 5 + c)),
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
]

export default function Bingo() {
  useTitle('Bingo da Daily')
  const toast = useToast()
  const [board, setBoard] = useState(loadBoard)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(board)) } catch { /* storage blocked */ }
  }, [board])

  const winning = useMemo(() => {
    const cells = new Set<number>()
    for (const line of LINES) if (line.every(i => board.marked[i])) line.forEach(i => cells.add(i))
    return cells
  }, [board])
  const won = winning.size > 0

  // Only celebrate the transition to a win, not boards that load already won
  const wasWon = useRef(won)
  useEffect(() => {
    if (won && !wasWon.current) toast('BINGO! Grita no meio da daily.')
    wasWon.current = won
  }, [won, toast])

  const toggle = (i: number) => {
    if (i === CENTER) return
    setBoard(b => ({ ...b, marked: b.marked.map((m, j) => (j === i ? !m : m)) }))
  }

  const reset = () => setBoard(newBoard())

  return (
    <section><div className="wrap">
      <PageHead
        n="05" label="Bingo" aside="5 × 5"
        title="Bingo da daily." mute="A reunião podia ser um e-mail."
        sub="Abra antes da reunião e marque cada frase que alguém falar. Completou linha, coluna ou diagonal: liga o microfone e grita."
      />

      <div className="bingo" role="group" aria-label="Cartela de bingo">
        {board.cells.map((text, i) => (
          <button
            key={i}
            type="button"
            className={`cell${i === CENTER ? ' free' : ''}${winning.has(i) ? ' win' : ''}`}
            aria-pressed={board.marked[i]}
            onClick={() => toggle(i)}
          >{text}</button>
        ))}
      </div>

      <div className="actions" style={{ marginTop: 28 }}>
        {won && <button className="btn" type="button" onClick={() => postOnX('Fiz BINGO na daily de hoje 🎯 A reunião podia ser um e-mail.', '/bingo')}>Postar bingo no X</button>}
        <button className={won ? 'btn ghost' : 'btn'} type="button" onClick={reset}>Nova cartela</button>
      </div>
    </div></section>
  )
}
