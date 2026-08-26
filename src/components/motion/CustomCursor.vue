<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const cursor = ref(null)
const label = ref('')
let xTo
let yTo

const move = (event) => { xTo?.(event.clientX); yTo?.(event.clientY) }
const over = (event) => {
  const target = event.target.closest('[data-cursor]')
  label.value = target?.dataset.cursor || ''
  cursor.value?.classList.toggle('is-active', Boolean(target))
}

onMounted(() => {
  xTo = gsap.quickTo(cursor.value, 'x', { duration: .25, ease: 'power3' })
  yTo = gsap.quickTo(cursor.value, 'y', { duration: .25, ease: 'power3' })
  window.addEventListener('pointermove', move, { passive: true })
  document.addEventListener('pointerover', over)
})
onUnmounted(() => {
  window.removeEventListener('pointermove', move)
  document.removeEventListener('pointerover', over)
})
</script>

<template><div ref="cursor" class="custom-cursor" aria-hidden="true"><span>{{ label }}</span></div></template>
