import { SITE_URL } from './data'
import { getLang } from './i18n'

// Links shared from the English version open in English
export function siteUrl(path = '') {
  if (getLang() !== 'en') return SITE_URL + path
  const url = new URL(SITE_URL + path)
  url.searchParams.set('lang', 'en')
  return url.toString()
}

export function postOnX(text: string, path = '') {
  const intent = new URL('https://x.com/intent/post')
  intent.searchParams.set('text', text)
  intent.searchParams.set('url', siteUrl(path))
  window.open(intent, '_blank', 'noopener')
}

export const pick = <T,>(list: readonly T[], not?: T): T => {
  if (list.length < 2) return list[0]
  let item: T
  do item = list[Math.floor(Math.random() * list.length)]
  while (item === not)
  return item
}
