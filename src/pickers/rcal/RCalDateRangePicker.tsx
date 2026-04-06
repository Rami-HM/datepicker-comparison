import { useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'

type Range = [Date, Date] | null

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDateRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<Range>(null)
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 240 }}>
          📆 {range ? `${fmt(range[0])} ~ ${fmt(range[1])}` : '기간 선택'}
        </button>
      }
    >
      <Calendar
        selectRange
        onChange={(val) => { if (Array.isArray(val) && val[0] instanceof Date && val[1] instanceof Date) setRange([val[0], val[1]]) }}
        value={range}
        locale={CAL_LOCALES[locale]}
      />
    </RCalPopover>
  )
}
