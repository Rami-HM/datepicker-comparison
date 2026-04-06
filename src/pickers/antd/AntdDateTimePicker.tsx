import { DatePicker, ConfigProvider } from 'antd'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { ANTD_LOCALES } from './antdLocales'

export function AntdDateTimePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <DatePicker showTime style={{ width: 220 }} />
    </ConfigProvider>
  )
}
