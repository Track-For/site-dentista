<script setup lang="ts">
import { ref } from 'vue'
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  HeartHandshake,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  SunMedium,
  WandSparkles,
  X,
} from '@lucide/vue'

const menuOpen = ref(false)
const activeTreatment = ref<number | null>(0)
const formStatus = ref('')

const treatments = [
  {
    title: 'Clareamento dental',
    description: 'Um plano supervisionado para devolver luminosidade ao sorriso com segurança e naturalidade.',
    icon: Sparkles,
  },
  {
    title: 'Restaurações estéticas',
    description: 'Recuperação de forma, função e harmonia com materiais que se integram ao seu sorriso.',
    icon: WandSparkles,
  },
  {
    title: 'Prótese dentária',
    description: 'Soluções planejadas para restaurar conforto, confiança e qualidade na mastigação.',
    icon: ShieldCheck,
  },
  {
    title: 'Tratamento de canal',
    description: 'Cuidado criterioso para preservar o dente e aliviar o desconforto, respeitando cada etapa clínica.',
    icon: Activity,
  },
  {
    title: 'Limpeza preventiva',
    description: 'Prevenção e acompanhamento para manter dentes e gengivas saudáveis ao longo do tempo.',
    icon: SunMedium,
  },
  {
    title: 'Extrações',
    description: 'Avaliação responsável e procedimento conduzido com atenção ao conforto e à recuperação.',
    icon: Check,
  },
]

const faqs = [
  {
    question: 'Como funciona a primeira avaliação?',
    answer:
      'A consulta começa com uma conversa sobre suas necessidades e expectativas. Depois da avaliação clínica, você recebe uma explicação clara sobre os possíveis caminhos de cuidado.',
  },
  {
    question: 'Qual tratamento é o mais indicado para mim?',
    answer:
      'A indicação depende da avaliação individual. O objetivo é compreender sua saúde bucal, suas prioridades e construir um plano coerente com o seu momento.',
  },
  {
    question: 'Posso tirar dúvidas antes de decidir?',
    answer:
      'Sim. Decisões bem informadas fazem parte do atendimento. Benefícios, etapas e cuidados são explicados antes do início de qualquer tratamento.',
  },
  {
    question: 'Como devo agir em uma urgência odontológica?',
    answer:
      'Dor intensa, trauma, sangramento persistente ou inchaço importante pedem avaliação rápida. Procure um serviço odontológico de urgência disponível na sua região.',
  },
]

function closeMenu() {
  menuOpen.value = false
}

function toggleTreatment(index: number) {
  activeTreatment.value = activeTreatment.value === index ? null : index
}

