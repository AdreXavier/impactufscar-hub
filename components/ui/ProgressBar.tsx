'use client'

export default function ProgressBar({
  completed,
  total,
}: {
  completed: number
  total: number
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.25rem',
        }}
      >
        <span>
          {completed}/{total} concluído{total !== 1 ? 's' : ''}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        style={{
          height: '8px',
          width: '100%',
          borderRadius: '999px',
          backgroundColor: 'var(--border)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, var(--primary), var(--accent))',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}
