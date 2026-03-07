import type { Metadata } from 'next'
import TeamCard from '../../../components/public/TeamCard'
import team from '../../../data/team.json'

export const metadata: Metadata = {
  title: 'Equipe — Impact UFSCar',
  description: 'Conheça os membros do Impact UFSCar.',
  openGraph: {
    title: 'Equipe — Impact UFSCar',
    description: 'Os membros do Impact UFSCar.',
    images: [{ url: '/og-image.png' }],
  },
}

export default function TeamPage() {
  return (
    <div className="bg-white dark:bg-[#0f0f1a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Equipe</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            Somos estudantes e pesquisadores apaixonados por construir tecnologia segura e mercados
            mais eficientes. Conheça quem faz o Impact UFSCar acontecer.
          </p>
        </div>

        {team.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-600 text-center py-16">
            Nenhum membro cadastrado no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
