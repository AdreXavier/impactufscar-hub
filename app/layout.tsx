import './globals.css'

export const metadata = {
  metadataBase: new URL('https://impactufscar.org'),
  title: 'Impact UFSCar',
  description: 'Organização estudantil focada em AI Safety e Finanças Quantitativas na UFSCar.',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" dir="ltr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
