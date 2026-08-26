<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

defineProps({ href: { type: String, default: '#' }, variant: { type: String, default: 'dark' } })
const button = ref(null)

const move = (event) => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const rect = button.value.getBoundingClientRect()
  gsap.to(button.value, { x: (event.clientX - rect.left - rect.width / 2) * 0.14, y: (event.clientY - rect.top - rect.height / 2) * 0.14, duration: 0.35 })
}
const reset = () => gsap.to(button.value, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, .45)' })

onMounted(() => {
  button.value?.addEventListener('mousemove', move)
  button.value?.addEventListener('mouseleave', reset)
})
onUnmounted(() => {
  button.value?.removeEventListener('mousemove', move)
  button.value?.removeEventListener('mouseleave', reset)
})
</script>

<template>
  <a ref="button" :href="href" class="magnetic-button" :class="`is-${variant}`"><slot /></a>
</template>
