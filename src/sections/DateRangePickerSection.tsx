import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDateRangePicker } from '@/pickers/mui/MuiDateRangePicker'
import { AntdDateRangePicker } from '@/pickers/antd/AntdDateRangePicker'
import { ShadcnDateRangePicker } from '@/pickers/shadcn/ShadcnDateRangePicker'
import { RCalDateRangePicker } from '@/pickers/rcal/RCalDateRangePicker'
import { AriaDateRangePicker } from '@/pickers/aria/AriaDateRangePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS, ARIA_SNIPPETS } from '@/constants/code-snippets'

export function DateRangePickerSection() {
  const { locale } = useLocale()
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>📆 DateRangePicker</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>날짜 범위(시작일 ~ 종료일) 선택 컴포넌트 비교</p>
      </div>
      <LocaleSwitcher />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="@mui/x-date-pickers-pro v7" code={MUI_SNIPPETS.dateRangePicker}>
          <MuiDateRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="antd v5 RangePicker" code={ANTD_SNIPPETS.dateRangePicker}>
          <AntdDateRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="Calendar mode=range" code={SHADCN_SNIPPETS.dateRangePicker}>
          <ShadcnDateRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="v5 selectRange" code={RCAL_SNIPPETS.dateRangePicker}>
          <RCalDateRangePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="React Aria" version="react-aria-components v1" code={ARIA_SNIPPETS.dateRangePicker}>
          <AriaDateRangePicker locale={locale} />
        </LibraryCard>
      </div>
    </div>
  )
}
