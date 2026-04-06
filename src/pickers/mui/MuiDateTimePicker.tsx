import { useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { SupportedLocale } from '@/contexts/LocaleContext'

export function MuiDateTimePicker({ locale }: { locale: SupportedLocale }) {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
