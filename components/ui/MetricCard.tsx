import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
}

export default function MetricCard({ title, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-[#1a0009] border border-[#3a0016] p-6 rounded-2xl flex items-center gap-5 hover:border-[#50001F] transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-[#50001F]/20 flex items-center justify-center text-[#c4395a]">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[11px] font-bold text-[#d4a0b0] uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}
