import { renderHook, act } from '@testing-library/react'
import { LocaleProvider, useLocale } from './LocaleContext'

describe('LocaleContext', () => {
  it('기본 locale은 ko', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })
    expect(result.current.locale).toBe('ko')
  })

  it('setLocale로 locale 변경', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: LocaleProvider,
    })
    act(() => {
      result.current.setLocale('en')
    })
    expect(result.current.locale).toBe('en')
  })
})
