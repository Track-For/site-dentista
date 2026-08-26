<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const root = ref(null)
let ctx
const stats = [
  { value: 1350, suffix: '+', label: 'procedimentos planejados' },
  { value: 98.7, suffix: '%', label: 'relatos de alta satisfação' },
  { value: 10, suffix: ' anos', label: 'de experiência clínica' },
  { value: 100, suffix: '%', label: 'fluxo digital completo' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    root.value.querySelectorAll('.stat-number').forEach((node, index) => {
      const state = { value: 0 }
      gsap.to(state, {
        value: stats[index].value,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.value, start: 'top 80%', once: true },
        onUpdate: () => {
          const decimals = stats[index].value % 1 ? 1 : 0
          node.textContent = state.value.toLocaleString('pt-BR', { maximumFractionDigits: decimals })
        },
      })
    })
  }, root.value)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="authority-section">
    <div v-for="(stat, index) in stats" :key="stat.label" class="stat reveal-up">
      <small>0{{ index + 1 }}</small>
      <div><strong class="stat-number">0</strong><sup>{{ stat.suffix }}</sup></div>
      <p>{{ stat.label }}</p>
    </div>
    <p class="authority-disclaimer">Números ilustrativos para este projeto conceitual.</p>
  </section>
</template>
