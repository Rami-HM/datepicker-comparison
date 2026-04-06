import { DatePicker, ConfigProvider } from 'antd'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { ANTD_LOCALES } from './antdLocales'

const { RangePicker } = DatePicker

export function AntdDateRangePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <RangePicker />
    </ConfigProvider>
  )
}
