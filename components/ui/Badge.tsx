export type BadgeVariant = 'em-progresso' | 'concluido' | 'pendente'

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  'em-progresso': {
    backgroundColor: 'rgba(0, 86, 210, 0.15)',
    color: '#5b9bf5',
  },
  concluido: {
    backgroundColor: 'rgba(0, 184, 169, 0.15)',
    color: '#00B8A9',
  },
  pendente: {
    backgroundColor: 'rgba(136, 136, 170, 0.15)',
    color: '#8888aa',
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
