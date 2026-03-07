'use client'

import { useState } from 'react'

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<'PT' | 'EN'>('PT')

  return (
    <div className="flex items-center rounded-full border border-gray-200 dark:border-[#3a0016] overflow-hidden text-xs font-medium">
      <button
        onClick={() => setLang('PT')}
        className={`px-2.5 py-1 transition-colors ${
          lang === 'PT'
            ? 'bg-[#50001F] text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a0009]'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLang('EN')}
        className={`px-2.5 py-1 transition-colors ${
          lang === 'EN'
            ? 'bg-[#50001F] text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a0009]'
        }`}
      >
        EN
      </button>
    </div>
  )
}
