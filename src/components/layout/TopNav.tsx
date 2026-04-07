// src/components/layout/TopNav.tsx

const LIBRARY_BADGES = [
  { label: 'MUI v7', bg: '#e3f2fd', color: '#1565c0' },
  { label: 'antd v5', bg: '#fff7e6', color: '#d46b08' },
  { label: 'shadcn/ui', bg: '#f3f4f6', color: '#374151' },
  { label: 'react-calendar v5', bg: '#fef3c7', color: '#b45309' },
  { label: 'React Aria v1', bg: '#fce7f3', color: '#9d174d' },
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
