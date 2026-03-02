'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Lightbulb, ChevronRight } from 'lucide-react'
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
      <main className="mx-auto max-w-5xl p-6 lg:p-10 text-center">
        <div className="rounded-2xl border border-[#3a0016] bg-[#1a0009] p-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            ✅ Resposta enviada!
          </h2>
          <p className="mt-2 text-[#d4a0b0]">
            A equipe irá revisar.
          </p>
          <Link
            href={`/${areaSlug}`}
            className="mt-6 inline-block bg-[#50001F] hover:bg-[#c4395a] text-white font-bold px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg"
          >
            Voltar à área
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium text-[#d4a0b0]">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${areaSlug}`} className="text-[#c4395a] hover:text-white">{courseTitle}</Link>
        <ChevronRight size={12} />
        <span className="text-white">Avaliação</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-white">
        Avaliação — {courseTitle}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#50001F]/10 border border-[#50001F]/30 p-4 rounded-2xl flex items-start gap-4">
          <div className="text-[#c4395a] mt-1">
            <Lightbulb size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Dica Importante</p>
            <p className="text-sm text-[#d4a0b0]">💡 Responda com suas próprias palavras para melhor retenção do conhecimento. Não há limite de caracteres.</p>
          </div>
        </div>

        {questions.map((question, i) => (
          <div key={i} className="space-y-3">
            <p className="text-white font-medium text-sm">
              {i + 1}. {question}
            </p>
            <textarea
              required
              value={answers[i]}
              onChange={(e) => {
                const next = [...answers]
                next[i] = e.target.value
                setAnswers(next)
              }}
              className="w-full bg-[#1a0009] border border-[#3a0016] rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#c4395a] transition-colors min-h-[120px] placeholder:text-[#d4a0b0]/30"
              placeholder="Digite sua resposta aqui..."
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-[#50001F] hover:bg-[#c4395a] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#c4395a]/20 disabled:opacity-50"
        >
          <Send size={18} />
          {loading ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </form>
    </main>
  )
}
