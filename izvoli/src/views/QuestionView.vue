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
            <div class="head">Se strinjajo</div>
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
            <div class="head">Se ne strinjajo</div>
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
      background: magenta; // TODO: fix these styles

      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: flex-end;
      margin-top: 2.5rem;

      @media (max-width: 575.98px) {
        gap: 9px;
        margin-top: 32px;
      }

      .agree,
      .disagree,
      .back,
      .skip {
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid black;
        border-radius: 20px;
        display: flex;
        gap: 6px;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;

        @media (max-width: 575.98px) {
          span {
            display: none;
          }
        }
      }

      .back,
      .skip {
        padding: 14px 10px;
        width: 120px;
        font-size: 10px;
        line-height: 1;
        font-weight: 500;
        color: inherit;
        text-decoration: none;

        @media (max-width: 575.98px) {
          width: auto;
        }

        & > div {
          display: flex;
        }

        img {
          height: 16px;
          transform: rotate(90deg);

          &:first-of-type {
            margin-right: -6px;
          }
        }

        &:hover {
          background-color: #fff;
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
        gap: 10px;
        padding: 20px 9px 20px 18px;
        width: 200px;
        font-size: 18px;
        line-height: 20px;
        font-weight: 800;

        @media (max-width: 575.98px) {
          padding: 20px 18px 20px 21px;
          width: auto;
        }

        img {
          width: 28px;
        }

        &:hover {
          background-color: #ffe368;
        }
      }
    }
  }

  .more-info {
    border-top: 2px solid black;
    background-color: #f2f7ff;
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
      }

      button {
        display: inline-flex;
        gap: 0.25rem;
        align-items: center;
        margin-left: 0.5rem;
        padding-inline: 0.75rem;
        padding-block: 0.3rem 0.2rem;
        background: transparent;
        border: 1px solid #000;
        color: #000;
        font-size: 1rem;
        cursor: pointer;

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
        }

        &:focus-visible {
          background-color: #fff;
          outline: 2px solid #006fc3;
          outline-offset: 2px;
        }
      }
    }

    .parties {
      background-color: magenta; // TODO: fix these styles

      display: flex;
      gap: 26px;
      margin-top: 22px;

      @media (max-width: 575.98px) {
        flex-direction: column;
        gap: 43px;
      }

      & > div {
        flex: 1;

        .head {
          padding: 6px 8px;
          background-color: #e2edff;
          font-size: 13px;
          line-height: 18px;
          font-weight: 600;

          & + p {
            padding: 6px 8px;
            font-size: 13px;
            line-height: 18px;
          }
        }
      }
    }
  }
}
</style>
