# DatePicker Comparison App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** MUI, Ant Design, shadcn/ui, react-calendar 4개 라이브러리의 DatePicker 계열 컴포넌트를 나란히 비교할 수 있는 React TypeScript SPA를 만든다.

**Architecture:** Vite + React 19 + TypeScript SPA. 좌측 사이드바로 6개 기능 섹션을 탐색하고, 메인 영역에 2×2 그리드로 4개 라이브러리 카드를 렌더링한다. Locale 상태는 React Context로 전역 공유, 날짜 선택 값은 각 섹션 로컬 state로 관리한다.

**Tech Stack:** Vite 6, React 19, TypeScript, React Router v7, Tailwind CSS v4, dayjs, @mui/x-date-pickers v7, antd v5, shadcn/ui, react-calendar v5, react-time-picker, react-syntax-highlighter, Vitest + React Testing Library

---

## File Map

```
src/
├── main.tsx
├── App.tsx
├── contexts/
│   └── LocaleContext.tsx
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── TopNav.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── LibraryCard.tsx
│       ├── CodeBlock.tsx
│       └── LocaleSwitcher.tsx
├── sections/
│   ├── DatePickerSection.tsx
│   ├── DateTimePickerSection.tsx
│   ├── DateRangePickerSection.tsx
│   ├── DateTimeRangeSection.tsx
│   ├── LocaleSection.tsx
│   └── ThemeSection.tsx
├── pickers/
│   ├── mui/
│   │   ├── MuiDatePicker.tsx
│   │   ├── MuiDateTimePicker.tsx
│   │   ├── MuiDateRangePicker.tsx
│   │   └── MuiDateTimeRangePicker.tsx
│   ├── antd/
│   │   ├── AntdDatePicker.tsx
│   │   ├── AntdDateTimePicker.tsx
│   │   ├── AntdDateRangePicker.tsx
│   │   └── AntdDateTimeRangePicker.tsx
│   ├── shadcn/
│   │   ├── ShadcnDatePicker.tsx
│   │   ├── ShadcnDateTimePicker.tsx
│   │   ├── ShadcnDateRangePicker.tsx
│   │   └── ShadcnDateTimeRangePicker.tsx
│   └── rcal/
│       ├── RCalDatePicker.tsx
│       ├── RCalDateTimePicker.tsx
│       ├── RCalDateRangePicker.tsx
│       └── RCalDateTimeRangePicker.tsx
├── constants/
│   └── code-snippets.ts
└── styles/
    └── index.css
```

---

## Task 1: Vite 프로젝트 스캐폴딩 + 의존성 설치

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1: 기존 디렉토리에 Vite 프로젝트 초기화**

```bash
cd /Users/ham/Workspace/datepicker-comparison
npm create vite@latest . -- --template react-ts
# "Current directory is not empty. Remove existing files and continue?" → y 선택
```

- [ ] **Step 2: 핵심 의존성 설치**

```bash
npm install react-router-dom@7 dayjs
```

- [ ] **Step 3: MUI 의존성 설치**

```bash
npm install @mui/x-date-pickers @mui/material @emotion/react @emotion/styled
```

- [ ] **Step 4: antd 설치**

```bash
npm install antd
```

- [ ] **Step 5: react-calendar + react-time-picker 설치**

```bash
npm install react-calendar react-time-picker
npm install --save-dev @types/react-calendar
```

- [ ] **Step 6: Radix UI Popover 설치 (react-calendar 트리거용)**

```bash
npm install @radix-ui/react-popover
```

- [ ] **Step 7: 코드 하이라이터 설치**

```bash
npm install react-syntax-highlighter
npm install --save-dev @types/react-syntax-highlighter
```

- [ ] **Step 8: Tailwind CSS v4 설치**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 9: 테스트 도구 설치**

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 10: vite.config.ts 작성**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 11: 테스트 setup 파일 생성**

```ts
// src/test-setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 12: tsconfig.json에 path alias 추가**

`tsconfig.json`의 `compilerOptions`에 추가:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 13: vercel.json 생성 (SPA fallback)**

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 14: 개발 서버 실행 확인**

```bash
npm run dev
```

Expected: `http://localhost:5173` 에서 Vite 기본 페이지가 열린다.

- [ ] **Step 15: 커밋**

```bash
git add -A
git commit -m "feat: scaffold Vite React TS project with all dependencies"
```

---

## Task 2: Tailwind CSS 설정 + 글로벌 스타일

**Files:**
- Create: `src/styles/index.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: src/styles/index.css 작성**

```css
/* src/styles/index.css */
@import "tailwindcss";

/* 앱 기본 폰트 */
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f9fafb;
  color: #111827;
}
```

- [ ] **Step 2: src/main.tsx에서 CSS import**

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { App } from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: 빌드 확인**

```bash
npm run build
```

Expected: `dist/` 생성, 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/styles/index.css src/main.tsx
git commit -m "feat: configure Tailwind CSS v4 and global styles"
```

---

## Task 3: LocaleContext

**Files:**
- Create: `src/contexts/LocaleContext.tsx`
- Create: `src/contexts/LocaleContext.test.tsx`

- [ ] **Step 1: 테스트 작성**

```tsx
// src/contexts/LocaleContext.test.tsx
import { renderHook, act } from '@testing-library/react'
import { LocaleProvider, useLocale } from './LocaleContext'

describe('LocaleContext', () => {
  it('기본 locale은 ko', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })
    expect(result.current.locale).toBe('ko')
  })

  it('setLocale로 locale 변경', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })
    act(() => {
      result.current.setLocale('en')
    })
    expect(result.current.locale).toBe('en')
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx vitest run src/contexts/LocaleContext.test.tsx
```

