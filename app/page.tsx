import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { courses } from '../lib/courses'
import { getAreaProgress } from './actions/lessons'

export const dynamic = 'force-dynamic'

const areaIcons: Record<string, typeof GraduationCap> = {
  trainee: GraduationCap,
  academico: BookOpen,
  metricas: BarChart3,
  'pesquisa-mercado': TrendingUp,
  'seguranca-ia': ShieldCheck,
}

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1">
        <span>
          {completed}/{total} concluído{total !== 1 ? 's' : ''}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2 rounded-full bg-green-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  const firstName = user?.firstName ?? 'membro'

  const areaSlugs = Object.keys(courses)
  const progressResults = userId
    ? await Promise.all(areaSlugs.map((slug) => getAreaProgress(slug)))
    : areaSlugs.map(() => ({ completed: 0, total: 0 }))

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Olá, {firstName}! 👋
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Bem-vindo ao Hub do ImpactUFSCar. Acompanhe seu progresso nos cursos abaixo.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {areaSlugs.map((slug, i) => {
          const course = courses[slug]
          const Icon = areaIcons[slug] ?? BookOpen
          const { completed, total } = progressResults[i]

          return (
            <Link
              key={slug}
              href={`/cursos/${slug}`}
              className="group rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-semibold">{course.title}</h2>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {course.description}
              </p>

              <ProgressBar completed={completed} total={total} />

              <span className="mt-4 inline-block text-sm font-medium text-green-600 group-hover:underline dark:text-green-400">
                Continuar →
              </span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
