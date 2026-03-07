import type { Metadata } from 'next'
import PublicationCard from '../../../components/public/PublicationCard'
import publications from '../../../data/publications.json'

export const metadata: Metadata = {
  title: 'Pesquisa — Impact UFSCar',
  description:
    'Publicações e trabalhos de pesquisa do Impact UFSCar em AI Safety e Finanças Quantitativas.',
  openGraph: {
    title: 'Pesquisa — Impact UFSCar',
    description: 'Publicações e trabalhos de pesquisa do Impact UFSCar.',
    images: [{ url: '/og-image.png' }],
  },
}

export default function ResearchPage() {
  return (
    <div className="bg-white dark:bg-[#0f0f1a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Pesquisa</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            Publicações, artigos e trabalhos acadêmicos produzidos pelos membros do Impact UFSCar
            nas áreas de AI Safety e Finanças Quantitativas.
          </p>
        </div>

        {publications.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-600 text-center py-16">
            Nenhuma publicação disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {publications.map((pub) => (
              <PublicationCard key={pub.id} pub={pub} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
