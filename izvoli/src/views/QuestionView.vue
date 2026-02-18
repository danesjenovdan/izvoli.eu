<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { marked } from "marked";
import { useMainStore } from "@/store.js";
import QuestionsProgress from "@/components/QuestionsProgress.vue";
import SwipableCard from "@/components/SwipableCard.vue";
import PartyElement from "@/components/PartyElement.vue";

const route = useRoute();
const router = useRouter();
const store = useMainStore();

const moreInfo = ref(false);
const moreInfoHover = ref(false);

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

const partiesAgree = computed(() => {
  return store.quizData.answers
    .filter((a) => a.question_id === question.value.id && a.agreement === true)
    .map((a) => {
      return {
        ...a,
        party: store.quizData.parties.find((p) => p.id === a.party_id),
      };
    });
});

const partiesDisagree = computed(() => {
  return store.quizData.answers
    .filter((a) => a.question_id === question.value.id && a.agreement === false)
    .map((a) => {
      return {
        ...a,
        party: store.quizData.parties.find((p) => p.id === a.party_id),
      };
    });
});

const navigateToNextQuestion = () => {
  if (questionIndex.value < store.questionOrder.length - 1) {
    router.push({
      name: "question",
      params: { idx: questionNumber.value + 1 },
    });
  } else {
    router.push({ name: "results" });
  }
};

const skipQuestion = () => {
  navigateToNextQuestion();
};

const saveAnswer = (agreement) => {
  store.saveAnswer({
    questionId: question.value.id,
    agreement,
  });
  navigateToNextQuestion();
};

router.beforeEach(() => {
  if (moreInfo.value) {
    moreInfo.value = false;
  }
});
</script>

