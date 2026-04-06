import { render } from '@testing-library/react'
import { AntdDatePicker } from './AntdDatePicker'

describe('AntdDatePicker', () => {
  it('렌더링 오류 없음', () => {
    expect(() => render(<AntdDatePicker locale="ko" />)).not.toThrow()
  })
})
