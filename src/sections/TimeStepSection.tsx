import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker as MuiDateTimePickerComp } from '@mui/x-date-pickers/DateTimePicker'
import { Dayjs } from 'dayjs'
import { DatePicker as AntdDatePickerComp, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Calendar2 from 'react-calendar'
import TimePicker from 'react-time-picker'
import { RCalPopover } from '@/pickers/rcal/RCalPopover'
import {
  DatePicker as AriaDP, Group, Button as AriaButton,
  Popover as AriaPopover, Dialog, Calendar as AriaCalendar,
  CalendarGrid, CalendarGridBody, CalendarGridHeader,
  CalendarHeaderCell, CalendarCell, Heading,
  DateInput, DateSegment, I18nProvider, TimeField,
} from 'react-aria-components'
import { LibraryCard } from '@/components/ui/LibraryCard'
import '@/pickers/rcal/rcal.css'
import '@/pickers/aria/aria.css'
import 'react-time-picker/dist/TimePicker.css'
import '../pickers/mui/muiLocales'

const STEP = 30 // 분 단위

// --- MUI ---
// minutesStep prop으로 30분 단위 스텝 지원
function MuiTimeStep() {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <MuiDateTimePickerComp
        value={value}
        onChange={setValue}
        minutesStep={STEP}
      />
    </LocalizationProvider>
  )
}

// --- antd ---
// minuteStep prop 지원
function AntdTimeStep() {
  return (
    <ConfigProvider locale={koKR} prefixCls="antd">
      <AntdDatePickerComp
        showTime={{ minuteStep: STEP }}
        style={{ width: 220 }}
      />
    </ConfigProvider>
  )
}

// --- shadcn ---
// HTML <select> 로 30분 단위 직접 구현
function ShadcnTimeStep() {
  const [date, setDate] = useState<Date>()
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 / STEP }, (_, i) => String(i * STEP).padStart(2, '0'))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: ko })} ${hour}:${minute}` : '날짜·시간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar mode="single" selected={date} onSelect={setDate} locale={ko} />
        <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 6 }}>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 4px' }}
          >
            {hours.map((h) => <option key={h}>{h}</option>)}
          </select>
          <span style={{ color: '#6b7280' }}>:</span>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 4px' }}
          >
            {minutes.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// --- react-calendar + react-time-picker ---
// react-time-picker는 step prop 미지원 → select로 직접 구현
function RCalTimeStep() {
  const [date, setDate] = useState<Date>()
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 / STEP }, (_, i) => String(i * STEP).padStart(2, '0'))

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: ko })} ${hour}:${minute}` : '날짜·시간 선택'}
        </button>
      }
    >
      <Calendar2
        onChange={(d) => { if (d instanceof Date) setDate(d) }}
        value={date}
        locale="ko-KR"
      />
      <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 6 }}>
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 4px' }}
        >
          {hours.map((h) => <option key={h}>{h}</option>)}
        </select>
        <span style={{ color: '#6b7280' }}>:</span>
        <select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 4px' }}
        >
          {minutes.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
    </RCalPopover>
  )
}

// --- React Aria ---
// step prop 미지원 → TimeField + select로 직접 구현
function AriaTimeStep() {
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = Array.from({ length: 60 / STEP }, (_, i) => String(i * STEP).padStart(2, '0'))

  return (
    <I18nProvider locale="ko-KR">
      <AriaDP>
        <Group className="aria-group">
          <DateInput className="aria-dateinput">
            {(segment) => <DateSegment segment={segment} className="aria-segment" />}
          </DateInput>
          <AriaButton className="aria-cal-btn">📅</AriaButton>
        </Group>
        <AriaPopover className="aria-popover">
          <Dialog>
            <AriaCalendar>
              <header className="aria-cal-header">
                <AriaButton slot="previous" className="aria-nav-btn">‹</AriaButton>
                <Heading className="aria-cal-heading" />
                <AriaButton slot="next" className="aria-nav-btn">›</AriaButton>
              </header>
              <CalendarGrid className="aria-cal-grid">
                <CalendarGridHeader>
                  {(day) => <CalendarHeaderCell className="aria-header-cell">{day}</CalendarHeaderCell>}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => <CalendarCell date={date} className="aria-cell" />}
                </CalendarGridBody>
              </CalendarGrid>
            </AriaCalendar>
            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: 8, paddingTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 4px' }}
              >
                {hours.map((h) => <option key={h}>{h}</option>)}
              </select>
              <span style={{ color: '#6b7280' }}>:</span>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 4px' }}
              >
                {minutes.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </Dialog>
        </AriaPopover>
      </AriaDP>
    </I18nProvider>
  )
}

export function TimeStepSection() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>⏱️ Time Step</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          시간 선택 시 30분 단위로만 선택 가능하게 하는 step 기능 비교
        </p>
      </div>

      <div style={{
        background: '#fef3c7',
        border: '1px solid #fde68a',
        borderLeft: '4px solid #f59e0b',
        borderRadius: 8,
        padding: '10px 16px',
        marginBottom: 20,
        fontSize: 12,
        color: '#92400e',
      }}>
        <strong>기존 antd 문제:</strong> 시간 선택 시 특정 간격(step)으로만 선택 가능하게 하는 기능이 필요합니다.
        아래는 <strong>30분 단위</strong> step을 각 라이브러리에서 어떻게 처리하는지 비교합니다.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="minutesStep prop 네이티브 지원 ✅" code={`// MUI: minutesStep prop으로 30분 단위 지원
<DateTimePicker
  value={value}
  onChange={setValue}
  minutesStep={30}
/>`}>
          <MuiTimeStep />
        </LibraryCard>

        <LibraryCard name="Ant Design" version="minuteStep prop 네이티브 지원 ✅" code={`// antd: showTime의 minuteStep prop
<DatePicker
  showTime={{ minuteStep: 30 }}
/>`}>
          <AntdTimeStep />
        </LibraryCard>

        <LibraryCard name="shadcn/ui" version="select로 직접 구현 ⚠️" code={`// shadcn: step 미지원 → select로 직접 구현
const minutes = [0, 30].map((m) => String(m).padStart(2, '0'))

<select value={minute} onChange={(e) => setMinute(e.target.value)}>
  {minutes.map((m) => <option key={m}>{m}</option>)}
</select>`}>
          <ShadcnTimeStep />
        </LibraryCard>

        <LibraryCard name="react-calendar" version="select로 직접 구현 ⚠️" code={`// react-time-picker: step 미지원 → select로 직접 구현
const minutes = [0, 30].map((m) => String(m).padStart(2, '0'))

<select value={minute} onChange={(e) => setMinute(e.target.value)}>
  {minutes.map((m) => <option key={m}>{m}</option>)}
</select>`}>
          <RCalTimeStep />
        </LibraryCard>

        <LibraryCard name="React Aria" version="select로 직접 구현 ⚠️" code={`// React Aria: TimeField step 미지원 → select로 직접 구현
const minutes = [0, 30].map((m) => String(m).padStart(2, '0'))

<select value={minute} onChange={(e) => setMinute(e.target.value)}>
  {minutes.map((m) => <option key={m}>{m}</option>)}
</select>`}>
          <AriaTimeStep />
        </LibraryCard>
      </div>
    </div>
  )
}