Expected: FAIL — `LocaleContext.tsx` 없음

- [ ] **Step 3: LocaleContext.tsx 구현**

```tsx
// src/contexts/LocaleContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

export type SupportedLocale = 'ko' | 'en' | 'ja'

interface LocaleContextValue {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<SupportedLocale>('ko')
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx vitest run src/contexts/LocaleContext.test.tsx
```

Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/contexts/
git commit -m "feat: add LocaleContext with ko/en/ja support"
```

---

## Task 4: 공유 UI 컴포넌트 — LibraryCard + CodeBlock

**Files:**
- Create: `src/components/ui/LibraryCard.tsx`
- Create: `src/components/ui/CodeBlock.tsx`
- Create: `src/components/ui/LibraryCard.test.tsx`
- Create: `src/components/ui/CodeBlock.test.tsx`

- [ ] **Step 1: LibraryCard 테스트 작성**

```tsx
// src/components/ui/LibraryCard.test.tsx
import { render, screen } from '@testing-library/react'
import { LibraryCard } from './LibraryCard'

describe('LibraryCard', () => {
  it('라이브러리명과 버전을 표시', () => {
    render(
      <LibraryCard name="MUI" version="v7" code="<DatePicker />">
        <div>picker</div>
      </LibraryCard>
    )
    expect(screen.getByText('MUI')).toBeInTheDocument()
    expect(screen.getByText('v7')).toBeInTheDocument()
    expect(screen.getByText('picker')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: CodeBlock 테스트 작성**

```tsx
// src/components/ui/CodeBlock.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  it('기본적으로 코드가 숨겨져 있다', () => {
    render(<CodeBlock code="const x = 1" />)
    expect(screen.getByText('코드 보기')).toBeInTheDocument()
    expect(screen.queryByText('const x = 1')).not.toBeInTheDocument()
  })

  it('토글 클릭 시 코드가 보인다', () => {
    render(<CodeBlock code="const x = 1" />)
    fireEvent.click(screen.getByText('코드 보기'))
    expect(screen.getByText('코드 닫기')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: 테스트 실패 확인**

```bash
npx vitest run src/components/ui/
```

Expected: FAIL

- [ ] **Step 4: LibraryCard.tsx 구현**

```tsx
// src/components/ui/LibraryCard.tsx
import { ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'

interface LibraryCardProps {
  name: string
  version: string
  code: string
  children: ReactNode
}

export function LibraryCard({ name, version, code, children }: LibraryCardProps) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{name}</span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{version}</span>
      </div>
      <div style={{
        padding: '24px 16px',
        minHeight: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  )
}
```

- [ ] **Step 5: CodeBlock.tsx 구현**

```tsx
// src/components/ui/CodeBlock.tsx
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '8px 16px',
          borderTop: '1px solid #f3f4f6',
          background: open ? '#f9fafb' : 'white',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: 11,
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {open ? '▼ 코드 닫기' : '▶ 코드 보기'}
      </button>
      {open && (
        <SyntaxHighlighter
          language="tsx"
          style={githubGist}
          customStyle={{ margin: 0, fontSize: 11, borderTop: '1px solid #e5e7eb' }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </>
  )
}
```

- [ ] **Step 6: 테스트 통과 확인**

```bash
npx vitest run src/components/ui/
```

Expected: PASS

- [ ] **Step 7: 커밋**

```bash
git add src/components/ui/
git commit -m "feat: add LibraryCard and CodeBlock shared components"
```

---

## Task 5: LocaleSwitcher + App Shell (TopNav, Sidebar, AppShell)

**Files:**
- Create: `src/components/ui/LocaleSwitcher.tsx`
- Create: `src/components/layout/TopNav.tsx`
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/AppShell.tsx`

- [ ] **Step 1: LocaleSwitcher.tsx 구현**

```tsx
// src/components/ui/LocaleSwitcher.tsx
import { useLocale, SupportedLocale } from '@/contexts/LocaleContext'

const LOCALES: { value: SupportedLocale; label: string }[] = [
  { value: 'ko', label: '🇰🇷 한국어' },
  { value: 'en', label: '🇺🇸 English' },
  { value: 'ja', label: '🇯🇵 日本語' },
]

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 12, color: '#6b7280' }}>언어:</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as SupportedLocale)}
        style={{
          fontSize: 12,
          padding: '4px 10px',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          background: 'white',
          color: '#374151',
          cursor: 'pointer',
        }}
      >
        {LOCALES.map((l) => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
    </div>
  )
}
```

- [ ] **Step 2: TopNav.tsx 구현**

```tsx
// src/components/layout/TopNav.tsx

const LIBRARY_BADGES = [
  { label: 'MUI v7', bg: '#e3f2fd', color: '#1565c0' },
  { label: 'antd v5', bg: '#fff7e6', color: '#d46b08' },
  { label: 'shadcn/ui', bg: '#f3f4f6', color: '#374151' },
  { label: 'react-calendar v5', bg: '#fef3c7', color: '#b45309' },
]

export function TopNav() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: 56,
      borderBottom: '1px solid #e5e7eb',
      background: 'white',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28,
          background: '#2563eb',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 14,
        }}>📅</div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1d4ed8' }}>
          DatePicker Comparison
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {LIBRARY_BADGES.map((b) => (
          <span
            key={b.label}
            style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 12,
              fontWeight: 500, background: b.bg, color: b.color,
            }}
          >
            {b.label}
          </span>
        ))}
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Sidebar.tsx 구현**

```tsx
// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'DatePicker', icon: '📅' },
  { to: '/date-time-picker', label: 'DateTimePicker', icon: '🕐' },
  { to: '/date-range-picker', label: 'DateRangePicker', icon: '📆' },
  { to: '/date-time-range-picker', label: 'DateTimeRange', icon: '🕑' },
  { to: '/locale', label: 'Locale', icon: '🌐' },
  { to: '/theme', label: 'Theme', icon: '🎨' },
]

export function Sidebar() {
  return (
    <nav style={{
      width: 210,
      borderRight: '1px solid #e5e7eb',
      padding: '16px 12px',
      flexShrink: 0,
      background: 'white',
      overflowY: 'auto',
    }}>
      <p style={{
        fontSize: 10, fontWeight: 600, color: '#9ca3af',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '0 8px', marginBottom: 8,
      }}>
        기능 비교
      </p>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 8px',
            borderRadius: 6,
            fontSize: 13,
            textDecoration: 'none',
            marginBottom: 2,
            background: isActive ? '#eff6ff' : 'transparent',
            color: isActive ? '#1d4ed8' : '#6b7280',
            fontWeight: isActive ? 600 : 400,
          })}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
```

- [ ] **Step 4: AppShell.tsx 구현**

```tsx
// src/components/layout/AppShell.tsx
import { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#f9fafb' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: App.tsx에 라우터 연결 (섹션 placeholder 포함)**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { AppShell } from '@/components/layout/AppShell'

// placeholder — 이후 Task에서 실제 섹션으로 교체
const Placeholder = ({ name }: { name: string }) => (
  <div style={{ color: '#9ca3af', fontSize: 14 }}>{name} (coming soon)</div>
)

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Placeholder name="DatePicker" />} />
            <Route path="/date-time-picker" element={<Placeholder name="DateTimePicker" />} />
            <Route path="/date-range-picker" element={<Placeholder name="DateRangePicker" />} />
            <Route path="/date-time-range-picker" element={<Placeholder name="DateTimeRangePicker" />} />
            <Route path="/locale" element={<Placeholder name="Locale" />} />
            <Route path="/theme" element={<Placeholder name="Theme" />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </LocaleProvider>
  )
}
```

- [ ] **Step 6: 개발 서버에서 레이아웃 확인**

```bash
npm run dev
```

Expected: 사이드바와 TopNav가 있는 앱 셸이 렌더링, 사이드바 링크 클릭 시 URL 변경

- [ ] **Step 7: 커밋**

```bash
git add src/components/ src/App.tsx
git commit -m "feat: add AppShell, Sidebar, TopNav, LocaleSwitcher"
```

---

## Task 6: 코드 스니펫 상수

**Files:**
- Create: `src/constants/code-snippets.ts`

- [ ] **Step 1: code-snippets.ts 작성**

```ts
// src/constants/code-snippets.ts

export const MUI_SNIPPETS = {
  datePicker: `import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ko'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DatePicker />
</LocalizationProvider>`,

  dateTimePicker: `import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DateTimePicker />
</LocalizationProvider>`,

  dateRangePicker: `import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DateRangePicker />
</LocalizationProvider>`,

  dateTimeRangePicker: `import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
  <DateTimeRangePicker />
</LocalizationProvider>`,
}

export const ANTD_SNIPPETS = {
  datePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'

<ConfigProvider locale={koKR} prefixCls="antd">
  <DatePicker style={{ width: 200 }} />
</ConfigProvider>`,

  dateTimePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'

<ConfigProvider locale={koKR} prefixCls="antd">
  <DatePicker showTime style={{ width: 220 }} />
</ConfigProvider>`,

  dateRangePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
const { RangePicker } = DatePicker

<ConfigProvider locale={koKR} prefixCls="antd">
  <RangePicker />
</ConfigProvider>`,

  dateTimeRangePicker: `import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
const { RangePicker } = DatePicker

<ConfigProvider locale={koKR} prefixCls="antd">
  <RangePicker showTime />
</ConfigProvider>`,
}

export const SHADCN_SNIPPETS = {
  datePicker: `// shadcn/ui: Calendar + Popover 조합
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date>()
const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? format(date, 'PPP', { locale: ko }) : '날짜 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar
      mode="single"
      selected={date}
      onSelect={(d) => { setDate(d); setOpen(false) }}
      locale={ko}
    />
  </PopoverContent>
</Popover>`,

  dateTimePicker: `// shadcn/ui: Calendar + Popover + time input 조합
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date>()
const [time, setTime] = useState('00:00')

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? \`\${format(date, 'PPP', { locale: ko })} \${time}\` : '날짜·시간 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="single" selected={date} onSelect={setDate} locale={ko} />
    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
  </PopoverContent>
</Popover>`,

  dateRangePicker: `// shadcn/ui: Calendar range mode
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [range, setRange] = useState<DateRange>()

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {range?.from
        ? \`\${format(range.from, 'PP', { locale: ko })} ~ \${range.to ? format(range.to, 'PP', { locale: ko }) : '?'}\`
        : '기간 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="range" selected={range} onSelect={setRange} locale={ko} />
  </PopoverContent>
</Popover>`,

  dateTimeRangePicker: `// shadcn/ui: Calendar range + 2× time input 조합
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [range, setRange] = useState<DateRange>()
const [startTime, setStartTime] = useState('00:00')
const [endTime, setEndTime] = useState('23:59')

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {range?.from
        ? \`\${format(range.from, 'PP', { locale: ko })} \${startTime} ~ \${range.to ? format(range.to, 'PP', { locale: ko }) : '?'} \${endTime}\`
        : '기간·시간 선택'}
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="range" selected={range} onSelect={setRange} locale={ko} />
    <div>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <span> ~ </span>
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
    </div>
  </PopoverContent>
</Popover>`,
}

export const RCAL_SNIPPETS = {
  datePicker: `// react-calendar v5: Input 트리거 + Popover 조합
import { useState } from 'react'
import Calendar from 'react-calendar'
import * as Popover from '@radix-ui/react-popover'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const [date, setDate] = useState<Date>()

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">
      📅 {date ? format(date, 'yyyy.MM.dd', { locale: ko }) : '날짜 선택'}
    </button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar
      onChange={(d) => setDate(d as Date)}
      value={date}
      locale="ko-KR"
    />
  </Popover.Content>
</Popover.Root>`,

  dateTimePicker: `// react-calendar v5 + react-time-picker 조합
import { useState } from 'react'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import * as Popover from '@radix-ui/react-popover'
import 'react-calendar/dist/Calendar.css'
import 'react-time-picker/dist/TimePicker.css'

const [date, setDate] = useState<Date>()
const [time, setTime] = useState<string>('00:00')

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">
      📅 {date ? \`\${format(date)} \${time}\` : '날짜·시간 선택'}
    </button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar onChange={(d) => setDate(d as Date)} value={date} locale="ko-KR" />
    <TimePicker onChange={setTime} value={time} />
  </Popover.Content>
</Popover.Root>`,

  dateRangePicker: `// react-calendar v5: selectRange prop 사용
import { useState } from 'react'
import Calendar from 'react-calendar'
import * as Popover from '@radix-ui/react-popover'
import 'react-calendar/dist/Calendar.css'

type Range = [Date, Date] | null

const [range, setRange] = useState<Range>(null)

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">
      📅 {range ? \`\${format(range[0])} ~ \${format(range[1])}\` : '기간 선택'}
    </button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar
      selectRange
      onChange={(val) => setRange(val as [Date, Date])}
      value={range}
      locale="ko-KR"
    />
  </Popover.Content>
</Popover.Root>`,

  dateTimeRangePicker: `// react-calendar v5 + 2× react-time-picker
import { useState } from 'react'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import * as Popover from '@radix-ui/react-popover'

type Range = [Date, Date] | null

const [range, setRange] = useState<Range>(null)
const [startTime, setStartTime] = useState('00:00')
const [endTime, setEndTime] = useState('23:59')

<Popover.Root>
  <Popover.Trigger asChild>
    <button className="rcal-trigger">기간·시간 선택</button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar
      selectRange
      onChange={(val) => setRange(val as [Date, Date])}
      value={range}
      locale="ko-KR"
    />
    <div>
      <TimePicker onChange={setStartTime} value={startTime} />
      <span> ~ </span>
      <TimePicker onChange={setEndTime} value={endTime} />
    </div>
  </Popover.Content>
</Popover.Root>`,
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/constants/
git commit -m "feat: add code snippet constants for all 4 libraries"
```

---

## Task 7: MUI Pickers 구현

**Files:**
- Create: `src/pickers/mui/MuiDatePicker.tsx`
- Create: `src/pickers/mui/MuiDateTimePicker.tsx`
- Create: `src/pickers/mui/MuiDateRangePicker.tsx`
- Create: `src/pickers/mui/MuiDateTimeRangePicker.tsx`
- Create: `src/pickers/mui/MuiDatePicker.test.tsx`

> **주의:** MUI DateRangePicker/DateTimeRangePicker는 `@mui/x-date-pickers-pro`에 있다. 무료 라이선스로 사용하려면 `<LicenseInfo>` 없이 사용하는 community 버전을 쓰거나 DatePicker 2개로 구성한다. 이 플랜에서는 `@mui/x-date-pickers`의 `MultiInputDateRangeField` 방식으로 구현한다.

- [ ] **Step 1: @mui/x-date-pickers-pro 설치**

```bash
npm install @mui/x-date-pickers-pro
```

- [ ] **Step 2: smoke 테스트 작성**

```tsx
// src/pickers/mui/MuiDatePicker.test.tsx
import { render } from '@testing-library/react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MuiDatePicker } from './MuiDatePicker'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
    {children}
  </LocalizationProvider>
)

describe('MuiDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<MuiDatePicker locale="ko" />, { wrapper })).not.toThrow()
  })
})
```

- [ ] **Step 3: 테스트 실패 확인**

```bash
npx vitest run src/pickers/mui/MuiDatePicker.test.tsx
```

Expected: FAIL

- [ ] **Step 4: MuiDatePicker.tsx 구현**

```tsx
// src/pickers/mui/MuiDatePicker.tsx
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/ko'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import { SupportedLocale } from '@/contexts/LocaleContext'

interface Props {
  locale: SupportedLocale
}

export function MuiDatePicker({ locale }: Props) {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
```

- [ ] **Step 5: MuiDateTimePicker.tsx 구현**

```tsx
// src/pickers/mui/MuiDateTimePicker.tsx
import { useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { SupportedLocale } from '@/contexts/LocaleContext'

export function MuiDateTimePicker({ locale }: { locale: SupportedLocale }) {
  const [value, setValue] = useState<Dayjs | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
```

- [ ] **Step 6: MuiDateRangePicker.tsx 구현**

```tsx
// src/pickers/mui/MuiDateRangePicker.tsx
import { useState } from 'react'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRange } from '@mui/x-date-pickers-pro/models'
import { Dayjs } from 'dayjs'
import { SupportedLocale } from '@/contexts/LocaleContext'

export function MuiDateRangePicker({ locale }: { locale: SupportedLocale }) {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateRangePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
```

- [ ] **Step 7: MuiDateTimeRangePicker.tsx 구현**

```tsx
// src/pickers/mui/MuiDateTimeRangePicker.tsx
import { useState } from 'react'
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRange } from '@mui/x-date-pickers-pro/models'
import { Dayjs } from 'dayjs'
import { SupportedLocale } from '@/contexts/LocaleContext'

export function MuiDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimeRangePicker value={value} onChange={setValue} />
    </LocalizationProvider>
  )
}
```

- [ ] **Step 8: 테스트 통과 확인**

```bash
npx vitest run src/pickers/mui/
```

Expected: PASS

- [ ] **Step 9: 커밋**

```bash
git add src/pickers/mui/
git commit -m "feat: add MUI datepicker components (DatePicker, DateTime, Range, DateTimeRange)"
```

---

## Task 8: antd Pickers 구현

**Files:**
- Create: `src/pickers/antd/AntdDatePicker.tsx`
- Create: `src/pickers/antd/AntdDateTimePicker.tsx`
- Create: `src/pickers/antd/AntdDateRangePicker.tsx`
- Create: `src/pickers/antd/AntdDateTimeRangePicker.tsx`
- Create: `src/pickers/antd/AntdDatePicker.test.tsx`

- [ ] **Step 1: smoke 테스트 작성**

```tsx
// src/pickers/antd/AntdDatePicker.test.tsx
import { render } from '@testing-library/react'
import { AntdDatePicker } from './AntdDatePicker'

describe('AntdDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<AntdDatePicker locale="ko" />)).not.toThrow()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx vitest run src/pickers/antd/AntdDatePicker.test.tsx
```

Expected: FAIL

- [ ] **Step 3: AntdDatePicker.tsx 구현**

```tsx
// src/pickers/antd/AntdDatePicker.tsx
import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import { Locale } from 'antd/lib/locale'
import { SupportedLocale } from '@/contexts/LocaleContext'

const ANTD_LOCALES: Record<SupportedLocale, Locale> = {
  ko: koKR,
  en: enUS,
  ja: jaJP,
}

export function AntdDatePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <DatePicker style={{ width: 200 }} />
    </ConfigProvider>
  )
}
```

- [ ] **Step 4: AntdDateTimePicker.tsx 구현**

```tsx
// src/pickers/antd/AntdDateTimePicker.tsx
import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import { Locale } from 'antd/lib/locale'
import { SupportedLocale } from '@/contexts/LocaleContext'

