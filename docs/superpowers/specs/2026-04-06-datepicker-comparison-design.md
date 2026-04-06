# DatePicker Comparison App — Design Spec

**Date:** 2026-04-06  
**Status:** Approved

---

## Overview

React + TypeScript SPA로 MUI, Ant Design, shadcn/ui, react-calendar 4개 라이브러리의 날짜 관련 컴포넌트를 나란히 비교할 수 있는 내부 참고 도구. Vercel에 정적 배포.

---

## Goals

- 4개 라이브러리의 datepicker 계열 컴포넌트를 동일 조건에서 실시간 비교
- 각 컴포넌트 옆에 접을 수 있는 코드 스니펫 제공
- 한국어 기본, locale 스위처로 en/ja 전환 가능
- 개인/팀 내부 참고용 (공개 배포 X)

---

## Features (비교 대상 기능)

| 섹션 | 설명 |
|------|------|
| DatePicker | 기본 날짜 선택 |
| DateTimePicker | 날짜 + 시간 선택 |
| DateRangePicker | 시작일 ~ 종료일 선택 |
| DateTimeRangePicker | 날짜+시간 범위 선택 |
| Locale | locale 스위처(ko/en/ja)로 전환 비교 |
| Theme | 4개 라이브러리 기본(default) 스타일 비교 |

**모든 기능은 4개 라이브러리 모두 구현한다. 미지원 표시 없음.**  
- `react-calendar` DateTimePicker → `react-calendar` + `react-time-picker` 조합  
- `react-calendar` DateTimeRangePicker → `react-calendar` (selectRange) + `react-time-picker` × 2  
- `react-calendar` 전체 섹션 → input 클릭 시 Popover로 캘린더가 열리는 트리거 방식  
- `shadcn/ui` DateTime 계열 → `Calendar` + `Popover` + 커스텀 time input 조합

---

## UI Design

