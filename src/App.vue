<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowRight, CalendarDays, Check, HeartHandshake, Menu, MessageCircle, ShieldCheck, Smile, Sparkles, WandSparkles, X } from '@lucide/vue'

const menuOpen = ref(false)
const activeService = ref<number | null>(0)
const formStatus = ref('')
let revealObserver: IntersectionObserver | null = null

const services = [
  { title: 'Facetas em resina', description: 'Planejamento cuidadoso de forma, proporção e textura para um sorriso harmônico, sempre respeitando suas características.', icon: Sparkles },
  { title: 'Clareamento dental', description: 'Clareamento supervisionado e indicado de forma individual, com atenção à saúde, à sensibilidade e a um resultado natural.', icon: WandSparkles },
  { title: 'Restaurações estéticas', description: 'Reconstruções que devolvem função e beleza aos dentes com materiais pensados para se integrar ao sorriso.', icon: ShieldCheck },
  { title: 'Recontorno estético', description: 'Ajustes delicados de contorno e proporção quando indicados, valorizando o equilíbrio entre os dentes e o rosto.', icon: Smile },
  { title: 'Planejamento do sorriso', description: 'Uma avaliação completa para entender prioridades, possibilidades e construir um plano coerente com você.', icon: HeartHandshake },
  { title: 'Manutenção preventiva', description: 'Acompanhamento para preservar saúde, conforto e longevidade dos tratamentos estéticos realizados.', icon: Check },
]

const faqs = [
  { question: 'Como funciona a primeira consulta?', answer: 'A consulta começa com uma conversa sobre o que incomoda você e o que espera do tratamento. Depois da avaliação clínica, as possibilidades são explicadas com clareza e sem decisões apressadas.' },
  { question: 'O resultado fica natural?', answer: 'A naturalidade orienta todo o planejamento. Forma, cor e proporção são avaliadas em conjunto para que qualquer mudança converse com o seu rosto e preserve a sua identidade.' },
  { question: 'Faceta em resina é indicada para todos?', answer: 'Não. A indicação depende da saúde bucal, da estrutura dos dentes e dos objetivos de cada pessoa. A avaliação individual é indispensável para definir a opção mais adequada.' },
  { question: 'Quanto tempo dura um tratamento estético?', answer: 'O prazo varia conforme o procedimento e a complexidade do caso. Após a avaliação, você recebe uma orientação sobre etapas, cuidados e acompanhamento necessário.' },
]

function closeMenu() { menuOpen.value = false }
function toggleService(index: number) { activeService.value = activeService.value === index ? null : index }

async function prepareAppointment(event: Event) {
  const form = event.currentTarget as HTMLFormElement
  const data = new FormData(form)
  const name = String(data.get('name') || '').trim()
  const interest = String(data.get('interest') || '').trim()
  const period = String(data.get('period') || '').trim()
  const details = String(data.get('details') || '').trim()
  const message = [
    'Olá! Gostaria de solicitar uma avaliação com o Dr. Beto Filmari.', '',
    `Nome: ${name}`, `Interesse: ${interest}`, `Melhor período: ${period}`,
    details ? `Observação: ${details}` : '',
  ].filter(Boolean).join('\n')

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Agendamento com Dr. Beto Filmari', text: message })
      formStatus.value = 'Mensagem preparada. Agora é só escolher por onde enviar.'
      return
    }
    await navigator.clipboard.writeText(message)
    formStatus.value = 'Mensagem copiada. Cole no canal de atendimento do Dr. Beto.'
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    formStatus.value = 'Não foi possível compartilhar agora. Revise os dados e tente novamente.'
  }
}

