import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ImpactUFSCar</span>,
  project: {
    link: 'https://github.com/AdreXavier/impactufscar-hub',
  },
  chat: {
    link: 'https://impactufscar.dev',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.2 17.6c0 1.1-.9 2-2 2h-14.4c-1.1 0-2-.9-2-2V6.4c0-1.1.9-2 2-2h14.4c1.1 0 2 .9 2 2v11.2z" fill="#0058CC"/>
        <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="#fff"/>
        <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" fill="#0058CC"/>
      </svg>
    )
  },
  docsRepositoryBase: 'https://github.com/AdreXavier/impactufscar-hub',
  footer: {
    text: 'ImpactUFSCar 2026',
  },
}

export default config