const ANTD_LOCALES: Record<SupportedLocale, Locale> = { ko: koKR, en: enUS, ja: jaJP }

export function AntdDateTimePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <DatePicker showTime style={{ width: 220 }} />
    </ConfigProvider>
  )
}
```

- [ ] **Step 5: AntdDateRangePicker.tsx 구현**

```tsx
// src/pickers/antd/AntdDateRangePicker.tsx
import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import { Locale } from 'antd/lib/locale'
import { SupportedLocale } from '@/contexts/LocaleContext'

const { RangePicker } = DatePicker
const ANTD_LOCALES: Record<SupportedLocale, Locale> = { ko: koKR, en: enUS, ja: jaJP }

export function AntdDateRangePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <RangePicker />
    </ConfigProvider>
  )
}
```

- [ ] **Step 6: AntdDateTimeRangePicker.tsx 구현**

```tsx
// src/pickers/antd/AntdDateTimeRangePicker.tsx
import { DatePicker, ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import { Locale } from 'antd/lib/locale'
import { SupportedLocale } from '@/contexts/LocaleContext'

const { RangePicker } = DatePicker
const ANTD_LOCALES: Record<SupportedLocale, Locale> = { ko: koKR, en: enUS, ja: jaJP }

export function AntdDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  return (
    <ConfigProvider locale={ANTD_LOCALES[locale]} prefixCls="antd">
      <RangePicker showTime />
    </ConfigProvider>
  )
}
```

- [ ] **Step 7: 테스트 통과 확인**

```bash
npx vitest run src/pickers/antd/
```

Expected: PASS

- [ ] **Step 8: 커밋**

```bash
git add src/pickers/antd/
git commit -m "feat: add antd datepicker components with locale support"
```

---

## Task 9: shadcn/ui 설정 + Pickers 구현

**Files:**
- Create: `components.json` (shadcn 설정)
- Create: `src/components/ui/calendar.tsx` (shadcn CLI로 생성)
- Create: `src/components/ui/popover.tsx` (shadcn CLI로 생성)
- Create: `src/components/ui/button.tsx` (shadcn CLI로 생성)
- Create: `src/pickers/shadcn/ShadcnDatePicker.tsx`
- Create: `src/pickers/shadcn/ShadcnDateTimePicker.tsx`
- Create: `src/pickers/shadcn/ShadcnDateRangePicker.tsx`
- Create: `src/pickers/shadcn/ShadcnDateTimeRangePicker.tsx`
- Create: `src/pickers/shadcn/ShadcnDatePicker.test.tsx`

- [ ] **Step 1: date-fns 설치 (shadcn Calendar 의존성)**

```bash
npm install date-fns
```

- [ ] **Step 2: shadcn/ui 초기화**

```bash
npx shadcn@latest init
```

프롬프트 응답:
- Style: Default
- Base color: Blue  
- CSS variables: Yes

- [ ] **Step 3: shadcn 컴포넌트 추가**

```bash
npx shadcn@latest add calendar popover button
```

Expected: `src/components/ui/calendar.tsx`, `popover.tsx`, `button.tsx` 생성됨

- [ ] **Step 4: smoke 테스트 작성**

```tsx
// src/pickers/shadcn/ShadcnDatePicker.test.tsx
import { render } from '@testing-library/react'
import { ShadcnDatePicker } from './ShadcnDatePicker'

