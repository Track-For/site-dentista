<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const root = ref(null)
let ctx
const steps = [
  ['01', 'Avaliação', 'Escuta, histórico e objetivos antes de falar em tratamento.'],
  ['02', 'Diagnóstico', 'Registros clínicos e digitais transformados em uma leitura completa.'],
  ['03', 'Planejamento digital', 'Possibilidades, etapas e escolhas apresentados com transparência.'],
  ['04', 'Tratamento', 'Execução precisa, ritmo confortável e acompanhamento próximo.'],
  ['05', 'Acompanhamento', 'Revisões orientadas para preservar função, estética e confiança.'],
]

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.journey-line span', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top 55%', end: 'bottom 70%', scrub: .8 },
    })
    gsap.from('.journey-step', {
      opacity: .18,
      x: 40,
      stagger: .2,
      scrollTrigger: { trigger: root.value, start: 'top 60%', end: 'bottom 75%', scrub: 1 },
    })
  }, root.value)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" id="processo" class="process-section">
    <div class="process-sticky">
      <div class="section-kicker dark"><span>07</span> YOUR JOURNEY</div>
      <h2>Clareza em<br /><em>cada etapa.</em></h2>
      <p>Um processo pensado para reduzir dúvidas e aumentar a qualidade de cada decisão.</p>
    </div>
    <div class="journey">
      <div class="journey-line"><span></span></div>
      <article v-for="step in steps" :key="step[0]" class="journey-step">
        <span>{{ step[0] }}</span>
        <div><h3>{{ step[1] }}</h3><p>{{ step[2] }}</p></div>
      </article>
    </div>
  </section>
</template>
