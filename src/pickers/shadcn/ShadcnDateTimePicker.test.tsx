import { render, screen } from '@testing-library/react'
import { ShadcnDateTimePicker } from './ShadcnDateTimePicker'

describe('ShadcnDateTimePicker', () => {
  it('renders without crashing', () => {
    render(<ShadcnDateTimePicker locale="ko" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows Korean placeholder by default', () => {
    render(<ShadcnDateTimePicker locale="ko" />)
    expect(screen.getByText(/날짜·시간 선택/)).toBeInTheDocument()
  })

  it('shows English placeholder when locale is en', () => {
    render(<ShadcnDateTimePicker locale="en" />)
    expect(screen.getByText(/Select date & time/)).toBeInTheDocument()
  })
})
