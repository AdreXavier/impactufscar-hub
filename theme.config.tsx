import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ImpactUFSCar</span>,
  project: {
    // Esse é o ícone do GitHub que você vê à esquerda
    link: 'https://github.com/AdreXavier/impactufscar-hub',
  },
  chat: {
    // Esse link aponta para o seu Mattermost
    link: 'https://impactufscar.dev',
    // Esse bloco abaixo contém o SVG DETALHADO do design do Mattermost
    icon: (
      <svg width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Camadas complexas para criar o efeito de luz e facetas azuis */}
        <path d="M512 0C229.23 0 0 229.23 0 512C0 794.77 229.23 1024 512 1024C794.77 1024 1024 794.77 1024 512C1024 229.23 794.77 0 512 0ZM720.59 749.12H303.41V472.94L512 264.35L720.59 472.94V749.12Z" fill="#0058CC"/>
        <path d="M512 264.35L303.41 472.94H442.35V749.12H581.65V472.94H720.59L512 264.35Z" fill="#fff"/>
        {/* Facetas de luz interna para o efeito geométrico */}
        <path d="M512 264.35L442.35 402.35L512 472.94L581.65 402.35L512 264.35Z" fill="#A4CFFF"/>
        <path d="M442.35 402.35V749.12H581.65V402.35L512 472.94L442.35 402.35Z" fill="#A4CFFF"/>
        <path d="M303.41 472.94L442.35 611.88L512 542.24L442.35 472.94H303.41Z" fill="#A4CFFF"/>
        <path d="M720.59 472.94L581.65 611.88L512 542.24L581.65 472.94H720.59Z" fill="#A4CFFF"/>
      </svg>
    )
  },
  // Repositório oficial para o "Edit this page"
  docsRepositoryBase: 'https://github.com/AdreXavier/impactufscar-hub',
  footer: {
    // Texto do rodapé para a entidade
    text: 'ImpactUFSCar 2026',
  },
}

export default config
