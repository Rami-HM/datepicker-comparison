import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { DATE_FNS_LOCALES, PLACEHOLDER_LABELS } from './shadcnLocales'

export function ShadcnDateRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<DateRange>()
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 240 }}>
          📆 {range?.from ? `${fmt(range.from)} ~ ${range.to ? fmt(range.to) : '?'}` : PLACEHOLDER_LABELS[locale].range}
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
      </PopoverContent>
    </Popover>
  )
}
