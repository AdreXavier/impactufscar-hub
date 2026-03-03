import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Play, Clock } from 'lucide-react'

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

  const statusStyle =
    completed === total && total > 0
      ? { color: '#2dd4a0', backgroundColor: 'rgba(45,212,160,0.1)' }
      : completed > 0
        ? { color: '#f5a623', backgroundColor: 'rgba(245,166,35,0.1)' }
        : { color: '#8b92a8', backgroundColor: 'rgba(139,146,168,0.08)' }

  return (
    <Link
      href={`/${slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: '#141929',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header gradient */}
      <div className="relative h-28 p-5 flex items-end overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.15) 0%, #141929 100%)' }}>
        <Icon size={56} className="absolute -right-2 -top-2 opacity-[0.04] rotate-12 group-hover:rotate-0 transition-transform duration-700 text-white" />
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(124,92,252,0.12)' }}>
          <Icon size={22} className="text-[#a78bfa]" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c5cfc]">{description}</span>
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full" style={statusStyle}>
            {status}
          </span>
        </div>
        <h3 className="text-white font-semibold text-[17px] leading-snug mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>

        <div className="mt-auto space-y-3">
          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#8b92a8]">
              <span>Progresso</span>
              <span className="font-medium text-[#e8eaf0]">{pct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c5cfc, #a78bfa)' }}
              />
            </div>
          </div>

          {/* CTA */}
          <span
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 group-hover:shadow-lg"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#8b92a8',
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}
          >
            <Play size={14} className="group-hover:text-[#a78bfa] transition-colors" />
            <span className="group-hover:text-white transition-colors">{cta}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