describe('ShadcnDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<ShadcnDatePicker locale="ko" />)).not.toThrow()
  })
})
```

- [ ] **Step 5: 테스트 실패 확인**

```bash
npx vitest run src/pickers/shadcn/ShadcnDatePicker.test.tsx
```

Expected: FAIL

- [ ] **Step 6: ShadcnDatePicker.tsx 구현**

```tsx
// src/pickers/shadcn/ShadcnDatePicker.tsx
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDatePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 180 }}>
          📅 {date ? format(date, 'yyyy.MM.dd', { locale: fnsLocale }) : '날짜 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => { setDate(d); setOpen(false) }}
          locale={fnsLocale}
        />
      </PopoverContent>
    </Popover>
  )
}
```

- [ ] **Step 7: ShadcnDateTimePicker.tsx 구현**

```tsx
// src/pickers/shadcn/ShadcnDateTimePicker.tsx
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDateTimePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('00:00')
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: fnsLocale })} ${time}` : '날짜·시간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fnsLocale}
        />
        <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb' }}>
          <label style={{ fontSize: 12, color: '#6b7280', marginRight: 8 }}>시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

- [ ] **Step 8: ShadcnDateRangePicker.tsx 구현**

```tsx
// src/pickers/shadcn/ShadcnDateRangePicker.tsx
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDateRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<DateRange>()
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 240 }}>
          📆 {range?.from ? `${fmt(range.from)} ~ ${range.to ? fmt(range.to) : '?'}` : '기간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          locale={fnsLocale}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
```

- [ ] **Step 9: ShadcnDateTimeRangePicker.tsx 구현**

```tsx
// src/pickers/shadcn/ShadcnDateTimeRangePicker.tsx
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }

