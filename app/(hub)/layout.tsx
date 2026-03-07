import { ClerkProvider } from '@clerk/nextjs'
import Sidebar from '../../components/ui/Sidebar'
import TopBar from '../../components/ui/TopBar'
import { SidebarProvider } from '../../components/ui/SidebarContext'
import ShellContent from '../../components/ui/ShellContent'

export const metadata = {
  title: 'ImpactUFSCar Hub',
  icons: { icon: '/logo.png' },
}

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <Sidebar />
        <ShellContent>
          <TopBar />
          {children}
        </ShellContent>
      </SidebarProvider>
    </ClerkProvider>
  )
}
