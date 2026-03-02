import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { courses } from '../../../../lib/courses'

export const dynamic = 'force-dynamic'

export default async function ReadingPage({
  params,
}: {
  params: Promise<{ area: string; slug: string }>
}) {
  const { area, slug } = await params
  const course = courses[area]
  if (!course) notFound()

  const reading = course.readings.find((r) => r.slug === slug)
  if (!reading) notFound()

  return (
    <main className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium text-[#d4a0b0]">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${area}`} className="text-[#c4395a] hover:text-white">{course.title}</Link>
        <ChevronRight size={12} />
        <Link href={`/${area}/leituras`} className="hover:text-white">Leituras</Link>
        <ChevronRight size={12} />
        <span className="text-white">{reading.title}</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-white">{reading.title}</h1>

      <div className="max-w-none">
        <p className="text-[#d4a0b0]">
          Leitura: <strong className="text-white">{reading.title}</strong>
        </p>
        <p className="text-[#7a4055] text-sm italic mt-2">
          O conteúdo detalhado desta leitura será adicionado em breve.
        </p>
      </div>
    </main>
  )
}
