import { useState } from 'react'
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRange } from '@mui/x-date-pickers-pro/models'
import { Dayjs } from 'dayjs'
import { SupportedLocale } from '@/contexts/LocaleContext'
import './muiLocales'

export function MuiDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimeRangePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
