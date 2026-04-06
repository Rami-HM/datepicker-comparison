import { render } from '@testing-library/react'
import { ShadcnDatePicker } from './ShadcnDatePicker'

describe('ShadcnDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<ShadcnDatePicker locale="ko" />)).not.toThrow()
  })
})
