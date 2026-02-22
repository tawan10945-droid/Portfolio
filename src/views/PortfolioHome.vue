<template>
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <CertificatesSection />
    <ContactSection />
  </main>
  <FooterSection />
</template>

<script setup>
import NavBar          from '../components/NavBar.vue'
import HeroSection     from '../components/HeroSection.vue'
import AboutSection    from '../components/AboutSection.vue'
import SkillsSection   from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import CertificatesSection from '../components/CertificatesSection.vue'
import ContactSection  from '../components/ContactSection.vue'
import FooterSection   from '../components/FooterSection.vue'
</script>
