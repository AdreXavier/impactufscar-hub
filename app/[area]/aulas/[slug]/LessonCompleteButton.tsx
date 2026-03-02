'use client'

import { useState } from 'react'
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
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    if (completed) {
      router.push(nextLessonHref)
      return
    }
    setLoading(true)
    try {
      await completeLesson(areaSlug, lessonSlug)
      setCompleted(true)
      router.push(nextLessonHref)
    } catch (error) {
      console.error('Failed to mark lesson as complete:', error)
    } finally {
      setLoading(false)
    }
  }

  const progressPct = totalLessons > 0 ? ((currentIndex + 1) / totalLessons) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-[#0f0f1a]/80 backdrop-blur-xl border-t border-[#3a0016] p-4 px-6 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-sm font-bold text-white whitespace-nowrap">Aula {currentIndex + 1} de {totalLessons}</span>
          <div className="h-1 w-24 bg-[#1a0009] rounded-full overflow-hidden">
            <div className="h-full bg-[#c4395a]" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {prevLessonHref ? (
            <button
              onClick={() => router.push(prevLessonHref)}
              className="p-2 rounded-xl border border-[#3a0016] text-[#d4a0b0] hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button
              disabled
              className="p-2 rounded-xl border border-[#3a0016] text-[#3a0016] cursor-not-allowed"
              aria-label="Sem aula anterior"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={handleClick}
            disabled={loading}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#50001F] text-white text-sm font-bold hover:bg-[#c4395a] transition-all whitespace-nowrap disabled:opacity-50"
          >
            {completed
              ? '✓ Concluída — Próxima aula'
              : loading
                ? 'Salvando...'
                : 'Marcar como Concluída'}
          </button>
          <button
            onClick={() => router.push(nextLessonHref)}
            className="p-2 rounded-xl border border-[#3a0016] text-[#d4a0b0] hover:text-white transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
