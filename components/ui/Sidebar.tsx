'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  ChevronDown,
  ChevronRight,
  X,
  BookOpen,
  Settings,
} from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'
import { courses } from '../../lib/courses'
import { useSidebar } from './SidebarContext'

function NavItem({
  icon: Icon,
  label,
  href,
  active = false,
  onClick,
}: {
  icon: React.ElementType
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}) {
  const content = (
    <span
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer w-full ${
        active
          ? 'bg-indigo-500/15 text-indigo-400'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
      {label}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return <button onClick={onClick} className="w-full text-left">{content}</button>
}

function AreaSection({ slug, title }: { slug: string; title: string }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(`/${slug}`)
  const [open, setOpen] = useState(isActive)
  const course = courses[slug]

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
          isActive
            ? 'bg-indigo-500/10 text-indigo-400 font-medium'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <BookOpen size={16} strokeWidth={isActive ? 2.2 : 1.8} />
        <span className="flex-1 text-left truncate">{title}</span>
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>

      {open && (
        <div className="ml-7 mt-1 space-y-0.5 border-l border-slate-700/50 pl-3">
          <Link
            href={`/${slug}`}
            className={`block py-1.5 px-2 text-xs rounded-lg transition-colors ${
              pathname === `/${slug}`
                ? 'text-indigo-400 font-semibold bg-indigo-500/10'
                : 'text-slate-500 hover:text-slate-300'
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
                className={`block py-1.5 px-2 text-xs rounded-lg transition-colors ${
                  active
                    ? 'text-indigo-400 font-semibold bg-indigo-500/10'
                    : 'text-slate-500 hover:text-slate-300'
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
  const { open, close } = useSidebar()

  return (
    <>
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className="fixed top-0 left-0 w-[260px] h-screen bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Image src="/logo.png" alt="ImpactUFSCar" width={24} height={24} />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              ImpactUFSCar
            </span>
          </Link>
          <button
            onClick={close}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <NavItem
            icon={Home}
            label="Home"
            href="/"
            active={pathname === '/'}
          />
          <div className="pt-4 pb-2 px-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              Áreas de Estudo
            </span>
          </div>

          {Object.entries(courses).map(([slug, course]) => (
            <AreaSection key={slug} slug={slug} title={course.title} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 p-3 space-y-1">
          <NavItem icon={Settings} label="Configurações" />
          <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl bg-slate-800/50">
            <UserButton />
            {user && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.firstName ?? 'Membro'}
                </p>
                <p className="text-xs text-slate-500 truncate">Estudante</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
