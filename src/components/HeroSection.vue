<template>
  <section id="hero" class="hero">
    <!-- Blobs -->
    <div class="blob blob-1" aria-hidden="true"></div>
    <div class="blob blob-2" aria-hidden="true"></div>
    <div class="blob blob-3" aria-hidden="true"></div>

    <div class="container hero-inner">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Available for work
        </div>

        <h1 class="hero-title">
          Hi, I'm <span class="text-gradient">Tawan Yoobanklong</span>
        </h1>
        <p class="hero-role">
          <span class="role-text">Full-Stack Developer</span>
          &nbsp;·&nbsp;
          <span class="role-text">UI Designer</span>
          &nbsp;·&nbsp;
          <span class="role-text">Problem Solver</span>
        </p>
        <p class="hero-desc">
          I craft beautiful, performant web experiences using modern technologies.
          Passionate about clean code, intuitive UX, and shipping products people love.
        </p>

        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('projects')">
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" class="btn btn-outline" @click.prevent="scrollTo('contact')">
            Contact Me
          </a>
        </div>

        <div class="hero-socials">
          <a href="https://github.com/tawan10945-droid" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/tawan-yoobanklong-338ab6387" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:tawan10945@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="hero-visual">
        <div class="avatar-ring">
          <div class="avatar-placeholder">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="32" r="16" fill="#a78bfa" opacity="0.8"/>
              <ellipse cx="40" cy="68" rx="24" ry="14" fill="#7c3aed" opacity="0.6"/>
            </svg>
          </div>
        </div>
        <div class="floating-badge badge-react">React</div>
        <div class="floating-badge badge-vue">Vue</div>
        <div class="floating-badge badge-node">Node.js</div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-dot"></div>
    </div>
  </section>
</template>

<script setup>
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 5rem;
}

/* Animated blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  animation: blobFloat 8s ease-in-out infinite;
}
.blob-1 {
  width: 600px; height: 600px;
  background: #7c3aed;
  top: -200px; left: -150px;
  animation-delay: 0s;
}
.blob-2 {
  width: 400px; height: 400px;
  background: #06b6d4;
  top: 100px; right: -100px;
  animation-delay: 3s;
}
.blob-3 {
  width: 300px; height: 300px;
  background: #a78bfa;
  bottom: -100px; left: 40%;
  animation-delay: 5s;
}
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(20px, -30px) scale(1.05); }
  66%       { transform: translate(-15px, 20px) scale(0.97); }
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(6,182,212,0.1);
  border: 1px solid rgba(6,182,212,0.25);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #06b6d4;
  margin-bottom: 1.5rem;
}
.badge-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #06b6d4;
  animation: pulse 2s ease infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0.6); }
  50%       { box-shadow: 0 0 0 6px transparent; }
}

/* Title */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.03em;
}

/* Role pills */
.hero-role {
  font-size: 0.95rem;
  color: #94a3b8;
  margin-bottom: 1.25rem;
  font-weight: 500;
}
.role-text { color: #c4b5fd; }

/* Desc */
.hero-desc {
  font-size: 1.05rem;
  color: #94a3b8;
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2rem;
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

/* Socials */
.hero-socials {
  display: flex;
  gap: 0.75rem;
}
.hero-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  color: #94a3b8;
  transition: all 0.25s;
}
.hero-socials a svg { width: 18px; height: 18px; }
.hero-socials a:hover {
  color: #fff;
  background: rgba(124,58,237,0.2);
  border-color: rgba(124,58,237,0.4);
  transform: translateY(-2px);
}

/* Avatar */
.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-ring {
  width: 300px; height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.25));
  border: 2px solid rgba(124,58,237,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotateRing 12s linear infinite;
  box-shadow: 0 0 60px rgba(124,58,237,0.2), inset 0 0 60px rgba(6,182,212,0.05);
}
@keyframes rotateRing {
  from { box-shadow: 0 0 60px rgba(124,58,237,0.2); }
  50%  { box-shadow: 0 0 80px rgba(6,182,212,0.3); }
  to   { box-shadow: 0 0 60px rgba(124,58,237,0.2); }
}
.avatar-placeholder {
  width: 240px; height: 240px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2));
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-placeholder svg { width: 100px; height: 100px; }

/* Floating badges */
.floating-badge {
  position: absolute;
  padding: 0.45rem 0.9rem;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.12);
  animation: floatBadge 4s ease-in-out infinite;
}
.badge-react {
  top: 30px; left: -10px;
  background: rgba(97,218,251,0.15);
  color: #61dafb;
  animation-delay: 0s;
}
.badge-vue {
  bottom: 60px; left: -20px;
  background: rgba(66,184,131,0.15);
  color: #42b883;
  animation-delay: 1.3s;
}
.badge-node {
  top: 50%; right: -10px;
  background: rgba(104,160,99,0.15);
  color: #68a063;
  animation-delay: 0.7s;
}
@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 26px; height: 42px;
  border-radius: 13px;
  border: 2px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
}
.scroll-dot {
  width: 4px; height: 8px;
  background: #7c3aed;
  border-radius: 2px;
  animation: scrollDown 2s ease infinite;
}
@keyframes scrollDown {
  0%   { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(16px); opacity: 0; }
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  .hero-desc { margin: 0 auto 2rem; }
  .hero-actions { justify-content: center; }
  .hero-socials { justify-content: center; }
  .hero-visual { order: -1; }
  .avatar-ring { width: 220px; height: 220px; }
  .avatar-placeholder { width: 170px; height: 170px; }
  .badge-react { left: 20px; }
  .badge-vue   { left: 10px; }
}
</style>
