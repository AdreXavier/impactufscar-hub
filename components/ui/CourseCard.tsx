'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface CourseCardProps {
  slug: string
  title: string
  description: string
  Icon: LucideIcon
  completed: number
  total: number
}

export default function CourseCard({
  slug,
  title,
  description,
  Icon,
  completed,
  total,
}: CourseCardProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const status =
    completed === total && total > 0
      ? 'Concluído'
      : completed > 0
        ? 'Em progresso'
        : 'Pendente'
  const cta = completed > 0 ? 'Continuar' : 'Começar'

  return (
    <Link
      href={`/${slug}`}
      className="bg-[#1a0009] border border-[#3a0016] rounded-2xl overflow-hidden group hover:border-[#c4395a]/30 transition-all duration-500 flex flex-col"
    >
      <div className="h-28 bg-gradient-to-br from-[#50001F] to-[#2a0d18] p-6 flex items-end relative overflow-hidden">
        <Icon size={48} className="absolute -right-2 -top-2 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg text-white">
          <Icon size={20} />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-[#c4395a] uppercase tracking-tighter">{description}</span>
          <span className="bg-[#50001F]/30 text-[#d4a0b0] text-[10px] px-2 py-0.5 rounded-full border border-[#50001F]/50">{status}</span>
        </div>
        <h3 className="text-white font-semibold text-lg leading-tight mb-4">{title}</h3>

        <div className="mt-auto space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#d4a0b0]">
              <span>Progresso</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0f0f1a] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#50001F] to-[#c4395a] transition-all duration-1000 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span
            className="block w-full py-2.5 rounded-xl bg-[#1a0009] border border-[#3a0016] text-white text-sm font-medium text-center group-hover:bg-[#50001F] transition-all duration-300"
          >
            {cta}
          </span>
        </div>
      </div>
    </Link>
  )
}
