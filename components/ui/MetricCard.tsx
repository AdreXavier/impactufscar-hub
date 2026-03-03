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
    <div
      className="relative overflow-hidden rounded-2xl p-5 transition-all duration-300 group"
      style={{
        backgroundColor: '#141929',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(124,92,252,0.06) 0%, transparent 70%)' }} />

      <div className="relative flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(124,92,252,0.1)' }}
        >
          <Icon size={20} className="text-[#a78bfa]" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(45,212,160,0.1)', color: '#2dd4a0' }}>
            <TrendingUp size={11} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
      <p className="text-[13px] font-medium text-[#8b92a8] mt-1">{title}</p>
      {subtitle && <p className="text-[11px] text-[#5a6178] mt-0.5">{subtitle}</p>}
    </div>
  )
}