export function ShadcnDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<DateRange>()
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('23:59')
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{ minWidth: 280 }}>
          🕑 {range?.from
            ? `${fmt(range.from)} ${startTime} ~ ${range.to ? fmt(range.to) : '?'} ${endTime}`
            : '기간·시간 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: 'auto', padding: 0 }}>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          locale={fnsLocale}
          numberOfMonths={2}
        />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderTop: '1px solid #e5e7eb',
        }}>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
          <span style={{ color: '#9ca3af' }}>~</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ fontSize: 13, border: '1px solid #d1d5db', borderRadius: 4, padding: '2px 6px' }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

- [ ] **Step 10: 테스트 통과 확인**

```bash
npx vitest run src/pickers/shadcn/
```

Expected: PASS

- [ ] **Step 11: 커밋**

```bash
git add src/pickers/shadcn/ src/components/ui/calendar.tsx src/components/ui/popover.tsx src/components/ui/button.tsx components.json
git commit -m "feat: add shadcn/ui datepicker components (Calendar+Popover composition)"
```

---

## Task 10: react-calendar Pickers 구현

**Files:**
- Create: `src/pickers/rcal/RCalDatePicker.tsx`
- Create: `src/pickers/rcal/RCalDateTimePicker.tsx`
- Create: `src/pickers/rcal/RCalDateRangePicker.tsx`
- Create: `src/pickers/rcal/RCalDateTimeRangePicker.tsx`
- Create: `src/pickers/rcal/RCalPopover.tsx`
- Create: `src/pickers/rcal/rcal.css`
- Create: `src/pickers/rcal/RCalDatePicker.test.tsx`

