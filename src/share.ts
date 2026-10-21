import { SITE_URL } from './data'

export function postOnX(text: string, path = '') {
  const intent = new URL('https://x.com/intent/post')
  intent.searchParams.set('text', text)
  intent.searchParams.set('url', SITE_URL + path)
  window.open(intent, '_blank', 'noopener')
}

export const pick = <T,>(list: readonly T[], not?: T): T => {
  if (list.length < 2) return list[0]
  let item: T
  do item = list[Math.floor(Math.random() * list.length)]
  while (item === not)
  return item
}
