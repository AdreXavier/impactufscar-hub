'use client'

import { useState, useTransition } from 'react'
import { PlayCircle, BookOpen, FileText, Send, Lightbulb } from 'lucide-react'
import { submitAssessment } from '../../../../actions/lessons'
import type { LessonReading } from '../../../../../lib/courses'

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
      <div className="border-b border-[#3a0016]">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all relative ${activeTab === tab.key ? 'text-[#c4395a]' : 'text-[#d4a0b0] hover:text-white'}`}
              >
                <TabIcon size={16} />
                {tab.label}
                {activeTab === tab.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c4395a] rounded-full"></div>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="py-4">
        {activeTab === 'conteudo' && (
          <div className="space-y-4 text-[#d4a0b0] leading-relaxed">{children}</div>
        )}

        {activeTab === 'leituras' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leituras.length === 0 ? (
              <p className="text-[#7a4055] text-sm italic col-span-2">
                Nenhuma leitura disponível para esta aula.
              </p>
            ) : (
              leituras.map((leitura, i) => (
                <a
                  key={i}
                  href={leitura.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a0009] border border-[#3a0016] p-4 rounded-xl flex items-center justify-between hover:bg-[#2a0d18] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#50001F]/20 text-[#c4395a] rounded-lg">
                      <BookOpen size={18} />
                    </div>
                    <span className="font-medium text-white text-sm">{leitura.title}</span>
                  </div>
                  <span className="text-[#c4395a] hover:bg-[#50001F]/20 p-2 rounded-lg transition-colors">
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
              <div className="rounded-xl border border-[#50001F] bg-[#2a0d18] p-8 text-center">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  ✅ Resposta enviada!
                </h3>
                <p className="mt-2 text-[#d4a0b0]">
                  Resposta enviada! A equipe irá revisar em breve. 🎉
                </p>
              </div>
            ) : avaliacao.length === 0 ? (
              <p className="text-[#7a4055] text-sm italic">
                Nenhuma avaliação disponível para esta aula.
              </p>
            ) : (
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
                      className="w-full bg-[#1a0009] border border-[#3a0016] rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#c4395a] transition-colors min-h-[120px] placeholder:text-[#d4a0b0]/30"
                      placeholder="Digite sua resposta aqui..."
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-2xl bg-[#50001F] hover:bg-[#c4395a] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#c4395a]/20 disabled:opacity-50"
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
