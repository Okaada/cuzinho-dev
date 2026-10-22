// Draws the certificate on a canvas, sized 16:9 so X shows it uncropped in the feed
const W = 1600
const H = 900

const BG = '#141414'
const INK = '#141414'
const SOFT = '#6E6E6B'
const LINE = '#CFCFCB'
const PAPER = '#EDEDEB'
const HOT = '#E5322D'
const DISPLAY = '"Geist", "Helvetica Neue", Arial, sans-serif'
const MONO = '"Geist Mono", ui-monospace, Menlo, monospace'

// Fixed lines of the certificate, translated by the page
export type CertText = { institute: string; title: string; certify: string; delivered: string; rest: string; stamp: [string, string] }

export type CertData = { nome: string; feito: string; data: string; reg: string; text: CertText }

type Run = { text: string; bold: boolean }

function wrapRuns(ctx: CanvasRenderingContext2D, runs: Run[], size: number, maxWidth: number) {
  const words = runs.flatMap(r => r.text.split(/\s+/).filter(Boolean).map(text => ({ text, bold: r.bold })))
  const font = (bold: boolean) => `${bold ? 500 : 400} ${size}px ${DISPLAY}`
  const lines: { words: typeof words; width: number }[] = []
  let line: typeof words = []
  let width = 0
  ctx.font = font(false)
  const space = ctx.measureText(' ').width
  for (const w of words) {
    ctx.font = font(w.bold)
    const ww = ctx.measureText(w.text).width
    const next = line.length ? width + space + ww : ww
    if (next > maxWidth && line.length) {
      lines.push({ words: line, width })
      line = [w]
      width = ww
    } else {
      line.push(w)
      width = next
    }
  }
  if (line.length) lines.push({ words: line, width })
  return { lines, space, font }
}

function spaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: string) {
  // letterSpacing is not supported everywhere; unsupported browsers just draw it tighter
  ctx.letterSpacing = spacing
  ctx.fillText(text, x, y)
  ctx.letterSpacing = '0px'
}

export async function renderCertificate(d: CertData): Promise<Blob> {
  await Promise.all([
    document.fonts.load(`300 64px ${DISPLAY}`),
    document.fonts.load(`500 64px ${DISPLAY}`),
    document.fonts.load(`400 28px ${DISPLAY}`),
    document.fonts.load(`500 28px ${DISPLAY}`),
    document.fonts.load(`400 20px ${MONO}`),
  ]).catch(() => {})

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)

  // outlined skyline peeking behind the paper
  ctx.strokeStyle = '#2D2D2D'
  ctx.lineWidth = 2
  const heights = [0.3, 0.55, 0.4, 0.8, 0.45, 0.65, 0.35, 0.7, 0.5, 0.6]
  const bw = W / heights.length
  heights.forEach((h, i) => ctx.strokeRect(i * bw, H - H * h, bw, H * h + 2))

  // paper with an inset hairline
  const px = 130, py = 80, pw = W - 260, ph = H - 160
  ctx.fillStyle = PAPER
  ctx.fillRect(px, py, pw, ph)
  ctx.strokeStyle = LINE
  ctx.lineWidth = 2
  ctx.strokeRect(px + 14, py + 14, pw - 28, ph - 28)

  const cx = W / 2
  ctx.textAlign = 'center'

  ctx.fillStyle = SOFT
  ctx.font = `400 18px ${MONO}`
  spaced(ctx, d.text.institute.toUpperCase(), cx, py + 110, '4px')

  ctx.fillStyle = INK
  ctx.font = `300 64px ${DISPLAY}`
  ctx.letterSpacing = '-2px'
  ctx.fillText(d.text.title, cx, py + 196)
  ctx.letterSpacing = '0px'

  ctx.fillStyle = SOFT
  ctx.font = `400 18px ${MONO}`
  spaced(ctx, d.text.certify.toUpperCase(), cx, py + 262, '4px')

  // name shrinks to fit
  ctx.fillStyle = INK
  const maxName = 1000
  let size = 80
  ctx.font = `500 ${size}px ${DISPLAY}`
  while (ctx.measureText(d.nome).width > maxName && size > 36) {
    size -= 2
    ctx.font = `500 ${size}px ${DISPLAY}`
  }
  const nameY = py + 360
  ctx.letterSpacing = '-2px'
  ctx.fillText(d.nome, cx, nameY)
  ctx.letterSpacing = '0px'
  ctx.fillRect(cx - 520, nameY + 26, 1040, 2)

  const { lines, space, font } = wrapRuns(ctx, [
    { text: d.text.delivered, bold: false },
    { text: d.feito + ',', bold: true },
    { text: d.text.rest, bold: false },
  ], 28, 960)
  ctx.textAlign = 'left'
  let y = nameY + 94
  for (const l of lines) {
    let x = cx - l.width / 2
    for (const w of l.words) {
      ctx.font = font(w.bold)
      ctx.fillStyle = w.bold ? INK : SOFT
      ctx.fillText(w.text, x, y)
      x += ctx.measureText(w.text).width + space
    }
    y += 42
  }

  ctx.fillStyle = SOFT
  ctx.font = `400 18px ${MONO}`
  const footY = py + ph - 52
  ctx.fillText(d.data.toUpperCase(), px + 56, footY)
  ctx.textAlign = 'right'
  ctx.fillText(d.reg.toUpperCase(), px + pw - 56, footY)
  ctx.textAlign = 'center'
  ctx.fillStyle = INK
  ctx.fillText('CUZINHO.DEV', cx, footY)

  // stamp
  ctx.save()
  ctx.translate(px + pw - 140, py + 96)
  ctx.rotate((8 * Math.PI) / 180)
  ctx.strokeStyle = HOT
  ctx.fillStyle = HOT
  ctx.lineWidth = 2
  ctx.strokeRect(-84, -32, 168, 64)
  ctx.font = `400 17px ${MONO}`
  spaced(ctx, d.text.stamp[0], 0, -4, '2px')
  spaced(ctx, d.text.stamp[1], 0, 20, '2px')
  ctx.restore()

  return new Promise((resolve, reject) =>
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
  )
}
