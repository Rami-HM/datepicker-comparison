import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { AppShell } from '@/components/layout/AppShell'
import { DatePickerSection } from '@/sections/DatePickerSection'
import { DateTimePickerSection } from '@/sections/DateTimePickerSection'
import { DateRangePickerSection } from '@/sections/DateRangePickerSection'
import { DateTimeRangeSection } from '@/sections/DateTimeRangeSection'
import { LocaleSection } from '@/sections/LocaleSection'
import { ThemeSection } from '@/sections/ThemeSection'
import { ConstraintsSection } from '@/sections/ConstraintsSection'
import { VoteSection } from '@/sections/VoteSection'
import { OverviewSection } from '@/sections/OverviewSection'

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
            <Route path="/constraints" element={<ConstraintsSection />} />
            <Route path="/overview" element={<OverviewSection />} />
            <Route path="/vote" element={<VoteSection />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </LocaleProvider>
  )
}

export default App
