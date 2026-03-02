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

export async function submitAssessment(areaSlug: string, answer: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Usuário deve estar autenticado.')

  const { error } = await getSupabase()
    .from('submissions')
    .insert({
      user_id: userId,
      area_slug: areaSlug,
      answer,
    })

  if (error) {
    console.error('Error submitting assessment:', error)
    throw new Error('Falha ao enviar avaliação. Tente novamente.')
  }

  return { success: true }
}
