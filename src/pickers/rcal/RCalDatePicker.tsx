import { useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDatePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger">
          📅 {date ? format(date, 'yyyy.MM.dd', { locale: fnsLocale }) : '날짜 선택'}
        </button>
      }
    >
      <Calendar
        onChange={(d) => setDate(d as Date)}
        value={date}
        locale={CAL_LOCALES[locale]}
      />
    </RCalPopover>
  )
}
