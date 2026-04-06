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

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDateTimePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('00:00')
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: fnsLocale })} ${time}` : '날짜·시간 선택'}
        </button>
      }
    >
      <Calendar
        onChange={(d) => setDate(d as Date)}
        value={date}
        locale={CAL_LOCALES[locale]}
      />
      <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>시간</span>
        <TimePicker onChange={(v) => setTime(v as string)} value={time} disableClock clearIcon={null as any} />
      </div>
    </RCalPopover>
  )
}
