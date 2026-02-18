<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { marked } from "marked";
import { useMainStore } from "@/store.js";
import ResultsProgress from "@/components/ResultsProgress.vue";
import PartyAnswer from "@/components/PartyAnswer.vue";

const route = useRoute();
const router = useRouter();
const store = useMainStore();

const questionIndex = computed(() => parseInt(route.params.idx, 10) - 1);
const questionNumber = computed(() => questionIndex.value + 1);

const question = computed(() => {
  const questionId = store.questionOrder[questionIndex.value];
  return store.quizData.questions.find((q) => q.id === questionId);
});

const workGroup = computed(() => {
  if (!question.value) return null;
  return store.quizData.workgroups.find(
    (wg) => wg.id === question.value.workgroup_id,
  );
});

const descriptionHtml = computed(() => {
  if (!question.value || !question.value.description) return "";
  return marked.parse(question.value.description);
});

const answer = computed(() => {
  const questionId = store.questionOrder[questionIndex.value];
  return store.quizAnswers[questionId];
});

function partyImage(partyId) {
  return store.quizData.parties.find((p) => p.id === partyId)?.image || null;
}

function partyName(partyId) {
  return store.quizData.parties.find((p) => p.id === partyId)?.name || "???";
}

onMounted(() => {
  if (!store.partiesToCompare.length) {
    router.push({ name: "results" });
  }
});
</script>

<template>
  <main class="container">
    <div v-if="question" class="body">
      <ResultsProgress
        :current="questionNumber"
        :count="store.questionOrder.length"
      />
      <div class="content">
        <div v-if="workGroup" class="category">{{ workGroup.name }}</div>
        <h1 v-if="question.list_title || question.title" class="title">
          {{ question.list_title || question.title }}
        </h1>
        <!-- eslint-disable vue/no-v-html -->
        <div
          v-if="descriptionHtml"
          class="description"
          v-html="descriptionHtml"
        ></div>
        <!-- eslint-enable vue/no-v-html -->
        <RouterLink
          :to="{ name: 'resultsByParty', params: { idx: questionNumber - 1 } }"
          class="back"
          :class="{ hidden: questionIndex <= 0 }"
        >
          <img src="../assets/img/puscica.svg" alt="Nazaj" />
        </RouterLink>
        <RouterLink
          :to="{ name: 'resultsByParty', params: { idx: questionNumber + 1 } }"
          class="skip"
          :class="{ hidden: questionIndex >= store.questionOrder.length - 1 }"
        >
          <img src="../assets/img/puscica.svg" alt="Naprej" />
        </RouterLink>
      </div>
      <div class="more-info">
        <div class="my-answer">
          <span>Tvoj odgovor</span>
          <div v-if="answer === true">
            <img src="../assets/img/strinjam.svg" alt="" />
            Se strinjam
          </div>
          <div v-if="answer === false">
            <img src="../assets/img/ne-strinjam.svg" alt="" />
            Se ne strinjam
          </div>
          <div v-if="answer == null">
            <img src="../assets/img/neopredeljen.svg" alt="" />
            Brez stališča
          </div>
        </div>
        <div class="parties">
          <div
            v-for="partyId in store.partiesToCompare"
            :key="partyId"
            class="party"
          >
            <div class="head">
              <img :src="partyImage(partyId)" class="party-image" alt="" />
              <span>{{ partyName(partyId) }}</span>
            </div>
            <PartyAnswer
              :question-index="questionIndex"
              :party-id="partyId"
            ></PartyAnswer>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.body {
  .content {
    position: relative;
    padding-inline: 6rem;
    padding-block: 3.25rem 4rem;

    @media (max-width: 575.98px) {
      padding-inline: 1.5rem;
      padding-block: 2rem;
    }

    .category {
      display: inline-block;
      margin-bottom: 1.25rem;
      padding: 0.25rem;
      background-color: #cee9c5;
      font-size: 0.75rem;
      line-height: 1;
    }

    .title {
      margin-bottom: 1em;
      font-size: 2rem;
      line-height: 1.2;

      @media (max-width: 575.98px) {
        font-size: 1.5rem;
      }
    }

    .description {
      font-size: 1.3125rem;
      line-height: 1.5;

      @media (max-width: 575.98px) {
        font-size: 1rem;
      }
    }

    .back,
    .skip {
      width: 2.625rem;
      height: 2.625rem;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 5.5rem;

      @media (max-width: 575.98px) {
        top: 1.75rem;
      }

      img {
        width: 1.3125rem;
        height: 1.3125rem;
      }

      &.hidden {
        visibility: hidden;
      }

      &:hover {
        background-color: #65a3ff;
      }

      &:focus-visible {
        outline: 2px solid #006fc3;
        outline-offset: 2px;
      }
    }

    .back {
      left: 1.5rem;

      img {
        transform: rotate(180deg);
      }
    }

    .skip {
      right: 1.5rem;
    }
  }

  .more-info {
    border-top: 2px solid #000;
    background-color: #eaf5ff;
    padding-inline: 6rem;
    padding-block: 3.25rem 4rem;

    @media (max-width: 575.98px) {
      padding-inline: 1.5rem;
      padding-block: 2rem;
    }

    .my-answer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 0.75rem;
      background-color: #d0e9ff;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      font-size: 1.125rem;
      line-height: 1.2;
      font-weight: 700;

      @media (max-width: 575.98px) {
        font-size: 0.75rem;
      }

      & > span {
        flex: 1;
        font-size: 1.3125rem;

        @media (max-width: 575.98px) {
          font-size: 1rem;
        }
      }

      & > div {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 145px;

        @media (max-width: 575.98px) {
          justify-content: flex-start;
          min-width: initial;
        }

        img {
          height: 2rem;

          @media (max-width: 575.98px) {
            height: 1.5rem;
          }
        }
      }
    }

    .parties {
      background-color: #fff;
      font-size: 1rem;
      line-height: 1.2;
      font-weight: 700;

      @media (max-width: 575.98px) {
        font-size: 0.75rem;
      }

      .party {
        display: flex;
        gap: 0.5rem;
        align-items: start;
        padding: 1rem 0.75rem;
        width: 100%;
        border-bottom: 1px solid black;

        @media (max-width: 575.98px) {
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .party-image {
          flex-shrink: 0;
          width: 2.25rem;
          height: 2.25rem;
          border: 1px solid black;
          border-radius: 50%;
          margin-right: 0.5rem;
          object-fit: contain;
        }
      }

      .head {
        flex: 1;
        display: flex;
        align-items: center;

        @media (max-width: 575.98px) {
          min-width: initial;
          max-width: 58%;
        }
      }
    }
  }
}
</style>
