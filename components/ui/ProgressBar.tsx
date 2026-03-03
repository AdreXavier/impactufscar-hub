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
          color: '#94a3b8',
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
          height: '6px',
          width: '100%',
          borderRadius: '999px',
          backgroundColor: 'rgba(51, 65, 85, 0.5)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}
