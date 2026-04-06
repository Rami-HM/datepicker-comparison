import { DatePicker, ConfigProvider } from 'antd'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { ANTD_LOCALES } from './antdLocales'

export function AntdDatePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <DatePicker style={{ width: 200 }} />
    </ConfigProvider>
  )
}
