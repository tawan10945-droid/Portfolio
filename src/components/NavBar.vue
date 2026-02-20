<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-inner">
      

      <!-- Desktop Links -->
      <ul class="nav-links">
        <li v-for="link in links" :key="link.to">
          <a :href="'#' + link.to" @click.prevent="scrollTo(link.to)" :class="{ active: active === link.to }">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <a href="#contact" class="btn btn-primary nav-cta" @click.prevent="scrollTo('contact')">
        Let's Talk
      </a>

      <!-- Hamburger -->
      <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Toggle menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <ul>
        <li v-for="link in links" :key="link.to">
          <a :href="'#' + link.to" @click.prevent="mobileNav(link.to)">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { label: 'About',        to: 'about'        },
  { label: 'Skills',       to: 'skills'       },
  { label: 'Projects',     to: 'projects'     },
  { label: 'Certificates', to: 'certificates' },
  { label: 'Contact',      to: 'contact'      },
]

const isScrolled = ref(false)
const menuOpen   = ref(false)
const active     = ref('hero')

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
function mobileNav(id) {
  menuOpen.value = false
  setTimeout(() => scrollTo(id), 150)
}
function onScroll() {
  isScrolled.value = window.scrollY > 48
  // Determine active section
  const ids = ['hero', 'about', 'skills', 'projects', 'certificates', 'contact']
  for (let i = ids.length - 1; i >= 0; i--) {
    const el = document.getElementById(ids[i])
    if (el && window.scrollY >= el.offsetTop - 120) {
      active.value = ids[i]
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.3s ease;
}
.navbar.scrolled {
  background: rgba(7, 7, 26, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 0.85rem 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Logo */
.nav-logo {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.logo-bracket { color: #7c3aed; }
.logo-name    { color: #fff; margin: 0 2px; }

/* Links */
.nav-links {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  margin-left: auto;
}
.nav-links a {
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #94a3b8;
  transition: color 0.2s, background 0.2s;
}
.nav-links a:hover,
.nav-links a.active {
  color: #fff;
  background: rgba(124,58,237,0.12);
}
.nav-links a.active { color: #a78bfa; }

/* CTA */
.nav-cta { font-size: 0.85rem; padding: 0.55rem 1.25rem; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #e2e8f0;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.hamburger span.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger span.open:nth-child(2) { opacity: 0; }
.hamburger span.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* Mobile Menu */
.mobile-menu {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease;
  background: rgba(7,7,26,0.95);
  backdrop-filter: blur(20px);
}
.mobile-menu.open { max-height: 400px; }
.mobile-menu ul { list-style: none; padding: 0.5rem 1.5rem 1.25rem; }
.mobile-menu li a {
  display: block;
  padding: 0.7rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: color 0.2s;
}
.mobile-menu li a:hover { color: #a78bfa; }

@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger, .mobile-menu { display: flex; }
  .mobile-menu { display: block; }
}
</style>
