'use client'

import { useState } from 'react'
import { submitAssessment } from '../../../actions/lessons'
import type { LessonReading } from '../../../../lib/courses'

type Tab = 'conteudo' | 'leituras' | 'avaliacao'

interface LessonTabsProps {
  areaSlug: string
  lessonSlug: string
  lessonTitle: string
  leituras: LessonReading[]
  avaliacao: string[]
  children: React.ReactNode
}

export default function LessonTabs({
  areaSlug,
  lessonSlug,
  lessonTitle,
  leituras,
  avaliacao,
  children,
}: LessonTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('conteudo')
  const [answers, setAnswers] = useState<string[]>(new Array(avaliacao.length).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'conteudo', label: 'Conteúdo', icon: '📹' },
    { key: 'leituras', label: 'Leituras', icon: '📖' },
    { key: 'avaliacao', label: 'Avaliação', icon: '✅' },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const combined = avaliacao
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

  return (
    <div>
      {/* Tabs */}
      <div
        className="flex overflow-x-auto"
        style={{
          borderBottom: '2px solid #50001F',
          marginTop: '1.5rem',
          gap: '0',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-shrink-0 whitespace-nowrap"
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? '#ffffff' : '#d4a0b0',
              background: 'none',
              border: 'none',
              borderBottom:
                activeTab === tab.key ? '2px solid #c4395a' : '2px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'conteudo' && <div>{children}</div>}

        {activeTab === 'leituras' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              📖 Leituras — {lessonTitle}
            </h2>
            {leituras.length === 0 ? (
              <p className="text-[#7a4055] text-sm italic">
                Nenhuma leitura disponível para esta aula.
              </p>
            ) : (
              <div className="space-y-3">
                {leituras.map((leitura, i) => (
                  <a
                    key={i}
                    href={leitura.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#50001F] bg-[#2a0d18] p-4 transition-all hover:bg-[#3a1525]"
                  >
                    <span className="text-xl">📄</span>
                    <span className="font-medium text-white">{leitura.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'avaliacao' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              ✅ Avaliação — {lessonTitle}
            </h2>
            {submitted ? (
              <div className="rounded-xl border border-[#50001F] bg-[#2a0d18] p-8 text-center">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  ✅ Resposta enviada!
                </h3>
                <p className="mt-2 text-[#d4a0b0]">
                  A equipe irá revisar.
                </p>
              </div>
            ) : avaliacao.length === 0 ? (
              <p className="text-[#7a4055] text-sm italic">
                Nenhuma avaliação disponível para esta aula.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-[#d4a0b0]">
                  Responda às perguntas abaixo com suas próprias palavras.
                </p>
                {avaliacao.map((question, i) => (
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
                  className="bg-[#c4395a] hover:bg-[#d94d6b] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#50001F]/50 disabled:opacity-50 w-full md:w-auto"
                >
                  {loading ? 'Enviando...' : 'Enviar avaliação'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
