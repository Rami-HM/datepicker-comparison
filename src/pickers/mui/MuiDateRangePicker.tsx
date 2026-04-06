import { useState } from 'react'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRange } from '@mui/x-date-pickers-pro/models'
import { Dayjs } from 'dayjs'
import { SupportedLocale } from '@/contexts/LocaleContext'

export function MuiDateRangePicker({ locale }: { locale: SupportedLocale }) {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateRangePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
