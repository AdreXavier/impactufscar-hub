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
  let firstName = 'membro'
  let userId: string | null = null

  try {
    const authResult = await auth()
    userId = authResult.userId
    const user = await currentUser()
    firstName = user?.firstName ?? 'membro'
  } catch {
    console.error('Failed to load auth data')
  }

  const areaSlugs = Object.keys(courses)
  let progressResults = areaSlugs.map(() => ({ completed: 0, total: 0 }))

  if (userId) {
    try {
      progressResults = await Promise.all(areaSlugs.map((slug) => getAreaProgress(slug)))
    } catch {
      console.error('Failed to load progress data')
    }
  }

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
