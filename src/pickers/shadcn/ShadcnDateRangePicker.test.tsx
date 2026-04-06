import { render, screen } from '@testing-library/react'
import { ShadcnDateRangePicker } from './ShadcnDateRangePicker'

describe('ShadcnDateRangePicker', () => {
  it('renders without crashing', () => {
    render(<ShadcnDateRangePicker locale="ko" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows Korean placeholder by default', () => {
    render(<ShadcnDateRangePicker locale="ko" />)
    expect(screen.getByText(/기간 선택/)).toBeInTheDocument()
  })

  it('shows English placeholder when locale is en', () => {
    render(<ShadcnDateRangePicker locale="en" />)
    expect(screen.getByText(/Select range/)).toBeInTheDocument()
  })
})
