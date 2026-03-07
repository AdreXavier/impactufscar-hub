'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/research', label: 'Pesquisa' },
  { href: '/programs', label: 'Programas' },
  { href: '/team', label: 'Equipe' },
  { href: '/contact', label: 'Contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f0f1a]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#3a0016]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#50001F] dark:text-white">
          <span className="w-7 h-7 rounded-md bg-[#50001F] flex items-center justify-center text-white text-xs font-black">I</span>
          <span>Impact UFSCar</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#50001F] dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="px-4 py-1.5 rounded-lg bg-[#50001F] text-white text-sm font-medium hover:bg-[#3a0016] transition-colors"
          >
            Participe
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#0f0f1a] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#50001F] dark:hover:text-white transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-4 py-1.5 rounded-lg bg-[#50001F] text-white text-sm font-medium hover:bg-[#3a0016] transition-colors"
              onClick={() => setOpen(false)}
            >
              Participe
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
