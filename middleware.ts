import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // O que for público (Home)
  publicRoutes: ["/", "/index"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};