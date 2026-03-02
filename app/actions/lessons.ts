'use server'

import { auth } from '@clerk/nextjs/server'
import { getSupabase } from '../../lib/supabase'
import { courses } from '../../lib/courses'

export async function completeLesson(areaSlug: string, lessonSlug: string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false }

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
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error('Error completing lesson:', error)
    return { success: false }
  }
}

export async function getAreaProgress(areaSlug: string) {
  const course = courses[areaSlug]
  if (!course) return { completed: 0, total: 0 }

  try {
    const { userId } = await auth()
    if (!userId) return { completed: 0, total: 0 }

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
  } catch (error) {
    console.error('Error fetching area progress:', error)
    return { completed: 0, total: course.lessons.length }
  }
}

export async function getCompletedLessons(areaSlug: string): Promise<string[]> {
  try {
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
  } catch (error) {
    console.error('Error fetching completed lessons:', error)
    return []
  }
}

export async function getAllProgress() {
  try {
    const { userId } = await auth()
    if (!userId) return { completedLessons: 0, areasInProgress: 0, submittedAssessments: 0 }

    const { data: lessonsData, error: lessonsError } = await getSupabase()
      .from('lessons_progress')
      .select('area_slug, lesson_slug')
      .eq('user_id', userId)

    if (lessonsError) {
      console.error('Error fetching all progress:', lessonsError)
    }

    const safeLessonsData = lessonsData ?? []
    const completedLessons = safeLessonsData.length
    const uniqueAreas = new Set(safeLessonsData.map((d) => d.area_slug))
    const areasInProgress = uniqueAreas.size

    const { count, error: submissionsError } = await getSupabase()
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (submissionsError) {
      console.error('Error fetching submissions count:', submissionsError)
    }

    return {
      completedLessons,
      areasInProgress,
      submittedAssessments: submissionsError ? 0 : (count ?? 0),
    }
  } catch (error) {
    console.error('Error fetching all progress:', error)
    return { completedLessons: 0, areasInProgress: 0, submittedAssessments: 0 }
  }
}

export async function submitAssessment(areaSlug: string, lessonSlug: string, answers: string[] | string) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false }

    const answer = Array.isArray(answers) ? answers.join('\n\n---\n\n') : answers

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
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting assessment:', error)
    return { success: false }
  }
}
