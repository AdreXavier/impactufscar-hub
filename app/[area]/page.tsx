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
      <div className="flex justify-between text-sm mb-1.5" style={{ color: '#8b92a8' }}>
        <span>
          {completed}/{total} aula{total !== 1 ? 's' : ''} concluída{total !== 1 ? 's' : ''}
        </span>
        <span style={{ fontWeight: 600, color: '#e8eaf0' }}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c5cfc, #a78bfa)' }}
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
      <nav className="flex items-center gap-2 text-xs font-medium" style={{ color: '#8b92a8' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="text-white">{course.title}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{course.title}</h1>
      <p style={{ color: '#8b92a8' }}>{course.description}</p>

      <ProgressBar completed={progress.completed} total={progress.total} />

      <h2 className="mt-10 text-xs uppercase tracking-widest font-semibold" style={{ color: '#a78bfa' }}>📚 Aulas</h2>
      <div className="space-y-3">
        {course.lessons.map((lesson, i) => {
          const done = completedSet.has(lesson.slug)
          return (
            <Link
              key={lesson.slug}
              href={`/${area}/aulas/${lesson.slug}`}
              className="flex items-center gap-4 rounded-xl p-4 transition-all group"
              style={{ backgroundColor: '#141929', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={done
                  ? { backgroundColor: 'rgba(45,212,160,0.1)', color: '#2dd4a0' }
                  : { backgroundColor: 'rgba(255,255,255,0.04)', color: '#5a6178' }
                }
              >
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
                  <span className="text-xs flex items-center gap-1" style={{ color: '#5a6178' }}>
                    <BookOpen size={11} />
                    {lesson.leituras.length} leitura{lesson.leituras.length !== 1 ? 's' : ''}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={done
                      ? { color: '#2dd4a0', backgroundColor: 'rgba(45,212,160,0.1)' }
                      : { color: '#5a6178', backgroundColor: 'rgba(255,255,255,0.04)' }
                    }
                  >
                    {done ? 'Concluída' : 'Pendente'}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#3d4459] group-hover:text-[#a78bfa] transition-colors" />
            </Link>
          )
        })}
      </div>
    </main>
  )
}
