<script setup>
import { ref } from 'vue'

const active = ref(0)
const faqs = [
  ['Quanto tempo dura um implante?', 'A durabilidade depende de fatores individuais, manutenção e acompanhamento. Na avaliação, explicamos o que costuma influenciar cada caso.'],
  ['O procedimento dói?', 'A experiência varia entre pessoas e procedimentos. O planejamento inclui estratégias de conforto adequadas ao histórico e às necessidades de cada paciente.'],
  ['Como funciona a avaliação?', 'Começamos por uma conversa, seguida de exame clínico e, quando indicado, registros digitais. Só então apresentamos possibilidades.'],
  ['Quanto tempo leva o tratamento?', 'O prazo muda conforme o objetivo e a resposta biológica. Você recebe uma estimativa por etapas após o diagnóstico.'],
  ['Como funciona o planejamento digital?', 'Registros 3D, fotografias e exame clínico são combinados para simular posições, proporções e caminhos possíveis.'],
  ['É possível parcelar?', 'Simulamos condições de pagamento após a definição do plano. Valores e opções são apresentados de forma transparente e individual.'],
]
</script>

<template>
  <section class="faq-section">
    <div class="faq-intro reveal-up">
      <div class="section-kicker dark"><span>11</span> QUESTIONS</div>
      <h2>Antes de decidir,<br /><em>entenda.</em></h2>
      <p>Respostas gerais não substituem uma avaliação individual. Elas são apenas um bom começo.</p>
    </div>
    <div class="faq-list">
      <article v-for="(faq, index) in faqs" :key="faq[0]" :class="{ active: active === index }">
        <button :aria-expanded="active === index" @click="active = active === index ? -1 : index">
          <span>0{{ index + 1 }}</span><strong>{{ faq[0] }}</strong><b>{{ active === index ? '−' : '+' }}</b>
        </button>
        <div class="faq-answer"><p>{{ faq[1] }}</p></div>
      </article>
    </div>
  </section>
</template>
