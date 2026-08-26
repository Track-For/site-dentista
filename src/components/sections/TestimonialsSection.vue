<script setup>
import { ref } from 'vue'
import { testimonials } from '../../data/testimonials'

const active = ref(0)
const previous = () => { active.value = (active.value + testimonials.length - 1) % testimonials.length }
const next = () => { active.value = (active.value + 1) % testimonials.length }
</script>

<template>
  <section class="testimonials-section section-dark">
    <div class="section-kicker"><span>09</span> PATIENT NOTES</div>
    <div class="testimonial-index">0{{ active + 1 }} <span>/ 03</span></div>
    <div class="testimonial-stage reveal-up" aria-live="polite">
      <span class="quote-mark">“</span>
      <blockquote>{{ testimonials[active].quote }}</blockquote>
      <p>{{ testimonials[active].name }} <span>· {{ testimonials[active].treatment }}</span></p>
    </div>
    <div class="testimonial-controls">
      <button aria-label="Depoimento anterior" @click="previous">←</button>
      <button aria-label="Próximo depoimento" @click="next">→</button>
    </div>
    <small>Depoimentos fictícios para fins de demonstração.</small>
  </section>
</template>
