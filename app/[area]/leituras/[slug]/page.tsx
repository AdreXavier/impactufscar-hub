import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/${area}/leituras`}
        className="text-sm text-green-600 hover:underline dark:text-green-400"
      >
        ← Voltar às leituras
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{reading.title}</h1>

      <div className="mt-8 prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400">
          Leitura: <strong>{reading.title}</strong>
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm italic">
          O conteúdo detalhado desta leitura será adicionado em breve.
        </p>
      </div>
    </main>
  )
}
