import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Definimos que a página inicial (/) e /index são públicas
const isPublicRoute = createRouteMatcher(['/', '/index'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Pula arquivos internos do Next.js e arquivos estáticos (imagens, etc)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executa para rotas de API
    '/(api|trpc)(.*)',
  ],
}