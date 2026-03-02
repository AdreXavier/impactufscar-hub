import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '../components/ui/Sidebar'
import TopBar from '../components/ui/TopBar'
import './globals.css'

export const metadata = {
  title: 'ImpactUFSCar Hub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pt" dir="ltr">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          />
        </head>
        <body>
          <Sidebar />
          <div style={{ marginLeft: '260px', minHeight: '100vh' }}>
            <TopBar />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
