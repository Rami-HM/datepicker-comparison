import { createContext, useContext, useState, ReactNode } from 'react'

export type SupportedLocale = 'ko' | 'en' | 'ja'

interface LocaleContextValue {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<SupportedLocale>('ko')
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
