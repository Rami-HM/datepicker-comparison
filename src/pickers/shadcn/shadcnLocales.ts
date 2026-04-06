import { ko, enUS, ja } from 'date-fns/locale'
import type { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

export const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export const PLACEHOLDER_LABELS: Record<SupportedLocale, {
  date: string
  dateTime: string
  range: string
  dateTimeRange: string
}> = {
  ko: { date: '날짜 선택', dateTime: '날짜·시간 선택', range: '기간 선택', dateTimeRange: '기간·시간 선택' },
  en: { date: 'Select date', dateTime: 'Select date & time', range: 'Select range', dateTimeRange: 'Select date-time range' },
  ja: { date: '日付を選択', dateTime: '日時を選択', range: '期間を選択', dateTimeRange: '日時範囲を選択' },
}
