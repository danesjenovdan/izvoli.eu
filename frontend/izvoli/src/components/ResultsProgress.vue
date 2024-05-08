<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  list: {
    type: Array,
    required: true
  },
  answers: {
    type: Object,
    required: true
  },
  tags: {
    type: Object,
    required: true
  }
})

const tooltip = ref()

function getAnswer(i) {
  const index = i - 1
  return props.answers[props.list[index]]
}

function getTag(i) {
  const index = i - 1
  return props.tags[props.list[index]]
}

function showTooltip(event) {
  const circle = event.target
  const tag = circle.dataset.tag
  if (!tag) return
  tooltip.value.style.display = 'inline-block'
  tooltip.value.querySelector('span').textContent = tag
  const circleCenter = circle.offsetLeft + circle.offsetWidth / 2
  const tooltipWidth = tooltip.value.offsetWidth
  tooltip.value.style.left = `${circleCenter - tooltipWidth / 2}px`
  if (tooltip.value.offsetLeft < 0) {
    tooltip.value.style.left = 0
  } else if (tooltip.value.offsetLeft + tooltipWidth > tooltip.value.parentElement.offsetWidth) {
    tooltip.value.style.left = `${tooltip.value.parentElement.offsetWidth - tooltipWidth}px`
  }
}

function hideTooltip() {
  tooltip.value.style.display = 'none'
}
</script>

<template>
  <div class="results-progress">
    <div class="progress-number">{{ current }}/{{ count }}</div>
    <div class="progress-circles">
      <div
        v-for="i in count"
        :key="i"
        class="progress-circle"
        :data-tag="getTag(i)"
        :class="{
          active: i === current,
          agree: getAnswer(i) === 'YES',
          disagree: getAnswer(i) === 'NO',
          neutral: !getAnswer(i) || getAnswer(i) === 'NEUTRAL'
        }"
        @click="router.push({ name: 'resultsByParty', params: { id: i } })"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
      ></div>
    </div>
    <div class="progress-tooltip" ref="tooltip">
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.results-progress {
  background-color: #f2f7ff;
  border-bottom: 2px solid black;
  position: relative;

  .progress-number {
    background-color: rgba(#f2f7ff, 0.85);
    font-size: 12px;
    line-height: 18px;
    font-weight: 600;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    padding: 14px 11px 7px 22px;

    @media (max-width: 575.98px) {
      position: static;
      text-align: center;
      padding: 6px 0 4px;
      border-bottom: 2px solid black;
    }
  }

  .progress-circles {
    display: flex;
    gap: 9px;
    padding: 14px 27px 12px 72px;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;

    @media (max-width: 575.98px) {
      gap: 21px;
      padding: 8px 27px;
    }

    .progress-circle {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border: 1px solid black;
      border-radius: 9999px;
      position: relative;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 10px 10px;
      cursor: pointer;

      @media (max-width: 575.98px) {
        width: 26px;
        height: 26px;
        background-size: 14px 14px;
      }

      &:not(:last-child) {
        &::after {
          content: '';
          position: absolute;
          top: 7px;
          right: -10px;
          height: 2px;
          width: 9px;
          background-color: black;

          @media (max-width: 575.98px) {
            width: 21px;
            top: 11px;
            right: -22px;
          }
        }
      }

      &.active {
        background-color: #ffe468;
      }

      &.agree {
        background-image: url('@/assets/img/strinjam.svg');
      }

      &.disagree {
        background-image: url('@/assets/img/ne-strinjam.svg');
      }

      &.neutral {
        background-image: url('@/assets/img/neopredeljen.svg');
      }
    }
  }

  .progress-tooltip {
    position: absolute;
    top: 40px;
    left: 0;
    display: none;
    padding: 4px 8px;
    background-color: #484848;
    border-radius: 5px;
    font-size: 11px;
    line-height: 1;
    color: white;
    pointer-events: none;
    white-space: nowrap;

    @media (max-width: 575.98px) {
      display: none !important;
    }
  }
}
</style>
