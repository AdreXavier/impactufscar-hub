import { ClerkProvider } from '@clerk/nextjs'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'ImpactUFSCar Hub',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pt" dir="ltr" suppressHydrationWarning>
        <Head />
        <body>
          <Layout
            navbar={<Navbar logo={<span>ImpactUFSCar</span>} projectLink="https://github.com/AdreXavier/impactufscar-hub" chatLink="https://impactufscar.dev" />}
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/AdreXavier/impactufscar-hub"
            footer={<Footer>ImpactUFSCar 2026</Footer>}
          >
            {children}
          </Layout>
        </body>
      </html>
    </ClerkProvider>
  )
}
