/* ================================================================
   admin.js – Admin Panel
   Handles login, resource CRUD via API.
   ================================================================ */

'use strict';

const API_BASE = '/api';
const TOKEN_KEY = 'hub_admin_token';

// ── State ─────────────────────────────────────────────────────
let token = null;
let editingId = null;
let pendingDeleteId = null;

// ── DOM refs ──────────────────────────────────────────────────
const loginScreen    = document.getElementById('loginScreen');
const adminPanel     = document.getElementById('adminPanel');
const loginForm      = document.getElementById('loginForm');
const loginEmail     = document.getElementById('loginEmail');
const loginPassword  = document.getElementById('loginPassword');
const loginError     = document.getElementById('loginError');
const loginBtn       = document.getElementById('loginBtn');
const logoutBtn      = document.getElementById('logoutBtn');

const adminResourcesList = document.getElementById('adminResourcesList');
const adminStatusMessage = document.getElementById('adminStatusMessage');
const newResourceBtn     = document.getElementById('newResourceBtn');

// Resource modal
const resourceModal  = document.getElementById('resourceModal');
const modalTitle     = document.getElementById('modalTitle');
const modalClose     = document.getElementById('modalClose');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalSaveBtn   = document.getElementById('modalSaveBtn');
const resourceForm   = document.getElementById('resourceForm');
const resourceId     = document.getElementById('resourceId');
const resourceTitle  = document.getElementById('resourceTitle');
const resourceCategory   = document.getElementById('resourceCategory');
const resourceDescription = document.getElementById('resourceDescription');
const resourceLink   = document.getElementById('resourceLink');
const modalError     = document.getElementById('modalError');

// Confirm delete modal
const confirmModal    = document.getElementById('confirmModal');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');
const confirmOkBtn    = document.getElementById('confirmOkBtn');

// ── Helpers ───────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setLoginError(msg) {
  loginError.textContent = msg;
}

function clearLoginError() {
  loginError.textContent = '';
}

function showAdminStatus(msg, type = 'error') {
  adminStatusMessage.textContent = msg;
  adminStatusMessage.className = `status-message ${type}`;
  if (type === 'success') {
    setTimeout(() => {
      adminStatusMessage.textContent = '';
      adminStatusMessage.className = 'status-message';
    }, 3000);
  }
}

function clearAdminStatus() {
  adminStatusMessage.textContent = '';
  adminStatusMessage.className = 'status-message';
}

function setModalError(msg) {
  modalError.textContent = msg;
}

