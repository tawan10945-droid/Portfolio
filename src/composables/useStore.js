import { reactive } from 'vue'
import { defaultCerts, defaultProjects } from './defaultData.js'
import { db } from '../firebase.js'
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, writeBatch } from 'firebase/firestore'

const state = reactive({
    certs: [],
    projects: [],
    initializedFirebase: false
})

export function useStore() {
    if (!state.initializedFirebase) {
        state.initializedFirebase = true;

        onSnapshot(collection(db, 'certs'), (snapshot) => {
            const certs = [];
            snapshot.forEach(d => {
                certs.push({ ...d.data(), id: d.id });
            });

            state.certs.splice(0, state.certs.length); // Clear array
            if (certs.length === 0) {
                state.certs.push(...defaultCerts);
            } else {
                state.certs.push(...certs.sort((a, b) => (a.id > b.id ? 1 : -1)));
            }
        });

        onSnapshot(collection(db, 'projects'), (snapshot) => {
            const projects = [];
            snapshot.forEach(d => {
                projects.push({ ...d.data(), id: d.id });
            });

            state.projects.splice(0, state.projects.length);
            if (projects.length === 0) {
                state.projects.push(...defaultProjects);
            } else {
                state.projects.push(...projects.sort((a, b) => (a.id > b.id ? 1 : -1)));
            }
        });
    }

    async function addCert(cert) {
        const id = Date.now().toString();
        await setDoc(doc(db, 'certs', id), { ...cert, id });
    }
    async function updateCert(id, data) {
        const clone = { ...data };
        await updateDoc(doc(db, 'certs', id.toString()), clone);
    }
    async function deleteCert(id) {
        await deleteDoc(doc(db, 'certs', id.toString()));
    }

    async function addProject(project) {
        const id = Date.now().toString();
        await setDoc(doc(db, 'projects', id), { ...project, id });
    }
    async function updateProject(id, data) {
        const clone = { ...data };
        await updateDoc(doc(db, 'projects', id.toString()), clone);
    }
    async function deleteProject(id) {
        await deleteDoc(doc(db, 'projects', id.toString()));
    }

    async function resetToDefaults() {
        const batch = writeBatch(db);
        defaultCerts.forEach(c => {
            batch.set(doc(db, 'certs', c.id.toString()), { ...c, id: c.id.toString() });
        });
        defaultProjects.forEach(p => {
            batch.set(doc(db, 'projects', p.id.toString()), { ...p, id: p.id.toString() });
        });
        await batch.commit();
    }

    return {
        get certs() { return state.certs },
        get projects() { return state.projects },
        addCert, updateCert, deleteCert,
        addProject, updateProject, deleteProject,
        resetToDefaults,
    }
}
