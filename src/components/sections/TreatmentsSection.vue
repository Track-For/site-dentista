<script setup>
import { ref } from 'vue'
import { treatments } from '../../data/treatments'

const active = ref(0)
</script>

<template>
  <section id="tratamentos" class="treatments-section">
    <div class="section-heading reveal-up">
      <div class="section-kicker dark"><span>03</span> ESPECIALIDADES</div>
      <h2>Precisão aplicada<br /><em>ao que importa.</em></h2>
      <p>Não partimos de um procedimento. Partimos de um diagnóstico claro, da sua anatomia e do resultado que faz sentido para você.</p>
    </div>
    <div class="treatments-layout">
      <div class="treatment-list">
        <article
          v-for="(treatment, index) in treatments"
          :key="treatment.name"
          class="treatment-row"
          :class="{ active: active === index }"
          data-cursor="VIEW"
          tabindex="0"
          @mouseenter="active = index"
          @focus="active = index"
        >
          <span>{{ treatment.number }}</span>
          <h3>{{ treatment.name }}</h3>
          <p>{{ treatment.detail }}</p>
          <b>↗</b>
        </article>
      </div>
      <aside class="treatment-visual reveal-up">
        <div class="treatment-frame">
          <div class="treatment-orb" :style="{ '--active': active }">
            <img src="/tooth-implant.png" alt="Detalhe de tratamento odontológico de precisão" />
          </div>
          <span>{{ treatments[active].tag }}</span>
          <strong>0{{ active + 1 }}</strong>
        </div>
        <p>Tratamentos planejados para intervir somente onde existe necessidade.</p>
      </aside>
    </div>
  </section>
</template>
