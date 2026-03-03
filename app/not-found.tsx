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
      <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#e8eaf0', fontFamily: "'Playfair Display', serif" }}>404</h1>
      <p style={{ marginTop: '0.75rem', fontSize: '1.1rem', color: '#8b92a8' }}>
        Página não encontrada.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.5rem',
          background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)',
          color: '#ffffff',
          borderRadius: '12px',
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
