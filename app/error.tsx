'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Algo deu errado</h1>
      <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.5rem',
          backgroundColor: 'var(--brand-primary, #50001F)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Tentar novamente
      </button>
    </main>
  )
}
