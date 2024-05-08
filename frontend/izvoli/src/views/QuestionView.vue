<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PartyElement from '@/components/PartyElement.vue'
import QuestionsProgress from '@/components/QuestionsProgress.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const moreInfo = ref(false)
const moreInfoHover = ref(false)

const questionIndex = computed(() => parseInt(route.params.id, 10) - 1)
const questionNumber = computed(() => questionIndex.value + 1)

const storeInitialized = computed(() => store.getters.getStoreInitialized)
const questionsList = computed(() => store.getters.getQuestionsList)
const questionsNo = computed(() => questionsList.value.length)
const questionId = computed(() => questionsList.value[questionIndex.value])
const question = computed(() => store.state.questions[questionId.value])
// const answers = computed(() => store.getters.getAnswers)
const parties = computed(() => store.getters.getParties)
const partiesAgree = computed(() => {
  const parties = {}
  for (const [key, value] of Object.entries(question.value.parties)) {
    if (value.answer == 'YES') {
      parties[key] = value
    }
  }
  return parties
})
const partiesDisagree = computed(() => {
  const parties = {}
  for (const [key, value] of Object.entries(question.value.parties)) {
    if (value.answer == 'NO') {
      parties[key] = value
    }
  }
  return parties
})
const partiesNeutral = computed(() => {
  const parties = {}
  for (const [key, value] of Object.entries(question.value.parties)) {
    if (value.answer == 'NEUTRAL') {
      parties[key] = value
    }
  }
  return parties
})

// const skipQuestion = (id, answer) => {
//   // remove saved answer
//   store.commit('removeAnswer', { id, answer })
//   if (questionIndex.value < questionsNo.value - 1) {
//     router.push(`/vprasanje/${questionNumber.value + 1}`)
//   } else {
//     store.commit('calculateResults')
//     router.push('/rezultati')
//   }
// }

const saveAnswer = (id, answer) => {
  // save answer
  store.commit('addAnswer', { id, answer })
  // navigate to next question
  if (questionIndex.value < questionsNo.value - 1) {
    router.push(`/vprasanje/${questionNumber.value + 1}`)
  } else {
    // last question -> calculate results and navigate to results
    store.commit('calculateResults')
    router.push('/rezultati')
  }
}

onMounted(() => {
  if (!storeInitialized.value) {
    store.dispatch('initializeStore').then((quiz_finished) => {
      if (quiz_finished) {
        router.push('/rezultati')
      }
    })
  }
})

router.beforeEach(() => {
  if (moreInfo.value) {
    moreInfo.value = false
  }
})
</script>

<template>
  <main class="container">
    <div class="body" v-if="question">
      <QuestionsProgress :current="questionNumber" :count="questionsNo" />
      <div class="content">
        <div v-if="question.tag" class="category">{{ question.tag }}</div>
        <h1 v-if="question.title" class="title">{{ question.title }}</h1>
        <p v-if="question.description" class="description">{{ question.description }}</p>
        <div class="buttons">
          <RouterLink :to="
              questionIndex <= 0
                ? { name: 'introduction' }
                : { name: 'question', params: { id: questionNumber - 1 } }
            " class="back">
            <div>
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
            </div>
            <span>Popravi prejšnjo izbiro</span>
          </RouterLink>
          <button @click="saveAnswer(questionId, 'NO')" class="disagree">
            <img src="../assets/img/ne-strinjam.svg" />
            <span>Se ne strinjam</span>
          </button>
          <button @click="saveAnswer(questionId, 'YES')" class="agree">
            <img src="../assets/img/strinjam.svg" />
            <span>Se strinjam</span>
          </button>
          <button @click="saveAnswer(questionId, 'NEUTRAL')" class="skip">
            <span>Brez stališča</span>
            <div>
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
              <img src="../assets/img/puscica-trikotnik.svg" alt="" />
            </div>
          </button>
        </div>
      </div>

      <div class="more-info">
        <div class="show-hide">
          <img src="../assets/img/eyes-down.svg" v-if="moreInfo || moreInfoHover" />
          <img src="../assets/img/eyes-right.svg" v-else />
          <span>Kaj o tem mislijo stranke?</span>
          <button @click="moreInfo = true" @mouseenter="moreInfoHover = true" @mouseleave="moreInfoHover = false"
            v-if="!moreInfo" class="show">
            Prikaži
            <img src="../assets/img/puscica-trikotnik-modra.svg" />
          </button>
          <button @click="moreInfo = false" v-if="moreInfo" class="hide">
            Skrij
            <img src="../assets/img/puscica-trikotnik-modra.svg" />
          </button>
        </div>
        <div class="parties" v-if="moreInfo">
          <div>
            <div class="head">Se strinja</div>
            <PartyElement v-for="(answer, party_id) in partiesAgree" :key="party_id" :party="parties[party_id]"
              :answer="answer">
            </PartyElement>
          </div>
          <div>
            <div class="head">Se ne strinja</div>
            <PartyElement v-for="(answer, party_id) in partiesDisagree" :key="party_id" :party="parties[party_id]"
              :answer="answer">
            </PartyElement>
          </div>
          <div>
            <div class="head">Brez stališča</div>
            <PartyElement v-for="(answer, party_id) in partiesNeutral" :key="party_id" :party="parties[party_id]"
              :answer="answer">
            </PartyElement>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.body {
  .content {
    padding-inline: 100px;
    padding-top: 50px;
    padding-bottom: 56px;

    @media (max-width: 575.98px) {
      padding-inline: 21px;
      padding-top: 18px;
      padding-bottom: 32px;
    }

    .category {
      display: inline-block;
      margin-bottom: 16px;
      padding: 4px 8px;
      background-color: #FFFFFF;
      border-radius: 9999px;
      font-size: 12px;
      line-height: 1;
    }

    .title {
      margin-bottom: 22px;
      font-size: 32px;
      line-height: 40px;
      font-weight: 700;

      @media (max-width: 575.98px) {
        font-size: 24px;
        line-height: 30px;
      }
    }

    .description {
      margin-bottom: 22px;
      font-size: 21px;
      line-height: 31px;

      @media (max-width: 575.98px) {
        font-size: 15px;
        line-height: 22px;
      }
    }

    .buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: flex-end;
      margin-top: 42px;

      @media (max-width: 575.98px) {
        gap: 9px;
        margin-top: 32px;
      }

      .agree,
      .disagree,
      .back,
      .skip {
        background: transparent;
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
        background-color: #fff;
        padding: 20px 9px 20px 18px;
        width: 200px;
        font-size: 18px;
        line-height: 20px;
        font-weight: 800;

        @media (max-width: 575.98px) {
          padding: 20px 18px 20px 21px;
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
    padding: 40px 100px;
    background-color: #f2f7ff;
    border-top: 2px solid black;

    @media (max-width: 575.98px) {
      padding: 32px 21px;
    }

    .show-hide {
      & > img {
        width: 21px;
        margin-right: 5px;
      }

      span {
        font-size: 18px;
        line-height: 20px;
        font-weight: 800;
      }

      button {
        display: inline-flex;
        gap: 1px;
        align-items: flex-end;
        margin-left: 7px;
        padding: 0;
        background: transparent;
        border: none;
        border-bottom: 1px solid #0e3d97;
        color: #0e3d97;
        font-size: 15px;
        line-height: 1;
        cursor: pointer;

        img {
          width: 12px;
          margin-bottom: 1px;
        }

        &.hide {
          img {
            transform: rotate(180deg);
          }
        }
      }
    }

    .parties {
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
        }
      }
    }
  }
}
</style>
