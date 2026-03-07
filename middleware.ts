import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const isPublicFacingRoute = createRouteMatcher([
  '/',
  '/research(.*)',
  '/programs(.*)',
  '/team(.*)',
  '/contact(.*)',
])

const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

const hubMiddleware = clerkMiddleware(async (auth, request) => {
  if (!isAuthRoute(request)) {
    await auth.protect()
  }
})

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  // Skip Clerk entirely for public-facing pages (no Clerk env vars needed)
  if (isPublicFacingRoute(request)) {
    return NextResponse.next()
  }
  return hubMiddleware(request, event)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
