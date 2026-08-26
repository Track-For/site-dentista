<script setup>
const technologies = [
  { n: '01', name: 'Scanner intraoral 3D', benefit: 'Sem moldagens desconfortáveis. Mais detalhe desde o primeiro registro.', glyph: 'SCAN / 0.02mm' },
  { n: '02', name: 'Planejamento digital', benefit: 'Você entende o caminho e visualiza possibilidades antes de decidir.', glyph: 'PLAN / 360°' },
  { n: '03', name: 'Fotografia clínica', benefit: 'Cor, textura e proporção documentadas para escolhas mais precisas.', glyph: 'CAPTURE / RAW' },
  { n: '04', name: 'Impressão 3D', benefit: 'Protótipos e guias personalizados para reduzir improvisos.', glyph: 'PRINT / 25μm' },
  { n: '05', name: 'Cirurgia guiada', benefit: 'Intervenção orientada pelo planejamento, com controle de posição.', glyph: 'GUIDE / AXIS' },
  { n: '06', name: 'Simulação do sorriso', benefit: 'Um ensaio visual que transforma expectativa em conversa clara.', glyph: 'SIM / LIVE' },
]
</script>

<template>
  <section id="tecnologia" class="technology-section">
    <div class="technology-intro reveal-up">
      <div class="section-kicker dark"><span>05</span> TECHNOLOGY</div>
      <h2>Technology behind<br /><em>every detail.</em></h2>
      <p>A tecnologia não substitui o olhar clínico. Ela oferece mais informação para que cada decisão seja mais consciente.</p>
    </div>
    <div class="technology-grid">
      <article v-for="technology in technologies" :key="technology.n" class="technology-item reveal-up">
        <div class="tech-visual"><span>{{ technology.glyph }}</span><i></i><b></b></div>
        <span>{{ technology.n }}</span>
        <h3>{{ technology.name }}</h3>
        <p>{{ technology.benefit }}</p>
      </article>
    </div>
  </section>
</template>
