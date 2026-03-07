import { ExternalLink, Calendar, Tag } from 'lucide-react'

interface Publication {
  id: string
  title: string
  authors: string[]
  abstract: string
  tags: string[]
  link: string
  date: string
}

export default function PublicationCard({ pub }: { pub: Publication }) {
  const formattedDate = new Date(pub.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] p-6 hover:border-[#c4395a] dark:hover:border-[#c4395a] transition-all hover:shadow-md dark:hover:shadow-none">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white leading-snug group-hover:text-[#50001F] dark:group-hover:text-[#c4395a] transition-colors">
          {pub.title}
        </h3>
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-gray-400 hover:text-[#50001F] dark:text-gray-500 dark:hover:text-[#c4395a] transition-colors mt-0.5"
          aria-label="Ver publicação"
        >
          <ExternalLink size={18} />
        </a>
      </div>

      <p className="text-sm text-gray-500 dark:text-[#d4a0b0] mb-3">
        {pub.authors.join(', ')}
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
        {pub.abstract}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {pub.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#50001F]/10 text-[#50001F] dark:bg-[#c4395a]/10 dark:text-[#c4395a] font-medium"
          >
            <Tag size={11} />
            {tag}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600">
          <Calendar size={12} />
          {formattedDate}
        </span>
      </div>
    </div>
  )
}
