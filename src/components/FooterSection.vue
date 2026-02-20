<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <p class="footer-tagline">Crafting digital experiences with passion & precision.</p>
      </div>

      <nav class="footer-nav">
        <a v-for="l in links" :key="l.to" :href="'#' + l.to" @click.prevent="scrollTo(l.to)">{{ l.label }}</a>
      </nav>

      <button class="back-top" @click="scrollTo('hero')" aria-label="Back to top">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
    </div>
    <div class="footer-bottom">
      <span>© {{ year }} Tawan Yoobanklong. All rights reserved.</span>
      <span>Built with <span class="heart">♥</span> using <span class="text-gradient">Vue 3 + Vite</span></span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const links = [
  { label: 'About',        to: 'about'        },
  { label: 'Skills',       to: 'skills'       },
  { label: 'Projects',     to: 'projects'     },
  { label: 'Certificates', to: 'certificates' },
  { label: 'Contact',      to: 'contact'      },
]
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: var(--clr-surface);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 3rem 0 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding-bottom: 2.5rem;
}

/* Logo */
.footer-logo {
  display: inline-flex;
  gap: 2px;
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.6rem;
}
.logo-bracket { color: #7c3aed; }
.footer-tagline { font-size: 0.82rem; color: var(--clr-text-muted); max-width: 260px; line-height: 1.5; }

/* Nav */
.footer-nav {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}
.footer-nav a {
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  color: var(--clr-text-muted);
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.footer-nav a:hover { color: #fff; background: rgba(255,255,255,0.05); }

/* Back to top */
.back-top {
  width: 42px; height: 42px;
  border-radius: 10px;
  background: rgba(124,58,237,0.15);
  border: 1px solid rgba(124,58,237,0.25);
  color: #a78bfa;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
}
.back-top:hover { background: rgba(124,58,237,0.3); transform: translateY(-2px); }

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--clr-text-muted);
  flex-wrap: wrap;
  gap: 0.5rem;
}
.heart { color: #f43f5e; }

@media (max-width: 640px) {
  .footer-inner { flex-direction: column; align-items: flex-start; }
  .footer-bottom { justify-content: center; text-align: center; }
}
</style>
