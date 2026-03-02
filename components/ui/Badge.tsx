export type BadgeVariant = 'em-progresso' | 'concluido' | 'pendente'

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  'em-progresso': {
    backgroundColor: 'rgba(196, 57, 90, 0.15)',
    color: '#ff6b8a',
  },
  concluido: {
    backgroundColor: 'rgba(196, 57, 90, 0.25)',
    color: '#c4395a',
  },
  pendente: {
    backgroundColor: 'rgba(212, 160, 176, 0.15)',
    color: '#d4a0b0',
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
