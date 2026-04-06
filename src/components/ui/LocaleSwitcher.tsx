// src/components/ui/LocaleSwitcher.tsx
import { useLocale, SupportedLocale } from '@/contexts/LocaleContext'

const LOCALES: { value: SupportedLocale; label: string }[] = [
  { value: 'ko', label: '🇰🇷 한국어' },
  { value: 'en', label: '🇺🇸 English' },
  { value: 'ja', label: '🇯🇵 日本語' },
]

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 12, color: '#6b7280' }}>언어:</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as SupportedLocale)}
        style={{
          fontSize: 12,
          padding: '4px 10px',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          background: 'white',
          color: '#374151',
          cursor: 'pointer',
        }}
      >
        {LOCALES.map((l) => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
    </div>
  )
}
