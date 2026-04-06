import { render, screen } from '@testing-library/react'
import { ShadcnDateTimeRangePicker } from './ShadcnDateTimeRangePicker'

describe('ShadcnDateTimeRangePicker', () => {
  it('renders without crashing', () => {
    render(<ShadcnDateTimeRangePicker locale="ko" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows Korean placeholder by default', () => {
    render(<ShadcnDateTimeRangePicker locale="ko" />)
    expect(screen.getByText(/기간·시간 선택/)).toBeInTheDocument()
  })

  it('shows English placeholder when locale is en', () => {
    render(<ShadcnDateTimeRangePicker locale="en" />)
    expect(screen.getByText(/Select date-time range/)).toBeInTheDocument()
  })
})
