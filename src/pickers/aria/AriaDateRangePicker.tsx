import {
  DateRangePicker,
  Group,
  Button,
  Popover,
  Dialog,
  RangeCalendar,
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
import { SupportedLocale } from '@/contexts/LocaleContext'
import './aria.css'

const LOCALES: Record<SupportedLocale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
}

export function AriaDateRangePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <I18nProvider locale={LOCALES[locale]}>
      <DateRangePicker>
        <Group className="aria-range-group">
          <DateInput slot="start" className="aria-dateinput">
            {(segment) => <DateSegment segment={segment} className="aria-segment" />}
          </DateInput>
          <span aria-hidden className="aria-range-sep">~</span>
          <DateInput slot="end" className="aria-dateinput">
            {(segment) => <DateSegment segment={segment} className="aria-segment" />}
          </DateInput>
          <Button className="aria-cal-btn">📅</Button>
        </Group>
        <Popover className="aria-popover">
          <Dialog>
            <RangeCalendar>
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
            </RangeCalendar>
          </Dialog>
        </Popover>
      </DateRangePicker>
    </I18nProvider>
  )
}
