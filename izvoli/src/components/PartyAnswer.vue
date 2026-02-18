<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/store.js";

const props = defineProps({
  questionIndex: {
    type: Number,
    required: true,
  },
  partyId: {
    type: Number,
    required: true,
  },
});

const store = useMainStore();

const answer = computed(() => {
  const questionId = store.questionOrder[props.questionIndex];
  return store.quizData.answers.find(
    (a) => a.question_id === questionId && a.party_id === props.partyId,
  );
});

const agreement = computed(() => {
  return answer.value?.agreement;
});

const show = ref(false);
</script>

<template>
  <div class="answer-wrapper">
    <div class="answer">
      <div v-if="agreement === true">
        <img src="../assets/img/strinjam.svg" alt="" />
        Se strinjajo
      </div>
      <div v-if="agreement === false">
        <img src="../assets/img/ne-strinjam.svg" alt="" />
        Se ne strinjajo
      </div>
      <div v-if="agreement == null">
        <img src="../assets/img/neopredeljen.svg" alt="" />
        Brez stališča
      </div>
      <button v-if="!show && answer?.comment" @click="show = true">
        Razlaga
        <img src="../assets/img/puscica-trikotnik.svg" alt="" />
      </button>
      <button v-if="show && answer?.comment" class="hide" @click="show = false">
        Skrij
        <img src="../assets/img/puscica-trikotnik.svg" alt="" />
      </button>
    </div>
    <p v-if="show" class="comment">{{ answer?.comment }}</p>
  </div>
  <p v-if="show" class="comment on-mobile">{{ answer?.comment }}</p>
</template>

<style scoped lang="scss">
.answer-wrapper {
  flex: 1;

  @media (max-width: 575.98px) {
    width: fit-content;
    margin-top: 0.25rem;
  }

  .answer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 575.98px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1rem;
      min-width: 145px;

      @media (max-width: 575.98px) {
        justify-content: flex-end;
        min-width: initial;
      }

      img {
        height: 2rem;

        @media (max-width: 575.98px) {
          height: 1.5rem;
        }
      }
    }

    & > button {
      display: inline-flex;
      gap: 0.25rem;
      align-items: center;
      justify-content: space-between;
      min-width: 100px;
      margin-left: 0.5rem;
      padding-inline: 0.75rem;
      padding-block: 0.3rem 0.2rem;
      background: transparent;
      border: 1px solid #000;
      color: #000;
      font-size: 0.875rem;
      font-weight: 400;
      cursor: pointer;

      @media (max-width: 575.98px) {
        min-width: 90px;
        margin-left: 0;
        font-size: 0.75rem;
      }

      img {
        width: 0.75rem;
      }

      &.hide {
        img {
          transform: rotate(180deg);
        }
      }

      &:hover {
        background-color: #fff;
        box-shadow: 0 0 0 1px #000 inset;
      }

      &:focus-visible {
        outline: 2px solid #006fc3;
        outline-offset: 2px;
      }
    }
  }
}

.comment {
  padding-top: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
  display: block;

  @media (max-width: 575.98px) {
    display: none;
  }

  &.on-mobile {
    display: none;
    width: 100%;
    padding-top: 0;
    font-size: 0.75rem;

    @media (max-width: 575.98px) {
      display: block;
    }
  }
}
</style>
