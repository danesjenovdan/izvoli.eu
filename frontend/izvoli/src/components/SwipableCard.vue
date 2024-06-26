<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import interact from 'interactjs'

const emit = defineEmits(['cardAccepted', 'cardRejected'])

const interactOutOfSightXCoordinate = 500
const interactMaxRotation = 15
const interactXThreshold = 100

const card = ref()
const isInteractDragged = ref(null)
const isInteractAnimating = ref(true)
const interactPosition = ref({ x: 0, y: 0, rotation: 0 })

const transformString = computed(() => {
  if (!isInteractAnimating.value || isInteractDragged.value) {
    const { x, y, rotation } = interactPosition.value
    return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`
  }
  return null
})

const backgroundColorString = computed(() => {
  const { x } = interactPosition.value
  if (x > interactXThreshold) return '#c8e6c9'
  else if (x < -interactXThreshold) return '#ffcdd2'
  else return '#fffbe9'
})

function playCard(interaction) {
  interact(card.value).unset()
  isInteractDragged.value = true

  switch (interaction) {
    case 'cardAccepted':
      interactPosition.value = {
        x: interactOutOfSightXCoordinate,
        y: 0,
        rotation: interactMaxRotation
      }
      setTimeout(() => {
        isInteractAnimating.value = false
        emit('cardAccepted')
      }, 400)
      break
    case 'cardRejected':
      interactPosition.value = {
        x: -interactOutOfSightXCoordinate,
        y: 0,
        rotation: -interactMaxRotation
      }
      setTimeout(() => {
        isInteractAnimating.value = false
        emit('cardRejected')
      }, 400)
      break
  }
}

const scrollY = ref(0)
const scrolledAmount = ref(0)

function setupSwipable() {
  console.log('setupSwipable')
  interact(card.value).draggable({
    startAxis: 'xy',
    lockAxis: 'start',
    onstart: () => {
      isInteractAnimating.value = false
      scrollY.value = window.scrollY
      scrolledAmount.value = 0
    },
    onmove: (event) => {
      if (Math.abs(event.dx) > 0) {
        const x = interactPosition.value.x + event.dx
        const y = interactPosition.value.y + event.dy
        let rotation = interactMaxRotation * (x / interactXThreshold)
        if (rotation > interactMaxRotation) rotation = interactMaxRotation
        else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation
        interactPosition.value = { x, y, rotation }
      } else if (Math.abs(event.dy) > 0) {
        // hack for scrolling while on draggable
        scrolledAmount.value += event.dy
        document.body.style.marginTop = `${scrolledAmount.value}px`
      }
    },
    onend: () => {
      if (Math.abs(scrolledAmount.value) > 0) {
        // hack for scrolling while on draggable
        document.body.style.marginTop = ''
        window.scrollTo(0, scrollY.value - scrolledAmount.value)
        scrolledAmount.value = 0
      } else {
        const { x } = interactPosition.value
        isInteractAnimating.value = true
        if (x > interactXThreshold) playCard('cardAccepted')
        else if (x < -interactXThreshold) playCard('cardRejected')
        else interactPosition.value = { x: 0, y: 0, rotation: 0 }
      }
    }
  })
}

const wasMobile = ref(window.innerWidth <= 575.98)
const isMobile = ref(window.innerWidth <= 575.98)

function calcMobile() {
  wasMobile.value = isMobile.value
  isMobile.value = window.innerWidth <= 575.98

  if (wasMobile.value !== isMobile.value) {
    if (isMobile.value) setupSwipable()
    else interact(card.value).unset()
  }
}

onMounted(() => {
  if (isMobile.value) setupSwipable()
  window.addEventListener('resize', calcMobile)
})

onBeforeUnmount(() => {
  interact(card.value).unset()
  window.removeEventListener('resize', calcMobile)
})
</script>

<template>
  <div
    class="swipable-card"
    :class="{
      'is-animating': isInteractAnimating
    }"
    ref="card"
    :style="{ transform: transformString, backgroundColor: backgroundColorString }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.swipable-card {
  background-color: #fffbe9;
  outline: 2px solid black;
  user-select: none;
  touch-action: none;

  &.is-animating {
    transition: transform 0.4s cubic-bezier(0.68, 0, 0.27, 1);
  }
}
</style>
