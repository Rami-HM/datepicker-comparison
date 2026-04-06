import { render, screen } from '@testing-library/react'
import { LibraryCard } from './LibraryCard'

describe('LibraryCard', () => {
  it('라이브러리명과 버전을 표시', () => {
    render(
      <LibraryCard name="MUI" version="v7" code="<DatePicker />">
        <div>picker</div>
      </LibraryCard>
    )
    expect(screen.getByText('MUI')).toBeInTheDocument()
    expect(screen.getByText('v7')).toBeInTheDocument()
    expect(screen.getByText('picker')).toBeInTheDocument()
  })
})
