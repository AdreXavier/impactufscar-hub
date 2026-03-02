import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { courses } from '../../../../../lib/courses'
import { getCompletedLessons } from '../../../../actions/lessons'
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

  const completedSlugs = await getCompletedLessons(area)
  const isCompleted = completedSlugs.includes(slug)

  const currentIndex = course.lessons.findIndex((l) => l.slug === slug)
  const nextLesson = course.lessons[currentIndex + 1] ?? null

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/cursos/${area}`}
        className="text-sm text-green-600 hover:underline dark:text-green-400"
      >
        ← Voltar ao curso
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{lesson.title}</h1>

      <div className="mt-8 prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400">
          Conteúdo da aula: <strong>{lesson.title}</strong>
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm italic">
          O conteúdo detalhado desta aula será adicionado em breve.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <LessonCompleteButton
          areaSlug={area}
          lessonSlug={slug}
          initialCompleted={isCompleted}
          nextLessonHref={
            nextLesson ? `/cursos/${area}/aula/${nextLesson.slug}` : `/cursos/${area}`
          }
        />
      </div>
    </main>
  )
}
