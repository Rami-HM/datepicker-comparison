import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<DateRange>()
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('23:59')
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 280 }}>
          🕑 {range?.from
            ? `${fmt(range.from)} ${startTime} ~ ${range.to ? fmt(range.to) : '?'} ${endTime}`
            : '기간·시간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          locale={fnsLocale}
          numberOfMonths={2}
        />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderTop: '1px solid #e5e7eb',
        }}>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
          <span style={{ color: '#9ca3af' }}>~</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
