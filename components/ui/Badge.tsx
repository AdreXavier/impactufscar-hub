export type BadgeVariant = 'em-progresso' | 'concluido' | 'pendente'

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  'em-progresso': {
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
    color: '#f5a623',
  },
  concluido: {
    backgroundColor: 'rgba(45, 212, 160, 0.1)',
    color: '#2dd4a0',
  },
  pendente: {
    backgroundColor: 'rgba(139, 146, 168, 0.08)',
    color: '#8b92a8',
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
