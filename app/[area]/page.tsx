import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courses } from '../../lib/courses'
import { getAreaProgress, getCompletedLessons } from '../actions/lessons'

export const dynamic = 'force-dynamic'

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-1 text-[#d4a0b0]">
        <span>
          {completed}/{total} aula{total !== 1 ? 's' : ''} concluída{total !== 1 ? 's' : ''}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-[#50001F]">
        <div
          className="h-3 rounded-full transition-all"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #c4395a, #ff6b8a)' }}
        />
      </div>
    </div>
  )
}

export default async function AreaOverviewPage({ params }: { params: Promise<{ area: string }> }) {
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

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
      <Link href="/" className="text-sm text-[#c4395a] hover:text-[#d94d6b] transition-colors">
        ← Voltar ao Dashboard
      </Link>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white">{course.title}</h1>
      <p className="mt-2 text-[#d4a0b0]">{course.description}</p>

      <ProgressBar completed={progress.completed} total={progress.total} />

      <h2 className="mt-10 text-xs uppercase tracking-widest text-[#c4395a] font-semibold">📚 Aulas</h2>
      <div className="mt-8 space-y-3">
        {course.lessons.map((lesson, i) => {
          const done = completedSet.has(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              href={`/${area}/aulas/${lesson.slug}`}
              className="flex items-center gap-3 rounded-xl border border-[#50001F] bg-[#2a0d18] p-4 transition-all hover:bg-[#3a1525]"
            >
              <span className="text-xl">{done ? '✅' : '🔒'}</span>
              <span className="font-medium text-white">
                {i + 1}. {lesson.title}
              </span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
