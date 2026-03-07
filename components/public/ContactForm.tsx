'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulated submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle size={48} className="text-[#50001F] dark:text-[#c4395a] mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mensagem enviada!</h3>
        <p className="text-gray-500 dark:text-[#d4a0b0]">Entraremos em contato em breve. Obrigado!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Nome
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Seu nome completo"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#c4395a] transition-colors text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="seu@email.com"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#c4395a] transition-colors text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Mensagem
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Como podemos ajudar?"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#c4395a] transition-colors text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#50001F] text-white font-medium hover:bg-[#3a0016] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : (
          <>
            Enviar mensagem
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  )
}
