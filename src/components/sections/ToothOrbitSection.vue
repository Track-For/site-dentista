<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
const stage = ref(null)
const scene = ref(null)
const track = ref(null)
const tooth = ref(null)
const orbitElements = []

const orbitItems = [
  { lines: ['PRECISION'], phase: 194, radius: 1.04, speed: 0.82, className: 'is-display' },
  { lines: ['NATURAL', 'RESULTS'], phase: 18, radius: 1.02, speed: 0.82, className: 'is-display is-right' },
  { lines: ['PLANEJAMENTO 3D'], phase: 322, radius: 0.82, speed: 1.08, className: 'is-small' },
  { lines: ['TITÂNIO', 'PREMIUM'], phase: 132, radius: 0.76, speed: 1.08, className: 'is-serif' },
  { lines: ['CONFORTO'], phase: 74, radius: 1.14, speed: 0.68, className: 'is-small is-spaced' },
  { lines: ['PREVISIBILIDADE'], phase: 250, radius: 0.7, speed: 1.2, className: 'is-small is-spaced' },
  { lines: ['ESTÉTICA NATURAL'], phase: 286, radius: 1.12, speed: 0.68, className: 'is-small is-spaced' },
  { lines: ['PRECISÃO MILIMÉTRICA'], phase: 102, radius: 0.94, speed: 0.94, className: 'is-small is-spaced' },
  { lines: ['DIGITAL', 'PLANNING'], phase: 210, radius: 0.66, speed: 1.2, className: 'is-large' },
]

let ctx
let mm
let resizeObserver
let orbitTween
let radius = 360
const orbitState = { angle: 0 }
const setters = []

const measureOrbit = () => {
  radius = Math.max(190, track.value?.offsetWidth / 2 || 360)
}

const updateOrbit = () => {
  const tiltX = 66 * (Math.PI / 180)
  const tiltZ = -12 * (Math.PI / 180)
  const cosX = Math.cos(tiltX)
  const sinX = Math.sin(tiltX)
  const cosZ = Math.cos(tiltZ)
  const sinZ = Math.sin(tiltZ)

  orbitItems.forEach((item, index) => {
    const element = orbitElements[index]
    const setter = setters[index]
    if (!element || !setter) return

    const angle = (orbitState.angle * item.speed + item.phase) * (Math.PI / 180)
    const localX = Math.cos(angle) * radius * item.radius
    const localY = Math.sin(angle) * radius * item.radius
    const projectedY = localY * cosX
    const depth = localY * sinX * 0.72
    const x = localX * cosZ - projectedY * sinZ
    const y = localX * sinZ + projectedY * cosZ
    const depthRatio = Math.max(-1, Math.min(1, depth / (radius * 0.78)))
    const scale = 0.88 + ((depthRatio + 1) / 2) * 0.2

    setter.x(x)
    setter.y(y)
    setter.z(depth)
    setter.scale(scale)
    element.style.zIndex = depth > 18 ? '7' : '2'
    element.style.setProperty('--depth-opacity', String(0.42 + ((depthRatio + 1) / 2) * 0.58))
    element.style.setProperty('--depth-blur', `${Math.max(0, -depthRatio * 1.35).toFixed(2)}px`)
  })
}

const onPointerMove = (event) => {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return
  const rect = root.value.getBoundingClientRect()
  const xPct = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const yPct = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  ctx?.applyDepth?.(xPct, yPct)
}

