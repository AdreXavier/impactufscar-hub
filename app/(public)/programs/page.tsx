import type { Metadata } from 'next'
import ProgramCard from '../../../components/public/ProgramCard'
import programs from '../../../data/programs.json'

export const metadata: Metadata = {
  title: 'Programas — Impact UFSCar',
  description:
    'Conheça os programas de formação do Impact UFSCar em AI Safety e Finanças Quantitativas.',
  openGraph: {
    title: 'Programas — Impact UFSCar',
    description: 'Programas de formação em AI Safety e Finanças Quantitativas.',
    images: [{ url: '/og-image.png' }],
  },
}

type ProgramStatus = 'open' | 'upcoming' | 'closed'

export default function ProgramsPage() {
  return (
    <div className="bg-white dark:bg-[#0f0f1a] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Programas</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            Nossos programas combinam rigor acadêmico com aplicações práticas. São abertos para
            estudantes da UFSCar de qualquer curso de graduação ou pós-graduação.
          </p>
        </div>

        {programs.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-600 text-center py-16">
            Nenhum programa disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={{ ...program, status: program.status as ProgramStatus }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
