import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, Send } from 'lucide-react'
import { courses } from '../../../lib/courses'

export const dynamic = 'force-dynamic'

export default async function LeiturasPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const course = courses[area]
  if (!course) notFound()

  return (
    <main className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${area}`} className="text-indigo-400 hover:text-white transition-colors">{course.title}</Link>
        <ChevronRight size={12} />
        <span className="text-white">Leituras</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-white">Leituras — {course.title}</h1>
      <p className="text-slate-400">
        Materiais de leitura e referências da área.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {course.readings.map((reading) => (
          <Link
            key={reading.slug}
            href={`/${area}/leituras/${reading.slug}`}
            className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl flex items-center justify-between hover:bg-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <BookOpen size={18} />
              </div>
              <span className="font-medium text-white text-sm">{reading.title}</span>
            </div>
            <span className="text-indigo-400 p-2 rounded-lg">
              <Send size={18} className="rotate-90" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
