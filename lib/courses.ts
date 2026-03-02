export interface Lesson {
  slug: string
  title: string
}

export interface Course {
  title: string
  description: string
  lessons: Lesson[]
  assessment: string[]
}

export const courses: Record<string, Course> = {
  trainee: {
    title: 'Programa de Trainee 2026',
    description: 'Formação dos novos membros do ImpactUFSCar.',
    lessons: [
      { slug: 'introducao', title: 'Introdução à Dinâmica de Sistemas (MIT)' },
      { slug: 'pensamento-sistemico', title: 'Pensamento Sistêmico' },
      { slug: 'modelagem-basica', title: 'Modelagem Básica' },
    ],
    assessment: [
      'O que você entendeu sobre dinâmica de sistemas?',
      'Como você aplicaria esse conhecimento no ImpactUFSCar?',
      'Qual foi o conceito mais desafiador para você?',
    ],
  },
  academico: {
    title: 'Acadêmico',
    description: 'Conteúdos e diretrizes da área acadêmica.',
    lessons: [
      { slug: 'visao-geral', title: 'Visão Geral da Área Acadêmica' },
      { slug: 'metodologia', title: 'Metodologia de Pesquisa' },
      { slug: 'publicacoes', title: 'Publicações e Artigos' },
    ],
    assessment: [
      'Qual a importância da área acadêmica para a entidade?',
      'Como você contribuiria para a produção acadêmica?',
      'Descreva uma metodologia de pesquisa que você conhece.',
    ],
  },
  metricas: {
    title: 'Métricas',
    description: 'Indicadores e análises de desempenho.',
    lessons: [
      { slug: 'introducao-metricas', title: 'Introdução a Métricas' },
      { slug: 'kpis', title: 'KPIs e Indicadores' },
      { slug: 'dashboards', title: 'Construção de Dashboards' },
    ],
    assessment: [
      'O que são KPIs e por que são importantes?',
      'Como você mediria o impacto de um projeto?',
      'Qual métrica você considera mais relevante para a entidade?',
    ],
  },
  'pesquisa-mercado': {
    title: 'Pesquisa e Mercado',
    description: 'Técnicas de pesquisa e análise de mercado.',
    lessons: [
      { slug: 'fundamentos', title: 'Fundamentos de Pesquisa de Mercado' },
      { slug: 'coleta-dados', title: 'Coleta de Dados' },
      { slug: 'analise-resultados', title: 'Análise de Resultados' },
    ],
    assessment: [
      'Qual a diferença entre pesquisa qualitativa e quantitativa?',
      'Como você aplicaria pesquisa de mercado no contexto da entidade?',
      'Descreva um método de coleta de dados que você utilizaria.',
    ],
  },
  'seguranca-ia': {
    title: 'Segurança de IA',
    description: 'Princípios de segurança aplicados à inteligência artificial.',
    lessons: [
      { slug: 'introducao-ia', title: 'Introdução à IA e Segurança' },
      { slug: 'riscos', title: 'Riscos e Vulnerabilidades em IA' },
      { slug: 'boas-praticas', title: 'Boas Práticas de Segurança' },
    ],
    assessment: [
      'Quais são os principais riscos de segurança em sistemas de IA?',
      'Como garantir a privacidade dos dados em modelos de IA?',
      'Descreva uma boa prática de segurança para IA que você aprendeu.',
    ],
  },
}
