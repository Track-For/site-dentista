# Especificação — Site Dr. Edrey Mundoco

## 1. Objetivo

Criar uma landing page institucional de alta conversão para o cirurgião-dentista Dr. Edrey Mundoco, com percepção premium, acolhedora e segura. A estrutura se inspira na hierarquia de conteúdo observada em `https://gazzaodontologia.com.br/`, sem reproduzir sua identidade, textos ou composição visual.

## 2. Diagnóstico inicial

- Workspace original sem aplicação existente; apenas a referência visual `Inspirações/Edrey.png`.
- Stack definida pelo pedido: Vue 3 + TypeScript + Vite.
- Hospedagem preparada para OpenAI Sites/Cloudflare, sem banco, autenticação ou upload.
- Página única, com navegação por âncoras e interações leves no cliente.

## 3. Regras de negócio e premissas

- Nome profissional: Dr. Edrey Mundoco.
- Título confirmado pela identidade visual: cirurgião-dentista.
- Serviços confirmados pela identidade visual:
  - clareamento dental;
  - restaurações estéticas;
  - prótese dentária;
  - tratamento de canal;
  - limpeza preventiva;
  - extrações.
- Não inventar CRO, endereço, telefone, preços, anos de experiência, avaliações, depoimentos ou resultados clínicos.
- A comunicação deve informar e acolher, sem prometer resultados garantidos.
- O CTA principal conduz à preparação de um pedido de agendamento. Como não foi fornecido um número oficial, a experiência usa o compartilhamento nativo do dispositivo e oferece cópia da mensagem como alternativa.
- A imagem fornecida será usada como principal ativo de marca e retrato, com recorte por CSS; ela não será alterada.

## 4. Arquitetura da página

1. **Cabeçalho fixo**
   - marca tipográfica “EM” + “Dr. Edrey Mundoco”;
   - links: Início, Tratamentos, Sobre, Dúvidas;
   - CTA “Agendar avaliação”;
   - menu acessível no mobile.
2. **Hero**
   - selo “Odontologia com cuidado e precisão”;
   - headline “Seu sorriso merece um cuidado à altura da sua história”;
   - texto de apoio curto;
   - CTAs para agendamento e tratamentos;
   - retrato recortado da imagem de identidade visual;
   - pequenos indicadores de confiança sem números inventados.
3. **Faixa de confiança**
   - atendimento individualizado;
   - planejamento transparente;
   - cuidado do início ao pós-atendimento.
4. **Tratamentos**
   - grade com os seis serviços confirmados;
   - cada item abre/expande uma explicação curta;
   - CTA secundário para conversar sobre o tratamento adequado.
5. **Sobre o profissional**
   - posicionamento humano e foco em escuta, clareza e planejamento;
   - uso integral da peça de identidade visual como apoio.
6. **Jornada de atendimento**
   - avaliação;
   - planejamento;
   - cuidado e acompanhamento.
7. **Perguntas frequentes**
   - acordeão acessível com quatro dúvidas gerais e respostas não diagnósticas.
8. **Agendamento**
   - formulário curto com nome, interesse e período preferido;
   - preparação/compartilhamento de mensagem sem coletar ou armazenar dados;
   - aviso de que urgências devem buscar atendimento imediato.
9. **Rodapé**
   - marca, navegação, serviços e aviso de conteúdo informativo.

## 5. Direção visual

- Base: preto profundo e grafite, inspirados no fundo da peça.
- Destaque: dourado âmbar, usado com parcimônia em botões, linhas e marcadores.
- Texto: off-white e cinzas quentes para manter conforto visual.
- Tipografia: sans-serif elegante e limpa para interface; serifada de alto contraste em headlines para reforçar sofisticação.
- Motivos: arcos dourados, linhas finas, brilho controlado e cartões escuros com bordas discretas.
- A estética deve parecer editorial e contemporânea, não um template hospitalar genérico.

### Tokens principais

- `--ink: #090909`
- `--surface: #11110f`
- `--surface-soft: #181714`
- `--gold: #d89624`
- `--gold-light: #f1bd5b`
- `--paper: #f7f2e9`
- `--muted: #aaa59c`
- raios: 16–32 px;
- largura máxima: 1180 px.

## 6. Comportamento e responsividade

- Desktop: hero em duas colunas, grade de tratamentos em 3 colunas.
- Tablet: hero preserva duas colunas até perder legibilidade; grade em 2 colunas.
- Mobile: coluna única, navegação em painel, CTA principal visível e áreas de toque mínimas de 44 px.
- Rolagem suave respeitando `prefers-reduced-motion`.
- Acordeões usam elementos nativos e navegação por teclado.
- Estados de foco sempre visíveis.

## 7. SEO, acessibilidade e performance

- `lang="pt-BR"`, título e descrição específicos.
- Metadados Open Graph e Twitter/X coerentes com a marca.
- Hierarquia única de `h1`, landmarks semânticos e links de salto.
- Contraste mínimo AA, textos alternativos e labels explícitos.
- Imagem principal otimizada pelo navegador (`decoding`, dimensões e posicionamento responsivo).
- JavaScript limitado às interações necessárias; sem carrosséis ou bibliotecas pesadas.

## 8. Critérios de aceite

- Build de produção concluído sem erros.
- Nenhuma informação profissional ou de contato inventada.
- Todos os links internos, menu mobile, acordeões e formulário funcionam com mouse e teclado.
- Layout utilizável em larguras de 360 px, 768 px e 1440 px.
- Sem overflow horizontal ou conteúdo encoberto pelo cabeçalho.
- A página continua legível com JavaScript desabilitado, exceto o compartilhamento da mensagem.

## 9. Pendências para publicação definitiva

- Inserir CRO e UF, se desejado.
- Conectar o número oficial de WhatsApp e demais canais.
- Informar endereço e horários, caso devam aparecer.
- Substituir respostas genéricas por orientações revisadas pelo profissional.
- Adicionar política de privacidade se houver futura coleta ou envio de dados.
