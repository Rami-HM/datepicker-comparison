import { render, screen, fireEvent } from '@testing-library/react'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  it('기본적으로 코드가 숨겨져 있다', () => {
    render(<CodeBlock code="const x = 1" />)
    expect(screen.getByText('코드 보기')).toBeInTheDocument()
    expect(screen.queryByText('const x = 1')).not.toBeInTheDocument()
  })

  it('토글 클릭 시 코드가 보인다', () => {
    const { container } = render(<CodeBlock code="const x = 1" />)
    fireEvent.click(screen.getByText('코드 보기'))
    expect(screen.getByText('코드 닫기')).toBeInTheDocument()
    // Verify the highlighter container is mounted (scoped to this render)
    expect(container.querySelector('pre')).toBeInTheDocument()
  })
})
