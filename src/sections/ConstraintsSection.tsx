import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { addDays } from 'date-fns'
import { AriaDateConstraints, AriaTimeConstraints } from '@/pickers/aria/AriaConstraints'
import { DatePicker as MuiDatePickerComp } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker as MuiDateTimePickerComp } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as AntdDatePickerComp, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import RCalendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import { RCalPopover } from '@/pickers/rcal/RCalPopover'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { CONSTRAINTS_SNIPPETS } from '@/constants/code-snippets'
import '@/pickers/rcal/rcal.css'
import 'react-time-picker/dist/TimePicker.css'
import '../pickers/mui/muiLocales'

const today = dayjs()
const todayJs = new Date()
const maxDayjs = today.add(30, 'day')
const maxDate = addDays(todayJs, 30)

// --- MUI ---
function MuiDateConstraints() {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <MuiDatePickerComp
        value={value}
        onChange={setValue}
        shouldDisableDate={(d) => d.day() === 0 || d.day() === 6}
        minDate={today}
        maxDate={maxDayjs}
      />
    </LocalizationProvider>
  )
}

function MuiTimeConstraints() {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <MuiDateTimePickerComp
        value={value}
        onChange={setValue}
        minTime={dayjs().hour(9).minute(0)}
        maxTime={dayjs().hour(18).minute(0)}
      />
    </LocalizationProvider>
  )
}

// --- antd ---
function AntdDateConstraints() {
  return (
    <ConfigProvider locale={koKR} prefixCls="antd">
      <AntdDatePickerComp
        style={{ width: 200 }}
        disabledDate={(d) =>
          d.day() === 0 || d.day() === 6 ||
          d.isBefore(today, 'day') ||
          d.isAfter(maxDayjs, 'day')
        }
      />
    </ConfigProvider>
  )
}

function AntdTimeConstraints() {
  return (
    <ConfigProvider locale={koKR} prefixCls="antd">
      <AntdDatePickerComp
        showTime
        style={{ width: 220 }}
        disabledTime={() => ({
          disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 19, 20, 21, 22, 23],
        })}
      />
    </ConfigProvider>
  )
}

// --- shadcn ---
function ShadcnDateConstraints() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 180 }}>
          📅 {date ? format(date, 'yyyy.MM.dd', { locale: ko }) : '날짜 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => { setDate(d); setOpen(false) }}
          locale={ko}
          disabled={[{ dayOfWeek: [0, 6] }, { before: todayJs }, { after: maxDate }]}
          startMonth={todayJs}
          endMonth={maxDate}
        />
      </PopoverContent>
    </Popover>
  )
}

function ShadcnTimeConstraints() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('09:00')
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: ko })} ${time}` : '날짜·시간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar mode="single" selected={date} onSelect={setDate} locale={ko} />
        <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb' }}>
          <label style={{ fontSize: 12, color: '#6b7280', marginRight: 8 }}>시간</label>
          <input
            type="time"
            value={time}
            min="09:00"
            max="18:00"
            onChange={(e) => {
              const v = e.target.value
              if (v < '09:00') setTime('09:00')
              else if (v > '18:00') setTime('18:00')
              else setTime(v)
            }}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// --- react-calendar ---
function RCalDateConstraints() {
  const [date, setDate] = useState<Date>()
  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger">
          📅 {date ? format(date, 'yyyy.MM.dd') : '날짜 선택'}
        </button>
      }
    >
      <RCalendar
        onChange={(d) => { if (d instanceof Date) setDate(d) }}
        value={date}
        locale="ko-KR"
        minDate={todayJs}
        maxDate={maxDate}
        tileDisabled={({ date: d }) => d.getDay() === 0 || d.getDay() === 6}
      />
    </RCalPopover>
  )
}

function RCalTimeConstraints() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('09:00')
  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd')} ${time}` : '날짜·시간 선택'}
        </button>
      }
    >
      <RCalendar
        onChange={(d) => { if (d instanceof Date) setDate(d) }}
        value={date}
        locale="ko-KR"
      />
      <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>시간</span>
        <TimePicker
          onChange={(v) => setTime(v as string)}
          value={time}
          disableClock
          clearIcon={null as any}
          minTime="09:00"
          maxTime="18:00"
        />
      </div>
    </RCalPopover>
  )
}

// --- Section ---
function SubTitle({ children }: { children: string }) {
  return (
    <h2 style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '24px 0 12px', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
      {children}
    </h2>
  )
}

export function ConstraintsSection() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🔒 Constraints</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>날짜·시간 제약 — 주말 비활성화, min/max, 시간 범위 제한 비교</p>
      </div>

      <SubTitle>날짜 제한 — 주말 비활성화 + 오늘~30일 이내만 선택 가능</SubTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="shouldDisableDate + minDate/maxDate" code={CONSTRAINTS_SNIPPETS.mui_date}>
          <MuiDateConstraints />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="disabledDate 콜백" code={CONSTRAINTS_SNIPPETS.antd_date}>
          <AntdDateConstraints />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="disabled Matcher + fromDate/toDate" code={CONSTRAINTS_SNIPPETS.shadcn_date}>
          <ShadcnDateConstraints />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="tileDisabled + minDate/maxDate" code={CONSTRAINTS_SNIPPETS.rcal_date}>
          <RCalDateConstraints />
        </LibraryCard>
        <LibraryCard name="React Aria" version="isDateUnavailable + minValue/maxValue" code={CONSTRAINTS_SNIPPETS.aria_date}>
          <AriaDateConstraints />
        </LibraryCard>
      </div>

      <SubTitle>시간 제한 — 09:00 ~ 18:00 만 선택 가능</SubTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="minTime / maxTime" code={CONSTRAINTS_SNIPPETS.mui_time}>
          <MuiTimeConstraints />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="disabledTime 콜백" code={CONSTRAINTS_SNIPPETS.antd_time}>
          <AntdTimeConstraints />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="input[type=time] min/max" code={CONSTRAINTS_SNIPPETS.shadcn_time}>
          <ShadcnTimeConstraints />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="TimePicker minTime/maxTime" code={CONSTRAINTS_SNIPPETS.rcal_time}>
          <RCalTimeConstraints />
        </LibraryCard>
        <LibraryCard name="React Aria" version="granularity=minute (세그먼트 직접 입력)" code={CONSTRAINTS_SNIPPETS.aria_time}>
          <AriaTimeConstraints />
        </LibraryCard>
      </div>
    </div>
  )
}
