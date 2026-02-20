<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about-grid fade-in" ref="el">
        <!-- Left: Image & Stats -->
        <div class="about-left">
          <div class="about-avatar">
            <div class="avatar-img">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="48" r="24" fill="#a78bfa" opacity="0.85"/>
                <ellipse cx="60" cy="102" rx="36" ry="20" fill="#7c3aed" opacity="0.65"/>
              </svg>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card glass-card" v-for="s in stats" :key="s.label">
              <span class="stat-num text-gradient">{{ s.number }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Text -->
        <div class="about-right">
          <span class="section-label">Who I Am</span>
          <h2 class="section-title">Crafting Digital Experiences with Passion</h2>
          <p class="about-bio">
            I'm a full-stack developer with a love for building elegant, scalable web applications.
            With experience across both frontend and backend, I bring ideas to life from concept to deployment.
          </p>
          <p class="about-bio">
            When I'm not coding, you'll find me exploring new technologies, contributing to open source,
            or levelling up my design skills.
          </p>

          <div class="about-highlights">
            <div class="highlight" v-for="h in highlights" :key="h">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ h }}
            </div>
          </div>

          <a href="#contact" class="btn btn-primary" style="margin-top:2rem;display:inline-flex;" @click.prevent="scrollTo('contact')">
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el = ref(null)
const stats = [
  { number: '0',  label: 'Years Experience' },
  { number: '2', label: 'Projects Completed' },
  { number: '10+', label: 'Technologies' },
  { number: '4',  label: 'Certificates' },
]
const highlights = [
  'Clean, maintainable code architecture',
  'Responsive & accessible UI design',
  'RESTful API & database design',
  'CI/CD & cloud deployment (AWS, Docker)',
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.value?.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.15 })
  if (el.value) obs.observe(el.value)
})
</script>

<style scoped>
.about { background: linear-gradient(180deg, var(--clr-bg) 0%, var(--clr-surface) 100%); }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 5rem;
  align-items: start;
}

/* Avatar */
.about-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.avatar-img {
  width: 220px; height: 220px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2));
  border: 1px solid rgba(124,58,237,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(124,58,237,0.2);
}
.avatar-img svg { width: 140px; height: 140px; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.stat-card {
  padding: 1.25rem;
  text-align: center;
}
.stat-num {
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}
.stat-label {
  font-size: 0.78rem;
  color: var(--clr-text-muted);
  font-weight: 500;
}

/* Bio */
.about-bio {
  color: var(--clr-text-muted);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* Highlights */
.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1.5rem;
}
.highlight {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
  color: var(--clr-text);
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