- [ ] **Step 1: smoke 테스트 작성**

```tsx
// src/pickers/rcal/RCalDatePicker.test.tsx
import { render } from '@testing-library/react'
import { RCalDatePicker } from './RCalDatePicker'

describe('RCalDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<RCalDatePicker locale="ko" />)).not.toThrow()
  })
})
```

- [ ] **Step 2: rcal.css 작성 (react-calendar 스타일 scoped)**

```css
/* src/pickers/rcal/rcal.css */
/* react-calendar CSS를 .rcal-scope 내부로 스코프 처리 */
.rcal-scope .react-calendar {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
}
.rcal-scope .react-calendar__navigation button {
  font-size: 13px;
  font-weight: 600;
}
.rcal-scope .react-calendar__tile--active {
  background: #2563eb;
  color: white;
  border-radius: 4px;
}
.rcal-scope .react-calendar__tile--rangeStart,
.rcal-scope .react-calendar__tile--rangeEnd {
  background: #2563eb;
  color: white;
}
.rcal-scope .react-calendar__tile--rangeBetween {
  background: #dbeafe;
  color: #1e40af;
}

.rcal-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border: 1.5px solid #2563eb;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  cursor: pointer;
  min-width: 180px;
}
.rcal-trigger:hover {
  background: #eff6ff;
}
```

- [ ] **Step 3: RCalPopover.tsx 구현 (공통 Popover 래퍼)**

```tsx
// src/pickers/rcal/RCalPopover.tsx
import { ReactNode } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

interface RCalPopoverProps {
  trigger: ReactNode
  children: ReactNode
}

export function RCalPopover({ trigger, children }: RCalPopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align="start"
          sideOffset={4}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: 50,
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div className="rcal-scope">{children}</div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
```

- [ ] **Step 4: RCalDatePicker.tsx 구현**