### Visual Style
이미지 참고 스타일 기준:
- 배경: 흰색 (`#ffffff`)
- Primary accent: `#2563eb` (파란색)
- Border: `#e5e7eb`
- 비활성 텍스트: `#9ca3af`
- 라이트 모드 고정 (다크 모드 없음)
- 폰트: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`

### Layout
```
┌─────────────────────────────────────────────────────┐
│ TopNav: 로고 | MUI v7  antd v5  shadcn  react-cal  │
├────────────┬────────────────────────────────────────┤
│  Sidebar   │  Main Content                          │
│  (210px)   │                                        │
│            │  [섹션 타이틀 + 설명]                   │
│  📅 DatePicker         │  [locale 스위처]            │
│  🕐 DateTimePicker     │                            │
│  📆 DateRangePicker    │  ┌──────┐  ┌──────┐       │
│  🕑 DateTimeRange      │  │ MUI  │  │ antd │       │
│  🌐 Locale             │  └──────┘  └──────┘       │
│  🎨 Theme              │  ┌──────┐  ┌──────┐       │
│            │  │shadcn│  │r-cal │       │
│            │  └──────┘  └──────┘       │
└────────────┴────────────────────────────────────────┘
```

### Library Card 구조
```
┌─────────────────────────────────┐
│ 라이브러리명          버전       │  ← header
├─────────────────────────────────┤
│                                 │
│      [실제 컴포넌트 렌더링]      │  ← body (min-height: 100px)
│                                 │
├─────────────────────────────────┤
│ ▶ 코드 보기                     │  ← collapsible toggle
├─────────────────────────────────┤
│ (펼치면) 코드 스니펫             │  ← syntax highlighted code
└─────────────────────────────────┘
```

---

## Tech Stack

| 항목 | 선택 | 이유 |
|------|------|------|
| 빌드 | Vite 6 | 빠른 개발 서버, 정적 빌드 |
| 프레임워크 | React 19 + TypeScript | 명세 요건 |
| 라우팅 | React Router v7 | 섹션별 URL (e.g. `/date-picker`) |
| 스타일 | Tailwind CSS v4 | 앱 셸 스타일링 |
| 날짜 유틸 | dayjs | MUI adapter, antd 모두 지원 |
| MUI | `@mui/x-date-pickers` v7 + `@emotion/react` | |
| antd | `antd` v5 | CSS-in-JS 내장 |
| shadcn/ui | `shadcn` CLI로 Calendar + Popover 컴포넌트 추가 | |
| react-calendar | `react-calendar` v5 + `react-time-picker` | |
| 코드 하이라이트 | `react-syntax-highlighter` | |
| 배포 | Vercel (정적) | |

---

## Project Structure

```
datepicker-comparison/
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx                    # Router 설정
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx       # TopNav + Sidebar + main 래퍼
│   │   │   ├── TopNav.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── CodeBlock.tsx      # syntax highlighted + collapsible
│   │       ├── LibraryCard.tsx    # 라이브러리 카드 래퍼
│   │       └── LocaleSwitcher.tsx
│   ├── sections/                  # 기능별 비교 페이지
│   │   ├── DatePickerSection.tsx
│   │   ├── DateTimePickerSection.tsx
│   │   ├── DateRangePickerSection.tsx
│   │   ├── DateTimeRangeSection.tsx
│   │   ├── LocaleSection.tsx
│   │   └── ThemeSection.tsx
│   ├── pickers/                   # 라이브러리별 구현체
│   │   ├── mui/
│   │   │   ├── MuiDatePicker.tsx
│   │   │   ├── MuiDateTimePicker.tsx
│   │   │   ├── MuiDateRangePicker.tsx
│   │   │   └── MuiDateTimeRangePicker.tsx
│   │   ├── antd/
│   │   │   ├── AntdDatePicker.tsx
│   │   │   ├── AntdDateTimePicker.tsx
│   │   │   ├── AntdDateRangePicker.tsx
│   │   │   └── AntdDateTimeRangePicker.tsx
│   │   ├── shadcn/
│   │   │   ├── ShadcnDatePicker.tsx
│   │   │   ├── ShadcnDateTimePicker.tsx
│   │   │   ├── ShadcnDateRangePicker.tsx
│   │   │   └── ShadcnDateTimeRangePicker.tsx
│   │   └── react-calendar/
│   │       ├── RCalDatePicker.tsx           # input trigger + Popover
│   │       ├── RCalDateTimePicker.tsx       # + react-time-picker
│   │       ├── RCalDateRangePicker.tsx      # selectRange + Popover
│   │       └── RCalDateTimeRangePicker.tsx  # selectRange + 2× time picker
│   ├── constants/
│   │   └── code-snippets.ts       # 각 컴포넌트 코드 예시 문자열
│   └── styles/
│       └── index.css              # Tailwind + 글로벌 리셋
├── vercel.json                    # SPA fallback 설정
├── vite.config.ts
└── tsconfig.json
# Tailwind v4: tailwind.config.ts 없음, src/styles/index.css에서 @theme 디렉티브로 설정
```

---

## CSS Isolation Strategy

MUI, antd, shadcn, Tailwind가 공존할 때 스타일 충돌 방지:

| 라이브러리 | 전략 |
|-----------|------|
| antd | `ConfigProvider prefixCls="antd"` |
| MUI | `StyledEngineProvider injectFirst` + emotion 자체 스코프 |
| shadcn/ui | Tailwind prefix `tw-` 설정 (`index.css` `@layer` 스코프) |
| react-calendar | `react-calendar/dist/Calendar.css` import를 scoped CSS module로 처리 |

---

## Routing

| 경로 | 섹션 |
|------|------|
| `/` | DatePicker (기본) |
| `/date-time-picker` | DateTimePicker |
| `/date-range-picker` | DateRangePicker |
| `/date-time-range-picker` | DateTimeRangePicker |
| `/locale` | Locale |
| `/theme` | Theme |

`vercel.json`에 SPA fallback (`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`) 추가.

---

## State

- 각 섹션에서 선택된 날짜 값은 섹션 컴포넌트 내 `useState`로 로컬 관리 (전역 상태 불필요)
- locale 선택 값은 `LocaleContext` (React Context)로 전체 섹션에 공유

---

## Constraints

- 라이브러리 간 직접 스타일 커스터마이징 없음 — 각 라이브러리의 기본(default) 스타일 그대로 표시
- 모바일 대응 없음 (내부 참고용, 데스크탑 기준)
- 인증/백엔드 없음 — 순수 정적 앱
