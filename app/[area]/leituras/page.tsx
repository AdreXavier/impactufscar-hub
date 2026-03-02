import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courses } from '../../../lib/courses'

export const dynamic = 'force-dynamic'

export default async function LeiturasPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const course = courses[area]
  if (!course) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href={`/${area}`} className="text-sm text-green-600 hover:underline dark:text-green-400">
        ← Voltar para {course.title}
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Leituras — {course.title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Materiais de leitura e referências da área.
      </p>

      <div className="mt-8 space-y-3">
        {course.readings.map((reading, i) => (
          <Link
            key={reading.slug}
            href={`/${area}/leituras/${reading.slug}`}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700"
          >
            <span className="text-xl">📄</span>
            <span className="font-medium">
              {i + 1}. {reading.title}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
