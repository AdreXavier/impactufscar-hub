'use client'

import { useState, useTransition } from 'react'
import { PlayCircle, BookOpen, FileText, Send, Lightbulb } from 'lucide-react'
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
  const [isPending, startTransition] = useTransition()

  const tabs: { key: Tab; label: string; icon: typeof PlayCircle }[] = [
    { key: 'conteudo', label: 'Conteúdo', icon: PlayCircle },
    { key: 'leituras', label: 'Leituras', icon: BookOpen },
    { key: 'avaliacao', label: 'Avaliação', icon: FileText },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      try {
        const payload = avaliacao.map((q, i) => `**${q}**\n${answers[i]}`)
        const result = await submitAssessment(areaSlug, lessonSlug, payload)
        if (result?.success) {
          setSubmitted(true)
        }
      } catch (error) {
        console.error('Failed to submit assessment:', error)
      }
    })
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="pb-4 text-sm font-semibold flex items-center gap-2 transition-all relative"
                style={{ color: activeTab === tab.key ? '#a78bfa' : '#8b92a8' }}
              >
                <TabIcon size={16} />
                {tab.label}
                {activeTab === tab.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#7c5cfc' }}></div>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="py-4">
        {activeTab === 'conteudo' && (
          <div className="space-y-4 leading-relaxed" style={{ color: '#8b92a8' }}>{children}</div>
        )}

        {activeTab === 'leituras' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leituras.length === 0 ? (
              <p className="text-sm italic col-span-2" style={{ color: '#5a6178' }}>
                Nenhuma leitura disponível para esta aula.
              </p>
            ) : (
              leituras.map((leitura, i) => (
                <a
                  key={i}
                  href={leitura.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer"
                  style={{ backgroundColor: '#141929', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(124,92,252,0.1)', color: '#a78bfa' }}>
                      <BookOpen size={18} />
                    </div>
                    <span className="font-medium text-white text-sm">{leitura.title}</span>
                  </div>
                  <span className="p-2 rounded-lg transition-colors" style={{ color: '#a78bfa' }}>
                    <Send size={18} className="rotate-90" />
                  </span>
                </a>
              ))
            )}
          </div>
        )}

        {activeTab === 'avaliacao' && (
          <div className="space-y-6">
            {submitted ? (
              <div className="rounded-xl p-8 text-center" style={{ border: '1px solid rgba(124,92,252,0.2)', backgroundColor: 'rgba(124,92,252,0.05)' }}>
                <h3 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ✅ Resposta enviada!
                </h3>
                <p className="mt-2" style={{ color: '#8b92a8' }}>
                  Resposta enviada! A equipe irá revisar em breve. 🎉
                </p>
              </div>
            ) : avaliacao.length === 0 ? (
              <p className="text-sm italic" style={{ color: '#5a6178' }}>
                Nenhuma avaliação disponível para esta aula.
              </p>
            ) : (
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

                {avaliacao.map((question, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-white font-medium text-sm">{i + 1}. {question}</p>
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
                        color: '#e8eaf0',
                      }}
                      placeholder="Digite sua resposta aqui..."
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)' }}
                >
                  <Send size={18} />
                  {isPending ? 'Enviando...' : 'Enviar Avaliação'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
