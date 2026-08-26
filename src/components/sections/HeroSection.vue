<script setup>
import MagneticButton from '../motion/MagneticButton.vue'
</script>

<template>
  <section id="inicio" class="hero section-dark">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-copy">
      <div class="eyebrow hero-reveal"><span></span> Odontologia de precisão · São Paulo</div>
      <h1>
        <span class="hero-line"><span>Precisão que</span></span>
        <span class="hero-line"><span>muda a forma</span></span>
        <span class="hero-line hero-line-italic"><span>de sorrir.</span></span>
      </h1>
      <p class="hero-intro hero-reveal">Tecnologia, planejamento e cuidado para resultados naturalmente seus.</p>
      <div class="hero-actions hero-reveal">
        <MagneticButton href="#contato" variant="light">Agendar avaliação <span>↗</span></MagneticButton>
        <a class="text-link" href="#tratamentos">Conhecer tratamentos <span>↓</span></a>
      </div>
    </div>

    <div class="hero-visual">
      <div class="visual-aura"></div>
      <div class="visual-index">01 — OBJETO DE PRECISÃO</div>
      <img src="/tooth-implant.png" alt="Implante dentário de cerâmica e titânio em detalhe" />
      <p>Naturalidade<br />projetada em<br />cada camada.</p>
    </div>

    <div class="hero-proof hero-reveal">
      <div><strong>1.350<sup>+</sup></strong><span>tratamentos planejados</span></div>
      <div><strong>10</strong><span>anos de precisão clínica</span></div>
      <div><strong>100<sup>%</sup></strong><span>planejamento digital</span></div>
    </div>
    <div class="scroll-cue hero-reveal"><span></span> Scroll to discover</div>
  </section>
</template>
