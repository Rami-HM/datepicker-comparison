import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDateTimeRangePicker } from '@/pickers/mui/MuiDateTimeRangePicker'
import { AntdDateTimeRangePicker } from '@/pickers/antd/AntdDateTimeRangePicker'
import { ShadcnDateTimeRangePicker } from '@/pickers/shadcn/ShadcnDateTimeRangePicker'
import { RCalDateTimeRangePicker } from '@/pickers/rcal/RCalDateTimeRangePicker'
import { AriaDateTimeRangePicker } from '@/pickers/aria/AriaDateTimeRangePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS, ARIA_SNIPPETS } from '@/constants/code-snippets'

export function DateTimeRangeSection() {
  const { locale } = useLocale()
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🕑 DateTimeRangePicker</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>날짜+시간 범위 선택 컴포넌트 비교</p>
      </div>
      <LocaleSwitcher />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="@mui/x-date-pickers-pro v7" code={MUI_SNIPPETS.dateTimeRangePicker}>
          <MuiDateTimeRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="antd v5 RangePicker showTime" code={ANTD_SNIPPETS.dateTimeRangePicker}>
          <AntdDateTimeRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="Calendar range + 2× time input" code={SHADCN_SNIPPETS.dateTimeRangePicker}>
          <ShadcnDateTimeRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="v5 + 2× react-time-picker" code={RCAL_SNIPPETS.dateTimeRangePicker}>
          <RCalDateTimeRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="React Aria" version="react-aria-components v1" code={ARIA_SNIPPETS.dateTimeRangePicker}>
          <AriaDateTimeRangePicker locale={locale} />
        </LibraryCard>
      </div>
    </div>
  )
}
