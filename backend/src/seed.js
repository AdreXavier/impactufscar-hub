'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const bcrypt = require('bcrypt');
const db = require('./db');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@impactufscar.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'impact2026!';
const SALT_ROUNDS = 12;

async function seed() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(ADMIN_EMAIL);
  if (!existing) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
    db.prepare(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)'
    ).run(ADMIN_EMAIL, hash, 'admin');
    console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
    console.log('   ⚠️  Set a strong password via ADMIN_PASSWORD in your .env before running seed in production!');
  } else {
    console.log(`ℹ️  Admin user already exists: ${ADMIN_EMAIL}`);
  }

  // Seed sample resources
  const count = db.prepare('SELECT COUNT(*) as n FROM resources').get();
  if (count.n === 0) {
    const insertResource = db.prepare(
      'INSERT INTO resources (title, description, category, link) VALUES (?, ?, ?, ?)'
    );

    const sampleResources = [
      {
        title: 'Introdução à Consultoria',
        description: 'Material introdutório sobre consultoria empresarial e metodologias de diagnóstico organizacional.',
        category: 'Trainee',
        link: 'https://example.com/intro-consultoria',
      },
      {
        title: 'Pesquisa de Mercado: Fundamentos',
        description: 'Guia completo sobre técnicas e ferramentas para realização de pesquisas de mercado.',
        category: 'Pesquisa de Mercado',
        link: 'https://example.com/pesquisa-mercado',
      },
      {
        title: 'Métricas e KPIs para Startups',
        description: 'Como definir, medir e acompanhar indicadores-chave de desempenho em empresas iniciantes.',
        category: 'Métricas',
        link: 'https://example.com/metricas-kpis',
      },
      {
        title: 'Segurança e IA: Riscos e Oportunidades',
        description: 'Panorama sobre inteligência artificial aplicada à segurança corporativa e gestão de riscos.',
        category: 'Segurança IA',
        link: 'https://example.com/seguranca-ia',
      },
      {
        title: 'Gestão Acadêmica de Projetos',
        description: 'Boas práticas para gerenciar projetos acadêmicos e de extensão universitária.',
        category: 'Acadêmico',
        link: 'https://example.com/gestao-academica',
      },
    ];

    const insertMany = db.transaction((resources) => {
      for (const r of resources) {
        insertResource.run(r.title, r.description, r.category, r.link);
      }
    });

    insertMany(sampleResources);
    console.log(`✅ Inserted ${sampleResources.length} sample resources.`);
  } else {
    console.log(`ℹ️  Resources table already has data (${count.n} rows). Skipping seed.`);
  }

  console.log('🌱 Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
