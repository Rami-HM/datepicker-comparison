import { ReactNode } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

interface RCalPopoverProps {
  trigger: ReactNode
  children: ReactNode
}

export function RCalPopover({ trigger, children }: RCalPopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align="start"
          sideOffset={4}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: 50,
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div className="rcal-scope">{children}</div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
