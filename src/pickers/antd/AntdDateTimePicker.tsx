import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import { Locale } from 'antd/lib/locale'
import { SupportedLocale } from '@/contexts/LocaleContext'

const ANTD_LOCALES: Record<SupportedLocale, Locale> = { ko: koKR, en: enUS, ja: jaJP }

export function AntdDateTimePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <DatePicker showTime style={{ width: 220 }} />
    </ConfigProvider>
  )
}
