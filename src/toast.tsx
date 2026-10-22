import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { translations, useT } from './i18n'

type Toast = (msg: string) => void
const ToastContext = createContext<Toast>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<number>(undefined)

  const toast = useCallback<Toast>(m => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(null), 2400)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast" role="status" hidden={msg === null}>{msg}</div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

const T = translations(
  { failed: 'Não deu pra copiar. Seleciona na mão, no cuzinho mesmo.', blocked: 'Não deu pra copiar. Seleciona na mão.' },
  { failed: 'Couldn’t copy. Select it by hand like it’s 1999.', blocked: 'Couldn’t copy. Select it by hand.' },
)

export function useCopy() {
  const toast = useToast()
  const t = useT(T)
  return useCallback((text: string, msg: string) => {
    try {
      navigator.clipboard.writeText(text).then(
        () => toast(msg),
        () => toast(t.failed),
      )
    } catch {
      toast(t.blocked)
    }
  }, [toast, t])
}
