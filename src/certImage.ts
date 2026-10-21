// Draws the certificate on a canvas, sized 16:9 so X shows it uncropped in the feed
const W = 1600
const H = 900

const BG = '#F6D31F'
const INK = '#16140F'
const PAPER = '#FFF8D6'
const HOT = '#D6331F'
const DISPLAY = '"Bricolage Grotesque", "Arial Black", sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace'

export type CertData = { nome: string; feito: string; data: string; reg: string }

type Run = { text: string; bold: boolean }

function wrapRuns(ctx: CanvasRenderingContext2D, runs: Run[], size: number, maxWidth: number) {
  const words = runs.flatMap(r => r.text.split(/\s+/).filter(Boolean).map(text => ({ text, bold: r.bold })))
  const font = (bold: boolean) => `${bold ? 700 : 400} ${size}px ${DISPLAY}`
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

function tape(ctx: CanvasRenderingContext2D, y: number, h: number) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, y, W, h)
  ctx.clip()
  ctx.fillStyle = BG
  ctx.fillRect(0, y, W, h)
  ctx.fillStyle = INK
  for (let x = -h; x < W + h; x += 56) {
    ctx.beginPath()
    ctx.moveTo(x, y + h)
    ctx.lineTo(x + 28, y + h)
    ctx.lineTo(x + 28 + h, y)
    ctx.lineTo(x + h, y)
    ctx.fill()
  }
  ctx.restore()
}

function spaced(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: string) {
  // letterSpacing is not supported everywhere; unsupported browsers just draw it tighter
  ctx.letterSpacing = spacing
  ctx.fillText(text, x, y)
  ctx.letterSpacing = '0px'
}

export async function renderCertificate(d: CertData): Promise<Blob> {
  await Promise.all([
    document.fonts.load(`800 64px ${DISPLAY}`),
    document.fonts.load(`700 64px ${DISPLAY}`),
    document.fonts.load(`400 30px ${DISPLAY}`),
    document.fonts.load(`700 22px ${MONO}`),
    document.fonts.load(`400 22px ${MONO}`),
  ]).catch(() => {})

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)
  tape(ctx, 0, 30)
  tape(ctx, H - 30, 30)

  // paper with double border
  const px = 110, py = 80, pw = W - 220, ph = H - 160
  ctx.fillStyle = PAPER
  ctx.fillRect(px - 14, py - 14, pw + 28, ph + 28)
  ctx.strokeStyle = INK
  ctx.lineWidth = 3
  ctx.strokeRect(px, py, pw, ph)
  ctx.lineWidth = 1.5
  ctx.strokeRect(px + 8, py + 8, pw - 16, ph - 16)

  const cx = W / 2
  ctx.textAlign = 'center'
  ctx.fillStyle = INK

  ctx.font = `400 20px ${MONO}`
  spaced(ctx, 'INSTITUTO BRASILEIRO DE ENTREGAS NO LIMITE', cx, py + 130, '3px')

  ctx.font = `800 66px ${DISPLAY}`
  ctx.fillText('Certificado de Entrega No Cuzinho', cx, py + 220)

  ctx.font = `400 20px ${MONO}`
  spaced(ctx, 'CERTIFICAMOS QUE', cx, py + 286, '3px')

  // name shrinks to fit
  const maxName = 1040
  let size = 84
  ctx.font = `700 ${size}px ${DISPLAY}`
  while (ctx.measureText(d.nome).width > maxName && size > 36) {
    size -= 2
    ctx.font = `700 ${size}px ${DISPLAY}`
  }
  const nameY = py + 385
  ctx.fillText(d.nome, cx, nameY)
  ctx.fillRect(cx - 560, nameY + 24, 1120, 3)

  const { lines, space, font } = wrapRuns(ctx, [
    { text: 'entregou', bold: false },
    { text: d.feito + ',', bold: true },
    { text: 'com zero testes, zero documentação e cem por cento de fé, honrando os princípios da Metodologia No Cuzinho.', bold: false },
  ], 30, 1000)
  ctx.textAlign = 'left'
  let y = nameY + 92
  for (const l of lines) {
    let x = cx - l.width / 2
    for (const w of l.words) {
      ctx.font = font(w.bold)
      ctx.fillText(w.text, x, y)
      x += ctx.measureText(w.text).width + space
    }
    y += 44
  }

  ctx.font = `400 22px ${MONO}`
  const footY = py + ph - 44
  ctx.fillText(d.data, px + 48, footY)
  ctx.textAlign = 'right'
  ctx.fillText(d.reg, px + pw - 48, footY)
  ctx.textAlign = 'center'
  ctx.font = `700 22px ${MONO}`
  ctx.fillText('cuzinho.dev', cx, footY)

  // stamp
  ctx.save()
  ctx.translate(px + pw - 130, py + 72)
  ctx.rotate((12 * Math.PI) / 180)
  ctx.strokeStyle = HOT
  ctx.fillStyle = HOT
  ctx.lineWidth = 4
  ctx.strokeRect(-96, -38, 192, 76)
  ctx.font = `700 22px ${MONO}`
  ctx.fillText('APROVADO', 0, -5)
  ctx.fillText('SEM REVIEW', 0, 23)
  ctx.restore()

  return new Promise((resolve, reject) =>
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
  )
}
