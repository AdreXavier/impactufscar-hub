import { auth, currentUser } from '@clerk/nextjs/server'
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  Clock,
  Star,
  Search,
  Bell,
} from 'lucide-react'
import { courses } from '../../../lib/courses'
import { getAreaProgress, getAllProgress } from '../../actions/lessons'
import CourseCard from '../../../components/ui/CourseCard'
import MetricCard from '../../../components/ui/MetricCard'

export const dynamic = 'force-dynamic'

const areaIcons: Record<string, typeof GraduationCap> = {
  trainee: GraduationCap,
  academico: BookOpen,
  metricas: BarChart3,
  'pesquisa-mercado': TrendingUp,
  'seguranca-ia': ShieldCheck,
}

export default async function DashboardPage() {
  let firstName = ''
  let userId: string | null = null

  try {
    const authResult = await auth()
    userId = authResult.userId
    const user = await currentUser()
    firstName = user?.firstName ?? ''
  } catch (error) {
    console.error('Failed to load auth data', error)
  }

  const areaSlugs = Object.keys(courses)
  let progressResults = areaSlugs.map(() => ({ completed: 0, total: 0 }))
  let metrics = { completedLessons: 0, areasInProgress: 0, submittedAssessments: 0 }

  if (userId) {
    try {
      ;[progressResults, metrics] = await Promise.all([
        Promise.all(areaSlugs.map((slug) => getAreaProgress(slug))),
        getAllProgress(),
      ])
    } catch (error) {
      console.error('Failed to load progress data', error)
    }
  }

  return (
    <main className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {firstName ? `Olá, ${firstName}! 👋` : 'Olá! 👋'}
          </h1>
          <p className="text-[#d4a0b0]">Seja bem-vindo de volta ao seu painel de aprendizado.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl border border-[#3a0016] text-[#d4a0b0] hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 rounded-xl border border-[#3a0016] text-[#d4a0b0] hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#c4395a] rounded-full"></span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Aulas concluídas" value={String(metrics.completedLessons)} icon={CheckCircle} />
        <MetricCard title="Áreas em progresso" value={String(metrics.areasInProgress)} icon={Clock} />
        <MetricCard title="Avaliações enviadas" value={String(metrics.submittedAssessments)} icon={Star} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Meus Cursos</h2>
          <button className="text-sm font-medium text-[#c4395a] hover:underline">Ver todos</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areaSlugs.map((slug, i) => {
            const course = courses[slug]
            const Icon = areaIcons[slug] ?? BookOpen
            const { completed, total } = progressResults[i]

            return (
              <CourseCard
                key={slug}
                slug={slug}
                title={course.title}
                description={course.description}
                Icon={Icon}
                completed={completed}
                total={total}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}
