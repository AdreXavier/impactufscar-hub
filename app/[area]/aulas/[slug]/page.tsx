import { notFound } from 'next/navigation'
import Link from 'next/link'
import { courses } from '../../../../lib/courses'
import { getCompletedLessons } from '../../../actions/lessons'
import LessonCompleteButton from './LessonCompleteButton'

export const dynamic = 'force-dynamic'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ area: string; slug: string }>
}) {
  const { area, slug } = await params
  const course = courses[area]
  if (!course) notFound()

  const lesson = course.lessons.find((l) => l.slug === slug)
  if (!lesson) notFound()

  let completedSlugs: string[] = []
  try {
    completedSlugs = await getCompletedLessons(area)
  } catch (error) {
    console.error('Failed to load completed lessons', error)
  }
  const isCompleted = completedSlugs.includes(slug)

  const currentIndex = course.lessons.findIndex((l) => l.slug === slug)
  const nextLesson = course.lessons[currentIndex + 1] ?? null

  return (
    <main className="mx-auto max-w-4xl px-8 py-8">
      <Link
        href={`/${area}/aulas`}
        className="text-sm text-[#c4395a] hover:text-[#d94d6b] transition-colors"
      >
        ← Voltar às aulas
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">{lesson.title}</h1>

      <div className="mt-8 max-w-none">
        <p className="text-[#d4a0b0]">
          Conteúdo da aula: <strong className="text-white">{lesson.title}</strong>
        </p>
        <p className="text-[#7a4055] text-sm italic mt-2">
          O conteúdo detalhado desta aula será adicionado em breve.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <LessonCompleteButton
          areaSlug={area}
          lessonSlug={slug}
          initialCompleted={isCompleted}
          nextLessonHref={
            nextLesson ? `/${area}/aulas/${nextLesson.slug}` : `/${area}/aulas`
          }
        />
      </div>
    </main>
  )
}
