'use client'

import { useSidebar } from './SidebarContext'

export default function ShellContent({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar()

  return (
    <div
      data-shell-content
      className="min-h-screen transition-[margin-left] duration-300 ease-in-out"
      style={{
        marginLeft: open ? '260px' : '0',
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          [data-shell-content] { margin-left: 0 !important; }
        }
      `}</style>
      {children}
    </div>
  )
}
