'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ChevronDown, ChevronRight } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { courses } from '../../lib/courses'

function AreaSection({ slug, title }: { slug: string; title: string }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(`/${slug}`)
  const [open, setOpen] = useState(isActive)

  const items = [
    { label: 'Aulas', href: `/${slug}/aulas` },
    { label: 'Leituras', href: `/${slug}/leituras` },
    { label: 'Avaliação', href: `/${slug}/avaliacao` },
  ]

  return (
    <div style={{ marginBottom: '0.25rem' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.5rem 1rem',
          background: 'none',
          border: 'none',
          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
          fontSize: '0.85rem',
          fontWeight: isActive ? 600 : 400,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
      </button>

      {open && (
        <div style={{ paddingLeft: '2rem' }}>
          {items.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  color: active ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 400,
                  borderLeft: active
                    ? '2px solid var(--primary)'
                    : '2px solid transparent',
                  transition: 'color 0.15s',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '260px',
        height: '100vh',
        backgroundColor: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '1.25rem 1rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          🧩 ImpactUFSCar
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            color: pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: pathname === '/' ? 600 : 400,
          }}
        >
          <Home size={16} />
          Home
        </Link>

        <div
          style={{
            margin: '0.75rem 1rem',
            borderTop: '1px solid var(--border)',
          }}
        />

        {Object.entries(courses).map(([slug, course]) => (
          <AreaSection key={slug} slug={slug} title={course.title} />
        ))}
      </nav>

      {/* User */}
      {user && (
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt={user.firstName ? `${user.firstName}'s profile picture` : 'User avatar'}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
              }}
            />
          )}
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              fontWeight: 500,
            }}
          >
            {user.firstName ?? 'Membro'}
          </span>
        </div>
      )}
    </aside>
  )
}
