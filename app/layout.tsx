import { ClerkProvider } from '@clerk/nextjs'
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
        <body className="min-h-screen bg-[#0f0f1a] text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
