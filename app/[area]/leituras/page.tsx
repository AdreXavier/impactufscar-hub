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
      <nav className="flex items-center gap-2 text-xs font-medium" style={{ color: '#8b92a8' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${area}`} className="hover:text-white transition-colors" style={{ color: '#a78bfa' }}>{course.title}</Link>
        <ChevronRight size={12} />
        <span className="text-white">Leituras</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Leituras — {course.title}</h1>
      <p style={{ color: '#8b92a8' }}>
        Materiais de leitura e referências da área.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {course.readings.map((reading) => (
          <Link
            key={reading.slug}
            href={`/${area}/leituras/${reading.slug}`}
            className="p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer"
            style={{ backgroundColor: '#141929', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(124,92,252,0.1)', color: '#a78bfa' }}>
                <BookOpen size={18} />
              </div>
              <span className="font-medium text-white text-sm">{reading.title}</span>
            </div>
            <span className="p-2 rounded-lg" style={{ color: '#a78bfa' }}>
              <Send size={18} className="rotate-90" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
