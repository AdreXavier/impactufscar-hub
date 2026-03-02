import { auth, currentUser } from '@clerk/nextjs/server'
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { courses } from '../lib/courses'
import { getAreaProgress } from './actions/lessons'
import CourseCard from '../components/ui/CourseCard'

export const dynamic = 'force-dynamic'

const areaIcons: Record<string, typeof GraduationCap> = {
  trainee: GraduationCap,
  academico: BookOpen,
  metricas: BarChart3,
  'pesquisa-mercado': TrendingUp,
  'seguranca-ia': ShieldCheck,
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
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
        Olá, {firstName}! 👋
      </h1>
      <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
        Bem-vindo ao Hub do ImpactUFSCar. Acompanhe seu progresso nos cursos abaixo.
      </p>

      <div
        style={{
          marginTop: '2.5rem',
          display: 'grid',
          gap: '1.25rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
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
    </main>
  )
}
