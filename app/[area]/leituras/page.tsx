import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courses } from '../../../lib/courses'

export const dynamic = 'force-dynamic'

export default async function LeiturasPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const course = courses[area]
  if (!course) notFound()

  return (
    <main className="mx-auto max-w-4xl px-8 py-8">
      <Link href={`/${area}`} className="text-sm text-[#c4395a] hover:text-[#d94d6b] transition-colors">
        ← Voltar para {course.title}
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">Leituras — {course.title}</h1>
      <p className="mt-2 text-[#d4a0b0]">
        Materiais de leitura e referências da área.
      </p>

      <div className="mt-8 space-y-3">
        {course.readings.map((reading, i) => (
          <Link
            key={reading.slug}
            href={`/${area}/leituras/${reading.slug}`}
            className="flex items-center gap-3 rounded-xl border border-[#50001F] bg-[#2a0d18] p-4 transition-all hover:bg-[#3a1525]"
          >
            <span className="text-xl">📄</span>
            <span className="font-medium text-white">
              {i + 1}. {reading.title}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
