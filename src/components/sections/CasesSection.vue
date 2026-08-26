<script setup>
import { cases } from '../../data/cases'
</script>

<template>
  <section id="casos" class="cases-section section-dark">
    <div class="section-heading cases-heading reveal-up">
      <div class="section-kicker"><span>06</span> SELECTED CASES</div>
      <h2>Results that<br /><em>speak quietly.</em></h2>
      <p>Três histórias conceituais. A mesma intenção: melhorar sem padronizar.</p>
    </div>
    <div class="cases-list">
      <article v-for="item in cases" :key="item.number" class="case-card" :class="item.tone" data-cursor="EXPLORE">
        <div class="case-image">
          <div class="case-architecture">
            <span></span><span></span><i></i>
            <img src="/tooth-implant.png" alt="Representação conceitual de caso odontológico" />
          </div>
          <small>CASO {{ item.number }} · IMAGEM CONCEITUAL</small>
        </div>
        <div class="case-info">
          <span>CASO {{ item.number }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.objective }}</p>
          <dl>
            <div><dt>Duração</dt><dd>{{ item.duration }}</dd></div>
            <div><dt>Abordagem</dt><dd>{{ item.approach }}</dd></div>
          </dl>
          <button aria-label="Explorar caso">↗</button>
        </div>
      </article>
    </div>
  </section>
</template>
