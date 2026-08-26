<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const root = ref(null)
const tooth = ref(null)
let ctx
let xTo
let yTo

const parallax = (event) => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const nx = event.clientX / window.innerWidth - .5
  const ny = event.clientY / window.innerHeight - .5
  xTo?.(nx * 20)
  yTo?.(ny * 16)
  gsap.to('.orbit-word', { x: (index) => nx * (index % 2 ? 16 : -10), y: (index) => ny * (index % 3 ? 10 : -7), stagger: .01, duration: .9, overwrite: true })
}

onMounted(() => {
  xTo = gsap.quickTo(tooth.value, 'x', { duration: .8, ease: 'power3' })
  yTo = gsap.quickTo(tooth.value, 'y', { duration: .8, ease: 'power3' })
  ctx = gsap.context(() => {
    gsap.to('.orbit-object', { y: 12, rotation: 1, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    gsap.to('.orbit-ring-a', { rotation: 360, duration: 70, repeat: -1, ease: 'none' })
    gsap.to('.orbit-ring-b', { rotation: -360, duration: 92, repeat: -1, ease: 'none' })
    gsap.from('.orbit-word', {
      opacity: 0,
      filter: 'blur(12px)',
      y: 35,
      stagger: .07,
      duration: 1.2,
      scrollTrigger: { trigger: root.value, start: 'top 58%', once: true },
    })
    gsap.to('.orbit-stage', {
      scale: 1.06,
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    })
  }, root.value)
  window.addEventListener('pointermove', parallax, { passive: true })
})
onUnmounted(() => {
  ctx?.revert()
  window.removeEventListener('pointermove', parallax)
})
</script>

<template>
  <section ref="root" class="orbit-section" data-cursor="DISCOVER">
    <div class="section-kicker"><span>02</span> PRECISION OBJECT</div>
    <div class="orbit-stage">
      <div class="orbit-ring orbit-ring-a"><span>PRECISION</span><span>NATURAL RESULTS</span></div>
      <div class="orbit-ring orbit-ring-b"><span>DIGITAL PLANNING</span><span>CERTIFIED CARE</span></div>
      <div class="orbit-object" ref="tooth">
        <div class="tooth-halo"></div>
        <img src="/tooth-implant.png" alt="Implante Elyra em cerâmica e titânio" />
      </div>
      <span class="orbit-word word-a">PRECISION</span>
      <span class="orbit-word word-b">NATURAL<br />RESULTS</span>
      <span class="orbit-word word-c">PLANEJAMENTO 3D</span>
      <span class="orbit-word word-d">TITÂNIO<br />PREMIUM</span>
      <span class="orbit-word word-e">CONFORTO</span>
      <span class="orbit-word word-f">PREVISIBILIDADE</span>
      <span class="orbit-word word-g">ESTÉTICA NATURAL</span>
      <span class="orbit-word word-h">PRECISÃO MILIMÉTRICA</span>
      <span class="orbit-word word-i">DIGITAL<br />PLANNING</span>
    </div>
    <p class="orbit-note">Uma imagem simples do que orienta tudo por aqui: forma, função e tecnologia trabalhando como uma só.</p>
  </section>
</template>
