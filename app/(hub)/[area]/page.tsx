import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { courses } from '../../../lib/courses'
import { getAreaProgress, getCompletedLessons } from '../../actions/lessons'

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
      <div className="h-1.5 w-full rounded-full bg-[#0f0f1a] overflow-hidden">
        <div
          className="h-full rounded-full transition-all bg-gradient-to-r from-[#50001F] to-[#c4395a]"
          style={{ width: `${pct}%` }}
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
    <main className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium text-[#d4a0b0]">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight size={12} />
        <span className="text-white">{course.title}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{course.title}</h1>
      <p className="text-[#d4a0b0]">{course.description}</p>

      <ProgressBar completed={progress.completed} total={progress.total} />

      <h2 className="mt-10 text-xs uppercase tracking-widest text-[#c4395a] font-semibold">📚 Aulas</h2>
      <div className="space-y-3">
        {course.lessons.map((lesson, i) => {
          const done = completedSet.has(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              href={`/${area}/aulas/${lesson.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-[#3a0016] bg-[#1a0009] p-4 transition-all hover:bg-[#2a0d18]"
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
