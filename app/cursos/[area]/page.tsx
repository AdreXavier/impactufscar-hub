import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courses } from '../../../lib/courses'
import { getAreaProgress, getCompletedLessons } from '../../actions/lessons'

export const dynamic = 'force-dynamic'

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-1">
        <span>
          {completed}/{total} aula{total !== 1 ? 's' : ''} concluída{total !== 1 ? 's' : ''}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-3 rounded-full bg-green-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default async function CourseOverviewPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const course = courses[area]
  if (!course) notFound()

  const { userId } = await auth()
  const [progress, completedSlugs] = await Promise.all([
    getAreaProgress(area),
    getCompletedLessons(area),
  ])

  const completedSet = new Set(completedSlugs)

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="text-sm text-green-600 hover:underline dark:text-green-400">
        ← Voltar ao Dashboard
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{course.title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{course.description}</p>

      <ProgressBar completed={progress.completed} total={progress.total} />

      <div className="mt-8 space-y-3">
        {course.lessons.map((lesson, i) => {
          const done = completedSet.has(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              href={`/cursos/${area}/aula/${lesson.slug}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700"
            >
              <span className="text-xl">{done ? '✅' : '🔒'}</span>
              <span className="font-medium">
                {i + 1}. {lesson.title}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="mt-8">
        <Link
          href={`/cursos/${area}/avaliacao`}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          📝 Avaliação
        </Link>
      </div>
    </main>
  )
}
