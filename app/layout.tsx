import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '../components/ui/Sidebar'
import TopBar from '../components/ui/TopBar'
import { SidebarProvider } from '../components/ui/SidebarContext'
import ShellContent from '../components/ui/ShellContent'
import './globals.css'

export const metadata = {
  title: 'ImpactUFSCar Hub',
  icons: { icon: '/logo.png' },
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
          <SidebarProvider>
            <Sidebar />
            <ShellContent>
              <TopBar />
              {children}
            </ShellContent>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
