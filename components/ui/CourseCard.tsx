import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import ProgressBar from './ProgressBar'
import Badge, { type BadgeVariant } from './Badge'

const areaGradients: Record<string, string> = {
  trainee: 'linear-gradient(135deg, #50001F, #3a0016)',
  academico: 'linear-gradient(135deg, #6b0028, #3a0016)',
  metricas: 'linear-gradient(135deg, #7a1040, #50001F)',
  'pesquisa-mercado': 'linear-gradient(135deg, #8b1545, #50001F)',
  'seguranca-ia': 'linear-gradient(135deg, #3a0016, #1a0009)',
}

interface CourseCardProps {
  slug: string
  title: string
  description: string
  Icon: LucideIcon
  completed: number
  total: number
}

export default function CourseCard({
  slug,
  title,
  description,
  Icon,
  completed,
  total,
}: CourseCardProps) {
  const badge: BadgeVariant =
    completed === total && total > 0
      ? 'concluido'
      : completed > 0
        ? 'em-progresso'
        : 'pendente'

  const cta = completed > 0 ? 'Continuar' : 'Começar'

  return (
    <Link
      href={`/${slug}`}
      style={{
        display: 'block',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'background-color 0.2s, transform 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-card)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div
        style={{
          height: '8px',
          background: areaGradients[slug] ?? 'var(--primary)',
        }}
      />

      <div style={{ padding: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem',
          }}
        >
          <Icon size={22} color="var(--accent)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</h3>
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.75rem',
          }}
        >
          {description}
        </p>

        <ProgressBar completed={completed} total={total} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <Badge variant={badge} />
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--primary)',
            }}
          >
            {cta} →
          </span>
        </div>
      </div>
    </Link>
  )
}
