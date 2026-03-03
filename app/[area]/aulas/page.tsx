import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, ChevronRight } from 'lucide-react'
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
    <main className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
      <Link href={`/${area}`} className="text-sm transition-colors" style={{ color: '#a78bfa' }}>
        ← Voltar para {course.title}
      </Link>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Aulas — {course.title}</h1>
      <p className="mt-2" style={{ color: '#8b92a8' }}>
        {progress.completed}/{progress.total} aula{progress.total !== 1 ? 's' : ''} concluída{progress.total !== 1 ? 's' : ''} ({pct}%)
      </p>

      <div className="mt-2 h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c5cfc, #a78bfa)' }}
        />
      </div>

      <div className="mt-8 space-y-3">
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
