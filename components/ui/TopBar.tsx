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
    <header
      style={{
        height: '56px',
        borderBottom: '1px solid #3a0016',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        backgroundColor: '#1a0009',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left: hamburger + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
        <button
          onClick={toggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#d4a0b0',
            cursor: 'pointer',
            padding: '0.25rem',
            flexShrink: 0,
          }}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        {/* Breadcrumb - hidden on mobile, title shown instead */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          {crumbs.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {i > 0 && <span style={{ color: '#7a4055' }}>&gt;</span>}
              {crumb.href ? (
                <a href={crumb.href} style={{ color: '#7a4055', transition: 'color 0.15s' }}>
                  {crumb.label}
                </a>
              ) : (
                <span style={{ color: '#ffffff', fontWeight: 500 }}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Mobile title */}
        <span
          className="md:hidden"
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#ffffff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          ImpactUFSCar
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <UserButton />
      </div>
    </header>
  )
}
