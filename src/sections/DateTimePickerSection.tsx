import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDateTimePicker } from '@/pickers/mui/MuiDateTimePicker'
import { AntdDateTimePicker } from '@/pickers/antd/AntdDateTimePicker'
import { ShadcnDateTimePicker } from '@/pickers/shadcn/ShadcnDateTimePicker'
import { RCalDateTimePicker } from '@/pickers/rcal/RCalDateTimePicker'
import { AriaDateTimePicker } from '@/pickers/aria/AriaDateTimePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS, ARIA_SNIPPETS } from '@/constants/code-snippets'

export function DateTimePickerSection() {
  const { locale } = useLocale()
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🕐 DateTimePicker</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>날짜 + 시간 선택 컴포넌트 비교</p>
      </div>
      <LocaleSwitcher />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="@mui/x-date-pickers v7" code={MUI_SNIPPETS.dateTimePicker}>
          <MuiDateTimePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="antd v5" code={ANTD_SNIPPETS.dateTimePicker}>
          <AntdDateTimePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="Calendar + time input" code={SHADCN_SNIPPETS.dateTimePicker}>
          <ShadcnDateTimePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="v5 + react-time-picker" code={RCAL_SNIPPETS.dateTimePicker}>
          <RCalDateTimePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="React Aria" version="react-aria-components v1" code={ARIA_SNIPPETS.dateTimePicker}>
          <AriaDateTimePicker locale={locale} />
        </LibraryCard>
      </div>
    </div>
  )
}
