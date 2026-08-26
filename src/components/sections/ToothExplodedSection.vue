<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const root = ref(null)
let ctx
let mm

const steps = [
  { n: '01', title: 'Resultado natural', text: 'Tudo começa pelo planejamento.' },
  { n: '02', title: 'Cerâmica de alta performance', text: 'Translucidez e textura desenhadas para conversar com o sorriso real.' },
  { n: '03', title: 'Conexão precisa', text: 'Um componente projetado para estabilidade e adaptação.' },
  { n: '04', title: 'Titânio', text: 'Biocompatibilidade, resistência e previsibilidade em cada milímetro.' },
  { n: '05', title: 'Uma arquitetura completa', text: 'Um resultado. Várias camadas de precisão.' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    mm = gsap.matchMedia()
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root.value, start: 'top top', end: '+=3600', pin: true, scrub: 1 },
      })
      timeline
        .to('.layer-crown', { y: -115, rotation: -2, scale: 1.02, filter: 'drop-shadow(0 28px 20px rgba(0,0,0,.18))', duration: 1 })
        .to('.tech-step:nth-child(1)', { opacity: 0, y: -20, duration: .25 }, '<')
        .to('.tech-step:nth-child(2)', { opacity: 1, y: 0, duration: .25 }, '-=.1')
        .to('.layer-abutment', { y: 5, scale: 1.03, duration: 1 })
        .to('.tech-step:nth-child(2)', { opacity: 0, y: -20, duration: .25 }, '<')
        .to('.tech-step:nth-child(3)', { opacity: 1, y: 0, duration: .25 }, '-=.1')
        .to('.layer-implant', { y: 125, rotation: 1.5, scale: .98, duration: 1 })
        .to('.tech-step:nth-child(3)', { opacity: 0, y: -20, duration: .25 }, '<')
        .to('.tech-step:nth-child(4)', { opacity: 1, y: 0, duration: .25 }, '-=.1')
        .to('.layer-crown', { y: -165, duration: .8 })
        .to('.layer-abutment', { y: 0, duration: .8 }, '<')
        .to('.layer-implant', { y: 175, duration: .8 }, '<')
        .to('.exploded-guide', { height: '76%', opacity: 1, duration: .8 }, '<')
        .to('.tech-step:nth-child(4)', { opacity: 0, y: -20, duration: .25 }, '<')
        .to('.tech-step:nth-child(5)', { opacity: 1, y: 0, duration: .3 }, '-=.1')
      return () => timeline.kill()
    })
  }, root.value)
})
onUnmounted(() => {
  mm?.revert()
  ctx?.revert()
})
</script>

<template>
  <section ref="root" class="exploded-section section-dark" data-cursor="DISCOVER">
    <div class="exploded-header">
      <div class="section-kicker"><span>04</span> ENGINEERED FOR PRECISION</div>
      <p>Role para revelar</p>
    </div>
    <div class="exploded-copy">
      <p>O que existe por trás de um</p>
      <h2>resultado<br /><em>natural.</em></h2>
    </div>
    <div class="exploded-object" aria-label="Visualização em camadas de um implante dentário">
      <div class="exploded-guide"></div>
      <div class="tooth-layer layer-crown"><img src="/tooth-implant.png" alt="Coroa cerâmica" /></div>
      <div class="tooth-layer layer-abutment"><img src="/tooth-implant.png" alt="Conexão do implante" /></div>
      <div class="tooth-layer layer-implant"><img src="/tooth-implant.png" alt="Implante de titânio" /></div>
      <span class="part-label label-crown">CERÂMICA</span>
      <span class="part-label label-abutment">CONEXÃO</span>
      <span class="part-label label-implant">TITÂNIO</span>
    </div>
    <div class="tech-steps">
      <article v-for="(step, index) in steps" :key="step.n" class="tech-step" :class="{ first: index === 0 }">
        <span>{{ step.n }} / 05</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
        <a v-if="index === 4" href="#processo">Conhecer nosso processo ↘</a>
      </article>
    </div>
    <div class="exploded-progress"><span></span></div>
  </section>
</template>
