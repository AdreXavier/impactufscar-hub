'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { completeLesson } from '../../../actions/lessons'

interface LessonCompleteButtonProps {
  areaSlug: string
  lessonSlug: string
  initialCompleted: boolean
  currentIndex: number
  totalLessons: number
  prevLessonHref: string | null
  nextLessonHref: string
}

export default function LessonCompleteButton({
  areaSlug,
  lessonSlug,
  initialCompleted,
  currentIndex,
  totalLessons,
  prevLessonHref,
  nextLessonHref,
}: LessonCompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleClick() {
    if (completed) return

    startTransition(async () => {
      try {
        const result = await completeLesson(areaSlug, lessonSlug)
        if (result?.success) {
          setCompleted(true)
          router.refresh()
        }
      } catch (error) {
        console.error('Failed to mark lesson as complete:', error)
      }
    })
  }

  const progressPct = totalLessons > 0 ? ((currentIndex + 1) / totalLessons) * 100 : 0

  return (
    <div
      className="fixed bottom-0 left-0 lg:left-[260px] right-0 p-4 px-6 z-40"
      style={{
        backgroundColor: 'rgba(11,15,25,0.85)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-sm font-bold text-white whitespace-nowrap">Aula {currentIndex + 1} de {totalLessons}</span>
          <div className="h-1 w-24 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full" style={{ width: `${progressPct}%`, backgroundColor: '#7c5cfc' }}></div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {prevLessonHref ? (
            <button
              onClick={() => router.push(prevLessonHref)}
              className="p-2 rounded-xl transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#8b92a8' }}
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button
              disabled
              className="p-2 rounded-xl cursor-not-allowed"
              style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#3d4459' }}
              aria-label="Sem aula anterior"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={handleClick}
            disabled={isPending || completed}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all whitespace-nowrap disabled:opacity-50"
            style={{
              background: completed
                ? '#059669'
                : 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
              cursor: completed ? 'not-allowed' : 'pointer',
            }}
          >
            {completed ? 'Concluída ✅' : isPending ? 'Salvando...' : 'Marcar como Concluída'}
          </button>
          <button
            onClick={() => router.push(nextLessonHref)}
            className="p-2 rounded-xl transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#8b92a8' }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
