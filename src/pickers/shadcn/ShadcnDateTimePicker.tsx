import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDateTimePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('00:00')
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: fnsLocale })} ${time}` : '날짜·시간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fnsLocale}
        />
        <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb' }}>
          <label style={{ fontSize: 12, color: '#6b7280', marginRight: 8 }}>시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
