import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDatePicker } from '@/pickers/mui/MuiDatePicker'
import { AntdDatePicker } from '@/pickers/antd/AntdDatePicker'
import { ShadcnDatePicker } from '@/pickers/shadcn/ShadcnDatePicker'
import { RCalDatePicker } from '@/pickers/rcal/RCalDatePicker'
import { AriaDatePicker } from '@/pickers/aria/AriaDatePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS, ARIA_SNIPPETS } from '@/constants/code-snippets'

export function DatePickerSection() {
  const { locale } = useLocale()
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>📅 DatePicker</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>기본 날짜 선택 컴포넌트 — 5개 라이브러리의 기본 스타일 비교</p>
      </div>
      <LocaleSwitcher />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="@mui/x-date-pickers v7" code={MUI_SNIPPETS.datePicker}>
          <MuiDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="antd v5" code={ANTD_SNIPPETS.datePicker}>
          <AntdDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="Calendar + Popover" code={SHADCN_SNIPPETS.datePicker}>
          <ShadcnDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="v5 + Radix Popover" code={RCAL_SNIPPETS.datePicker}>
          <RCalDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="React Aria" version="react-aria-components v1" code={ARIA_SNIPPETS.datePicker}>
          <AriaDatePicker locale={locale} />
        </LibraryCard>
      </div>
    </div>
  )
}
