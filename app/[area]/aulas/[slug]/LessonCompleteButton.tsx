'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeLesson } from '../../../actions/lessons'

interface LessonCompleteButtonProps {
  areaSlug: string
  lessonSlug: string
  initialCompleted: boolean
  nextLessonHref: string
}

export default function LessonCompleteButton({
  areaSlug,
  lessonSlug,
  initialCompleted,
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

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
        completed
          ? 'border border-[#50001F] text-[#d4a0b0] hover:bg-[#2a0d18]'
          : 'bg-[#c4395a] hover:bg-[#d94d6b] text-white shadow-lg shadow-[#50001F]/50 disabled:opacity-50'
      }`}
    >
      {completed
        ? '✓ Concluída — Próxima aula'
        : loading
          ? 'Salvando...'
          : 'Marcar como concluída'}
    </button>
  )
}
