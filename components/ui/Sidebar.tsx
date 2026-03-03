'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  Compass,
  BookOpen,
  Bookmark,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
  User,
} from 'lucide-react'
import { UserButton, useUser, useClerk } from '@clerk/nextjs'
import { courses } from '../../lib/courses'
import { useSidebar } from './SidebarContext'

function NavItem({
  icon: Icon,
  label,
  active = false,
  href,
  onClick,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
}) {
  const inner = (
    <span
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
        active
          ? 'bg-[#7c5cfc]/10 text-[#a78bfa] border-l-2 border-[#7c5cfc]'
          : 'text-[#8b92a8] hover:text-[#e8eaf0] hover:bg-white/[0.04]'
      }`}
    >
      <Icon size={18} strokeWidth={1.8} />
      <span className="truncate">{label}</span>
    </span>
  )

  if (href) return <Link href={href}>{inner}</Link>
  if (onClick) return <button onClick={onClick} className="w-full text-left">{inner}</button>
  return <div className="cursor-default">{inner}</div>
}

function AreaSection({ slug, title }: { slug: string; title: string }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(`/${slug}`)
  const [open, setOpen] = useState(isActive)
  const course = courses[slug]

  return (
    <div className="mb-px">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
          isActive
            ? 'text-[#a78bfa]'
            : 'text-[#8b92a8] hover:text-[#e8eaf0] hover:bg-white/[0.04]'
        }`}
      >
        <BookOpen size={16} strokeWidth={1.8} />
        <span className="flex-1 text-left truncate">{title}</span>
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>

      {open && (
        <div className="ml-8 mt-0.5 space-y-px border-l border-white/[0.06] pl-3">
          <Link
            href={`/${slug}`}
            className={`block py-1.5 px-3 text-[12px] rounded transition-colors ${
              pathname === `/${slug}`
                ? 'text-[#a78bfa] font-semibold'
                : 'text-[#6b7280] hover:text-[#e8eaf0]'
            }`}
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
                className={`block py-1.5 px-3 text-[12px] rounded transition-colors ${
                  active
                    ? 'text-[#a78bfa] font-semibold'
                    : 'text-[#6b7280] hover:text-[#e8eaf0]'
                }`}
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
  const { signOut } = useClerk()
  const { open, close } = useSidebar()

  return (
    <>
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className="fixed top-0 left-0 w-[260px] h-screen flex flex-col z-50 transition-transform duration-300 ease-in-out"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          backgroundColor: '#0f1321',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c5cfc 0%, #a78bfa 100%)' }}>
              <Image src="/logo.png" alt="ImpactUFSCar" width={22} height={22} />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              ImpactUFSCar
            </span>
          </Link>
          <button
            onClick={close}
            className="lg:hidden text-[#8b92a8] hover:text-white p-1 rounded transition-colors"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <NavItem icon={Home} label="Início" href="/" active={pathname === '/'} />
          <NavItem icon={Compass} label="Explorar" href="/" active={false} />
          <NavItem icon={Bookmark} label="Salvos" href="/" active={false} />

          <div className="pt-5 pb-2 px-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4b5066]">
              Trilhas de Estudo
            </span>
          </div>

          {Object.entries(courses).map(([slug, course]) => (
            <AreaSection key={slug} slug={slug} title={course.title} />
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-3 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
          <NavItem icon={Settings} label="Configurações" />
          <NavItem icon={LogOut} label="Sair" onClick={() => signOut()} />
          <div className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <UserButton />
            {user && (
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white truncate">{user.firstName ?? 'Membro'}</p>
                <p className="text-[11px] text-[#6b7280] truncate">Estudante</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
