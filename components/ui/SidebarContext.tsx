'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

interface SidebarContextType {
  open: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  open: true,
  toggle: () => {},
  close: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Initialize once on mount
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOpen(false)
    } else {
      const saved = localStorage.getItem('sidebar-open')
      setOpen(saved !== null ? saved === 'true' : true)
    }
    setMounted(true)
  }, [])

  // Close sidebar when switching to mobile
  useEffect(() => {
    if (!mounted) return
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile, mounted])

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      if (!isMobile) {
        localStorage.setItem('sidebar-open', String(next))
      }
      return next
    })
  }, [isMobile])

  const close = useCallback(() => {
    setOpen(false)
    if (!isMobile) {
      localStorage.setItem('sidebar-open', 'false')
    }
  }, [isMobile])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <SidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}
