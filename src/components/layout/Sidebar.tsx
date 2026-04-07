// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/overview', label: 'Overview', icon: '📋', group: 'overview' },
  { to: '/', label: 'DatePicker', icon: '📅', group: 'compare' },
  { to: '/date-time-picker', label: 'DateTimePicker', icon: '🕐', group: 'compare' },
  { to: '/date-range-picker', label: 'DateRangePicker', icon: '📆', group: 'compare' },
  { to: '/date-time-range-picker', label: 'DateTimeRange', icon: '🕑', group: 'compare' },
  { to: '/locale', label: 'Locale', icon: '🌐', group: 'compare' },
  { to: '/theme', label: 'Theme', icon: '🎨', group: 'compare' },
  { to: '/constraints', label: 'Constraints', icon: '🔒', group: 'compare' },
  { to: '/year-month', label: 'Year/Month', icon: '🗓️', group: 'compare' },
  { to: '/time-step', label: 'Time Step', icon: '⏱️', group: 'compare' },
  { to: '/vote', label: 'Vote', icon: '🗳️', group: 'vote' },
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
      {NAV_ITEMS.filter((i) => i.group === 'overview').map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 8px',
            borderRadius: 6,
            fontSize: 13,
            textDecoration: 'none',
            marginBottom: 8,
            background: isActive ? '#eff6ff' : 'transparent',
            color: isActive ? '#1d4ed8' : '#6b7280',
            fontWeight: isActive ? 600 : 400,
          })}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}

      <p style={{
        fontSize: 10, fontWeight: 600, color: '#9ca3af',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '0 8px', marginBottom: 8,
      }}>
        기능 비교
      </p>
      {NAV_ITEMS.filter((i) => i.group === 'compare').map((item) => (
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

      <p style={{
        fontSize: 10, fontWeight: 600, color: '#9ca3af',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '0 8px', margin: '16px 0 8px',
      }}>
        투표
      </p>
      {NAV_ITEMS.filter((i) => i.group === 'vote').map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 8px',
            borderRadius: 6,
            fontSize: 13,
            textDecoration: 'none',
            marginBottom: 2,
            background: isActive ? '#fdf4ff' : 'transparent',
            color: isActive ? '#7e22ce' : '#6b7280',
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
