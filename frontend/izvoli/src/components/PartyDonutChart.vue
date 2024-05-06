<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  result: {
    type: Object,
    required: true
  },
  parties: {
    type: Object,
    required: true
  }
})

const store = useStore()

const partyImageUrl = computed(() => {
  const url = props.parties?.[props.result?.party_id]?.image
  if (!url) return ''
  const newUrl = new URL(url, store.getters.getApiUrl)
  return newUrl.toString()
})
const partyName = computed(() => props.parties?.[props.result?.party_id]?.name || '???')

function dashOffsetFromPercentage(percentage) {
  const circumference = 2 * Math.PI * 39
  const amount = ((percentage - 25) / 100) * circumference
  return circumference - amount
}

function dashArrayFromPercentage(percentage) {
  const circumference = 2 * Math.PI * 39
  const amount = (percentage / 100) * circumference
  const remainder = circumference - amount
  return `${amount} ${remainder}`
}

function dashArrayFromRemainderPercentage(percentage) {
  const circumference = 2 * Math.PI * 39
  const amount = (percentage / 100) * circumference
  const remainder = circumference - amount
  return `${remainder} ${amount}`
}

const animationDuration = 1500
const currentPercentage = ref(0)
const targetPercentage = ref(props.result.percentage)

const dashOffset0 = dashOffsetFromPercentage(0)
const dashOffset = ref(dashOffsetFromPercentage(currentPercentage.value))
const dashArray = ref(dashArrayFromPercentage(currentPercentage.value))
const dashArrayRemainder = ref(dashArrayFromRemainderPercentage(currentPercentage.value))

const easeInOut = (t) => {
  return t > 0.5 ? 4 * Math.pow(t - 1, 3) + 1 : 4 * Math.pow(t, 3)
}

let startTimestamp = null
const stepFunction = (timestamp) => {
  if (targetPercentage.value <= 0) return
  if (!startTimestamp) startTimestamp = timestamp
  const progress = timestamp - startTimestamp
  const newPercentage = easeInOut(Math.min(progress / animationDuration, 1))
  currentPercentage.value = Math.min(newPercentage * targetPercentage.value, targetPercentage.value)
  dashOffset.value = dashOffsetFromPercentage(currentPercentage.value + 0.5)
  dashArray.value = dashArrayFromPercentage(currentPercentage.value)
  dashArrayRemainder.value = dashArrayFromRemainderPercentage(currentPercentage.value + 1)
  if (progress < animationDuration) {
    window.requestAnimationFrame(stepFunction)
  }
}

onMounted(() => {
  window.requestAnimationFrame(stepFunction)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(stepFunction)
})
</script>

<template>
  <div class="party-donut-chart">
    <svg width="86" height="86" class="party-donut">
      <defs>
        <pattern
          :id="`donut-image-${result.party_id}`"
          x="0"
          y="0"
          height="100%"
          width="100%"
          viewBox="0 0 100 100"
        >
          <rect x="0" y="0" width="100" height="100" fill="#fff"></rect>
          <image x="0" y="0" width="100" height="100" :href="partyImageUrl"></image>
        </pattern>
      </defs>
      <circle cx="43" cy="43" r="43" fill="#000" />
      <circle
        cx="43"
        cy="43"
        r="39"
        fill="none"
        stroke="#7FB2FF"
        stroke-width="6"
        :stroke-dashoffset="dashOffset0"
        :stroke-dasharray="dashArray"
      />
      <circle
        cx="43"
        cy="43"
        r="39"
        fill="none"
        stroke="#FFF"
        stroke-width="6"
        :stroke-dashoffset="dashOffset"
        :stroke-dasharray="dashArrayRemainder"
      />
      <circle cx="43" cy="43" r="35" :fill="`url(#donut-image-${result.party_id})`" />
    </svg>
    <p class="party-name">{{ partyName }}</p>
    <p class="party-percentage">{{ result.percentage }} %</p>
  </div>
</template>

<style scoped lang="scss">
.party-donut-chart {
  flex: 0 0 145px;
  text-align: center;

  .party-donut {
    display: block;
    margin-inline: auto;
    margin-bottom: 12px;
  }

  .party-name {
    margin-bottom: 6px;
    font-size: 18px;
    line-height: 1;
    font-weight: 800;
  }

  .party-percentage {
    font-size: 18px;
    line-height: 1;
    font-weight: 500;
  }
}
</style>
