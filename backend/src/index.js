'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth');
const resourcesRoutes = require('./routes/resources');

const app = express();
const PORT = process.env.PORT || 3000;

// ────────────────────────────────────────────────
// Middleware
// ────────────────────────────────────────────────

// CORS – restrict to your domain in production via CORS_ORIGIN env var
const corsOrigin = process.env.CORS_ORIGIN || false; // false = same-origin in production; set to domain
app.use(cors(corsOrigin ? { origin: corsOrigin } : {}));

// Parse JSON bodies (max 1 MB)
app.use(express.json({ limit: '1mb' }));

// ── Rate limiting ────────────────────────────────
// Strict limit on login to prevent brute-force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
});

// General API + static file rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições. Tente novamente em alguns minutos.' },
});

app.use(apiLimiter);
app.use('/api/auth/login', loginLimiter);

// Serve the frontend static files
const frontendPath = path.join(__dirname, '..', '..', 'frontend');
app.use(express.static(frontendPath));

// ────────────────────────────────────────────────
// API Routes
// ────────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourcesRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ────────────────────────────────────────────────
// Catch-all: serve frontend for any non-API route
// ────────────────────────────────────────────────
app.get('*', (req, res) => {
  // Only redirect non-API, non-asset paths to index.html
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Rota não encontrada.' });
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ────────────────────────────────────────────────
// Start
// ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Impact Hub server running at http://localhost:${PORT}`);
  console.log(`   Frontend: http://localhost:${PORT}`);
  console.log(`   Admin:    http://localhost:${PORT}/admin.html`);
  console.log(`   API:      http://localhost:${PORT}/api`);
  console.log(`   Env:      ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
