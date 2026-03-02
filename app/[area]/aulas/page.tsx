import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courses } from '../../../lib/courses'
import { getAreaProgress, getCompletedLessons } from '../../actions/lessons'

export const dynamic = 'force-dynamic'

export default async function AulasPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const course = courses[area]
  if (!course) notFound()

  let progress = { completed: 0, total: 0 }
  let completedSlugs: string[] = []

  try {
    const { userId } = await auth()
    if (userId) {
      ;[progress, completedSlugs] = await Promise.all([
        getAreaProgress(area),
        getCompletedLessons(area),
      ])
    }
  } catch (error) {
    console.error('Failed to load progress data', error)
  }

  const completedSet = new Set(completedSlugs)
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href={`/${area}`} className="text-sm text-green-600 hover:underline dark:text-green-400">
        ← Voltar para {course.title}
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Aulas — {course.title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {progress.completed}/{progress.total} aula{progress.total !== 1 ? 's' : ''} concluída{progress.total !== 1 ? 's' : ''} ({pct}%)
      </p>

      <div className="mt-2 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-3 rounded-full bg-green-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-8 space-y-3">
        {course.lessons.map((lesson, i) => {
          const done = completedSet.has(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              href={`/${area}/aulas/${lesson.slug}`}
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
    </main>
  )
}
