<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ToothOrbitSection from './components/sections/ToothOrbitSection.vue'
import AuthorityStats from './components/sections/AuthorityStats.vue'
import TreatmentsSection from './components/sections/TreatmentsSection.vue'
import ToothExplodedSection from './components/sections/ToothExplodedSection.vue'
import TechnologySection from './components/sections/TechnologySection.vue'
import CasesSection from './components/sections/CasesSection.vue'
import ProcessSection from './components/sections/ProcessSection.vue'
import SpecialistSection from './components/sections/SpecialistSection.vue'
import TestimonialsSection from './components/sections/TestimonialsSection.vue'
import ClinicSection from './components/sections/ClinicSection.vue'
import FAQSection from './components/sections/FAQSection.vue'
import FinalCTA from './components/sections/FinalCTA.vue'
import CustomCursor from './components/motion/CustomCursor.vue'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .to('.intro-line', { scaleX: 1, duration: 0.55 })
      .to('.intro-mark', { opacity: 1, scale: 1, duration: 0.35 }, '-=0.12')
      .to('.intro-screen', { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '+=0.15')
      .from('.hero-visual img', { scale: 1.08, filter: 'blur(8px)', opacity: 0, duration: 1.2 }, '-=0.25')
      .from('.hero-line > span', { yPercent: 110, stagger: 0.08, duration: 0.9 }, '-=0.85')
      .from('.hero-reveal', { y: 18, autoAlpha: 0, stagger: 0.1, duration: 0.7 }, '-=0.6')

    gsap.utils.toArray('.reveal-up').forEach((element) => {
      gsap.from(element, {
        y: 54,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="site-shell">
    <div class="intro-screen" aria-hidden="true">
      <div class="intro-mark"><span class="intro-line"></span><b>E</b></div>
      <p>ELYRA · DENTAL ATELIER</p>
    </div>
    <Navbar />
    <CustomCursor />
    <main>
      <HeroSection />
      <ToothOrbitSection />
      <AuthorityStats />
      <TreatmentsSection />
      <ToothExplodedSection />
      <TechnologySection />
      <CasesSection />
      <ProcessSection />
      <SpecialistSection />
      <TestimonialsSection />
      <ClinicSection />
      <FAQSection />
      <FinalCTA />
    </main>
    <Footer />
  </div>
</template>
