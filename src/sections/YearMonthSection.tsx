import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MuiDatePickerComp } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { DatePicker as AntdDatePickerComp, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Calendar2 from 'react-calendar'
import { RCalPopover } from '@/pickers/rcal/RCalPopover'
import { AriaDatePicker } from '@/pickers/aria/AriaDatePicker'
import { LibraryCard } from '@/components/ui/LibraryCard'
import '@/pickers/rcal/rcal.css'
import '../pickers/mui/muiLocales'

// --- MUI ---
// 기본적으로 month/year 뷰 변경 시 선택 날짜 유지됨
function MuiYearMonth() {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <MuiDatePickerComp value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}

// --- antd ---
// antd는 year/month 패널 조작 시 선택 날짜를 변경하지 않음
function AntdYearMonth() {
  return (
    <ConfigProvider locale={koKR} prefixCls="antd">
      <AntdDatePickerComp style={{ width: 200 }} />
    </ConfigProvider>
  )
}

// --- shadcn (react-day-picker v9) ---
// month 이동 시 selected 날짜는 유지됨 (onMonthChange ≠ onSelect)
function ShadcnYearMonth() {
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
        />
      </PopoverContent>
    </Popover>
  )
}

// --- react-calendar ---
// activeStartDate(현재 뷰)와 value(선택값)가 분리되어 있어 month 이동이 선택값에 영향 없음
function RCalYearMonth() {
  const [date, setDate] = useState<Date>()
  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger">
          📅 {date ? format(date, 'yyyy.MM.dd', { locale: ko }) : '날짜 선택'}
        </button>
      }
    >
      <Calendar2
        onChange={(d) => { if (d instanceof Date) setDate(d) }}
        value={date}
        locale="ko-KR"
      />
    </RCalPopover>
  )
}

const MUI_SNIPPET = `// MUI: year/month 뷰 변경과 선택 날짜(value)가 분리됨
// 헤더의 월/년 클릭 → 뷰만 변경, onChange는 날짜 선택 시만 호출
<DatePicker value={value} onChange={setValue} />`

const ANTD_SNIPPET = `// antd: year/month 패널은 뷰 탐색용
// 패널 전환이 선택된 날짜(value)를 변경하지 않음
<DatePicker style={{ width: 200 }} />`

const SHADCN_SNIPPET = `// react-day-picker v9: onMonthChange ≠ onSelect
// 월 이동(onMonthChange)은 선택 날짜(selected)에 영향 없음
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}      // 날짜 클릭 시만 호출
  onMonthChange={...}     // 월 이동 시 별도 콜백 (optional)
/>`

const RCAL_SNIPPET = `// react-calendar: activeStartDate(뷰)와 value(선택값) 완전 분리
// 앞/뒤 이동은 activeStartDate만 변경, value 유지
<Calendar
  onChange={(d) => setDate(d as Date)}  // 날짜 클릭 시만
  value={date}
  activeStartDate={viewDate}            // 뷰 제어 (optional)
/>`

export function YearMonthSection() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>📆 Year/Month 조작</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          연·월을 변경할 때 선택된 날짜가 유지되는지 확인 — antd 기반 구현의 문제점 중 하나
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="뷰 변경 ≠ 선택 날짜 변경" code={MUI_SNIPPET}>
          <MuiYearMonth />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="패널 전환이 선택값 미변경" code={ANTD_SNIPPET}>
          <AntdYearMonth />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="onMonthChange ≠ onSelect" code={SHADCN_SNIPPET}>
          <ShadcnYearMonth />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="activeStartDate / value 분리" code={RCAL_SNIPPET}>
          <RCalYearMonth />
        </LibraryCard>
        <LibraryCard name="React Aria" version="뷰 탐색과 선택값 분리" code={`// React Aria: focusedValue(뷰)와 value(선택값) 완전 분리
// 월 이동 버튼은 focusedValue만 변경
<DatePicker>
  <Group>
    <DateInput>
      {(segment) => <DateSegment segment={segment} />}
    </DateInput>
    <Button>📅</Button>
  </Group>
  <Popover>
    <Calendar>
      <Button slot="previous">‹</Button>  {/* 뷰만 이동 */}
      <Heading />
      <Button slot="next">›</Button>
      <CalendarGrid>
        {(date) => <CalendarCell date={date} />}  {/* 선택 시 onChange */}
      </CalendarGrid>
    </Calendar>
  </Popover>
</DatePicker>`}>
          <AriaDatePicker locale="ko" />
        </LibraryCard>
      </div>
    </div>
  )
}
