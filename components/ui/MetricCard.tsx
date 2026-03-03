import type { LucideIcon } from 'lucide-react'
import { TrendingUp } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  subtitle?: string
  trend?: string
}

export default function MetricCard({ title, value, icon: Icon, subtitle, trend }: MetricCardProps) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 p-5 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
          <Icon size={22} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-xs font-medium text-slate-400 mt-1">{title}</p>
      {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
  )
}
