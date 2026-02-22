<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div>
          <p class="brand-name">Admin</p>
          <p class="brand-sub">Portfolio CMS</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <button :class="['nav-item', { active: tab === 'certs' }]" @click="tab = 'certs'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
          Certificates
          <span class="badge">{{ store.certs.length }}</span>
        </button>
        <button :class="['nav-item', { active: tab === 'projects' }]" @click="tab = 'projects'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          Projects
          <span class="badge">{{ store.projects.length }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <a href="#/" class="btn-view-site" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          View Site
        </a>
        <button class="btn-logout" @click="logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="admin-main">
      <!-- ── CERTIFICATES TAB ── -->
      <template v-if="tab === 'certs'">
        <div class="page-header">
          <div>
            <h1 class="page-title">Certificates</h1>
            <p class="page-sub">Manage your certificate gallery</p>
          </div>
          <button class="btn-primary" @click="openCertModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Certificate
          </button>
        </div>

        <div class="card-grid">
          <div class="admin-cert-card" v-for="c in store.certs" :key="c.id">
            <div class="admin-cert-img">
              <img :src="c.image" :alt="c.title" />
            </div>
            <div class="admin-cert-info">
              <span class="admin-cert-issuer">{{ c.issuer }}</span>
              <p class="admin-cert-title">{{ c.title }}</p>
              <span class="admin-cert-date">{{ c.date }}</span>
            </div>
            <div class="admin-cert-actions">
              <button class="action-btn edit" @click="openCertModal(c)" title="Edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="action-btn delete" @click="confirmDelete('cert', c.id)" title="Delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- ── PROJECTS TAB ── -->
      <template v-if="tab === 'projects'">
        <div class="page-header">
          <div>
            <h1 class="page-title">Projects</h1>
            <p class="page-sub">Manage your featured projects</p>
          </div>
          <button class="btn-primary" @click="openProjectModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Project
          </button>
        </div>

        <div class="table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Project</th><th>Tags</th><th>GitHub</th><th>Demo</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in store.projects" :key="p.id">
                <td>
                  <div class="proj-cell">
                    <span class="proj-emoji">{{ p.emoji }}</span>
                    <span class="proj-name">{{ p.title }}</span>
                  </div>
                </td>
                <td>
                  <div class="tag-list">
                    <span class="tag" v-for="t in p.tags" :key="t">{{ t }}</span>
                  </div>
                </td>
                <td><a :href="p.github" target="_blank" class="link-cell" v-if="p.github">🔗 Link</a><span v-else class="no-val">—</span></td>
                <td><a :href="p.demo" target="_blank" class="link-cell" v-if="p.demo">🔗 Demo</a><span v-else class="no-val">—</span></td>
                <td>
                  <div class="row-actions">
                    <button class="action-btn edit" @click="openProjectModal(p)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="action-btn delete" @click="confirmDelete('project', p.id)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </main>

    <!-- ── CERTIFICATE MODAL ── -->
    <Transition name="modal">
      <div v-if="certModal.open" class="modal-backdrop" @click.self="certModal.open = false">
        <div class="modal-box">
          <div class="modal-header">
            <h2>{{ certModal.isEdit ? 'Edit Certificate' : 'Add Certificate' }}</h2>
            <button class="modal-close" @click="certModal.open = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form @submit.prevent="saveCert" class="modal-form">
            <!-- Image upload -->
            <div class="field">
              <label>Certificate Image</label>
              <div class="img-upload-area" @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="onDrop">
                <img v-if="certModal.form.image" :src="certModal.form.image" class="preview-img" />
                <div v-else class="upload-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span>Click or drag image here</span>
                  <span class="upload-hint">PNG, JPG, WebP</span>
                </div>
              </div>
              <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileChange" />
            </div>

            <div class="field-row">
              <div class="field">
                <label>Title *</label>
                <input v-model="certModal.form.title" required placeholder="e.g. AWS Cloud Practitioner" />
              </div>
              <div class="field">
                <label>Issuer *</label>
                <input v-model="certModal.form.issuer" required placeholder="e.g. Amazon Web Services" />
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label>Year *</label>
                <input v-model="certModal.form.date" required placeholder="2024" />
              </div>
              <div class="field">
                <label>Credential URL</label>
                <input v-model="certModal.form.url" type="url" placeholder="https://..." />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="certModal.open = false">Cancel</button>
              <button type="submit" class="btn-primary">{{ certModal.isEdit ? 'Save Changes' : 'Add Certificate' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ── PROJECT MODAL ── -->
    <Transition name="modal">
      <div v-if="projModal.open" class="modal-backdrop" @click.self="projModal.open = false">
        <div class="modal-box modal-wide">
          <div class="modal-header">
            <h2>{{ projModal.isEdit ? 'Edit Project' : 'Add Project' }}</h2>
            <button class="modal-close" @click="projModal.open = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form @submit.prevent="saveProject" class="modal-form">
            <div class="field-row">
              <div class="field">
                <label>Title *</label>
                <input v-model="projModal.form.title" required placeholder="Project name" />
              </div>
              <div class="field" style="max-width:90px">
                <label>Emoji</label>
                <input v-model="projModal.form.emoji" placeholder="🚀" maxlength="2" />
              </div>
            </div>
            <div class="field">
              <label>Description *</label>
              <textarea v-model="projModal.form.desc" required placeholder="Short project description..." rows="3" />
            </div>
            <div class="field">
              <label>Tags <span class="hint">(comma-separated)</span></label>
              <input v-model="tagsInput" placeholder="Vue, Node.js, Docker" />
            </div>
            <div class="field-row">
              <div class="field">
                <label>GitHub URL</label>
                <input v-model="projModal.form.github" type="url" placeholder="https://github.com/..." />
              </div>
              <div class="field">
                <label>Demo URL</label>
                <input v-model="projModal.form.demo" type="url" placeholder="https://..." />
              </div>
            </div>
            <div class="field">
              <label>Card Gradient</label>
              <div class="gradient-options">
                <div
                  v-for="g in gradients"
                  :key="g"
                  class="gradient-swatch"
                  :style="{ background: g }"
                  :class="{ selected: projModal.form.gradient === g }"
                  @click="projModal.form.gradient = g"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="projModal.open = false">Cancel</button>
              <button type="submit" class="btn-primary">{{ projModal.isEdit ? 'Save Changes' : 'Add Project' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ── DELETE CONFIRM ── -->
    <Transition name="modal">
      <div v-if="deleteConfirm.open" class="modal-backdrop" @click.self="deleteConfirm.open = false">
        <div class="modal-box modal-sm">
          <div class="delete-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </div>
          <h2 class="delete-title">Delete Item?</h2>
          <p class="delete-sub">This action cannot be undone.</p>
          <div class="modal-footer" style="justify-content:center;gap:1rem;margin-top:1.5rem">
            <button class="btn-cancel" @click="deleteConfirm.open = false">Cancel</button>
            <button class="btn-danger" @click="doDelete">Delete</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../composables/useStore.js'

const router = useRouter()
const store = useStore()

const tab = ref('certs')

// ── Auth ──
function logout() {
  sessionStorage.removeItem('admin_auth')
  router.push('/admin')
}

// ── Certificate Modal ──
const certModal = reactive({ open: false, isEdit: false, form: emptyCertForm() })
const fileInput = ref(null)

function emptyCertForm() {
  return { id: null, title: '', issuer: '', date: '', image: '', url: '' }
}
function openCertModal(cert = null) {
  certModal.isEdit = !!cert
  certModal.form = cert
    ? { ...cert }
    : emptyCertForm()
  certModal.open = true
}
function saveCert() {
  if (certModal.isEdit) {
    store.updateCert(certModal.form.id, { ...certModal.form })
  } else {
    store.addCert({ ...certModal.form })
  }
  certModal.open = false
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) fileToBase64(file)
}
function onDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file) fileToBase64(file)
}
function fileToBase64(file) {
  const reader = new FileReader()
  reader.onload = (e) => { certModal.form.image = e.target.result }
  reader.readAsDataURL(file)
}

// ── Project Modal ──
const projModal = reactive({ open: false, isEdit: false, form: emptyProjForm() })
const tagsInput = ref('')

const gradients = [
  'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
  'linear-gradient(135deg, #0c1445 0%, #1a0533 100%)',
  'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
  'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
  'linear-gradient(135deg, #3f0012 0%, #7f1d1d 100%)',
  'linear-gradient(135deg, #0c2340 0%, #1e3a5f 100%)',
  'linear-gradient(135deg, #ff9900 0%, #c97a00 100%)',
  'linear-gradient(135deg, #2496ed 0%, #0d6eab 100%)',
  'linear-gradient(135deg, #42b883 0%, #2d8a62 100%)',
]

function emptyProjForm() {
  return { id: null, title: '', desc: '', emoji: '🚀', tags: [], github: '', demo: '', gradient: gradients[0] }
}
function openProjectModal(proj = null) {
  projModal.isEdit = !!proj
  if (proj) {
    projModal.form = { ...proj, tags: [...proj.tags] }
    tagsInput.value = proj.tags.join(', ')
  } else {
    projModal.form = emptyProjForm()
    tagsInput.value = ''
  }
  projModal.open = true
}
function saveProject() {
  projModal.form.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  if (projModal.isEdit) {
    store.updateProject(projModal.form.id, { ...projModal.form })
  } else {
    store.addProject({ ...projModal.form })
  }
  projModal.open = false
}

// ── Delete Confirm ──
const deleteConfirm = reactive({ open: false, type: '', id: null })
function confirmDelete(type, id) {
  deleteConfirm.type = type
  deleteConfirm.id = id
  deleteConfirm.open = true
}
function doDelete() {
  if (deleteConfirm.type === 'cert') store.deleteCert(deleteConfirm.id)
  else store.deleteProject(deleteConfirm.id)
  deleteConfirm.open = false
}
</script>

<style scoped>
/* ── Layout ── */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--clr-bg, #080b14);
  font-family: inherit;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.07);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  height: 100vh;
}
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.5rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  margin-bottom: 1.25rem;
}
.brand-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.brand-icon svg { width: 20px; height: 20px; color: #fff; }
.brand-name { font-weight: 800; font-size: 0.95rem; color: #fff; margin: 0; line-height: 1.2; }
.brand-sub { font-size: 0.7rem; color: rgba(255,255,255,0.35); margin: 0; }

.sidebar-nav { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; }
.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: none;
  background: none;
  color: rgba(255,255,255,0.55);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}
.nav-item svg { width: 17px; height: 17px; flex-shrink: 0; }
.nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
.nav-item.active { background: rgba(99,102,241,0.18); color: #a78bfa; }
.badge {
  margin-left: auto;
  background: rgba(99,102,241,0.25);
  color: #a78bfa;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 100px;
}

.sidebar-footer { display: flex; flex-direction: column; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.07); }
.btn-view-site, .btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}
.btn-view-site { color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.08); background: none; }
.btn-view-site:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
.btn-logout { color: #f87171; border: 1px solid rgba(248,113,113,0.2); background: none; }
.btn-logout:hover { background: rgba(248,113,113,0.1); }
.btn-view-site svg, .btn-logout svg { width: 14px; height: 14px; }

/* ── Main ── */
.admin-main { flex: 1; padding: 2rem 2.5rem; overflow-y: auto; }

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.page-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0 0 0.2rem; }
.page-sub { font-size: 0.82rem; color: rgba(255,255,255,0.4); margin: 0; }

