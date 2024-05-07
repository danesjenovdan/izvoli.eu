<script setup>
defineProps({
  current: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="questions-progress">
    <div class="progress-number">{{ current }}/{{ count }}</div>
    <div class="progress-circles">
      <div
        v-for="i in count"
        :key="i"
        class="progress-circle"
        :class="{ active: i === current, checked: i < current }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.questions-progress {
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
      padding: 10px 0 7px;
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
      display: none;
    }

    .progress-circle {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border: 2px solid black;
      border-radius: 9999px;
      position: relative;

      &:not(:last-child) {
        &::after {
          content: '';
          position: absolute;
          top: 6px;
          right: -11px;
          height: 2px;
          width: 9px;
          background-color: black;
        }
      }

      &.checked {
        background-color: #ffe468;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 9px;
          height: 5px;
          border: solid black;
          border-width: 0 0 2px 2px;
          transform: scale(1) rotate(-45deg) translateX(-12%) translateY(90%);
        }
      }

      &.active {
        background-color: #7fb2ff;

        &::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: black;
          border-radius: 9999px;
        }
      }
    }
  }
}
</style>
