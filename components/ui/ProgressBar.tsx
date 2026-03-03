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
          color: '#8b92a8',
          marginBottom: '0.25rem',
        }}
      >
        <span>
          {completed}/{total} concluído{total !== 1 ? 's' : ''}
        </span>
        <span style={{ fontWeight: 600, color: '#e8eaf0' }}>{pct}%</span>
      </div>
      <div
        style={{
          height: '6px',
          width: '100%',
          borderRadius: '999px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #7c5cfc, #a78bfa)',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  )
}