```tsx
// src/pickers/rcal/RCalDatePicker.tsx
import { useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDatePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger">
          📅 {date ? format(date, 'yyyy.MM.dd', { locale: fnsLocale }) : '날짜 선택'}
        </button>
      }
    >
      <Calendar
        onChange={(d) => setDate(d as Date)}
        value={date}
        locale={CAL_LOCALES[locale]}
      />
    </RCalPopover>
  )
}
```

- [ ] **Step 5: RCalDateTimePicker.tsx 구현**

```tsx
// src/pickers/rcal/RCalDateTimePicker.tsx
import { useState } from 'react'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'
import 'react-time-picker/dist/TimePicker.css'

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDateTimePicker({ locale }: { locale: SupportedLocale }) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('00:00')
  const fnsLocale = DATE_FNS_LOCALES[locale]

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 220 }}>
          🕐 {date ? `${format(date, 'yyyy.MM.dd', { locale: fnsLocale })} ${time}` : '날짜·시간 선택'}
        </button>
      }
    >
      <Calendar
        onChange={(d) => setDate(d as Date)}
        value={date}
        locale={CAL_LOCALES[locale]}
      />
      <div style={{ padding: '8px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>시간</span>
        <TimePicker onChange={(v) => setTime(v as string)} value={time} disableClock clearIcon={null} />
      </div>
    </RCalPopover>
  )
}
```

- [ ] **Step 6: RCalDateRangePicker.tsx 구현**

```tsx
// src/pickers/rcal/RCalDateRangePicker.tsx
import { useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'

type Range = [Date, Date] | null

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDateRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<Range>(null)
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 240 }}>
          📆 {range ? `${fmt(range[0])} ~ ${fmt(range[1])}` : '기간 선택'}
        </button>
      }
    >
      <Calendar
        selectRange
        onChange={(val) => setRange(val as [Date, Date])}
        value={range}
        locale={CAL_LOCALES[locale]}
      />
    </RCalPopover>
  )
}
```

- [ ] **Step 7: RCalDateTimeRangePicker.tsx 구현**

```tsx
// src/pickers/rcal/RCalDateTimeRangePicker.tsx
import { useState } from 'react'
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'
import { format } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { SupportedLocale } from '@/contexts/LocaleContext'
import { RCalPopover } from './RCalPopover'
import './rcal.css'
import 'react-time-picker/dist/TimePicker.css'

type Range = [Date, Date] | null

const DATE_FNS_LOCALES: Record<SupportedLocale, Locale> = { ko, en: enUS, ja }
const CAL_LOCALES: Record<SupportedLocale, string> = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP' }

export function RCalDateTimeRangePicker({ locale }: { locale: SupportedLocale }) {
  const [range, setRange] = useState<Range>(null)
  const [startTime, setStartTime] = useState<string>('00:00')
  const [endTime, setEndTime] = useState<string>('23:59')
  const fnsLocale = DATE_FNS_LOCALES[locale]
  const fmt = (d: Date) => format(d, 'yyyy.MM.dd', { locale: fnsLocale })

  return (
    <RCalPopover
      trigger={
        <button className="rcal-trigger" style={{ minWidth: 280 }}>
          🕑 {range
            ? `${fmt(range[0])} ${startTime} ~ ${fmt(range[1])} ${endTime}`
            : '기간·시간 선택'}
        </button>
      }
    >
      <Calendar
        selectRange
        onChange={(val) => setRange(val as [Date, Date])}
        value={range}
        locale={CAL_LOCALES[locale]}
      />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderTop: '1px solid #e5e7eb',
      }}>
        <TimePicker onChange={(v) => setStartTime(v as string)} value={startTime} disableClock clearIcon={null} />
        <span style={{ color: '#9ca3af' }}>~</span>
        <TimePicker onChange={(v) => setEndTime(v as string)} value={endTime} disableClock clearIcon={null} />
      </div>
    </RCalPopover>
  )
}
```

- [ ] **Step 8: 테스트 통과 확인**

```bash
npx vitest run src/pickers/rcal/
```

Expected: PASS

- [ ] **Step 9: 커밋**

```bash
git add src/pickers/rcal/
git commit -m "feat: add react-calendar pickers with input trigger and Popover"
```

---

## Task 11: Section 페이지 구현

**Files:**
- Create: `src/sections/DatePickerSection.tsx`
- Create: `src/sections/DateTimePickerSection.tsx`
- Create: `src/sections/DateRangePickerSection.tsx`
- Create: `src/sections/DateTimeRangeSection.tsx`
- Create: `src/sections/LocaleSection.tsx`
- Create: `src/sections/ThemeSection.tsx`

> 각 섹션은 동일한 패턴: `LocaleSwitcher` + 2×2 `LibraryCard` 그리드

- [ ] **Step 1: DatePickerSection.tsx 구현**

```tsx
// src/sections/DatePickerSection.tsx
import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDatePicker } from '@/pickers/mui/MuiDatePicker'
import { AntdDatePicker } from '@/pickers/antd/AntdDatePicker'
import { ShadcnDatePicker } from '@/pickers/shadcn/ShadcnDatePicker'
import { RCalDatePicker } from '@/pickers/rcal/RCalDatePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS } from '@/constants/code-snippets'

export function DatePickerSection() {
  const { locale } = useLocale()
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>📅 DatePicker</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>기본 날짜 선택 컴포넌트 — 4개 라이브러리의 기본 스타일 비교</p>
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
      </div>
    </div>
  )
}
```

- [ ] **Step 2: DateTimePickerSection.tsx 구현**

