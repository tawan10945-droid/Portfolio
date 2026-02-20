<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="contact-grid">
        <!-- Left Info -->
        <div class="contact-info fade-in" ref="infoEl">
          <span class="section-label">Get In Touch</span>
          <h2 class="section-title">Let's Work Together</h2>
          <p class="contact-desc">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Drop me a message and I'll get back to you as soon as possible.
          </p>

          <div class="contact-details">
            <div class="detail-item" v-for="d in details" :key="d.label">
              <div class="detail-icon" v-html="d.icon"></div>
              <div>
                <span class="detail-label">{{ d.label }}</span>
                <a :href="d.href" class="detail-value">{{ d.value }}</a>
              </div>
            </div>
          </div>

          <div class="social-links">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" :aria-label="s.label" class="social-link">
              <span v-html="s.icon"></span>
            </a>
          </div>
        </div>

        <!-- Right Form -->
        <div class="contact-form-wrap glass-card fade-in" ref="formEl">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="cf-name">Your Name</label>
                <input id="cf-name" v-model="form.name" type="text" placeholder="John Doe" required />
              </div>
              <div class="form-group">
                <label for="cf-email">Email Address</label>
                <input id="cf-email" v-model="form.email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div class="form-group">
              <label for="cf-subject">Subject</label>
              <input id="cf-subject" v-model="form.subject" type="text" placeholder="Project inquiry..." />
            </div>
            <div class="form-group">
              <label for="cf-message">Message</label>
              <textarea id="cf-message" v-model="form.message" rows="5" placeholder="Tell me about your project..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary submit-btn" :disabled="status === 'sending'">
              <!-- Idle -->
              <span v-if="status === 'idle'" style="display:flex;align-items:center;gap:0.5rem;">
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </span>
              <!-- Sending -->
              <span v-else-if="status === 'sending'" style="display:flex;align-items:center;gap:0.5rem;">
                <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
                Sending…
              </span>
              <!-- Success -->
              <span v-else-if="status === 'success'" style="display:flex;align-items:center;gap:0.5rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Message Sent!
              </span>
              <!-- Error -->
              <span v-else style="display:flex;align-items:center;gap:0.5rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Failed — Try Again
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'

// ─── EmailJS credentials ───────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add a Gmail/Outlook service → copy the Service ID below
// 3. Create an email template → copy the Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xxxxxx'
// ───────────────────────────────────────────────────────────────────────────────

const infoEl  = ref(null)
const formEl  = ref(null)

// status: 'idle' | 'sending' | 'success' | 'error'
const status = ref('idle')

const form = reactive({ name: '', email: '', subject: '', message: '' })

const details = [
  {
    label: 'Email',
    value: 'tawan10945@gmail.com',
    href: 'mailto:tawan10945@gmail.com',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  },
  {
    label: 'Location',
    value: 'Bangkok, Thailand',
    href: '#',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/tawan10945-droid',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tawan-yoobanklong-338ab6387',
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>',
  },
]

async function submitForm() {
  if (status.value === 'sending') return
  status.value = 'sending'

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject || '(No subject)',
        message:    form.message,
        to_email:   'tawan10945@gmail.com',
      },
      EMAILJS_PUBLIC_KEY
    )
    status.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
    setTimeout(() => { status.value = 'idle' }, 4000)
  } catch (err) {
    console.error('EmailJS error:', err)
    status.value = 'error'
    setTimeout(() => { status.value = 'idle' }, 4000)
  }
}

onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1 })
  ;[infoEl.value, formEl.value].forEach(r => r && obs.observe(r))
})
</script>

<style scoped>
.contact { background: var(--clr-bg); }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 4rem;
  align-items: start;
}

.contact-desc {
  color: var(--clr-text-muted);
  line-height: 1.75;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

/* Details */
.contact-details { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem; }
.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.detail-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.detail-label { display: block; font-size: 0.72rem; color: var(--clr-text-muted); font-weight: 500; margin-bottom: 0.15rem; }
.detail-value { font-size: 0.9rem; font-weight: 600; color: var(--clr-text); transition: color 0.2s; }
.detail-value:hover { color: #a78bfa; }

/* Socials */
.social-links { display: flex; gap: 0.75rem; }
.social-link {
  display: flex; align-items: center; justify-content: center;
  width: 42px; height: 42px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  color: var(--clr-text-muted);
  transition: all 0.25s;
}
.social-link:hover { color: #fff; background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.4); transform: translateY(-2px); }

/* Form */
.contact-form-wrap { padding: 2.5rem; }
.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.45rem; }
.form-group label { font-size: 0.82rem; font-weight: 600; color: var(--clr-text-muted); }
.form-group input,
.form-group textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: rgba(255,255,255,0.25); }
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(124,58,237,0.5);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
}

.submit-btn { align-self: flex-start; }
.submit-btn:disabled { opacity: 0.7; cursor: default; }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .form-row    { grid-template-columns: 1fr; }
}
</style>
