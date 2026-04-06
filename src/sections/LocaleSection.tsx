import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDatePicker } from '@/pickers/mui/MuiDatePicker'
import { AntdDatePicker } from '@/pickers/antd/AntdDatePicker'
import { ShadcnDatePicker } from '@/pickers/shadcn/ShadcnDatePicker'
import { RCalDatePicker } from '@/pickers/rcal/RCalDatePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS } from '@/constants/code-snippets'

export function LocaleSection() {
  const { locale } = useLocale()
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🌐 Locale</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          locale을 전환하면 4개 라이브러리 모두 즉시 반영됩니다.
        </p>
      </div>
      <LocaleSwitcher />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="adapterLocale prop" code={MUI_SNIPPETS.datePicker}>
          <MuiDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="ConfigProvider locale" code={ANTD_SNIPPETS.datePicker}>
          <AntdDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="date-fns locale" code={SHADCN_SNIPPETS.datePicker}>
          <ShadcnDatePicker locale={locale} />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="locale prop (IETF)" code={RCAL_SNIPPETS.datePicker}>
          <RCalDatePicker locale={locale} />
        </LibraryCard>
      </div>
    </div>
  )
}
