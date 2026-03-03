export type BadgeVariant = 'em-progresso' | 'concluido' | 'pendente'

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  'em-progresso': {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    color: '#fbbf24',
  },
  concluido: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    color: '#34d399',
  },
  pendente: {
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    color: '#94a3b8',
  },
}

const labels: Record<BadgeVariant, string> = {
  'em-progresso': 'Em progresso',
  concluido: 'Concluído',
  pendente: 'Pendente',
}

export default function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.7rem',
        borderRadius: '999px',
        fontSize: '0.7rem',
        fontWeight: 600,
        ...variantStyles[variant],
      }}
    >
      {labels[variant]}
    </span>
  )
}
