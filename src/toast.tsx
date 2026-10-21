import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

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

export function useCopy() {
  const toast = useToast()
  return useCallback((text: string, msg: string) => {
    try {
      navigator.clipboard.writeText(text).then(
        () => toast(msg),
        () => toast('Não deu pra copiar. Seleciona na mão, no cuzinho mesmo.'),
      )
    } catch {
      toast('Não deu pra copiar. Seleciona na mão.')
    }
  }, [toast])
}