<template>
  <main class="container">
    <div v-if="question" class="body">
      <QuestionsProgress
        :current="questionNumber"
        :count="store.questionOrder.length"
      />
      <SwipableCard
        :key="questionNumber"
        @card-accepted="saveAnswer(true)"
        @card-rejected="saveAnswer(false)"
      >
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
          <div class="buttons">
            <RouterLink
              :to="
                questionIndex <= 0
                  ? { name: 'introduction' }
                  : { name: 'question', params: { idx: questionNumber - 1 } }
              "
              class="back"
            >
              <div>
                <img src="../assets/img/puscica-trikotnik.svg" alt="" />
                <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              </div>
              <span>Nazaj</span>
            </RouterLink>
            <button class="disagree" @click="saveAnswer(false)">
              <img src="../assets/img/ne-strinjam.svg" />
              <span>Se ne strinjam</span>
            </button>
            <button class="agree" @click="saveAnswer(true)">
              <img src="../assets/img/strinjam.svg" />
              <span>Se strinjam</span>
            </button>
            <button class="skip" @click="skipQuestion">
              <span>Preskoči</span>
              <div>
                <img src="../assets/img/puscica-trikotnik.svg" alt="" />
                <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              </div>
            </button>
          </div>
        </div>
      </SwipableCard>
      <div class="more-info">
        <div class="show-hide">
          <img
            v-if="moreInfo || moreInfoHover"
            src="../assets/img/eyes-down.svg"
          />
          <img v-else src="../assets/img/eyes-right.svg" />
          <span>Kaj mislijo stranke?</span>
          <button
            v-if="!moreInfo"
            class="show"
            @click="moreInfo = true"
            @mouseenter="moreInfoHover = true"
            @mouseleave="moreInfoHover = false"
          >
            Prikaži
            <img src="../assets/img/puscica-trikotnik.svg" alt="" />
          </button>
          <button v-if="moreInfo" class="hide" @click="moreInfo = false">
            Skrij
            <img src="../assets/img/puscica-trikotnik.svg" alt="" />
          </button>
        </div>
        <div v-if="moreInfo" class="parties">
          <div>
            <div class="head">
              <img src="../assets/img/strinjam.svg" />
              <span>Se strinjajo</span>
            </div>
            <PartyElement
              v-for="answer in partiesAgree"
              :key="answer.party_id"
              :party="answer.party"
              :answer="answer"
            >
            </PartyElement>
            <p v-if="!partiesAgree.length">
              Nobena stranka ni izbrala tega odgovora.
            </p>
          </div>
          <div>
            <div class="head">
              <img src="../assets/img/ne-strinjam.svg" />
              <span>Se ne strinjajo</span>
            </div>
            <PartyElement
              v-for="answer in partiesDisagree"
              :key="answer.party_id"
              :party="answer.party"
              :answer="answer"
            >
            </PartyElement>
            <p v-if="!partiesDisagree.length">
              Nobena stranka ni izbrala tega odgovora.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.body {
  .content {
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

    .buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      align-items: flex-end;
      margin-top: 2.5rem;

      @media (max-width: 575.98px) {
        gap: 0.75rem;
        margin-top: 1.5rem;
      }

      .agree,
      .disagree,
      .back,
      .skip {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: flex-start;
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid #000;
        cursor: pointer;

        @media (max-width: 575.98px) {
          span {
            display: none;
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

      .back,
      .skip {
        padding: 0.25rem 0.375rem;
        width: 120px;
        font-size: 1rem;
        line-height: 1.3;
        font-weight: 400;
        color: inherit;
        text-decoration: none;

        @media (max-width: 575.98px) {
          padding: 0.5rem 0.75rem;
          width: auto;
        }

        & > div {
          display: flex;
        }

        img {
          height: 1rem;
          transform: rotate(90deg);

          &:first-of-type {
            margin-right: -0.375rem;
          }
        }
      }

      .skip {
        justify-content: flex-end;

        img {
          transform: rotate(-90deg);
        }
      }

      .agree,
      .disagree {
        gap: 1rem;
        justify-content: center;
        width: 200px;
        padding: 0.75rem;
        background-color: #eaf5ff;
        border-width: 2px;
        font-size: 1.125rem;
        line-height: 1.2;
        font-weight: 700;

        @media (max-width: 575.98px) {
          padding: 1.25rem 1.5rem;
          width: auto;
        }

        img {
          height: 2rem;
        }
      }

      .agree {
        &:hover {
          background-color: #f2f8cc;
          box-shadow:
            0 0 0 1px #000 inset,
            0 0 0.25rem 0 #bddc00,
            0 0 1rem 0 #bddc00 inset;
        }
      }

      .disagree {
        &:hover {
          background-color: #ffdfdf;
          box-shadow:
            0 0 0 1px #000 inset,
            0 0 0.25rem 0 #ff0000,
            0 0 1rem 0 #ff0000 inset;
        }
      }
    }
  }

  .more-info {
    border-top: 2px solid black;
    background-color: #eaf5ff;
    padding-inline: 6rem;
    padding-block: 3.25rem 4rem;

    @media (max-width: 575.98px) {
      padding-inline: 1.5rem;
      padding-block: 2rem;
    }

    .show-hide {
      & > img {
        width: 1.325rem;
        margin-right: 0.25rem;
      }

      span {
        font-size: 1.325rem;
        line-height: 1.5;
        font-weight: 700;

        @media (max-width: 575.98px) {
          font-size: 1rem;
        }
      }

      button {
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
        font-size: 1rem;
        cursor: pointer;

        @media (max-width: 575.98px) {
          min-width: 80px;
          font-size: 0.75rem;
        }

        img {
          width: 1rem;
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

    .parties {
      display: flex;
      gap: 1.5rem;
      margin-top: 1.5rem;

      @media (max-width: 575.98px) {
        flex-direction: column;
        gap: 2rem;
      }

      & > div {
        flex: 1;

        .head {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0.75rem;
          background-color: #eaf5ff;
          border-bottom: 1px solid #000;
          font-size: 1.125rem;
          line-height: 1.2;
          font-weight: 700;

          & + p {
            padding: 1rem 0.75rem;
            background-color: #fff;
            border-bottom: 1px solid #000;
          }

          img {
            height: 2rem;
          }
        }
      }
    }
  }
}
</style>
