<template>
  <section id="certificates" class="section certificates">
    <div class="container">
      <div class="section-header fade-in" ref="headerEl">
        <span class="section-label">Credentials</span>
        <h2 class="section-title">Certificates &amp; Achievements</h2>
        <p class="section-subtitle">Professional certifications that validate my expertise.</p>
      </div>

      <!-- Certificate Gallery Grid -->
      <div class="cert-gallery">
        <div
          class="cert-item fade-in"
          v-for="(c, i) in store.certs"
          :key="c.id || c.title"
          :style="{ transitionDelay: i * 0.08 + 's' }"
          @click="openLightbox(i)"
        >
          <div class="cert-img-wrapper">
            <img
              :src="c.image"
              :alt="c.title"
              class="cert-img"
              loading="lazy"
              @error="onImgError($event, c)"
            />
            <!-- Overlay on hover -->
            <div class="cert-overlay">
              <svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              <span>View Certificate</span>
            </div>
          </div>
          <div class="cert-info">
            <span class="cert-issuer">{{ c.issuer }}</span>
            <h3 class="cert-title">{{ c.title }}</h3>
            <div class="cert-footer">
              <span class="cert-date">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ c.date }}
              </span>
              <a v-if="c.url" :href="c.url" target="_blank" rel="noopener" class="cert-link" @click.stop>
                View Credential
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="lb">
      <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <button class="lb-nav lb-prev" @click="prevCert" aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div class="lb-content">
          <img :src="store.certs[lightboxIndex].image" :alt="store.certs[lightboxIndex].title" class="lb-img" />
          <div class="lb-caption">
            <span class="lb-issuer">{{ store.certs[lightboxIndex].issuer }}</span>
            <h3 class="lb-title">{{ store.certs[lightboxIndex].title }}</h3>
            <span class="lb-date">{{ store.certs[lightboxIndex].date }}</span>
          </div>
        </div>
        <button class="lb-nav lb-next" @click="nextCert" aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <div class="lb-indicator">
          <span
            v-for="(c, i) in store.certs"
            :key="i"
            class="lb-dot"
            :class="{ active: i === lightboxIndex }"
            @click="lightboxIndex = i"
          />
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '../composables/useStore.js'

const store = useStore()
const headerEl = ref(null)
const lightboxIndex = ref(null)

// Fallback placeholder if image fails
function onImgError(event) {
  event.target.style.opacity = '0.3'
}



function openLightbox(index) {
  lightboxIndex.value = index
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxIndex.value = null
  document.body.style.overflow = ''
}
function prevCert() {
  lightboxIndex.value = (lightboxIndex.value - 1 + store.certs.length) % store.certs.length
}
function nextCert() {
  lightboxIndex.value = (lightboxIndex.value + 1) % store.certs.length
}

function onKeydown(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevCert()
  if (e.key === 'ArrowRight') nextCert()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1 })
  ;[headerEl.value].forEach(r => r && obs.observe(r))
  document.querySelectorAll('.cert-item.fade-in').forEach(c => obs.observe(c))
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.certificates { background: var(--clr-surface-2); }
.section-header { margin-bottom: 3rem; }

/* ── Gallery Grid ── */
.cert-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.cert-item {
  background: var(--clr-surface-3, rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.cert-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.4);
  border-color: rgba(167, 139, 250, 0.4);
}

/* ── Certificate Image ── */
.cert-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(0,0,0,0.2);
}

.cert-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.cert-item:hover .cert-img { transform: scale(1.04); }

/* ── Overlay ── */
.cert-overlay {
  position: absolute;
  inset: 0;
  background: rgba(99, 102, 241, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.cert-item:hover .cert-overlay { opacity: 1; }

.zoom-icon {
  width: 32px;
  height: 32px;
  stroke-width: 2;
}

/* ── Info ── */
.cert-info {
  padding: 1rem 1.25rem 1.25rem;
}

.cert-issuer {
  font-size: 0.7rem;
  font-weight: 700;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 0.09em;
}

.cert-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  margin: 0.3rem 0 0.75rem;
  line-height: 1.4;
}

.cert-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.cert-date {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: var(--clr-text-muted);
}

.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #a78bfa;
  text-decoration: none;
  transition: gap 0.2s;
}
.cert-link:hover { gap: 0.5rem; color: #c4b5fd; }

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lb-content {
  max-width: 860px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.lb-img {
  width: 100%;
  max-height: 72vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.6);
}

.lb-caption {
  text-align: center;
}
.lb-issuer {
  font-size: 0.72rem;
  font-weight: 700;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  display: block;
  margin-bottom: 0.25rem;
}
.lb-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.25rem;
}
.lb-date {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
}

/* Close button */
.lb-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08);
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}
.lb-close:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.5); }
.lb-close svg { width: 18px; height: 18px; }

/* Nav buttons */
.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08);
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}
.lb-nav:hover { background: rgba(255,255,255,0.2); }
.lb-nav svg { width: 20px; height: 20px; }
.lb-prev { left: 1.25rem; }
.lb-next { right: 1.25rem; }

/* Indicator dots */
.lb-indicator {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}
.lb-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.lb-dot.active { background: #a78bfa; transform: scale(1.3); }

/* Lightbox transition */
.lb-enter-active, .lb-leave-active { transition: opacity 0.25s ease; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 1100px) { .cert-gallery { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px)  { .cert-gallery { grid-template-columns: 1fr; } .lb-nav { display: none; } }
</style>
