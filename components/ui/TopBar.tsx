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

  const crumbs: { label: string; href?: string }[] = [{ label: 'Home', href: '/' }]
  if (area && areaSlug) {
    crumbs.push({ label: area.title, href: `/${areaSlug}` })
    if (segments[1]) {
      const labels: Record<string, string> = {
        aulas: 'Aulas',
        leituras: 'Leituras',
        avaliacao: 'Avaliação',
      }
      crumbs.push({ label: labels[segments[1]] ?? segments[1] })
    }
  }

  return (
    <header className="lg:hidden sticky top-0 z-40"
      style={{
        borderBottom: '1px solid #3a0016',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: '#0f0f1a',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div className="w-8 h-8 rounded-lg bg-[#50001F] flex items-center justify-center font-bold text-white">I</div>
        <span className="text-lg font-bold text-white">Impact</span>
      </div>
      <button
        onClick={toggle}
        style={{
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '0.5rem',
        }}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>
    </header>
  )
}
