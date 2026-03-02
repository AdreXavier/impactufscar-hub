import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { getSupabase } from '../lib/supabase'

export const dynamic = 'force-dynamic'

const tracks = [
  {
    name: 'Trainee',
    slug: 'trainee',
    icon: GraduationCap,
    modules: ['trainee'],
  },
  {
    name: 'Acadêmico',
    slug: 'academico',
    icon: BookOpen,
    modules: ['academico'],
  },
  {
    name: 'Métricas',
    slug: 'metricas',
    icon: BarChart3,
    modules: ['metricas'],
  },
  {
    name: 'Pesquisa de Mercado',
    slug: 'pesquisa-mercado',
    icon: TrendingUp,
    modules: ['pesquisa-mercado'],
  },
  {
    name: 'Segurança de IA',
    slug: 'seguranca-ia',
    icon: ShieldCheck,
    modules: ['seguranca-ia'],
  },
]

async function getUserProgress(userId: string) {
  const allModuleSlugs = tracks.flatMap((t) => t.modules)

  const { data, error } = await getSupabase()
    .from('progress')
    .select('module_slug, completed')
    .eq('user_id', userId)
    .in('module_slug', allModuleSlugs)

  if (error) {
    console.error('Error fetching progress:', error)
    return {}
  }

  const progressMap: Record<string, boolean> = {}
  for (const row of data ?? []) {
    progressMap[row.module_slug] = row.completed
  }
  return progressMap
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
          className="h-2 rounded-full bg-blue-600 transition-all"
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
  const progressMap = userId ? await getUserProgress(userId) : {}

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Olá, {firstName}! 👋
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Bem-vindo ao Hub do ImpactUFSCar. Acompanhe seu progresso nas trilhas abaixo.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => {
          const completedCount = track.modules.filter(
            (m) => progressMap[m]
          ).length
          const Icon = track.icon

          return (
            <Link
              key={track.slug}
              href={`/${track.slug}`}
              className="group rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold">{track.name}</h2>
              </div>

              <ProgressBar
                completed={completedCount}
                total={track.modules.length}
              />
            </Link>
          )
        })}
      </div>
    </main>
  )
}
