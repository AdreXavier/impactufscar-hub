/* ================================================================
   app.js – Public Resources Page
   Fetches resources from the API and renders them in the grid.
   ================================================================ */

'use strict';

const API_BASE = '/api';

let allResources = [];
let activeCategory = '';

// ── DOM refs ──────────────────────────────────────────────────
const grid = document.getElementById('resourcesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const statusMessage = document.getElementById('statusMessage');
const currentYear = document.getElementById('currentYear');

if (currentYear) currentYear.textContent = new Date().getFullYear();

// ── Helpers ───────────────────────────────────────────────────

function showStatus(msg, type = 'error') {
  statusMessage.textContent = msg;
  statusMessage.className = `status-message ${type}`;
}

function clearStatus() {
  statusMessage.textContent = '';
  statusMessage.className = 'status-message';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Render ────────────────────────────────────────────────────

function renderGrid(resources) {
  if (resources.length === 0) {
    grid.innerHTML = '<p class="no-results">Nenhum recurso encontrado.</p>';
    return;
  }

  grid.innerHTML = resources
    .map(
      (r) => `
      <article class="resource-card">
        <span class="resource-card-category">${escapeHtml(r.category)}</span>
        <h3>${escapeHtml(r.title)}</h3>
        ${r.description ? `<p>${escapeHtml(r.description)}</p>` : ''}
        ${
          r.link
            ? `<a class="resource-card-link" href="${escapeHtml(r.link)}" target="_blank" rel="noopener noreferrer">
                Acessar →
               </a>`
            : ''
        }
      </article>`
    )
    .join('');
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allResources.filter((r) => {
    const matchCategory = !activeCategory || r.category === activeCategory;
    const matchSearch =
      !query ||
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });
  renderGrid(filtered);
}

// ── Category filter buttons ───────────────────────────────────

function buildCategoryButtons(resources) {
  const categories = [...new Set(resources.map((r) => r.category))].sort();
  const allBtn = categoryFilters.querySelector('[data-category=""]');

  // Remove old dynamic buttons (keep "Todos")
  categoryFilters.querySelectorAll('[data-category]:not([data-category=""])').forEach((b) => b.remove());

  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.category = cat;
    btn.textContent = cat;
    btn.addEventListener('click', () => setCategory(cat, btn));
    categoryFilters.appendChild(btn);
  });

  allBtn.addEventListener('click', () => setCategory('', allBtn));
}

function setCategory(cat, btn) {
  activeCategory = cat;
  categoryFilters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

// ── Fetch resources ───────────────────────────────────────────

async function loadResources() {
  grid.innerHTML = '<div class="loading-state"><span class="spinner"></span><span>Carregando recursos...</span></div>';
  clearStatus();

  try {
    const response = await fetch(`${API_BASE}/resources`);
    if (!response.ok) {
      throw new Error(`Servidor retornou status ${response.status}`);
    }
    allResources = await response.json();
    buildCategoryButtons(allResources);
    applyFilters();
  } catch (err) {
    console.error('Failed to load resources:', err);
    showStatus('Não foi possível carregar os recursos. Tente recarregar a página.', 'error');
    grid.innerHTML = '';
  }
}

// ── Event listeners ───────────────────────────────────────────

searchInput.addEventListener('input', applyFilters);

// ── Init ──────────────────────────────────────────────────────

loadResources();
