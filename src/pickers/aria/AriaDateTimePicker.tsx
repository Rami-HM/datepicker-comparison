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
import { SupportedLocale } from '@/contexts/LocaleContext'
import './aria.css'

const LOCALES: Record<SupportedLocale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
}

export function AriaDateTimePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <I18nProvider locale={LOCALES[locale]}>
      <DatePicker granularity="minute">
        <Group className="aria-group">
          <DateInput className="aria-dateinput">
            {(segment) => <DateSegment segment={segment} className="aria-segment" />}
          </DateInput>
          <Button className="aria-cal-btn">📅</Button>
        </Group>
        <Popover className="aria-popover">
          <Dialog>
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
          </Dialog>
        </Popover>
      </DatePicker>
    </I18nProvider>
  )
}
