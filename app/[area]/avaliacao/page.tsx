import { notFound } from 'next/navigation'
import { courses } from '../../../lib/courses'
import AssessmentForm from './AssessmentForm'

export const dynamic = 'force-dynamic'

export default async function AssessmentPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const course = courses[area]
  if (!course) notFound()

  return (
    <AssessmentForm
      areaSlug={area}
      courseTitle={course.title}
      questions={course.assessment}
    />
  )
}
