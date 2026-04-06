// src/components/layout/AppShell.tsx
import { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#f9fafb' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