async function prepareMessage(event: Event) {
  const form = event.currentTarget as HTMLFormElement
  const data = new FormData(form)
  const name = String(data.get('name') || '').trim()
  const interest = String(data.get('interest') || '').trim()
  const period = String(data.get('period') || '').trim()
  const message = `Olá, sou ${name}. Gostaria de conversar sobre ${interest}. Tenho preferência pelo período ${period}.`

  formStatus.value = ''

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Pedido de avaliação odontológica', text: message })
      formStatus.value = 'Mensagem compartilhada. Agora é só enviá-la ao contato oficial da clínica.'
      return
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        formStatus.value = 'Compartilhamento cancelado. Você pode tentar novamente quando quiser.'
        return
      }
    }
  }

  try {
    await navigator.clipboard.writeText(message)
    formStatus.value = 'Mensagem copiada. Envie-a ao contato oficial da clínica para solicitar seu horário.'
  } catch {
    formStatus.value = `Mensagem pronta: “${message}”`
  }
}
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  <header class="site-header" @keydown.esc="closeMenu">
    <div class="container header-inner">
      <a class="brand" href="#inicio" aria-label="Dr. Edrey Mundoco — início" @click="closeMenu">
        <img class="brand-logo" src="/logo-edrey-transparent.png" alt="Dr. Edrey Mundoco, cirurgião-dentista" />
      </a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="main-navigation"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="22" aria-hidden="true" />
        <Menu v-else :size="22" aria-hidden="true" />
      </button>

      <nav id="main-navigation" class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Principal">
        <a href="#inicio" @click="closeMenu">Início</a>
        <a href="#tratamentos" @click="closeMenu">Tratamentos</a>
        <a href="#sobre" @click="closeMenu">Sobre</a>
        <a href="#duvidas" @click="closeMenu">Dúvidas</a>
        <a class="button button-small" href="#agendamento" @click="closeMenu">Agendar avaliação</a>
      </nav>
    </div>
  </header>

  <main id="conteudo">
    <section id="inicio" class="hero" aria-labelledby="hero-title">
      <div class="hero-orbit hero-orbit-one" aria-hidden="true"></div>
      <div class="hero-orbit hero-orbit-two" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span></span> Odontologia com cuidado e precisão</p>
          <h1 id="hero-title">Seu sorriso merece um cuidado à altura da <em>sua história.</em></h1>
          <p class="hero-lead">
            Um atendimento próximo, transparente e planejado para você se sentir seguro em cada decisão.
          </p>
          <div class="hero-actions">
            <a class="button" href="#agendamento">
              <CalendarDays :size="18" aria-hidden="true" />
              Agendar avaliação
            </a>
            <a class="text-link" href="#tratamentos">
              Conhecer tratamentos
              <ArrowDownRight :size="18" aria-hidden="true" />
            </a>
          </div>
          <div class="hero-note" aria-label="Diferenciais do atendimento">
            <span>Escuta atenta</span>
            <span>Plano individual</span>
            <span>Acompanhamento</span>
          </div>
        </div>

        <div class="hero-portrait-wrap">
          <div class="portrait-glow" aria-hidden="true"></div>
          <div class="hero-portrait">
            <img
              src="/edrey-retrato.png"
              alt="Dr. Edrey Mundoco em retrato profissional"
              width="1080"
              height="1610"
              decoding="async"
            />
          </div>
          <div class="portrait-caption">
            <img class="caption-logo-mark" src="/logo-edrey-mark.png" alt="" aria-hidden="true" />
            <p><strong>Dr. Edrey Mundoco</strong><small>Cirurgião-dentista</small></p>
          </div>
        </div>
      </div>
    </section>

    <section class="trust-strip" aria-label="Compromissos do atendimento">
      <div class="container trust-grid">
        <p><span>01</span> Atendimento individualizado</p>
        <p><span>02</span> Planejamento transparente</p>
        <p><span>03</span> Cuidado em cada etapa</p>
      </div>
    </section>

    <section id="tratamentos" class="section treatments-section" aria-labelledby="treatments-title">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow"><span></span> Tratamentos</p>
            <h2 id="treatments-title">Cuidado completo para a saúde e a <em>estética do sorriso.</em></h2>
          </div>
          <p>
            Cada tratamento começa com diagnóstico e conversa. Explore as possibilidades e descubra o que faz sentido para você.
          </p>
        </div>

        <div class="treatments-grid">
          <article
            v-for="(treatment, index) in treatments"
            :key="treatment.title"
            class="treatment-card"
            :class="{ 'is-active': activeTreatment === index }"
          >
            <button
              type="button"
              :aria-expanded="activeTreatment === index"
              :aria-controls="`treatment-${index}`"
              @click="toggleTreatment(index)"
            >
              <span class="treatment-icon"><component :is="treatment.icon" :size="22" aria-hidden="true" /></span>
              <span class="treatment-number">0{{ index + 1 }}</span>
              <strong>{{ treatment.title }}</strong>
              <ArrowRight class="treatment-arrow" :size="20" aria-hidden="true" />
            </button>
            <div v-show="activeTreatment === index" :id="`treatment-${index}`" class="treatment-detail">
              <p>{{ treatment.description }}</p>
              <a href="#agendamento">Conversar sobre este cuidado <ArrowRight :size="15" aria-hidden="true" /></a>
            </div>
          </article>
        </div>

        <div class="section-cta">
          <p><strong>Não sabe por onde começar?</strong> A avaliação é o primeiro passo para um plano realmente seu.</p>
          <a class="button button-outline" href="#agendamento">Quero cuidar do meu sorriso</a>
        </div>
      </div>
    </section>

    <section id="sobre" class="section about-section" aria-labelledby="about-title">
      <div class="container about-grid">
        <div class="about-visual">
          <div class="about-image">
            <img
              src="/edrey-retrato.png"
              alt="Retrato profissional do Dr. Edrey Mundoco"
              width="1080"
              height="1610"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p class="image-label">
            <img class="caption-logo-mark" src="/logo-edrey-mark.png" alt="" aria-hidden="true" loading="lazy" />
            Presença, técnica e atenção aos detalhes.
          </p>
        </div>

        <div class="about-copy">
          <p class="eyebrow"><span></span> Sobre o atendimento</p>
          <h2 id="about-title">Confiança nasce quando você <em>entende cada escolha.</em></h2>
          <p class="about-lead">
            Com o Dr. Edrey Mundoco, o cuidado começa pela escuta. Cada conversa ajuda a construir um plano claro, respeitoso e alinhado ao que você precisa.
          </p>
          <div class="about-points">
            <div>
              <HeartHandshake :size="22" aria-hidden="true" />
              <p><strong>Acolhimento de verdade</strong><span>Espaço para falar sobre expectativas, dúvidas e receios.</span></p>
            </div>
            <div>
              <ClipboardCheck :size="22" aria-hidden="true" />
              <p><strong>Decisões bem explicadas</strong><span>Orientação simples para você participar do próprio tratamento.</span></p>
            </div>
            <div>
              <ShieldCheck :size="22" aria-hidden="true" />
              <p><strong>Cuidado responsável</strong><span>Planejamento atento à função, à saúde e à naturalidade do sorriso.</span></p>
            </div>
          </div>
          <a class="text-link text-link-gold" href="#agendamento">
            Agendar uma conversa <ArrowRight :size="18" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <section class="section journey-section" aria-labelledby="journey-title">
      <div class="container">
        <div class="journey-heading">
          <p class="eyebrow"><span></span> Sua jornada de cuidado</p>
          <h2 id="journey-title">Um caminho simples, <em>construído com você.</em></h2>
        </div>
        <ol class="journey-list">
          <li>
            <span>01</span>
            <div><strong>Avaliação e escuta</strong><p>Entendemos seu momento, suas necessidades e o que você busca para o sorriso.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><strong>Planejamento claro</strong><p>As possibilidades são apresentadas com linguagem simples, etapas e cuidados envolvidos.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><strong>Cuidado e acompanhamento</strong><p>O tratamento segue o plano definido, com atenção ao conforto e à evolução clínica.</p></div>
          </li>
        </ol>
      </div>
    </section>

    <section id="duvidas" class="section faq-section" aria-labelledby="faq-title">
      <div class="container faq-grid">
        <div class="faq-intro">
          <p class="eyebrow"><span></span> Dúvidas frequentes</p>
          <h2 id="faq-title">Informação também faz parte do <em>cuidado.</em></h2>
          <p>Respostas iniciais para você chegar à avaliação com mais tranquilidade.</p>
          <a class="text-link text-link-gold" href="#agendamento">
            Quero fazer uma pergunta <ArrowRight :size="18" aria-hidden="true" />
          </a>
        </div>
        <div class="faq-list">
          <details v-for="(faq, index) in faqs" :key="faq.question" :open="index === 0">
            <summary><span>0{{ index + 1 }}</span>{{ faq.question }}<i aria-hidden="true"></i></summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section id="agendamento" class="section booking-section" aria-labelledby="booking-title">
      <div class="booking-orbit" aria-hidden="true"></div>
      <div class="container booking-grid">
        <div class="booking-copy">
          <p class="eyebrow"><span></span> Comece por uma conversa</p>
          <h2 id="booking-title">Seu próximo sorriso pode começar <em>agora.</em></h2>
          <p>
            Preencha os campos para preparar um pedido de avaliação. Nenhum dado é enviado ou armazenado por este site.
          </p>
          <div class="booking-assurance">
            <MessageCircle :size="22" aria-hidden="true" />
            <span><strong>Mensagem pronta para compartilhar</strong>Você escolhe por qual aplicativo deseja enviá-la.</span>
          </div>
        </div>

        <form class="booking-form" @submit.prevent="prepareMessage">
          <label for="name">Como podemos chamar você?</label>
          <input id="name" name="name" type="text" autocomplete="name" placeholder="Seu nome" required />

          <label for="interest">Sobre o que você quer conversar?</label>
          <select id="interest" name="interest" required>
            <option value="" disabled selected>Selecione um tratamento</option>
            <option v-for="treatment in treatments" :key="treatment.title" :value="treatment.title.toLowerCase()">
              {{ treatment.title }}
            </option>
            <option value="uma avaliação geral">Avaliação geral</option>
          </select>

          <label for="period">Qual período costuma ser melhor?</label>
          <select id="period" name="period" required>
            <option value="" disabled selected>Selecione um período</option>
            <option value="da manhã">Manhã</option>
            <option value="da tarde">Tarde</option>
            <option value="da noite">Noite</option>
          </select>

          <button class="button form-submit" type="submit">
            Preparar mensagem <ArrowRight :size="18" aria-hidden="true" />
          </button>
          <p v-if="formStatus" class="form-status" role="status" aria-live="polite">{{ formStatus }}</p>
          <p class="form-note">
            Em caso de dor intensa, trauma, sangramento persistente ou inchaço importante, procure atendimento odontológico de urgência.
          </p>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-top">
      <a class="brand footer-brand" href="#inicio" aria-label="Voltar ao início">
        <img class="brand-logo" src="/logo-edrey-transparent.png" alt="Dr. Edrey Mundoco, cirurgião-dentista" loading="lazy" />
      </a>
      <p>Cuidado que começa na escuta e se revela em cada sorriso.</p>
      <a class="button button-small" href="#agendamento">Agendar avaliação</a>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 Dr. Edrey Mundoco.</p>
      <p>Conteúdo informativo. Avaliação profissional é indispensável.</p>
      <a href="#inicio">Voltar ao topo ↑</a>
    </div>
  </footer>
</template>
