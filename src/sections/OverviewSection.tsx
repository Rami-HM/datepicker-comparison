const PROBLEMS = [
  {
    title: 'DateRangePicker / DateTimeRangePicker 캘린더 노출 개수 불일치',
    desc: '두 컴포넌트 간 캘린더 패널 개수가 달라 사용자 경험의 일관성이 부족합니다.',
  },
  {
    title: 'Year/Month 직접 조작 시 선택 날짜 변경 문제',
    desc: 'YearMonthSelect에서 연도/월을 변경하면 선택된 날짜가 자동으로 변경됩니다. 캘린더 표시만 바뀌고 선택 날짜는 유지되어야 합니다.',
  },
  {
    title: 'DatePicker와 RangePicker의 동작 불일치',
    desc: 'DatePicker는 날짜 선택 시 즉시 적용되는 반면, RangePicker는 footer 확인 버튼을 눌러야 적용됩니다.',
  },
  {
    title: 'DateRangePicker / DateTimeRangePicker input bar 스타일 불일치',
    desc: 'DateRangePicker는 통합 input box, DateTimeRangePicker는 2개의 분리된 input box로 구성되어 동일 기능군임에도 UI가 다릅니다.',
  },
  {
    title: 'TimePicker disabled time 로직 복잡도',
    desc: '시간 비활성화 로직이 복잡하고 유지보수가 어렵습니다. minDate/maxDate와의 연동 시 복잡도가 더욱 증가합니다.',
  },
  {
    title: 'Time selector step 미지원',
    desc: '15분, 30분 단위 등 특정 간격으로만 시간을 선택하는 step 기능이 지원되지 않습니다.',
  },
  {
    title: 'DateRangePicker 내 time select 구현의 어려움',
    desc: 'TimePicker를 RangePicker에 통합하는 구조적 어려움으로 DateRangePicker에 시간 선택 기능을 추가하기 어렵습니다.',
  },
]

const LIBRARIES = [
  { label: 'MUI X Date Pickers', version: 'v7', color: '#1565c0', bg: '#e3f2fd', weekly: '500K+', license: 'MIT' },
  { label: 'Ant Design',         version: 'v5', color: '#d46b08', bg: '#fff7e6', weekly: '기존 사용', license: 'MIT' },
  { label: 'shadcn/ui',          version: 'react-day-picker v9', color: '#374151', bg: '#f3f4f6', weekly: '1M+', license: 'MIT' },
  { label: 'react-calendar',     version: 'v5', color: '#b45309', bg: '#fef3c7', weekly: '600K+', license: 'MIT' },
  { label: 'React Aria',         version: 'v1', color: '#9d174d', bg: '#fce7f3', weekly: '200K+', license: 'Apache 2.0' },
]

export function OverviewSection() {
  return (
    <div style={{ maxWidth: 800 }}>

      {/* 개요 */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>📋 개요</h1>
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 20,
          fontSize: 13,
          color: '#374151',
          lineHeight: 1.8,
        }}>
          <p style={{ margin: '0 0 12px' }}>
            현재 <strong>sirius-ui</strong>의 DatePicker 컴포넌트는 <strong>antd DatePicker</strong>를 기반으로 구현되어 있습니다.
            하지만 다음과 같은 문제점들로 인해 사용성이 떨어지고 스타일 오버라이딩이 어려운 상황입니다.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li>스타일 커스터마이징의 어려움 — antd의 깊은 DOM 구조와 CSS 클래스로 인한 오버라이딩 복잡도</li>
            <li>기능적 불일치 — DatePicker와 RangePicker 간의 동작 방식 및 UI 스타일 불일치</li>
            <li>복잡한 로직 — TimePicker 관련 비활성화 로직의 복잡도</li>
            <li>구조적 제약 — Year/Month 선택, Time step 지원 등 추가 기능 구현의 어려움</li>
          </ul>
        </div>
      </div>

      {/* 현재 문제점 */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#f59e0b' }}>⚠️</span> 현재 DatePicker 컴포넌트의 문제점
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} style={{
              background: 'white',
              border: '1px solid #fde68a',
              borderLeft: '4px solid #f59e0b',
              borderRadius: 8,
              padding: '12px 16px',
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#92400e', margin: '0 0 4px' }}>{p.title}</p>
              <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 비교 라이브러리 */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📚 비교 대상 라이브러리</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {LIBRARIES.map((lib) => (
            <div key={lib.label} style={{
              background: lib.bg,
              border: `1px solid ${lib.color}30`,
              borderRadius: 10,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: lib.color, flexShrink: 0,
              }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: lib.color, margin: '0 0 2px' }}>{lib.label}</p>
                <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>
                  {lib.version} · 주간 {lib.weekly} · {lib.license}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
