import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 700 }}>404</h1>
      <p style={{ marginTop: '0.75rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        Página não encontrada.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.5rem',
          backgroundColor: 'var(--brand-primary, #50001F)',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Voltar ao início
      </Link>
    </main>
  )
}
