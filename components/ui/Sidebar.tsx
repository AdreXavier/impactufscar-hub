'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
          background: isActive ? '#7a1040' : 'none',
          border: 'none',
          color: isActive ? '#ffffff' : '#d4a0b0',
          fontSize: '0.85rem',
          fontWeight: isActive ? 600 : 400,
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: '4px',
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
                  color: active ? '#ffffff' : '#d4a0b0',
                  fontWeight: active ? 600 : 400,
                  borderLeft: active
                    ? '2px solid #c4395a'
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
        backgroundColor: '#50001F',
        borderRight: '1px solid #7a1040',
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
          borderBottom: '1px solid #7a1040',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          <Image src="/logo.png" alt="ImpactUFSCar" width={32} height={32} />
          ImpactUFSCar
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
            color: pathname === '/' ? '#ffffff' : '#d4a0b0',
            fontWeight: pathname === '/' ? 600 : 400,
            background: pathname === '/' ? '#7a1040' : 'none',
            borderRadius: '4px',
          }}
        >
          <Home size={16} />
          Home
        </Link>

        <div
          style={{
            margin: '0.75rem 1rem',
            borderTop: '1px solid #7a1040',
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
            borderTop: '1px solid #7a1040',
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
              color: '#ffffff',
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
