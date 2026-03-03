'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { courses } from '../../lib/courses'
import { useSidebar } from './SidebarContext'

export default function TopBar() {
  const pathname = usePathname()
  const { toggle } = useSidebar()

  return (
    <header
      className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        backgroundColor: 'rgba(11,15,25,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)' }}
        >
          I
        </div>
        <span className="text-[15px] font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Impact
        </span>
      </div>
      <button
        onClick={toggle}
        className="text-[#8b92a8] hover:text-white p-2 rounded-lg transition-colors"
        style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>
    </header>
  )
}
