// src/constants/code-snippets.ts

export const MUI_SNIPPETS = {
  datePicker: `import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ko'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DatePicker />
</LocalizationProvider>`,

  dateTimePicker: `import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DateTimePicker />
</LocalizationProvider>`,

  dateRangePicker: `import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DateRangePicker />
</LocalizationProvider>`,

  dateTimeRangePicker: `import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DateTimeRangePicker />
</LocalizationProvider>`,
}

export const ANTD_SNIPPETS = {
  datePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'

<ConfigProvider locale={koKR} prefixCls="antd">
  <DatePicker style={{ width: 200 }} />
</ConfigProvider>`,

  dateTimePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'

<ConfigProvider locale={koKR} prefixCls="antd">
  <DatePicker showTime style={{ width: 220 }} />
</ConfigProvider>`,

  dateRangePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
const { RangePicker } = DatePicker

<ConfigProvider locale={koKR} prefixCls="antd">
  <RangePicker />
</ConfigProvider>`,

  dateTimeRangePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
const { RangePicker } = DatePicker

<ConfigProvider locale={koKR} prefixCls="antd">
  <RangePicker showTime />
</ConfigProvider>`,
}

export const SHADCN_SNIPPETS = {
  datePicker: `// shadcn/ui: Calendar + Popover 조합
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date>()
const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? format(date, 'PPP', { locale: ko }) : '날짜 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar
      mode="single"
      selected={date}
      onSelect={(d) => { setDate(d); setOpen(false) }}
      locale={ko}
    />
  </PopoverContent>
</Popover>`,

  dateTimePicker: `// shadcn/ui: Calendar + Popover + time input 조합
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date>()
const [time, setTime] = useState('00:00')

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? \`\${format(date, 'PPP', { locale: ko })} \${time}\` : '날짜·시간 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="single" selected={date} onSelect={setDate} locale={ko} />
    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
  </PopoverContent>
</Popover>`,

  dateRangePicker: `// shadcn/ui: Calendar range mode
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [range, setRange] = useState<DateRange>()

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {range?.from
        ? \`\${format(range.from, 'PP', { locale: ko })} ~ \${range.to ? format(range.to, 'PP', { locale: ko }) : '?'}\`
        : '기간 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="range" selected={range} onSelect={setRange} locale={ko} />
  </PopoverContent>
</Popover>`,

  dateTimeRangePicker: `// shadcn/ui: Calendar range + 2× time input 조합
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [range, setRange] = useState<DateRange>()
const [startTime, setStartTime] = useState('00:00')
const [endTime, setEndTime] = useState('23:59')

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {range?.from
        ? \`\${format(range.from, 'PP', { locale: ko })} \${startTime} ~ \${range.to ? format(range.to, 'PP', { locale: ko }) : '?'} \${endTime}\`
        : '기간·시간 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="range" selected={range} onSelect={setRange} locale={ko} />
    <div>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <span> ~ </span>
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
    </div>
  </PopoverContent>
</Popover>`,
}

export const RCAL_SNIPPETS = {
  datePicker: `// react-calendar v5: Input 트리거 + Popover 조합
import { useState } from 'react'
import Calendar from 'react-calendar'
import * as Popover from '@radix-ui/react-popover'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date>()

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">
      📅 {date ? format(date, 'yyyy.MM.dd', { locale: ko }) : '날짜 선택'}
    </button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar
      onChange={(d) => setDate(d as Date)}
      value={date}
      locale="ko-KR"
    />
  </Popover.Content>
</Popover.Root>`,

  dateTimePicker: `// react-calendar v5 + react-time-picker 조합
import { useState } from 'react'
import { format } from 'date-fns'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import * as Popover from '@radix-ui/react-popover'
import 'react-calendar/dist/Calendar.css'
import 'react-time-picker/dist/TimePicker.css'

const [date, setDate] = useState<Date>()
const [time, setTime] = useState<string>('00:00')

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">
      📅 {date ? \`\${format(date, 'yyyy.MM.dd')} \${time}\` : '날짜·시간 선택'}
    </button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar onChange={(d) => setDate(d as Date)} value={date} locale="ko-KR" />
    <TimePicker onChange={setTime} value={time} />
  </Popover.Content>
</Popover.Root>`,

  dateRangePicker: `// react-calendar v5: selectRange prop 사용
import { useState } from 'react'
import { format } from 'date-fns'
import Calendar from 'react-calendar'
import * as Popover from '@radix-ui/react-popover'
import 'react-calendar/dist/Calendar.css'

type Range = [Date, Date] | null

const [range, setRange] = useState<Range>(null)

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">
      📅 {range ? \`\${format(range[0], 'yyyy.MM.dd')} ~ \${format(range[1], 'yyyy.MM.dd')}\` : '기간 선택'}
    </button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar
      selectRange
      onChange={(val) => setRange(val as [Date, Date])}
      value={range}
      locale="ko-KR"
    />
  </Popover.Content>
</Popover.Root>`,

  dateTimeRangePicker: `// react-calendar v5 + 2× react-time-picker
import { useState } from 'react'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import * as Popover from '@radix-ui/react-popover'

type Range = [Date, Date] | null

const [range, setRange] = useState<Range>(null)
const [startTime, setStartTime] = useState('00:00')
const [endTime, setEndTime] = useState('23:59')

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">기간·시간 선택</button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar
      selectRange
      onChange={(val) => setRange(val as [Date, Date])}
      value={range}
      locale="ko-KR"
    />
    <div>
      <TimePicker onChange={setStartTime} value={startTime} />
      <span> ~ </span>
      <TimePicker onChange={setEndTime} value={endTime} />
    </div>
  </Popover.Content>
</Popover.Root>`,
}
