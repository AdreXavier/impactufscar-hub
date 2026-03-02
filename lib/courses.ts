export interface LessonReading {
  title: string
  url: string
}

export interface Lesson {
  slug: string
  title: string
  leituras: LessonReading[]
  avaliacao: string[]
}

export interface Reading {
  slug: string
  title: string
}

export interface Course {
  title: string
  description: string
  lessons: Lesson[]
  readings: Reading[]
  assessment: string[]
}

export const courses: Record<string, Course> = {
  trainee: {
    title: 'Programa de Trainee',
    description: 'Formação dos novos membros do ImpactUFSCar.',
    lessons: [
      {
        slug: 'introducao',
        title: 'Introdução à Dinâmica de Sistemas (MIT)',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'O que você entendeu sobre dinâmica de sistemas?',
          'Como você aplicaria esse conceito?',
        ],
      },
      {
        slug: 'pensamento-sistemico',
        title: 'Pensamento Sistêmico',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'O que é pensamento sistêmico?',
          'Como você aplicaria esse conhecimento no ImpactUFSCar?',
        ],
      },
      {
        slug: 'modelagem-basica',
        title: 'Modelagem Básica',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Qual foi o conceito mais desafiador para você?',
          'Como você modelaria um sistema simples?',
        ],
      },
    ],
    readings: [
      { slug: 'bem-vindo', title: 'Bem-vindo ao Programa de Trainee' },
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
      {
        slug: 'visao-geral',
        title: 'Visão Geral da Área Acadêmica',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Qual a importância da área acadêmica para a entidade?',
          'Como você contribuiria para a produção acadêmica?',
        ],
      },
      {
        slug: 'metodologia',
        title: 'Metodologia de Pesquisa',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Descreva uma metodologia de pesquisa que você conhece.',
          'Como aplicá-la no contexto do ImpactUFSCar?',
        ],
      },
      {
        slug: 'publicacoes',
        title: 'Publicações e Artigos',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Qual a importância de publicações acadêmicas?',
          'Como você organizaria um artigo científico?',
        ],
      },
    ],
    readings: [
      { slug: 'bem-vindo', title: 'Bem-vindo à Área Acadêmica' },
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
      {
        slug: 'introducao-metricas',
        title: 'Introdução a Métricas',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'O que são KPIs e por que são importantes?',
          'Como você mediria o impacto de um projeto?',
        ],
      },
      {
        slug: 'kpis',
        title: 'KPIs e Indicadores',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Quais KPIs você considera essenciais para a entidade?',
          'Como definir metas com base em indicadores?',
        ],
      },
      {
        slug: 'dashboards',
        title: 'Construção de Dashboards',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Qual métrica você considera mais relevante para a entidade?',
          'Como um dashboard ajuda na tomada de decisões?',
        ],
      },
    ],
    readings: [
      { slug: 'bem-vindo', title: 'Bem-vindo à Área de Métricas' },
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
      {
        slug: 'fundamentos',
        title: 'Fundamentos de Pesquisa de Mercado',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Qual a diferença entre pesquisa qualitativa e quantitativa?',
          'Como você aplicaria pesquisa de mercado no contexto da entidade?',
        ],
      },
      {
        slug: 'coleta-dados',
        title: 'Coleta de Dados',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Descreva um método de coleta de dados que você utilizaria.',
          'Quais cuidados tomar ao coletar dados?',
        ],
      },
      {
        slug: 'analise-resultados',
        title: 'Análise de Resultados',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Como interpretar resultados de uma pesquisa de mercado?',
          'Que ferramentas você utilizaria para análise de dados?',
        ],
      },
    ],
    readings: [
      { slug: 'bem-vindo', title: 'Bem-vindo à Área de Pesquisa e Mercado' },
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
      {
        slug: 'introducao-ia',
        title: 'Introdução à IA e Segurança',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Quais são os principais riscos de segurança em sistemas de IA?',
          'Como garantir a privacidade dos dados em modelos de IA?',
        ],
      },
      {
        slug: 'riscos',
        title: 'Riscos e Vulnerabilidades em IA',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Quais vulnerabilidades são mais comuns em sistemas de IA?',
          'Como mitigar riscos em modelos de machine learning?',
        ],
      },
      {
        slug: 'boas-praticas',
        title: 'Boas Práticas de Segurança',
        leituras: [
          { title: 'Leitura complementar', url: '#' },
        ],
        avaliacao: [
          'Descreva uma boa prática de segurança para IA que você aprendeu.',
          'Como implementar segurança by design em projetos de IA?',
        ],
      },
    ],
    readings: [
      { slug: 'bem-vindo', title: 'Bem-vindo à Área de Segurança de IA' },
    ],
    assessment: [
      'Quais são os principais riscos de segurança em sistemas de IA?',
      'Como garantir a privacidade dos dados em modelos de IA?',
      'Descreva uma boa prática de segurança para IA que você aprendeu.',
    ],
  },
}
