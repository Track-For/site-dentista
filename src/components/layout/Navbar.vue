<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)
const compact = ref(false)
const onScroll = () => { compact.value = window.scrollY > 24 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="navbar" :class="{ 'is-compact': compact, 'menu-open': open }">
    <a href="#inicio" class="brand" aria-label="Elyra, início">
      <span class="brand-mark">E</span>
      <span>ELYRA<small>DENTAL ATELIER</small></span>
    </a>
    <button class="menu-toggle" :aria-expanded="open" aria-label="Abrir menu" @click="open = !open">
      <span></span><span></span>
    </button>
    <nav class="nav-links" aria-label="Navegação principal" @click="open = false">
      <a href="#inicio">Início</a>
      <a href="#tratamentos">Tratamentos</a>
      <a href="#tecnologia">Tecnologia</a>
      <a href="#casos">Casos</a>
      <a href="#sobre">Sobre</a>
      <a href="#contato">Contato</a>
    </nav>
    <a class="nav-cta" href="#contato">Agendar avaliação <span>↗</span></a>
  </header>
</template>
