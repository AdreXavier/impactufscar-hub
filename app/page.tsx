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
  Play,
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

/* --- Sub-componentes conforme design proposto --- */

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
  const levelStyle =
    level === 'Avançado'
      ? { color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)' }
      : level === 'Intermediário'
        ? { color: '#f5a623', backgroundColor: 'rgba(245,166,35,0.1)' }
        : { color: '#2dd4a0', backgroundColor: 'rgba(45,212,160,0.1)' }

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200"
      style={{
        backgroundColor: 'rgba(20,25,41,0.6)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
        style={{ backgroundColor: 'rgba(124,92,252,0.1)' }}
      >
        <Play size={16} className="text-[#a78bfa]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-white truncate">{title}</p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[11px] text-[#5a6178] flex items-center gap-1">
            <Clock size={11} />
            {duration}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={levelStyle}>
            {level}
          </span>
        </div>
      </div>
      <ArrowRight size={15} className="text-[#3d4459] group-hover:text-[#a78bfa] transition-colors" />
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
    <main className="max-w-6xl mx-auto space-y-10 p-6 lg:p-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {firstName ? `Olá, ${firstName}! 👋` : 'Olá! 👋'}
          </h1>
          <p className="text-[#8b92a8] mt-1.5 text-[15px]">Continue de onde parou — seu progresso te espera.</p>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2.5 rounded-xl text-[#8b92a8] hover:text-white transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <Search size={18} />
          </button>
          <button
            className="p-2.5 rounded-xl text-[#8b92a8] hover:text-white transition-all relative"
            style={{ border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: '#7c5cfc', boxShadow: '0 0 0 2px #0b0f19' }}></span>
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

      {/* Courses */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Meus Cursos</h2>
          <button className="text-[13px] font-medium text-[#a78bfa] hover:text-white transition-colors flex items-center gap-1">
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

      {/* Recent Tracks */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Trilhas Recentes</h2>
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
