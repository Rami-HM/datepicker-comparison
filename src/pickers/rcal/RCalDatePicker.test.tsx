import { render } from '@testing-library/react'
import { RCalDatePicker } from './RCalDatePicker'

describe('RCalDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<RCalDatePicker locale="ko" />)).not.toThrow()
  })
})
