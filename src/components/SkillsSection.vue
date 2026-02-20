<template>
  <section id="skills" class="section skills">
    <div class="container">
      <div class="section-header fade-in" ref="headerEl">
        <span class="section-label">What I Know</span>
        <h2 class="section-title">Skills & Technologies</h2>
        <p class="section-subtitle">A collection of tools and languages I work with regularly.</p>
      </div>

      <div class="skills-categories fade-in" ref="el">
        <div class="skill-category glass-card" v-for="cat in categories" :key="cat.name">
          <div class="cat-header">
            <span class="cat-icon" v-html="cat.icon"></span>
            <h3 class="cat-name">{{ cat.name }}</h3>
          </div>
          <div class="skill-pills">
            <span class="pill" v-for="skill in cat.skills" :key="skill.name" :style="{ '--color': skill.color }">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el       = ref(null)
const headerEl = ref(null)

const categories = [
  {
    name: 'Frontend',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    skills: [
      { name: 'Vue.js',      color: '#42b883' },
      { name: 'React',       color: '#61dafb' },
      { name: 'TypeScript',  color: '#3178c6' },
      { name: 'JavaScript',  color: '#f7df1e' },
      { name: 'HTML5',       color: '#e34f26' },
      { name: 'CSS3',        color: '#1572b6' },
      { name: 'Vite',        color: '#bd34fe' },
    ],
  },
  {
    name: 'Backend',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    skills: [
      { name: 'Node.js',     color: '#68a063' },
      { name: 'Express',     color: '#a0aec0' },
      { name: 'Python',      color: '#3776ab' },
      { name: 'MySQL',       color: '#4479a1' },
      { name: 'PostgreSQL',  color: '#336791' },
      { name: 'REST APIs',   color: '#7c3aed' },
    ],
  },
  {
    name: 'Tools & Cloud',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f9a8d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    skills: [
      { name: 'Docker',      color: '#2496ed' },
      { name: 'AWS',         color: '#ff9900' },
      { name: 'Git',         color: '#f05032' },
      { name: 'GitHub',      color: '#e2e8f0' },
      { name: 'VS Code',     color: '#007acc' },
    ],
  },
]

onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1 })
  ;[headerEl.value, el.value].forEach(r => r && obs.observe(r))
})
</script>

<style scoped>
.skills { background: var(--clr-surface); }

.section-header { margin-bottom: 3rem; }

.skills-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.skill-category {
  padding: 2rem;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.cat-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.skill-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.pill {
  padding: 0.35rem 0.85rem;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--color) 12%, transparent);
  color: var(--color);
  border: 1px solid color-mix(in srgb, var(--color) 25%, transparent);
  transition: transform 0.2s, box-shadow 0.2s;
}
.pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color) 30%, transparent);
}

@media (max-width: 900px) {
  .skills-categories { grid-template-columns: 1fr; }
}
@media (min-width: 601px) and (max-width: 900px) {
  .skills-categories { grid-template-columns: 1fr 1fr; }
}
</style>