const onPointerLeave = () => ctx?.resetDepth?.()

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const rotateXTo = gsap.quickTo(scene.value, 'rotationX', { duration: 0.55, ease: 'power3', overwrite: 'auto' })
    const rotateYTo = gsap.quickTo(scene.value, 'rotationY', { duration: 0.55, ease: 'power3', overwrite: 'auto' })
    const toothXTo = gsap.quickTo(tooth.value, 'x', { duration: 0.7, ease: 'power3', overwrite: 'auto' })
    const toothYTo = gsap.quickTo(tooth.value, 'y', { duration: 0.7, ease: 'power3', overwrite: 'auto' })

    self.add('applyDepth', (xPct, yPct) => {
      rotateXTo(-yPct * 2.2)
      rotateYTo(xPct * 3.2)
      toothXTo(xPct * 6)
      toothYTo(yPct * 5)
    })

    self.add('resetDepth', () => {
      rotateXTo(0)
      rotateYTo(0)
      toothXTo(0)
      toothYTo(0)
    })

    gsap.set(scene.value, { transformPerspective: 1200, transformStyle: 'preserve-3d' })
    gsap.set(tooth.value, { z: 32, force3D: true })

    orbitElements.forEach((element) => {
      gsap.set(element, { xPercent: -50, yPercent: -50, force3D: true })
      setters.push({
        x: gsap.quickSetter(element, 'x', 'px'),
        y: gsap.quickSetter(element, 'y', 'px'),
        z: gsap.quickSetter(element, 'z', 'px'),
        scale: gsap.quickSetter(element, 'scale'),
      })
    })

    measureOrbit()
    updateOrbit()

    if (!reduceMotion) {
      gsap.to('.orbit-object img', {
        y: 8,
        rotation: 0.7,
        duration: 3.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        force3D: true,
      })

      gsap.from(orbitElements, {
        autoAlpha: 0,
        filter: 'blur(12px)',
        stagger: 0.055,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.value, start: 'top 62%', once: true },
      })
    } else {
      gsap.set(orbitElements, { autoAlpha: 1, clearProps: 'filter' })
    }

    gsap.to(stage.value, {
      scale: 1.035,
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    })
  }, root.value)

  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    orbitTween = gsap.to(orbitState, {
      angle: 360,
      duration: 38,
      repeat: -1,
      ease: 'none',
      onUpdate: updateOrbit,
    })

    const visibilityTrigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => orbitTween?.play(),
      onEnterBack: () => orbitTween?.play(),
      onLeave: () => orbitTween?.pause(),
      onLeaveBack: () => orbitTween?.pause(),
    })

    return () => {
      visibilityTrigger.kill()
      orbitTween?.kill()
    }
  })

  resizeObserver = new ResizeObserver(() => {
    measureOrbit()
    updateOrbit()
  })
  resizeObserver.observe(stage.value)

  root.value.addEventListener('pointermove', onPointerMove, { passive: true })
  root.value.addEventListener('pointerleave', onPointerLeave)
})

onUnmounted(() => {
  root.value?.removeEventListener('pointermove', onPointerMove)
  root.value?.removeEventListener('pointerleave', onPointerLeave)
  resizeObserver?.disconnect()
  mm?.revert()
  ctx?.revert()
})
</script>

<template>
  <section ref="root" class="orbit-section" data-cursor="DISCOVER">
    <div class="section-kicker"><span>02</span> PRECISION OBJECT</div>
    <div ref="stage" class="orbit-stage">
      <div ref="scene" class="orbit-scene">
        <div ref="track" class="orbit-track orbit-track-back" aria-hidden="true"></div>
        <div class="orbit-track orbit-track-front" aria-hidden="true"></div>

        <span
          v-for="(item, index) in orbitItems"
          :key="`${item.lines.join('-')}-${index}`"
          :ref="(element) => { if (element) orbitElements[index] = element }"
          class="orbit-item"
          :class="item.className"
          aria-hidden="true"
        >
          <span class="orbit-label">
            <template v-for="(line, lineIndex) in item.lines" :key="line">
              {{ line }}<br v-if="lineIndex < item.lines.length - 1" />
            </template>
          </span>
        </span>

        <div ref="tooth" class="orbit-object">
          <div class="tooth-halo"></div>
          <img src="/tooth-implant.png" alt="Implante Elyra em cerâmica e titânio" />
        </div>
      </div>
    </div>
    <div class="orbit-axis" aria-hidden="true"><span></span><small>−12° ORBITAL AXIS</small></div>
    <p class="orbit-note">Uma imagem simples do que orienta tudo por aqui: forma, função e tecnologia trabalhando como uma só.</p>
  </section>
</template>
