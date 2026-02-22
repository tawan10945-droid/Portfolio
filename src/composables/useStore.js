import { reactive, watch } from 'vue'
import { defaultCerts, defaultProjects } from './defaultData.js'

function load(key, fallback) {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(fallback))
    } catch {
        return JSON.parse(JSON.stringify(fallback))
    }
}

const state = reactive({
    certs: load('portfolio_certs', defaultCerts),
    projects: load('portfolio_projects', defaultProjects),
})

watch(() => state.certs, val => localStorage.setItem('portfolio_certs', JSON.stringify(val)), { deep: true })
watch(() => state.projects, val => localStorage.setItem('portfolio_projects', JSON.stringify(val)), { deep: true })

export function useStore() {
    // ── Certificates ──
    function addCert(cert) {
        cert.id = Date.now()
        state.certs.push(cert)
    }
    function updateCert(id, data) {
        const i = state.certs.findIndex(c => c.id === id)
        if (i !== -1) state.certs[i] = { ...state.certs[i], ...data }
    }
    function deleteCert(id) {
        state.certs = state.certs.filter(c => c.id !== id)
    }

    // ── Projects ──
    function addProject(project) {
        project.id = Date.now()
        state.projects.push(project)
    }
    function updateProject(id, data) {
        const i = state.projects.findIndex(p => p.id === id)
        if (i !== -1) state.projects[i] = { ...state.projects[i], ...data }
    }
    function deleteProject(id) {
        state.projects = state.projects.filter(p => p.id !== id)
    }

    function resetToDefaults() {
        state.certs = JSON.parse(JSON.stringify(defaultCerts))
        state.projects = JSON.parse(JSON.stringify(defaultProjects))
    }

    return {
        certs: state.certs,
        projects: state.projects,
        addCert, updateCert, deleteCert,
        addProject, updateProject, deleteProject,
        resetToDefaults,
    }
}
