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
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9' }}>Algo deu errado</h1>
      <p style={{ marginTop: '0.75rem', color: '#94a3b8' }}>
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.5rem',
          backgroundColor: '#6366f1',
          color: '#ffffff',
          border: 'none',
          borderRadius: '12px',
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
