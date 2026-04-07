import { LibraryCard } from '@/components/ui/LibraryCard'
import { MuiDatePicker } from '@/pickers/mui/MuiDatePicker'
import { AntdDatePicker } from '@/pickers/antd/AntdDatePicker'
import { ShadcnDatePicker } from '@/pickers/shadcn/ShadcnDatePicker'
import { RCalDatePicker } from '@/pickers/rcal/RCalDatePicker'
import { AriaDatePicker } from '@/pickers/aria/AriaDatePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS, ARIA_SNIPPETS } from '@/constants/code-snippets'

export function ThemeSection() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🎨 Theme</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          각 라이브러리의 기본(default) 스타일 — 커스터마이징 없이 그대로 비교
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <LibraryCard name="MUI" version="Material Design 기본 테마" code={MUI_SNIPPETS.datePicker}>
          <MuiDatePicker locale="ko" />
        </LibraryCard>
        <LibraryCard name="Ant Design" version="Ant Design 기본 테마" code={ANTD_SNIPPETS.datePicker}>
          <AntdDatePicker locale="ko" />
        </LibraryCard>
        <LibraryCard name="shadcn/ui" version="shadcn 기본 테마 (blue)" code={SHADCN_SNIPPETS.datePicker}>
          <ShadcnDatePicker locale="ko" />
        </LibraryCard>
        <LibraryCard name="react-calendar" version="기본 CSS 스타일" code={RCAL_SNIPPETS.datePicker}>
          <RCalDatePicker locale="ko" />
        </LibraryCard>
        <LibraryCard name="React Aria" version="커스텀 CSS (headless)" code={ARIA_SNIPPETS.datePicker}>
          <AriaDatePicker locale="ko" />
        </LibraryCard>
      </div>
    </div>
  )
}
