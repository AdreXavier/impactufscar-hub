import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '../components/ui/Sidebar'
import TopBar from '../components/ui/TopBar'
import './globals.css'

export const metadata = {
  title: 'ImpactUFSCar Hub',
  icons: { icon: '/logo.png' },
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: '260px', minHeight: '100vh' }}>
        <TopBar />
        {children}
      </div>
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? 'pk_test_YWJjLWRlZi0xMi5jbGVyay5hY2NvdW50cy5kZXYk'}
    >
      <html lang="pt" dir="ltr">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          />
        </head>
        <body>
          <Shell>{children}</Shell>
        </body>
      </html>
    </ClerkProvider>
  )
}
