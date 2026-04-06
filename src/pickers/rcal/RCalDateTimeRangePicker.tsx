import { useState } from 'react'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'
import 'react-time-picker/dist/TimePicker.css'

type Range = [Date, Date] | null

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<Range>(null)
  const [startTime, setStartTime] = useState<string>('00:00')
  const [endTime, setEndTime] = useState<string>('23:59')
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 280 }}>
          🕑 {range
            ? `${fmt(range[0])} ${startTime} ~ ${fmt(range[1])} ${endTime}`
            : '기간·시간 선택'}
        </button>
      }
    >
      <Calendar
        selectRange
        onChange={(val) => setRange(val as [Date, Date])}
        value={range}
        locale={CAL_LOCALES[locale]}
      />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderTop: '1px solid #e5e7eb',
      }}>
        <TimePicker onChange={(v) => setStartTime(v as string)} value={startTime} disableClock clearIcon={null as any} />
        <span style={{ color: '#9ca3af' }}>~</span>
        <TimePicker onChange={(v) => setEndTime(v as string)} value={endTime} disableClock clearIcon={null as any} />
      </div>
    </RCalPopover>
  )
}
