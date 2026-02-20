<template>
  <section id="certificates" class="section certificates">
    <div class="container">
      <div class="section-header fade-in" ref="headerEl">
        <span class="section-label">Credentials</span>
        <h2 class="section-title">Certificates & Achievements</h2>
        <p class="section-subtitle">Professional certifications that validate my expertise.</p>
      </div>

      <div class="cert-grid">
        <article class="cert-card glass-card fade-in" v-for="(c, i) in certs" :key="c.title" :style="{ transitionDelay: i * 0.08 + 's' }">
          <div class="cert-logo" :style="{ background: c.bg }">
            <span>{{ c.abbr }}</span>
          </div>
          <div class="cert-body">
            <span class="cert-issuer">{{ c.issuer }}</span>
            <h3 class="cert-title">{{ c.title }}</h3>
            <div class="cert-meta">
              <span class="cert-date">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ c.date }}
              </span>
            </div>
            <a v-if="c.url" :href="c.url" target="_blank" rel="noopener" class="cert-link">
              View Credential
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const headerEl = ref(null)

const certs = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    abbr: 'AWS',
    bg: 'linear-gradient(135deg, #ff9900 0%, #c97a00 100%)',
    url: 'https://aws.amazon.com/certification/',
  },
  {
    title: 'Docker Certified Associate',
    issuer: 'Docker, Inc.',
    date: '2024',
    abbr: 'DC',
    bg: 'linear-gradient(135deg, #2496ed 0%, #0d6eab 100%)',
    url: 'https://www.docker.com/certification/',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    abbr: 'FCC',
    bg: 'linear-gradient(135deg, #0a0a23 0%, #1b1b32 100%)',
    url: 'https://www.freecodecamp.org/',
  },
  {
    title: 'TypeScript Fundamentals',
    issuer: 'Microsoft Learn',
    date: '2023',
    abbr: 'TS',
    bg: 'linear-gradient(135deg, #3178c6 0%, #2563a8 100%)',
    url: 'https://learn.microsoft.com',
  },
  {
    title: 'Vue.js — The Complete Guide',
    issuer: 'Udemy',
    date: '2023',
    abbr: 'VUE',
    bg: 'linear-gradient(135deg, #42b883 0%, #2d8a62 100%)',
    url: 'https://www.udemy.com/',
  },
  {
    title: 'Node.js Developer',
    issuer: 'Coursera',
    date: '2022',
    abbr: 'NODE',
    bg: 'linear-gradient(135deg, #68a063 0%, #4a7245 100%)',
    url: 'https://www.coursera.org/',
  },
]

onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1 })
  ;[headerEl.value].forEach(r => r && obs.observe(r))
  document.querySelectorAll('.cert-card.fade-in').forEach(c => obs.observe(c))
})
</script>

<style scoped>
.certificates { background: var(--clr-surface-2); }

.section-header { margin-bottom: 3rem; }

.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.cert-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
}

.cert-logo {
  flex-shrink: 0;
  width: 52px; height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.02em;
}

.cert-body { flex: 1; min-width: 0; }

.cert-issuer {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--clr-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cert-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
  margin: 0.35rem 0 0.5rem;
  line-height: 1.35;
}

.cert-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.cert-date {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--clr-text-muted);
}

.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #a78bfa;
  transition: gap 0.2s;
}
.cert-link:hover { gap: 0.55rem; }

@media (max-width: 1100px) { .cert-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px)  { .cert-grid { grid-template-columns: 1fr;    } }
</style>
