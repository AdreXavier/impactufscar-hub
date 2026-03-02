'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, ChevronDown, ChevronRight, X } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { courses } from '../../lib/courses'
import { useSidebar } from './SidebarContext'

function AreaSection({ slug, title }: { slug: string; title: string }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(`/${slug}`)
  const [open, setOpen] = useState(isActive)
  const course = courses[slug]

  return (
    <div style={{ marginBottom: '0.25rem' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '0.625rem 1rem',
          background: isActive ? '#50001F' : 'none',
          border: 'none',
          color: isActive ? '#ffffff' : '#d4a0b0',
          fontSize: '0.85rem',
          fontWeight: isActive ? 500 : 400,
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: '8px',
          transition: 'background-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = '#2a0d18'
            e.currentTarget.style.color = '#ffffff'
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#d4a0b0'
          }
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
      </button>

      {open && (
        <div style={{ paddingLeft: '2rem' }}>
          <Link
            href={`/${slug}`}
            style={{
              display: 'block',
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              color: pathname === `/${slug}` ? '#ffffff' : '#d4a0b0',
              fontWeight: pathname === `/${slug}` ? 600 : 400,
              borderLeft: pathname === `/${slug}` ? '2px solid #c4395a' : '2px solid transparent',
              transition: 'color 0.15s',
            }}
          >
            Visão Geral
          </Link>
          {course?.lessons.map((lesson) => {
            const lessonHref = `/${slug}/aulas/${lesson.slug}`
            const active = pathname === lessonHref
            return (
              <Link
                key={lesson.slug}
                href={lessonHref}
                style={{
                  display: 'block',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  color: active ? '#ffffff' : '#d4a0b0',
                  fontWeight: active ? 600 : 400,
                  borderLeft: active ? '2px solid #c4395a' : '2px solid transparent',
                  transition: 'color 0.15s',
                }}
              >
                {lesson.title}
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
  const { open, close } = useSidebar()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '260px',
          height: '100vh',
          backgroundColor: '#1a0009',
          borderRight: '1px solid #3a0016',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          overflow: 'hidden',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '1.25rem 1rem',
            borderBottom: '1px solid #3a0016',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
          <button
            onClick={close}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: '#d4a0b0',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              fontSize: '0.85rem',
              color: pathname === '/' ? '#ffffff' : '#d4a0b0',
              fontWeight: pathname === '/' ? 500 : 400,
              background: pathname === '/' ? '#50001F' : 'none',
              borderRadius: '8px',
              transition: 'background-color 0.15s, color 0.15s',
            }}
          >
            <Home size={16} />
            Home
          </Link>

          <div
            style={{
              margin: '0.75rem 0.5rem',
              borderTop: '1px solid #3a0016',
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
              borderTop: '1px solid #3a0016',
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
    </>
  )
}
