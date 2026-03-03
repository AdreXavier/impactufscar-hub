import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Clock, Play } from 'lucide-react'

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
  const statusColor =
    completed === total && total > 0
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : completed > 0
        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        : 'text-slate-400 bg-slate-500/10 border-slate-500/20'

  return (
    <Link
      href={`/${slug}`}
      className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 flex flex-col"
    >
      {/* Header */}
      <div className="h-24 bg-gradient-to-br from-indigo-600/20 via-slate-800 to-slate-900 p-5 flex items-center gap-4 relative overflow-hidden">
        <Icon size={64} className="absolute -right-3 -top-3 text-indigo-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        <div className="w-12 h-12 rounded-xl bg-indigo-500/15 backdrop-blur-md flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/25 transition-colors">
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base leading-tight truncate">{title}</h3>
          <span className="text-xs text-slate-400">{total} aulas</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-slate-400">{description}</span>
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}>
            {status}
          </span>
        </div>

        <div className="mt-auto space-y-4">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>{completed}/{total} concluídas</span>
              <span className="font-medium text-slate-300">{pct}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <span className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-700/30 border border-slate-700/50 text-slate-300 text-sm font-medium group-hover:bg-indigo-500/15 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-300">
            {completed > 0 ? <Play size={14} /> : <ArrowRight size={14} />}
            {cta}
          </span>
        </div>
      </div>
    </Link>
  )
}
