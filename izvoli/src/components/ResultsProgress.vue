<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useMainStore } from "@/store.js";

const store = useMainStore();

defineProps({
  current: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

function getQuestionAnswer(index) {
  const questionId = store.questionOrder[index];
  return store.quizAnswers[questionId];
}

function getQuestionTag(index) {
  const questionId = store.questionOrder[index];
  const question = store.quizData.questions.find((q) => q.id === questionId);
  if (!question) return null;
  return question.list_title || question.title || null;
}

const tooltip = ref();

function showTooltip(event) {
  const circle = event.target;
  const tag = circle.dataset.tag;
  if (!tag) return;
  tooltip.value.style.display = "inline-block";
  tooltip.value.querySelector("span").textContent = tag;
  const circleCenter = circle.offsetLeft + circle.offsetWidth / 2;
  const tooltipWidth = tooltip.value.offsetWidth;
  tooltip.value.style.left = `${circleCenter - tooltipWidth / 2}px`;
  if (tooltip.value.offsetLeft < 0) {
    tooltip.value.style.left = 0;
  } else if (
    tooltip.value.offsetLeft + tooltipWidth >
    tooltip.value.parentElement.offsetWidth
  ) {
    tooltip.value.style.left = `${tooltip.value.parentElement.offsetWidth - tooltipWidth}px`;
  }
}

function hideTooltip() {
  tooltip.value.style.display = "none";
}
</script>

<template>
  <div class="results-progress">
    <div class="progress-number">{{ current }}/{{ count }}</div>
    <div class="progress-circles">
      <RouterLink
        v-for="i in count"
        :key="i"
        class="progress-circle"
        :data-tag="getQuestionTag(i - 1)"
        :class="{
          active: i === current,
          agree: getQuestionAnswer(i - 1) === true,
          disagree: getQuestionAnswer(i - 1) === false,
          neutral: getQuestionAnswer(i - 1) == null,
        }"
        :to="{ name: 'resultsByParty', params: { idx: i } }"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
      ></RouterLink>
    </div>
    <div ref="tooltip" class="progress-tooltip">
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.results-progress {
  background-color: #eaf5ff;
  border-bottom: 2px solid black;
  position: relative;

  .progress-number {
    background-color: rgba(#eaf5ff, 0.85);
    font-size: 0.75rem;
    line-height: 1.6;
    font-weight: 700;
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
          content: "";
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

      &.agree {
        background-image: url("@/assets/img/strinjam.svg");
      }

      &.disagree {
        background-image: url("@/assets/img/ne-strinjam.svg");
      }

      &.neutral {
        background-image: url("@/assets/img/neopredeljen.svg");
      }

      &.active {
        background-color: #bddc00;
        background-image: none;
        box-shadow: 0px 0px 5px 0px #65a3ff;
      }
    }
  }

  .progress-tooltip {
    position: absolute;
    top: 40px;
    left: 0;
    display: none;
    max-width: 250px;
    padding: 4px 8px;
    background-color: #484848;
    border-radius: 5px;
    font-size: 0.75rem;
    line-height: 1;
    color: white;
    pointer-events: none;
    text-align: center;

    @media (max-width: 575.98px) {
      display: none !important;
    }
  }
}
</style>
