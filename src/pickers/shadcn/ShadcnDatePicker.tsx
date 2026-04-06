import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDatePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 180 }}>
          📅 {date ? format(date, 'yyyy.MM.dd', { locale: fnsLocale }) : '날짜 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => { setDate(d); setOpen(false) }}
          locale={fnsLocale}
        />
      </PopoverContent>
    </Popover>
  )
}
