'use server'

import { auth } from '@clerk/nextjs/server'
import { getSupabase } from '../../lib/supabase'

export async function getProgress(moduleSlugs: string[]) {
  const { userId } = await auth()
  if (!userId) return []

  const { data, error } = await getSupabase()
    .from('progress')
    .select('module_slug, completed')
    .eq('user_id', userId)
    .in('module_slug', moduleSlugs)

  if (error) {
    console.error('Error fetching progress:', error)
    return []
  }

  return data ?? []
}

export async function markModuleComplete(moduleSlug: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const { error } = await getSupabase()
    .from('progress')
    .upsert(
      {
        user_id: userId,
        module_slug: moduleSlug,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,module_slug' }
    )

  if (error) {
    console.error('Error updating progress:', error)
    throw new Error('Failed to update progress')
  }

  return { success: true }
}