function clearModalError() {
  modalError.textContent = '';
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

// ── Auth ──────────────────────────────────────────────────────

function saveToken(t) {
  token = t;
  sessionStorage.setItem(TOKEN_KEY, t);
}

function loadStoredToken() {
  token = sessionStorage.getItem(TOKEN_KEY);
  return !!token;
}

function isTokenExpired(t) {
  try {
    const payload = JSON.parse(atob(t.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function showLogin() {
  loginScreen.classList.remove('hidden');
  adminPanel.classList.add('hidden');
}

function showAdmin() {
  loginScreen.classList.add('hidden');
  adminPanel.classList.remove('hidden');
  loadResources();
}

function logout() {
  token = null;
  sessionStorage.removeItem(TOKEN_KEY);
  showLogin();
}

// ── Login ─────────────────────────────────────────────────────

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearLoginError();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    setLoginError('Preencha e-mail e senha.');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = 'Entrando...';

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoginError(data.error || 'Falha no login. Verifique suas credenciais.');
      return;
    }

    saveToken(data.token);
    showAdmin();
  } catch (err) {
    console.error('Login error:', err);
    setLoginError('Erro de conexão. Verifique se o servidor está rodando.');
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Entrar';
  }
});

logoutBtn.addEventListener('click', logout);

// ── Load Resources ────────────────────────────────────────────

async function loadResources() {
  adminResourcesList.innerHTML =
    '<div class="loading-state"><span class="spinner"></span><span>Carregando...</span></div>';
  clearAdminStatus();

  try {
    const res = await fetch(`${API_BASE}/resources`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const resources = await res.json();
    renderAdminList(resources);
  } catch (err) {
    console.error('Load resources error:', err);
    showAdminStatus('Erro ao carregar recursos.', 'error');
    adminResourcesList.innerHTML = '';
  }
}

function renderAdminList(resources) {
  if (resources.length === 0) {
    adminResourcesList.innerHTML =
      '<p style="color:var(--color-text-muted);text-align:center;padding:2rem 0">Nenhum recurso cadastrado ainda.</p>';
    return;
  }

  adminResourcesList.innerHTML = resources
    .map(
      (r) => `
      <div class="admin-resource-row" data-id="${r.id}">
        <div class="admin-resource-info">
          <h4>${escapeHtml(r.title)}</h4>
          <p>${escapeHtml(r.category)}${r.description ? ' · ' + escapeHtml(r.description) : ''}</p>
        </div>
        <div class="admin-resource-actions">
          <button class="btn btn-icon-edit" onclick="openEditModal(${r.id})">✏️ Editar</button>
          <button class="btn btn-icon-delete" onclick="openDeleteConfirm(${r.id})">🗑 Excluir</button>
        </div>
      </div>`
    )
    .join('');
}

// ── Resource Modal ────────────────────────────────────────────

function openNewModal() {
  editingId = null;
  modalTitle.textContent = 'Novo Recurso';
  resourceForm.reset();
  clearModalError();
  modalSaveBtn.disabled = false;
  modalSaveBtn.textContent = 'Salvar';
  resourceModal.classList.remove('hidden');
  resourceTitle.focus();
}

async function openEditModal(id) {
  try {
    const res = await fetch(`${API_BASE}/resources/${id}`);
    if (!res.ok) { showAdminStatus('Recurso não encontrado.', 'error'); return; }
    const r = await res.json();

    editingId = r.id;
    modalTitle.textContent = 'Editar Recurso';
    resourceId.value = r.id;
    resourceTitle.value = r.title;
    resourceCategory.value = r.category;
    resourceDescription.value = r.description || '';
    resourceLink.value = r.link || '';
    clearModalError();
    modalSaveBtn.disabled = false;
    modalSaveBtn.textContent = 'Salvar';
    resourceModal.classList.remove('hidden');
    resourceTitle.focus();
  } catch {
    showAdminStatus('Erro ao carregar recurso para edição.', 'error');
  }
}

// Expose to inline onclick handlers
window.openEditModal = openEditModal;
window.openDeleteConfirm = openDeleteConfirm;

function closeModal() {
  resourceModal.classList.add('hidden');
  editingId = null;
}

newResourceBtn.addEventListener('click', openNewModal);
modalClose.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);

// Close modal on overlay click
resourceModal.addEventListener('click', (e) => {
  if (e.target === resourceModal) closeModal();
});

// ── Save Resource (Create / Update) ───────────────────────────

resourceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearModalError();

  const title = resourceTitle.value.trim();
  if (!title) {
    setModalError('O título é obrigatório.');
    resourceTitle.focus();
    return;
  }

  const payload = {
    title,
    category: resourceCategory.value,
    description: resourceDescription.value.trim(),
    link: resourceLink.value.trim(),
  };

  modalSaveBtn.disabled = true;
  modalSaveBtn.textContent = 'Salvando...';

  const isEdit = editingId !== null;
  const url = isEdit ? `${API_BASE}/resources/${editingId}` : `${API_BASE}/resources`;
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status === 401) {
      closeModal();
      logout();
      return;
    }
    if (!res.ok) {
      setModalError(data.error || 'Erro ao salvar recurso.');
      return;
    }

    closeModal();
    showAdminStatus(isEdit ? 'Recurso atualizado com sucesso!' : 'Recurso criado com sucesso!', 'success');
    loadResources();
  } catch (err) {
    console.error('Save resource error:', err);
    setModalError('Erro de conexão ao salvar recurso.');
  } finally {
    modalSaveBtn.disabled = false;
    modalSaveBtn.textContent = 'Salvar';
  }
});

// ── Delete Resource ───────────────────────────────────────────

function openDeleteConfirm(id) {
  pendingDeleteId = id;
  confirmModal.classList.remove('hidden');
}

function closeConfirmModal() {
  confirmModal.classList.add('hidden');
  pendingDeleteId = null;
}

confirmCancelBtn.addEventListener('click', closeConfirmModal);

confirmModal.addEventListener('click', (e) => {
  if (e.target === confirmModal) closeConfirmModal();
});

confirmOkBtn.addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  const id = pendingDeleteId;
  closeConfirmModal();

  try {
    const res = await fetch(`${API_BASE}/resources/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });

    if (res.status === 401) { logout(); return; }
    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => ({}));
      showAdminStatus(data.error || 'Erro ao excluir recurso.', 'error');
      return;
    }

    showAdminStatus('Recurso excluído com sucesso!', 'success');
    loadResources();
  } catch (err) {
    console.error('Delete resource error:', err);
    showAdminStatus('Erro de conexão ao excluir recurso.', 'error');
  }
});

// ── Keyboard: ESC closes modals ───────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!resourceModal.classList.contains('hidden')) closeModal();
    if (!confirmModal.classList.contains('hidden')) closeConfirmModal();
  }
});

// ── Init ──────────────────────────────────────────────────────

if (loadStoredToken() && !isTokenExpired(token)) {
  showAdmin();
} else {
  sessionStorage.removeItem(TOKEN_KEY);
  showLogin();
}
