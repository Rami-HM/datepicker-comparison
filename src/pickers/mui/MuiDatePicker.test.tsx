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
