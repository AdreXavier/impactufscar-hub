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
    <main className="mx-auto max-w-4xl px-8 py-8">
      <Link
        href={`/${area}/leituras`}
        className="text-sm text-[#c4395a] hover:text-[#d94d6b] transition-colors"
      >
        ← Voltar às leituras
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">{reading.title}</h1>

      <div className="mt-8 max-w-none">
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
