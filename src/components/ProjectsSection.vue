<template>
  <section id="projects" class="section projects">
    <div class="container">
      <div class="section-header fade-in" ref="headerEl">
        <span class="section-label">What I've Built</span>
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-subtitle">A selection of personal and professional projects I'm proud of.</p>
      </div>

      <div class="projects-grid">
        <article class="project-card glass-card fade-in" ref="el" v-for="(p, i) in store.projects" :key="p.id || p.title" :style="{ transitionDelay: i * 0.1 + 's' }">
          <div class="project-banner" :style="{ background: p.gradient }">
            <span class="project-emoji">{{ p.emoji }}</span>
          </div>
          <div class="project-body">
            <div class="project-tags">
              <span class="tag" v-for="t in p.tags" :key="t">{{ t }}</span>
            </div>
            <h3 class="project-title">{{ p.title }}</h3>
            <p class="project-desc">{{ p.desc }}</p>
            <div class="project-links">
              <a :href="p.github" target="_blank" rel="noopener" class="link-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                GitHub
              </a>
              <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener" class="link-btn link-demo">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useStore } from '../composables/useStore.js'

const store = useStore()
const headerEl = ref(null)
const el = ref(null)



onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1 })
  ;[headerEl.value].forEach(r => r && obs.observe(r))
  
  const observeCards = () => {
      document.querySelectorAll('.project-card.fade-in').forEach(c => obs.observe(c))
  }
  observeCards()
  watch(() => store.projects, async () => {
      await nextTick()
      // Force visible for async-loaded data (works reliably on mobile too)
      document.querySelectorAll('.project-card.fade-in').forEach(c => {
        c.classList.add('visible')
      })
  }, { deep: true })
})
</script>

<style scoped>
.projects { background: linear-gradient(180deg, var(--clr-surface) 0%, var(--clr-bg) 100%); }

.section-header { margin-bottom: 3rem; }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.project-card { overflow: hidden; display: flex; flex-direction: column; }

.project-banner {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.project-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
}
.tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  background: rgba(124,58,237,0.15);
  color: #a78bfa;
  border: 1px solid rgba(124,58,237,0.2);
}

.project-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.6rem;
}

.project-desc {
  font-size: 0.875rem;
  color: var(--clr-text-muted);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 1.25rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}
.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--clr-text-muted);
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.2s;
}
.link-btn:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
.link-demo { color: #a78bfa; border-color: rgba(124,58,237,0.25); }
.link-demo:hover { background: rgba(124,58,237,0.1); }

@media (max-width: 1100px) { .projects-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px)  { .projects-grid { grid-template-columns: 1fr;    } }
</style>
