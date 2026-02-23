<template>
  <div class="login-wrap">
    <div class="login-bg">
      <div class="orb orb-1" /><div class="orb orb-2" />
    </div>
    <div class="login-card glass-card">
      <div class="login-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <h1 class="login-title">Admin Panel</h1>
      <p class="login-sub">Portfolio Management</p>

      <form @submit.prevent="submit" class="login-form">
        <div class="field">
          <label for="pwd">Password</label>
          <div class="input-wrap">
            <input
              id="pwd"
              v-model="password"
              :type="show ? 'text' : 'password'"
              placeholder="Enter admin password"
              autocomplete="current-password"
              :class="{ error: hasError }"
            />
            <button type="button" class="eye-btn" @click="show = !show" tabindex="-1">
              <svg v-if="!show" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <p v-if="hasError" class="error-msg">Incorrect password. Try again.</p>
        </div>

        <button type="submit" class="btn-login" :disabled="!password">
          <span v-if="!loading">Sign In</span>
          <span v-else class="spinner" />
        </button>
      </form>

      <a href="#/" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Portfolio
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
const router = useRouter()

const password = ref('')
const show = ref(false)
const hasError = ref(false)
const loading = ref(false)

async function submit() {
  hasError.value = false
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  if (password.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_auth', 'true')
    router.push('/admin/dashboard')
  } else {
    hasError.value = true
    password.value = ''
  }
}
</script>

<style scoped>
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-bg, #080b14);
  position: relative;
  overflow: hidden;
}
.login-bg { position: absolute; inset: 0; pointer-events: none; }
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}
.orb-1 { width: 400px; height: 400px; background: #6366f1; top: -100px; left: -100px; }
.orb-2 { width: 300px; height: 300px; background: #a78bfa; bottom: -80px; right: -80px; }

.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.login-logo {
  width: 56px; height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.login-logo svg { width: 28px; height: 28px; color: #fff; }

.login-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
}
.login-sub {
  font-size: 0.82rem;
  color: var(--clr-text-muted, rgba(255,255,255,0.5));
  margin-bottom: 1.25rem;
}

.login-form { width: 100%; display: flex; flex-direction: column; gap: 1rem; }

.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.7); }

.input-wrap { position: relative; }
.input-wrap input {
  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 0.9rem;
  border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 0.92rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.input-wrap input:focus { outline: none; border-color: #6366f1; }
.input-wrap input.error { border-color: #f87171; }
.eye-btn {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  padding: 0;
  display: flex;
}
.eye-btn svg { width: 16px; height: 16px; }
.error-msg { font-size: 0.75rem; color: #f87171; margin: 0; }

.btn-login {
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #a78bfa);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-login:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
.btn-login:disabled { opacity: 0.4; cursor: not-allowed; }

.spinner {
  width: 18px; height: 18px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.back-link {
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover { color: rgba(255,255,255,0.8); }
.back-link svg { width: 14px; height: 14px; }
</style>
