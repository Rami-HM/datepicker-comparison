import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/ko'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import { SupportedLocale } from '@/contexts/LocaleContext'

interface Props {
  locale: SupportedLocale
}

export function MuiDatePicker({ locale }: Props) {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
