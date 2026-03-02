'use client'

import { useState } from 'react'
import { markModuleComplete } from '../app/actions/progress'

interface MarkCompleteProps {
  moduleSlug: string
  initialCompleted?: boolean
}

export default function MarkComplete({ moduleSlug, initialCompleted = false }: MarkCompleteProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (completed) return
    setLoading(true)
    try {
      await markModuleComplete(moduleSlug)
      setCompleted(true)
    } catch (error) {
      console.error('Failed to mark as complete:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={completed || loading}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        completed
          ? 'bg-green-100 text-green-700 cursor-default dark:bg-green-900 dark:text-green-300'
          : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
      }`}
    >
      {completed ? '✓ Concluído' : loading ? 'Salvando...' : 'Marcar como concluído'}
    </button>
  )
}
