'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { courses } from '../../lib/courses'
import { useSidebar } from './SidebarContext'

export default function TopBar() {
  const pathname = usePathname()
  const { toggle } = useSidebar()

  const segments = pathname.split('/').filter(Boolean)
  const areaSlug = segments[0] ?? null
  const area = areaSlug && courses[areaSlug] ? courses[areaSlug] : null

  return (
    <header className="lg:hidden sticky top-0 z-40 border-b border-slate-800 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-sm">I</div>
        <span className="text-base font-bold text-white tracking-tight">Impact</span>
      </div>
      <button
        onClick={toggle}
        className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu size={22} />
      </button>
    </header>
  )
}
