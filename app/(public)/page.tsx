import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, BookOpen, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impact UFSCar — AI Safety e Finanças Quantitativas',
  description:
    'Organização estudantil da UFSCar focada em pesquisa e educação em AI Safety e Finanças Quantitativas.',
  openGraph: {
    title: 'Impact UFSCar',
    description: 'Pesquisa e educação em AI Safety e Finanças Quantitativas na UFSCar.',
    images: [{ url: '/og-image.png' }],
  },
}

const features = [
  {
    icon: Shield,
    title: 'AI Safety',
    description:
      'Estudamos os desafios de alinhar sistemas de inteligência artificial com valores humanos, incluindo interpretabilidade, robustez e governança de IA.',
    href: '/programs',
  },
  {
    icon: TrendingUp,
    title: 'Finanças Quantitativas',
    description:
      'Desenvolvemos modelos matemáticos e estatísticos para análise de mercados financeiros, com foco em mercados emergentes e séries temporais.',
    href: '/programs',
  },
  {
    icon: BookOpen,
    title: 'Pesquisa',
    description:
      'Publicamos e revisamos trabalhos acadêmicos nas áreas de AI Safety e Finanças Quantitativas, contribuindo com a comunidade científica.',
    href: '/research',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description:
      'Somos um grupo interdisciplinar de estudantes e pesquisadores da UFSCar comprometidos com o desenvolvimento responsável da tecnologia.',
    href: '/team',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0f0f1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#50001F]/5 via-transparent to-[#c4395a]/5 dark:from-[#50001F]/20 dark:to-[#c4395a]/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center relative">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#50001F] dark:text-[#c4395a] bg-[#50001F]/10 dark:bg-[#c4395a]/10 px-3 py-1 rounded-full">
            UFSCar — São Carlos, SP
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Construindo o futuro com{' '}
            <span className="text-[#50001F] dark:text-[#c4395a]">responsabilidade</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            O Impact UFSCar é uma organização estudantil focada em pesquisa e educação em{' '}
            <strong>AI Safety</strong> e <strong>Finanças Quantitativas</strong>, baseada na
            Universidade Federal de São Carlos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#50001F] text-white font-semibold hover:bg-[#3a0016] transition-colors shadow-lg shadow-[#50001F]/20"
            >
              Ver Programas
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-[#3a0016] text-gray-700 dark:text-gray-200 font-semibold hover:border-[#c4395a] dark:hover:border-[#c4395a] hover:text-[#50001F] dark:hover:text-[#c4395a] transition-colors"
            >
              Junte-se a nós
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-[#0a0a12] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">O que fazemos</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Unimos teoria e prática para desenvolver pesquisas relevantes e formar talentos na
              fronteira da tecnologia e das finanças.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] p-6 hover:border-[#c4395a] dark:hover:border-[#c4395a] transition-all hover:shadow-md dark:hover:shadow-none"
              >
                <div className="w-11 h-11 rounded-xl bg-[#50001F]/10 dark:bg-[#c4395a]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#50001F] dark:text-[#c4395a]" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#50001F] dark:group-hover:text-[#c4395a] transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-[#0f0f1a] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pronto para fazer parte?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Nossos programas estão abertos para estudantes da UFSCar de qualquer curso. Venha
            pesquisar, aprender e construir conosco.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#50001F] text-white font-semibold hover:bg-[#3a0016] transition-colors shadow-lg shadow-[#50001F]/20"
          >
            Entre em contato
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
