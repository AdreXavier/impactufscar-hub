'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitAssessment } from '../../actions/lessons'

interface AssessmentFormProps {
  areaSlug: string
  courseTitle: string
  questions: string[]
}

export default function AssessmentForm({ areaSlug, courseTitle, questions }: AssessmentFormProps) {
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const combined = questions
        .map((q, i) => `**${q}**\n${answers[i]}`)
        .join('\n\n---\n\n')
      await submitAssessment(areaSlug, combined)
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 text-center">
        <div className="rounded-xl border border-green-200 bg-green-50 p-8 dark:border-green-800 dark:bg-green-950">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
            ✅ Resposta enviada!
          </h2>
          <p className="mt-2 text-green-600 dark:text-green-400">
            A equipe irá revisar.
          </p>
          <Link
            href={`/${areaSlug}`}
            className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            Voltar à área
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/${areaSlug}`}
        className="text-sm text-green-600 hover:underline dark:text-green-400"
      >
        ← Voltar à área
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Avaliação — {courseTitle}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Responda às perguntas abaixo com suas próprias palavras.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {questions.map((question, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-2">
              {i + 1}. {question}
            </label>
            <textarea
              required
              rows={4}
              value={answers[i]}
              onChange={(e) => {
                const next = [...answers]
                next[i] = e.target.value
                setAnswers(next)
              }}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Escreva sua resposta aqui..."
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar avaliação'}
        </button>
      </form>
    </main>
  )
}