/* ── Cert Grid ── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
.admin-cert-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.admin-cert-card:hover { border-color: rgba(167,139,250,0.3); }
.admin-cert-img { aspect-ratio: 16/10; overflow: hidden; }
.admin-cert-img img { width: 100%; height: 100%; object-fit: cover; }
.admin-cert-info { padding: 0.9rem 0.9rem 0.5rem; }
.admin-cert-issuer { font-size: 0.65rem; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.08em; }
.admin-cert-title { font-size: 0.82rem; font-weight: 700; color: #fff; margin: 0.25rem 0 0.3rem; line-height: 1.35; }
.admin-cert-date { font-size: 0.72rem; color: rgba(255,255,255,0.4); }
.admin-cert-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem 0.9rem;
}

/* ── Table ── */
.table-wrap { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; }
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 0.9rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.admin-table td {
  padding: 0.85rem 1rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.8);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.admin-table tr:last-child td { border-bottom: none; }
.proj-cell { display: flex; align-items: center; gap: 0.65rem; }
.proj-emoji { font-size: 1.2rem; }
.proj-name { font-weight: 600; color: #fff; }
.tag-list { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.tag { font-size: 0.68rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 100px; background: rgba(99,102,241,0.15); color: #a78bfa; border: 1px solid rgba(99,102,241,0.2); }
.link-cell { color: #a78bfa; text-decoration: none; font-size: 0.8rem; }
.link-cell:hover { color: #c4b5fd; }
.no-val { color: rgba(255,255,255,0.2); }
.row-actions { display: flex; gap: 0.4rem; }

/* ── Action Buttons ── */
.action-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);
  background: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.action-btn svg { width: 14px; height: 14px; }
.action-btn.edit { color: rgba(255,255,255,0.5); }
.action-btn.edit:hover { background: rgba(99,102,241,0.15); color: #a78bfa; border-color: rgba(99,102,241,0.3); }
.action-btn.delete { color: rgba(255,255,255,0.4); }
.action-btn.delete:hover { background: rgba(248,113,113,0.1); color: #f87171; border-color: rgba(248,113,113,0.3); }

/* ── Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  color: #fff;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  white-space: nowrap;
}
.btn-primary svg { width: 16px; height: 16px; }
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-cancel {
  padding: 0.6rem 1.1rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.15);
  background: none;
  color: rgba(255,255,255,0.7);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover { background: rgba(255,255,255,0.06); color: #fff; }
.btn-danger {
  padding: 0.6rem 1.1rem;
  border-radius: 10px;
  border: 1px solid rgba(248,113,113,0.3);
  background: rgba(248,113,113,0.1);
  color: #f87171;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-danger:hover { background: rgba(248,113,113,0.2); }

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-box {
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  background: #0f1220;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px;
  padding: 1.75rem;
}
.modal-wide { max-width: 640px; }
.modal-sm { max-width: 360px; text-align: center; }
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.modal-header h2 { font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0; }
.modal-close {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.modal-close svg { width: 14px; height: 14px; }
.modal-close:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
.field label { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.6); }
.field label .hint { font-weight: 400; color: rgba(255,255,255,0.35); }
.field input, .field textarea {
  padding: 0.65rem 0.85rem;
  border-radius: 9px;
  border: 1.5px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 0.88rem;
  transition: border-color 0.2s;
  resize: vertical;
  font-family: inherit;
}
.field input:focus, .field textarea:focus { outline: none; border-color: #6366f1; }
.field-row { display: flex; gap: 0.85rem; }

/* Image upload */
.img-upload-area {
  border: 2px dashed rgba(255,255,255,0.12);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}
.img-upload-area:hover { border-color: #6366f1; }
.preview-img { width: 100%; object-fit: cover; display: block; max-height: 200px; }
.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.35);
  padding: 2rem;
}
.upload-placeholder svg { width: 36px; height: 36px; }
.upload-placeholder span { font-size: 0.82rem; }
.upload-hint { font-size: 0.72rem !important; color: rgba(255,255,255,0.2); }

/* Gradient swatches */
.gradient-options { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.gradient-swatch {
  width: 44px; height: 30px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.15s;
}
.gradient-swatch:hover { transform: scale(1.1); }
.gradient-swatch.selected { border-color: #a78bfa; }

.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }

/* Delete modal */
.delete-icon {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba(248,113,113,0.12);
  border: 1px solid rgba(248,113,113,0.25);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
  color: #f87171;
}
.delete-icon svg { width: 22px; height: 22px; }
.delete-title { font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0 0 0.3rem; }
.delete-sub { font-size: 0.82rem; color: rgba(255,255,255,0.4); margin: 0; }

/* Transitions */
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
