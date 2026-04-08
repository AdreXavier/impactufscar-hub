'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email: string, password: string }
 * Returns: { token: string }
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length === 0 || password.length === 0) {
    return res.status(400).json({ error: 'Email e senha não podem estar vazios.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(trimmedEmail);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  bcrypt.compare(password, user.password, (err, match) => {
    if (err) {
      console.error('bcrypt error:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not set!');
      return res.status(500).json({ error: 'Configuração interna inválida.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    return res.json({ token });
  });
});

module.exports = router;
