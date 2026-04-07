import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker as MuiDateTimePickerComp } from '@mui/x-date-pickers/DateTimePicker'
import { Dayjs } from 'dayjs'
import { DatePicker as AntdDatePickerComp, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import { LibraryCard } from '@/components/ui/LibraryCard'
import '../pickers/mui/muiLocales'

const STEP = 30

// --- MUI: minutesStep prop 네이티브 지원 ---
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

// --- antd: minuteStep prop 네이티브 지원 ---
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

function NotSupported() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      color: '#9ca3af',
    }}>
      <span style={{ fontSize: 24 }}>—</span>
      <span style={{ fontSize: 12 }}>지원 안함</span>
    </div>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="minutesStep prop ✅" code={`<DateTimePicker
  value={value}
  onChange={setValue}
  minutesStep={30}
/>`}>
          <MuiTimeStep />
        </LibraryCard>

        <LibraryCard name="Ant Design" version="minuteStep prop ✅" code={`<DatePicker
  showTime={{ minuteStep: 30 }}
/>`}>
          <AntdTimeStep />
        </LibraryCard>

        <LibraryCard name="shadcn/ui" version="지원 안함 ✕" code={`// react-day-picker: time step 미지원`}>
          <NotSupported />
        </LibraryCard>

        <LibraryCard name="react-calendar" version="지원 안함 ✕" code={`// react-time-picker: step prop 미지원`}>
          <NotSupported />
        </LibraryCard>

        <LibraryCard name="React Aria" version="지원 안함 ✕" code={`// TimeField: step prop 미지원`}>
          <NotSupported />
        </LibraryCard>
      </div>
    </div>
  )
}
