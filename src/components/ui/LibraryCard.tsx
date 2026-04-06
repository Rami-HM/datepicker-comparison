import { ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'

interface LibraryCardProps {
  name: string
  version: string
  code: string
  children: ReactNode
}

export function LibraryCard({ name, version, code, children }: LibraryCardProps) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{name}</span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{version}</span>
      </div>
      <div style={{
        padding: '24px 16px',
        minHeight: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  )
}
