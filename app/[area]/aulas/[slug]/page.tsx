import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { courses } from '../../../../lib/courses'
import { getCompletedLessons } from '../../../actions/lessons'
import LessonCompleteButton from './LessonCompleteButton'
import LessonTabs from './LessonTabs'

export const dynamic = 'force-dynamic'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ area: string; slug: string }>
}) {
  const { area, slug } = await params
  const course = courses[area]
  if (!course) notFound()

  const lesson = course.lessons.find((l) => l.slug === slug)
  if (!lesson) notFound()

  let completedSlugs: string[] = []
  try {
    completedSlugs = await getCompletedLessons(area)
  } catch (error) {
    console.error('Failed to load completed lessons', error)
  }
  const isCompleted = completedSlugs.includes(slug)

  const currentIndex = course.lessons.findIndex((l) => l.slug === slug)
  const prevLesson = course.lessons[currentIndex - 1] ?? null
  const nextLesson = course.lessons[currentIndex + 1] ?? null

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 p-6 lg:p-10">
      <nav className="flex items-center gap-2 text-xs font-medium" style={{ color: '#8b92a8' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href={`/${area}`} className="hover:text-white transition-colors" style={{ color: '#a78bfa' }}>{course.title}</Link>
        <ChevronRight size={12} />
        <span className="text-white">{lesson.title}</span>
      </nav>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{lesson.title}</h2>

        {/* Video Area */}
        <div
          className="aspect-video w-full rounded-2xl flex items-center justify-center group cursor-pointer overflow-hidden relative"
          style={{ backgroundColor: '#141929', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 z-10 shadow-2xl"
            style={{ backgroundColor: 'rgba(124,92,252,0.15)', color: '#a78bfa', border: '1px solid rgba(124,92,252,0.25)' }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="h-1 w-full rounded-full mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: '#7c5cfc' }}></div>
            </div>
            <div className="flex justify-between text-xs text-white font-medium">
              <span>00:00 / --:--</span>
              <span>HD</span>
            </div>
          </div>
        </div>

        <LessonTabs
          areaSlug={area}
          lessonSlug={slug}
          lessonTitle={lesson.title}
          leituras={lesson.leituras}
          avaliacao={lesson.avaliacao}
        >
          <div className="max-w-none">
            <p style={{ color: '#8b92a8' }}>
              Conteúdo da aula: <strong className="text-white">{lesson.title}</strong>
            </p>
            <p className="text-sm italic mt-2" style={{ color: '#5a6178' }}>
              O conteúdo detalhado desta aula será adicionado em breve.
            </p>
          </div>
        </LessonTabs>
      </div>

      <LessonCompleteButton
        areaSlug={area}
        lessonSlug={slug}
        initialCompleted={isCompleted}
        currentIndex={currentIndex}
        totalLessons={course.lessons.length}
        prevLessonHref={prevLesson ? `/${area}/aulas/${prevLesson.slug}` : null}
        nextLessonHref={nextLesson ? `/${area}/aulas/${nextLesson.slug}` : `/${area}`}
      />
    </div>
  )
}
