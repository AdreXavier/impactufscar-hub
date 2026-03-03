import { auth, currentUser } from '@clerk/nextjs/server'
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  Clock,
  Trophy,
  Search,
  Bell,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { courses } from '../lib/courses'
import { getAreaProgress, getAllProgress } from './actions/lessons'
import CourseCard from '../components/ui/CourseCard'
import MetricCard from '../components/ui/MetricCard'

export const dynamic = 'force-dynamic'

const areaIcons: Record<string, typeof GraduationCap> = {
  trainee: GraduationCap,
  academico: BookOpen,
  metricas: BarChart3,
  'pesquisa-mercado': TrendingUp,
  'seguranca-ia': ShieldCheck,
}

function TrackItem({
  title,
  duration,
  level,
  href,
}: {
  title: string
  duration: string
  level: string
  href: string
}) {
  const levelColor =
    level === 'Avançado'
      ? 'text-rose-400 bg-rose-500/10'
      : level === 'Intermediário'
        ? 'text-amber-400 bg-amber-500/10'
        : 'text-emerald-400 bg-emerald-500/10'

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:bg-slate-800/70 hover:border-indigo-500/30 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
        <BookOpen size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock size={11} />
            {duration}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${levelColor}`}>
            {level}
          </span>
        </div>
      </div>
      <ArrowRight size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
    </Link>
  )
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

  // Build recent tracks from courses
  const recentTracks = areaSlugs.slice(0, 4).map((slug) => {
    const course = courses[slug]
    const lessonCount = course.lessons.length
    return {
      title: course.lessons[0]?.title ?? course.title,
      duration: `${lessonCount} aulas`,
      level: lessonCount > 3 ? 'Avançado' : lessonCount > 1 ? 'Intermediário' : 'Iniciante',
      href: `/${slug}`,
    }
  })

  return (
    <main className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {firstName ? `Olá, ${firstName}! 👋` : 'Olá! 👋'}
          </h1>
          <p className="text-slate-400 mt-1">Seja bem-vindo de volta ao seu painel de aprendizado.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Search size={18} />
          </button>
          <button className="p-2.5 rounded-xl border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Aulas concluídas"
          value={String(metrics.completedLessons)}
          icon={CheckCircle}
          subtitle="Total de aulas finalizadas"
          trend="+12%"
        />
        <MetricCard
          title="Áreas em progresso"
          value={String(metrics.areasInProgress)}
          icon={Clock}
          subtitle={`De ${areaSlugs.length} áreas disponíveis`}
        />
        <MetricCard
          title="Avaliações enviadas"
          value={String(metrics.submittedAssessments)}
          icon={Trophy}
          subtitle="Avaliações submetidas"
        />
      </div>

      {/* Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Meus Cursos</h2>
          <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            Ver todos
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* Recent Tracks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Trilhas Recentes</h2>
        </div>
        <div className="space-y-2">
          {recentTracks.map((track, i) => (
            <TrackItem
              key={i}
              title={track.title}
              duration={track.duration}
              level={track.level}
              href={track.href}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
