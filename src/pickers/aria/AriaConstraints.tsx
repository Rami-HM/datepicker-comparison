import {
  DatePicker,
  Group,
  Button,
  Popover,
  Dialog,
  Calendar,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarCell,
  Heading,
  DateInput,
  DateSegment,
  I18nProvider,
} from 'react-aria-components'
import { today, getLocalTimeZone, isWeekend } from '@internationalized/date'
import './aria.css'

const tz = getLocalTimeZone()
const minValue = today(tz)
const maxValue = minValue.add({ days: 30 })

function AriaCalendar() {
  return (
    <Calendar>
      <header className="aria-cal-header">
        <Button slot="previous" className="aria-nav-btn">‹</Button>
        <Heading className="aria-cal-heading" />
        <Button slot="next" className="aria-nav-btn">›</Button>
      </header>
      <CalendarGrid className="aria-cal-grid">
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell className="aria-header-cell">{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} className="aria-cell" />}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  )
}

export function AriaDateConstraints() {
  return (
    <I18nProvider locale="ko-KR">
      <DatePicker
        minValue={minValue}
        maxValue={maxValue}
        isDateUnavailable={(d) => isWeekend(d, 'ko-KR')}
      >
        <Group className="aria-group">
          <DateInput className="aria-dateinput">
            {(segment) => <DateSegment segment={segment} className="aria-segment" />}
          </DateInput>
          <Button className="aria-cal-btn">📅</Button>
        </Group>
        <Popover className="aria-popover">
          <Dialog>
            <AriaCalendar />
          </Dialog>
        </Popover>
      </DatePicker>
    </I18nProvider>
  )
}

export function AriaTimeConstraints() {
  const minTime = today(tz).toDate(tz)
  minTime.setHours(9, 0, 0, 0)
  const maxTime = today(tz).toDate(tz)
  maxTime.setHours(18, 0, 0, 0)

  return (
    <I18nProvider locale="ko-KR">
      <DatePicker granularity="minute">
        <Group className="aria-group">
          <DateInput className="aria-dateinput">
            {(segment) => <DateSegment segment={segment} className="aria-segment" />}
          </DateInput>
          <Button className="aria-cal-btn">📅</Button>
        </Group>
        <Popover className="aria-popover">
          <Dialog>
            <AriaCalendar />
            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: 8, paddingTop: 6, fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
              시간 세그먼트에서 직접 입력 (09~18시)
            </div>
          </Dialog>
        </Popover>
      </DatePicker>
    </I18nProvider>
  )
}
