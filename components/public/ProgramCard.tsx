import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface Program {
  id: string
  title: string
  description: string
  schedule: string
  applicationLink: string
  status: 'open' | 'upcoming' | 'closed'
}

const statusConfig = {
  open: { label: 'Inscrições Abertas', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  upcoming: { label: 'Em Breve', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  closed: { label: 'Encerrado', className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
}

export default function ProgramCard({ program }: { program: Program }) {
  const status = statusConfig[program.status]

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] p-6 hover:border-[#c4395a] dark:hover:border-[#c4395a] transition-all hover:shadow-md dark:hover:shadow-none flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white">{program.title}</h3>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
        {program.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#d4a0b0] mb-5">
        <Calendar size={15} />
        <span>{program.schedule}</span>
      </div>

      {program.status !== 'closed' && (
        <Link
          href={program.applicationLink}
          className="inline-flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl bg-[#50001F] text-white text-sm font-medium hover:bg-[#3a0016] transition-colors"
        >
          {program.status === 'open' ? 'Inscreva-se' : 'Saiba mais'}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
