'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitAssessment } from '../../actions/lessons'

interface AssessmentFormProps {
  areaSlug: string
  lessonSlug: string
  courseTitle: string
  questions: string[]
}

export default function AssessmentForm({ areaSlug, lessonSlug, courseTitle, questions }: AssessmentFormProps) {
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
      await submitAssessment(areaSlug, lessonSlug, combined)
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-4xl px-8 py-8 text-center">
        <div className="rounded-xl border border-[#50001F] bg-[#2a0d18] p-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            ✅ Resposta enviada!
          </h2>
          <p className="mt-2 text-[#d4a0b0]">
            A equipe irá revisar.
          </p>
          <Link
            href={`/${areaSlug}`}
            className="mt-6 inline-block bg-[#c4395a] hover:bg-[#d94d6b] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#50001F]/50"
          >
            Voltar à área
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-8 py-8">
      <Link
        href={`/${areaSlug}`}
        className="text-sm text-[#c4395a] hover:text-[#d94d6b] transition-colors"
      >
        ← Voltar à área
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
        Avaliação — {courseTitle}
      </h1>
      <p className="mt-2 text-[#d4a0b0]">
        Responda às perguntas abaixo com suas próprias palavras.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {questions.map((question, i) => (
          <div key={i}>
            <label className="block text-sm font-medium mb-2 text-white">
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
              className="w-full bg-[#2a0d18] border border-[#50001F] rounded-xl p-4 text-white placeholder-[#7a4055] focus:outline-none focus:ring-2 focus:ring-[#c4395a] resize-none min-h-[120px] transition-all"
              placeholder="Escreva sua resposta aqui..."
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#c4395a] hover:bg-[#d94d6b] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#50001F]/50 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar avaliação'}
        </button>
      </form>
    </main>
  )
}
