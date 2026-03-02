'use server'

import { auth } from '@clerk/nextjs/server'
import { getSupabase } from '../../lib/supabase'
import { courses } from '../../lib/courses'

export async function completeLesson(areaSlug: string, lessonSlug: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Usuário deve estar autenticado.')

  const { error } = await getSupabase()
    .from('lessons_progress')
    .upsert(
      {
        user_id: userId,
        area_slug: areaSlug,
        lesson_slug: lessonSlug,
      },
      { onConflict: 'user_id,area_slug,lesson_slug' }
    )

  if (error) {
    console.error('Error completing lesson:', error)
    throw new Error('Falha ao salvar progresso. Tente novamente.')
  }

  return { success: true }
}

export async function getAreaProgress(areaSlug: string) {
  const { userId } = await auth()
  if (!userId) return { completed: 0, total: 0 }

  const course = courses[areaSlug]
  if (!course) return { completed: 0, total: 0 }

  const total = course.lessons.length

  const { data, error } = await getSupabase()
    .from('lessons_progress')
    .select('lesson_slug')
    .eq('user_id', userId)
    .eq('area_slug', areaSlug)

  if (error) {
    console.error('Error fetching area progress:', error)
    return { completed: 0, total }
  }

  const validSlugs = new Set(course.lessons.map((l) => l.slug))
  const completed = (data ?? []).filter((row) => validSlugs.has(row.lesson_slug)).length

  return { completed, total }
}

export async function getCompletedLessons(areaSlug: string): Promise<string[]> {
  const { userId } = await auth()
  if (!userId) return []

  const { data, error } = await getSupabase()
    .from('lessons_progress')
    .select('lesson_slug')
    .eq('user_id', userId)
    .eq('area_slug', areaSlug)

  if (error) {
    console.error('Error fetching completed lessons:', error)
    return []
  }

  return (data ?? []).map((row) => row.lesson_slug)
}

export async function getAllProgress() {
  const { userId } = await auth()
  if (!userId) return { completedLessons: 0, areasInProgress: 0, submittedAssessments: 0 }

  const { data: lessonsData } = await getSupabase()
    .from('lessons_progress')
    .select('area_slug, lesson_slug')
    .eq('user_id', userId)

  const completedLessons = lessonsData?.length ?? 0

  const uniqueAreas = new Set(lessonsData?.map((d) => d.area_slug) ?? [])
  const areasInProgress = uniqueAreas.size

  const { count } = await getSupabase()
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  return {
    completedLessons,
    areasInProgress,
    submittedAssessments: count ?? 0,
  }
}

export async function submitAssessment(areaSlug: string, lessonSlug: string, answer: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Usuário deve estar autenticado.')

  const { error } = await getSupabase()
    .from('submissions')
    .insert({
      user_id: userId,
      area_slug: areaSlug,
      lesson_slug: lessonSlug,
      answer,
    })

  if (error) {
    console.error('Error submitting assessment:', error)
    throw new Error('Falha ao enviar avaliação. Tente novamente.')
  }

  return { success: true }
}
