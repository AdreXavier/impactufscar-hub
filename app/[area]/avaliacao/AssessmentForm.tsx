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
        <div className="rounded-2xl p-8" style={{ border: '1px solid rgba(124,92,252,0.2)', backgroundColor: 'rgba(124,92,252,0.05)' }}>
          <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            ✅ Resposta enviada!
          </h2>
          <p className="mt-2" style={{ color: '#8b92a8' }}>
            A equipe irá revisar.
          </p>
          <Link
            href={`/${areaSlug}`}
            className="mt-6 inline-block text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)' }}
          >
            Voltar à área
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl p-6 lg:p-10 space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium" style={{ color: '#8b92a8' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${areaSlug}`} className="hover:text-white transition-colors" style={{ color: '#a78bfa' }}>{courseTitle}</Link>
        <ChevronRight size={12} />
        <span className="text-white">Avaliação</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
        Avaliação — {courseTitle}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 rounded-2xl flex items-start gap-4" style={{ backgroundColor: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)' }}>
          <div className="mt-1" style={{ color: '#f5a623' }}>
            <Lightbulb size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Dica Importante</p>
            <p className="text-sm" style={{ color: '#8b92a8' }}>💡 Responda com suas próprias palavras para melhor retenção do conhecimento. Não há limite de caracteres.</p>
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
              className="w-full rounded-xl p-4 text-white text-sm focus:outline-none transition-colors min-h-[120px]"
              style={{
                backgroundColor: '#141929',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              placeholder="Digite sua resposta aqui..."
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)' }}
        >
          <Send size={18} />
          {loading ? 'Enviando...' : 'Enviar Avaliação'}
        </button>
      </form>
    </main>
  )
}
