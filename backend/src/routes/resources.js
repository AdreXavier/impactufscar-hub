'use strict';

const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();

const ALLOWED_CATEGORIES = [
  'Geral',
  'Trainee',
  'Acadêmico',
  'Pesquisa de Mercado',
  'Métricas',
  'Segurança IA',
];

/**
 * Validate and sanitize a resource payload from req.body.
 * Returns { valid: true, data } or { valid: false, error }.
 */
function validateResource(body) {
  const { title, description, category, link } = body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { valid: false, error: 'O campo "título" é obrigatório.' };
  }
  if (title.trim().length > 200) {
    return { valid: false, error: 'O título deve ter no máximo 200 caracteres.' };
  }

  const cat = typeof category === 'string' ? category.trim() : 'Geral';

  const linkVal = typeof link === 'string' ? link.trim() : '';
  if (linkVal.length > 500) {
    return { valid: false, error: 'O link deve ter no máximo 500 caracteres.' };
  }
  if (linkVal && !/^https?:\/\/.+/.test(linkVal)) {
    return { valid: false, error: 'O link deve começar com http:// ou https://.' };
  }

  return {
    valid: true,
    data: {
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      category: ALLOWED_CATEGORIES.includes(cat) ? cat : 'Geral',
      link: linkVal,
    },
  };
}

/**
 * GET /api/resources
 * Public. Supports optional query param ?category=X
 */
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let rows;
    if (category && typeof category === 'string' && category.trim().length > 0) {
      rows = db
        .prepare('SELECT * FROM resources WHERE category = ? ORDER BY created_at DESC')
        .all(category.trim());
    } else {
      rows = db.prepare('SELECT * FROM resources ORDER BY created_at DESC').all();
    }
    return res.json(rows);
  } catch (err) {
    console.error('GET /resources error:', err);
    return res.status(500).json({ error: 'Erro ao buscar recursos.' });
  }
});

/**
 * GET /api/resources/categories
 * Public. Returns distinct categories.
 */
router.get('/categories', (_req, res) => {
  try {
    const rows = db
      .prepare("SELECT DISTINCT category FROM resources ORDER BY category")
      .all();
    return res.json(rows.map((r) => r.category));
  } catch (err) {
    console.error('GET /resources/categories error:', err);
    return res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
});

/**
 * GET /api/resources/:id
 * Public. Returns a single resource by ID.
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido.' });
  }
  try {
    const resource = db.prepare('SELECT * FROM resources WHERE id = ?').get(id);
    if (!resource) {
      return res.status(404).json({ error: 'Recurso não encontrado.' });
    }
    return res.json(resource);
  } catch (err) {
    console.error('GET /resources/:id error:', err);
    return res.status(500).json({ error: 'Erro ao buscar recurso.' });
  }
});

/**
 * POST /api/resources
 * Auth required.
 */
router.post('/', requireAuth, (req, res) => {
  const validation = validateResource(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { title, description, category, link } = validation.data;
  try {
    const stmt = db.prepare(
      'INSERT INTO resources (title, description, category, link) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(title, description, category, link);
    const newResource = db
      .prepare('SELECT * FROM resources WHERE id = ?')
      .get(info.lastInsertRowid);
    return res.status(201).json(newResource);
  } catch (err) {
    console.error('POST /resources error:', err);
    return res.status(500).json({ error: 'Erro ao criar recurso.' });
  }
});

/**
 * PUT /api/resources/:id
 * Auth required.
 */
router.put('/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const existing = db.prepare('SELECT id FROM resources WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Recurso não encontrado.' });
  }

  const validation = validateResource(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { title, description, category, link } = validation.data;
  try {
    db.prepare(
      `UPDATE resources SET title = ?, description = ?, category = ?, link = ?,
       updated_at = datetime('now') WHERE id = ?`
    ).run(title, description, category, link, id);

    const updated = db.prepare('SELECT * FROM resources WHERE id = ?').get(id);
    return res.json(updated);
  } catch (err) {
    console.error('PUT /resources/:id error:', err);
    return res.status(500).json({ error: 'Erro ao atualizar recurso.' });
  }
});

/**
 * DELETE /api/resources/:id
 * Auth required.
 */
router.delete('/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const existing = db.prepare('SELECT id FROM resources WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Recurso não encontrado.' });
  }

  try {
    db.prepare('DELETE FROM resources WHERE id = ?').run(id);
    return res.status(204).end();
  } catch (err) {
    console.error('DELETE /resources/:id error:', err);
    return res.status(500).json({ error: 'Erro ao deletar recurso.' });
  }
});

module.exports = router;
