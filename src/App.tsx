// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { AppShell } from '@/components/layout/AppShell'

// placeholder — replaced in Task 11 with actual sections
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

export default App