```tsx
// src/sections/DateTimePickerSection.tsx
import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDateTimePicker } from '@/pickers/mui/MuiDateTimePicker'
import { AntdDateTimePicker } from '@/pickers/antd/AntdDateTimePicker'
import { ShadcnDateTimePicker } from '@/pickers/shadcn/ShadcnDateTimePicker'
import { RCalDateTimePicker } from '@/pickers/rcal/RCalDateTimePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS } from '@/constants/code-snippets'

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
      </div>
    </div>
  )
}
```

- [ ] **Step 3: DateRangePickerSection.tsx 구현**

```tsx
// src/sections/DateRangePickerSection.tsx
import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDateRangePicker } from '@/pickers/mui/MuiDateRangePicker'
import { AntdDateRangePicker } from '@/pickers/antd/AntdDateRangePicker'
import { ShadcnDateRangePicker } from '@/pickers/shadcn/ShadcnDateRangePicker'
import { RCalDateRangePicker } from '@/pickers/rcal/RCalDateRangePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS } from '@/constants/code-snippets'

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
      </div>
    </div>
  )
}
```

- [ ] **Step 4: DateTimeRangeSection.tsx 구현**

```tsx
// src/sections/DateTimeRangeSection.tsx
import { useLocale } from '@/contexts/LocaleContext'
import { LibraryCard } from '@/components/ui/LibraryCard'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { MuiDateTimeRangePicker } from '@/pickers/mui/MuiDateTimeRangePicker'
import { AntdDateTimeRangePicker } from '@/pickers/antd/AntdDateTimeRangePicker'
import { ShadcnDateTimeRangePicker } from '@/pickers/shadcn/ShadcnDateTimeRangePicker'
import { RCalDateTimeRangePicker } from '@/pickers/rcal/RCalDateTimeRangePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS } from '@/constants/code-snippets'

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
      </div>
    </div>
  )
}
```

- [ ] **Step 5: LocaleSection.tsx 구현**

```tsx
// src/sections/LocaleSection.tsx
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
```

- [ ] **Step 6: ThemeSection.tsx 구현**

```tsx
// src/sections/ThemeSection.tsx
import { LibraryCard } from '@/components/ui/LibraryCard'
import { MuiDatePicker } from '@/pickers/mui/MuiDatePicker'
import { AntdDatePicker } from '@/pickers/antd/AntdDatePicker'
import { ShadcnDatePicker } from '@/pickers/shadcn/ShadcnDatePicker'
import { RCalDatePicker } from '@/pickers/rcal/RCalDatePicker'
import { MUI_SNIPPETS, ANTD_SNIPPETS, SHADCN_SNIPPETS, RCAL_SNIPPETS } from '@/constants/code-snippets'

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
      </div>
    </div>
  )
}
```

- [ ] **Step 7: App.tsx 라우트를 실제 섹션으로 교체**

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { AppShell } from '@/components/layout/AppShell'
import { DatePickerSection } from '@/sections/DatePickerSection'
import { DateTimePickerSection } from '@/sections/DateTimePickerSection'
import { DateRangePickerSection } from '@/sections/DateRangePickerSection'
import { DateTimeRangeSection } from '@/sections/DateTimeRangeSection'
import { LocaleSection } from '@/sections/LocaleSection'
import { ThemeSection } from '@/sections/ThemeSection'

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<DatePickerSection />} />
            <Route path="/date-time-picker" element={<DateTimePickerSection />} />
            <Route path="/date-range-picker" element={<DateRangePickerSection />} />
            <Route path="/date-time-range-picker" element={<DateTimeRangeSection />} />
            <Route path="/locale" element={<LocaleSection />} />
            <Route path="/theme" element={<ThemeSection />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </LocaleProvider>
  )
}
```

- [ ] **Step 8: 개발 서버에서 전체 동작 확인**

```bash
npm run dev
```

Expected:
- 6개 섹션 모두 렌더링
- Locale 스위처 변경 시 모든 라이브러리 즉시 반영
- 코드 토글 클릭 시 코드 스니펫 표시/숨김
- react-calendar input 클릭 시 Popover로 캘린더 오픈

- [ ] **Step 9: 커밋**

```bash
git add src/sections/ src/App.tsx
git commit -m "feat: add all 6 comparison sections and wire up routes"
```

---

## Task 12: 빌드 최적화 + Vercel 배포

**Files:**
- Verify: `vercel.json`
- Verify: `vite.config.ts`

- [ ] **Step 1: 프로덕션 빌드 확인**

```bash
npm run build
```

Expected: `dist/` 생성, 에러 없음, 번들 크기 출력

- [ ] **Step 2: 로컬에서 프로덕션 빌드 미리보기**

```bash
npm run preview
```

Expected: `http://localhost:4173` 에서 프로덕션 빌드 동작 확인

- [ ] **Step 3: TypeScript 타입 오류 확인**

```bash
npx tsc --noEmit
```

Expected: 타입 오류 없음

- [ ] **Step 4: 전체 테스트 실행**

```bash
npx vitest run
```

Expected: 모든 테스트 PASS

- [ ] **Step 5: Vercel CLI 배포 (최초)**

```bash
npm install -g vercel
vercel
```

프롬프트:
- Set up and deploy: Y
- Which scope: (본인 계정 선택)
- Link to existing project: N
- Project name: datepicker-comparison
- Directory: ./
- Override settings: N

Expected: `https://datepicker-comparison-xxx.vercel.app` URL 출력

- [ ] **Step 6: 배포 URL에서 동작 확인**

브라우저에서 Vercel URL 열어 6개 섹션 모두 동작하는지 확인

- [ ] **Step 7: 최종 커밋**

```bash
git add -A
git commit -m "feat: complete datepicker comparison app"
```