onMounted(() => {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => { element.dataset.visible = 'true' })
    return
  }
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      ;(entry.target as HTMLElement).dataset.visible = 'true'
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  elements.forEach((element) => revealObserver?.observe(element))
})
onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="container header-inner">
      <a class="brand" href="#inicio" aria-label="Dr. Beto Filmari — início" @click="closeMenu">
        <span class="brand-mark" aria-hidden="true">BF</span>
        <span class="brand-copy"><strong>Dr. Beto Filmari</strong><small>Odontologia estética</small></span>
      </a>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="main-navigation" :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="22" aria-hidden="true" /><Menu v-else :size="22" aria-hidden="true" />
      </button>
      <nav id="main-navigation" class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Principal">
        <a href="#inicio" @click="closeMenu">Início</a><a href="#tratamentos" @click="closeMenu">Tratamentos</a><a href="#sobre" @click="closeMenu">Sobre</a><a href="#duvidas" @click="closeMenu">Dúvidas</a>
        <a class="button button-small" href="#agendamento" @click="closeMenu">Agendar avaliação</a>
      </nav>
    </div>
  </header>

  <main id="conteudo">
    <section id="inicio" class="hero" aria-labelledby="hero-title">
      <div class="hero-wash" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy" data-reveal>
          <p class="eyebrow"><span></span> Odontologia estética em Goiânia</p>
          <h1 id="hero-title">Transformando sorrisos com <em>naturalidade.</em></h1>
          <p class="hero-lead">Cuidado estético com escuta, planejamento e respeito ao que faz o seu sorriso ser único.</p>
          <div class="hero-actions">
            <a class="button" href="#agendamento"><CalendarDays :size="18" aria-hidden="true" />Quero agendar uma avaliação</a>
            <a class="text-link" href="#tratamentos">Conhecer tratamentos <ArrowRight :size="18" aria-hidden="true" /></a>
          </div>
          <div class="credentials" aria-label="Informações profissionais">
            <span><ShieldCheck :size="17" aria-hidden="true" /> Dentista · CRO-GO 22.429</span><span>Goiânia · GO</span>
          </div>
        </div>
        <div class="portrait-wrap" data-reveal>
          <div class="portrait-frame"><img src="/beto-filmari.png" alt="Dr. Beto Filmari sorrindo em retrato profissional" width="289" height="423" decoding="async" /></div>
          <div class="portrait-card"><span class="mini-mark" aria-hidden="true">BF</span><p><strong>Dr. Beto Filmari</strong><small>Dentista · CRO-GO 22.429</small></p></div>
          <p class="portrait-note"><Sparkles :size="16" aria-hidden="true" /> Estética que preserva a sua identidade</p>
        </div>
      </div>
    </section>

    <section class="principles" aria-label="Princípios do atendimento">
      <div class="container principles-grid" data-reveal>
        <p><span>01</span><strong>Naturalidade</strong><small>Resultados que conversam com você</small></p>
        <p><span>02</span><strong>Planejamento</strong><small>Cada detalhe pensado em conjunto</small></p>
        <p><span>03</span><strong>Cuidado</strong><small>Clareza antes, durante e depois</small></p>
      </div>
    </section>

    <section id="tratamentos" class="section services-section" aria-labelledby="services-title">
      <div class="container">
        <div class="section-heading" data-reveal><div><p class="eyebrow"><span></span> Tratamentos estéticos</p><h2 id="services-title">Possibilidades para sorrir com mais <em>confiança</em></h2></div><p>Todo tratamento começa com uma avaliação individual. O objetivo não é criar um sorriso padrão, mas encontrar equilíbrio para o seu caso.</p></div>
        <div class="services-grid">
          <article v-for="(service, index) in services" :key="service.title" class="service-card" :class="{ 'is-active': activeService === index }" data-reveal>
            <button type="button" :aria-expanded="activeService === index" :aria-controls="`service-${index}`" @click="toggleService(index)">
              <span class="service-icon"><component :is="service.icon" :size="21" aria-hidden="true" /></span><small>0{{ index + 1 }}</small><strong>{{ service.title }}</strong><span class="card-action" aria-hidden="true">{{ activeService === index ? '−' : '+' }}</span>
            </button>
            <div :id="`service-${index}`" class="service-detail" :class="{ 'is-open': activeService === index }" :aria-hidden="activeService !== index"><div><p>{{ service.description }}</p><a href="#agendamento" :tabindex="activeService === index ? 0 : -1">Quero conversar sobre isso <ArrowRight :size="15" aria-hidden="true" /></a></div></div>
          </article>
        </div>
      </div>
    </section>

    <section id="sobre" class="section about-section" aria-labelledby="about-title">
      <div class="container about-grid">
        <div class="about-photo" data-reveal><img src="/beto-filmari.png" alt="Dr. Beto Filmari, dentista em Goiânia" width="289" height="423" loading="lazy" decoding="async" /><span aria-hidden="true">BF</span></div>
        <div class="about-copy" data-reveal>
          <p class="eyebrow"><span></span> Dr. Beto Filmari</p><h2 id="about-title">Seu sorriso pode mudar sem deixar de ser <em>seu.</em></h2>
          <p class="about-lead">A odontologia estética ganha sentido quando técnica e sensibilidade caminham juntas. Por isso, cada atendimento parte de uma conversa franca sobre expectativas, possibilidades e limites.</p>
          <div class="about-points">
            <div><HeartHandshake :size="22" aria-hidden="true" /><p><strong>Escuta antes da escolha</strong><span>Entender o que você busca é o primeiro passo do planejamento.</span></p></div>
            <div><Smile :size="22" aria-hidden="true" /><p><strong>Beleza sem excessos</strong><span>Proporção, função e naturalidade orientam cada decisão.</span></p></div>
            <div><ShieldCheck :size="22" aria-hidden="true" /><p><strong>Informação transparente</strong><span>Você conhece as etapas e os cuidados antes de começar.</span></p></div>
          </div>
          <div class="register"><small>Registro profissional</small><strong>CRO-GO 22.429</strong></div>
        </div>
      </div>
    </section>

    <section class="section journey-section" aria-labelledby="journey-title">
      <div class="container"><div class="journey-heading" data-reveal><p class="eyebrow light"><span></span> Sua jornada</p><h2 id="journey-title">Um processo claro, do primeiro olhar ao <em>acompanhamento</em></h2></div>
        <ol class="journey-list" data-reveal>
          <li><span>01</span><div><strong>Conversa e avaliação</strong><p>Entendemos seu sorriso, suas prioridades e sua saúde bucal.</p></div></li>
          <li><span>02</span><div><strong>Planejamento individual</strong><p>As possibilidades são apresentadas com clareza e sem fórmulas prontas.</p></div></li>
          <li><span>03</span><div><strong>Cuidado e revisão</strong><p>O tratamento segue com atenção aos detalhes e orientação de manutenção.</p></div></li>
        </ol>
      </div>
    </section>

    <section id="duvidas" class="section faq-section" aria-labelledby="faq-title">
      <div class="container faq-grid">
        <div class="faq-intro" data-reveal><p class="eyebrow"><span></span> Dúvidas frequentes</p><h2 id="faq-title">Informação também faz parte do <em>cuidado.</em></h2><p>Algumas respostas iniciais para você chegar à consulta com mais tranquilidade.</p><a class="text-link" href="#agendamento">Ainda tenho uma dúvida <ArrowRight :size="18" aria-hidden="true" /></a></div>
        <div class="faq-list" data-reveal><details v-for="(faq, index) in faqs" :key="faq.question" :open="index === 0"><summary><span>0{{ index + 1 }}</span>{{ faq.question }}<i aria-hidden="true"></i></summary><p>{{ faq.answer }}</p></details></div>
      </div>
    </section>

    <section id="agendamento" class="section booking-section" aria-labelledby="booking-title">
      <div class="container booking-grid">
        <div class="booking-copy" data-reveal><p class="eyebrow light"><span></span> Solicite uma avaliação</p><h2 id="booking-title">O próximo sorriso pode começar com uma <em>conversa.</em></h2><p>Preencha os dados para preparar uma mensagem de atendimento. Nenhuma informação é armazenada neste site.</p><div class="booking-location"><span>Goiânia</span><small>Atendimento presencial · Goiás</small></div></div>
        <form class="booking-form" data-reveal @submit.prevent="prepareAppointment">
          <label for="name">Seu nome</label><input id="name" name="name" type="text" autocomplete="name" placeholder="Como podemos chamar você?" required />
          <label for="interest">O que você deseja avaliar?</label><select id="interest" name="interest" required><option value="" disabled selected>Selecione uma opção</option><option value="Facetas em resina">Facetas em resina</option><option value="Clareamento dental">Clareamento dental</option><option value="Restaurações estéticas">Restaurações estéticas</option><option value="Planejamento do sorriso">Planejamento do sorriso</option><option value="Ainda não sei — preciso de orientação">Ainda não sei — preciso de orientação</option></select>
          <label for="period">Melhor período</label><select id="period" name="period" required><option value="" disabled selected>Selecione um período</option><option value="Manhã">Manhã</option><option value="Tarde">Tarde</option><option value="Noite">Noite</option></select>
          <label for="details">Se quiser, conte um pouco mais</label><textarea id="details" name="details" rows="3" placeholder="Sua principal dúvida ou objetivo"></textarea>
          <button class="button form-submit" type="submit">Preparar mensagem <MessageCircle :size="18" aria-hidden="true" /></button>
          <p v-if="formStatus" class="form-status" role="status" aria-live="polite">{{ formStatus }}</p><p class="form-note">Conteúdo informativo. A indicação de qualquer procedimento depende de avaliação profissional.</p>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-main"><a class="brand footer-brand" href="#inicio" aria-label="Dr. Beto Filmari — voltar ao início"><span class="brand-mark" aria-hidden="true">BF</span><span class="brand-copy"><strong>Dr. Beto Filmari</strong><small>Odontologia estética</small></span></a><p>Transformando sorrisos com naturalidade.</p><a class="button button-small" href="#agendamento"><CalendarDays :size="16" aria-hidden="true" /> Agendar avaliação</a></div>
    <div class="container footer-bottom"><p>© 2026 Dr. Beto Filmari · CRO-GO 22.429</p><p>Goiânia · Goiás</p><a href="#inicio">Voltar ao topo ↑</a></div>
  </footer>
  <a class="floating-cta" href="#agendamento" aria-label="Ir para agendamento"><CalendarDays :size="19" aria-hidden="true" /><span>Agendar</span></a>
</template>
