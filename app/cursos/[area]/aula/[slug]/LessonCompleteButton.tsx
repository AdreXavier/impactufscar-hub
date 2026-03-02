'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeLesson } from '../../../../actions/lessons'

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
      router.refresh()
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
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
        completed
          ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
          : 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
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
