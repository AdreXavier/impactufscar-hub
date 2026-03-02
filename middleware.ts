import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(async (auth) => {
  // Isso obriga o login em todas as rotas que o matcher encontrar
  await auth.protect()
})

export const config = {
  matcher: [
    // Pula arquivos internos do Next.js e arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executa para rotas de API
    '/(api|trpc)(.*)',
  ],
}
