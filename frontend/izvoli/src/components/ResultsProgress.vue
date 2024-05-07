<script setup>
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
  }
})

function getAnswer(i) {
  const index = i - 1
  return props.answers[props.list[index]]
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
        :class="{
          active: i === current,
          agree: getAnswer(i) === 'YES',
          disagree: getAnswer(i) === 'NO',
          neutral: !getAnswer(i) || getAnswer(i) === 'NEUTRAL'
        }"
        @click="router.push({ name: 'resultsByParty', params: { id: i } })"
      ></div>
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
}
</style>
