import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen } from 'lucide-react'
import { courses } from '../../lib/courses'
import { getAreaProgress, getCompletedLessons } from '../actions/lessons'

export const dynamic = 'force-dynamic'

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-1.5 text-slate-400">
        <span>
          {completed}/{total} aula{total !== 1 ? 's' : ''} concluída{total !== 1 ? 's' : ''}
        </span>
        <span className="font-medium text-slate-300">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-700/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all bg-gradient-to-r from-indigo-500 to-violet-500"
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
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="text-white">{course.title}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{course.title}</h1>
      <p className="text-slate-400">{course.description}</p>

      <ProgressBar completed={progress.completed} total={progress.total} />

      <h2 className="mt-10 text-xs uppercase tracking-widest text-indigo-400 font-semibold">📚 Aulas</h2>
      <div className="space-y-3">
        {course.lessons.map((lesson, i) => {
          const done = completedSet.has(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              href={`/${area}/aulas/${lesson.slug}`}
              className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 transition-all hover:bg-slate-800 hover:border-indigo-500/30 group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                done
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-slate-700/50 text-slate-500'
              }`}>
                {done ? (
                  <span className="text-lg">✓</span>
                ) : (
                  <BookOpen size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-white text-sm">
                  {i + 1}. {lesson.title}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <BookOpen size={11} />
                    {lesson.leituras.length} leitura{lesson.leituras.length !== 1 ? 's' : ''}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    done
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-500 bg-slate-700/30'
                  }`}>
                    {done ? 'Concluída' : 'Pendente'}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </Link>
          )
        })}
      </div>
    </main>
  )
}
